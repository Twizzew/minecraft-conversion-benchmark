# B01@1.0 — pertes classées par gravité (umt-1.5.10, B01_aller + B01_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 4 | 4 | block_entity.lectern_book 1, entity.trades 1, player.xp_level 1, player.inventory 1 |
| **MAJEUR** | 13 | 13 | block_entity.presence 6, item_stack.component:minecraft:ominous_bottle_amplifier 2, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 2 | 2 | world.value 2 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 4 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity Lectern | overworld -4 64 40 | block_entity.lectern_book | texte de panneau, livre de pupitre ou commande | `{"observed":["\"\""]}` |
| FAIL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"matching_offers":0,"expected_offers":9,"observed_offers":0}` |
| FAIL | player ~local_player | ~local_player | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 13 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity Beehive | overworld -48 64 6 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity Crafter | overworld -40 64 6 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity StructureBlock | overworld -32 64 6 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity Beehive | overworld -15 64 5 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity Beehive | overworld -9 64 5 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity Beehive | overworld -5 64 5 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | item_stack minecraft:ominous_bottle | overworld 0 64 40 | item_stack.component:minecraft:ominous_bottle_amplifier | autre propriété d'un objet | `{"attendu":1,"observed":0}` |
| FAIL | item_stack minecraft:ominous_bottle | overworld 0 64 40 | item_stack.component:minecraft:ominous_bottle_amplifier | autre propriété d'un objet | `{"attendu":2,"observed":0}` |
| FAIL | player ~local_player | ~local_player | player.position | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.dimension | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.game_mode | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.health | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.food | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |

### MINEUR — 2 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | world | level_name | world.value | autre donnée de monde | `{"observed":"B01_aller"}` |
| FAIL | world | day_time | world.value | autre donnée de monde | `{"observed":null}` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 3 | 3 | entity.trades 1, player.xp_level 1, player.inventory 1 |
| **MAJEUR** | 21 | 18 | block_entity.presence 6, block.state 3, entity.data 3, item_stack.aux 2, world.value 2, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 25 | 8 | block_entity.data 15, entity.data 8, world.value 2 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 11 | 0 | block_entity.data 11 |

### CRITIQUE — 3 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"matching_offers":0,"expected_offers":9,"observed_offers":0}` |
| FAIL | player ~local_player | ~local_player | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 21 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:structure_block | overworld -32 64 6 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"mode":"undefined -> data","structure_block_type":"save -> data"}}` |
| FAIL | block minecraft:sculk_shrieker | overworld -15 64 13 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"can_summon":"1 -> false"}}` |
| FAIL | block minecraft:cauldron | overworld -12 64 -11 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"fill_level":"3 -> 2"}}` |
| FAIL | block_entity Beehive | overworld -48 64 6 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity Crafter | overworld -40 64 6 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity StructureBlock | overworld -32 64 6 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity Beehive | overworld -15 64 5 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity Beehive | overworld -9 64 5 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity Beehive | overworld -5 64 5 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | item_stack minecraft:ominous_bottle | overworld 0 64 40 | item_stack.aux | données Bedrock d'un objet (tag / aux) | `{"observed":0}` |
| FAIL | item_stack minecraft:ominous_bottle | overworld 0 64 40 | item_stack.aux | données Bedrock d'un objet (tag / aux) | `{"observed":0}` |
| PARTIAL | entity minecraft:trader_llama | overworld 34.4 -60 -53.4 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","BreedCooldown","Color","Color2","Dead","GrowthPaused","InLove","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned",…` |
| PARTIAL | entity minecraft:trader_llama | overworld 35.4 -60 -51.2 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","BreedCooldown","Color","Color2","Dead","GrowthPaused","InLove","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned",…` |
| PARTIAL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.data | clé Offers | `{"differing_keys":["","Armor","Attributes","Chested","Color","Color2","Dead","GrowthPaused","HasExecuted","HighTierCuredDiscount","HomeDimensionId","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsP…` |
| FAIL | world | hardcore | world.value | réglage majeur du monde | `{"observed":"absent"}` |
| FAIL | world | spawn | world.value | réglage majeur du monde | `{"observed":{"pos":[0,319,0],"dim":"minecraft:overworld"}}` |
| FAIL | player ~local_player | ~local_player | player.position | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.dimension | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.game_mode | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.health | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.food | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |

