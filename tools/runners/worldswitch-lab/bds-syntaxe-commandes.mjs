#!/usr/bin/env node
// Revue J04 (09/11/2026) : chaque commande Bedrock DISTINCTE écrite par un convertisseur est passée à la
// console d'un serveur Bedrock jetable (version = celle du zip donné) (monde plat neuf, aucun joueur). Le serveur dit si la
// commande EXISTE et si sa SYNTAXE est acceptée (« Syntax error », « Unknown command ») ; un sélecteur sans
// cible (« No targets matched ») prouve au contraire que la syntaxe passe. Aide à la revue manuelle des
// 400 cas déclarés : ne juge PAS le sens de la commande, seulement ce que le jeu refuse de lire.
//   node bds-syntaxe-commandes.mjs <bds.zip> <dossier de travail> <commandes.json (liste de chaînes)> <sortie.json>
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const AdmZip = require('adm-zip');

const [zip, work, entree, sortie] = process.argv.slice(2);
const bds = path.join(work, path.basename(zip).replace(/\.zip$/i, ''));  // un dossier par version de serveur
if (!fs.existsSync(path.join(bds, 'bedrock_server.exe'))) { fs.mkdirSync(bds, { recursive: true }); new AdmZip(zip).extractAllTo(bds, true); }
const LVL = `MCCBJ04SYNTAXE${Date.now()}`;
fs.writeFileSync(path.join(bds, 'server.properties'), `server-name=${LVL}\nlevel-name=${LVL}\nlevel-type=FLAT\ngamemode=creative\ndifficulty=peaceful\nonline-mode=false\nserver-port=19352\nserver-portv6=19353\ncontent-log-file-enabled=false\n`);
const commandes = JSON.parse(fs.readFileSync(entree, 'utf8'));
const INTERDITES = /^\/?\s*(stop|reload|save|transfer|kick|op|deop|allowlist|whitelist|permission|changesetting)\b/i;

const p = spawn(path.join(bds, 'bedrock_server.exe'), { cwd: bds, stdio: ['pipe', 'pipe', 'pipe'] });
let buf = '';
p.stdout.on('data', (d) => { buf += d.toString(); });
p.stderr.on('data', (d) => { buf += d.toString(); });
const attendre = async (re, ms) => { const t = Date.now(); while (!re.test(buf)) { if (Date.now() - t > ms) throw new Error(`délai dépassé : ${re}`); await new Promise((r) => setTimeout(r, 50)); } };
const res = [];
try {
  await attendre(/Server started/i, 240000);
  await new Promise((r) => setTimeout(r, 3000)); // messages de démarrage (télémétrie) terminés
  for (let i = 0; i < commandes.length; i++) {
    const c = String(commandes[i]).replace(/^\//, '').replace(/[\r\n]+/g, ' ');
    if (INTERDITES.test(c)) { res.push({ commande: commandes[i], verdict: 'NON_TESTEE', reponse: 'commande d’administration du serveur non envoyée' }); continue; }
    const debut = buf.length;
    const sentinelle = `MCCBSENTINELLE${i}FIN`;
    p.stdin.write(`${c}\n`);
    p.stdin.write(`${sentinelle.toLowerCase()}\n`); // commande inconnue : le serveur la signale toujours
    await attendre(new RegExp(sentinelle, 'i'), 20000);
    const lignes = buf.slice(debut).split(/\r?\n/).map((l) => l.replace(/^\[[^\]]*\]\s*/, '').trim()).filter((l) => l && !l.toLowerCase().includes(sentinelle.toLowerCase()));
    const t = lignes.join(' | ');
    const verdict = /Unknown command|n'existe pas|Unknown or incomplete command/i.test(t) ? 'COMMANDE_INCONNUE'
      : /Syntax error|Erreur de syntaxe|Unexpected/i.test(t) ? 'SYNTAXE_REFUSEE'
      : 'SYNTAXE_ACCEPTEE';
    res.push({ commande: commandes[i], verdict, reponse: t.slice(0, 400) });
  }
} catch (e) {
  fs.writeFileSync(`${sortie}.journal.txt`, buf);
  throw e;
} finally {
  try { p.stdin.write('stop\n'); } catch { /* fermé */ }
  setTimeout(() => { try { p.kill(); } catch { /* fini */ } }, 5000);
}
fs.writeFileSync(sortie, JSON.stringify(res, null, 1));
const n = {}; for (const r of res) n[r.verdict] = (n[r.verdict] || 0) + 1;
console.log(JSON.stringify(n));
