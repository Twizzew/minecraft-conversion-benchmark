// Identity of the code and rules that produced a result (v1.3 closure). A result records both
// fingerprints; the table refuses to put side by side results of different scorers or rule
// sets, and by default refuses results of a scorer that is not the one on disk (stale).
//
// scorer — the TRUST BOUNDARY of a grading (v1.3 closure, pass 6): every file that can change
// what is read from a world, how it is judged, or how the verdicts are counted and accepted:
//  - the entry points `oracles/evaluate.mjs`, `oracles/evaluate-suite.mjs`,
//    `results/table-v13.mjs` and EVERY module they import, transitively (computed from the
//    sources, so a new import is covered without editing this list);
//  - the programs they launch: `java/classpath.mjs` (builds the Mojang classpath) and the
//    normaliser `java/src/*.java` (runs Mojang's code on every Java world);
//  - the configuration they read: `manifests/worlds.json` (canonical sources, PRIVATE routing
//    of the fixture registries), the reference tables of `docs/reference/`, and
//    `tools/package.json` / `package-lock.json` (NBT, LevelDB, vanilla-data versions);
//  - the families, readers and references directories in full (as before: never narrower).
// Documentation (rule texts, changelog, READMEs) changes no verdict and is not in it; the rule
// texts are identified by the RULESET fingerprint. Inputs outside the repository are pinned
// elsewhere: the Mojang jar and data reports by the freeze (`references`, and the fixture
// headers), the converter outputs by the output registry (lib/output-registry.mjs).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { REPO_ROOT } from './archive.mjs';

const ENTRY_POINTS = ['tools/oracles/evaluate.mjs', 'tools/oracles/evaluate-suite.mjs', 'tools/results/table-v13.mjs'];
const SCORER_DIRS = ['tools/families', 'tools/lib', 'tools/oracles', 'tools/reference', 'tools/java/src'];
const SCORER_FILES = ['tools/java/classpath.mjs', 'manifests/worlds.json', 'tools/package.json', 'tools/package-lock.json',
  'docs/reference/identity-equivalence.v1.json', 'docs/reference/bedrock-default-states.v1.json', 'docs/reference/java-gamerule-defaults.v1.json'];
const RULESET_FILES = ['docs/fixture-rules.md', 'docs/reference/identity-equivalence.v1.json', 'docs/reference/bedrock-default-states.v1.json', 'docs/reference/java-gamerule-defaults.v1.json', 'tools/reference/identity-rules.v1.mjs', 'tools/reference/gamerules.v1.mjs'];

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const exists = (rel) => fs.existsSync(path.join(REPO_ROOT, rel));
function walk(rel) {
  const abs = path.join(REPO_ROOT, rel);
  if (!fs.existsSync(abs)) return [];
  if (fs.statSync(abs).isFile()) return [rel];
  return fs.readdirSync(abs).sort().flatMap((n) => walk(`${rel}/${n}`)).filter((f) => /\.(mjs|js|java|json)$/.test(f));
}
/** Relative modules imported by `rel`, transitively (static `import … from './x'` and `import('./x')`). */
export function importClosure(entries) {
  const seen = new Set();
  const todo = [...entries];
  while (todo.length) {
    const rel = todo.pop();
    if (seen.has(rel) || !exists(rel)) continue;
    seen.add(rel);
    const src = fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
    for (const m of src.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)['"](\.{1,2}\/[^'"]+)['"]/g)) {
      todo.push(path.posix.normalize(path.posix.join(path.posix.dirname(rel), m[1])));
    }
  }
  return [...seen];
}
function digest(files) {
  const list = Object.fromEntries([...new Set(files)].filter(exists).sort().map((f) => [f, sha(fs.readFileSync(path.join(REPO_ROOT, f)))]));
  return { fingerprint: sha(Object.entries(list).map(([f, h]) => `${h}  ${f}\n`).join('')), files: list };
}
export const scorerIdentity = () => digest([...importClosure(ENTRY_POINTS), ...SCORER_DIRS.flatMap(walk), ...SCORER_FILES]);
export const rulesetIdentity = () => digest(RULESET_FILES);

// `node tools/lib/fingerprint.mjs --print` → the scorer identity of this tree (JSON)
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url) && process.argv.includes('--print')) {
  process.stdout.write(JSON.stringify(scorerIdentity(), null, 1) + '\n');
}
