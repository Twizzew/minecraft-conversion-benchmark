// v1.3 closure — C. evaluate-suite / table: a failed child fails the suite, nothing is promoted
// before the whole suite succeeded, and the table never reuses a stale, partial, ambiguous or
// altered result silently. Runs the real CLIs on the public Bedrock sources used as stand-in
// "outputs" (no conversion: the files are only read). Skipped when the sources are absent.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const TOOLS = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const REPO = path.resolve(TOOLS, '..');
const SRC_DIR = process.env.MCCB_SOURCES_DIR || path.join(REPO, '_staging', 'v1.1-source-worlds');
const SRC = {
  'B01@1.0': ['MCCB_B01_STATIC_BEDROCK.mcworld', '83e8e9909a3d8915980df317073b80c11421152d8f7ed88714fd196e45c0a667'],
  'B02@1.0': ['MCCB_B02_LIVING_BEDROCK.mcworld', '34d9b5dfaff557ef5e3907cae8fba31fc5de8dc03cb49c145ab14b0e6f6ccd10'],
};
const have = Object.values(SRC).every(([f]) => fs.existsSync(path.join(SRC_DIR, f)));
const skip = have ? false : `public Bedrock sources not found in ${SRC_DIR}`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-pipeline-'));
const RUNS = path.join(tmp, 'runs'), RES = path.join(tmp, 'res'), WORK = path.join(tmp, 'work');
const env = { ...process.env, MCCB_RUNS_DIR: RUNS, MCCB_WORK_DIR: WORK };
const suiteFile = path.join(tmp, 'suite.json');

function mkRun(id, srcSha, file, outSha) {
  fs.mkdirSync(path.join(RUNS, id), { recursive: true });
  fs.copyFileSync(file, path.join(RUNS, id, 'output.mcworld'));
  fs.writeFileSync(path.join(RUNS, id, 'run.json'), JSON.stringify({ run_id: id, source: { sha256: srcSha }, output: { file: 'output.mcworld', sha256: outSha }, converter: { name: 'T', build: 'test' }, direction: 'bedrock_to_java', options: {} }));
}
function setup() {
  fs.rmSync(RUNS, { recursive: true, force: true }); fs.rmSync(RES, { recursive: true, force: true });
  for (const [w, [f, sha]] of Object.entries(SRC)) { const file = path.join(SRC_DIR, f); mkRun(`t-1_${w}_b2j`, sha, file, sha); mkRun(`t-1_${w}_b2j2b`, sha, file, sha); }
  fs.writeFileSync(suiteFile, JSON.stringify({ worlds: Object.keys(SRC).map((id) => ({ id, direction: 'bedrock_to_java' })) }));
}
const suite = () => spawnSync(process.execPath, [path.join(TOOLS, 'oracles', 'evaluate-suite.mjs'), '--converter', 't', '--prefix', 't-1', '--suite', suiteFile, '--results-dir', RES, '--heap', '2048', '--dev'], { env, encoding: 'utf8' }); // generic mechanics; the freeze lock is tested in pass3
const table = (...extra) => spawnSync(process.execPath, [path.join(TOOLS, 'results', 'table-v13.mjs'), '--dir', RES, '--builds', 'T=t/t-1_', '--worlds', 'B01@1.0,B02@1.0', '--dev', ...extra], { env, encoding: 'utf8' });
const dirOf = (w) => path.join(RES, 't', `t-1_${w}_b2j`);
const summaryOf = (w) => JSON.parse(fs.readFileSync(path.join(dirOf(w), 'summary.json'), 'utf8'));
const writeSummary = (w, s) => fs.writeFileSync(path.join(dirOf(w), 'summary.json'), JSON.stringify(s, null, 1) + '\n');
const breakRun = (id) => { const f = path.join(RUNS, id, 'run.json'); const d = JSON.parse(fs.readFileSync(f, 'utf8')); d.output.sha256 = '0'.repeat(64); fs.writeFileSync(f, JSON.stringify(d)); };

test('complete suite: exit 0, results promoted, table accepted', { skip }, () => {
  setup();
  const s = suite();
  assert.equal(s.status, 0, s.stdout + s.stderr);
  for (const w of Object.keys(SRC)) assert.ok(fs.existsSync(path.join(dirOf(w), 'results.jsonl.gz')));
  const t = table();
  assert.equal(t.status, 0, t.stdout + t.stderr);
  const sm = summaryOf('B01@1.0');
  assert.match(sm.scorer?.fingerprint || '', /^[0-9a-f]{64}$/, 'scorer fingerprint recorded');
  assert.match(sm.ruleset?.fingerprint || '', /^[0-9a-f]{64}$/, 'ruleset fingerprint recorded');
  assert.ok(sm.scorer.files['tools/package.json'] && sm.scorer.files['tools/package-lock.json'], 'package files in the scorer identity');
});

