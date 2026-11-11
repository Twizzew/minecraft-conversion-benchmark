// Lookup in the generated identity reference (docs/reference/identity-equivalence.v1.json).
import fs from 'node:fs';
import path from 'node:path';
import { REPO_ROOT, sha256File } from './archive.mjs';

const FILE = path.join(REPO_ROOT, 'docs', 'reference', 'identity-equivalence.v1.json');
let _ref = null;
export function identityRef() {
  if (!_ref) { _ref = JSON.parse(fs.readFileSync(FILE, 'utf8')); _ref.sha256 = sha256File(FILE); }
  return _ref;
}

/** kind: block|item|entity ; from: java|bedrock. Returns {status, targets?, basis?}. */
export function equivalents(kind, from, id) {
  const dir = from === 'java' ? 'java_to_bedrock' : 'bedrock_to_java';
  return identityRef()[kind][dir][id] || { status: 'unknown' };
}

export const AIR_LIKE = new Set(['minecraft:air', 'minecraft:cave_air', 'minecraft:void_air']);
