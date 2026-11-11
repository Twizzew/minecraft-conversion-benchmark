// Table 1.10 (07/11/2026) : registre dérivé d'un registre figé, SANS le reconstruire ni l'écraser.
// Seul changement : une pile Bedrock dont le `Block` porte un état que le bloc actuel n'a plus
// (families/item_stack.mjs isLegacyBedrockBlockEntry, ex. stone + stone_type=granite) reçoit le
// traitement de la règle 40 : identité / aux / tag non jugés, nombre jugé dans la même case.
// Tout le reste (sujets, numéros, ordre) est recopié à l'identique.
//   node tools/fixtures/derive-table110.mjs <registre.jsonl.gz> <sortie.jsonl.gz>
import fs from 'node:fs';
import zlib from 'node:zlib';
import { parseJsonlBuffer, joinLines } from '../lib/fixtures-io.mjs';
import { isLegacyBedrockBlockEntry, isLegacyBedrockItem, LEGACY_ITEM } from '../families/item_stack.mjs';

const [src, dst] = process.argv.slice(2);
if (fs.existsSync(dst)) { console.error(`refus : ${dst} existe déjà`); process.exit(2); }
const rows = parseJsonlBuffer(zlib.gunzipSync(fs.readFileSync(src)));
const header = { ...rows[0], derived_from: { file: src.replace(/\\/g, '/'), rule: 'table 1.10 — pile Bedrock au Block ancien (règle 40 étendue)' } };
if (header.source_edition !== 'bedrock') { console.error('registre non Bedrock : rien à dériver'); process.exit(2); }
let n = 0;
const out = [JSON.stringify(header)];
for (const s of rows.slice(1)) {
  if (s.family === 'item_stack' && s.expected?.block && !s.expected.legacy && !isLegacyBedrockItem(s.expected.id)) {
    let b = null;
    try { b = JSON.parse(s.expected.block); } catch { /* SNBT non JSON : laissé tel quel */ }
    if (b && isLegacyBedrockBlockEntry({ name: b.name, stateKeys: Object.keys(b.states || {}) })) {
      s.expected.legacy = true;
      for (const k of ['identity', 'aux', 'tag']) if (s.aspects[k]) { s.aspects[k].direct = `NE:${LEGACY_ITEM}`; s.aspects[k].roundtrip = `NE:${LEGACY_ITEM}`; }
      n++;
    }
  }
  out.push(JSON.stringify(s));
}
fs.writeFileSync(dst, zlib.gzipSync(joinLines(out), { level: 9 }));
console.log(`${rows.length - 1} sujets recopiés, ${n} piles passées en règle 40 étendue -> ${dst}`);
