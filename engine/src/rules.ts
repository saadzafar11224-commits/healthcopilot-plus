import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export interface Rule {
  id: string
  value: number | null
  unit: string
  source: string
  url: string
  verified: boolean
}

export interface RuleFile {
  version: string
  rules: Rule[]
}

export function loadRules(path = resolve(process.cwd(), 'engine/rules/radiation.v1.json')): RuleFile {
  const rules = JSON.parse(readFileSync(path, 'utf8')) as RuleFile
  if (!rules.version || !Array.isArray(rules.rules)) throw new Error('Invalid rule file: missing version or rules')
  for (const rule of rules.rules) {
    if (!rule.id || !rule.unit || !rule.source || !rule.url) throw new Error(`Rule missing id/unit/source/url: ${JSON.stringify(rule)}`)
  }
  return rules
}

/** Null or unverified rules are intentionally non-actionable. */
export function isActionable(rule: Rule): boolean {
  return rule.value !== null && rule.verified
}
