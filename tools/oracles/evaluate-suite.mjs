#!/usr/bin/env node
// Evaluate every run pair of a suite (direct leg + return leg) with the current fixtures.
//   node tools/oracles/evaluate-suite.mjs [--converter worldswitch] [--commit 0308840] [--prefix ws-0308840]
//        [--suite tools/runners/worldswitch/suite-mccb-v1.1.json] [--only J04@1.0,...]
//        [--results-dir results/v1.2] [--heap 12288]
//        --freeze reports/freeze/FREEZE-v1.3.json[,addendum.json] | --dev
//
// v1.3 closure, pass 3: an OFFICIAL suite is locked on its freeze (--freeze, required): before
// anything is graded, every world's fixture registry must have the content hash the freeze
// recorded — one mismatch or one world missing from the freeze refuses the WHOLE suite. Each
// evaluation gets --freeze too and records it. `--dev` grades against the registries on disk
// and is recorded as such; the official table refuses those results. Neither → refused.
//
// v1.3 closure: every pair is evaluated into a STAGING folder; the results replace the final
// ones only when EVERY pair succeeded (a child exiting non-zero fails the suite, exit 1, and
// nothing is promoted — the staging folder is kept for inspection). A replaced result is moved
// to <results-dir>/.superseded/<stamp>/, never deleted silently.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFixtures } from '../lib/fixtures-io.mjs';
import { freezeFixtureRefs } from '../lib/freeze-ref.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const converter = arg('converter', 'worldswitch');
const commit = arg('commit', '0308840');
const prefix = arg('prefix', `ws-${commit}`); // run ids are <prefix>_<world>_<j2b|b2j>[2j|2b]
const suite = JSON.parse(fs.readFileSync(path.resolve(arg('suite', path.join(ROOT, 'tools', 'runners', 'worldswitch', 'suite-mccb-v1.1.json'))), 'utf8'));
const only = arg('only')?.split(',');
// Where results go (default `results/`, the v1.1 location); a later version uses its own folder.
const resultsDir = path.resolve(ROOT, arg('results-dir', 'results'));
const heap = arg('heap', '12288');
const short = { java_to_bedrock: 'j2b', bedrock_to_java: 'b2j' };
const pairs = [];
for (const w of suite.worlds) {
  if (only && !only.includes(w.id)) continue;
  const d = `${prefix}_${w.id}_${short[w.direction]}`;
  pairs.push({ world: w.id, direct: d, roundtrip: `${d}2${short[w.direction][0]}` });
}
if (only && pairs.length !== only.length) { console.error(`--only names worlds that are not in the suite: ${only.filter((x) => !pairs.some((p) => p.world === x)).join(', ')}`); process.exit(1); }
if (!pairs.length) { console.error('empty suite'); process.exit(1); }
const freezeArg = arg('freeze');
const dev = process.argv.includes('--dev');
if (!!freezeArg === dev) { console.error(`SUITE REFUSED — give --freeze <FREEZE.json[,addendum]> for an official grading, or --dev for a non-official one${dev ? ' (not both)' : ''}`); process.exit(1); }
if (freezeArg) {
  let refs;
  try { refs = freezeFixtureRefs(freezeArg); } catch (e) { console.error(`SUITE REFUSED — ${e.message}`); process.exit(1); }
  const wrong = [];
  for (const p of pairs) {
    const want = refs.fixtures.get(p.world);
    let got = null;
    try { got = readFixtures(p.world).content_sha256; } catch (e) { got = `unreadable (${e.message.split('\n')[0]})`; }
    if (!want) wrong.push(`${p.world}: no fixture registry recorded in ${freezeArg}`);
    else if (got !== want) wrong.push(`${p.world}: fixture registry content ${got}, freeze records ${want}`);
  }
  if (wrong.length) { console.error(`SUITE REFUSED — fixture registries do not match the freeze (nothing graded):\n  ${wrong.join('\n  ')}`); process.exit(1); }
}

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const staging = path.join(resultsDir, '.staging', `${converter}-${prefix}-${stamp}-${process.pid}`);
const failed = [];
for (const p of pairs) {
  const t0 = Date.now();
  const out = path.join(staging, p.direct);
  const r = spawnSync(process.execPath, [`--max-old-space-size=${heap}`, path.join(HERE, 'evaluate.mjs'), '--world', p.world, '--direct', p.direct, '--roundtrip', p.roundtrip,
    '--converter', converter, '--out', out, ...(freezeArg ? ['--freeze', freezeArg] : [])], { encoding: 'utf8', maxBuffer: 1 << 28 });
  process.stdout.write(`== ${p.world} (${((Date.now() - t0) / 1000).toFixed(0)} s, exit ${r.status})\n${r.stdout}${r.stderr ? r.stderr.slice(-3000) : ''}\n`);
  // a child that did not exit 0, or exited 0 without a complete result, is a failure
  const ok = r.status === 0 && ['summary.json', 'results.jsonl.gz'].every((f) => fs.existsSync(path.join(out, f)));
  if (!ok) failed.push(`${p.world} (${p.direct}): exit ${r.status}${r.signal ? ` signal ${r.signal}` : ''}`);
}
if (failed.length) {
  console.error(`SUITE FAILED — ${failed.length}/${pairs.length} evaluation(s) failed; NOTHING promoted to ${path.join(resultsDir, converter)}:\n  ${failed.join('\n  ')}\nStaged results kept for inspection: ${staging}`);
  process.exit(1);
}
const finalDir = path.join(resultsDir, converter);
const superseded = path.join(resultsDir, '.superseded', stamp, converter);
fs.mkdirSync(finalDir, { recursive: true });
for (const p of pairs) {
  const dst = path.join(finalDir, p.direct);
  if (fs.existsSync(dst)) { fs.mkdirSync(superseded, { recursive: true }); fs.renameSync(dst, path.join(superseded, p.direct)); }
  fs.renameSync(path.join(staging, p.direct), dst);
}
fs.rmSync(staging, { recursive: true, force: true });
console.log(`suite complete: ${pairs.length} result(s) promoted to ${finalDir}${fs.existsSync(superseded) ? ` (previous ones moved to ${superseded})` : ''}`);
