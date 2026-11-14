# Simulator data contract

The simulator generates all visible HR, SpO₂, CO₂, dose-rate, cumulative-dose, sleep, and check-in values.

- NASA DONKI contributes only event timestamps/linked-event context for a simulated solar-particle-event injection.
- NOAA SWPC contributes the separate >=10 MeV proton-flux profile used to shape environmental context. No flux-to-dose conversion is implemented.
- BIDMC contributes descriptive HR/RR/SpO₂ noise-shape sanity checks only.
- WESAD contributes motion-artifact and exercise-like BVP shape only. It has no SpO₂.
- All benchmark values are seeded synthetic scenarios. They validate workflow/explainability, not clinical accuracy or flight safety.

Keep UTC timestamps, source IDs, rule IDs, and cache timestamps with every injected event.
