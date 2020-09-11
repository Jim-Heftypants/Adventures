import classCreator from './entity';

/*
className
range
maxHP
MS
AS
DMG
true
img
pos
defense
*/

// rdps
const lockImg = "kelpy";
export const Warlock = new classCreator('Warlock', 10, 100, 7, 2000, 15, true, lockImg, [100, 100], 28);

// heals
export const Priest = new classCreator('Priest', 'infinite', 100, 10, 1500, -10, true, "", [200, 200], 10);

// mdps
export const Warrior = new classCreator('Warrior', 10, 100, 10, 1000, 10, true, "", [150, 150], 20);