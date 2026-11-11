# Revue manuelle J04 — tranche 4 (CMD-J-165 à 207).
OK, ER = 'OK', 'ERREUR'
WS = 'WS25,WS26,WSa'
TOUS = 'CH,UMT,WS25,WS26,WSa'
CU = 'CH,UMT'
LITTERAL = 'texte JSON Java recopié dans title : Bedrock l’affiche tel quel (« {text:…} »), erreur introduite'
D = {
 '165': (False, {}), '166': (False, {}), '167': (False, {}),
 '168': (True, {WS: (OK, 'identique hors tag')}),
 '169': (True, {WS: (OK, 'identique hors tag/pickup')}),
 '170': (True, {'WS25,WS26': (OK, 'setblock sable keep : le sable tombe'), 'WSa': (ER, 'commande vidée alors qu’une adaptation existe')}),
 '171': (True, {TOUS: (OK, 'identique')}),
 '172': (True, {WS: (OK, 'nom d’objet non exprimable dans give Bedrock : papier donné, le plus proche')}),
 '173': (True, {WS: (OK, 'enchantement non exprimable dans give Bedrock : épée donnée, le plus proche')}),
 '174': (True, {WS: (OK, 'potion valeur 5 = vision nocturne (Bedrock)')}),
 # Bedrock : clear <joueur> <objet> <valeur de donnée> <nombre max> — « 1 » seul est lu comme valeur de donnée.
 '175': (True, {WS: (OK, 'clear … -1 1 : toute valeur, au plus 1'), CU: (ER, '« 1 » lu comme valeur de donnée en Bedrock : aucun bâton (donnée 0) retiré, erreur introduite')}),
 '176': (True, {WS: (OK, 'replaceitem entity slot.weapon.mainhand')}),
 '177': (True, {WS: (OK, 'replaceitem entity slot.weapon.offhand')}),
 '178': (True, {WS: (OK, 'replaceitem entity slot.armor.head')}),
 '179': (False, {}),  # item modify : aucune commande Bedrock ne modifie une pile en place
 '180': (False, {}),  # copie d'emplacement à emplacement : absente de Bedrock
 '181': (False, {}),
 '182': (False, {}),  # livre écrit avec contenu : give Bedrock ne porte pas le contenu
 '183': (True, {TOUS: (OK, 'identique')}),
 '184': (False, {}),  # item fill sur tous les emplacements : pas de commande unique Bedrock
 '185': (True, {WS: (OK, 'épée sans enchantement, le plus proche')}),
 '186': (True, {WS: (OK, 'potion valeur 31 = force (Bedrock)')}),
 '187': (True, {WS: (OK, 'clear … -1 2'), CU: (ER, '« 2 » lu comme valeur de donnée en Bedrock : aucun papier retiré, erreur introduite')}),
 '188': (True, {WS: (OK, 'replaceitem mainhand')}),
 '189': (True, {WS: (OK, 'replaceitem offhand')}),
 '190': (True, {WS: (OK, 'replaceitem armor.head')}),
 '191': (True, {WS: (OK, 'replaceitem block slot.container 1 … 2 0')}),
 '192': (False, {}),
 '193': (False, {}),  # item override sur une plage d'emplacements : pas de commande unique Bedrock
 '194': (False, {}),
 '195': (True, {WS: (OK, 'tellraw rawtext, couleur §a')}),
 '196': (True, {WS: (OK, 'or + gras (§6§l) ; souligné absent de Bedrock')}),
 '197': (True, {WS: (OK, 'rawtext selector, c=1')}),
 '198': (True, {WS: (OK, 'rawtext score')}),
 '199': (True, {WS: (OK, 'composants imbriqués à plat avec codes couleur')}),
 '200': (True, {WS: (OK, 'title texte simple §a'), CU: (ER, LITTERAL)}),
 '201': (True, {WS: (OK, 'subtitle §e'), CU: (ER, LITTERAL)}),
 '202': (True, {WS: (OK, 'actionbar §b'), CU: (ER, LITTERAL)}),
 # Fichier de langue Bedrock (BDS 1.26.36.1 vanilla en_US.lang) : « commands.give.success » existe, pas « .single ».
 '203': (True, {WS: (ER, 'clé Java « commands.give.success.single » absente de Bedrock : la clé brute s’affiche (non adaptée, Bedrock : commands.give.success)')}),
 '204': (True, {WS: (OK, 'gris, gras, italique bleu (§7, §l, §9§o)')}),
 '205': (True, {WS: (OK, 'titleraw rawtext + selector'), CU: (ER, LITTERAL)}),
 # en_US.lang Bedrock : « tile.stone.stone.name=Stone » ; « block.minecraft.stone » n'existe pas.
 '206': (True, {WS: (ER, 'clé Java « block.minecraft.stone » absente de Bedrock : la clé brute s’affiche (Bedrock : tile.stone.stone.name)')}),
 '207': (False, {}),
}
