# J02@2.0 — pertes classées par gravité (worldswitch-5e2e2d5, J02_aller + J02_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 3 | 3 | entity.inventory 3 |
| **MAJEUR** | 18 | 8 | entity.data 10, entity.identity 4, entity.custom_name 4 |
| **MINEUR** | 8 | 8 | entity.position 4, entity.data 4 |
| **ÉTAT TEMPORAIRE** | 6 | 0 | entity.data 6 |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 3 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:poplar_chest_boat « EXT-123 relation » | overworld 46.5 191 183.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « R6-017 Bateau-coffre peuplier avec empla » | overworld 84.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « LIV-VEHICLE-029 POPLAR CHEST BOAT » | overworld 107.5 101 152.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |

### MAJEUR — 18 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | entity minecraft:axolotl « EXT-066 axolotl » | overworld 100.5 192 98.5 | entity.data | clé Variant | `{"compared":5,"not_compared":["CustomName","FromBucket","Health","Invulnerable","PersistenceRequired","Tags","attributes","id"],"not_compared_count":8,"java_only":["AbsorptionAmount","AgeLocked","CanPickUpLoot","FallFlying","ForcedAge","LeftHanded","NoAI","NoG…` |
| PARTIAL | entity minecraft:axolotl « EXT-068 axolotl » | overworld 136.5 192 98.5 | entity.data | clé Variant | `{"compared":5,"not_compared":["CustomName","FromBucket","Health","Invulnerable","PersistenceRequired","Tags","attributes","id"],"not_compared_count":8,"java_only":["AbsorptionAmount","AgeLocked","CanPickUpLoot","FallFlying","ForcedAge","LeftHanded","NoAI","NoG…` |
| PARTIAL | entity minecraft:bamboo_chest_raft « LIV-VEHICLE-004 » | overworld 37.5 101 139.5 | entity.data | clé Variant | `{"compared":2,"not_compared":["CustomName","Invulnerable","Items","Tags","id"],"not_compared_count":5,"differing_keys":["Variant"],"differing_count":1,"lost":[],"changed":["Variant"],"sample":{"Variant#0":["bamboo","cherry"]}}` |
| PARTIAL | entity minecraft:bamboo_raft « LIV-VEHICLE-003 » | overworld 27.5 101 139.5 | entity.data | clé Variant | `{"compared":2,"not_compared":["CustomName","Invulnerable","Tags","id"],"not_compared_count":4,"differing_keys":["Variant"],"differing_count":1,"lost":[],"changed":["Variant"],"sample":{"Variant#0":["bamboo","cherry"]}}` |
| PARTIAL | entity minecraft:cherry_boat « LIV-VEHICLE-007 » | overworld 67.5 101 139.5 | entity.data | clé Variant | `{"compared":2,"not_compared":["CustomName","Invulnerable","Tags","id"],"not_compared_count":4,"differing_keys":["Variant"],"differing_count":1,"lost":[],"changed":["Variant"],"sample":{"Variant#0":["cherry","bamboo"]}}` |
| PARTIAL | entity minecraft:cherry_chest_boat « LIV-VEHICLE-008 » | overworld 77.5 101 139.5 | entity.data | clé Variant | `{"compared":2,"not_compared":["CustomName","Invulnerable","Items","Tags","id"],"not_compared_count":5,"differing_keys":["Variant"],"differing_count":1,"lost":[],"changed":["Variant"],"sample":{"Variant#0":["cherry","bamboo"]}}` |
| PARTIAL | entity minecraft:frog « EXT-063 frog » | overworld 46.5 191 98.5 | entity.data | clé variant | `{"compared":5,"not_compared":["CustomName","Health","Invulnerable","PersistenceRequired","Tags","attributes","id"],"not_compared_count":7,"java_only":["AbsorptionAmount","CanPickUpLoot","FallFlying","LeftHanded","NoAI","NoGravity","Silent"],"differing_keys":["…` |
| PARTIAL | entity minecraft:frog « LIV-ENTITY-019 » | overworld 59.5 101 43.5 | entity.data | clé variant | `{"compared":5,"not_compared":["CustomName","Health","Invulnerable","PersistenceRequired","Tags","attributes","id"],"not_compared_count":7,"java_only":["AbsorptionAmount","CanPickUpLoot","FallFlying","LeftHanded","NoAI","Silent"],"differing_keys":["variant"],"d…` |
| PARTIAL | entity minecraft:frog « EXT-064 frog » | overworld 64.5 191 98.5 | entity.data | clé variant | `{"compared":5,"not_compared":["CustomName","Health","Invulnerable","PersistenceRequired","Tags","attributes","id"],"not_compared_count":7,"java_only":["AbsorptionAmount","CanPickUpLoot","FallFlying","LeftHanded","NoAI","NoGravity","Silent"],"differing_keys":["…` |
| PARTIAL | entity minecraft:painting « R6-026 Tableau portant motif et orientat » | overworld 30.5 220.5 51 | entity.data | clé variant | `{"compared":2,"not_compared":["CustomName","Invulnerable","Tags","block_pos","facing","id"],"not_compared_count":6,"java_only":["NoGravity"],"differing_keys":["variant"],"differing_count":1,"lost":["variant"],"changed":[],"sample":{"variant#0":["kebab",null]}}` |
| FAIL | entity minecraft:poplar_boat « LIV-VEHICLE-028 POPLAR BOAT » | overworld 107.5 101 139.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_boat « LIV-VEHICLE-028 POPLAR BOAT » | overworld 107.5 101 139.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « EXT-123 relation » | overworld 46.5 191 183.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « EXT-123 relation » | overworld 46.5 191 183.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « R6-017 Bateau-coffre peuplier avec empla » | overworld 84.5 220 32.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « R6-017 Bateau-coffre peuplier avec empla » | overworld 84.5 220 32.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « LIV-VEHICLE-029 POPLAR CHEST BOAT » | overworld 107.5 101 152.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « LIV-VEHICLE-029 POPLAR CHEST BOAT » | overworld 107.5 101 152.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |

