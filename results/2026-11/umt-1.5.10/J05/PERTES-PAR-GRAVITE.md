# J05@1.0 — pertes classées par gravité (umt-1.5.10, J05_aller + J05_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 10 | 10 | item_stack.identity 4, item_stack.count 4, player.xp_level 1, player.inventory 1 |
| **MAJEUR** | 96 | 94 | scoreboard.value 81, entity.identity 3, block_entity.presence 1, entity.equipment 1, entity.data 1, world.value 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1, player.spawn_point 1 |
| **MINEUR** | 8 | 8 | entity.position 3, entity.data 3, world.value 2 |
| **ÉTAT TEMPORAIRE** | 8 | 8 | block_entity.data 8 |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 10 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:beef | overworld -1 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:beef | overworld -1 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld -1 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld -1 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:salmon | overworld 11 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:salmon | overworld 11 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld 11 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld 11 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | player c7361fde-4983-4733-b2dc-3be58cc7762b | c7361fde-4983-4733-b2dc-3be58cc7762b | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player c7361fde-4983-4733-b2dc-3be58cc7762b | c7361fde-4983-4733-b2dc-3be58cc7762b | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 96 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:beehive | overworld -17 -60 61 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 11 -50 40 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 14 -48 40 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:vindicator | overworld 17.2 -60 -2.2 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":["head:minecraft:bannerx1","mainhand:minecraft:iron_axex1"],"wrong":[{"id":"minecraft:white_banner","expected_slot":"chest","observed":null,"found_in_slot":"head"}]}` |
| PARTIAL | entity minecraft:vindicator | overworld 17.2 -60 -2.2 | entity.data | clé PatrolLeader | `{"compared":3,"not_compared":["CanJoinRaid","Health","Invulnerable","Patrolling","PersistenceRequired","RaidId","Wave","attributes","drop_chances","id"],"not_compared_count":10,"java_only":["AbsorptionAmount","CanPickUpLoot","FallFlying","LeftHanded"],"unprove…` |
| FAIL | world | hardcore | world.value | réglage majeur du monde | `{"observed":null}` |
| FAIL | scoreboard mccb_t01 |  | scoreboard.presence | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 |  | scoreboard.display_name | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| FAIL | scoreboard mccb_t01 | mccb_t01 | scoreboard.value | tableau des scores (objectifs, scores, affichage) | `{"observed":"no scoreboard"}` |
| … | 56 autres (liste complète dans le JSON) | | | | |

### MINEUR — 8 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 11 -50 40 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 11 -50 40 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 14 -48 40 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 14 -48 40 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | world | level_name | world.value | autre donnée de monde | `{"observed":"J05_aller"}` |
| FAIL | world | day_time | world.value | autre donnée de monde | `{"observed":0}` |

