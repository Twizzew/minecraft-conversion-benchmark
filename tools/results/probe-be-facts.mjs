#!/usr/bin/env node
// MCCB 2026-11 — SONDE : faits normalisés d'un bloc-entité (source / aller / retour).
//   node tools/results/probe-be-facts.mjs <world> <x,y,z> [dim]
import { openRunOutput, openSource } from '../lib/open.mjs';
import { TargetView } from '../oracles/target.mjs';

const [worldId, xyz, dim = 'minecraft:overworld'] = process.argv.slice(2);
const n = worldId.split('@')[0];
const pos = xyz.split(',').map(Number);
const src = await openSource(worldId);
const views = [['SOURCE', new TargetView({ edition: src.edition, world: src.world, label: 'source' })]];
for (const id of [`${n}_aller`, `${n}_retour`]) { const o = await openRunOutput(id); views.push([id, new TargetView({ edition: o.edition, world: o.world, label: id })]); }
for (const [label, v] of views) {
  const be = await v.blockEntityAt(dim, pos);
  const f = { ...(be?.facts || be || {}) }; delete f.items; delete f.raw;
  console.log(`\n── ${label}\n` + JSON.stringify(f, null, 1).slice(0, 3000));
}
