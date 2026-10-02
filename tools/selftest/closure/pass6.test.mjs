// v1.3 closure, sixth pass: provenance of a grading — the scorer identity covers every executive
// input, the table's invariants are FATAL, and an official grading is pinned on the historical
// outputs.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const TOOLS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO = path.resolve(TOOLS, '..');
const SRCDIR = process.env.MCCB_SOURCES_DIR || path.join(REPO, '_staging', 'v1.1-source-worlds');
const SOURCES = { 'B01@1.0': ['MCCB_B01_STATIC_BEDROCK.mcworld', '83e8e9909a3d8915980df317073b80c11421152d8f7ed88714fd196e45c0a667'], 'B02@1.0': ['MCCB_B02_LIVING_BEDROCK.mcworld', '34d9b5dfaff557ef5e3907cae8fba31fc5de8dc03cb49c145ab14b0e6f6ccd10'] };
const haveB = Object.values(SOURCES).every(([f]) => fs.existsSync(path.join(SRCDIR, f)));
const skipB = haveB ? false : `public Bedrock sources not found in ${SRCDIR}`;

// a disposable copy of the repository: the official checkout is never touched
function sandbox() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-p6-'));
  fs.cpSync(TOOLS, path.join(root, 'tools'), { recursive: true, filter: (s) => !s.includes(`${path.sep}node_modules`) });
  fs.symlinkSync(path.join(TOOLS, 'node_modules'), path.join(root, 'tools', 'node_modules'));
  for (const d of ['manifests', 'docs', path.join('reports', 'freeze')]) fs.cpSync(path.join(REPO, d), path.join(root, d), { recursive: true });
  for (const f of ['results/v1.3/OUTPUTS.sha256', 'results/v1.3-gurren/OUTPUTS.sha256']) { fs.mkdirSync(path.dirname(path.join(root, f)), { recursive: true }); fs.copyFileSync(path.join(REPO, f), path.join(root, f)); }
  fs.mkdirSync(path.join(root, 'fixtures'));
  for (const w of Object.keys(SOURCES)) fs.copyFileSync(path.join(REPO, 'fixtures', `${w.replace('@', '_')}.jsonl.gz`), path.join(root, 'fixtures', `${w.replace('@', '_')}.jsonl.gz`));
  const runs = path.join(root, 'runs');
  const env = { ...process.env, MCCB_RUNS_DIR: runs, MCCB_WORK_DIR: path.join(root, 'work') };
  const node = (script, args) => spawnSync(process.execPath, [path.join(root, 'tools', script), ...args], { env, encoding: 'utf8', cwd: root });
  const mkRun = (id, srcSha, file, outSha) => {
    fs.mkdirSync(path.join(runs, id), { recursive: true });
    if (file) fs.copyFileSync(file, path.join(runs, id, 'output.mcworld'));
    fs.writeFileSync(path.join(runs, id, 'run.json'), JSON.stringify({ run_id: id, source: { sha256: srcSha }, output: { file: 'output.mcworld', sha256: outSha }, converter: { name: 'T' }, direction: 'bedrock_to_java', options: {} }));
  };
  const suiteFile = path.join(root, 'suite.json');
  fs.writeFileSync(suiteFile, JSON.stringify({ worlds: Object.keys(SOURCES).map((id) => ({ id, direction: 'bedrock_to_java' })) }));
  const res = path.join(root, 'res');
  return {
    root, res, runs, mkRun, node,
    fingerprint: () => JSON.parse(node('lib/fingerprint.mjs', ['--print']).stdout).fingerprint,
    suite: (conv, prefix, ...a) => node('oracles/evaluate-suite.mjs', ['--converter', conv, '--prefix', prefix, '--suite', suiteFile, '--results-dir', res, '--heap', '2048', ...a]),
    table: (builds, ...a) => node('results/table-v13.mjs', ['--dir', res, '--builds', builds, '--worlds', 'B01@1.0,B02@1.0', ...a]),
  };
}

// ── 1. scorer identity ─────────────────────────────────────────────────────
test('scorer fingerprint changes with every executive input, not with documentation', () => {
  const s = sandbox();
  const base = s.fingerprint();
  assert.match(base, /^[0-9a-f]{64}$/);
  const mutate = (rel, fn) => { const f = path.join(s.root, rel); const old = fs.readFileSync(f); fs.writeFileSync(f, fn(old.toString('utf8'))); const fp = s.fingerprint(); fs.writeFileSync(f, old); return fp; };
  for (const rel of ['tools/java/classpath.mjs', 'tools/results/table-v13.mjs', 'tools/oracles/evaluate-suite.mjs', 'tools/java/src/MccbNormalize.java', 'tools/lib/nbt.mjs']) {
    assert.notEqual(mutate(rel, (t) => `${t}\n// mutated\n`), base, rel);
  }
  assert.notEqual(mutate('manifests/worlds.json', (t) => t.replace('"status": "PRIVATE"', '"status": "ACTIVE"')), base, 'manifests/worlds.json');
  assert.notEqual(mutate('docs/reference/identity-equivalence.v1.json', (t) => t.replace('"same-id"', '"same-idX"')), base, 'identity reference');
  assert.equal(mutate('docs/rules-changelog.md', (t) => `${t}\nnote\n`), base, 'documentation has no effect');
  assert.equal(s.fingerprint(), base, 'restored');
});

