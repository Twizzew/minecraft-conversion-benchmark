// MCCB 2026-11 — vérification d'intégrité du comparatif final (5 convertisseurs × 9 mondes).
// Recalcule les empreintes sur disque et contrôle la chaîne source → aller → retour → notation → tri.
//   node tools/results/verifier-integrite-2026-11.mjs        (depuis 02-mccb/)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';
import { readFixtures, readJsonlGz } from '../lib/fixtures-io.mjs';
import { scorerIdentity } from '../lib/fingerprint.mjs';

const R = path.resolve('..');
// Racine des notations `04-notation-*` : MCCB-2026-11 par défaut ; MCCB_NOTATION_RACINE pour vérifier une répétition (09/11/2026).
// Version de la table de gravité sur le disque (09/11/2026 : n'est plus écrite en dur).
const TABLE_ACTUELLE = JSON.parse(fs.readFileSync(path.join(R, '02-mccb', 'docs', 'reference', 'impact-classes.v1.json'), 'utf8')).version;
const NR = process.env.MCCB_NOTATION_RACINE ? path.resolve(process.env.MCCB_NOTATION_RACINE) : R;
const CONV = [
  ['worldswitch-avant-table18', '03-conversions-worldswitch'],
  ['worldswitch-c25', '03-conversions-worldswitch-c25'],
  ['worldswitch-c26', '03-conversions-worldswitch-c26'],
  ['worldswitch-c27', '03-conversions-worldswitch-c27'],
  ['worldswitch-c28', '03-conversions-worldswitch-c28'],
  ['worldswitch-c29', '03-conversions-worldswitch-c29'],
  ['worldswitch-c30', '03-conversions-worldswitch-c30'],
  ['worldswitch-c31', '03-conversions-worldswitch-c31'],
  ['worldswitch-c32', '03-conversions-worldswitch-c32'],
  ['worldswitch-c33', '03-conversions-worldswitch-c33'],
  ['chunker-1.21.0', '03-conversions-chunker-1.21.0'],
  ['je2be-8dfc4de', '03-conversions-je2be-8dfc4de'],
  ['umt-1.5.10', '03-conversions-umt-1.5.10'],
];
const MONDES = ['J01', 'J02', 'J03', 'J04', 'J05', 'B01', 'B02', 'B03', 'R01'];
const memo = new Map();
const sha = (f) => {
  if (!memo.has(f)) {
    const h = crypto.createHash('sha256'); const fd = fs.openSync(f, 'r'); const b = Buffer.alloc(1 << 22); let n;
    while ((n = fs.readSync(fd, b, 0, b.length, null)) > 0) h.update(b.subarray(0, n));
    fs.closeSync(fd); memo.set(f, h.digest('hex'));
  }
  return memo.get(f);
};
const J = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const lignes = (f) => zlib.gunzipSync(fs.readFileSync(f)).toString('utf8').split('\n').filter(Boolean);
const sums = Object.fromEntries(fs.readFileSync(path.join(R, '01-sources', 'SHA256SUMS.txt'), 'utf8').split(/\r?\n/)
  .filter((l) => l && !l.startsWith('#')).map((l) => { const [h, ...n] = l.trim().split(/\s+/); return [n.join(' ').replace(/^\*/, ''), h]; }));
