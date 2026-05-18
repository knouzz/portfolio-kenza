"""
Processor: Archetype Builder
TF-IDF → PCA → K-Means audience segmentation.
Produces named audience archetypes with behavioral profiles.
"""

import json
import pickle
import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

PROCESSED_DIR = Path(__file__).parent.parent.parent / "data" / "processed"
EXPORTS_DIR   = Path(__file__).parent.parent.parent / "data" / "exports"
MODELS_DIR    = Path(__file__).parent.parent.parent / "models"
MODELS_DIR.mkdir(parents=True, exist_ok=True)

ARCHETYPE_NAMES = {
    "The Devil Wears Prada 2": {
        0: "The Nostalgic",
        1: "The Fashion Insider",
        2: "The Cautious Fan",
        3: "The Industry Analyst",
    },
    "Michael": {
        0: "The Legacy Believer",
        1: "The Music Devotee",
        2: "The Critical Observer",
        3: "The Cultural Analyst",
    },
}

ARCHETYPE_DESCRIPTIONS = {
    "The Nostalgic":        "Emotionally invested in the original. Drives the nostalgia narrative. High positivity.",
    "The Fashion Insider":  "Industry-aware. Evaluates aesthetic and cultural authenticity. Moderate-high positivity.",
    "The Cautious Fan":     "Loves the IP but protective of its legacy. Conditional enthusiasm.",
    "The Industry Analyst": "Tracks box office, awards, strategic positioning. Analytically framed.",
    "The Legacy Believer":  "Deep MJ fan. Views the biopic as cultural validation. High excitement.",
    "The Music Devotee":    "Primarily focused on the music catalog and live performance recreation.",
    "The Critical Observer":"Raises controversy and allegations. Low sentiment, high engagement.",
    "The Cultural Analyst": "Studies MJ's societal impact. Nuanced, mixed-sentiment perspective.",
}


def build_features(texts: pd.Series) -> tuple:
    vec = TfidfVectorizer(
        max_features=500,
        ngram_range=(1, 2),
        min_df=2,
        max_df=0.95,
        strip_accents="unicode",
    )
    X = vec.fit_transform(texts.fillna(""))
    return X, vec


def reduce_pca(X, n_components: int = 40) -> tuple:
    n = min(n_components, X.shape[0] - 1, X.shape[1])
    pca = PCA(n_components=n, random_state=42)
    X_pca = pca.fit_transform(X.toarray())
    explained = pca.explained_variance_ratio_.cumsum()[-1]
    return X_pca, pca, round(float(explained), 4)


def optimal_k(X_pca: np.ndarray, k_range=range(2, 6)) -> int:
    scores = {}
    for k in k_range:
        km = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels = km.fit_predict(X_pca)
        if len(set(labels)) > 1:
            scores[k] = silhouette_score(X_pca, labels)
    return max(scores, key=scores.get) if scores else 3


def build_profiles(df: pd.DataFrame) -> pd.DataFrame:
    profiles = df.groupby(["movie", "archetype"]).agg(
        post_count=("post_id", "count"),
        avg_sentiment=("vader_compound", "mean"),
        avg_engagement=("engagement_score", "mean"),
        avg_likes=("likes", "mean"),
        positive_rate=("sentiment_label", lambda x: (x == "positive").mean()),
        negative_rate=("sentiment_label", lambda x: (x == "negative").mean()),
        avg_hype=("hype_count", "mean"),
        avg_concern=("concern_count", "mean"),
        avg_anticipation=("anticipation_count", "mean"),
    ).round(4)

    totals = df.groupby("movie")["post_id"].count()
    profiles["share"] = (
        profiles["post_count"] /
        profiles.index.get_level_values("movie").map(totals)
    ).round(4)
    profiles["excitement_index"] = (
        profiles["avg_sentiment"] * 0.40
        + profiles["positive_rate"] * 0.35
        + (profiles["avg_engagement"] / profiles["avg_engagement"].max()) * 0.25
    ).round(4)
    return profiles


def segment_movie(df_movie: pd.DataFrame, movie: str) -> pd.DataFrame:
    col   = "text_clean" if "text_clean" in df_movie.columns else "text"
    texts = df_movie[col].fillna("").astype(str)

    X_tfidf, vec = build_features(texts)
    X_pca, pca, var_explained = reduce_pca(X_tfidf)
    k = min(optimal_k(X_pca), 4)

    km = KMeans(n_clusters=k, random_state=42, n_init=15)
    cluster_ids = km.fit_predict(X_pca)

    df_out = df_movie.copy()
    df_out["cluster_id"] = cluster_ids
    df_out["pca_x"]      = X_pca[:, 0]
    df_out["pca_y"]      = X_pca[:, 1] if X_pca.shape[1] > 1 else 0.0

    names = ARCHETYPE_NAMES.get(movie, {})
    df_out["archetype"] = df_out["cluster_id"].map(
        lambda k_: names.get(k_, f"Segment {k_}")
    )
    df_out["archetype_description"] = df_out["archetype"].map(
        ARCHETYPE_DESCRIPTIONS
    ).fillna("")

    slug = movie[:5].replace(" ", "_")
    with open(MODELS_DIR / f"vec_{slug}.pkl",   "wb") as f: pickle.dump(vec, f)
    with open(MODELS_DIR / f"kmeans_{slug}.pkl","wb") as f: pickle.dump(km, f)

    print(f"    {movie}: k={k}, PCA variance={var_explained:.1%}")
    return df_out


def run(df: pd.DataFrame) -> tuple[pd.DataFrame, pd.DataFrame]:
    print("  Archetype builder running...")
    parts = []
    for movie in df["movie"].unique():
        segmented = segment_movie(df[df["movie"] == movie].copy(), movie)
        parts.append(segmented)

    out_df = pd.concat(parts, ignore_index=True)
    out_df.to_csv(PROCESSED_DIR / "corpus_clustered.csv", index=False)

    # PCA coordinates for scatter plot
    pca_export = out_df[[
        "movie","post_id","pca_x","pca_y",
        "cluster_id","archetype","vader_compound",
        "sentiment_label","engagement_score",
    ]]
    pca_export.to_csv(EXPORTS_DIR / "pca_coordinates.csv", index=False)

    profiles = build_profiles(out_df)
    profiles.to_csv(EXPORTS_DIR / "archetype_profiles.csv")
    print(f"    Archetypes built for {df['movie'].nunique()} movies")

    # JSON export with descriptions
    arch_meta = {}
    for movie in out_df["movie"].unique():
        sub = out_df[out_df["movie"] == movie]
        arch_meta[movie] = []
        for archetype in sub["archetype"].unique():
            row = sub[sub["archetype"] == archetype].iloc[0]
            arch_meta[movie].append({
                "name":        archetype,
                "description": ARCHETYPE_DESCRIPTIONS.get(archetype, ""),
                "share":       round(float((sub["archetype"] == archetype).mean()), 4),
            })
    with open(EXPORTS_DIR / "archetype_metadata.json", "w") as f:
        json.dump(arch_meta, f, indent=2)

    return out_df, profiles
