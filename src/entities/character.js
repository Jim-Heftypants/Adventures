import classCreator from './entity';
import * as abilityObj from './abilities.js';

// console.log('ab list', abilityObj);
const abilityList = Object.values(abilityObj);
// console.log('ab array list', abilityObj)
// console.log(abilityList[0]);
const charAbilities = abilityList[0];
const warriorAbilities = charAbilities[0];
const clericAbilities = charAbilities[1];
const wizardAbilities = charAbilities[2];
const rogueAbilities = charAbilities[3];

const waAbNames = ['Heroic Strike'];
const cAbNames = ['Prayer of Healing'];
const wiAbNames = ['Fire Blast'];
const rAbNames = ['Poison Shiv'];

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
imgName
pos
defense
ab
abNames
specialEffect
*/

// tutorials
const tutorialWarrior = new classCreator('Warrior', 10, 100, 10, 1000, 8, true, "a1", [450, 500], 20, warriorAbilities, waAbNames);
const tutorialCleric = new classCreator('Cleric', 'infinite', 100, 10, 1500, -8, true, "a2", [200, 300], 10, clericAbilities, cAbNames);
const tutorialWizard = new classCreator('Wizard', "infinite", 100, 10, 2000, 16, true, "a3", [200, 600], 12, wizardAbilities, wiAbNames, wizardAttackEffect);
const tutorialRogue = new classCreator("Rogue", 10, 100, 10, 800, 8, true, "a4", [900, 200], 16, rogueAbilities, rAbNames);

// tank
const Warrior = new classCreator('Warrior', 10, 100, 10, 1000, 10, true, "a1", [100, 400], 20, warriorAbilities, waAbNames);

// heals
const Cleric = new classCreator('Cleric', 'infinite', 100, 10, 1500, -8, true, "a2", [400, 100], 10, clericAbilities, cAbNames);

// rdps
const Wizard = new classCreator('Wizard', "infinite", 100, 10, 2000, 20, true, "a3", [100, 100], 12, wizardAbilities, wiAbNames, wizardAttackEffect);

// mdps
const Rogue = new classCreator("Rogue", 10, 100, 10, 800, 10, true, "a4", [900, 500], 16, rogueAbilities, rAbNames)

// export const tutorialChars = [tutorialWarrior, tutorialCleric, tutorialWizard, tutorialRogue];
const charactersArr = [Warrior, Cleric, Wizard, Rogue];
export default charactersArr;