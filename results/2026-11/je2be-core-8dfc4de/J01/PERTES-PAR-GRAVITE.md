# J01@2.0 — pertes classées par gravité (je2be-core-8dfc4de, J01_aller + J01_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 7507 | 7507 | item_stack.identity 2747, item_stack.count 2747, block_entity.sign_text 1383, item_stack.component:minecraft:trim 200, item_stack.component:minecraft:potion_contents 187, item_stack.component:minecraft:enchantments 108, block_entity.command 36, item_stack.component:minecraft:container 21, item_stack.component:minecraft:bundle_contents 20, item_stack.component:minecraft:custom_name 10, item_stack.component:minecraft:banner_patterns 7, item_stack.component:minecraft:written_book_content 7, item_stack.component:minecraft:instrument 7, item_stack.component:minecraft:stored_enchantments 5, item_stack.component:minecraft:base_color 4, item_stack.component:minecraft:writable_book_content 4, item_stack.component:minecraft:dyed_color 3, item_stack.component:minecraft:firework_explosion 2, item_stack.component:minecraft:fireworks 2, item_stack.component:minecraft:charged_projectiles 1, entity.tamed 1, world.value 1, player.xp_level 1, player.inventory 1, player.armor 1, player.details 1 |
| **MAJEUR** | 157351 | 157351 | block.identity 128689, block.waterlog 12050, block_entity.presence 8300, structure.spawn_zone 4543, entity.identity 1910, entity.health 1580, item_stack.component:minecraft:damage 121, entity.baby 52, scoreboard.value 49, item_stack.component:mccb:couleur 35, item_stack.component:minecraft:lore 4, item_stack.component:minecraft:ominous_bottle_amplifier 4, item_stack.component:minecraft:unbreakable 2, item_stack.component:minecraft:repair_cost 2, world.value 2, block_entity.record 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 5270 | 5270 | entity.position 1910, entity.data 1910, block_entity.sign_flags 1383, block_entity.command_flags 36, structure.spawn_zone 29, world.value 2 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 7507 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | overworld 1032 304 1480 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1032 304 1496 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:hanging_sign | overworld 1036 304 1480 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1036 304 1496 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1040 304 1496 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:hanging_sign | overworld 1044 304 1496 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1103 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1105 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1107 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1109 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1111 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1113 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1115 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1117 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1119 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1121 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1123 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1125 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1127 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1129 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1131 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1133 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1135 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1137 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1139 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1141 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1143 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1145 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1147 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1149 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1151 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1153 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1155 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1157 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1159 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1161 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1163 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1165 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1167 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1169 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| … | 7467 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 157351 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:grass_block | overworld 1040 303 1488 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:grass_block | overworld 1044 303 1488 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 990 304 1400 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 990 304 1430 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:lodestone | overworld 995 304 1392 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1400 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1402 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1404 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1406 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1408 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1410 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1412 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1414 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1430 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1432 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1434 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:brown_shulker_box | overworld 1000 304 1436 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 1000 304 1460 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:dispenser | overworld 1000 304 1464 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:lectern | overworld 1000 304 1468 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_shelf | overworld 1000 304 1472 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 1000 304 1492 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1496 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:straw_bed | overworld 1000 304 1500 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 1000 304 1506 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1512 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:straw_bed | overworld 1001 304 1500 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1002 304 1400 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1002 304 1402 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1002 304 1404 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1002 304 1406 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1002 304 1408 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1002 304 1410 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1002 304 1412 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1002 304 1414 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1002 304 1430 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1002 304 1432 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1002 304 1434 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:blue_shulker_box | overworld 1002 304 1436 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1004 304 1400 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| … | 157311 autres (liste complète dans le JSON) | | | | |

