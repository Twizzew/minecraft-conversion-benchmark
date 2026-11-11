// Family "player": the host player's stored state (plus other stored players, round trip
// only). docs/fixture-rules.md §3.8
import { detailsDe, verdictDetailsTenus } from '../lib/details-objet.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { plain, snbt, get, parseNbt, withoutDerivedItemBlock } from '../lib/nbt.mjs';
import { javaItem, bedrockItem } from '../lib/facts.mjs';
import { equivalents } from '../lib/identity.mjs';
import { r, notEvaluated, PASS, PARTIAL, FAIL, NOT_APPLICABLE, REASON } from '../lib/status.mjs';
import { gameRead } from '../lib/nbt.mjs';
import { compareByPosition, expectedSlot, itemDiff } from '../lib/slots.mjs';

const BEDROCK_EYE = 1.62; // Bedrock stores the player's eye position, Java the feet
const JAVA_GM = { 0: 0, 1: 1, 2: 2, 3: 6 };
const BEDROCK_DIM = { 0: 'minecraft:overworld', 1: 'minecraft:the_nether', 2: 'minecraft:the_end' };

const UNSET = -2147483648; // Bedrock's "no spawn point" sentinel

// Rule 53: each stack keeps its stored position (`Slot`).
const items = (tag, key, reader) => { const l = get(tag, key); return l && l.type === 'list' ? (l.value.value || []).map((v) => { const it = reader({ type: 'compound', value: v }); return it && { ...it, slot: v.Slot?.value ?? null }; }).filter(Boolean) : []; };

// Audit 09/11/2026 (N1) : champ absent = valeur que le jeu lit à sa place (jar 26.3, désassemblé) —
// LivingEntity.readAdditionalSaveData `getFloatOr("Health", getMaxHealth())`, FoodData `getIntOr("foodLevel", 20)`,
// Player `getIntOr("XpLevel", 0)`. Vie maximale : base de `minecraft:max_health` s'il n'a aucun modificateur,
// 20 (attribut par défaut du joueur) s'il est absent ; avec modificateurs, inconnue (non jugée).
function vieMaxJava(p) {
  const a = (Array.isArray(p.attributes) ? p.attributes : []).find((x) => String(x?.id ?? '').replace(/^minecraft:/, '') === 'max_health');
  if (!a) return 20;
  return Array.isArray(a.modifiers) && a.modifiers.length ? undefined : Number(a.base ?? 20);
}
export function javaPlayerFacts(tag, key) {
  const p = plain(tag);
  if (p.Health === undefined) p.Health = vieMaxJava(p);
  if (p.foodLevel === undefined) p.foodLevel = 20;
  if (p.XpLevel === undefined) p.XpLevel = 0;
  const eq = get(tag, 'equipment');
  const armor = eq && eq.type === 'compound' ? Object.entries(eq.value).map(([slot, v]) => ({ slot, item: javaItem(v) })).filter((x) => x.item) : [];
  return {
    key, pos: (p.Pos || []).map(Number), dim: p.Dimension, game_mode: p.playerGameType, health: p.Health !== undefined ? Number(p.Health) : undefined,
    food: p.foodLevel, xp_level: p.XpLevel, inventory: items(tag, 'Inventory', javaItem), ender: items(tag, 'EnderItems', javaItem), armor,
    // Java stores ONE position: the respawn BLOCK (bed head, anchor).
    spawn: p.respawn?.pos ? p.respawn.pos.map(Number) : undefined, spawn_block: p.respawn?.pos ? p.respawn.pos.map(Number) : undefined, snbt: snbt(tag),
  };
}
function bedrockPlayerFacts(tag, key) {
  const p = plain(tag);
  const attr = (n) => (p.Attributes || []).find((a) => a.Name === n);
  const armor = [];
  const names = ['head', 'chest', 'legs', 'feet', 'body'];
  (get(tag, 'Armor')?.value?.value || []).forEach((v, i) => { const it = bedrockItem({ type: 'compound', value: v }); if (it) armor.push({ slot: names[i], item: it }); });
  (get(tag, 'Offhand')?.value?.value || []).forEach((v) => { const it = bedrockItem({ type: 'compound', value: v }); if (it) armor.push({ slot: 'offhand', item: it }); });
  const pos = (p.Pos || []).map(Number);
  return {
    key, pos: pos.length ? [pos[0], pos[1] - BEDROCK_EYE, pos[2]] : [], dim: BEDROCK_DIM[p.DimensionId] ?? `dim${p.DimensionId}`, game_mode: p.PlayerGameMode,
    health: attr('minecraft:health') ? Number(attr('minecraft:health').Current) : undefined, food: attr('minecraft:player.hunger') ? Number(attr('minecraft:player.hunger').Current) : undefined,
    xp_level: p.PlayerLevel, inventory: items(tag, 'Inventory', bedrockItem), ender: items(tag, 'EnderChestInventory', bedrockItem), armor,
    // Bedrock stores TWO: where the player reappears (SpawnX/Y/Z) and the respawn BLOCK
    // (SpawnBlockPosition*), the one that corresponds to Java's respawn.pos.
    spawn: p.SpawnX !== undefined && p.SpawnX !== UNSET ? [p.SpawnX, p.SpawnY, p.SpawnZ].map(Number) : undefined,
    spawn_block: p.SpawnBlockPositionX !== undefined && p.SpawnBlockPositionX !== UNSET ? [p.SpawnBlockPositionX, p.SpawnBlockPositionY, p.SpawnBlockPositionZ].map(Number) : undefined, snbt: snbt(tag),
  };
}

