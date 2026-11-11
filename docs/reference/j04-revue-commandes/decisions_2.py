# Revue manuelle J04 — tranche 2 (CMD-J-062 à 117).
OK, ER = 'OK', 'ERREUR'
WS = 'WS25,WS26,WSa'
TOUS = 'CH,UMT,WS25,WS26,WSa'
D = {
 '062': (True, {WS: (OK, 'gamemode=creative → m=creative, distance → r')}),
 '063': (True, {WS: (OK, 'level=7.. → lm=7')}),
 '064': (False, {}),  # advancements : absents de Bedrock
 '065': (False, {}),  # Glowing : rien d'équivalent
 '066': (False, {}),  # filtre nbt : absent
 '067': (True, {WS: (OK, 'x_rotation → rxm/rx, y_rotation → rym/ry')}),
 '068': (True, {WS: (OK, 'type=! conservé, c=1')}),
 '069': (True, {WS: (OK, 'tag=! conservé, c=1')}),
 '070': (True, {WS: (OK, 'filtres conservés, distance → r, sort=nearest+limit → c=1 (le plus proche)')}),
 '071': (True, {WS: (OK, 'distance=1..10 → rm=1,r=10')}),
 '072': (True, {TOUS: (OK, 'identique')}),
 '073': (True, {WS: (OK, 'distance → rm/r, particule renommée (nombre non exprimable)')}),
 '074': (False, {}),  # Silent : aucune commande Bedrock ne rend une entité silencieuse
 '075': (False, {}),
 '076': (True, {WS: (OK, 'c=1')}),
 '077': (True, {WS: (OK, 'c=1')}),
 '078': (True, {WS: (OK, 'c=1')}),
 '079': (True, {WS: (OK, 'r=8')}),
 '080': (True, {TOUS: (OK, 'boîte identique')}),
 '081': (True, {WS: (OK, 'c=1')}),
 '082': (False, {}),
 '083': (True, {WS: (OK, 'm=creative')}),
 '084': (True, {WS: (OK, 'lm=7')}),
 '085': (False, {}),
 '086': (False, {}),  # Silent
 '087': (False, {}),
 '088': (True, {WS: (OK, 'rotations')}),
 '089': (True, {WS: (OK, 'type=!')}),
 '090': (True, {WS: (OK, 'tag=!')}),
 '091': (True, {WS: (OK, 'multi-filtres')}),
 '092': (True, {WS: (OK, 'rm/r')}),
 '093': (True, {TOUS: (OK, 'identique')}),
 '094': (True, {TOUS: (OK, 'identique')}),
 '095': (True, {WS: (OK, 'critère trigger absent de Bedrock : objectif dummy, le plus proche')}),
 '096': (False, {}),  # critère de statistique Java : Bedrock n'a que dummy
 '097': (True, {TOUS: (OK, 'identique')}),
 '098': (True, {TOUS: (OK, 'identique')}),
 '099': (True, {TOUS: (OK, 'identique')}),
 '100': (True, {TOUS: (OK, 'identique')}),
 '101': (True, {WS: (OK, 'get absent de Bedrock : test * * renvoie le score, le plus proche')}),
 '102': (True, {TOUS: (OK, 'opération identique')}),
 '103': (True, {TOUS: (OK, 'opération identique')}),
 '104': (True, {TOUS: (OK, 'opération identique')}),
 '105': (True, {TOUS: (OK, 'opération identique')}),
 '106': (True, {TOUS: (OK, 'opération identique')}),
 '107': (True, {TOUS: (OK, 'opération identique')}),
 '108': (True, {TOUS: (OK, 'opération identique')}),
 '109': (True, {TOUS: (OK, 'opération identique')}),
 '110': (True, {TOUS: (OK, 'opération identique')}),
 '115': (True, {TOUS: (OK, 'identique')}),
 '116': (True, {TOUS: (OK, 'identique')}),
 '117': (True, {TOUS: (OK, 'identique')}),
}
