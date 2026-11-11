# B01@1.0 — pertes classées par gravité (chunker-1.21.0, B01_aller + B01_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 1 | 1 | entity.trades 1 |
| **MAJEUR** | 23 | 23 | entity.identity 11, entity.health 11, entity.baby 1 |
| **MINEUR** | 23 | 23 | entity.position 11, entity.data 11, world.value 1 |
| **ÉTAT TEMPORAIRE** | 1 | 1 | block_entity.data 1 |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 1 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |

### MAJEUR — 23 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:bee | overworld -60.7 57.4 19.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -60.7 57.4 19.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.baby | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -17.5 52.8 16.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -17.5 52.8 16.9 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.6 65.1 8.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.6 65.1 8.4 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.5 62.6 2.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.5 62.6 2.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.2 67.3 14.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.2 67.3 14.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -12.8 69.8 16.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -12.8 69.8 16.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -8.9 68.7 5.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -8.9 68.7 5.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 34.4 -60 -53.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 34.4 -60 -53.4 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 35.4 -60 -51.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 35.4 -60 -51.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |

### MINEUR — 23 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:bee | overworld -60.7 57.4 19.2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -60.7 57.4 19.2 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -17.5 52.8 16.9 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -17.5 52.8 16.9 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.6 65.1 8.4 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.6 65.1 8.4 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.5 62.6 2.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.5 62.6 2.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.2 67.3 14.3 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.2 67.3 14.3 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -12.8 69.8 16.2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -12.8 69.8 16.2 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -8.9 68.7 5.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -8.9 68.7 5.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 34.4 -60 -53.4 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 34.4 -60 -53.4 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 35.4 -60 -51.2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 35.4 -60 -51.2 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | world | day_time | world.value | autre donnée de monde | `{"observed":315}` |

### ÉTAT TEMPORAIRE — 1 (direct)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity Hopper | overworld -40 64 0 | block_entity.data | clé TransferCooldown | `{"compared":1,"not_compared":["BlockEntityVersion","id"],"not_compared_count":2,"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown#0":[0,-1]}}` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 2 | 2 | block_entity.sign_text 1, entity.trades 1 |
| **MAJEUR** | 35 | 35 | entity.identity 11, entity.health 11, block.state 9, block.waterlog 2, entity.baby 1, world.value 1 |
| **MINEUR** | 53 | 34 | block_entity.data 19, world.value 12, entity.position 11, entity.data 11 |
| **ÉTAT TEMPORAIRE** | 1 | 0 | block_entity.data 1 |
| **TECHNIQUE (invisible)** | 27 | 1 | block_entity.data 26, player.inventory 1 |

### CRITIQUE — 2 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity HangingSign | overworld -27 64 -19 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":{"front":["","Worldswitch","","",""],"back":["","","","",""]}}` |
| FAIL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |

### MAJEUR — 35 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:cherry_hanging_sign | overworld -29 64 -19 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"ground_sign_direction":"0 -> 2"}}` |
| FAIL | block minecraft:birch_hanging_sign | overworld -28 64 -20 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"ground_sign_direction":"0 -> 4"}}` |
| FAIL | block minecraft:spruce_hanging_sign | overworld -28 64 -18 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"ground_sign_direction":"0 -> 4"}}` |
| FAIL | block minecraft:crimson_hanging_sign | overworld -27 64 -19 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"ground_sign_direction":"0 -> 3"}}` |
| FAIL | block minecraft:cauldron | overworld -12 64 -11 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"fill_level":"3 -> 4"}}` |
| FAIL | block minecraft:wooden_door | overworld -3 64 -58 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:wooden_door | overworld -3 65 -58 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"open_bit":"0 -> 1"}}` |
| FAIL | block minecraft:wooden_door | overworld -3 65 -58 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:wooden_door | overworld -3 65 -56 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"open_bit":"0 -> 1"}}` |
| FAIL | block minecraft:wooden_door | overworld -3 65 -52 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"open_bit":"0 -> 1"}}` |
| FAIL | block minecraft:wooden_door | overworld -3 65 -48 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"open_bit":"0 -> 1"}}` |
| FAIL | entity minecraft:bee | overworld -60.7 57.4 19.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -60.7 57.4 19.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.baby | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -17.5 52.8 16.9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -17.5 52.8 16.9 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.6 65.1 8.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.6 65.1 8.4 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.5 62.6 2.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.5 62.6 2.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.2 67.3 14.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.2 67.3 14.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -12.8 69.8 16.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -12.8 69.8 16.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -8.9 68.7 5.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -8.9 68.7 5.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 34.4 -60 -53.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 34.4 -60 -53.4 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 35.4 -60 -51.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 35.4 -60 -51.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | world | gamerule:pvp | world.value | règle de jeu qui change la partie | `{"observed":"absent"}` |

