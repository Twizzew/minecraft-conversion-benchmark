// Révision 1.11 du registre (08/11/2026, lot 1 « détails ») : registre DÉRIVÉ d'un registre figé, sans
// le reconstruire ni l'écraser. Sujets, numéros et ordre recopiés à l'identique ; seuls des ASPECTS sont
// ajoutés ou activés, calculés depuis la valeur attendue que le registre porte déjà (donc depuis la source) :
//   item_stack : détails à l'aller (families/item_stack.mjs aspectsDetails) ;
//   entity / player : aspect `details` des objets portés ou tenus.
// Aucun aspect existant ne change de code, sauf `component:X` Java dont l'aller était « pas de règle ».
//   node tools/fixtures/derive-r111.mjs <registre.jsonl.gz> <sortie.jsonl.gz>
import fs from 'node:fs';
import zlib from 'node:zlib';
import { parseJsonlBuffer, joinLines } from '../lib/fixtures-io.mjs';
import { aspectsDetails } from '../families/item_stack.mjs';
import { aDesDetails, RETOUR_DETAILS } from '../families/entity.mjs';
import { aDesDetailsJoueur, RETOUR_DETAILS_JOUEUR } from '../families/player.mjs';

const [src, dst] = process.argv.slice(2);
if (fs.existsSync(dst)) { console.error(`refus : ${dst} existe déjà`); process.exit(2); }
const rows = parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(src)));
const ed = rows[0].source_edition;
const header = { ...rows[0], derived_from: { file: src.replace(/\\/g, '/'), rule: 'révision 1.11 — détails des objets jugés à l’aller (lot 1)' } };
const codeDe = (a) => (/^(NE|NA):/.test(String(a || '')) ? a : 'DETAIL');
const n = { item_stack: 0, entity: 0, player: 0 };
const out = [JSON.stringify(header)];
for (const s of rows.slice(1)) {
  const avant = JSON.stringify({ id: s.id, locator: s.locator, expected: s.expected, aspects: Object.fromEntries(Object.entries(s.aspects).filter(([k]) => !k.startsWith('component:'))) });
  if (s.family === 'item_stack') n.item_stack += aspectsDetails(ed, s);
  else if (s.family === 'entity' && !s.aspects.details && aDesDetails(ed, [...(s.expected.equipment || []), ...(s.expected.inventory || [])])) {
    s.aspects.details = { direct: codeDe(s.aspects.equipment?.direct ?? s.aspects.inventory?.direct ?? s.aspects.identity?.direct), roundtrip: `NE:${RETOUR_DETAILS}` }; n.entity++;
  } else if (s.family === 'player' && !s.aspects.details && aDesDetailsJoueur(ed, s.expected)) {
    s.aspects.details = { direct: codeDe(s.aspects.inventory?.direct ?? s.aspects.armor?.direct ?? s.aspects.ender_chest?.direct), roundtrip: `NE:${RETOUR_DETAILS_JOUEUR}` }; n.player++;
  }
  // garde-fou : rien d'autre que des aspects ajoutés
  const apres = JSON.stringify({ id: s.id, locator: s.locator, expected: s.expected, aspects: Object.fromEntries(Object.entries(s.aspects).filter(([k]) => !k.startsWith('component:') && k !== 'details')) });
  if (avant !== apres) { console.error(`sujet modifié : ${s.id}`); process.exit(3); }
  out.push(JSON.stringify(s));
}
fs.writeFileSync(dst, zlib.gzipSync(joinLines(out), { level: 9 }));
console.log(`${rows.length - 1} sujets recopiés ; aspects de détail : piles ${n.item_stack}, créatures ${n.entity}, joueurs ${n.player} -> ${dst}`);
