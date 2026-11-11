#!/usr/bin/env node
// Build the fixture registry of one or more source worlds: fixtures/<world>.jsonl
// (first line = header, then one subject per line; an assertion is subject#aspect).
// Fixtures are derived from the SOURCE world only — no converter output is read here.
//   node tools/fixtures/build-fixtures.mjs [J01@1.1 ...]     (default: every ACTIVE world)
import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';
import { REPO_ROOT, sha256File } from '../lib/archive.mjs';
import { worldsManifest, openSource, NORMALIZER_SHA256 } from '../lib/open.mjs';
import { identityRef } from '../lib/identity.mjs';
import { javaRegistry, bedrockRegistry, JAVA_REFERENCE_VERSION } from '../lib/registry.mjs';
import { FAMILIES } from '../families/index.mjs';
import { TargetView } from '../oracles/target.mjs';
import { fixtureFile, joinLines } from '../lib/fixtures-io.mjs';

const VANILLA_DIMS = new Set(['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end']);
const DIM_NUM = { 'minecraft:overworld': 0, 'minecraft:the_nether': 1, 'minecraft:the_end': 2 };

/** Is the chunk holding `pos` not fully generated? Java: Status != full (or a proto-chunk
 *  entity); Bedrock: FinalizedState (key 0x36) absent or != 2. */
async function chunkIncomplete(edition, world, dim, pos, origin) {
  if (origin === 'proto_chunk') return true;
  const cx = Math.floor(pos[0] / 16), cz = Math.floor(pos[2] / 16);
  if (edition === 'java') {
    const c = await world.chunk(dim, cx, cz);
    const st = c?.value?.Status?.value ?? c?.value?.Level?.value?.Status?.value;
    return !!st && st !== 'minecraft:full' && st !== 'full';
  }
  const t = world.chunkTags(DIM_NUM[dim], cx, cz);
  if (!t) return false;
  const f = t.get('54');
  return !f || f.readInt32LE(0) !== 2;
}
const TOOLS_VERSION = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'tools', 'package.json'), 'utf8')).version;
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const fam = (process.argv.find((a) => a.startsWith('--families=')) || '').split('=')[1]?.split(',');
// PRIVATE worlds are built only when named, and their fixtures stay in _staging/private/.
const worlds = worldsManifest().worlds.filter((w) => (w.status === 'ACTIVE' && (!only.length || only.includes(w.id))) || (w.status === 'PRIVATE' && only.includes(w.id)));
const outDir = path.join(REPO_ROOT, 'fixtures');
fs.mkdirSync(outDir, { recursive: true });

