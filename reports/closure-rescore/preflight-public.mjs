// Read-only pre-rescoring preflight of the 56 public outputs (run from the repository root, MCCB_RUNS_DIR set):
// replicates the official gates of evaluate-suite / evaluate (freeze, fixtures, run records, provenance,
// output registry, Java oracle), checks every archive's bytes, and computes the scorer / ruleset
// fingerprints. Grades nothing. Extra check: each run listed in FREEZE-v1.3 `runs_to_grade` has the same
// source / output hashes there; je2be runs are post-freeze (not listed) and are reported as notes.
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto';
const R = process.cwd(); const imp = (p) => import(path.join(R, p));
const { freezeFixtureRefs } = await imp('tools/lib/freeze-ref.mjs');
const { outputRegistry } = await imp('tools/lib/output-registry.mjs');
const { readFixtures } = await imp('tools/lib/fixtures-io.mjs');
const { runRecord, runsDir, worldEntry } = await imp('tools/lib/open.mjs');
const { checkJavaOracle } = await imp('tools/lib/java-oracle.mjs');
const { scorerIdentity, rulesetIdentity } = await imp('tools/lib/fingerprint.mjs');
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const P = [], N = []; const res = {};
const FZ = 'reports/freeze/FREEZE-v1.3.json', OR = 'results/v1.3/OUTPUTS.sha256';
res.freeze_sha = sha(FZ); res.outputs_reg_sha = sha(OR);
const refs = freezeFixtureRefs(FZ); const reg = outputRegistry(OR);
const freeze = JSON.parse(fs.readFileSync(FZ));
const rtg = freeze.runs_to_grade;
if (reg.outputs.size !== 56) P.push(`registry has ${reg.outputs.size} runs`);
// per output
let present = 0, shaOk = 0, recOk = 0;
const recs = new Map();
for (const [id, want] of reg.outputs) {
  let rec; try { rec = runRecord(id); } catch (e) { P.push(`${id}: no run record`); continue; }
  recs.set(id, rec);
  const f = rec.output?.file && path.join(runsDir(), id, rec.output.file);
  if (!f || !fs.existsSync(f)) { P.push(`${id}: output missing`); continue; }
  present++;
  const got = sha(f);
  if (got === want && rec.output.sha256 === want) shaOk++; else P.push(`${id}: bytes ${got} rec ${rec.output.sha256} reg ${want}`);
  const fz = rtg.find((x) => x.run === id);
  if (!rec.source?.sha256 || rec.output?.sha256 !== want) { P.push(`${id}: run record unusable`); continue; }
  recOk++;
  if (!fz) N.push(`${id}: not in FREEZE-v1.3 runs_to_grade (post-freeze converter)`);
  else if (fz.output_sha256 !== want || fz.source_sha256 !== rec.source.sha256) P.push(`${id}: run record ≠ FREEZE-v1.3 runs_to_grade`);
}
// pairs
let links = 0; const worlds = new Set();
for (const [id] of reg.outputs) {
  const m = /^(.+)_(\w\d\d@[\d.]+)_(j2b|b2j)$/.exec(id); if (!m) continue;
  const ret = `${id}2${m[3][0]}`; const world = m[2]; worlds.add(world);
  const d = recs.get(id), r = recs.get(ret); const e = worldEntry(world);
  let fx; try { fx = readFixtures(world); } catch (x) { P.push(`${world}: fixtures unreadable`); continue; }
  const ok = d && r && d.source.sha256 === e.asset.sha256 && fx.header.source_sha256 === e.asset.sha256 && r.source.sha256 === d.output.sha256 && reg.outputs.has(ret);
  if (ok) links++; else P.push(`${id} -> ${ret}: provenance`);
}
// fixtures vs freeze + Java oracle per world
let fxOk = 0; const jo = new Set(); let joProblems = [];
for (const w of worlds) {
  const fx = readFixtures(w); if (fx.content_sha256 === refs.fixtures.get(w)) fxOk++; else P.push(`${w}: fixture content`);
  const o = checkJavaOracle({ jar_sha256: refs.javaGame?.jar_sha256, ...(fx.header.java_reference || {}) });
  joProblems.push(...o.problems.map((p) => `${w}: ${p}`)); jo.add(JSON.stringify(o.identity.reports) + o.identity.game?.jar_sha256 + '/' + o.identity.game?.libraries);
}
P.push(...joProblems);
Object.assign(res, { freeze_files: refs.files, present, shaOk, recOk, links, worlds: worlds.size, fxOk, java_oracle_ok: joProblems.length === 0, java_oracle: [...jo],
  scorer: scorerIdentity(), ruleset: rulesetIdentity(), notes: N, problems: P });
console.log(JSON.stringify(res, null, 1));
