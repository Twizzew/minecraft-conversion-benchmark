# J01@2.0 — pertes classées par gravité (umt-1.5.10, J01_aller + J01_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 186 | 186 | item_stack.identity 53, item_stack.count 53, item_stack.component:minecraft:potion_contents 48, item_stack.component:minecraft:instrument 7, item_stack.component:minecraft:banner_patterns 6, item_stack.component:minecraft:custom_name 5, item_stack.component:minecraft:base_color 3, item_stack.component:minecraft:dyed_color 2, item_stack.component:minecraft:firework_explosion 2, item_stack.component:minecraft:fireworks 2, item_stack.component:minecraft:charged_projectiles 1, player.xp_level 1, player.inventory 1, player.armor 1, player.details 1 |
| **MAJEUR** | 6939 | 6543 | structure.spawn_zone 4543, block_entity.data 1088, block.identity 619, block_entity.presence 577, scoreboard.value 49, entity.identity 45, item_stack.component:minecraft:lore 4, item_stack.component:minecraft:ominous_bottle_amplifier 4, item_stack.component:minecraft:unbreakable 2, world.value 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 129 | 129 | entity.position 45, entity.data 45, structure.spawn_zone 29, item_stack.identity 4, item_stack.count 4, world.value 2 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 186 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:warm_ocean_ruins_map | overworld 990 304 1400 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:warm_ocean_ruins_map | overworld 990 304 1400 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:music_disc_lava_chicken | overworld 1000 304 1412 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:music_disc_lava_chicken | overworld 1000 304 1412 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:music_disc_bounce | overworld 1000 304 1412 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:music_disc_bounce | overworld 1000 304 1412 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:nether_star | overworld 1000 304 1412 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:netherstar"}` |
| FAIL | item_stack minecraft:nether_star | overworld 1000 304 1412 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:netherstar"}` |
| FAIL | item_stack minecraft:petrified_oak_slab | overworld 1000 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:petrified_oak_slab | overworld 1000 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:stick | overworld 1000 304 1430 | item_stack.component:minecraft:custom_name | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":null}` |
| FAIL | item_stack minecraft:stick | overworld 1000 304 1496 | item_stack.component:minecraft:custom_name | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":null}` |
| FAIL | item_stack minecraft:potion | overworld 1002 304 1430 | item_stack.component:minecraft:potion_contents | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"attendu":"turtle_master","observed":"water"}` |
| FAIL | item_stack minecraft:abandoned_camp_map | overworld 1002 304 1434 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:abandoned_camp_map | overworld 1002 304 1434 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:abandoned_camp_map | overworld 1002 304 1434 | item_stack.component:minecraft:custom_name | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:filled_map | overworld 1002 304 1434 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:map"}` |
| FAIL | item_stack minecraft:filled_map | overworld 1002 304 1434 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:map"}` |
| FAIL | item_stack minecraft:mossy_cobblestone_slab | overworld 1004 304 1404 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:mossy_cobbletone_slab"}` |
| FAIL | item_stack minecraft:mossy_cobblestone_slab | overworld 1004 304 1404 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:mossy_cobbletone_slab"}` |
| FAIL | item_stack minecraft:golden_chestplate | overworld 1004 304 1410 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"golden_chestplate"}` |
| FAIL | item_stack minecraft:golden_chestplate | overworld 1004 304 1410 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"golden_chestplate"}` |
| FAIL | item_stack minecraft:mourner_pottery_sherd | overworld 1004 304 1412 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:miner_pottery_sherd"}` |
| FAIL | item_stack minecraft:mourner_pottery_sherd | overworld 1004 304 1412 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:miner_pottery_sherd"}` |
| FAIL | item_stack minecraft:prize_pottery_sherd | overworld 1004 304 1412 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:prize_pottery_shard"}` |
| FAIL | item_stack minecraft:prize_pottery_sherd | overworld 1004 304 1412 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:prize_pottery_shard"}` |
| FAIL | item_stack minecraft:globe_banner_pattern | overworld 1006 304 1412 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:globe_banner_pattern | overworld 1006 304 1412 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:bordure_indented_banner_pattern | overworld 1006 304 1412 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:bordured_banner_pattern"}` |
| FAIL | item_stack minecraft:bordure_indented_banner_pattern | overworld 1006 304 1412 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:bordured_banner_pattern"}` |
| FAIL | item_stack minecraft:splash_potion | overworld 1006 304 1430 | item_stack.component:minecraft:potion_contents | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"attendu":"turtle_master","observed":"water"}` |
| FAIL | item_stack minecraft:poplar_boat | overworld 1008 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:poplar_boat | overworld 1008 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:poplar_chest_boat | overworld 1008 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:poplar_chest_boat | overworld 1008 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:straw_bed | overworld 1008 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:straw_bed | overworld 1008 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:ocean_monument_map | overworld 1008 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:ocean_monument_map | overworld 1008 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:woodland_mansion_map | overworld 1008 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| … | 146 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 6939 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1335 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1337 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1339 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1341 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1343 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1345 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1347 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1349 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1351 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1353 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1355 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1357 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:orange_poplar_leaves | overworld 1005 305 1359 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:birch_shelf | overworld 1045 305 1101 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:birch_shelf | overworld 1045 305 1103 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:birch_shelf | overworld 1045 305 1133 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:birch_shelf | overworld 1045 305 1135 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:birch_shelf | overworld 1045 305 1165 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:birch_shelf | overworld 1045 305 1167 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:birch_shelf | overworld 1045 305 1197 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:birch_shelf | overworld 1045 305 1199 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1255 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1257 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1259 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1261 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1263 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1265 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1271 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1273 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1275 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1277 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1279 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1281 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1287 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1289 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1291 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1293 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1295 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1297 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1079 305 1303 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| … | 6899 autres (liste complète dans le JSON) | | | | |

### MINEUR — 129 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:diamond | overworld 1056 304 1492 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:emerald","found_in_slot":0,"expected_slot":27,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:diamond | overworld 1056 304 1492 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:emerald","found_in_slot":0,"expected_slot":27,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:gold_ingot | overworld 1056 304 1492 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:iron_ingot","found_in_slot":26,"expected_slot":53,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:gold_ingot | overworld 1056 304 1492 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:iron_ingot","found_in_slot":26,"expected_slot":53,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:emerald | overworld 1057 304 1492 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:diamond","found_in_slot":27,"expected_slot":0,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:emerald | overworld 1057 304 1492 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:diamond","found_in_slot":27,"expected_slot":0,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 1057 304 1492 | item_stack.identity | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:gold_ingot","found_in_slot":53,"expected_slot":26,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 1057 304 1492 | item_stack.count | moitiés du coffre double montrées dans l’autre ordre (objet décalé, pas perdu) | `{"observed":"minecraft:gold_ingot","found_in_slot":53,"expected_slot":26,"cause":"double-chest-halves-shown-in-other-order"}` |
| FAIL | entity minecraft:falling_block | overworld 800.5 -6 1314.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 800.5 -6 1314.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 800.5 -6 1315.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 800.5 -6 1315.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 800.5 -46 1536.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 800.5 -46 1536.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 801.5 -6 1314.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 801.5 -6 1314.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 801.5 -6 1315.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 801.5 -6 1315.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 801.5 -5 1315.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 801.5 -5 1315.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 802.5 -6 1314.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 802.5 -6 1314.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 821.5 64 1165.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 821.5 64 1165.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 892.5 61 851.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 892.5 61 851.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1015.5 10 1694.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1015.5 10 1694.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1016.5 10 1694.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1016.5 10 1694.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1016.5 11 1694.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1016.5 11 1694.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1016.5 12 1694.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1016.5 12 1694.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1016.5 10 1695.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1016.5 10 1695.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1016.5 11 1695.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1016.5 11 1695.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1075.5 63 1683.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:falling_block | overworld 1075.5 63 1683.5 | entity.data | données | `{"observed":"no matching entity"}` |
| … | 89 autres (liste complète dans le JSON) | | | | |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 2973 | 2973 | block_entity.sign_text 1768, custom_dimension.blocks 841, item_stack.identity 112, item_stack.count 112, item_stack.component:minecraft:potion_contents 48, block_entity.command 36, item_stack.component:minecraft:custom_name 10, item_stack.component:minecraft:enchantments 8, item_stack.component:minecraft:instrument 7, item_stack.component:minecraft:banner_patterns 6, item_stack.component:minecraft:written_book_content 5, item_stack.component:minecraft:base_color 3, item_stack.component:minecraft:profile 2, item_stack.component:minecraft:lodestone_tracker 2, item_stack.component:minecraft:dyed_color 2, item_stack.component:minecraft:firework_explosion 2, item_stack.component:minecraft:fireworks 2, item_stack.component:minecraft:map_id 2, item_stack.component:minecraft:container 1, item_stack.component:minecraft:charged_projectiles 1, player.xp_level 1, player.inventory 1, player.armor 1 |
| **MAJEUR** | 40226 | 37557 | structure.spawn_zone 19135, block.state 11638, block_entity.presence 5641, entity.data 1578, block_entity.data 1091, block.identity 654, block.waterlog 234, entity.health 52, scoreboard.value 49, entity.identity 45, item_stack.component:minecraft:lore 4, item_stack.component:minecraft:pot_decorations 4, item_stack.component:minecraft:ominous_bottle_amplifier 4, item_stack.component:minecraft:break_sound 3, item_stack.component:minecraft:sign_text_front 3, item_stack.component:minecraft:sign_text_back 3, item_stack.component:minecraft:waxed 3, item_stack.component:minecraft:unbreakable 2, item_stack.component:minecraft:custom_model_data 2, item_stack.component:minecraft:max_stack_size 2, item_stack.component:minecraft:attack_animation 2, item_stack.component:minecraft:consumable 2, item_stack.component:minecraft:map_decorations 2, item_stack.component:minecraft:debug_stick_state 2, item_stack.component:minecraft:block_entity_data 2, item_stack.component:minecraft:recipes 2, item_stack.component:minecraft:suspicious_stew_effects 2, item_stack.component:minecraft:custom_data 2, item_stack.component:minecraft:max_damage 2, item_stack.component:minecraft:rarity 1, item_stack.component:minecraft:enchantment_glint_override 1, item_stack.component:minecraft:tooltip_display 1, item_stack.component:minecraft:axolotl/variant 1, item_stack.component:minecraft:rabbit/variant 1, item_stack.component:minecraft:mooshroom/variant 1, item_stack.component:minecraft:sheep/color 1, item_stack.component:minecraft:shulker/color 1, item_stack.component:minecraft:tropical_fish/pattern_color 1, item_stack.component:minecraft:tropical_fish/base_color 1, item_stack.component:minecraft:tropical_fish/pattern 1, item_stack.component:minecraft:item_model 1, item_stack.component:minecraft:item_name 1, item_stack.component:minecraft:enchantable 1, item_stack.component:minecraft:damage_resistant 1, item_stack.component:minecraft:intangible_projectile 1, item_stack.component:minecraft:glider 1, item_stack.component:minecraft:tool 1, item_stack.component:minecraft:dye 1, item_stack.component:minecraft:use_effects 1, item_stack.component:minecraft:minimum_attack_charge 1, item_stack.component:minecraft:damage_type 1, item_stack.component:minecraft:weapon 1, item_stack.component:minecraft:attack_range 1, item_stack.component:minecraft:potion_duration_scale 1, item_stack.component:minecraft:food 1, item_stack.component:minecraft:use_remainder 1, item_stack.component:minecraft:use_cooldown 1, item_stack.component:minecraft:repairable 1, item_stack.component:minecraft:note_block_sound 1, item_stack.component:minecraft:interact_animation 1, item_stack.component:minecraft:provides_pottery_pattern 1, item_stack.component:minecraft:cooking_fuel 1, item_stack.component:minecraft:brewing_fuel 1, item_stack.component:minecraft:cushion/color 1, item_stack.component:minecraft:compostable 1, item_stack.component:minecraft:villager_food 1, item_stack.component:minecraft:mob_visibility 1, item_stack.component:minecraft:provides_banner_patterns 1, item_stack.component:minecraft:lock 1, item_stack.component:minecraft:container_loot 1, item_stack.component:minecraft:can_break 1, item_stack.component:minecraft:can_place_on 1, item_stack.component:minecraft:bees 1, item_stack.component:minecraft:block_state 1, item_stack.component:minecraft:sulfur_cube_content 1, item_stack.component:minecraft:entity_data 1, item_stack.component:minecraft:bucket_entity_data 1, item_stack.component:minecraft:villager/variant 1, item_stack.component:minecraft:fox/variant 1, item_stack.component:minecraft:salmon/size 1, item_stack.component:minecraft:parrot/variant 1, item_stack.component:minecraft:horse/variant 1, item_stack.component:minecraft:llama/variant 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 10192 | 9395 | block_entity.data 6151, block_entity.sign_flags 1768, block_entity.sign_color 1768, entity.data 332, entity.position 101, block_entity.command_flags 36, structure.spawn_zone 29, world.value 7 |
| **ÉTAT TEMPORAIRE** | 832 | 0 | block_entity.data 832 |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 2973 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 103 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 105 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 107 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 109 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 111 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 113 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 115 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 117 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 119 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 121 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 123 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 125 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 127 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 129 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 131 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 133 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 135 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 137 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 139 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 141 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 143 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 145 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 147 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 149 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 151 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 153 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 155 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 157 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 159 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 161 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 163 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 165 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 167 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 169 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 171 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 173 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 175 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 177 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 179 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | mccb26:states 73 70 181 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| … | 2933 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 40226 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:brown_shulker_box | overworld 1000 304 1436 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:chest | overworld 1000 304 1460 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:dispenser | overworld 1000 304 1464 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> down"}}` |
| FAIL | block minecraft:chest | overworld 1000 304 1492 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:straw_bed | overworld 1000 304 1500 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:red_bed"}` |
| FAIL | block minecraft:straw_bed | overworld 1000 304 1500 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"minecraft:red_bed","note":"identity-changed"}` |
| FAIL | block minecraft:chest | overworld 1000 304 1506 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:straw_bed | overworld 1001 304 1500 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:red_bed"}` |
| FAIL | block minecraft:straw_bed | overworld 1001 304 1500 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"minecraft:red_bed","note":"identity-changed"}` |
| FAIL | block minecraft:blue_shulker_box | overworld 1002 304 1436 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:purple_shulker_box | overworld 1004 304 1436 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:trapped_chest | overworld 1004 304 1460 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:dropper | overworld 1004 304 1464 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"north -> down"}}` |
| FAIL | block minecraft:chest | overworld 1004 304 1492 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:cyan_shulker_box | overworld 1006 304 1436 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:light_gray_shulker_box | overworld 1008 304 1436 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:purple_shulker_box"}` |
| FAIL | block minecraft:light_gray_shulker_box | overworld 1008 304 1436 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"minecraft:purple_shulker_box","note":"identity-changed"}` |
| FAIL | block minecraft:white_shulker_box | overworld 1008 304 1468 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:chest | overworld 1008 304 1492 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:gray_shulker_box | overworld 1010 304 1436 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:red_shulker_box | overworld 1012 304 1434 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:pink_shulker_box | overworld 1012 304 1436 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:green_shulker_box | overworld 1014 304 1434 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:lime_shulker_box | overworld 1014 304 1436 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:trapped_chest | overworld 1016 304 1492 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:chest | overworld 1020 304 1492 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:jukebox | overworld 1024 304 1464 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"has_record":"true -> false"}}` |
| FAIL | block minecraft:yellow_shulker_box | overworld 1028 304 1492 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:oak_sign | overworld 1032 304 1480 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:red_shulker_box | overworld 1032 304 1492 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"facing":"up -> down"}}` |
| FAIL | block minecraft:oak_sign | overworld 1032 304 1496 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1036 304 1480 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:chest | overworld 1036 304 1492 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:oak_sign | overworld 1036 304 1496 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:chest | overworld 1040 304 1492 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:poplar_sign | overworld 1040 304 1496 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:chest | overworld 1044 304 1480 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:oak_hanging_sign | overworld 1044 304 1496 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"rotation":"8 -> 0"}}` |
| FAIL | block minecraft:chest | overworld 1048 304 1492 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| FAIL | block minecraft:chest | overworld 1052 304 1492 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"type":"single -> left"}}` |
| … | 40186 autres (liste complète dans le JSON) | | | | |

### MINEUR — 10192 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:brushable_block | mccb26:states 1 70 245 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:brushable_block | mccb26:states 1 70 247 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:brushable_block | mccb26:states 1 70 249 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:brushable_block | mccb26:states 1 70 251 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:brushable_block | mccb26:states 1 70 257 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:brushable_block | mccb26:states 1 70 259 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:brushable_block | mccb26:states 1 70 261 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:brushable_block | mccb26:states 1 70 263 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 191 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 193 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 195 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 197 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 199 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 201 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 203 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 205 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 207 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 209 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 211 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:dispenser | mccb26:states 7 70 213 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 73 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 75 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 77 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 79 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 81 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 83 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 85 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 87 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 89 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 91 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 93 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 95 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 97 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 99 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 101 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 103 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 105 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 107 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 109 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chiseled_bookshelf | mccb26:states 41 70 111 | block_entity.data | données | `{"observed":"no block entity"}` |
| … | 10152 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 832 (roundtrip)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -359 -54 234 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -278 -54 455 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -273 -54 383 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -271 -54 435 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -4 -54 314 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 17 -54 377 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 18 -54 374 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 51 -54 425 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 171 -54 247 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 172 -54 248 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 185 -54 148 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 228 -54 193 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 303 -54 241 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 304 -54 241 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 305 -54 241 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 320 -54 505 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 321 -54 509 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 322 -54 506 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -358 -53 334 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -356 -53 337 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -351 -53 339 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -284 -53 459 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -272 -53 427 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld -269 -53 433 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 19 -53 374 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 45 -53 422 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 47 -53 417 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 49 -53 424 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 50 -53 425 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 184 -53 147 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 201 -53 313 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 229 -53 194 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 251 -53 154 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 311 -53 247 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 334 -53 170 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 335 -53 170 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 369 -53 244 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 369 -53 540 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 376 -53 233 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sculk_sensor | overworld 702 -53 562 | block_entity.data | clé last_vibration_frequency | `{"differing_keys":["last_vibration_frequency"],"differing_count":1,"lost":[],"added":[],"changed":["last_vibration_frequency"],"sample":{"last_vibration_frequency":["[\"n\",\"0\"]","[\"n\",\"1\"]"]}}` |
| … | 792 autres (liste complète dans le JSON) | | | | |

