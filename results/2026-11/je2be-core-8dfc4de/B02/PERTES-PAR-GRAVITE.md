# B02@1.0 — pertes classées par gravité (je2be-core-8dfc4de, B02_aller + B02_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 6 | 6 | entity.tamed 1, player.xp_level 1, player.inventory 1, player.ender_chest 1, player.armor 1, player.details 1 |
| **MAJEUR** | 16 | 15 | entity.identity 5, entity.health 4, entity.data 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1, player.spawn_point 1 |
| **MINEUR** | 10 | 10 | entity.position 5, entity.data 5 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 11 | 2 | entity.data 11 |

### CRITIQUE — 6 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | player ~local_player | ~local_player | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.ender_chest | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.armor | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.details | détail d’un objet du joueur (enchantement, décoration d’armure, potion, contenu…) | `{"observed":"no player"}` |

### MAJEUR — 16 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld -3.5 -59.7 15.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld 2.5 -59.7 3.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:thrown_trident | overworld -0.9 -60 -2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:wandering_trader | overworld -11.3 -60 19.3 | entity.data | clé active_effects | `{"compared":2,"not_compared":["ActiveEffects","Armor","Attributes","Chested","Color","Color2","Dead","HasExecuted","HighTierCuredDiscount","HomeDimensionId","HomePos","Invulnerable","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain",…` |
| FAIL | entity minecraft:wolf | overworld -0.3 -60 -9.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":8}` |
| FAIL | entity minecraft:wolf | overworld 2 -59.4 0.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":8}` |
| FAIL | entity minecraft:wolf | overworld 3.6 -60 -6.9 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":8}` |
| FAIL | player ~local_player | ~local_player | player.position | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.dimension | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.game_mode | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.health | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.food | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.spawn_point | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |

### MINEUR — 10 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld -3.5 -59.7 15.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld -3.5 -59.7 15.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld 2.5 -59.7 3.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld 2.5 -59.7 3.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:thrown_trident | overworld -0.9 -60 -2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:thrown_trident | overworld -0.9 -60 -2 | entity.data | données | `{"observed":"no matching entity"}` |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 8 | 6 | player.inventory 2, player.armor 2, item_stack.identity 1, item_stack.count 1, entity.tamed 1, player.xp_level 1 |
| **MAJEUR** | 61 | 16 | entity.data 45, item_stack.tag 6, entity.identity 2, item_stack.component:minecraft:repair_cost 1, entity.custom_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1, player.spawn_point 1 |
| **MINEUR** | 30 | 7 | entity.data 21, block_entity.data 4, entity.position 2, world.value 2, player.spawn_point 1 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 3 | 2 | entity.equipment 2, block_entity.data 1 |

