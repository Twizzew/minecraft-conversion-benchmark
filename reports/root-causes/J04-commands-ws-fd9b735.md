# J04 — the 29 command-block FAILs of WorldSwitch 2.8.0 (`fd9b735`), one by one

A post-grading review. **The frozen v1.3 result is kept** (29 FAIL,
`block_entity.command.removed-despite-declared-equivalent`); nothing in the freeze, the
fixtures or the rules is changed. This file documents why those FAILs do not measure a
converter bug.

## Method

For each FAIL still present in `results/v1.3/worldswitch/ws-fd9b735_J04@1.0_j2b`:

1. **Java source command and declaration**: from `fixtures/J04_1.0.jsonl.gz` (`expected.command.text`,
   `declared.classification` from the station's book and sign).
2. **What fd9b735 wrote**: the graded evidence (`observed: ""`), reproduced by running
   WorldSwitch's own code path at `fd9b735` on the source text
   (`protectContainerCommand(cmd, convertCommandJB(cmd), …, degradeCommandJBWithoutData)`,
   `lib/blockentities.js` → `reports/root-causes/j04-replay-ws.mjs`): 29 / 29 empty, with the
   reason WorldSwitch writes in its conversion report.
3. **Does Bedrock have an equivalent?** Against the MCCB Bedrock reference 1.26.40: the
   effect and entity registries of `@minecraft/vanilla-data` 1.26.40 (the frozen reference
   package) and the Bedrock command set.
4. **Could it be adapted faithfully**, in one command block?

## Result

| Cause | Stations |
|---|--:|
| No Bedrock equivalent: the station's DIRECT / ADAPTABLE declaration is wrong | 26 |
| Only a non-faithful approximation exists (the declaration is at best debatable) | 3 |
| WorldSwitch bug (an equivalent exists and WorldSwitch drops it) | **0** |

Notes:

- WorldSwitch's reason text says "not available in bedrock 1.21.60" for `glowing`,
  `falling_block` and `item` (its internal registry version). The conclusion is the same
  with the MCCB reference 1.26.40: none of the three is in the 1.26.40 registries.
- The source world's declarations are wrong for these stations (for example `DIRECT` on
  `effect give … minecraft:glowing`): **a defect of the LAB source world's declarations,
  which the frozen rule trusts** (`docs/fixture-rules.md`, direct `command` table: declared
  DIRECT / ADAPTABLE + target empty → FAIL).
- **The same defect treats converters unequally.** Chunker 1.20.0 keeps these 29 commands
  (25 translated, 4 copied verbatim), commands that cannot run in Bedrock, and gets
  NOT_EVALUATED on all 29. WorldSwitch removes them and reports why, and gets FAIL. Under
  the frozen rule, emptying a command that has no equivalent costs more than writing an
  invalid one.
- Not fixed in v1.3 (a change is a new MCCB version, METHODOLOGY §8). Candidate for a later
  version: check each J04 declaration against the target edition's registries and command
  set before it creates a FAIL.

## The 29 stations

