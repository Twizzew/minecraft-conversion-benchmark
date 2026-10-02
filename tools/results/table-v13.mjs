#!/usr/bin/env node
// MCCB v1.3 final table and integrity checks, from the graded rows (results.jsonl.gz).
//   node tools/results/table-v13.mjs --dir results/v1.3 [--private-dir _staging/private/results-v1.3]
//        [--builds "WS 0308840=worldswitch/ws-0308840_,WS 2.8.0=worldswitch/ws-fd9b735_,Chunker 1.20.0=chunker/chunker-1.20.0_"]
//        [--md out.md] [--json out.json] [--worlds J01@1.1,...] [--expect-scorer current|<sha256>]
//        [--legacy-unfingerprinted]  --freeze reports/freeze/FREEZE-v1.3.json[,addendum.json] | --dev
// OFFICIAL table (v1.3 closure, pass 3): `--freeze` is REQUIRED — every result must have been
// graded with exactly the fixture content its freeze recorded, and every fingerprinted result
// must say it was graded officially against that freeze. `--dev` builds a table against the
// registries on disk; it is marked DEV, never an official table. Neither option → refused.
// Checks, per world: every converter has exactly the same assertions (subject#aspect at each
// level), each counted once; the status counts add up to the number of assertions; nothing
// NOT_EVALUATED is counted as PASS. Counts only: no score, no ranking, worlds never added.
//
// v1.3 closure — a result is used only if it is the ONE result of that build for that world
// and it is what it claims to be; otherwise the table is refused (exit 1, reasons on stderr):
//  - exactly one result folder <prefix><world>_<j2b|b2j> (none = partial suite, more = ambiguous);
//  - summary identity: world, converter, run ids (folder = direct run, return run = direct + 2x);
//  - results.jsonl.gz hash and row count = those recorded in its summary.json;
//  - fixture registry content = the freeze's (--freeze), or the registry on disk (--dev only);
//  - direct / return output hashes = an AUTHENTICATED output registry (--outputs, REQUIRED in the
//    official mode: the historical outputs); in --dev, <dir>/OUTPUTS.sha256 when that file exists;
//  - one converter build per label;
//  - scorer and ruleset fingerprints: identical across the table, and the scorer = the tools on
//    disk (or --expect-scorer <sha256>). Results without fingerprints (written before the v1.3
//    closure) only with --legacy-unfingerprinted, and never mixed with fingerprinted ones.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { REPO_ROOT } from '../lib/archive.mjs';
import { readFixtures } from '../lib/fixtures-io.mjs';
import { scorerIdentity, rulesetIdentity } from '../lib/fingerprint.mjs';
import { freezeFixtureRefs } from '../lib/freeze-ref.mjs';
import { outputRegistry } from '../lib/output-registry.mjs';

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const dir = path.resolve(REPO_ROOT, arg('dir', 'results/v1.3'));
const pdir = arg('private-dir') ? path.resolve(REPO_ROOT, arg('private-dir')) : null;
const BUILDS = arg('builds', 'WS 0308840=worldswitch/ws-0308840_,WS 2.8.0 (fd9b735)=worldswitch/ws-fd9b735_,Chunker 1.20.0=chunker/chunker-1.20.0_')
  .split(',').map((x) => { const [label, p] = x.split('='); const [conv, prefix] = p.split('/'); return { label, conv, prefix }; });
