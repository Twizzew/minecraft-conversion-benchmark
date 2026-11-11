# J02@2.0 — pertes classées par gravité (umt-1.5.10, J02_aller + J02_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 12 | 12 | item_stack.identity 4, item_stack.count 4, entity.tamed 2, entity.trades 1, player.xp_level 1 |
| **MAJEUR** | 247 | 233 | entity.custom_name 73, entity.identity 64, entity.health 48, entity.data 14, block_entity.presence 10, structure.spawn_zone 10, scoreboard.value 7, entity.equipment 5, entity.baby 4, world.value 4, block_entity.custom_name 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 135 | 133 | entity.position 64, entity.data 64, entity.trade_xp 5, world.value 2 |
| **ÉTAT TEMPORAIRE** | 1 | 0 | entity.data 1 |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 12 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:ominous_bottle | overworld 160 101 14 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:ominous_bottle | overworld 160 101 14 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 160 101 14 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 160 101 14 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 160 101 14 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 160 101 14 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:golden_apple | overworld 160 101 14 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:golden_apple | overworld 160 101 14 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | entity minecraft:horse « EXT-099 horse » | overworld 46.5 191 149.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-091 horse » | overworld 118.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-VILLAGER-003 » | overworld 148.5 101 72.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | player 5bcbe855-323c-4f1e-a587-5f348834b848 | 5bcbe855-323c-4f1e-a587-5f348834b848 | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 247 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:trial_spawner | overworld 158 101 150 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 158 101 190 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel « RAID SUPPLIES » | overworld 160 101 14 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel « RAID SUPPLIES » | overworld 160 101 14 | block_entity.custom_name | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:trial_spawner | overworld 190 101 150 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 190 101 190 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:trial_spawner | overworld 222 101 150 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 222 101 190 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 12 220 14 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 30 220 14 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 48 220 14 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-052 » | overworld 32 105.2 67.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-052 » | overworld 32 105.2 67.6 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-052 » | overworld 32 105.2 67.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-023 » | overworld 35 104 158.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-023 » | overworld 35 104 158.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-023 » | overworld 35 104 158.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-014 » | overworld 37 104 149.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-014 » | overworld 37 104 149.8 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-014 » | overworld 37 104 149.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-053 » | overworld 41 105.2 67.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-053 » | overworld 41 105.2 67.6 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-053 » | overworld 41 105.2 67.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-015 » | overworld 47 104 149.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-015 » | overworld 47 104 149.8 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-015 » | overworld 47 104 149.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-005 » | overworld 64 106 101.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-005 » | overworld 64 106 101.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-005 » | overworld 64 106 101.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-006 » | overworld 78 106 101.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-006 » | overworld 78 106 101.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-006 » | overworld 78 106 101.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « R6-006 RENARD » | overworld 102.5 224 14.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « R6-006 RENARD » | overworld 102.5 224 14.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « R6-006 RENARD » | overworld 102.5 224 14.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-001 » | overworld 120 106 135.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-001 » | overworld 120 106 135.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-001 » | overworld 120 106 135.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| … | 207 autres (liste complète dans le JSON) | | | | |

