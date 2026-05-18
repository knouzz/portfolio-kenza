# Cultural Sentiment Intelligence — System v2.0
## AI-Assisted Signal Monitoring & Audience Analytics

**Analyst:** Kenza En-Nassef  
**Stack:** Python · n8n · OpenAI · VADER · scikit-learn · Tableau

---

## What This System Does

An automated cultural intelligence pipeline that continuously monitors online discussions, processes audience sentiment, detects recurring narratives, and surfaces strategic insights — with AI-generated summaries and automated alerting.

It is designed to feel like an **operational intelligence product**, not a one-time analysis.

---

## System Architecture

```
DATA SOURCES → COLLECTION → PROCESSING → INTELLIGENCE → AUTOMATION → OUTPUTS
   Reddit          PRAW        Sentiment     Signal          n8n         Charts
   YouTube      yt-downloader   Themes       Monitor       Workflows     KPIs
   G.Trends      pytrends      Archetypes   AI Summary     Alerts       Reports
```

See `diagrams/01_system_architecture.png` for the full visual.

---

## Folder Structure

```
cultural-sentiment-intelligence/
│
├── system/
│   ├── collectors/
│   │   ├── reddit_collector.py      — PRAW scraper (posts + comments)
│   │   ├── youtube_collector.py     — YouTube comments (no API key needed)
│   │   └── trends_collector.py      — Google Trends via pytrends
│   │
│   ├── processors/
│   │   ├── sentiment_engine.py      — VADER + TextBlob + emotional signals
│   │   ├── theme_detector.py        — LDA topic modeling (5 themes per movie)
│   │   └── archetype_builder.py     — TF-IDF → PCA → K-Means segmentation
│   │
│   ├── intelligence/
│   │   ├── summarizer.py            — OpenAI GPT-4o-mini narrative summaries
│   │   └── signal_monitor.py        — Threshold alerts + trend velocity
│   │
│   ├── exporters/
│   │   ├── chart_exporter.py        — 8 dark-theme portfolio charts
│   │   └── kpi_exporter.py          — CSV/JSON/MD exports + final report
│   │
│   ├── orchestrator.py              — Master pipeline runner
│   └── generate_diagrams.py         — Architecture diagram generator
│
├── n8n/
│   ├── workflow_signal_monitor.json — Runs every 6h, alerts on spikes
│   └── workflow_daily_digest.json   — Mon–Fri 8am email digest
│
├── diagrams/
│   ├── 01_system_architecture.png   — Full system map
│   ├── 02_data_flow.png             — Step-by-step data journey
│   └── 03_ai_pipeline.png           — NLP + ML + AI layer detail
│
├── scripts/                         — Original v1 pipeline (kept for reference)
├── data/raw/                        — Corpus files
├── data/processed/                  — Scored + clustered datasets
├── data/exports/                    — All BI-ready outputs
├── charts/                          — All generated visualizations
├── reports/                         — Narrative reports
├── models/                          — Saved ML artifacts
└── .env.example                     — Credentials template
```

---

## KPI Framework

| KPI | Formula | Layer |
|-----|---------|-------|
| VADER Compound Score | Lexicon-based [-1, +1] | NLP |
| Positive Mention Rate | % posts with compound ≥ 0.05 | NLP |
| Audience Excitement Index | Sentiment×0.4 + PosRate×0.35 + Engagement×0.25 | Composite |
| Engagement Score | log(likes + comments×2.5 + shares×3) | Derived |
| Sentiment Momentum | Recent 3-week avg − baseline 3-week avg | Signal |
| Hype Signal Density | Avg hype lexicon matches per post | NLP |
| Archetype Cluster Share | % audience per segment | ML |
| Theme Sentiment | Avg compound score per LDA theme | Hybrid |

---

## Signal Monitor Alerts

Three alert types auto-triggered by the signal monitor:

| Alert | Trigger | Severity |
|-------|---------|----------|
| `sentiment_shift` | Weekly delta > ±0.10 compound | High if > ±0.20 |
| `volume_spike` | Post count > 2σ above weekly mean | High if > 3σ |
| `concern_surge` | Avg concern signals > 0.50/post | High if > 0.80 |

---

## Running the System

### Quick start (uses existing corpus)
```bash
cd system
python orchestrator.py --mode full
```

### Modes
| Mode | What it does |
|------|-------------|
| `full` | Load corpus → all processing → intelligence → export |
| `process` | Re-run NLP + clustering only |
| `export` | Re-generate charts and reports from existing processed data |

### With real data
```bash
# Configure credentials
cp .env.example .env   # fill in REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, OPENAI_API_KEY

# Collect
python system/collectors/reddit_collector.py
python system/collectors/trends_collector.py

# Full pipeline
python system/orchestrator.py --mode full
```

### Regenerate diagrams
```bash
python system/generate_diagrams.py
```

---

## n8n Automation Setup

1. Open n8n (`http://localhost:5678` or your n8n Cloud instance)
2. Import `n8n/workflow_signal_monitor.json` → runs every 6 hours
3. Import `n8n/workflow_daily_digest.json` → daily 8am digest
4. Update file paths in each workflow node to match your local install
5. Configure SMTP credentials in n8n for email alerts

---

## Environment Variables

```env
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USER_AGENT=cultural-signal-monitor/2.0 by u/your_username

YOUTUBE_API_KEY=optional_youtube_data_api_key

OPENAI_API_KEY=your_openai_key   # optional — uses extractive fallback if absent
```

---

## Dependencies

```
pandas · numpy · scikit-learn · matplotlib · seaborn
vaderSentiment · textblob · praw · pytrends
youtube-comment-downloader · openai · python-dotenv
```

Install: `pip install -r requirements.txt`

---

*Cultural Sentiment Intelligence v2.0 — Portfolio Project — Kenza En-Nassef*