const WORLDS = arg('worlds')?.split(',') ?? ['J01@1.1', 'J02@1.0', 'J03@1.0', 'J04@1.0', 'B01@1.0', 'B02@1.0', 'B03@1.0', ...(pdir ? ['GURREN@1.0'] : [])];
const legacyOk = process.argv.includes('--legacy-unfingerprinted');
const expectScorer = arg('expect-scorer', 'current');
const problems = [];
const bad = (m) => problems.push(m);
// Reference fixture contents: the freeze (official), or the registries on disk (--dev).
const freezeArg = arg('freeze') ?? arg('fixtures-ref');
const dev = process.argv.includes('--dev');
if (!!freezeArg === dev) { console.error(`TABLE REFUSED — give --freeze <FREEZE.json[,addendum]> for an official table, or --dev for a non-official one${dev ? ' (not both)' : ''}`); process.exit(1); }
let freeze = null;
if (freezeArg) { try { freeze = freezeFixtureRefs(freezeArg); } catch (e) { console.error(`TABLE REFUSED — ${e.message}`); process.exit(1); } }
const fixtureContent = (world) => {
  if (freeze) return freeze.fixtures.get(world) ?? null;
  try { return readFixtures(world).content_sha256; } catch { return null; }
};
const freezeShas = freeze ? freeze.files.map((f) => f.sha256).sort().join(',') : null;
// official: the outputs must be the historical ones — an authenticated registry is REQUIRED
let registry = null;
if (freeze) {
  if (!arg('outputs')) { console.error('TABLE REFUSED — an official table needs --outputs <published OUTPUTS.sha256[,…]>: the historical outputs the results must have judged'); process.exit(1); }
  try { registry = outputRegistry(arg('outputs')); } catch (e) { console.error(`TABLE REFUSED — ${e.message}`); process.exit(1); }
}
const registryShas = registry ? registry.files.map((f) => f.sha256).sort().join(',') : null;
const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const outputsList = (base) => {
  const f = path.join(base, 'OUTPUTS.sha256');
  if (!fs.existsSync(f)) return null;
  const m = new Map();
  for (const l of fs.readFileSync(f, 'utf8').split(/\r?\n/)) { const x = l.trim().split(/\s+/); if (/^[0-9a-f]{64}$/.test(x[0] || '')) m.set(x[1], x[0]); }
  return m;
};
const outputsByRoot = new Map();
const fingerprints = [];
const buildOf = new Map();
const ST = ['PASS', 'ADAPTED', 'PARTIAL', 'FAIL', 'UNSUPPORTED', 'NOT_APPLICABLE'];
const LEVELS = ['direct', 'roundtrip'];

