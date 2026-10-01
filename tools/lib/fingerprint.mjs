// Identity of the code and rules that produced a result (v1.3 closure). A result records both
// fingerprints; the table refuses to put side by side results of different scorers or rule
// sets, and by default refuses results of a scorer that is not the one on disk (stale).
//  - scorer: every file that decides a verdict or reads a world — families, readers, oracles,
//    references builders, the Java normaliser — plus tools/package.json and package-lock.json
//    (the NBT / LevelDB / vanilla-data versions are part of the reading).
//  - ruleset: the rule texts and reference tables (manifests/fixtures.json "rules" + the
//    reference data the families read).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { REPO_ROOT } from './archive.mjs';

const SCORER_DIRS = ['tools/families', 'tools/lib', 'tools/oracles', 'tools/reference', 'tools/java/src'];
const SCORER_FILES = ['tools/package.json', 'tools/package-lock.json'];
const RULESET_FILES = ['docs/fixture-rules.md', 'docs/reference/identity-equivalence.v1.json', 'docs/reference/bedrock-default-states.v1.json', 'docs/reference/java-gamerule-defaults.v1.json', 'tools/reference/identity-rules.v1.mjs', 'tools/reference/gamerules.v1.mjs'];

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
function walk(rel) {
  const abs = path.join(REPO_ROOT, rel);
  if (!fs.existsSync(abs)) return [];
  if (fs.statSync(abs).isFile()) return [rel];
  return fs.readdirSync(abs).sort().flatMap((n) => walk(`${rel}/${n}`)).filter((f) => /\.(mjs|js|java|json)$/.test(f));
}
function digest(files) {
  const list = Object.fromEntries([...new Set(files)].sort().map((f) => [f, sha(fs.readFileSync(path.join(REPO_ROOT, f)))]));
  return { fingerprint: sha(Object.entries(list).map(([f, h]) => `${h}  ${f}\n`).join('')), files: list };
}
export const scorerIdentity = () => digest([...SCORER_DIRS.flatMap(walk), ...SCORER_FILES]);
export const rulesetIdentity = () => digest(RULESET_FILES.filter((f) => fs.existsSync(path.join(REPO_ROOT, f))));
