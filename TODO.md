# HealthCopilot+ delivery outcomes

## 1. Mission shell and status language
- [ ] The product opens as a visibly labelled `SIMULATED` prototype and keeps the crew member as the decision-maker.
- [ ] The shell includes mission identity, mission time, operating mode, local/offline status, freshness, sync state, and an accessible left navigation that collapses on small screens.
- [ ] Status is communicated with text and icon in addition to colour; there is no single health score used as the primary status.

## 2. Today / Crew status
- [ ] Today answers what to pay attention to right now with a top status banner, no more than three prioritized changes, and one primary next action or an explicit no-action message.
- [ ] Metric cards cover HR, SpO2, sleep, mood/check-in, CO2, radiation dose rate, and cumulative dose with value/unit, timestamp/age, sensor quality, personal-baseline context, and trend when enough valid data exists.
- [ ] Missing, stale, suspect, and simulated readings remain explicit and are not silently treated as zero or current.

## 3. Alert detail and explainability
- [ ] An alert view exposes what changed, when/how long, comparison basis, evidence, data-quality reasons, confidence descriptor, next step, ground-contact mode, source trace, and controls.
- [ ] Suspected sensor faults create a visible sensor-check task rather than hiding the possible event; acknowledgement is not presented as resolution.
- [ ] Prototype/unverified source status is conspicuous wherever operational validation is incomplete.

## 4. Trends and check-in
- [ ] Trends supports 7/30/90-day controls, pre-flight and in-flight baseline distinctions, quality-coded points, missing intervals, event annotations, and a text/table alternative.
- [ ] Daily check-in distinguishes crew-reported inputs from sensor-derived inputs and supports sleep duration, status/mood, unknown, and prefer-not-to-answer.

## 5. Radiation and environment
- [ ] Radiation shows dose rate and cumulative dose separately with units, time range, source, freshness, and quality state.
- [ ] Environment shows CO2 trend/freshness and a simulated or cached event state without implying live data.
- [ ] Educational analogies and guidance are labelled approximate/illustrative and do not present unverified exposure limits as current official policy.

## 6. Mission Control demo
- [ ] Mission Control includes a seeded virtual crew selector, time-lapse controls, event and sensor-fault injection, communication-delay slider with numeric value, autonomy mode, benchmark/ablation summary, and synthetic ground-report export.
- [ ] Scenario controls visibly update the local UI state and event log without requiring network access.

## 7. Sharing and sync
- [ ] Sharing choices include alerts only, summary, and full permitted record set, with an exact payload preview before enabling a tier.
- [ ] Sync shows queue count, last attempt, last successful sync, retry/conflict state, and local export/delete controls; no hidden third-party analytics are used in the safety flow.

## 8. Accessibility, motion, and delivery
- [ ] Keyboard focus is visible, controls have labels, colour is not the only status cue, responsive layouts work for narrow screens, and reduced-motion preferences disable non-essential motion.
- [ ] Ambient and interaction animations support telemetry comprehension: staggered card entrance, live signal pulse, calm status transitions, and alert emphasis without visual overload.
- [ ] The app builds to static output, serves `/manus-routes.json`, passes TypeScript/build checks, and is saved as a Webdev checkpoint.
