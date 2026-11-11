// Family "world": level-wide settings and state (name, seed, mode, rules, time, weather,
// border, schedules, forced chunks / ticking areas). docs/fixture-rules.md §3.5
import fs from 'node:fs';
import { plain, semantic } from '../lib/nbt.mjs';
import { r, notEvaluated, PASS, ADAPTED, PARTIAL, FAIL, NOT_APPLICABLE, REASON } from '../lib/status.mjs';
import { GAMERULE_J2B, GAMERULE_B2J, GAMERULE_DIFFERENT_UNIT, GAMERULE_JAVA_ONLY, GAMERULE_BEDROCK_ONLY, BEDROCK_GAMERULE_FIELDS } from '../reference/gamerules.v1.mjs';

// Rule 45: a game rule absent from `game_rules.dat` is read by the game as its registry
// default (Mojang's DataFixer even omits `fire_spread_radius_around_player` when it equals
// 128). Defaults read from the jar: docs/reference/java-gamerule-defaults.v1.json.
let _javaGameruleDefaults = null;
function javaGameruleDefaults() {
  if (!_javaGameruleDefaults) {
    const f = new URL('../../docs/reference/java-gamerule-defaults.v1.json', import.meta.url);
    _javaGameruleDefaults = JSON.parse(fs.readFileSync(f, 'utf8')).defaults;
  }
  return _javaGameruleDefaults;
}

// Stored rules first (subject order and ids unchanged), then the defaults of missing ones.
const withDefaults = (got, dflt) => { const o = { ...got }; for (const [k, v] of Object.entries(dflt)) if (!(k in o)) o[k] = v; return o; };

const JAVA_GAMETYPE_TO_BEDROCK = { 0: 0, 1: 1, 2: 2, 3: 6 };
const BEDROCK_GAMETYPE_TO_JAVA = { 0: 0, 1: 1, 2: 2, 6: 3 };
const DIFF = ['peaceful', 'easy', 'normal', 'hard'];
const JAVA_DIMS = ['minecraft:overworld', 'minecraft:the_nether', 'minecraft:the_end'];
const BEDROCK_DIM = { 0: 'minecraft:overworld', 1: 'minecraft:the_nether', 2: 'minecraft:the_end' };

/** World-level facts of a Java world (normalised to 26.3). */
export async function javaWorldFacts(w) {
  const L = plain(w.level) || {};
  const sd = async (n, dim) => { const t = await w.savedData(n, dim); return t ? plain(t.tag).data ?? plain(t.tag) : null; };
  const sdSem = async (n, dim) => { const t = await w.savedData(n, dim); return t ? semantic(t.tag.value?.data ?? t.tag) : null; };
  const wgs = await sd('world_gen_settings');
  const clocks = (await sd('world_clocks')) || {};
  const weather = (await sd('weather')) || {};
  const gr = (await sd('game_rules')) || {};
  const f = {
    level_name: L.LevelName, seed: wgs?.seed !== undefined ? String(wgs.seed) : undefined,
    game_type: L.GameType, difficulty: L.difficulty_settings?.difficulty, hardcore: L.difficulty_settings ? !!L.difficulty_settings.hardcore : undefined,
    commands: L.allowCommands !== undefined ? !!L.allowCommands : undefined,
    spawn: L.spawn?.pos ? { pos: L.spawn.pos.map(Number), dim: L.spawn.dimension } : undefined,
    day_time: clocks['minecraft:overworld']?.total_ticks !== undefined ? Number(clocks['minecraft:overworld'].total_ticks) % 24000 : undefined,
    raining: weather.raining !== undefined ? !!weather.raining : undefined, thundering: weather.thundering !== undefined ? !!weather.thundering : undefined,
    gamerules: withDefaults(Object.fromEntries(Object.entries(gr).map(([k, v]) => [k.replace(/^minecraft:/, ''), Number(v)])), javaGameruleDefaults()),
    java_only: {
      data_packs: L.DataPacks ? JSON.stringify(L.DataPacks) : undefined,
      scheduled_events: await sdSem('scheduled_events'),
      custom_clocks: JSON.stringify(Object.fromEntries(Object.entries(clocks).filter(([k]) => !JAVA_DIMS.includes(k)))),
      custom_boss_events: await sdSem('custom_boss_events'),
      random_sequences: await sdSem('random_sequences'),
      stopwatches: await sdSem('stopwatches'),
    },
    borders: {}, forced: {},
  };
  for (const d of JAVA_DIMS) {
    f.borders[d] = await sdSem('world_border', d);
    const t = await sd('chunk_tickets', d);
    f.forced[d] = (t?.tickets || []).filter((x) => /forced/.test(x.type)).map((x) => x.chunk_pos.map(Number)).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  }
  return f;
}