### MINEUR — 5270 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | overworld 1032 304 1480 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1032 304 1496 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:hanging_sign | overworld 1036 304 1480 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1036 304 1496 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1040 304 1496 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:hanging_sign | overworld 1044 304 1496 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1103 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1105 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1107 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1109 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1111 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1113 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1115 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1117 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1119 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1121 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1123 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1125 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1127 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1129 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1131 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1133 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1135 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1137 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1139 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1141 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1143 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1145 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1147 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1149 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1151 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1153 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1155 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1157 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1159 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1161 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1163 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1165 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1167 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 1073 305 1169 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| … | 5230 autres (liste complète dans le JSON) | | | | |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 9932 | 9932 | block_entity.sign_text 2839, item_stack.identity 2790, item_stack.count 2790, custom_dimension.blocks 841, item_stack.component:minecraft:trim 200, item_stack.component:minecraft:potion_contents 187, item_stack.component:minecraft:enchantments 108, block_entity.command 72, item_stack.component:minecraft:container 21, item_stack.component:minecraft:bundle_contents 20, item_stack.component:minecraft:custom_name 11, item_stack.component:minecraft:banner_patterns 7, item_stack.component:minecraft:written_book_content 7, item_stack.component:minecraft:instrument 7, item_stack.component:minecraft:stored_enchantments 5, item_stack.component:minecraft:base_color 4, item_stack.component:minecraft:writable_book_content 4, item_stack.component:minecraft:dyed_color 3, item_stack.component:minecraft:profile 2, item_stack.component:minecraft:lodestone_tracker 2, item_stack.component:minecraft:firework_explosion 2, item_stack.component:minecraft:fireworks 2, item_stack.component:minecraft:map_id 2, item_stack.component:minecraft:charged_projectiles 1, entity.tamed 1, world.value 1, player.xp_level 1, player.inventory 1, player.armor 1 |
| **MAJEUR** | 307556 | 307556 | block.identity 130004, block.state 129505, structure.spawn_zone 19135, block_entity.presence 13036, block.waterlog 12050, entity.identity 1910, entity.health 1580, item_stack.component:minecraft:damage 121, entity.baby 52, scoreboard.value 49, item_stack.component:minecraft:lore 4, item_stack.component:minecraft:pot_decorations 4, item_stack.component:minecraft:ominous_bottle_amplifier 4, item_stack.component:minecraft:break_sound 3, item_stack.component:minecraft:sign_text_front 3, item_stack.component:minecraft:sign_text_back 3, item_stack.component:minecraft:waxed 3, item_stack.component:minecraft:unbreakable 2, item_stack.component:minecraft:custom_model_data 2, item_stack.component:minecraft:max_stack_size 2, item_stack.component:minecraft:repair_cost 2, item_stack.component:minecraft:attack_animation 2, item_stack.component:minecraft:consumable 2, item_stack.component:minecraft:map_decorations 2, item_stack.component:minecraft:debug_stick_state 2, item_stack.component:minecraft:block_entity_data 2, item_stack.component:minecraft:recipes 2, item_stack.component:minecraft:suspicious_stew_effects 2, item_stack.component:minecraft:custom_data 2, item_stack.component:minecraft:max_damage 2, world.value 2, block_entity.record 1, item_stack.component:minecraft:rarity 1, item_stack.component:minecraft:enchantment_glint_override 1, item_stack.component:minecraft:tooltip_display 1, item_stack.component:minecraft:axolotl/variant 1, item_stack.component:minecraft:rabbit/variant 1, item_stack.component:minecraft:mooshroom/variant 1, item_stack.component:minecraft:sheep/color 1, item_stack.component:minecraft:shulker/color 1, item_stack.component:minecraft:tropical_fish/pattern_color 1, item_stack.component:minecraft:tropical_fish/base_color 1, item_stack.component:minecraft:tropical_fish/pattern 1, item_stack.component:minecraft:item_model 1, item_stack.component:minecraft:item_name 1, item_stack.component:minecraft:enchantable 1, item_stack.component:minecraft:damage_resistant 1, item_stack.component:minecraft:intangible_projectile 1, item_stack.component:minecraft:glider 1, item_stack.component:minecraft:tool 1, item_stack.component:minecraft:dye 1, item_stack.component:minecraft:use_effects 1, item_stack.component:minecraft:minimum_attack_charge 1, item_stack.component:minecraft:damage_type 1, item_stack.component:minecraft:weapon 1, item_stack.component:minecraft:attack_range 1, item_stack.component:minecraft:potion_duration_scale 1, item_stack.component:minecraft:food 1, item_stack.component:minecraft:use_remainder 1, item_stack.component:minecraft:use_cooldown 1, item_stack.component:minecraft:repairable 1, item_stack.component:minecraft:note_block_sound 1, item_stack.component:minecraft:interact_animation 1, item_stack.component:minecraft:provides_pottery_pattern 1, item_stack.component:minecraft:cooking_fuel 1, item_stack.component:minecraft:brewing_fuel 1, item_stack.component:minecraft:cushion/color 1, item_stack.component:minecraft:compostable 1, item_stack.component:minecraft:villager_food 1, item_stack.component:minecraft:mob_visibility 1, item_stack.component:minecraft:provides_banner_patterns 1, item_stack.component:minecraft:lock 1, item_stack.component:minecraft:container_loot 1, item_stack.component:minecraft:can_break 1, item_stack.component:minecraft:can_place_on 1, item_stack.component:minecraft:bees 1, item_stack.component:minecraft:block_state 1, item_stack.component:minecraft:sulfur_cube_content 1, item_stack.component:minecraft:entity_data 1, item_stack.component:minecraft:bucket_entity_data 1, item_stack.component:minecraft:villager/variant 1, item_stack.component:minecraft:fox/variant 1, item_stack.component:minecraft:salmon/size 1, item_stack.component:minecraft:parrot/variant 1, item_stack.component:minecraft:horse/variant 1, item_stack.component:minecraft:llama/variant 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 22643 | 22643 | block_entity.data 13036, block_entity.sign_flags 2839, block_entity.sign_color 2839, entity.position 1910, entity.data 1910, block_entity.command_flags 72, structure.spawn_zone 29, world.value 8 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 9932 (roundtrip)

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
| … | 9892 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 307556 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:grass_block | overworld 1040 303 1488 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:grass_block | overworld 1040 303 1488 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:grass_block | overworld 1044 303 1488 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:grass_block | overworld 1044 303 1488 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 990 304 1400 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 990 304 1400 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 990 304 1430 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 990 304 1430 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:lodestone | overworld 995 304 1392 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1400 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1400 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1402 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1402 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1404 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1404 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1406 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1406 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1408 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1408 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1410 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1410 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1412 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1412 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1414 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1414 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1430 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1430 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1432 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1432 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1434 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:barrel | overworld 1000 304 1434 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:brown_shulker_box | overworld 1000 304 1436 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:brown_shulker_box | overworld 1000 304 1436 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 1000 304 1460 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld 1000 304 1460 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:dispenser | overworld 1000 304 1464 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:dispenser | overworld 1000 304 1464 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:lectern | overworld 1000 304 1468 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:lectern | overworld 1000 304 1468 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_shelf | overworld 1000 304 1472 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| … | 307516 autres (liste complète dans le JSON) | | | | |

### MINEUR — 22643 (roundtrip)

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
| … | 22603 autres (liste complète dans le JSON) | | | | |

