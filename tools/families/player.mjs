// Family "player": the host player's stored state (plus other stored players, round trip
// only). docs/fixture-rules.md §3.8
import fs from 'node:fs';
import path from 'node:path';
import { plain, snbt, get, parseNbt } from '../lib/nbt.mjs';
import { javaItem, bedrockItem } from '../lib/facts.mjs';
import { equivalents } from '../lib/identity.mjs';
import { r, notEvaluated, PASS, PARTIAL, FAIL, NOT_APPLICABLE, REASON } from '../lib/status.mjs';
import { gameRead } from '../lib/nbt.mjs';
import { compareByPosition, expectedSlot } from '../lib/slots.mjs';

const BEDROCK_EYE = 1.62; // Bedrock stores the player's eye position, Java the feet
const JAVA_GM = { 0: 0, 1: 1, 2: 2, 3: 6 };
const BEDROCK_DIM = { 0: 'minecraft:overworld', 1: 'minecraft:the_nether', 2: 'minecraft:the_end' };

const UNSET = -2147483648; // Bedrock's "no spawn point" sentinel

// Rule 53: each stack keeps its stored position (`Slot`).
const items = (tag, key, reader) => { const l = get(tag, key); return l && l.type === 'list' ? (l.value.value || []).map((v) => { const it = reader({ type: 'compound', value: v }); return it && { ...it, slot: v.Slot?.value ?? null }; }).filter(Boolean) : []; };

function javaPlayerFacts(tag, key) {
  const p = plain(tag);
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
  if (same) { const root = `${srcEd}-item`; const ez = gameRead(e.sem, { root }); return (g) => g.snbt === e.sem || gameRead(g.snbt, { root }) === ez; }
  const targets = equivalents('item', srcEd, e.id).targets || [];
  return (g) => targets.includes(g.id) && g.count === e.count;
};
function positional(exp, got, same, srcEd, armor) {
  // armour entries of the frozen v1.3 fixtures carry no slot name: position unknown.
  const key = (e) => (armor ? (e.slot ?? undefined) : expectedSlot(e));
  const obs = got.map((x) => (x.item ? { slot: x.slot, item: x.item } : { slot: x.slot, item: x }));
  const m = compareByPosition(exp, obs, key, (e, g) => sameItem(same, srcEd, e)(g));
  return { ...m, hit: m.matched };
}

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
            out = String(got) === String(want) ? r(PASS, `player.game_mode.${level}`, !same && e.game_mode_effective !== undefined ? { note: 'source mode 5 = world default' } : {}) : r(FAIL, `player.game_mode.${level}`, { observed: t.game_mode });
            break;
          }
          case 'health': out = t.health !== undefined && Math.abs(t.health - e.health) <= (same ? 0.001 : 0.5) ? r(PASS, `player.health.${level}`) : r(FAIL, `player.health.${level}`, { observed: t.health ?? null }); break;
          case 'food': out = Number(t.food) === Number(e.food) ? r(PASS, `player.food.${level}`) : r(FAIL, `player.food.${level}`, { observed: t.food ?? null }); break;
          case 'xp_level': out = Number(t.xp_level) === Number(e.xp_level) ? r(PASS, `player.xp_level.${level}`) : r(FAIL, `player.xp_level.${level}`, { observed: t.xp_level ?? null }); break;
          case 'inventory': case 'ender_chest': case 'armor': {
            const src = aspect === 'inventory' ? e.inventory : aspect === 'ender_chest' ? e.ender : e.armor;
            const got = aspect === 'inventory' ? t.inventory : aspect === 'ender_chest' ? t.ender : t.armor;
            const m = positional(src, got, same, ctx.sourceEdition, aspect === 'armor');
            if (m.status === null) { out = notEvaluated(m.reason, { matched_without_position: m.unverified, expected: m.of }); break; }
            out = r(m.status, `player.${aspect}.${level}`, m.status === PASS ? {} : { matched: m.hit, expected: m.of, ...(m.unverified ? { matched_without_position: m.unverified } : {}), wrong: m.wrong.slice(0, 12) }); break;
          }
          case 'spawn_point': {
            const ok = t.spawn && (same ? JSON.stringify(t.spawn) === JSON.stringify(e.spawn) : t.spawn[0] === e.spawn[0] && t.spawn[2] === e.spawn[2]);
            // Direct: the respawn BLOCK is the one position both editions store with the same
            // meaning; the same block (x, y, z) is the same spawn point.
            const sameBlock = !same && e.spawn_block && t.spawn_block && JSON.stringify(t.spawn_block) === JSON.stringify(e.spawn_block);
            const blockOk = !same || JSON.stringify(t.spawn_block ?? null) === JSON.stringify(e.spawn_block ?? null);
            if (ok && blockOk) { out = r(PASS, `player.spawn_point.${level}`); break; }
            if (sameBlock) { out = r(PASS, 'player.spawn_point.direct.same-respawn-block', { observed: t.spawn, observed_block: t.spawn_block }); break; }
            out = r(FAIL, `player.spawn_point.${level}`, { observed: t.spawn ?? null, observed_block: t.spawn_block ?? null }); break;
          }
          default: out = notEvaluated('unknown-aspect');
        }
      }
      res[aspect][level] = out;
    }
  }
  return res;
}
