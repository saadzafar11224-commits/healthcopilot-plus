export type ScreenId = 'overview' | 'alerts' | 'trends' | 'checkin' | 'radiation' | 'control' | 'sync'
export type DataQuality = 'OK' | 'SENSOR_SUSPECT' | 'UNKNOWN'
export type Tone = 'mint' | 'amber' | 'coral' | 'blue' | 'slate'

export type CrewProfile = {
  id: string
  name: string
  role: string
  initials: string
  missionDay: number
  missionLabel: string
}

export type Metric = {
  id: string
  label: string
  shortLabel: string
  value: string
  numericValue: number
  unit: string
  updated: string
  age: string
  quality: DataQuality
  qualityReason: string
  baseline: string
  baselineContext: string
  trend: 'up' | 'down' | 'steady'
  delta: string
  tone: Tone
  icon: string
}

export type Alert = {
  id: string
  title: string
  summary: string
  severity: 'review' | 'sensor' | 'action'
  state: 'WATCH' | 'SENSOR_CHECK' | 'HEALTH_ALERT'
  metric: string
  time: string
  duration: string
  comparedWith: string
  evidence: string[]
  quality: string[]
  confidence: 'Higher evidence' | 'Limited evidence' | 'Insufficient data'
  confidenceReason: string
  nextStep: string
  secondarySteps: string[]
  groundContact: string
  source: string
  sourceStatus: string
  ruleId: string
}

export type TrendPoint = {
  label: string
  value: number | null
  quality: DataQuality
  event?: string
}

export const crewProfiles: CrewProfile[] = [
  { id: 'orion-07', name: 'ORION-07', role: 'Flight engineer', initials: 'O7', missionDay: 184, missionLabel: 'Day 184 · Transit phase' },
  { id: 'nova-03', name: 'NOVA-03', role: 'Science officer', initials: 'N3', missionDay: 184, missionLabel: 'Day 184 · Transit phase' },
  { id: 'atlas-02', name: 'ATLAS-02', role: 'Commander', initials: 'A2', missionDay: 184, missionLabel: 'Day 184 · Transit phase' },
]

export const metrics: Metric[] = [
  { id: 'hr', label: 'Heart rate', shortLabel: 'HR', value: '64', numericValue: 64, unit: 'bpm', updated: '14:08:41 UTC', age: '18s old', quality: 'OK', qualityReason: 'Within configured signal checks', baseline: '58–72', baselineContext: 'In-flight median · n=42', trend: 'steady', delta: '+3 vs median', tone: 'mint', icon: 'pulse' },
  { id: 'spo2', label: 'Oxygen saturation', shortLabel: 'SpO₂', value: '94', numericValue: 94, unit: '%', updated: '14:08:32 UTC', age: '27s old', quality: 'SENSOR_SUSPECT', qualityReason: 'MOTION_ARTIFACT · recheck requested', baseline: '96–99', baselineContext: 'Pre-flight band · n=61', trend: 'down', delta: '−2 pts vs median', tone: 'amber', icon: 'droplet' },
  { id: 'sleep', label: 'Sleep duration', shortLabel: 'Sleep', value: '6h 12m', numericValue: 6.2, unit: 'last cycle', updated: '06:42:00 UTC', age: '7h 26m old', quality: 'OK', qualityReason: 'Crew-reported check-in', baseline: '6h 48m–7h 28m', baselineContext: 'In-flight median · n=18', trend: 'down', delta: '−38m vs median', tone: 'blue', icon: 'moon' },
  { id: 'mood', label: 'Daily status', shortLabel: 'Check-in', value: 'Steady', numericValue: 1, unit: 'self-report', updated: '06:43:10 UTC', age: '7h 25m old', quality: 'OK', qualityReason: 'Crew-reported · no inference', baseline: 'Steady / prefer not', baselineContext: 'Self-report context', trend: 'steady', delta: 'No change', tone: 'blue', icon: 'spark' },
  { id: 'co2', label: 'Cabin CO₂', shortLabel: 'CO₂', value: '1,286', numericValue: 1286, unit: 'ppm', updated: '14:08:04 UTC', age: '55s old', quality: 'OK', qualityReason: 'Cabin sensor · simulated', baseline: '900–1,300', baselineContext: 'Configured demo band', trend: 'up', delta: '+96 ppm / 2h', tone: 'amber', icon: 'wind' },
  { id: 'dose-rate', label: 'Radiation dose rate', shortLabel: 'Dose rate', value: '0.42', numericValue: 0.42, unit: 'mSv/h', updated: '14:06:18 UTC', age: '2m 41s old', quality: 'OK', qualityReason: 'Cached simulation · timestamped', baseline: '0.20–0.55', baselineContext: 'Transit envelope · demo only', trend: 'up', delta: '+0.08 / 6h', tone: 'coral', icon: 'orbit' },
  { id: 'cumulative', label: 'Cumulative dose', shortLabel: 'Total dose', value: '178', numericValue: 178, unit: 'mSv', updated: '14:06:18 UTC', age: '2m 41s old', quality: 'OK', qualityReason: 'Integrated local cache', baseline: 'Mission context only', baselineContext: 'No operational limit shown', trend: 'up', delta: '+0.9 today', tone: 'coral', icon: 'stack' },
]

