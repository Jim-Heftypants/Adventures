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

// rdps
const tutorialWizard = new classCreator('EWizard', 'infinite', 60, 10, 1500, 8, false, 'e1', [1000, 600], 8);
const ghettoWizard = new classCreator('EWizard', 'infinite', 60, 10, 1500, 12, false, 'e1', [500, 500], 8);
const wizard2 = new classCreator('EWizard', 'infinite', 70, 10, 1500, 13, false, 'e1', [500, 500], 8);
const wizard3 = new classCreator('EWizard', 'infinite', 70, 10, 1500, 13, false, 'e2', [700, 200], 8);
const EWizard = new classCreator('EWizard', 'infinite', 100, 10, 2000, 20, false, "e1", [500, 500], 15);

// heals
const tutorialCleric = new classCreator('ECleric', 'infinite', 60, 10, 2000, -8, false, "e4", [1000, 300], 8)
const dumbCleric = new classCreator('ECleric', 'infinite', 60, 10, 2000, -10, false, "e4", [1000, 100], 8);
const cleric2 = new classCreator('ECleric', 'infinite', 70, 10, 1750, -14, false, "e4", [1000, 100], 8);
const cleric3 = new classCreator('ECleric', 'infinite', 70, 10, 1750, -14, false, "e3", [300, 400], 8);
const ECleric = new classCreator('ECleric', 'infinite', 100, 10, 1500, -10, false, "e4", [1000, 100], 10);

// mdps
const tutorialRogue = new classCreator("ERogue", 10, 60, 10, 1200, 6, false, "e2", [700, 200], 14);
const loserRogue = new classCreator("ERogue", 10, 60, 10, 1200, 9, false, "e2", [700, 200], 14);
const rogue2 = new classCreator("ERogue", 10, 60, 10, 1200, 9, false, "e2", [700, 200], 14);
const rogue3 = new classCreator("ERogue", 10, 60, 10, 1200, 9, false, "e1", [500, 500], 14);
const ERogue = new classCreator("ERogue", 10, 100, 10, 800, 10, false, "e2", [700, 200], 18);

// tank
const punchingBag = new classCreator('EWarrior', 10, 70, 10, 1000, 1, false, "e3", [650, 500], 20);
const tutorialWarrior = new classCreator('EWarrior', 10, 100, 10, 1000, 6, false, "e3", [650, 500], 20);
const weakWarrior = new classCreator('EWarrior', 10, 60, 10, 1000, 8, false, "e3", [300, 400], 20);
const warrior2 = new classCreator('EWarrior', 10, 60, 10, 1000, 8, false, "e3", [300, 400], 20);
const warrior3 = new classCreator('EWarrior', 10, 60, 10, 1000, 8, false, "e4", [1000, 100], 20);
const EWarrior = new classCreator('EWarrior', 10, 120, 10, 1000, 10, false, "e3", [300, 400], 20);

// level 1
export const intro = [punchingBag];

// level 2
export const healIntro = [tutorialWarrior, tutorialCleric];

// level 3
export const rangedIntro = [tutorialWarrior, tutorialCleric, tutorialWizard];

// level 4
export const puttinItAllTogetha = [tutorialWarrior, tutorialCleric, tutorialWizard, tutorialRogue];

// level 5
export const ezDoppelganger = [ghettoWizard, loserRogue, weakWarrior, dumbCleric];

// level 6
export const level3 = [wizard2, wizard3, cleric2, cleric3];

// level 7
export const level2 = [rogue2, rogue3, warrior2, warrior3];

// level 8
export const doppelganger = [EWizard, ERogue, EWarrior, ECleric];
