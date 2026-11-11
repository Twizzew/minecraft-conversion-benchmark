#!/usr/bin/env node
// Accounting audit of recorded results (read-only). For every world, every converter
// measured at the frozen build and every level, it proves — or refutes — that the numbers
// can be compared at all:
//   I1  the results file is the one recorded in the freeze (SHA-256 of the file);
//   I2  it was evaluated against the frozen fixture registry (content SHA-256), and that
//       registry is the file on disk;
//   I3  every fixture assertion (subject#aspect) appears EXACTLY once, and nothing else;
//   I4  per level, PASS+ADAPTED+PARTIAL+FAIL+UNSUPPORTED+NOT_APPLICABLE+NOT_EVALUATED
//       = TOTAL assertions of the fixture registry;
//   I5  all converters of a world have the SAME assertion IDs, hence the same TOTAL;
//   I6  the published summary.json says the same as a recount of results.jsonl.gz.
// It also counts, next to FAIL assertions, the UNIQUE SUBJECTS affected, and groups FAILs
// into clusters sharing one signature (family, aspect, level, rule, source kind, evidence
// shape) — a candidate root cause, so that one loss producing 1 000 assertions is not read
// as 1 000 independent problems.
//
//   node tools/results/audit-accounting.mjs [--out reports/audit] [--worlds J02@1.0,...]
// Writes <out>/ACCOUNTING-v1.1.md (+ .csv tables). PRIVATE worlds are written to
// _staging/private/audit/ instead (never into the repository).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { REPO_ROOT } from '../lib/archive.mjs';
import { worldsManifest } from '../lib/open.mjs';
import { fixtureFile, isPrivateWorld, PRIVATE_DIR, parseJsonlBuffer } from '../lib/fixtures-io.mjs';
import { STATUSES, LEVELS } from '../lib/status.mjs';

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const OUT = path.resolve(arg('out', path.join(REPO_ROOT, 'reports', 'audit')));
const ONLY = arg('worlds')?.split(',');
const COLS = [...STATUSES, 'NOT_EVALUATED'];
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
// --scan: audit whatever results are on disk (results/<converter>/<run>/summary.json), against
// the fixture registries on disk, instead of the runs and hashes recorded in the freeze.
const SCAN = process.argv.includes('--scan');
const freezeFile = path.join(REPO_ROOT, 'reports', 'freeze', 'FREEZE-v1.1.json');
const freeze = !SCAN && fs.existsSync(freezeFile) ? JSON.parse(fs.readFileSync(freezeFile, 'utf8')) : {};
const recorded = [...(freeze.measured_before_freeze || []), ...(freeze.measured_after_freeze || [])];
if (SCAN) {
  const base = path.join(REPO_ROOT, 'results');
  for (const conv of fs.existsSync(base) ? fs.readdirSync(base) : []) {
    if (!fs.statSync(path.join(base, conv)).isDirectory()) continue;
    for (const run of fs.readdirSync(path.join(base, conv))) {
      const sf = path.join(base, conv, run, 'summary.json');
      if (!fs.existsSync(sf)) continue;
      const s = JSON.parse(fs.readFileSync(sf, 'utf8'));
      recorded.push({ converter: s.converter, world: s.world, direct_run: s.direct_run, roundtrip_run: s.roundtrip_run,
        results_file: path.relative(REPO_ROOT, path.join(base, conv, run, 'results.jsonl.gz')), results_sha256: null, fixtures_content_sha256: s.fixtures?.content_sha256 });
    }
  }
}
const frozenFixture = new Map((freeze.fixtures || []).map((f) => [f.world, f]));

function resultsPath(entry) {
  const pub = path.join(REPO_ROOT, entry.results_file || '');
  if (entry.results_file && fs.existsSync(pub)) return pub;
  const priv = path.join(PRIVATE_DIR, 'results', entry.converter, entry.direct_run, 'results.jsonl.gz');
  return fs.existsSync(priv) ? priv : null;
}

// Signature of a FAIL: what makes two FAILs "the same problem".
function shape(v, depth = 0) {
  if (v == null) return v;
  if (typeof v === 'number') return '#';
  if (typeof v === 'string') return v.length > 60 ? v.slice(0, 60) + '…' : v.replace(/-?\d+(\.\d+)?/g, '#');
  if (Array.isArray(v)) return depth > 2 ? '[…]' : v.slice(0, 6).map((x) => shape(x, depth + 1));
  if (typeof v === 'object') {
    if (depth > 2) return '{…}';
    const o = {};
    for (const k of Object.keys(v).sort()) if (!['sample', 'matched', 'expected_count', 'observed_count'].includes(k)) o[k] = shape(v[k], depth + 1);
    return o;
  }
  return v;
}
const kindOf = (fx) => String(fx?.expected?.id ?? fx?.expected?.name ?? fx?.locator?.key ?? '');

