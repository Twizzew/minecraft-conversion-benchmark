# Revue manuelle J04 — tranche 6 (CMD-J-266 à 313).
OK, ER = 'OK', 'ERREUR'
WS = 'WS25,WS26,WSa'
TOUS = 'CH,UMT,WS25,WS26,WSa'
D = {
 '266': (False, {}),
 # stockage de commandes, data, compute : absents de Bedrock
 '267': (False, {}), '268': (False, {}), '269': (False, {}), '270': (False, {}), '271': (False, {}), '272': (False, {}),
 '273': (False, {}), '274': (False, {}), '275': (False, {}), '276': (False, {}), '277': (False, {}), '278': (False, {}),
 '279': (False, {}), '280': (False, {}), '281': (False, {}), '282': (False, {}), '283': (False, {}), '284': (False, {}),
 '285': (True, {TOUS: (OK, 'identique')}), '286': (True, {TOUS: (OK, 'identique')}), '287': (True, {TOUS: (OK, 'identique')}),
 '288': (True, {TOUS: (OK, 'identique')}), '289': (True, {TOUS: (OK, 'identique')}),
 '290': (True, {WS: (OK, 'summon pig (tag non exprimable)')}),
 '291': (True, {TOUS: (OK, 'identique')}),
 '292': (True, {WS: (OK, 'tellraw rawtext §b')}),
 '293': (True, {TOUS: (OK, 'identique')}), '294': (True, {TOUS: (OK, 'identique')}), '295': (True, {TOUS: (OK, 'identique')}),
 '296': (True, {WS: (OK, 'particule renommée')}),
 '298': (False, {}),  # glowing
 # BDS 1.26.36.1 : « execute if score #loop … » → Syntax error: Unexpected "#" — commande refusée.
 '300': (True, {WS: (ER, 'execute if score avec un nom « #loop » non entre guillemets : refusé par Bedrock (erreur introduite)')}),
 '301': (False, {}),  # stockage de commandes : aucun équivalent générique
 '302': (True, {WS: (OK, 'particule flame → basic_flame_particle')}),
 '304': (False, {}), '305': (False, {}), '306': (False, {}), '307': (False, {}), '308': (False, {}), '309': (False, {}), '310': (False, {}),
 '311': (False, {}), '312': (False, {}), '313': (False, {}),
}
