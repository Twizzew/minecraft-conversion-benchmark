// Family "entity": mobs, vehicles, armor stands, projectiles, items on the ground…
// docs/fixture-rules.md §3.4
import { equivalents } from '../lib/identity.mjs';
import { r, notEvaluated, PASS, PARTIAL, FAIL, NOT_APPLICABLE, REASON } from '../lib/status.mjs';
import { readBlock } from './block.mjs';
import { keyClasses } from './block_entity.mjs';
import { isLegacyBedrockItem, LEGACY_ITEM } from './item_stack.mjs';
import { javaRegistry } from '../lib/registry.mjs';
import { zeroFree, zeroFreeMap } from '../lib/nbt.mjs';
import { compareByPosition, expectedSlot, positionalInventory, sameNumberingAcrossEditions } from '../lib/slots.mjs';

export const MATCH_RADIUS = { direct: 2.0, roundtrip: 0.75 };
export const POSITION_TOLERANCE = { direct: { horizontal: 0.5, vertical: 1.0 }, roundtrip: { horizontal: 0.01, vertical: 0.01 } };
export const HEALTH_TOLERANCE = { direct: 0.5, roundtrip: 0.001 };
// Java species that store a tamed state (Owner/Tame): the subclasses of TamableAnimal and
// AbstractHorse in the 26.3 jar (superclass chains read from the class files). A Bedrock
// "tamed" actor of any other species (e.g. happy_ghast) has nothing to map to in Java.
export const JAVA_TAMEABLE = new Set(['minecraft:wolf', 'minecraft:cat', 'minecraft:parrot', 'minecraft:nautilus', 'minecraft:zombie_nautilus',
  'minecraft:horse', 'minecraft:donkey', 'minecraft:mule', 'minecraft:llama', 'minecraft:trader_llama', 'minecraft:skeleton_horse', 'minecraft:zombie_horse',
  'minecraft:camel', 'minecraft:camel_husk']);

const ORPHAN = 'actorprefix_unlisted';
const ORPHAN_REASON = 'bedrock-actor-not-referenced-by-any-chunk';
const itemBrief = (it) => ({ id: it.id, count: it.count });
function brief(e) {
  const f = e.facts;
  return {
    id: f.id, uuid: f.uuid, pos: f.pos, custom_name: f.custom_name, tags: f.tags?.length ? f.tags : undefined, baby: f.baby, health: f.health,
    tamed: f.tamed, equipment: f.equipment.map((x) => ({ slot: x.slot, ...itemBrief(x.item), sem: x.item.snbt, semx: x.item.semantic })), inventory: f.inventory.map((x) => ({ slot: x.slot ?? null, ...itemBrief(x), sem: x.snbt, semx: x.semantic })),
    offers: f.offers, trade_tier: f.trade_tier, data: f.data, sem: f.sem,
  };
}

