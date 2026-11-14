"""Explore WESAD motion/BVP shape for simulator design, never for training.

WESAD pickles are untrusted and stay outside Git. Review the file before use.
"""
from __future__ import annotations

import sys
from pathlib import Path


def explore(path: Path) -> dict:
    import pickle
    with path.open("rb") as handle:
        subject = pickle.load(handle)
    signal = subject.get("signal", {})
    wrist = signal.get("wrist", {})
    chest = signal.get("chest", {})
    return {
        "wrist_keys": sorted(wrist.keys()),
        "chest_keys": sorted(chest.keys()),
        "note": "Use ACC magnitude and BVP burst shape only for synthetic motion artefact design; WESAD contains no SpO2.",
    }


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python data/wesad_explore.py data/raw/WESAD/S2/S2.pkl")
    print(explore(Path(sys.argv[1])))