### ÉTAT TEMPORAIRE — 8 (direct)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:furnace | overworld -17 -60 20 | block_entity.data | clé lit_total_time | `{"compared":3,"not_compared":["RecipesUsed","components","cooking_total_time","id","speed_multiplier"],"not_compared_count":5,"differing_keys":["cooking_time_spent","lit_time_remaining","lit_total_time"],"differing_count":3,"lost":["lit_total_time"],"changed":…` |
| FAIL | block_entity minecraft:blast_furnace | overworld -9 -60 20 | block_entity.data | clé lit_total_time | `{"compared":3,"not_compared":["RecipesUsed","components","cooking_total_time","id","speed_multiplier"],"not_compared_count":5,"differing_keys":["cooking_time_spent","lit_time_remaining","lit_total_time"],"differing_count":3,"lost":["lit_total_time"],"changed":…` |
| FAIL | block_entity minecraft:furnace | overworld -9 -60 75 | block_entity.data | clé lit_total_time | `{"compared":3,"not_compared":["RecipesUsed","components","cooking_total_time","id","speed_multiplier"],"not_compared_count":5,"differing_keys":["cooking_time_spent","lit_time_remaining","lit_total_time"],"differing_count":3,"lost":["lit_total_time"],"changed":…` |
| FAIL | block_entity minecraft:smoker | overworld -1 -60 20 | block_entity.data | clé lit_total_time | `{"compared":3,"not_compared":["RecipesUsed","components","cooking_total_time","id","speed_multiplier"],"not_compared_count":5,"differing_keys":["cooking_time_spent","lit_time_remaining","lit_total_time"],"differing_count":3,"lost":["lit_total_time"],"changed":…` |
| FAIL | block_entity minecraft:smoker | overworld 11 -60 20 | block_entity.data | clé lit_total_time | `{"compared":3,"not_compared":["RecipesUsed","components","cooking_total_time","id","speed_multiplier"],"not_compared_count":5,"differing_keys":["cooking_time_spent","lit_time_remaining","lit_total_time"],"differing_count":3,"lost":["lit_total_time"],"changed":…` |
| FAIL | block_entity minecraft:brewing_stand | overworld 19 -60 20 | block_entity.data | clé Fuel | `{"compared":3,"not_compared":["components","id","speed_multiplier","total_brew_time","total_fuel"],"not_compared_count":5,"differing_keys":["BrewTime","Fuel"],"differing_count":3,"lost":["Fuel"],"changed":["BrewTime","Fuel"],"sample":{"BrewTime#0":[200,0],"Fue…` |
| FAIL | block_entity minecraft:brewing_stand | overworld 27 -60 20 | block_entity.data | clé Fuel | `{"compared":3,"not_compared":["components","id","speed_multiplier","total_brew_time","total_fuel"],"not_compared_count":5,"differing_keys":["BrewTime","Fuel"],"differing_count":3,"lost":["Fuel"],"changed":["BrewTime","Fuel"],"sample":{"BrewTime#0":[340,0],"Fue…` |
| FAIL | block_entity minecraft:furnace | overworld -1 -59 61 | block_entity.data | clé lit_total_time | `{"compared":3,"not_compared":["RecipesUsed","components","cooking_total_time","id","speed_multiplier"],"not_compared_count":5,"differing_keys":["cooking_time_spent","lit_time_remaining","lit_total_time"],"differing_count":3,"lost":["lit_total_time"],"changed":…` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 13 | 13 | item_stack.identity 4, item_stack.count 4, block_entity.sign_text 2, block_entity.lectern_book 1, player.xp_level 1, player.inventory 1 |
| **MAJEUR** | 227 | 134 | entity.data 89, scoreboard.value 81, block.state 34, entity.health 6, entity.identity 4, block_entity.data 3, block_entity.presence 1, entity.equipment 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1, player.spawn_point 1 |
| **MINEUR** | 39 | 19 | entity.data 21, entity.position 8, world.value 6, block_entity.data 4 |
| **ÉTAT TEMPORAIRE** | 11 | 0 | block_entity.data 11 |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 13 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | overworld -9 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":{"front":["23 ZOMBIE CURE","400t LEFT","ROOFED CELL","CHECK NATIVE "],"back":["","","",""]}}` |
| FAIL | block_entity minecraft:lectern | overworld 5 -60 15 | block_entity.lectern_book | texte de panneau, livre de pupitre ou commande | `block_entity.lectern_book.roundtrip` |
| FAIL | block_entity minecraft:sign | overworld 49 -60 13 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":{"front":["MCCB T01 ","VILLAGE","6 VILLAGERS","6 BEDS + 6 JOBS"],"back":["","","",""]}}` |
| FAIL | item_stack minecraft:beef | overworld -1 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:beef | overworld -1 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld -1 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld -1 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:salmon | overworld 11 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:salmon | overworld 11 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld 11 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld 11 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | player c7361fde-4983-4733-b2dc-3be58cc7762b | c7361fde-4983-4733-b2dc-3be58cc7762b | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player c7361fde-4983-4733-b2dc-3be58cc7762b | c7361fde-4983-4733-b2dc-3be58cc7762b | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 227 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:oak_sign | overworld -19 -60 45 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 17 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 27 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 36 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 58 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 71 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 17 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 27 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:soul_campfire | overworld -9 -60 30 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> south"}}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 36 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 58 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 71 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -1 -60 17 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -1 -60 27 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -1 -60 36 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld -1 -60 58 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 3 -60 12 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 11 -60 17 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 11 -60 27 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:soul_campfire | overworld 11 -60 30 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> south"}}` |
| FAIL | block minecraft:oak_sign | overworld 11 -60 36 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 11 -60 58 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:sculk_sensor | overworld 11 -60 61 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"power":"12 -> 1"}}` |
| FAIL | block minecraft:oak_sign | overworld 19 -60 17 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 19 -60 27 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 19 -60 36 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 19 -60 58 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 27 -60 17 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 27 -60 27 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 27 -60 36 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 27 -60 58 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 27 -60 71 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 29 -60 45 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_sign | overworld 49 -60 13 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block_entity minecraft:beehive | overworld -17 -60 61 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| PARTIAL | block_entity minecraft:sign | overworld -9 -60 58 | block_entity.data | clé front_text | `{"differing_keys":["front_text"],"differing_count":1,"lost":[],"added":[],"changed":["front_text"],"sample":{"front_text":["[\"c\",{\"color\":[\"s\",\"black\"],\"has_glowing_text\":[\"n\",\"1\"],\"messages\":[\"l\",[[\"s\",\"23 ZOMBIE CURE\"],[\"s\",\"400t LEF…` |
| PARTIAL | block_entity minecraft:lectern | overworld 5 -60 15 | block_entity.data | clé Book | `{"differing_keys":["Book"],"differing_count":1,"lost":[],"added":[],"changed":["Book"],"sample":{"Book":["[\"c\",{\"components\":[\"c\",{\"minecraft:written_book_content\":[\"c\",{\"author\":[\"s\",\"MCCB\"],\"pages\":[\"l\",[[\"c\",{\"raw\":[\"s\",\"J05 / JAV…` |
| PARTIAL | block_entity minecraft:sign | overworld 49 -60 13 | block_entity.data | clé front_text | `{"differing_keys":["front_text"],"differing_count":1,"lost":[],"added":[],"changed":["front_text"],"sample":{"front_text":["[\"c\",{\"color\":[\"s\",\"black\"],\"has_glowing_text\":[\"n\",\"1\"],\"messages\":[\"l\",[[\"s\",\"MCCB T01 VILLAGE\"],[\"s\",\"6 VILL…` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.data | clé attributes | `{"differing_keys":["Dimension","Health","IsChickenJockey","attributes","sound_variant"],"differing_count":5,"lost":["IsChickenJockey","sound_variant"],"added":["Dimension"],"changed":["Health","attributes"]}` |
| … | 187 autres (liste complète dans le JSON) | | | | |

