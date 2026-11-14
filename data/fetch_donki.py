"""Fetch NASA CCMC DONKI SEP event timing and preserve an offline cache.

DONKI provides event metadata/timestamps, not >=10 MeV proton flux. Flux comes
from NOAA SWPC and is intentionally kept as a separate source in this project.
"""
from __future__ import annotations

import json
import os
from datetime import date, timedelta
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / "data" / "cache"
CACHE.mkdir(parents=True, exist_ok=True)
LIVE = CACHE / "donki.json"
OFFLINE = CACHE / "donki_offline.json"


def load_events() -> dict:
    end = date.today()
    start = end - timedelta(days=30)
    key = os.getenv("NASA_API_KEY", "DEMO_KEY")
    query = urlencode({"startDate": start.isoformat(), "endDate": end.isoformat(), "api_key": key})
    url = f"https://api.nasa.gov/DONKI/SEP?{query}"
    try:
        with urlopen(url, timeout=20) as response:
            payload = json.load(response)
        LIVE.write_text(json.dumps({"source": "NASA DONKI", "url": url, "events": payload}, indent=2) + "\n")
        return {"source": "NASA DONKI", "url": url, "events": payload}
    except Exception as exc:
        print(f"[DONKI] live fetch failed; using offline cache: {exc}")
        return json.loads(OFFLINE.read_text())


if __name__ == "__main__":
    data = load_events()
    print(f"[DONKI] loaded {len(data.get('events', []))} SEP events")
    for event in data.get("events", []):
        print(event.get("eventTime", "unknown"))
