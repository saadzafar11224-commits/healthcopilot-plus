"""Summarise BIDMC numerics for simulator sanity checks only.

Raw BIDMC files are intentionally gitignored. This script expects a local
CSV sample such as data/raw/bidmc_01_Numerics.csv and emits descriptive stats,
not a trained model.
"""
from __future__ import annotations

import sys
from pathlib import Path


def summarise(path: Path) -> dict:
    try:
        import pandas as pd
    except ImportError as exc:
        raise SystemExit("Install pandas locally to run this optional analysis") from exc
    frame = pd.read_csv(path)
    output = {}
    for column in ("HR", "RR", "SpO2"):
        matches = [name for name in frame.columns if name.lower() == column.lower()]
        if not matches:
            continue
        series = frame[matches[0]].dropna().astype(float)
        output[column] = {"count": int(series.size), "mean": round(float(series.mean()), 3), "sd": round(float(series.std()), 3), "lag1_autocorr": round(float(series.autocorr()), 3)}
    return output


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python data/bidmc_stats.py data/raw/bidmc_01_Numerics.csv")
    print(summarise(Path(sys.argv[1])))
