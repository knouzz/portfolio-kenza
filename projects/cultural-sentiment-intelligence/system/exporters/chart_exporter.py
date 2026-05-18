"""
Exporter: Chart Exporter
Generates all portfolio-grade dark-theme visualizations from processed data.
"""

import warnings
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.gridspec as gridspec
import seaborn as sns
from pathlib import Path

warnings.filterwarnings("ignore")

CHARTS_DIR  = Path(__file__).parent.parent.parent / "charts"
EXPORTS_DIR = Path(__file__).parent.parent.parent / "data" / "exports"
CHARTS_DIR.mkdir(parents=True, exist_ok=True)

P = {
    "dwp":     "#C9A84C",
    "mj":      "#4C7BC9",
    "pos":     "#2ECC71",
    "neu":     "#7F8C8D",
    "neg":     "#E74C3C",
    "bg":      "#0D0D0D",
    "surface": "#161616",
    "border":  "#252525",
    "text":    "#EBEBEB",
    "sub":     "#888888",
    "accent":  "#C9A84C",
}
MOVIE_COLORS = {"The Devil Wears Prada 2": P["dwp"], "Michael": P["mj"]}
MOVIE_SHORT  = {"The Devil Wears Prada 2": "DWP2", "Michael": "Michael"}


def _theme():
    plt.rcParams.update({
        "figure.facecolor": P["bg"], "axes.facecolor": P["surface"],
        "axes.edgecolor": P["border"], "axes.labelcolor": P["text"],
        "xtick.color": P["sub"], "ytick.color": P["sub"],
        "text.color": P["text"], "grid.color": P["border"],
        "grid.alpha": 0.5, "legend.facecolor": P["surface"],
        "legend.edgecolor": P["border"], "font.family": "sans-serif",
        "font.size": 11, "axes.titlesize": 12,
    })


def _save(fig, name: str):
    path = CHARTS_DIR / f"{name}.png"
    fig.savefig(path, dpi=150, bbox_inches="tight", facecolor=P["bg"])
    plt.close(fig)
    print(f"    {path.name}")


def chart_excitement_index(kpis: pd.DataFrame):
    _theme()
    movies = [MOVIE_SHORT[m] for m in kpis.index]
    vals   = kpis["audience_excitement_index"].values
    colors = [MOVIE_COLORS.get(m, P["dwp"]) for m in kpis.index]

    fig, ax = plt.subplots(figsize=(9, 5), facecolor=P["bg"])
    bars = ax.bar(movies, vals, color=colors, width=0.45, edgecolor=P["bg"], linewidth=0)

    for bar, val in zip(bars, vals):
        ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.008,
                f"{val:.3f}", ha="center", fontsize=13, fontweight="bold", color=P["text"])

    winner_idx = int(np.argmax(vals))
    ax.text(winner_idx, vals[winner_idx] * 1.14, "★", ha="center", fontsize=14, color="#FFD700")

    ax.set_ylim(0, max(vals) * 1.3)
    ax.set_ylabel("Excitement Index", color=P["sub"], fontsize=10)
    ax.set_title("Audience Excitement Index", color=P["text"], fontweight="bold", pad=12)
    ax.yaxis.grid(True, alpha=0.3); ax.set_axisbelow(True)
    ax.text(0.5, -0.14, "Composite: Sentiment (40%) + Positive Rate (35%) + Engagement (25%)",
            transform=ax.transAxes, ha="center", fontsize=8, color=P["sub"], style="italic")
    _save(fig, "01_excitement_index")


def chart_sentiment_breakdown(kpis: pd.DataFrame):
    _theme()
    fig, axes = plt.subplots(1, 2, figsize=(13, 5), facecolor=P["bg"])
    fig.suptitle("Sentiment Breakdown by Movie", fontsize=14, fontweight="bold",
                 color=P["text"], y=1.01)

    for ax, movie in zip(axes, kpis.index):
        pos = float(kpis.loc[movie, "positive_mention_pct"])
        neg = float(kpis.loc[movie, "negative_mention_pct"])
        neu = round(100 - pos - neg, 1)
        vals   = [pos, neu, neg]
        labels = ["Positive", "Neutral", "Negative"]
        colors = [P["pos"], P["neu"], P["neg"]]
        wedges, _, autotexts = ax.pie(
            vals, labels=labels, colors=colors, autopct="%1.1f%%",
            startangle=90,
            wedgeprops={"edgecolor": P["bg"], "linewidth": 2},
            textprops={"color": P["text"], "fontsize": 10},
        )
        for at in autotexts: at.set_fontweight("bold")
        ax.set_title(movie, color=MOVIE_COLORS.get(movie, P["accent"]),
                     fontweight="bold", fontsize=11, pad=10)
    _save(fig, "02_sentiment_breakdown")


