// Open benchmark sources and converter outputs the same way for every tool.
//
// Java worlds are always read AFTER MccbNormalize (Mojang's file-fix + DataFixerUpper
// of the reference Java version), so a source saved by 26.2 and an output written in
// an older format are compared as the game would load them. Bedrock worlds are read
// as stored.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { REPO_ROOT, WORK_ROOT, extractArchive, findWorldRoot, detectEdition, sha256File } from './archive.mjs';
import { JavaWorld } from './java/world.mjs';
import { BedrockWorld } from './bedrock/world.mjs';
import { JAVA_REFERENCE_VERSION } from './registry.mjs';

export const manifestPath = (name) => path.join(REPO_ROOT, 'manifests', name);
export const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));

export function worldsManifest() { return readJson(manifestPath('worlds.json')); }
export function worldEntry(id) {
  const w = worldsManifest().worlds.find((x) => x.id === id);
  if (!w) throw new Error(`unknown world ${id}`);
  return w;
}
export function sourcesDir() { return process.env.MCCB_SOURCES_DIR || path.join(REPO_ROOT, '_staging', 'v1.1-source-worlds'); }
export function runsDir() { return process.env.MCCB_RUNS_DIR || path.join(REPO_ROOT, '_staging', 'runs'); }

// ── Java normalisation (runs Mojang's code through tools/java/src/MccbNormalize.java) ──
export function javaExecutable() {
  if (process.env.MCCB_JAVA) return process.env.MCCB_JAVA;
  const la = process.env.LOCALAPPDATA;
  const cands = la ? [path.join(la, 'Packages', 'Microsoft.4297127D64EC6_8wekyb3d8bbwe', 'LocalCache', 'Local', 'runtime', 'java-runtime-epsilon', 'windows-x64', 'java-runtime-epsilon', 'bin', 'java.exe')] : [];
  for (const c of cands) if (fs.existsSync(c)) return c;
  return 'java';
}
export function minecraftClasspath(version = JAVA_REFERENCE_VERSION) {
  const r = spawnSync(process.execPath, [path.join(REPO_ROOT, 'tools', 'java', 'classpath.mjs'), version], { encoding: 'utf8' });
  // exit 3 = the Minecraft installation is not there: an input missing BEFORE anything ran.
  // Any other failure of classpath.mjs (corrupt manifest, bug) is an error, not a missing input.
  if (r.status === 3) throw Object.assign(new Error(`classpath: ${r.stderr}`), { code: 'MCCB_INPUT_MISSING' });
  if (r.status !== 0) throw new Error(`classpath.mjs failed (${r.status ?? r.signal}): ${r.stderr}`);
  return r.stdout;
}

// The cache key includes the normaliser's own hash: changing the program re-normalises everything.
export const NORMALIZER_FILE = path.join(REPO_ROOT, 'tools', 'java', 'src', 'MccbNormalize.java');
export const NORMALIZER_SHA256 = sha256File(NORMALIZER_FILE);
export function normalizeJava(worldRoot, cacheKey) {
  const out = path.join(WORK_ROOT, 'normalized', `${cacheKey}-java${JAVA_REFERENCE_VERSION}-n${NORMALIZER_SHA256.slice(0, 8)}`);
  const report = path.join(out, 'normalize-report.json');
  if (!fs.existsSync(report)) {
    const tmp = `${out}.tmp-${process.pid}`;
    // Minecraft's logger writes ./logs: run it in the work folder, never in the repository.
    const cwd = path.join(WORK_ROOT, 'java-cwd');
    fs.mkdirSync(cwd, { recursive: true });
    const r = spawnSync(javaExecutable(), ['-cp', minecraftClasspath(), NORMALIZER_FILE, worldRoot, tmp],
      { encoding: 'utf8', maxBuffer: 1 << 28, cwd });
    // the Java executable itself is missing: an input missing before the normaliser ran
    if (r.error?.code === 'ENOENT') throw Object.assign(new Error(`java executable not found: ${javaExecutable()}`), { code: 'MCCB_INPUT_MISSING' });
    // exit 3 = Mojang's own world upgrade refused the world: a RESULT, cached like a success
    if (r.status !== 0 && r.status !== 3) {
      const err = new Error(`MccbNormalize failed (${r.status}) for ${worldRoot}`);
      err.stdout = r.stdout; err.stderr = r.stderr; err.toolFailure = true;
      throw err;
    }
    fs.writeFileSync(path.join(tmp, 'normalize-stdout.txt'), (r.stdout || '').slice(-20000));
    fs.renameSync(tmp, out);
  }
  const rep = readJson(report);
  if (rep.world_opens === false) return { root: null, report: rep, opens: false };
  const saves = path.join(out, 'saves');
  const name = fs.readdirSync(saves)[0];
  return { root: path.join(saves, name), report: rep, opens: true };
}

/** Open an archive as a world. Java: normalised copy. Returns { edition, world, sha256, rawRoot, normalize }. */
export async function openArchive(file, { expectSha256 } = {}) {
  const { dir, sha256 } = extractArchive(file, { expectSha256 });
  const rawRoot = findWorldRoot(dir);
  const edition = detectEdition(rawRoot);
  if (edition === 'bedrock') {
    const world = await BedrockWorld.open(rawRoot);
    return { edition, world, sha256, rawRoot };
  }
  const norm = normalizeJava(rawRoot, sha256);
  if (!norm.opens) return { edition, world: null, sha256, rawRoot, normalize: norm.report, worldOpens: false };
  const world = await JavaWorld.open(norm.root);
  world.rawRoot = rawRoot;
  return { edition, world, sha256, rawRoot, normalize: norm.report, worldOpens: true };
}

export async function openSource(worldId) {
  const w = worldEntry(worldId);
  const file = path.join(w.asset.local_dir ? path.join(REPO_ROOT, w.asset.local_dir) : sourcesDir(), w.asset.name);
  if (!fs.existsSync(file)) throw Object.assign(new Error(`source asset missing: ${file}`), { code: 'MCCB_INPUT_MISSING' });
  const o = await openArchive(file, { expectSha256: w.asset.sha256 });
  return { ...o, entry: w, file };
}

export function runRecord(runId) {
  const f = path.join(runsDir(), runId, 'run.json');
  return readJson(f);
}

export async function openRunOutput(runId) {
  const run = runRecord(runId);
  if (!run.output) return { run, missing: true };
  const file = path.join(runsDir(), runId, run.output.file);
  const o = await openArchive(file, { expectSha256: run.output.sha256 });
  return { ...o, run, file };
}

export { sha256File };
