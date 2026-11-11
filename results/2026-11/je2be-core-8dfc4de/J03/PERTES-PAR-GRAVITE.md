# J03@2.0 — pertes classées par gravité (je2be-core-8dfc4de, J03_aller + J03_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 223 | 223 | item_stack.identity 96, item_stack.count 96, block_entity.command 23, item_stack.component:minecraft:potion_contents 3, item_stack.component:minecraft:stored_enchantments 1, entity.tamed 1, entity.inventory 1, world.value 1, player.xp_level 1 |
| **MAJEUR** | 5234 | 5234 | structure.spawn_zone 2131, block_entity.presence 2054, block.identity 684, entity.identity 217, scoreboard.value 79, entity.health 33, entity.equipment 14, world.value 5, scoreboard.presence 4, scoreboard.display_name 4, block.waterlog 2, block_entity.record 1, entity.baby 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 464 | 464 | entity.position 217, entity.data 217, block_entity.command_flags 23, world.value 7 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 223 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:command_block | overworld 162 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 162 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 166 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 167 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 168 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 172 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 176 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 176 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 180 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 180 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 184 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 184 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 188 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 188 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 192 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 194 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 198 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 200 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 201 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 202 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 206 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 206 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 210 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | item_stack minecraft:nether_star | overworld -299999 301 300000 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:nether_star | overworld -299999 301 300000 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond | overworld 13 301 44 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond | overworld 13 301 44 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:emerald | overworld 15 301 44 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:emerald | overworld 15 301 44 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:gold_ingot | overworld 16 301 44 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:gold_ingot | overworld 16 301 44 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 34 301 12 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 34 301 12 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:redstone | overworld 44 301 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:redstone | overworld 44 301 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| … | 183 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 5234 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:obsidian | overworld -1024 300 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld -1023 300 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld -1022 300 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld -1021 300 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 36 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 36 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 53 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 53 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:redstone_block | overworld 65 300 0 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 70 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 70 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:redstone_block | overworld 71 300 0 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld 80 300 -80 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld 81 300 -80 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld 82 300 -80 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld 83 300 -80 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 87 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 87 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 104 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 104 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 121 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 121 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 138 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 138 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 155 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 155 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 172 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 172 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 189 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 189 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 206 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 206 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 223 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 223 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:lodestone | overworld -300000 301 300000 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld -299999 301 300000 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld -1024 301 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:nether_portal | overworld -1023 301 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:nether_portal | overworld -1022 301 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld -1021 301 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| … | 5194 autres (liste complète dans le JSON) | | | | |