async function players(edition, w) {
  const out = [];
  if (edition === 'java') {
    const L = plain(w.level) || {};
    const host = Array.isArray(L.singleplayer_uuid) ? L.singleplayer_uuid.map((x) => (x >>> 0).toString(16).padStart(8, '0')).join('').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5') : null;
    const files = w.playerFiles();
    for (const f of files) {
      const tag = await parseNbt(fs.readFileSync(f.file));
      out.push({ ...javaPlayerFacts(tag, f.uuid), host: f.uuid === host || files.length === 1 });
    }
    if (L.Player && !out.some((x) => x.host)) out.push({ ...javaPlayerFacts(get(w.level, 'Player'), 'level.dat'), host: true });
  } else {
    for (const [k] of w.named) {
      if (k !== '~local_player' && !k.startsWith('player_server_')) continue;
      const t = w.namedNbt(k)?.[0];
      if (!t) continue;
      const f = bedrockPlayerFacts(t, k);
      // PlayerGameMode 5 = "the world's default game mode" (level.dat GameType).
      if (Number(f.game_mode) === 5) f.game_mode_effective = plain(w.level)?.GameType;
      out.push({ ...f, host: k === '~local_player' });
    }
  }
  return out;
}

export async function enumerate(ctx) {
  const ps = await players(ctx.source.edition, ctx.source.world);
  const out = [];
  for (const p of ps.sort((a, b) => Number(b.host) - Number(a.host) || String(a.key).localeCompare(String(b.key)))) {
    const dx = p.host ? null : 'NE:non-host-player-identity-not-mappable';
    const aspects = {
      position: { direct: dx || 'NEAR', roundtrip: 'EQUAL' }, dimension: { direct: dx || 'EQUAL', roundtrip: 'EQUAL' }, game_mode: { direct: dx || 'EQUAL', roundtrip: 'EQUAL' },
    };
    if (p.health !== undefined) aspects.health = { direct: dx || 'NEAR', roundtrip: 'EQUAL' };
    if (p.food !== undefined) aspects.food = { direct: dx || 'EQUAL', roundtrip: 'EQUAL' };
    if (p.xp_level !== undefined) aspects.xp_level = { direct: dx || 'EQUAL', roundtrip: 'EQUAL' };
    if (p.inventory.length) aspects.inventory = { direct: dx || 'EQUIV_MULTISET', roundtrip: 'EQUAL' };
    if (p.ender.length) aspects.ender_chest = { direct: dx || 'EQUIV_MULTISET', roundtrip: 'EQUAL' };
    if (p.armor.length) aspects.armor = { direct: dx || 'EQUIV_MULTISET', roundtrip: 'EQUAL' };
    // Lot 1 (08/11/2026) : détails des objets du joueur (enchantements, décorations d'armure, potions…), à l'aller.
    if (aDesDetailsJoueur(ctx.source.edition, p)) aspects.details = { direct: dx || 'DETAIL', roundtrip: `NE:${RETOUR_DETAILS_JOUEUR}` };
    if (p.spawn) aspects.spawn_point = { direct: dx || 'EQUAL_XZ', roundtrip: 'EQUAL' };
    // Rule 53: the position is recorded (inventory / ender chest: `Slot`; armour: slot name).
    const brief = (l) => l.map((x) => ({ slot: x.slot ?? null, id: (x.item || x).id, count: (x.item || x).count, sem: (x.item || x).snbt, semx: (x.item || x).semantic }));
    out.push({ family: 'player', locator: { key: p.key, host: p.host }, expected: { ...p, inventory: brief(p.inventory), ender: brief(p.ender), armor: brief(p.armor), snbt: undefined }, aspects });
  }
  return out;
}

export async function prepare(ctx) {
  for (const level of ['direct', 'roundtrip']) { const v = ctx[level]; if (v?.world) v._players = await players(v.edition, v.world); }
}

