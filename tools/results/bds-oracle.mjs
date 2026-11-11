// MCCB 2026-11 — lit une entité du serveur Bedrock OFFICIEL (bedrock-server-1.26.36.1.zip, à lancer depuis le dossier qui contient ce zip).
//   node <ce fichier> behavior_packs/vanilla_1.26.20/entities/piglin.json --list | --events [n] | --values <regex> | --comp | <groupe>...
import { execFileSync } from 'node:child_process';
const [file, ...groups] = process.argv.slice(2);
const raw = execFileSync('unzip', ['-p', 'bedrock-server-1.26.36.1.zip', file], { maxBuffer: 1e8 }).toString()
  .replace(/("(?:[^"\\]|\\.)*")|\/\/[^\n]*/g, (m, s) => s || '');
const j = JSON.parse(raw); const e = j['minecraft:entity'];
if (groups[0] === '--events') { for (const [k, v] of Object.entries(e.events)) console.log(k, JSON.stringify(v).slice(0, +(groups[1] || 600))); }
else if (groups[0] === '--list') console.log(Object.keys(e.component_groups).join(' '));
else if (groups[0] === '--values') { for (const [k, v] of Object.entries(e.component_groups)) if (new RegExp(groups[1] || '.').test(k)) console.log(k, Object.entries(v).map(([n, x]) => n.replace('minecraft:', '') + '=' + JSON.stringify(x?.value ?? x).slice(0, 40)).join(',')); }
else if (groups[0] === '--comp') console.log(JSON.stringify(e.components).slice(0, 6000));
else for (const g of groups) console.log(g, JSON.stringify(e.component_groups[g]).slice(0, 1500));