// ── 2. table invariants are fatal ──────────────────────────────────────────
function twoConverters(s) {
  for (const [w, [f, sha]] of Object.entries(SOURCES)) for (const id of [`t-1_${w}_b2j`, `t-1_${w}_b2j2b`]) s.mkRun(id, sha, path.join(SRCDIR, f), sha);
  assert.equal(s.suite('t', 't-1', '--dev').status, 0);
  // converter "u": the same rows, under its own identity (hashes unchanged)
  for (const w of Object.keys(SOURCES)) {
    const from = path.join(s.res, 't', `t-1_${w}_b2j`), to = path.join(s.res, 'u', `u-1_${w}_b2j`);
    fs.cpSync(from, to, { recursive: true });
    const sm = JSON.parse(fs.readFileSync(path.join(to, 'summary.json'), 'utf8'));
    Object.assign(sm, { converter: 'u', direct_run: `u-1_${w}_b2j`, roundtrip_run: `u-1_${w}_b2j2b` });
    fs.writeFileSync(path.join(to, 'summary.json'), JSON.stringify(sm, null, 1));
  }
}
const BUILDS = 'T=t/t-1_,U=u/u-1_';
// rewrite u's B01 rows and recompute every hash / count its summary records
// the summary counts exactly as evaluate.mjs tallies them
function tally(rows) {
  const m = new Map();
  for (const l of rows) {
    const r = JSON.parse(l);
    for (const [aspect, lv] of Object.entries(r.aspects)) for (const level of ['direct', 'behavior', 'roundtrip']) {
      const x = lv[level]; if (!x) continue;
      const k = `${r.family}|${aspect}|${level}`;
      const e = m.get(k) || m.set(k, { family: r.family, aspect, level, counts: { PASS: 0, ADAPTED: 0, PARTIAL: 0, FAIL: 0, UNSUPPORTED: 0, NOT_APPLICABLE: 0 }, not_evaluated: 0, reasons: {} }).get(k);
      if (x.evaluated) e.counts[x.status] = (e.counts[x.status] || 0) + 1; else { e.not_evaluated++; e.reasons[x.reason] = (e.reasons[x.reason] || 0) + 1; }
    }
  }
  return [...m.values()];
}
function rewriteRows(s, fn, { recount = true } = {}) {
  const dir = path.join(s.res, 'u', 'u-1_B01@1.0_b2j');
  const rows = zlib.gunzipSync(fs.readFileSync(path.join(dir, 'results.jsonl.gz'))).toString('utf8').trim().split('\n');
  const out = fn(rows);
  const buf = zlib.gzipSync(Buffer.from(out.join('\n') + '\n'));
  fs.writeFileSync(path.join(dir, 'results.jsonl.gz'), buf);
  const sm = JSON.parse(fs.readFileSync(path.join(dir, 'summary.json'), 'utf8'));
  sm.results_file = { ...sm.results_file, sha256: crypto.createHash('sha256').update(buf).digest('hex'), subjects: out.length };
  if (recount) sm.summary = tally(out);
  fs.writeFileSync(path.join(dir, 'summary.json'), JSON.stringify(sm, null, 1));
}

test('table: invariants accepted when they hold (two converters, dev mode)', { skip: skipB }, () => {
  const s = sandbox(); twoConverters(s);
  const t = s.table(BUILDS, '--dev');
  assert.equal(t.status, 0, t.stderr);
});
test('table: an assertion id that differs between converters (hashes recomputed) is FATAL', { skip: skipB }, () => {
  const s = sandbox(); twoConverters(s);
  rewriteRows(s, (rows) => { const r = JSON.parse(rows[0]); r.id = `${r.id}-other`; rows[0] = JSON.stringify(r); return rows; });
  const t = s.table(BUILDS, '--dev');
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /same assertions|same_assertions/i);
});
test('table: a duplicated assertion (hashes and row count recomputed) is FATAL', { skip: skipB }, () => {
  const s = sandbox(); twoConverters(s);
  rewriteRows(s, (rows) => [...rows, rows[0]]);
  const t = s.table(BUILDS, '--dev');
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /counted once|duplicate/i);
});
test('table: counts that disagree with the summary, and NOT_EVALUATED carrying a status, are FATAL', { skip: skipB }, () => {
  const s = sandbox(); twoConverters(s);
  rewriteRows(s, (rows) => rows.map((l) => l.replace('"evaluated":true,"status":"PASS"', '"evaluated":true,"status":"FAIL"')), { recount: false });
  let t = s.table(BUILDS, '--dev');
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /summary|counts/i);
  const s2 = sandbox(); twoConverters(s2);
  rewriteRows(s2, (rows) => { const i = rows.findIndex((l) => l.includes('"evaluated":false')); rows[i] = rows[i].replace('"evaluated":false,"status":null', '"evaluated":false,"status":"PASS"'); return rows; });
  t = s2.table(BUILDS, '--dev');
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /NOT_EVALUATED/);
});

