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
// Exit 3 = the installation is NOT THERE (version manifest, game jar or a library missing): an
// input absent before anything ran. Any other failure (a corrupt manifest, a bug) is an error.
const NOT_INSTALLED = 3;
const notInstalled = (what) => { console.error(`minecraft ${ver} not installed in ${mc}: ${what}`); process.exit(NOT_INSTALLED); };
const manifestFile = path.join(mc, 'versions', ver, `${ver}.json`);
if (!fs.existsSync(manifestFile)) notInstalled(`missing ${manifestFile}`);
const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
const jar = path.join(mc, 'versions', ver, `${ver}.jar`);
if (!fs.existsSync(jar)) notInstalled(`missing ${jar}`);
const entries = [jar];
const missing = [];
for (const lib of manifest.libraries) {
  const p = lib.downloads?.artifact?.path;
  if (!p) continue;
  const full = path.join(mc, 'libraries', ...p.split('/'));
  if (fs.existsSync(full)) entries.push(full); else missing.push(p);
}
if (missing.length && !process.argv.includes('--report')) notInstalled(`${missing.length} libraries missing, e.g. ${missing[0]}`);
if (process.argv.includes('--report')) {
  console.error(`${ver}: ${entries.length} classpath entries, ${missing.length} missing`);
  for (const m of missing.slice(0, 10)) console.error(`  missing ${m}`);
}
process.stdout.write(entries.join(path.delimiter));
