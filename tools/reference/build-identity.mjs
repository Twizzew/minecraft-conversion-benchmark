#!/usr/bin/env node
// Resolve identity-rules.v1.mjs against the two official registries and write the
// reviewable reference file docs/reference/identity-equivalence.v1.json.
//
// Resolution order for an identifier of edition A (target edition B):
//   1. explicit override            -> equivalent (targets as listed)
//   2. edition-only pattern         -> edition_only (no counterpart in B)
//   3. cross-family rule (entities) -> cross_family
//   4. same identifier exists in B  -> equivalent (basis "same-id")
//   5. pattern rule                 -> equivalent, if every target exists in B
//   6. otherwise                    -> unknown (direct identity is then NOT_EVALUATED)
// Every target is checked against B's registry; a rule naming an identifier that does
// not exist is reported as an error instead of being used.
import fs from 'node:fs';
import path from 'node:path';
import { javaRegistry, bedrockRegistry } from '../lib/registry.mjs';
import { REPO_ROOT } from '../lib/archive.mjs';
import * as R from './identity-rules.v1.mjs';

const java = javaRegistry();
const bed = bedrockRegistry();
const unlisted = R.BEDROCK_EXISTS_UNLISTED;
const bedrockHas = (kind, id) => bed[kind === 'block' ? 'blocks' : kind === 'item' ? 'items' : 'entities'].has(id) || (unlisted[kind] || []).includes(id);
const javaHas = (kind, id) => (kind === 'block' ? java.blocks.has(id) : kind === 'item' ? java.items.has(id) : java.entities.has(id));
const errors = [];
const matchAny = (list, id) => list.find((re) => new RegExp(re).test(id));
function applyPattern(p, id) {
  const m = id.match(new RegExp(p.re));
  return m ? p.to.map((t) => t.replace(/\$(\d)/g, (_, i) => m[+i] ?? '')) : null;
}

function resolveJ2B(kind, id, { overrides, javaOnly, patterns, cross = {} }) {
  if (overrides[id]) {
    const t = overrides[id].filter((x) => bedrockHas(kind, x));
    const missing = overrides[id].filter((x) => !bedrockHas(kind, x));
    if (missing.length) errors.push(`${kind} override ${id} -> missing in Bedrock: ${missing.join(',')}`);
    if (t.length) return { status: 'equivalent', targets: t, basis: 'override' };
  }
  const eo = matchAny(javaOnly, id);
  if (eo) return { status: 'edition_only', basis: `java-only:${eo}` };
  if (cross[id]) return { status: 'cross_family', targets: [cross[id]], basis: 'cross-family' };
  if (bedrockHas(kind, id)) return { status: 'equivalent', targets: [id], basis: 'same-id' };
  for (const p of patterns) {
    const t = applyPattern(p, id);
    if (t && t.every((x) => bedrockHas(kind, x))) return { status: 'equivalent', targets: t, basis: `pattern:${p.re}` };
  }
  return { status: 'unknown' };
}

