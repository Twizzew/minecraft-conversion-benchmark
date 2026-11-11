# B02@1.0 — pertes classées par gravité (umt-1.5.10, B02_aller + B02_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 14 | 13 | entity.tamed 4, entity.trades 2, item_stack.component:minecraft:potion_contents 1, item_stack.component:minecraft:charged_projectiles 1, item_stack.component:minecraft:enchantments 1, player.xp_level 1, player.inventory 1, player.ender_chest 1, player.armor 1, player.details 1 |
| **MAJEUR** | 19 | 14 | entity.identity 6, entity.data 5, entity.health 1, entity.details 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1, player.spawn_point 1 |
| **MINEUR** | 48 | 48 | item_stack.identity 12, item_stack.count 12, item_stack.component:minecraft:repair_cost 6, entity.position 6, entity.data 6, item_stack.component:minecraft:damage 3, world.value 2, item_stack.component:minecraft:custom_name 1 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 14 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:arrow | overworld -1 -60 3 | item_stack.component:minecraft:potion_contents | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"attendu":"long_regeneration","observed":null,"judged_on":"mirror-slot"}` |
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.component:minecraft:charged_projectiles | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"attendu":[{"id":"minecraft:arrow","count":3}],"observed":null,"judged_on":"mirror-slot"}` |
| FAIL | item_stack minecraft:copper_hoe | overworld 0 -60 3 | item_stack.component:minecraft:enchantments | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"attendu":["fortune:3","mending:1","unbreaking:2","vanishing_curse:1"],"observed":["fortune:3","mending:1","unbreaking:2"],"judged_on":"mirror-slot"}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":null}` |
| PARTIAL | entity minecraft:villager_v2 | overworld 12.7 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"matching_offers":1,"expected_offers":2,"observed_offers":9}` |
| FAIL | entity minecraft:wandering_trader | overworld -11.3 -60 19.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"matching_offers":0,"expected_offers":9,"observed_offers":0}` |
| FAIL | entity minecraft:wolf | overworld -0.3 -60 -9.3 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":null}` |
| FAIL | entity minecraft:wolf | overworld 2 -59.4 0.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":null}` |
| FAIL | entity minecraft:wolf | overworld 3.6 -60 -6.9 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":null}` |
| FAIL | player ~local_player | ~local_player | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.ender_chest | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.armor | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.details | détail d’un objet du joueur (enchantement, décoration d’armure, potion, contenu…) | `{"observed":"no player"}` |

### MAJEUR — 19 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -4.4 -58.8 17.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 2.5 -60 19.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 1 -60 2.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":18}` |
| FAIL | entity minecraft:leash_knot | overworld -3.5 -59.7 15.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld 2.5 -59.7 3.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.data | clé active_effects | `{"compared":5,"not_compared":["ActiveEffects","Armor","Attributes","Chested","Color","Color2","Dead","Invulnerable","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared",…` |
| FAIL | entity minecraft:pillager | overworld -5 -60 -30.1 | entity.details | détail d’un objet porté par une créature (enchantement, décoration d’armure, flèches chargées…) | `{"compares":1,"ecarts":[{"slot":"mainhand","id":"minecraft:crossbow","detail":"minecraft:charged_projectiles","attendu":[{"id":"minecraft:arrow","count":1}],"observe":null}],"ecarts_count":1}` |
| FAIL | entity minecraft:thrown_trident | overworld -0.9 -60 -2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:wandering_trader | overworld -11.3 -60 19.3 | entity.data | clé active_effects | `{"compared":2,"not_compared":["ActiveEffects","Armor","Attributes","Chested","Color","Color2","Dead","HasExecuted","HighTierCuredDiscount","HomeDimensionId","HomePos","Invulnerable","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain",…` |
| PARTIAL | entity minecraft:wolf | overworld -0.3 -60 -9.3 | entity.data | clé CollarColor | `{"compared":6,"not_compared":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","Invulnerable","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared",…` |
| PARTIAL | entity minecraft:wolf | overworld 2 -59.4 0.5 | entity.data | clé CollarColor | `{"compared":6,"not_compared":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","Invulnerable","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared",…` |
| PARTIAL | entity minecraft:wolf | overworld 3.6 -60 -6.9 | entity.data | clé CollarColor | `{"compared":6,"not_compared":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","Invulnerable","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared",…` |
| FAIL | player ~local_player | ~local_player | player.position | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.dimension | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.game_mode | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.health | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.food | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.spawn_point | position, point de réapparition, mode de jeu, santé ou faim du joueur | `{"observed":"no player"}` |

