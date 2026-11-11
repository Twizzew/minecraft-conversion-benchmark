# Revue manuelle J04 — tranche 5 (CMD-J-208 à 265).
OK, ER = 'OK', 'ERREUR'
WS = 'WS25,WS26,WSa'
TOUS = 'CH,UMT,WS25,WS26,WSa'
CU = 'CH,UMT'
D = {
 '208': (True, {WS: (OK, 'c=1')}),
 '209': (True, {WS: (OK, 'c=1')}),
 '210': (True, {WS: (OK, 'rotated + local')}),
 '211': (True, {WS: (OK, 'tp avec rotation')}),
 '212': (True, {WS: (OK, 'tp … facing @p (ancrage des yeux non exprimable) : le plus proche')}),
 '213': (False, {}),  # effet glowing absent de Bedrock
 '214': (False, {}),
 '215': (True, {WS: (OK, 'effect <cible> clear')}),
 '216': (True, {WS: (OK, 'tag add')}),
 '217': (True, {WS: (OK, 'tag remove')}),
 '218': (True, {WS: (OK, 'tag list')}),
 '219': (True, {WS: (OK, 'particule renommée (étalement/nombre non exprimables)')}),
 '220': (True, {WS: (OK, 'son Bedrock note.pling')}),
 '221': (True, {WS: (OK, 'stopsound note.pling')}),
 '222': (False, {}),
 '223': (True, {WS: (OK, 'c=1')}),
 '224': (True, {WS: (OK, 'rotated + local')}),
 '225': (True, {WS: (OK, 'tp avec rotation')}),
 '226': (True, {WS: (OK, 'effect <cible> speed 10 1 true')}),
 '227': (True, {TOUS: (OK, 'identique')}),
 # BDS : « time set noon » → 30000 (midi du jour suivant) ; « 6000 » → midi : l'heure du jour est la même.
 '228': (True, {WS: (OK, 'time set 6000 = midi'), CU: (OK, 'noon existe en Bedrock (midi)')}),
 '229': (True, {TOUS: (OK, 'identique')}),
 # Bedrock : durée de weather en ticks depuis 1.18.30 (Minecraft Wiki, Commands/weather) ; 5 s = 100 ticks.
 '230': (True, {WS: (OK, '5s → 100 ticks')}),
 '231': (True, {TOUS: (OK, 'identique')}),
 '232': (True, {WS: (OK, 'advance_time → dodaylightcycle')}),
 '233': (True, {TOUS: (OK, 'identique')}),
 '234': (True, {TOUS: (OK, 'identique')}), '235': (True, {TOUS: (OK, 'identique')}), '236': (True, {TOUS: (OK, 'identique')}),
 '237': (True, {TOUS: (OK, 'identique')}),
 '238': (True, {WS: (OK, 'particule renommée, axes locaux gardés')}),
 '239': (True, {TOUS: (OK, 'identique')}), '240': (True, {TOUS: (OK, 'identique')}), '241': (True, {TOUS: (OK, 'identique')}),
 '242': (True, {TOUS: (OK, 'identique')}),
 '243': (True, {WS: (OK, 'particule end_rod → endrod')}),
 '244': (True, {WS: (OK, 'rotated as @p')}),
 '245': (True, {TOUS: (OK, 'identique')}), '246': (True, {TOUS: (OK, 'identique')}), '247': (True, {TOUS: (OK, 'identique')}),
 '248': (True, {TOUS: (OK, 'identique')}),
 '249': (True, {WS: (OK, 'particule renommée')}),
 '250': (True, {TOUS: (OK, 'identique')}), '251': (True, {TOUS: (OK, 'identique')}), '252': (True, {TOUS: (OK, 'identique')}),
 '253': (True, {WS: (OK, 'execute in nether')}),
 '254': (True, {WS: (OK, 'execute in the_end')}),
 '255': (True, {WS: (OK, 'summon piglin dans le Nether (tag/persistance non exprimables)')}),
 '256': (True, {WS: (OK, 'execute in the_end … if block')}),
 '257': (True, {WS: (OK, 'execute in overworld')}),
 '258': (True, {WS: (OK, 'execute in nether, relatif')}),
 '259': (True, {WS: (OK, 'execute in the_end, relatif')}),
 '260': (True, {WS: (OK, 'execute in nether … if entity, r=16, c=1')}),
 '261': (True, {WS: (OK, 'summon armor_stand dans l’End (tag/NoGravity non exprimables)')}),
 '262': (True, {WS: (OK, 'execute in overworld … if block')}),
 '263': (False, {}), '264': (False, {}), '265': (False, {}),  # data : absent de Bedrock
}
