// MCCB 2026-11 — transforme chaque conversion du labo (lab.json + job.json + prep.json) en
// fiche de run MCCB (`run.json`, schéma mccb.run/1) lue par les oracles, et écrit le tableau
// des temps et des ressources.
//   node tools/runners/worldswitch-lab/export-runs.mjs <dossier des conversions> <plan.tsv>
import fs from 'node:fs';
import path from 'node:path';

const [dir, planFile] = process.argv.slice(2);
const read = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const DIRS = { jtb: 'java_to_bedrock', btj: 'bedrock_to_java' };
// Défauts du service public, ceux que leg-prep.mjs pose sur le job.
const OPTIONS = {
  java_to_bedrock: { targetVersion: 'latest', recoverUnlinked: true, locale: 'en' },
  bedrock_to_java: { recoverUnlinked: true, locale: 'en', javaUuid: null, playerMap: null },
};
const ms = (a, b) => (a && b ? Date.parse(`${b}Z`) - Date.parse(`${a}Z`) : null);
const plan = fs.readFileSync(planFile, 'utf8').split(/\r?\n/).filter((l) => l && !l.startsWith('#')).map((l) => l.split('\t'));
const rows = [];
for (const [leg, sens, input] of plan) {
  const d = path.join(dir, leg);
  if (!fs.existsSync(path.join(d, 'lab.json'))) { rows.push({ leg, missing: true }); continue; }
  const lab = read(path.join(d, 'lab.json'));
  const job = read(path.join(d, 'job.json'));
  const prep = read(path.join(d, 'prep.json'));
  const direction = DIRS[sens];
  const conv = ms(job.startedAt, job.finishedAt);
  const run = {
    schema: 'mccb.run/1',
    run_id: leg,
    converter: { name: 'WorldSwitch', engine_package: 'worldswitch', engine_package_version: '2.8.0',
      commit: '5e2e2d528d469eb3fdd90dd318073304fa46fa25', working_tree_clean: !/-c\d+$/.test(lab.image),
      // 09/11/2026 : la série cN est bâtie depuis l'arbre `src-cN` du labo (corrections non commitées), pas depuis
      // le seul correctif du 01/11 que citaient à tort les fiches c25/c26.
      ...(/-c\d+$/.test(lab.image) ? { patch: `arbre /srv/mccb-2026-11/src-${lab.image.match(/-(c\d+)$/)[1]} du labo (corrections non commitées du dépôt, voir 05-rapports)` } : {}),
      build: `docker image ${lab.image} (${lab.image_id}), Dockerfile du dépôt, git archive du commit`, source_available: false },
    direction,
    source: { ref: input.startsWith('@') ? input.slice(1) : 'source', file: lab.input.file, sha256: lab.input.sha256, bytes: lab.input.bytes },
    options: OPTIONS[direction],
    environment: { kind: 'labo prod-like (docker-compose.yml)', limits: lab.limits, host: lab.host },
    started_at: job.startedAt ? `${job.startedAt}Z` : null, finished_at: job.finishedAt ? `${job.finishedAt}Z` : null,
    duration_ms: conv,
    exit_status: lab.final_status === 'done' ? 0 : 1,
    error: job.error || null,
    output: lab.output.file ? { file: lab.output.file, sha256: lab.output.sha256, bytes: lab.output.bytes, engine_filename: path.basename(lab.output.storage_key) } : null,
    logs: ['converter.log', 'worker.log', 'prep.log'].filter((f) => fs.existsSync(path.join(d, f))),
    peak: { converter_memory_bytes: lab.converter.memory_peak_bytes, worker_memory_bytes: lab.worker.memory_peak_bytes },
    lab: { job_id: lab.job_id, final_status: lab.final_status, attempts: job.attempts, notice: job.notice,
      upload_ms: prep.upload_ms, analysis_ms: prep.analysis_ms, analysis: { ...prep.analysis, iconBase64: undefined },
      queue_to_done_ms: ms(job.createdAt, job.finishedAt), wall_s_worker_start_to_terminal: lab.wall_s_worker_start_to_terminal,
      converter: lab.converter, worker: lab.worker },
  };
  fs.writeFileSync(path.join(d, 'run.json'), JSON.stringify(run, null, 1) + '\n');
  rows.push({ leg, direction: sens, status: lab.final_status, in_mb: lab.input.bytes / 2 ** 20, out_mb: lab.output.bytes / 2 ** 20,
    uncompressed_mb: prep.analysis?.uncompressedBytes / 2 ** 20, chunks: prep.analysis?.chunkCount, analysis_s: prep.analysis_ms / 1000,
    conv_s: conv / 1000, wall_s: lab.wall_s_worker_start_to_terminal, conv_peak_mib: lab.converter.memory_peak_bytes / 2 ** 20,
    conv_cpu_s: lab.converter.cpu_usec / 1e6, scratch_peak_mib: lab.converter.scratch_peak_bytes_sampled_2s / 2 ** 20,
    worker_peak_mib: lab.worker.memory_peak_bytes / 2 ** 20, oom: lab.converter.oom_kills, fidelity_notices: job.notice?.fidelity?.total ?? null });
}
const f1 = (x) => (x == null || Number.isNaN(x) ? '—' : x.toFixed(1));
const md = ['# Conversions WorldSwitch — temps et ressources (labo prod-like)', '',
  'Moteur 2.8.0, commit `5e2e2d5`, image construite par le Dockerfile du dépôt. Convertisseur : 4 CPU, 5 632 Mio, sans swap,',
  'sans réseau, lecture seule (docker-compose.yml) ; worker : 0,75 CPU, 512 Mio. Un convertisseur neuf par conversion,',
  'conversions l\'une après l\'autre. Hôte : ' + (rows.find((r) => !r.missing) ? read(path.join(dir, rows.find((r) => !r.missing).leg, 'lab.json')).host.cpu_model : '?') + ' (WSL2) — PAS le processeur du serveur (EPYC 9645) :',
  'les durées sont comparables entre elles et entre convertisseurs mesurés ici, pas une promesse de durée en production.', '',
  '« Conversion » = `startedAt` → `finishedAt` du job (téléchargement depuis le seau, conversion, livraison). « Analyse » = l\'analyse',
  'faite à l\'envoi (comme sur le site). CPU = temps CPU consommé par le conteneur du convertisseur (toutes ses tâches).', '',
  '| Conversion | Sens | Statut | Entrée Mio | Décompressé Mio | Chunks | Analyse s | Conversion s | CPU conv. s | Pic RAM conv. Mio | Pic scratch Mio | Sortie Mio | Avis de fidélité |',
  '|---|---|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|'];
for (const r of rows) {
  if (r.missing) { md.push(`| ${r.leg} | | non exécutée | | | | | | | | | | |`); continue; }
  md.push(`| ${r.leg} | ${r.direction === 'jtb' ? 'Java→Bedrock' : 'Bedrock→Java'} | ${r.status} | ${f1(r.in_mb)} | ${f1(r.uncompressed_mb)} | ${r.chunks ?? '—'} | ${f1(r.analysis_s)} | ${f1(r.conv_s)} | ${f1(r.conv_cpu_s)} | ${f1(r.conv_peak_mib)} | ${f1(r.scratch_peak_mib)} | ${f1(r.out_mb)} | ${r.fidelity_notices ?? '—'} |`);
}
fs.writeFileSync(path.join(dir, 'TEMPS-ET-RESSOURCES.md'), md.join('\n') + '\n');
fs.writeFileSync(path.join(dir, 'temps-et-ressources.json'), JSON.stringify(rows, null, 1) + '\n');
console.log(md.join('\n'));
