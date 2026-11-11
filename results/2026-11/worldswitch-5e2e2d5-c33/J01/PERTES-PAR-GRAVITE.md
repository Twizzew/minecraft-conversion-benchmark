# J01@2.0 — pertes classées par gravité (worldswitch-5e2e2d5-c33, J01_aller + J01_retour)

Table de gravité : `docs/reference/impact-classes.v1.json` v1.14 (elle trie, elle ne change aucun verdict ; révisée au fil du banc, après lecture de sorties : chaque révision et les sorties vues sont dans son `changelog`).

## Conversion directe

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 0 | 0 | — |
| **MAJEUR** | 0 | 0 | — |
| **MINEUR** | 0 | 0 | — |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 0 | 0 | — |

## Aller-retour

| Gravité | Pertes (FAIL + PARTIAL) | dont FAIL | Aspects |
|---|--:|--:|---|
| **CRITIQUE** | 1 | 0 | player.inventory 1 |
| **MAJEUR** | 3 | 3 | item_stack.component:minecraft:custom_model_data 2, item_stack.component:minecraft:lock 1 |
| **MINEUR** | 3040 | 0 | entity.data 1638, block_entity.data 1402 |
| **ÉTAT TEMPORAIRE** | 20 | 0 | block_entity.data 20 |
| **TECHNIQUE (invisible)** | 1865 | 0 | block_entity.data 1699, entity.data 166 |

### CRITIQUE — 1 (roundtrip)

Perte du travail ou de la progression du joueur, ou monde inutilisable : objets, inventaires, échanges de villageois, animaux apprivoisés, livres, panneaux, blocs de commande, dimension entière, monde qui ne s'ouvre pas.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | player 5bcbe855-323c-4f1e-a587-5f348834b848 | 5bcbe855-323c-4f1e-a587-5f348834b848 | player.inventory | inventaire, coffre de l'Ender, armure ou niveau du joueur | `{"matched":16,"expected":17,"wrong":[{"id":"minecraft:brown_shulker_box","expected_slot":5,"observed":"minecraft:brown_shulker_box","differs":["components.minecraft:container[1].item.count","components.minecraft:container[2].item.count","components.minecraft:c…` |

### MAJEUR — 3 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | item_stack minecraft:stick | overworld 1000 304 1430 | item_stack.component:minecraft:custom_model_data | autre propriété d'un objet | `{"observed":"[\"c\",{\"floats\":[\"l\",[[\"n\",\"0\"]]]}]","expected":"[\"c\",{\"colors\":[\"l\",[[\"n\",\"16711935\"]]],\"flags\":[\"l\",[[\"n\",\"1\"],[\"n\",\"0\"]]],\"floats\":[\"l\",[[\"n\",\"1\"],[\"n\",\"2\"]]],\"strings\":[\"l\",[[\"s\",\"mccb\"]]]}]"}` |
| FAIL | item_stack minecraft:barrel | overworld 1004 304 1434 | item_stack.component:minecraft:lock | autre propriété d'un objet | `{"observed":"absent","expected":"[\"c\",{\"components\":[\"c\",{\"minecraft:custom_name\":[\"s\",\"MCCB Key\"]}],\"items\":[\"s\",\"minecraft:tripwire_hook\"]}]"}` |
| FAIL | item_stack minecraft:stick | overworld 1004 304 1496 | item_stack.component:minecraft:custom_model_data | autre propriété d'un objet | `{"observed":"[\"c\",{\"floats\":[\"l\",[[\"n\",\"0\"]]]}]","expected":"[\"c\",{\"colors\":[\"l\",[[\"n\",\"16711935\"]]],\"flags\":[\"l\",[[\"n\",\"1\"],[\"n\",\"0\"]]],\"floats\":[\"l\",[[\"n\",\"1\"],[\"n\",\"2\"]]],\"strings\":[\"l\",[[\"s\",\"mccb\"]]]}]"}` |

