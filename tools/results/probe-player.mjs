#!/usr/bin/env node
// MCCB 2026-11 — SONDE : objets d'un joueur, emplacement par emplacement, source / aller / retour,
// tels que le lecteur MCCB les compare (forme « lue par le jeu », règle 54). Affiche pour chaque
// emplacement qui diffère au retour les champs qui changent.
//   node tools/results/probe-player.mjs <world> [clé du joueur | host] [inventory|ender|armor]
import { readFixtures } from '../lib/fixtures-io.mjs';
import { openRunOutput } from '../lib/open.mjs';
import { prepare } from '../families/player.mjs';
import { gameRead } from '../lib/nbt.mjs';

const [worldId, who = 'host', what = 'inventory'] = process.argv.slice(2);
const n = worldId.split('@')[0];
const fx = readFixtures(worldId);
const subj = fx.subjects.find((s) => s.family === 'player' && (who === 'host' ? s.locator.host : s.locator.key === who));
const src = subj.expected[what === 'ender' ? 'ender' : what];
const ctx = { direct: null, roundtrip: null };
for (const [lv, id] of [['direct', `${n}_aller`], ['roundtrip', `${n}_retour`]]) { const o = await openRunOutput(id); ctx[lv] = { edition: o.edition, world: o.world }; }
await prepare(ctx);
const pick = (v) => (who === 'host' ? v._players.find((p) => p.host) : v._players.find((p) => p.key === who));
const rt = pick(ctx.roundtrip), dr = pick(ctx.direct);
const list = (p) => (p ? p[what === 'ender' ? 'ender' : what] : []).map((x) => (x.item ? { slot: x.slot, ...x.item } : x));
const R = list(rt), D = list(dr);
const root = `${fx.header.source_edition}-item`;
const parse = (t) => { try { return JSON.parse(gameRead(t, { root }) || 'null'); } catch { return t; } };
const diff = (a, b, p = '') => {
  if (JSON.stringify(a) === JSON.stringify(b)) return [];
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    return [...new Set([...Object.keys(a), ...Object.keys(b)])].flatMap((k) => diff(a[k], b[k], p ? `${p}.${k}` : k));
  }
  return [`${p}: ${JSON.stringify(a)?.slice(0, 120)} → ${JSON.stringify(b)?.slice(0, 120)}`];
};
console.log(`${worldId} joueur ${subj.locator.key} — ${what} : ${src.length} piles source`);
for (const e of src) {
  const slot = e.slot;
  const g = R.find((x) => x.slot === slot);
  const d = D.find((x) => x.slot === slot);
  const ok = g && (g.snbt === e.sem || gameRead(g.snbt, { root }) === gameRead(e.sem, { root }));
  console.log(`${ok ? '  =' : '  ≠'} emplacement ${slot}: ${e.id}×${e.count}  | aller: ${d ? `${d.id}×${d.count}` : '(vide)'}  | retour: ${g ? `${g.id}×${g.count}` : '(vide)'}`);
  if (!ok && g) for (const l of diff(parse(e.sem), parse(g.snbt))) console.log(`        ${l}`);
}
