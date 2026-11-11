# J03@2.0 — pertes classées par gravité (worldswitch-5e2e2d5-c33, J03_aller + J03_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 0 | 0 | — |
| **MAJEUR** | 0 | 0 | — |
| **MINEUR** | 0 | 0 | — |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 0 | 0 | — |
| **MAJEUR** | 0 | 0 | — |
| **MINEUR** | 169 | 3 | entity.data 156, block_entity.data 10, world.value 3 |
| **ÉTAT TEMPORAIRE** | 1 | 0 | block_entity.data 1 |
| **TECHNIQUE (invisible)** | 807 | 0 | block_entity.data 786, entity.data 21 |

### MINEUR — 169 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:banner | overworld -366 83 117 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld -366 83 123 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld -362 83 113 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld -362 83 127 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld -356 83 113 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld -356 83 127 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld -352 83 117 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld -352 83 123 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:smoker | overworld 1032 301 2 | block_entity.data | clé speed_multiplier | `{"differing_keys":["cooking_total_time","lit_total_time","speed_multiplier"],"differing_count":3,"lost":[],"added":[],"changed":["cooking_total_time","lit_total_time","speed_multiplier"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"100\"]"],"lit…` |
| PARTIAL | block_entity minecraft:blast_furnace | overworld 1036 301 2 | block_entity.data | clé speed_multiplier | `{"differing_keys":["cooking_total_time","lit_total_time","speed_multiplier"],"differing_count":3,"lost":[],"added":[],"changed":["cooking_total_time","lit_total_time","speed_multiplier"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"100\"]"],"lit…` |
| PARTIAL | entity minecraft:camel | overworld -539 71 280 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","Bred","CanPickUpLoot","EatingHaystack","FallFlying","ForcedAge","InLove","LeftHanded","attributes"],"differing_count":11,"lost":["AbsorptionAmount","Age","AgeLocked","Bred","CanPickUpLoot","EatingHaystac…` |
| PARTIAL | entity minecraft:cat | overworld -750.1 99 -681.4 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat | overworld -532.2 71 254.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:chest_minecart | overworld -1193.5 -39.5 256.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -1044.5 -12.5 50.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -1021.5 -6.5 8.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -1011.5 12.5 24.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -801.5 -24.5 735.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -797.5 -21.5 781.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -791.5 -24.5 730.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -751.5 17.5 -681.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -745.5 16.5 17.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -740.5 21.5 -644.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -728.5 10.5 -52.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -720.5 17.5 -666.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -716.5 21.5 24.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -675.5 21.5 48.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -646.5 15.5 286.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -631.5 64.5 -333.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -627.5 64.5 -386.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -612.5 23.5 240.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -597.5 26.5 245.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -595.5 60.5 -435.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -594.5 64.5 -251.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -573.5 65.5 -240.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -572.5 65.5 -370.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -567.5 65.5 -380.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -558.5 13.5 244.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -556.5 63.5 506.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:chest_minecart | overworld -554.5 58.5 583.5 | entity.data | clé HasTicked | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked"],"differing_count":4,"lost":["FlippedRotation","HasTicked"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| … | 129 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 1 (roundtrip)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:furnace | overworld 1028 301 2 | block_entity.data | clé lit_total_time | `{"differing_keys":["lit_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["lit_total_time"],"sample":{"lit_total_time":["[\"n\",\"1600\"]","[\"n\",\"120\"]"]}}` |

