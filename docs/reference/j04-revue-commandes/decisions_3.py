# Revue manuelle J04 — tranche 3 (CMD-J-118 à 164).
OK, ER = 'OK', 'ERREUR'
WS = 'WS25,WS26,WSa'
TOUS = 'CH,UMT,WS25,WS26,WSa'
NOM = 'nom gardé (Bedrock : summon <type> <nom> <pos>) ; tags et NBT non exprimables dans summon : le plus proche'
D = {
 '118': (True, {TOUS: (OK, 'setblock … replace identique')}),
 '119': (True, {TOUS: (OK, 'setblock … destroy identique')}),
 '120': (True, {TOUS: (OK, 'setblock … keep identique')}),
 '121': (True, {TOUS: (OK, 'fill … replace identique')}),
 '122': (True, {TOUS: (OK, 'fill … replace <bloc> identique')}),
 '123': (True, {TOUS: (OK, 'fill … keep identique')}),
 '124': (True, {TOUS: (OK, 'fill … destroy identique')}),
 '125': (True, {TOUS: (OK, 'clone replace normal identique')}),
 '126': (True, {TOUS: (OK, 'clone masked normal identique')}),
 '127': (True, {WS: (OK, 'filtered normal <bloc> : ordre Bedrock (vérifié BDS en zone chargée)')}),
  # Cible J→B = 1.26.50 : les escaliers y STOCKENT minecraft:corner. BDS 1.26.62.1 (zone chargée) : « Block placed » (refusé seulement par 1.26.36.1).
 '128': (True, {WS: (OK, 'état minecraft:corner de la cible 1.26.50+ : posé et vérifié sur BDS 1.26.62.1')}),
 '129': (True, {WS: (OK, 'observer facing_direction/powered_bit : posé et vérifié (BDS, testforblock)')}),
 '130': (True, {WS: (OK, 'item replace block → replaceitem block slot.container (vérifié BDS)')}),
 '131': (True, {TOUS: (OK, 'identique')}),
 '132': (True, {TOUS: (OK, 'rotated + local identique')}),
 '133': (True, {TOUS: (OK, 'identique')}),
 '134': (True, {TOUS: (OK, 'identique')}),
 '135': (True, {TOUS: (OK, 'identique')}),
 '136': (True, {TOUS: (OK, 'identique')}),
 '137': (True, {WS: (OK, 'filtered normal <bloc>')}),
 '138': (True, {WS: (OK, 'état minecraft:corner de la cible 1.26.50+ : posé (BDS 1.26.62.1)')}),
 '139': (True, {WS: (OK, 'observer orienté ouest')}),
 '140': (True, {WS: (OK, 'replaceitem block slot.container 1 emerald 2')}),
 '141': (True, {TOUS: (OK, 'identique')}),
 '142': (True, {TOUS: (OK, 'identique')}),
 '143': (True, {WS: (OK, NOM)}),
 '144': (True, {WS: (OK, NOM)}),
 '145': (True, {WS: (OK, NOM + ' ; une créature nommée ne disparaît pas en Bedrock (persistance)')}),
 '146': (True, {WS: (OK, NOM + ' ; persistance par le nom')}),
 '147': (True, {WS: (OK, NOM + ' ; NoGravity non exprimable')}),
 '148': (True, {WS: (OK, 'oak_boat → boat (variante 0 = chêne par défaut)')}),
 '149': (True, {WS: (OK, 'identique hors tag')}),
 '150': (False, {}),  # summon minecraft:item refusé par Bedrock (vérifié BDS) : rien à adapter
 '151': (False, {}), '152': (False, {}), '153': (False, {}),  # entités d'affichage : absentes de Bedrock
 '154': (True, {WS: (OK, 'identique hors tag')}),
 '155': (True, {WS: (OK, 'identique hors tag/pickup')}),
 # falling_block non invocable en Bedrock ; poser du sable sans support le fait tomber : même effet visible.
 '156': (True, {'WS25,WS26': (OK, 'setblock sable keep : le sable tombe, effet attendu'), 'WSa': (ER, 'commande vidée alors qu’une adaptation existe (setblock de sable qui tombe)')}),
 '157': (True, {WS: (OK, NOM)}),
 '158': (True, {WS: (OK, NOM)}),
 '159': (True, {WS: (OK, NOM)}),
 '160': (True, {WS: (OK, NOM)}),
 '161': (True, {WS: (OK, NOM)}),
 '162': (True, {WS: (OK, 'oak_boat → boat')}),
 '163': (True, {WS: (OK, 'identique hors tag')}),
 '164': (False, {}),
}
