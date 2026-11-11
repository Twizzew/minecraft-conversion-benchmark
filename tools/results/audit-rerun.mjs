#!/usr/bin/env node
// Determinism / drift check (read-only for recorded results): re-evaluates every recorded
// run with the CURRENT evaluator into a scratch folder and compares, byte for byte, the
// decompressed results with the recorded ones. A difference means the evaluator (or its
// inputs) changed since the recording — or that it is not deterministic.
//   node tools/results/audit-rerun.mjs [--worlds J02@1.0,...] [--scratch _staging/audit/rerun]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { REPO_ROOT } from '../lib/archive.mjs';
import { PRIVATE_DIR } from '../lib/fixtures-io.mjs';

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const ONLY = arg('worlds')?.split(',');
const SCRATCH = path.resolve(arg('scratch', path.join(REPO_ROOT, '_staging', 'audit', 'rerun')));
const freeze = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'reports', 'freeze', 'FREEZE-v1.1.json'), 'utf8'));
const runs = [...freeze.measured_before_freeze, ...freeze.measured_after_freeze].filter((e) => !ONLY || ONLY.includes(e.world));
// Private worlds (not in the public freeze): every recorded evaluation under _staging/private/results.
if (ONLY) for (const conv of fs.existsSync(path.join(PRIVATE_DIR, 'results')) ? fs.readdirSync(path.join(PRIVATE_DIR, 'results')) : []) {
  for (const run of fs.readdirSync(path.join(PRIVATE_DIR, 'results', conv))) {
    const sf = path.join(PRIVATE_DIR, 'results', conv, run, 'summary.json');
    if (!fs.existsSync(sf)) continue;
    const s = JSON.parse(fs.readFileSync(sf, 'utf8'));
    if (ONLY.includes(s.world)) runs.push({ converter: s.converter, world: s.world, direct_run: s.direct_run, roundtrip_run: s.roundtrip_run, results_file: path.relative(REPO_ROOT, path.join(PRIVATE_DIR, 'results', conv, run, 'results.jsonl.gz')) });
  }
}
const content = (f) => crypto.createHash('sha256').update(zlib.gunzipSync(fs.readFileSync(f))).digest('hex');
let bad = 0;
for (const e of runs) {
  const out = path.join(SCRATCH, e.converter, e.direct_run);
  const args = [path.join(REPO_ROOT, 'tools', 'oracles', 'evaluate.mjs'), '--world', e.world, '--direct', e.direct_run, '--converter', e.converter, '--out', out];
  if (e.roundtrip_run) args.push('--roundtrip', e.roundtrip_run);
  const t0 = Date.now();
  const r = spawnSync(process.execPath, ['--max-old-space-size=28000', ...args], { cwd: REPO_ROOT, encoding: 'utf8', maxBuffer: 1 << 28 });
  if (r.status !== 0) { bad++; console.log(`✗ ${e.direct_run}: evaluate exited ${r.status}\n${(r.stderr || '').slice(-800)}`); continue; }
  const a = content(path.join(REPO_ROOT, e.results_file)), b = content(path.join(out, 'results.jsonl.gz'));
  if (a === b) console.log(`✓ ${e.direct_run}${e.roundtrip_run ? ' + ' + e.roundtrip_run : ''}: identical (${a.slice(0, 12)}, ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
  else { bad++; console.log(`✗ ${e.direct_run}: recorded ${a.slice(0, 12)} ≠ re-evaluated ${b.slice(0, 12)}`); }
}
process.exit(bad ? 1 : 0);
