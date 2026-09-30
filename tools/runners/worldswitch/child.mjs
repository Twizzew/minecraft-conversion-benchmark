// One WorldSwitch conversion, in its own process (the engine keeps module-level
// state, so every run gets a fresh process — exactly like the production service,
// which runs each job in a dedicated child process).
//
// Invoked by run.mjs only:  node child.mjs <job.json>
//
// The engine is imported from the path given in the job (WORLDSWITCH_ENGINE);
// nothing from this benchmark repository is passed to it except the source file.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const job = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const engine = await import(pathToFileURL(path.join(job.engineDir, 'lib', 'converter.js')).href);

const progress = [];
const notices = [];
const t0 = Date.now();
let last = -1;
const onProgress = (pct, phase) => {
  const p = Math.floor(Number(pct));
  if (p !== last) { last = p; progress.push({ t_ms: Date.now() - t0, pct: p, phase: phase ?? null }); }
};
const options = { ...job.options, onNotice: (n) => notices.push(n) };

let result, error = null;
try {
  result = job.direction === 'bedrock_to_java'
    ? await engine.convertBedrockToJava(job.inputPath, job.workDir, onProgress, options)
    : await engine.convertJavaToBedrock(job.inputPath, job.workDir, onProgress, options);
} catch (e) {
  error = { message: String(e && e.message || e), stack: String(e && e.stack || '') };
}
fs.writeFileSync(job.childResultPath, JSON.stringify({
  outputPath: typeof result === 'string' ? result : (result && (result.outputPath || result.path)) || null,
  rawResult: typeof result === 'string' ? result : result ?? null,
  error, duration_ms: Date.now() - t0, progress, notices,
  memory: process.memoryUsage(), resourceUsage: process.resourceUsage(),
}, null, 2));
process.exit(error ? 1 : 0);
