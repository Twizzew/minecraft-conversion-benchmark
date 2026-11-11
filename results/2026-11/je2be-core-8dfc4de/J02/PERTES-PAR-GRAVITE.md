# J02@2.0 — pertes classées par gravité (je2be-core-8dfc4de, J02_aller + J02_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 161 | 161 | item_stack.identity 59, item_stack.count 59, entity.tamed 18, entity.inventory 14, entity.trades 9, world.value 1, player.xp_level 1 |
| **MAJEUR** | 1749 | 1749 | entity.identity 567, entity.custom_name 544, entity.health 487, block.identity 64, block_entity.presence 26, entity.equipment 15, structure.spawn_zone 10, entity.baby 9, block_entity.custom_name 7, scoreboard.value 7, world.value 6, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 1129 | 1129 | entity.position 563, entity.data 563, world.value 3 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 161 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:diamond_sword | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bow | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bow | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bread | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bread | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_helmet | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_helmet | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_chestplate | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_chestplate | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_leggings | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_leggings | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_boots | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_boots | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:ender_pearl | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:ender_pearl | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:golden_carrot | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:golden_carrot | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shulker_box | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shulker_box | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bow | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bow | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bread | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bread | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_helmet | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_helmet | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_chestplate | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_chestplate | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_leggings | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_leggings | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_boots | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_boots | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:ender_pearl | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:ender_pearl | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| … | 121 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 1749 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:lodestone | overworld 3 98 3 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 7 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 21 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 35 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 49 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 63 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 77 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 91 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:ender_chest | overworld 8 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 12 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 18 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 18 101 185 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:ender_chest | overworld 36 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 40 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 46 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 46 101 185 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:ender_chest | overworld 64 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 68 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 74 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 74 101 185 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:soul_sand | overworld 130 101 192 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 132 101 16 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 132 101 17 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:composter | overworld 132 101 21 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:blue_bed | overworld 136 101 16 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:blue_bed | overworld 136 101 17 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:lectern | overworld 136 101 21 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:bell | overworld 137 101 20 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_door | overworld 139 101 10 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:green_bed | overworld 140 101 16 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:green_bed | overworld 140 101 17 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:blast_furnace | overworld 140 101 21 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:yellow_bed | overworld 144 101 16 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:yellow_bed | overworld 144 101 17 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:fletching_table | overworld 144 101 21 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:spawner | overworld 158 101 138 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:trial_spawner | overworld 158 101 150 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:vault | overworld 158 101 190 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 160 101 14 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 166 101 118 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| … | 1709 autres (liste complète dans le JSON) | | | | |

