// MCCB 2026-11 — range les conversions d'Universal Minecraft Tool (UMT), pilotées à l'écran sous Windows,
// au même format que les concurrents du labo (run.json mccb.run/1 + TEMPS-ET-RESSOURCES).
//   node tools/runners/worldswitch-lab/export-umt.mjs <_work/umt> <dossier 03-conversions-umt-…> <plan.tsv> <01-sources>
// Entrées : <_work/umt>/chrono.log (horodatages Bash avant le clic / après le message de fin),
//           <_work/umt>/pack/<LEG>.zip|.mcworld (sortie d'UMT emballée telle quelle).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const [work, dest, planFile, srcDir] = process.argv.slice(2);
const UMT = {
  name: 'Universal Minecraft Tool',
  slug: 'umt',
  version: '1.5.10',
  release: 'v1.5.10, © 2023 Pryze Software LLC (Settings › About & Licenses) ; application Windows payante, abonnement de l\'utilisateur',
  app_settings: 'Converter : Copy Bedrock Worlds = oui (UMT travaille sur une copie), Copy Java Worlds = non, Remember Conversion Options = oui ; Auto Update = oui',
  tool_file: 'UniversalMinecraftTool.exe',
  tool_sha256: '9c35ed26d7b49abed4c0448bea674e428f8481554fa925c298985f8564c0dc51',
  runtime: 'Windows 11 (PC de l\'utilisateur), interface graphique pilotée à l\'écran',
  formats: { java_to_bedrock: 'Bedrock 26.50 (Latest)', bedrock_to_java: 'Java 26.3 (Latest)' },
  source_available: false,
  build: 'installateur officiel, C:\\Program Files (x86)\\Universal Minecraft Tool',
  command_template: 'Converter : Input (dossier du monde) → Output (édition, version « Latest ») → Options (défauts) → Start Conversion → Save World',
};
const OPTIONS = {
  dimensions: 'Overworld, Nether, The End',
  tile_entities: true, entities: true, ticks: true,
  skip_partially_generated_chunks: true, allow_older_chunk_versions: true,
  game_mode: 'No Change', difficulty: 'No Change', depth_fixer: 'Clip + Bedrock', new_world_center: 'Coords X 0 Z 0',
  note: 'réglages par défaut d\'UMT, aucun modifié',
};
const DIRS = { jtb: 'java_to_bedrock', btj: 'bedrock_to_java' };
const sha = (f) => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');

// chrono.log : « LEG étape [clé=valeur …] ISO »
const ev = {};
for (const line of fs.readFileSync(path.join(work, 'chrono.log'), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^(\S+_(?:aller|retour)) (\S+)(.*) (\d{4}-\d\d-\d\dT\S+Z)$/);
  if (!m) continue;
  const [, leg, step, rest, iso] = m;
  const e = (ev[leg] ||= { kv: {} });
  e[step] = iso;
  for (const kv of rest.matchAll(/(\w+)=(\S+)/g)) e.kv[kv[1]] = kv[2];
  if (step === 'fail') e.fail = rest.trim();
}
const ms = (a, b) => (a && b ? Date.parse(b) - Date.parse(a) : null);
const packOf = (leg) => ['zip', 'mcworld'].map((x) => path.join(work, 'pack', `${leg}.${x}`)).find((f) => fs.existsSync(f));

