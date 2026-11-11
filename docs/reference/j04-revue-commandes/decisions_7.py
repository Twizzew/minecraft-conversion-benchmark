# Revue manuelle J04 — tranche 7 (CMD-J-314 à 400).
OK, ER = 'OK', 'ERREUR'
WS = 'WS25,WS26,WSa'
TOUS = 'CH,UMT,WS25,WS26,WSa'
CU = 'CH,UMT'
DIESE = 'execute if score avec un nom « #… » non entre guillemets : refusé par Bedrock (BDS « Unexpected "#" »), erreur introduite'
D = {
 '314': (False, {}), '315': (False, {}), '316': (False, {}), '317': (False, {}), '318': (False, {}), '319': (False, {}), '320': (False, {}),
 '321': (False, {}), '322': (False, {}), '323': (False, {}),
 '324': (True, {WS: (OK, 'ride … mount → ride … start_riding')}),
 '325': (False, {}), '326': (False, {}),
 # Déclarés « sans équivalent », mais Bedrock a tickingarea : adaptation fonctionnelle (chunk chargé / retiré).
 '327': (True, {WS: (OK, 'forceload add → tickingarea add sur le chunk (vérifié BDS : zone ajoutée)')}),
 '328': (True, {WS: (OK, 'forceload remove → tickingarea remove à la position')}),
 '329': (False, {}),  # pas de commande worldborder en Bedrock
 '330': (False, {}),  # pas de commande seed en Bedrock (BDS : inconnue)
 '331': (True, {TOUS: (OK, 'locate biome identique (BDS : résultat trouvé)')}),
 # Bedrock a « recipe » ; identifiant de recette de l'établi : minecraft:WorkBench_recipeId (BDS vanilla/recipes/crafting_table.json).
 '332': (True, {WS: (OK, 'recette Bedrock minecraft:WorkBench_recipeId'), CU: (ER, '« minecraft:crafting_table » n’est pas un identifiant de recette Bedrock : rien n’est donné')}),
 '333': (True, {TOUS: (OK, 'recette Bedrock minecraft:stick identique')}),
 '334': (False, {}), '335': (False, {}),
 '336': (True, {WS: (OK, 'contexte composé conservé, c=1')}),
 '337': (False, {}),  # glowing
 '338': (True, {WS: (OK, 'r=32, particule renommée')}),
 '339': (True, {WS: (OK, 'rotated + local')}),
 '340': (True, {WS: (OK, 'facing entity … eyes + score')}),
 '341': (True, {TOUS: (OK, 'identique')}),
 '344': (False, {}),  # glowing
 '345': (False, {}), '346': (False, {}), '347': (False, {}),
 '348': (True, {WS: (OK, 'summon sans tag (non exprimable) : le plus proche')}),
 '349': (True, {WS: (OK, 'summon sans tag : le plus proche')}),
 '350': (True, {WS: (OK, 'identique, c=1')}),
 '351': (True, {WS: (OK, 'c=1')}),
 '352': (True, {WS: (OK, 'effect <cible> speed')}),
 '353': (True, {WS: (OK, 'c=1')}),
 '354': (True, {WS: (OK, 'contexte conservé, particule renommée')}),
 '355': (True, {WS: (ER, DIESE)}),
 '356': (True, {WS: (OK, 'title actionbar §a')}),
 '357': (True, {WS: (ER, DIESE)}),
 '358': (True, {WS: (OK, 'clear … -1 1')}),
 '359': (True, {WS: (OK, 'replaceitem block')}),
 '360': (False, {}), '361': (False, {}),
 '362': (True, {WS: (ER, DIESE)}),
 '363': (True, {WS: (ER, DIESE)}),
 '364': (False, {}), '365': (False, {}), '366': (False, {}),
 '367': (True, {WS: (ER, DIESE)}),
 '368': (True, {WS: (OK, 'y_rotation → rym/ry')}),
 '369': (True, {WS: (OK, 'rm/r + scores')}),
 '370': (False, {}),  # glowing
 '372': (True, {WS: (OK, 'contexte à six étapes conservé')}),
 '373': (True, {WS: (OK, 'c=1')}),
 '374': (False, {}),
 '375': (True, {WS: (OK, 'r=32, particule renommée')}),
 '376': (True, {WS: (OK, 'rotated + local')}),
 '377': (True, {WS: (OK, 'facing + score')}),
 '378': (True, {TOUS: (OK, 'identique')}),
 '380': (False, {}), '381': (False, {}), '382': (False, {}), '383': (False, {}),
 '384': (False, {}),  # item fill : pas de commande unique Bedrock
 '385': (False, {}),  # swing : absent de Bedrock
 '386': (True, {WS: (OK, 'summon sans tag : le plus proche')}),
 '387': (False, {}),
 '388': (True, {WS: (OK, 'effect <cible> speed')}),
 '389': (True, {WS: (OK, 'c=1')}),
 '390': (True, {WS: (OK, 'contexte conservé')}),
 '391': (True, {WS: (ER, DIESE)}),
 '392': (True, {WS: (OK, 'clear … -1 2')}),
 '393': (True, {WS: (OK, 'replaceitem block')}),
 '394': (False, {}), '395': (False, {}),
 '396': (True, {WS: (ER, DIESE)}),
 '397': (True, {WS: (ER, DIESE)}),
 '398': (True, {WS: (OK, 'rym/ry')}),
 '399': (True, {WS: (OK, 'rm/r + scores')}),
 '400': (True, {WS: (OK, 'contexte à six étapes conservé')}),
}
