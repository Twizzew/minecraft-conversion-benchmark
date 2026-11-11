#!/usr/bin/env node
// MCCB 2026-11 — SONDE : contenu d'un conteneur (bloc-entité) emplacement par emplacement,
// source / aller / retour, avec les composants (ou le tag Bedrock) de chaque pile.
//   node tools/results/probe-container.mjs <world> <x,y,z> [dim]
import { openRunOutput, openSource } from '../lib/open.mjs';
import { TargetView } from '../oracles/target.mjs';

const [worldId, xyz, dim = 'minecraft:overworld'] = process.argv.slice(2);
const n = worldId.split('@')[0];
const pos = xyz.split(',').map(Number);
const views = [];
const src = await openSource(worldId);
views.push(['SOURCE', new TargetView({ edition: src.edition, world: src.world, label: 'source' }), src.edition]);
for (const id of [`${n}_aller`, `${n}_retour`]) { const o = await openRunOutput(id); views.push([id, new TargetView({ edition: o.edition, world: o.world, label: id }), o.edition]); }
for (const [label, v, ed] of views) {
  const be = await v.blockEntityAt(dim, pos);
  console.log(`\n── ${label} (${ed}) : ${be ? be.facts?.id ?? be.id : 'aucun bloc-entité'}`);
  const items = be?.facts?.items || be?.items || [];
  for (const it of items) {
    const i = it.item || it;
    const extra = i.sem ? i.sem.slice(0, 260) : '';
    console.log(`  ${String(it.slot).padStart(2)} : ${i.id}×${i.count}  ${extra}`);
  }
}
