#!/usr/bin/env node
// Print the Java classpath of an official Minecraft version from a local launcher
// installation (versions/<v>/<v>.jar + the libraries its <v>.json lists).
// This runs Mojang's own code (data generator, DataFixerUpper, chunk codecs) as an
// oracle — it is never modified.
//
//   node tools/java/classpath.mjs 26.3 [--minecraft-dir <dir>] [--report]
//
// Without a launcher installation, the official dedicated server jar gives the same
// reports: java -DbundlerMainClass=net.minecraft.data.Main -jar server.jar --reports
import fs from 'node:fs';
import path from 'node:path';

const ver = process.argv[2];
const i = process.argv.indexOf('--minecraft-dir');
const mc = i > 0 ? process.argv[i + 1]
  : path.join(process.env.APPDATA || path.join(process.env.HOME || '', '.local', 'share'), '.minecraft');
const manifest = JSON.parse(fs.readFileSync(path.join(mc, 'versions', ver, `${ver}.json`), 'utf8'));
const entries = [path.join(mc, 'versions', ver, `${ver}.jar`)];
const missing = [];
for (const lib of manifest.libraries) {
  const p = lib.downloads?.artifact?.path;
  if (!p) continue;
  const full = path.join(mc, 'libraries', ...p.split('/'));
  if (fs.existsSync(full)) entries.push(full); else missing.push(p);
}
if (process.argv.includes('--report')) {
  console.error(`${ver}: ${entries.length} classpath entries, ${missing.length} missing`);
  for (const m of missing.slice(0, 10)) console.error(`  missing ${m}`);
}
process.stdout.write(entries.join(path.delimiter));
