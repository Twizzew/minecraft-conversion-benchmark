# J05@1.0 — pertes classées par gravité (worldswitch-5e2e2d5-c33, J05_aller + J05_retour)

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
| **CRITIQUE** | 0 | 0 | — |
| **MAJEUR** | 0 | 0 | — |
| **MINEUR** | 109 | 0 | entity.data 75, block_entity.data 34 |
| **ÉTAT TEMPORAIRE** | 4 | 0 | block_entity.data 4 |
| **TECHNIQUE (invisible)** | 17 | 0 | entity.data 16, entity.equipment 1 |

### MINEUR — 109 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:sign | overworld -19 -60 45 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -17 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -17 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -17 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -17 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -17 -60 71 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -9 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:blast_furnace | overworld -9 -60 20 | block_entity.data | clé speed_multiplier | `{"differing_keys":["cooking_total_time","lit_total_time","speed_multiplier"],"differing_count":3,"lost":[],"added":[],"changed":["cooking_total_time","lit_total_time","speed_multiplier"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"100\"]"],"lit…` |
| PARTIAL | block_entity minecraft:sign | overworld -9 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -9 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -9 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -9 -60 71 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -1 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld -1 -60 20 | block_entity.data | clé speed_multiplier | `{"differing_keys":["cooking_total_time","lit_total_time","speed_multiplier"],"differing_count":3,"lost":[],"added":[],"changed":["cooking_total_time","lit_total_time","speed_multiplier"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"100\"]"],"lit…` |
| PARTIAL | block_entity minecraft:sign | overworld -1 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -1 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld -1 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 3 -60 12 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 11 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:smoker | overworld 11 -60 20 | block_entity.data | clé speed_multiplier | `{"differing_keys":["cooking_total_time","lit_total_time","speed_multiplier"],"differing_count":3,"lost":[],"added":[],"changed":["cooking_total_time","lit_total_time","speed_multiplier"],"sample":{"cooking_total_time":["[\"n\",\"200\"]","[\"n\",\"100\"]"],"lit…` |
| PARTIAL | block_entity minecraft:sign | overworld 11 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 11 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 11 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 19 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 19 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 19 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 19 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 27 -60 17 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 27 -60 27 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 27 -60 36 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 27 -60 58 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 27 -60 71 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 29 -60 45 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 49 -60 13 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | entity minecraft:chicken | overworld 8.8 -60 47.9 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","IsChickenJockey","LeftHanded","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","F…` |
| PARTIAL | entity minecraft:chicken | overworld 10 -60 49.1 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","IsChickenJockey","LeftHanded","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","F…` |
| PARTIAL | entity minecraft:chicken | overworld 11.2 -60 46.8 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","IsChickenJockey","LeftHanded","attributes"],"differing_count":12,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","F…` |
| PARTIAL | entity minecraft:cow | overworld 13.8 -60 49.8 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","attributes"],"differing_count":11,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlying","Forced…` |
| PARTIAL | entity minecraft:cow | overworld 22.5 -60 -67.5 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","attributes"],"differing_count":11,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlying","Forced…` |
| PARTIAL | entity minecraft:cow | overworld 73.7 -60 -40.4 | entity.data | clé attributes | `{"differing_keys":["AbsorptionAmount","Age","AgeLocked","ArmorItems","CanPickUpLoot","FallFlying","ForcedAge","HandItems","InLove","LeftHanded","attributes"],"differing_count":11,"lost":["AbsorptionAmount","Age","AgeLocked","CanPickUpLoot","FallFlying","Forced…` |
| … | 69 autres (liste complète dans le JSON) | | | | |

### ÉTAT TEMPORAIRE — 4 (roundtrip)

Compteur ou état en cours qui se termine de lui-même (mèche, cuisson, temps de recharge, âge) : perdu, l'action reprend ou se termine plus tôt ou plus tard.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:furnace | overworld -17 -60 20 | block_entity.data | clé lit_total_time | `{"differing_keys":["lit_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["lit_total_time"],"sample":{"lit_total_time":["[\"n\",\"1600\"]","[\"n\",\"620\"]"]}}` |
| PARTIAL | block_entity minecraft:furnace | overworld -9 -60 75 | block_entity.data | clé lit_total_time | `{"differing_keys":["lit_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["lit_total_time"],"sample":{"lit_total_time":["[\"n\",\"1600\"]","[\"n\",\"10\"]"]}}` |
| PARTIAL | block_entity minecraft:blast_furnace | overworld 57 -60 21 | block_entity.data | clé cooking_total_time | `{"differing_keys":["cooking_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["cooking_total_time"],"sample":{"cooking_total_time":["[\"n\",\"0\"]","[\"n\",\"100\"]"]}}` |
| PARTIAL | block_entity minecraft:furnace | overworld -1 -59 61 | block_entity.data | clé lit_total_time | `{"differing_keys":["lit_total_time"],"differing_count":1,"lost":[],"added":[],"changed":["lit_total_time"],"sample":{"lit_total_time":["[\"n\",\"1600\"]","[\"n\",\"620\"]"]}}` |

