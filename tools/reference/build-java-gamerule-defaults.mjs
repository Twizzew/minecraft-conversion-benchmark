#!/usr/bin/env node
// Builds docs/reference/java-gamerule-defaults.v1.json: the default value of every game
// rule of the Java reference version, read from Mojang's registry by running
// tools/java/src/GameRuleDefaults.java against the jar (rule 45: a game rule absent from
// `game_rules.dat` is read by the game as its default).
//   node tools/reference/build-java-gamerule-defaults.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { REPO_ROOT } from '../lib/archive.mjs';
import { javaExecutable, minecraftClasspath } from '../lib/open.mjs';

const src = path.join(REPO_ROOT, 'tools', 'java', 'src', 'GameRuleDefaults.java');
const cwd = path.join(REPO_ROOT, '_staging', 'work', 'java-cwd');
fs.mkdirSync(cwd, { recursive: true });
const tsv = path.join(cwd, 'gamerule-defaults.tsv');
const r = spawnSync(javaExecutable(), ['-cp', minecraftClasspath(), src, tsv], { encoding: 'utf8', cwd, maxBuffer: 1 << 26 });
if (r.status !== 0) { console.error(r.stderr); process.exit(1); }
const defaults = {};
let version = null;
for (const line of fs.readFileSync(tsv, 'utf8').split(/\r?\n/)) {
  const [k, v] = line.split('\t');
  if (!k || v === undefined) continue;
  if (k === '#version') { version = v; continue; }
  defaults[k.replace(/^minecraft:/, '')] = Number(v);
}
const out = {
  schema: 'mccb.reference/java-gamerule-defaults/1',
  meaning: 'default value of each Java game rule (booleans as 1/0), read from the game registry; a rule absent from game_rules.dat is read as this value',
  source: { minecraft_version: version, program: 'tools/java/src/GameRuleDefaults.java',
    program_sha256: crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex') },
  rules: Object.keys(defaults).length,
  defaults: Object.fromEntries(Object.entries(defaults).sort()),
};
const file = path.join(REPO_ROOT, 'docs', 'reference', 'java-gamerule-defaults.v1.json');
fs.writeFileSync(file, JSON.stringify(out, null, 1) + '\n');
console.log(`${out.rules} rules (${version}) → ${path.relative(REPO_ROOT, file)}`);
