"""
Script 04 — Audience Clustering
TF-IDF vectorization → PCA dimensionality reduction → K-Means segmentation.
Produces labeled audience clusters per movie.
"""

import pandas as pd
import numpy as np
import json
import pickle
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

PROCESSED_DIR = Path(__file__).parent.parent / "data" / "processed"
EXPORTS_DIR = Path(__file__).parent.parent / "data" / "exports"
MODELS_DIR = Path(__file__).parent.parent / "models"
MODELS_DIR.mkdir(parents=True, exist_ok=True)

CLUSTER_LABELS = {
    "The Devil Wears Prada 2": {
        0: "Nostalgia Advocates",
        1: "Fashion Insiders",
        2: "Cautious Fans",
        3: "Industry Analysts",
    },
    "Michael": {
        0: "Legacy Believers",
        1: "Music Enthusiasts",
        2: "Critical Observers",
        3: "Cultural Analysts",
    },
}


def build_tfidf_features(texts: pd.Series, max_features: int = 500) -> tuple:
    vectorizer = TfidfVectorizer(
        max_features=max_features,
        ngram_range=(1, 2),
        min_df=2,
        max_df=0.95,
        strip_accents="unicode",
    )
    X = vectorizer.fit_transform(texts)
    return X, vectorizer


def reduce_with_pca(X, n_components: int = 50) -> tuple:
    n_components = min(n_components, X.shape[0] - 1, X.shape[1])
    pca = PCA(n_components=n_components, random_state=42)
    X_dense = X.toarray() if hasattr(X, "toarray") else X
    X_pca = pca.fit_transform(X_dense)
    explained = pca.explained_variance_ratio_.cumsum()
    print(f"    PCA: {n_components} components explain {explained[-1]:.1%} of variance")
    return X_pca, pca


def find_optimal_k(X_pca: np.ndarray, k_range=range(2, 7)) -> int:
    scores = {}
    for k in k_range:
        km = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels = km.fit_predict(X_pca)
        if len(set(labels)) > 1:
            scores[k] = silhouette_score(X_pca, labels)
    best_k = max(scores, key=scores.get)
    print(f"    Silhouette scores: {scores}")
    print(f"    Optimal k = {best_k} (score={scores[best_k]:.4f})")
    return best_k


def cluster_movie(df_movie: pd.DataFrame, movie: str) -> pd.DataFrame:
    print(f"\n  Clustering: {movie}")
    texts = df_movie["text_tokens"].fillna("").astype(str)

    X_tfidf, vectorizer = build_tfidf_features(texts)
    X_pca, pca = reduce_with_pca(X_tfidf, n_components=30)

    best_k = find_optimal_k(X_pca, k_range=range(2, 6))
    best_k = min(best_k, 4)  # Cap at 4 for interpretability

    km = KMeans(n_clusters=best_k, random_state=42, n_init=15)
    cluster_ids = km.fit_predict(X_pca)

    df_movie = df_movie.copy()
    df_movie["cluster_id"] = cluster_ids
    df_movie["pca_x"] = X_pca[:, 0]
    df_movie["pca_y"] = X_pca[:, 1] if X_pca.shape[1] > 1 else 0.0

    movie_labels = CLUSTER_LABELS.get(movie, {})
    df_movie["cluster_label"] = df_movie["cluster_id"].map(
        lambda k: movie_labels.get(k, f"Segment {k}")
    )

    with open(MODELS_DIR / f"vectorizer_{movie[:5].replace(' ','_')}.pkl", "wb") as f:
        pickle.dump(vectorizer, f)
    with open(MODELS_DIR / f"kmeans_{movie[:5].replace(' ','_')}.pkl", "wb") as f:
        pickle.dump(km, f)

    return df_movie


def compute_cluster_profiles(df: pd.DataFrame) -> pd.DataFrame:
    profiles = df.groupby(["movie", "cluster_label"]).agg(
        post_count=("post_id", "count"),
        avg_sentiment=("vader_compound", "mean"),
        avg_engagement=("engagement_score", "mean"),
        avg_likes=("likes", "mean"),
        positive_rate=("sentiment_label", lambda x: (x == "positive").mean()),
        negative_rate=("sentiment_label", lambda x: (x == "negative").mean()),
        avg_hype_signals=("hype_signal_count", "mean"),
        avg_concern_signals=("concern_signal_count", "mean"),
        avg_word_count=("word_count", "mean"),
    ).round(4)

    total = df.groupby("movie")["post_id"].count()
    profiles["cluster_share"] = (
        profiles["post_count"] / profiles.index.get_level_values("movie").map(total)
    ).round(4)

    profiles["audience_excitement_index"] = (
        profiles["avg_sentiment"] * 0.4
        + profiles["positive_rate"] * 0.35
        + (profiles["avg_engagement"] / profiles["avg_engagement"].max()) * 0.25
    ).round(4)

    return profiles


def get_top_terms_per_cluster(df: pd.DataFrame, movie: str, top_n: int = 8) -> dict:
    movie_df = df[df["movie"] == movie]
    top_terms = {}
    for cluster_label in movie_df["cluster_label"].unique():
        cluster_texts = movie_df[movie_df["cluster_label"] == cluster_label]["text_tokens"]
        vectorizer = TfidfVectorizer(max_features=200, ngram_range=(1, 2))
        try:
            X = vectorizer.fit_transform(cluster_texts.fillna(""))
            mean_tfidf = X.mean(axis=0).A1
            terms = vectorizer.get_feature_names_out()
            top_idx = mean_tfidf.argsort()[-top_n:][::-1]
            top_terms[cluster_label] = [terms[i] for i in top_idx]
        except Exception:
            top_terms[cluster_label] = []
    return top_terms


def main():
    print("Running audience clustering...")

    df = pd.read_csv(PROCESSED_DIR / "corpus_sentiment.csv")
    print(f"  Loaded {len(df)} posts")

    clustered_parts = []
    for movie in df["movie"].unique():
        df_movie = df[df["movie"] == movie].copy()
        df_clustered = cluster_movie(df_movie, movie)
        clustered_parts.append(df_clustered)

    df_out = pd.concat(clustered_parts, ignore_index=True)
    df_out.to_csv(PROCESSED_DIR / "corpus_clustered.csv", index=False)
    print(f"\n  Clustered data saved.")

    profiles = compute_cluster_profiles(df_out)
    profiles.to_csv(EXPORTS_DIR / "cluster_profiles.csv")
    print("\n  Cluster Profiles:")
    print(profiles[["post_count", "cluster_share", "avg_sentiment",
                     "positive_rate", "audience_excitement_index"]].to_string())

    all_top_terms = {}
    for movie in df_out["movie"].unique():
        all_top_terms[movie] = get_top_terms_per_cluster(df_out, movie)

    with open(EXPORTS_DIR / "cluster_top_terms.json", "w") as f:
        json.dump(all_top_terms, f, indent=2)
    print("\n  Top terms per cluster saved.")

    pca_export = df_out[["movie", "post_id", "pca_x", "pca_y",
                           "cluster_id", "cluster_label",
                           "vader_compound", "sentiment_label", "engagement_score"]]
    pca_export.to_csv(EXPORTS_DIR / "pca_coordinates.csv", index=False)

    return df_out, profiles


if __name__ == "__main__":
    main()
