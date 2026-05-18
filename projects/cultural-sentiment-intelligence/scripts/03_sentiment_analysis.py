"""
Script 03 — Sentiment Analysis
Multi-method NLP: VADER (rule-based) + TextBlob (lexical).
Produces sentiment scores, labels, and KPI tables.
"""

import pandas as pd
import numpy as np
from pathlib import Path
import json

try:
    from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
    VADER_AVAILABLE = True
except ImportError:
    VADER_AVAILABLE = False
    print("  [INFO] vaderSentiment not installed — using rule-based fallback")

try:
    from textblob import TextBlob
    TEXTBLOB_AVAILABLE = True
except ImportError:
    TEXTBLOB_AVAILABLE = False
    print("  [INFO] textblob not installed — skipping TextBlob scores")

PROCESSED_DIR = Path(__file__).parent.parent / "data" / "processed"
EXPORTS_DIR = Path(__file__).parent.parent / "data" / "exports"
EXPORTS_DIR.mkdir(parents=True, exist_ok=True)


def vader_sentiment(text: str, analyzer) -> dict:
    scores = analyzer.polarity_scores(text)
    label = (
        "positive" if scores["compound"] >= 0.05
        else "negative" if scores["compound"] <= -0.05
        else "neutral"
    )
    return {
        "vader_compound": scores["compound"],
        "vader_pos": scores["pos"],
        "vader_neg": scores["neg"],
        "vader_neu": scores["neu"],
        "sentiment_label": label,
    }


def rule_based_sentiment(text: str) -> dict:
    """Simple lexicon fallback when VADER not installed."""
    positive_words = {
        "amazing", "incredible", "excited", "love", "great", "perfect",
        "beautiful", "iconic", "emotional", "stunning", "masterpiece",
        "brilliant", "wonderful", "fantastic", "excellent", "outstanding",
        "historic", "chills", "goosebumps", "ready", "wait", "finally",
        "obsessed", "insane", "unreal", "gorgeous", "powerful",
    }
    negative_words = {
        "worried", "nervous", "bad", "terrible", "awful", "ruin", "boring",
        "disappointing", "skeptical", "concerned", "impossible", "wrong",
        "irresponsible", "complicated", "allegations", "controversy",
        "problematic", "conflicted", "reservation", "nervous",
    }

    text_lower = text.lower()
    words = set(text_lower.split())
    pos_count = len(words & positive_words)
    neg_count = len(words & negative_words)

    if pos_count > neg_count:
        compound = min(0.1 + 0.15 * pos_count + np.random.normal(0, 0.05), 1.0)
        label = "positive"
    elif neg_count > pos_count:
        compound = max(-0.1 - 0.15 * neg_count + np.random.normal(0, 0.05), -1.0)
        label = "negative"
    else:
        compound = float(np.random.normal(0, 0.04))
        label = "neutral"

    pos_ratio = pos_count / max(pos_count + neg_count, 1)
    neg_ratio = neg_count / max(pos_count + neg_count, 1)

    return {
        "vader_compound": float(round(compound, 4)),
        "vader_pos": float(round(pos_ratio, 4)),
        "vader_neg": float(round(neg_ratio, 4)),
        "vader_neu": float(round(1 - pos_ratio - neg_ratio, 4)),
        "sentiment_label": label,
    }


def textblob_sentiment(text: str) -> dict:
    blob = TextBlob(text)
    return {
        "tb_polarity": round(blob.sentiment.polarity, 4),
        "tb_subjectivity": round(blob.sentiment.subjectivity, 4),
    }


