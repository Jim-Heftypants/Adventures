import classCreator from './entity.js';
import * as abilityObj from './abilities.js';

const abilityList = Object.values(abilityObj);

const specialAttackEffects = abilityList[1];
const wizardAttackEffect = specialAttackEffects[0];

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
ab
abNames
specialEffect
*/

// rdps
const tutorialWizard = new classCreator('EWizard', 'infinite', 60, 10, 1500, 7, false, 'e3', [1000, 600], 8, null, null, wizardAttackEffect);
const ghettoWizard = new classCreator('EWizard', 'infinite', 60, 10, 1500, 12, false, 'e3', [500, 500], 8, null, null, wizardAttackEffect);
const wizard2 = new classCreator('EWizard', 'infinite', 70, 10, 1500, 13, false, 'e3', [500, 500], 8, null, null, wizardAttackEffect);
const wizard3 = new classCreator('EWizard', 'infinite', 70, 10, 1500, 13, false, 'e1', [700, 200], 8, null, null, wizardAttackEffect); // fix
const EWizard = new classCreator('EWizard', 'infinite', 100, 10, 2000, 20, false, "e3", [500, 500], 12, null, null, wizardAttackEffect);

// heals
const tutorialCleric = new classCreator('ECleric', 'infinite', 60, 10, 2000, -7, false, "e2", [1000, 300], 8)
const dumbCleric = new classCreator('ECleric', 'infinite', 60, 10, 2000, -8, false, "e2", [1000, 100], 8);
const cleric2 = new classCreator('ECleric', 'infinite', 70, 10, 1750, -11, false, "e2", [1000, 100], 8);
const cleric3 = new classCreator('ECleric', 'infinite', 70, 10, 1750, -11, false, "e4", [300, 400], 8); // fix
const ECleric = new classCreator('ECleric', 'infinite', 100, 10, 1500, -8, false, "e2", [1000, 100], 10);

// mdps
const tutorialRogue = new classCreator("ERogue", 10, 60, 10, 1200, 6, false, "e4", [700, 200], 14);
const loserRogue = new classCreator("ERogue", 10, 60, 10, 1200, 8, false, "e4", [700, 200], 14);
const rogue2 = new classCreator("ERogue", 10, 60, 10, 1200, 8, false, "e4", [700, 200], 14);
const rogue3 = new classCreator("ERogue", 10, 60, 10, 1200, 8, false, "e2", [500, 500], 14);
const ERogue = new classCreator("ERogue", 10, 100, 10, 800, 10, false, "e4", [700, 200], 16);

// tank
const punchingBag = new classCreator('EWarrior', 10, 50, 10, 1000, 1, false, "e1", [650, 500], 20);
const tutorialWarrior = new classCreator('EWarrior', 10, 80, 10, 1000, 6, false, "e1", [650, 500], 20);
const weakWarrior = new classCreator('EWarrior', 10, 60, 10, 1000, 8, false, "e1", [300, 400], 20);
const warrior2 = new classCreator('EWarrior', 10, 60, 10, 1000, 8, false, "e1", [300, 400], 20);
const warrior3 = new classCreator('EWarrior', 10, 60, 10, 1000, 8, false, "e3", [1000, 100], 20); // fix
const EWarrior = new classCreator('EWarrior', 10, 120, 10, 1000, 10, false, "e1", [300, 400], 20);

// level 1
export const intro = [punchingBag];

// level 2
export const healIntro = [tutorialWarrior, tutorialCleric];

// level 3
export const rangedIntro = [tutorialWarrior, tutorialCleric, tutorialWizard];

// level 4
export const puttinItAllTogetha = [tutorialWarrior, tutorialCleric, tutorialWizard, tutorialRogue];

// level 5
export const ezDoppelganger = [weakWarrior, dumbCleric, ghettoWizard, loserRogue];

// level 6
export const level3 = [wizard2, wizard3, cleric2, cleric3];

// level 7
export const level2 = [rogue2, rogue3, warrior2, warrior3];

// level 8
export const doppelganger = [EWarrior, ECleric, EWizard, ERogue];
