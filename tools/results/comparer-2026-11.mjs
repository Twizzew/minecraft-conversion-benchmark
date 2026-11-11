// MCCB 2026-11 — comparatif final : pertes classées (même script, même table de gravité, version enregistrée dans chaque cellule) et
// temps de conversion (labo prod-like, même conteneur limité ; UMT : sous Windows), convertisseur par convertisseur.
//   node tools/results/comparer-2026-11.mjs <sortie.md>        (depuis 02-mccb/)
import fs from 'node:fs';
import path from 'node:path';

const R = path.resolve('..');
// Racine des notations `04-notation-*` : MCCB-2026-11 par défaut ; MCCB_NOTATION_RACINE pour vérifier une répétition (09/11/2026).
const NR = process.env.MCCB_NOTATION_RACINE ? path.resolve(process.env.MCCB_NOTATION_RACINE) : R;
const CONV = [
  { nom: 'WorldSwitch avant correction (5e2e2d5)', notes: '04-notation-worldswitch-avant-table18', runs: '03-conversions-worldswitch', ws: true },
  { nom: 'WorldSwitch c25', notes: '04-notation-worldswitch-c25', runs: '03-conversions-worldswitch-c25', ws: true },
  { nom: 'WorldSwitch c26', notes: '04-notation-worldswitch-c26', runs: '03-conversions-worldswitch-c26', ws: true },
  // c27 (09/11/2026) : commandes J04 corrigées (faux joueurs « # » cités, clés de traduction, store success).
  { nom: 'WorldSwitch c27', notes: '04-notation-worldswitch-c27', runs: '03-conversions-worldswitch-c27', ws: true },
  // c28 (10/11/2026) : c27 + couleur de l'axolotl (Java 1 wild / 3 cyan ↔ Bedrock 1 cyan / 3 wild).
  { nom: 'WorldSwitch c28', notes: '04-notation-worldswitch-c28', runs: '03-conversions-worldswitch-c28', ws: true },
  // c29 (10/11/2026) : c28 + états de bloc Bedrock rendus au retour (âge du varech/des lianes, infiniburn, chaudron, purpur).
  { nom: 'WorldSwitch c29', notes: '04-notation-worldswitch-c29', runs: '03-conversions-worldswitch-c29', ws: true },
  // c30 (10/11/2026) : c29 + bébé hoglin (`Age`, pas `IsBaby`) + générateur de monstres (NBT d'entité rendu au retour).
  { nom: 'WorldSwitch c30', notes: '04-notation-worldswitch-c30', runs: '03-conversions-worldswitch-c30', ws: true },
  // c31 (10/11/2026) : c30 + états Java seuls (`\0JETATS`), zone de tick circulaire (carré, prouvé BDS 1.26.62.1), données Bedrock des créatures et des seaux, temps de guérison, identifiant du bonus d’apparition.
  { nom: 'WorldSwitch c31', notes: '04-notation-worldswitch-c31', runs: '03-conversions-worldswitch-c31', ws: true },
  // c32 (10/11/2026) : c31 + défauts Java 26.3 officiels, empreinte brute (champignon), générateur vide (prouvé BDS), verrou et block entities sans place Bedrock, composants d’objet (modèle, pot 26.3, baril), modificateurs d’effet (UUID du DataFixer).
  { nom: 'WorldSwitch c32', notes: '04-notation-worldswitch-c32', runs: '03-conversions-worldswitch-c32', ws: true },
  // c33 (10/11/2026) : c32 + abeilles d’un nid et auteur (xuid) d’un livre écrit rendus au retour.
  { nom: 'WorldSwitch maintenant (c33)', notes: '04-notation-worldswitch-c33', runs: '03-conversions-worldswitch-c33', ws: true },
  { nom: 'Chunker 1.21.0', notes: '04-notation-chunker-1.21.0', runs: '03-conversions-chunker-1.21.0' },
  { nom: 'je2be (core 8dfc4de)', notes: '04-notation-je2be-8dfc4de', runs: '03-conversions-je2be-8dfc4de' },
  // UMT : application Windows à fenêtres, payante, sans mode commande → convertie et chronométrée SOUS WINDOWS, pas au labo.
  { nom: 'UMT 1.5.10 (temps Windows)', notes: '04-notation-umt-1.5.10', runs: '03-conversions-umt-1.5.10', windows: true },
];
const MONDES = ['J01', 'J02', 'J03', 'J04', 'J05', 'B01', 'B02', 'B03', 'R01'];
const lire = (f) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return null; } };
const n = (x) => (x == null ? '—' : x.toLocaleString('fr-FR'));
// Révision 1.10 du registre (07/11/2026, étape 3) : R01 renoté pour TOUS les convertisseurs avec le
// registre dérivé (fixtures/derive-table110.mjs), dans `<notes>-table110/R01` ; utilisé dès qu'il existe.
// Table de gravité 1.10 (07/11/2026 : coffre double aux moitiés inversées = MINOR) : tri refait pour
// tous dans `<notes>-gravite110/<MONDE>` (retrier-gravite110.sh), prioritaire dès qu'il existe.
// Révision 1.11 (08/11/2026, lots 1 à 3 « détails » + table de gravité 1.11) : tous les mondes renotés
// dans `<notes>-r111/<MONDE>` (renoter-r111.sh).
// Révision 1.12 (audit du 09/11/2026 : erreurs de jugement corrigées, état et détails des échanges, table 1.12) :
// Révision 1.13 (rapport du 09/11/2026 : blocs A1-A3/B1, entités 1-10, entités en trop, table 1.13) : SEULE
// source lue (`<notes>-r113/<MONDE>`, renoter-r113.sh). Plus aucun repli silencieux sur une notation
// plus ancienne : une cellule absente reste vide et est signalée.
const notesDe = (c, m) => {
  for (const suf of ['-r113']) {
    const f = path.join(NR, `${c.notes}${suf}`, m, 'pertes-par-gravite.json');
    if (fs.existsSync(f)) return f;
  }
  return null;
};
const nR111 = CONV.reduce((a, c) => a + MONDES.filter((m) => fs.existsSync(path.join(NR, `${c.notes}-r113`, m, 'pertes-par-gravite.json'))).length, 0);
const g110 = CONV.filter((c) => fs.existsSync(path.join(R, `${c.notes}-table110`, 'R01', 'pertes-par-gravite.json'))).length;
// Monde vide : aucun bloc contrôlé retrouvé à l'aller (ex. je2be Java → Bedrock, 0 chunk) — signalé.
const vide = (c, m) => {
  const f = notesDe(c, m); if (!f) return false;
  const s = lire(path.join(path.dirname(f), 'summary.json'));
  const b = s?.summary?.find((x) => x.family === 'block' && x.aspect === 'identity' && x.level === 'direct');
  return !!b && b.counts.PASS === 0 && b.counts.FAIL > 0;
};
const cellule = (c, m, cote) => {
  const j = lire(notesDe(c, m));
  if (!j) return 'non noté';
  const L = j.levels[cote] || {};
  return `${n(L.CRITICAL?.count ?? 0)} · ${n(L.MAJOR?.count ?? 0)} · ${n(L.MINOR?.count ?? 0)}${vide(c, m) ? ' ⚠ monde vide' : ''}`;
};
const temps = (c) => {
  const t = lire(path.join(R, c.runs, 'temps-et-ressources.json')) || [];
  return Object.fromEntries(t.map((r) => [r.leg, c.ws ? { s: r.conv_s, pic: r.conv_peak_mib, st: r.status } : { s: r.s, pic: r.peak, st: r.status, umt: r.umt }]));
};
const f1 = (x) => (x == null || Number.isNaN(x) ? '—' : x.toFixed(1).replace('.', ','));
const nG = CONV.reduce((a, c) => a + MONDES.filter((m) => fs.existsSync(path.join(R, `${c.notes}-gravite110`, m, 'pertes-par-gravite.json'))).length, 0);
const tous = CONV.length * MONDES.length;
const md = ['# MCCB 2026-11 — comparatif final', '',
  nR111 === tous
    ? 'Même script de notation (02-mccb, **révision 1.13** : détails jugés à l’aller — enchantements, potions, contenus, motifs, couleurs, apparence des créatures, butin des coffres, générateurs, tessons, état et détails des échanges, effets, passagers, propriétaire, essence des bateaux, objets au sol, créatures en trop —, table de gravité 1.13), mêmes sources, même liste d’objets contrôlés pour tous — dossiers `04-notation-<convertisseur>-r113/`.'
    : nR111 ? `**Renotation 1.13 incomplète : ${nR111}/${tous}** — les cellules manquantes sont laissées vides ; le tableau n’est pas publiable.`
    : nG === tous ? 'Même script de notation (table de gravité 1.10), mêmes sources, même liste d’objets contrôlés pour tous — dossiers `04-notation-<convertisseur>-gravite110/`.'
    : `Tri par la table de gravité 1.10 en cours (${nG}/${tous}).`,
  'Cellule : **critiques · majeures · mineures** (transitoires et techniques dans les rapports par monde). « ⚠ monde vide » : aucun bloc contrôlé retrouvé à l’aller.',
  'Un monde n’est jamais additionné à un autre. Rapports détaillés : `04-notation-<convertisseur>-r113/<MONDE>/PERTES-PAR-GRAVITE.md`.',
  'R01 : registre révisé (1.10 : piles Bedrock au `Block` ancien non jugées ; 1.11 : détails ; 1.12 : échanges ; 1.13 : conditions d’échange séparées, créatures en trop), le même pour toutes les colonnes.', ''];
