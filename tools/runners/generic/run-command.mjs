#!/usr/bin/env node
// Run ONE conversion with any command-line converter (Chunker, je2be, …) and record it in
// the same schema as the WorldSwitch runner (mccb.run/1), so the same evaluator reads it.
//
//   node tools/runners/generic/run-command.mjs \
//     --converter Chunker --slug chunker --version 1.x.y [--commit <sha>] [--tool-file <jar or exe>] \
//     --source <archive> --direction java_to_bedrock|bedrock_to_java \
//     --run-id <id> --runs-dir <dir> [--source-ref <world id or parent run id>] \
//     --cmd "<command template>" [--options '<json: the settings the command line expresses>']
//
// Command template placeholders (quoted for the shell by this script):
//   {input_dir}   the source world folder, extracted from the archive by MCCB
//   {input_file}  the source archive itself (.zip / .mcworld), unchanged
//   {output_dir}  an empty folder the converter must write the converted world into
//   {output_file} a file path, for converters that write an archive
//
// The converter's output is packed by MCCB into output.zip (Java) / output.mcworld
// (Bedrock) with sorted entries and a fixed timestamp, and identified twice: by the
// archive SHA-256 and by a tree hash of the world files (independent of packing).
// Nothing in the output is modified.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { extractArchive, findWorldRoot } from '../../lib/archive.mjs';
import { packWorld } from './pack-output.mjs';

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const sha256File = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const need = ['converter', 'slug', 'version', 'source', 'direction', 'run-id', 'runs-dir', 'cmd'];
const missing = need.filter((n) => !arg(n));
if (missing.length || !['java_to_bedrock', 'bedrock_to_java'].includes(arg('direction'))) {
  console.error(`usage: run-command.mjs --${need.join(' … --')} …   (missing: ${missing.join(', ') || 'valid --direction'})`);
  process.exit(2);
}
const direction = arg('direction');
const runId = arg('run-id');
const runDir = path.join(path.resolve(arg('runs-dir')), runId);
if (fs.existsSync(path.join(runDir, 'run.json'))) { console.error(`run ${runId} already exists — refusing to overwrite a recorded run`); process.exit(3); }
fs.mkdirSync(runDir, { recursive: true });
const work = fs.mkdtempSync(path.join(runDir, '_work_'));

const source = path.resolve(arg('source'));
const sourceSha = sha256File(source);
const { dir: extracted } = extractArchive(source, { expectSha256: sourceSha });
const inputDir = path.join(work, 'input');
fs.cpSync(findWorldRoot(extracted), inputDir, { recursive: true }); // the converter gets its own copy
const outputDir = path.join(work, 'output');
fs.mkdirSync(outputDir);
const outputFile = path.join(work, direction === 'java_to_bedrock' ? 'converted.mcworld' : 'converted.zip');

const q = (s) => (process.platform === 'win32' ? `"${s}"` : `'${s.replace(/'/g, "'\\''")}'`);
const command = arg('cmd').replace(/\{input_dir\}/g, q(inputDir)).replace(/\{input_file\}/g, q(source))
  .replace(/\{output_dir\}/g, q(outputDir)).replace(/\{output_file\}/g, q(outputFile));

const startedAt = new Date().toISOString();
const t0 = Date.now();
const child = spawnSync(command, { shell: true, cwd: work, encoding: 'utf8', maxBuffer: 1 << 30 });
const durationMs = Date.now() - t0;
const finishedAt = new Date().toISOString();
fs.writeFileSync(path.join(runDir, 'stdout.log'), child.stdout || '');
fs.writeFileSync(path.join(runDir, 'stderr.log'), child.stderr || '');

// Locate the converted world: in {output_dir}, or inside {output_file}.
let worldRoot = null;
try { worldRoot = findWorldRoot(outputDir); } catch { /* none */ }
if (!worldRoot && fs.existsSync(outputFile)) { try { worldRoot = findWorldRoot(extractArchive(outputFile).dir); } catch { /* none */ } }

const output = worldRoot ? packWorld(worldRoot, path.join(runDir, direction === 'java_to_bedrock' ? 'output.mcworld' : 'output.zip')) : null;

let options = {};
try { options = arg('options') ? JSON.parse(arg('options')) : {}; } catch { console.error('--options is not valid JSON'); process.exit(2); }
const toolFile = arg('tool-file');
const run = {
  schema: 'mccb.run/1',
  run_id: runId,
  converter: { name: arg('converter'), slug: arg('slug'), version: arg('version'), commit: arg('commit', arg('version')),
    source_available: arg('source-available', 'true') === 'true', tool_file: toolFile ? path.basename(toolFile) : null,
    tool_sha256: toolFile ? sha256File(toolFile) : null, command_template: arg('cmd') },
  direction,
  source: { ref: arg('source-ref'), file: path.basename(source), sha256: sourceSha, bytes: fs.statSync(source).size },
  options,
  environment: { node: process.version, platform: process.platform, arch: process.arch, os_release: os.release(), cpus: os.cpus().length, cpu_model: os.cpus()[0]?.model, total_mem_bytes: os.totalmem() },
  started_at: startedAt, finished_at: finishedAt, duration_ms: durationMs,
  exit_status: child.status, signal: child.signal || null,
  error: child.status === 0 && output ? null : { message: output ? `exit ${child.status}` : 'no converted world found', stderr_tail: (child.stderr || '').slice(-4000) },
  output,
  logs: ['stdout.log', 'stderr.log'],
};
fs.writeFileSync(path.join(runDir, 'run.json'), JSON.stringify(run, null, 2) + '\n');
try { fs.rmSync(work, { recursive: true, force: true }); } catch { /* best effort */ }
console.error(`[${runId}] exit ${child.status} ${output ? `${output.sha256.slice(0, 12)} ${output.bytes} B` : 'NO OUTPUT'} ${durationMs} ms`);
process.exit(child.status === 0 && output ? 0 : 1);
