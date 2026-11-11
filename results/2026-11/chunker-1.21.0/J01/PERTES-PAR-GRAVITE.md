# J01@2.0 — pertes classées par gravité (chunker-1.21.0, J01_aller + J01_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 75 | 75 | item_stack.identity 30, item_stack.count 30, item_stack.component:minecraft:banner_patterns 2, item_stack.component:minecraft:written_book_content 1, item_stack.component:minecraft:writable_book_content 1, item_stack.component:minecraft:dyed_color 1, item_stack.component:minecraft:charged_projectiles 1, item_stack.component:minecraft:bundle_contents 1, item_stack.component:minecraft:container 1, item_stack.component:minecraft:stored_enchantments 1, item_stack.component:minecraft:base_color 1, entity.tamed 1, player.xp_level 1, player.inventory 1, player.armor 1, player.details 1 |
| **MAJEUR** | 9563 | 8832 | structure.spawn_zone 4543, entity.identity 1903, entity.health 1580, block_entity.data 758, block.waterlog 653, entity.baby 52, scoreboard.value 49, block.identity 12, item_stack.component:minecraft:unbreakable 2, block_entity.presence 1, item_stack.component:minecraft:damage 1, item_stack.component:mccb:couleur 1, world.value 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 3840 | 3840 | entity.position 1903, entity.data 1903, structure.spawn_zone 29, world.value 5 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 145 | 145 | block_entity.data 145 |

### CRITIQUE — 75 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:compass | overworld 1004 304 1434 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:lodestone_compass"}` |
| FAIL | item_stack minecraft:compass | overworld 1004 304 1434 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:lodestone_compass"}` |
| FAIL | item_stack minecraft:iron_chain | overworld 1014 304 1412 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:chain"}` |
| FAIL | item_stack minecraft:iron_chain | overworld 1014 304 1412 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:chain"}` |
| FAIL | item_stack minecraft:written_book | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:written_book | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:written_book | overworld 1014 304 1432 | item_stack.component:minecraft:written_book_content | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:writable_book | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:writable_book | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:writable_book | overworld 1014 304 1432 | item_stack.component:minecraft:writable_book_content | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:suspicious_stew | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:suspicious_stew | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:leather_chestplate | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:leather_chestplate | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:leather_chestplate | overworld 1014 304 1432 | item_stack.component:minecraft:dyed_color | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:crossbow | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:crossbow | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:crossbow | overworld 1014 304 1432 | item_stack.component:minecraft:charged_projectiles | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bundle | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bundle | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:bundle | overworld 1014 304 1432 | item_stack.component:minecraft:bundle_contents | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:white_shulker_box | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:white_shulker_box | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:white_shulker_box | overworld 1014 304 1432 | item_stack.component:minecraft:container | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:stick | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:stick | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_sword | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:enchanted_book | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:enchanted_book | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:enchanted_book | overworld 1014 304 1432 | item_stack.component:minecraft:stored_enchantments | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_pickaxe | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond_pickaxe | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:stone | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:stone | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:white_banner | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:white_banner | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:white_banner | overworld 1014 304 1432 | item_stack.component:minecraft:banner_patterns | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 1014 304 1432 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:shield | overworld 1014 304 1432 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| … | 35 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 9563 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:moving_piston | overworld 1041 305 1003 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:moving_piston | overworld 1041 305 1005 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:moving_piston | overworld 1041 305 1007 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:moving_piston | overworld 1041 305 1009 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:moving_piston | overworld 1041 305 1011 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:moving_piston | overworld 1041 305 1013 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:moving_piston | overworld 1041 305 1015 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:moving_piston | overworld 1041 305 1017 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:moving_piston | overworld 1041 305 1019 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:moving_piston | overworld 1041 305 1021 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:moving_piston | overworld 1041 305 1023 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:moving_piston | overworld 1041 305 1025 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1235 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1239 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1243 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1247 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1251 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1255 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1259 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1263 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1267 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1271 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1275 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1279 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1283 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1287 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1291 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1295 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1299 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1303 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1307 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1311 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1315 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1319 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1323 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1327 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1331 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1335 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1339 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:white_concrete_stairs | overworld 1179 305 1343 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| … | 9523 autres (liste complète dans le JSON) | | | | |

