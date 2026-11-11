// Révision 1.12 du registre (09/11/2026, audit des scripts) : registre DÉRIVÉ de la révision 1.11, sans le
// reconstruire ni l'écraser. Sujets, numéros, ordre et valeurs attendues recopiés à l'identique ; seuls des
// ASPECTS sont ajoutés, calculés depuis la valeur attendue que le registre porte déjà (donc depuis la source) :
//   entity (villageois, marchand ambulant…) : trade_uses, trade_terms, trade_details
//   (families/entity.mjs aspectsEchanges). L'aller reprend le code de l'aller de `trades`.
// Aucun aspect existant ne change.
//   node tools/fixtures/derive-r112.mjs <registre-r111.jsonl.gz> <sortie-r112.jsonl.gz>
import fs from 'node:fs';
import zlib from 'node:zlib';
import { parseJsonlBuffer, joinLines } from '../lib/fixtures-io.mjs';
import { aspectsEchanges } from '../families/entity.mjs';

const [src, dst] = process.argv.slice(2);
if (fs.existsSync(dst)) { console.error(`refus : ${dst} existe déjà`); process.exit(2); }
const rows = parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(src)));
const ed = rows[0].source_edition;
const header = { ...rows[0], derived_from: { file: src.replace(/\\/g, '/'), rule: 'révision 1.12 — état et détails des échanges jugés à l’aller (audit 09/11/2026)' } };
const AJOUTS = ['trade_uses', 'trade_terms', 'trade_details'];
const n = { sujets: 0, trade_details: 0 };
const out = [JSON.stringify(header)];
for (const s of rows.slice(1)) {
  const avant = JSON.stringify({ id: s.id, locator: s.locator, expected: s.expected, aspects: s.aspects });
  if (s.family === 'entity' && !AJOUTS.some((k) => s.aspects[k])) {
    const plus = aspectsEchanges(ed, s.expected.sem, s.aspects.trades?.direct);
    if (Object.keys(plus).length) { Object.assign(s.aspects, plus); n.sujets++; if (plus.trade_details) n.trade_details++; }
  }
  // garde-fou : rien d'autre que des aspects ajoutés
  const apres = JSON.stringify({ id: s.id, locator: s.locator, expected: s.expected, aspects: Object.fromEntries(Object.entries(s.aspects).filter(([k]) => !AJOUTS.includes(k))) });
  if (avant !== apres) { console.error(`sujet modifié : ${s.id}`); process.exit(3); }
  out.push(JSON.stringify(s));
}
fs.writeFileSync(dst, zlib.gzipSync(joinLines(out), { level: 9 }));
console.log(`${rows.length - 1} sujets recopiés ; marchands avec aspects d'échange : ${n.sujets} (dont détails : ${n.trade_details}) -> ${dst}`);
