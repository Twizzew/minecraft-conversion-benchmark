// Canonical FACTS extracted from each edition's stored data. Families compare facts,
// never raw bytes. Everything a rule needs is extracted here, in one place, so the
// same reading is applied to every converter's output.
import { get, plain, snbt, textOf, semantic } from './nbt.mjs';
import { fullJavaState } from './registry.mjs';

// Keys that change on every save or tick and carry no world state a player would miss.
export const VOLATILE_JAVA_ENTITY_KEYS = new Set(['UUID', 'Motion', 'fall_distance', 'FallDistance', 'OnGround', 'PortalCooldown', 'Air', 'HurtTime', 'HurtByTimestamp', 'DeathTime', 'Brain', 'current_impulse_context_reset_grace_time', 'Rotation', 'Pos', 'Fire', 'last_hurt_by_mob', 'last_hurt_by_player', 'ticks_since_last_hurt_by_mob']);
export const VOLATILE_BEDROCK_ENTITY_KEYS = new Set(['UniqueID', 'Motion', 'FallDistance', 'OnGround', 'PortalCooldown', 'Air', 'HurtTime', 'DeathTime', 'Rotation', 'Pos', 'Fire', 'LastDimensionId', 'internalComponents', 'LinksTag', 'InventoryVersion', 'TimeStamp', 'SaveTime']);
export const VOLATILE_JAVA_BE_KEYS = new Set(['keepPacked', 'x', 'y', 'z']);
export const VOLATILE_BEDROCK_BE_KEYS = new Set(['isMovable', 'x', 'y', 'z']);

const stripSection = (s) => String(s ?? '').replace(/§./g, '');

// ── Items ───────────────────────────────────────────────────────────────────
/** Java 1.20.5+ item stack: { id, count, components:{name: snbt}, text:{...} } */
export function javaItem(tag) {
  if (!tag) return null;
  const p = plain(tag);
  const id = p.id;
  if (!id || id === 'minecraft:air') return null;
  // The 26.3 item codec reads `count` only (default 1). A pre-1.20.5 `Count` left in data the
  // DataFixer did not upgrade is ignored by the game, so it is ignored here too.
  const count = p.count ?? 1;
  const comps = {};
  const ct = get(tag, 'components');
  const compsSem = {};
  if (ct && ct.type === 'compound') for (const [k, v] of Object.entries(ct.value)) { comps[k] = snbt(v); compsSem[k] = semantic(v); }
  const pc = p.components || {};
  return {
    id, count: Number(count), components: comps, components_sem: compsSem,
    text: {
      custom_name: pc['minecraft:custom_name'] !== undefined ? textOf(pc['minecraft:custom_name']) : undefined,
      lore: Array.isArray(pc['minecraft:lore']) ? pc['minecraft:lore'].map(textOf) : undefined,
    },
    damage: pc['minecraft:damage'], unbreakable: pc['minecraft:unbreakable'] !== undefined ? true : undefined,
    repair_cost: pc['minecraft:repair_cost'],
    trim: pc['minecraft:trim'] ? { material: String(pc['minecraft:trim'].material ?? '').replace(/^minecraft:/, ''), pattern: String(pc['minecraft:trim'].pattern ?? '').replace(/^minecraft:/, '') } : undefined,
    dyed_color: pc['minecraft:dyed_color'] !== undefined ? (typeof pc['minecraft:dyed_color'] === 'object' ? pc['minecraft:dyed_color'].rgb : pc['minecraft:dyed_color']) : undefined,
    written_book: pc['minecraft:written_book_content'] ? {
      title: textOf(pc['minecraft:written_book_content'].title?.raw ?? pc['minecraft:written_book_content'].title),
      author: pc['minecraft:written_book_content'].author,
      pages: (pc['minecraft:written_book_content'].pages || []).map((pg) => textOf(pg?.raw ?? pg)),
    } : undefined,
    writable_book: pc['minecraft:writable_book_content'] ? { pages: (pc['minecraft:writable_book_content'].pages || []).map((pg) => String(pg?.raw ?? pg)) } : undefined,
    snbt: snbt(tag), semantic: semantic(tag),
  };
}