function load(b, world) {
  const root = world.startsWith('GURREN') ? pdir : dir;
  const base = path.join(root, b.conv);
  const tag = `${b.label} / ${world}`;
  const cands = fs.existsSync(base) ? fs.readdirSync(base).filter((x) => x.startsWith(`${b.prefix}${world}_`)) : [];
  if (!cands.length) { bad(`${tag}: result missing (partial suite)`); return null; }
  if (cands.length > 1) { bad(`${tag}: ambiguous — ${cands.length} result folders: ${cands.join(', ')}`); return null; }
  const d = cands[0];
  const dirn = d.slice(`${b.prefix}${world}_`.length);
  if (!['j2b', 'b2j'].includes(dirn)) { bad(`${tag}: unexpected result folder ${d}`); return null; }
  let summary, raw;
  try { summary = JSON.parse(fs.readFileSync(path.join(base, d, 'summary.json'), 'utf8')); raw = fs.readFileSync(path.join(base, d, 'results.jsonl.gz')); } catch (e) { bad(`${tag}: unreadable result (${e.message})`); return null; }
  // identity of what was graded
  if (summary.world !== world) bad(`${tag}: identity — summary is for world ${summary.world}`);
  if (summary.converter !== b.conv) bad(`${tag}: identity — summary is for converter ${summary.converter}`);
  if (summary.direct_run !== d) bad(`${tag}: identity — summary direct run ${summary.direct_run} ≠ folder ${d}`);
  if (summary.roundtrip_run !== `${d}2${dirn[0]}`) bad(`${tag}: identity — return run ${summary.roundtrip_run} ≠ ${d}2${dirn[0]}`);
  if (sha256(raw) !== summary.results_file?.sha256) bad(`${tag}: results.jsonl.gz sha256 ${sha256(raw)} ≠ summary ${summary.results_file?.sha256}`);
  const wantFx = fixtureContent(world);
  if (!wantFx) bad(`${tag}: no reference fixture content for ${world} (${freeze ? 'the freeze files given do not record this world' : 'fixture registry not readable'})`);
  else if (summary.fixtures?.content_sha256 !== wantFx) bad(`${tag}: fixture registry content ${summary.fixtures?.content_sha256} ≠ reference ${wantFx}`);
  if (!outputsByRoot.has(root)) outputsByRoot.set(root, registry ? registry.outputs : outputsList(root));
  const outs = outputsByRoot.get(root);
  if (registry && summary.scorer && (summary.grading?.outputs || []).map((f) => f.sha256).sort().join(',') !== registryShas) bad(`${tag}: not graded against the output registry given (${(summary.grading?.outputs || []).map((f) => f.file).join(', ') || 'none recorded'})`);
  if (outs) {
    if (outs.get(summary.direct_run) !== summary.direct_output_sha256) bad(`${tag}: direct output ${summary.direct_output_sha256} not the one listed in OUTPUTS.sha256 (${outs.get(summary.direct_run) ?? 'absent'})`);
    if (outs.get(summary.roundtrip_run) !== summary.roundtrip_output_sha256) bad(`${tag}: return output ${summary.roundtrip_output_sha256} not the one listed in OUTPUTS.sha256 (${outs.get(summary.roundtrip_run) ?? 'absent'})`);
  }
  // one converter build per label (name / version / commit; per direction, the same tool file)
  const cb = summary.converter_build || {};
  for (const [k, v] of [[b.label, JSON.stringify([cb.name, cb.version, cb.commit])], [`${b.label}|${dirn}`, JSON.stringify([cb.tool_file ?? null, cb.tool_sha256 ?? null])]]) {
    if (buildOf.has(k) && buildOf.get(k) !== v) bad(`${tag}: converter build differs from the other worlds of ${b.label}`);
    buildOf.set(k, v);
  }
  fingerprints.push({ tag, scorer: summary.scorer?.fingerprint ?? null, ruleset: summary.ruleset?.fingerprint ?? null });
  // official table: a result written by the v1.3-closure evaluator must have been graded
  // OFFICIALLY against the same freeze files (results written before carry no grading record)
  if (freeze && summary.scorer) {
    const g = summary.grading;
    if (g?.mode !== 'official') bad(`${tag}: graded in ${g?.mode ?? 'unknown'} mode, not an official grading against the freeze`);
    else if ((g.freeze || []).map((f) => f.sha256).sort().join(',') !== freezeShas) bad(`${tag}: graded against other freeze files (${(g.freeze || []).map((f) => f.file).join(', ')})`);
  }
  const buf = zlib.gunzipSync(raw);
  const c = Object.fromEntries(LEVELS.map((L) => [L, { ...Object.fromEntries(ST.map((s) => [s, 0])), NOT_EVALUATED: 0, total: 0, byFamily: {} }]));
  const ids = new Set(); let dup = 0; let nePass = 0; let badStatus = 0;
  // the rows must add up to the counts the evaluation recorded in its summary (every level)
  const agg = new Map();
  const ALL = ['direct', 'behavior', 'roundtrip'];
  let start = 0;
  for (let i = buf.indexOf(10); i !== -1; start = i + 1, i = buf.indexOf(10, start)) {
    const row = JSON.parse(buf.toString('utf8', start, i));
    for (const [asp, lv] of Object.entries(row.aspects)) for (const L of ALL) {
      const x = lv[L];
      if (!x) { if (L !== 'behavior') badStatus++; continue; }
      const k = `${row.family}|${asp}|${L}`;
      const a = agg.get(k) || agg.set(k, { counts: Object.fromEntries(ST.map((t) => [t, 0])), not_evaluated: 0 }).get(k);
      // the same tally as evaluate.mjs's summary (status validity is checked separately below)
      if (x.evaluated) a.counts[x.status] = (a.counts[x.status] || 0) + 1; else a.not_evaluated++;
      // a status is one of the six, carried by an EVALUATED assertion only (every level)
      if (x.evaluated === false && x.status != null) { nePass++; continue; }
      if (!(x.evaluated === true && ST.includes(x.status)) && !(x.evaluated === false && typeof x.reason === 'string')) { badStatus++; continue; }
      if (!LEVELS.includes(L)) continue;
      const key = `${row.id}#${asp}#${L}`;
      if (ids.has(key)) dup++; ids.add(key);
      const s = x.evaluated ? x.status : 'NOT_EVALUATED';
      c[L][s]++; c[L].total++;
      const f = (c[L].byFamily[row.family] ||= Object.fromEntries([...ST, 'NOT_EVALUATED'].map((k) => [k, 0])));
      f[s]++;
    }
  }
  let rows = 0;
  for (let i = buf.indexOf(10), st = 0; i !== -1; st = i + 1, i = buf.indexOf(10, st)) rows++;
  if (rows !== summary.results_file?.subjects) bad(`${tag}: ${rows} result rows ≠ ${summary.results_file?.subjects} recorded`);
  if (nePass) bad(`${tag}: ${nePass} NOT_EVALUATED assertion(s) carry a status`);
  if (badStatus) bad(`${tag}: ${badStatus} assertion level(s) with no valid status / reason`);
  const recorded = new Map((summary.summary || []).map((x) => [`${x.family}|${x.aspect}|${x.level}`, x]));
  const keys = new Set([...agg.keys(), ...recorded.keys()]);
  const off = [...keys].filter((k) => { const a = agg.get(k), r = recorded.get(k); return !a || !r || a.not_evaluated !== r.not_evaluated || [...new Set([...ST, ...Object.keys(a.counts), ...Object.keys(r.counts || {})])].some((t) => (a.counts[t] || 0) !== (r.counts?.[t] || 0)); });
  if (off.length) bad(`${tag}: rows do not add up to the counts recorded in summary.json (${off.length} family/aspect/level, e.g. ${off.slice(0, 3).join(', ')})`);
  return { run: d, summary, counts: c, ids, dup, nePass };
}

