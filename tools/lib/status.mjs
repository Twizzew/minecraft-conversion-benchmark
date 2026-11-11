// MCCB result vocabulary (METHODOLOGY.md §4). An assertion either receives one of the
// six statuses, or is explicitly NOT evaluated (evaluated:false + reason) — it is then
// counted apart and never folded into a status.
export const PASS = 'PASS';
export const ADAPTED = 'ADAPTED';
export const PARTIAL = 'PARTIAL';
export const FAIL = 'FAIL';
export const UNSUPPORTED = 'UNSUPPORTED';
export const NOT_APPLICABLE = 'NOT_APPLICABLE';
export const STATUSES = [PASS, ADAPTED, PARTIAL, FAIL, UNSUPPORTED, NOT_APPLICABLE];

export const r = (status, rule, evidence = {}) => ({ evaluated: true, status, rule, ...(Object.keys(evidence).length ? { evidence } : {}) });
export const notEvaluated = (reason, evidence = {}) => ({ evaluated: false, status: null, reason, ...(Object.keys(evidence).length ? { evidence } : {}) });

/** Levels a fixture can be measured at. */
export const LEVELS = ['direct', 'behavior', 'roundtrip'];

// Reasons used across families (stable strings: they are counted in summaries).
export const REASON = {
  NO_STATE_REFERENCE: 'no-neutral-cross-edition-state-reference-in-v1.1',
  NO_RULE: 'no-mccb-v1.1-rule-for-this-property',
  NO_RUNTIME: 'requires-in-game-runtime-not-automated-in-v1.1',
  NO_IDENTITY_REFERENCE: 'identifier-not-in-identity-reference',
  TRANSLATION_NEEDS_RUNTIME: 'translated-command-correctness-needs-runtime',
  NO_ROUNDTRIP: 'no-return-leg-for-this-run',
  WORLD_DOES_NOT_OPEN: 'target-world-does-not-open',
  SOURCE_ABSENT: 'declared-case-absent-from-source-world',
};
