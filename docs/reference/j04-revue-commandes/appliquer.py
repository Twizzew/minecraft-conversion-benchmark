# Consolide la revue J04 : décisions manuelles (decisions_*.py) + règles mécaniques → table de référence.
#   python appliquer.py <sortie.json>
# Règles mécaniques (décision utilisateur du 09/11/2026) :
#   • bloc de commande perdu (« no block entity ») : ERREUR ;
#   • adaptation inexistante en Bedrock : bloc vidé ou commande Java recopiée = « ne casse rien » → OK ;
#   • adaptation existante : bloc vidé ou commande recopiée que Bedrock refuse (syntaxe, commande inconnue) = ERREUR ;
#   • toute autre sortie doit avoir une décision manuelle, sinon le script s'arrête.
import json, sys, glob, importlib.util, collections
ici = sys.path[0]
D = {}
SUPPL = {}  # décisions de sorties ajoutées après coup (ex. tranche 9 : WorldSwitch c27), par cas
for f in sorted(glob.glob(f'{ici}/decisions_*.py')):
    spec = importlib.util.spec_from_file_location('d', f); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    for k, v in m.D.items():
        if isinstance(v, dict): SUPPL.setdefault(k, {}).update(v); continue
        assert k not in D, f'décision en double {k}'
        D[k] = v
cas = json.load(open(f'{ici}/cas-et-sorties.json', encoding='utf8'))
syn = {x['commande']: x for f in ('syntaxe-bds-1.26.62.1.json', 'syntaxe-bds-c27.json') for x in json.load(open(f'{ici}/{f}', encoding='utf8'))}
AB = {'worldswitch-avant-table18': 'WSa', 'worldswitch-c25': 'WS25', 'worldswitch-c26': 'WS26', 'worldswitch-c27': 'WS27', 'chunker-1.21.0': 'CH', 'je2be-8dfc4de': 'JE', 'umt-1.5.10': 'UMT'}
PERDU = {'no block entity', 'not a command block', None}
out, manque, compte = {}, [], collections.Counter()
for c in cas:
    n = c['cas'].split('-')[-1]
    if n not in D: manque.append(f"{c['cas']} : aucune décision de cas"); continue
    adapt, man = D[n]
    man = {**man, **SUPPL.get(n, {})}
    utilises = set()
    groupes = collections.defaultdict(list)
    for conv, obs in c['sorties'].items():
        for o in obs: groupes[o].append(AB[conv])
    sorties = {}
    for o, cs in groupes.items():
        label = ','.join(sorted(set(cs)))
        v = syn.get(o, {}).get('verdict')
        if o in PERDU: dec = ('ERREUR', 'bloc de commande perdu')
        elif label in man: dec = man[label]; utilises.add(label)
        # sortie c27 identique à c26 : même décision (le groupe gagne seulement « WS27 »)
        elif ','.join(x for x in label.split(',') if x != 'WS27') in man:
            l2 = ','.join(x for x in label.split(',') if x != 'WS27'); dec = man[l2]; utilises.add(l2)
        elif not adapt and (o == '' or o == c['java']): dec = ('OK', 'aucune adaptation possible en Bedrock : ' + ('bloc vidé' if o == '' else 'commande gardée telle quelle') + ', ne casse rien')
        elif adapt and o == '': dec = ('ERREUR', 'commande vidée alors qu’une adaptation Bedrock existe')
        elif adapt and o == c['java'] and v in ('SYNTAXE_REFUSEE', 'COMMANDE_INCONNUE'): dec = ('ERREUR', 'commande Java recopiée, refusée par Bedrock (' + syn[o]['reponse'][:120] + ')')
        else: manque.append(f"{c['cas']} [{label}] sans décision : «{o}»"); continue
        sorties[o if o is not None else 'no block entity'] = {'verdict': dec[0], 'motif': dec[1], 'convertisseurs': sorted(set(cs)), 'bds': v}
        for conv in set(cs): compte[(conv, dec[0])] += 1
    # une décision manuelle doit toujours servir (sinon groupe mal recopié)
    for label in man:
        if label not in utilises and not any(','.join(sorted(set(cs))) == label for cs in groupes.values()): manque.append(f"{c['cas']} : décision « {label} » ne correspond à aucune sortie")
    out[c['cas']] = {'classe': c['classe'], 'adaptation_existe': adapt, 'java': c['java'], 'attendu': c.get('attendu', ''), 'sujets': c['sujets'], 'sorties': sorties}
if manque:
    print('\n'.join(manque)); sys.exit(1)
json.dump({'schema': 'mccb.reference/j04-commandes-decisions/1', 'cas': out}, open(sys.argv[1], 'w', encoding='utf8'), ensure_ascii=False, indent=1)
for conv in ['WSa', 'WS25', 'WS26', 'WS27', 'CH', 'JE', 'UMT']: print(conv, 'OK', compte[(conv, 'OK')], 'ERREUR', compte[(conv, 'ERREUR')])