/** World-level facts of a Bedrock world. */
export function bedrockWorldFacts(w) {
  const L = plain(w.level) || {};
  const f = {
    level_name: L.LevelName, seed: L.RandomSeed !== undefined ? String(L.RandomSeed) : undefined,
    game_type: L.GameType, difficulty: L.Difficulty !== undefined ? DIFF[L.Difficulty] : undefined, hardcore: L.IsHardcore !== undefined ? !!L.IsHardcore : undefined,
    commands: L.commandsEnabled !== undefined ? !!L.commandsEnabled : undefined,
    spawn: L.SpawnX !== undefined ? { pos: [L.SpawnX, L.SpawnY, L.SpawnZ].map(Number), dim: 'minecraft:overworld' } : undefined,
    day_time: L.Time !== undefined ? Number(L.Time) % 24000 : undefined,
    raining: L.rainLevel !== undefined ? Number(L.rainLevel) > 0 : undefined, thundering: L.lightningLevel !== undefined ? Number(L.lightningLevel) > 0 : undefined,
    gamerules: Object.fromEntries(BEDROCK_GAMERULE_FIELDS.filter((k) => L[k] !== undefined).map((k) => [k, Number(L[k])])),
    ticking: [],
  };
  for (const [k] of w.named) {
    if (!k.startsWith('tickingarea_')) continue;
    for (const t of w.namedNbt(k) || []) {
      const p = plain(t);
      f.ticking.push({ name: p.Name, dim: BEDROCK_DIM[p.Dimension] || `dim${p.Dimension}`, min: [Number(p.MinX), Number(p.MinZ)], max: [Number(p.MaxX), Number(p.MaxZ)], circle: !!p.IsCircle, preload: !!p.Preload });
    }
  }
  f.ticking.sort((a, b) => String(a.name).localeCompare(String(b.name)));
  return f;
}

const S = (k, locator, expected, direct, roundtrip = 'EQUAL') => ({ family: 'world', locator: { key: k, ...locator }, expected, aspects: { value: { direct, roundtrip } } });

