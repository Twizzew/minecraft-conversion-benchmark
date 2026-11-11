#!/usr/bin/env node
// MCCB 2026-11 — SONDE : toutes les entités / entités de bloc d'un type dans une archive de monde
// quelconque (par ex. un monde converti puis rouvert et resauvé par le jeu), champs complets.
//   node tools/results/probe-monde-type.mjs <archive .mcworld|.zip> <regex du type> [N=5]
import { openArchive } from '../lib/open.mjs';
import { TargetView } from '../oracles/target.mjs';
import { plain } from '../lib/nbt.mjs';

const [file, motif, nArg] = process.argv.slice(2);
const re = new RegExp(motif);
const o = await openArchive(file);
const v = new TargetView({ edition: o.edition, world: o.world, label: 'monde' });
const json = (x) => JSON.stringify(x, (k, y) => (typeof y === 'bigint' ? String(y) : y));
let n = 0;
for (const e of await v.entitiesIndex()) {
  if (!re.test(String(e.facts.id))) continue;
  console.log(`${e.facts.id} @ ${e.facts.pos?.map((x) => Math.round(x * 10) / 10).join(' ')}  ${json(plain(e.tag)).slice(0, 1500)}`);
  if (++n >= +(nArg || 5)) break;
}
console.log(`(${n} affichées)`);
