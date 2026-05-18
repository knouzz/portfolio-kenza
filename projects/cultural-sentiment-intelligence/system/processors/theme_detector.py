"""
Processor: Theme Detector
Extracts recurring narratives using TF-IDF + LDA topic modeling.
Produces named themes with representative keywords and post counts.
"""

import json
import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation

EXPORTS_DIR   = Path(__file__).parent.parent.parent / "data" / "exports"
PROCESSED_DIR = Path(__file__).parent.parent.parent / "data" / "processed"
EXPORTS_DIR.mkdir(parents=True, exist_ok=True)

N_THEMES    = 5
TOP_WORDS   = 8
MAX_FEATURES = 300

THEME_LABELS = {
    "The Devil Wears Prada 2": [
        "Nostalgia & Legacy",
        "Fashion & Aesthetic",
        "Sequel Skepticism",
        "Star Power (Meryl Streep)",
        "Industry Commentary",
    ],
    "Michael": [
        "Musical Legacy",
        "Controversy & Allegations",
        "Biopic Authenticity",
        "Cultural Impact",
        "Family & Casting",
    ],
}

STOPWORDS = {
    "the","a","an","and","or","but","in","on","at","to","for","of","with","by","is",
    "it","this","that","be","are","was","were","have","has","had","do","does","did",
    "will","would","could","should","i","me","my","we","you","your","he","she","they",
    "them","their","just","so","if","not","no","its","from","as","about","into","than",
    "there","here","what","how","when","who","which","can","all","one","been","also",
    "more","very","get","got","now","already","still","even","much","some","any","up",
    "out","going","go","need","feel","way","think","know","movie","film","watch","see",
}


def _fit_lda(texts: pd.Series) -> tuple:
    vec = CountVectorizer(
        max_features=MAX_FEATURES,
        stop_words=list(STOPWORDS),
        ngram_range=(1, 2),
        min_df=2,
    )
    X = vec.fit_transform(texts.fillna(""))
    lda = LatentDirichletAllocation(
        n_components=N_THEMES,
        random_state=42,
        max_iter=20,
        learning_method="batch",
    )
    lda.fit(X)
    return vec, lda, X


def _top_words_per_theme(lda, vectorizer, n: int = TOP_WORDS) -> list[list[str]]:
    terms = vectorizer.get_feature_names_out()
    return [
        [terms[i] for i in comp.argsort()[-n:][::-1]]
        for comp in lda.components_
    ]


def _tfidf_theme_summary(texts: pd.Series, top_n: int = 12) -> list[str]:
    vec = TfidfVectorizer(
        max_features=200,
        stop_words=list(STOPWORDS),
        ngram_range=(1, 2),
    )
    try:
        X = vec.fit_transform(texts.fillna(""))
        mean_scores = X.mean(axis=0).A1
        terms = vec.get_feature_names_out()
        top_idx = mean_scores.argsort()[-top_n:][::-1]
        return [terms[i] for i in top_idx]
    except Exception:
        return []


def detect_themes(df: pd.DataFrame) -> dict:
    results = {}
    col = "text_clean" if "text_clean" in df.columns else "text"

    for movie in df["movie"].unique():
        sub = df[df["movie"] == movie]
        texts = sub[col].fillna("").astype(str)

        print(f"    Theme detection → {movie}")
        vec, lda, X = _fit_lda(texts)
        top_words   = _top_words_per_theme(lda, vec)
        labels      = THEME_LABELS.get(movie, [f"Theme {i}" for i in range(N_THEMES)])

        doc_topics  = lda.transform(X)
        dominant    = doc_topics.argmax(axis=1)

        themes = []
        for i in range(N_THEMES):
            mask        = dominant == i
            theme_texts = sub.iloc[mask]
            avg_sent    = (
                float(theme_texts["vader_compound"].mean())
                if "vader_compound" in theme_texts.columns
                else 0.0
            )
            themes.append({
                "theme_id":    i,
                "label":       labels[i] if i < len(labels) else f"Theme {i}",
                "keywords":    top_words[i],
                "post_count":  int(mask.sum()),
                "share":       round(float(mask.mean()), 4),
                "avg_sentiment": round(avg_sent, 4),
                "dominant_signal": top_words[i][0] if top_words[i] else "",
            })

        global_keywords = _tfidf_theme_summary(texts)
        results[movie]  = {
            "themes":          themes,
            "global_keywords": global_keywords,
            "n_posts":         len(sub),
        }
        print(f"      {N_THEMES} themes extracted")

    return results


def run(df: pd.DataFrame) -> dict:
    print("  Theme detector running...")
    themes = detect_themes(df)

    out = EXPORTS_DIR / "theme_analysis.json"
    with open(out, "w") as f:
        json.dump(themes, f, indent=2)
    print(f"    Saved: {out}")

    # Flat export for dashboard
    rows = []
    for movie, data in themes.items():
        for t in data["themes"]:
            rows.append({
                "movie":          movie,
                "theme_id":       t["theme_id"],
                "theme_label":    t["label"],
                "keywords":       ", ".join(t["keywords"]),
                "post_count":     t["post_count"],
                "share":          t["share"],
                "avg_sentiment":  t["avg_sentiment"],
            })
    flat = pd.DataFrame(rows)
    flat.to_csv(EXPORTS_DIR / "themes_flat.csv", index=False)

    return themes
