import classCreator from './entity.js';

/*
className
range
maxHP
MS
AS
DMG
false
pos?
*/

// MS is probly wacky af rn => movement every .1 seconds
const SkeletonArcher = new classCreator.Entity('SkeletonArcher', 'infinite', 100, 10, 3000, 30, false, [20, 20]);