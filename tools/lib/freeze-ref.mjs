// The fixture registries a frozen MCCB version grades with (v1.3 closure, pass 3). An OFFICIAL
// grading names its freeze file(s); every world's registry must then have exactly the content
// hash the freeze recorded. A freeze ADDENDUM (e.g. FREEZE-v1.3-GURREN-ADDENDUM.json) adds one
// world and is accepted only together with the freeze it extends (its `freeze_file_sha256`).
// `private_fixtures` of a freeze is NOT a grading reference: for GURREN@1.0 it is the private
// original (source ca618ebe…); the graded registry is the addendum's (9af167af…), and the public
// pseudonymised one (2c107cc4…) has no freeze entry — grading it is not an official grading.
//
// v1.3 closure, pass 4: an official grading is AUTHENTICATED — the main freeze and every
// addendum must be one of the published files pinned below by their SHA-256 (the hashes the
// freeze record and its documents publish). A look-alike JSON is not a freeze. An addendum
// only ADDS a world: it can never replace a world the main freeze records.
export const OFFICIAL_FREEZES = {
  '8e317c7be305c990b6833657f9acbdba6076340fba9657960556610fbe4251a2': 'FREEZE-v1.3.json',
};
export const OFFICIAL_ADDENDA = {
  '7d9cbe6c0bd7795f576ee9f15c0c93fdb26ce1c5e372fd377fad08cc605f1046': 'FREEZE-v1.3-GURREN-ADDENDUM.json (GURREN@1.0, graded registry 9af167af…)',
};
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { REPO_ROOT } from './archive.mjs';

export function freezeFixtureRefs(files, { extraAddenda = [] } = {}) {
  const list = (Array.isArray(files) ? files : String(files || '').split(',')).filter(Boolean);
  if (!list.length) throw new Error('no freeze file given');
  const read = list.map((f) => {
    const abs = path.resolve(REPO_ROOT, f);
    const buf = fs.readFileSync(abs);
    return { file: path.relative(REPO_ROOT, abs).replace(/\\/g, '/'), sha256: crypto.createHash('sha256').update(buf).digest('hex'), json: JSON.parse(buf.toString('utf8')) };
  });
  const mains = read.filter((x) => Array.isArray(x.json.fixtures));
  const addenda = read.filter((x) => !Array.isArray(x.json.fixtures) && x.json.fixtures?.content_sha256 && x.json.worlds_manifest_overlay?.id);
  if (!mains.length && addenda.length) throw new Error(`addendum ${addenda.map((x) => x.file).join(', ')} given without the main FREEZE file it extends`);
  if (mains.length !== 1) throw new Error(`exactly one main FREEZE file is required (got ${mains.length}): ${list.join(', ')}`);
  if (mains.length + addenda.length !== read.length) throw new Error(`not a freeze file: ${read.filter((x) => !mains.includes(x) && !addenda.includes(x)).map((x) => x.file).join(', ')}`);
  const main = mains[0];
  if (!OFFICIAL_FREEZES[main.sha256]) throw new Error(`${main.file} (${main.sha256}) is not an official MCCB freeze: authentication failed (official: ${Object.values(OFFICIAL_FREEZES).join(', ')})`);
  const fixtures = new Map(main.json.fixtures.map((x) => [x.world, x.content_sha256]));
  for (const a of addenda) {
    // `extraAddenda` exists for the tests only (to show that even an accepted addendum cannot override)
    if (!OFFICIAL_ADDENDA[a.sha256] && !extraAddenda.includes(a.sha256)) throw new Error(`${a.file} (${a.sha256}) is not an official addendum: authentication failed`);
    if (a.json.freeze_file_sha256 !== main.sha256) throw new Error(`addendum ${a.file} extends FREEZE ${a.json.freeze_file_sha256}, not the FREEZE given (${main.file} ${main.sha256})`);
    const id = a.json.worlds_manifest_overlay.id;
    if (fixtures.has(id)) throw new Error(`addendum ${a.file} would override ${id}, already recorded by ${main.file}: an addendum only adds a world`);
    fixtures.set(id, a.json.fixtures.content_sha256);
  }
  return { files: read.map(({ file, sha256 }) => ({ file, sha256 })), fixtures };
}
