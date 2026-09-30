// node reports/root-causes/j04-replay-ws.mjs <worldswitch checkout at fd9b735> <rows.json>  — replays WorldSwitch's own command-block path on the J04 FAIL commands
import fs from 'node:fs';
const ws = process.argv[2];
const { convertCommandJB, degradeCommandJBWithoutData } = await import(ws + '/lib/commands.js');
const { protectContainerCommand, withCommandIssueCollector } = await import(ws + '/lib/command-issues.js');
const rows = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));
for (const r of rows) {
  const issues = [];
  let g; withCommandIssueCollector(issues, {}, () => { g = protectContainerCommand(r.cmd, convertCommandJB(r.cmd), {}, degradeCommandJBWithoutData); });
  r.ws_out = g.command; r.ws_reason = issues.map((i) => i.reason).join(' | ');
  console.log(`${r.case} ${r.cls} → "${g.command}"  ::  ${r.ws_reason}`);
}
fs.writeFileSync(process.argv[3].replace('.json', '-ws.json'), JSON.stringify(rows, null, 1));
