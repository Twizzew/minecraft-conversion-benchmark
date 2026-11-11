# B01@1.0 — pertes classées par gravité (worldswitch-5e2e2d5, B01_aller + B01_retour)

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
| **MAJEUR** | 6 | 3 | entity.data 3, block.waterlog 2, block.state 1 |
| **MINEUR** | 12 | 0 | entity.data 8, block_entity.data 4 |
| **ÉTAT TEMPORAIRE** | 0 | 0 | — |
| **TECHNIQUE (invisible)** | 4 | 0 | block_entity.data 4 |

### MAJEUR — 6 (roundtrip)

Différence visible dans le monde ou dans le jeu : bloc manquant ou remplacé, état de bloc (orientation, forme), créature absente, équipement, nom, santé, règles du monde, structures (apparition des créatures).

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| FAIL | block minecraft:cauldron | overworld -12 64 -11 | block.state | état du bloc (orientation, forme, âge…) | `{"observed":{"fill_level":"3 -> 4"}}` |
| FAIL | block minecraft:wooden_door | overworld -3 64 -58 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| FAIL | block minecraft:wooden_door | overworld -3 65 -58 | block.waterlog | eau dans le bloc | `{"observed":null}` |
| PARTIAL | entity minecraft:trader_llama | overworld 34.4 -60 -53.4 | entity.data | clé definitions | `{"differing_keys":["Attributes","BreedCooldown","Color","Color2","Dead","Health","InLove","IsOutOfControl","IsPregnant","LeasherID","LoveCause","MarkVariant","NaturalSpawn","ShowBottom","SkinID","StrengthMax","Tags","TradeExperience","TradeTier","boundX","boun…` |
| PARTIAL | entity minecraft:trader_llama | overworld 35.4 -60 -51.2 | entity.data | clé definitions | `{"differing_keys":["Attributes","BreedCooldown","Color","Color2","Dead","Health","InLove","IsOutOfControl","IsPregnant","LeasherID","LoveCause","MarkVariant","NaturalSpawn","ShowBottom","SkinID","StrengthMax","Tags","TradeExperience","TradeTier","boundX","boun…` |
| PARTIAL | entity minecraft:wandering_trader | overworld 36.5 -60 -52.3 | entity.data | clé definitions | `{"differing_keys":["Attributes","Color","Color2","Dead","HasExecuted","Health","HighTierCuredDiscount","HomeDimensionId","HomePos","IsOutOfControl","IsPregnant","LowTierCuredDiscount","MarkVariant","NaturalSpawn","NearbyCuredDiscount","NearbyCuredDiscountTimeS…` |

### MINEUR — 12 (roundtrip)

Détail visible mais secondaire : position d'une créature à quelques blocs près, couleur ou cire d'un panneau, réglages d'un bloc de commande, données internes sans effet de jeu évident.