### MINEUR — 48 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:netherite_helmet | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":27,"expected_slot":0,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:netherite_helmet | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":27,"expected_slot":0,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:arrow | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:enchanted_book","found_in_slot":28,"expected_slot":1,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:arrow | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:enchanted_book","found_in_slot":28,"expected_slot":1,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":29,"expected_slot":2,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":29,"expected_slot":2,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.component:minecraft:damage | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":29,"expected_slot":2,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.component:minecraft:repair_cost | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":29,"expected_slot":2,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:bow | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":33,"expected_slot":6,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:bow | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":33,"expected_slot":6,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:bow | overworld -1 -60 3 | item_stack.component:minecraft:damage | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":33,"expected_slot":6,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:golden_shovel | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:lime_shulker_box","found_in_slot":47,"expected_slot":20,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:golden_shovel | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:lime_shulker_box","found_in_slot":47,"expected_slot":20,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:golden_shovel | overworld -1 -60 3 | item_stack.component:minecraft:repair_cost | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:lime_shulker_box","found_in_slot":47,"expected_slot":20,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:netherite_pickaxe | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":49,"expected_slot":22,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:netherite_pickaxe | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":49,"expected_slot":22,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:netherite_pickaxe | overworld -1 -60 3 | item_stack.component:minecraft:repair_cost | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":49,"expected_slot":22,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:enchanted_book | overworld 0 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:arrow","found_in_slot":1,"expected_slot":28,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:enchanted_book | overworld 0 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:arrow","found_in_slot":1,"expected_slot":28,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:diamond_spear | overworld 0 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":5,"expected_slot":32,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:diamond_spear | overworld 0 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":5,"expected_slot":32,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:diamond_spear | overworld 0 -60 3 | item_stack.component:minecraft:repair_cost | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":5,"expected_slot":32,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:wooden_axe | overworld 0 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":7,"expected_slot":34,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:wooden_axe | overworld 0 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":7,"expected_slot":34,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:wooden_axe | overworld 0 -60 3 | item_stack.component:minecraft:damage | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":7,"expected_slot":34,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:wooden_axe | overworld 0 -60 3 | item_stack.component:minecraft:repair_cost | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":7,"expected_slot":34,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:lime_shulker_box | overworld 0 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:golden_shovel","found_in_slot":20,"expected_slot":47,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:lime_shulker_box | overworld 0 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:golden_shovel","found_in_slot":20,"expected_slot":47,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:copper_hoe | overworld 0 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":21,"expected_slot":48,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:copper_hoe | overworld 0 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":21,"expected_slot":48,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:copper_hoe | overworld 0 -60 3 | item_stack.component:minecraft:custom_name | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":21,"expected_slot":48,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:copper_hoe | overworld 0 -60 3 | item_stack.component:minecraft:repair_cost | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":21,"expected_slot":48,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:lime_bundle | overworld 0 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":23,"expected_slot":50,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:lime_bundle | overworld 0 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":23,"expected_slot":50,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -4.4 -58.8 17.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -4.4 -58.8 17.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 2.5 -60 19.2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 2.5 -60 19.2 | entity.data | données | `{"observed":"no matching entity"}` |
| … | 8 autres (liste complète dans le JSON) | | | | |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 17 | 17 | entity.tamed 5, item_stack.identity 2, item_stack.count 2, player.xp_level 2, player.inventory 2, player.armor 2, entity.trades 1, player.ender_chest 1 |
| **MAJEUR** | 75 | 27 | entity.data 48, entity.identity 6, item_stack.tag 4, world.value 2, player.position 2, player.dimension 2, player.game_mode 2, player.health 2, player.food 2, player.spawn_point 2, block.state 1, item_stack.aux 1, entity.equipment 1 |
| **MINEUR** | 31 | 19 | entity.data 13, entity.position 11, block_entity.data 5, world.value 2 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 16 | 9 | entity.equipment 8, entity.data 5, block_entity.data 2, entity.inventory 1 |