### MINEUR — 464 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:command_block | overworld 162 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 162 301 10 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 166 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 167 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 168 301 10 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 172 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 176 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 176 301 10 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 180 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 180 301 10 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 184 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 184 301 10 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 188 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 188 301 10 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 192 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 194 301 10 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 198 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 200 301 10 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 201 301 10 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 202 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 206 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 206 301 10 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 210 301 2 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | entity minecraft:camel | overworld -539 71 280 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:camel | overworld -539 71 280 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld -750.1 99 -681.4 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld -750.1 99 -681.4 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld -532.2 71 254.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cat | overworld -532.2 71 254.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart | overworld -1193.5 -39.5 256.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart | overworld -1193.5 -39.5 256.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart | overworld -1044.5 -12.5 50.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart | overworld -1044.5 -12.5 50.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart | overworld -1021.5 -6.5 8.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart | overworld -1021.5 -6.5 8.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart | overworld -1011.5 12.5 24.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart | overworld -1011.5 12.5 24.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart | overworld -801.5 -24.5 735.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart | overworld -801.5 -24.5 735.5 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chest_minecart | overworld -797.5 -21.5 781.5 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| … | 424 autres (liste complète dans le JSON) | | | | |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 223 | 223 | item_stack.identity 96, item_stack.count 96, block_entity.command 23, item_stack.component:minecraft:potion_contents 3, item_stack.component:minecraft:stored_enchantments 1, entity.tamed 1, entity.inventory 1, world.value 1, player.xp_level 1 |
| **MAJEUR** | 17219 | 17219 | structure.spawn_zone 13647, block_entity.presence 2054, block.identity 724, block.state 426, entity.identity 217, scoreboard.value 80, entity.health 33, entity.equipment 14, world.value 5, scoreboard.presence 5, scoreboard.display_name 5, block.waterlog 2, block_entity.record 1, entity.baby 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 2529 | 2529 | block_entity.data 2054, entity.position 217, entity.data 217, block_entity.command_flags 23, world.value 18 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 223 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:command_block | overworld 162 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 162 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 166 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 167 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 168 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 172 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 176 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 176 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 180 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 180 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 184 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 184 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 188 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 188 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 192 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 194 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 198 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 200 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 201 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 202 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 206 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 206 301 10 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 210 301 2 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | item_stack minecraft:nether_star | overworld -299999 301 300000 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:nether_star | overworld -299999 301 300000 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond | overworld 13 301 44 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:diamond | overworld 13 301 44 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:emerald | overworld 15 301 44 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:emerald | overworld 15 301 44 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:gold_ingot | overworld 16 301 44 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:gold_ingot | overworld 16 301 44 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 34 301 12 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 34 301 12 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:redstone | overworld 44 301 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:redstone | overworld 44 301 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:iron_ingot | overworld 53 301 35 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| … | 183 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 17219 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:obsidian | overworld -1024 300 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld -1023 300 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld -1022 300 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld -1021 300 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 36 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 36 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 53 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 53 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:redstone_block | overworld 65 300 0 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 70 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 70 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:redstone_block | overworld 71 300 0 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld 80 300 -80 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld 81 300 -80 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld 82 300 -80 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld 83 300 -80 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 87 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 87 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 104 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 104 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 121 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 121 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 138 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 138 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 155 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 155 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 172 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 172 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 189 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 189 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 206 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 206 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 223 300 35 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 223 300 51 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:lodestone | overworld -300000 301 300000 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld -299999 301 300000 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:chest | overworld -299999 301 300000 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:obsidian | overworld -1024 301 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:nether_portal | overworld -1023 301 1024 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:nether_portal | overworld -1023 301 1024 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| … | 17179 autres (liste complète dans le JSON) | | | | |

### MINEUR — 2529 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:mob_spawner | overworld 494 -56 -44 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chest | overworld 495 -56 -46 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chest | overworld 496 -56 -45 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld -186 -54 618 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 150 -54 533 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_catalyst | overworld 153 -54 544 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 155 -54 543 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 158 -54 530 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 158 -54 542 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 160 -54 532 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_catalyst | overworld 169 -54 605 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 188 -54 529 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 205 -54 512 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chest | overworld 221 -54 -646 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:mob_spawner | overworld 224 -54 -647 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chest | overworld 226 -54 -649 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_shrieker | overworld 242 -54 566 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 245 -54 566 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 300 -54 549 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_shrieker | overworld 394 -54 380 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 427 -54 604 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 542 -54 514 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 571 -54 576 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chest | overworld -232 -53 279 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:mob_spawner | overworld -231 -53 282 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chest | overworld -229 -53 279 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 145 -53 534 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 159 -53 535 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 160 -53 538 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 162 -53 540 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_catalyst | overworld 208 -53 612 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 227 -53 585 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_catalyst | overworld 238 -53 568 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 298 -53 564 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 298 -53 567 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 542 -53 534 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_sensor | overworld 547 -53 537 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sculk_catalyst | overworld 554 -53 540 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:chest | overworld 701 -53 142 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:mob_spawner | overworld 702 -53 -398 | block_entity.data | données | `{"observed":"no block entity"}` |
| … | 2489 autres (liste complète dans le JSON) | | | | |

