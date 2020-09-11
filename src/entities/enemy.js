import classCreator from './entity.js';

/*
className
range
maxHP
MS
AS
DMG
false
pos
defense
*/

const skeletonArcherImg = "squilliam";
export const SkeletonArcher = new classCreator('SkeletonArcher', 'infinite', 100, 10, 3000, 30, false, skeletonArcherImg, [500, 500], 15);