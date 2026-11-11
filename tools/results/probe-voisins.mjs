#!/usr/bin/env node
// MCCB 2026-11 — SONDE : un bloc et ses 6 voisins, à la source, à l'aller et au retour.
//   node tools/results/probe-voisins.mjs <world> <dim> x y z
import { openRunOutput, openSource } from '../lib/open.mjs';
import { readBlock } from '../families/block.mjs';
const [worldId, dim, ...p] = process.argv.slice(2);
const n = worldId.split('@')[0];
const pos = p.map(Number);
const V = { centre: [0, 0, 0], down: [0, -1, 0], up: [0, 1, 0], north: [0, 0, -1], south: [0, 0, 1], west: [-1, 0, 0], east: [1, 0, 0] };
const mondes = [['source', await openSource(worldId)], ['aller', await openRunOutput(`${n}_aller`)], ['retour', await openRunOutput(`${n}_retour`)]];
for (const [lab, o] of mondes) {
  console.log(`── ${lab} (${o.edition})`);
  for (const [k, d] of Object.entries(V)) {
    const b = await readBlock(o.edition, o.world, { dim: `minecraft:${dim}`, pos: pos.map((x, i) => x + d[i]) });
    console.log(`  ${k.padEnd(6)} ${b ? b.name + ' ' + JSON.stringify(b.states || b.props || {}) : 'absent'}`);
  }
}
