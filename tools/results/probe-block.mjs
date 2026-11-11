#!/usr/bin/env node
// MCCB 2026-11 — SONDE : un bloc (nom + états) à une position, source / aller / retour.
//   node tools/results/probe-block.mjs <world> <x,y,z> [dim]
import { openRunOutput, openSource } from '../lib/open.mjs';
import { readBlock } from '../families/block.mjs';
const [worldId, xyz, dim = 'minecraft:overworld'] = process.argv.slice(2);
const n = worldId.split('@')[0];
const loc = { dim, pos: xyz.split(',').map(Number) };
const s = await openSource(worldId);
console.log('SOURCE ', s.edition, JSON.stringify(await readBlock(s.edition, s.world, loc)));
for (const id of [`${n}_aller`, `${n}_retour`]) { const o = await openRunOutput(id); console.log(id.padEnd(12), o.edition, JSON.stringify(await readBlock(o.edition, o.world, loc))); }
