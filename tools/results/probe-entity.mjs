#!/usr/bin/env node
// MCCB 2026-11 — SONDE : pour un sujet `entity` d'un registre, montre côte à côte ce que la source
// stocke et ce que les sorties (aller, retour) stockent pour l'entité appariée la plus proche du même
// type : échanges offre par offre, inventaire emplacement par emplacement, équipement. Sert à
// trancher « erreur du lecteur MCCB » ou « erreur du convertisseur » à partir des fichiers.
//   node tools/results/probe-entity.mjs <world> <subject id | x,y,z> [--runs aller,retour]
import { readFixtures } from '../lib/fixtures-io.mjs';
import { openRunOutput, openSource } from '../lib/open.mjs';
import { TargetView } from '../oracles/target.mjs';
import { tradeOffers } from '../lib/facts.mjs';

const [worldId, sel] = process.argv.slice(2);
const runsArg = process.argv.indexOf('--runs');
const n = worldId.split('@')[0];
const runs = runsArg > 0 ? process.argv[runsArg + 1].split(',') : [`${n}_aller`, `${n}_retour`];
const fx = readFixtures(worldId);
let s = fx.subjects.find((x) => x.id === sel || x.id.endsWith(sel));
if (!s && sel.includes(',')) {
  const p = sel.split(',').map(Number);
  s = fx.subjects.filter((x) => x.family === 'entity').sort((a, b) => dist(a.locator.pos, p) - dist(b.locator.pos, p))[0];
}
function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); }
if (!s) { console.error('sujet introuvable'); process.exit(2); }
const show = (label, f) => {
  console.log(`\n── ${label}: ${f?.id} @ ${f?.pos?.map((v) => v.toFixed(2)).join(' ')}${f?.custom_name ? ` « ${f.custom_name} »` : ''}`);
  if (!f) return;
  if (f.offers?.length) f.offers.forEach((o, i) => console.log(`  offre ${i}: ${o.buyCount}× ${o.buy}${o.buyB ? ` + ${o.buyBCount}× ${o.buyB}` : ''} → ${o.sellCount}× ${o.sell}${o.tier !== undefined ? ` (palier ${o.tier})` : ''}${o.buyCountA !== undefined ? ` [A ${o.buyCountA} B ${o.buyCountB}]` : ''}`));
  if (f.trade_tier !== undefined) console.log(`  palier débloqué : ${f.trade_tier}`);
  if (f.inventory?.length) console.log(`  inventaire : ${f.inventory.map((it) => `${it.slot ?? '?'}:${it.id}×${it.count}`).join('  ')}`);
  if (f.equipment?.length) console.log(`  équipement : ${f.equipment.map((it) => `${it.slot ?? '?'}:${it.id}`).join('  ')}`);
};
console.log(`Sujet ${s.id} (${s.expected.id}) — position source ${s.locator.pos.map((v) => v.toFixed(2)).join(' ')}`);
const src = await openSource(worldId);
const sv = new TargetView({ edition: src.edition, world: src.world, label: 'source' });
const near = async (view, id) => {
  const all = await view.entitiesIndex();
  return all.filter((e) => !id || e.facts.id === id || e.facts.id?.replace('_v2', '') === id.replace('_v2', '') || true)
    .map((e) => ({ e, d: e.dim === s.locator.dim ? dist(e.facts.pos, s.locator.pos) : 1e9 })).sort((a, b) => a.d - b.d)[0]?.e;
};
const se = await near(sv, s.expected.id);
show('SOURCE', se?.facts);
if (se?.facts?.sem?.Offers) show('SOURCE (offres lues comme la cible)', { ...se.facts, offers: tradeOffers(src.edition, JSON.parse(se.facts.sem.Offers)) });
for (const id of runs) {
  const o = await openRunOutput(id);
  const v = new TargetView({ edition: o.edition, world: o.world, label: id });
  show(`${id} (${o.edition})`, (await near(v, null))?.facts);
}
