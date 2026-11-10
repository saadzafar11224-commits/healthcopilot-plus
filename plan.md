# HealthCopilot+ implementation plan

## Scope and approach

HealthCopilot+ will be delivered as a self-contained, static, offline-first browser prototype. The attached blueprint is the approved product plan. The experience uses seeded simulated crew data and deterministic local interaction so the demo works without accounts, network services, LLM calls, or external APIs. The main goal is to make the safety logic legible while adding the requested stronger colour system and purposeful motion.

Implementation will use a small Vite + React + TypeScript frontend with no backend. Simulated readings, alert state, quality labels, baselines, trend points, check-ins, sharing settings, and sync queue state live in React state and localStorage-compatible structures. The critical path is represented with deterministic data and clearly labelled prototype/illustrative copy; no diagnosis, treatment, medical probability, or current operational limit is presented.

## Information architecture

- **Today**: command-centre overview, mission status, current alerts, metric cards, primary next action, freshness/sync indicators.
- **Alert detail**: evidence-led inspection drawer/page with timeline, personal baseline comparison, quality reasons, confidence descriptor, next step, ground-contact mode, and source trace.
- **Trends**: 7/30/90-day controls, visual baseline band, quality-coded points, missing intervals, annotations, and table alternative.
- **Check-in**: short crew-reported sleep and status flow with unknown/prefer-not-to-answer options.
- **Radiation & environment**: dose rate, cumulative dose, CO₂, simulated event state, freshness, and illustrative guidance.
- **Mission control**: virtual crew selector, time-lapse, event/fault injection, communication delay, autonomy mode, benchmark/ablation summary, report export.
- **Sync & sharing**: sharing tier preview, queue/retry/conflict state, local export/delete actions.

## Design direction

Three possible movements were considered: **Orbital Operations Console** (0.07): a dark, cinematic flight-deck interface with signal lines, luminous telemetry accents, and disciplined information density; **Quiet Clinical Instrument** (0.06): a pale, calm instrument panel with soft gradients and high whitespace; **Solaris Research Terminal** (0.04): a warm, editorial science-lab interface with amber annotations and paper-like panels. The chosen direction is **Orbital Operations Console**.

- **Design Movement**: NASA white-and-navy mission control, blending bright aerospace instrument panels with a calm, modern product surface.
- **Core Principles**: evidence first; calm under pressure; status is explicit rather than colour-only; depth comes from layered panels and motion, not decoration.
- **Color Philosophy**: white and cool instrument grey create a bright operational canvas; deep navy anchors the mission rail; cobalt blue marks trustworthy telemetry; orange marks review/uncertainty; coral is reserved for action-required states. Status chips always include text and icons so colour is never the only cue.
- **Layout Paradigm**: a top segmented workspace bar provides immediate access to each module; a left mission rail anchors context; a wide telemetry field carries the main content; a narrow right-side “signal rail” surfaces priority, queue, and mission context. Responsive layouts collapse the rails into a compact top bar.
- **Signature Elements**: thin orbital arcs in the background; a “signal pulse” animation on live-quality cards; segmented timeline markers for baseline / watch / sensor-check / action states.
- **Interaction Philosophy**: every interaction should reveal evidence or reduce uncertainty. Hover and focus states add context, not noise. Clicking a metric opens its evidence trail; actions update a visible local event log.
- **Animation**: slow ambient star/arc drift; staggered entrance for telemetry cards; subtle scanning sheen on healthy signals; alert cards breathe once on escalation; progress bars use eased fill; reduced-motion preference disables non-essential motion.
- **Typography System**: Space Grotesk for display/navigation, IBM Plex Mono for telemetry values and timestamps, system sans for long-form copy. Display headings are tight and sentence case; labels are compact uppercase with tracking.
- **Brand Essence**: a calm, explainable mission companion for crews operating beyond immediate ground contact — precise, observant, grounded. Personality: vigilant, humane, transparent.
- **Brand Voice**: headlines are direct and situational (“Know what changed.”); actions are bounded and honest (“Open the evidence trail”, “Queue ground review”). Avoid clinical certainty and generic wellness language.
- **Wordmark & Logo**: “HC+” as a split-orbit monogram: two offset arcs wrapping a small central signal dot, echoed in the app mark and status animations.
- **Signature Brand Color**: Mission Cobalt `#1B78B5`, used sparingly as the unmistakable HealthCopilot+ telemetry accent.

## Project structure

- `src/main.tsx`: React bootstrap and global layout shell.
- `src/App.tsx`: navigation, seeded state, screen composition, interactions, and local event log.
- `src/data.ts`: deterministic simulated crew, metrics, alerts, trend points, rule/source metadata, and benchmark rows.
- `src/styles.css`: responsive visual system, motion, accessible status treatments, charts, and reduced-motion rules.
- `public/manus-routes.json`: route manifest for the single-page prototype.
- `public/`: small local app assets only; no external image dependency.
- `package.json`, `tsconfig.json`, `vite.config.ts`: pinned frontend toolchain.

## Build and serving

The app will run on port 3000 with `npm run dev -- --host 0.0.0.0`. The preview is a single-page experience with client-side tab navigation; the route manifest declares `/`. Production uses a static Vite build to `dist`.

## Boundaries

This is a simulated decision-support prototype, not clinical software or flight software. Source traces intentionally show prototype and unverified review states where no authoritative source has been confirmed. No external sync actually transmits records; the UI demonstrates a local queue and preview only. No health score, diagnosis, medication, treatment, emergency dispatch, or autonomous clinical decision is implemented.
