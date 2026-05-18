"""
Script 06 — Export Insights
Generates the final narrative report and BI-ready export tables.
"""

import pandas as pd
import numpy as np
import json
from pathlib import Path
from datetime import datetime

EXPORTS_DIR = Path(__file__).parent.parent / "data" / "exports"
REPORTS_DIR = Path(__file__).parent.parent / "reports"
PROCESSED_DIR = Path(__file__).parent.parent / "data" / "processed"
REPORTS_DIR.mkdir(parents=True, exist_ok=True)


def load_all_data():
    kpis = pd.read_csv(EXPORTS_DIR / "kpi_summary.csv", index_col="movie")
    df = pd.read_csv(PROCESSED_DIR / "corpus_clustered.csv")
    profiles = pd.read_csv(EXPORTS_DIR / "cluster_profiles.csv",
                            index_col=["movie", "cluster_label"])
    with open(EXPORTS_DIR / "cluster_top_terms.json") as f:
        top_terms = json.load(f)
    return kpis, df, profiles, top_terms


def determine_winner(kpis: pd.DataFrame) -> tuple[str, str]:
    idx = kpis["audience_excitement_index"]
    winner = idx.idxmax()
    runner_up = idx.idxmin()
    margin = float(idx.max() - idx.min())
    return winner, runner_up, margin


def generate_report(kpis, df, profiles, top_terms) -> str:
    winner, runner_up, margin = determine_winner(kpis)
    now = datetime.now().strftime("%B %d, %Y")

    dwp = "The Devil Wears Prada 2"
    mj = "Michael"

    dwp_kpi = kpis.loc[dwp]
    mj_kpi = kpis.loc[mj]

    dwp_pos = float(dwp_kpi["positive_mention_pct"])
    mj_pos = float(mj_kpi["positive_mention_pct"])
    dwp_sent = float(dwp_kpi["avg_sentiment"])
    mj_sent = float(mj_kpi["avg_sentiment"])
    dwp_exc = float(dwp_kpi["audience_excitement_index"])
    mj_exc = float(mj_kpi["audience_excitement_index"])
    dwp_posts = int(dwp_kpi["total_posts"])
    mj_posts = int(mj_kpi["total_posts"])

    dwp_clusters = profiles.loc[dwp] if dwp in profiles.index.get_level_values("movie") else pd.DataFrame()
    mj_clusters = profiles.loc[mj] if mj in profiles.index.get_level_values("movie") else pd.DataFrame()

    report = f"""# Cultural Sentiment Intelligence
## Final Analysis Report

**Project:** Cultural Sentiment Intelligence — Social Listening & Audience Analysis
**Analyst:** Kenza En-Nassef
**Date:** {now}
**Status:** Final

---

## Executive Summary

This report analyzes audience sentiment, engagement, and segmentation across **{dwp_posts + mj_posts:,} social media posts** comparing pre-release audience perception for two highly anticipated films: *The Devil Wears Prada 2* and *Michael*.

> **Key Finding:** *{winner}* leads in audience excitement with an Excitement Index of **{max(dwp_exc, mj_exc):.3f}** vs **{min(dwp_exc, mj_exc):.3f}** for *{runner_up}* — a margin of **{margin:.3f}** points.

---

## Business Question

**Does online hype translate into positive audience perception — and which movie has a more excited, engaged audience?**

**Answer:** Volume of discussion does not automatically correlate with sentiment quality. This analysis reveals distinct audience dynamics: *{dwp}* benefits from nostalgia-driven positive sentiment, while *{mj}* generates higher emotional intensity but with more polarized reactions.

---

## KPI Summary

| Metric | {dwp[:20]}... | Michael |
|--------|--------------|---------|
| Total Posts Analyzed | {dwp_posts:,} | {mj_posts:,} |
| Avg Sentiment Score | {dwp_sent:+.4f} | {mj_sent:+.4f} |
| Positive Mention Rate | {dwp_pos:.1f}% | {mj_pos:.1f}% |
| Avg Engagement Score | {dwp_kpi['avg_engagement']:.3f} | {mj_kpi['avg_engagement']:.3f} |
| Audience Excitement Index | **{dwp_exc:.3f}** | **{mj_exc:.3f}** |

---

## Sentiment Analysis Findings

### The Devil Wears Prada 2
- Sentiment profile: **{dwp_pos:.0f}% positive, {dwp_kpi['negative_mention_pct']:.0f}% negative, {100-dwp_pos-float(dwp_kpi['negative_mention_pct']):.0f}% neutral**
- Dominant narrative themes: **nostalgia, fashion industry prestige, Meryl Streep cultural authority**
- The sequel's core strength is emotional safety — audiences know and love this IP
- Skepticism is present but frames itself as "protective love" rather than outright opposition
- Key risk: pressure to exceed a beloved original; audience expectations are set at a premium level

### Michael
- Sentiment profile: **{mj_pos:.0f}% positive, {mj_kpi['negative_mention_pct']:.0f}% negative, {100-mj_pos-float(mj_kpi['negative_mention_pct']):.0f}% neutral**
- Dominant narrative themes: **legacy, music catalog, controversy navigation, Jaafar Jackson casting**
- Generates highest emotional intensity — the MJ brand elicits strong reactions across the spectrum
- The controversy layer adds a structural floor of negative sentiment that is difficult to neutralize
- Key strength: universal music appeal transcends demographic boundaries internationally

---

## Audience Segmentation

### The Devil Wears Prada 2 — Cluster Profiles
"""

    if not dwp_clusters.empty:
        for cluster_name, row in dwp_clusters.iterrows():
            terms = top_terms.get(dwp, {}).get(cluster_name, [])
            report += f"""
**{cluster_name}**
- Share: {row['cluster_share']*100:.1f}% of audience | Avg Sentiment: {row['avg_sentiment']:+.3f} | Excitement Index: {row['audience_excitement_index']:.3f}
- Top language signals: {', '.join(terms[:5]) if terms else 'N/A'}
"""

    report += """
### Michael — Cluster Profiles
"""

    if not mj_clusters.empty:
        for cluster_name, row in mj_clusters.iterrows():
            terms = top_terms.get(mj, {}).get(cluster_name, [])
            report += f"""
**{cluster_name}**
- Share: {row['cluster_share']*100:.1f}% of audience | Avg Sentiment: {row['avg_sentiment']:+.3f} | Excitement Index: {row['audience_excitement_index']:.3f}
- Top language signals: {', '.join(terms[:5]) if terms else 'N/A'}
"""

    report += f"""
---

## Strategic Insights

### 1. Hype ≠ Positive Sentiment
High post volume signals cultural relevance but does not guarantee positive audience reception. *Michael* generates heated debate — marketers must distinguish between attention and affinity.

### 2. The Nostalgia Advantage
*The Devil Wears Prada 2* benefits from pre-built emotional equity. Audiences are "rooting for" the film rather than skeptically evaluating it. This creates a more forgiving launch environment.

### 3. Controversy as Double-Edged Amplifier
*Michael*'s controversy drives engagement metrics while simultaneously anchoring negative sentiment. The marketing challenge is converting cultural awareness into box office attendance.

### 4. Audience Segmentation Implications
- **DWP2** should target the Nostalgia Advocates and Fashion Insiders clusters with prestige/cultural positioning
- **Michael** should activate the Music Enthusiasts cluster first — they are the most sentiment-stable segment

### 5. Platform Strategy
Platform-level sentiment variation indicates audiences behave differently by channel. Reddit skews analytical; TikTok/Instagram skew emotional. Platform-specific creative executions will outperform blanket campaigns.

---

## Methodology Note

**Data:** {dwp_posts + mj_posts:,} simulated social posts designed to reflect real discussion patterns on Reddit, Twitter/X, TikTok comments, YouTube comments, and Instagram (Aug–Nov 2025).
**Sentiment:** VADER rule-based compound scoring (range: -1 to +1).
**Clustering:** TF-IDF vectorization → PCA (50 components) → K-Means (k=4, silhouette-optimized).
**Excitement Index:** Composite: Sentiment (40%) + Positive Rate (35%) + Normalized Engagement (25%).

---

*Generated by Cultural Sentiment Intelligence Pipeline | Portfolio Project — Kenza En-Nassef*
"""
    return report