### MINEUR — 39 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:beehive | overworld -17 -60 61 | block_entity.data | données | `{"observed":"no block entity"}` |
| PARTIAL | block_entity minecraft:blast_furnace | overworld -9 -60 20 | block_entity.data | clé speed_multiplier | `{"differing_keys":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time","speed_multiplier"],"differing_count":5,"lost":[],"added":[],"changed":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time","speed_mu…` |
| PARTIAL | block_entity minecraft:smoker | overworld -1 -60 20 | block_entity.data | clé speed_multiplier | `{"differing_keys":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time","speed_multiplier"],"differing_count":5,"lost":[],"added":[],"changed":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time","speed_mu…` |
| PARTIAL | block_entity minecraft:smoker | overworld 11 -60 20 | block_entity.data | clé speed_multiplier | `{"differing_keys":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time","speed_multiplier"],"differing_count":5,"lost":[],"added":[],"changed":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time","speed_mu…` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.data | données | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:experience_orb | overworld -29.2 -60 39.9 | entity.data | clé Count | `{"differing_keys":["Count","Dimension","Health"],"differing_count":3,"lost":["Count","Health"],"added":["Dimension"],"changed":[]}` |
| PARTIAL | entity minecraft:experience_orb | overworld -27.7 -60 41.9 | entity.data | clé Count | `{"differing_keys":["Count","Dimension","Health"],"differing_count":3,"lost":["Count","Health"],"added":["Dimension"],"changed":[]}` |
| PARTIAL | entity minecraft:experience_orb | overworld 74.2 -60 56.6 | entity.data | clé Count | `{"differing_keys":["Count","Dimension","Health"],"differing_count":3,"lost":["Count","Health"],"added":["Dimension"],"changed":[]}` |
| PARTIAL | entity minecraft:experience_orb | overworld 78.8 -60 42 | entity.data | clé Count | `{"differing_keys":["Count","Dimension","Health"],"differing_count":3,"lost":["Count","Health"],"added":["Dimension"],"changed":[]}` |
| PARTIAL | entity minecraft:experience_orb | overworld 114.3 -60 54.5 | entity.data | clé Count | `{"differing_keys":["Count","Dimension","Health"],"differing_count":3,"lost":["Count","Health"],"added":["Dimension"],"changed":[]}` |
| FAIL | entity minecraft:falling_block | overworld 11 -50 40 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 11 -50 40 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 14 -48 40 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 14 -48 40 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -28 -60 36.6 | entity.position | position d'une créature | `{"delta":[0,-0.125,0]}` |
| PARTIAL | entity minecraft:item | overworld -28 -60 36.6 | entity.data | clé Dimension | `{"differing_keys":["Dimension"],"differing_count":1,"lost":[],"added":["Dimension"],"changed":[]}` |
| FAIL | entity minecraft:item | overworld 19 -57 40 | entity.position | position d'une créature | `{"delta":[0,-0.125,0]}` |
| PARTIAL | entity minecraft:item | overworld 19 -57 40 | entity.data | clé Tags | `{"differing_keys":["Dimension","PickupDelay","Tags"],"differing_count":3,"lost":["Tags"],"added":["Dimension"],"changed":["PickupDelay"]}` |
| FAIL | entity minecraft:item | overworld 27 -57 61 | entity.position | position d'une créature | `{"delta":[0,-0.125,0]}` |
| PARTIAL | entity minecraft:item | overworld 27 -57 61 | entity.data | clé Tags | `{"differing_keys":["Dimension","PickupDelay","Tags"],"differing_count":3,"lost":["Tags"],"added":["Dimension"],"changed":["PickupDelay"]}` |
| FAIL | entity minecraft:item | overworld 64.2 -60 25 | entity.position | position d'une créature | `{"delta":[0,-0.125,0]}` |
| FAIL | entity minecraft:marker | overworld 5 -60 7 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:marker | overworld 5 -60 7 | entity.data | données | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:minecart | overworld 27 -59.8 40 | entity.data | clé Tags | `{"differing_keys":["Dimension","FlippedRotation","HasTicked","Tags"],"differing_count":4,"lost":["FlippedRotation","HasTicked","Tags"],"added":["Dimension"],"changed":[]}` |
| PARTIAL | entity minecraft:tnt | overworld -1 -47 41 | entity.data | clé Tags | `{"differing_keys":["Dimension","Tags","block_state","explosion_power"],"differing_count":4,"lost":["Tags","block_state"],"added":["Dimension","explosion_power"],"changed":[]}` |
| PARTIAL | entity minecraft:tnt | overworld 27 -42 76 | entity.data | clé Tags | `{"differing_keys":["Dimension","Tags","block_state","explosion_power"],"differing_count":4,"lost":["Tags","block_state"],"added":["Dimension","explosion_power"],"changed":[]}` |
| PARTIAL | entity minecraft:villager | overworld 41.8 -59.4 19.8 | entity.data | clé LastGossipDecay | `{"differing_keys":["Dimension","FoodLevel","Gossips","InLove","Inventory","LastGossipDecay","LastRestock","RestocksToday","Tags","VillagerDataFinalized","attributes"],"differing_count":11,"lost":["FoodLevel","Gossips","Inventory","LastGossipDecay","LastRestock…` |
| PARTIAL | entity minecraft:villager | overworld 43.3 -60 29.6 | entity.data | clé LastGossipDecay | `{"differing_keys":["Dimension","FoodLevel","Gossips","InLove","Inventory","LastGossipDecay","LastRestock","RestocksToday","Tags","VillagerDataFinalized","attributes"],"differing_count":11,"lost":["FoodLevel","Gossips","Inventory","LastGossipDecay","LastRestock…` |
| PARTIAL | entity minecraft:villager | overworld 48.6 -59.4 20.6 | entity.data | clé LastGossipDecay | `{"differing_keys":["Dimension","FoodLevel","Gossips","InLove","Inventory","LastGossipDecay","LastRestock","RestocksToday","Tags","VillagerDataFinalized","attributes"],"differing_count":11,"lost":["FoodLevel","Gossips","Inventory","LastGossipDecay","LastRestock…` |
| PARTIAL | entity minecraft:villager | overworld 48.6 -59.4 30.5 | entity.data | clé LastGossipDecay | `{"differing_keys":["Dimension","FoodLevel","Gossips","InLove","Inventory","LastGossipDecay","LastRestock","RestocksToday","Tags","VillagerDataFinalized","attributes"],"differing_count":11,"lost":["FoodLevel","Gossips","Inventory","LastGossipDecay","LastRestock…` |
| PARTIAL | entity minecraft:villager | overworld 55.5 -59.4 20.5 | entity.data | clé LastGossipDecay | `{"differing_keys":["Dimension","FoodLevel","Gossips","InLove","Inventory","LastGossipDecay","LastRestock","RestocksToday","Tags","VillagerDataFinalized","attributes"],"differing_count":11,"lost":["FoodLevel","Gossips","Inventory","LastGossipDecay","LastRestock…` |
| PARTIAL | entity minecraft:villager | overworld 55.6 -59.4 30.5 | entity.data | clé LastGossipDecay | `{"differing_keys":["Dimension","FoodLevel","Gossips","InLove","Inventory","LastGossipDecay","LastRestock","RestocksToday","Tags","VillagerDataFinalized","attributes"],"differing_count":11,"lost":["FoodLevel","Gossips","Inventory","LastGossipDecay","LastRestock…` |
| FAIL | world | level_name | world.value | autre donnée de monde | `{"observed":"J05_retour"}` |
| FAIL | world | day_time | world.value | autre donnée de monde | `{"observed":"absent"}` |
| FAIL | world | gamerule:fire_spread_radius_around_player | world.value | autre donnée de monde | `{"observed":-1}` |
| FAIL | world | java_only:data_packs | world.value | autre donnée de monde | `{"observed":"{\"Enabled\":[\"vanilla\"],\"Disabled\":[]}"}` |
| FAIL | world | java_only:random_sequences | world.value | autre donnée de monde | `{"observed":null}` |
| FAIL | world | overworld world_border | world.value | autre donnée de monde | `{"observed":"{\"center_x\":0,\"center_z\":0,\"damage_per_block\":0.2,\"lerp_target\":60000000,\"lerp_time\":\"0\",\"safe_zone\":5,\"size\":60000000,\"warning_blocks\":5,\"warning_time\":300}"}` |

