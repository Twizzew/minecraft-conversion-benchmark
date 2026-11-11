// MCCB 2026-11 — recontrôle indépendant d'un échantillon de verdicts.
// Tire au hasard (graine fixe) des verdicts PASS et FAIL du script, relit les mondes avec
// lecteur-independant.mjs (aucun module tools/lib pour lire ou juger) et refait le jugement à la main :
//   aller-retour (même édition) : jugé automatiquement (nom de bloc, bloc-entité présent, pile au même emplacement) ;
//   aller (éditions différentes) : valeurs brutes source / sortie imprimées pour relecture humaine.
// Vérifie aussi que la valeur attendue du registre est bien celle de la source.
//   node tools/results/recontrole-2026-11.mjs <conv> <MONDE> <n par case> <dossier d'extraction> [graine]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { readJsonlGz, readFixtures } from '../lib/fixtures-io.mjs'; // lecture du registre et des verdicts seulement
import { JavaMonde, BedrockMonde } from './lecteur-independant.mjs';
const require = createRequire(import.meta.url);
const AdmZip = require('adm-zip');

const [conv, M, nStr, X, graine = '2026'] = process.argv.slice(2);
const N = +nStr;
const R = path.resolve('..');
const RUNS = { 'worldswitch-avant-table18': '03-conversions-worldswitch', 'worldswitch-c25': '03-conversions-worldswitch-c25', 'chunker-1.21.0': '03-conversions-chunker-1.21.0', 'je2be-8dfc4de': '03-conversions-je2be-8dfc4de', 'umt-1.5.10': '03-conversions-umt-1.5.10' };
const nd = path.join(R, M === 'R01' ? `04-notation-${conv}-table110` : `04-notation-${conv}`, M);
const s = JSON.parse(fs.readFileSync(path.join(nd, 'summary.json'), 'utf8'));
const run = (leg) => JSON.parse(fs.readFileSync(path.join(R, RUNS[conv], leg, 'run.json'), 'utf8'));

function racine(dir, marqueur) {
  const pile = [dir];
  while (pile.length) { const d = pile.shift(); if (fs.existsSync(path.join(d, marqueur))) return d; for (const e of fs.readdirSync(d, { withFileTypes: true })) if (e.isDirectory()) pile.push(path.join(d, e.name)); }
  throw new Error(`${marqueur} introuvable sous ${dir}`);
}
function extraire(zip, dest) {
  if (!fs.existsSync(path.join(dest, '.ok'))) { fs.mkdirSync(dest, { recursive: true }); new AdmZip(zip).extractAllTo(dest, true); fs.writeFileSync(path.join(dest, '.ok'), ''); }
  return dest;
}
// Bedrock : base LevelDB extraite (copie de travail) ; Java : lu dans l'archive, sans extraction
const ouvrir = async (zip, dest) => {
  const z = new AdmZip(zip);
  const noms = z.getEntries().map((e) => e.entryName);
  if (noms.some((n) => /(^|\/)db\/CURRENT$/.test(n))) return new BedrockMonde(racine(extraire(zip, dest), 'db')).ouvrir();
  const ld = noms.filter((n) => /(^|\/)level\.dat$/.test(n)).sort((a, b) => a.length - b.length)[0];
  return new JavaMonde({ zip: z, prefixe: ld.slice(0, -'level.dat'.length).replace(/\/$/, '') });
};
const aller = run(`${M}_aller`), retour = run(`${M}_retour`);
const src = await ouvrir(path.join(R, '01-sources', aller.source.file), path.join(X, 'src', M));
const outA = await ouvrir(path.join(R, RUNS[conv], `${M}_aller`, aller.output.file), path.join(X, conv, `${M}_aller`));
const outR = await ouvrir(path.join(R, RUNS[conv], `${M}_retour`, retour.output.file), path.join(X, conv, `${M}_retour`));
const ed = (w) => (w instanceof JavaMonde ? 'java' : 'bedrock');

// tirage déterministe
let h = [...graine].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const rnd = () => ((h = (h * 1103515245 + 12345) >>> 0) / 2 ** 32);
const echant = (arr, n) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a.slice(0, n); };

const fx = readFixtures(s.world, { file: path.join(R, '02-mccb', s.fixtures.file) });
const subj = new Map(fx.subjects.map((x) => [x.id, x]));
const rows = readJsonlGz(path.join(nd, 'results.jsonl.gz'));
const CASES = [['block', 'identity'], ['block_entity', 'presence'], ['item_stack', 'identity'], ['item_stack', 'count']];

