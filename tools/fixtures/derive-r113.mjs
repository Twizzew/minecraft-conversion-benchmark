// Révision 1.13 du registre (09/11/2026, audit externe « 10 problèmes ») : registre DÉRIVÉ de la révision
// 1.12, sans le reconstruire. Sujets, numéros, ordre et valeurs attendues recopiés à l'identique ; seuls :
//   • entity : `trade_terms` remplacé par trade_max_uses, trade_xp, trade_reward_xp (même code d'aller) ;
//   • entity_extra : un sujet par dimension (vanilla + dimensions des entités du registre), AJOUTÉ en fin.
// Les autres contrôles du lot (vie, objets au sol, bateaux, effets, bébé/apprivoisé, montures, propriétaire)
// sont des règles de jugement sur les aspects existants : rien à changer au registre.
//   node tools/fixtures/derive-r113.mjs <registre-r112.jsonl.gz> <sortie-r113.jsonl.gz>
import fs from 'node:fs';
import zlib from 'node:zlib';
import { parseJsonlBuffer, joinLines } from '../lib/fixtures-io.mjs';
import { CONDITIONS_ECHANGE } from '../families/entity.mjs';
import { sujetsEntitesEnTrop } from '../families/entity_extra.mjs';

const [src, dst] = process.argv.slice(2);
if (fs.existsSync(dst)) { console.error(`refus : ${dst} existe déjà`); process.exit(2); }
const rows = parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(src)));
const header = { ...rows[0], derived_from: { file: src.replace(/\\/g, '/'), rule: 'révision 1.13 — conditions d’échange séparées, entités en trop (rapport du 09/11/2026)' } };
const worldId = rows[0].world || rows[0].world_id || String(rows[1]?.id || '').split('/')[0];
const NOUVEAUX = Object.keys(CONDITIONS_ECHANGE);
const n = { echanges: 0, dims: 0 };
const out = [JSON.stringify(header)];
const dims = new Set();
for (const s of rows.slice(1)) {
  const avant = JSON.stringify({ id: s.id, locator: s.locator, expected: s.expected, aspects: s.aspects });
  if (s.family === 'entity' && s.locator?.dim) dims.add(s.locator.dim);
  if (s.family === 'entity_extra') { console.error(`registre déjà en 1.13 : ${s.id}`); process.exit(3); }
  if (s.family === 'entity' && s.aspects.trade_terms) {
    const code = s.aspects.trade_terms;
    const aspects = {};
    for (const [k, v] of Object.entries(s.aspects)) {
      if (k !== 'trade_terms') { aspects[k] = v; continue; }
      for (const c of NOUVEAUX) aspects[c] = { ...code };
    }
    s.aspects = aspects;
    n.echanges++;
  }
  // garde-fou : rien d'autre que trade_terms remplacé
  const sans = (a) => Object.fromEntries(Object.entries(a).filter(([k]) => k !== 'trade_terms' && !NOUVEAUX.includes(k)));
  const apres = JSON.stringify({ id: s.id, locator: s.locator, expected: s.expected, aspects: sans(s.aspects) });
  if (JSON.stringify({ ...JSON.parse(avant), aspects: sans(JSON.parse(avant).aspects) }) !== apres) { console.error(`sujet modifié : ${s.id}`); process.exit(3); }
  out.push(JSON.stringify(s));
}
for (const s of sujetsEntitesEnTrop(worldId, [...dims])) { out.push(JSON.stringify(s)); n.dims++; }
fs.writeFileSync(dst, zlib.gzipSync(joinLines(out), { level: 9 }));
console.log(`${rows.length - 1} sujets recopiés ; échanges : ${n.echanges} ; sujets entity_extra : ${n.dims} (${worldId}) -> ${dst}`);