### MINEUR — 135 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-052 » | overworld 32 105.2 67.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-052 » | overworld 32 105.2 67.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-023 » | overworld 35 104 158.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-023 » | overworld 35 104 158.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-014 » | overworld 37 104 149.8 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-014 » | overworld 37 104 149.8 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-053 » | overworld 41 105.2 67.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-053 » | overworld 41 105.2 67.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-015 » | overworld 47 104 149.8 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-015 » | overworld 47 104 149.8 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-005 » | overworld 64 106 101.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-005 » | overworld 64 106 101.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-006 » | overworld 78 106 101.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-006 » | overworld 78 106 101.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « R6-006 RENARD » | overworld 102.5 224 14.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « R6-006 RENARD » | overworld 102.5 224 14.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-001 » | overworld 120 106 135.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-001 » | overworld 120 106 135.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-001 » | overworld 120.5 100 138.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-001 » | overworld 120.5 100 138.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-015 XP ORB » | overworld 130 106 177.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-015 XP ORB » | overworld 130 106 177.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « Player A throws pearl; never inject Owne » | overworld 130 107.4 188 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « Player A throws pearl; never inject Owne » | overworld 130 107.4 188 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-016 ENDER PEARL STASIS » | overworld 130 108 188 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-016 ENDER PEARL STASIS » | overworld 130 108 188 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-020 ENDER DRAGON (HOVER PHAS » | overworld 132 112 184 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-020 ENDER DRAGON (HOVER PHAS » | overworld 132 112 184 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-014 » | overworld 140 106 177.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-014 » | overworld 140 106 177.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VILLAGER-003 » | overworld 148 105 69 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VILLAGER-003 » | overworld 148 105 69 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « R6-010 VILLAGEOIS » | overworld 174.5 224 14.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « R6-010 VILLAGEOIS » | overworld 174.5 224 14.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « R6-036 REPRODUCTION » | overworld 210.5 224 50.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « R6-036 REPRODUCTION » | overworld 210.5 224 50.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-076 » | overworld 220 105.2 55.4 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-076 » | overworld 220 105.2 55.4 | entity.data | données | `{"observed":"no matching entity"}` |
| … | 95 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 1 (direct)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | entity minecraft:tadpole « LIV-AQUATIC-011 » | overworld 50.5 102.5 118.5 | entity.data | clé Age | `{"compared":3,"not_compared":["CustomName","FromBucket","Health","Invulnerable","PersistenceRequired","Tags","attributes","id"],"not_compared_count":8,"java_only":["AbsorptionAmount","AgeLocked","CanPickUpLoot","FallFlying","LeftHanded","NoAI","NoGravity","Sil…` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 15 | 15 | item_stack.identity 4, item_stack.count 4, entity.inventory 3, entity.tamed 2, entity.trades 1, player.xp_level 1 |
| **MAJEUR** | 623 | 344 | entity.data 276, entity.health 107, entity.custom_name 98, entity.identity 85, entity.equipment 10, structure.spawn_zone 10, block_entity.presence 9, scoreboard.value 7, entity.baby 4, block.state 3, block_entity.data 3, world.value 3, block_entity.custom_name 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 413 | 192 | entity.data 306, entity.position 91, block_entity.data 9, world.value 7 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 15 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:ominous_bottle | overworld 160 101 14 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:ominous_bottle | overworld 160 101 14 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:shield | overworld 160 101 14 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:shield | overworld 160 101 14 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 160 101 14 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 160 101 14 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:golden_apple | overworld 160 101 14 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:golden_apple | overworld 160 101 14 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | entity minecraft:horse « EXT-099 horse » | overworld 46.5 191 149.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse « EXT-091 horse » | overworld 118.5 191 132.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « EXT-123 relation » | overworld 46.5 191 183.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « R6-017 Bateau-coffre peuplier avec empla » | overworld 84.5 220 32.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:poplar_chest_boat « LIV-VEHICLE-029 POPLAR CHEST BOAT » | overworld 107.5 101 152.5 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager « LIV-VILLAGER-003 » | overworld 148.5 101 72.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | player 5bcbe855-323c-4f1e-a587-5f348834b848 | 5bcbe855-323c-4f1e-a587-5f348834b848 | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 623 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:chest | overworld 12 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:chest | overworld 40 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:chest | overworld 68 101 184 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 158 101 138 | block_entity.data | clé SpawnData | `{"differing_keys":["SpawnData","SpawnPotentials"],"differing_count":2,"lost":[],"added":[],"changed":["SpawnData","SpawnPotentials"],"sample":{"SpawnData":["[\"c\",{\"entity\":[\"c\",{\"NoAI\":[\"n\",\"1\"],\"PersistenceRequired\":[\"n\",\"1\"],\"id\":[\"s\",\…` |
| FAIL | block_entity minecraft:trial_spawner | overworld 158 101 150 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 158 101 190 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel « RAID SUPPLIES » | overworld 160 101 14 | block_entity.custom_name | bloc-entité absent, disque ou nom de conteneur | `{"observed":null}` |
| PARTIAL | block_entity minecraft:barrel « RAID SUPPLIES » | overworld 160 101 14 | block_entity.data | clé CustomName | `{"differing_keys":["CustomName"],"differing_count":1,"lost":["CustomName"],"added":[],"changed":[],"sample":{"CustomName":["[\"s\",\"RAID SUPPLIES\"]",null]}}` |
| PARTIAL | block_entity minecraft:mob_spawner | overworld 190 101 138 | block_entity.data | clé SpawnData | `{"differing_keys":["SpawnData","SpawnPotentials"],"differing_count":2,"lost":[],"added":[],"changed":["SpawnData","SpawnPotentials"],"sample":{"SpawnData":["[\"c\",{\"entity\":[\"c\",{\"NoAI\":[\"n\",\"1\"],\"PersistenceRequired\":[\"n\",\"1\"],\"id\":[\"s\",\…` |
| FAIL | block_entity minecraft:trial_spawner | overworld 190 101 150 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 190 101 190 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:trial_spawner | overworld 222 101 150 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 222 101 190 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 12 220 14 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 30 220 14 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 48 220 14 | block_entity.presence | bloc-entité absent, disque ou nom de conteneur | `{"observed":"no block entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:armor_stand « J02 26.3 ANNEX /function mccb_living:ann » | overworld 4.5 196.5 4.5 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « MCCB J02 LIVING — JAVA 26.3 » | overworld 5 103 5 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « Run verify before freezing source » | overworld 5 102.4 9 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-ENTITY-001 » | overworld 5 105.2 31.6 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-ENTITY-013 » | overworld 5 105.2 40.6 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-ENTITY-025 » | overworld 5 105.2 49.6 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-ENTITY-037 » | overworld 5 105.2 58.6 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-ENTITY-049 » | overworld 5 105.2 67.6 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-ENTITY-061 » | overworld 5 105.2 76.6 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-VEHICLE-001 » | overworld 7 104 136.8 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-VEHICLE-011 » | overworld 7 104 149.8 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-VEHICLE-021 » | overworld 7 104 158.5 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-AQUATIC-001 » | overworld 8 106 101.5 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-AQUATIC-008 » | overworld 8 106 115.5 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « CUSHION / CASES 001 » | overworld 8.5 195 10.5 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « RELATION / CASES 121 » | overworld 8.5 195 180.5 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « R6-001 RUCHE » | overworld 12.5 224 14.5 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « R6-013 PASSAGERS » | overworld 12.5 224 32.5 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « R6-025 DECOR » | overworld 12.5 224 50.5 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « R6-037 REPRODUCTION » | overworld 12.5 224 68.5 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-ENTITY-002 » | overworld 14 105.2 31.6 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| PARTIAL | entity minecraft:armor_stand « LIV-ENTITY-014 » | overworld 14 105.2 40.6 | entity.data | clé CustomNameVisible | `{"differing_keys":["CanPickUpLoot","CustomNameVisible","Dimension","Invisible","LeftHanded","Marker","NoGravity","PersistenceRequired","ShowArms","Tags","attributes"],"differing_count":11,"lost":["CustomNameVisible","Marker","NoGravity","Tags"],"added":["CanPi…` |
| … | 583 autres (liste complète dans le JSON) | | | | |

### MINEUR — 413 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:trial_spawner | overworld 158 101 150 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 158 101 190 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:trial_spawner | overworld 190 101 150 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 190 101 190 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:trial_spawner | overworld 222 101 150 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:vault | overworld 222 101 190 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 12 220 14 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 30 220 14 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld 48 220 14 | block_entity.data | données | `{"observed":"no block entity"}` |
| PARTIAL | entity minecraft:acacia_boat « LIV-VEHICLE-001 » | overworld 7.5 101 139.5 | entity.data | clé Tags | `{"differing_keys":["Dimension","Tags"],"differing_count":2,"lost":["Tags"],"added":["Dimension"],"changed":[]}` |
| PARTIAL | entity minecraft:acacia_chest_boat « LIV-VEHICLE-002 » | overworld 17.5 101 139.5 | entity.data | clé Tags | `{"differing_keys":["Dimension","Tags"],"differing_count":2,"lost":["Tags"],"added":["Dimension"],"changed":[]}` |
| PARTIAL | entity minecraft:allay « LIV-ENTITY-001 » | overworld 5.5 101 34.5 | entity.data | clé NoAI | `{"differing_keys":["Dimension","DuplicationCooldown","NoAI","Silent","Tags","attributes","listener"],"differing_count":7,"lost":["DuplicationCooldown","NoAI","Silent","Tags","listener"],"added":["Dimension"],"changed":["attributes"],"key_detail":{"attributes":…` |
| PARTIAL | entity minecraft:allay « R6-008 Allay équipé et délai de duplicat » | overworld 138.5 220 14.5 | entity.data | clé NoAI | `{"differing_keys":["CanPickUpLoot","Dimension","DuplicationCooldown","NoAI","NoGravity","Tags","attributes","listener"],"differing_count":8,"lost":["DuplicationCooldown","NoAI","NoGravity","Tags","listener"],"added":["Dimension"],"changed":["CanPickUpLoot","at…` |
| PARTIAL | entity minecraft:allay « R6-009 Allay prêt pour duplication » | overworld 156.5 220 14.5 | entity.data | clé NoAI | `{"differing_keys":["Dimension","DuplicationCooldown","NoAI","NoGravity","Tags","attributes","listener"],"differing_count":7,"lost":["DuplicationCooldown","NoAI","NoGravity","Tags","listener"],"added":["Dimension"],"changed":["attributes"],"key_detail":{"attrib…` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:area_effect_cloud « LIV-DYNAMIC-006 » | overworld 144.5 102 150.5 | entity.data | données | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:armadillo « LIV-ENTITY-002 » | overworld 14.5 101 34.5 | entity.data | clé NoAI | `{"differing_keys":["Dimension","Health","NoAI","Silent","Tags","attributes","scute_time"],"differing_count":7,"lost":["NoAI","Silent","Tags","scute_time"],"added":["Dimension"],"changed":["Health","attributes"],"key_detail":{"attributes":"MINOR"}}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-052 » | overworld 32 105.2 67.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-052 » | overworld 32 105.2 67.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-023 » | overworld 35 104 158.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-023 » | overworld 35 104 158.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-014 » | overworld 37 104 149.8 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-014 » | overworld 37 104 149.8 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-053 » | overworld 41 105.2 67.6 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-ENTITY-053 » | overworld 41 105.2 67.6 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-015 » | overworld 47 104 149.8 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-VEHICLE-015 » | overworld 47 104 149.8 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-005 » | overworld 64 106 101.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-005 » | overworld 64 106 101.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-006 » | overworld 78 106 101.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-AQUATIC-006 » | overworld 78 106 101.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « R6-006 RENARD » | overworld 102.5 224 14.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « R6-006 RENARD » | overworld 102.5 224 14.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-001 » | overworld 120 106 135.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-001 » | overworld 120 106 135.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-001 » | overworld 120.5 100 138.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-001 » | overworld 120.5 100 138.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-015 XP ORB » | overworld 130 106 177.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « LIV-DYNAMIC-015 XP ORB » | overworld 130 106 177.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armor_stand « Player A throws pearl; never inject Owne » | overworld 130 107.4 188 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| … | 373 autres (liste complète dans le JSON) | | | | |

