#!/usr/bin/env node
// Self-tests of the MCCB oracles. Writes reports/oracle-selftests/SELFTESTS-v<tools major.minor>.{md,json}
//  A. reader vs game: the block checks that the worlds' own verify functions passed IN
//     GAME (J03 #pass=85/85, J04 #fail=0) must be found by the MCCB reader too.
//  B. identity: every source compared with ITSELF must pass every evaluated round-trip
//     assertion (no FAIL, no PARTIAL, no ADAPTED).
//  C. mutations: a view of the source with one deliberate change per family must fail
//     exactly the mutated subjects.
//  D. determinism: two runs of the same conversion must give identical evaluation rows.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { createRequire } from 'node:module';
import { REPO_ROOT } from '../lib/archive.mjs';
import { openSource } from '../lib/open.mjs';
import { readFixtures } from '../lib/fixtures-io.mjs';
import { FAMILIES } from '../families/index.mjs';
import { TargetView } from '../oracles/target.mjs';
const require = createRequire(import.meta.url);
const AdmZip = require('adm-zip');

// Reports are named after the tools version (1.1.0 → v1.1, 1.3.0 → v1.3): an older report is never overwritten.
const V = 'v' + JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'tools', 'package.json'), 'utf8')).version.split('.').slice(0, 2).join('.');
const report = { schema: 'mccb.selftests/1', tests: [] };
const log = (t) => { report.tests.push(t); console.log(`${t.ok ? 'PASS' : 'FAIL'}  ${t.name}: ${t.summary}`); };

// ── A. reader vs in-game verification ─────────────────────────────────────
async function readerVsGame(worldId, fileRe) {
  const src = await openSource(worldId);
  const dp = path.join(src.rawRoot, 'datapacks');
  const checks = [];
  for (const f of fs.readdirSync(dp).filter((x) => x.endsWith('.zip'))) {
    for (const e of new AdmZip(path.join(dp, f)).getEntries()) {
      if (!fileRe.test(e.entryName)) continue;
      for (const line of e.getData().toString('utf8').split(/\r?\n/)) {
        const m = line.match(/^execute (?:in (\S+) )?(?:if|unless) block (-?\d+) (-?\d+) (-?\d+) ([a-z0-9_:]+)(\[[^\]]*\])?/);
        if (m) checks.push({ dim: m[1] || 'minecraft:overworld', pos: [+m[2], +m[3], +m[4]], block: m[5].includes(':') ? m[5] : `minecraft:${m[5]}`, props: m[6] });
      }
    }
  }
  const uniq = [...new Map(checks.map((c) => [`${c.dim}|${c.pos}|${c.block}|${c.props}`, c])).values()];
  let ok = 0; const bad = [];
  for (const c of uniq) {
    const b = await src.world.blockAt(c.dim, ...c.pos);
    let good = b && b.name === c.block;
    if (good && c.props) for (const kv of c.props.slice(1, -1).split(',').filter(Boolean)) { const [k, v] = kv.split('='); if (String(b.props[k]) !== v) good = false; }
    if (good) ok++; else if (bad.length < 5) bad.push({ ...c, read: b });
  }
  log({ name: `A.reader-vs-game ${worldId}`, ok: ok === uniq.length && uniq.length > 0, summary: `${ok}/${uniq.length} block checks passed in game are read identically`, failures: bad });
}

// ── B / C. evaluation of a source against itself (optionally mutated) ─────
async function evalAgainst(worldId, view, families = null) {
  const fx = readFixtures(worldId);
  const ctx = { worldId, sourceEdition: fx.header.source_edition, direct: new TargetView({ edition: 'none', world: null, opens: false }), roundtrip: view, header: fx.header };
  const rows = new Map();
  for (const f of FAMILIES) {
    if (families && !families.includes(f.name)) continue;
    const mine = fx.subjects.filter((s) => s.family === f.name);
    if (f.prepare) await f.prepare(ctx, mine);
    for (const s of mine) rows.set(s.id, await f.evaluate(s, ctx));
  }
  return { rows, subjects: fx.subjects };
}

async function identity(worldId) {
  const src = await openSource(worldId);
  const view = new TargetView({ edition: src.edition, world: src.world, label: 'self', normalize: src.normalize });
  const { rows } = await evalAgainst(worldId, view);
  const tally = {}; const bad = [];
  for (const [id, res] of rows) for (const [aspect, lv] of Object.entries(res)) {
    const x = lv.roundtrip; const k = x.evaluated ? x.status : 'NOT_EVALUATED';
    tally[k] = (tally[k] || 0) + 1;
    if (x.evaluated && x.status !== 'PASS' && bad.length < 8) bad.push({ id, aspect, result: x });
  }
  const ok = !Object.keys(tally).some((k) => !['PASS', 'NOT_EVALUATED'].includes(k));
  log({ name: `B.identity ${worldId}`, ok, summary: JSON.stringify(tally), failures: bad });
  if (src.world?.cleanup) src.world.cleanup();
}

