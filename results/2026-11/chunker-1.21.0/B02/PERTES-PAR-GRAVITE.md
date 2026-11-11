# B02@1.0 — pertes classées par gravité (chunker-1.21.0, B02_aller + B02_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 41 | 41 | entity.trades 31, entity.tamed 6, item_stack.component:minecraft:charged_projectiles 1, entity.inventory 1, player.xp_level 1, player.ender_chest 1 |
| **MAJEUR** | 133 | 133 | entity.identity 66, entity.health 52, entity.equipment 9, entity.baby 1, entity.custom_name 1, entity.details 1, player.health 1, player.food 1, player.spawn_point 1 |
| **MINEUR** | 167 | 167 | entity.position 66, entity.data 66, item_stack.identity 12, item_stack.count 12, item_stack.component:minecraft:repair_cost 6, item_stack.component:minecraft:damage 3, item_stack.component:minecraft:custom_name 1, world.value 1 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 41 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.component:minecraft:charged_projectiles | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"attendu":[{"id":"minecraft:arrow","count":3}],"observed":null,"judged_on":"mirror-slot"}` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 1 -60 2.3 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 4.3 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 6.3 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 8.3 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 10.3 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 12.7 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 14.5 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 16.3 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 17.6 -62.4 3.6 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 18.1 -62.4 2.2 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 18.4 -62.4 1.4 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 19.3 -62.4 1.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 19.5 -62.4 3.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 20 -62.4 0.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 20.5 -62.4 2.8 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 20.6 -62.4 1.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 21.4 -62.4 2.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 21.7 -62.4 3.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 22.1 -62.4 0.4 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 22.5 -62.4 2.8 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 23 -62.4 0.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 23.4 -62.4 3.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 23.5 -62.4 1.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 23.8 -62.4 0.8 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 23.9 -62.4 2.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 24.8 -62.4 1.4 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 24.8 -62.4 3.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 24.9 -62.4 2.4 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 25.7 -62.4 0.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 25.7 -62.4 2.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 25.7 -62.4 3.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wandering_trader | overworld -11.3 -60 19.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wolf | overworld -0.3 -60 -9.3 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wolf | overworld 2 -59.4 0.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wolf | overworld 3.6 -60 -6.9 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | player ~local_player | ~local_player | player.xp_level | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"observed":0}` |
| … | 1 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 133 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -4.4 -58.8 17.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 2.5 -60 19.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 3.8 -60 -9.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 3.8 -60 -9.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 9.1 -60 16.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 9.1 -60 16.8 | entity.baby | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 9.1 -60 16.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 25.4 -60 -19.7 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 25.4 -60 -19.7 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey | overworld 76.2 -60 50.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey | overworld 76.2 -60 50.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:happy_ghast | overworld -4.6 -56.5 19.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:happy_ghast | overworld -4.6 -56.5 19.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:happy_ghast | overworld -4.6 -56.5 19.1 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 1 -60 2.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 1 -60 2.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 1 -60 2.3 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:iron_golem | overworld 47.1 -60 8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:iron_golem | overworld 47.1 -60 8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -12.7 -59.9 10.7 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -12.7 -59.9 10.7 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -10.5 -59.9 13 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -10.5 -59.9 13 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld 23 -59.9 7.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld -3.5 -59.7 15.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld 2.5 -59.7 3.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pig | overworld -8.6 -60 -31.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pig | overworld -8.6 -60 -31.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pig | overworld -3.2 -60 -13.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pig | overworld -3.2 -60 -13.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pillager | overworld -6.4 -60 29.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pillager | overworld -6.4 -60 29.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pillager | overworld -6.4 -60 29.6 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| … | 93 autres (liste complète dans le JSON) | | | | |