def compute_kpis(df: pd.DataFrame) -> pd.DataFrame:
    kpis = df.groupby("movie").agg(
        total_posts=("post_id", "count"),
        avg_sentiment=("vader_compound", "mean"),
        median_sentiment=("vader_compound", "median"),
        positive_rate=("sentiment_label", lambda x: (x == "positive").mean()),
        negative_rate=("sentiment_label", lambda x: (x == "negative").mean()),
        neutral_rate=("sentiment_label", lambda x: (x == "neutral").mean()),
        avg_engagement=("engagement_score", "mean"),
        total_likes=("likes", "sum"),
        total_comments=("comments", "sum"),
        avg_hype_signals=("hype_signal_count", "mean"),
    ).round(4)

    kpis["audience_excitement_index"] = (
        kpis["avg_sentiment"] * 0.4
        + kpis["positive_rate"] * 0.35
        + (kpis["avg_engagement"] / kpis["avg_engagement"].max()) * 0.25
    ).round(4)

    kpis["positive_mention_pct"] = (kpis["positive_rate"] * 100).round(1)
    kpis["negative_mention_pct"] = (kpis["negative_rate"] * 100).round(1)
    return kpis


def sentiment_over_time(df: pd.DataFrame) -> pd.DataFrame:
    df["date"] = pd.to_datetime(df["date"])
    df["week_start"] = df["date"].dt.to_period("W").apply(lambda r: r.start_time)
    weekly = df.groupby(["movie", "week_start"]).agg(
        avg_sentiment=("vader_compound", "mean"),
        post_volume=("post_id", "count"),
        avg_engagement=("engagement_score", "mean"),
    ).reset_index().round(4)
    weekly["sentiment_velocity"] = weekly.groupby("movie")["avg_sentiment"].diff().round(4)
    return weekly


def main():
    print("Running sentiment analysis...")

    df = pd.read_csv(PROCESSED_DIR / "corpus_processed.csv")
    print(f"  Loaded {len(df)} posts")

    if VADER_AVAILABLE:
        analyzer = SentimentIntensityAnalyzer()
        print("  Using VADER sentiment analyzer")
        sentiment_rows = df["text_clean"].apply(lambda t: vader_sentiment(t, analyzer))
    else:
        print("  Using rule-based sentiment fallback")
        sentiment_rows = df["text_clean"].apply(rule_based_sentiment)

    sentiment_df = pd.DataFrame(sentiment_rows.tolist())
    df = pd.concat([df.reset_index(drop=True), sentiment_df], axis=1)

    if TEXTBLOB_AVAILABLE:
        tb_rows = df["text_clean"].apply(textblob_sentiment)
        tb_df = pd.DataFrame(tb_rows.tolist())
        df = pd.concat([df, tb_df], axis=1)

    df.to_csv(PROCESSED_DIR / "corpus_sentiment.csv", index=False)
    print(f"  Sentiment data saved.")

    kpis = compute_kpis(df)
    kpis.to_csv(EXPORTS_DIR / "kpi_summary.csv")
    print("\n  KPI Summary:")
    print(kpis[["avg_sentiment", "positive_mention_pct", "negative_mention_pct",
                 "avg_engagement", "audience_excitement_index"]].to_string())

    weekly = sentiment_over_time(df)
    weekly.to_csv(EXPORTS_DIR / "sentiment_over_time.csv", index=False)
    print(f"\n  Weekly sentiment time series saved.")

    sentiment_dist = df.groupby(["movie", "sentiment_label"]).size().unstack(fill_value=0)
    sentiment_dist.to_csv(EXPORTS_DIR / "sentiment_distribution.csv")

    platform_sentiment = df.groupby(["movie", "platform"]).agg(
        avg_sentiment=("vader_compound", "mean"),
        post_count=("post_id", "count"),
    ).round(4).reset_index()
    platform_sentiment.to_csv(EXPORTS_DIR / "platform_sentiment.csv", index=False)

    insights = {
        "generated_at": pd.Timestamp.now().isoformat(),
        "movies_analyzed": list(df["movie"].unique()),
        "total_posts": int(len(df)),
        "kpi_snapshot": kpis[["avg_sentiment", "positive_mention_pct",
                                "audience_excitement_index"]].to_dict(),
    }
    with open(EXPORTS_DIR / "sentiment_insights.json", "w") as f:
        json.dump(insights, f, indent=2)

    return df, kpis


if __name__ == "__main__":
    main()
