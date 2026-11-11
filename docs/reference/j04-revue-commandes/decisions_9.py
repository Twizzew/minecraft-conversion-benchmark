# Revue manuelle J04 — tranche 9 (10/11/2026) : sorties NOUVELLES de WorldSwitch c27 (commandes corrigées).
# Toutes passées au serveur Bedrock 1.26.62.1 (syntaxe-bds-c27.json) : acceptées ; « "#case" » lu comme le
# faux joueur #case (« no tracked player '#case' »), comme prouvé en zone chargée (bloc posé, testforblock).
OK = 'OK'
DIESE = 'nom « #… » cité dans execute if/unless score : accepté par Bedrock 1.26.62.1, même faux joueur'
D = {}
for n in ['015', '016', '032', '033', '041', '042', '049', '050', '111', '112', '113', '114', '297', '299', '300', '303',
          '342', '343', '355', '357', '362', '363', '367', '371', '379', '391', '396', '397']:
    D[n] = {'WS27': (OK, DIESE)}
D['051'] = {'WS27': (OK, 'store success → execute if entity … run scoreboard players set #success j04051 1 : le score passe à 1 quand la cible existe (remise à 0 non exprimable) — adaptation déclarée')}
D['203'] = {'WS27': (OK, 'clé Bedrock commands.give.success (en_US.lang 1.26.62.1 : « Gave %1$s * %2$d to %3$s »), arguments remis dans l’ordre objet, nombre, joueur')}
D['206'] = {'WS27': (OK, 'clé Bedrock tile.stone.stone.name (« Stone »), couleur grise gardée')}