### MINEUR — 53 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity HangingSign | overworld -28 63 -19 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity Lectern | overworld -56 64 6 | block_entity.data | clé hasBook | `{"differing_keys":["hasBook","page"],"differing_count":2,"lost":[],"added":["hasBook","page"],"changed":[],"sample":{"hasBook":[null,"[\"n\",\"0\"]"],"page":[null,"[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Chest | overworld -48 64 35 | block_entity.data | clé pairlead | `{"differing_keys":["Findable","pairlead"],"differing_count":2,"lost":["Findable"],"added":[],"changed":["pairlead"],"sample":{"Findable":["[\"n\",\"0\"]",null],"pairlead":["[\"n\",\"1\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Chest | overworld -47 64 35 | block_entity.data | clé pairlead | `{"differing_keys":["Findable","pairlead"],"differing_count":2,"lost":["Findable"],"added":[],"changed":["pairlead"],"sample":{"Findable":["[\"n\",\"0\"]",null],"pairlead":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity CommandBlock | overworld -36 64 6 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastExecution","LastOutput","LastOutputParams","SuccessCount","TickDelay","Version","conditionMet","powered"],"differing_count":12,"lost":["ExecuteOnFirstTick","LPComma…` |
| PARTIAL | block_entity StructureBlock | overworld -32 64 6 | block_entity.data | clé lastTouchedPlayerId | `{"differing_keys":["lastTouchedPlayerId"],"differing_count":1,"lost":[],"added":[],"changed":["lastTouchedPlayerId"],"sample":{"lastTouchedPlayerId":["[\"n\",\"-1\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity HangingSign | overworld -29 64 -19 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity HangingSign | overworld -28 64 -20 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity HangingSign | overworld -28 64 -18 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity HangingSign | overworld -27 64 -19 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity Campfire | overworld -15 64 -15 | block_entity.data | clé Item1 | `{"differing_keys":["Item1","Item2","Item3","Item4"],"differing_count":4,"lost":[],"added":["Item1","Item2","Item3","Item4"],"changed":[],"sample":{"Item1":[null,"[\"c\",{\"Block\":[\"c\",{\"name\":[\"s\",\"minecraft:air\"],\"states\":[\"c\",{}]}],\"Damage\":[\…` |
| PARTIAL | block_entity Cauldron | overworld -15 64 -11 | block_entity.data | clé IsSplash | `{"differing_keys":["IsSplash"],"differing_count":1,"lost":[],"added":["IsSplash"],"changed":[],"sample":{"IsSplash":[null,"[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity SculkShrieker | overworld -15 64 13 | block_entity.data | clé VibrationListener | `{"differing_keys":["VibrationListener"],"differing_count":1,"lost":["VibrationListener"],"added":[],"changed":[],"sample":{"VibrationListener":["[\"c\",{\"selector\":[\"c\",{}]}]",null]}}` |
| PARTIAL | block_entity Campfire | overworld -12 64 -15 | block_entity.data | clé Item1 | `{"differing_keys":["Item1","Item2","Item3","Item4"],"differing_count":4,"lost":[],"added":["Item1","Item2","Item3","Item4"],"changed":[],"sample":{"Item1":[null,"[\"c\",{\"Block\":[\"c\",{\"name\":[\"s\",\"minecraft:air\"],\"states\":[\"c\",{}]}],\"Damage\":[\…` |
| PARTIAL | block_entity Cauldron | overworld -12 64 -11 | block_entity.data | clé IsSplash | `{"differing_keys":["IsSplash"],"differing_count":1,"lost":[],"added":["IsSplash"],"changed":[],"sample":{"IsSplash":[null,"[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Campfire | overworld -9 64 -15 | block_entity.data | clé Item1 | `{"differing_keys":["Item1","Item2","Item3","Item4"],"differing_count":4,"lost":[],"added":["Item1","Item2","Item3","Item4"],"changed":[],"sample":{"Item1":[null,"[\"c\",{\"Block\":[\"c\",{\"name\":[\"s\",\"minecraft:air\"],\"states\":[\"c\",{}]}],\"Damage\":[\…` |
| PARTIAL | block_entity Cauldron | overworld -9 64 -11 | block_entity.data | clé IsSplash | `{"differing_keys":["IsSplash"],"differing_count":1,"lost":[],"added":["IsSplash"],"changed":[],"sample":{"IsSplash":[null,"[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Campfire | overworld -6 64 -15 | block_entity.data | clé Item1 | `{"differing_keys":["Item1","Item2","Item3","Item4"],"differing_count":4,"lost":[],"added":["Item1","Item2","Item3","Item4"],"changed":[],"sample":{"Item1":[null,"[\"c\",{\"Block\":[\"c\",{\"name\":[\"s\",\"minecraft:air\"],\"states\":[\"c\",{}]}],\"Damage\":[\…` |
| PARTIAL | block_entity Lectern | overworld -4 64 40 | block_entity.data | clé book | `{"differing_keys":["book"],"differing_count":1,"lost":[],"added":[],"changed":["book"],"sample":{"book":["[\"c\",{\"Count\":[\"n\",\"1\"],\"Damage\":[\"n\",\"0\"],\"Name\":[\"s\",\"minecraft:written_book\"],\"WasPickedUp\":[\"n\",\"0\"],\"tag\":[\"c\",{\"autho…` |
| FAIL | entity minecraft:bee | overworld -60.7 57.4 19.2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -60.7 57.4 19.2 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -17.5 52.8 16.9 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -17.5 52.8 16.9 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.6 65.1 8.4 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.6 65.1 8.4 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.5 62.6 2.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.5 62.6 2.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.2 67.3 14.3 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -13.2 67.3 14.3 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -12.8 69.8 16.2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -12.8 69.8 16.2 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -8.9 68.7 5.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:bee | overworld -8.9 68.7 5.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 34.4 -60 -53.4 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 34.4 -60 -53.4 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 35.4 -60 -51.2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:trader_llama | overworld 35.4 -60 -51.2 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| … | 13 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 1 (roundtrip)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity Crafter | overworld -40 64 6 | block_entity.data | clé crafting_ticks_remaining | `{"differing_keys":["crafting_ticks_remaining"],"differing_count":1,"lost":[],"added":["crafting_ticks_remaining"],"changed":[],"sample":{"crafting_ticks_remaining":[null,"[\"n\",\"0\"]"]}}` |