### MINEUR — 3840 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | entity minecraft:armadillo | overworld -438 68 539 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld -438 68 539 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld -333 128 356 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld -333 128 356 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld -332 128 356 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld -332 128 356 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld -63.3 64 -526 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld -63.3 64 -526 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld -63 64 -527 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld -63 64 -527 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld -63 64 -526 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld -63 64 -526 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 161 128 150 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 161 128 150 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 162 129 150 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 162 129 150 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 162 128 154 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 162 128 154 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 408 74 7 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 408 74 7 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 410 75 7 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 410 75 7 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 417 101 449 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 417 101 449 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 417 100 452 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 417 100 452 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 419 100 453 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 419 100 453 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 441 70 1209 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 441 70 1209 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 443 70 1209 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 443 70 1209 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 444 69 1207 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 444 69 1207 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 470 96 485 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 470 96 485 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 471 96 482 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 471 96 482 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 474 96 481 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:armadillo | overworld 474 96 481 | entity.data | données | `{"observed":"no matching entity"}` |
| … | 3800 autres (liste complète dans le JSON) | | | | |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 776 | 200 | custom_dimension.blocks 576, item_stack.identity 77, item_stack.count 77, item_stack.component:minecraft:enchantments 8, item_stack.component:minecraft:custom_name 7, item_stack.component:minecraft:written_book_content 5, item_stack.component:minecraft:dyed_color 3, item_stack.component:minecraft:profile 2, item_stack.component:minecraft:container 2, item_stack.component:minecraft:firework_explosion 2, item_stack.component:minecraft:fireworks 2, item_stack.component:minecraft:banner_patterns 2, item_stack.component:minecraft:map_id 2, block_entity.sign_text 1, item_stack.component:minecraft:potion_contents 1, item_stack.component:minecraft:writable_book_content 1, item_stack.component:minecraft:charged_projectiles 1, item_stack.component:minecraft:bundle_contents 1, item_stack.component:minecraft:stored_enchantments 1, item_stack.component:minecraft:base_color 1, entity.tamed 1, player.xp_level 1, player.inventory 1, player.armor 1 |
| **MAJEUR** | 32167 | 31635 | structure.spawn_zone 19135, block.state 6810, entity.identity 1903, entity.health 1580, block.identity 1329, block.waterlog 653, block_entity.data 532, entity.baby 52, scoreboard.value 49, block_entity.presence 19, item_stack.component:minecraft:lore 4, item_stack.component:minecraft:break_sound 3, item_stack.component:minecraft:sign_text_front 3, item_stack.component:minecraft:sign_text_back 3, item_stack.component:minecraft:waxed 3, item_stack.component:minecraft:pot_decorations 3, item_stack.component:minecraft:unbreakable 2, item_stack.component:minecraft:custom_model_data 2, item_stack.component:minecraft:max_stack_size 2, item_stack.component:minecraft:attack_animation 2, item_stack.component:minecraft:consumable 2, item_stack.component:minecraft:map_decorations 2, item_stack.component:minecraft:debug_stick_state 2, item_stack.component:minecraft:block_entity_data 2, item_stack.component:minecraft:recipes 2, item_stack.component:minecraft:suspicious_stew_effects 2, item_stack.component:minecraft:custom_data 2, item_stack.component:minecraft:max_damage 2, item_stack.component:minecraft:rarity 1, item_stack.component:minecraft:enchantment_glint_override 1, item_stack.component:minecraft:tooltip_display 1, item_stack.component:minecraft:axolotl/variant 1, item_stack.component:minecraft:rabbit/variant 1, item_stack.component:minecraft:mooshroom/variant 1, item_stack.component:minecraft:sheep/color 1, item_stack.component:minecraft:shulker/color 1, item_stack.component:minecraft:tropical_fish/pattern_color 1, item_stack.component:minecraft:tropical_fish/base_color 1, item_stack.component:minecraft:tropical_fish/pattern 1, item_stack.component:minecraft:item_model 1, item_stack.component:minecraft:item_name 1, item_stack.component:minecraft:enchantable 1, item_stack.component:minecraft:damage_resistant 1, item_stack.component:minecraft:intangible_projectile 1, item_stack.component:minecraft:glider 1, item_stack.component:minecraft:tool 1, item_stack.component:minecraft:dye 1, item_stack.component:minecraft:use_effects 1, item_stack.component:minecraft:minimum_attack_charge 1, item_stack.component:minecraft:damage_type 1, item_stack.component:minecraft:weapon 1, item_stack.component:minecraft:attack_range 1, item_stack.component:minecraft:potion_duration_scale 1, item_stack.component:minecraft:food 1, item_stack.component:minecraft:use_remainder 1, item_stack.component:minecraft:use_cooldown 1, item_stack.component:minecraft:repairable 1, item_stack.component:minecraft:note_block_sound 1, item_stack.component:minecraft:interact_animation 1, item_stack.component:minecraft:provides_pottery_pattern 1, item_stack.component:minecraft:cooking_fuel 1, item_stack.component:minecraft:brewing_fuel 1, item_stack.component:minecraft:cushion/color 1, item_stack.component:minecraft:compostable 1, item_stack.component:minecraft:villager_food 1, item_stack.component:minecraft:mob_visibility 1, item_stack.component:minecraft:provides_banner_patterns 1, item_stack.component:minecraft:lock 1, item_stack.component:minecraft:container_loot 1, item_stack.component:minecraft:damage 1, item_stack.component:minecraft:can_break 1, item_stack.component:minecraft:can_place_on 1, item_stack.component:minecraft:bees 1, item_stack.component:minecraft:block_state 1, item_stack.component:minecraft:sulfur_cube_content 1, item_stack.component:minecraft:entity_data 1, item_stack.component:minecraft:bucket_entity_data 1, item_stack.component:minecraft:villager/variant 1, item_stack.component:minecraft:fox/variant 1, item_stack.component:minecraft:salmon/size 1, item_stack.component:minecraft:parrot/variant 1, item_stack.component:minecraft:horse/variant 1, item_stack.component:minecraft:llama/variant 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 7540 | 3858 | block_entity.data 3694, entity.data 1910, entity.position 1903, structure.spawn_zone 29, world.value 4 |
| **ÉTAT TEMPORAIRE** | 139 | 0 | block_entity.data 139 |
| **TECHNIQUE (invisible)** | 1200 | 0 | block_entity.data 1200 |

