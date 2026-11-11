# B03@1.0 — pertes classées par gravité (je2be-core-8dfc4de, B03_aller + B03_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 1 | 1 | player.xp_level 1 |
| **MAJEUR** | 31 | 31 | scoreboard.value 14, world.value 3, entity.identity 2, entity.health 2, scoreboard.presence 2, scoreboard.display_name 2, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1, structure.spawn_zone 1 |
| **MINEUR** | 4 | 4 | entity.position 2, entity.data 2 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 20 | 11 | entity.data 20 |

### CRITIQUE — 1 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | player ~local_player | ~local_player | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 31 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | world | ticking_area | world.value | zones chargées en permanence (fermes, horloges) | `{"covered":0,"chunks":12}` |
| FAIL | world | ticking_area | world.value | zones chargées en permanence (fermes, horloges) | `{"covered":0,"chunks":25}` |
| FAIL | world | ticking_area | world.value | zones chargées en permanence (fermes, horloges) | `{"covered":0,"chunks":9}` |
| FAIL | scoreboard mccb_sys |  | scoreboard.presence | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys |  | scoreboard.display_name | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_timer |  | scoreboard.presence | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_timer |  | scoreboard.display_name | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_timer | mccb_timer | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_timer | mccb_timer | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_timer | mccb_timer | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | player ~local_player | ~local_player | player.position | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.dimension | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.game_mode | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.health | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.food | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | structure | the_nether -77 74 -14 | structure.spawn_zone | structure (zone d'apparition des créatures) ou bord de génération | `{"covered":0,"of":9}` |

### MINEUR — 4 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.data | données | `{"observed":"no matching entity"}` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 0 | 0 | — |
| **MAJEUR** | 59 | 30 | entity.data 29, scoreboard.value 15, world.value 3, block.state 2, entity.identity 2, entity.health 2, scoreboard.presence 2, scoreboard.display_name 2, block_entity.presence 1, structure.spawn_zone 1 |
| **MINEUR** | 66 | 7 | block_entity.data 31, entity.data 31, entity.position 2, world.value 2 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### MAJEUR — 59 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:purpur_block | the_end 82 49 7 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"pillar_axis":"x -> y"}}` |
| FAIL | block minecraft:purpur_block | the_end 86 49 7 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"pillar_axis":"z -> y"}}` |
| FAIL | block_entity SporeBlossom | overworld 1309 -3 -765 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| PARTIAL | entity minecraft:armor_stand | overworld 15.5 200 68.5 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","Persistent","limitedLife"],"differing_count":9,"lost":["IsOutOfControl","Persistent"],"added":["AttackTime","BodyRot","BreedCooldown","InLove","LoveCa…` |
| PARTIAL | entity minecraft:camel | overworld 1300 65 -824.4 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","ChestItems","IsOutOfControl","SkipBodySlotUpgrade","definitions","expDropEnabled","limitedLife"],"differing_count":9,"lost":["ChestItems","IsOutOfControl","SkipBodySlotUpgrade","expDropEnabled"],"added":[…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1269.5 64 -823.1 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","InLove","IsInRaid","IsOutOfControl","LoveCause","ReactToBell","RewardPlayersOnFirstFounding","SkinID","Willing","definitions","limitedLife"],"differing_count":15,"lost":…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1282.4 64 -802.6 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","InLove","IsInRaid","IsOutOfControl","LoveCause","ReactToBell","RewardPlayersOnFirstFounding","SkinID","Willing","definitions","limitedLife"],"differing_count":15,"lost":…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1284.1 63.6 -814.5 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","InLove","IsInRaid","IsOutOfControl","LoveCause","PreferredProfession","ReactToBell","RewardPlayersOnFirstFounding","SkinID","Willing","definitions","limitedLife"],"diffe…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1304.1 63 -809.6 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","InLove","IsInRaid","IsOutOfControl","LoveCause","ReactToBell","RewardPlayersOnFirstFounding","Willing","definitions","limitedLife"],"differing_count":14,"lost":["Dwellin…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1304.5 67 -839.1 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","InLove","IsInRaid","IsOutOfControl","LoveCause","ReactToBell","RewardPlayersOnFirstFounding","SkinID","Willing","definitions","limitedLife"],"differing_count":15,"lost":…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1313.5 68 -824.7 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","InLove","IsInRaid","IsOutOfControl","LoveCause","ReactToBell","RewardPlayersOnFirstFounding","SkinID","Willing","definitions","limitedLife"],"differing_count":15,"lost":…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1320.5 66 -842.3 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","InLove","IsInRaid","IsOutOfControl","LoveCause","PreferredProfession","ReactToBell","RewardPlayersOnFirstFounding","SkinID","Willing","definitions","limitedLife"],"diffe…` |
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:ender_dragon | the_end -12.6 81.6 17.7 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsGlobal","IsOutOfControl","LoveCause","definitions","limitedLife"],"differing_count":10,"lost":["IsOutOfControl"],"added":["AttackTime","BodyRot","BreedCooldown","InLove","LoveCa…` |
| PARTIAL | entity minecraft:enderman | the_end 62.9 55 -4.8 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","SlotDropChances","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["Is…` |
| PARTIAL | entity minecraft:enderman | the_end 63.9 32 7.1 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","SlotDropChances","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["Is…` |
| PARTIAL | entity minecraft:enderman | the_end 63.9 54 -3.5 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","SlotDropChances","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["Is…` |
| PARTIAL | entity minecraft:enderman | the_end 77.5 60 5.6 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","SlotDropChances","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["Is…` |
| PARTIAL | entity minecraft:enderman | the_end 84.3 60 6.7 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","SlotDropChances","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["Is…` |
| PARTIAL | entity minecraft:enderman | the_end 90.6 38 -26.2 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","SlotDropChances","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["Is…` |
| PARTIAL | entity minecraft:enderman | the_end 93.5 58 32.3 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","SlotDropChances","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["Is…` |
| PARTIAL | entity minecraft:enderman | the_end 94.4 40 -16.3 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","SlotDropChances","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["Is…` |
| PARTIAL | entity minecraft:enderman | the_end 102.2 50 2.2 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","SlotDropChances","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["Is…` |
| PARTIAL | entity minecraft:enderman | the_end 103.6 40 -6.2 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","SlotDropChances","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["Is…` |
| PARTIAL | entity minecraft:hoglin | the_nether -32.3 55 -17 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","IsOutOfControl","NaturalSpawn","Persistent","definitions","expDropEnabled","limitedLife"],"differing_count":9,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","BodyRot","Persistent","limit…` |
| PARTIAL | entity minecraft:hoglin | the_nether 20.6 84 26.5 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","IsOutOfControl","NaturalSpawn","Persistent","definitions","expDropEnabled","limitedLife"],"differing_count":9,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","BodyRot","Persistent","limit…` |
| PARTIAL | entity minecraft:hoglin | the_nether 21.2 81.3 48.1 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","IsAngry","IsOutOfControl","NaturalSpawn","Persistent","TargetID","definitions","expDropEnabled","limitedLife"],"differing_count":11,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","BodyRo…` |
| PARTIAL | entity minecraft:piglin | the_nether -32.3 47 -6.5 | entity.data | clé Variant | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsAngry","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","TargetID","Variant","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["IsOutOfControl",…` |
| PARTIAL | entity minecraft:piglin | the_nether -32.2 46 -5.7 | entity.data | clé Variant | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsAngry","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","TargetID","Variant","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["IsOutOfControl",…` |
| PARTIAL | entity minecraft:piglin | the_nether -32.2 86 29.5 | entity.data | clé Variant | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","Variant","definitions","expDropEnabled","limitedLife"],"differing_count":13,"lost":["IsOutOfControl","expDropEnabled"],"ad…` |
| PARTIAL | entity minecraft:piglin | the_nether -32 55 -16.3 | entity.data | clé Variant | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsAngry","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","TargetID","Variant","definitions","expDropEnabled","limitedLife"],"differing_count":15,"lost":["IsOutOfControl",…` |
| PARTIAL | entity minecraft:piglin | the_nether 19.3 80 45.4 | entity.data | clé Variant | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","Variant","definitions","expDropEnabled","limitedLife"],"differing_count":13,"lost":["IsOutOfControl","expDropEnabled"],"ad…` |
| PARTIAL | entity minecraft:piglin | the_nether 48.1 68 20.6 | entity.data | clé Variant | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","Variant","definitions","expDropEnabled","limitedLife"],"differing_count":13,"lost":["IsOutOfControl","expDropEnabled"],"ad…` |
| FAIL | world | ticking_area | world.value | zones chargées en permanence (fermes, horloges) | `{"observed":"absent"}` |
| FAIL | world | ticking_area | world.value | zones chargées en permanence (fermes, horloges) | `{"observed":"absent"}` |
| FAIL | world | ticking_area | world.value | zones chargées en permanence (fermes, horloges) | `{"observed":"absent"}` |
| FAIL | scoreboard mccb_sys |  | scoreboard.presence | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| … | 19 autres (liste complète dans le JSON) | | | | |

### MINEUR — 66 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity SporeBlossom | overworld 1309 -3 -765 | block_entity.data | données | `{"observed":"no block entity"}` |
| PARTIAL | block_entity Bell | overworld 1300 65 -826 | block_entity.data | clé Direction | `{"differing_keys":["Direction","Ticks"],"differing_count":2,"lost":[],"added":[],"changed":["Direction","Ticks"],"sample":{"Direction":["[\"n\",\"0\"]","[\"n\",\"255\"]"],"Ticks":["[\"n\",\"31\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Chest | overworld -50 199 40 | block_entity.data | clé forceunpair | `{"differing_keys":["forceunpair"],"differing_count":1,"lost":["forceunpair"],"added":[],"changed":[],"sample":{"forceunpair":["[\"n\",\"1\"]",null]}}` |
| PARTIAL | block_entity Barrel | overworld -50 200 16 | block_entity.data | clé forceunpair | `{"differing_keys":["forceunpair"],"differing_count":1,"lost":["forceunpair"],"added":[],"changed":[],"sample":{"forceunpair":["[\"n\",\"1\"]",null]}}` |
| PARTIAL | block_entity CommandBlock | overworld 12 200 38 | block_entity.data | clé LPRedstoneMode | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 -12 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 -6 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 0 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 6 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 29 200 6 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 30 200 0 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 31 200 0 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 32 200 -12 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 32 200 -6 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 32 200 0 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 34 200 0 | block_entity.data | clé ExecuteOnFirstTick | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":7,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"ch…` |
| PARTIAL | block_entity CommandBlock | overworld 36 200 -12 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 36 200 -6 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 36 200 0 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 36 200 6 | block_entity.data | clé ExecuteOnFirstTick | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":7,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"ch…` |
| PARTIAL | block_entity CommandBlock | overworld 40 200 -12 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 40 200 -6 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 40 200 0 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 40 200 6 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 44 200 -12 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 44 200 -6 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 44 200 0 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 44 200 6 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity CommandBlock | overworld 48 200 6 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity Sign | overworld 12 201 38 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity Lodestone | the_nether -7 64 9 | block_entity.data | clé trackingHandle | `{"differing_keys":["trackingHandle"],"differing_count":1,"lost":[],"added":["trackingHandle"],"changed":[],"sample":{"trackingHandle":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | entity minecraft:cat | overworld 1302 65 -825 | entity.data | clé expDropEnabled | `{"differing_keys":["AttackTime","Attributes","BodyRot","DwellingUniqueID","IsOutOfControl","definitions","expDropEnabled","limitedLife","properties"],"differing_count":9,"lost":["IsOutOfControl","expDropEnabled","properties"],"added":["AttackTime","BodyRot","l…` |
| PARTIAL | entity minecraft:creeper | overworld 1283 6 -855.5 | entity.data | clé expDropEnabled | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","expDropEnabled","limitedLife"],"differing_count":11,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","Body…` |
| PARTIAL | entity minecraft:creeper | overworld 1299.9 -49 -814.5 | entity.data | clé expDropEnabled | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","expDropEnabled","limitedLife"],"differing_count":11,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","Body…` |
| PARTIAL | entity minecraft:creeper | overworld 1305.5 21 -825.5 | entity.data | clé expDropEnabled | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","expDropEnabled","limitedLife"],"differing_count":11,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","Body…` |
| PARTIAL | entity minecraft:creeper | overworld 1308.5 -22 -786.1 | entity.data | clé expDropEnabled | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Persistent","expDropEnabled","limitedLife"],"differing_count":11,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","Body…` |
| PARTIAL | entity minecraft:iron_golem | overworld 1291.5 63 -823 | entity.data | clé DwellingUniqueID | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","InLove","IsOutOfControl","LoveCause","RewardPlayersOnFirstFounding","definitions","limitedLife"],"differing_count":11,"lost":["DwellingUniqueID","IsOutOfControl","Reward…` |
| PARTIAL | entity minecraft:item | overworld -51.8 62.6 18.6 | entity.data | clé Dir | `{"differing_keys":["Dir","IsOutOfControl"],"differing_count":2,"lost":["IsOutOfControl"],"added":["Dir"],"changed":[]}` |
| PARTIAL | entity minecraft:item | overworld -50 62.6 20.9 | entity.data | clé Dir | `{"differing_keys":["Dir","IsOutOfControl"],"differing_count":2,"lost":["IsOutOfControl"],"added":["Dir"],"changed":[]}` |
| PARTIAL | entity minecraft:item | overworld -47.1 63.1 -0.1 | entity.data | clé Dir | `{"differing_keys":["Dir","IsOutOfControl"],"differing_count":2,"lost":["IsOutOfControl"],"added":["Dir"],"changed":[]}` |
| … | 26 autres (liste complète dans le JSON) | | | | |