export async function enumerate(ctx) {
  const ents = await ctx.sourceView.entitiesIndex();
  const ed = ctx.source.edition;
  const subjects = [];
  const sorted = ents.slice().sort((a, b) => a.dim.localeCompare(b.dim) || String(a.facts.id).localeCompare(String(b.facts.id)) || a.facts.pos[0] - b.facts.pos[0] || a.facts.pos[2] - b.facts.pos[2] || a.facts.pos[1] - b.facts.pos[1]);
  for (const e of sorted) {
    const f = e.facts;
    if (!f.id) continue;
    const eq = equivalents('entity', ed, f.id);
    const na = eq.status === 'edition_only';
    const cross = eq.status === 'cross_family';
    const dx = (spec) => (na ? 'NA:edition-only' : cross ? `NE:cross-family-not-automated` : eq.status === 'unknown' ? `NE:${REASON.NO_IDENTITY_REFERENCE}` : spec);
    const aspects = {
      identity: { direct: na ? 'NA:edition-only' : cross ? `CROSS:${eq.targets[0]}` : eq.status === 'unknown' ? `NE:${REASON.NO_IDENTITY_REFERENCE}` : 'EQUIV', roundtrip: 'EQUAL' },
      position: { direct: dx('NEAR'), roundtrip: 'EXACT' },
    };
    if (f.custom_name !== undefined) aspects.custom_name = { direct: dx('TEXT_EQUAL'), roundtrip: 'EQUAL' };
    if (f.baby === true) aspects.baby = { direct: dx('EQUAL'), roundtrip: 'EQUAL' };
    if (f.health !== undefined && !Number.isNaN(f.health)) aspects.health = { direct: dx('NEAR'), roundtrip: 'NEAR' };
    if (f.tamed === true) {
      const javaCanTame = ed === 'java' || (eq.targets || []).some((t) => JAVA_TAMEABLE.has(t));
      aspects.tamed = { direct: javaCanTame ? dx('EQUAL') : 'NA:java-species-stores-no-tamed-state', roundtrip: 'EQUAL' };
    }
    if (f.equipment.length) aspects.equipment = { direct: dx('EQUIV_SET'), roundtrip: 'EQUAL' };
    if (f.inventory.length) aspects.inventory = { direct: dx('EQUIV_MULTISET'), roundtrip: 'EQUAL' };
    if (f.offers?.length) aspects.trades = { direct: dx('EQUIV_OFFERS'), roundtrip: 'EQUAL' };
    aspects.data = { direct: `NE:${REASON.NO_RULE}`, roundtrip: 'EQUAL_DATA' };
    // A Bedrock actor record that no chunk's actor list (digp) references is not loaded by
    // the game: it is not in the world as played. Kept as a subject, never judged.
    if (e.origin === ORPHAN) for (const a of Object.values(aspects)) { a.direct = `NE:${ORPHAN_REASON}`; a.roundtrip = `NE:${ORPHAN_REASON}`; }
    subjects.push({ family: 'entity', locator: { dim: e.dim, pos: f.pos, origin: e.origin }, expected: { ...brief(e), targets: eq.targets }, aspects });
  }
  return subjects;
}

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/** Deterministic one-to-one matching of subjects to target entities. */
function match(subjects, targets, level, sourceEdition) {
  const same = level === 'roundtrip';
  const okType = (s, t) => (same ? t.facts.id === s.expected.id : (s.expected.targets || []).includes(t.facts.id));
  const okDim = (s, t) => t.dim === s.locator.dim;
  const assigned = new Map();
  const used = new Set();
  // Candidate lookups go through indexes (same candidate sets as scanning every target:
  // equal keys, or the grid cells that can hold a target within the radius).
  const indexBy = (keyOf) => { const m = new Map(); targets.forEach((t, i) => { const k = keyOf(t); if (!k) return; if (!m.has(k)) m.set(k, []); m.get(k).push(i); }); return m; };
  // 1. identity keys that survive: same UUID (round trip only), same custom name
  const passes = [];
  if (same) passes.push({ index: indexBy((t) => t.facts.uuid), key: (s) => s.expected.uuid });
  passes.push({ index: indexBy((t) => t.facts.custom_name), key: (s) => s.expected.custom_name });
  for (const { index, key } of passes) {
    const pairs = [];
    for (const s of subjects) {
      if (assigned.has(s.id) || !s.expected.targets && !same) continue;
      const k = key(s);
      if (!k) continue;
      for (const i of index.get(k) || []) { const t = targets[i]; if (!used.has(i) && okDim(s, t) && okType(s, t)) pairs.push([dist(s.locator.pos, t.facts.pos), s.id, i]); }
    }
    pairs.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]) || a[2] - b[2]);
    for (const [, sid, i] of pairs) if (!assigned.has(sid) && !used.has(i)) { assigned.set(sid, i); used.add(i); }
  }
  // 2. nearest free entity of an equivalent type within the radius
  const R = MATCH_RADIUS[level];
  const cell = (dim, x, z) => `${dim}|${Math.floor(x / R)}|${Math.floor(z / R)}`;
  const grid = indexBy((t) => cell(t.dim, t.facts.pos[0], t.facts.pos[2]));
  const pairs = [];
  for (const s of subjects) {
    if (assigned.has(s.id)) continue;
    const [sx, , sz] = s.locator.pos;
    const gx = Math.floor(sx / R), gz = Math.floor(sz / R);
    for (let ax = gx - 1; ax <= gx + 1; ax++) for (let az = gz - 1; az <= gz + 1; az++) {
      for (const i of grid.get(`${s.locator.dim}|${ax}|${az}`) || []) {
        const t = targets[i];
        if (used.has(i) || !okDim(s, t) || !okType(s, t)) continue;
        const d = dist(s.locator.pos, t.facts.pos);
        if (d <= R) pairs.push([d, s.id, i]);
      }
    }
  }
  pairs.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]) || a[2] - b[2]);
  for (const [, sid, i] of pairs) if (!assigned.has(sid) && !used.has(i)) { assigned.set(sid, i); used.add(i); }
  return new Map([...assigned].map(([sid, i]) => [sid, targets[i]]));
}

