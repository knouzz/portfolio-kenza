"""
Processor: Sentiment Engine
Multi-signal NLP scoring — VADER + TextBlob + emotional intensity flags.
Produces per-post scores and movie-level KPI aggregates.
"""

import re
import numpy as np
import pandas as pd
from pathlib import Path

try:
    from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
    VADER_AVAILABLE = True
except ImportError:
    VADER_AVAILABLE = False

try:
    from textblob import TextBlob
    TB_AVAILABLE = True
except ImportError:
    TB_AVAILABLE = False

PROCESSED_DIR = Path(__file__).parent.parent.parent / "data" / "processed"
EXPORTS_DIR   = Path(__file__).parent.parent.parent / "data" / "exports"
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
EXPORTS_DIR.mkdir(parents=True, exist_ok=True)

HYPE_LEXICON = {
    "can't wait", "cannot wait", "obsessed", "screaming", "emotional",
    "iconic", "historic", "masterpiece", "chills", "goosebumps",
    "incredible", "finally", "amazing", "stunning", "unreal",
}
CONCERN_LEXICON = {
    "worried", "skeptical", "nervous", "reservation", "concerned",
    "irresponsible", "allegations", "controversy", "conflicted",
    "ruins", "legacy", "problematic", "complicated",
}
ANTICIPATION_LEXICON = {
    "can't wait", "excited", "ready", "hyped", "counting down",
    "already", "pre-ordered", "booked", "opening night", "first showing",
}


def clean(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"http\S+|@\w+|#(\w+)", r"\1", text)
    text = re.sub(r"[^\w\s']", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def vader_score(text: str, analyzer) -> dict:
    s = analyzer.polarity_scores(text)
    label = ("positive" if s["compound"] >= 0.05
             else "negative" if s["compound"] <= -0.05 else "neutral")
    return {
        "vader_compound": round(s["compound"], 4),
        "vader_pos": round(s["pos"], 4),
        "vader_neg": round(s["neg"], 4),
        "vader_neu": round(s["neu"], 4),
        "sentiment_label": label,
    }


def rule_score(text: str) -> dict:
    words = set(text.lower().split())
    pos = len(words & {w.split()[0] for w in HYPE_LEXICON})
    neg = len(words & {w.split()[0] for w in CONCERN_LEXICON})
    if pos > neg:
        c = float(np.clip(0.1 + 0.15 * pos + np.random.normal(0, 0.05), -1, 1))
        label = "positive"
    elif neg > pos:
        c = float(np.clip(-0.1 - 0.15 * neg + np.random.normal(0, 0.05), -1, 1))
        label = "negative"
    else:
        c = float(np.random.normal(0, 0.04))
        label = "neutral"
    total = max(pos + neg, 1)
    return {
        "vader_compound": round(c, 4),
        "vader_pos": round(pos / total, 4),
        "vader_neg": round(neg / total, 4),
        "vader_neu": round(max(0, 1 - pos / total - neg / total), 4),
        "sentiment_label": label,
    }


def emotional_signals(text: str) -> dict:
    t = text.lower()
    return {
        "hype_count":         sum(1 for w in HYPE_LEXICON        if w in t),
        "concern_count":      sum(1 for w in CONCERN_LEXICON      if w in t),
        "anticipation_count": sum(1 for w in ANTICIPATION_LEXICON if w in t),
        "exclamation_count":  text.count("!"),
        "caps_ratio":         round(sum(1 for c in text if c.isupper()) / max(len(text), 1), 4),
        "word_count":         len(text.split()),
    }


def engagement_score(row: pd.Series) -> float:
    raw = row.get("likes", 0) * 1.0 + row.get("comments", 0) * 2.5 + row.get("shares", 0) * 3.0
    return round(float(np.log1p(raw)), 4)


def score_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    analyzer = SentimentIntensityAnalyzer() if VADER_AVAILABLE else None

    df = df.copy()
    df["text_clean"] = df["text"].apply(clean)

    score_fn = (lambda t: vader_score(t, analyzer)) if VADER_AVAILABLE else rule_score
    scores = df["text_clean"].apply(score_fn).apply(pd.Series)
    df = pd.concat([df.reset_index(drop=True), scores], axis=1)

    if TB_AVAILABLE:
        df["tb_polarity"]     = df["text_clean"].apply(lambda t: TextBlob(t).sentiment.polarity)
        df["tb_subjectivity"] = df["text_clean"].apply(lambda t: TextBlob(t).sentiment.subjectivity)

    signals = df["text_clean"].apply(emotional_signals).apply(pd.Series)
    df = pd.concat([df, signals], axis=1)

    df["engagement_score"] = df.apply(engagement_score, axis=1)
    df["engagement_tier"]  = pd.cut(
        df["engagement_score"],
        bins=[0, 2, 4, 6, np.inf],
        labels=["Low", "Medium", "High", "Viral"],
    )

    return df


def build_kpis(df: pd.DataFrame) -> pd.DataFrame:
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
        avg_hype=("hype_count", "mean"),
        avg_concern=("concern_count", "mean"),
        avg_anticipation=("anticipation_count", "mean"),
    ).round(4)

    kpis["positive_mention_pct"] = (kpis["positive_rate"] * 100).round(1)
    kpis["negative_mention_pct"] = (kpis["negative_rate"] * 100).round(1)
    kpis["audience_excitement_index"] = (
        kpis["avg_sentiment"] * 0.40
        + kpis["positive_rate"] * 0.35
        + (kpis["avg_engagement"] / kpis["avg_engagement"].max()) * 0.25
    ).round(4)
    return kpis


def run(df: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    print("  Sentiment engine running...")
    scored = score_dataframe(df)
    scored.to_csv(PROCESSED_DIR / "corpus_sentiment.csv", index=False)

    kpis = build_kpis(scored)
    kpis.to_csv(EXPORTS_DIR / "kpi_summary.csv")
    print(f"    Scored {len(scored)} posts | KPIs for {len(kpis)} movies")
    return scored, kpis