const out = { worlds: {}, checks: [] };
const md = ['# MCCB v1.3 — final comparison (counts per assertion)', '', ...(dev ? ['**DEV TABLE — not an official MCCB table: graded against the fixture registries on disk, not locked on a freeze.**', ''] : []),
  'Cell: PASS / ADAPTED / PARTIAL / **FAIL** — then NOT_EVALUATED (never counted as PASS). NOT_APPLICABLE and UNSUPPORTED are in the raw results.',
  'No score, no ranking; worlds are never added together.', '',
  `Builds: ${BUILDS.map((b) => b.label).join(' · ')}.`, ''];
const loaded = new Map();
for (const w of WORLDS) loaded.set(w, BUILDS.map((b) => load(b, w)));
// fingerprints: one scorer, one rule set, the current scorer unless told otherwise
const legacy = fingerprints.filter((f) => !f.scorer || !f.ruleset);
if (legacy.length && legacy.length !== fingerprints.length) bad(`mixed results: ${legacy.length} without scorer/ruleset fingerprint (${legacy.slice(0, 3).map((f) => f.tag).join('; ')}…) next to ${fingerprints.length - legacy.length} with one — never mixed`);
else if (legacy.length && !legacyOk) bad(`${legacy.length} result(s) without scorer/ruleset fingerprint (written before the v1.3 closure): refused unless --legacy-unfingerprinted`);
if (!legacy.length && fingerprints.length) {
  const sc = new Set(fingerprints.map((f) => f.scorer)), rs = new Set(fingerprints.map((f) => f.ruleset));
  if (sc.size > 1) bad(`scorer fingerprints differ across the table: ${[...sc].join(', ')}`);
  if (rs.size > 1) bad(`ruleset fingerprints differ across the table: ${[...rs].join(', ')}`);
  const want = expectScorer === 'current' ? scorerIdentity().fingerprint : expectScorer;
  if (sc.size === 1 && !sc.has(want)) bad(`stale results: scorer fingerprint ${[...sc][0]} ≠ ${expectScorer === 'current' ? 'the scorer on disk' : 'the expected one'} ${want}`);
  const wantRules = rulesetIdentity().fingerprint;
  if (rs.size === 1 && !rs.has(wantRules) && expectScorer === 'current') bad(`stale results: ruleset fingerprint ${[...rs][0]} ≠ the rules on disk ${wantRules}`);
}
if (problems.length) {
  console.error(`TABLE REFUSED — ${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
for (const L of LEVELS) {
  md.push(`## ${L === 'direct' ? 'Direct conversion' : 'Round trip'}`, '');
  md.push(`| World | assertions | ${BUILDS.map((b) => b.label).join(' | ')} |`, `|---|--:|${BUILDS.map(() => '---').join('|')}|`);
  for (const w of WORLDS) {
    const got = loaded.get(w);
    const ref = got.find(Boolean);
    if (!ref) continue;
    const tot = ref.counts[L].total;
    const cells = got.map((g) => (g ? `${g.counts[L].PASS} / ${g.counts[L].ADAPTED} / ${g.counts[L].PARTIAL} / **${g.counts[L].FAIL}** — NE ${g.counts[L].NOT_EVALUATED}` : 'not run'));
    md.push(`| ${w.split('@')[0]} | ${tot} | ${cells.join(' | ')} |`);
    if (L === 'direct') {
      out.worlds[w] = Object.fromEntries(BUILDS.map((b, i) => [b.label, got[i] ? { run: got[i].run, fixtures_content_sha256: got[i].summary.fixtures.content_sha256, direct_output_sha256: got[i].summary.direct_output_sha256, roundtrip_output_sha256: got[i].summary.roundtrip_output_sha256, counts: got[i].counts } : null]));
      // integrity
      const present = got.filter(Boolean);
      const sameIds = present.every((g) => g.ids.size === ref.ids.size && [...g.ids].every((k) => ref.ids.has(k)));
      const sameFixtures = present.every((g) => g.summary.fixtures.content_sha256 === ref.summary.fixtures.content_sha256);
      const sums = present.every((g) => LEVELS.every((l) => [...ST, 'NOT_EVALUATED'].reduce((n, s) => n + g.counts[l][s], 0) === g.counts[l].total));
      const once = present.every((g) => g.dup === 0);
      const neNotPass = present.every((g) => g.nePass === 0);
      out.checks.push({ world: w, converters: present.length, same_assertions: sameIds, same_fixture_registry: sameFixtures, sums_exact: sums, each_counted_once: once, not_evaluated_never_pass: neNotPass, assertions_per_level: ref.counts.direct.total });
    }
  }
  md.push('');
}
md.push('## Integrity checks', '', '| World | converters | same assertions | same fixture registry | sums exact | each once | NE never PASS | assertions / level |', '|---|--:|---|---|---|---|---|--:|');
for (const c of out.checks) md.push(`| ${c.world} | ${c.converters} | ${c.same_assertions} | ${c.same_fixture_registry} | ${c.sums_exact} | ${c.each_counted_once} | ${c.not_evaluated_never_pass} | ${c.assertions_per_level} |`);
// the integrity checks are FATAL: no table is written when one of them fails
for (const ck of out.checks) {
  for (const [k, label] of [['same_assertions', 'not the same assertions for every converter'], ['same_fixture_registry', 'not the same fixture registry'], ['sums_exact', 'status counts do not add up'], ['each_counted_once', 'an assertion is counted more than once (duplicate)'], ['not_evaluated_never_pass', 'a NOT_EVALUATED assertion carries a status']]) {
    if (ck[k] !== true) bad(`${ck.world}: integrity check failed — ${label} (${k})`);
  }
}
if (problems.length) {
  console.error(`TABLE REFUSED — ${problems.length} problem(s):\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
const text = md.join('\n') + '\n';
if (arg('md')) fs.writeFileSync(path.resolve(REPO_ROOT, arg('md')), text);
if (arg('json')) fs.writeFileSync(path.resolve(REPO_ROOT, arg('json')), JSON.stringify(out, null, 1) + '\n');
process.stdout.write(text);
if (dev) console.error("DEV TABLE — not an official MCCB table (no freeze lock).");
