// MCCB 2026-11 — vérification d'exhaustivité : compte TOUS les blocs-entités et entités du monde source et
// des sorties (lecteur indépendant), pour voir ce qui disparaît ou APPARAÎT hors des sujets du registre.
//   node tools/results/compter-2026-11.mjs <dossier d'extraction> <MONDE...>     (depuis 02-mccb/)
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { JavaMonde, BedrockMonde, compterJava, compterBedrock } from './lecteur-independant.mjs';
const require = createRequire(import.meta.url);
const AdmZip = require('adm-zip');
const [X, ...MONDES] = process.argv.slice(2);
const R = path.resolve('..');
const RUNS = { 'WS avant': '03-conversions-worldswitch', 'WS c25': '03-conversions-worldswitch-c25', Chunker: '03-conversions-chunker-1.21.0', je2be: '03-conversions-je2be-8dfc4de', UMT: '03-conversions-umt-1.5.10' };
function racine(dir, m) { const p = [dir]; while (p.length) { const d = p.shift(); if (fs.existsSync(path.join(d, m))) return d; for (const e of fs.readdirSync(d, { withFileTypes: true })) if (e.isDirectory()) p.push(path.join(d, e.name)); } return null; }
async function compter(zip, dest) {
  const z = new AdmZip(zip); const noms = z.getEntries().map((e) => e.entryName);
  if (noms.some((n) => /(^|\/)db\/CURRENT$/.test(n))) {
    if (!fs.existsSync(path.join(dest, '.ok'))) { fs.mkdirSync(dest, { recursive: true }); z.extractAllTo(dest, true); fs.writeFileSync(path.join(dest, '.ok'), ''); }
    const w = await new BedrockMonde(racine(dest, 'db')).ouvrir(); const c = await compterBedrock(w); await w.fermer(); return { ed: 'bedrock', ...c };
  }
  const ld = noms.filter((n) => /(^|\/)level\.dat$/.test(n)).sort((a, b) => a.length - b.length)[0];
  return { ed: 'java', ...compterJava(new JavaMonde({ zip: z, prefixe: ld.slice(0, -9).replace(/\/$/, '') })) };
}
const tot = (o) => Object.values(o).reduce((a, b) => a + b, 0);
const sansNs = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k.replace(/^minecraft:/, '').toLowerCase(), v]));
const out = {};
for (const M of MONDES) {
  const a0 = JSON.parse(fs.readFileSync(path.join(R, RUNS.UMT, `${M}_aller`, 'run.json'), 'utf8'));
  const src = await compter(path.join(R, '01-sources', a0.source.file), path.join(X, 'src', M));
  out[M] = { source: { be: tot(src.be), ent: tot(src.ent) }, conv: {} };
  for (const [nom, runs] of Object.entries(RUNS)) {
    const r = {};
    for (const leg of ['aller', 'retour']) {
      const run = JSON.parse(fs.readFileSync(path.join(R, runs, `${M}_${leg}`, 'run.json'), 'utf8'));
      const slug = runs.replace('03-conversions-', '');
      const c = await compter(path.join(R, runs, `${M}_${leg}`, run.output.file), path.join(X, slug === 'worldswitch' ? 'worldswitch-avant-table18' : slug.replace('chunker-1.21.0', 'chunker-1.21.0'), `${M}_${leg}`));
      r[leg] = { be: tot(c.be), ent: tot(c.ent) };
      if (leg === 'retour') { // même édition que la source : écarts par type
        const S = sansNs(src.be), C = sansNs(c.be), Se = sansNs(src.ent), Ce = sansNs(c.ent);
        const ecart = (A, B) => Object.fromEntries([...new Set([...Object.keys(A), ...Object.keys(B)])].map((k) => [k, (B[k] || 0) - (A[k] || 0)]).filter(([, d]) => d));
        r.ecarts_retour = { be: ecart(S, C), ent: ecart(Se, Ce) };
      }
    }
    out[M].conv[nom] = r;
    console.log(M, nom, `source be ${out[M].source.be} ent ${out[M].source.ent} | aller be ${r.aller.be} ent ${r.aller.ent} | retour be ${r.retour.be} ent ${r.retour.ent}`);
  }
}
fs.writeFileSync(process.env.SORTIE || path.join(X, `comptes-${MONDES.join('-')}.json`), JSON.stringify(out, null, 1));