function build(kind, javaIds, bedrockIds, cfg) {
  const j2b = {};
  for (const id of [...javaIds].sort()) {
    const res = resolveJ2B(kind, id, cfg);
    if (res.status === 'equivalent') for (const a of cfg.augment || []) {
      const extra = applyPattern({ re: a.re, to: a.add }, id);
      if (extra) for (const x of extra) if (bedrockHas(kind, x) && !res.targets.includes(x)) { res.targets.push(x); res.basis += '+augment'; }
    }
    j2b[id] = res;
  }
  // Bedrock -> Java: inverse of the Java -> Bedrock equivalences, plus Bedrock-side rules.
  const inv = {};
  for (const [jid, r] of Object.entries(j2b)) {
    if (r.status !== 'equivalent') continue;
    for (const t of r.targets) (inv[t] ||= new Set()).add(jid);
  }
  const b2j = {};
  for (const id of [...bedrockIds].sort()) {
    if (cfg.b2jOverrides?.[id]) { b2j[id] = { status: 'equivalent', targets: cfg.b2jOverrides[id], basis: 'override' }; continue; }
    if (cfg.b2jCross?.[id]) { b2j[id] = { status: 'cross_family', targets: [cfg.b2jCross[id]], basis: 'cross-family' }; continue; }
    const eo = matchAny(cfg.bedrockOnly, id);
    if (eo) { b2j[id] = { status: 'edition_only', basis: `bedrock-only:${eo}` }; continue; }
    if (inv[id]) { b2j[id] = { status: 'equivalent', targets: [...inv[id]].sort(), basis: 'inverse' }; continue; }
    let done = false;
    for (const p of cfg.b2jPatterns || []) {
      const t = applyPattern(p, id);
      if (t && t.every((x) => javaHas(kind, x))) { b2j[id] = { status: 'equivalent', targets: t, basis: `pattern:${p.re}` }; done = true; break; }
    }
    if (!done) b2j[id] = javaHas(kind, id) ? { status: 'equivalent', targets: [id], basis: 'same-id' } : { status: 'unknown' };
  }
  const count = (m) => Object.values(m).reduce((a, r) => (a[r.status] = (a[r.status] || 0) + 1, a), {});
  return { java_to_bedrock: j2b, bedrock_to_java: b2j, counts: { java_to_bedrock: count(j2b), bedrock_to_java: count(b2j) } };
}

const out = {
  schema: 'mccb.identity-equivalence/1',
  rules: 'tools/reference/identity-rules.v1.mjs',
  java_registry: java.provenance,
  bedrock_registry: bed.provenance,
  note: 'Identity only (same block/item/entity). States, variants and components are not covered. "unknown" means no evaluation, never a verdict.',
  block: build('block', java.blocks.keys(), [...bed.blocks, ...unlisted.block], {
    overrides: R.BLOCK_J2B_OVERRIDES, javaOnly: R.BLOCK_JAVA_ONLY, patterns: R.BLOCK_J2B_PATTERNS, augment: R.BLOCK_J2B_AUGMENT,
    bedrockOnly: R.BLOCK_BEDROCK_ONLY, b2jPatterns: R.BLOCK_B2J_PATTERNS, b2jCross: R.BLOCK_B2J_CROSS_FAMILY,
  }),
  entity: build('entity', java.entities, [...bed.entities, ...unlisted.entity], {
    overrides: R.ENTITY_J2B_OVERRIDES, javaOnly: R.ENTITY_JAVA_ONLY, patterns: R.ENTITY_J2B_PATTERNS, cross: R.ENTITY_J2B_CROSS_FAMILY,
    bedrockOnly: R.ENTITY_BEDROCK_ONLY, b2jOverrides: R.ENTITY_B2J_OVERRIDES,
  }),
  item: build('item', java.items, [...bed.items, ...unlisted.item], {
    overrides: R.ITEM_J2B_OVERRIDES, javaOnly: R.ITEM_JAVA_ONLY, patterns: R.ITEM_J2B_PATTERNS, bedrockOnly: R.ITEM_BEDROCK_ONLY,
    b2jPatterns: R.ITEM_B2J_PATTERNS,
  }),
  rule_errors: errors,
};
const dest = path.join(REPO_ROOT, 'docs', 'reference', 'identity-equivalence.v1.json');
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 1) + '\n');
console.log('wrote', path.relative(REPO_ROOT, dest));
for (const k of ['block', 'entity', 'item']) console.log(k, JSON.stringify(out[k].counts));
if (errors.length) { console.log('RULE ERRORS:'); for (const e of errors) console.log('  ' + e); }
for (const k of ['block', 'entity', 'item']) {
  const unk = Object.entries(out[k].java_to_bedrock).filter(([, r]) => r.status === 'unknown').map(([id]) => id.slice(10));
  const unkB = Object.entries(out[k].bedrock_to_java).filter(([, r]) => r.status === 'unknown').map(([id]) => id.slice(10));
  console.log(`${k} UNKNOWN java->bedrock (${unk.length}): ${unk.join(' ')}`);
  console.log(`${k} UNKNOWN bedrock->java (${unkB.length}): ${unkB.join(' ')}`);
}
