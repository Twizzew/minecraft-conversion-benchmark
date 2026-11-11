# Revue manuelle J04 (09/11/2026) — tranche 1 (CMD-J-001 à 062).
# Format : 'NNN': (adaptation_existe, {groupe: (verdict, motif)}) ; groupe = convertisseurs de la sortie,
# tels qu'affichés dans revue-filtree.txt. Sortie non listée : règle mécanique (voir appliquer.py).
OK, ER = 'OK', 'ERREUR'
WS = 'WS25,WS26,WSa'
TOUS = 'CH,UMT,WS25,WS26,WSa'
D = {
 '001': (False, {}),  # Glowing : aucun contour lumineux en Bedrock (pas d'effet ni de composant) — rien à adapter
 '002': (True, {WS: (OK, 'limit=1 → c=1')}),
 '003': (True, {TOUS: (OK, 'syntaxe et sens identiques en Bedrock')}),
 '004': (True, {WS: (OK, 'execute positioned as existe, c=1')}),
 '005': (True, {WS: (OK, 'execute rotated + coordonnées locales')}),
 '006': (True, {WS: (OK, 'facing <pos> existe')}),
 '007': (True, {WS: (OK, 'facing entity … eyes existe')}),
 '008': (True, {TOUS: (OK, 'align x existe, identique')}),
 '009': (True, {WS: (OK, 'particule renommée villager_happy ; nombre/étalement non exprimables en Bedrock : proche')}),
 '010': (True, {WS: (OK, 'c=1')}),
 '011': (True, {TOUS: (OK, 'identique')}),
 '012': (True, {TOUS: (OK, 'identique')}),
 '013': (True, {TOUS: (OK, 'identique')}),
 '014': (True, {TOUS: (OK, 'execute if blocks … all existe, identique')}),
 '017': (False, {}),  # execute store : absent de Bedrock
 '018': (False, {}),  # execute if slots : absent
 '019': (False, {}),  # execute if items sur un bloc : absent (hasitem = entités seulement)
 '020': (True, {TOUS: (OK, 'identique')}),
 '021': (False, {}),
 '022': (True, {WS: (OK, 'rotated + local')}),
 '023': (True, {WS: (OK, 'facing')}),
 '024': (False, {}),
 '025': (True, {TOUS: (OK, 'align xz identique')}),
 '026': (False, {}),
 '027': (True, {WS: (OK, 'c=1')}),
 '028': (True, {TOUS: (OK, 'identique')}),
 '029': (True, {TOUS: (OK, 'identique')}),
 '030': (True, {TOUS: (OK, 'identique')}),
 '031': (True, {TOUS: (OK, 'identique')}),
 '034': (False, {}),  # if slots entity armor.* : absent
 '035': (True, {TOUS: (OK, 'identique')}),
 '036': (True, {WS: (OK, 'rotated + local')}),
 '037': (True, {WS: (OK, 'facing')}),
 '038': (True, {TOUS: (OK, 'align yz identique')}),
 '039': (True, {TOUS: (OK, 'identique')}),
 '040': (True, {TOUS: (OK, 'unless blocks … masked existe, identique')}),
 '043': (True, {TOUS: (OK, 'identique')}),
 '044': (True, {WS: (OK, 'rotated + local')}),
 '045': (True, {WS: (OK, 'facing')}),
 '046': (True, {TOUS: (OK, 'align xyz identique')}),
 '047': (True, {TOUS: (OK, 'identique')}),
 '048': (True, {TOUS: (OK, 'identique')}),
 # store success : adaptation déclarée et possible (execute if entity … run scoreboard players set #success j04051 1)
 '051': (True, {WS: (ER, 'commande vidée alors qu’une adaptation existe (if entity … run scoreboard players set)')}),
 '052': (True, {TOUS: (OK, 'identique')}),
 '053': (True, {WS: (OK, 'distance=..16 → r=16, particule renommée')}),
 '054': (True, {WS: (OK, 'title JSON → titleraw rawtext, couleur §a')}),
 '055': (False, {}),  # Glowing : rien d'équivalent en Bedrock
 '056': (True, {WS: (OK, 'type + c=1')}),
 '057': (True, {WS: (OK, 'name + c=1')}),
 '058': (True, {WS: (OK, 'distance=..8 → r=8')}),
 '059': (True, {TOUS: (OK, 'boîte x/y/z/dx/dy/dz identique en Bedrock')}),
 '060': (True, {WS: (OK, 'scores + c=1')}),
 '061': (False, {}),  # équipes : absentes de Bedrock
}
