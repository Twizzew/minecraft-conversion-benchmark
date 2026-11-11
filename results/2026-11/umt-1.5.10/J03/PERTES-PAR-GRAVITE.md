# J03@2.0 — pertes classées par gravité (umt-1.5.10, J03_aller + J03_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 33 | 33 | item_stack.identity 16, item_stack.count 16, player.xp_level 1 |
| **MAJEUR** | 2919 | 2744 | structure.spawn_zone 2131, block_entity.data 458, block_entity.presence 206, scoreboard.value 79, entity.identity 30, scoreboard.presence 4, scoreboard.display_name 4, entity.equipment 1, world.value 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 66 | 66 | entity.position 30, entity.data 30, item_stack.identity 2, item_stack.count 2, world.value 2 |
| **ÉTAT TEMPORAIRE** | 4 | 4 | block_entity.data 4 |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 33 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:nether_star | overworld -299999 301 300000 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:netherstar"}` |
| FAIL | item_stack minecraft:nether_star | overworld -299999 301 300000 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:netherstar"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:beef | overworld 1032 301 2 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:beef | overworld 1032 301 2 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld 1032 301 2 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld 1032 301 2 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 134 302 6 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 134 302 6 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | player 5bcbe855-323c-4f1e-a587-5f348834b848 | 5bcbe855-323c-4f1e-a587-5f348834b848 | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 2919 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:chest | overworld -350 -45 63 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["chests/trial_chambers/reward",null]}}` |
| FAIL | block_entity minecraft:chest | overworld -347 -45 55 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["chests/trial_chambers/supply",null]}}` |
| FAIL | block_entity minecraft:chest | overworld -343 -45 87 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["chests/trial_chambers/reward",null]}}` |
| FAIL | block_entity minecraft:chest | overworld 200 -42 101 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["chests/trial_chambers/reward",null]}}` |
| FAIL | block_entity minecraft:chest | overworld 218 -42 91 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["chests/trial_chambers/reward",null]}}` |
| FAIL | block_entity minecraft:dispenser | overworld -323 -40 72 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["dispensers/trial_chambers/chamber",nul…` |
| FAIL | block_entity minecraft:dispenser | overworld -323 -40 77 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["dispensers/trial_chambers/chamber",nul…` |
| FAIL | block_entity minecraft:dispenser | overworld -320 -40 85 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["dispensers/trial_chambers/chamber",nul…` |
| FAIL | block_entity minecraft:vault | overworld -302 -40 52 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | overworld -339 -39 -215 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["dispensers/trial_chambers/chamber",nul…` |
| FAIL | block_entity minecraft:dispenser | overworld -331 -39 -218 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["dispensers/trial_chambers/chamber",nul…` |
| FAIL | block_entity minecraft:vault | overworld -322 -39 72 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld -322 -39 82 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld -336 -38 -217 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld -326 -38 -217 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | overworld 34 -38 -200 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["dispensers/trial_chambers/chamber",nul…` |
| PARTIAL | block_entity minecraft:decorated_pot | overworld -366 -37 55 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/corridor",null]}}` |
| PARTIAL | block_entity minecraft:decorated_pot | overworld -366 -37 59 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/corridor",null]}}` |
| PARTIAL | block_entity minecraft:decorated_pot | overworld -365 -37 59 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/corridor",null]}}` |
| FAIL | block_entity minecraft:decorated_pot | overworld -364 -37 55 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable","sherds"],"differing_count":3,"lost":["LootTable"],"changed":["sherds"],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/c…` |
| FAIL | block_entity minecraft:decorated_pot | overworld -361 -37 59 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable","sherds"],"differing_count":3,"lost":["LootTable"],"changed":["sherds"],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/c…` |
| FAIL | block_entity minecraft:decorated_pot | overworld -359 -37 59 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable","sherds"],"differing_count":3,"lost":["LootTable"],"changed":["sherds"],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/c…` |
| PARTIAL | block_entity minecraft:decorated_pot | overworld -351 -37 59 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/corridor",null]}}` |
| PARTIAL | block_entity minecraft:decorated_pot | overworld -349 -37 59 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/corridor",null]}}` |
| FAIL | block_entity minecraft:decorated_pot | overworld -336 -37 82 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable","sherds"],"differing_count":3,"lost":["LootTable"],"changed":["sherds"],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/c…` |
| PARTIAL | block_entity minecraft:decorated_pot | overworld -332 -37 82 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/corridor",null]}}` |
| FAIL | block_entity minecraft:barrel | overworld -332 -37 83 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["chests/trial_chambers/corridor",null]}…` |
| PARTIAL | block_entity minecraft:decorated_pot | overworld -332 -37 86 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/corridor",null]}}` |
| FAIL | block_entity minecraft:trial_spawner | overworld -310 -37 52 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 35 -37 -205 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 35 -37 -195 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | overworld 143 -37 130 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["dispensers/trial_chambers/chamber",nul…` |
| FAIL | block_entity minecraft:vault | overworld 156 -37 121 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 615 -37 49 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld -2 -36 -237 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| PARTIAL | block_entity minecraft:decorated_pot | overworld -367 -35 53 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/corridor",null]}}` |
| PARTIAL | block_entity minecraft:decorated_pot | overworld -365 -35 50 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/corridor",null]}}` |
| FAIL | block_entity minecraft:decorated_pot | overworld -364 -35 64 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable","sherds"],"differing_count":3,"lost":["LootTable"],"changed":["sherds"],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/c…` |
| FAIL | block_entity minecraft:barrel | overworld -363 -35 61 | block_entity.data | clé LootTable | `{"compared":2,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["chests/trial_chambers/corridor",null]}…` |
| PARTIAL | block_entity minecraft:decorated_pot | overworld -362 -35 61 | block_entity.data | clé LootTable | `{"compared":3,"not_compared":["LootTableSeed","components","id"],"not_compared_count":3,"differing_keys":["LootTable"],"differing_count":2,"lost":["LootTable"],"changed":[],"sample":{"LootTable#0":[1,null],"LootTable#1":["pots/trial_chambers/corridor",null]}}` |
| … | 2879 autres (liste complète dans le JSON) | | | | |

### MINEUR — 66 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:emerald | overworld 15 301 44 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:gold_ingot","found_in_slot":0,"expected_slot":27,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:emerald | overworld 15 301 44 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:gold_ingot","found_in_slot":0,"expected_slot":27,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:gold_ingot | overworld 16 301 44 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:emerald","found_in_slot":27,"expected_slot":0,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:gold_ingot | overworld 16 301 44 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:emerald","found_in_slot":27,"expected_slot":0,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | entity minecraft:falling_block | overworld -1878.5 52 672.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1878.5 52 672.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1239.5 22 243.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1239.5 22 243.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1239.5 22 244.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1239.5 22 244.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1239.5 21 245.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1239.5 21 245.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1239.5 22 245.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1239.5 22 245.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1239.5 23 245.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1239.5 23 245.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1238.5 23 244.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1238.5 23 244.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1238.5 23 245.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1238.5 23 245.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1238.5 24 245.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1238.5 24 245.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1238.5 24 246.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1238.5 24 246.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1021.5 -32 1053.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -1021.5 -32 1053.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -899.5 24 803.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -899.5 24 803.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -899.5 25 803.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -899.5 25 803.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -898.5 25 802.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -898.5 25 802.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -898.5 25 803.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -898.5 25 803.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -898.5 25 804.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -898.5 25 804.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -897.5 25 803.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -897.5 25 803.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -897.5 25 804.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld -897.5 25 804.5 | entity.data | données | `{"observed":"no matching entity"}` |
| … | 26 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 4 (direct)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:furnace | overworld 1028 301 2 | block_entity.data | clé lit_total_time | `{"compared":3,"not_compared":["RecipesUsed","components","cooking_total_time","id","speed_multiplier"],"not_compared_count":5,"differing_keys":["cooking_time_spent","lit_time_remaining","lit_total_time"],"differing_count":3,"lost":["lit_total_time"],"changed":…` |
| FAIL | block_entity minecraft:smoker | overworld 1032 301 2 | block_entity.data | clé lit_total_time | `{"compared":3,"not_compared":["RecipesUsed","components","cooking_total_time","id","speed_multiplier"],"not_compared_count":5,"differing_keys":["cooking_time_spent","lit_time_remaining","lit_total_time"],"differing_count":3,"lost":["lit_total_time"],"changed":…` |
| FAIL | block_entity minecraft:blast_furnace | overworld 1036 301 2 | block_entity.data | clé lit_total_time | `{"compared":3,"not_compared":["RecipesUsed","components","cooking_total_time","id","speed_multiplier"],"not_compared_count":5,"differing_keys":["cooking_time_spent","lit_time_remaining","lit_total_time"],"differing_count":3,"lost":["lit_total_time"],"changed":…` |
| FAIL | block_entity minecraft:brewing_stand | overworld 1040 301 2 | block_entity.data | clé Fuel | `{"compared":3,"not_compared":["components","id","speed_multiplier","total_brew_time","total_fuel"],"not_compared_count":5,"differing_keys":["BrewTime","Fuel"],"differing_count":3,"lost":["Fuel"],"changed":["BrewTime","Fuel"],"sample":{"BrewTime#0":[160,0],"Fue…` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 31 | 31 | item_stack.identity 15, item_stack.count 15, player.xp_level 1 |
| **MAJEUR** | 14523 | 14033 | structure.spawn_zone 13647, block_entity.data 457, block_entity.presence 206, scoreboard.value 80, block.state 42, entity.data 33, entity.identity 30, entity.health 13, scoreboard.presence 5, scoreboard.display_name 5, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 729 | 279 | block_entity.data 502, entity.data 184, entity.position 34, world.value 9 |
| **ÉTAT TEMPORAIRE** | 310 | 0 | block_entity.data 310 |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 31 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 114 301 2 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:beef | overworld 1032 301 2 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:beef | overworld 1032 301 2 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld 1032 301 2 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld 1032 301 2 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 134 302 6 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 134 302 6 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | player 5bcbe855-323c-4f1e-a587-5f348834b848 | 5bcbe855-323c-4f1e-a587-5f348834b848 | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 14523 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:chest | overworld -299999 301 300000 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:chest | overworld 13 301 44 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:chest | overworld 34 301 12 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:chest | overworld 36 301 20 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:chest | overworld 54 301 24 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:chest | overworld 69 301 8 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:stone_button | overworld 162 301 1 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 162 301 9 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 166 301 1 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 168 301 9 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 176 301 1 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 176 301 9 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 180 301 1 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 180 301 9 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 184 301 1 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 184 301 9 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 188 301 1 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 188 301 9 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 192 301 1 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 194 301 9 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 198 301 1 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 200 301 9 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 202 301 1 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 206 301 1 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:stone_button | overworld 206 301 9 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:jukebox | overworld 206 301 51 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"has_record":"true -> false"}}` |
| FAIL | block minecraft:stone_button | overworld 210 301 1 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"face":"wall -> ceiling"}}` |
| FAIL | block minecraft:chest | overworld 212 301 2 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:chest | overworld 1045 301 2 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:chest | overworld 17 302 42 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:dispenser | overworld 144 310 53 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> down"}}` |
| FAIL | block minecraft:dropper | overworld 146 310 53 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> down"}}` |
| FAIL | block minecraft:bubble_column | overworld 208 310 36 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"drag":"true -> false"}}` |
| FAIL | block minecraft:redstone_wall_torch | overworld 160 311 50 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> south"}}` |
| FAIL | block minecraft:redstone_wall_torch | overworld 168 311 50 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> south"}}` |
| FAIL | block minecraft:redstone_wall_torch | overworld 176 311 50 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> south"}}` |
| FAIL | block minecraft:redstone_wall_torch | overworld 184 311 50 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> south"}}` |
| FAIL | block minecraft:bubble_column | overworld 208 311 36 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"drag":"true -> false"}}` |
| FAIL | block minecraft:piston | overworld 104 312 38 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> down"}}` |
| FAIL | block minecraft:piston | overworld 112 312 38 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> down"}}` |
| … | 14483 autres (liste complète dans le JSON) | | | | |

