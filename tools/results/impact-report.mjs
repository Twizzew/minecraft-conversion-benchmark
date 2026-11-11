#!/usr/bin/env node
// MCCB 2026-11 — CE QUE LE JOUEUR PERD, PAR ORDRE DE GRAVITÉ.
// Les comptes par assertion (PASS / FAIL…) ne disent pas ce qui compte : 60 FAIL sur 1 200 peuvent
// être 60 graines de butin régénérées (sans effet) ou 60 villageois sans leurs échanges. Ce rapport
// relit les lignes d'une notation (results.jsonl.gz) et classe chaque FAIL / PARTIAL selon une table
// de gravité FIXÉE AVANT de lire une sortie (docs/reference/impact-classes.v1.json), puis liste les
// pertes une par une, avec le sujet (quoi, où) et la preuve, pour qu'on puisse vérifier dans le monde.
// La table ne change AUCUN verdict : elle ne fait que trier. Elle ne nomme aucun convertisseur.
//   node tools/results/impact-report.mjs <dossier de notation> [--md out.md] [--json out.json] [--max 40]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readJsonlGz, readFixtures } from '../lib/fixtures-io.mjs';
import { bedrockRegistry } from '../lib/registry.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const dir = path.resolve(process.argv[2]);
const MAX = +arg('max', 40);
const table = JSON.parse(fs.readFileSync(path.join(HERE, '..', '..', 'docs', 'reference', 'impact-classes.v1.json'), 'utf8'));
const ORDER = table.classes.map((c) => c.id);
const summary = JSON.parse(fs.readFileSync(path.join(dir, 'summary.json'), 'utf8'));
const rows = readJsonlGz(path.join(dir, 'results.jsonl.gz'));
const fx = readFixtures(summary.world, { file: summary.fixtures?.file ? path.join(HERE, '..', '..', summary.fixtures.file) : null });
const subj = new Map(fx.subjects.map((s) => [s.id, s]));

