// Rule 60 (v1.3 closure): the Java oracle is AUTHENTICATED before any assertion is written.
// Two Java inputs decide verdicts and live outside the repository:
//  - the Minecraft Java game (jar + libraries), which the normaliser runs on every Java world
//    (Mojang's file fix and DataFixerUpper): the jar must be the one the freeze records
//    (`references.java_game.jar_sha256`), each library the file its version manifest names
//    (SHA-1 from the manifest);
//  - Mojang's data reports `blocks.json` and `registries.json` (lib/registry.mjs: block-state
//    defaults, known items), which must be the reports the fixture registry was built with
//    (its header `java_reference`, itself pinned by the freeze through the registry's content
//    hash).
// A mismatch is fatal before any output is opened. Recording the hashes was not a check.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { minecraftClasspath, javaExecutable } from './open.mjs';
import { javaRegistry } from './registry.mjs';

const hash = (algo, file) => crypto.createHash(algo).update(fs.readFileSync(file)).digest('hex');

/** The Java game actually used: jar, manifest, libraries (classpath of tools/java/classpath.mjs). */
export function javaGameIdentity() {
  const entries = minecraftClasspath().split(path.delimiter).filter(Boolean);
  const jar = entries[0];
  const manifestFile = path.join(path.dirname(jar), `${path.basename(jar, '.jar')}.json`);
  const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  const want = new Map();
  for (const l of manifest.libraries || []) { const a = l.downloads?.artifact; if (a?.path) want.set(a.path.split('/').join(path.sep), a.sha1); }
  const bad = [];
  let checked = 0;
  for (const e of entries.slice(1)) {
    const rel = [...want.keys()].find((p) => e.endsWith(path.sep + p));
    if (!rel) { bad.push(`${path.basename(e)}: not in the version manifest`); continue; }
    checked++;
    if (hash('sha1', e) !== want.get(rel)) bad.push(`${path.basename(e)}: SHA-1 differs from the version manifest`);
  }
  if (checked !== want.size) bad.push(`${want.size - checked} manifest libraries not on the classpath`);
  const rt = spawnSync(javaExecutable(), ['-version'], { encoding: 'utf8' });
  const runtime = String(rt.stderr || rt.stdout || '').split(/\r?\n/).filter((l) => l && !/^Picked up /.test(l)).slice(0, 2).join(' | ');
  return { jar_file: path.basename(jar), jar_sha256: hash('sha256', jar), manifest_sha256: hash('sha256', manifestFile), libraries: checked, library_problems: bad, java_runtime: runtime };
}

/**
 * Check the Java oracle against its references. `expected` = { jar_sha256, blocks_json_sha256,
 * registries_json_sha256 } (any missing reference is itself a problem). Returns
 * { identity, problems } — the caller refuses to grade when problems is not empty.
 */
export function checkJavaOracle(expected) {
  const problems = [];
  const reports = javaRegistry().provenance; // loads (and caches) the reports the families will use
  for (const k of ['blocks_json_sha256', 'registries_json_sha256']) {
    if (!expected[k]) problems.push(`no reference for ${k}`);
    else if (reports[k] !== expected[k]) problems.push(`Java data report ${k.replace('_sha256', '').replace('_json', '.json')} is ${reports[k]}, the fixture registry was built with ${expected[k]}`);
  }
  let game = null;
  try { game = javaGameIdentity(); } catch (e) { problems.push(`Java game not readable: ${e.message.split('\n')[0]}`); }
  if (game) {
    if (!expected.jar_sha256) problems.push('no reference for the Java game jar');
    else if (game.jar_sha256 !== expected.jar_sha256) problems.push(`Java game jar ${game.jar_file} is ${game.jar_sha256}, the freeze records ${expected.jar_sha256}`);
    problems.push(...game.library_problems.map((x) => `library ${x}`));
  }
  return { identity: { reports: { blocks_json_sha256: reports.blocks_json_sha256, registries_json_sha256: reports.registries_json_sha256 }, game }, problems };
}
