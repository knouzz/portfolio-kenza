"""
Script 02 — Preprocessing
Cleans text, engineers features, prepares dataset for NLP and ML stages.
"""

import re
import pandas as pd
import numpy as np
from pathlib import Path

RAW_DIR = Path(__file__).parent.parent / "data" / "raw"
PROCESSED_DIR = Path(__file__).parent.parent / "data" / "processed"
PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

STOPWORDS = {
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
    "of", "with", "by", "is", "it", "this", "that", "be", "are", "was",
    "were", "have", "has", "had", "do", "does", "did", "will", "would",
    "could", "should", "may", "might", "i", "me", "my", "we", "our",
    "you", "your", "he", "she", "they", "them", "their", "just", "so",
    "if", "not", "no", "its", "from", "as", "about", "into", "than",
    "there", "here", "what", "how", "when", "who", "which", "can",
    "all", "one", "been", "also", "more", "very", "get", "got", "now",
    "already", "still", "even", "much", "some", "any", "up", "out",
    "going", "go", "need", "feel", "way", "think", "know",
}


def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"@\w+", "", text)
    text = re.sub(r"#(\w+)", r"\1", text)
    text = re.sub(r"[^\w\s']", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def remove_stopwords(text: str) -> str:
    tokens = text.split()
    return " ".join(t for t in tokens if t not in STOPWORDS and len(t) > 2)


def compute_engagement_score(row: pd.Series) -> float:
    """Composite engagement: weighted sum, log-dampened."""
    raw = (row["likes"] * 1.0 + row["comments"] * 2.5 + row["shares"] * 3.0)
    return float(np.log1p(raw))


def flag_hype_signals(text: str) -> dict:
    """Detect emotional intensity markers."""
    caps_ratio = sum(1 for c in text if c.isupper()) / max(len(text), 1)
    exclamation_count = text.count("!")
    question_count = text.count("?")

    hype_words = {
        "can't wait", "cannot wait", "obsessed", "screaming", "crying",
        "already", "finally", "omg", "insane", "unreal", "incredible",
        "masterpiece", "chills", "goosebumps", "emotional", "iconic",
        "historic", "devastating", "ready", "unprepared",
    }
    concern_words = {
        "worried", "nervous", "skeptical", "concerned", "reservation",
        "hope not", "ruins", "legacy", "complicated", "conflicted",
        "controversial", "allegations", "ignore", "irresponsible",
    }

    text_lower = text.lower()
    hype_count = sum(1 for w in hype_words if w in text_lower)
    concern_count = sum(1 for w in concern_words if w in text_lower)

    return {
        "caps_ratio": round(caps_ratio, 4),
        "exclamation_count": exclamation_count,
        "question_count": question_count,
        "hype_signal_count": hype_count,
        "concern_signal_count": concern_count,
    }


def compute_text_features(df: pd.DataFrame) -> pd.DataFrame:
    df["word_count"] = df["text"].apply(lambda x: len(str(x).split()))
    df["char_count"] = df["text"].apply(len)
    df["avg_word_length"] = df.apply(
        lambda r: r["char_count"] / max(r["word_count"], 1), axis=1
    )

    signals = df["text"].apply(flag_hype_signals).apply(pd.Series)
    df = pd.concat([df, signals], axis=1)
    return df


def main():
    print("Preprocessing corpus...")

    df = pd.read_csv(RAW_DIR / "social_corpus_raw.csv")
    print(f"  Loaded {len(df)} posts")

    df["text_clean"] = df["text"].apply(clean_text)
    df["text_tokens"] = df["text_clean"].apply(remove_stopwords)
    df["engagement_score"] = df.apply(compute_engagement_score, axis=1)
    df = compute_text_features(df)

    df["date"] = pd.to_datetime(df["date"])
    df["day_of_week"] = df["date"].dt.day_name()
    df["is_weekend"] = df["date"].dt.dayofweek >= 5

    df["engagement_tier"] = pd.cut(
        df["engagement_score"],
        bins=[0, 2, 4, 6, np.inf],
        labels=["Low", "Medium", "High", "Viral"],
    )

    out_path = PROCESSED_DIR / "corpus_processed.csv"
    df.to_csv(out_path, index=False)
    print(f"  Saved: {out_path}")

    summary = df.groupby("movie").agg(
        post_count=("post_id", "count"),
        avg_likes=("likes", "mean"),
        avg_comments=("comments", "mean"),
        avg_engagement_score=("engagement_score", "mean"),
        avg_word_count=("word_count", "mean"),
        avg_hype_signals=("hype_signal_count", "mean"),
        avg_concern_signals=("concern_signal_count", "mean"),
    ).round(2)

    print("\n  Volume & Engagement Summary:")
    print(summary.to_string())

    summary.to_csv(PROCESSED_DIR / "volume_summary.csv")
    return df


if __name__ == "__main__":
    main()