| Station | Declared | Java source command | fd9b735 output | fd9b735 reason (its issue report) | Bedrock equivalent (1.26.40) | Faithful adaptation | Cause |
|---|---|---|---|---|---|---|---|
| CMD-J-001 | ADAPTABLE | `execute as @e[tag=mccb_j04_001_target,limit=1] run data merge entity @s {Glowing:1b}` | empty | data | no: Bedrock has no `/data` command and no command that sets entity NBT (`Glowing`, `Silent`) or command storage | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-051 | ADAPTABLE | `execute store success score #success j04051 if entity @e[tag=mccb_j04_051_target,limit=1]` | empty | Bedrock execute has no "store result/success" (Java-only) | no: Bedrock `/execute` has no `store` | none in one command (a success flag that is also reset on failure needs two commands) | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-055 | DIRECT | `execute as @e[tag=mccb_j04_055_target,limit=1] if entity @s run data merge entity @s {Glowing:1b}` | empty | data | no: Bedrock has no `/data` command and no command that sets entity NBT (`Glowing`, `Silent`) or command storage | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-065 | ADAPTABLE | `execute as @e[tag=mccb_j04_065_target,sort=nearest,limit=1] run data merge entity @s {Glowing:1b}` | empty | data | no: Bedrock has no `/data` command and no command that sets entity NBT (`Glowing`, `Silent`) or command storage | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-074 | ADAPTABLE | `execute as @e[tag=mccb_j04_074_target,limit=1] run data merge entity @s {Silent:1b}` | empty | data | no: Bedrock has no `/data` command and no command that sets entity NBT (`Glowing`, `Silent`) or command storage | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-075 | DIRECT | `execute as @e[tag=mccb_j04_075_target,limit=1] if entity @s run data merge entity @s {Silent:1b}` | empty | data | no: Bedrock has no `/data` command and no command that sets entity NBT (`Glowing`, `Silent`) or command storage | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-086 | ADAPTABLE | `execute as @e[tag=mccb_j04_086_target,sort=nearest,limit=1] run data merge entity @s {Silent:1b}` | empty | data | no: Bedrock has no `/data` command and no command that sets entity NBT (`Glowing`, `Silent`) or command storage | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-150 | ADAPTABLE | `summon minecraft:item 177 65 394 {Tags:["mccb_j04_150_target"],Item:{id:"minecraft:diamond",count:1}}` | empty | entities id minecraft:item is not available in bedrock 1.21.60 (id is absent from the official bedrock 1.21.60 registry) | no: `minecraft:item` is not a summonable Bedrock entity (absent from `MinecraftEntityTypes` 1.26.40) | none faithful (`/give` puts it in an inventory; `/loot spawn` needs a loot table that yields exactly this stack) | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-156 | ADAPTABLE | `summon minecraft:falling_block 45 65 414 {Tags:["mccb_j04_156_target"],BlockState:{id:"minecraft:sand"},Time:1}` | empty | entities id minecraft:falling_block is not available in bedrock 1.21.60 (id is absent from the official bedrock 1.21.60 registry) | no direct one: `minecraft:falling_block` is not a summonable Bedrock entity | approximate only: `setblock … sand` makes sand fall only above air, and loses the entity tag the station targets | no faithful equivalent; approximation only |
| CMD-J-164 | ADAPTABLE | `summon minecraft:item 222 65 414 {Tags:["mccb_j04_164_target"],Item:{id:"minecraft:diamond",count:1}}` | empty | entities id minecraft:item is not available in bedrock 1.21.60 (id is absent from the official bedrock 1.21.60 registry) | no: `minecraft:item` is not a summonable Bedrock entity (absent from `MinecraftEntityTypes` 1.26.40) | none faithful (`/give` puts it in an inventory; `/loot spawn` needs a loot table that yields exactly this stack) | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-170 | ADAPTABLE | `summon minecraft:falling_block 90 65 434 {Tags:["mccb_j04_170_target"],BlockState:{id:"minecraft:sand"},Time:1}` | empty | entities id minecraft:falling_block is not available in bedrock 1.21.60 (id is absent from the official bedrock 1.21.60 registry) | no direct one: `minecraft:falling_block` is not a summonable Bedrock entity | approximate only: `setblock … sand` makes sand fall only above air, and loses the entity tag the station targets | no faithful equivalent; approximation only |
| CMD-J-179 | ADAPTABLE | `item modify block 24 64 454 container.0 {type:"minecraft:set_count",count:2}` | empty | item modify (item modifier) has no Bedrock equivalent (Java-only) | no: Bedrock has only `/replaceitem` (one slot, one fixed item); no item modifier, no copy from another slot, no slot range | none in one command | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-180 | ADAPTABLE | `item replace entity @p weapon.offhand from entity @p weapon.mainhand` | empty | item replace ... from <source slot> has no Bedrock equivalent (Java-only) | no: Bedrock has only `/replaceitem` (one slot, one fixed item); no item modifier, no copy from another slot, no slot range | none in one command | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-182 | ADAPTABLE | `give @p minecraft:written_book[minecraft:written_book_content={title:{raw:"CMD-J-182"},author:"MCCB",pages:[{raw:{text:"Test book CMD-J-182"}}],generation:0,resolved:true}] 1` | empty | give item component written_book_content has no Bedrock command equivalent | no: a Bedrock `/give` cannot set a written book's title, author or pages | none faithful (an empty written book is not the same item) | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-184 | ADAPTABLE | `item fill block 133 64 454 container.* with minecraft:stone 1` | empty | item fill (fills or overrides a whole slot range, Java 26.x) has no Bedrock equivalent (replaceitem sets one slot) | no: Bedrock has only `/replaceitem` (one slot, one fixed item); no item modifier, no copy from another slot, no slot range | none in one command | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-192 | ADAPTABLE | `item replace entity @p hotbar.1 from entity @p hotbar.0` | empty | item replace ... from <source slot> has no Bedrock equivalent (Java-only) | no: Bedrock has only `/replaceitem` (one slot, one fixed item); no item modifier, no copy from another slot, no slot range | none in one command | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-193 | ADAPTABLE | `item override block 67 64 474 container.* with minecraft:stone 1` | empty | item override (fills or overrides a whole slot range, Java 26.x) has no Bedrock equivalent (replaceitem sets one slot) | no: Bedrock has only `/replaceitem` (one slot, one fixed item); no item modifier, no copy from another slot, no slot range | none in one command | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-213 | DIRECT | `effect give @e[tag=mccb_j04_213_target,limit=1] minecraft:glowing 5 0 true` | empty | effects id minecraft:glowing is not available in bedrock 1.21.60 (id is absent from the official bedrock 1.21.60 registry) | no: Bedrock 1.26.40 has no `glowing` effect (absent from `@minecraft/vanilla-data` 1.26.40 `MinecraftEffectTypes`) | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-214 | DIRECT | `effect clear @e[tag=mccb_j04_214_target,limit=1] minecraft:glowing` | empty | effects id minecraft:glowing is not available in bedrock 1.21.60 (id is absent from the official bedrock 1.21.60 registry) | no: Bedrock 1.26.40 has no `glowing` effect (absent from `@minecraft/vanilla-data` 1.26.40 `MinecraftEffectTypes`) | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-222 | ADAPTABLE | `item fill block 155 64 494 container.* from block 156 64 494 container.0` | empty | item fill (fills or overrides a whole slot range, Java 26.x) has no Bedrock equivalent (replaceitem sets one slot) | no: Bedrock has only `/replaceitem` (one slot, one fixed item); no item modifier, no copy from another slot, no slot range | none in one command | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-298 | ADAPTABLE | `effect give @e[tag=mccb_j04_298_target,limit=1] minecraft:glowing 1 0 true` | empty | effects id minecraft:glowing is not available in bedrock 1.21.60 (id is absent from the official bedrock 1.21.60 registry) | no: Bedrock 1.26.40 has no `glowing` effect (absent from `@minecraft/vanilla-data` 1.26.40 `MinecraftEffectTypes`) | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-301 | ADAPTABLE | `data modify storage mccb_j04:cmd-j-301 ticks set value 1b` | empty | data | no: Bedrock has no `/data` command and no command that sets entity NBT (`Glowing`, `Silent`) or command storage | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-329 | ADAPTABLE | `worldborder get` | empty | worldborder | no: Bedrock has no world border and no `/worldborder` | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-337 | ADAPTABLE | `execute as @e[tag=mccb_j04_337_target,limit=1] at @s unless block ~ ~-1 ~ minecraft:bedrock if entity @p[distance=..32] run effect give @s minecraft:glowing 5 0 true` | empty | effects id minecraft:glowing is not available in bedrock 1.21.60 (id is absent from the official bedrock 1.21.60 registry) | no: Bedrock 1.26.40 has no `glowing` effect (absent from `@minecraft/vanilla-data` 1.26.40 `MinecraftEffectTypes`) | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-344 | ADAPTABLE | `execute as @e[type=minecraft:armor_stand,tag=mccb_j04_344_target,scores={j04344=5..},sort=nearest,limit=1] at @s if entity @p[distance=..32] run effect give @s minecraft:glowing 5 0 true` | empty | effects id minecraft:glowing is not available in bedrock 1.21.60 (id is absent from the official bedrock 1.21.60 registry) | no: Bedrock 1.26.40 has no `glowing` effect (absent from `@minecraft/vanilla-data` 1.26.40 `MinecraftEffectTypes`) | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-370 | ADAPTABLE | `execute as @e[tag=mccb_j04_370_target,x=880,y=63,z=790,dx=8,dy=6,dz=8,scores={j04370=5..},limit=1] run effect give @s minecraft:glowing 5 0 true` | empty | effects id minecraft:glowing is not available in bedrock 1.21.60 (id is absent from the official bedrock 1.21.60 registry) | no: Bedrock 1.26.40 has no `glowing` effect (absent from `@minecraft/vanilla-data` 1.26.40 `MinecraftEffectTypes`) | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-374 | ADAPTABLE | `execute as @e[tag=mccb_j04_374_target,limit=1] at @s unless block ~ ~-1 ~ minecraft:bedrock if entity @p[distance=..32] run effect give @s minecraft:glowing 6 0 true` | empty | effects id minecraft:glowing is not available in bedrock 1.21.60 (id is absent from the official bedrock 1.21.60 registry) | no: Bedrock 1.26.40 has no `glowing` effect (absent from `@minecraft/vanilla-data` 1.26.40 `MinecraftEffectTypes`) | none | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-384 | ADAPTABLE | `item fill block 663 64 834 {type:"minecraft:slot_range",slots:"container.*"} with minecraft:stone 1` | empty | item fill (fills or overrides a whole slot range, Java 26.x) has no Bedrock equivalent (replaceitem sets one slot) | no: Bedrock has only `/replaceitem` (one slot, one fixed item); no item modifier, no copy from another slot, no slot range | none in one command | declaration error in the source world (no Bedrock equivalent) |
| CMD-J-385 | ADAPTABLE | `swing @p mainhand stab 10t` | empty | swing | no `/swing` command in Bedrock | approximate only: `/playanimation` plays a client animation (no hand/`stab` semantics) | no faithful equivalent; approximation only |
