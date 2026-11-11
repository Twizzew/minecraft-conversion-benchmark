// node reports/root-causes/j04-verdict.mjs reports/root-causes/j04-fails-ws-fd9b735.json  — writes the per-station table (review aid, not part of the freeze)
import fs from 'node:fs';
const rows = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const V = {
  data: ['no: Bedrock has no `/data` command and no command that sets entity NBT (`Glowing`, `Silent`) or command storage', 'none', 'declaration'],
  glow: ['no: Bedrock 1.26.40 has no `glowing` effect (absent from `@minecraft/vanilla-data` 1.26.40 `MinecraftEffectTypes`)', 'none', 'declaration'],
  item: ['no: Bedrock has only `/replaceitem` (one slot, one fixed item); no item modifier, no copy from another slot, no slot range', 'none in one command', 'declaration'],
  store: ['no: Bedrock `/execute` has no `store`', 'none in one command (a success flag that is also reset on failure needs two commands)', 'declaration'],
  wb: ['no: Bedrock has no world border and no `/worldborder`', 'none', 'declaration'],
  summonItem: ['no: `minecraft:item` is not a summonable Bedrock entity (absent from `MinecraftEntityTypes` 1.26.40)', 'none faithful (`/give` puts it in an inventory; `/loot spawn` needs a loot table that yields exactly this stack)', 'declaration'],
  book: ['no: a Bedrock `/give` cannot set a written book\'s title, author or pages', 'none faithful (an empty written book is not the same item)', 'declaration'],
  falling: ['no direct one: `minecraft:falling_block` is not a summonable Bedrock entity', 'approximate only: `setblock … sand` makes sand fall only above air, and loses the entity tag the station targets', 'approximation'],
  swing: ['no `/swing` command in Bedrock', 'approximate only: `/playanimation` plays a client animation (no hand/`stab` semantics)', 'approximation'],
};
const kind = (c) => /^item (modify|replace .* from|fill|override)/.test(c) ? 'item' : /store success/.test(c) ? 'store' : /data (merge|modify)/.test(c) ? 'data'
  : /glowing/.test(c) ? 'glow' : /^worldborder/.test(c) ? 'wb' : /summon minecraft:item /.test(c) ? 'summonItem' : /written_book_content/.test(c) ? 'book'
  : /falling_block/.test(c) ? 'falling' : /^swing/.test(c) ? 'swing' : null;
const out = ['| Station | Declared | Java source command | fd9b735 output | fd9b735 reason (its issue report) | Bedrock equivalent (1.26.40) | Faithful adaptation | Cause |', '|---|---|---|---|---|---|---|---|'];
const tally = {};
for (const r of rows.sort((a, b) => a.case.localeCompare(b.case))) {
  const k = kind(r.cmd); if (!k) throw new Error('unclassified ' + r.case);
  const [eq, ad, cause] = V[k]; tally[cause] = (tally[cause] || 0) + 1;
  const causeTxt = cause === 'declaration' ? 'declaration error in the source world (no Bedrock equivalent)' : 'no faithful equivalent; approximation only';
  out.push(`| ${r.case} | ${r.cls} | \`${r.cmd.replace(/\|/g, '\\|')}\` | empty | ${r.ws_reason.replace(/\|/g, '/')} | ${eq} | ${ad} | ${causeTxt} |`);
}
console.log(out.join('\n')); console.error(JSON.stringify(tally));