export async function enumerate(ctx) {
  const ed = ctx.source.edition;
  const f = ed === 'java' ? await javaWorldFacts(ctx.source.world) : bedrockWorldFacts(ctx.source.world);
  const out = [];
  // Behaviour-level check that MCCB can run offline: does the reference Java game accept
  // the world (Mojang's world-upgrade file migration)? Bedrock targets: no runtime.
  out.push({ family: 'world', locator: { key: 'opens_in_reference_game' }, expected: { value: true },
    aspects: { opens: { direct: 'NE:measured-at-behavior-level', behavior: ed === 'bedrock' ? 'JAVA_OPENS' : 'NE:no-bedrock-runtime-in-v1.1', roundtrip: ed === 'java' ? 'JAVA_OPENS' : 'NE:no-bedrock-runtime-in-v1.1' } } });
  for (const k of ['level_name', 'seed', 'game_type', 'difficulty', 'hardcore', 'commands', 'spawn', 'day_time', 'raining', 'thundering']) {
    if (f[k] === undefined) continue;
    out.push(S(k, {}, { value: f[k] }, `MAP:${k}`));
  }
  for (const [name, v] of Object.entries(f.gamerules)) {
    let direct;
    if (ed === 'java') direct = GAMERULE_J2B[name] ? `GAMERULE:${GAMERULE_J2B[name]}` : GAMERULE_JAVA_ONLY.includes(name) ? 'NA:java-only-gamerule' : GAMERULE_DIFFERENT_UNIT[name] ? 'NE:gamerule-different-unit' : `NE:${REASON.NO_RULE}`;
    else direct = GAMERULE_B2J[name] ? `GAMERULE:${GAMERULE_B2J[name]}` : GAMERULE_BEDROCK_ONLY.includes(name) ? 'NA:bedrock-only-gamerule' : Object.values(GAMERULE_DIFFERENT_UNIT).some((x) => x.startsWith(name)) ? 'NE:gamerule-different-unit' : `NE:${REASON.NO_RULE}`;
    out.push(S(`gamerule:${name}`, {}, { value: v }, direct));
  }
  if (ed === 'java') {
    for (const [k, v] of Object.entries(f.java_only)) if (v !== undefined && v !== null && v !== '{}' && v !== '[]') out.push(S(`java_only:${k}`, {}, { value: v }, 'NA:java-only-world-data'));
    for (const [d, v] of Object.entries(f.borders)) if (v) out.push(S('world_border', { dim: d }, { value: v }, 'NA:bedrock-has-no-world-border'));
    for (const [d, list] of Object.entries(f.forced)) if (list.length) out.push(S('forced_chunks', { dim: d }, { value: list }, 'FORCED_TO_TICKING'));
  } else {
    for (const t of f.ticking) out.push(S('ticking_area', { name: t.name }, { value: t }, 'TICKING_TO_FORCED'));
  }
  return out;
}

const chunksOfArea = (t) => {
  const out = [];
  for (let x = Math.floor(t.min[0] / 16); x <= Math.floor(t.max[0] / 16); x++) for (let z = Math.floor(t.min[1] / 16); z <= Math.floor(t.max[1] / 16); z++) out.push([x, z]);
  return out;
};

function directValue(key, exp, srcEd, tf) {
  const v = exp.value;
  switch (key) {
    case 'level_name': return tf.level_name === v ? r(PASS, 'world.level_name') : r(FAIL, 'world.level_name', { observed: tf.level_name ?? null });
    case 'seed': return String(tf.seed) === String(v) ? r(PASS, 'world.seed') : r(FAIL, 'world.seed', { observed: tf.seed ?? null });
    case 'game_type': { const want = srcEd === 'java' ? JAVA_GAMETYPE_TO_BEDROCK[v] : BEDROCK_GAMETYPE_TO_JAVA[v]; return tf.game_type === want ? r(PASS, 'world.game_type') : r(FAIL, 'world.game_type', { observed: tf.game_type ?? null }); }
    case 'difficulty': return tf.difficulty === v ? r(PASS, 'world.difficulty') : r(FAIL, 'world.difficulty', { observed: tf.difficulty ?? null });
    case 'hardcore': case 'commands': case 'raining': case 'thundering': return tf[key] === v ? r(PASS, `world.${key}`) : r(FAIL, `world.${key}`, { observed: tf[key] ?? null });
    case 'day_time': return tf.day_time === v ? r(PASS, 'world.day_time') : r(FAIL, 'world.day_time', { observed: tf.day_time ?? null });
    case 'spawn': {
      if (!tf.spawn) return r(FAIL, 'world.spawn', { observed: null });
      const ok = tf.spawn.pos[0] === v.pos[0] && tf.spawn.pos[2] === v.pos[2];
      return r(ok ? PASS : FAIL, 'world.spawn.xz', ok ? { observed_y: tf.spawn.pos[1] } : { observed: tf.spawn.pos });
    }
    default: return notEvaluated('unknown-world-key');
  }
}

export async function prepare(ctx) {
  for (const level of ['direct', 'roundtrip']) {
    const v = ctx[level];
    if (!v?.world) continue;
    v._worldFacts = v.edition === 'java' ? await javaWorldFacts(v.world) : bedrockWorldFacts(v.world);
  }
}

