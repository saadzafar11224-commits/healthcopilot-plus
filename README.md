# HealthCopilot+

HealthCopilot+ is a NASA Space Apps prototype for explainable crew-health workflow rehearsal. It is a simulated, offline-first console: visible HR, SpO₂, CO₂, dose rate, cumulative dose, sleep, and check-in values are seeded synthetic telemetry.

## What the public resources do here

NASA CCMC DONKI contributes only SEP event timestamps and linked-event context. NOAA SWPC contributes the separate >=10 MeV proton-flux profile used to shape environmental context. PhysioNet BIDMC and UCI WESAD are used only to sanity-check simulator noise and motion-artifact shape. The app does not train on these sources, does not claim astronaut data, does not convert proton flux into crew dose, and does not provide clinical or operational flight guidance.

Open the app’s **Radiation & environment → Open source table** to inspect source status, usage, limitations, and direct links. The full register is in [`docs/sources.md`](docs/sources.md).

## Run

```bash
pnpm install
pnpm dev
```

The app works with the committed synthetic cache. To optionally refresh DONKI server-side, copy `.env.example` to `.env`, add a personal NASA API key, and run:

```bash
python data/fetch_donki.py
```

Never commit `.env`, raw BIDMC/WESAD downloads, or private credentials. The optional analysis helpers are `data/bidmc_stats.py` and `data/wesad_explore.py`; they are descriptive sanity checks, not model-training pipelines.

## Repository map

`engine/rules/` is the versioned threshold source of truth. `engine/src/rules.ts` validates rule traceability and makes null/unverified rules non-actionable. `data/cache/` holds live/offline event fixtures. `simulator/` documents the synthetic-data contract. `src/sources.ts` and the source dialog expose the same provenance in the UI.

## Honest limitation

Real astronaut health records and mission telemetry are not assumed to be openly available for this prototype. The benchmark validates explainability, quality gating, personal-baseline handling, and offline workflow behavior—not clinical accuracy or flight safety.
