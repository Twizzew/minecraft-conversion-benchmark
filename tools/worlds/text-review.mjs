#!/usr/bin/env node
// List every text written by players in a Bedrock world, for a HUMAN privacy review before
// publication: sign faces, book titles / authors / pages, custom names of entities, block
// entities and items, scoreboard names. Output is private (never commit it).
//   node tools/worlds/text-review.mjs --world GURREN@1.0 --out _staging/private/GURREN-TEXT-REVIEW.md
import fs from 'node:fs';
import path from 'node:path';
import { openSource } from '../lib/open.mjs';
import { plain } from '../lib/nbt.mjs';

const arg = (n, d = null) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const src = await openSource(arg('world'));
const w = src.world;
const DIM = { 0: 'overworld', 1: 'nether', 2: 'end' };
const found = new Map(); // category -> Map(text -> [locations])
const add = (cat, text, where) => {
  const t = String(text ?? '').replace(/§./g, '').trim();
  if (!t) return;
  if (!found.has(cat)) found.set(cat, new Map());
  const m = found.get(cat);
  if (!m.has(t)) m.set(t, []);
  if (m.get(t).length < 3) m.get(t).push(where);
};
const item = (it, where) => {
  if (!it || typeof it !== 'object') return;
  const t = it.tag || {};
  if (t.display?.Name) add('item names', t.display.Name, where);
  for (const l of t.display?.Lore || []) add('item lore', l, where);
  if (t.title) add('book titles', t.title, where);
  if (t.author) add('book authors', t.author, where);
  for (const pg of t.pages || []) add('book pages', pg.text, where);
  for (const sub of [...(t.Items || []), ...(t.storage_item_component_content || [])]) item(sub, `${where} (nested)`);
};
for (const { dim, cx, cz } of w.chunkIds()) {
  for (const [pos, be] of w.blockEntities(dim, cx, cz)) {
    const p = plain(be);
    const where = `${DIM[dim] ?? dim} ${pos} ${p.id}`;
    if (p.CustomName) add('block names', p.CustomName, where);
    for (const face of [p.FrontText, p.BackText]) if (face?.Text) add('sign text', face.Text.replace(/\n/g, ' / '), where);
    if (p.Text) add('sign text', String(p.Text).replace(/\n/g, ' / '), where);
    for (const it of p.Items || []) item(it, where);
    if (p.book) item(p.book, where);
  }
}
for (const a of w.allActors()) {
  if (!a.tag) continue;
  const p = plain(a.tag);
  const where = `${DIM[a.dim] ?? a.dim} ${(p.Pos || []).map((x) => Math.round(x)).join(',')} ${p.identifier}`;
  if (p.CustomName) add('entity names', p.CustomName, where);
  for (const k of ['Armor', 'Mainhand', 'Offhand', 'ChestItems', 'Items']) for (const it of p[k] || []) item(it, where);
  if (p.Item) item(p.Item, where);
}
for (const [k] of w.named) {
  if (k !== '~local_player' && !k.startsWith('player_server_')) continue;
  const p = plain(w.namedNbt(k)?.[0]) || {};
  for (const lst of ['Inventory', 'EnderChestInventory', 'Armor', 'Offhand']) for (const it of p[lst] || []) item(it, `player record ${lst}`);
}
const sb = w.named.has('scoreboard') ? plain(w.namedNbt('scoreboard')?.[0]) : null;
for (const o of sb?.Objectives || []) add('scoreboard objective names', o.DisplayName, `objective ${o.Name}`);
for (const e of sb?.Entries || []) if (e.FakePlayerName) add('scoreboard fake-player names', e.FakePlayerName, 'scoreboard');

const L = [`# Text review — ${arg('world')} (PRIVATE — do not commit)`, '', 'Every text written by players, deduplicated, with up to 3 locations. Decide for each category whether it may be published as is.', ''];
for (const [cat, m] of [...found].sort()) {
  L.push(`## ${cat} — ${m.size} distinct`, '');
  for (const [t, locs] of [...m].sort((a, b) => a[0].localeCompare(b[0]))) L.push(`- ${t.slice(0, 200).replace(/\|/g, '/')}  _(${locs.join('; ')})_`);
  L.push('');
}
fs.mkdirSync(path.dirname(path.resolve(arg('out'))), { recursive: true });
fs.writeFileSync(path.resolve(arg('out')), L.join('\n'));
console.log('categories:', [...found].map(([c, m]) => `${c}=${m.size}`).join(', '));
