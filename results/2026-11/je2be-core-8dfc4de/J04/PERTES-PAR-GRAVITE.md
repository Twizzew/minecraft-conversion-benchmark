# J04@2.0 — pertes classées par gravité (je2be-core-8dfc4de, J04_aller + J04_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 6366 | 6366 | block_entity.command 4369, item_stack.identity 526, item_stack.count 526, block_entity.sign_text 472, item_stack.component:minecraft:written_book_content 470, item_stack.component:minecraft:custom_name 1, world.value 1, player.xp_level 1 |
| **MAJEUR** | 14141 | 14141 | block.identity 6964, block_entity.presence 5406, scoreboard.value 438, entity.identity 318, entity.health 312, entity.custom_name 272, scoreboard.presence 211, scoreboard.display_name 211, world.value 4, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 5481 | 5481 | block_entity.command_flags 4369, block_entity.sign_flags 472, entity.position 318, entity.data 318, world.value 4 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 6366 (direct)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | overworld 17 64 30 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 50 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 70 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 90 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 110 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 390 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 410 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 430 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 450 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 470 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 490 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 750 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 770 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 30 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-001","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":false}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 34 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 50 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-013","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":true}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 54 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 70 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-025","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":true}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 74 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 90 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-035","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":true}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 94 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 110 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-041","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":true}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 114 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 390 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-143","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":true}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 394 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 410 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-155","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":true}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 414 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 430 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-167","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":false}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 434 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 450 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-179","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":false}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 454 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 470 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-191","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":true}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 474 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 490 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-216","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":true}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 494 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 750 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-263","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":false}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 754 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 770 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"case":"CMD-J-275","observed":"no block entity","motif":"bloc de commande perdu","adaptation_exists":false}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 774 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 32 64 1122 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| … | 6326 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 14141 (direct)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:gold_block | overworld 23 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 45 63 413 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 45 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 67 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 89 63 433 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 89 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 111 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 111 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 133 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 133 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 155 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 155 63 753 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 155 63 773 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 177 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 177 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 199 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 199 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 221 63 73 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 221 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 221 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 236 63 933 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 243 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 243 63 753 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 265 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 265 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:dirt | overworld 522 63 934 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 663 63 753 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 663 63 773 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 663 63 793 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 663 63 813 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 663 63 853 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 753 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 773 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 793 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 813 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 853 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 873 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 707 63 753 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 707 63 773 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 707 63 793 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| … | 14101 autres (liste complète dans le JSON) | | | | |

### MINEUR — 5481 (direct)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | overworld 17 64 30 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 50 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 70 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 90 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 110 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 390 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 410 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 430 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 450 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 470 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 490 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 750 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 770 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 30 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 34 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 50 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 54 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 70 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 74 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 90 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 94 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 110 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 114 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 390 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 394 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 410 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 414 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 430 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 434 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 450 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 454 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 470 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 474 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 490 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 494 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 750 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 754 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 770 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 774 | block_entity.command_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 32 64 1122 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| … | 5441 autres (liste complète dans le JSON) | | | | |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 6366 | 6366 | block_entity.command 4369, item_stack.identity 526, item_stack.count 526, block_entity.sign_text 472, item_stack.component:minecraft:written_book_content 470, item_stack.component:minecraft:custom_name 1, world.value 1, player.xp_level 1 |
| **MAJEUR** | 20616 | 20616 | block.identity 6964, block.state 6382, block_entity.presence 5406, scoreboard.value 527, entity.identity 318, entity.health 312, entity.custom_name 272, scoreboard.presence 213, scoreboard.display_name 213, world.value 4, player.position 1, player.dimension 1, player.game_mode 1, player.health 1, player.food 1 |
| **MINEUR** | 11368 | 11368 | block_entity.data 5406, block_entity.command_flags 4369, block_entity.sign_flags 472, block_entity.sign_color 472, entity.position 318, entity.data 318, world.value 13 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

### CRITIQUE — 6366 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | overworld 17 64 30 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 50 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 70 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 90 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 110 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 390 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 410 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 430 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 450 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 470 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 490 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 750 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 770 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 30 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 34 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 50 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 54 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 70 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 74 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 90 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 94 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 110 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 114 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 390 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 394 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 410 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 414 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 430 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 434 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 450 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 454 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 470 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 474 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 490 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 494 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 750 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 754 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 770 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:command_block | overworld 20 64 774 | block_entity.command | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 32 64 1122 | block_entity.sign_text | texte de panneau, livre de pupitre ou commande | `{"observed":"no block entity"}` |
| … | 6326 autres (liste complète dans le JSON) | | | | |

### MAJEUR — 20616 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:gold_block | overworld 23 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 45 63 413 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 45 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 67 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 89 63 433 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 89 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 111 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 111 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 133 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 133 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 155 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 155 63 753 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 155 63 773 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 177 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 177 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 199 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 199 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 221 63 73 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 221 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 221 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 236 63 933 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 243 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 243 63 753 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 265 63 473 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 265 63 493 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:dirt | overworld 522 63 934 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 663 63 753 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 663 63 773 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 663 63 793 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 663 63 813 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 663 63 853 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 753 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 773 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 793 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 813 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 853 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 685 63 873 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 707 63 753 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 707 63 773 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| FAIL | block minecraft:gold_block | overworld 707 63 793 | block.identity | bloc manquant ou remplacé | `{"observed":"chunk-missing"}` |
| … | 20576 autres (liste complète dans le JSON) | | | | |

### MINEUR — 11368 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block_entity minecraft:sign | overworld 17 64 30 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 30 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 30 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel | overworld 17 64 32 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 50 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 50 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 50 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel | overworld 17 64 52 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 70 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 70 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 70 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel | overworld 17 64 72 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 90 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 90 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 90 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel | overworld 17 64 92 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 110 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 110 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 110 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel | overworld 17 64 112 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 390 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 390 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 390 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel | overworld 17 64 392 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 410 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 410 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 410 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel | overworld 17 64 412 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 430 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 430 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 430 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel | overworld 17 64 432 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 450 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 450 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 450 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel | overworld 17 64 452 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 470 | block_entity.sign_flags | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 470 | block_entity.sign_color | couleur / cire / lueur d'un panneau, réglage d'un bloc de commande | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:sign | overworld 17 64 470 | block_entity.data | données | `{"observed":"no block entity"}` |
| FAIL | block_entity minecraft:barrel | overworld 17 64 472 | block_entity.data | données | `{"observed":"no block entity"}` |
| … | 11328 autres (liste complète dans le JSON) | | | | |

