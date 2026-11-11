// World archives: hashing, extraction into a content-addressed cache, world-root discovery.
// Nothing here ever writes into an archive or into a previously extracted tree.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const AdmZip = require('adm-zip');

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const WORK_ROOT = process.env.MCCB_WORK_DIR || path.join(REPO_ROOT, '_staging', 'work');

export function sha256File(file) {
  const h = crypto.createHash('sha256');
  const fd = fs.openSync(file, 'r');
  const buf = Buffer.allocUnsafe(1 << 20);
  let n;
  try { while ((n = fs.readSync(fd, buf, 0, buf.length, null)) > 0) h.update(buf.subarray(0, n)); }
  finally { fs.closeSync(fd); }
  return h.digest('hex');
}

export const sha256Buf = (b) => crypto.createHash('sha256').update(b).digest('hex');

/** Extract an archive once into WORK_ROOT/extract/<sha256>; returns { dir, sha256 }. */
export function extractArchive(file, { expectSha256 } = {}) {
  const sha256 = sha256File(file);
  if (expectSha256 && expectSha256 !== sha256) {
    throw new Error(`hash mismatch for ${file}: expected ${expectSha256}, got ${sha256}`);
  }
  const dir = path.join(WORK_ROOT, 'extract', sha256);
  const done = path.join(dir, '.mccb-extracted');
  if (!fs.existsSync(done)) {
    const tmp = `${dir}.tmp-${process.pid}`;
    fs.mkdirSync(tmp, { recursive: true });
    const zip = new AdmZip(file);
    for (const e of zip.getEntries()) {
      const rel = e.entryName.replace(/\\/g, '/');
      if (rel.split('/').includes('..') || path.isAbsolute(rel)) throw new Error(`unsafe entry ${rel}`);
      const dest = path.join(tmp, rel);
      if (e.isDirectory) { fs.mkdirSync(dest, { recursive: true }); continue; }
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, e.getData());
    }
    fs.writeFileSync(path.join(tmp, '.mccb-extracted'), JSON.stringify({ archive: path.basename(file), sha256 }) + '\n');
    fs.renameSync(tmp, dir);
  }
  return { dir, sha256 };
}

/** Directory that holds level.dat (the shallowest one). */
export function findWorldRoot(dir) {
  const queue = [dir];
  while (queue.length) {
    const d = queue.shift();
    const entries = fs.readdirSync(d, { withFileTypes: true });
    if (entries.some((e) => e.isFile() && e.name === 'level.dat')) return d;
    for (const e of entries) if (e.isDirectory() && !e.name.startsWith('.')) queue.push(path.join(d, e.name));
  }
  throw new Error(`no level.dat under ${dir}`);
}

/** 'java' | 'bedrock' from a world root. */
export function detectEdition(root) {
  if (fs.existsSync(path.join(root, 'db')) && fs.statSync(path.join(root, 'db')).isDirectory()) return 'bedrock';
  return 'java';
}

/** List archive entries without extracting (name, size, crc). */
export function listArchive(file) {
  const zip = new AdmZip(file);
  return zip.getEntries().filter((e) => !e.isDirectory).map((e) => ({ name: e.entryName, size: e.header.size, crc: e.header.crc }));
}