for (const [cote, titre] of [['direct', 'Conversion directe (aller)'], ['roundtrip', 'Aller-retour']]) {
  md.push(`## ${titre}`, '', `| Monde | ${CONV.map((c) => c.nom).join(' | ')} |`, `|---|${CONV.map(() => '---').join('|')}|`);
  for (const m of MONDES) md.push(`| ${m} | ${CONV.map((c) => cellule(c, m, cote)).join(' | ')} |`);
  md.push('');
}
md.push('## Temps de conversion (secondes) et pic mémoire (Mio)', '',
  'Labo Linux prod-like, un conteneur neuf par conversion, 4 CPU, 5 632 Mio sans swap, sans réseau, pour tous.',
  'WorldSwitch : durée du job dans le service de conversion déjà démarré. Chunker et je2be : durée du processus',
  '(démarrage de Java compris pour Chunker). Pic : `memory.peak` du cgroup ; « — » = conversion trop courte pour un relevé.',
  '**UMT : temps mesurés sous Windows, PAS au labo Linux** (application Windows à fenêtres sans mode commande, pilotée à',
  'l’écran sur le PC de l’utilisateur, 16 cœurs, 31 Go, sans limite). « ≤ X s » = heure système avant le clic → après le message',
  'de fin vu à l’écran, majorant qui inclut le délai du pilotage ; entre parenthèses, le temps affiché par UMT (m:ss). Pic non mesuré.',
  'Les temps d’UMT ne sont donc pas comparables à la seconde près avec ceux des autres colonnes.', '',
  `| Conversion | ${CONV.map((c) => c.nom).join(' | ')} |`, `|---|${CONV.map(() => '--:').join('|')}|`);