test('child failure: suite exits non-zero and promotes nothing (old results untouched)', { skip }, () => {
  setup();
  assert.equal(suite().status, 0);
  const before = Object.fromEntries(Object.keys(SRC).map((w) => [w, fs.readFileSync(path.join(dirOf(w), 'summary.json'), 'utf8')]));
  // mark the existing results as produced by another (older) scorer
  for (const w of Object.keys(SRC)) { const s = summaryOf(w); s.scorer.fingerprint = 'f'.repeat(64); writeSummary(w, s); }
  breakRun('t-1_B02@1.0_b2j');
  const s = suite();
  assert.notEqual(s.status, 0, 'a failed child must fail the suite');
  // A succeeded but must NOT have been promoted alone; B is still the old one
  assert.equal(summaryOf('B01@1.0').scorer.fingerprint, 'f'.repeat(64));
  assert.equal(summaryOf('B02@1.0').scorer.fingerprint, 'f'.repeat(64));
  void before;
  // …and the table refuses results of a scorer that is not the current one
  const t = table();
  assert.notEqual(t.status, 0, 'stale results (other scorer) must be rejected');
  assert.match(t.stderr, /scorer/i);
});

test('partial suite rejected', { skip }, () => {
  setup();
  assert.equal(suite().status, 0);
  fs.rmSync(dirOf('B02@1.0'), { recursive: true });
  const t = table();
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /missing|partial/i);
});

test('ambiguity rejected (two result folders for one world)', { skip }, () => {
  setup();
  assert.equal(suite().status, 0);
  fs.cpSync(dirOf('B01@1.0'), dirOf('B01@1.0') + '_rerun1', { recursive: true });
  const t = table();
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /ambiguous/i);
});

test('results hash verified', { skip }, () => {
  setup();
  assert.equal(suite().status, 0);
  const f = path.join(dirOf('B01@1.0'), 'results.jsonl.gz');
  const rows = zlib.gunzipSync(fs.readFileSync(f)).toString('utf8').split('\n');
  rows[0] = rows[0].replace('"status":"FAIL"', '"status":"PASS"');
  fs.writeFileSync(f, zlib.gzipSync(rows.join('\n')));
  const t = table();
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /results.*sha|hash/i);
});

test('fixture content and run identity verified', { skip }, () => {
  setup();
  assert.equal(suite().status, 0);
  const s = summaryOf('B01@1.0');
  writeSummary('B01@1.0', { ...s, fixtures: { ...s.fixtures, content_sha256: 'a'.repeat(64) } });
  let t = table();
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /fixture/i);
  writeSummary('B01@1.0', { ...s, world: 'B02@1.0' });
  t = table();
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /world|identity/i);
  writeSummary('B01@1.0', { ...s, converter: 'other' });
  t = table();
  assert.notEqual(t.status, 0);
});

test('scorer / ruleset fingerprints: mixing is rejected; legacy (unfingerprinted) only on request and never mixed', { skip }, () => {
  setup();
  assert.equal(suite().status, 0);
  const s = summaryOf('B01@1.0');
  writeSummary('B01@1.0', { ...s, ruleset: { ...s.ruleset, fingerprint: 'b'.repeat(64) } });
  let t = table();
  assert.notEqual(t.status, 0);
  assert.match(t.stderr, /ruleset/i);
  const legacy = { ...s }; delete legacy.scorer; delete legacy.ruleset;
  writeSummary('B01@1.0', legacy);
  t = table();
  assert.notEqual(t.status, 0, 'unfingerprinted result refused by default');
  t = table('--legacy-unfingerprinted');
  assert.notEqual(t.status, 0, 'legacy and fingerprinted results never mixed');
  const legacy2 = { ...summaryOf('B02@1.0') }; delete legacy2.scorer; delete legacy2.ruleset;
  writeSummary('B02@1.0', legacy2);
  t = table('--legacy-unfingerprinted');
  assert.equal(t.status, 0, t.stdout + t.stderr);
});

test('evaluate: an expected fixture content that does not match is fatal and writes nothing', { skip }, () => {
  setup();
  const out = path.join(tmp, 'single');
  const r = spawnSync(process.execPath, [path.join(TOOLS, 'oracles', 'evaluate.mjs'), '--world', 'B01@1.0', '--direct', 't-1_B01@1.0_b2j', '--roundtrip', 't-1_B01@1.0_b2j2b', '--converter', 't', '--out', out, '--expect-fixtures-content', 'a'.repeat(64)], { env, encoding: 'utf8' });
  assert.equal(r.status, 2, r.stderr);
  assert.match(r.stderr, /FIXTURE CHECK FAILED/);
  assert.equal(fs.existsSync(out), false);
});

test('a second complete suite moves the old results to .superseded, which the table never reads', { skip }, () => {
  setup();
  assert.equal(suite().status, 0);
  assert.equal(suite().status, 0);
  const sup = path.join(RES, '.superseded');
  assert.ok(fs.existsSync(sup), '.superseded created');
  const t = table();
  assert.equal(t.status, 0, t.stdout + t.stderr);
  // even a copy of a result next to the active ones under another name is refused, never merged
  fs.cpSync(dirOf('B02@1.0'), path.join(RES, 't', '.superseded-copy_B02@1.0_b2j'), { recursive: true });
  assert.equal(table().status, 0, 'a folder not named <prefix><world>_ is not a candidate');
});
