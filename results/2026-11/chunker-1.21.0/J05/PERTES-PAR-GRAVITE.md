# J05@1.0 — pertes classées par gravité (chunker-1.21.0, J05_aller + J05_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 0 | 0 | — |
| **MAJEUR** | 295 | 295 | entity.identity 109, entity.health 94, scoreboard.value 81, entity.equipment 5, block_entity.data 1, entity.details 1, world.value 1, scoreboard.presence 1, scoreboard.display_name 1, player.spawn_point 1 |
| **MINEUR** | 224 | 224 | entity.position 109, entity.data 109, world.value 6 |
| **ÉTAT TEMPORAIRE** | 4 | 4 | block_entity.data 4 |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### MAJEUR — 295 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:beehive | overworld -17 -60 61 | block_entity.data | clé bees | `{"compared":5,"not_compared":["components","id"],"not_compared_count":2,"differing_keys":["bees","ticks_in_hive"],"differing_count":5,"lost":["ticks_in_hive","bees"],"changed":["bees"],"sample":{"bees#0":[2,0],"ticks_in_hive#1":[200,null],"bees#2":[1,null],"ti…` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 10 -60 49.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 10 -60 49.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 11.2 -60 46.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 11.2 -60 46.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 13.8 -60 49.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 13.8 -60 49.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 22.5 -60 -67.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 22.5 -60 -67.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 73.7 -60 -40.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 73.7 -60 -40.4 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.2 -60 -32.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.2 -60 -32.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.9 -60 -34.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.9 -60 -34.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 81.2 -60 -38.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 81.2 -60 -38.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld -29.2 -60 39.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld -27.7 -60 41.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 74.2 -60 56.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 78.8 -60 42 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 114.3 -60 54.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 11 -50 40 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 14 -48 40 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 23.5 -60 -63.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 23.5 -60 -63.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 24.3 -60 -66.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 24.3 -60 -66.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 28.4 -60 -62.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 28.4 -60 -62.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -28 -60 36.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld 19 -57 40 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld 27 -57 61 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld 64.2 -60 25 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:minecart | overworld 27 -59.8 40 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pillager | overworld 11.5 -60 19.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pillager | overworld 11.5 -60 19.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| … | 255 autres (liste complète dans le JSON) | | | | |

### MINEUR — 224 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 10 -60 49.1 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 10 -60 49.1 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 11.2 -60 46.8 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 11.2 -60 46.8 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 13.8 -60 49.8 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 13.8 -60 49.8 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 22.5 -60 -67.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 22.5 -60 -67.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 73.7 -60 -40.4 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 73.7 -60 -40.4 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.2 -60 -32.8 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.2 -60 -32.8 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.9 -60 -34.3 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.9 -60 -34.3 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 81.2 -60 -38.2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 81.2 -60 -38.2 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld -29.2 -60 39.9 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld -29.2 -60 39.9 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld -27.7 -60 41.9 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld -27.7 -60 41.9 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 74.2 -60 56.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 74.2 -60 56.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 78.8 -60 42 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 78.8 -60 42 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 114.3 -60 54.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 114.3 -60 54.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 11 -50 40 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 11 -50 40 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 14 -48 40 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 14 -48 40 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 23.5 -60 -63.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 23.5 -60 -63.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 24.3 -60 -66.2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 24.3 -60 -66.2 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 28.4 -60 -62.1 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 28.4 -60 -62.1 | entity.data | données | `{"observed":"no matching entity"}` |
| … | 184 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 4 (direct)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:hopper | overworld -1 -60 61 | block_entity.data | clé TransferCooldown | `{"compared":1,"not_compared":["components","id"],"not_compared_count":2,"differing_keys":["TransferCooldown"],"differing_count":1,"lost":["TransferCooldown"],"changed":[],"sample":{"TransferCooldown#0":[-1,null]}}` |
| FAIL | block_entity minecraft:hopper | overworld 19 -59 30 | block_entity.data | clé TransferCooldown | `{"compared":1,"not_compared":["components","id"],"not_compared_count":2,"differing_keys":["TransferCooldown"],"differing_count":1,"lost":["TransferCooldown"],"changed":[],"sample":{"TransferCooldown#0":[8,null]}}` |
| FAIL | block_entity minecraft:hopper | overworld 27 -59 30 | block_entity.data | clé TransferCooldown | `{"compared":1,"not_compared":["components","id"],"not_compared_count":2,"differing_keys":["TransferCooldown"],"differing_count":1,"lost":["TransferCooldown"],"changed":[],"sample":{"TransferCooldown#0":[8,null]}}` |
| FAIL | block_entity minecraft:hopper | overworld -1 -58 61 | block_entity.data | clé TransferCooldown | `{"compared":1,"not_compared":["components","id"],"not_compared_count":2,"differing_keys":["TransferCooldown"],"differing_count":1,"lost":["TransferCooldown"],"changed":[],"sample":{"TransferCooldown#0":[8,null]}}` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 1 | 1 | player.xp_level 1 |
| **MAJEUR** | 297 | 294 | entity.identity 110, entity.health 94, scoreboard.value 81, entity.equipment 5, block_entity.data 2, block.state 1, scoreboard.presence 1, scoreboard.display_name 1, player.inventory 1, player.spawn_point 1 |
| **MINEUR** | 258 | 224 | entity.position 110, entity.data 110, block_entity.data 34, world.value 4 |
| **ÉTAT TEMPORAIRE** | 11 | 0 | block_entity.data 11 |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 1 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | player c7361fde-4983-4733-b2dc-3be58cc7762b | c7361fde-4983-4733-b2dc-3be58cc7762b | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":0}` |

### MAJEUR — 297 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:sculk_sensor | overworld 11 -60 61 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"power":"12 -> 0"}}` |
| PARTIAL | block_entity minecraft:beehive | overworld -17 -60 61 | block_entity.data | clé bees | `{"differing_keys":["bees"],"differing_count":1,"lost":[],"added":[],"changed":["bees"],"sample":{"bees":["[\"l\",[[\"c\",{\"entity_data\":[\"c\",{\"HasNectar\":[\"n\",\"1\"],\"id\":[\"s\",\"minecraft:bee\"]}],\"min_ticks_in_hive\":[\"n\",\"400\"],\"ticks_in_hi…` |
| PARTIAL | block_entity minecraft:lectern | overworld 5 -60 15 | block_entity.data | clé Book | `{"differing_keys":["Book"],"differing_count":1,"lost":[],"added":[],"changed":["Book"],"sample":{"Book":["[\"c\",{\"components\":[\"c\",{\"minecraft:written_book_content\":[\"c\",{\"author\":[\"s\",\"MCCB\"],\"pages\":[\"l\",[[\"c\",{\"raw\":[\"s\",\"J05 / JAV…` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 10 -60 49.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 10 -60 49.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 11.2 -60 46.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 11.2 -60 46.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 13.8 -60 49.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 13.8 -60 49.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 22.5 -60 -67.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 22.5 -60 -67.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 73.7 -60 -40.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 73.7 -60 -40.4 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.2 -60 -32.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.2 -60 -32.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.9 -60 -34.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 74.9 -60 -34.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 81.2 -60 -38.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 81.2 -60 -38.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld -29.2 -60 39.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld -27.7 -60 41.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 74.2 -60 56.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 78.8 -60 42 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:experience_orb | overworld 114.3 -60 54.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 11 -50 40 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 14 -48 40 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 23.5 -60 -63.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 23.5 -60 -63.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 24.3 -60 -66.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 24.3 -60 -66.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 28.4 -60 -62.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 28.4 -60 -62.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -28 -60 36.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld 19 -57 40 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld 27 -57 61 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld 64.2 -60 25 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:marker | overworld 5 -60 7 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| … | 257 autres (liste complète dans le JSON) | | | | |