export async function prepare(ctx, subjects) {
  ctx._entityMatch = {};
  for (const level of ['direct', 'roundtrip']) {
    const view = ctx[level];
    if (!view?.world) continue;
    // Orphan actor records of a Bedrock target are not loaded by the game either.
    const targets = (await view.entitiesIndex()).filter((t) => t.origin !== ORPHAN);
    ctx._entityMatch[level] = match(subjects.filter((s) => s.expected.targets || level === 'roundtrip'), targets, level, ctx.sourceEdition);
  }
}

// Rule 53 (v1.3 closure): held items are compared POSITION BY POSITION — equipment by slot
// name (both editions' readers name the slots: head … feet, body, mainhand, offhand, saddle),
// inventories of containers a player opens by `Slot` (lib/slots.mjs). Inventories the player
// never sees, stored without positions by Java (villager, piglin…), stay unordered.
function heldCompare(aspect, entityId, sourceEdition, exp, got, same) {
  if (!exp.length) return null;
  const match = (e, g) => (same ? (g.sem === e.sem || (!!g.semx && zeroFree(g.semx) === zeroFree(e.semx))) : (e.targets || [e.id]).includes(g.id) && g.count === e.count);
  if (aspect === 'equipment') return compareByPosition(exp, got, (e) => e.slot, match);
  if (!positionalInventory(entityId)) {
    const pool = got.slice();
    let hit = 0;
    for (const e of exp) { const k = pool.findIndex((g) => match(e, g.item)); if (k >= 0) { hit++; pool.splice(k, 1); } }
    return { status: hit === exp.length ? PASS : hit ? PARTIAL : FAIL, matched: hit, of: exp.length, wrong: [] };
  }
  const known = same || sameNumberingAcrossEditions(entityId);
  return compareByPosition(exp, got, (e) => (known ? expectedSlot(e) : null), match);
}

