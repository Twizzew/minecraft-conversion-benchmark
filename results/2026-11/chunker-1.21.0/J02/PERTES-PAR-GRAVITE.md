# J02@2.0 — pertes classées par gravité (chunker-1.21.0, J02_aller + J02_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 41 | 41 | entity.tamed 18, entity.inventory 14, entity.trades 9 |
| **MAJEUR** | 1625 | 1625 | entity.identity 545, entity.custom_name 544, entity.health 487, entity.equipment 15, structure.spawn_zone 10, entity.baby 9, scoreboard.value 7, world.value 4, block_entity.data 2, scoreboard.presence 1, scoreboard.display_name 1 |
| **MINEUR** | 1096 | 1096 | entity.position 545, entity.data 545, world.value 6 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 41 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:acacia_chest_boat « LIV-VEHICLE-002 » | overworld 17.5 101 139.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:camel « LIV-ENTITY-008 » | overworld 68.5 101 34.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:camel_husk « LIV-ENTITY-073 » | overworld 64.5 101 89.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cherry_chest_boat « LIV-VEHICLE-008 » | overworld 77.5 101 139.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart « LIV-VEHICLE-022 » | overworld 21.5 100.1 161.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart « R6-019 Wagonnet-coffre avec plusieurs ca » | overworld 120.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « EXT-124 relation » | overworld 64.5 191 183.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « EXT-124 relation » | overworld 64.5 191 183.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « R6-016 Âne avec inventaire aux extrémité » | overworld 66.5 220 32.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « R6-016 Âne avec inventaire aux extrémité » | overworld 66.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:hopper_minecart « LIV-VEHICLE-023 » | overworld 35.5 100.1 161.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:hopper_minecart « R6-018 Wagonnet à entonnoir désactivé et » | overworld 102.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-097 horse » | overworld 10.5 191 149.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-098 horse » | overworld 28.5 191 149.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-122 relation » | overworld 28.5 191 183.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-099 horse » | overworld 46.5 191 149.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-100 horse » | overworld 64.5 191 149.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-090 horse » | overworld 100.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-091 horse » | overworld 118.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-092 horse » | overworld 136.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-093 horse » | overworld 154.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-094 horse » | overworld 172.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-095 horse » | overworld 190.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-096 horse » | overworld 208.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mule « R6-015 Mule avec trois emplacements de c » | overworld 48.5 220 32.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mule « R6-015 Mule avec trois emplacements de c » | overworld 48.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mule « EXT-125 relation » | overworld 82.5 191 183.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mule « EXT-125 relation » | overworld 82.5 191 183.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:oak_chest_boat « LIV-VEHICLE-016 » | overworld 57.5 101 152.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « EXT-123 relation » | overworld 46.5 191 183.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « R6-017 Bateau-coffre peuplier avec empla » | overworld 84.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « LIV-VEHICLE-029 POPLAR CHEST BOAT » | overworld 107.5 101 152.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-VILLAGER-001 » | overworld 124.5 101 72.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-RAID-VILLAGER-001 » | overworld 133.6 101 21.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-RAID-VILLAGER-002 » | overworld 136.1 102.3 21.9 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-VILLAGER-002 » | overworld 136.5 101 72.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-RAID-VILLAGER-003 » | overworld 139.5 101 20.2 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-RAID-VILLAGER-004 » | overworld 145.8 101 21.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-VILLAGER-003 » | overworld 148.5 101 72.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « R6-011 Villageois avec échange consommé  » | overworld 192.5 220 14.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| … | 1 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 1625 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:beehive | overworld 12 220 14 | block_entity.data | clé bees | `{"compared":5,"not_compared":["components","id"],"not_compared_count":2,"differing_keys":["bees","ticks_in_hive"],"differing_count":5,"lost":["ticks_in_hive","bees"],"changed":["bees"],"sample":{"bees#0":[2,0],"ticks_in_hive#1":[1999999777,null],"bees#2":[1,nu…` |
| FAIL | block_entity minecraft:beehive | overworld 30 220 14 | block_entity.data | clé bees | `{"compared":3,"not_compared":["components","id"],"not_compared_count":2,"differing_keys":["bees","ticks_in_hive"],"differing_count":3,"lost":["ticks_in_hive","bees"],"changed":["bees"],"sample":{"bees#0":[1,0],"ticks_in_hive#1":[1999999777,null],"bees#2":[0,nu…` |
| FAIL | entity minecraft:acacia_boat « LIV-VEHICLE-001 » | overworld 7.5 101 139.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_boat « LIV-VEHICLE-001 » | overworld 7.5 101 139.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_chest_boat « LIV-VEHICLE-002 » | overworld 17.5 101 139.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_chest_boat « LIV-VEHICLE-002 » | overworld 17.5 101 139.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « J02 26.3 ANNEX /function mccb_living:ann » | overworld 4.5 196.5 4.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « J02 26.3 ANNEX /function mccb_living:ann » | overworld 4.5 196.5 4.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « J02 26.3 ANNEX /function mccb_living:ann » | overworld 4.5 196.5 4.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « MCCB J02 LIVING — JAVA 26.3 » | overworld 5 103 5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « MCCB J02 LIVING — JAVA 26.3 » | overworld 5 103 5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « MCCB J02 LIVING — JAVA 26.3 » | overworld 5 103 5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « Run verify before freezing source » | overworld 5 102.4 9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « Run verify before freezing source » | overworld 5 102.4 9 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « Run verify before freezing source » | overworld 5 102.4 9 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-001 » | overworld 5 105.2 31.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-001 » | overworld 5 105.2 31.6 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-001 » | overworld 5 105.2 31.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-013 » | overworld 5 105.2 40.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-013 » | overworld 5 105.2 40.6 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-013 » | overworld 5 105.2 40.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-025 » | overworld 5 105.2 49.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-025 » | overworld 5 105.2 49.6 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-025 » | overworld 5 105.2 49.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-037 » | overworld 5 105.2 58.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| … | 1585 autres (liste complète dans le JSON) | | | | |

