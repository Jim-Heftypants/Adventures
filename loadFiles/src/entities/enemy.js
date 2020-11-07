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
true
pos
defense
hasOverlay? 1=self 2=target
specialEffect
ab
abNames
*/

// rdps
const tutorialWizard = new classCreator('EWizard', 'infinite', 60, 10, 1500, 7, false, [1000, 600], 8, null, wizardAttackEffect);
const ghettoWizard = new classCreator('EWizard', 'infinite', 60, 10, 1500, 12, false, [500, 500], 8, null, wizardAttackEffect);
const wizard2 = new classCreator('EWizard', 'infinite', 70, 10, 1500, 13, false, [500, 500], 14, null, wizardAttackEffect);
const wizard3 = new classCreator('EWizard', 'infinite', 70, 10, 1500, 13, false, [700, 200], 14, null, wizardAttackEffect); // fix
const EWizard = new classCreator('EWizard', 'infinite', 100, 10, 2000, 20, false, [500, 500], 14, null, wizardAttackEffect);

// heals
const tutorialCleric = new classCreator('ECleric', 'infinite', 100, 10, 2000, -7, false, [1000, 300], 8, 2)
const dumbCleric = new classCreator('ECleric', 'infinite', 100, 10, 2000, -8, false, [1000, 100], 8, 2);
const cleric2 = new classCreator('ECleric', 'infinite', 100, 10, 1750, -11, false, [1000, 100], 12, 2);
const cleric3 = new classCreator('ECleric', 'infinite', 100, 10, 1750, -11, false, [300, 400], 12, 2);
const ECleric = new classCreator('ECleric', 'infinite', 100, 10, 1500, -8, false, [1000, 100], 12, 2);

// mdps
const tutorialRogue = new classCreator("ERogue", 10, 80, 10, 1200, 6, false, [700, 200], 14);
const loserRogue = new classCreator("ERogue", 10, 80, 10, 1200, 8, false, [700, 200], 14);
const rogue2 = new classCreator("ERogue", 10, 80, 10, 1200, 8, false, [700, 200], 14);
const rogue3 = new classCreator("ERogue", 10, 80, 10, 1200, 8, false, [500, 500], 14);
const ERogue = new classCreator("ERogue", 10, 100, 10, 800, 10, false, [700, 200], 16);

// tank
const punchingBag = new classCreator('EWarrior', 10, 50, 10, 1000, 1, false, [650, 500], 20);
const tutorialWarrior = new classCreator('EWarrior', 10, 80, 10, 1000, 6, false, [650, 500], 20);
const weakWarrior = new classCreator('EWarrior', 10, 80, 10, 1000, 8, false, [300, 400], 20);
const warrior2 = new classCreator('EWarrior', 10, 80, 10, 1000, 8, false, [300, 400], 20);
const warrior3 = new classCreator('EWarrior', 10, 80, 10, 1000, 8, false, [1000, 100], 20);
const EWarrior = new classCreator('EWarrior', 10, 110, 10, 1000, 10, false, [300, 400], 20);

// paladin
const EPaladin = new classCreator('EPaladin', 10, 100, 10, 1000, 10, false, [300, 400], 20);

// classCreator
export {classCreator};

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

// all enemies
export const allEnemies = [EWarrior, ECleric, EWizard, ERogue, EPaladin];