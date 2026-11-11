# J04@2.0 — pertes classées par gravité (worldswitch-5e2e2d5-c33, J04_aller + J04_retour)

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
| **MINEUR** | 537 | 0 | block_entity.data 527, entity.data 10 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 6 | 0 | entity.data 6 |

### MINEUR — 537 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity minecraft:sign | overworld 17 64 30 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 50 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 70 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 90 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 110 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 390 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 410 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 430 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 450 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 470 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 490 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 750 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 17 64 770 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 32 64 1122 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 32 64 1146 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 32 64 1170 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 32 64 1194 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 32 64 1218 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 30 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 50 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 70 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 110 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 390 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 410 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 430 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 450 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 470 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 490 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 510 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 750 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 39 64 770 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 53 64 930 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 56 64 1122 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 56 64 1146 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 56 64 1170 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 56 64 1182 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 56 64 1194 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 56 64 1218 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 61 64 30 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity minecraft:sign | overworld 61 64 50 | block_entity.data | clé allow_op_features | `{"differing_keys":["allow_op_features"],"differing_count":1,"lost":[],"added":["allow_op_features"],"changed":[],"sample":{"allow_op_features":[null,"[\"n\",\"1\"]"]}}` |
| … | 497 autres (liste complète dans le JSON) | | | | |