// Rule 47 (MCCB v1.3, defect F10 found after the v1.2 freeze): player items compared as the
// game reads them — rule 54 (v1.3 closure, lib/nbt.mjs gameRead: typed data, only field-specific
// demonstrated defaults; `Block.version` ignored), like the other families.
// Rule 53 (v1.3 closure): compared POSITION BY POSITION — inventory / ender chest by `Slot`
// (same numbering in both editions: hotbar 0–8, then 9–35; ender chest 0–26), armour and
// offhand by slot name. A stack in another position is not the same state.
const sameItem = (same, srcEd, e) => {
  if (same) { const root = `${srcEd}-item`; const ez = gameRead(e.sem, { root }); const eb = srcEd === 'bedrock' ? withoutDerivedItemBlock(e.sem) : null;
    return (g) => g.snbt === e.sem || gameRead(g.snbt, { root }) === ez || (eb !== null && withoutDerivedItemBlock(g.snbt) === eb); }
  const targets = equivalents('item', srcEd, e.id).targets || [];
  return (g) => targets.includes(g.id) && g.count === e.count;
};
// Round trip (EQUAL): the inventory must come back with the same stacks and nothing else
// (rule 57: a stack the source did not hold is not the same inventory).
function positional(exp, got, same, srcEd, armor) {
  // armour entries of the frozen v1.3 fixtures carry no slot name: position unknown.
  const key = (e) => (armor ? (e.slot ?? undefined) : expectedSlot(e));
  const obs = got.map((x) => (x.item ? { slot: x.slot, item: x.item } : { slot: x.slot, item: x }));
  const diff = same ? (e, g) => itemDiff(e.semx, g.semantic ?? g.semx, { dropBlock: srcEd === 'bedrock' }) : null;
  const m = compareByPosition(exp, obs, key, (e, g) => sameItem(same, srcEd, e)(g), { exact: same, diff });
  return { ...m, hit: m.matched };
}

export const RETOUR_DETAILS_JOUEUR = 'roundtrip-judged-by-inventory-armor-ender';
const objetsDe = (l) => (l || []).map((x) => x.item || x);
export function aDesDetailsJoueur(ed, p) {
  return [...objetsDe(p.inventory), ...objetsDe(p.ender), ...objetsDe(p.armor)].some((it) => { let x; try { x = JSON.parse(it.semantic ?? it.semx); } catch { return false; } return Object.keys(detailsDe(ed, x)).length > 0; });
}
const tenusJ = (l) => (l || []).map((x) => ({ slot: x.slot, id: (x.item || x).id, semantic: (x.item || x).semantic }));

