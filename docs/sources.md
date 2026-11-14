# HealthCopilot+ source register

_Last reviewed against the supplied Data Sources Guide and official source pages on 2026-11-13._

## What is actually used

HealthCopilot+ is a deterministic, offline-first prototype. The visible crew values are seeded synthetic telemetry. Public datasets shape simulator checks; they are not used to claim clinical accuracy, train a medical model, or represent a real astronaut.

- **NASA CCMC DONKI** supplies SEP event timing and linked-event context. The DONKI SEP endpoint does **not** provide proton flux.
- **NOAA SWPC / GOES integral proton JSON** supplies the environmental >=10 MeV proton-flux profile and the NOAA S1–S5 context. In the simulator, S1 begins at 10 pfu, S2 at 100 pfu, and S3 at 1,000 pfu. This is not converted to crew dose.
- **PhysioNet BIDMC** is used only to sanity-check synthetic HR/RR/SpO2 variation and autocorrelation. It contains 53 eight-minute ICU recordings and is available under the Open Data Commons Attribution License.
- **UCI WESAD** is used only to shape motion artefacts and exercise-like BVP patterns. It contains 15 lab-study subjects, has no SpO2, and must be credited to Schmidt & Reiss (2018), DOI `10.24432/C57K5T`.
- **NASA OSDR** and the **Human Research Roadmap** are roadmap/background sources. Mission-specific or restricted crew data are not claimed here.

## Rule register

| Rule | Value / state | Source | Status |
|---|---:|---|---|
| Career effective dose | `<600 mSv` | NASA-STD-3001 Vol 1 Rev C, section V1 4030 per guide | Verified in guide; display-only context |
| SPE short-term context | `250 mSv/event` | Radiation technical brief, section V1 4031 per guide | Verified in guide; not an operational alert |
| GCR daily context | `1.3 mSv/day` | OCHMO standards overview | Verified in guide; display-only context |
| CO2 limit | not implemented | NASA-STD-3001 Vol 2 / standards.nasa.gov | `TODO_VERIFY` |
| HR / SpO2 sanity bounds | HR 20–250; SpO2 50–100; >10-point jump | HealthCopilot design choice | Not a source; simulator guard only |

## Cache and repository layout

- `data/cache/donki_offline.json` is the committed offline fixture used to explain the scenario. A future live ingestion job should save fresh DONKI and NOAA responses as `data/cache/donki.json` and preserve an offline copy.
- `data/raw/` is reserved for small BIDMC samples or selected WESAD excerpts; large raw downloads stay out of Git.
- `engine/rules/radiation.json` stores rule IDs, units, source IDs, URLs, versions, and verification states.
- The in-app **Open source table** shows the same provenance with direct links and limitations.

## Important boundary

Real astronaut health records and mission telemetry are not assumed to be openly available for this prototype. The benchmark pipeline validates explainability, quality gating, personal-baseline handling, and offline workflow behavior—not clinical performance or operational flight safety.
