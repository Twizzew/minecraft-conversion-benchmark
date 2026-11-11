#!/usr/bin/env node
// Independent spot-check of FAIL verdicts (read-only). Draws FAIL assertions at random
// (seeded, reproducible) for one converter across all recorded worlds, plus one example of
// each of its largest FAIL clusters, and prints for each: the frozen expectation, the
// oracle's evidence, and what the converter's RAW output file holds at that place (and, for
// a Java target, what the game-loaded copy holds). The verdict — real loss or oracle error —
// is then written by a human in the audit report.
//   node tools/results/audit-spotcheck.mjs --converter worldswitch --n 20 --seed 1 [--clusters 10]
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { REPO_ROOT } from '../lib/archive.mjs';
import { openRunOutput, worldsManifest } from '../lib/open.mjs';
import { JavaWorld } from '../lib/java/world.mjs';
import { plain, snbt } from '../lib/nbt.mjs';
import { DIM_NAMES } from '../lib/bedrock/world.mjs';
import { fixtureFile, PRIVATE_DIR, parseJsonlBuffer } from '../lib/fixtures-io.mjs';

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const CONV = arg('converter', 'worldswitch');
const N = Number(arg('n', 20)), SEED = Number(arg('seed', 1)), NCLUST = Number(arg('clusters', 10));
const ONLY = arg('worlds')?.split(',');
// Deterministic PRNG (mulberry32).
let s = SEED >>> 0;
const rand = () => { s += 0x6D2B79F5; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

const freeze = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'reports', 'freeze', 'FREEZE-v1.1.json'), 'utf8'));
const entries = [...freeze.measured_before_freeze, ...freeze.measured_after_freeze].filter((e) => e.converter === CONV && e.roundtrip_run);
for (const base of [path.join(PRIVATE_DIR, 'results', CONV)]) if (fs.existsSync(base)) for (const run of fs.readdirSync(base)) {
  const sf = path.join(base, run, 'summary.json');
  if (!fs.existsSync(sf)) continue;
  const sm = JSON.parse(fs.readFileSync(sf, 'utf8'));
  entries.push({ converter: CONV, world: sm.world, direct_run: sm.direct_run, roundtrip_run: sm.roundtrip_run, results_file: path.relative(REPO_ROOT, path.join(base, run, 'results.jsonl.gz')) });
}
const active = new Set(worldsManifest().worlds.filter((w) => ['ACTIVE', 'PRIVATE'].includes(w.status)).map((w) => w.id));

// All FAILs (world, subject, aspect, level) + cluster signatures.
const fails = [];
const clusters = new Map();
const fixtures = new Map();
for (const e of entries) {
  if (!active.has(e.world) || (ONLY && !ONLY.includes(e.world))) continue;
  const rows = parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(path.join(REPO_ROOT, e.results_file))));
  for (const r of rows) for (const [aspect, lv] of Object.entries(r.aspects || {})) for (const L of ['direct', 'roundtrip']) {
    const x = lv?.[L];
    if (!x?.evaluated || x.status !== 'FAIL') continue;
    const f = { e, id: r.id, family: r.family, aspect, level: L, rule: x.rule, evidence: x.evidence };
    fails.push(f);
    const sig = `${e.world}|${L}|${r.family}.${aspect}|${x.rule}|${JSON.stringify(x.evidence ?? null).replace(/-?\d+(\.\d+)?/g, '#').slice(0, 120)}`;
    const c = clusters.get(sig) || { n: 0, first: f };
    c.n++; clusters.set(sig, c);
  }
}
const picks = [];
const used = new Set();
while (picks.length < Math.min(N, fails.length)) {
  const i = Math.floor(rand() * fails.length);
  if (used.has(i)) continue;
  used.add(i); picks.push({ why: `random #${picks.length + 1}`, f: fails[i] });
}
for (const [sig, c] of [...clusters].sort((a, b) => b[1].n - a[1].n).slice(0, NCLUST)) picks.push({ why: `cluster of ${c.n}: ${sig}`, f: c.first });
console.log(`${CONV}: ${fails.length} FAIL assertions (direct + roundtrip) in ${entries.length} runs, seed ${SEED}; ${clusters.size} signatures\n`);