const probs = [];
const ko = (c, m, msg) => probs.push(`${c} ${m} : ${msg}`);
const fixCache = new Map();
const fixtureSujets = (file) => {
  if (!fixCache.has(file)) fixCache.set(file, readFixtures('x', { file }).subjects.length);
  return fixCache.get(file);
};
let ok = 0;
const fixParMonde = {};
const empreintes = {};
const scorerActuel = scorerIdentity().fingerprint;
for (const [c, runs] of CONV) for (const m of MONDES) {
  // révision 1.13 (rapport du 09/11/2026) : notation et tri dans le même dossier `04-notation-<conv>-r113/<MONDE>`
  const nd = path.join(NR, `04-notation-${c}-r113`, m);
  const gd = nd;
  // Audit du 09/11/2026 : une cellule absente est une ANOMALIE signalée, pas un plantage.
  const manque = ['summary.json', 'results.jsonl.gz', 'pertes-par-gravite.json'].filter((f) => !fs.existsSync(path.join(nd, f)))
    .concat([`${m}_aller`, `${m}_retour`].filter((x) => !fs.existsSync(path.join(R, runs, x, 'run.json'))).map((x) => `${runs}/${x}/run.json`));
  if (manque.length) { ko(c, m, `cellule incomplète : ${manque.join(', ')}`); continue; }
  const s = J(path.join(nd, 'summary.json'));
  const aller = J(path.join(R, runs, `${m}_aller`, 'run.json'));
  const retour = J(path.join(R, runs, `${m}_retour`, 'run.json'));
  const n0 = probs.length;
  // 0. même script pour toutes les cellules, et c'est celui du disque (pas une notation périmée).
  (empreintes[s.scorer?.fingerprint] ||= []).push(`${c} ${m}`);
  if (s.scorer?.fingerprint !== scorerActuel) ko(c, m, `script de notation ≠ script actuel (${String(s.scorer?.fingerprint).slice(0, 12)} ≠ ${scorerActuel.slice(0, 12)})`);
  if (!/-r113\.jsonl\.gz$/.test(String(s.fixtures?.file))) ko(c, m, `registre ${s.fixtures?.file} (r113 attendu)`);
  // 1. source = fichier publié (SHA256SUMS) = source déclarée par l'aller et par la notation
  const srcF = path.join(R, '01-sources', aller.source.file);
  const hs = sha(srcF);
  if (sums[aller.source.file] && sums[aller.source.file] !== hs) ko(c, m, `source modifiée (${aller.source.file})`);
  if (aller.source.sha256 !== hs) ko(c, m, 'aller : empreinte de la source ≠ fichier');
  if (s.source_sha256 !== hs) ko(c, m, 'notation : empreinte de la source ≠ fichier');
  // 2. sorties sur disque = déclarées ; le retour part de la sortie de l'aller
  const ha = sha(path.join(R, runs, `${m}_aller`, aller.output.file));
  const hr = sha(path.join(R, runs, `${m}_retour`, retour.output.file));
  if (ha !== aller.output.sha256) ko(c, m, 'sortie aller ≠ run.json');
  if (hr !== retour.output.sha256) ko(c, m, 'sortie retour ≠ run.json');
  if (retour.source.sha256 !== ha || retour.source.ref !== `${m}_aller`) ko(c, m, 'le retour ne part pas de la sortie de l\'aller');
  if (s.direct_output_sha256 !== ha || s.roundtrip_output_sha256 !== hr) ko(c, m, 'notation : sorties notées ≠ sorties sur disque');
  if (s.direct_run !== `${m}_aller` || s.roundtrip_run !== `${m}_retour`) ko(c, m, 'notation : mauvaises conversions');
  // 3. registre : même fichier pour tous les convertisseurs d'un monde, construit depuis cette source
  const ff = path.join(R, '02-mccb', s.fixtures.file);
  if (sha(ff) !== s.fixtures.file_sha256) ko(c, m, 'registre modifié depuis la notation');
  if (s.fixtures.built_from_source_sha256 !== hs) ko(c, m, 'registre construit depuis une autre source');
  (fixParMonde[m] ||= new Set()).add(s.fixtures.file_sha256);
  // 4. résultats : fichier intact, un résultat par sujet du registre
  const rf = path.join(nd, 'results.jsonl.gz');
  if (sha(rf) !== s.results_file.sha256) ko(c, m, 'résultats modifiés depuis la notation');
  const rows = readJsonlGz(rf);
  const nsuj = fixtureSujets(ff);
  if (rows.length !== s.results_file.subjects || rows.length !== nsuj) ko(c, m, `résultats ${rows.length} ≠ sujets ${s.results_file.subjects}/${nsuj}`);
  if (new Set(rows.map((r) => r.id)).size !== rows.length) ko(c, m, 'sujet noté deux fois');
  // 5. tri 1.10 : chaque FAIL/PARTIAL compté une fois, sans en perdre
  const g = J(path.join(gd, 'pertes-par-gravite.json'));
  if (g.table.version !== TABLE_ACTUELLE) ko(c, m, `tri : table ${g.table.version} ≠ table du disque ${TABLE_ACTUELLE}`);
  for (const lv of ['direct', 'roundtrip']) {
    let n = 0; for (const r of rows) for (const a of Object.values(r.aspects)) if (a[lv]?.evaluated && ['FAIL', 'PARTIAL'].includes(a[lv].status)) n++;
    const t = Object.values(g.levels[lv]).reduce((x, b) => x + b.count, 0);
    if (n !== t) ko(c, m, `tri ${lv} : ${t} classés ≠ ${n} FAIL/PARTIAL`);
  }
  if (probs.length === n0) ok++;
}
for (const [m, set] of Object.entries(fixParMonde)) if (set.size !== 1) probs.push(`${m} : registres différents selon les convertisseurs (${set.size})`);
if (Object.keys(empreintes).length > 1) probs.push(`SCRIPTS DE NOTATION MÉLANGÉS : ${Object.entries(empreintes).map(([f, l]) => `${String(f).slice(0, 12)} (${l.length} cellules)`).join(', ')}`);
console.log(`${ok}/${CONV.length * MONDES.length} couples convertisseur × monde sans anomalie`);
console.log(probs.length ? probs.join('\n') : 'aucune anomalie');
