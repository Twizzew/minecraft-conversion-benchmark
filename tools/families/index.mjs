// Families in evaluation order. Adding a family (or changing a rule) after a result has
// been published requires a new MCCB version (METHODOLOGY.md §8).
import * as block from './block.mjs';
import * as blockEntity from './block_entity.mjs';
import * as itemStack from './item_stack.mjs';
import * as entity from './entity.mjs';
import * as world from './world.mjs';
import * as scoreboard from './scoreboard.mjs';
import * as customDimension from './custom_dimension.mjs';
import * as player from './player.mjs';
import * as structure from './structure.mjs';

export const FAMILIES = [
  { name: 'block', ...block },
  { name: 'block_entity', ...blockEntity },
  { name: 'item_stack', ...itemStack },
  { name: 'entity', ...entity },
  { name: 'world', ...world },
  { name: 'scoreboard', ...scoreboard },
  { name: 'custom_dimension', ...customDimension },
  { name: 'player', ...player },
  { name: 'structure', ...structure },
];
