// MCCB 2026-11 — fiches de run (`run.json`, mccb.run/1) et tableau des temps pour un convertisseur
// concurrent passé au labo par labo/banc-concurrent.sh (même conteneur limité que WorldSwitch).
//   node tools/runners/worldswitch-lab/export-concurrent.mjs <dossier des conversions> <plan.tsv> '<fiche JSON du convertisseur>'
import fs from 'node:fs';
import path from 'node:path';

const [dir, planFile, convJson] = process.argv.slice(2);
const conv = JSON.parse(convJson);
const DIRS = { jtb: 'java_to_bedrock', btj: 'bedrock_to_java' };
const plan = fs.readFileSync(planFile, 'utf8').split(/\r?\n/).filter((l) => l && !l.startsWith('#')).map((l) => l.split('\t'));
const rows = [];
for (const [leg, sens, input] of plan) {
  const f = path.join(dir, leg, 'lab-concurrent.json');
  if (!fs.existsSync(f)) { rows.push({ leg, sens, status: 'non lancé' }); continue; }
  const lab = JSON.parse(fs.readFileSync(f, 'utf8'));
  if (!lab.leg) { rows.push({ leg, sens, status: lab.status }); continue; }
  const run = {
    schema: 'mccb.run/1',
    run_id: leg,
    converter: { ...conv, build: `docker image ${lab.image} (${lab.image_id})`, command_template: lab.command },
    direction: DIRS[sens],
    source: { ref: input.startsWith('@') ? input.slice(1) : 'source', file: lab.source.file, sha256: lab.source.sha256, bytes: lab.source.bytes },
    options: {},
    environment: { kind: 'labo prod-like, conteneur identique au convertisseur WorldSwitch', limits: lab.limits },
    started_at: lab.started_at, finished_at: lab.finished_at, duration_ms: lab.duration_ms,
    exit_status: lab.exit_status, oom_killed: lab.oom_killed === true,
    error: lab.output.file ? null : `aucun monde en sortie (code ${lab.exit_status}${lab.oom_killed ? ', OOM' : ''})`,
    output: lab.output.file ? { file: lab.output.file, sha256: lab.output.sha256, bytes: lab.output.bytes } : null,
    logs: ['stdout.log', 'stderr.log'].filter((x) => fs.existsSync(path.join(dir, leg, x))),
    peak: { converter_memory_bytes: lab.memory_peak_bytes },
  };
  fs.writeFileSync(path.join(dir, leg, 'run.json'), JSON.stringify(run, null, 1) + '\n');
  rows.push({ leg, sens, status: lab.output.file ? (lab.exit_status === 0 ? 'fait' : `sortie, code ${lab.exit_status}`) : `ÉCHEC (code ${lab.exit_status}${lab.oom_killed ? ', OOM' : ''})`,
    // Pic à 0 = conteneur terminé avant le premier relevé (≈ 0,5 s) : non mesuré, pas « 0 ».
    in_mb: lab.source.bytes / 2 ** 20, out_mb: lab.output.bytes / 2 ** 20, s: lab.duration_ms / 1000, peak: lab.memory_peak_bytes > 0 ? lab.memory_peak_bytes / 2 ** 20 : null });
}
const f1 = (x) => (x == null || Number.isNaN(x) ? '—' : x.toFixed(1));
const md = [`# Conversions ${conv.name} ${conv.version} — temps et ressources (labo prod-like)`, '',
  'Même environnement que le convertisseur WorldSwitch du labo : un conteneur neuf par conversion, 4 CPU, 5 632 Mio sans',
  'swap, sans réseau. Temps = démarrage → fin du conteneur (JVM ou binaire compris). Pic = `memory.peak` du cgroup.', '',
  '| Conversion | Sens | Statut | Entrée (Mo) | Sortie (Mo) | Temps (s) | Pic mémoire (Mio) |', '|---|---|---|--:|--:|--:|--:|',
  ...rows.map((r) => `| ${r.leg} | ${r.sens} | ${r.status} | ${f1(r.in_mb)} | ${f1(r.out_mb)} | ${f1(r.s)} | ${f1(r.peak)} |`), ''];
fs.writeFileSync(path.join(dir, 'TEMPS-ET-RESSOURCES.md'), md.join('\n'));
fs.writeFileSync(path.join(dir, 'temps-et-ressources.json'), JSON.stringify(rows, null, 1) + '\n');
console.log(md.join('\n'));
