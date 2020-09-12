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

// rdps
export const EWizard = new classCreator('EWizard', 'infinite', 100, 10, 2000, 20, false, "ewizard", [500, 500], 15);

// heals
export const EPriest = new classCreator('ECleric', 'infinite', 100, 10, 1500, -10, false, "ecleric", [1000, 100], 10);

// mdps
export const ERogue = new classCreator("ERogue", 10, 100, 10, 800, 10, false, "erogue", [700, 200], 18)

// tank
export const EWarrior = new classCreator('EWarrior', 10, 100, 10, 1000, 10, false, "ewarrior", [300, 400], 20);