#!/usr/bin/env node
// MCCB 2026-11 — SONDE : une pile d'inventaire de joueur, ENTIÈRE, à l'aller et au retour.
//   node tools/results/probe-player-slot.mjs <world> <slot> [clé du joueur | host]
import { openRunOutput } from '../lib/open.mjs';
import { prepare } from '../families/player.mjs';

const [worldId, slotArg, who = 'host'] = process.argv.slice(2);
const n = worldId.split('@')[0];
const ctx = { direct: null, roundtrip: null };
for (const [lv, id] of [['direct', `${n}_aller`], ['roundtrip', `${n}_retour`]]) { const o = await openRunOutput(id); ctx[lv] = { edition: o.edition, world: o.world }; }
await prepare(ctx);
for (const lv of ['direct', 'roundtrip']) {
  const v = ctx[lv];
  const p = who === 'host' ? v._players.find((x) => x.host) : v._players.find((x) => x.key === who);
  const it = (p?.inventory || []).map((x) => (x.item ? { slot: x.slot, ...x.item } : x)).find((x) => String(x.slot) === slotArg);
  console.log(`\n── ${lv} (${v.edition})\n${it ? (it.snbt || it.sem || JSON.stringify(it)) : 'absent'}`);
}