### CRITIQUE — 8 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:diamond_spear | overworld 0 -60 3 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:diamond_spear | overworld 0 -60 3 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | entity minecraft:happy_ghast | overworld -4.6 -56.5 19.1 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":false}` |
| PARTIAL | player ~local_player | ~local_player | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"matched":32,"expected":33,"wrong":[{"id":"minecraft:netherite_sword","expected_slot":0,"observed":"minecraft:netherite_sword","differs":["tag.ench[0].id","tag.ench[1].id","tag.ench[1].lvl","tag.ench[2].id","tag.ench[2].lvl","tag.ench[3].id","tag.ench[3].lvl"…` |
| PARTIAL | player ~local_player | ~local_player | player.armor | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"matched":1,"expected":5,"wrong":[{"id":"minecraft:diamond_helmet","expected_slot":"head","observed":"minecraft:diamond_helmet","differs":["tag.ench[0].id","tag.ench[1].id","tag.ench[1].lvl","tag.ench[2].id","tag.ench[2].lvl","tag.ench[3].id","tag.ench[3].lvl…` |
| FAIL | player player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player.armor | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 61 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.tag | données Bedrock d'un objet (tag / aux) | `{"observed":"{\"Damage\":2,\"RepairCost\":3,\"chargedItem\":{\"Count\":3b,\"Damage\":30s,\"Name\":\"minecraft:arrow\",\"WasPickedUp\":0b},\"ench\":[{\"id\":33s,\"lvl\":1s},{\"id\":17s,\"lvl\":2s}]}"}` |
| FAIL | item_stack minecraft:golden_shovel | overworld -1 -60 3 | item_stack.tag | données Bedrock d'un objet (tag / aux) | `{"observed":"{\"Damage\":0,\"RepairCost\":7,\"ench\":[{\"id\":15s,\"lvl\":5s},{\"id\":16s,\"lvl\":1s},{\"id\":17s,\"lvl\":2s}]}"}` |
| FAIL | item_stack minecraft:netherite_pickaxe | overworld -1 -60 3 | item_stack.tag | données Bedrock d'un objet (tag / aux) | `{"observed":"{\"Damage\":0,\"RepairCost\":3,\"ench\":[{\"id\":15s,\"lvl\":3s},{\"id\":18s,\"lvl\":3s}]}"}` |
| FAIL | item_stack minecraft:diamond_spear | overworld 0 -60 3 | item_stack.component:minecraft:repair_cost | autre propriété d'un objet | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:diamond_spear | overworld 0 -60 3 | item_stack.tag | données Bedrock d'un objet (tag / aux) | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:wooden_axe | overworld 0 -60 3 | item_stack.tag | données Bedrock d'un objet (tag / aux) | `{"observed":"{\"Damage\":52,\"RepairCost\":15,\"ench\":[{\"id\":15s,\"lvl\":2s},{\"id\":26s,\"lvl\":1s},{\"id\":10s,\"lvl\":5s},{\"id\":17s,\"lvl\":3s}]}"}` |
| FAIL | item_stack minecraft:copper_hoe | overworld 0 -60 3 | item_stack.tag | données Bedrock d'un objet (tag / aux) | `{"observed":"{\"Damage\":0,\"RepairCost\":15,\"display\":{\"Name\":\"§1 Blue hoe\"},\"ench\":[{\"id\":18s,\"lvl\":3s},{\"id\":26s,\"lvl\":1s},{\"id\":17s,\"lvl\":2s},{\"id\":28s,\"lvl\":1s}]}"}` |
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:arrow | overworld -4.4 -58.8 17.5 | entity.data | clé definitions | `{"differing_keys":["CollisionPos","Dir","IsOutOfControl","OwnerID","OwnerNew","StuckToBlockPos","TargetID","auxValue","definitions","enchantFlame","enchantInfinity","enchantPower","enchantPunch","isCreative","mobEffects"],"differing_count":15,"lost":["Collisio…` |
| PARTIAL | entity minecraft:arrow | overworld 2.5 -60 19.2 | entity.data | clé definitions | `{"differing_keys":["CollisionPos","Dir","IsOutOfControl","OwnerID","OwnerNew","StuckToBlockPos","TargetID","auxValue","definitions","enchantFlame","enchantInfinity","enchantPower","enchantPunch","isCreative","mobEffects"],"differing_count":15,"lost":["Collisio…` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":null}` |
| PARTIAL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.data | clé CustomName | `{"differing_keys":["AttackTime","Attributes","BodyRot","CustomName","CustomNameVisible","IsOutOfControl","LeasherID","NaturalSpawn","OwnerNew","SkipBodySlotUpgrade","SlotDropChances","Surface","Temper","definitions","expDropEnabled","limitedLife"],"differing_c…` |
| PARTIAL | entity minecraft:donkey | overworld 76.2 -60 50.3 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","NaturalSpawn","Surface","definitions","expDropEnabled","limitedLife"],"differing_count":12,"lost":["IsOutOfControl","expDropEnabled"],"added":["Attack…` |
| PARTIAL | entity minecraft:happy_ghast | overworld -4.6 -56.5 19.1 | entity.data | clé IsTamed | `{"differing_keys":["Age","Armor","AttackTime","Attributes","BodyRot","BreedCooldown","HomeDimensionId","HomePos","InLove","IsOutOfControl","IsTamed","LeasherID","LoveCause","definitions","expDropEnabled","limitedLife"],"differing_count":16,"lost":["HomeDimensi…` |
| PARTIAL | entity minecraft:horse | overworld 1 -60 2.3 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","ChestItems","IsOutOfControl","LeasherID","OwnerNew","SkipBodySlotUpgrade","Temper","definitions","expDropEnabled","limitedLife"],"differing_count":12,"lost":["IsOutOfControl","SkipBodySlotUpgrade","expDro…` |
| PARTIAL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.data | clé ActiveEffects | `{"differing_keys":["ActiveEffects","AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","OwnerNew","definitions","expDropEnabled","limitedLife"],"differing_count":12,"lost":["ActiveEffects","IsOutOfControl","expDropEnabled"…` |
| PARTIAL | entity minecraft:pillager | overworld -6.4 -60 29.6 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","ChestItems","DwellingUniqueID","InLove","IsOutOfControl","ItemInHand","LoveCause","RewardPlayersOnFirstFounding","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"d…` |
| PARTIAL | entity minecraft:pillager | overworld -5 -60 -30.1 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","ChestItems","DwellingUniqueID","InLove","IsOutOfControl","ItemInHand","LoveCause","RewardPlayersOnFirstFounding","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"d…` |
| PARTIAL | entity minecraft:pillager | overworld -2 -60 16.5 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","ChestItems","DwellingUniqueID","InLove","IsOutOfControl","ItemInHand","LoveCause","RewardPlayersOnFirstFounding","SpawnedByNight","Surface","TargetID","definitions","expDropEnabled","limit…` |
| PARTIAL | entity minecraft:pillager | overworld 2.4 -60 19 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","ChestItems","DwellingUniqueID","InLove","IsOutOfControl","ItemInHand","LoveCause","RewardPlayersOnFirstFounding","SpawnedByNight","Surface","definitions","expDropEnabled","limitedLife"],"d…` |
| FAIL | entity minecraft:thrown_trident | overworld -0.9 -60 -2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:trader_llama | overworld -5 -60 17.8 | entity.data | clé Attributes | `{"differing_keys":["AttackTime","Attributes","BodyRot","IsAngry","IsOutOfControl","IsTamed","LeasherID","StrengthMax","TargetID","definitions","expDropEnabled","limitedLife"],"differing_count":12,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime"…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 4.3 -60 7.7 | entity.data | clé Offers | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Offe…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 6.3 -60 7.7 | entity.data | clé Offers | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Offe…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 8.3 -60 7.7 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 10.3 -60 7.7 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 12.7 -60 7.7 | entity.data | clé Offers | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Offe…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 14.5 -60 7.7 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 16.3 -60 7.7 | entity.data | clé Offers | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Offe…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 17.6 -62.4 3.6 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 18.1 -62.4 2.2 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 18.4 -62.4 1.4 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 19.3 -62.4 1.3 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 19.5 -62.4 3.7 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 19.5 -62.4 2.3 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","InLove","IsInRaid","IsOutOfControl","LoveCause","PreferredProfession","ReactToBell","RewardPlayersOnFirstFounding","SkinID","Willing","definitions","limitedLife"],"diffe…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 20 -62.4 0.3 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 20.5 -62.4 2.8 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 20.6 -62.4 1.5 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 21.4 -62.4 2.5 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 21.7 -62.4 3.7 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","HasResupplied","HighTierCuredDiscount","InLove","IsInRaid","IsOutOfControl","LoveCause","LowTierCuredDiscount","NearbyCuredDiscount","NearbyCuredDiscountTimeStamp","Reac…` |
| … | 21 autres (liste complète dans le JSON) | | | | |

### MINEUR — 30 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity EnchantTable | overworld -7 -60 1 | block_entity.data | clé rott | `{"differing_keys":["rott"],"differing_count":1,"lost":[],"added":[],"changed":["rott"],"sample":{"rott":["[\"n\",\"-1.7866272926330566\"]","[\"n\",\"0.3914608955383301\"]"]}}` |
| PARTIAL | block_entity Chest | overworld -1 -60 3 | block_entity.data | clé pairlead | `{"differing_keys":["pairlead"],"differing_count":1,"lost":[],"added":[],"changed":["pairlead"],"sample":{"pairlead":["[\"n\",\"1\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Chest | overworld 0 -60 3 | block_entity.data | clé pairlead | `{"differing_keys":["pairlead"],"differing_count":1,"lost":[],"added":[],"changed":["pairlead"],"sample":{"pairlead":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity Bell | overworld 17 -59 6 | block_entity.data | clé Direction | `{"differing_keys":["Direction","Ticks"],"differing_count":2,"lost":[],"added":[],"changed":["Direction","Ticks"],"sample":{"Direction":["[\"n\",\"2\"]","[\"n\",\"255\"]"],"Ticks":["[\"n\",\"39\"]","[\"n\",\"0\"]"]}}` |
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.data | données | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:cat | overworld 3.8 -60 -9.2 | entity.data | clé expDropEnabled | `{"differing_keys":["AttackTime","Attributes","BodyRot","DwellingUniqueID","IsOutOfControl","Persistent","definitions","expDropEnabled","limitedLife","properties"],"differing_count":10,"lost":["IsOutOfControl","expDropEnabled","properties"],"added":["AttackTime…` |
| PARTIAL | entity minecraft:cat | overworld 9.1 -60 16.8 | entity.data | clé properties | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","DwellingUniqueID","GrowthPaused","InLove","IsOutOfControl","LoveCause","Persistent","definitions","limitedLife","properties"],"differing_count":13,"lost":["GrowthPaused","IsOutOfControl","…` |
| PARTIAL | entity minecraft:cow | overworld 25.4 -60 -19.7 | entity.data | clé expDropEnabled | `{"differing_keys":["AttackTime","Attributes","BodyRot","IsOutOfControl","NaturalSpawn","Persistent","Surface","expDropEnabled","limitedLife","properties"],"differing_count":10,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","BodyRot","Persiste…` |
| PARTIAL | entity minecraft:iron_golem | overworld 47.1 -60 8 | entity.data | clé definitions | `{"differing_keys":["AttackTime","Attributes","BodyRot","BreedCooldown","InLove","IsOutOfControl","LoveCause","definitions","limitedLife"],"differing_count":9,"lost":["IsOutOfControl"],"added":["AttackTime","BodyRot","BreedCooldown","InLove","LoveCause","limite…` |
| PARTIAL | entity minecraft:item | overworld -12.7 -59.9 10.7 | entity.data | clé Dir | `{"differing_keys":["Dir","IsOutOfControl"],"differing_count":2,"lost":["IsOutOfControl"],"added":["Dir"],"changed":[]}` |
| PARTIAL | entity minecraft:item | overworld -12.7 -59.9 10.7 | entity.data | clé Dir | `{"differing_keys":["Dir","IsOutOfControl"],"differing_count":2,"lost":["IsOutOfControl"],"added":["Dir"],"changed":[]}` |
| PARTIAL | entity minecraft:item | overworld -10.5 -59.9 13 | entity.data | clé Dir | `{"differing_keys":["Dir","IsOutOfControl"],"differing_count":2,"lost":["IsOutOfControl"],"added":["Dir"],"changed":[]}` |
| PARTIAL | entity minecraft:item | overworld -10.5 -59.9 13 | entity.data | clé Dir | `{"differing_keys":["Dir","IsOutOfControl"],"differing_count":2,"lost":["IsOutOfControl"],"added":["Dir"],"changed":[]}` |
| PARTIAL | entity minecraft:item | overworld 23 -59.9 7.4 | entity.data | clé Dir | `{"differing_keys":["Dir","IsOutOfControl"],"differing_count":2,"lost":["IsOutOfControl"],"added":["Dir"],"changed":[]}` |
| PARTIAL | entity minecraft:leash_knot | overworld -3.5 -59.7 15.5 | entity.data | clé Dir | `{"differing_keys":["Dir","IsOutOfControl"],"differing_count":2,"lost":["IsOutOfControl"],"added":["Dir"],"changed":[]}` |
| PARTIAL | entity minecraft:leash_knot | overworld 2.5 -59.7 3.5 | entity.data | clé Dir | `{"differing_keys":["Dir","IsOutOfControl"],"differing_count":2,"lost":["IsOutOfControl"],"added":["Dir"],"changed":[]}` |
| PARTIAL | entity minecraft:pig | overworld -8.6 -60 -31.1 | entity.data | clé expDropEnabled | `{"differing_keys":["AttackTime","Attributes","BodyRot","IsOutOfControl","NaturalSpawn","Persistent","Surface","expDropEnabled","limitedLife","properties"],"differing_count":10,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","BodyRot","Persiste…` |
| PARTIAL | entity minecraft:pig | overworld -3.2 -60 -13.5 | entity.data | clé expDropEnabled | `{"differing_keys":["AttackTime","Attributes","BodyRot","IsOutOfControl","NaturalSpawn","Persistent","Surface","expDropEnabled","limitedLife","properties"],"differing_count":10,"lost":["IsOutOfControl","expDropEnabled"],"added":["AttackTime","BodyRot","Persiste…` |
| FAIL | entity minecraft:thrown_trident | overworld -0.9 -60 -2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:thrown_trident | overworld -0.9 -60 -2 | entity.data | données | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:wolf | overworld -0.3 -60 -9.3 | entity.data | clé SkipBodySlotUpgrade | `{"differing_keys":["AttackTime","Attributes","BodyRot","IsOutOfControl","OwnerNew","SkipBodySlotUpgrade","definitions","expDropEnabled","limitedLife","properties"],"differing_count":10,"lost":["IsOutOfControl","SkipBodySlotUpgrade","expDropEnabled"],"added":["…` |
| PARTIAL | entity minecraft:wolf | overworld 2 -59.4 0.5 | entity.data | clé SkipBodySlotUpgrade | `{"differing_keys":["AttackTime","Attributes","BodyRot","IsOutOfControl","LeasherID","OwnerNew","SkipBodySlotUpgrade","definitions","expDropEnabled","limitedLife","properties"],"differing_count":11,"lost":["IsOutOfControl","SkipBodySlotUpgrade","expDropEnabled"…` |
| PARTIAL | entity minecraft:wolf | overworld 3.6 -60 -6.9 | entity.data | clé SkipBodySlotUpgrade | `{"differing_keys":["Armor","AttackTime","Attributes","BodyRot","IsOutOfControl","OwnerNew","SkipBodySlotUpgrade","definitions","expDropEnabled","limitedLife","properties"],"differing_count":11,"lost":["IsOutOfControl","SkipBodySlotUpgrade","expDropEnabled"],"a…` |
| PARTIAL | entity minecraft:xp_orb | overworld 23.4 -60 9.4 | entity.data | clé Armor | `{"differing_keys":["Armor","AttackTime","BodyRot","BreedCooldown","Dead","InLove","IsOutOfControl","IsPregnant","LeasherID","LoveCause","Mainhand","NaturalSpawn","Offhand","Surface","TargetID","TradeExperience","TradeTier","boundX","boundY","boundZ","canPickup…` |
| PARTIAL | entity minecraft:xp_orb | overworld 25.3 -60 12.3 | entity.data | clé Armor | `{"differing_keys":["Armor","AttackTime","BodyRot","BreedCooldown","Dead","InLove","IsOutOfControl","IsPregnant","LeasherID","LoveCause","Mainhand","NaturalSpawn","Offhand","Surface","TargetID","TradeExperience","TradeTier","boundX","boundY","boundZ","canPickup…` |
| PARTIAL | entity minecraft:xp_orb | overworld 26.7 -60 13.5 | entity.data | clé Armor | `{"differing_keys":["Armor","AttackTime","BodyRot","BreedCooldown","Dead","InLove","IsOutOfControl","IsPregnant","LeasherID","LoveCause","Mainhand","NaturalSpawn","Offhand","Surface","TargetID","TradeExperience","TradeTier","boundX","boundY","boundZ","canPickup…` |
| FAIL | world | gamerule:playerwaypoints | world.value | autre donnée de monde | `{"observed":"absent"}` |
| FAIL | world | gamerule:showdaysplayed | world.value | autre donnée de monde | `{"observed":"absent"}` |
| FAIL | player ~local_player | ~local_player | player.spawn_point | same respawn block | `{"observed":[23,-63,0],"observed_block":[23,-63,0],"minor_only":true,"note":"same respawn block"}` |

