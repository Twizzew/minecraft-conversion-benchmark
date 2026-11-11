#!/usr/bin/env node
// Record a conversion made BY HAND with a graphical converter (e.g. je2be from the
// Microsoft Store), in the same schema as the other runners (mccb.run/1).
//
//   node tools/runners/generic/record-manual-run.mjs \
//     --converter je2be --slug je2be --version <version shown in the app> \
//     --source <the canonical source asset that was converted> --source-ref J02@1.0 \
//     --output <the world folder or archive the app produced> \
//     --direction java_to_bedrock|bedrock_to_java --run-id je2be-<version>_J02@1.0_j2b --runs-dir _staging/runs \
//     [--settings '<json: every option chosen in the app>'] [--started <ISO time> --finished <ISO time>] \
//     [--notes "<what the operator did, errors shown by the app>"]
//
// The operator must give the app the canonical asset (checked here by SHA-256 against
// --source), with default settings unless stated in --settings. The output is packed by
// MCCB exactly like the command-line runner does. Nothing in the output is modified.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { extractArchive, findWorldRoot } from '../../lib/archive.mjs';
import { packWorld } from './pack-output.mjs';

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const need = ['converter', 'slug', 'version', 'source', 'output', 'direction', 'run-id', 'runs-dir'];
const missing = need.filter((n) => !arg(n));
if (missing.length || !['java_to_bedrock', 'bedrock_to_java'].includes(arg('direction'))) {
  console.error(`usage: record-manual-run.mjs --${need.join(' … --')} …   (missing: ${missing.join(', ') || 'valid --direction'})`);
  process.exit(2);
}
const sha256File = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const direction = arg('direction');
const runDir = path.join(path.resolve(arg('runs-dir')), arg('run-id'));
if (fs.existsSync(path.join(runDir, 'run.json'))) { console.error(`run ${arg('run-id')} already exists — refusing to overwrite a recorded run`); process.exit(3); }

const source = path.resolve(arg('source'));
const produced = path.resolve(arg('output'));
let worldRoot;
if (fs.statSync(produced).isDirectory()) worldRoot = findWorldRoot(produced);
else worldRoot = findWorldRoot(extractArchive(produced).dir);
fs.mkdirSync(runDir, { recursive: true });
const output = packWorld(worldRoot, path.join(runDir, direction === 'java_to_bedrock' ? 'output.mcworld' : 'output.zip'));
output.produced_as = path.basename(produced);

let settings = {};
try { settings = arg('settings') ? JSON.parse(arg('settings')) : {}; } catch { console.error('--settings is not valid JSON'); process.exit(2); }
const run = {
  schema: 'mccb.run/1',
  run_id: arg('run-id'),
  converter: { name: arg('converter'), slug: arg('slug'), version: arg('version'), commit: arg('version'), source_available: arg('source-available', 'true') === 'true', mode: 'manual (graphical application)' },
  direction,
  source: { ref: arg('source-ref'), file: path.basename(source), sha256: sha256File(source), bytes: fs.statSync(source).size },
  options: settings,
  environment: { platform: process.platform, arch: process.arch, os_release: os.release(), cpu_model: os.cpus()[0]?.model, total_mem_bytes: os.totalmem() },
  started_at: arg('started'), finished_at: arg('finished'), duration_ms: arg('started') && arg('finished') ? Date.parse(arg('finished')) - Date.parse(arg('started')) : null,
  exit_status: 0, signal: null, error: null,
  output,
  operator_notes: arg('notes'),
  logs: [],
};
fs.writeFileSync(path.join(runDir, 'run.json'), JSON.stringify(run, null, 2) + '\n');
console.error(`[${run.run_id}] recorded ${output.sha256.slice(0, 12)} ${output.bytes} B (tree ${output.tree_sha256.slice(0, 12)})`);