### MINEUR — 3040 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:trial_spawner | overworld 1067 -19 1320 | block_entity.data | clé spawn_data | `{"differing_keys":["spawn_data"],"differing_count":1,"lost":[],"added":[],"changed":["spawn_data"],"sample":{"spawn_data":["[\"c\",{\"entity\":[\"c\",{\"IsBaby\":[\"n\",\"1\"],\"id\":[\"s\",\"minecraft:zombie\"]}]}]","[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\…` |
| PARTIAL | block_entity minecraft:trial_spawner | overworld 1072 -19 1325 | block_entity.data | clé spawn_data | `{"differing_keys":["spawn_data"],"differing_count":1,"lost":[],"added":[],"changed":["spawn_data"],"sample":{"spawn_data":["[\"c\",{\"entity\":[\"c\",{\"IsBaby\":[\"n\",\"1\"],\"id\":[\"s\",\"minecraft:zombie\"]}]}]","[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\…` |
| PARTIAL | block_entity minecraft:trial_spawner | overworld 1091 -17 1351 | block_entity.data | clé spawn_data | `{"differing_keys":["spawn_data"],"differing_count":1,"lost":[],"added":[],"changed":["spawn_data"],"sample":{"spawn_data":["[\"c\",{\"entity\":[\"c\",{\"IsBaby\":[\"n\",\"1\"],\"id\":[\"s\",\"minecraft:zombie\"]}]}]","[\"c\",{\"entity\":[\"c\",{\"id\":[\"s\",\…` |
| PARTIAL | block_entity minecraft:banner | overworld 864 76 532 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld 864 76 538 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld 868 76 528 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld 868 76 542 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld 874 76 528 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld 874 76 542 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld 878 76 532 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:banner | overworld 878 76 538 | block_entity.data | clé components | `{"differing_keys":["components"],"differing_count":1,"lost":[],"added":[],"changed":["components"],"sample":{"components":["[\"c\",{\"minecraft:item_name\":[\"c\",{\"translate\":[\"s\",\"block.minecraft.ominous_banner\"]}],\"minecraft:rarity\":[\"s\",\"uncommo…` |
| PARTIAL | block_entity minecraft:brewing_stand | overworld 1008 304 1464 | block_entity.data | clé total_brew_time | `{"differing_keys":["total_brew_time","total_fuel"],"differing_count":2,"lost":[],"added":[],"changed":["total_brew_time","total_fuel"],"sample":{"total_brew_time":["[\"n\",\"0\"]","[\"n\",\"400\"]"],"total_fuel":["[\"n\",\"0\"]","[\"n\",\"20\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1032 304 1480 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1032 304 1496 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:hanging_sign | overworld 1036 304 1480 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1040 304 1496 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:hanging_sign | overworld 1044 304 1496 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1103 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1105 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1107 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1109 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1111 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1113 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1115 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1117 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1119 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1121 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1123 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1125 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1127 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1129 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1131 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1133 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1135 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1137 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1139 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1141 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1143 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1145 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 1073 305 1147 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| … | 3000 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 20 (roundtrip)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:blast_furnace | overworld 1020 304 1460 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld 1024 304 1460 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:blast_furnace | overworld 1065 305 1508 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:furnace | overworld 1073 305 1087 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"200\"]"]}}` |
| PARTIAL | block_entity minecraft:furnace | overworld 1073 305 1089 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"200\"]"]}}` |
| PARTIAL | block_entity minecraft:furnace | overworld 1073 305 1091 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"200\"]"]}}` |
| PARTIAL | block_entity minecraft:furnace | overworld 1073 305 1093 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"200\"]"]}}` |
| PARTIAL | block_entity minecraft:furnace | overworld 1073 305 1095 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"200\"]"]}}` |
| PARTIAL | block_entity minecraft:furnace | overworld 1073 305 1097 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"200\"]"]}}` |
| PARTIAL | block_entity minecraft:furnace | overworld 1073 305 1099 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"200\"]"]}}` |
| PARTIAL | block_entity minecraft:furnace | overworld 1073 305 1101 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"200\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld 1253 305 1343 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld 1253 305 1345 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld 1253 305 1347 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld 1253 305 1349 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld 1253 305 1351 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld 1253 305 1353 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld 1253 305 1355 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld 1253 305 1357 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:blast_furnace | overworld 1253 305 1359 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |

