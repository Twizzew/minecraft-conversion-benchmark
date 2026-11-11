# B03@1.0 — pertes classées par gravité (chunker-1.21.0, B03_aller + B03_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 1 | 1 | entity.tamed 1 |
| **MAJEUR** | 139 | 139 | entity.identity 60, entity.health 43, scoreboard.value 14, entity.equipment 12, world.value 3, entity.details 2, scoreboard.presence 2, scoreboard.display_name 2, structure.spawn_zone 1 |
| **MINEUR** | 121 | 121 | entity.position 60, entity.data 60, world.value 1 |
| **ÉTAT TEMPORAIRE** | 2 | 2 | block_entity.data 2 |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 1 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:camel | overworld 1300 65 -824.4 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |

### MAJEUR — 139 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:armor_stand | overworld 15.5 200 68.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand | overworld 15.5 200 68.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:camel | overworld 1300 65 -824.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:camel | overworld 1300 65 -824.4 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 1302 65 -825 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 1302 65 -825 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1283 6 -855.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1283 6 -855.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1299.9 -49 -814.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1299.9 -49 -814.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1305.5 21 -825.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1305.5 21 -825.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1308.5 -22 -786.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1308.5 -22 -786.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:iron_golem | overworld 1291.5 63 -823 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:iron_golem | overworld 1291.5 63 -823 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -51.8 62.6 18.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -50 62.6 20.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -47.1 63.1 -0.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -45.1 63.1 6.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -44.4 63.1 5.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:minecart | overworld 14.5 200.5 56.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1269.5 64 -823.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1269.5 64 -823.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1282.4 64 -802.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1282.4 64 -802.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1284.1 63.6 -814.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1284.1 63.6 -814.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.1 63 -809.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.1 63 -809.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.5 67 -839.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.5 67 -839.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1313.5 68 -824.7 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1313.5 68 -824.7 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1320.5 66 -842.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1320.5 66 -842.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1300.7 -5 -783.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| … | 99 autres (liste complète dans le JSON) | | | | |

### MINEUR — 121 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:armor_stand | overworld 15.5 200 68.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand | overworld 15.5 200 68.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:camel | overworld 1300 65 -824.4 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:camel | overworld 1300 65 -824.4 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 1302 65 -825 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 1302 65 -825 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1283 6 -855.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1283 6 -855.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1299.9 -49 -814.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1299.9 -49 -814.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1305.5 21 -825.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1305.5 21 -825.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1308.5 -22 -786.1 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1308.5 -22 -786.1 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:iron_golem | overworld 1291.5 63 -823 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:iron_golem | overworld 1291.5 63 -823 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -51.8 62.6 18.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -51.8 62.6 18.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -50 62.6 20.9 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -50 62.6 20.9 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -47.1 63.1 -0.1 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -47.1 63.1 -0.1 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -45.1 63.1 6.1 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -45.1 63.1 6.1 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -44.4 63.1 5.9 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -44.4 63.1 5.9 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:minecart | overworld 14.5 200.5 56.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:minecart | overworld 14.5 200.5 56.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1269.5 64 -823.1 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1269.5 64 -823.1 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1282.4 64 -802.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1282.4 64 -802.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1284.1 63.6 -814.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1284.1 63.6 -814.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.1 63 -809.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.1 63 -809.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.5 67 -839.1 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.5 67 -839.1 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1313.5 68 -824.7 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1313.5 68 -824.7 | entity.data | données | `{"observed":"no matching entity"}` |
| … | 81 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 2 (direct)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity Hopper | overworld -50 200 40 | block_entity.data | clé TransferCooldown | `{"compared":1,"not_compared":["BlockEntityVersion","id"],"not_compared_count":2,"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown#0":[0,-1]}}` |
| FAIL | block_entity Hopper | overworld 15 201 44 | block_entity.data | clé TransferCooldown | `{"compared":1,"not_compared":["BlockEntityVersion","id"],"not_compared_count":2,"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown#0":[0,-1]}}` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 2 | 2 | block_entity.sign_text 1, entity.tamed 1 |
| **MAJEUR** | 142 | 142 | entity.identity 60, entity.health 43, scoreboard.value 15, entity.equipment 12, world.value 4, block.state 2, scoreboard.presence 2, scoreboard.display_name 2, block_entity.presence 1, structure.spawn_zone 1 |
| **MINEUR** | 186 | 133 | entity.position 60, entity.data 60, block_entity.data 54, world.value 12 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 33 | 0 | block_entity.data 33 |

