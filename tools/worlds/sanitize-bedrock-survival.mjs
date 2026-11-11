#!/usr/bin/env node
// Make a PUBLISHABLE derivative of a private Bedrock survival world: remove what identifies
// the people who played it, and third-party content, touching nothing else. The result is
// a NEW source world (new file, new SHA-256); it is measured from scratch, never mixed with
// results of the private original.
//
//   node tools/worlds/sanitize-bedrock-survival.mjs --source <private .mcworld> \
//        --out <new .mcworld> --level-name "MCCB R01 SURVIVAL" [--write]
//
// Without --write: dry run, prints what would change (counts only, never the values).
//
// Removed (fixed list, see docs/fixture-rules.md and the world card):
//   - LevelDB keys `player_<id>` (identity records: MsaId, SelfSignedId, platform ids) —
//     NOT `player_server_<id>` (the players' game data, keyed by a random server id)
//   - LevelDB keys `RealmsStoriesData*` (Realms activity keyed by account ids)
//   - identity fields that may appear inside `player_server_*` / `~local_player`
//   - resource_packs/ and world_resource_pack_history.json (third-party packs, not enabled)
//   - world_icon.jpeg (a screenshot)
// Changed: level.dat LevelName and levelname.txt (the group's name) → --level-name.
// NOT changed automatically: texts written by players (signs, books, names, scoreboard
// names). They are listed for a human review by tools/worlds/text-review.mjs.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { extractArchive, findWorldRoot } from '../lib/archive.mjs';
import { packWorld } from '../runners/generic/pack-output.mjs';

const require = createRequire(import.meta.url);
const { LevelDB } = require('leveldb-zlib');
const nbt = require('prismarine-nbt');

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const WRITE = process.argv.includes('--write');
const source = path.resolve(arg('source'));
const out = arg('out') ? path.resolve(arg('out')) : null;
const levelName = arg('level-name', 'MCCB R01 SURVIVAL');
if (!arg('source') || (WRITE && !out)) { console.error('usage: sanitize-bedrock-survival.mjs --source <file> --out <file> [--level-name <name>] [--write]'); process.exit(2); }

const IDENTITY_FIELDS = ['MsaId', 'SelfSignedId', 'PlatformOnlineId', 'PlatformOfflineId', 'ServerId', 'PlatformId', 'Xuid', 'XUID'];
const report = { source_sha256: crypto.createHash('sha256').update(fs.readFileSync(source)).digest('hex'), write: WRITE, removed_keys: {}, fields_removed: 0, files_removed: [], level_name_changed: false };

const src = findWorldRoot(extractArchive(source).dir);
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'mccb-sanitize-'));
const root = path.join(work, 'world');
fs.cpSync(src, root, { recursive: true });

// ── files ──
for (const f of ['resource_packs', 'world_resource_pack_history.json', 'world_icon.jpeg']) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) { report.files_removed.push(f); fs.rmSync(p, { recursive: true, force: true }); }
}

// ── level.dat / levelname.txt ──
const lvl = fs.readFileSync(path.join(root, 'level.dat'));
const { parsed } = await nbt.parse(lvl.subarray(8), 'little');
if (parsed.value.LevelName) { parsed.value.LevelName.value = levelName; report.level_name_changed = true; }
const body = nbt.writeUncompressed(parsed, 'little');
const header = Buffer.alloc(8); header.writeInt32LE(lvl.readInt32LE(0), 0); header.writeInt32LE(body.length, 4);
fs.writeFileSync(path.join(root, 'level.dat'), Buffer.concat([header, body]));
fs.rmSync(path.join(root, 'level.dat_old'), { force: true });
fs.writeFileSync(path.join(root, 'levelname.txt'), levelName);

// ── LevelDB ──
const db = new LevelDB(path.join(root, 'db'), { createIfMissing: false });
await db.open();
const dels = [], puts = [];
for await (const [k, v] of db.getIterator({ keys: true, values: true })) {
  const key = Buffer.from(k);
  const s = key.toString('latin1');
  if (!/^[\x20-\x7e]+$/.test(s)) continue;
  if (/^player_(?!server_)/.test(s)) { dels.push(key); report.removed_keys.player_identity = (report.removed_keys.player_identity || 0) + 1; continue; }
  if (s.startsWith('RealmsStoriesData')) { dels.push(key); report.removed_keys.realms_stories = (report.removed_keys.realms_stories || 0) + 1; continue; }
  if (s === '~local_player' || s.startsWith('player_server_')) {
    const { parsed: t } = await nbt.parse(Buffer.from(v), 'little');
    let n = 0;
    for (const f of IDENTITY_FIELDS) if (t.value[f] !== undefined) { delete t.value[f]; n++; }
    if (n) { puts.push([key, nbt.writeUncompressed(t, 'little')]); report.fields_removed += n; }
  }
}
if (WRITE) {
  for (const k of dels) await db.delete(k);
  for (const [k, v] of puts) await db.put(k, v);
}
await db.close();
report.removed_keys_total = dels.length;
report.records_rewritten = puts.length;

if (WRITE) {
  const packed = packWorld(root, out);
  report.output = { file: path.basename(out), sha256: packed.sha256, bytes: packed.bytes, tree_sha256: packed.tree_sha256 };
}
fs.rmSync(work, { recursive: true, force: true });
console.log(JSON.stringify(report, null, 1));