export async function evaluate(subject, ctx) {
  const k = subject.locator.key;
  if (k === 'opens_in_reference_game') {
    const spec = subject.aspects.opens;
    const opens = (view, code) => {
      if (!view) return notEvaluated(REASON.NO_ROUNDTRIP);
      if (code.startsWith('NE:')) return notEvaluated(code.slice(3));
      const n = view.normalize;
      return view.opens ? r(PASS, 'world.opens.java-file-fix-accepted', { file_fix: n?.file_fix, data_version_before: n?.level_data_version_before })
        : r(FAIL, 'world.opens.java-file-fix-refused', { error: n?.error });
    };
    return { opens: { direct: notEvaluated(spec.direct.slice(3)), behavior: opens(ctx.direct, spec.behavior), roundtrip: opens(ctx.roundtrip, spec.roundtrip) } };
  }
  const spec = subject.aspects.value;
  const exp = subject.expected;
  const d = ctx.direct, rt = ctx.roundtrip;
  let dr;
  if (!d.world) dr = r(FAIL, 'world.world-opens', { observed: REASON.WORLD_DOES_NOT_OPEN });
  else if (spec.direct.startsWith('NE:')) dr = notEvaluated(spec.direct.slice(3));
  else if (spec.direct.startsWith('NA:')) dr = r(NOT_APPLICABLE, `world.${spec.direct.slice(3)}`);
  else {
    const tf = d._worldFacts;
    if (spec.direct.startsWith('MAP:')) dr = directValue(k, exp, ctx.sourceEdition, tf);
    else if (spec.direct.startsWith('GAMERULE:')) {
      const t = spec.direct.slice(9);
      const got = tf.gamerules[t];
      dr = got === undefined ? r(FAIL, 'world.gamerule', { observed: 'absent' }) : got === exp.value ? r(PASS, 'world.gamerule') : r(FAIL, 'world.gamerule', { observed: got });
    } else if (spec.direct === 'FORCED_TO_TICKING') {
      const covered = new Set();
      for (const t of tf.ticking.filter((x) => x.dim === subject.locator.dim)) for (const c of chunksOfArea(t)) covered.add(c.join(','));
      const hit = exp.value.filter((c) => covered.has(c.join(','))).length;
      dr = r(hit === exp.value.length ? ADAPTED : hit ? PARTIAL : FAIL, 'world.forced_chunks.as-ticking-areas', { covered: hit, forced: exp.value.length });
    } else if (spec.direct === 'TICKING_TO_FORCED') {
      const forced = new Set((tf.forced?.[exp.value.dim] || []).map((c) => c.join(',')));
      const need = chunksOfArea(exp.value);
      const hit = need.filter((c) => forced.has(c.join(','))).length;
      dr = r(hit === need.length ? ADAPTED : hit ? PARTIAL : FAIL, 'world.ticking_area.as-forced-chunks', { covered: hit, chunks: need.length });
    } else dr = notEvaluated('unknown-world-spec');
  }
  let rr;
  if (!rt) rr = notEvaluated(REASON.NO_ROUNDTRIP);
  else if (!rt.world) rr = r(FAIL, 'world.world-opens', { observed: REASON.WORLD_DOES_NOT_OPEN });
  else {
    const tf = rt._worldFacts;
    let got;
    if (k.startsWith('gamerule:')) got = tf.gamerules[k.slice(9)];
    else if (k.startsWith('java_only:')) got = tf.java_only?.[k.slice(10)];
    else if (k === 'world_border') got = tf.borders?.[subject.locator.dim];
    else if (k === 'forced_chunks') got = tf.forced?.[subject.locator.dim];
    else if (k === 'ticking_area') got = (tf.ticking || []).find((t) => t.name === subject.locator.name);
    else got = tf[k];
    const same = JSON.stringify(got) === JSON.stringify(exp.value);
    rr = same ? r(PASS, `world.${k.split(':')[0]}.roundtrip`) : r(FAIL, `world.${k.split(':')[0]}.roundtrip`, { observed: got === undefined ? 'absent' : (typeof got === 'string' ? got.slice(0, 300) : got) });
  }
  return { value: { direct: dr, roundtrip: rr } };
}