| Statut | Sujet | Où | Aspect | Pourquoi ce classement | Preuve |
|---|---|---|---|---|---|
| PARTIAL | block_entity Lectern | overworld -56 64 6 | block_entity.data | clé hasBook | `{"differing_keys":["hasBook","page","totalPages"],"differing_count":3,"lost":[],"added":["hasBook","page","totalPages"],"changed":[],"sample":{"hasBook":[null,"[\"n\",\"0\"]"],"page":[null,"[\"n\",\"0\"]"],"totalPages":[null,"[\"n\",\"1\"]"]}}` |
| PARTIAL | block_entity CommandBlock | overworld -36 64 6 | block_entity.data | clé ExecuteOnFirstTick | `{"differing_keys":["ExecuteOnFirstTick","LPRedstoneMode","Version"],"differing_count":3,"lost":[],"added":[],"changed":["ExecuteOnFirstTick","LPRedstoneMode","Version"],"sample":{"ExecuteOnFirstTick":["[\"n\",\"0\"]","[\"n\",\"1\"]"],"LPRedstoneMode":["[\"n\",…` |
| PARTIAL | block_entity BrewingStand | overworld -28 64 0 | block_entity.data | clé FuelTotal | `{"differing_keys":["FuelTotal"],"differing_count":1,"lost":[],"added":[],"changed":["FuelTotal"],"sample":{"FuelTotal":["[\"n\",\"0\"]","[\"n\",\"20\"]"]}}` |
| PARTIAL | block_entity Lectern | overworld -4 64 40 | block_entity.data | clé book | `{"differing_keys":["book"],"differing_count":1,"lost":[],"added":[],"changed":["book"],"sample":{"book":["[\"c\",{\"Count\":[\"n\",\"1\"],\"Damage\":[\"n\",\"0\"],\"Name\":[\"s\",\"minecraft:written_book\"],\"WasPickedUp\":[\"n\",\"0\"],\"tag\":[\"c\",{\"autho…` |
| PARTIAL | entity minecraft:bee | overworld -60.7 57.4 19.2 | entity.data | clé expDropEnabled | `{"differing_keys":["Attributes","BreedCooldown","Color","Color2","Dead","HasExecuted","HasNectar","HasStung","Health","HivePos","InLove","IsOutOfControl","IsPregnant","LoveCause","MarkVariant","NaturalSpawn","Persistent","ShowBottom","SkinID","Strength","Stren…` |
| PARTIAL | entity minecraft:bee | overworld -59.7 61.3 16.7 | entity.data | clé canPickupItems | `{"differing_keys":["Attributes","Color","Color2","Dead","GrowthPaused","HasExecuted","HasNectar","HasStung","Health","HivePos","IsOutOfControl","IsPregnant","MarkVariant","NaturalSpawn","Persistent","ShowBottom","SkinID","Strength","StrengthMax","Tags","TradeE…` |
| PARTIAL | entity minecraft:bee | overworld -17.5 52.8 16.9 | entity.data | clé expDropEnabled | `{"differing_keys":["Attributes","BreedCooldown","Color","Color2","Dead","HasExecuted","HasNectar","HasStung","Health","HivePos","InLove","IsOutOfControl","IsPregnant","LoveCause","MarkVariant","NaturalSpawn","Persistent","ShowBottom","SkinID","Strength","Stren…` |
| PARTIAL | entity minecraft:bee | overworld -13.6 65.1 8.4 | entity.data | clé canPickupItems | `{"differing_keys":["Attributes","BreedCooldown","Color","Color2","Dead","HasExecuted","HasNectar","HasStung","Health","HivePos","InLove","IsOutOfControl","IsPregnant","LoveCause","MarkVariant","NaturalSpawn","Persistent","ShowBottom","SkinID","Strength","Stren…` |
| PARTIAL | entity minecraft:bee | overworld -13.5 62.6 2.6 | entity.data | clé expDropEnabled | `{"differing_keys":["Attributes","BreedCooldown","Color","Color2","Dead","HasExecuted","HasNectar","HasStung","Health","HivePos","InLove","IsOutOfControl","IsPregnant","LoveCause","MarkVariant","NaturalSpawn","Persistent","ShowBottom","SkinID","Strength","Stren…` |
| PARTIAL | entity minecraft:bee | overworld -13.2 67.3 14.3 | entity.data | clé canPickupItems | `{"differing_keys":["Attributes","BreedCooldown","Color","Color2","Dead","HasExecuted","HasNectar","HasStung","Health","HivePos","InLove","IsOutOfControl","IsPregnant","LoveCause","MarkVariant","NaturalSpawn","Persistent","ShowBottom","SkinID","Strength","Stren…` |
| PARTIAL | entity minecraft:bee | overworld -12.8 69.8 16.2 | entity.data | clé expDropEnabled | `{"differing_keys":["Attributes","BreedCooldown","Color","Color2","Dead","HasExecuted","HasNectar","HasStung","Health","HivePos","InLove","IsOutOfControl","IsPregnant","LoveCause","MarkVariant","NaturalSpawn","Persistent","ShowBottom","SkinID","Strength","Stren…` |
| PARTIAL | entity minecraft:bee | overworld -8.9 68.7 5.6 | entity.data | clé expDropEnabled | `{"differing_keys":["Attributes","BreedCooldown","Color","Color2","Dead","HasExecuted","HasNectar","HasStung","Health","HivePos","InLove","IsOutOfControl","IsPregnant","LoveCause","MarkVariant","NaturalSpawn","Persistent","ShowBottom","SkinID","Strength","Stren…` |