### MINEUR — 1096 (direct)

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
| … | 1056 autres (liste complète dans le JSON) | | | | |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 41 | 41 | entity.tamed 18, entity.inventory 14, entity.trades 9 |
| **MAJEUR** | 1687 | 1662 | entity.custom_name 563, entity.identity 561, entity.health 490, entity.data 21, entity.equipment 17, structure.spawn_zone 10, entity.baby 9, scoreboard.value 7, block_entity.data 4, world.value 3, scoreboard.presence 1, scoreboard.display_name 1 |
| **MINEUR** | 1138 | 1132 | entity.position 565, entity.data 561, block_entity.data 6, world.value 6 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 41 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:acacia_chest_boat « LIV-VEHICLE-002 » | overworld 17.5 101 139.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:camel « LIV-ENTITY-008 » | overworld 68.5 101 34.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:camel_husk « LIV-ENTITY-073 » | overworld 64.5 101 89.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cherry_chest_boat « LIV-VEHICLE-008 » | overworld 77.5 101 139.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart « LIV-VEHICLE-022 » | overworld 21.5 100.1 161.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart « R6-019 Wagonnet-coffre avec plusieurs ca » | overworld 120.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « EXT-124 relation » | overworld 64.5 191 183.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « EXT-124 relation » | overworld 64.5 191 183.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « R6-016 Âne avec inventaire aux extrémité » | overworld 66.5 220 32.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « R6-016 Âne avec inventaire aux extrémité » | overworld 66.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:hopper_minecart « LIV-VEHICLE-023 » | overworld 35.5 100.1 161.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:hopper_minecart « R6-018 Wagonnet à entonnoir désactivé et » | overworld 102.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-097 horse » | overworld 10.5 191 149.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-098 horse » | overworld 28.5 191 149.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-122 relation » | overworld 28.5 191 183.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-099 horse » | overworld 46.5 191 149.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-100 horse » | overworld 64.5 191 149.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-090 horse » | overworld 100.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-091 horse » | overworld 118.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-092 horse » | overworld 136.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-093 horse » | overworld 154.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-094 horse » | overworld 172.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-095 horse » | overworld 190.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-096 horse » | overworld 208.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mule « R6-015 Mule avec trois emplacements de c » | overworld 48.5 220 32.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mule « R6-015 Mule avec trois emplacements de c » | overworld 48.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mule « EXT-125 relation » | overworld 82.5 191 183.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:mule « EXT-125 relation » | overworld 82.5 191 183.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:oak_chest_boat « LIV-VEHICLE-016 » | overworld 57.5 101 152.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « EXT-123 relation » | overworld 46.5 191 183.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « R6-017 Bateau-coffre peuplier avec empla » | overworld 84.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « LIV-VEHICLE-029 POPLAR CHEST BOAT » | overworld 107.5 101 152.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-VILLAGER-001 » | overworld 124.5 101 72.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-RAID-VILLAGER-001 » | overworld 133.6 101 21.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-RAID-VILLAGER-002 » | overworld 136.1 102.3 21.9 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-VILLAGER-002 » | overworld 136.5 101 72.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-RAID-VILLAGER-003 » | overworld 139.5 101 20.2 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-RAID-VILLAGER-004 » | overworld 145.8 101 21.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-VILLAGER-003 » | overworld 148.5 101 72.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « R6-011 Villageois avec échange consommé  » | overworld 192.5 220 14.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| … | 1 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 1687 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:mob_spawner | overworld 158 101 138 | block_entity.data | clé SpawnData | `{"differing_keys":["SpawnData","SpawnPotentials"],"differing_count":2,"lost":[],"added":[],"changed":["SpawnData","SpawnPotentials"],"sample":{"SpawnData":["[\"c\",{\"entity\":[\"c\",{\"NoAI\":[\"n\",\"1\"],\"PersistenceRequired\":[\"n\",\"1\"],\"id\":[\"s\",\…` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 190 101 138 | block_entity.data | clé SpawnData | `{"differing_keys":["SpawnData","SpawnPotentials"],"differing_count":2,"lost":[],"added":[],"changed":["SpawnData","SpawnPotentials"],"sample":{"SpawnData":["[\"c\",{\"entity\":[\"c\",{\"NoAI\":[\"n\",\"1\"],\"PersistenceRequired\":[\"n\",\"1\"],\"id\":[\"s\",\…` |
| PARTIAL | block_entity minecraft:beehive | overworld 12 220 14 | block_entity.data | clé bees | `{"differing_keys":["bees"],"differing_count":1,"lost":[],"added":[],"changed":["bees"],"sample":{"bees":["[\"l\",[[\"c\",{\"entity_data\":[\"c\",{\"CustomName\":[\"s\",\"R6-BEE-A\"],\"HasNectar\":[\"n\",\"1\"],\"id\":[\"s\",\"minecraft:bee\"]}],\"min_ticks_in_…` |
| PARTIAL | block_entity minecraft:beehive | overworld 30 220 14 | block_entity.data | clé bees | `{"differing_keys":["bees"],"differing_count":1,"lost":[],"added":[],"changed":["bees"],"sample":{"bees":["[\"l\",[[\"c\",{\"entity_data\":[\"c\",{\"CustomName\":[\"s\",\"R6-BEE-C\"],\"id\":[\"s\",\"minecraft:bee\"]}],\"min_ticks_in_hive\":[\"n\",\"2000000000\"…` |
| FAIL | entity minecraft:acacia_boat « LIV-VEHICLE-001 » | overworld 7.5 101 139.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_boat « LIV-VEHICLE-001 » | overworld 7.5 101 139.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_chest_boat « LIV-VEHICLE-002 » | overworld 17.5 101 139.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:acacia_chest_boat « LIV-VEHICLE-002 » | overworld 17.5 101 139.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « J02 26.3 ANNEX /function mccb_living:ann » | overworld 4.5 196.5 4.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « J02 26.3 ANNEX /function mccb_living:ann » | overworld 4.5 196.5 4.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « J02 26.3 ANNEX /function mccb_living:ann » | overworld 4.5 196.5 4.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « MCCB J02 LIVING — JAVA 26.3 » | overworld 5 103 5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « MCCB J02 LIVING — JAVA 26.3 » | overworld 5 103 5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « MCCB J02 LIVING — JAVA 26.3 » | overworld 5 103 5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « Run verify before freezing source » | overworld 5 102.4 9 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « Run verify before freezing source » | overworld 5 102.4 9 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « Run verify before freezing source » | overworld 5 102.4 9 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-001 » | overworld 5 105.2 31.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-001 » | overworld 5 105.2 31.6 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-001 » | overworld 5 105.2 31.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-013 » | overworld 5 105.2 40.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-013 » | overworld 5 105.2 40.6 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-013 » | overworld 5 105.2 40.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-025 » | overworld 5 105.2 49.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-025 » | overworld 5 105.2 49.6 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| … | 1647 autres (liste complète dans le JSON) | | | | |