/** Bedrock item stack: { id, count, aux, tag snbt, text:{...} } */
export function bedrockItem(tag) {
  if (!tag) return null;
  const p = plain(tag);
  const id = p.Name;
  if (!id || id === 'minecraft:air' || !(p.Count > 0)) return null;
  const t = p.tag || {};
  const disp = t.display || {};
  return {
    id, count: Number(p.Count), aux: p.Damage,
    text: {
      custom_name: disp.Name !== undefined ? stripSection(disp.Name) : undefined,
      lore: Array.isArray(disp.Lore) ? disp.Lore.map(stripSection) : undefined,
    },
    damage: t.Damage, unbreakable: t.Unbreakable ? true : undefined, repair_cost: t.RepairCost,
    trim: t.Trim ? { material: String(t.Trim.Material ?? '').replace(/^minecraft:/, ''), pattern: String(t.Trim.Pattern ?? '').replace(/^minecraft:/, '') } : undefined,
    dyed_color: t.customColor !== undefined ? t.customColor : undefined,
    written_book: (id === 'minecraft:written_book' && t.pages) ? { title: t.title, author: t.author, pages: t.pages.map((pg) => String(pg.text ?? '')) } : undefined,
    writable_book: (id === 'minecraft:writable_book' && t.pages) ? { pages: t.pages.map((pg) => String(pg.text ?? '')) } : undefined,
    tag: t && Object.keys(t).length ? snbt(get(tag, 'tag')) : null,
    tag_sem: tagSemantic(get(tag, 'tag')),
    block: p.Block ? snbt(get(tag, 'Block')) : null,
    snbt: snbt(tag), semantic: semantic(tag),
  };
}

// Rule 39 (audit 2026-09-25): an item `tag` compared as the GAME reads it. Bedrock writes
// `Damage:0` / `RepairCost:0` on some stacks and not on others, and an empty list (a
// firework's `Explosions:[]`) is the same as no list: all are the default state. They are
// removed before comparing; a tag that is then empty is no tag at all.
function tagSemantic(t) {
  if (!t || t.type !== 'compound') return null;
  const strip = (v, top) => {
    if (v?.type === 'compound') {
      const o = {};
      for (const [k, x] of Object.entries(v.value)) {
        if (top && (k === 'Damage' || k === 'RepairCost') && Number(x?.value) === 0) continue;
        const y = strip(x, false);
        if (y !== undefined) o[k] = y;
      }
      return { type: 'compound', value: o };
    }
    if (v?.type === 'list' && !(v.value?.value || []).length) return undefined;
    return v;
  };
  const s = strip(t, true);
  return Object.keys(s.value).length ? semantic(s) : null;
}

// ── Block entities ──────────────────────────────────────────────────────────
const lines4 = (a) => (Array.isArray(a) ? a.map((x) => textOf(x)) : []);
/** Java block entity facts. */
export function javaBlockEntity(tag) {
  const p = plain(tag);
  const f = { id: p.id, pos: [p.x, p.y, p.z], data: {}, sem: {} };
  for (const [k, v] of Object.entries(tag.value)) if (!VOLATILE_JAVA_BE_KEYS.has(k)) { f.data[k] = snbt(v); f.sem[k] = semantic(v); }
  if (p.CustomName !== undefined) f.custom_name = textOf(p.CustomName);
  const items = get(tag, 'Items');
  if (items) f.items = (items.value.value || []).map((v) => ({ slot: v.Slot?.value ?? null, item: javaItem({ type: 'compound', value: v }) })).filter((x) => x.item);
  if (p.front_text || p.back_text) {
    f.sign = {
      front: lines4(p.front_text?.messages), back: lines4(p.back_text?.messages),
      front_color: p.front_text?.color ?? 'black', back_color: p.back_text?.color ?? 'black',
      front_glowing: !!p.front_text?.has_glowing_text, back_glowing: !!p.back_text?.has_glowing_text, waxed: !!p.is_waxed,
    };
  }
  if (/command_block/.test(p.id || '')) f.command = { text: String(p.Command ?? ''), auto: !!p.auto, track_output: p.TrackOutput === undefined ? true : !!p.TrackOutput };
  if (p.Book) f.lectern_book = javaItem(get(tag, 'Book'));
  if (p.RecordItem) f.record = javaItem(get(tag, 'RecordItem'));
  return f;
}

