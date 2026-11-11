#!/usr/bin/env node
// Builds docs/reference/bedrock-default-states.v1.json: for each Bedrock block that Mojang's
// official "block data values" table documents, the states of data value 0 — the block's
// default state (a block placed without data). Source: the table published in
// MicrosoftDocs/minecraft-creator (commit recorded below), as extracted and validated by the
// WorldSwitch engine (`lib/bedrock_aux_values.js`, rows rejected when malformed). Only rows
// whose block name is the table's own key are kept (a legacy family row such as
// `stone` 3 → `diorite` says nothing about diorite's default).
//   node tools/reference/build-bedrock-default-states.mjs <path to bedrock_aux_values.js>
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { REPO_ROOT } from '../lib/archive.mjs';

const src = path.resolve(process.argv[2]);
const { BEDROCK_AUX_VALUES, BEDROCK_AUX_SOURCE } = await import(pathToFileURL(src).href);
const defaults = {};
for (const [key, rows] of Object.entries(BEDROCK_AUX_VALUES)) {
  const r0 = rows?.[0];
  if (!r0 || r0[0] !== key) continue;
  defaults[`minecraft:${key}`] = r0[1] || {};
}
const out = {
  schema: 'mccb.reference/bedrock-default-states/1',
  meaning: 'states of data value 0 = the block default state, per Mojang\'s official block data-value table',
  source: { repository: 'MicrosoftDocs/minecraft-creator', commit: BEDROCK_AUX_SOURCE.commit, rows: BEDROCK_AUX_SOURCE.rows, rejected_rows: BEDROCK_AUX_SOURCE.rejected.length,
    extracted_from_sha256: crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex') },
  blocks: Object.keys(defaults).length,
  defaults: Object.fromEntries(Object.entries(defaults).sort()),
};
const file = path.join(REPO_ROOT, 'docs', 'reference', 'bedrock-default-states.v1.json');
fs.writeFileSync(file, JSON.stringify(out, null, 1) + '\n');
console.log(`${out.blocks} blocks → ${path.relative(REPO_ROOT, file)}`);