def export_bi_tables(kpis, df, profiles):
    master = df[["movie", "post_id", "platform", "date", "text", "sentiment_label",
                  "vader_compound", "engagement_score", "likes", "comments", "shares",
                  "cluster_label", "hype_signal_count", "concern_signal_count"]].copy()
    master.to_csv(EXPORTS_DIR / "master_dataset.csv", index=False)

    weekly_vol = df.groupby(["movie", "date"]).agg(
        post_count=("post_id", "count"),
        avg_sentiment=("vader_compound", "mean"),
        total_engagement=("engagement_score", "sum"),
    ).reset_index()
    weekly_vol.to_csv(EXPORTS_DIR / "daily_volume.csv", index=False)

    platform_deep = df.groupby(["movie", "platform", "sentiment_label"]).agg(
        count=("post_id", "count"),
        avg_engagement=("engagement_score", "mean"),
    ).reset_index()
    platform_deep.to_csv(EXPORTS_DIR / "platform_deep.csv", index=False)

    print("  BI tables exported:")
    print(f"    master_dataset.csv ({len(master)} rows)")
    print(f"    daily_volume.csv ({len(weekly_vol)} rows)")
    print(f"    platform_deep.csv ({len(platform_deep)} rows)")


def main():
    print("Generating final insights report...")

    kpis, df, profiles, top_terms = load_all_data()

    report = generate_report(kpis, df, profiles, top_terms)
    report_path = REPORTS_DIR / "final_report.md"
    with open(report_path, "w") as f:
        f.write(report)
    print(f"  Report saved: {report_path}")

    export_bi_tables(kpis, df, profiles)

    summary = {
        "project": "Cultural Sentiment Intelligence",
        "analyst": "Kenza En-Nassef",
        "generated_at": datetime.now().isoformat(),
        "movies": ["The Devil Wears Prada 2", "Michael"],
        "total_posts_analyzed": int(len(df)),
        "winner_excitement_index": kpis["audience_excitement_index"].idxmax(),
        "kpis": kpis[["avg_sentiment", "positive_mention_pct",
                       "audience_excitement_index"]].to_dict(),
    }
    with open(REPORTS_DIR / "project_summary.json", "w") as f:
        json.dump(summary, f, indent=2)

    print(f"  Summary JSON saved.")
    print("\n  Pipeline complete. All outputs ready.")


if __name__ == "__main__":
    main()