const nomB = (b) => b?.name ?? null;
const statesEq = (a, b) => JSON.stringify(Object.entries(a || {}).map(([k, v]) => [k, String(v)]).sort()) === JSON.stringify(Object.entries(b || {}).map(([k, v]) => [k, String(v)]).sort());
// pile vide (Count 0 / nom vide) = rien ; sans `Slot` (étagère Bedrock) l'emplacement est le rang dans la liste
const items = (be) => (be?.Items || []).map((i, n) => ({ slot: i.Slot ?? n, id: i.id ?? i.Name, count: i.count ?? i.Count })).filter((i) => i.id && i.id !== 'minecraft:air' && i.count !== 0);
async function lire(w, fam, loc) {
  if (fam === 'block') return w.bloc(loc.dim, loc.pos);
  const be = await w.blocEntite(loc.dim, loc.pos);
  // le jeu supprime au chargement un bloc-entité posé sur un bloc qui ne le porte pas (ex. air) : on lit aussi le bloc
  if (fam === 'block_entity') { if (!be) return null; const b = await w.bloc(loc.dim, loc.pos); return { id: be.id, bloc: b.name }; }
  const it = items(be).find((i) => i.slot === loc.slot);
  return { conteneur: be ? be.id : null, pile: it || null };
}
// jugement indépendant de l'aller-retour (même édition)
function juge(fam, aspect, e, o) {
  if (fam === 'block') return nomB(e) === nomB(o) ? 'PASS' : 'FAIL';
  if (fam === 'block_entity') return o && !/(^|:)air$/.test(o.bloc || '') ? 'PASS' : 'FAIL';
  if (!o.pile || !e.pile) return 'FAIL';
  return aspect === 'identity' ? (e.pile.id === o.pile.id ? 'PASS' : 'FAIL') : (e.pile.count === o.pile.count && e.pile.id === o.pile.id ? 'PASS' : 'FAIL');
}
// registre = source ?
function registreOK(fam, x, e) {
  if (fam === 'block') return e.absent ? null : x.expected.name === e.name || x.expected.name?.replace(/^minecraft:/, '') === e.name?.replace(/^minecraft:/, '');
  if (fam === 'block_entity') return !!e;
  if (!e.pile) return false;
  return (x.expected.id === e.pile.id || x.expected.id?.replace(/^minecraft:/, '') === String(e.pile.id).replace(/^minecraft:/, '')) && (fam !== 'item_stack' || x.expected.count === e.pile.count);
}
const res = { conv, monde: M, graine, aller: [], retour: [], direct_brut: [] };
const tally = { accord: 0, desaccord: 0, non_auto: 0, registre_ok: 0, registre_ko: 0 };
for (const [fam, aspect] of CASES) for (const lv of ['roundtrip', 'direct']) for (const st of ['PASS', 'FAIL']) {
  const cand = rows.filter((r) => r.family === fam && r.aspects[aspect]?.[lv]?.evaluated && r.aspects[aspect][lv].status === st);
  for (const r of echant(cand, N)) {
    const x = subj.get(r.id), v = r.aspects[aspect][lv];
    const e = await lire(src, fam, x.locator);
    const reg = registreOK(fam, x, e);
    if (reg === true) tally.registre_ok++; else if (reg === false) tally.registre_ko++;
    const o = await lire(lv === 'roundtrip' ? outR : outA, fam, x.locator);
    const ligne = { id: r.id, aspect: `${fam}.${aspect}`, niveau: lv, script: st, regle: v.rule, preuve: v.evidence ?? null, ou: x.locator, attendu_registre: x.expected.name ?? x.expected.id, source: e, sortie: o, registre_conforme: reg };
    // pile d'un coffre double : le script lit le coffre tel qu'il est montré (deux moitiés) — pas de jugement automatique
    const double = fam === 'item_stack' && x.expected.pair_half !== undefined;
    const meme = lv === 'roundtrip' && ed(src) === ed(outR);
    if (meme && !double) { ligne.independant = juge(fam, aspect, e, o); if (ligne.independant === st) tally.accord++; else { tally.desaccord++; res.retour.push(ligne); } }
    else { tally.non_auto++; res.direct_brut.push(ligne); }
  }
}
for (const w of [src, outA, outR]) await w.fermer();
res.tally = tally;
const out = path.join(X, `recontrole-${conv}-${M}.json`);
fs.writeFileSync(out, JSON.stringify(res, (k, v) => (typeof v === 'bigint' ? v.toString() : v), 1));
console.log(conv, M, JSON.stringify(tally), '→', out);
