#!/usr/bin/env node
// Run ONE WorldSwitch conversion and record everything needed to identify it.
//
//   node tools/runners/worldswitch/run.mjs \
//        --engine <worldswitch checkout> --source <archive> \
//        --direction java_to_bedrock|bedrock_to_java \
//        --run-id <id> --runs-dir <dir> [--source-ref <world id or parent run id>]
//
// A run is identified by: source SHA-256 + engine commit + options + direction.
// The options are the defaults of the public WorldSwitch web service (see
// DEFAULT_OPTIONS below and docs/converters/worldswitch.md). They are never tuned
// per world.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { engineFingerprint } from './fingerprint.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));

// Public web-service defaults (engine commit 0308840):
//  - J->B: the upload form sends targetVersion 'latest' unless the user picks
//    '1.21.60' (components/ConverterWizard.jsx, pages/api/convert/upload-finish.js).
//  - B->J: no Java UUID unless the user types one; no player map.
//  - recoverUnlinked: true (job default).
//  - locale: the interface language; MCCB runs use 'en'. It only changes texts the
//    engine writes (recovery shulker names, report strings), not converted data.
export const DEFAULT_OPTIONS = {
  java_to_bedrock: { targetVersion: 'latest', recoverUnlinked: true, locale: 'en' },
  bedrock_to_java: { recoverUnlinked: true, locale: 'en' },
};
// Environment variables the engine reads that could change its behaviour. They are
// removed from the child environment so every run uses engine defaults.
const ENGINE_ENV = /^(MC_|WS_|WORLDSWITCH_|CONVERSION_|UV_THREADPOOL_SIZE$)/;

function arg(name, def) {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 ? process.argv[i + 1] : def;
}
const sha256File = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const git = (dir, ...a) => execFileSync('git', ['-C', dir, ...a], { encoding: 'utf8' }).trim();
function depVersion(engineDir, name) {
  try { return JSON.parse(fs.readFileSync(path.join(engineDir, 'node_modules', name, 'package.json'), 'utf8')).version; }
  catch { return null; }
}

const engineDir = path.resolve(arg('engine'));
const source = path.resolve(arg('source'));
const direction = arg('direction');
const runId = arg('run-id');
const runsDir = path.resolve(arg('runs-dir'));
const sourceRef = arg('source-ref', null);
if (!['java_to_bedrock', 'bedrock_to_java'].includes(direction) || !runId) {
  console.error('usage: run.mjs --engine <dir> --source <file> --direction java_to_bedrock|bedrock_to_java --run-id <id> --runs-dir <dir>');
  process.exit(2);
}

const runDir = path.join(runsDir, runId);
if (fs.existsSync(path.join(runDir, 'run.json'))) {
  console.error(`run ${runId} already exists — refusing to overwrite a recorded run`);
  process.exit(3);
}
fs.mkdirSync(runDir, { recursive: true });
const workDir = fs.mkdtempSync(path.join(runDir, '_work_'));

const engineCommit = git(engineDir, 'rev-parse', 'HEAD');
const engineDirty = git(engineDir, 'status', '--porcelain', '--untracked-files=no');
const pkg = JSON.parse(fs.readFileSync(path.join(engineDir, 'package.json'), 'utf8'));

const env = {};
const scrubbed = {};
for (const [k, v] of Object.entries(process.env)) {
  if (ENGINE_ENV.test(k)) scrubbed[k] = v; else env[k] = v;
}

const options = DEFAULT_OPTIONS[direction];
const jobPath = path.join(workDir, 'job.json');
const childResultPath = path.join(workDir, 'child-result.json');
fs.writeFileSync(jobPath, JSON.stringify({ engineDir, inputPath: source, workDir, direction, options, childResultPath }, null, 2));

const sourceSha = sha256File(source);
const startedAt = new Date().toISOString();
console.error(`[${runId}] ${direction} ${path.basename(source)} (${sourceSha.slice(0, 12)}) engine ${engineCommit.slice(0, 7)}${engineDirty ? ' DIRTY' : ''}`);
const child = spawnSync(process.execPath, [path.join(HERE, 'child.mjs'), jobPath], {
  cwd: engineDir, env, encoding: 'utf8', maxBuffer: 1 << 30,
});
const finishedAt = new Date().toISOString();
fs.writeFileSync(path.join(runDir, 'stdout.log'), child.stdout || '');
fs.writeFileSync(path.join(runDir, 'stderr.log'), child.stderr || '');

let childResult = null;
try { childResult = JSON.parse(fs.readFileSync(childResultPath, 'utf8')); } catch { /* crashed before writing */ }

let output = null;
if (child.status === 0 && childResult && childResult.outputPath && fs.existsSync(childResult.outputPath)) {
  const ext = direction === 'java_to_bedrock' ? '.mcworld' : '.zip';
  const dest = path.join(runDir, `output${ext}`);
  fs.copyFileSync(childResult.outputPath, dest);
  output = { file: path.basename(dest), engine_filename: path.basename(childResult.outputPath), sha256: sha256File(dest), bytes: fs.statSync(dest).size };
}
if (childResult) {
  fs.writeFileSync(path.join(runDir, 'progress.json'), JSON.stringify(childResult.progress, null, 1));
  fs.writeFileSync(path.join(runDir, 'notices.json'), JSON.stringify(childResult.notices, null, 1));
}

const run = {
  schema: 'mccb.run/1',
  run_id: runId,
  converter: { name: 'WorldSwitch', engine_package: pkg.name, engine_package_version: pkg.version,
    commit: engineCommit, working_tree_clean: engineDirty === '',
    // A modified working tree is identified by the fingerprint of its conversion code.
    working_tree_fingerprint: engineDirty === '' ? null : engineFingerprint(engineDir),
    source_available: false,
    package_lock_sha256: sha256File(path.join(engineDir, 'package-lock.json')),
    key_dependencies: Object.fromEntries(['prismarine-nbt', 'leveldb-zlib', 'adm-zip', 'unzipper'].map((d) => [d, depVersion(engineDir, d)])) },
  direction,
  source: { ref: sourceRef, file: path.basename(source), sha256: sourceSha, bytes: fs.statSync(source).size },
  options,
  environment: { node: process.version, platform: process.platform, arch: process.arch, os_release: os.release(),
    cpus: os.cpus().length, cpu_model: os.cpus()[0]?.model, total_mem_bytes: os.totalmem(),
    engine_env_vars_removed: Object.keys(scrubbed) },
  started_at: startedAt, finished_at: finishedAt,
  duration_ms: childResult ? childResult.duration_ms : null,
  exit_status: child.status, signal: child.signal || null,
  error: childResult ? childResult.error : { message: 'child produced no result', stderr_tail: (child.stderr || '').slice(-4000) },
  output,
  logs: ['stdout.log', 'stderr.log', 'progress.json', 'notices.json'].filter((f) => fs.existsSync(path.join(runDir, f))),
  peak: childResult ? { rss_bytes: childResult.memory?.rss ?? null, max_rss_kb: childResult.resourceUsage?.maxRSS ?? null } : null,
};
fs.writeFileSync(path.join(runDir, 'run.json'), JSON.stringify(run, null, 2) + '\n');
try { fs.rmSync(workDir, { recursive: true, force: true }); } catch { /* best effort */ }
console.error(`[${runId}] exit ${child.status} ${output ? output.sha256.slice(0, 12) + ' ' + output.bytes + ' B' : 'NO OUTPUT'} ${run.duration_ms} ms`);
process.exit(child.status === 0 && output ? 0 : 1);
