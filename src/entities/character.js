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

const waAbNames = ['Concussive Blow'];
const cAbNames = ['Prayer of Healing'];
const wiAbNames = ['Fire Bomb'];
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
hasOverlay? 1=self 2=target
specialEffect
ab
abNames
*/

// tank
const Warrior = new classCreator('Warrior', 10, 100, 10, 1000, 10, true, "a1", [100, 400], 20, null, null, warriorAbilities, waAbNames);

// heals
const Cleric = new classCreator('Cleric', 'infinite', 100, 10, 1500, -8, true, "a2", [400, 100], 12, 2, null, clericAbilities, cAbNames);

// rdps
const Wizard = new classCreator('Wizard', "infinite", 100, 10, 2000, 20, true, "a3", [100, 100], 14, null, wizardAttackEffect, wizardAbilities, wiAbNames);

// mdps
const Rogue = new classCreator("Rogue", 10, 100, 10, 800, 10, true, "a4", [900, 500], 16, null, null, rogueAbilities, rAbNames);

const charactersArr = [Warrior, Cleric, Wizard, Rogue];
export default charactersArr;