### MINEUR — 167 (direct)

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
| FAIL | item_stack minecraft:enchanted_book | overworld 0 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:tipped_arrow","found_in_slot":1,"expected_slot":28,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:enchanted_book | overworld 0 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:tipped_arrow","found_in_slot":1,"expected_slot":28,"cause":"double-chest-halves-shown-in-other-order"}` |
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
| … | 127 autres (liste complète dans le JSON) | | | | |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 45 | 45 | entity.trades 31, entity.tamed 7, player.inventory 2, player.armor 2, entity.inventory 1, player.ender_chest 1, player.xp_level 1 |
| **MAJEUR** | 138 | 138 | entity.identity 66, entity.health 52, entity.equipment 9, player.spawn_point 2, block.state 1, entity.baby 1, entity.custom_name 1, world.value 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 196 | 190 | entity.position 66, entity.data 66, item_stack.identity 12, item_stack.count 12, world.value 12, item_stack.tag 11, block_entity.data 6, item_stack.component:minecraft:repair_cost 6, item_stack.component:minecraft:damage 3, item_stack.aux 1, item_stack.component:minecraft:custom_name 1 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 3 | 0 | block_entity.data 3 |

### CRITIQUE — 45 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.inventory | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:happy_ghast | overworld -4.6 -56.5 19.1 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 1 -60 2.3 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 4.3 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 6.3 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 8.3 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 10.3 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 12.7 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 14.5 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 16.3 -60 7.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 17.6 -62.4 3.6 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 18.1 -62.4 2.2 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 18.4 -62.4 1.4 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 19.3 -62.4 1.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 19.5 -62.4 3.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 20 -62.4 0.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 20.5 -62.4 2.8 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 20.6 -62.4 1.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 21.4 -62.4 2.5 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 21.7 -62.4 3.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 22.1 -62.4 0.4 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 22.5 -62.4 2.8 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 23 -62.4 0.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 23.4 -62.4 3.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 23.5 -62.4 1.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 23.8 -62.4 0.8 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 23.9 -62.4 2.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 24.8 -62.4 1.4 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 24.8 -62.4 3.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 24.9 -62.4 2.4 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 25.7 -62.4 0.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 25.7 -62.4 2.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:villager_v2 | overworld 25.7 -62.4 3.7 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wandering_trader | overworld -11.3 -60 19.3 | entity.trades | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wolf | overworld -0.3 -60 -9.3 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wolf | overworld 2 -59.4 0.5 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:wolf | overworld 3.6 -60 -6.9 | entity.tamed | inventaire, échanges ou apprivoisement d'une créature | `{"observed":"no matching entity"}` |
| FAIL | player ~local_player | ~local_player | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"matched":0,"expected":33,"wrong":[{"id":"minecraft:netherite_sword","expected_slot":0,"observed":"minecraft:netherite_sword","differs":["WasPickedUp","tag.ench[0].id","tag.ench[0].lvl","tag.ench[1].id","tag.ench[1].lvl","tag.ench[2].id","tag.ench[2].lvl","ta…` |
| … | 5 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 138 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:bell | overworld 17 -59 6 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"toggle_bit":"1 -> 0"}}` |
| FAIL | entity minecraft:arrow | overworld -16 -60 80 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld -4.4 -58.8 17.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 2.5 -60 19.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 3.8 -60 -9.2 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 3.8 -60 -9.2 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 9.1 -60 16.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 9.1 -60 16.8 | entity.baby | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld 9.1 -60 16.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 25.4 -60 -19.7 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 25.4 -60 -19.7 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.custom_name | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey « Fred » | overworld -1.1 -60 1.8 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey | overworld 76.2 -60 50.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:donkey | overworld 76.2 -60 50.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:happy_ghast | overworld -4.6 -56.5 19.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:happy_ghast | overworld -4.6 -56.5 19.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:happy_ghast | overworld -4.6 -56.5 19.1 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 1 -60 2.3 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 1 -60 2.3 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:horse | overworld 1 -60 2.3 | entity.equipment | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:iron_golem | overworld 47.1 -60 8 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:iron_golem | overworld 47.1 -60 8 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -12.7 -59.9 10.7 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -12.7 -59.9 10.7 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -10.5 -59.9 13 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld -10.5 -59.9 13 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:item | overworld 23 -59.9 7.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld -3.5 -59.7 15.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:leash_knot | overworld 2.5 -59.7 3.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:parrot | overworld 0.2 -58.6 -6.4 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pig | overworld -8.6 -60 -31.1 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pig | overworld -8.6 -60 -31.1 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pig | overworld -3.2 -60 -13.5 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pig | overworld -3.2 -60 -13.5 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pillager | overworld -6.4 -60 29.6 | entity.identity | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:pillager | overworld -6.4 -60 29.6 | entity.health | créature absente, nom, bébé, équipement ou santé | `{"observed":"no matching entity"}` |
| … | 98 autres (liste complète dans le JSON) | | | | |

### MINEUR — 196 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity EnchantTable | overworld -7 -60 1 | block_entity.data | clé rott | `{"differing_keys":["rott"],"differing_count":1,"lost":["rott"],"added":[],"changed":[],"sample":{"rott":["[\"n\",\"-1.7866272926330566\"]",null]}}` |
| PARTIAL | block_entity Chest | overworld -1 -60 3 | block_entity.data | clé pairlead | `{"differing_keys":["Findable","pairlead"],"differing_count":2,"lost":["Findable"],"added":[],"changed":["pairlead"],"sample":{"Findable":["[\"n\",\"0\"]",null],"pairlead":["[\"n\",\"1\"]","[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Chest | overworld 0 -60 3 | block_entity.data | clé pairlead | `{"differing_keys":["Findable","pairlead"],"differing_count":2,"lost":["Findable"],"added":[],"changed":["pairlead"],"sample":{"Findable":["[\"n\",\"0\"]",null],"pairlead":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity Lectern | overworld 8 -60 6 | block_entity.data | clé hasBook | `{"differing_keys":["hasBook","page"],"differing_count":2,"lost":[],"added":["hasBook","page"],"changed":[],"sample":{"hasBook":[null,"[\"n\",\"0\"]"],"page":[null,"[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Lectern | overworld 10 -60 6 | block_entity.data | clé hasBook | `{"differing_keys":["hasBook","page"],"differing_count":2,"lost":[],"added":["hasBook","page"],"changed":[],"sample":{"hasBook":[null,"[\"n\",\"0\"]"],"page":[null,"[\"n\",\"0\"]"]}}` |
| PARTIAL | block_entity Bell | overworld 17 -59 6 | block_entity.data | clé Direction | `{"differing_keys":["Direction","Ringing","Ticks"],"differing_count":3,"lost":["Direction","Ringing","Ticks"],"added":[],"changed":[],"sample":{"Direction":["[\"n\",\"2\"]",null],"Ringing":["[\"n\",\"0\"]",null],"Ticks":["[\"n\",\"39\"]",null]}}` |
| FAIL | item_stack minecraft:netherite_helmet | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":27,"expected_slot":0,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:netherite_helmet | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":27,"expected_slot":0,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:netherite_helmet | overworld -1 -60 3 | item_stack.tag | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":27,"expected_slot":0,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:arrow | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:enchanted_book","found_in_slot":28,"expected_slot":1,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:arrow | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:enchanted_book","found_in_slot":28,"expected_slot":1,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:arrow | overworld -1 -60 3 | item_stack.aux | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:enchanted_book","found_in_slot":28,"expected_slot":1,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":29,"expected_slot":2,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":29,"expected_slot":2,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.component:minecraft:damage | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":29,"expected_slot":2,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.component:minecraft:repair_cost | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":29,"expected_slot":2,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:crossbow | overworld -1 -60 3 | item_stack.tag | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":29,"expected_slot":2,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:bow | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":33,"expected_slot":6,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:bow | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":33,"expected_slot":6,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:bow | overworld -1 -60 3 | item_stack.component:minecraft:damage | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":33,"expected_slot":6,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:bow | overworld -1 -60 3 | item_stack.tag | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":33,"expected_slot":6,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:golden_shovel | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:lime_shulker_box","found_in_slot":47,"expected_slot":20,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:golden_shovel | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:lime_shulker_box","found_in_slot":47,"expected_slot":20,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:golden_shovel | overworld -1 -60 3 | item_stack.component:minecraft:repair_cost | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:lime_shulker_box","found_in_slot":47,"expected_slot":20,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:golden_shovel | overworld -1 -60 3 | item_stack.tag | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:lime_shulker_box","found_in_slot":47,"expected_slot":20,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:netherite_pickaxe | overworld -1 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":49,"expected_slot":22,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:netherite_pickaxe | overworld -1 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":49,"expected_slot":22,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:netherite_pickaxe | overworld -1 -60 3 | item_stack.component:minecraft:repair_cost | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":49,"expected_slot":22,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:netherite_pickaxe | overworld -1 -60 3 | item_stack.tag | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":49,"expected_slot":22,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:enchanted_book | overworld 0 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:arrow","found_in_slot":1,"expected_slot":28,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:enchanted_book | overworld 0 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:arrow","found_in_slot":1,"expected_slot":28,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:enchanted_book | overworld 0 -60 3 | item_stack.tag | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:arrow","found_in_slot":1,"expected_slot":28,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:diamond_spear | overworld 0 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":5,"expected_slot":32,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:diamond_spear | overworld 0 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":5,"expected_slot":32,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:diamond_spear | overworld 0 -60 3 | item_stack.component:minecraft:repair_cost | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":5,"expected_slot":32,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:diamond_spear | overworld 0 -60 3 | item_stack.tag | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":5,"expected_slot":32,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:wooden_axe | overworld 0 -60 3 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":7,"expected_slot":34,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:wooden_axe | overworld 0 -60 3 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":7,"expected_slot":34,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:wooden_axe | overworld 0 -60 3 | item_stack.component:minecraft:damage | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":7,"expected_slot":34,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:wooden_axe | overworld 0 -60 3 | item_stack.component:minecraft:repair_cost | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"stack missing","found_in_slot":7,"expected_slot":34,"cause":"double-chest-halves-shown-in-other-order"}` |
| … | 156 autres (liste complète dans le JSON) | | | | |