### CRITIQUE — 17 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:iron_ingot | overworld 6 -60 6 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 6 -60 6 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld 6 -60 6 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:coal | overworld 6 -60 6 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | entity minecraft:happy_ghast | overworld -4.6 -56.5 19.1 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":null}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":null}` |
| FAIL | entity minecraft:wandering_trader | overworld -11.3 -60 19.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"matching_offers":0,"expected_offers":9,"observed_offers":0}` |
| FAIL | entity minecraft:wolf | overworld -0.3 -60 -9.3 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":null}` |
| FAIL | entity minecraft:wolf | overworld 2 -59.4 0.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":null}` |
| FAIL | entity minecraft:wolf | overworld 3.6 -60 -6.9 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":null}` |
| FAIL | player ~local_player | ~local_player | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.ender_chest | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player ~local_player | ~local_player | player.armor | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |
| FAIL | player player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player_server_3209b036-5efa-4fe0-b7d9-72d4ddf2f00a | player.armor | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":"no player"}` |

### MAJEUR — 75 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:bell | overworld 17 -59 6 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"toggle_bit":"1 -> 0"}}` |
| FAIL | item_stack minecraft:arrow | overworld -1 -60 3 | item_stack.aux | données Bedrock d'un objet (tag / aux) | `{"observed":0}` |
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.tag | données Bedrock d'un objet (tag / aux) | `{"observed":"{\"Damage\":2,\"RepairCost\":3,\"ench\":[{\"id\":17s,\"lvl\":2s},{\"id\":33s,\"lvl\":1s}]}"}` |
| FAIL | item_stack minecraft:lime_shulker_box | overworld 0 -60 3 | item_stack.tag | données Bedrock d'un objet (tag / aux) | `{"observed":"{\"Items\":[{\"Count\":1b,\"Damage\":0s,\"Name\":\"minecraft:shield\",\"Slot\":8b,\"tag\":{\"Damage\":0}},{\"Count\":1b,\"Damage\":0s,\"Name\":\"minecraft:goat_horn\",\"Slot\":10b},{\"Count\":21b,\"Damage\":0s,\"Name\":\"minecraft:diamond\",\"Slot…` |
| FAIL | item_stack minecraft:copper_hoe | overworld 0 -60 3 | item_stack.tag | données Bedrock d'un objet (tag / aux) | `{"observed":"{\"Damage\":0,\"RepairCost\":15,\"display\":{\"Name\":\"§1 Blue hoe\"},\"ench\":[{\"id\":17s,\"lvl\":2s},{\"id\":18s,\"lvl\":3s},{\"id\":26s,\"lvl\":1s}]}"}` |
| FAIL | item_stack minecraft:lime_bundle | overworld 0 -60 3 | item_stack.tag | données Bedrock d'un objet (tag / aux) | `{"observed":"{\"storage_item_component_content\":[{\"Count\":7b,\"Damage\":0s,\"Name\":\"minecraft:emerald\",\"Slot\":0b},{\"Count\":1b,\"Damage\":0s,\"Name\":\"minecraft:slime_ball\",\"Slot\":1b},{\"Block\":{\"name\":\"minecraft:grass_block\",\"states\":{},\"…` |
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -4.4 -58.8 17.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 2.5 -60 19.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:cat | overworld 3.8 -60 -9.2 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","InLove","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoa…` |
| PARTIAL | entity minecraft:cow | overworld 25.4 -60 -19.7 | entity.data | clé Attributes | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","GrowthPaused","InLove","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","I…` |
| PARTIAL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.data | clé OwnerNew | `{"differing_keys":["Armor","Attributes","BreedCooldown","ChestItems","Color","Color2","CustomNameVisible","Dead","GrowthPaused","InLove","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","I…` |
| PARTIAL | entity minecraft:donkey | overworld 76.2 -60 50.3 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","ChestItems","Color","Color2","Dead","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","IsSwimming"…` |
| PARTIAL | entity minecraft:happy_ghast | overworld -4.6 -56.5 19.1 | entity.data | clé IsTamed | `{"differing_keys":["Armor","Attributes","Chested","Color","Color2","Dead","GrowthPaused","HomeDimensionId","HomePos","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared"…` |
| PARTIAL | entity minecraft:horse | overworld 1 -60 2.3 | entity.data | clé OwnerNew | `{"differing_keys":["Armor","Attributes","BreedCooldown","ChestItems","Chested","Color","Color2","Dead","GrowthPaused","InLove","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring",…` |
| FAIL | entity minecraft:leash_knot | overworld -3.5 -59.7 15.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld 2.5 -59.7 3.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.data | clé IsTamed | `{"differing_keys":["ActiveEffects","Armor","Attributes","Chested","Color","Color2","Dead","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned"…` |
| PARTIAL | entity minecraft:pillager | overworld -6.4 -60 29.6 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","Chested","Color","Color2","Dead","DwellingUniqueID","IsAngry","IsAutonomous","IsBaby","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","I…` |
| FAIL | entity minecraft:pillager | overworld -5 -60 -30.1 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":["mainhand:minecraft:crossbowx1"],"wrong":[{"id":"minecraft:crossbow","expected_slot":"mainhand","observed":"minecraft:crossbow","differs":["WasPickedUp","tag.chargedItem.Count","tag.chargedItem.Damage","tag.chargedItem.Name","tag.chargedItem.WasPi…` |
| PARTIAL | entity minecraft:pillager | overworld -5 -60 -30.1 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","Chested","Color","Color2","Dead","DwellingUniqueID","IsAngry","IsAutonomous","IsBaby","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","I…` |
| PARTIAL | entity minecraft:pillager | overworld -2 -60 16.5 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","Chested","Color","Color2","Dead","DwellingUniqueID","IsAngry","IsAutonomous","IsBaby","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","I…` |
| PARTIAL | entity minecraft:pillager | overworld 2.4 -60 19 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","Chested","Color","Color2","Dead","DwellingUniqueID","IsAngry","IsAutonomous","IsBaby","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","I…` |
| FAIL | entity minecraft:thrown_trident | overworld -0.9 -60 -2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:trader_llama | overworld -5 -60 17.8 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","BreedCooldown","Color","Color2","Dead","GrowthPaused","InLove","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned",…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 4.3 -60 7.7 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 6.3 -60 7.7 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 8.3 -60 7.7 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 10.3 -60 7.7 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 12.7 -60 7.7 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 14.5 -60 7.7 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 16.3 -60 7.7 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 17.6 -62.4 3.6 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 18.1 -62.4 2.2 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 18.4 -62.4 1.4 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 19.3 -62.4 1.3 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 19.5 -62.4 3.7 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 19.5 -62.4 2.3 | entity.data | clé definitions | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphaned","IsOutOfControl","IsPregnant","IsRoar…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 20 -62.4 0.3 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| PARTIAL | entity minecraft:villager_v2 | overworld 20.5 -62.4 2.8 | entity.data | clé Offers | `{"differing_keys":["Armor","Attributes","ChestItems","Chested","Color","Color2","Dead","DwellingUniqueID","GrowthPaused","HasResupplied","HighTierCuredDiscount","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsInRaid","IsOrphane…` |
| … | 35 autres (liste complète dans le JSON) | | | | |

### MINEUR — 31 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity EnchantTable | overworld -7 -60 1 | block_entity.data | clé rott | `{"differing_keys":["rott"],"differing_count":1,"lost":["rott"],"added":[],"changed":[],"sample":{"rott":["[\"n\",\"-1.7866272926330566\"]",null]}}` |
| PARTIAL | block_entity Lectern | overworld 8 -60 6 | block_entity.data | clé hasBook | `{"differing_keys":["hasBook","page"],"differing_count":2,"lost":[],"added":["hasBook","page"],"changed":[],"sample":{"hasBook":[null,"[\"n\",\"0\"]"],"page":[null,"[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Lectern | overworld 10 -60 6 | block_entity.data | clé hasBook | `{"differing_keys":["hasBook","page"],"differing_count":2,"lost":[],"added":["hasBook","page"],"changed":[],"sample":{"hasBook":[null,"[\"n\",\"0\"]"],"page":[null,"[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Bell | overworld 17 -59 6 | block_entity.data | clé Direction | `{"differing_keys":["Direction","Ringing","Ticks"],"differing_count":3,"lost":["Direction","Ringing","Ticks"],"added":[],"changed":[],"sample":{"Direction":["[\"n\",\"2\"]",null],"Ringing":["[\"n\",\"0\"]",null],"Ticks":["[\"n\",\"39\"]",null]}}` |
| PARTIAL | block_entity Beacon | overworld 28 -58 3 | block_entity.data | clé primary | `{"differing_keys":["primary"],"differing_count":1,"lost":[],"added":[],"changed":["primary"],"sample":{"primary":["[\"n\",\"11\"]","[\"n\",\"0\"]"]}}` |
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -4.4 -58.8 17.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -4.4 -58.8 17.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 2.5 -60 19.2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 2.5 -60 19.2 | entity.data | données | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:cat | overworld 9.1 -60 16.8 | entity.data | clé DwellingUniqueID | `{"differing_keys":["Armor","Attributes","Chested","Color","Color2","Dead","DwellingUniqueID","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","IsSwimming…` |
| PARTIAL | entity minecraft:iron_golem | overworld 47.1 -60 8 | entity.data | clé hasSetCanPickupItems | `{"differing_keys":["Armor","Attributes","Chested","Color","Color2","Dead","IsAutonomous","IsBaby","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","IsStunned","IsSwimming","IsTamed","IsTrust…` |
| FAIL | entity minecraft:item | overworld -12.7 -59.9 10.7 | entity.position | position d'une créature | `{"delta":[0,-0.125,0]}` |
| FAIL | entity minecraft:item | overworld -12.7 -59.9 10.7 | entity.position | position d'une créature | `{"delta":[0,-0.125,0]}` |
| FAIL | entity minecraft:item | overworld -10.5 -59.9 13 | entity.position | position d'une créature | `{"delta":[0,-0.125,0]}` |
| FAIL | entity minecraft:item | overworld -10.5 -59.9 13 | entity.position | position d'une créature | `{"delta":[0,-0.125,0]}` |
| FAIL | entity minecraft:item | overworld 23 -59.9 7.4 | entity.position | position d'une créature | `{"delta":[0,-0.125,0]}` |
| FAIL | entity minecraft:leash_knot | overworld -3.5 -59.7 15.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld -3.5 -59.7 15.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld 2.5 -59.7 3.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld 2.5 -59.7 3.5 | entity.data | données | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:pig | overworld -8.6 -60 -31.1 | entity.data | clé NaturalSpawn | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","GrowthPaused","InLove","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","I…` |
| PARTIAL | entity minecraft:pig | overworld -3.2 -60 -13.5 | entity.data | clé NaturalSpawn | `{"differing_keys":["Armor","Attributes","BreedCooldown","Chested","Color","Color2","Dead","GrowthPaused","InLove","IsAngry","IsAutonomous","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsPregnant","IsRoaring","IsScared","I…` |
| FAIL | entity minecraft:thrown_trident | overworld -0.9 -60 -2 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:thrown_trident | overworld -0.9 -60 -2 | entity.data | données | `{"observed":"no matching entity"}` |
| PARTIAL | entity minecraft:xp_orb | overworld 23.4 -60 9.4 | entity.data | clé experience value | `{"differing_keys":["Chested","Color","Color2","IsAngry","IsAutonomous","IsBaby","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsRoaring","IsScared","IsStunned","IsSwimming","IsTamed","IsTrusting","LootDropped","MarkVariant…` |
| PARTIAL | entity minecraft:xp_orb | overworld 25.3 -60 12.3 | entity.data | clé experience value | `{"differing_keys":["Chested","Color","Color2","IsAngry","IsAutonomous","IsBaby","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsRoaring","IsScared","IsStunned","IsSwimming","IsTamed","IsTrusting","LootDropped","MarkVariant…` |
| PARTIAL | entity minecraft:xp_orb | overworld 26.7 -60 13.5 | entity.data | clé experience value | `{"differing_keys":["Chested","Color","Color2","IsAngry","IsAutonomous","IsBaby","IsEating","IsGliding","IsGlobal","IsIllagerCaptain","IsOrphaned","IsOutOfControl","IsRoaring","IsScared","IsStunned","IsSwimming","IsTamed","IsTrusting","LootDropped","MarkVariant…` |
| FAIL | world | level_name | world.value | autre donnée de monde | `{"observed":"B02_retour"}` |
| FAIL | world | gamerule:playerwaypoints | world.value | autre donnée de monde | `{"observed":"absent"}` |

