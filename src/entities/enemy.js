import classCreator from './entity.js';

/*
className
range
maxHP
MS
AS
DMG
false
img
pos
defense
*/

// 

// rdps
const ghettoWizard = new classCreator('EWizard', 'infinite', 1, 10, 1500, 12, false, 'e1', [500, 500], 8);
const EWizard = new classCreator('EWizard', 'infinite', 100, 10, 2000, 20, false, "e1", [500, 500], 15);

// heals
const dumbCleric = new classCreator('ECleric', 'infinite', 1, 10, 2000, -10, false, "e4", [1000, 100], 8);
const ECleric = new classCreator('ECleric', 'infinite', 100, 10, 1500, -10, false, "e4", [1000, 100], 10);

// mdps
const loserRogue = new classCreator("ERogue", 10, 1, 10, 1200, 9, false, "e2", [700, 200], 14);
const ERogue = new classCreator("ERogue", 10, 100, 10, 800, 10, false, "e2", [700, 200], 18);

// tank
const weakWarrior = new classCreator('EWarrior', 10, 1, 10, 1000, 8, false, "e3", [300, 400], 20);
const EWarrior = new classCreator('EWarrior', 10, 120, 10, 1000, 10, false, "e3", [300, 400], 20);

// level 1
export const ezMode = [ghettoWizard, loserRogue, weakWarrior, dumbCleric];


// level 4
export const doppelganger = [EWizard, ERogue, EWarrior, ECleric];
