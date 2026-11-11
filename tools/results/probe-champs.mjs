#!/usr/bin/env node
// MCCB 2026-11 — SONDE : les N premiers sujets d'un type (entité ou entité de bloc), TOUS leurs champs
// stockés, à la source et au retour (même édition) — pour voir ce que l'aller-retour change.
//   node tools/results/probe-champs.mjs <world> <regex du type> [N=3] [--aller]
import { readFixtures } from '../lib/fixtures-io.mjs';
import { openRunOutput, openSource } from '../lib/open.mjs';
import { TargetView } from '../oracles/target.mjs';
import { plain } from '../lib/nbt.mjs';

const [worldId, motif, nArg] = process.argv.slice(2);
const n = worldId.split('@')[0];
const re = new RegExp(motif);
const fx = readFixtures(worldId);
const ids = process.env.PROBE_IDS ? new Set(process.env.PROBE_IDS.split(',')) : null;
const subjects = fx.subjects.filter((s) => ['block_entity', 'entity'].includes(s.family) && (ids ? ids.has(s.id) : re.test(s.expected.id) || re.test(s.id))).slice(0, ids ? Infinity : +(nArg || 3));
const DIFF = process.argv.includes('--diff');
const json = (o) => JSON.stringify(o, (k, v) => (typeof v === 'bigint' ? String(v) : v));
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const norm = (id) => String(id || '').replace('minecraft:', '').replace('_v2', '').toLowerCase();

const src = await openSource(worldId);
const views = [['SOURCE', new TargetView({ edition: src.edition, world: src.world, label: 'source' })]];
for (const id of [...(process.argv.includes('--aller') ? [`${n}_aller`] : []), `${n}_retour`]) { const o = await openRunOutput(id); views.push([id, new TargetView({ edition: o.edition, world: o.world, label: id })]); }
const idx = [];
for (const [, v] of views) idx.push(s0(v) ? await v.entitiesIndex() : []);
function s0() { return subjects.some((s) => s.family === 'entity'); }

for (const s of subjects) {
  console.log(`\n#### ${s.id} ${s.family} ${s.expected.id} @ ${s.locator.pos.map((x) => Math.round(x * 10) / 10).join(' ')}`);
  const rows = [];
  for (let i = 0; i < views.length; i++) {
    const [label, v] = views[i];
    let t = null;
    if (s.family === 'block_entity') t = (await v.blockEntityAt(s.locator.dim, s.locator.pos))?.tag;
    else {
      const c = idx[i].filter((e) => e.dim === s.locator.dim && norm(e.facts.id) === norm(s.expected.id))
        .map((e) => ({ e, d: dist(e.facts.pos, s.locator.pos) })).sort((a, b) => a.d - b.d)[0];
      t = c && c.d < 0.01 ? c.e.tag : null;
    }
    rows.push([label, t ? plain(t) : null]);
  }
  if (!DIFF) { for (const [label, t] of rows) console.log(`  ${label.padEnd(14)} ${t ? json(t) : '(absent)'}`); continue; }
  const [, a] = rows[0], [, b] = rows[rows.length - 1];
  if (!a || !b) { console.log('  absent', !!a, !!b); continue; }
  for (const k of [...new Set([...Object.keys(a), ...Object.keys(b)])].sort()) { const x = json(a[k]), y = json(b[k]); if (x !== y) console.log(`  ${k}: ${String(x).slice(0, +(process.env.PROBE_MAX || 600))}  →  ${String(y).slice(0, +(process.env.PROBE_MAX || 600))}`); }
}