const plan = fs.readFileSync(planFile, 'utf8').split(/\r?\n/).filter((l) => l && !l.startsWith('#')).map((l) => l.split('\t'));
const rows = [];
for (const [leg, sens, input] of plan) {
  const e = ev[leg];
  if (!e?.start) { rows.push({ leg, sens, status: 'non lancé' }); continue; }
  const legDir = path.join(dest, leg);
  fs.mkdirSync(legDir, { recursive: true });
  let src;
  if (input.startsWith('@')) {
    const p = packOf(input.slice(1));
    src = { ref: input.slice(1), file: path.basename(p).replace(/^.*\.(zip|mcworld)$/, 'output.$1'), sha256: sha(p), bytes: fs.statSync(p).size };
  } else {
    const p = path.join(srcDir, input);
    src = { ref: 'source', file: input, sha256: sha(p), bytes: fs.statSync(p).size };
  }
  const pack = packOf(leg);
  let output = null;
  if (pack && !e.fail) {
    const name = `output.${pack.endsWith('.zip') ? 'zip' : 'mcworld'}`;
    const to = path.join(legDir, name);
    if (!fs.existsSync(to)) fs.copyFileSync(pack, to);
    output = { file: name, sha256: sha(to), bytes: fs.statSync(to).size };
  }
  const conv = ms(e.start, e['end-observed']);
  const save = ms(e['save-start'], e['save-end-observed']);
  const log = [`# ${leg} — journal de pilotage (UMT n'écrit pas de journal ; horodatages Bash, UTC)`,
    ...fs.readFileSync(path.join(work, 'chrono.log'), 'utf8').split(/\r?\n/).filter((l) => l.startsWith(`${leg} `)), ''];
  fs.writeFileSync(path.join(legDir, 'pilotage.log'), log.join('\n'));
  const run = {
    schema: 'mccb.run/1',
    run_id: leg,
    converter: UMT,
    direction: DIRS[sens],
    source: src,
    options: OPTIONS,
    environment: {
      kind: 'Windows 11, PC de l\'utilisateur (PAS le labo Linux) : UMT est une application Windows à fenêtres sans mode commande',
      limits: 'aucune limite imposée (16 cœurs vus par UMT, 31 Go de RAM)',
    },
    started_at: e.start,
    finished_at: e['end-observed'],
    duration_ms: conv,
    timing: {
      measured: 'heure système (Bash) juste avant le clic « Start Conversion » → juste après avoir vu « Conversion Successful » à l\'écran ; mesuré sous Windows',
      precision: 'majorant : inclut le délai du pilotage à l\'écran (≈ 5 à 8 s par mesure)'
        + (e.kv.attente ? ` + jusqu'à ${e.kv.attente} d'attente entre deux coups d'œil à l'écran ; le temps affiché par UMT est alors le chiffre fiable` : ''),
      umt_elapsed_display: e.kv.umt ?? null,
      umt_chunks_converted: e.kv.chunks ? Number(e.kv.chunks) : null,
      save_ms: save,
      save_measured: 'Entrée dans la boîte « Enregistrer » → message « The world has been saved! » vu (majorant, même délai)',
    },
    exit_status: e.fail ? 1 : 0,
    oom_killed: false,
    error: e.fail ? e.fail : (output ? null : 'aucun monde en sortie'),
    output,
    logs: ['pilotage.log'],
    peak: { converter_memory_bytes: null },
  };
  fs.writeFileSync(path.join(legDir, 'run.json'), JSON.stringify(run, null, 1) + '\n');
  rows.push({ leg, sens, status: output ? 'fait' : `ÉCHEC (${run.error})`, in_mb: src.bytes / 2 ** 20, out_mb: output ? output.bytes / 2 ** 20 : null,
    s: conv / 1000, umt: e.kv.umt ?? null, save_s: save == null ? null : save / 1000, peak: null });
}
const f1 = (x) => (x == null || Number.isNaN(x) ? '—' : x.toFixed(1));
const md = [`# Conversions ${UMT.name} ${UMT.version} — temps et ressources (mesurés sous Windows, PAS au labo Linux)`, '',
  'UMT est une application Windows à fenêtres, payante, sans mode commande : elle ne peut pas tourner dans le conteneur du labo.',
  'Conversions faites sur le PC de l\'utilisateur (Windows 11, 16 cœurs, 31 Go), pilotées à l\'écran, réglages par défaut.', '',
  '- **Temps (s)** : heure système avant le clic « Start Conversion » → après le message « Conversion Successful » vu à l\'écran.',
  '  C\'est un **majorant** : il inclut le délai du pilotage (≈ 5 à 8 s), plus l\'attente entre deux coups d\'œil à l\'écran pour',
  '  les longues conversions (jusqu\'à 170 s pour R01_retour, voir `run.json` › `timing.precision`). Pour les petits mondes, ce délai domine.',
  '- **Affiché UMT** : temps écoulé affiché par UMT lui-même (m:ss, à la seconde) ; le chiffre le plus fiable pour les longues conversions.',
  '- **Enregistrement (s)** : écriture du monde (« Save World »), mesurée à part, même délai.',
  '- **Pic mémoire** : non mesuré (« — »).', '',
  '| Conversion | Sens | Statut | Entrée (Mo) | Sortie (Mo) | Temps Windows (s) | Affiché UMT | Enregistrement (s) | Pic mémoire (Mio) |',
  '|---|---|---|--:|--:|--:|--:|--:|--:|',
  ...rows.map((r) => `| ${r.leg} | ${r.sens} | ${r.status} | ${f1(r.in_mb)} | ${f1(r.out_mb)} | ${f1(r.s)} | ${r.umt ?? '—'} | ${f1(r.save_s)} | — |`), ''];
fs.writeFileSync(path.join(dest, 'TEMPS-ET-RESSOURCES.md'), md.join('\n'));
fs.writeFileSync(path.join(dest, 'temps-et-ressources.json'), JSON.stringify(rows, null, 1) + '\n');
console.log(md.join('\n'));
