// A world opened for evaluation, with lazily built indexes shared by all families.
import fs from 'node:fs';
import { javaEntity, bedrockEntity, javaBlockEntity, bedrockBlockEntity } from '../lib/facts.mjs';
import { parseNbt, plain, get } from '../lib/nbt.mjs';
import { DIM_NUM, DIM_NAME } from '../families/block.mjs';

export class TargetView {
  constructor({ edition, world, opens = true, label, run = null, normalize = null }) {
    Object.assign(this, { edition, world: opens ? world : null, opens, label, run, normalize });
    this._entities = null;
  }

  /** Every entity: [{ facts, tag, dim, origin }] (Java: storage + proto-chunk; Bedrock: actors). */
  async entitiesIndex() {
    if (this._entities || !this.world) return this._entities || [];
    const out = [];
    if (this.edition === 'java') {
      // Rule 37 (audit 2026-09-25): a rider is stored INSIDE its vehicle (`Passengers`),
      // not next to it. It is an entity of the world all the same — a skeleton on its
      // skeleton horse, a jockey, a mob in a boat — and is read as one.
      const withRiders = (tag, origin, dim) => {
        out.push({ facts: javaEntity(tag), tag, dim, origin });
        const ps = get(tag, 'Passengers');
        for (const p of ps?.value?.value || []) withRiders({ type: 'compound', value: p }, 'passenger', dim);
      };
      for (const d of this.world.dimensions()) {
        for (const e of await this.world.entities(d.id)) withRiders(e.tag, e.origin, d.id);
      }
      // REPRESENTATION: Java keeps a parrot sitting on a player's shoulder INSIDE the player
      // data (ShoulderEntityLeft/Right); Bedrock keeps it as an actor riding the player. It is
      // read back as an entity at shoulder height (feet + 1.4).
      for (const pf of this.world.playerFiles()) {
        const tag = await parseNbt(fs.readFileSync(pf.file));
        const pos = (plain(get(tag, 'Pos')) || []).map(Number);
        for (const k of ['ShoulderEntityLeft', 'ShoulderEntityRight']) {
          const sh = get(tag, k);
          if (!sh || sh.type !== 'compound' || !sh.value.id) continue;
          const facts = javaEntity(sh);
          facts.pos = [pos[0], pos[1] + 1.4, pos[2]];
          out.push({ facts, tag: sh, dim: plain(get(tag, 'Dimension')) || 'minecraft:overworld', origin: 'player_shoulder' });
        }
      }
    } else {
      // Rule 36 (audit 2026-09-25): ONE actor record may be listed by several chunks'
      // actor lists (`digp`) — GURREN has 83 such actors. It is one entity: counted once.
      const seen = new Set();
      for (const a of this.world.allActors()) {
        if (!a.tag) continue;
        if (a.uid && a.storage === 'actorprefix') {
          if (seen.has(a.uid)) continue;
          seen.add(a.uid);
        }
        out.push({ facts: bedrockEntity(a.tag), tag: a.tag, dim: DIM_NAME[a.dim] ?? (a.dim === null ? 'unknown' : `dim${a.dim}`), origin: a.storage, uid: a.uid });
      }
    }
    this._entities = out;
    return out;
  }

  async blockEntityAt(dim, pos) {
    if (!this.world) return null;
    if (this.edition === 'java') {
      const t = await this.world.blockEntityAt(dim, ...pos);
      return t ? { tag: t, facts: javaBlockEntity(t) } : null;
    }
    const d = DIM_NUM[dim];
    if (d === undefined) return null;
    const t = this.world.blockEntityAt(d, ...pos);
    return t ? { tag: t, facts: bedrockBlockEntity(t) } : null;
  }
}