### MINEUR — 258 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:sign | overworld -19 -60 45 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -17 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -17 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -17 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -17 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -17 -60 71 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -9 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:blast_furnace | overworld -9 -60 20 | block_entity.data | clé speed_multiplier | `{"differing_keys":["cooking_total_time","speed_multiplier"],"differing_count":2,"lost":[],"added":[],"changed":["cooking_total_time","speed_multiplier"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"0\"]"],"speed_multiplier":["[\"n\",\"2\"]","[\"…` |
| PARTIAL | block_entity minecraft:sign | overworld -9 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -9 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -9 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -9 -60 71 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -1 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld -1 -60 20 | block_entity.data | clé speed_multiplier | `{"differing_keys":["cooking_total_time","speed_multiplier"],"differing_count":2,"lost":[],"added":[],"changed":["cooking_total_time","speed_multiplier"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"0\"]"],"speed_multiplier":["[\"n\",\"2\"]","[\"…` |
| PARTIAL | block_entity minecraft:sign | overworld -1 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -1 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -1 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 3 -60 12 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 11 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld 11 -60 20 | block_entity.data | clé speed_multiplier | `{"differing_keys":["cooking_total_time","speed_multiplier"],"differing_count":2,"lost":[],"added":[],"changed":["cooking_total_time","speed_multiplier"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"0\"]"],"speed_multiplier":["[\"n\",\"2\"]","[\"…` |
| PARTIAL | block_entity minecraft:sign | overworld 11 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 11 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 11 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 19 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 19 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 19 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 19 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 27 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 27 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 27 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 27 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 27 -60 71 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 29 -60 45 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 49 -60 13 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 10 -60 49.1 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 10 -60 49.1 | entity.data | données | `{"observed":"no matching entity"}` |
| … | 218 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 11 (roundtrip)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:furnace | overworld -17 -60 20 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity minecraft:campfire | overworld -17 -60 30 | block_entity.data | clé CookingTotalTimes | `{"differing_keys":["CookingTotalTimes"],"differing_count":1,"lost":[],"added":[],"changed":["CookingTotalTimes"],"sample":{"CookingTotalTimes":["[\"I\",[[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"]]]","[\"I\",[[\"n\",\"0\"],[\"n\",\"0\"],[\"…` |
| PARTIAL | block_entity minecraft:campfire | overworld -17 -60 75 | block_entity.data | clé CookingTotalTimes | `{"differing_keys":["CookingTotalTimes"],"differing_count":1,"lost":[],"added":[],"changed":["CookingTotalTimes"],"sample":{"CookingTotalTimes":["[\"I\",[[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"]]]","[\"I\",[[\"n\",\"0\"],[\"n\",\"0\"],[\"…` |
| PARTIAL | block_entity minecraft:campfire | overworld -9 -60 30 | block_entity.data | clé CookingTotalTimes | `{"differing_keys":["CookingTotalTimes"],"differing_count":1,"lost":[],"added":[],"changed":["CookingTotalTimes"],"sample":{"CookingTotalTimes":["[\"I\",[[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"]]]","[\"I\",[[\"n\",\"0\"],[\"n\",\"0\"],[\"…` |
| PARTIAL | block_entity minecraft:furnace | overworld -9 -60 75 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity minecraft:campfire | overworld -1 -60 30 | block_entity.data | clé CookingTotalTimes | `{"differing_keys":["CookingTotalTimes"],"differing_count":1,"lost":[],"added":[],"changed":["CookingTotalTimes"],"sample":{"CookingTotalTimes":["[\"I\",[[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"]]]","[\"I\",[[\"n\",\"0\"],[\"n\",\"0\"],[\"…` |
| PARTIAL | block_entity minecraft:campfire | overworld 11 -60 30 | block_entity.data | clé CookingTotalTimes | `{"differing_keys":["CookingTotalTimes"],"differing_count":1,"lost":[],"added":[],"changed":["CookingTotalTimes"],"sample":{"CookingTotalTimes":["[\"I\",[[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"],[\"n\",\"600\"]]]","[\"I\",[[\"n\",\"0\"],[\"n\",\"0\"],[\"…` |
| PARTIAL | block_entity minecraft:furnace | overworld -1 -59 61 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 19 -59 30 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"8\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 27 -59 30 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"8\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld -1 -58 61 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"8\"]","[\"n\",\"-1\"]"]}}` |