export const alerts: Alert[] = [
  {
    id: 'spo2-check',
    title: 'SpO₂ signal needs a clean recheck',
    summary: 'The latest value is below the personal band, but motion artefact reduces signal confidence.',
    severity: 'sensor',
    state: 'SENSOR_CHECK',
    metric: 'SpO₂',
    time: '14:07:52–14:08:32 UTC',
    duration: '40 seconds · 2 windows observed',
    comparedWith: 'Pre-flight baseline band (96–99%) + signal quality gate',
    evidence: ['Latest 94% vs personal median 97%', 'Robust z-score −2.1 · below escalation default', 'Independent heart-rate signal remains within its band', 'Motion flag present on the final two samples'],
    quality: ['SENSOR_SUSPECT', 'MOTION_ARTIFACT', 'Freshness: 27s', 'No missing samples in window'],
    confidence: 'Limited evidence',
    confidenceReason: 'Fresh data and an available baseline, but motion artefact means a manual recheck is needed before interpretation.',
    nextStep: 'Re-seat the finger sensor, pause movement, and recheck SpO₂ in 2 minutes.',
    secondarySteps: ['Record whether the sensor was re-seated', 'If the value persists after a clean recheck, request ground review'],
    groundContact: 'Queue review if the recheck remains outside the personal band; local workflow remains available during delay.',
    source: 'Prototype quality rule · Personal baseline policy',
    sourceStatus: 'UNVERIFIED · illustrative for challenge demo',
    ruleId: 'quality.spo2.motion.v0.1',
  },
  {
    id: 'co2-watch',
    title: 'Cabin CO₂ is trending upward',
    summary: 'CO₂ remains inside the demo band but has moved toward its upper edge over two hours.',
    severity: 'review',
    state: 'WATCH',
    metric: 'CO₂',
    time: '12:08:04–14:08:04 UTC',
    duration: '2 hours · 24 valid samples',
    comparedWith: 'Configured demo band (900–1,300 ppm)',
    evidence: ['Latest 1,286 ppm', 'Trend +96 ppm / 2h', 'All samples passed freshness checks', 'No cross-signal mismatch detected'],
    quality: ['OK', 'Simulated cabin source', 'Freshness: 55s', 'No missing samples'],
    confidence: 'Higher evidence',
    confidenceReason: 'The trend is supported by a complete, fresh sample window; this is a review prompt, not a clinical conclusion.',
    nextStep: 'Review the cabin ventilation checklist and recheck the trend on the next sample window.',
    secondarySteps: ['Annotate recent exercise or maintenance activity', 'Queue a summary for ground review if the trend continues'],
    groundContact: 'Optional queued review; local checklist is available immediately.',
    source: 'Configured demo rule · cabin environment',
    sourceStatus: 'UNVERIFIED · illustrative for challenge demo',
    ruleId: 'environment.co2.trend.v0.1',
  },
]

export const trendSeries: Record<string, TrendPoint[]> = {
  spo2: [
    { label: '−24h', value: 98, quality: 'OK' }, { label: '−20h', value: 97, quality: 'OK' }, { label: '−16h', value: 97, quality: 'OK', event: 'Exercise' }, { label: '−12h', value: null, quality: 'UNKNOWN', event: 'Dropout' }, { label: '−8h', value: 96, quality: 'OK' }, { label: '−4h', value: 95, quality: 'SENSOR_SUSPECT' }, { label: 'Now', value: 94, quality: 'SENSOR_SUSPECT', event: 'Motion' },
  ],
  hr: [
    { label: '−24h', value: 61, quality: 'OK' }, { label: '−20h', value: 63, quality: 'OK' }, { label: '−16h', value: 66, quality: 'OK', event: 'Exercise' }, { label: '−12h', value: 62, quality: 'OK' }, { label: '−8h', value: 60, quality: 'OK' }, { label: '−4h', value: 65, quality: 'OK' }, { label: 'Now', value: 64, quality: 'OK' },
  ],
  co2: [
    { label: '−24h', value: 1050, quality: 'OK' }, { label: '−20h', value: 1078, quality: 'OK' }, { label: '−16h', value: 1115, quality: 'OK' }, { label: '−12h', value: 1152, quality: 'OK' }, { label: '−8h', value: 1198, quality: 'OK' }, { label: '−4h', value: 1246, quality: 'OK' }, { label: 'Now', value: 1286, quality: 'OK', event: 'Trend' },
  ],
}

export const benchmarkRows = [
  { method: 'HealthCopilot+ quality → baseline', detection: '17 / 18', falseAlerts: '1', latency: '2.4 min', note: 'Prototype default' },
  { method: 'Fixed thresholds only', detection: '11 / 18', falseAlerts: '4', latency: '4.8 min', note: 'Ablation' },
  { method: 'Basic z-score baseline', detection: '14 / 18', falseAlerts: '3', latency: '3.1 min', note: 'Ablation' },
]

export const eventLogSeed = [
  { time: '14:08:32', label: 'SpO₂ sample marked SENSOR_SUSPECT', kind: 'amber' },
  { time: '14:06:18', label: 'Radiation cache refreshed locally', kind: 'mint' },
  { time: '13:54:09', label: 'Daily check-in stored offline', kind: 'blue' },
]