### CRITIQUE — 2 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity Sign | overworld 12 201 38 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":{"front":["ender","","","",""],"back":["","","","",""]}}` |
| FAIL | entity minecraft:camel | overworld 1300 65 -824.4 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |

### MAJEUR — 142 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:purpur_block | the_end 82 49 7 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"pillar_axis":"x -> y"}}` |
| FAIL | block minecraft:purpur_block | the_end 86 49 7 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"pillar_axis":"z -> y"}}` |
| FAIL | block_entity SporeBlossom | overworld 1309 -3 -765 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | entity minecraft:armor_stand | overworld 15.5 200 68.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand | overworld 15.5 200 68.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:camel | overworld 1300 65 -824.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:camel | overworld 1300 65 -824.4 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 1302 65 -825 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 1302 65 -825 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1283 6 -855.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1283 6 -855.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1299.9 -49 -814.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1299.9 -49 -814.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1305.5 21 -825.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1305.5 21 -825.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1308.5 -22 -786.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:creeper | overworld 1308.5 -22 -786.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:iron_golem | overworld 1291.5 63 -823 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:iron_golem | overworld 1291.5 63 -823 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -51.8 62.6 18.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -50 62.6 20.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -47.1 63.1 -0.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -45.1 63.1 6.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -44.4 63.1 5.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:minecart | overworld 14.5 200.5 56.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1269.5 64 -823.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1269.5 64 -823.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1282.4 64 -802.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1282.4 64 -802.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1284.1 63.6 -814.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1284.1 63.6 -814.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.1 63 -809.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.1 63 -809.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.5 67 -839.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1304.5 67 -839.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1313.5 68 -824.7 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1313.5 68 -824.7 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1320.5 66 -842.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 1320.5 66 -842.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:zombie | overworld 1298.5 -4.9 -784 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| … | 102 autres (liste complète dans le JSON) | | | | |

### MINEUR — 186 (roundtrip)

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
| PARTIAL | block_entity Cauldron | overworld 1323 68 -820 | block_entity.data | clé IsSplash | `{"differing_keys":["IsSplash"],"differing_count":1,"lost":[],"added":["IsSplash"],"changed":[],"sample":{"IsSplash":[null,"[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity FlowerPot | overworld 1328 68 -827 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity FlowerPot | overworld 1323 71 -823 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity FlowerPot | overworld 1327 71 -824 | block_entity.data | clé PlantBlock | `{"differing_keys":["PlantBlock"],"differing_count":1,"lost":[],"added":[],"changed":["PlantBlock"],"sample":{"PlantBlock":["[\"c\",{\"name\":[\"s\",\"minecraft:cactus\"],\"states\":[\"c\",{\"age\":[\"n\",\"0\"]}],\"version\":[\"n\",\"18168865\"]}]","[\"c\",{\"…` |
| PARTIAL | block_entity Chest | overworld -50 199 40 | block_entity.data | clé forceunpair | `{"differing_keys":["Findable","forceunpair"],"differing_count":2,"lost":["Findable","forceunpair"],"added":[],"changed":[],"sample":{"Findable":["[\"n\",\"0\"]",null],"forceunpair":["[\"n\",\"1\"]",null]}}` |
| PARTIAL | block_entity Barrel | overworld -50 200 16 | block_entity.data | clé forceunpair | `{"differing_keys":["Findable","forceunpair"],"differing_count":2,"lost":["Findable","forceunpair"],"added":[],"changed":[],"sample":{"Findable":["[\"n\",\"0\"]",null],"forceunpair":["[\"n\",\"1\"]",null]}}` |
| PARTIAL | block_entity CommandBlock | overworld 12 200 38 | block_entity.data | clé LPRedstoneMode | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 -12 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 -6 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 0 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 28 200 6 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 29 200 6 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 30 200 0 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 31 200 0 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 32 200 -12 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 32 200 -6 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 32 200 0 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 34 200 0 | block_entity.data | clé ExecuteOnFirstTick | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity CommandBlock | overworld 36 200 -12 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| … | 146 autres (liste complète dans le JSON) | | | | |