### MINEUR — 1138 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:trial_spawner | overworld 158 101 150 | block_entity.data | clé normal_config | `{"differing_keys":["normal_config","ominous_config","spawn_data","target_cooldown_length"],"differing_count":4,"lost":["normal_config","ominous_config","spawn_data","target_cooldown_length"],"added":[],"changed":[],"sample":{"normal_config":["[\"c\",{\"simulta…` |
| PARTIAL | block_entity minecraft:vault | overworld 158 101 190 | block_entity.data | clé server_data | `{"differing_keys":["server_data"],"differing_count":1,"lost":[],"added":[],"changed":["server_data"],"sample":{"server_data":["[\"c\",{\"state_updating_resumes_at\":[\"n\",\"8199\"]}]","[\"c\",{}]"]}}` |
| PARTIAL | block_entity minecraft:trial_spawner | overworld 190 101 150 | block_entity.data | clé normal_config | `{"differing_keys":["normal_config","ominous_config","spawn_data","target_cooldown_length"],"differing_count":4,"lost":["normal_config","ominous_config","spawn_data","target_cooldown_length"],"added":[],"changed":[],"sample":{"normal_config":["[\"c\",{\"simulta…` |
| PARTIAL | block_entity minecraft:vault | overworld 190 101 190 | block_entity.data | clé config | `{"differing_keys":["config","server_data"],"differing_count":2,"lost":[],"added":[],"changed":["config","server_data"],"sample":{"config":["[\"c\",{\"key_item\":[\"c\",{\"count\":[\"n\",\"1\"],\"id\":[\"s\",\"minecraft:ominous_trial_key\"]}],\"loot_table\":[\"…` |
| PARTIAL | block_entity minecraft:trial_spawner | overworld 222 101 150 | block_entity.data | clé normal_config | `{"differing_keys":["normal_config","ominous_config","spawn_data","target_cooldown_length"],"differing_count":4,"lost":["normal_config","ominous_config","spawn_data","target_cooldown_length"],"added":[],"changed":[],"sample":{"normal_config":["[\"c\",{\"simulta…` |
| PARTIAL | block_entity minecraft:vault | overworld 222 101 190 | block_entity.data | clé server_data | `{"differing_keys":["server_data"],"differing_count":1,"lost":[],"added":[],"changed":["server_data"],"sample":{"server_data":["[\"c\",{\"state_updating_resumes_at\":[\"n\",\"8199\"]}]","[\"c\",{}]"]}}` |
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
| … | 1098 autres (liste complète dans le JSON) | | | | |

