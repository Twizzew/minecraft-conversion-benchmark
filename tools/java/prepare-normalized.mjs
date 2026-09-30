#!/usr/bin/env node
// Pre-compute the normalised (Mojang file-fix + DataFixerUpper) copy of every Java
// source world and every Java world produced by a recorded run. Results are cached
// by archive SHA-256 under _staging/work/normalized/, so later steps are fast.
//   node tools/java/prepare-normalized.mjs [runId ...]
import fs from 'node:fs';
import { worldsManifest, openSource, openRunOutput, runsDir } from '../lib/open.mjs';

const t0 = Date.now();
const only = process.argv.slice(2);
const log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)}s]`, ...a);
if (!only.length) {
  for (const w of worldsManifest().worlds.filter((x) => x.status === 'ACTIVE' && x.edition === 'java')) {
    const o = await openSource(w.id);
    log('source', w.id, o.normalize?.file_fix, JSON.stringify(o.normalize?.units), 'errors', o.normalize?.errors?.length ?? 0);
  }
}
const runs = only.length ? only : fs.readdirSync(runsDir()).filter((d) => fs.existsSync(`${runsDir()}/${d}/run.json`));
for (const id of runs.sort()) {
  const o = await openRunOutput(id);
  if (o.missing || o.edition !== 'java') { if (o.world?.cleanup) o.world.cleanup(); continue; }
  log('run', id, 'opens', o.worldOpens, o.normalize?.file_fix, JSON.stringify(o.normalize?.units || {}), 'errors', o.normalize?.errors?.length ?? 0, o.normalize?.error || '');
}
log('done');
