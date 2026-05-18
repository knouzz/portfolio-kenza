"""
Script 05 — Visualizations
Generates all portfolio-ready charts. BI-grade aesthetics.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.gridspec as gridspec
import seaborn as sns
import warnings
from pathlib import Path

warnings.filterwarnings("ignore")

EXPORTS_DIR = Path(__file__).parent.parent / "data" / "exports"
CHARTS_DIR = Path(__file__).parent.parent / "charts"
PROCESSED_DIR = Path(__file__).parent.parent / "data" / "processed"
CHARTS_DIR.mkdir(parents=True, exist_ok=True)

# ─── Design system ──────────────────────────────────────────────────────────
PALETTE = {
    "The Devil Wears Prada 2": "#C9A84C",   # Amber gold
    "Michael": "#4C7BC9",                    # Deep blue
    "positive": "#2ECC71",
    "neutral": "#BDC3C7",
    "negative": "#E74C3C",
    "bg": "#0F0F0F",
    "surface": "#1A1A1A",
    "text": "#F0F0F0",
    "subtext": "#A0A0A0",
    "grid": "#2A2A2A",
}

MOVIE_COLORS = [PALETTE["The Devil Wears Prada 2"], PALETTE["Michael"]]
MOVIE_SHORT = {"The Devil Wears Prada 2": "DWP2", "Michael": "Michael"}


def apply_dark_theme():
    plt.rcParams.update({
        "figure.facecolor": PALETTE["bg"],
        "axes.facecolor": PALETTE["surface"],
        "axes.edgecolor": PALETTE["grid"],
        "axes.labelcolor": PALETTE["text"],
        "axes.titlecolor": PALETTE["text"],
        "xtick.color": PALETTE["subtext"],
        "ytick.color": PALETTE["subtext"],
        "text.color": PALETTE["text"],
        "grid.color": PALETTE["grid"],
        "grid.alpha": 0.6,
        "legend.facecolor": PALETTE["surface"],
        "legend.edgecolor": PALETTE["grid"],
        "font.family": "sans-serif",
        "font.size": 11,
    })


def save_chart(fig, name: str):
    path = CHARTS_DIR / f"{name}.png"
    fig.savefig(path, dpi=150, bbox_inches="tight", facecolor=PALETTE["bg"])
    plt.close(fig)
    print(f"  Saved: {path.name}")


# ─── Chart 1: KPI Overview Dashboard ────────────────────────────────────────
def chart_kpi_overview(kpis: pd.DataFrame):
    apply_dark_theme()
    fig = plt.figure(figsize=(16, 6), facecolor=PALETTE["bg"])
    fig.suptitle(
        "Cultural Sentiment Intelligence — KPI Overview",
        fontsize=16, fontweight="bold", color=PALETTE["text"], y=1.02
    )

    movies = kpis.index.tolist()
    metrics = {
        "Avg Sentiment\nScore": "avg_sentiment",
        "Positive Mention\nRate (%)": "positive_mention_pct",
        "Avg Engagement\nScore": "avg_engagement",
        "Audience Excitement\nIndex": "audience_excitement_index",
    }

    gs = gridspec.GridSpec(1, len(metrics), figure=fig, wspace=0.35)

    for col_idx, (label, col) in enumerate(metrics.items()):
        ax = fig.add_subplot(gs[0, col_idx])
        vals = kpis[col].values
        bars = ax.bar(
            [MOVIE_SHORT[m] for m in movies],
            vals,
            color=MOVIE_COLORS,
            width=0.5,
            edgecolor=PALETTE["grid"],
            linewidth=0.8,
        )
        ax.set_title(label, fontsize=10, color=PALETTE["subtext"], pad=8)
        ax.set_ylim(0, max(vals) * 1.3)
        ax.yaxis.grid(True, alpha=0.4)
        ax.set_axisbelow(True)
        ax.tick_params(axis="x", labelsize=9)

        for bar, val in zip(bars, vals):
            ax.text(
                bar.get_x() + bar.get_width() / 2,
                bar.get_height() + max(vals) * 0.02,
                f"{val:.2f}",
                ha="center", va="bottom", fontsize=9, color=PALETTE["text"], fontweight="bold"
            )

    dwp_patch = mpatches.Patch(color=PALETTE["The Devil Wears Prada 2"], label="The Devil Wears Prada 2")
    mj_patch = mpatches.Patch(color=PALETTE["Michael"], label="Michael")
    fig.legend(handles=[dwp_patch, mj_patch], loc="lower center",
               ncol=2, frameon=True, fontsize=10, bbox_to_anchor=(0.5, -0.08))

    save_chart(fig, "01_kpi_overview")


# ─── Chart 2: Sentiment Distribution ────────────────────────────────────────
def chart_sentiment_distribution(df: pd.DataFrame):
    apply_dark_theme()
    fig, axes = plt.subplots(1, 2, figsize=(14, 5), facecolor=PALETTE["bg"])
    fig.suptitle("Sentiment Distribution by Movie", fontsize=15, fontweight="bold",
                 color=PALETTE["text"])

    for ax, (movie, color) in zip(axes, zip(df["movie"].unique(), MOVIE_COLORS)):
        sub = df[df["movie"] == movie]
        sent_counts = sub["sentiment_label"].value_counts()
        labels = ["positive", "neutral", "negative"]
        vals = [sent_counts.get(l, 0) for l in labels]
        pie_colors = [PALETTE["positive"], PALETTE["neutral"], PALETTE["negative"]]

        wedges, texts, autotexts = ax.pie(
            vals, labels=labels, autopct="%1.1f%%",
            colors=pie_colors, startangle=90,
            wedgeprops={"edgecolor": PALETTE["bg"], "linewidth": 2},
            textprops={"color": PALETTE["text"], "fontsize": 10},
        )
        for at in autotexts:
            at.set_fontsize(10)
            at.set_fontweight("bold")
        ax.set_title(movie, fontsize=12, color=color, fontweight="bold", pad=12)

    save_chart(fig, "02_sentiment_distribution")


# ─── Chart 3: Sentiment Over Time ────────────────────────────────────────────
def chart_sentiment_over_time(weekly: pd.DataFrame):
    apply_dark_theme()
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(14, 9), facecolor=PALETTE["bg"],
                                    sharex=False)
    fig.suptitle("Sentiment & Volume Over Time", fontsize=15, fontweight="bold",
                 color=PALETTE["text"])

    for movie, color in zip(weekly["movie"].unique(), MOVIE_COLORS):
        sub = weekly[weekly["movie"] == movie].sort_values("week_start")
        ax1.plot(sub["week_start"], sub["avg_sentiment"], marker="o",
                 color=color, linewidth=2, markersize=5, label=movie)
        ax1.fill_between(sub["week_start"], 0, sub["avg_sentiment"],
                          alpha=0.12, color=color)

    ax1.axhline(0, color=PALETTE["subtext"], linewidth=0.8, linestyle="--", alpha=0.5)
    ax1.set_ylabel("Avg Sentiment (VADER)", color=PALETTE["text"])
    ax1.yaxis.grid(True, alpha=0.4)
    ax1.set_axisbelow(True)
    ax1.legend(fontsize=10)
    ax1.set_title("Weekly Avg Sentiment Score", fontsize=11, color=PALETTE["subtext"])

    bar_width = 2
    weeks = weekly.drop_duplicates("week_start")["week_start"].sort_values().values
    for i, movie in enumerate(weekly["movie"].unique()):
        sub = weekly[weekly["movie"] == movie].sort_values("week_start")
        offset = (i - 0.5) * bar_width
        ax2.bar([str(w)[:10] for w in sub["week_start"]],
                sub["post_volume"], label=movie,
                color=MOVIE_COLORS[i], alpha=0.8, width=0.4)

    ax2.set_ylabel("Post Volume", color=PALETTE["text"])
    ax2.yaxis.grid(True, alpha=0.4)
    ax2.set_axisbelow(True)
    ax2.legend(fontsize=10)
    ax2.set_title("Weekly Post Volume", fontsize=11, color=PALETTE["subtext"])
    ax2.tick_params(axis="x", rotation=30, labelsize=8)

    plt.tight_layout()
    save_chart(fig, "03_sentiment_over_time")


# ─── Chart 4: PCA Cluster Scatter ────────────────────────────────────────────
def chart_pca_clusters(pca_df: pd.DataFrame):
    apply_dark_theme()
    movies = pca_df["movie"].unique()
    fig, axes = plt.subplots(1, len(movies), figsize=(15, 6), facecolor=PALETTE["bg"])
    fig.suptitle("Audience Segmentation — PCA Cluster Map", fontsize=15,
                 fontweight="bold", color=PALETTE["text"])

    cluster_palette = ["#C9A84C", "#4C7BC9", "#E74C3C", "#2ECC71",
                        "#9B59B6", "#F39C12", "#1ABC9C"]

    for ax, movie in zip(axes, movies):
        sub = pca_df[pca_df["movie"] == movie]
        clusters = sub["cluster_label"].unique()

        for i, cluster in enumerate(sorted(clusters)):
            pts = sub[sub["cluster_label"] == cluster]
            ax.scatter(pts["pca_x"], pts["pca_y"],
                       label=cluster, alpha=0.65, s=28,
                       color=cluster_palette[i % len(cluster_palette)],
                       edgecolors="none")

        ax.set_title(movie, fontsize=11, color=PALETTE["text"],
                     fontweight="bold", pad=10)
        ax.set_xlabel("PC1", fontsize=9, color=PALETTE["subtext"])
        ax.set_ylabel("PC2", fontsize=9, color=PALETTE["subtext"])
        ax.xaxis.grid(True, alpha=0.3)
        ax.yaxis.grid(True, alpha=0.3)
        ax.set_axisbelow(True)
        ax.legend(fontsize=8, loc="best", framealpha=0.6)

    plt.tight_layout()
    save_chart(fig, "04_pca_clusters")


# ─── Chart 5: Cluster Profiles Heatmap ──────────────────────────────────────
def chart_cluster_heatmap(profiles: pd.DataFrame):
    apply_dark_theme()
    fig, axes = plt.subplots(1, 2, figsize=(16, 6), facecolor=PALETTE["bg"])
    fig.suptitle("Audience Cluster Profiles — Multi-Metric Heatmap",
                 fontsize=15, fontweight="bold", color=PALETTE["text"])

    metrics = ["avg_sentiment", "positive_rate", "avg_engagement",
                "avg_hype_signals", "audience_excitement_index"]
    metric_labels = ["Avg Sentiment", "Positive Rate", "Avg Engagement",
                      "Hype Signals", "Excitement Index"]

    for ax, movie in zip(axes, profiles.index.get_level_values("movie").unique()):
        sub = profiles.loc[movie][metrics].copy()
        sub.columns = metric_labels

        normalized = (sub - sub.min()) / (sub.max() - sub.min() + 1e-9)

        sns.heatmap(
            normalized,
            ax=ax,
            cmap="YlOrBr",
            annot=sub.round(3).values,
            fmt="",
            linewidths=0.5,
            linecolor=PALETTE["bg"],
            cbar_kws={"shrink": 0.7},
            annot_kws={"size": 9, "color": PALETTE["bg"]},
        )
        ax.set_title(movie, fontsize=11, color=PALETTE["text"],
                     fontweight="bold", pad=10)
        ax.tick_params(axis="x", rotation=30, labelsize=8)
        ax.tick_params(axis="y", rotation=0, labelsize=9)

    plt.tight_layout()
    save_chart(fig, "05_cluster_heatmap")


# ─── Chart 6: Engagement vs Sentiment Scatter ────────────────────────────────
def chart_engagement_vs_sentiment(df: pd.DataFrame):
    apply_dark_theme()
    fig, ax = plt.subplots(figsize=(12, 7), facecolor=PALETTE["bg"])
    fig.suptitle("Engagement Score vs Sentiment — by Movie",
                 fontsize=15, fontweight="bold", color=PALETTE["text"])

    for movie, color in zip(df["movie"].unique(), MOVIE_COLORS):
        sub = df[df["movie"] == movie].sample(min(300, len(df)), random_state=42)
        ax.scatter(sub["vader_compound"], sub["engagement_score"],
                   c=color, alpha=0.45, s=22, label=movie, edgecolors="none")

    ax.axvline(0, color=PALETTE["subtext"], linewidth=0.8, linestyle="--", alpha=0.5)
    ax.set_xlabel("Sentiment Score (VADER Compound)", fontsize=11, color=PALETTE["text"])
    ax.set_ylabel("Engagement Score (log-scaled)", fontsize=11, color=PALETTE["text"])
    ax.xaxis.grid(True, alpha=0.3)
    ax.yaxis.grid(True, alpha=0.3)
    ax.set_axisbelow(True)
    ax.legend(fontsize=10)

    ax.text(0.65, ax.get_ylim()[1] * 0.92, "High Positive\n& High Engagement",
            fontsize=9, color=PALETTE["positive"], alpha=0.7)
    ax.text(-0.95, ax.get_ylim()[1] * 0.92, "High Negative\n& High Engagement",
            fontsize=9, color=PALETTE["negative"], alpha=0.7)

    save_chart(fig, "06_engagement_vs_sentiment")


# ─── Chart 7: Platform Performance ──────────────────────────────────────────
def chart_platform_sentiment(platform_df: pd.DataFrame):
    apply_dark_theme()
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6), facecolor=PALETTE["bg"])
    fig.suptitle("Sentiment by Platform", fontsize=15, fontweight="bold",
                 color=PALETTE["text"])

    for ax, movie, color in zip([ax1, ax2], platform_df["movie"].unique(), MOVIE_COLORS):
        sub = platform_df[platform_df["movie"] == movie].sort_values("avg_sentiment")
        bars = ax.barh(sub["platform"], sub["avg_sentiment"],
                        color=[PALETTE["positive"] if v >= 0 else PALETTE["negative"]
                               for v in sub["avg_sentiment"]],
                        edgecolor=PALETTE["bg"], linewidth=0.5)
        ax.axvline(0, color=PALETTE["subtext"], linewidth=0.8, linestyle="--")
        ax.set_xlabel("Avg Sentiment Score", fontsize=10)
        ax.set_title(movie, fontsize=11, color=color, fontweight="bold")
        ax.xaxis.grid(True, alpha=0.3)
        ax.set_axisbelow(True)

        for bar, val in zip(bars, sub["avg_sentiment"]):
            ax.text(val + 0.01 if val >= 0 else val - 0.01,
                    bar.get_y() + bar.get_height() / 2,
                    f"{val:.3f}", va="center",
                    ha="left" if val >= 0 else "right",
                    fontsize=8.5, color=PALETTE["text"])

    plt.tight_layout()
    save_chart(fig, "07_platform_sentiment")


# ─── Chart 8: Excitement Index Comparison ───────────────────────────────────
def chart_excitement_index(kpis: pd.DataFrame):
    apply_dark_theme()
    fig, ax = plt.subplots(figsize=(10, 5), facecolor=PALETTE["bg"])
    fig.suptitle("Audience Excitement Index — Composite Score",
                 fontsize=15, fontweight="bold", color=PALETTE["text"])

    movies = [MOVIE_SHORT[m] for m in kpis.index]
    vals = kpis["audience_excitement_index"].values

    bars = ax.bar(movies, vals, color=MOVIE_COLORS, width=0.4,
                   edgecolor=PALETTE["grid"], linewidth=0.8)

    for bar, val in zip(bars, vals):
        ax.text(bar.get_x() + bar.get_width() / 2,
                bar.get_height() + 0.005,
                f"{val:.3f}", ha="center", va="bottom",
                fontsize=13, color=PALETTE["text"], fontweight="bold")

    ax.set_ylabel("Excitement Index (0–1 scale)", color=PALETTE["text"], fontsize=11)
    ax.set_ylim(0, max(vals) * 1.3)
    ax.yaxis.grid(True, alpha=0.4)
    ax.set_axisbelow(True)

    formula = "Index = (Avg Sentiment × 0.4) + (Positive Rate × 0.35) + (Normalized Engagement × 0.25)"
    ax.text(0.5, -0.18, formula, transform=ax.transAxes,
            ha="center", fontsize=8, color=PALETTE["subtext"], style="italic")

    winner_idx = int(np.argmax(vals))
    ax.text(winner_idx, vals[winner_idx] * 1.12, "★ WINNER",
            ha="center", fontsize=10, color="#FFD700", fontweight="bold")

    save_chart(fig, "08_excitement_index")


# ─── Chart 9: Hype vs Concern Signal ────────────────────────────────────────
def chart_hype_vs_concern(df: pd.DataFrame):
    apply_dark_theme()
    fig, ax = plt.subplots(figsize=(11, 6), facecolor=PALETTE["bg"])
    fig.suptitle("Hype Signals vs Concern Signals by Movie",
                 fontsize=15, fontweight="bold", color=PALETTE["text"])

    movies = df["movie"].unique()
    x = np.arange(len(movies))
    width = 0.3

    hype_vals = [df[df["movie"] == m]["hype_signal_count"].mean() for m in movies]
    concern_vals = [df[df["movie"] == m]["concern_signal_count"].mean() for m in movies]

    ax.bar(x - width / 2, hype_vals, width, label="Avg Hype Signals",
            color=PALETTE["positive"], alpha=0.85, edgecolor=PALETTE["bg"])
    ax.bar(x + width / 2, concern_vals, width, label="Avg Concern Signals",
            color=PALETTE["negative"], alpha=0.85, edgecolor=PALETTE["bg"])

    ax.set_xticks(x)
    ax.set_xticklabels([MOVIE_SHORT[m] for m in movies], fontsize=11)
    ax.set_ylabel("Avg Signal Count per Post", fontsize=11)
    ax.yaxis.grid(True, alpha=0.4)
    ax.set_axisbelow(True)
    ax.legend(fontsize=10)

    for i, (h, c) in enumerate(zip(hype_vals, concern_vals)):
        ax.text(i - width / 2, h + 0.01, f"{h:.2f}", ha="center",
                fontsize=9, color=PALETTE["text"])
        ax.text(i + width / 2, c + 0.01, f"{c:.2f}", ha="center",
                fontsize=9, color=PALETTE["text"])

    save_chart(fig, "09_hype_vs_concern")


def main():
    print("Generating visualizations...")

    kpis = pd.read_csv(EXPORTS_DIR / "kpi_summary.csv", index_col="movie")
    df = pd.read_csv(PROCESSED_DIR / "corpus_clustered.csv")
    weekly = pd.read_csv(EXPORTS_DIR / "sentiment_over_time.csv")
    pca_df = pd.read_csv(EXPORTS_DIR / "pca_coordinates.csv")
    platform_df = pd.read_csv(EXPORTS_DIR / "platform_sentiment.csv")
    profiles = pd.read_csv(EXPORTS_DIR / "cluster_profiles.csv",
                            index_col=["movie", "cluster_label"])

    chart_kpi_overview(kpis)
    chart_sentiment_distribution(df)
    chart_sentiment_over_time(weekly)
    chart_pca_clusters(pca_df)
    chart_cluster_heatmap(profiles)
    chart_engagement_vs_sentiment(df)
    chart_platform_sentiment(platform_df)
    chart_excitement_index(kpis)
    chart_hype_vs_concern(df)

    print(f"\n  All charts saved to: {CHARTS_DIR}")


if __name__ == "__main__":
    main()
