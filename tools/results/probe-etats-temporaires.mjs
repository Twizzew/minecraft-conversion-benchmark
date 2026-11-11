#!/usr/bin/env node
// MCCB 2026-11 — SONDE : états temporaires (minuteries, mèches, âges, tics en attente) d'un monde,
// source / aller / retour, champ par champ, tels qu'ils sont STOCKÉS. Sert à voir sur quelle jambe un
// état temporaire se perd (le lecteur v1.1 ne juge pas ces champs à l'aller).
//   node tools/results/probe-etats-temporaires.mjs <world>
import { readFixtures } from '../lib/fixtures-io.mjs';
import { openRunOutput, openSource } from '../lib/open.mjs';
import { TargetView } from '../oracles/target.mjs';
import { plain } from '../lib/nbt.mjs';

const [worldId] = process.argv.slice(2);
const n = worldId.split('@')[0];
const fx = readFixtures(worldId);
const SKIP = /sign|slime|^minecraft:(cow|chicken|horse|villager|chest|barrel|bell|lectern)$/;
const subjects = fx.subjects.filter((s) => ['block_entity', 'entity'].includes(s.family) && !SKIP.test(s.expected.id));
const DROP = new Set(['Items', 'pages', 'attributes', 'Attributes', 'UUID', 'UniqueID', 'Pos', 'Rotation', 'definitions', 'Tags', 'ArmorItems', 'HandItems', 'Armor', 'Mainhand', 'Offhand', 'ArmorDropChances', 'HandDropChances', 'drop_chances', 'Brain', 'internalComponents', 'x', 'y', 'z', 'id', 'identifier']);
const short = (o) => JSON.stringify(o, (k, v) => (DROP.has(k) ? undefined : typeof v === 'bigint' ? String(v) : v));
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const norm = (id) => String(id || '').replace('minecraft:', '').replace('_v2', '').replace(/^item$/, 'item').toLowerCase();

const src = await openSource(worldId);
const views = [['SOURCE', new TargetView({ edition: src.edition, world: src.world, label: 'source' })]];
for (const id of [`${n}_aller`, `${n}_retour`]) { const o = await openRunOutput(id); views.push([id, new TargetView({ edition: o.edition, world: o.world, label: id })]); }
const idx = [];
for (const [, v] of views) idx.push(await v.entitiesIndex());

for (const s of subjects) {
  console.log(`\n#### ${s.family} ${s.expected.id} @ ${s.locator.pos.map((x) => Math.round(x * 10) / 10).join(' ')}`);
  for (let i = 0; i < views.length; i++) {
    const [label, v] = views[i];
    let t = null;
    if (s.family === 'block_entity') t = (await v.blockEntityAt(s.locator.dim, s.locator.pos))?.tag;
    else {
      const want = norm(s.expected.id);
      const c = idx[i].filter((e) => e.dim === s.locator.dim && (norm(e.facts.id) === want || (want === 'tnt' && /tnt/.test(norm(e.facts.id)))))
        .map((e) => ({ e, d: dist(e.facts.pos, s.locator.pos) })).sort((a, b) => a.d - b.d)[0];
      t = c && c.d < 3 ? c.e.tag : null;
    }
    console.log(`  ${label.padEnd(12)} ${t ? short(plain(t)).slice(0, 900) : '(absent)'}`);
  }
}
