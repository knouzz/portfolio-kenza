"""
Collector: Google Trends
Pulls search interest over time and related queries via pytrends.
No API key required.
"""

import time
import pandas as pd
from pathlib import Path
from datetime import datetime

RAW_DIR = Path(__file__).parent.parent.parent / "data" / "raw"
EXPORTS_DIR = Path(__file__).parent.parent.parent / "data" / "exports"
RAW_DIR.mkdir(parents=True, exist_ok=True)
EXPORTS_DIR.mkdir(parents=True, exist_ok=True)

KEYWORDS = [
    "Devil Wears Prada 2",
    "Michael Jackson biopic",
    "Michael movie 2025",
]

GEO        = ""      # worldwide; set "US" for US only
TIMEFRAME  = "today 3-m"
SLEEP      = 1.5


def collect() -> dict[str, pd.DataFrame]:
    try:
        from pytrends.request import TrendReq
    except ImportError:
        raise ImportError("pytrends not installed. Run: pip install pytrends")

    pytrends = TrendReq(hl="en-US", tz=0)
    results = {}

    # ── Interest over time ──────────────────────────────────────────
    print("  Google Trends → interest over time")
    pytrends.build_payload(KEYWORDS, geo=GEO, timeframe=TIMEFRAME)
    time.sleep(SLEEP)
    iot = pytrends.interest_over_time()
    if not iot.empty:
        iot = iot.drop(columns=["isPartial"], errors="ignore").reset_index()
        iot.columns = ["date"] + KEYWORDS + [c for c in iot.columns if c not in ["date"] + KEYWORDS]
        out = RAW_DIR / "trends_interest_over_time.csv"
        iot.to_csv(out, index=False)
        results["interest_over_time"] = iot
        print(f"    Saved: {out} ({len(iot)} rows)")
    else:
        print("    [WARN] No interest-over-time data returned")

    # ── Interest by region ──────────────────────────────────────────
    print("  Google Trends → interest by region")
    time.sleep(SLEEP)
    try:
        ibr = pytrends.interest_by_region(resolution="COUNTRY", inc_low_vol=False)
        ibr = ibr.reset_index()
        out = RAW_DIR / "trends_by_region.csv"
        ibr.to_csv(out, index=False)
        results["interest_by_region"] = ibr
        print(f"    Saved: {out} ({len(ibr)} rows)")
    except Exception as e:
        print(f"    [WARN] Region data: {e}")

    # ── Related queries ─────────────────────────────────────────────
    print("  Google Trends → related queries")
    time.sleep(SLEEP)
    try:
        rq = pytrends.related_queries()
        related = []
        for kw, data in rq.items():
            for qtype in ("top", "rising"):
                df_q = data.get(qtype)
                if df_q is not None and not df_q.empty:
                    df_q = df_q.copy()
                    df_q["keyword"] = kw
                    df_q["query_type"] = qtype
                    related.append(df_q)
        if related:
            related_df = pd.concat(related, ignore_index=True)
            out = RAW_DIR / "trends_related_queries.csv"
            related_df.to_csv(out, index=False)
            results["related_queries"] = related_df
            print(f"    Saved: {out} ({len(related_df)} rows)")
    except Exception as e:
        print(f"    [WARN] Related queries: {e}")

    # ── Trend summary export ────────────────────────────────────────
    if "interest_over_time" in results:
        iot_df = results["interest_over_time"]
        summary_rows = []
        for kw in KEYWORDS:
            if kw in iot_df.columns:
                summary_rows.append({
                    "keyword": kw,
                    "avg_interest": round(iot_df[kw].mean(), 2),
                    "peak_interest": int(iot_df[kw].max()),
                    "peak_date": str(iot_df.loc[iot_df[kw].idxmax(), "date"])[:10],
                    "trend_direction": "rising" if iot_df[kw].iloc[-1] > iot_df[kw].iloc[0] else "declining",
                    "collected_at": datetime.now().isoformat(),
                })
        summary = pd.DataFrame(summary_rows)
        out = EXPORTS_DIR / "trends_summary.csv"
        summary.to_csv(out, index=False)
        results["summary"] = summary
        print(f"  Trend summary saved: {out}")

    return results


if __name__ == "__main__":
    collect()
