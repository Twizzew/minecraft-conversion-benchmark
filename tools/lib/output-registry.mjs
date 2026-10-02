// The converter outputs an OFFICIAL grading may judge (v1.3 closure, pass 6). A rescoring of the
// historical corpus must prove it judges exactly the historical outputs: each run's output hash
// must be the one a published output registry records for that run id. The registries are
// authenticated by their own SHA-256 (the published files), so a registry written for the
// occasion is not one; a run id missing from them is not a historical output.
//   results/v1.3/OUTPUTS.sha256         the 56 outputs of the seven public worlds
//   results/v1.3-gurren/OUTPUTS.sha256  the 8 outputs of GURREN@1.0
// Format of a line: `<sha256>  <run id>  <output file>  <converter build>`.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { REPO_ROOT } from './archive.mjs';

export const OFFICIAL_OUTPUT_REGISTRIES = {
  ac767c66831e7cf2124f8b92be8cdf46c7d20bffe59bf4ded667dbd20d4dafb4: 'results/v1.3/OUTPUTS.sha256 (public worlds)',
  '0e20c5b2e67f4f55a2c48236eda778a8396debd88b32bc146a9ea084a050c252': 'results/v1.3-gurren/OUTPUTS.sha256 (GURREN@1.0)',
};

export function outputRegistry(files) {
  const list = (Array.isArray(files) ? files : String(files || '').split(',')).filter(Boolean);
  if (!list.length) throw new Error('no output registry given');
  const outputs = new Map();
  const read = [];
  for (const f of list) {
    const abs = path.resolve(REPO_ROOT, f);
    const buf = fs.readFileSync(abs);
    const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
    const file = path.relative(REPO_ROOT, abs).replace(/\\/g, '/');
    if (!OFFICIAL_OUTPUT_REGISTRIES[sha256]) throw new Error(`${file} (${sha256}) is not an official output registry: authentication failed`);
    for (const line of buf.toString('utf8').split(/\r?\n/)) {
      const m = /^([0-9a-f]{64})\s+(\S+)/.exec(line.trim());
      if (!m) continue;
      if (outputs.has(m[2]) && outputs.get(m[2]) !== m[1]) throw new Error(`run ${m[2]} has two different output hashes in the registries given`);
      outputs.set(m[2], m[1]);
    }
    read.push({ file, sha256 });
  }
  return { files: read, outputs };
}
