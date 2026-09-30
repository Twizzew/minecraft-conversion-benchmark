#!/usr/bin/env node
// Run a command-line converter on a whole MCCB suite: every world converted to the other
// edition (direct leg), and the direct output converted back (return leg). Existing runs
// are never overwritten. Each conversion goes through run-command.mjs (same run record).
//
//   node tools/runners/generic/run-suite-command.mjs \
//     --converter Chunker --slug chunker --version 1.20.0 --tool-file <jar> \
//     --cmd-to-bedrock "<template>" --cmd-to-java "<template>" \
//     [--options-to-bedrock '<json>'] [--options-to-java '<json>'] \
//     [--suite tools/runners/worldswitch/suite-mccb-v1.1.json] [--runs-dir _staging/runs] [--only J02@1.0,...]
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const suite = JSON.parse(fs.readFileSync(path.resolve(arg('suite', path.join(ROOT, 'tools', 'runners', 'worldswitch', 'suite-mccb-v1.1.json'))), 'utf8'));
const runsDir = path.resolve(arg('runs-dir', path.join(ROOT, '_staging', 'runs')));
const only = arg('only')?.split(',');
const prefix = `${arg('slug')}-${arg('version')}`;
const short = { java_to_bedrock: 'j2b', bedrock_to_java: 'b2j' };
const back = { java_to_bedrock: 'bedrock_to_java', bedrock_to_java: 'java_to_bedrock' };
const cmdFor = (dir) => (dir === 'java_to_bedrock' ? arg('cmd-to-bedrock') : arg('cmd-to-java'));
const optsFor = (dir) => (dir === 'java_to_bedrock' ? arg('options-to-bedrock', '{}') : arg('options-to-java', '{}'));
const results = [];

function run(source, direction, runId, sourceRef) {
  if (fs.existsSync(path.join(runsDir, runId, 'run.json'))) { results.push([runId, 'SKIPPED (exists)']); return true; }
  const r = spawnSync(process.execPath, [path.join(HERE, 'run-command.mjs'), '--converter', arg('converter'), '--slug', arg('slug'), '--version', arg('version'),
    ...(arg('tool-file') ? ['--tool-file', arg('tool-file')] : []), '--source', source, '--source-ref', sourceRef, '--direction', direction,
    '--run-id', runId, '--runs-dir', runsDir, '--cmd', cmdFor(direction), '--options', optsFor(direction)], { stdio: 'inherit' });
  results.push([runId, r.status === 0 ? 'OK' : `FAILED (${r.status})`]);
  return r.status === 0;
}

for (const w of suite.worlds) {
  if (only && !only.includes(w.id)) continue;
  const src = path.resolve(ROOT, suite.source_dir, w.file);
  const d1 = `${prefix}_${w.id}_${short[w.direction]}`;
  if (!run(src, w.direction, d1, w.id)) continue;
  const rec = JSON.parse(fs.readFileSync(path.join(runsDir, d1, 'run.json'), 'utf8'));
  if (!rec.output) continue;
  run(path.join(runsDir, d1, rec.output.file), back[w.direction], `${d1}2${short[w.direction][0]}`, d1);
}
console.log('\nSUITE SUMMARY');
for (const [id, st] of results) console.log(`  ${st.padEnd(18)} ${id}`);
