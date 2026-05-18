"""
Orchestrator — Cultural Sentiment Intelligence Pipeline v2.0
Master runner. Executes all stages in sequence.
Run: python system/orchestrator.py [--mode full|process|export]
"""

import sys
import time
import argparse
import pandas as pd
from pathlib import Path

ROOT = Path(__file__).parent.parent
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(Path(__file__).parent))

RAW_DIR       = ROOT / "data" / "raw"
PROCESSED_DIR = ROOT / "data" / "processed"
EXPORTS_DIR   = ROOT / "data" / "exports"


def _step(name: str, fn, *args, **kwargs):
    print(f"\n{'─'*56}")
    print(f"  {name}")
    print(f"{'─'*56}")
    start = time.time()
    try:
        result = fn(*args, **kwargs)
        print(f"  ✓ {time.time() - start:.1f}s")
        return result
    except Exception as e:
        print(f"  ✗ FAILED: {e}")
        raise


def load_corpus() -> pd.DataFrame:
    """Load existing corpus or raise if not found."""
    path = RAW_DIR / "social_corpus_raw.csv"
    if not path.exists():
        raise FileNotFoundError(
            f"No corpus at {path}.\n"
            "Run scripts/01_generate_corpus.py first, or collect real data via system/collectors/."
        )
    df = pd.read_csv(path)
    print(f"  Corpus loaded: {len(df)} posts across {df['movie'].nunique()} movies")
    return df


def run_full_pipeline():
    """End-to-end: load → process → intelligence → export."""
    from processors.sentiment_engine  import run as run_sentiment
    from processors.theme_detector    import run as run_themes
    from processors.archetype_builder import run as run_archetypes
    from intelligence.summarizer      import run as run_summarizer
    from intelligence.signal_monitor  import run as run_monitor
    from exporters.chart_exporter     import run as run_charts
    from exporters.kpi_exporter       import run as run_kpis

    df_raw = _step("01 — Load corpus", load_corpus)

    df_sentiment, kpis = _step("02 — Sentiment engine",   run_sentiment, df_raw)
    themes              = _step("03 — Theme detector",     run_themes,    df_sentiment)
    df_clustered, _     = _step("04 — Archetype builder",  run_archetypes, df_sentiment)
    monitor             = _step("05 — Signal monitor",     run_monitor,   df_sentiment)
    summaries           = _step("06 — AI summarizer",      run_summarizer, df_sentiment, kpis, themes)

    pca_df = pd.read_csv(EXPORTS_DIR / "pca_coordinates.csv")
    weekly = pd.read_csv(EXPORTS_DIR / "sentiment_over_time.csv")

    _step("07 — Chart exporter", run_charts,
          df_clustered, kpis, weekly, pca_df, themes, monitor)
    _step("08 — KPI exporter",   run_kpis,
          df_clustered, kpis, themes, summaries, monitor)

    return df_clustered, kpis


def run_process_only():
    """Re-run NLP + clustering on existing raw corpus."""
    from processors.sentiment_engine  import run as run_sentiment
    from processors.theme_detector    import run as run_themes
    from processors.archetype_builder import run as run_archetypes
    from intelligence.signal_monitor  import run as run_monitor

    df_raw              = _step("01 — Load corpus",       load_corpus)
    df_sentiment, kpis  = _step("02 — Sentiment engine",  run_sentiment, df_raw)
    themes              = _step("03 — Theme detector",     run_themes,    df_sentiment)
    df_clustered, _     = _step("04 — Archetype builder",  run_archetypes, df_sentiment)
    _step("05 — Signal monitor", run_monitor, df_sentiment)
    return df_clustered, kpis


def run_export_only():
    """Re-generate charts and exports from already-processed data."""
    from exporters.chart_exporter import run as run_charts
    from exporters.kpi_exporter   import run as run_kpis
    import json

    df       = pd.read_csv(PROCESSED_DIR / "corpus_clustered.csv")
    kpis     = pd.read_csv(EXPORTS_DIR / "kpi_summary.csv", index_col="movie")
    weekly   = pd.read_csv(EXPORTS_DIR / "sentiment_over_time.csv")
    pca_df   = pd.read_csv(EXPORTS_DIR / "pca_coordinates.csv")
    with open(EXPORTS_DIR / "theme_analysis.json") as f:
        themes = json.load(f)
    with open(EXPORTS_DIR / "signal_monitor.json") as f:
        monitor = json.load(f)
    with open(EXPORTS_DIR / "ai_summaries.json") as f:
        summaries = json.load(f)["summaries"]

    _step("07 — Chart exporter", run_charts, df, kpis, weekly, pca_df, themes, monitor)
    _step("08 — KPI exporter",   run_kpis,   df, kpis, themes, summaries, monitor)


def main():
    parser = argparse.ArgumentParser(description="Cultural Sentiment Intelligence Pipeline v2.0")
    parser.add_argument("--mode", choices=["full", "process", "export"],
                        default="full", help="Pipeline mode")
    args = parser.parse_args()

    banner = f"""
╔══════════════════════════════════════════════════════╗
║   CULTURAL SENTIMENT INTELLIGENCE — PIPELINE v2.0   ║
║   Analyst: Kenza En-Nassef                           ║
║   Mode: {args.mode:<46}║
╚══════════════════════════════════════════════════════╝"""
    print(banner)

    start = time.time()

    if args.mode == "full":
        run_full_pipeline()
    elif args.mode == "process":
        run_process_only()
    elif args.mode == "export":
        run_export_only()

    elapsed = time.time() - start
    print(f"""
╔══════════════════════════════════════════════════════╗
║  PIPELINE COMPLETE — {elapsed:.1f}s
║  data/exports/   — KPI tables + BI exports           ║
║  charts/         — 8 portfolio visualizations        ║
║  reports/        — narrative report + summary JSON   ║
╚══════════════════════════════════════════════════════╝""")


if __name__ == "__main__":
    main()