export async function evaluate(subject, ctx) {
  const res = {};
  const e = subject.expected;
  for (const level of ['direct', 'roundtrip']) {
    const v = ctx[level];
    const same = level === 'roundtrip';
    const target = v?._players ? (subject.locator.host ? v._players.find((p) => p.host) : v._players.find((p) => p.key === subject.locator.key)) : null;
    for (const [aspect, spec] of Object.entries(subject.aspects)) {
      res[aspect] ||= {};
      const code = spec[level];
      let out;
      if (!v) out = notEvaluated(REASON.NO_ROUNDTRIP);
      else if (!v.world) out = r(FAIL, 'player.world-opens', { observed: REASON.WORLD_DOES_NOT_OPEN });
      else if (code.startsWith('NE:')) out = notEvaluated(code.slice(3));
      else if (code.startsWith('NA:')) out = r(NOT_APPLICABLE, `player.${aspect}.${code.slice(3)}`);
      else if (!target) out = r(FAIL, `player.${aspect}.${level}`, { observed: 'no player' });
      else {
        const t = target;
        switch (aspect) {
          case 'position': {
            const d = [0, 1, 2].map((i) => +((t.pos[i] ?? NaN) - e.pos[i]).toFixed(3));
            const ok = same ? d.every((x) => Math.abs(x) <= 0.01) : Math.abs(d[0]) <= 0.5 && Math.abs(d[2]) <= 0.5 && Math.abs(d[1]) <= 1.0;
            out = r(ok ? PASS : FAIL, `player.position.${level}`, ok ? {} : { delta: d }); break;
          }
          case 'dimension': out = t.dim === e.dim ? r(PASS, `player.dimension.${level}`) : r(FAIL, `player.dimension.${level}`, { observed: t.dim }); break;
          case 'game_mode': {
            // Direct: the mode the player actually plays in (Bedrock 5 = the world default).
            const src = same ? e.game_mode : (e.game_mode_effective ?? e.game_mode);
            const got = same ? t.game_mode : (t.game_mode_effective ?? t.game_mode);
            const want = same ? src : ctx.sourceEdition === 'java' ? JAVA_GM[src] : Object.keys(JAVA_GM).find((k) => JAVA_GM[k] === Number(src));
            out = String(got) === String(want) ? r(PASS, `player.game_mode.${level}`, !same && e.game_mode_effective !== undefined ? { note: 'source mode 5 = world default' } : {}) : r(FAIL, `player.game_mode.${level}`, { observed: t.game_mode,
              // Table 1.6 : source en mode 5 (« celui du monde ») et retour écrit en clair : le même
              // mode joué. Java n'a pas de valeur « celui du monde ».
              ...(same && Number(e.game_mode) === 5 && String(e.game_mode_effective) === String(t.game_mode) ? { technical_only: true, note: 'source mode 5 = world default' } : {}) });
            break;
          }
          // Audit 09/11/2026 (N1) : valeur absente côté Bedrock (attribut ou `PlayerLevel` non écrit) — la
          // valeur que BDS relit à sa place n'est pas prouvée hors jeu : non jugée, ni perdue ni conservée.
          case 'health': case 'food': case 'xp_level': {
            if (t[aspect] === undefined && v.edition === 'bedrock') { out = notEvaluated('target-stores-no-value', { observed: null }); break; }
            const ok = aspect === 'health' ? t.health !== undefined && Math.abs(t.health - e.health) <= (same ? 0.001 : 0.5) : Number(t[aspect]) === Number(e[aspect]);
            out = ok ? r(PASS, `player.${aspect}.${level}`) : r(FAIL, `player.${aspect}.${level}`, { observed: t[aspect] ?? null });
            break;
          }
          case 'inventory': case 'ender_chest': case 'armor': {
            const src = aspect === 'inventory' ? e.inventory : aspect === 'ender_chest' ? e.ender : e.armor;
            const got = aspect === 'inventory' ? t.inventory : aspect === 'ender_chest' ? t.ender : t.armor;
            const m = positional(src, got, same, ctx.sourceEdition, aspect === 'armor');
            if (m.status === null) { out = notEvaluated(m.reason, { matched_without_position: m.unverified, expected: m.of }); break; }
            out = r(m.status, `player.${aspect}.${level}`, m.status === PASS ? {} : { matched: m.hit, expected: m.of, ...(m.unverified ? { matched_without_position: m.unverified } : {}), wrong: m.wrong.slice(0, 12), ...(m.extra.length ? { extra: m.extra.slice(0, 12), extra_count: m.extra.length } : {}), ...(m.technical_only ? { technical_only: true } : {}) }); break;
          }
          case 'details': {
            const parts = [[e.inventory, t.inventory], [e.ender, t.ender], [e.armor, t.armor]].map(([a, b]) => verdictDetailsTenus(ctx.sourceEdition, a || [], tenusJ(b)));
            const compares = parts.reduce((x, y) => x + y.compares, 0), ecarts = parts.flatMap((x) => x.ecarts);
            if (!compares) { out = notEvaluated('held-items-with-details-not-found'); break; }
            out = !ecarts.length ? r(PASS, `player.details.${level}`, { compares })
              : r(ecarts.length >= compares ? FAIL : PARTIAL, `player.details.${level}`, { compares, ecarts: ecarts.slice(0, 12), ecarts_count: ecarts.length });
            break;
          }
          case 'spawn_point': {
            const ok = t.spawn && (same ? JSON.stringify(t.spawn) === JSON.stringify(e.spawn) : t.spawn[0] === e.spawn[0] && t.spawn[2] === e.spawn[2]);
            // Direct: the respawn BLOCK is the one position both editions store with the same
            // meaning; the same block (x, y, z) is the same spawn point.
            const sameBlock = !same && e.spawn_block && t.spawn_block && JSON.stringify(t.spawn_block) === JSON.stringify(e.spawn_block);
            const blockOk = !same || JSON.stringify(t.spawn_block ?? null) === JSON.stringify(e.spawn_block ?? null);
            if (ok && blockOk) { out = r(PASS, `player.spawn_point.${level}`); break; }
            if (sameBlock) { out = r(PASS, 'player.spawn_point.direct.same-respawn-block', { observed: t.spawn, observed_block: t.spawn_block }); break; }
            // Table 1.6 : même bloc de réapparition (lit, ancre) ; seule la case où le joueur se tient
            // à côté diffère : Java ne la stocke pas (une seule position, `respawn.pos`).
            out = r(FAIL, `player.spawn_point.${level}`, { observed: t.spawn ?? null, observed_block: t.spawn_block ?? null,
              ...(same && e.spawn_block && JSON.stringify(t.spawn_block ?? null) === JSON.stringify(e.spawn_block) ? { minor_only: true, note: 'same respawn block' } : {}) }); break;
          }
          default: out = notEvaluated('unknown-aspect');
        }
      }
      res[aspect][level] = out;
    }
  }
  return res;
}
