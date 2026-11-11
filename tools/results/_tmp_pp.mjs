#!/usr/bin/env node
// MCCB 2026-11 — SONDE : à qui pointent les liens `OwnerNew` (objets au sol, projectiles…) à la
// source et au retour — joueur (clé ~local_player / player_server_*), acteur présent, ou rien.
//   node tools/results/probe-proprietaires.mjs <world> [regex des types=item|arrow|wither_skull|trident]
import { openRunOutput, openSource } from '../lib/open.mjs';
import { TargetView } from '../oracles/target.mjs';
import { plain } from '../lib/nbt.mjs';

const [worldId, motif = 'item$|arrow$|wither_skull|trident'] = process.argv.slice(2);
const n = worldId.split('@')[0];
const re = new RegExp(motif);
const lid = (v) => (Array.isArray(v) ? `${v[0]}:${v[1]}` : String(v));

async function lire(o) {
  const w = o.world;
  const joueurs = new Map();
  for (const [k] of w.named) {
    if (k !== '~local_player' && !k.startsWith('player_server_')) continue;
    const t = plain(w.namedNbt(k)?.[0]);
    if (t?.UniqueID !== undefined) joueurs.set(lid(t.UniqueID), k);
  }
  const view = new TargetView({ edition: 'bedrock', world: w, label: n });
  const acteurs = new Map();
  const liens = [];
  for (const e of await view.entitiesIndex()) {
    const t = plain(e.tag);
    if (t?.UniqueID !== undefined) acteurs.set(lid(t.UniqueID), t.identifier);
    if (re.test(String(t?.identifier)) && t.OwnerNew !== undefined && lid(t.OwnerNew) !== '-1:-1') {
      liens.push({ id: t.identifier, pos: (t.Pos || []).map((x) => Math.round(x)), owner: lid(t.OwnerNew) });
    }
  }
  const quoi = (o2) => (o2 === '-1:1' ? 'hôte [-1,1]' : joueurs.get(o2) ? 'joueur ' + joueurs.get(o2).slice(0, 22) : acteurs.get(o2) ? 'acteur ' + acteurs.get(o2) : 'INTROUVABLE');
  const bilan = {};
  for (const l of liens) { const k = `${l.id} → ${quoi(l.owner).replace(/player_server_.*/, 'player_server')}`; bilan[k] = (bilan[k] || 0) + 1; }
  return { joueurs, liens, bilan, quoi };
}

const src = await lire(await openSource(worldId));
const ret = await lire(await openRunOutput(`${n}_retour`));
console.log('SOURCE joueurs', [...src.joueurs].map(([u, k]) => `${k.slice(0, 26)}=${u}`).join('  '));
console.log('RETOUR joueurs', [...ret.joueurs].map(([u, k]) => `${k.slice(0, 26)}=${u}`).join('  '));
console.log('SOURCE', src.bilan);
console.log('RETOUR', ret.bilan);
// Même objet (type + position arrondie) : propriétaire source → retour.
const parPos = new Map(ret.liens.map((l) => [`${l.id}@${l.pos}`, l]));
const paires = {};
for (const l of src.liens) {
  const r = parPos.get(`${l.id}@${l.pos}`);
  const k = `${src.quoi(l.owner).slice(0, 30)} ⇒ ${r ? ret.quoi(r.owner).slice(0, 30) : 'lien absent'}`;
  paires[k] = (paires[k] || 0) + 1;
}
console.log('PAIRES', Object.entries(paires).sort((a, b) => b[1] - a[1]));
// Exemples de liens perdus (joueur à la source, rien au même endroit au retour).