/** Bedrock block entity facts. */
export function bedrockBlockEntity(tag) {
  const p = plain(tag);
  const f = { id: p.id, pos: [p.x, p.y, p.z], data: {}, sem: {} };
  for (const [k, v] of Object.entries(tag.value)) if (!VOLATILE_BEDROCK_BE_KEYS.has(k)) { f.data[k] = snbt(v); f.sem[k] = semantic(v); }
  if (p.CustomName !== undefined) f.custom_name = stripSection(p.CustomName);
  const items = get(tag, 'Items');
  // Rule 44: a POSITIONAL list (no entry carries `Slot`, e.g. ChiseledBookshelf's six
  // fixed entries, empty ones included) is indexed by position, taken before empty
  // entries are dropped. With `slot: null` every book of a shelf matched the first one.
  if (items) {
    const list = items.value.value || [];
    const positional = !list.some((v) => v.Slot);
    f.items = list.map((v, i) => ({ slot: v.Slot?.value ?? (positional ? i : null), item: bedrockItem({ type: 'compound', value: v }) })).filter((x) => x.item);
  }
  if (p.id === 'Sign' || p.id === 'HangingSign') {
    const face = (t) => (t ? String(t.Text ?? '').split('\n') : []);
    f.sign = {
      front: face(p.FrontText), back: face(p.BackText),
      front_color_argb: p.FrontText?.SignTextColor, back_color_argb: p.BackText?.SignTextColor,
      front_glowing: !!p.FrontText?.IgnoreLighting, back_glowing: !!p.BackText?.IgnoreLighting, waxed: !!p.IsWaxed,
    };
  }
  if (p.id === 'CommandBlock') f.command = { text: String(p.Command ?? ''), auto: !!p.auto, track_output: p.TrackOutput === undefined ? true : !!p.TrackOutput };
  if (p.book) f.lectern_book = bedrockItem(get(tag, 'book'));
  if (p.RecordItem) f.record = bedrockItem(get(tag, 'RecordItem'));
  return f;
}

// ── Entities ────────────────────────────────────────────────────────────────
const num = (v) => (v === undefined || v === null ? undefined : Number(v));
/** Java entity facts. */
export function javaEntity(tag) {
  const p = plain(tag);
  const f = { id: p.id, pos: (p.Pos || []).map(Number), data: {}, sem: {} };
  for (const [k, v] of Object.entries(tag.value)) if (!VOLATILE_JAVA_ENTITY_KEYS.has(k)) { f.data[k] = snbt(v); f.sem[k] = semantic(v); }
  f.tags = p.Tags || [];
  f.uuid = Array.isArray(p.UUID) ? p.UUID.map((x) => (x >>> 0).toString(16).padStart(8, '0')).join('') : undefined;
  if (p.CustomName !== undefined) f.custom_name = textOf(p.CustomName);
  f.living = p.DeathTime !== undefined || Array.isArray(p.attributes) || Array.isArray(p.Attributes);
  f.health = f.living ? num(p.Health) : undefined;
  f.baby = p.IsBaby !== undefined ? !!p.IsBaby : (p.Age !== undefined ? Number(p.Age) < 0 : undefined);
  f.tamed = p.Owner !== undefined || p.Tame === 1 ? true : (p.Tame === 0 ? false : undefined);
  f.persistent = p.PersistenceRequired !== undefined ? !!p.PersistenceRequired : undefined;
  const eq = [];
  const e = get(tag, 'equipment');
  if (e && e.type === 'compound') for (const [slot, v] of Object.entries(e.value)) { const it = javaItem(v); if (it) eq.push({ slot, item: it }); }
  f.equipment = eq;
  // Rule 53: each stack keeps its stored position (`Slot`; Java villager-like `Inventory`
  // lists store none: null).
  const inv = [];
  for (const k of ['Inventory', 'Items']) {
    const l = get(tag, k);
    if (l && l.type === 'list') for (const v of l.value.value || []) { const it = javaItem({ type: 'compound', value: v }); if (it) inv.push({ ...it, slot: v.Slot?.value ?? null }); }
  }
  f.inventory = inv;
  f.passengers = (p.Passengers || []).map((x) => x.id);
  const cnt = (it) => (it?.id ? Number(it.count ?? 1) : undefined); // same codec default as items
  f.offers = Array.isArray(p.Offers?.Recipes) ? p.Offers.Recipes.map((o) => ({ buy: o.buy?.id, buyCount: cnt(o.buy), buyB: o.buyB?.id, sell: o.sell?.id, sellCount: cnt(o.sell) })) : undefined;
  return f;
}

