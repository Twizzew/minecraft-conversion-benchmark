# B03@1.0 — pertes classées par gravité (umt-1.5.10, B03_aller + B03_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 1 | 1 | player.xp_level 1 |
| **MAJEUR** | 31 | 31 | scoreboard.value 14, world.value 3, entity.identity 2, entity.health 2, scoreboard.presence 2, scoreboard.display_name 2, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1, structure.spawn_zone 1 |
| **MINEUR** | 6 | 6 | entity.position 2, entity.data 2, world.value 2 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

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

### MINEUR — 6 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | world | level_name | world.value | autre donnée de monde | `{"observed":"B03_aller"}` |
| FAIL | world | day_time | world.value | autre donnée de monde | `{"observed":null}` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 1 | 1 | player.xp_level 1 |
| **MAJEUR** | 59 | 44 | entity.data 15, scoreboard.value 15, entity.equipment 5, world.value 4, entity.identity 3, entity.health 3, block.state 2, block_entity.presence 2, scoreboard.presence 2, scoreboard.display_name 2, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1, structure.spawn_zone 1 |
| **MINEUR** | 109 | 20 | block_entity.data 56, entity.data 38, entity.position 9, item_stack.identity 2, item_stack.count 2, world.value 2 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 39 | 7 | block_entity.data 25, entity.data 7, entity.equipment 7 |

### CRITIQUE — 1 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | player ~local_player | ~local_player | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 59 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:purpur_block | the_end 82 49 7 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"pillar_axis":"x -> y"}}` |
| FAIL | block minecraft:purpur_block | the_end 86 49 7 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"pillar_axis":"z -> y"}}` |
| FAIL | block_entity SporeBlossom | overworld 1309 -3 -765 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity Lodestone | the_nether -7 64 9 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1269.5 64 -823.1 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphaned","IsOutOfControl","IsPregnant","IsRoar…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1282.4 64 -802.6 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphaned","IsOutOfControl","IsPregnant","IsRoar…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1284.1 63.6 -814.5 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphaned","IsOutOfControl","IsPregnant","IsRoar…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1304.1 63 -809.6 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphaned","IsOutOfControl","IsPregnant","IsRoar…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1304.5 67 -839.1 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphaned","IsOutOfControl","IsPregnant","IsRoar…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1313.5 68 -824.7 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphaned","IsOutOfControl","IsPregnant","IsRoar…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 1320.5 66 -842.3 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphaned","IsOutOfControl","IsPregnant","IsRoar…` |
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:ender_dragon | the_end -12.6 81.6 17.7 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","Chested","Color","Color2","Dead","IsAngry","IsAutonomous","IsBaby","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","IsSwimming","IsTamed…` |
| PARTIAL | entity minecraft:hoglin | the_nether 21.2 81.3 48.1 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","GrowthPaused","InLove","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","I…` |
| PARTIAL | entity minecraft:piglin | the_nether -32.3 47 -6.5 | entity.data | clé Variant | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","I…` |
| FAIL | entity minecraft:piglin | the_nether -32.2 46 -5.7 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":["head:minecraft:golden_helmetx1","chest:golden_chestplatex1","mainhand:minecraft:golden_swordx1"],"wrong":[{"id":"minecraft:golden_helmet","expected_slot":"head","observed":"minecraft:golden_helmet","differs":["WasPickedUp"],"technical":true},{"id…` |
| PARTIAL | entity minecraft:piglin | the_nether -32.2 46 -5.7 | entity.data | clé Variant | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","I…` |
| PARTIAL | entity minecraft:piglin | the_nether -32.2 86 29.5 | entity.data | clé Variant | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","I…` |
| PARTIAL | entity minecraft:piglin | the_nether -32 55 -16.3 | entity.data | clé Variant | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","I…` |
| FAIL | entity minecraft:piglin | the_nether 17 64 -11.5 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":["head:minecraft:golden_helmetx1","chest:golden_chestplatex1","legs:minecraft:golden_leggingsx1","feet:minecraft:golden_bootsx1","mainhand:minecraft:crossbowx1"],"wrong":[{"id":"minecraft:golden_helmet","expected_slot":"head","observed":"minecraft:…` |
| FAIL | entity minecraft:piglin | the_nether 19.3 80 45.4 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":["head:minecraft:golden_helmetx1","chest:golden_chestplatex1","mainhand:minecraft:golden_swordx1"],"wrong":[{"id":"minecraft:golden_helmet","expected_slot":"head","observed":"minecraft:golden_helmet","differs":["WasPickedUp"],"technical":true},{"id…` |
| PARTIAL | entity minecraft:piglin | the_nether 19.3 80 45.4 | entity.data | clé Variant | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","I…` |
| FAIL | entity minecraft:piglin | the_nether 43.5 65 10.3 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":["head:minecraft:golden_helmetx1","chest:golden_chestplatex1","legs:minecraft:golden_leggingsx1","mainhand:minecraft:crossbowx1"],"wrong":[{"id":"minecraft:golden_helmet","expected_slot":"head","observed":"minecraft:golden_helmet","differs":["WasPi…` |
| PARTIAL | entity minecraft:piglin | the_nether 48.1 68 20.6 | entity.data | clé Variant | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","I…` |
| FAIL | entity minecraft:zombie_pigman | the_nether 17.8 80 48.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie_pigman | the_nether 17.8 80 48.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie_pigman | the_nether 17.8 80 48.2 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | world | hardcore | world.value | réglage majeur du monde | `{"observed":"absent"}` |
| FAIL | world | ticking_area | world.value | zones chargées en permanence (fermes, horloges) | `{"observed":"absent"}` |
| FAIL | world | ticking_area | world.value | zones chargées en permanence (fermes, horloges) | `{"observed":"absent"}` |
| FAIL | world | ticking_area | world.value | zones chargées en permanence (fermes, horloges) | `{"observed":"absent"}` |
| FAIL | scoreboard mccb_sys |  | scoreboard.presence | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys |  | scoreboard.display_name | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_timer |  | scoreboard.presence | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_timer |  | scoreboard.display_name | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_sys | mccb_sys | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| … | 19 autres (liste complète dans le JSON) | | | | |