def chart_sentiment_over_time(weekly: pd.DataFrame):
    _theme()
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(14, 9), facecolor=P["bg"])
    fig.suptitle("Sentiment & Volume Over Time", fontsize=14, fontweight="bold",
                 color=P["text"])

    for movie in weekly["movie"].unique():
        sub = weekly[weekly["movie"] == movie].sort_values("week_start")
        c   = MOVIE_COLORS.get(movie, P["dwp"])
        ax1.plot(range(len(sub)), sub["avg_sentiment"], marker="o",
                 color=c, lw=2, ms=5, label=movie)
        ax1.fill_between(range(len(sub)), 0, sub["avg_sentiment"], alpha=0.1, color=c)

    ax1.axhline(0, color=P["sub"], lw=0.8, ls="--", alpha=0.5)
    ax1.set_ylabel("Avg Sentiment Score", color=P["sub"], fontsize=10)
    ax1.set_title("Weekly Sentiment Score", fontsize=11, color=P["sub"])
    ax1.yaxis.grid(True, alpha=0.3); ax1.set_axisbelow(True)
    ax1.legend(fontsize=10)

    x = np.arange(weekly["week_start"].nunique())
    movies = list(weekly["movie"].unique())
    w = 0.35
    for i, movie in enumerate(movies):
        sub  = weekly[weekly["movie"] == movie].sort_values("week_start")
        xpos = np.arange(len(sub)) + (i - 0.5) * w
        ax2.bar(xpos, sub["post_volume"], width=w, label=movie,
                color=MOVIE_COLORS.get(movie, P["dwp"]), alpha=0.85)

    ax2.set_ylabel("Post Volume", color=P["sub"], fontsize=10)
    ax2.set_title("Weekly Post Volume", fontsize=11, color=P["sub"])
    ax2.yaxis.grid(True, alpha=0.3); ax2.set_axisbelow(True)
    ax2.legend(fontsize=10)
    plt.tight_layout()
    _save(fig, "03_sentiment_over_time")


def chart_archetype_scatter(pca_df: pd.DataFrame):
    _theme()
    movies = pca_df["movie"].unique()
    fig, axes = plt.subplots(1, len(movies), figsize=(15, 6), facecolor=P["bg"])
    fig.suptitle("Audience Archetype Map — PCA", fontsize=14, fontweight="bold", color=P["text"])

    cluster_palette = ["#C9A84C","#4C7BC9","#E74C3C","#2ECC71","#9B59B6","#F39C12"]
    arch_col = "archetype" if "archetype" in pca_df.columns else "cluster_label"

    for ax, movie in zip(axes, movies):
        sub = pca_df[pca_df["movie"] == movie]
        for i, arch in enumerate(sorted(sub[arch_col].unique())):
            pts = sub[sub[arch_col] == arch]
            ax.scatter(pts["pca_x"], pts["pca_y"], label=arch, alpha=0.65,
                       s=28, color=cluster_palette[i % len(cluster_palette)],
                       edgecolors="none")
        ax.set_title(movie, fontsize=10, color=P["text"], fontweight="bold", pad=8)
        ax.set_xlabel("PC1", fontsize=9, color=P["sub"])
        ax.set_ylabel("PC2", fontsize=9, color=P["sub"])
        ax.xaxis.grid(True, alpha=0.25); ax.yaxis.grid(True, alpha=0.25)
        ax.set_axisbelow(True)
        ax.legend(fontsize=7.5, framealpha=0.5)
    plt.tight_layout()
    _save(fig, "04_archetype_scatter")


def chart_theme_bars(themes: dict):
    _theme()
    movies = list(themes.keys())
    fig, axes = plt.subplots(1, len(movies), figsize=(16, 6), facecolor=P["bg"])
    fig.suptitle("Narrative Theme Distribution", fontsize=14, fontweight="bold", color=P["text"])

    for ax, movie in zip(axes, movies):
        data   = themes[movie]["themes"]
        labels = [t["label"] for t in data]
        shares = [t["share"] * 100 for t in data]
        sents  = [t["avg_sentiment"] for t in data]
        colors = [P["pos"] if s > 0.05 else P["neg"] if s < -0.05 else P["neu"] for s in sents]

        bars = ax.barh(labels, shares, color=colors, alpha=0.85, edgecolor=P["bg"])
        for bar, val in zip(bars, shares):
            ax.text(val + 0.5, bar.get_y() + bar.get_height() / 2,
                    f"{val:.1f}%", va="center", fontsize=9, color=P["text"])
        ax.set_xlabel("Share of Posts (%)", fontsize=9, color=P["sub"])
        ax.set_title(movie, fontsize=10, color=MOVIE_COLORS.get(movie, P["accent"]),
                     fontweight="bold", pad=8)
        ax.xaxis.grid(True, alpha=0.3); ax.set_axisbelow(True)

    pos_p = mpatches.Patch(color=P["pos"], label="Positive sentiment theme")
    neg_p = mpatches.Patch(color=P["neg"], label="Negative sentiment theme")
    neu_p = mpatches.Patch(color=P["neu"], label="Neutral sentiment theme")
    fig.legend(handles=[pos_p, neu_p, neg_p], loc="lower center", ncol=3,
               fontsize=9, bbox_to_anchor=(0.5, -0.06), framealpha=0.5)
    plt.tight_layout()
    _save(fig, "05_theme_distribution")


