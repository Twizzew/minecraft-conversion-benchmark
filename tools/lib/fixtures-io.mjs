// Reading fixture registries. The canonical identity of a registry is the SHA-256 of its
// DECOMPRESSED content: gzip bytes vary with the platform and the zlib build, the JSONL
// text does not.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { REPO_ROOT, sha256File, sha256Buf } from './archive.mjs';

// A PRIVATE world (manifests/worlds.json) keeps its fixtures out of the repository.
export const PRIVATE_DIR = path.join(REPO_ROOT, '_staging', 'private');
export function isPrivateWorld(worldId) {
  try { return JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'manifests', 'worlds.json'), 'utf8')).worlds.some((w) => w.id === worldId && w.status === 'PRIVATE'); } catch { return false; }
}
export const fixtureFile = (worldId) => path.join(isPrivateWorld(worldId) ? path.join(PRIVATE_DIR, 'fixtures') : path.join(REPO_ROOT, 'fixtures'), `${worldId.replace('@', '_')}.jsonl.gz`);

/** Lines joined with '\n' plus a final '\n', as one Buffer (no ~512 MB string limit). */
export function joinLines(lines) {
  const parts = [];
  for (const l of lines) { parts.push(Buffer.from(l, 'utf8'), NL); }
  return Buffer.concat(parts);
}
const NL = Buffer.from('\n');

/** Non-empty lines of a JSONL buffer, parsed, without building one giant string. */
export function parseJsonlBuffer(buf) {
  const out = [];
  let start = 0;
  for (let i = buf.indexOf(10, start); i !== -1; i = buf.indexOf(10, start)) {
    if (i > start) out.push(JSON.parse(buf.toString('utf8', start, i)));
    start = i + 1;
  }
  if (start < buf.length) out.push(JSON.parse(buf.toString('utf8', start)));
  return out;
}

/** Rows of a .jsonl.gz file. */
export const readJsonlGz = (file) => parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(file)));

export function readFixtures(worldId) {
  const file = fixtureFile(worldId);
  const text = zlib.gunzipSync(fs.readFileSync(file));
  const rows = parseJsonlBuffer(text);
  return {
    file: path.relative(REPO_ROOT, file).replace(/\\/g, '/'),
    file_sha256: sha256File(file),
    content_sha256: sha256Buf(text),
    header: rows[0],
    subjects: rows.slice(1),
  };
}