### MINEUR — 109 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity MobSpawner | overworld 1324 -56 -773 | block_entity.data | clé DisplayEntityHeight | `{"differing_keys":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"differing_count":3,"lost":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"added":[],"changed":[],"sample":{"DisplayEntityHeight":["[\"n\",\"1.79999995231628…` |
| PARTIAL | block_entity MobSpawner | overworld 1325 -52 -815 | block_entity.data | clé DisplayEntityHeight | `{"differing_keys":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"differing_count":3,"lost":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"added":[],"changed":[],"sample":{"DisplayEntityHeight":["[\"n\",\"1.79999995231628…` |
| PARTIAL | block_entity MobSpawner | overworld 1257 -31 -781 | block_entity.data | clé DisplayEntityHeight | `{"differing_keys":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"differing_count":3,"lost":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"added":[],"changed":[],"sample":{"DisplayEntityHeight":["[\"n\",\"1.79999995231628…` |
| PARTIAL | block_entity MobSpawner | overworld -53 -29 -6 | block_entity.data | clé DisplayEntityHeight | `{"differing_keys":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"differing_count":3,"lost":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"added":[],"changed":[],"sample":{"DisplayEntityHeight":["[\"n\",\"1.79999995231628…` |
| PARTIAL | block_entity MobSpawner | overworld 1288 -20 -817 | block_entity.data | clé DisplayEntityHeight | `{"differing_keys":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"differing_count":3,"lost":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"added":[],"changed":[],"sample":{"DisplayEntityHeight":["[\"n\",\"1.79999995231628…` |
| PARTIAL | block_entity MobSpawner | overworld -91 -17 23 | block_entity.data | clé DisplayEntityHeight | `{"differing_keys":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"differing_count":3,"lost":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"added":[],"changed":[],"sample":{"DisplayEntityHeight":["[\"n\",\"1.79999995231628…` |
| PARTIAL | block_entity MobSpawner | overworld -34 -13 39 | block_entity.data | clé DisplayEntityHeight | `{"differing_keys":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"differing_count":3,"lost":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"added":[],"changed":[],"sample":{"DisplayEntityHeight":["[\"n\",\"1.79999995231628…` |
| FAIL | block_entity SporeBlossom | overworld 1309 -3 -765 | block_entity.data | données | `{"observed":"no block entity"}` |
| PARTIAL | block_entity MobSpawner | overworld 79 14 3 | block_entity.data | clé DisplayEntityHeight | `{"differing_keys":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"differing_count":3,"lost":["DisplayEntityHeight","DisplayEntityScale","DisplayEntityWidth"],"added":[],"changed":[],"sample":{"DisplayEntityHeight":["[\"n\",\"1.79999995231628…` |
| PARTIAL | block_entity Lectern | overworld 1266 63 -832 | block_entity.data | clé hasBook | `{"differing_keys":["hasBook","page"],"differing_count":2,"lost":[],"added":["hasBook","page"],"changed":[],"sample":{"hasBook":[null,"[\"n\",\"0\"]"],"page":[null,"[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity FlowerPot | overworld 1264 64 -831 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity FlowerPot | overworld 1264 64 -827 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity FlowerPot | overworld 1268 64 -831 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity FlowerPot | overworld 1268 64 -827 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity FlowerPot | overworld 1281 64 -822 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:deadbush\"],\"states\":[\"c\",{}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"name\":[\"s\",\"min…` |
| PARTIAL | block_entity FlowerPot | overworld 1283 64 -820 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:deadbush\"],\"states\":[\"c\",{}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"name\":[\"s\",\"min…` |
| PARTIAL | block_entity FlowerPot | overworld 1285 64 -816 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity FlowerPot | overworld 1298 65 -827 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity Bell | overworld 1300 65 -826 | block_entity.data | clé Ticks | `{"differing_keys":["Direction","Ringing","Ticks"],"differing_count":3,"lost":["Direction","Ringing","Ticks"],"added":[],"changed":[],"sample":{"Direction":["[\"n\",\"0\"]",null],"Ringing":["[\"n\",\"0\"]",null],"Ticks":["[\"n\",\"31\"]",null]}}` |
| PARTIAL | block_entity FlowerPot | overworld 1306 67 -830 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity FlowerPot | overworld 1308 68 -834 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity FlowerPot | overworld 1328 68 -827 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity FlowerPot | overworld 1323 71 -823 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity FlowerPot | overworld 1327 71 -824 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity Chest | overworld -50 199 40 | block_entity.data | clé forceunpair | `{"differing_keys":["forceunpair"],"differing_count":1,"lost":["forceunpair"],"added":[],"changed":[],"sample":{"forceunpair":["[\"n\",\"1\"]",null]}}` |
| PARTIAL | block_entity Barrel | overworld -50 200 16 | block_entity.data | clé forceunpair | `{"differing_keys":["forceunpair"],"differing_count":1,"lost":["forceunpair"],"added":[],"changed":[],"sample":{"forceunpair":["[\"n\",\"1\"]",null]}}` |
| PARTIAL | block_entity CommandBlock | overworld 12 200 38 | block_entity.data | clé LPRedstoneMode | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| PARTIAL | block_entity Chest | overworld 15 200 40 | block_entity.data | clé pairlead | `{"differing_keys":["pairlead"],"differing_count":1,"lost":[],"added":[],"changed":["pairlead"],"sample":{"pairlead":["[\"n\",\"1\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Chest | overworld 16 200 40 | block_entity.data | clé pairlead | `{"differing_keys":["pairlead"],"differing_count":1,"lost":[],"added":[],"changed":["pairlead"],"sample":{"pairlead":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 -12 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 -6 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 0 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 6 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| PARTIAL | block_entity CommandBlock | overworld 29 200 6 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| PARTIAL | block_entity CommandBlock | overworld 30 200 0 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| PARTIAL | block_entity CommandBlock | overworld 31 200 0 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| PARTIAL | block_entity CommandBlock | overworld 32 200 -12 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| PARTIAL | block_entity CommandBlock | overworld 32 200 -6 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| PARTIAL | block_entity CommandBlock | overworld 32 200 0 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| PARTIAL | block_entity CommandBlock | overworld 34 200 0 | block_entity.data | clé ExecuteOnFirstTick | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| … | 69 autres (liste complète dans le JSON) | | | | |

