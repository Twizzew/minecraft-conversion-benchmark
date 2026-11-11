// Proof that the R01 working copy = public HEAD + the 2 authenticated historical R01 inputs. Read-only.
//   node overlay-proof.mjs <HEAD checkout> <working copy> <historical R01 working copy> <sources dir> <runs dir>
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto'; import { execFileSync } from 'node:child_process';
const [HEAD, WC, HISTWC, SRC, RUNS] = process.argv.slice(2);
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const P = [], out = {};
const head = execFileSync('git', ['-C', HEAD, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const dirty = execFileSync('git', ['-C', HEAD, 'status', '--porcelain', '--ignored', '--untracked-files=all'], { encoding: 'utf8' }).split('\n').filter((l) => l && !/^!! tools\/node_modules/.test(l));
out.head = head; out.head_local_changes = dirty;
if (head !== '97acbe72ca6088a09c75549ea04d48975eaf2a57') P.push('HEAD'); if (dirty.length) P.push('HEAD checkout has local/untracked/ignored files');
const tracked = execFileSync('git', ['-C', HEAD, 'ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean).sort();
const walk = (d, r = '') => fs.readdirSync(path.join(d, r), { withFileTypes: true }).flatMap((e) => { const p = r ? `${r}/${e.name}` : e.name; if (p === 'tools/node_modules') return []; return e.isDirectory() ? walk(d, p) : [p]; });
const wc = walk(WC).sort();
const extra = wc.filter((f) => !tracked.includes(f)), missing = tracked.filter((f) => !wc.includes(f));
const differ = tracked.filter((f) => wc.includes(f) && sha(path.join(WC, f)) !== sha(path.join(HEAD, f)));
out.files = { tracked: tracked.length, working_copy: wc.length, extra, missing, differ };
if (extra.length || missing.length) P.push('file set differs');
if (JSON.stringify(differ) !== JSON.stringify(['fixtures/R01_1.0.jsonl.gz', 'manifests/worlds.json'])) P.push(`differing files: ${differ}`);
// authentication of the two files
const add = JSON.parse(fs.readFileSync(path.join(WC, 'reports/freeze/FREEZE-v1.3-R01-ADDENDUM.json')));
out.addendum_sha256 = sha(path.join(WC, 'reports/freeze/FREEZE-v1.3-R01-ADDENDUM.json'));
if (out.addendum_sha256 !== '7d9cbe6c0bd7795f576ee9f15c0c93fdb26ce1c5e372fd377fad08cc605f1046') P.push('addendum');
out.fixture = { file_sha256: sha(path.join(WC, 'fixtures/R01_1.0.jsonl.gz')), addendum_file_sha256: add.fixtures.file_sha256, historical_wc_sha256: sha(path.join(HISTWC, 'fixtures/R01_1.0.jsonl.gz')) };
if (out.fixture.file_sha256 !== add.fixtures.file_sha256 || out.fixture.file_sha256 !== out.fixture.historical_wc_sha256) P.push('fixture not the authenticated one');
const mw = JSON.parse(fs.readFileSync(path.join(WC, 'manifests/worlds.json'))), mh = JSON.parse(fs.readFileSync(path.join(HEAD, 'manifests/worlds.json')));
const gw = mw.worlds.find((w) => w.id === 'R01@1.0');
const sameEntry = JSON.stringify(gw) === JSON.stringify(add.worlds_manifest_overlay);
const others = JSON.stringify({ ...mw, worlds: mw.worlds.filter((w) => w.id !== 'R01@1.0') }) === JSON.stringify({ ...mh, worlds: mh.worlds.filter((w) => w.id !== 'R01@1.0') });
out.manifest = { sha256: sha(path.join(WC, 'manifests/worlds.json')), historical_wc_sha256: sha(path.join(HISTWC, 'manifests/worlds.json')), r01_entry_equals_addendum_overlay: sameEntry, all_other_content_equals_head: others, worlds_order_same: JSON.stringify(mw.worlds.map((w) => w.id)) === JSON.stringify(mh.worlds.map((w) => w.id)) };
if (!sameEntry || !others || !out.manifest.worlds_order_same || out.manifest.sha256 !== out.manifest.historical_wc_sha256) P.push('manifest overlay not authenticated');
// source
const HIST = 'a640374228039cc6dd502c0192b472b30a0f9baa8588f886d2057990dcd1e1db';
out.sources_dir = fs.readdirSync(SRC).map((f) => ({ f, sha256: sha(path.join(SRC, f)) }));
if (out.sources_dir.length !== 1 || out.sources_dir[0].sha256 !== HIST || gw.asset.sha256 !== HIST || gw.asset.name !== out.sources_dir[0].f) P.push('source');
out.pseudonymised_4cc666cf_present = out.sources_dir.some((x) => x.sha256.startsWith('4cc666cf')) || JSON.stringify(gw).includes('4cc666cf');
if (out.pseudonymised_4cc666cf_present) P.push('pseudonymised world referenced');
out.direct_runs_source = fs.readdirSync(RUNS).filter((r) => r.endsWith('_b2j')).map((r) => [r, JSON.parse(fs.readFileSync(path.join(RUNS, r, 'run.json'))).source.sha256 === HIST]);
if (out.direct_runs_source.some(([, ok]) => !ok)) P.push('a direct run did not consume a6403742');
out.problems = P; out.verdict = P.length ? 'FAIL' : 'PASS';
console.log(JSON.stringify(out, null, 1));
process.exit(P.length ? 1 : 0);
