// MCCB — labo prod-like : met UNE conversion en file comme le ferait le site.
// Exécuté DANS l'image WorldSwitch (cwd /app), sur le réseau du banc, avec la socket du
// convertisseur : envoi de l'entrée dans le seau (émulateur S3), analyse par le VRAI service
// (comme l'ingestion du site, taille décompressée comprise), job gratuit `queued`.
// Options = défauts du service public : J→B targetVersion 'latest' ; B→J sans UUID Java ni
// correspondance de joueurs ; recoverUnlinked true ; locale LEG_LOCALE (défaut 'en').
// usage : LEG_INPUT=/bench/in/x LEG_DIR=jtb|btj LEG_OUT=/bench/rec/prep.json node /labo/leg-prep.mjs
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

const { prisma } = await import('/app/lib/prisma.js');
const { uploadFile, uploadKey } = await import('/app/lib/r2.js');
const { runWorldAnalysis } = await import('/app/lib/conversion-process.js');

const input = process.env.LEG_INPUT;
const sens = process.env.LEG_DIR;
const locale = process.env.LEG_LOCALE || 'en';
if (!input || !['jtb', 'btj'].includes(sens)) { console.error('LEG_INPUT / LEG_DIR manquants'); process.exit(2); }

const id = randomUUID();
const nom = path.basename(input);
const key = uploadKey(id, nom);
const t0 = Date.now();
await uploadFile(key, input, { contentType: 'application/octet-stream' });
const uploadMs = Date.now() - t0;

let meta, analysisMs, essais = 0;
for (;; essais++) {
  const ta = Date.now();
  try { meta = await runWorldAnalysis({ filePath: input, direction: sens }); analysisMs = Date.now() - ta; break; }
  catch (e) {
    if (essais > 90 || !/UNAVAILABLE|BUSY/.test(e.code || '')) { console.error(`analyse refusée : ${e.code || ''} ${e.message}`); process.exit(1); }
    await new Promise((r) => setTimeout(r, 1000));
  }
}
const taille = fs.statSync(input).size;
await prisma.job.create({ data: {
  id, direction: sens, inputKey: key, locale,
  sizeMb: (taille / 2 ** 20).toFixed(3),
  uncompressedMb: (Number(meta.uncompressedBytes || taille) / 2 ** 20).toFixed(3),
  tierId: 'free', price: 0, status: 'queued', targetVersion: sens === 'jtb' ? 'latest' : null,
  recoverUnlinked: true,
} });
const rec = { job_id: id, input_key: key, input_bytes: taille, upload_ms: uploadMs, analysis_ms: analysisMs,
  analysis_retries: essais, analysis: meta, queued_at: new Date().toISOString() };
fs.writeFileSync(process.env.LEG_OUT, JSON.stringify(rec, null, 1));
console.log(`[prep] ${nom} (${sens}) ${(taille / 2 ** 20).toFixed(1)} Mio, analyse ${analysisMs} ms → job ${id}`);
await prisma.$disconnect();