### MINEUR — 8 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:poplar_boat « LIV-VEHICLE-028 POPLAR BOAT » | overworld 107.5 101 139.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_boat « LIV-VEHICLE-028 POPLAR BOAT » | overworld 107.5 101 139.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « EXT-123 relation » | overworld 46.5 191 183.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « EXT-123 relation » | overworld 46.5 191 183.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « R6-017 Bateau-coffre peuplier avec empla » | overworld 84.5 220 32.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « R6-017 Bateau-coffre peuplier avec empla » | overworld 84.5 220 32.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « LIV-VEHICLE-029 POPLAR CHEST BOAT » | overworld 107.5 101 152.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « LIV-VEHICLE-029 POPLAR CHEST BOAT » | overworld 107.5 101 152.5 | entity.data | données | `{"observed":"no matching entity"}` |

### ÉTAT TEMPORAIRE — 6 (direct)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | entity minecraft:cow « LIV-INTEGRATION-002 » | overworld 226.5 101 14.5 | entity.data | clé Age | `{"compared":3,"not_compared":["CustomName","Health","Invulnerable","PersistenceRequired","Tags","attributes","id","variant"],"not_compared_count":8,"java_only":["AbsorptionAmount","AgeLocked","CanPickUpLoot","FallFlying","ForcedAge","LeftHanded","NoAI","sound_…` |
| PARTIAL | entity minecraft:experience_orb | overworld 130.5 102.5 180.5 | entity.data | clé Age | `{"compared":3,"not_compared":["Count","Health","Invulnerable","Tags","id"],"not_compared_count":5,"java_only":["NoGravity"],"differing_keys":["Age"],"differing_count":1,"lost":[],"changed":["Age"],"sample":{"Age#0":[-25823,-24000]}}` |
| PARTIAL | entity minecraft:falling_block « LIV-DYNAMIC-017 » | overworld 120.5 116 150.5 | entity.data | clé Time | `{"compared":2,"not_compared":["BlockState","CancelDrop","CustomName","DropItem","FallHurtAmount","FallHurtMax","HurtEntities","Invulnerable","Tags","TileEntityData","id"],"not_compared_count":11,"java_only":["NoGravity"],"differing_keys":["Time"],"differing_co…` |
| PARTIAL | entity minecraft:item « LIV-DYNAMIC-005 » | overworld 134.5 102 150.5 | entity.data | clé Age | `{"compared":4,"not_compared":["CustomName","Health","Invulnerable","PickupDelay","Tags","id"],"not_compared_count":6,"java_only":["NoGravity"],"differing_keys":["Age"],"differing_count":1,"lost":[],"changed":["Age"],"sample":{"Age#0":[-32768,-24000]}}` |
| PARTIAL | entity minecraft:item « R6-020 Objet au sol sans disparition ni  » | overworld 138.5 220 32.5 | entity.data | clé Age | `{"compared":4,"not_compared":["CustomName","Health","Invulnerable","PickupDelay","Tags","id"],"not_compared_count":6,"java_only":["NoGravity"],"differing_keys":["Age"],"differing_count":1,"lost":[],"changed":["Age"],"sample":{"Age#0":[-32768,-24000]}}` |
| PARTIAL | entity minecraft:item « R6-021 Objet rare au sol, deux exemplair » | overworld 156.5 220 32.5 | entity.data | clé Age | `{"compared":4,"not_compared":["CustomName","Health","Invulnerable","PickupDelay","Tags","id"],"not_compared_count":6,"java_only":["NoGravity"],"differing_keys":["Age"],"differing_count":1,"lost":[],"changed":["Age"],"sample":{"Age#0":[-32768,-24000]}}` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 7 | 7 | entity.inventory 7 |
| **MAJEUR** | 46 | 35 | entity.identity 15, entity.custom_name 15, entity.data 8, entity.health 3, entity.equipment 3, block_entity.data 2 |
| **MINEUR** | 269 | 30 | entity.data 251, entity.position 15, block_entity.data 3 |
| **ÉTAT TEMPORAIRE** | 4 | 0 | entity.data 3, block_entity.data 1 |
| **TECHNIQUE (invisible)** | 54 | 0 | entity.data 54 |