for (const w of worlds) {
  const t0 = Date.now();
  const src = await openSource(w.id);
  const ctx = {
    worldId: w.id, entry: w,
    source: { edition: src.edition, world: src.world, rawRoot: src.rawRoot },
    sourceView: new TargetView({ edition: src.edition, world: src.world, label: 'source' }),
  };
  const lines = [];
  const counts = {};
  const blockPositions = new Set();
  const setDirect = (s, code, aspects = Object.keys(s.aspects)) => { for (const k of aspects) if (s.aspects[k]) s.aspects[k].direct = code; };
  for (const f of FAMILIES) {
    if (fam && !fam.includes(f.name)) continue;
    const subjects = await f.enumerate(ctx);
    for (const s of subjects) {
      const dim = s.locator?.dim;
      const pos = s.locator?.pos;
      if (f.name === 'block') blockPositions.add(`${dim}|${pos.join(',')}`);
      // (1) A Java datapack dimension has no Bedrock counterpart: whatever lives in it is
      //     NOT_APPLICABLE in direct conversion (METHODOLOGY §5.2), for every family.
      if (w.edition === 'java' && dim && !VANILLA_DIMS.has(dim)) { setDirect(s, 'NA:bedrock-has-no-custom-dimension'); continue; }
      if (w.edition === 'java' && f.name === 'player' && s.expected?.dim && !VANILLA_DIMS.has(s.expected.dim)) {
        setDirect(s, 'NA:bedrock-has-no-custom-dimension', ['position', 'dimension', 'spawn_point']); continue;
      }
      // (2) Bedrock's Nether ends at y=127 (measured in B03: highest Nether sub-chunk = 7);
      //     Java content above it has no place in Bedrock. Round trip still judged.
      if (w.edition === 'java' && dim === 'minecraft:the_nether' && pos && pos[1] >= 128) { setDirect(s, 'NA:above-bedrock-nether-height'); continue; }
      // (3) Natural content (not placed by the world's generator) in a chunk whose
      //     generation is not complete: MCCB v1.1 does not define its correct conversion
      //     (keep it frozen half-generated, or let the target generate the chunk).
      //     NOT_EVALUATED at BOTH levels (rule 38, audit 2026-09-25). Judging the round
      //     trip penalised one of the two accepted answers: a converter that lets the
      //     target generate the chunk necessarily loses the half-generated content on the
      //     way back (B03: 632 FAIL for each converter, 16 more for one of them).
      if (['block_entity', 'item_stack', 'entity'].includes(f.name) && dim && pos && !blockPositions.has(`${dim}|${pos.map(Math.floor).join(',')}`)) {
        if (await chunkIncomplete(w.edition, src.world, dim, pos, s.locator.origin)) {
          setDirect(s, 'NE:natural-content-in-incomplete-chunk');
          for (const k of Object.keys(s.aspects)) s.aspects[k].roundtrip = 'NE:natural-content-in-incomplete-chunk';
        }
      }
    }
    subjects.forEach((s, i) => {
      s.id = `${w.id}/${f.name}/${String(i + 1).padStart(6, '0')}`;
      lines.push(JSON.stringify({ id: s.id, ...s }));
    });
    counts[f.name] = { subjects: subjects.length, assertions: subjects.reduce((a, s) => a + Object.keys(s.aspects).length, 0) };
  }
  const header = {
    schema: 'mccb.fixtures/1', world: w.id, source_asset: w.asset.name, source_sha256: w.asset.sha256,
    source_edition: w.edition, target_edition: w.edition === 'java' ? 'bedrock' : 'java',
    generated_by: 'tools/fixtures/build-fixtures.mjs', tools_version: TOOLS_VERSION,
    identity_reference: { file: 'docs/reference/identity-equivalence.v1.json', sha256: identityRef().sha256 },
    java_reference: { version: JAVA_REFERENCE_VERSION, ...javaRegistry().provenance },
    bedrock_reference: bedrockRegistry().provenance,
    java_normalization: src.normalize ? { tool: 'tools/java/src/MccbNormalize.java', tool_sha256: NORMALIZER_SHA256, block_entities_dropped_by_game_load: (src.normalize.block_entities_dropped_by_game_load || []).length, block_entities_kept_as_stored: (src.normalize.block_entities_kept_as_stored || []).length, level_data_version_before: src.normalize.level_data_version_before, data_version_after: src.normalize.minecraft_data_version, file_fix: src.normalize.file_fix } : null,
    families: counts,
  };
  // gzip with mtime 0: same content -> same bytes -> same SHA-256 (reproducible)
  const file = fixtureFile(w.id);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  // Joined as bytes, not as one string (a string is limited to ~512 MB); same bytes as before.
  fs.writeFileSync(file, zlib.gzipSync(joinLines([JSON.stringify(header), ...lines]), { level: 9 }));
  const plainFile = file.replace(/\.gz$/, '');
  if (fs.existsSync(plainFile)) fs.renameSync(plainFile, `${plainFile}.superseded-local`);
  if (src.world?.cleanup) src.world.cleanup();
  console.log(`${w.id}: ${lines.length} subjects ${JSON.stringify(counts)} -> ${path.relative(REPO_ROOT, file)} (${((Date.now() - t0) / 1000).toFixed(1)} s, sha256 ${sha256File(file).slice(0, 12)})`);
}
