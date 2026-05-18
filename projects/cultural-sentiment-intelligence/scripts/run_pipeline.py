"""
Master Pipeline Runner
Executes all steps in sequence. Run this to reproduce all outputs.
"""

import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))


def run_step(name: str, fn):
    print(f"\n{'='*60}")
    print(f"  STEP: {name}")
    print(f"{'='*60}")
    start = time.time()
    try:
        fn()
        elapsed = time.time() - start
        print(f"  [OK] Completed in {elapsed:.1f}s")
    except Exception as e:
        print(f"  [ERROR] {name} failed: {e}")
        raise


def main():
    print("\n" + "="*60)
    print("  CULTURAL SENTIMENT INTELLIGENCE — PIPELINE")
    print("  Analyst: Kenza En-Nassef")
    print("="*60)

    import importlib

    steps = [
        ("01 — Generate Corpus", "01_generate_corpus", "main"),
        ("02 — Preprocess", "02_preprocess", "main"),
        ("03 — Sentiment Analysis", "03_sentiment_analysis", "main"),
        ("04 — Audience Clustering", "04_clustering", "main"),
        ("05 — Visualizations", "05_visualizations", "main"),
        ("06 — Export Insights", "06_export_insights", "main"),
    ]

    for step_name, module_name, func_name in steps:
        mod = importlib.import_module(module_name)
        fn = getattr(mod, func_name)
        run_step(step_name, fn)

    print("\n" + "="*60)
    print("  PIPELINE COMPLETE")
    print("  Outputs:")
    print("    data/raw/         — raw corpus")
    print("    data/processed/   — cleaned + sentiment + clustered data")
    print("    data/exports/     — KPI tables, BI-ready exports")
    print("    charts/           — 9 portfolio-ready visualizations")
    print("    reports/          — final narrative report + summary")
    print("="*60 + "\n")


if __name__ == "__main__":
    main()
