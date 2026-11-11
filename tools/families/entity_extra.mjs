// Family "entity_extra" (révision 1.13, contrôle 8 du 09/11/2026) : créatures qui n'existent QUE dans la
// sortie. La famille `entity` part des entités de la source : une créature ajoutée par un convertisseur
// (doublon, objet ou monstre sorti de nulle part) n'y était jamais comptée.
// Un sujet par dimension. Est « en trop » une entité de la sortie (acteur chargé par le jeu) :
//   • appariée à AUCUN sujet `entity` (famille entity, même appariement) ;
//   • et sans AUCUNE entité de la source, de quelque type que ce soit, à moins du rayon d'appariement
//     (une entité changée de type est déjà jugée par `entity.identity` : pas de double compte ;
//     une entité dont l'équivalence n'est pas établie n'est pas comptée en trop) ;
//   • et au-delà du nombre d'entités source du même type restées SANS cible : une entité déplacée hors du
//     rayon (Chunker J02 : tableau revenu ailleurs) est déjà comptée perdue par `entity` — pas en plus ici.
// Exclusion documentée : Bedrock → Java, cadres (`item_frame`, `glow_item_frame`) — Bedrock les stocke
// comme BLOCS (`frame`), jugés par la famille block (CROSS) ; ils ne sont pas des créatures ajoutées.
import { r, notEvaluated, PASS, FAIL, REASON } from '../lib/status.mjs';
import { MATCH_RADIUS } from './entity.mjs';

const ORPHAN = 'actorprefix_unlisted';
const CADRES = new Set(['minecraft:item_frame', 'minecraft:glow_item_frame']);
export const VANILLA_DIMS = ['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end'];

/** Sujets : dimensions vanilla + toute dimension où la source a une entité. */
export function sujetsEntitesEnTrop(worldId, dimsSource) {
  const dims = [...new Set([...VANILLA_DIMS, ...dimsSource])].sort();
  return dims.map((dim) => ({
    id: `${worldId}/entity_extra/${dim}`, family: 'entity_extra', locator: { dim }, expected: { dim },
    aspects: { extra: { direct: 'NONE_ADDED', roundtrip: 'NONE_ADDED' } },
  }));
}

export async function enumerate(ctx) {
  const ents = await ctx.sourceView.entitiesIndex();
  return sujetsEntitesEnTrop(ctx.worldId, ents.map((e) => e.dim)).map(({ id, ...s }) => s);
}

export async function evaluate(subject, ctx) {
  const res = { extra: {} };
  const dim = subject.locator.dim;
  const sujets = (ctx._entitySubjects || []).filter((s) => s.locator?.dim === dim);
  for (const level of ['direct', 'roundtrip']) {
    const view = ctx[level];
    if (!view) { res.extra[level] = notEvaluated(REASON.NO_ROUNDTRIP); continue; }
    if (!view.world) { res.extra[level] = notEvaluated('world-does-not-open-judged-by-world-opens'); continue; }
    const R = MATCH_RADIUS[level];
    const cellule = (x, z) => `${Math.floor(x / R)}|${Math.floor(z / R)}`;
    const grille = new Map();
    for (const s of sujets) { const p = s.locator.pos; if (!p) continue; const k = cellule(p[0], p[2]); if (!grille.has(k)) grille.set(k, []); grille.get(k).push(p); }
    const proche = (p) => {
      const gx = Math.floor(p[0] / R), gz = Math.floor(p[2] / R);
      for (let ax = gx - 1; ax <= gx + 1; ax++) for (let az = gz - 1; az <= gz + 1; az++) {
        for (const q of grille.get(`${ax}|${az}`) || []) if (Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) <= R) return true;
      }
      return false;
    };
    const apparies = new Set([...(ctx._entityMatch?.[level]?.values() || [])]);
    const cibles = (await view.entitiesIndex()).filter((t) => t.origin !== ORPHAN && t.dim === dim);
    const candidats = cibles.filter((t) => !apparies.has(t) && Array.isArray(t.facts.pos) && t.facts.pos.length === 3
      && !(ctx.sourceEdition === 'bedrock' && view.edition === 'java' && CADRES.has(t.facts.id)) && !proche(t.facts.pos));
    // Sujets source sans cible, par type attendu (retour : même identifiant ; aller : équivalents).
    const sansCible = sujets.filter((s) => !ctx._entityMatch?.[level]?.has(s.id)).map((s) => (level === 'roundtrip' ? [s.expected?.id] : s.expected?.targets || []));
    const enTrop = [];
    for (const t of candidats) {
      const i = sansCible.findIndex((ids) => ids.includes(t.facts.id));
      if (i >= 0) sansCible.splice(i, 1); else enTrop.push(t);
    }
    if (!enTrop.length) { res.extra[level] = r(PASS, `entity_extra.extra.${level}`, { target_entities: cibles.length }); continue; }
    const parType = {};
    for (const t of enTrop) parType[t.facts.id] = (parType[t.facts.id] || 0) + 1;
    res.extra[level] = r(FAIL, `entity_extra.extra.${level}`, {
      extra_count: enTrop.length, by_type: parType,
      sample: enTrop.slice(0, 12).map((t) => `${t.facts.id}@${t.facts.pos.map((x) => Math.round(x * 10) / 10).join(' ')}`),
    });
  }
  return res;
}
