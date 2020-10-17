import classCreator from './entity';
import * as abilityObj from './abilities.js';

// console.log('ab list', abilityObj);
const abilityList = Object.values(abilityObj);
// console.log('ab array list', abilityObj)
// console.log(abilityList[0]);
const warriorAbilities = abilityList[0];
const clericAbilities = abilityList[1];
const wizardAbilities = abilityList[2];
const rogueAbilities = abilityList[3];

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

// tutorials
const tutorialWarrior = new classCreator('Warrior', 10, 100, 10, 1000, 10, true, "a1", [450, 500], 20, warriorAbilities);
const tutorialCleric = new classCreator('Cleric', 'infinite', 100, 10, 1500, -10, true, "a2", [200, 300], 10, clericAbilities);
const tutorialWizard = new classCreator('Wizard', "infinite", 100, 10, 2000, 20, true, "a3", [200, 600], 12, wizardAbilities);
const tutorialRogue = new classCreator("Rogue", 10, 100, 10, 800, 10, true, "a4", [900, 200], 16, rogueAbilities)

// tank
const Warrior = new classCreator('Warrior', 10, 100, 10, 1000, 10, true, "a1", [100, 400], 20);

// heals
const Cleric = new classCreator('Cleric', 'infinite', 100, 10, 1500, -10, true, "a2", [400, 100], 10);

// rdps
const Wizard = new classCreator('Wizard', "infinite", 100, 10, 2000, 20, true, "a3", [100, 100], 12);

// mdps
const Rogue = new classCreator("Rogue", 10, 100, 10, 800, 10, true, "a4", [900, 500], 16)

export const tutorialChars = [tutorialWarrior, tutorialCleric, tutorialWizard, tutorialRogue];
export const standardChars = [Warrior, Cleric, Wizard, Rogue];