const worlds = worldsManifest().worlds.filter((w) => ['ACTIVE', 'PRIVATE'].includes(w.status) && (!ONLY || ONLY.includes(w.id)));
const problems = [];
const tableA = [];      // world × level × converter
const tableB = [];      // world × family × aspect × level × converter
const clustersOut = []; // world × converter × level clusters
const fail = (msg) => { problems.push(msg); console.error('  ✗ ' + msg); };

for (const w of worlds) {
  const priv = isPrivateWorld(w.id);
  const fxFile = fixtureFile(w.id);
  if (!fs.existsSync(fxFile)) { fail(`${w.id}: fixture file missing`); continue; }
  const fxText = zlib.gunzipSync(fs.readFileSync(fxFile));
  const fxRows = parseJsonlBuffer(fxText);
  const fxContent = sha(fxText);
  const ff = frozenFixture.get(w.id);
  // A PRIVATE world is not in the public freeze: its reference is the fixture registry
  // every recorded result declares (they must all declare the same one — checked below).
  if (!ff && !priv && !SCAN) fail(`${w.id}: world absent from FREEZE fixtures`);
  else if (ff && ff.content_sha256 !== fxContent) fail(`${w.id}: fixture on disk ${fxContent.slice(0, 12)} ≠ frozen ${ff.content_sha256.slice(0, 12)}`);
  const subjects = new Map(fxRows.slice(1).map((s) => [s.id, s]));
  const assertionIds = [];
  for (const s of subjects.values()) for (const a of Object.keys(s.aspects || {})) assertionIds.push(`${s.id}#${a}`);
  const ASSERT = new Set(assertionIds);
  if (ASSERT.size !== assertionIds.length) fail(`${w.id}: duplicate assertion IDs inside the fixture registry`);
  console.error(`${w.id}: ${subjects.size} subjects, ${ASSERT.size} assertions`);

  // Official runs: first recorded entry per converter with a return leg (reruns are
  // direct-only determinism checks, compared separately below).
  const entries = recorded.filter((e) => e.world === w.id);
  if (!entries.length && priv) {
    // Private results are not listed in the public freeze: take every recorded evaluation
    // of this world under _staging/private/results (summary.json names its fixtures).
    const base = path.join(PRIVATE_DIR, 'results');
    for (const conv of fs.existsSync(base) ? fs.readdirSync(base) : []) {
      for (const run of fs.readdirSync(path.join(base, conv))) {
        const sf = path.join(base, conv, run, 'summary.json');
        if (!fs.existsSync(sf)) continue;
        const s = JSON.parse(fs.readFileSync(sf, 'utf8'));
        if (s.world !== w.id) continue;
        entries.push({ converter: s.converter, world: w.id, direct_run: s.direct_run, roundtrip_run: s.roundtrip_run,
          results_file: null, results_sha256: null, fixtures_content_sha256: s.fixtures?.content_sha256 });
      }
    }
  }
  const perConverter = new Map();
  for (const e of entries) {
    const cur = perConverter.get(e.converter);
    if (!cur || (!cur.roundtrip_run && e.roundtrip_run)) perConverter.set(e.converter, e);
  }
  const idSets = new Map();
  for (const [conv, e] of perConverter) {
    const file = resultsPath(e);
    if (!file) { fail(`${w.id} ${conv}: results file not found (${e.direct_run})`); continue; }
    const buf = fs.readFileSync(file);
    if (e.results_sha256 && sha(buf) !== e.results_sha256) fail(`${w.id} ${conv}: results file ${sha(buf).slice(0, 12)} ≠ recorded ${e.results_sha256.slice(0, 12)}`);
    if (e.fixtures_content_sha256 && e.fixtures_content_sha256 !== fxContent) fail(`${w.id} ${conv}: evaluated against fixtures ${e.fixtures_content_sha256.slice(0, 12)} ≠ frozen ${fxContent.slice(0, 12)}`);
    const rows = parseJsonlBuffer(zlib.gunzipSync(buf));
    const seenSubj = new Set();
    const seenAssert = new Set();
    const counts = {};   // level -> col -> n
    const fam = {};      // family|aspect|level -> col -> n
    const failSubjects = {}; // level -> Set
    const clusters = {}; // level -> sig -> {n, subjects:Set, example}
    for (const L of LEVELS) { counts[L] = Object.fromEntries(COLS.map((c) => [c, 0])); failSubjects[L] = new Set(); clusters[L] = new Map(); }
    for (const r of rows) {
      if (seenSubj.has(r.id)) fail(`${w.id} ${conv}: subject ${r.id} appears twice`);
      seenSubj.add(r.id);
      const fx = subjects.get(r.id);
      if (!fx) { fail(`${w.id} ${conv}: subject ${r.id} not in the frozen fixtures`); continue; }
      for (const [aspect, levels] of Object.entries(r.aspects || {})) {
        const aid = `${r.id}#${aspect}`;
        if (!ASSERT.has(aid)) { fail(`${w.id} ${conv}: assertion ${aid} not in the frozen fixtures`); continue; }
        if (seenAssert.has(aid)) fail(`${w.id} ${conv}: assertion ${aid} twice`);
        seenAssert.add(aid);
        for (const L of LEVELS) {
          const res = levels?.[L];
          const col = !res ? 'MISSING' : res.evaluated ? res.status : 'NOT_EVALUATED';
          if (!COLS.includes(col)) { fail(`${w.id} ${conv}: ${aid} ${L} has status ${col}`); continue; }
          counts[L][col]++;
          const fk = `${r.family}|${aspect}|${L}`;
          (fam[fk] ||= Object.fromEntries(COLS.map((c) => [c, 0])))[col]++;
          if (col === 'FAIL') {
            failSubjects[L].add(r.id);
            const sig = JSON.stringify([r.family, aspect, res.rule, kindOf(fx), shape(res.evidence)]);
            const c = clusters[L].get(sig) || { n: 0, subjects: new Set(), example: { id: r.id, evidence: res.evidence } };
            c.n++; c.subjects.add(r.id); clusters[L].set(sig, c);
          }
        }
      }
    }
    const missing = [...ASSERT].filter((a) => !seenAssert.has(a));
    if (missing.length) fail(`${w.id} ${conv}: ${missing.length} frozen assertions absent from results (e.g. ${missing[0]})`);
    idSets.set(conv, seenAssert);
    // I4 + I6
    const summaryFile = path.join(path.dirname(file), 'summary.json');
    const summary = fs.existsSync(summaryFile) ? JSON.parse(fs.readFileSync(summaryFile, 'utf8')) : null;
    const sumRows = summary ? (Array.isArray(summary.summary) ? summary.summary : Object.values(summary.summary || {})) : [];
    for (const L of LEVELS) {
      const total = COLS.reduce((a, c) => a + counts[L][c], 0);
      if (total !== ASSERT.size) fail(`${w.id} ${conv} ${L}: statuses sum to ${total}, fixture has ${ASSERT.size}`);
      if (summary) {
        const pub = Object.fromEntries(COLS.map((c) => [c, 0]));
        for (const s of sumRows) if (s.level === L) { for (const c of STATUSES) pub[c] += s.counts?.[c] || 0; pub.NOT_EVALUATED += s.not_evaluated || 0; }
        for (const c of COLS) if (pub[c] !== counts[L][c]) fail(`${w.id} ${conv} ${L}: summary.json ${c}=${pub[c]} but results.jsonl.gz ${c}=${counts[L][c]}`);
      }
      tableA.push({ world: w.id, private: priv, converter: conv, run: e.direct_run, level: L, total, ...counts[L], fail_subjects: failSubjects[L].size, fail_clusters: clusters[L].size });
      const top = [...clusters[L].entries()].sort((a, b) => b[1].n - a[1].n);
      for (const [sig, c] of top) {
        const [family, aspect, rule, kind] = JSON.parse(sig);
        clustersOut.push({ world: w.id, private: priv, converter: conv, level: L, family, aspect, rule, kind, assertions: c.n, subjects: c.subjects.size, signature: sig, example: c.example.id, example_evidence: JSON.stringify(c.example.evidence ?? null).slice(0, 300) });
      }
    }
    for (const [fk, c] of Object.entries(fam)) {
      const [family, aspect, level] = fk.split('|');
      tableB.push({ world: w.id, private: priv, converter: conv, family, aspect, level, total: COLS.reduce((a, k) => a + c[k], 0), ...c });
    }
  }
  // I5
  const convs = [...idSets.keys()];
  for (let i = 1; i < convs.length; i++) {
    const a = idSets.get(convs[0]), b = idSets.get(convs[i]);
    const onlyA = [...a].filter((x) => !b.has(x)).length, onlyB = [...b].filter((x) => !a.has(x)).length;
    if (onlyA || onlyB) fail(`${w.id}: ${convs[0]} and ${convs[i]} do not share the same assertion IDs (${onlyA} only in ${convs[0]}, ${onlyB} only in ${convs[i]})`);
  }
  // Direct-only reruns: same direct-level statuses as the official run.
  for (const e of entries.filter((x) => !x.roundtrip_run && /rerun/.test(x.direct_run))) {
    const off = perConverter.get(e.converter);
    const f1 = resultsPath(e), f0 = off && resultsPath(off);
    if (!f1 || !f0) continue;
    const pick = (f) => {
      const m = new Map();
      for (const r of parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(f)))) for (const [a, lv] of Object.entries(r.aspects || {})) m.set(`${r.id}#${a}`, JSON.stringify(lv.direct));
      return m;
    };
    const m0 = pick(f0), m1 = pick(f1);
    let diff = 0;
    for (const [k, v] of m0) if (m1.get(k) !== v) diff++;
    if (diff) fail(`${w.id} ${e.converter}: rerun ${e.direct_run} differs from ${off.direct_run} on ${diff} direct assertions`);
    else console.error(`  ✓ ${e.direct_run} = ${off.direct_run} on all ${m0.size} direct assertions`);
  }
}