const T = CONV.map(temps);
for (const m of MONDES) for (const sens of ['aller', 'retour']) {
  const leg = `${m}_${sens}`;
  md.push(`| ${leg} | ${T.map((t, i) => (!t[leg] ? '—' : CONV[i].windows
    ? `≤ ${f1(t[leg].s)} s (UMT ${t[leg].umt ?? '?'}) · —`
    : `${f1(t[leg].s)} s · ${t[leg].pic ? `${f1(t[leg].pic)} Mio` : '—'}`)).join(' | ')} |`);
}
md.push('');
// Contenu EN TROP au retour (même édition que la source) : compté par le lecteur indépendant
// (tools/results/compter-2026-11.mjs), types dont il y a plus d’exemplaires qu’à la source. Non noté :
// un ajout n’est pas forcément une faute (lit Java qui reçoit son bloc-entité, entité en attente gardée).
// Audit du 09/11/2026 : section RETIRÉE du comparatif publié. `comptes-tous.json` vient d'un ancien comptage
// (compter-2026-11.mjs) : pas de colonne c26, et un SOLDE par catégorie (10 vaches en trop et 10 cochons perdus
// donnent « 0 »). À refaire avec un comptage par type, sans solde, sur les sorties r112, avant de la republier.
const C = process.env.MCCB_CONTENU_EN_TROP === 'oui' ? lire(path.join(R, '05-rapports', 'verification-2026-11', 'comptes-tous.json')) : null;
if (!C) md.push('_Contenu en trop après l’aller-retour : non publié (comptage à refaire, voir l’audit du 09/11/2026)._', '');
if (C) {
  // même ordre que CONV ; c26 n'a pas (encore) de comptes : « — »
  const NOMS = ['WS avant', 'WS c25', 'WS c26', 'WS c27', 'WS c28', 'WS c29', 'WS c30', 'WS c31', 'WS c32', 'WS c33', 'Chunker', 'je2be', 'UMT'];
  md.push('## Contenu en trop après l’aller-retour (compté, non noté)', '',
    'Solde, par catégorie, des blocs-entités et entités du monde revenu par rapport à la source (lecteur indépendant) ; entre parenthèses, les types en hausse.',
    'Les entités en attente dans des chunks pas finis de générer sont comptées à la source.', '',
    `| Monde | ${CONV.map((c) => c.nom).join(' | ')} |`, `|---|${CONV.map(() => '---').join('|')}|`);
  for (const m of MONDES) {
    if (!C[m]) continue;
    md.push(`| ${m} | ${NOMS.map((k) => {
      const e = C[m].conv[k]?.ecarts_retour; if (!e) return '—';
      // solde par catégorie : un type renommé (boat → oak_boat, zombie_pigman → zombified_piglin) s'annule
      const solde = (o) => Object.values(o).reduce((a, v) => a + v, 0);
      const parts = [['blocs-entités', e.be], ['entités', e.ent]].map(([nom, o]) => {
        const s = solde(o); if (s <= 0) return null;
        const top = Object.entries(o).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k2, v]) => `${k2} ${v}`).join(', ');
        return `${nom} +${n(s)} (${top})`;
      }).filter(Boolean);
      return parts.length ? parts.join(' ; ') : '0';
    }).join(' | ')} |`);
  }
  md.push('');
}
fs.writeFileSync(process.argv[2], md.join('\n'));
console.log(md.join('\n'));
