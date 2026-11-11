# J05@1.0 — pertes classées par gravité (je2be-core-8dfc4de, J05_aller + J05_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 129 | 129 | item_stack.identity 44, item_stack.count 44, block_entity.sign_text 31, item_stack.component:minecraft:potion_contents 6, block_entity.lectern_book 1, world.value 1, player.xp_level 1, player.inventory 1 |
| **MAJEUR** | 1203 | 1203 | block.identity 846, entity.identity 109, entity.health 94, scoreboard.value 81, block_entity.presence 58, entity.equipment 5, entity.details 1, world.value 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1, player.spawn_point 1 |
| **MINEUR** | 252 | 252 | entity.position 109, entity.data 109, block_entity.sign_flags 31, world.value 3 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 129 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | overworld -19 -60 45 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 71 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 71 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 3 -60 12 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:lectern | overworld 5 -60 15 | block_entity.lectern_book | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 71 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 29 -60 45 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 49 -60 13 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | item_stack minecraft:raw_iron | overworld -17 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:raw_iron | overworld -17 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:coal | overworld -17 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:coal | overworld -17 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:beef | overworld -17 -60 30 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:beef | overworld -17 -60 30 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:chicken | overworld -17 -60 30 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:chicken | overworld -17 -60 30 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| … | 89 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 1203 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:oak_sign | overworld -19 -60 45 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:redstone_block | overworld -18 -60 40 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 17 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:furnace | overworld -17 -60 20 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 27 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:campfire | overworld -17 -60 30 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 36 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:piston | overworld -17 -60 40 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 58 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:beehive | overworld -17 -60 61 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 71 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:campfire | overworld -17 -60 75 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld -16 -60 40 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -11 -60 59 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -11 -60 60 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -11 -60 61 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -11 -60 62 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -11 -60 63 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -10 -60 59 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -10 -60 63 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 17 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:blast_furnace | overworld -9 -60 20 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 27 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:soul_campfire | overworld -9 -60 30 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 36 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:redstone_block | overworld -9 -60 40 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:repeater | overworld -9 -60 41 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:redstone_lamp | overworld -9 -60 42 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 58 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -9 -60 59 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -9 -60 63 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 71 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:furnace | overworld -9 -60 75 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -8 -60 59 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -8 -60 63 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -7 -60 59 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -7 -60 60 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -7 -60 61 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -7 -60 62 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -7 -60 63 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| … | 1163 autres (liste complète dans le JSON) | | | | |

### MINEUR — 252 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | overworld -19 -60 45 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 17 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 27 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 36 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 58 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 71 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 17 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 27 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 36 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 58 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 71 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 17 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 27 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 36 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 58 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 3 -60 12 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 17 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 27 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 36 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 58 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 17 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 27 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 36 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 58 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 17 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 27 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 36 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 58 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 71 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 29 -60 45 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 49 -60 13 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:arrow | overworld 19 -52 61 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 10 -60 49.1 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 10 -60 49.1 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 11.2 -60 46.8 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:chicken | overworld 11.2 -60 46.8 | entity.data | données | `{"observed":"no matching entity"}` |
| FAIL | entity minecraft:cow | overworld 13.8 -60 49.8 | entity.position | position d'une créature | `{"observed":"no matching entity"}` |
| … | 212 autres (liste complète dans le JSON) | | | | |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 129 | 129 | item_stack.identity 44, item_stack.count 44, block_entity.sign_text 31, item_stack.component:minecraft:potion_contents 6, block_entity.lectern_book 1, world.value 1, player.xp_level 1, player.inventory 1 |
| **MAJEUR** | 1292 | 1292 | block.identity 846, entity.identity 110, entity.health 94, block.state 89, scoreboard.value 81, block_entity.presence 58, entity.equipment 5, world.value 1, scoreboard.presence 1, scoreboard.display_name 1, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1, player.spawn_point 1 |
| **MINEUR** | 348 | 348 | entity.position 110, entity.data 110, block_entity.data 58, block_entity.sign_flags 31, block_entity.sign_color 31, world.value 8 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 129 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | overworld -19 -60 45 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 71 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 71 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -1 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 3 -60 12 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:lectern | overworld 5 -60 15 | block_entity.lectern_book | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 11 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 19 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 17 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 27 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 36 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 58 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 27 -60 71 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 29 -60 45 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 49 -60 13 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | item_stack minecraft:raw_iron | overworld -17 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:raw_iron | overworld -17 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:coal | overworld -17 -60 20 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:coal | overworld -17 -60 20 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:beef | overworld -17 -60 30 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:beef | overworld -17 -60 30 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:chicken | overworld -17 -60 30 | item_stack.identity | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| FAIL | item_stack minecraft:chicken | overworld -17 -60 30 | item_stack.count | objet perdu ou changé dans un conteneur | `{"observed":"container missing"}` |
| … | 89 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 1292 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:oak_sign | overworld -19 -60 45 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -19 -60 45 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:redstone_block | overworld -18 -60 40 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 17 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 17 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:furnace | overworld -17 -60 20 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:furnace | overworld -17 -60 20 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 27 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 27 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:campfire | overworld -17 -60 30 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:campfire | overworld -17 -60 30 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 36 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 36 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:piston | overworld -17 -60 40 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:piston | overworld -17 -60 40 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 58 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 58 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:beehive | overworld -17 -60 61 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:beehive | overworld -17 -60 61 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 71 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -17 -60 71 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:campfire | overworld -17 -60 75 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:campfire | overworld -17 -60 75 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld -16 -60 40 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -11 -60 59 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -11 -60 60 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -11 -60 61 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -11 -60 62 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -11 -60 63 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -10 -60 59 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:glass | overworld -10 -60 63 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 17 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 17 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:blast_furnace | overworld -9 -60 20 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:blast_furnace | overworld -9 -60 20 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 27 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 27 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:soul_campfire | overworld -9 -60 30 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:soul_campfire | overworld -9 -60 30 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:oak_sign | overworld -9 -60 36 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| … | 1252 autres (liste complète dans le JSON) | | | | |

### MINEUR — 348 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | overworld -19 -60 45 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -19 -60 45 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -19 -60 45 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 17 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 17 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 17 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:furnace | overworld -17 -60 20 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 27 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 27 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 27 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:campfire | overworld -17 -60 30 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 36 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 36 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 36 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 58 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 58 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 58 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:beehive | overworld -17 -60 61 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 71 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 71 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -17 -60 71 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:campfire | overworld -17 -60 75 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 17 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 17 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 17 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:blast_furnace | overworld -9 -60 20 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 27 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 27 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 27 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:campfire | overworld -9 -60 30 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 36 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 36 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 36 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 58 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 58 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 58 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 71 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 71 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld -9 -60 71 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:furnace | overworld -9 -60 75 | block_entity.data | données | `{"observed":"no block entity"}` |
| … | 308 autres (liste complète dans le JSON) | | | | |