// ── Output ────────────────────────────────────────────────────────────────────
const write = (dir, rowsA, rowsB, rowsC, label) => {
  fs.mkdirSync(dir, { recursive: true });
  const csv = (rows) => {
    if (!rows.length) return '';
    const keys = Object.keys(rows[0]);
    return [keys.join(','), ...rows.map((r) => keys.map((k) => JSON.stringify(r[k] ?? '')).join(','))].join('\n') + '\n';
  };
  fs.writeFileSync(path.join(dir, 'accounting-by-world.csv'), csv(rowsA));
  fs.writeFileSync(path.join(dir, 'accounting-by-aspect.csv'), csv(rowsB));
  fs.writeFileSync(path.join(dir, 'fail-clusters.csv'), csv(rowsC));
  const md = [];
  md.push(`# MCCB v1.1 — accounting audit (${label})`, '');
  md.push(`Generated by \`tools/results/audit-accounting.mjs\` from the recorded results and the frozen fixture registries (\`reports/freeze/FREEZE-v1.1.json\`). Read-only: no rule, fixture or result is modified.`, '');
  md.push(`## Invariants`, '');
  md.push(problems.length ? problems.map((p) => `- ✗ ${p}`).join('\n') : '- ✓ I1 results files = files recorded in the freeze\n- ✓ I2 evaluated against the frozen fixture registries, identical to the files on disk\n- ✓ I3 every frozen assertion appears exactly once per converter, nothing else\n- ✓ I4 per level, the seven columns sum to the fixture total\n- ✓ I5 all converters of a world share the same assertion IDs and totals\n- ✓ I6 summary.json = recount of results.jsonl.gz', '');
  md.push(`## Per world, level and converter`, '');
  md.push(`An **assertion** is one fixture subject × one aspect (identity, state, data, count…), measured once per level. "FAIL subjects" counts distinct blocks, items, entities… with at least one FAIL; "clusters" counts distinct FAIL signatures (family, aspect, rule, source kind, evidence shape) — candidate root causes.`, '');
  md.push('| world | level | converter | TOTAL | PASS | ADAPTED | PARTIAL | FAIL | UNSUPPORTED | N/A | NOT EVAL. | FAIL subjects | FAIL clusters |');
  md.push('|---|---|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|');
  for (const r of rowsA) md.push(`| ${r.world} | ${r.level} | ${r.converter} | ${r.total} | ${r.PASS} | ${r.ADAPTED} | ${r.PARTIAL} | ${r.FAIL} | ${r.UNSUPPORTED} | ${r.NOT_APPLICABLE} | ${r.NOT_EVALUATED} | ${r.fail_subjects} | ${r.fail_clusters} |`);
  md.push('', `## Largest FAIL clusters (top 5 per world × converter × level)`, '');
  md.push('| world | level | converter | family.aspect | source kind | rule | FAIL assertions | subjects | example |');
  md.push('|---|---|---|---|---|---|--:|--:|---|');
  const groups = new Map();
  for (const c of rowsC) { const k = `${c.world}|${c.level}|${c.converter}`; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(c); }
  for (const list of groups.values()) for (const c of list.slice(0, 5)) md.push(`| ${c.world} | ${c.level} | ${c.converter} | ${c.family}.${c.aspect} | \`${c.kind}\` | ${c.rule} | ${c.assertions} | ${c.subjects} | ${c.example} |`);
  md.push('', 'Full tables: `accounting-by-world.csv`, `accounting-by-aspect.csv`, `fail-clusters.csv`.', '');
  fs.writeFileSync(path.join(dir, 'ACCOUNTING-v1.1.md'), md.join('\n'));
};
write(OUT, tableA.filter((r) => !r.private), tableB.filter((r) => !r.private), clustersOut.filter((r) => !r.private), 'public worlds');
if (tableA.some((r) => r.private)) write(path.join(PRIVATE_DIR, 'audit'), tableA.filter((r) => r.private), tableB.filter((r) => r.private), clustersOut.filter((r) => r.private), 'PRIVATE worlds — never publish');
console.error(problems.length ? `\n${problems.length} invariant violation(s)` : '\nall invariants hold');
process.exit(problems.length ? 1 : 0);
