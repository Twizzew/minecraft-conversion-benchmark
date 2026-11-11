// MCCB 2026-11 (dev) : enregistre les révisions des mondes du dossier « mondes finaux »
// (J01-J04 reconstruits les 27-28/10/2026 en Java 26.3, J05 nouveau, B01-B03 inchangés,
// R01 fichier original non pseudonymisé). Les anciennes révisions passent SUPERSEDED.
//   node tools/worlds/register-2026-11.mjs <dossier 01-sources>
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const src = path.resolve(process.argv[2]);
const f = path.join(ROOT, 'manifests', 'worlds.json');
const m = JSON.parse(fs.readFileSync(f, 'utf8'));
const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const NEW = [
  ['J01@2.0', 'J01', 'STATIC', 'LAB', 'java', 'MCCB_J01_JAVA_26.3.zip', 'datapack MCCB_J01_R13_8.zip'],
  ['J02@2.0', 'J02', 'LIVING', 'LAB', 'java', 'MCCB_J02_JAVA_26.3.zip', 'datapack MCCB_J02_R7_8.zip'],
  ['J03@2.0', 'J03', 'SYSTEMS', 'LAB', 'java', 'MCCB_J03_JAVA_26.3.zip', 'datapack MCCB_J03_R6_5.zip'],
  ['J04@2.0', 'J04', 'COMMANDS', 'LAB', 'java', 'MCCB_J04_JAVA_26.3.zip', 'datapack MCCB_J04_R41.zip'],
  ['J05@1.0', 'J05', 'TRANSIENT', 'MANUAL_NATIVE', 'java', 'MCCB_J05_JAVA_26.3.zip', 'built in game (no datapack): temporary states — primed TNT, moving pistons, lit furnaces…'],
  ['B01@1.0', 'B01', null, null, 'bedrock', 'MCCB_B01_STATIC_BEDROCK.mcworld', null],
  ['B02@1.0', 'B02', null, null, 'bedrock', 'MCCB_B02_LIVING_BEDROCK.mcworld', null],
  ['B03@1.0', 'B03', null, null, 'bedrock', 'MCCB_B03_SYSTEMS_BEDROCK.mcworld', null],
  ['R01@1.0', 'R01', null, null, 'bedrock', 'R01_PRIVE.mcworld', null], // même fichier que R01@1.0 (ca618ebe…), noté en privé
];
for (const w of m.worlds) if (w.status === 'ACTIVE' && !NEW.some(([id]) => id === w.id)) w.status = 'SUPERSEDED';
for (const [id, world, theme, cls, edition, file, gen] of NEW) {
  const p = path.join(src, file);
  const asset = { name: file, sha256: sha(p), bytes: fs.statSync(p).size, release: null, local_dir: path.relative(ROOT, src).split(path.sep).join('/') };
  const old = m.worlds.find((w) => w.id === id);
  if (old) { if (old.asset.sha256 !== asset.sha256) throw new Error(`${id}: hash differs from the registered file`); old.asset.name = asset.name; old.asset.local_dir = asset.local_dir; if (old.status !== 'PRIVATE') old.status = 'ACTIVE'; continue; }
  m.worlds.push({ id, world, revision: id.split('@')[1], theme, class: cls, edition, game_version: edition === 'java' ? '26.3' : null,
    data_version: edition === 'java' ? 5023 : null, asset, status: id.startsWith('R01') ? 'PRIVATE' : 'ACTIVE', predecessor: null,
    provenance: { generator: gen, registered_by: 'tools/worlds/register-2026-11.mjs', registered_at: new Date().toISOString() } });
}
m.updated = new Date().toISOString().slice(0, 10);
fs.writeFileSync(f, JSON.stringify(m, null, 1) + '\n');
console.log(m.worlds.filter((w) => w.status !== 'SUPERSEDED').map((w) => `${w.id} ${w.status} ${w.asset.sha256.slice(0, 12)}`).join('\n'));
