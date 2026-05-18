"""
Intelligence: Signal Monitor
Detects sentiment shifts, engagement spikes, and emerging narrative patterns.
Generates alerts and trend signals for the monitoring dashboard.
"""

import json
import numpy as np
import pandas as pd
from pathlib import Path
from datetime import datetime

EXPORTS_DIR = Path(__file__).parent.parent.parent / "data" / "exports"
EXPORTS_DIR.mkdir(parents=True, exist_ok=True)

SENTIMENT_SHIFT_THRESHOLD  = 0.10   # compound score delta triggers alert
VOLUME_SPIKE_THRESHOLD     = 2.0    # x std deviations above mean
CONCERN_SURGE_THRESHOLD    = 0.5    # avg concern signals per post


def _weekly_series(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df["date"] = pd.to_datetime(df["date"])
    df["week_start"] = df["date"].dt.to_period("W").apply(lambda p: p.start_time)
    return df.groupby(["movie", "week_start"]).agg(
        post_count=("post_id", "count"),
        avg_sentiment=("vader_compound", "mean"),
        avg_engagement=("engagement_score", "mean"),
        avg_concern=("concern_count", "mean"),
        positive_count=("sentiment_label", lambda x: (x == "positive").sum()),
        negative_count=("sentiment_label", lambda x: (x == "negative").sum()),
    ).reset_index()


def detect_sentiment_shifts(weekly: pd.DataFrame) -> list[dict]:
    alerts = []
    for movie in weekly["movie"].unique():
        sub = weekly[weekly["movie"] == movie].sort_values("week_start")
        sub["sentiment_delta"] = sub["avg_sentiment"].diff()
        spikes = sub[sub["sentiment_delta"].abs() > SENTIMENT_SHIFT_THRESHOLD]
        for _, row in spikes.iterrows():
            direction = "positive shift" if row["sentiment_delta"] > 0 else "negative shift"
            alerts.append({
                "type":      "sentiment_shift",
                "movie":     movie,
                "week":      str(row["week_start"])[:10],
                "delta":     round(float(row["sentiment_delta"]), 4),
                "direction": direction,
                "severity":  "high" if abs(row["sentiment_delta"]) > 0.2 else "medium",
                "message":   f"{movie}: {direction} of {row['sentiment_delta']:+.3f} detected in week {str(row['week_start'])[:10]}",
            })
    return alerts


def detect_volume_spikes(weekly: pd.DataFrame) -> list[dict]:
    alerts = []
    for movie in weekly["movie"].unique():
        sub = weekly[weekly["movie"] == movie].sort_values("week_start")
        mean_vol = sub["post_count"].mean()
        std_vol  = sub["post_count"].std()
        if std_vol == 0:
            continue
        spikes = sub[(sub["post_count"] - mean_vol) / std_vol > VOLUME_SPIKE_THRESHOLD]
        for _, row in spikes.iterrows():
            z = (row["post_count"] - mean_vol) / std_vol
            alerts.append({
                "type":     "volume_spike",
                "movie":    movie,
                "week":     str(row["week_start"])[:10],
                "volume":   int(row["post_count"]),
                "z_score":  round(float(z), 2),
                "severity": "high" if z > 3 else "medium",
                "message":  f"{movie}: volume spike ({int(row['post_count'])} posts, z={z:.1f}) in week {str(row['week_start'])[:10]}",
            })
    return alerts


def detect_concern_surges(weekly: pd.DataFrame) -> list[dict]:
    alerts = []
    surges = weekly[weekly["avg_concern"] > CONCERN_SURGE_THRESHOLD]
    for _, row in surges.iterrows():
        alerts.append({
            "type":     "concern_surge",
            "movie":    row["movie"],
            "week":     str(row["week_start"])[:10],
            "avg_concern": round(float(row["avg_concern"]), 4),
            "severity": "high" if row["avg_concern"] > 0.8 else "medium",
            "message":  f"{row['movie']}: elevated concern signals ({row['avg_concern']:.2f}/post) in week {str(row['week_start'])[:10]}",
        })
    return alerts


def compute_trend_signals(df: pd.DataFrame) -> pd.DataFrame:
    weekly = _weekly_series(df)

    signals = []
    for movie in weekly["movie"].unique():
        sub = weekly[weekly["movie"] == movie].sort_values("week_start")
        if len(sub) < 3:
            continue
        recent   = sub.tail(3)["avg_sentiment"].mean()
        baseline = sub.head(3)["avg_sentiment"].mean()
        trend    = "rising" if recent > baseline + 0.05 else "declining" if recent < baseline - 0.05 else "stable"

        vol_recent   = sub.tail(3)["post_count"].mean()
        vol_baseline = sub.head(3)["post_count"].mean()
        vol_trend    = "accelerating" if vol_recent > vol_baseline * 1.2 else "decelerating" if vol_recent < vol_baseline * 0.8 else "steady"

        signals.append({
            "movie":           movie,
            "sentiment_trend": trend,
            "volume_trend":    vol_trend,
            "recent_sentiment": round(float(recent), 4),
            "baseline_sentiment": round(float(baseline), 4),
            "sentiment_momentum": round(float(recent - baseline), 4),
            "peak_volume_week": str(sub.loc[sub["post_count"].idxmax(), "week_start"])[:10],
            "peak_sentiment_week": str(sub.loc[sub["avg_sentiment"].idxmax(), "week_start"])[:10],
            "analyzed_at": datetime.now().isoformat(),
        })
    return pd.DataFrame(signals)


def run(df: pd.DataFrame) -> dict:
    print("  Signal monitor running...")

    weekly   = _weekly_series(df)
    weekly.to_csv(EXPORTS_DIR / "sentiment_over_time.csv", index=False)

    alerts = (
        detect_sentiment_shifts(weekly)
        + detect_volume_spikes(weekly)
        + detect_concern_surges(weekly)
    )
    alerts.sort(key=lambda a: a["severity"], reverse=True)

    signals = compute_trend_signals(df)
    signals.to_csv(EXPORTS_DIR / "trend_signals.csv", index=False)

    monitor_output = {
        "run_at":        datetime.now().isoformat(),
        "total_alerts":  len(alerts),
        "high_severity": sum(1 for a in alerts if a["severity"] == "high"),
        "alerts":        alerts,
        "trend_signals": signals.to_dict(orient="records"),
    }

    with open(EXPORTS_DIR / "signal_monitor.json", "w") as f:
        json.dump(monitor_output, f, indent=2)

    print(f"    {len(alerts)} alerts | {len(signals)} trend signals")
    print(f"    High-severity: {monitor_output['high_severity']}")

    return monitor_output
