# Cultural Sentiment Intelligence
## Final Analysis Report

**Project:** Cultural Sentiment Intelligence — Social Listening & Audience Analysis
**Analyst:** Kenza En-Nassef
**Date:** May 17, 2026
**Status:** Final

---

## Executive Summary

This report analyzes audience sentiment, engagement, and segmentation across **870 social media posts** comparing pre-release audience perception for two highly anticipated films: *The Devil Wears Prada 2* and *Michael*.

> **Key Finding:** *Michael* leads in audience excitement with an Excitement Index of **0.507** vs **0.473** for *The Devil Wears Prada 2* — a margin of **0.034** points.

---

## Business Question

**Does online hype translate into positive audience perception — and which movie has a more excited, engaged audience?**

**Answer:** Volume of discussion does not automatically correlate with sentiment quality. This analysis reveals distinct audience dynamics: *The Devil Wears Prada 2* benefits from nostalgia-driven positive sentiment, while *Michael* generates higher emotional intensity but with more polarized reactions.

---

## KPI Summary

| Metric | The Devil Wears Prad... | Michael |
|--------|--------------|---------|
| Total Posts Analyzed | 450 | 420 |
| Avg Sentiment Score | +0.1429 | +0.1789 |
| Positive Mention Rate | 47.6% | 53.1% |
| Avg Engagement Score | 5.733 | 5.741 |
| Audience Excitement Index | **0.473** | **0.507** |

---

## Sentiment Analysis Findings

### The Devil Wears Prada 2
- Sentiment profile: **48% positive, 33% negative, 20% neutral**
- Dominant narrative themes: **nostalgia, fashion industry prestige, Meryl Streep cultural authority**
- The sequel's core strength is emotional safety — audiences know and love this IP
- Skepticism is present but frames itself as "protective love" rather than outright opposition
- Key risk: pressure to exceed a beloved original; audience expectations are set at a premium level

### Michael
- Sentiment profile: **53% positive, 24% negative, 23% neutral**
- Dominant narrative themes: **legacy, music catalog, controversy navigation, Jaafar Jackson casting**
- Generates highest emotional intensity — the MJ brand elicits strong reactions across the spectrum
- The controversy layer adds a structural floor of negative sentiment that is difficult to neutralize
- Key strength: universal music appeal transcends demographic boundaries internationally

---

## Audience Segmentation

### The Devil Wears Prada 2 — Cluster Profiles

**Cautious Fans**
- Share: 9.1% of audience | Avg Sentiment: +0.391 | Excitement Index: 0.719
- Top language signals: can, time, wait, can wait, dynamics

**Fashion Insiders**
- Share: 19.1% of audience | Avg Sentiment: +0.118 | Excitement Index: 0.446
- Top language signals: didn, wears prada, devil, prada, wears

**Industry Analysts**
- Share: 67.1% of audience | Avg Sentiment: +0.165 | Excitement Index: 0.472
- Top language signals: fashion, thoughts, can, else, anyone

**Nostalgia Advocates**
- Share: 4.7% of audience | Avg Sentiment: -0.548 | Excitement Index: 0.027
- Top language signals: means emotionally, prepared, anne hathaway, devastating, devastating prepared

### Michael — Cluster Profiles

**Critical Observers**
- Share: 3.8% of audience | Avg Sentiment: -0.260 | Excitement Index: 0.144
- Top language signals: while ignoring, mj artistry, allegations feels, artistry, artistry while

**Cultural Analysts**
- Share: 5.5% of audience | Avg Sentiment: +0.475 | Excitement Index: 0.790
- Top language signals: level care, michael jackson, care trailer, deserves, deserves told

**Legacy Believers**
- Share: 86.4% of audience | Avg Sentiment: +0.169 | Excitement Index: 0.489
- Top language signals: can, film, else, music, real

**Music Enthusiasts**
- Share: 4.3% of audience | Avg Sentiment: +0.391 | Excitement Index: 0.736
- Top language signals: want love, makes complicated, controversy makes, controversy, love

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

**Data:** 870 simulated social posts designed to reflect real discussion patterns on Reddit, Twitter/X, TikTok comments, YouTube comments, and Instagram (Aug–Nov 2025).
**Sentiment:** VADER rule-based compound scoring (range: -1 to +1).
**Clustering:** TF-IDF vectorization → PCA (50 components) → K-Means (k=4, silhouette-optimized).
**Excitement Index:** Composite: Sentiment (40%) + Positive Rate (35%) + Normalized Engagement (25%).

---

*Generated by Cultural Sentiment Intelligence Pipeline | Portfolio Project — Kenza En-Nassef*