// ── 3. official grading pinned on the historical outputs ────────────────────
const F = 'reports/freeze/FREEZE-v1.3.json';
test('official suite: no output registry, or an unauthenticated one → refused before grading', { skip: skipB }, () => {
  const s = sandbox();
  for (const [w, [f, sha]] of Object.entries(SOURCES)) for (const id of [`t-1_${w}_b2j`, `t-1_${w}_b2j2b`]) s.mkRun(id, sha, path.join(SRCDIR, f), sha);
  let r = s.suite('t', 't-1', '--freeze', F);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /--outputs/);
  const fake = path.join(s.root, 'OUTPUTS-fake.sha256');
  fs.writeFileSync(fake, fs.readFileSync(path.join(s.root, 'results/v1.3/OUTPUTS.sha256'), 'utf8') + `${SOURCES['B01@1.0'][1]}  t-1_B01@1.0_b2j  output.zip  T\n`);
  r = s.suite('t', 't-1', '--freeze', F, '--outputs', fake);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /not an official|authent/i);
  // the authenticated registry does not list these runs: refused, nothing graded
  r = s.suite('t', 't-1', '--freeze', F, '--outputs', 'results/v1.3/OUTPUTS.sha256');
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /t-1_B01@1\.0_b2j.*not .*historical|historical.*t-1_B01/s);
  assert.equal(fs.existsSync(path.join(s.res, 't')), false);
});
test('official suite: a run named like a historical one whose output is NOT the historical one → refused', { skip: skipB }, () => {
  const s = sandbox();
  const reg = Object.fromEntries(fs.readFileSync(path.join(REPO, 'results/v1.3/OUTPUTS.sha256'), 'utf8').split('\n').filter((l) => /^[0-9a-f]{64}/.test(l)).map((l) => { const [h, id] = l.split(/\s+/); return [id, h]; }));
  for (const [w, [f, sha]] of Object.entries(SOURCES)) {
    const d = `ws-0308840_${w}_b2j`;
    s.mkRun(d, sha, path.join(SRCDIR, f), sha);                       // claims a local output: differs from the registry
    s.mkRun(`${d}2b`, sha, path.join(SRCDIR, f), reg[`${d}2b`]);
  }
  let r = s.suite('worldswitch', 'ws-0308840', '--freeze', F, '--outputs', 'results/v1.3/OUTPUTS.sha256');
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /ws-0308840_B01@1\.0_b2j.*registry|registry.*ws-0308840_B01/s);
  // run records that claim the historical hashes but hold other bytes: the evaluation refuses the bytes
  for (const [w, [f, sha]] of Object.entries(SOURCES)) {
    const d = `ws-0308840_${w}_b2j`;
    s.mkRun(d, sha, path.join(SRCDIR, f), reg[d]);
    s.mkRun(`${d}2b`, reg[d], path.join(SRCDIR, f), reg[`${d}2b`]);
  }
  r = s.suite('worldswitch', 'ws-0308840', '--freeze', F, '--outputs', 'results/v1.3/OUTPUTS.sha256');
  assert.notEqual(r.status, 0);
  assert.doesNotMatch(r.stderr, /not the historical/);
  assert.equal(fs.existsSync(path.join(s.res, 'worldswitch')), false, 'nothing promoted');
});
test('official table: --outputs required; the published v1.3 table rebuilds with the authenticated registry', () => {
  const B = 'WS 0308840=worldswitch/ws-0308840_,WS 2.8.0 (fd9b735)=worldswitch/ws-fd9b735_,Chunker 1.20.0=chunker/chunker-1.20.0_,je2be core-8dfc4de=je2be/je2be-core-8dfc4de_';
  const run = (...a) => spawnSync(process.execPath, [path.join(TOOLS, 'results', 'table-v13.mjs'), '--dir', 'results/v1.3', '--builds', B, '--freeze', F, '--legacy-unfingerprinted', ...a], { encoding: 'utf8' });
  const no = run();
  assert.notEqual(no.status, 0);
  assert.match(no.stderr, /--outputs/);
  const ok = run('--outputs', 'results/v1.3/OUTPUTS.sha256');
  assert.equal(ok.status, 0, ok.stderr);
  assert.equal(ok.stdout, fs.readFileSync(path.join(REPO, 'results/v1.3/COMPARISON-v1.3.md'), 'utf8'));
});
