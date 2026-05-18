# Cultural Sentiment Intelligence
## Social Listening & Audience Analysis Around Viral Movie Releases

**Analyst:** Kenza En-Nassef  
**Domain:** Consumer Intelligence · Social Analytics · NLP  
**Status:** Portfolio Project

---

## Business Question

> Does online hype translate into positive audience perception — and which movie has a more excited, engaged audience?

**Movies in focus:**
- *The Devil Wears Prada 2* (anticipated sequel, fashion/nostalgia audience)
- *Michael* (Michael Jackson biopic, legacy/music audience)

---

## KPI Framework

| KPI | Definition | Source |
|-----|-----------|--------|
| Sentiment Score | Compound polarity per post (VADER) | Reddit/Twitter-simulated |
| Hype Volume | Post + comment count over time | Raw data |
| Engagement Rate | (likes + comments) / reach proxy | Metadata |
| Positive Mention Rate | % posts with score ≥ 0.05 | NLP pipeline |
| Audience Excitement Index | Composite of sentiment × engagement | Derived |
| Topic Cluster Share | % of audience per segment | K-Means |
| Sentiment Velocity | Rate of change in sentiment over time | Rolling avg |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Data ingestion | Simulated social corpus + PRAW-ready structure |
| NLP | VADER, TextBlob, spaCy |
| ML | Scikit-learn (K-Means, PCA, TF-IDF) |
| Visualization | Matplotlib, Seaborn, WordCloud |
| Data layer | Pandas, NumPy |
| Export | CSV, PNG, JSON |

---

## Project Structure

```
cultural-sentiment-intelligence/
├── data/
│   ├── raw/          # Simulated social posts corpus
│   ├── processed/    # Cleaned + feature-enriched datasets
│   └── exports/      # Final insight tables for BI/dashboard
├── scripts/
│   ├── 01_generate_corpus.py
│   ├── 02_preprocess.py
│   ├── 03_sentiment_analysis.py
│   ├── 04_clustering.py
│   ├── 05_visualizations.py
│   └── 06_export_insights.py
├── charts/           # All exported visualizations
├── models/           # Saved ML artifacts
├── reports/          # Final narrative insights
└── README.md
```

---

## Key Findings (Preview)

Run the pipeline to generate full results. Charts and insights auto-export to `charts/` and `reports/`.