### CRITIQUE — 7 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:donkey « EXT-124 relation » | overworld 64.5 191 183.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":["0:minecraft:diamondx9","3:minecraft:gold_ingotx20"],"wrong":[{"id":"minecraft:diamond","expected_slot":2,"observed":null},{"id":"minecraft:gold_ingot","expected_slot":5,"observed":null}],"extra":[{"slot":0,"observed":"minecraft:diamond"},{"slot":…` |
| FAIL | entity minecraft:donkey « R6-016 Âne avec inventaire aux extrémité » | overworld 66.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":["0:minecraft:iron_ingotx64","1:minecraft:gold_ingotx5","12:minecraft:bookx1"],"wrong":[{"id":"minecraft:iron_ingot","expected_slot":2,"observed":null},{"id":"minecraft:gold_ingot","expected_slot":3,"observed":null},{"id":"minecraft:book","expected…` |
| FAIL | entity minecraft:mule « R6-015 Mule avec trois emplacements de c » | overworld 48.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":["0:minecraft:diamondx11","2:minecraft:breadx31","12:minecraft:emeraldx7"],"wrong":[{"id":"minecraft:diamond","expected_slot":2,"observed":"minecraft:bread"},{"id":"minecraft:bread","expected_slot":4,"observed":null},{"id":"minecraft:emerald","expe…` |
| FAIL | entity minecraft:mule « EXT-125 relation » | overworld 82.5 191 183.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":["1:minecraft:mapx1","7:minecraft:breadx37"],"wrong":[{"id":"minecraft:map","expected_slot":3,"observed":null},{"id":"minecraft:bread","expected_slot":9,"observed":null}],"extra":[{"slot":1,"observed":"minecraft:map"},{"slot":7,"observed":"minecraf…` |
| FAIL | entity minecraft:poplar_chest_boat « EXT-123 relation » | overworld 46.5 191 183.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « R6-017 Bateau-coffre peuplier avec empla » | overworld 84.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « LIV-VEHICLE-029 POPLAR CHEST BOAT » | overworld 107.5 101 152.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |

### MAJEUR — 46 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:mob_spawner | overworld 158 101 138 | block_entity.data | clé SpawnData | `{"differing_keys":["SpawnData","SpawnPotentials"],"differing_count":2,"lost":[],"added":[],"changed":["SpawnData","SpawnPotentials"],"sample":{"SpawnData":["[\"c\",{\"entity\":[\"c\",{\"NoAI\":[\"n\",\"1\"],\"PersistenceRequired\":[\"n\",\"1\"],\"id\":[\"s\",\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 190 101 138 | block_entity.data | clé SpawnData | `{"differing_keys":["SpawnData","SpawnPotentials"],"differing_count":2,"lost":[],"added":[],"changed":["SpawnData","SpawnPotentials"],"sample":{"SpawnData":["[\"c\",{\"entity\":[\"c\",{\"NoAI\":[\"n\",\"1\"],\"PersistenceRequired\":[\"n\",\"1\"],\"id\":[\"s\",\…` |
| FAIL | entity minecraft:block_display « R6-028 Bloc affiché avec échelle et déca » | overworld 66.5 220 50.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:block_display « R6-028 Bloc affiché avec échelle et déca » | overworld 66.5 220 50.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:block_display « LIV-DYNAMIC-013 » | overworld 120.5 103 180.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:block_display « LIV-DYNAMIC-013 » | overworld 120.5 103 180.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:donkey « EXT-124 relation » | overworld 64.5 191 183.5 | entity.data | clé Items | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","Bred","CanPickUpLoot","EatingHaystack","FallFlying","ForcedAge","InLove","Items","LeftHanded","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","Bred","CanPickUpLoot","Eatin…` |
| PARTIAL | entity minecraft:donkey « R6-016 Âne avec inventaire aux extrémité » | overworld 66.5 220 32.5 | entity.data | clé Items | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","Bred","CanPickUpLoot","EatingHaystack","FallFlying","ForcedAge","InLove","Items","LeftHanded","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","Bred","CanPickUpLoot","Eatin…` |
| FAIL | entity minecraft:giant « LIV-ENTITY-076 » | overworld 220.5 101 58.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:giant « LIV-ENTITY-076 » | overworld 220.5 101 58.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:giant « LIV-ENTITY-076 » | overworld 220.5 101 58.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:giant « LIV-ENTITY-076 » | overworld 220.5 101 58.5 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:illusioner « LIV-ENTITY-025 » | overworld 5.5 101 52.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:illusioner « LIV-ENTITY-025 » | overworld 5.5 101 52.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:illusioner « LIV-ENTITY-025 » | overworld 5.5 101 52.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:interaction « LIV-DYNAMIC-009 » | overworld 144.5 102 160.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:interaction « LIV-DYNAMIC-009 » | overworld 144.5 102 160.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item_display « R6-029 Objet affiché avec transformation » | overworld 84.5 220 50.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item_display « R6-029 Objet affiché avec transformation » | overworld 84.5 220 50.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item_display « LIV-DYNAMIC-007 » | overworld 122.5 102 160.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item_display « LIV-DYNAMIC-007 » | overworld 122.5 102 160.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mannequin « LIV-ENTITY-029 » | overworld 41.5 101 52.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mannequin « LIV-ENTITY-029 » | overworld 41.5 101 52.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mannequin « LIV-ENTITY-029 » | overworld 41.5 101 52.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mannequin « LIV-ENTITY-029 » | overworld 41.5 101 52.5 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:mule « R6-015 Mule avec trois emplacements de c » | overworld 48.5 220 32.5 | entity.data | clé Items | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","Attributes","Bred","CanPickUpLoot","EatingHaystack","FallFlying","ForcedAge","InLove","Items","LeftHanded","attributes"],"differing_count":13,"lost":["AbsorptionAmount","Age","AgeLocked","Bred","CanPickU…` |
| PARTIAL | entity minecraft:mule « EXT-125 relation » | overworld 82.5 191 183.5 | entity.data | clé Items | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","Bred","CanPickUpLoot","EatingHaystack","FallFlying","ForcedAge","InLove","Items","LeftHanded","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","Bred","CanPickUpLoot","Eatin…` |
| FAIL | entity minecraft:poplar_boat « LIV-VEHICLE-028 POPLAR BOAT » | overworld 107.5 101 139.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_boat « LIV-VEHICLE-028 POPLAR BOAT » | overworld 107.5 101 139.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « EXT-123 relation » | overworld 46.5 191 183.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « EXT-123 relation » | overworld 46.5 191 183.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « R6-017 Bateau-coffre peuplier avec empla » | overworld 84.5 220 32.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « R6-017 Bateau-coffre peuplier avec empla » | overworld 84.5 220 32.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « LIV-VEHICLE-029 POPLAR CHEST BOAT » | overworld 107.5 101 152.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « LIV-VEHICLE-029 POPLAR CHEST BOAT » | overworld 107.5 101 152.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:spawner_minecart « LIV-VEHICLE-027 » | overworld 91.5 100.1 161.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:spawner_minecart « LIV-VEHICLE-027 » | overworld 91.5 100.1 161.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:sulfur_cube « LIV-ENTITY-070 » | overworld 16.5 101 89.5 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":["mainhand:minecraft:magma_blockx1","body:minecraft:magma_blockx1"],"extra":[{"slot":"mainhand","observed":"minecraft:magma_block"}],"extra_count":1}` |
| PARTIAL | entity minecraft:sulfur_cube « LIV-ENTITY-070 » | overworld 16.5 101 89.5 | entity.data | clé equipment | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","Attributes","CanPickUpLoot","FallFlying","ForcedAge","HandItems","LeftHanded","attributes","drop_chances","equipment","from_bucket","fuse","pickup_timer","wasOnGround"],"differing_count":17,…` |
| FAIL | entity minecraft:text_display « R6-027 Texte multilingue avec style » | overworld 48.5 220 50.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| … | 6 autres (liste complète dans le JSON) | | | | |

### MINEUR — 269 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:trial_spawner | overworld 158 101 150 | block_entity.data | clé target_cooldown_length | `{"differing_keys":["normal_config","ominous_config","spawn_data","target_cooldown_length"],"differing_count":4,"lost":["target_cooldown_length"],"added":[],"changed":["normal_config","ominous_config","spawn_data"],"sample":{"normal_config":["[\"c\",{\"simultan…` |
| PARTIAL | block_entity minecraft:trial_spawner | overworld 190 101 150 | block_entity.data | clé target_cooldown_length | `{"differing_keys":["normal_config","ominous_config","spawn_data","target_cooldown_length"],"differing_count":4,"lost":["target_cooldown_length"],"added":[],"changed":["normal_config","ominous_config","spawn_data"],"sample":{"normal_config":["[\"c\",{\"simultan…` |
| PARTIAL | block_entity minecraft:trial_spawner | overworld 222 101 150 | block_entity.data | clé target_cooldown_length | `{"differing_keys":["normal_config","ominous_config","spawn_data","target_cooldown_length"],"differing_count":4,"lost":["target_cooldown_length"],"added":[],"changed":["normal_config","ominous_config","spawn_data"],"sample":{"normal_config":["[\"c\",{\"simultan…` |
| PARTIAL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","ArmorItems","Attributes","CanPickUpLoot","FallFlying","HandItems","Inventory","LeftHanded","attributes"],"differing_count":9,"lost":["AbsorptionAmount","CanPickUpLoot","FallFlying","Inventory","LeftHanded"],"added":["Armo…` |
| PARTIAL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","ArmorItems","Attributes","FallFlying","HandItems","Inventory","LeftHanded","attributes"],"differing_count":8,"lost":["AbsorptionAmount","FallFlying","Inventory","LeftHanded"],"added":["ArmorItems","Attributes","HandItems"…` |
| PARTIAL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","ArmorItems","Attributes","CanPickUpLoot","FallFlying","HandItems","Inventory","LeftHanded","attributes"],"differing_count":9,"lost":["AbsorptionAmount","CanPickUpLoot","FallFlying","Inventory","LeftHanded"],"added":["Armo…` |
| PARTIAL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.data | clé potion_duration_scale | `{"differing_keys":["potion_duration_scale"],"differing_count":1,"lost":[],"added":[],"changed":["potion_duration_scale"]}` |
| PARTIAL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","Attributes","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFl…` |
| PARTIAL | entity minecraft:axolotl « LIV-AQUATIC-001 » | overworld 8.5 102.5 104.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","attributes"],"differing_count":11,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlying","Forced…` |
| PARTIAL | entity minecraft:axolotl « EXT-065 axolotl » | overworld 82.5 192 98.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","Attributes","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFl…` |
| PARTIAL | entity minecraft:axolotl « EXT-066 axolotl » | overworld 100.5 192 98.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","attributes"],"differing_count":11,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlying","Forced…` |
| PARTIAL | entity minecraft:axolotl « EXT-067 axolotl » | overworld 118.5 192 98.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","attributes"],"differing_count":11,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlying","Forced…` |
| PARTIAL | entity minecraft:axolotl « EXT-068 axolotl » | overworld 136.5 192 98.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","attributes"],"differing_count":11,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlying","Forced…` |
| PARTIAL | entity minecraft:axolotl « EXT-069 axolotl » | overworld 154.5 192 98.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","attributes"],"differing_count":11,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlying","Forced…` |
| PARTIAL | entity minecraft:bat « LIV-ENTITY-003 » | overworld 23.5 101 34.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","ArmorItems","CanPickUpLoot","FallFlying","HandItems","LeftHanded","attributes"],"differing_count":7,"lost":["AbsorptionAmount","CanPickUpLoot","FallFlying","LeftHanded"],"added":["ArmorItems","HandItems"],"changed":["attr…` |
| PARTIAL | entity minecraft:bee « LIV-ENTITY-004 » | overworld 32.5 101 34.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","anger_end_time","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","Fa…` |
| PARTIAL | entity minecraft:bee « R6-004 Abeille porteuse de pollen » | overworld 66.5 220 14.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","Attributes","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","anger_end_time","attributes"],"differing_count":13,"lost":["AbsorptionAmount","Age","AgeLocked","CanPi…` |
| PARTIAL | entity minecraft:bee « R6-005 Abeille ayant piqué » | overworld 84.5 220 14.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","Attributes","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","anger_end_time","attributes"],"differing_count":13,"lost":["AbsorptionAmount","Age","AgeLocked","CanPi…` |
| PARTIAL | entity minecraft:blaze « LIV-ENTITY-005 » | overworld 41.5 101 34.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","ArmorItems","CanPickUpLoot","FallFlying","HandItems","LeftHanded","attributes"],"differing_count":7,"lost":["AbsorptionAmount","CanPickUpLoot","FallFlying","LeftHanded"],"added":["ArmorItems","HandItems"],"changed":["attr…` |
| FAIL | entity minecraft:block_display « R6-028 Bloc affiché avec échelle et déca » | overworld 66.5 220 50.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:block_display « R6-028 Bloc affiché avec échelle et déca » | overworld 66.5 220 50.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:block_display « LIV-DYNAMIC-013 » | overworld 120.5 103 180.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:block_display « LIV-DYNAMIC-013 » | overworld 120.5 103 180.5 | entity.data | données | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:bogged « LIV-ENTITY-006 » | overworld 50.5 101 34.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","ArmorItems","Attributes","CanPickUpLoot","FallFlying","HandItems","LeftHanded","attributes","sheared"],"differing_count":9,"lost":["AbsorptionAmount","CanPickUpLoot","FallFlying","LeftHanded","sheared"],"added":["ArmorIte…` |
| PARTIAL | entity minecraft:breeze « LIV-ENTITY-007 » | overworld 59.5 101 34.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","ArmorItems","Attributes","CanPickUpLoot","FallFlying","HandItems","LeftHanded","attributes"],"differing_count":8,"lost":["AbsorptionAmount","CanPickUpLoot","FallFlying","LeftHanded"],"added":["ArmorItems","Attributes","Ha…` |
| PARTIAL | entity minecraft:camel « LIV-ENTITY-008 » | overworld 68.5 101 34.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","Bred","CanPickUpLoot","EatingHaystack","FallFlying","ForcedAge","InLove","LeftHanded","attributes"],"differing_count":11,"lost":["AbsorptionAmount","Age","AgeLocked","Bred","CanPickUpLoot","EatingHaystac…` |
| PARTIAL | entity minecraft:camel_husk « LIV-ENTITY-073 » | overworld 64.5 101 89.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","ArmorItems","Attributes","Bred","CanPickUpLoot","EatingHaystack","FallFlying","HandItems","InLove","LastPoseTick","LeftHanded","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Bred","CanPickUpLoot","EatingHa…` |
| PARTIAL | entity minecraft:cat « EXT-037 cat » | overworld 10.5 191 64.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat « ANNEX-BOAT-PASSENGER-2 » | overworld 10.5 191.2 183.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat « EXT-038 cat » | overworld 28.5 191 64.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","Attributes","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":13,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoo…` |
| PARTIAL | entity minecraft:cat « EXT-039 cat » | overworld 46.5 191 64.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat « EXT-040 cat » | overworld 64.5 191 64.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat « EXT-041 cat » | overworld 82.5 191 64.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat « EXT-042 cat » | overworld 100.5 191 64.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat « EXT-043 cat » | overworld 118.5 191 64.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat « LIV-PET-002 » | overworld 133.5 102 101.7 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat « EXT-033 cat » | overworld 154.5 191 47.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat « EXT-034 cat » | overworld 172.5 191 47.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat « EXT-035 cat » | overworld 190.5 191 47.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| PARTIAL | entity minecraft:cat « EXT-036 cat » | overworld 208.5 191 47.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","Sitting","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlyin…` |
| … | 229 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 4 (roundtrip)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:blast_furnace | overworld 140 101 21 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | entity minecraft:experience_orb | overworld 130.5 102.5 180.5 | entity.data | clé Age | `{"differing_keys":["Age"],"differing_count":1,"lost":[],"added":[],"changed":["Age"]}` |
| PARTIAL | entity minecraft:furnace_minecart « R7 wagonnet fuel non nul » | overworld 12.5 220 104.5 | entity.data | clé Fuel | `{"differing_keys":["ArmorItems","FlippedRotation","Fuel","HandItems","HasTicked","PushX","PushZ"],"differing_count":7,"lost":["FlippedRotation","Fuel","HasTicked","PushX","PushZ"],"added":["ArmorItems","HandItems"],"changed":[]}` |
| PARTIAL | entity minecraft:tnt_minecart « LIV-VEHICLE-025 » | overworld 63.5 100.1 161.5 | entity.data | clé fuse | `{"differing_keys":["ArmorItems","FlippedRotation","HandItems","HasTicked","fuse"],"differing_count":5,"lost":["FlippedRotation","HasTicked","fuse"],"added":["ArmorItems","HandItems"],"changed":[]}` |

