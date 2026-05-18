# Setup Guide

## 1. Install dependencies

```bash
pip install -r requirements.txt
```

## 2. Configure Reddit credentials

```bash
cp .env.example .env
```

Open `.env` and fill in:

```
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USER_AGENT=cultural-sentiment-intel/1.0 by u/your_username
```

**To get credentials:**
1. Go to https://www.reddit.com/prefs/apps
2. Click **"create another app"**
3. Choose **script** type
4. Name it anything (e.g. `sentiment-research`)
5. Set redirect URI to `http://localhost:8080`
6. Copy the `client_id` (under the app name) and `client_secret`

## 3. Scrape Reddit data

```bash
cd scripts
python 07_reddit_scraper.py
```

This scrapes real posts + comments across 9 subreddits per movie, then merges with the existing corpus automatically.

## 4. Re-run the full pipeline

```bash
python run_pipeline.py
```

This regenerates all sentiment scores, clusters, charts, and exports with the real Reddit data.

## 5. Open the Tableau dashboard

Open `reports/Cultural_Sentiment_Intelligence.twbx` in **Tableau Desktop**.

All 5 data sources are embedded — no reconnection needed.

---

## Files produced

| File | Description |
|------|-------------|
| `data/raw/reddit_raw.csv` | Raw Reddit scrape |
| `data/raw/social_corpus_raw.csv` | Combined corpus (simulated + Reddit) |
| `data/exports/*.csv` | All KPI and analysis tables |
| `charts/*.png` | 9 visualizations |
| `reports/final_report.md` | Narrative insight report |
| `reports/Cultural_Sentiment_Intelligence.twbx` | Tableau dashboard |
