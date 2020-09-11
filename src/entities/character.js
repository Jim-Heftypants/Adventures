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
export const Wizard = new classCreator('Wizard', "infinite", 100, 7, 2000, 15, true, "wizard", [100, 100], 14);

// heals
export const Priest = new classCreator('Cleric', 'infinite', 100, 10, 1500, -10, true, "cleric", [400, 100], 10);

// mdps
export const Rogue = new classCreator("Rogue", 10, 100, 10, 800, 10, true, "rogue", [900, 500], 18)

// tank
export const Warrior = new classCreator('Warrior', 10, 100, 10, 1000, 10, true, "warrior", [100, 400], 20);