async function mutations(worldId) {
  const src = await openSource(worldId);
  const fx = readFixtures(worldId);
  const pick = (fam, pred = () => true) => fx.subjects.find((s) => s.family === fam && pred(s));
  const blk = pick('block', (s) => s.aspects.state);
  const be = pick('block_entity', (s) => s.aspects.sign_text || s.aspects.command);
  const ent = pick('entity', (s) => s.expected.custom_name);
  const mutated = new Set([blk?.id, be?.id, ent?.id].filter(Boolean));
  const view = new TargetView({ edition: src.edition, world: src.world, label: 'mutated' });
  // mutate through the view: the files are never touched
  const w = src.world;
  const DIMN = { 'minecraft:overworld': 0, 'minecraft:the_nether': 1, 'minecraft:the_end': 2 };
  const hit = (dim, x, y, z) => blk && (dim === blk.locator.dim || dim === DIMN[blk.locator.dim]) && x === blk.locator.pos[0] && y === blk.locator.pos[1] && z === blk.locator.pos[2];
  const proxyWorld = new Proxy(w, { get(t, p) {
    // Java reader is async (dimension id), Bedrock reader is sync (dimension number)
    if (p === 'blockAt' && blk && src.edition === 'java') return async (dim, x, y, z) => (hit(dim, x, y, z) ? { name: 'minecraft:stone', props: {} } : t.blockAt(dim, x, y, z));
    if (p === 'blockAt' && blk) return (dim, x, y, z) => (hit(dim, x, y, z) ? { name: 'minecraft:stone', states: {} } : t.blockAt(dim, x, y, z));
    const v = t[p]; return typeof v === 'function' ? v.bind(t) : v;
  } });
  view.world = proxyWorld;
  const origBE = view.blockEntityAt.bind(view);
  view.blockEntityAt = async (dim, pos) => {
    const r = await origBE(dim, pos);
    if (r && be && dim === be.locator.dim && pos.join() === be.locator.pos.join()) {
      const f = structuredClone(r.facts);
      if (f.sign) f.sign.front = ['MUTATED']; if (f.command) f.command.text = 'say mutated';
      return { ...r, facts: f };
    }
    return r;
  };
  const origEnt = view.entitiesIndex.bind(view);
  view.entitiesIndex = async () => (await origEnt()).map((e) => (ent && e.facts.custom_name === ent.expected.custom_name ? { ...e, facts: { ...e.facts, custom_name: 'MUTATED' } } : e));
  const { rows } = await evalAgainst(worldId, view, ['block', 'block_entity', 'entity']);
  const failed = new Set();
  for (const [id, res] of rows) for (const lv of Object.values(res)) if (lv.roundtrip.evaluated && lv.roundtrip.status !== 'PASS') failed.add(id);
  const missed = [...mutated].filter((id) => !failed.has(id));
  const extra = [...failed].filter((id) => !mutated.has(id));
  log({ name: `C.mutations ${worldId}`, ok: !missed.length && !extra.length, summary: `${mutated.size} mutated subjects, ${failed.size} failing; missed ${missed.length}, unexpected ${extra.length}`, mutated: [...mutated], missed, unexpected: extra.slice(0, 10) });
  if (src.world?.cleanup) src.world.cleanup();
}

// ── D. determinism of converter outputs, compared through the evaluation ──
function determinism(a, b) {
  const load = (run) => {
    const f = path.join(REPO_ROOT, 'results', 'worldswitch', run, 'results.jsonl.gz');
    return fs.existsSync(f) ? zlib.gunzipSync(fs.readFileSync(f)).toString('utf8') : null;
  };
  const x = load(a), y = load(b);
  if (!x || !y) { log({ name: `D.determinism ${a} vs ${b}`, ok: false, summary: 'missing evaluation (run tools/oracles/evaluate.mjs on both)' }); return; }
  // The re-run is evaluated without a return leg: compare the DIRECT level of every row.
  const direct = (t) => t.trim().split('\n').map((l) => { const o = JSON.parse(l); return JSON.stringify([o.id, Object.fromEntries(Object.entries(o.aspects).map(([k, v]) => [k, v.direct]))]); });
  const rx = direct(x), ry = direct(y);
  const diff = rx.filter((l, i) => l !== ry[i]).length;
  log({ name: `D.determinism ${a} vs ${b}`, ok: diff === 0 && rx.length === ry.length, summary: `${rx.length} subjects, direct level: ${diff} different (the output files differ byte-wise; their content is judged here)` });
}

const only = process.argv.slice(2);
const want = (t) => !only.length || only.includes(t);
if (want('A')) { await readerVsGame('J03@1.0', /verify_checks_overworld\.mcfunction$/); await readerVsGame('J04@1.0', /\/verify\/g\d\.mcfunction$/); }
if (want('B')) for (const w of ['J02@1.0', 'J03@1.0', 'J04@1.0', 'B01@1.0', 'B02@1.0', 'B03@1.0', 'J01@1.1']) await identity(w);
if (want('C')) for (const w of ['J04@1.0', 'B01@1.0', 'B02@1.0']) await mutations(w);
if (want('D')) { determinism('ws-0308840_J04@1.0_j2b', 'ws-0308840_J04@1.0_j2b_rerun1'); determinism('ws-0308840_B01@1.0_b2j', 'ws-0308840_B01@1.0_b2j_rerun1'); }

const dir = path.join(REPO_ROOT, 'reports', 'oracle-selftests');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, `SELFTESTS-${V}.json`), JSON.stringify(report, null, 1) + '\n');
const md = [`# Oracle self-tests — MCCB ${V}`, '', 'Generated by `tools/selftest/run-selftests.mjs`.', '', '| Test | Result | Summary |', '|---|---|---|',
  ...report.tests.map((t) => `| ${t.name} | ${t.ok ? 'PASS' : '**FAIL**'} | ${t.summary.replace(/\|/g, '/')} |`), ''];
for (const t of report.tests.filter((x) => !x.ok)) md.push(`## ${t.name}`, '', '```json', JSON.stringify(t, null, 1).slice(0, 4000), '```', '');
fs.writeFileSync(path.join(dir, `SELFTESTS-${V}.md`), md.join('\n') + '\n');