/** Bedrock actor facts. */
export function bedrockEntity(tag) {
  const p = plain(tag);
  const f = { id: p.identifier, pos: (p.Pos || []).map(Number), data: {}, sem: {} };
  for (const [k, v] of Object.entries(tag.value)) if (!VOLATILE_BEDROCK_ENTITY_KEYS.has(k)) { f.data[k] = snbt(v); f.sem[k] = semantic(v); }
  f.tags = p.Tags || [];
  f.uuid = p.UniqueID !== undefined ? String(p.UniqueID) : undefined;
  if (p.CustomName !== undefined && p.CustomName !== '') f.custom_name = stripSection(p.CustomName);
  const hp = (p.Attributes || []).find((a) => a.Name === 'minecraft:health');
  f.living = !!hp;
  f.health = hp ? Number(hp.Current) : undefined;
  f.max_health = hp ? Number(hp.Max) : undefined;
  f.baby = p.IsBaby !== undefined ? !!p.IsBaby : undefined;
  f.tamed = p.IsTamed !== undefined ? !!p.IsTamed : undefined;
  f.persistent = p.Persistent !== undefined ? !!p.Persistent : undefined;
  const eq = [];
  const slotNames = { Armor: ['head', 'chest', 'legs', 'feet', 'body'], Mainhand: ['mainhand'], Offhand: ['offhand'] };
  for (const [k, names] of Object.entries(slotNames)) {
    const l = get(tag, k);
    if (l && l.type === 'list') (l.value.value || []).forEach((v, i) => { const it = bedrockItem({ type: 'compound', value: v }); if (it) eq.push({ slot: names[i] || `${k}${i}`, item: it }); });
  }
  // REPRESENTATION (docs/fixture-rules.md §3.4): Bedrock keeps a mount's saddle as the
  // Saddled flag, and an equine's saddle / armour in ChestItems slots 0 / 1 (llama: carpet
  // in slot 0). They are read back as the Java equipment slots 'saddle' and 'body'.
  const EQUINE = /(horse|donkey|mule|camel)/.test(p.identifier || '');
  const LLAMA = /llama/.test(p.identifier || '');
  const inv = [];
  const has = (slot) => eq.some((x) => x.slot === slot);
  for (const k of ['ChestItems', 'Inventory']) {
    const l = get(tag, k);
    if (!l || l.type !== 'list') continue;
    for (const v of l.value.value || []) {
      const it = bedrockItem({ type: 'compound', value: v });
      if (!it) continue;
      const slot = v.Slot?.value;
      if (k === 'ChestItems' && EQUINE && slot === 0) { if (!has('saddle')) eq.push({ slot: 'saddle', item: it }); continue; }
      if (k === 'ChestItems' && EQUINE && slot === 1) { if (!has('body')) eq.push({ slot: 'body', item: it }); continue; }
      if (k === 'ChestItems' && LLAMA && slot === 0) { if (!has('body')) eq.push({ slot: 'body', item: it }); continue; }
      inv.push({ ...it, slot: slot ?? null }); // rule 53: position kept
    }
  }
  if (p.Saddled && !has('saddle')) eq.push({ slot: 'saddle', item: { id: 'minecraft:saddle', count: 1, snbt: 'Saddled:1b', virtual: true } });
  f.equipment = eq;
  f.inventory = inv;
  f.offers = Array.isArray(p.Offers?.Recipes) ? p.Offers.Recipes.map((o) => ({ buy: o.buyA?.Name, buyCount: o.buyA?.Count, buyB: o.buyB?.Name || undefined, sell: o.sell?.Name, sellCount: o.sell?.Count, tier: o.tier })) : undefined;
  // Bedrock keeps the offers of every tier; only tiers <= TradeTier are unlocked.
  f.trade_tier = p.TradeTier;
  return f;
}

// ── Blocks ──────────────────────────────────────────────────────────────────
export function javaBlock(b) { return b ? fullJavaState(b.name, b.props) : null; }
export function bedrockBlock(b) { return b ? { name: b.name, states: b.states || {}, layer1: b.layer1 ? b.layer1.name : null } : null; }
