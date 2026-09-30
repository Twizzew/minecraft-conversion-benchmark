// Pack a converted world folder into one archive with sorted entries and a fixed
// timestamp, and identify it twice: archive SHA-256 and a tree hash of the world files
// (independent of packing). Nothing inside the world is modified.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const AdmZip = require('adm-zip');
const FIXED = new Date('2000-01-01T00:00:00Z');
const sha256File = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

export function packWorld(worldRoot, dest) {
  const files = [];
  const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else files.push(p); } };
  walk(worldRoot);
  const rel = files.map((f) => path.relative(worldRoot, f).replace(/\\/g, '/')).sort();
  const tree = crypto.createHash('sha256');
  const zip = new AdmZip();
  for (const r of rel) {
    const buf = fs.readFileSync(path.join(worldRoot, r));
    tree.update(`${r}\0${crypto.createHash('sha256').update(buf).digest('hex')}\n`);
    zip.addFile(r, buf);
    zip.getEntry(r).header.time = FIXED;
  }
  zip.writeZip(dest);
  return { file: path.basename(dest), packed_by: 'mccb (sorted entries, fixed timestamp)', sha256: sha256File(dest), bytes: fs.statSync(dest).size, tree_sha256: tree.digest('hex'), files: rel.length };
}
