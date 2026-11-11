#!/usr/bin/env node
// Copies graded results (<from>/<converter>/<direct run id>/{summary.json,results.jsonl.gz}) into the
// repository, applying ONLY the publication rule of docs/converters/worldswitch.md: absolute paths of
// the grading machine are replaced by a token (<LOCAL>, <HOME>, <BUILD>, <JAVA>). Nothing else changes.
//   node reports/closure-rescore/publish-results.mjs --from <graded dir> --to <repo results dir> \
//        --redact <absolute prefix>=<TOKEN> [...] --record <publication record .json>
// - results.jsonl.gz is copied byte for byte (refused if it holds a redacted prefix or any absolute path);
// - summary.json: the prefixes are replaced in its text; the script checks that the result parses, that
//   only string values changed, and that no absolute path (/tmp/, /root/, /home/) remains;
// - the record lists, per file, the SHA-256 as graded and as published and every changed JSON path.
import fs from 'node:fs'; import path from 'node:path'; import crypto from 'node:crypto'; import zlib from 'node:zlib';
const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : null; };
const FROM = opt('from'), TO = opt('to'), RECORD = opt('record');
const redact = args.flatMap((a, i) => (args[i - 1] === '--redact' ? [a.split('=')] : [])).sort((a, b) => b[0].length - a[0].length);
if (!FROM || !TO || !RECORD || !redact.length) { console.error('usage: see header'); process.exit(2); }
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
const ABS = /(\/tmp\/|\/root\/|\/home\/)/;
const NEEDLES = ['/tmp/', '/root/', '/home/'];
const diffPaths = (a, b, p = '$', out = []) => {
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) { out.push(`${p} (type)`); return out; }
  if (a && typeof a === 'object') { for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diffPaths(a[k], b[k], `${p}.${k}`, out); return out; }
  if (a !== b) { if (typeof a !== 'string') out.push(`${p} (non-string)`); else out.push(p); }
  return out;
};
const rec = { schema: 'mccb.publication/1', rule: 'absolute paths of the grading machine replaced by tokens; nothing else changed', tokens: redact.map(([, t]) => t), files: [] };
let bad = 0;
for (const conv of fs.readdirSync(FROM).filter((c) => fs.statSync(path.join(FROM, c)).isDirectory()).sort()) {
  for (const run of fs.readdirSync(path.join(FROM, conv)).sort()) {
    const src = path.join(FROM, conv, run), dst = path.join(TO, conv, run);
    if (!fs.existsSync(path.join(src, 'summary.json'))) continue;
    if (fs.existsSync(dst)) { console.error(`refused: ${dst} exists`); process.exit(1); }
    const gz = fs.readFileSync(path.join(src, 'results.jsonl.gz'));
    const rows = zlib.gunzipSync(gz);
    if ([...redact.map(([p]) => p), ...NEEDLES].some((p) => rows.indexOf(p) >= 0)) { console.error(`${run}: results.jsonl.gz holds an absolute path — refused`); bad++; continue; }
    const raw = fs.readFileSync(path.join(src, 'summary.json'), 'utf8');
    let txt = raw; for (const [p, t] of redact) txt = txt.split(p).join(t);
    const changed = diffPaths(JSON.parse(raw), JSON.parse(txt));
    if (changed.some((c) => c.includes('('))) { console.error(`${run}: non-string change`); bad++; continue; }
    if (ABS.test(txt)) { console.error(`${run}: absolute path left in summary.json: ${txt.match(new RegExp(`.{0,60}${ABS.source}.{0,60}`))?.[0]}`); bad++; continue; }
    if (JSON.parse(txt).results_file?.sha256 !== sha(gz)) { console.error(`${run}: results hash ≠ summary`); bad++; continue; }
    fs.mkdirSync(dst, { recursive: true });
    fs.writeFileSync(path.join(dst, 'results.jsonl.gz'), gz); fs.writeFileSync(path.join(dst, 'summary.json'), txt);
    rec.files.push({ run: `${conv}/${run}`, results_jsonl_gz_sha256: sha(gz), summary_graded_sha256: sha(Buffer.from(raw)), summary_published_sha256: sha(Buffer.from(txt)), summary_paths_redacted: changed });
  }
}
if (bad) process.exit(1);
fs.writeFileSync(RECORD, JSON.stringify(rec, null, 1) + '\n');
console.log(`${rec.files.length} results published to ${TO}; ${rec.files.filter((f) => f.summary_paths_redacted.length).length} summaries with redacted paths`);
