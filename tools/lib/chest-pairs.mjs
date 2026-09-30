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
    if (!d) return null;
    const pp = [x + d[0], y, z + d[1]];
    const pb = await world.blockAt(dim, ...pp);
    if (!pb || pb.name !== b.name || pb.props?.type !== (t === 'left' ? 'right' : 'left')) return null;
    return { half: t === 'right' ? 0 : 1, partner: pp };
  }
  const dn = DIM_NUM[dim];
  if (dn === undefined) return null;
  const be = world.blockEntityAt(dn, x, y, z);
  const v = be?.value;
  if (!v || v.id?.value !== 'Chest') return null;
  const px = plainNum(v.pairx), pz = plainNum(v.pairz);
  if (px !== null && pz !== null) {
    if (Math.abs(px - x) + Math.abs(pz - z) !== 1) return null;
    const p = world.blockEntityAt(dn, px, y, pz);
    if (p?.value?.id?.value !== 'Chest') return null;
    return { half: plainNum(v.pairlead) === 1 ? 0 : 1, partner: [px, y, pz] };
  }
  for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const p = world.blockEntityAt(dn, x + dx, y, z + dz)?.value;
    if (p?.id?.value === 'Chest' && plainNum(p.pairx) === x && plainNum(p.pairz) === z) {
      return { half: plainNum(p.pairlead) === 1 ? 1 : 0, partner: [x + dx, y, z + dz] };
    }
  }
  return null;
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
  const other = await view.blockEntityAt(dim, p.partner);
  const shift = (list, h) => (list || []).map((s) => ({ ...s, slot: s.slot === null || s.slot === undefined ? s.slot : s.slot + 27 * h }));
  const items = [...shift(own?.facts?.items, p.half), ...shift(other?.facts?.items, 1 - p.half)];
  if (!own && !other) return { obs: null, half: p.half };
  return { obs: { ...(own || {}), facts: { ...(own?.facts || other.facts), items } }, half: p.half };
}
