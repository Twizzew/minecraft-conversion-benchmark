// Family "scoreboard": objectives, scores, display slots. docs/fixture-rules.md §3.6
import { plain, textOf } from '../lib/nbt.mjs';
import { r, notEvaluated, PASS, FAIL, NOT_APPLICABLE, REASON } from '../lib/status.mjs';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const JAVA_SLOT_TO_BEDROCK = { list: 'list', sidebar: 'sidebar', below_name: 'belowname', belowName: 'belowname' };
const BEDROCK_SLOT_TO_JAVA = { list: 'list', sidebar: 'sidebar', belowname: 'below_name' };

export async function javaScoreboard(w) {
  const t = await w.savedData('scoreboard');
  if (!t) return null;
  const d = plain(t.tag).data || {};
  return {
    // Java 26.x omits CriteriaName for a 'dummy' objective (its default value).
    objectives: (d.Objectives || []).map((o) => ({ name: o.Name, criteria: o.CriteriaName ?? 'dummy', display: textOf(o.DisplayName), render: o.RenderType })),
    scores: (d.PlayerScores || []).map((s) => ({ objective: s.Objective, holder: s.Name, value: Number(s.Score ?? 0) })),
    slots: Object.fromEntries(Object.entries(d.DisplaySlots || {}).map(([k, v]) => [k.replace(/^slot_/, ''), v])),
  };
}

export function bedrockScoreboard(w) {
  const t = w.namedNbt('scoreboard');
  if (!t || !t.length) return null;
  const d = plain(t[0]);
  const ids = new Map();
  for (const e of d.Entries || []) ids.set(String(e.ScoreboardId), e);
  const holder = (id) => { const e = ids.get(String(id)); if (!e) return { kind: 'unknown', name: String(id) }; return e.IdentityType === 3 ? { kind: 'fake', name: e.FakePlayerName } : e.IdentityType === 1 ? { kind: 'player', name: String(e.PlayerId) } : { kind: 'entity', name: String(e.EntityID) }; };
  const scores = [];
  for (const o of d.Objectives || []) for (const s of o.Scores || []) { const h = holder(s.ScoreboardId); scores.push({ objective: o.Name, holder: h.name, kind: h.kind, value: Number(s.Score) }); }
  return {
    objectives: (d.Objectives || []).map((o) => ({ name: o.Name, criteria: o.Criteria, display: o.DisplayName })),
    scores,
    slots: Object.fromEntries((d.DisplayObjectives || []).map((x) => [x.Name, x.ObjectiveName])),
  };
}

const sb = (ed, w) => (ed === 'java' ? javaScoreboard(w) : bedrockScoreboard(w));

export async function enumerate(ctx) {
  const ed = ctx.source.edition;
  const s = await sb(ed, ctx.source.world);
  if (!s) return [];
  const out = [];
  for (const o of s.objectives) {
    const dummy = ed === 'java' ? o.criteria === 'dummy' : o.criteria === 'dummy';
    out.push({ family: 'scoreboard', locator: { kind: 'objective', name: o.name }, expected: o,
      aspects: { presence: { direct: dummy ? 'EQUAL' : 'NA:criteria-without-counterpart', roundtrip: 'EQUAL' }, display_name: { direct: dummy ? 'TEXT_EQUAL' : 'NA:criteria-without-counterpart', roundtrip: 'EQUAL' } } });
  }
  const crit = Object.fromEntries(s.objectives.map((o) => [o.name, o.criteria]));
  for (const x of s.scores) {
    const entity = ed === 'java' ? UUID_RE.test(x.holder) : x.kind === 'entity';
    const player = ed === 'bedrock' && x.kind === 'player';
    const direct = crit[x.objective] !== 'dummy' ? 'NA:criteria-without-counterpart' : entity ? 'NE:entity-holder-identity-not-mappable' : player ? 'NE:player-holder-identity-not-mappable' : 'EQUAL';
    out.push({ family: 'scoreboard', locator: { kind: 'score', objective: x.objective, holder: x.holder }, expected: x, aspects: { value: { direct, roundtrip: 'EQUAL' } } });
  }
  for (const [slot, obj] of Object.entries(s.slots)) {
    const map = ed === 'java' ? JAVA_SLOT_TO_BEDROCK[slot] : BEDROCK_SLOT_TO_JAVA[slot];
    out.push({ family: 'scoreboard', locator: { kind: 'display_slot', slot }, expected: { slot, objective: obj, target_slot: map ?? null },
      aspects: { value: { direct: map ? 'EQUAL' : 'NA:display-slot-without-counterpart', roundtrip: 'EQUAL' } } });
  }
  return out;
}

export async function prepare(ctx) {
  for (const level of ['direct', 'roundtrip']) {
    const v = ctx[level];
    if (v?.world) v._scoreboard = await sb(v.edition, v.world);
  }
}

function judge(subject, aspect, code, s, level) {
  if (code.startsWith('NE:')) return notEvaluated(code.slice(3));
  if (code.startsWith('NA:')) return r(NOT_APPLICABLE, `scoreboard.${code.slice(3)}`);
  if (!s) return r(FAIL, `scoreboard.${subject.locator.kind}.${level}`, { observed: 'no scoreboard' });
  const e = subject.expected;
  const L = subject.locator;
  if (L.kind === 'objective') {
    const o = s.objectives.find((x) => x.name === L.name);
    if (!o) return r(FAIL, `scoreboard.objective.${aspect}.${level}`, { observed: 'absent' });
    if (aspect === 'presence') return r(PASS, `scoreboard.objective.presence.${level}`);
    return o.display === e.display ? r(PASS, `scoreboard.objective.display_name.${level}`) : r(FAIL, `scoreboard.objective.display_name.${level}`, { observed: o.display ?? null });
  }
  if (L.kind === 'score') {
    const cands = s.scores.filter((x) => x.objective === L.objective && x.holder === L.holder);
    if (!cands.length) {
      // a Java name may legitimately become a Bedrock PLAYER entry (not a fake player):
      // the identity of that player cannot be checked, so no verdict.
      const asPlayer = level === 'direct' && s.scores.some((x) => x.objective === L.objective && x.kind === 'player' && x.value === e.value);
      return asPlayer ? notEvaluated('holder-mapped-to-player-identity') : r(FAIL, `scoreboard.score.${level}`, { observed: 'absent' });
    }
    return cands.some((x) => x.value === e.value) ? r(PASS, `scoreboard.score.${level}`) : r(FAIL, `scoreboard.score.${level}`, { observed: cands.map((x) => x.value) });
  }
  const slot = level === 'direct' ? e.target_slot : e.slot;
  const got = s.slots[slot];
  return got === e.objective ? r(PASS, `scoreboard.display_slot.${level}`) : r(FAIL, `scoreboard.display_slot.${level}`, { observed: got ?? 'empty' });
}

export async function evaluate(subject, ctx) {
  const res = {};
  for (const [aspect, spec] of Object.entries(subject.aspects)) {
    const d = ctx.direct, rt = ctx.roundtrip;
    res[aspect] = {
      direct: !d.world ? r(FAIL, 'scoreboard.world-opens', { observed: REASON.WORLD_DOES_NOT_OPEN }) : judge(subject, aspect, spec.direct, d._scoreboard, 'direct'),
      roundtrip: !rt ? notEvaluated(REASON.NO_ROUNDTRIP) : !rt.world ? r(FAIL, 'scoreboard.world-opens', { observed: REASON.WORLD_DOES_NOT_OPEN }) : judge(subject, aspect, spec.roundtrip, rt._scoreboard, 'roundtrip'),
    };
  }
  return res;
}