### MINEUR — 25 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity HangingSign | overworld -28 63 -19 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity Lectern | overworld -56 64 6 | block_entity.data | clé hasBook | `{"differing_keys":["hasBook","page"],"differing_count":2,"lost":[],"added":["hasBook","page"],"changed":[],"sample":{"hasBook":[null,"[\"n\",\"0\"]"],"page":[null,"[\"n\",\"0\"]"]}}` |
| FAIL | block_entity Beehive | overworld -48 64 6 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity Crafter | overworld -40 64 6 | block_entity.data | données | `{"observed":"no block entity"}` |
| PARTIAL | block_entity CommandBlock | overworld -36 64 6 | block_entity.data | clé Version | `{"differing_keys":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRedstoneMode","LastOutput","LastOutputParams","TickDelay","Version","conditionMet","powered"],"differing_count":10,"lost":["ExecuteOnFirstTick","LPCommandMode","LPCondionalMode","LPRe…` |
| FAIL | block_entity StructureBlock | overworld -32 64 6 | block_entity.data | données | `{"observed":"no block entity"}` |
| PARTIAL | block_entity HangingSign | overworld -29 64 -19 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity HangingSign | overworld -28 64 -20 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity HangingSign | overworld -28 64 -18 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| PARTIAL | block_entity HangingSign | overworld -27 64 -19 | block_entity.data | clé BackText | `{"differing_keys":["BackText","FrontText"],"differing_count":2,"lost":[],"added":[],"changed":["BackText","FrontText"],"sample":{"BackText":["[\"c\",{\"FilteredText\":[\"s\",\"\"],\"HideGlowOutline\":[\"n\",\"0\"],\"IgnoreLighting\":[\"n\",\"0\"],\"PersistForm…` |
| FAIL | block_entity Beehive | overworld -15 64 5 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity Beehive | overworld -9 64 5 | block_entity.data | données | `{"observed":"no block entity"}` |
| PARTIAL | block_entity Lectern | overworld -8 64 40 | block_entity.data | clé totalPages | `{"differing_keys":["book","totalPages"],"differing_count":2,"lost":["totalPages"],"added":[],"changed":["book"],"key_detail":{"book":"TECHNICAL"},"sample":{"book":["[\"c\",{\"Count\":[\"n\",\"1\"],\"Damage\":[\"n\",\"0\"],\"Name\":[\"s\",\"minecraft:writable_b…` |
| FAIL | block_entity Beehive | overworld -5 64 5 | block_entity.data | données | `{"observed":"no block entity"}` |
| PARTIAL | block_entity Lectern | overworld -4 64 40 | block_entity.data | clé totalPages | `{"differing_keys":["book","totalPages"],"differing_count":2,"lost":["totalPages"],"added":[],"changed":["book"],"sample":{"book":["[\"c\",{\"Count\":[\"n\",\"1\"],\"Damage\":[\"n\",\"0\"],\"Name\":[\"s\",\"minecraft:written_book\"],\"WasPickedUp\":[\"n\",\"0\"…` |
| PARTIAL | entity minecraft:bee | overworld -60.7 57.4 19.2 | entity.data | clé expDropEnabled | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","GrowthPaused","HasExecuted","HomeDimensionId","InLove","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","Is…` |
| PARTIAL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.data | clé canPickupItems | `{"differing_keys":["Armor","Attributes","Chested","Color","Color2","Dead","HasExecuted","HomeDimensionId","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","IsSwimm…` |
| PARTIAL | entity minecraft:bee | overworld -17.5 52.8 16.9 | entity.data | clé expDropEnabled | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","GrowthPaused","HasExecuted","HomeDimensionId","InLove","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","Is…` |
| PARTIAL | entity minecraft:bee | overworld -13.6 65.1 8.4 | entity.data | clé canPickupItems | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","GrowthPaused","HasExecuted","HomeDimensionId","InLove","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","Is…` |
| PARTIAL | entity minecraft:bee | overworld -13.5 62.6 2.6 | entity.data | clé expDropEnabled | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","GrowthPaused","HasExecuted","HomeDimensionId","InLove","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","Is…` |
| PARTIAL | entity minecraft:bee | overworld -13.2 67.3 14.3 | entity.data | clé canPickupItems | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","GrowthPaused","HasExecuted","HomeDimensionId","InLove","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","Is…` |
| PARTIAL | entity minecraft:bee | overworld -12.8 69.8 16.2 | entity.data | clé expDropEnabled | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","GrowthPaused","HasExecuted","HomeDimensionId","InLove","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","Is…` |
| PARTIAL | entity minecraft:bee | overworld -8.9 68.7 5.6 | entity.data | clé expDropEnabled | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","GrowthPaused","HasExecuted","HomeDimensionId","InLove","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","Is…` |
| FAIL | world | level_name | world.value | autre donnée de monde | `{"observed":"B01_retour"}` |
| FAIL | world | gamerule:playerwaypoints | world.value | autre donnée de monde | `{"observed":"absent"}` |