### CRITIQUE — 776 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:hanging_sign | overworld 1036 304 1480 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":{"front":["MCCB","HANGING","FRONT",""],"back":["MCCB","HANGING","BACK",""]}}` |
| FAIL | item_stack minecraft:warm_ocean_ruins_map | overworld 990 304 1400 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:filled_map"}` |
| FAIL | item_stack minecraft:warm_ocean_ruins_map | overworld 990 304 1400 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"minecraft:filled_map"}` |
| FAIL | item_stack minecraft:white_concrete_slab | overworld 1000 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:white_concrete_slab | overworld 1000 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:stick | overworld 1000 304 1430 | item_stack.component:minecraft:custom_name | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"[\"s\",\"MCCB name\"]","expected":"[\"c\",{\"italic\":[\"n\",\"0\"],\"text\":[\"s\",\"MCCB name\"]}]"}` |
| FAIL | item_stack minecraft:player_head | overworld 1000 304 1434 | item_stack.component:minecraft:profile | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"absent","expected":"[\"c\",{\"name\":[\"s\",\"MHF_Sheep\"]}]"}` |
| FAIL | item_stack minecraft:netherite_sword | overworld 1000 304 1436 | item_stack.component:minecraft:enchantments | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"absent","expected":"[\"c\",{\"minecraft:sweeping_edge\":[\"n\",\"1\"]}]"}` |
| FAIL | item_stack minecraft:netherite_sword | overworld 1000 304 1436 | item_stack.component:minecraft:enchantments | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"absent","expected":"[\"c\",{\"minecraft:sweeping_edge\":[\"n\",\"1\"]}]"}` |
| FAIL | item_stack minecraft:trident | overworld 1000 304 1438 | item_stack.component:minecraft:enchantments | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"[\"c\",{\"minecraft:smite\":[\"n\",\"4\"]}]","expected":"[\"c\",{\"minecraft:smite\":[\"n\",\"4\"],\"minecraft:sweeping_edge\":[\"n\",\"2\"]}]"}` |
| FAIL | item_stack minecraft:wooden_sword | overworld 1000 304 1438 | item_stack.component:minecraft:enchantments | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"absent","expected":"[\"c\",{\"minecraft:sweeping_edge\":[\"n\",\"1\"]}]"}` |
| FAIL | item_stack minecraft:stick | overworld 1000 304 1496 | item_stack.component:minecraft:custom_name | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"[\"s\",\"MCCB name\"]","expected":"[\"c\",{\"italic\":[\"n\",\"0\"],\"text\":[\"s\",\"MCCB name\"]}]"}` |
| FAIL | item_stack minecraft:netherite_sword | overworld 1000 304 1506 | item_stack.component:minecraft:custom_name | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"[\"s\",\"La lame du voyageur\"]","expected":"[\"c\",{\"italic\":[\"n\",\"0\"],\"text\":[\"s\",\"La lame du voyageur\"]}]"}` |
| FAIL | item_stack minecraft:leather_chestplate | overworld 1000 304 1506 | item_stack.component:minecraft:dyed_color | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"[\"n\",\"-11098750\"]","expected":"[\"n\",\"5678466\"]"}` |
| FAIL | item_stack minecraft:written_book | overworld 1000 304 1506 | item_stack.component:minecraft:written_book_content | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"[\"c\",{\"author\":[\"s\",\"MCCB\"],\"pages\":[\"l\",[[\"c\",{\"raw\":[\"s\",\"Jour 1 : notre monde\"]}],[\"c\",{\"raw\":[\"s\",\"Retour au village\"]}]]],\"title\":[\"c\",{\"raw\":[\"s\",\"Carnet\"]}]}]","expected":"[\"c\",{\"author\":[\"s\",\"MC…` |
| FAIL | item_stack minecraft:white_concrete_stairs | overworld 1002 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:white_concrete_stairs | overworld 1002 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:orange_concrete_slab | overworld 1002 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:orange_concrete_slab | overworld 1002 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:orange_concrete_stairs | overworld 1002 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:orange_concrete_stairs | overworld 1002 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:magenta_concrete_slab | overworld 1002 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:magenta_concrete_slab | overworld 1002 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:magenta_concrete_stairs | overworld 1002 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:magenta_concrete_stairs | overworld 1002 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:light_blue_concrete_slab | overworld 1002 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:light_blue_concrete_slab | overworld 1002 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:light_blue_concrete_stairs | overworld 1002 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:light_blue_concrete_stairs | overworld 1002 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:yellow_concrete_slab | overworld 1002 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:yellow_concrete_slab | overworld 1002 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:yellow_concrete_stairs | overworld 1002 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:yellow_concrete_stairs | overworld 1002 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:lime_concrete_slab | overworld 1002 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:lime_concrete_slab | overworld 1002 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:lime_concrete_stairs | overworld 1002 304 1414 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:lime_concrete_stairs | overworld 1002 304 1414 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:blue_concrete_stairs | overworld 1002 304 1434 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:blue_concrete_stairs | overworld 1002 304 1434 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"stack missing"}` |
| FAIL | item_stack minecraft:blue_concrete_stairs | overworld 1002 304 1434 | item_stack.component:minecraft:custom_name | propriété importante d'un objet (enchantements, contenu, livre, nom…) | `{"observed":"stack missing"}` |
| … | 736 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 32167 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:yellow_concrete_stairs | overworld 1020 304 1500 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:yellow_concrete_stairs | overworld 1020 304 1500 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"minecraft:air","note":"identity-changed"}` |
| FAIL | block minecraft:green_concrete_slab | overworld 1024 304 1500 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:green_concrete_slab | overworld 1024 304 1500 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"minecraft:air","note":"identity-changed"}` |
| FAIL | block minecraft:green_concrete_slab | overworld 1040 304 1484 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:green_concrete_slab | overworld 1040 304 1484 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"minecraft:air","note":"identity-changed"}` |
| FAIL | block minecraft:yellow_concrete_stairs | overworld 1044 304 1484 | block.identity | bloc manquant ou remplacé | `{"observed":"minecraft:air"}` |
| FAIL | block minecraft:yellow_concrete_stairs | overworld 1044 304 1484 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"minecraft:air","note":"identity-changed"}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1097 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1099 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1105 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1107 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1113 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1115 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1121 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1123 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1129 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1131 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1137 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1139 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1145 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1147 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1153 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1155 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1161 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1163 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1169 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:mangrove_propagule | overworld 1001 305 1171 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"stage":"1 -> 0"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1211 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1213 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1219 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1221 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1227 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1229 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1235 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1237 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1243 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1245 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1251 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| FAIL | block minecraft:piston_head | overworld 1025 305 1253 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"short":"true -> false"}}` |
| … | 32127 autres (liste complète dans le JSON) | | | | |

### MINEUR — 7540 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:mob_spawner | mccb26:states 57 70 249 | block_entity.data | clé SpawnPotentials | `{"differing_keys":["SpawnPotentials"],"differing_count":1,"lost":[],"added":[],"changed":["SpawnPotentials"],"sample":{"SpawnPotentials":["[\"l\",[]]","[\"l\",[[\"c\",{\"data\":[\"c\",{\"entity\":[\"c\",{}]}],\"weight\":[\"n\",\"1\"]}]]]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 103 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 105 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 107 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 109 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 111 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 113 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 115 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 117 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 119 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 121 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 123 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 125 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 127 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 129 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 131 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 133 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 135 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 137 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 139 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 141 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 143 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 145 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 147 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 149 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 151 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 153 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 155 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 157 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 159 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 161 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 163 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 165 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 167 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 169 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 171 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 173 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 175 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 177 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | mccb26:states 73 70 179 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| … | 7500 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 139 (roundtrip)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:hopper | overworld 293 -43 -510 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1399 -39 1669 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 273 -38 -499 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1727 -38 665 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld -503 -35 81 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld -493 -35 42 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1410 -34 1684 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1414 -34 1658 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1420 -34 1673 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1747 -33 654 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1823 -33 660 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 82 -32 177 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 110 -32 181 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1246 -32 746 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 612 -31 1179 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld -508 -30 53 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld -497 -30 63 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld -482 -30 57 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld -519 -29 545 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1870 -29 1162 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld -538 -28 45 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld -534 -28 17 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld -529 -28 66 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1812 -28 645 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1827 -28 639 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1838 -28 649 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 33 -27 140 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 98 -27 165 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 661 -27 1185 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1261 -27 735 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1299 -27 757 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1327 -27 761 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld -290 -26 -486 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 507 -26 940 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1782 -26 685 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1786 -26 657 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 638 -24 1194 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 713 -24 1209 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 894 -24 2011 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| PARTIAL | block_entity minecraft:hopper | overworld 1070 -24 1338 | block_entity.data | clé TransferCooldown | `{"differing_keys":["TransferCooldown"],"differing_count":1,"lost":[],"added":[],"changed":["TransferCooldown"],"sample":{"TransferCooldown":["[\"n\",\"0\"]","[\"n\",\"-1\"]"]}}` |
| … | 99 autres (liste complète dans le JSON) | | | | |