### ÉTAT TEMPORAIRE — 11 (roundtrip)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:furnace | overworld -17 -60 20 | block_entity.data | clé cooking_time_spent | `{"differing_keys":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time"],"differing_count":4,"lost":[],"added":[],"changed":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time"],"sample":{"cooking_time_spe…` |
| PARTIAL | block_entity minecraft:campfire | overworld -17 -60 30 | block_entity.data | clé CookingTotalTimes | `{"differing_keys":["CookingTotalTimes"],"differing_count":1,"lost":[],"added":[],"changed":["CookingTotalTimes"],"sample":{"CookingTotalTimes":["[\"I\",[[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"]]]","[\"I\",[[\"n\",\"0\"],[\"n\",\"0\"],[\"…` |
| PARTIAL | block_entity minecraft:campfire | overworld -17 -60 75 | block_entity.data | clé CookingTotalTimes | `{"differing_keys":["CookingTotalTimes"],"differing_count":1,"lost":[],"added":[],"changed":["CookingTotalTimes"],"sample":{"CookingTotalTimes":["[\"I\",[[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"]]]","[\"I\",[[\"n\",\"0\"],[\"n\",\"0\"],[\"…` |
| PARTIAL | block_entity minecraft:campfire | overworld -9 -60 30 | block_entity.data | clé CookingTotalTimes | `{"differing_keys":["CookingTotalTimes"],"differing_count":1,"lost":[],"added":[],"changed":["CookingTotalTimes"],"sample":{"CookingTotalTimes":["[\"I\",[[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"]]]","[\"I\",[[\"n\",\"0\"],[\"n\",\"0\"],[\"…` |
| PARTIAL | block_entity minecraft:furnace | overworld -9 -60 75 | block_entity.data | clé cooking_time_spent | `{"differing_keys":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time"],"differing_count":4,"lost":[],"added":[],"changed":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time"],"sample":{"cooking_time_spe…` |
| PARTIAL | block_entity minecraft:campfire | overworld -1 -60 30 | block_entity.data | clé CookingTotalTimes | `{"differing_keys":["CookingTotalTimes"],"differing_count":1,"lost":[],"added":[],"changed":["CookingTotalTimes"],"sample":{"CookingTotalTimes":["[\"I\",[[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"]]]","[\"I\",[[\"n\",\"0\"],[\"n\",\"0\"],[\"…` |
| PARTIAL | block_entity minecraft:campfire | overworld 11 -60 30 | block_entity.data | clé CookingTotalTimes | `{"differing_keys":["CookingTotalTimes"],"differing_count":1,"lost":[],"added":[],"changed":["CookingTotalTimes"],"sample":{"CookingTotalTimes":["[\"I\",[[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"]]]","[\"I\",[[\"n\",\"0\"],[\"n\",\"0\"],[\"…` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 11 -60 61 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:brewing_stand | overworld 19 -60 20 | block_entity.data | clé BrewTime | `{"differing_keys":["BrewTime","Fuel"],"differing_count":2,"lost":[],"added":[],"changed":["BrewTime","Fuel"],"sample":{"BrewTime":["[\"n\",\"200\"]","[\"n\",\"0\"]"],"Fuel":["[\"n\",\"10\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity minecraft:brewing_stand | overworld 27 -60 20 | block_entity.data | clé BrewTime | `{"differing_keys":["BrewTime","Fuel"],"differing_count":2,"lost":[],"added":[],"changed":["BrewTime","Fuel"],"sample":{"BrewTime":["[\"n\",\"340\"]","[\"n\",\"0\"]"],"Fuel":["[\"n\",\"10\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity minecraft:furnace | overworld -1 -59 61 | block_entity.data | clé cooking_time_spent | `{"differing_keys":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time"],"differing_count":4,"lost":[],"added":[],"changed":["cooking_time_spent","cooking_total_time","lit_time_remaining","lit_total_time"],"sample":{"cooking_time_spe…` |