### MINEUR — 1129 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:acacia_boat « LIV-VEHICLE-001 » | overworld 7.5 101 139.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_boat « LIV-VEHICLE-001 » | overworld 7.5 101 139.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_chest_boat « LIV-VEHICLE-002 » | overworld 17.5 101 139.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_chest_boat « LIV-VEHICLE-002 » | overworld 17.5 101 139.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « J02 26.3 ANNEX /function mccb_living:ann » | overworld 4.5 196.5 4.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « J02 26.3 ANNEX /function mccb_living:ann » | overworld 4.5 196.5 4.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « MCCB J02 LIVING — JAVA 26.3 » | overworld 5 103 5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « MCCB J02 LIVING — JAVA 26.3 » | overworld 5 103 5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « Run verify before freezing source » | overworld 5 102.4 9 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « Run verify before freezing source » | overworld 5 102.4 9 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-001 » | overworld 5 105.2 31.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-001 » | overworld 5 105.2 31.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-013 » | overworld 5 105.2 40.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-013 » | overworld 5 105.2 40.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-025 » | overworld 5 105.2 49.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-025 » | overworld 5 105.2 49.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-037 » | overworld 5 105.2 58.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-037 » | overworld 5 105.2 58.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-049 » | overworld 5 105.2 67.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-049 » | overworld 5 105.2 67.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-061 » | overworld 5 105.2 76.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-061 » | overworld 5 105.2 76.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-001 » | overworld 7 104 136.8 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-001 » | overworld 7 104 136.8 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-011 » | overworld 7 104 149.8 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-011 » | overworld 7 104 149.8 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-021 » | overworld 7 104 158.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-021 » | overworld 7 104 158.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-001 » | overworld 8 106 101.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-001 » | overworld 8 106 101.5 | entity.data | données | `{"observed":"no matching entity"}` |
| … | 1089 autres (liste complète dans le JSON) | | | | |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 161 | 161 | item_stack.identity 59, item_stack.count 59, entity.tamed 18, entity.inventory 14, entity.trades 9, world.value 1, player.xp_level 1 |
| **MAJEUR** | 1843 | 1843 | entity.identity 582, entity.custom_name 563, entity.health 490, block.identity 64, block.state 55, block_entity.presence 26, entity.equipment 17, structure.spawn_zone 10, entity.baby 9, block_entity.custom_name 7, scoreboard.value 7, world.value 6, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 1202 | 1202 | entity.position 582, entity.data 582, block_entity.data 26, world.value 12 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 161 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:diamond_sword | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bow | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bow | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bread | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bread | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_helmet | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_helmet | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_chestplate | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_chestplate | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_leggings | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_leggings | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_boots | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_boots | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:ender_pearl | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:ender_pearl | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:golden_carrot | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:golden_carrot | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shulker_box | overworld 12 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shulker_box | overworld 12 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bow | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bow | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bread | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bread | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_helmet | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_helmet | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_chestplate | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_chestplate | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_leggings | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_leggings | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_boots | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_boots | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:ender_pearl | overworld 40 101 184 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:ender_pearl | overworld 40 101 184 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| … | 121 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 1843 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:lodestone | overworld 3 98 3 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 7 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 7 100 161 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 21 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 21 100 161 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 35 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 35 100 161 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 49 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 49 100 161 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 63 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 63 100 161 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 77 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 77 100 161 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 91 100 161 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:rail | overworld 91 100 161 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:ender_chest | overworld 8 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:ender_chest | overworld 8 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 12 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 12 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 18 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 18 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 18 101 185 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 18 101 185 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:ender_chest | overworld 36 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:ender_chest | overworld 36 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 40 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 40 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 46 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 46 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 46 101 185 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 46 101 185 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:ender_chest | overworld 64 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:ender_chest | overworld 64 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 68 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 68 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 74 101 184 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 74 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 74 101 185 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:red_bed | overworld 74 101 185 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:soul_sand | overworld 130 101 192 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| … | 1803 autres (liste complète dans le JSON) | | | | |

### MINEUR — 1202 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:ender_chest | overworld 8 101 184 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chest « PLAYER-A KIT » | overworld 12 101 184 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:ender_chest | overworld 36 101 184 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chest « PLAYER-B KIT » | overworld 40 101 184 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:ender_chest | overworld 64 101 184 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chest « PLAYER-C KIT » | overworld 68 101 184 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:lectern | overworld 136 101 21 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:bell | overworld 137 101 20 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:blast_furnace | overworld 140 101 21 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:mob_spawner | overworld 158 101 138 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:trial_spawner | overworld 158 101 150 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 158 101 190 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel « RAID SUPPLIES » | overworld 160 101 14 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel « PET SUPPLIES » | overworld 166 101 118 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:mob_spawner | overworld 190 101 138 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:trial_spawner | overworld 190 101 150 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 190 101 190 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:trial_spawner | overworld 222 101 150 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 222 101 190 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel « LEASH SUPPLY » | overworld 230 101 36 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel « TRIAL SUPPLIES » | overworld 235 101 190 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 12 220 14 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 30 220 14 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 48 220 14 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:ender_chest | the_end 0 99 0 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:ender_chest | the_nether 2 99 0 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | entity minecraft:acacia_boat « LIV-VEHICLE-001 » | overworld 7.5 101 139.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_boat « LIV-VEHICLE-001 » | overworld 7.5 101 139.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_chest_boat « LIV-VEHICLE-002 » | overworld 17.5 101 139.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_chest_boat « LIV-VEHICLE-002 » | overworld 17.5 101 139.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.data | données | `{"observed":"no matching entity"}` |
| … | 1162 autres (liste complète dans le JSON) | | | | |