const opened = new Map();
async function target(e, level) {
  const run = level === 'direct' ? e.direct_run : e.roundtrip_run;
  if (!opened.has(run)) {
    // One world open at a time: several converted worlds do not fit in memory together.
    for (const v of opened.values()) v.o.world?.cleanup?.();
    opened.clear();
    const o = await openRunOutput(run);
    const raw = o.edition === 'java' ? await JavaWorld.open(o.rawRoot) : o.world;
    opened.set(run, { o, raw });
  }
  return opened.get(run);
}
function fixtureOf(world, id) {
  if (!fixtures.has(world)) {
    const m = new Map();
    for (const sj of parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(fixtureFile(world)))).slice(1)) m.set(sj.id, sj);
    fixtures.set(world, m);
  }
  return fixtures.get(world).get(id);
}
const short = (v, n = 400) => { const t = typeof v === 'string' ? v : JSON.stringify(v); return t && t.length > n ? t.slice(0, n) + '…' : t; };
const dimNum = { 'minecraft:overworld': 0, 'minecraft:the_nether': 1, 'minecraft:the_end': 2 };

for (const { why, f } of picks) {
  const fx = fixtureOf(f.e.world, f.id);
  console.log(`── ${why}\n   ${f.e.world} ${f.id} ${f.family}.${f.aspect} ${f.level}  rule=${f.rule}`);
  console.log(`   expected: ${short(fx?.expected, 500)}`);
  console.log(`   evidence: ${short(f.evidence, 500)}`);
  const loc = fx?.locator || {};
  try {
    const { o, raw } = await target(f.e, f.level);
    const pos = loc.pos;
    if (Array.isArray(pos) && (f.family === 'block' || f.family === 'block_entity' || f.family === 'item_stack')) {
      const [x, y, z] = pos.map(Math.floor);
      if (o.edition === 'java') {
        const rb = await raw.blockAt(loc.dim, x, y, z), nb = o.world ? await o.world.blockAt(loc.dim, x, y, z) : null;
        console.log(`   RAW block: ${short(rb, 200)}   game-loaded: ${short(nb, 200)}`);
        if (f.family !== 'block') {
          const rbe = await raw.blockEntityAt(loc.dim, x, y, z), nbe = o.world ? await o.world.blockEntityAt(loc.dim, x, y, z) : null;
          console.log(`   RAW block entity: ${short(rbe ? snbt(rbe) : null, 700)}`);
          console.log(`   game-loaded BE:   ${short(nbe ? snbt(nbe) : null, 700)}`);
        }
      } else {
        const d = dimNum[loc.dim] ?? 0;
        console.log(`   RAW block: ${short(raw.blockAt(d, x, y, z), 300)}`);
        if (f.family !== 'block') { const be = raw.blockEntityAt(d, x, y, z); console.log(`   RAW block entity: ${short(be ? snbt(be) : null, 900)}`); }
      }
    } else if (f.family === 'entity' && Array.isArray(pos)) {
      const want = String(fx?.expected?.id || '').replace('minecraft:', '');
      if (o.edition === 'java') {
        const near = [];
        for (const en of await raw.entities(loc.dim)) { const p = plain(en.tag); const q = (p.Pos || []).map(Number); if (q.length && Math.hypot(q[0] - pos[0], q[2] - pos[2]) < 3 && String(p.id).includes(want)) near.push(p); }
        console.log(`   RAW entities (${want}) within 3: ${near.length}  ${short(near[0], 900)}`);
      } else {
        const near = [];
        for (const a of raw.allActors()) { if (!a.tag) continue; const p = plain(a.tag); const q = (p.Pos || []).map(Number); if (q.length && Math.hypot(q[0] - pos[0], q[2] - pos[2]) < 3 && String(p.identifier).includes(want)) near.push(p); }
        console.log(`   RAW actors (${want}) within 3: ${near.length}  ${short(near[0], 900)}`);
      }
    } else console.log(`   locator: ${short(loc, 200)} (no raw lookup for this family)`);
  } catch (err) { console.log(`   raw lookup failed: ${err.message}`); }
  console.log('');
}
