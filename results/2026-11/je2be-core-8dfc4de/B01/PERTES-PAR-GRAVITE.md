# B01@1.0 — pertes classées par gravité (je2be-core-8dfc4de, B01_aller + B01_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 2 | 2 | player.xp_level 1, player.inventory 1 |
| **MAJEUR** | 6 | 6 | block_entity.presence 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 0 | 0 | — |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 8 | 0 | entity.data 8 |

### CRITIQUE — 2 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | player ~local_player | ~local_player | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 6 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity PotentSulfurBlock | overworld 46 64 4 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | player ~local_player | ~local_player | player.position | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.dimension | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.game_mode | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.health | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.food | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 0 | 0 | — |
| **MAJEUR** | 21 | 18 | block.identity 11, block.state 4, entity.data 3, block.waterlog 2, block_entity.presence 1 |
| **MINEUR** | 22 | 3 | block_entity.data 12, entity.data 8, world.value 2 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 3 | 0 | block_entity.data 3 |

### MAJEUR — 21 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:cauldron | overworld -12 64 -11 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"fill_level":"3 -> 4"}}` |
| FAIL | block minecraft:wooden_door | overworld -3 64 -58 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:sulfur | overworld 30 64 0 | block.identity | bloc manquant ou remplacé | `{"observed":""}` |
| FAIL | block minecraft:polished_cinnabar | overworld 30 64 4 | block.identity | bloc manquant ou remplacé | `{"observed":""}` |
| FAIL | block minecraft:polished_sulfur | overworld 34 64 0 | block.identity | bloc manquant ou remplacé | `{"observed":""}` |
| FAIL | block minecraft:cinnabar_bricks | overworld 34 64 4 | block.identity | bloc manquant ou remplacé | `{"observed":""}` |
| FAIL | block minecraft:sulfur_bricks | overworld 38 64 0 | block.identity | bloc manquant ou remplacé | `{"observed":""}` |
| FAIL | block minecraft:chiseled_cinnabar | overworld 38 64 4 | block.identity | bloc manquant ou remplacé | `{"observed":""}` |
| FAIL | block minecraft:chiseled_sulfur | overworld 42 64 0 | block.identity | bloc manquant ou remplacé | `{"observed":""}` |
| FAIL | block minecraft:cinnabar_slab | overworld 42 64 4 | block.identity | bloc manquant ou remplacé | `{"observed":""}` |
| FAIL | block minecraft:cinnabar_slab | overworld 42 64 4 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"","note":"identity-changed"}` |
| FAIL | block minecraft:sulfur_slab | overworld 46 64 0 | block.identity | bloc manquant ou remplacé | `{"observed":""}` |
| FAIL | block minecraft:sulfur_slab | overworld 46 64 0 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"","note":"identity-changed"}` |
| FAIL | block minecraft:potent_sulfur | overworld 46 64 4 | block.identity | bloc manquant ou remplacé | `{"observed":""}` |
| FAIL | block minecraft:potent_sulfur | overworld 46 64 4 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"","note":"identity-changed"}` |
| FAIL | block minecraft:cinnabar | overworld 50 64 0 | block.identity | bloc manquant ou remplacé | `{"observed":""}` |
| FAIL | block minecraft:wooden_door | overworld -3 65 -58 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block_entity PotentSulfurBlock | overworld 46 64 4 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| PARTIAL | entity minecraft:trader_llama | overworld 34.4 -60 -53.4 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","IsOutOfControl","IsTamed","LeasherID","StrengthMax","definitions","expDropEnabled","limitedLife"],"differing_count":10,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","BodyRot","limitedLi…` |
| PARTIAL | entity minecraft:trader_llama | overworld 35.4 -60 -51.2 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","IsOutOfControl","IsTamed","LeasherID","StrengthMax","definitions","expDropEnabled","limitedLife"],"differing_count":10,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","BodyRot","limitedLi…` |
| PARTIAL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.data | clé TradeTablePath | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","ChestItems","HasExecuted","HighTierCuredDiscount","HomeDimensionId","HomePos","InLove","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeSta…` |

### MINEUR — 22 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity HangingSign | overworld -28 63 -19 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity Chest | overworld -48 64 35 | block_entity.data | clé pairlead | `{"differing_keys":["pairlead"],"differing_count":1,"lost":[],"added":[],"changed":["pairlead"],"sample":{"pairlead":["[\"n\",\"1\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Chest | overworld -47 64 35 | block_entity.data | clé pairlead | `{"differing_keys":["pairlead"],"differing_count":1,"lost":[],"added":[],"changed":["pairlead"],"sample":{"pairlead":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity CommandBlock | overworld -36 64 6 | block_entity.data | clé Version | `{"differing_keys":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","Version"],"differing_count":6,"lost":["LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams"],"added":[],"changed":["Version"],"s…` |
| PARTIAL | block_entity StructureBlock | overworld -32 64 6 | block_entity.data | clé lastTouchedPlayerId | `{"differing_keys":["lastTouchedPlayerId"],"differing_count":1,"lost":["lastTouchedPlayerId"],"added":[],"changed":[],"sample":{"lastTouchedPlayerId":["[\"n\",\"-1\"]",null]}}` |
| PARTIAL | block_entity HangingSign | overworld -29 64 -19 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity HangingSign | overworld -28 64 -20 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity HangingSign | overworld -28 64 -18 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity HangingSign | overworld -27 64 -19 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity SculkShrieker | overworld -15 64 13 | block_entity.data | clé VibrationListener | `{"differing_keys":["VibrationListener"],"differing_count":1,"lost":["VibrationListener"],"added":[],"changed":[],"sample":{"VibrationListener":["[\"c\",{\"selector\":[\"c\",{}]}]",null]}}` |
| PARTIAL | block_entity Lectern | overworld -4 64 40 | block_entity.data | clé book | `{"differing_keys":["book"],"differing_count":1,"lost":[],"added":[],"changed":["book"],"sample":{"book":["[\"c\",{\"Count\":[\"n\",\"1\"],\"Damage\":[\"n\",\"0\"],\"Name\":[\"s\",\"minecraft:written_book\"],\"WasPickedUp\":[\"n\",\"0\"],\"tag\":[\"c\",{\"autho…` |
| FAIL | block_entity PotentSulfurBlock | overworld 46 64 4 | block_entity.data | données | `{"observed":"no block entity"}` |
| PARTIAL | entity minecraft:bee | overworld -60.7 57.4 19.2 | entity.data | clé HomePos | `{"differing_keys":["AttackTime","Attributes","BodyRot","HasExecuted","HomeDimensionId","HomePos","IsOutOfControl","Persistent","definitions","expDropEnabled","limitedLife","properties"],"differing_count":12,"lost":["HasExecuted","HomeDimensionId","HomePos","Is…` |
| PARTIAL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.data | clé HomePos | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","GrowthPaused","HasExecuted","HomeDimensionId","HomePos","InLove","IsOutOfControl","LoveCause","Persistent","definitions","limitedLife","properties"],"differing_count":15,"lost":["GrowthPau…` |
| PARTIAL | entity minecraft:bee | overworld -17.5 52.8 16.9 | entity.data | clé HomePos | `{"differing_keys":["AttackTime","Attributes","BodyRot","HasExecuted","HomeDimensionId","HomePos","IsOutOfControl","Persistent","definitions","expDropEnabled","limitedLife","properties"],"differing_count":12,"lost":["HasExecuted","HomeDimensionId","HomePos","Is…` |
| PARTIAL | entity minecraft:bee | overworld -13.6 65.1 8.4 | entity.data | clé HomePos | `{"differing_keys":["AttackTime","Attributes","BodyRot","HasExecuted","HomeDimensionId","HomePos","IsOutOfControl","Persistent","definitions","expDropEnabled","limitedLife","properties"],"differing_count":12,"lost":["HasExecuted","HomeDimensionId","HomePos","Is…` |
| PARTIAL | entity minecraft:bee | overworld -13.5 62.6 2.6 | entity.data | clé HomePos | `{"differing_keys":["AttackTime","Attributes","BodyRot","HasExecuted","HomeDimensionId","HomePos","IsOutOfControl","Persistent","definitions","expDropEnabled","limitedLife","properties"],"differing_count":12,"lost":["HasExecuted","HomeDimensionId","HomePos","Is…` |
| PARTIAL | entity minecraft:bee | overworld -13.2 67.3 14.3 | entity.data | clé HomePos | `{"differing_keys":["AttackTime","Attributes","BodyRot","HasExecuted","HomeDimensionId","HomePos","IsOutOfControl","Persistent","definitions","expDropEnabled","limitedLife","properties"],"differing_count":12,"lost":["HasExecuted","HomeDimensionId","HomePos","Is…` |
| PARTIAL | entity minecraft:bee | overworld -12.8 69.8 16.2 | entity.data | clé HomePos | `{"differing_keys":["AttackTime","Attributes","BodyRot","HasExecuted","HomeDimensionId","HomePos","IsOutOfControl","Persistent","definitions","expDropEnabled","limitedLife","properties"],"differing_count":12,"lost":["HasExecuted","HomeDimensionId","HomePos","Is…` |
| PARTIAL | entity minecraft:bee | overworld -8.9 68.7 5.6 | entity.data | clé HomePos | `{"differing_keys":["AttackTime","Attributes","BodyRot","HasExecuted","HomeDimensionId","HomePos","IsOutOfControl","Persistent","definitions","expDropEnabled","limitedLife","properties"],"differing_count":12,"lost":["HasExecuted","HomeDimensionId","HomePos","Is…` |
| FAIL | world | gamerule:playerwaypoints | world.value | autre donnée de monde | `{"observed":"absent"}` |
| FAIL | world | gamerule:showdaysplayed | world.value | autre donnée de monde | `{"observed":"absent"}` |

