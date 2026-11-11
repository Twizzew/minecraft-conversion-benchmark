#!/usr/bin/env node
// MCCB 2026-11 — SONDE : table réelle des bits `multi_face_direction_bits` (lichen lumineux, veine de
// sculk…) sur un monde Bedrock NATIF. Pour chaque bloc à UN seul bit posé, on regarde lequel des six
// voisins est plein : le bit désigne la face d'appui. Aucune table supposée.
//   node tools/results/probe-faces.mjs <world> [N=40]
import { readFixtures } from '../lib/fixtures-io.mjs';
import { openSource } from '../lib/open.mjs';
import { readBlock } from '../families/block.mjs';

const [worldId, nArg] = process.argv.slice(2);
const fx = readFixtures(worldId);
const src = await openSource(worldId);
const VOISINS = { down: [0, -1, 0], up: [0, 1, 0], north: [0, 0, -1], south: [0, 0, 1], west: [-1, 0, 0], east: [1, 0, 0] };
const VIDE = /air|water|lava|lichen|sculk_vein|vine|light_block/;
const stats = {};
let n = 0;
for (const s of fx.subjects) {
  if (s.family !== 'block' || !/glow_lichen|sculk_vein|resin_clump/.test(s.expected?.name || s.expected?.id || '')) continue;
  const d0 = { 'minecraft:overworld': 0, 'minecraft:the_nether': 1, 'minecraft:the_end': 2 }[s.locator.dim];
  const raw = src.world.blockAt(d0, ...s.locator.pos);
  const b = await readBlock('bedrock', src.world, s.locator);
  const bits = Number(b?.states?.multi_face_direction_bits);
  if (!Number.isInteger(bits) || bits === 0 || (bits & (bits - 1))) continue;   // un seul bit
  const pleins = [];
  for (const [nom, d] of Object.entries(VOISINS)) {
    const v = await readBlock('bedrock', src.world, { dim: s.locator.dim, pos: s.locator.pos.map((x, i) => x + d[i]) });
    if (v && !VIDE.test(v.name)) pleins.push(nom);
  }
  const cle = `${raw?.version}:${bits}`;
  (stats[cle] ||= {});
  for (const p of pleins) stats[cle][p] = (stats[cle][p] || 0) + 1;
  stats[cle]._n = (stats[cle]._n || 0) + 1;
  if (++n >= +(nArg || 400)) break;
}
console.log(JSON.stringify(stats, null, 1));
