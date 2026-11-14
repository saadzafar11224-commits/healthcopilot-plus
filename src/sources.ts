export type SourceStatus = 'VERIFIED' | 'TODO_VERIFY' | 'ROADMAP' | 'DESIGN_CHOICE'

export type SourceRecord = {
  id: string
  name: string
  role: string
  url: string
  status: SourceStatus
  usedFor: string
  limitation: string
  citation: string
}

export const sourceRegistry: SourceRecord[] = [
  {
    id: 'nasa-donki-sep',
    name: 'NASA CCMC DONKI',
    role: 'SEP event timing and linked-event context',
    url: 'https://ccmc.gsfc.nasa.gov/DONKI/api/',
    status: 'VERIFIED',
    usedFor: 'Scenario timing and event injection metadata; not particle flux.',
    limitation: 'The SEP endpoint does not provide the S-scale proton flux used for thresholds. Cache responses before offline demo use.',
    citation: 'NASA CCMC DONKI Web API · accessed 2026-11-13',
  },
  {
    id: 'noaa-swpc-goes-protons',
    name: 'NOAA SWPC / GOES proton flux',
    role: 'S1–S5 solar-radiation-storm thresholds and flux shape',
    url: 'https://services.swpc.noaa.gov/json/goes/primary/integral-protons-1-day.json',
    status: 'VERIFIED',
    usedFor: 'Illustrative radiation-event profile; ≥10 MeV proton flux is compared with NOAA S-scale thresholds.',
    limitation: 'Environmental context only; it is not a crew dose calculation or operational flight rule.',
    citation: 'NOAA Space Weather Scales and GOES JSON feed · accessed 2026-11-13',
  },
  {
    id: 'physionet-bidmc',
    name: 'PhysioNet BIDMC PPG and Respiration',
    role: 'Physiological signal-noise reference',
    url: 'https://physionet.org/content/bidmc/1.0.0/',
    status: 'VERIFIED',
    usedFor: 'Simulator-only HR, RR and SpO₂ variation/autocorrelation checks.',
    limitation: '53 eight-minute ICU recordings; not astronaut data and not used as a clinical model.',
    citation: 'BIDMC PPG and Respiration Dataset v1.0.0 · DOI 10.13026/C2208R · ODC Attribution',
  },
  {
    id: 'uci-wesad',
    name: 'UCI WESAD',
    role: 'Motion artefact and exercise-shape reference',
    url: 'https://archive.ics.uci.edu/dataset/465/wesad+wearable+stress+and+affect+detection',
    status: 'VERIFIED',
    usedFor: 'Simulator-only wrist BVP and accelerometer motion patterns.',
    limitation: '15-subject lab dataset; it has no SpO₂ and is not astronaut or clinical validation data.',
    citation: 'Schmidt & Reiss (2018), DOI 10.24432/C57K5T',
  },
  {
    id: 'nasa-osdr',
    name: 'NASA Open Science Data Repository',
    role: 'Space-life-science roadmap',
    url: 'https://osdr.nasa.gov/bio/repo/',
    status: 'ROADMAP',
    usedFor: 'Future dataset discovery and research provenance.',
    limitation: 'The MVP does not claim to ingest restricted or mission-specific crew records.',
    citation: 'NASA OSDR overview · accessed 2026-11-13',
  },
  {
    id: 'nasa-hrr',
    name: 'NASA Human Research Roadmap',
    role: 'Risk and countermeasure background',
    url: 'https://humanresearchroadmap.nasa.gov/',
    status: 'ROADMAP',
    usedFor: 'Background context for sleep, radiation, altered gravity and environmental risks.',
    limitation: 'Background evidence is not a patient-specific recommendation or threshold.',
    citation: 'NASA Human Research Roadmap · accessed 2026-11-13',
  },
  {
    id: 'nasa-std-3001',
    name: 'NASA-STD-3001 Vol 1 Rev C',
    role: 'Radiation rule reference from the supplied guide',
    url: 'https://standards.nasa.gov/sites/default/files/standards/NASA/C//nasa-std-3001-vol-1-rev-c-signature.pdf',
    status: 'VERIFIED',
    usedFor: 'Guide-listed career effective-dose reference; displayed as provenance only.',
    limitation: 'Any operational use still requires the exact revision, section, unit, population and mission context.',
    citation: 'NASA-STD-3001 Vol 1 Rev C · approved 2023-09-15 per supplied guide',
  },
  {
    id: 'radiation-technical-brief',
    name: 'NASA radiation protection technical brief',
    role: 'SPE short-term context from the supplied guide',
    url: 'https://www.nasa.gov/wp-content/uploads/2023/03/radiation-protection-technical-brief-ochmo.pdf',
    status: 'VERIFIED',
    usedFor: 'Guide-listed 250 mSv/event context; shown as provenance only.',
    limitation: 'The prototype does not calculate dose or issue shelter/flight instructions.',
    citation: 'NASA OCHMO radiation protection technical brief · link supplied in project guide',
  },
  {
    id: 'ochmo-radiation',
    name: 'NASA OCHMO standards overview',
    role: 'GCR daily-limit background from the supplied guide',
    url: 'https://www.nasa.gov/sites/default/files/atoms/files/ochmo_standards_overview_sept_15_2021_francisco.pdf',
    status: 'VERIFIED',
    usedFor: 'Guide-listed 1.3 mSv/day free-space context; not rendered as an alert threshold.',
    limitation: 'The app intentionally avoids turning this context into a medical or operational limit.',
    citation: 'OCHMO standards overview · link supplied in project guide',
  },
  {
    id: 'design-sanity-bounds',
    name: 'HealthCopilot design bounds',
    role: 'Simulator sanity checks',
    url: '',
    status: 'DESIGN_CHOICE',
    usedFor: 'HR 20–250 bpm, SpO₂ 50–100%, and >10-point jump checks.',
    limitation: 'These are design choices for synthetic data, not sourced medical guidance.',
    citation: 'HealthCopilot+ Data Sources Guide · explicitly marked design choice',
  },
]