def chart_kpi_comparison(kpis: pd.DataFrame):
    _theme()
    metrics = {
        "Avg Sentiment":       "avg_sentiment",
        "Positive Rate (%)":   "positive_mention_pct",
        "Avg Engagement":      "avg_engagement",
        "Excitement Index":    "audience_excitement_index",
    }
    movies = kpis.index.tolist()
    fig = plt.figure(figsize=(16, 5), facecolor=P["bg"])
    fig.suptitle("KPI Comparison — Side by Side", fontsize=14, fontweight="bold",
                 color=P["text"], y=1.02)
    gs = gridspec.GridSpec(1, len(metrics), figure=fig, wspace=0.35)

    for col_idx, (label, col) in enumerate(metrics.items()):
        ax   = fig.add_subplot(gs[0, col_idx])
        vals = kpis[col].values
        bars = ax.bar([MOVIE_SHORT.get(m, m) for m in movies], vals,
                      color=[MOVIE_COLORS.get(m, P["dwp"]) for m in movies],
                      width=0.5, edgecolor=P["bg"])
        ax.set_title(label, fontsize=9, color=P["sub"], pad=8)
        ax.set_ylim(0, max(vals) * 1.3)
        ax.yaxis.grid(True, alpha=0.3); ax.set_axisbelow(True)
        ax.tick_params(axis="x", labelsize=9)
        for bar, val in zip(bars, vals):
            ax.text(bar.get_x() + bar.get_width() / 2,
                    bar.get_height() + max(vals) * 0.025,
                    f"{val:.2f}", ha="center", fontsize=9,
                    color=P["text"], fontweight="bold")

    dwp_p = mpatches.Patch(color=P["dwp"], label="The Devil Wears Prada 2")
    mj_p  = mpatches.Patch(color=P["mj"],  label="Michael")
    fig.legend(handles=[dwp_p, mj_p], loc="lower center", ncol=2,
               fontsize=10, bbox_to_anchor=(0.5, -0.1), frameon=True)
    _save(fig, "06_kpi_comparison")


def chart_engagement_sentiment(df: pd.DataFrame):
    _theme()
    fig, ax = plt.subplots(figsize=(12, 7), facecolor=P["bg"])
    fig.suptitle("Engagement vs Sentiment", fontsize=14, fontweight="bold", color=P["text"])

    for movie in df["movie"].unique():
        sub = df[df["movie"] == movie].sample(min(300, len(df)), random_state=42)
        ax.scatter(sub["vader_compound"], sub["engagement_score"],
                   c=MOVIE_COLORS.get(movie, P["dwp"]), alpha=0.40,
                   s=20, label=movie, edgecolors="none")

    ax.axvline(0, color=P["sub"], lw=0.8, ls="--", alpha=0.5)
    ax.set_xlabel("Sentiment Score (VADER)", fontsize=11)
    ax.set_ylabel("Engagement Score (log)", fontsize=11)
    ax.xaxis.grid(True, alpha=0.25); ax.yaxis.grid(True, alpha=0.25)
    ax.set_axisbelow(True); ax.legend(fontsize=10)
    _save(fig, "07_engagement_sentiment")


def chart_signal_alerts(monitor: dict):
    _theme()
    alerts = monitor.get("alerts", [])
    if not alerts:
        return

    df = pd.DataFrame(alerts)
    type_counts = df["type"].value_counts()
    severity_counts = df["severity"].value_counts()

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5), facecolor=P["bg"])
    fig.suptitle("Signal Monitor — Alert Summary", fontsize=14, fontweight="bold", color=P["text"])

    colors1 = [P["pos"], P["neg"], P["dwp"]][:len(type_counts)]
    ax1.bar(type_counts.index, type_counts.values, color=colors1, edgecolor=P["bg"])
    ax1.set_title("Alerts by Type", fontsize=11, color=P["sub"])
    ax1.yaxis.grid(True, alpha=0.3); ax1.set_axisbelow(True)
    ax1.tick_params(axis="x", rotation=15)

    colors2 = [P["neg"], P["dwp"]][:len(severity_counts)]
    ax2.bar(severity_counts.index, severity_counts.values, color=colors2, edgecolor=P["bg"])
    ax2.set_title("Alerts by Severity", fontsize=11, color=P["sub"])
    ax2.yaxis.grid(True, alpha=0.3); ax2.set_axisbelow(True)

    plt.tight_layout()
    _save(fig, "08_signal_alerts")


def run(df: pd.DataFrame, kpis: pd.DataFrame, weekly: pd.DataFrame,
        pca_df: pd.DataFrame, themes: dict, monitor: dict):
    print("  Chart exporter running...")
    chart_excitement_index(kpis)
    chart_sentiment_breakdown(kpis)
    chart_sentiment_over_time(weekly)
    chart_archetype_scatter(pca_df)
    chart_theme_bars(themes)
    chart_kpi_comparison(kpis)
    chart_engagement_sentiment(df)
    chart_signal_alerts(monitor)
    print(f"    8 charts saved to {CHARTS_DIR}")