export async function evaluate(subject, ctx) {
  const res = {};
  const e = subject.expected;
  for (const level of ['direct', 'roundtrip']) {
    const view = ctx[level];
    for (const [aspect, spec] of Object.entries(subject.aspects)) {
      res[aspect] ||= {};
      const code = spec[level];
      let out;
      if (level === 'roundtrip' && !view) out = notEvaluated(REASON.NO_ROUNDTRIP);
      else if (!view.world) out = r(FAIL, `entity.${aspect}.world-opens`, { observed: REASON.WORLD_DOES_NOT_OPEN });
      else if (code.startsWith('NE:')) out = notEvaluated(code.slice(3));
      else if (code.startsWith('NA:')) out = r(NOT_APPLICABLE, `entity.${aspect}.${code.slice(3)}`);
      else if (code.startsWith('CROSS:')) {
        const want = code.slice(6).replace(/^block:/, '');
        const b = await readBlock(view.edition, view.world, { dim: subject.locator.dim, pos: e.pos.map(Math.floor) });
        out = b && b.name === want ? r(PASS, 'entity.identity.cross-family-block') : r(FAIL, 'entity.identity.cross-family-block', { observed: b?.name ?? 'chunk-missing' });
      } else {
        const t = ctx._entityMatch?.[level]?.get(subject.id);
        if (!t) out = r(FAIL, `entity.${aspect}.${level}`, { observed: 'no matching entity' });
        else {
          const g = t.facts;
          const same = level === 'roundtrip';
          switch (aspect) {
            case 'identity': out = r(PASS, `entity.identity.${level}`, same ? {} : { observed: g.id }); break;
            case 'position': {
              const tol = POSITION_TOLERANCE[level];
              const d = [0, 1, 2].map((i) => +(g.pos[i] - e.pos[i]).toFixed(4));
              const ok = Math.abs(d[0]) <= tol.horizontal && Math.abs(d[2]) <= tol.horizontal && Math.abs(d[1]) <= tol.vertical;
              out = r(ok ? PASS : FAIL, `entity.position.${level}`, ok && !same ? {} : { delta: d });
              break;
            }
            case 'custom_name': out = g.custom_name === e.custom_name ? r(PASS, `entity.custom_name.${level}`) : r(FAIL, `entity.custom_name.${level}`, { observed: g.custom_name ?? null }); break;
            case 'baby': out = g.baby === true ? r(PASS, `entity.baby.${level}`) : r(FAIL, `entity.baby.${level}`, { observed: g.baby ?? null }); break;
            case 'health':
              if (g.health === undefined) { out = notEvaluated('target-stores-no-health-value', { observed: null }); break; }
              out = Math.abs(g.health - e.health) <= HEALTH_TOLERANCE[level] ? r(PASS, `entity.health.${level}`) : r(FAIL, `entity.health.${level}`, { observed: g.health, ...(g.max_health !== undefined ? { observed_max: g.max_health } : {}) });
              break;
            case 'tamed': out = g.tamed === true ? r(PASS, `entity.tamed.${level}`) : r(FAIL, `entity.tamed.${level}`, { observed: g.tamed ?? null }); break;
            case 'equipment':
            case 'inventory': {
              // Rule 40: items under a legacy Bedrock name have no identity reference — left
              // out of the comparison; nothing left to compare = NOT_EVALUATED.
              const src = (aspect === 'equipment' ? e.equipment : e.inventory)
                .filter((x) => !(ctx.sourceEdition === 'bedrock' && isLegacyBedrockItem(x.id)));
              if (!src.length) { out = notEvaluated(LEGACY_ITEM); break; }
              const exp = src.map((x) => ({ ...x, targets: same ? null : equivalents('item', ctx.sourceEdition, x.id).targets }));
              let got = (aspect === 'equipment' ? g.equipment : g.inventory.map((x) => ({ slot: x.slot, item: x })))
                .map((x) => ({ slot: x.slot, item: { id: x.item.id, count: x.item.count, sem: x.item.snbt, semx: x.item.semantic } }));
              // Rule 41 (audit 2026-09-25): entities are not loaded by the game in MCCB (only
              // upgraded), so an item id the Java 26.3 registry does not know was counted as
              // present — the game DELETES it. It is removed before comparing, as the game does.
              if (view.edition === 'java') got = got.filter((x) => javaRegistry().items.has(x.item.id));
              const m = heldCompare(aspect, e.id, ctx.sourceEdition, exp, got, same);
              if (m.status === null) { out = notEvaluated(m.reason, { matched_without_position: m.unverified, expected: m.of }); break; }
              out = r(m.status, `entity.${aspect}.${level}`, m.status === PASS ? {} : { observed: got.slice(0, 12).map((x) => `${x.slot ?? '-'}:${x.item.id}x${x.item.count}`), ...(m.wrong?.length ? { wrong: m.wrong.slice(0, 12) } : {}) });
              break;
            }
            case 'trades': {
              const go = g.offers || [];
              const eqId = (a, b) => (same ? a === b : (a === undefined && b === undefined) || (equivalents('item', ctx.sourceEdition, a).targets || []).includes(b));
              // Direct: every source offer must exist (Bedrock also stores the offers of
              // locked higher tiers, so extra target offers are noted, not penalised).
              // Round trip: the offer list must come back identical, in order.
              const same4 = (o, x) => x && eqId(o.buy, x.buy) && eqId(o.sell, x.sell) && eqId(o.buyB, x.buyB) && o.buyCount === x.buyCount && o.sellCount === x.sellCount;
              let ok = 0;
              // A Bedrock source also stores locked higher-tier offers: in direct only the
              // unlocked ones (tier <= TradeTier) are expected in Java.
              const want = !same && ctx.sourceEdition === 'bedrock' && e.trade_tier !== undefined
                ? e.offers.filter((o) => o.tier === undefined || o.tier <= e.trade_tier) : e.offers;
              if (same) want.forEach((o, i) => { if (same4(o, go[i])) ok++; });
              else { const pool = go.slice(); for (const o of want) { const k = pool.findIndex((x) => same4(o, x)); if (k >= 0) { ok++; pool.splice(k, 1); } } }
              const st = ok === want.length && (!same || go.length === want.length) ? PASS : ok ? PARTIAL : FAIL;
              out = r(st, `entity.trades.${level}`, st === PASS ? {} : { matching_offers: ok, expected_offers: want.length, observed_offers: go.length });
              break;
            }
            case 'data': {
              const strict = [...new Set([...Object.keys(e.data), ...Object.keys(g.data)])].filter((k) => e.data[k] !== g.data[k]);
              if (!strict.length) { out = r(PASS, 'entity.data.roundtrip'); break; }
              // Rule 46: zero-valued keys read like absent ones (zeroFree).
              const es = zeroFreeMap(e.sem), gs = zeroFreeMap(g.sem);
              const keys = [...new Set([...Object.keys(es), ...Object.keys(gs)])].filter((k) => es[k] !== gs[k]).sort();
              out = keys.length ? r(PARTIAL, 'entity.data.roundtrip', { differing_keys: keys.slice(0, 25), differing_count: keys.length, ...keyClasses(keys, es, gs) }) : r(PASS, 'entity.data.roundtrip.semantic-equal');
              break;
            }
            default: out = notEvaluated('unknown-aspect');
          }
        }
      }
      res[aspect][level] = out;
    }
  }
  return res;
}