const re = (s) => new RegExp(s);
// Table v1.4 : un champ de CONTENU qui diffère (nombre, objet, contenu d'un conteneur) n'est jamais une
// « donnée interne » — la règle v1.2 ne descend pas une telle pile.
const CONTENU = /(^|\.)(count|Count|id|Name)$|container|Items|bundle_contents|storage_item_component_content/;
const ZERO = /^(-?0(\.0+)?[bslfdBSLFD]?|""|\[\]|\{\}|false)$/;
// Pile vide dans la forme des preuves (`["c",{"Count":["n","0"],"Name":["s",""],…}]`) : 0 objet.
function pileVide(brut) {
  let t; try { t = JSON.parse(String(brut)); } catch { return false; }
  // Deux formes : preuve `["c",{…}]` ou valeur sémantique du sujet `{"Count":0,"Name":""…}`.
  const o = Array.isArray(t) ? (t[0] === 'c' ? t[1] : null) : t;
  if (!o || typeof o !== 'object') return false;
  const val = (x) => (Array.isArray(x) ? x[1] : x);
  const nom = val(o.Name ?? o.id), nb = val(o.Count ?? o.count);
  return (nom === '' || nom === 'minecraft:air') && (nb === undefined || Number(nb) === 0);
}
// `Block` d'une pile Bedrock (SNBT) portant un état que le bloc actuel n'a plus.
function blocAncienSnbt(snbt) {
  const t = String(snbt ?? ''); const n = /"?Block"?:\{"?name"?:"([^"]+)"/.exec(t); const st = /"?states"?:\{([^}]*)\}/.exec(t);
  if (!n || !st) return false;
  const reg = bedrockRegistry(); if (!reg.blocks.has(n[1])) return false;
  const cles = reg.blockStateKeys.get(n[1]) || [];
  return st[1].split(',').map((x) => x.split(':')[0].replace(/"/g, '').trim()).filter(Boolean).some((k) => !cles.includes(k));
}
const aspectRules = table.aspects.map((r) => ({ ...r, re: re(r.match) }));
const keyRules = table.data_keys.map((r) => ({ ...r, re: re(r.match) }));
/** Gravity of one non-passing verdict: by family.aspect, and for `data` by the keys that differ. */
function classify(family, aspect, v, s) {
  // world.value : la clé de monde décide (graine, apparition, règle de jeu…).
  const fa = family === 'world' && aspect === 'value' ? `world.value:${s?.locator?.key || ''}` : `${family}.${aspect}`;
  // Table 1.10 : pile de coffre double retrouvée (même objet) à l'emplacement miroir de l'autre
  // moitié — les deux moitiés sont montrées dans l'autre ordre (règle 49) : rien n'est perdu.
  if (table.double_chest_swap_is_minor && family === 'item_stack' && v.evidence?.cause === 'double-chest-halves-shown-in-other-order') {
    return { cls: 'MINOR', why: 'moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu)' };
  }
  if (/\.data$/.test(fa)) {
    const keys = [...(v.evidence?.lost || []), ...(v.evidence?.changed || []), ...(v.evidence?.added || []), ...(v.evidence?.differing_keys || [])];
    let best = null;
    const lost = new Set(v.evidence?.lost || []);
    for (const k of new Set(keys)) {
      const r = keyRules.find((x) => x.re.test(k));
      // Valeur source nulle perdue : le jeu relit l'absence comme cette valeur (table v1.1).
      const zero = table.zero_lost_is_technical && lost.has(k) && ZERO.test(String(s?.expected?.data?.[k] ?? ''));
      // Table v1.4 : détail de la clé, prouvé par la preuve (lib/key-detail.mjs) — ne fait que DESCENDRE.
      const kd = table.technical_only_is_technical ? v.evidence?.key_detail?.[k] : null;
      // Table v1.5 : doublon ancien d'une clé moderne revenue intacte, même valeur à la source.
      const moderne = table.legacy_duplicate_keys?.[k];
      const doublon = moderne && lost.has(k) && !keys.includes(moderne) && s?.expected?.data?.[k] !== undefined
        && String(s.expected.data[k]) === String(s.expected.data[moderne]);
      const efface = (table.added_ignored_keys || []).includes(k) && (v.evidence?.added || []).includes(k);
      // Table 1.9 : clé perdue dont la valeur source est une PILE VIDE (Count 0, nom vide ou air) —
      // ex. `item` des 950 pots décorés vides de R01 : rien n'est retiré du monde.
      const vide = table.empty_item_lost_is_technical && lost.has(k) && pileVide(s?.expected?.sem?.[k] ?? s?.expected?.data?.[k]);
      // Table 1.11 : objet au sol (`Item`) dont la source Bedrock porte un `Block` ancien (état disparu,
      // ex. `sand` + sand_type=red) — règle 40 étendue : le jeu le met à jour en le lisant ; revenu sous son
      // nom actuel, ce n'est pas une perte. Classé TECHNICAL (aucune autre différence n'est retirée).
      const ancien = table.legacy_item_block_is_technical && family === 'entity' && k === 'Item' && blocAncienSnbt(s?.expected?.data?.Item);
      // Table 1.14 : `Variant` d'un bloc en chute = identifiant réseau du bloc, dérivé de `FallingBlock` (jugé à part).
      const chute = table.falling_block_variant_is_technical && family === 'entity' && k === 'Variant'
        && s?.expected?.id === 'minecraft:falling_block';
      const c = zero || doublon || efface || vide || ancien || chute ? 'TECHNICAL' : kd || (r ? r.class : table.data_default);
      if (!best || ORDER.indexOf(c) < ORDER.indexOf(best.c)) best = { c, k };
    }
    return { cls: best ? best.c : table.data_default, why: best ? `clé ${best.k}` : 'données' };
  }
  // Table v1.4 : seules des différences TECHNIQUES (champ sans effet en jeu, nommé dans la preuve :
  // `differs` des piles, `stale_discount_offers` des échanges) — comptées, classées TECHNICAL.
  if (table.technical_only_is_technical && v.evidence?.technical_only === true) {
    return { cls: 'TECHNICAL', why: 'seuls des champs sans effet en jeu diffèrent (voir la preuve)' };
  }
  // Table 1.6 : différence visible mais secondaire, nommée dans la preuve.
  if (table.technical_only_is_technical && v.evidence?.minor_only === true) {
    return { cls: 'MINOR', why: v.evidence.note || 'différence secondaire (voir la preuve)' };
  }
  // Table v1.2 : inventaire où CHAQUE pile en défaut est le même objet au même emplacement (seules
  // ses données internes diffèrent) et rien n'est en trop : MAJEUR, pas CRITIQUE (à vérifier en jeu).
  const wrong = v.evidence?.wrong;
  if (table.same_item_wrong_is_major && Array.isArray(wrong) && wrong.length && !v.evidence?.extra?.length
    && wrong.every((w) => w.observed && w.observed === w.id && !(w.differs || []).some((p) => CONTENU.test(p))) && /\.(inventory|ender_chest|armor|equipment)$/.test(fa)) {
    return { cls: 'MAJOR', why: 'même objet au même emplacement, seules ses données internes diffèrent' };
  }
  const r = aspectRules.find((x) => x.re.test(fa));
  return { cls: r ? r.class : table.aspect_default, why: r ? r.label : fa };
}
const where = (s) => {
  if (!s) return '';
  const l = s.locator || {};
  const pos = l.pos ? l.pos.map((x) => (Number.isInteger(x) ? x : Math.round(x * 10) / 10)).join(' ') : '';
  return [l.dim ? l.dim.replace('minecraft:', '') : '', pos, l.key || '', l.objective || ''].filter(Boolean).join(' ');
};
const what = (s) => {
  if (!s) return '?';
  const e = s.expected || {};
  const name = e.custom_name ? ` « ${String(e.custom_name).slice(0, 40)} »` : '';
  return `${s.family} ${e.id || e.name || e.key || e.objective || e.rule || ''}${name}`.trim();
};
const brief = (v) => {
  const e = v.evidence;
  if (!e) return v.rule || '';
  const t = JSON.stringify(e);
  return t.length > 260 ? `${t.slice(0, 260)}…` : t;
};

const out = { world: summary.world, converter: summary.converter, direct_run: summary.direct_run, roundtrip_run: summary.roundtrip_run,
  table: { file: 'docs/reference/impact-classes.v1.json', version: table.version }, levels: {} };
for (const level of ['direct', 'roundtrip']) {
  const byClass = Object.fromEntries(ORDER.map((c) => [c, { count: 0, fail: 0, partial: 0, by_aspect: {}, items: [] }]));
  for (const r of rows) {
    for (const [aspect, lv] of Object.entries(r.aspects)) {
      const v = lv[level];
      if (!v?.evaluated || !['FAIL', 'PARTIAL'].includes(v.status)) continue;
      const s = subj.get(r.id);
      const { cls, why } = classify(r.family, aspect, v, s);
      const b = byClass[cls];
      b.count++; if (v.status === 'FAIL') b.fail++; else b.partial++;
      const key = `${r.family}.${aspect}`;
      b.by_aspect[key] = (b.by_aspect[key] || 0) + 1;
      b.items.push({ id: r.id, status: v.status, aspect: key, why, what: what(s), where: where(s), evidence: brief(v) });
    }
  }
  out.levels[level] = byClass;
}
if (arg('json')) fs.writeFileSync(arg('json'), JSON.stringify(out, null, 1) + '\n');

const label = Object.fromEntries(table.classes.map((c) => [c.id, c]));
const md = [`# ${summary.world} — pertes classées par gravité (${summary.converter}, ${summary.direct_run}${summary.roundtrip_run ? ` + ${summary.roundtrip_run}` : ''})`, '',
  `Table de gravité : \`docs/reference/impact-classes.v1.json\` v${table.version} (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son \`changelog\`).`, ''];
for (const level of ['direct', 'roundtrip']) {
  md.push(`## ${level === 'direct' ? 'Conversion directe' : 'Aller-retour'}`, '', '| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |', '|---|--:|--:|---|');
  for (const c of ORDER) {
    const b = out.levels[level][c];
    md.push(`| **${label[c].label}** | ${b.count} | ${b.fail} | ${Object.entries(b.by_aspect).sort((a, z) => z[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(', ') || '—'} |`);
  }
  md.push('');
  for (const c of ORDER) {
    const b = out.levels[level][c];
    if (!b.items.length || c === ORDER[ORDER.length - 1]) continue;
    md.push(`### ${label[c].label} — ${b.count} (${level})`, '', label[c].meaning, '', '| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |', '|---|---|---|---|---|---|');
    for (const it of b.items.slice(0, MAX)) md.push(`| ${it.status} | ${it.what.replace(/\|/g, '/')} | ${it.where} | ${it.aspect} | ${it.why} | \`${it.evidence.replace(/\|/g, '/').replace(/`/g, "'")}\` |`);
    if (b.items.length > MAX) md.push(`| … | ${b.items.length - MAX} autres (liste complète dans le JSON) | | | | |`);
    md.push('');
  }
}
if (arg('md')) fs.writeFileSync(arg('md'), md.join('\n') + '\n');
for (const level of ['direct', 'roundtrip']) console.log(`${summary.world} ${level}: ${ORDER.map((c) => `${c} ${out.levels[level][c].count}`).join(' · ')}`);
