# Revue manuelle J04 — tranche 8 : 19 cas dont toutes les sorties sont la commande Java recopiée.
# Tous : « execute if|unless score #nom … ». Prouvé sur BDS 1.26.36.1 (09/11/2026, zone chargée) :
#   execute if score #case … → « Syntax error: Unexpected "#" » ;
#   execute if score "#case" … → bloc posé, testforblock confirme (même joueur fictif que « scoreboard players set #case »).
# Une adaptation existe (nom entre guillemets) : recopier la forme refusée est une ERREUR (règle mécanique).
D = {n: (True, {}) for n in ['015', '016', '032', '033', '041', '042', '049', '050', '111', '112', '113', '114',
                              '297', '299', '303', '342', '343', '371', '379']}
