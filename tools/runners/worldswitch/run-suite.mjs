#!/usr/bin/env node
// Run the whole MCCB suite with WorldSwitch: every ACTIVE source world is converted
// to the other edition (direct leg), and the direct output is converted back
// (return leg) for round-trip measurement. Existing recorded runs are skipped,
// never overwritten.
//
//   node tools/runners/worldswitch/run-suite.mjs --engine <worldswitch checkout> \
//        [--suite tools/runners/worldswitch/suite-mccb-v1.1.json] [--runs-dir _staging/runs] \
//        [--rerun-suffix _rerun1 --only J04@1.0,B01@1.0]
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { engineFingerprint } from './fingerprint.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };

const engine = path.resolve(arg('engine'));
const suite = JSON.parse(fs.readFileSync(path.resolve(arg('suite', path.join(HERE, 'suite-mccb-v1.1.json'))), 'utf8'));
const runsDir = path.resolve(arg('runs-dir', path.join(ROOT, '_staging', 'runs')));
const suffix = arg('rerun-suffix', '');
const only = arg('only', null)?.split(',');
const commit7 = execFileSync('git', ['-C', engine, 'rev-parse', '--short=7', 'HEAD'], { encoding: 'utf8' }).trim();
// A modified working tree gets its own run ids: <commit>+<fingerprint> (never mixed with
// the runs of the clean commit).
const dirty = execFileSync('git', ['-C', engine, 'status', '--porcelain', '--untracked-files=no'], { encoding: 'utf8' }).trim() !== '';
const buildId = dirty ? `${commit7}+${engineFingerprint(engine).sha256.slice(0, 7)}` : commit7;

const short = { java_to_bedrock: 'j2b', bedrock_to_java: 'b2j' };
const back = { java_to_bedrock: 'bedrock_to_java', bedrock_to_java: 'java_to_bedrock' };
const results = [];
function run(source, direction, runId, sourceRef) {
  if (fs.existsSync(path.join(runsDir, runId, 'run.json'))) { results.push([runId, 'SKIPPED (exists)']); return true; }
  const r = spawnSync(process.execPath, [path.join(HERE, 'run.mjs'), '--engine', engine, '--source', source,
    '--direction', direction, '--run-id', runId, '--runs-dir', runsDir, '--source-ref', sourceRef], { stdio: 'inherit' });
  results.push([runId, r.status === 0 ? 'OK' : `FAILED (${r.status})`]);
  return r.status === 0;
}

for (const w of suite.worlds) {
  if (only && !only.includes(w.id)) continue;
  const src = path.resolve(ROOT, suite.source_dir, w.file);
  const d1 = `ws-${buildId}_${w.id}_${short[w.direction]}${suffix}`;
  if (!run(src, w.direction, d1, w.id)) continue;
  if (suffix && !w.rerun_return) continue;
  const out1 = JSON.parse(fs.readFileSync(path.join(runsDir, d1, 'run.json'), 'utf8')).output;
  const d2 = `ws-${buildId}_${w.id}_${short[w.direction]}2${short[w.direction][0]}${suffix}`;
  run(path.join(runsDir, d1, out1.file), back[w.direction], d2, d1);
}
console.log('\nSUITE SUMMARY');
for (const [id, s] of results) console.log(`  ${s.padEnd(18)} ${id}`);
