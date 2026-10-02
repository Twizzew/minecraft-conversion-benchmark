// Rule 49 (MCCB v1.3, oracle defect F12 found after the v1.2 freeze): a DOUBLE CHEST is ONE
// container for the player. Each edition shows its two halves in a fixed order, and a converter
// may store the same 54 slots with the halves' contents exchanged between the two blocks. The
// v1.2 oracle compared each block on its own and read such a chest as "stacks missing".
//
// Which half is shown first (slots 0–26 of the combined container):
//   • Java: the chest whose block state `type` is `right` (ChestBlock.getBlockType: RIGHT =
//     FIRST, probed in the 26.3 game); its partner is at facing.counterClockWise; `left` is at
//     facing.clockWise.
//   • Bedrock: the chest whose block entity has `pairlead` = 1 (observed in game: exchanging
//     `pairlead` alone swaps the displayed halves). Recent Bedrock keeps `pairx/pairz/pairlead`
//     on the LEAD chest only; the other half is found as the neighbour pointing to it.
// Applies identically to every converter and to the source. A chest that is not a double chest
// in the world being read is read on its own, exactly as before.
// v1.3 closure (rule 49, D): a Bedrock pair whose LEAD is not unique (no chest with
// pairlead = 1, or both, or two neighbours claiming the same chest) shows its halves in an
// order MCCB cannot tell: { half: null, ambiguous: true } — never a combined order invented
// from the side the pair is read from. Java: the two halves must also face the same way.
// v1.3 closure, pass 3: a chest that CARRIES pair markers (Java `type` left/right; Bedrock
// `pairx`/`pairz`) whose pair is not valid (partner missing, not adjacent, not a chest, other
// block, other facing, same type) is ALSO ambiguous — never read as a single chest. `null` is
// returned only for a chest without any pair marker (and not claimed by a neighbour).
import { DIM_NUM } from '../families/block.mjs';

const CW = { north: 'east', east: 'south', south: 'west', west: 'north' };
const CCW = { north: 'west', west: 'south', south: 'east', east: 'north' };
const VEC = { north: [0, -1], south: [0, 1], east: [1, 0], west: [-1, 0] };
const plainNum = (t) => (t && typeof t.value === 'number' ? t.value : null);

/** { half: 0|1, partner: [x,y,z] } when (dim, pos) is one half of a double chest, else null. */
export async function chestPair(edition, world, dim, pos) {
  if (!world) return null;
  const [x, y, z] = pos;
  if (edition === 'java') {
    const b = await world.blockAt(dim, x, y, z);
    if (!b || !/(^|:)(trapped_)?chest$/.test(b.name || '') && !/copper_chest$/.test(b.name || '')) return null;
    const t = b.props?.type;
    if (t !== 'left' && t !== 'right') return null;
    const d = VEC[t === 'left' ? CW[b.props.facing] : CCW[b.props.facing]];
    if (!d) return { half: null, ambiguous: true, partner: null };
    const pp = [x + d[0], y, z + d[1]];
    const pb = await world.blockAt(dim, ...pp);
    if (!pb || pb.name !== b.name || pb.props?.type !== (t === 'left' ? 'right' : 'left') || pb.props?.facing !== b.props.facing) return { half: null, ambiguous: true, partner: pp };
    return { half: t === 'right' ? 0 : 1, partner: pp };
  }
  const dn = DIM_NUM[dim];
  if (dn === undefined) return null;
  const be = world.blockEntityAt(dn, x, y, z);
  const v = be?.value;
  if (!v || v.id?.value !== 'Chest') return null;
  // v1.3 closure, pass 4: three states — SINGLE (no pair marker anywhere: null), VALID pair,
  // UNDETERMINED pair (any marker that does not make one consistent pair with a unique lead).
  const has = (c, k) => !!c && c[k] !== undefined;
  const markers = (c) => has(c, 'pairx') || has(c, 'pairz') || has(c, 'pairlead');
  const coords = (c) => (plainNum(c?.pairx) !== null && plainNum(c?.pairz) !== null ? [plainNum(c.pairx), plainNum(c.pairz)] : null);
  const lead = (c) => plainNum(c.pairlead) === 1;
  const undetermined = (partner) => ({ half: null, ambiguous: true, partner });
  const own = coords(v);
  if (own) {
    const [px, pz] = own;
    if (Math.abs(px - x) + Math.abs(pz - z) !== 1) return undetermined(null);
    const p = world.blockEntityAt(dn, px, y, pz)?.value;
    if (p?.id?.value !== 'Chest') return undetermined([px, y, pz]);
    if (markers(p)) {
      // a partner that carries markers must point back with both coordinates (old format)
      const back = coords(p);
      if (!back || back[0] !== x || back[1] !== z) return undetermined([px, y, pz]);
    }
    const leads = Number(lead(v)) + Number(markers(p) && lead(p));
    if (leads !== 1) return undetermined([px, y, pz]);
    return { half: lead(v) ? 0 : 1, partner: [px, y, pz] };
  }
  // markers without a complete pair position (pairx only, pairz only, pairlead only…)
  const claim = [];
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const p = world.blockEntityAt(dn, x + dx, y, z + dz)?.value;
    const c = p?.id?.value === 'Chest' ? coords(p) : null;
    if (c && c[0] === x && c[1] === z) claim.push([p, [x + dx, y, z + dz]]);
  }
  if (markers(v)) return undetermined(claim[0]?.[1] ?? null);
  if (!claim.length) return null;
  if (claim.length > 1 || !lead(claim[0][0])) return undetermined(claim[0][1]);
  return { half: 1, partner: claim[0][1] };
}

/**
 * The container observed at (dim, pos) in a TargetView, as the player sees it: for a double
 * chest, both halves' stacks with combined slots (first half 0–26, second 27–53).
 * @returns {{ obs: object|null, half: number|null }}
 */
export async function containerAsShown(view, dim, pos) {
  const own = await view.blockEntityAt(dim, pos);
  const p = await chestPair(view.edition, view.world, dim, pos);
  if (!p) return { obs: own, half: null };
  const other = p.partner ? await view.blockEntityAt(dim, p.partner) : null;
  const shift = (list, h) => (list || []).map((s) => ({ ...s, slot: s.slot === null || s.slot === undefined ? s.slot : s.slot + 27 * h }));
  // ambiguous order: the chest read at (dim, pos) is put first; the caller must accept either half
  const h = p.ambiguous ? 0 : p.half;
  const items = [...shift(own?.facts?.items, h), ...shift(other?.facts?.items, 1 - h)];
  if (!own && !other) return { obs: null, half: p.half, ambiguous: !!p.ambiguous };
  return { obs: { ...(own || {}), facts: { ...(own?.facts || other.facts), items } }, half: p.half, ambiguous: !!p.ambiguous };
}