### MINEUR — 729 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:mob_spawner | overworld 494 -56 -44 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:skeleton\"]}]}],\"weight\":[\"…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 224 -54 -647 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -231 -53 282 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:spider\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 702 -53 -398 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 703 -53 140 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -200 -52 137 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:skeleton\"]}]}],\"weight\":[\"…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 10 -52 -253 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 767 -52 302 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:spider\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 516 -51 -75 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:cave_spider\"]}]}],\"weight\":…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 628 -51 -585 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:cave_spider\"]}]}],\"weight\":…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -304 -50 -414 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:skeleton\"]}]}],\"weight\":[\"…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -291 -50 382 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 165 -50 -275 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:skeleton\"]}]}],\"weight\":[\"…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 218 -50 -524 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 506 -50 -16 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:cave_spider\"]}]}],\"weight\":…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 576 -50 -554 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:cave_spider\"]}]}],\"weight\":…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 635 -50 -589 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:cave_spider\"]}]}],\"weight\":…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 637 -50 -581 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:cave_spider\"]}]}],\"weight\":…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 686 -50 -544 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:cave_spider\"]}]}],\"weight\":…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -1261 -49 332 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:spider\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -252 -49 -422 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -10 -49 -624 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 494 -49 -56 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:cave_spider\"]}]}],\"weight\":…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -675 -48 346 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:spider\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -644 -48 -82 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:spider\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 277 -48 -23 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -701 -47 -212 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -187 -47 261 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:skeleton\"]}]}],\"weight\":[\"…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -92 -47 329 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:spider\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 250 -47 432 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:skeleton\"]}]}],\"weight\":[\"…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 569 -47 -140 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:spider\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 406 -46 -443 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:spider\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 682 -46 -197 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:spider\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 316 -45 -668 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 2018 -45 2088 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -422 -44 -489 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:skeleton\"]}]}],\"weight\":[\"…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -379 -44 -255 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:spider\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -74 -44 276 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 106 -44 250 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:zombie\"]}]}],\"weight\":[\"n\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld -18 -43 307 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\"minecraft:skeleton\"]}]}],\"weight\":[\"…` |
| … | 689 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 310 (roundtrip)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -186 -54 618 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 150 -54 533 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 155 -54 543 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 158 -54 530 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 158 -54 542 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 160 -54 532 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 188 -54 529 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 205 -54 512 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 245 -54 566 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 300 -54 549 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 427 -54 604 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 542 -54 514 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 571 -54 576 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 145 -53 534 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 159 -53 535 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 160 -53 538 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 162 -53 540 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 227 -53 585 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 298 -53 564 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 298 -53 567 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 542 -53 534 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 547 -53 537 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 154 -52 533 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 157 -52 532 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 157 -52 534 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 337 -52 579 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 338 -52 581 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 340 -52 578 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 452 -52 582 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 521 -52 540 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 523 -52 539 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 547 -52 536 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 144 -51 530 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 264 -51 453 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 297 -51 597 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 564 -51 550 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 564 -51 551 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 187 -50 621 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 207 -50 513 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 278 -50 590 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| … | 270 autres (liste complète dans le JSON) | | | | |

