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
const paladinAbilities = charAbilities[4];

const waAbNames = ['Concussive Blow', 'Charge'];
const cAbNames = ['Prayer of Healing', "Protection"];
const wiAbNames = ['Fire Bomb', 'Freeze'];
const rAbNames = ['Poison Shiv', 'Backstab'];
const pAbNames = ['Word of Healing', 'Holy Sword'];

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

// tank
const Warrior = new classCreator('Warrior', 10, 100, 10, 1000, 10, true, [100, 400], 20, null, null, warriorAbilities, waAbNames);
const Paladin = new classCreator('Paladin', 10, 100, 10, 1000, 10, true, [100, 400], 20, null, null, paladinAbilities, pAbNames);

// heals
const Cleric = new classCreator('Cleric', 'infinite', 100, 10, 1500, -8, true, [400, 100], 12, 2, null, clericAbilities, cAbNames);

// rdps
const Wizard = new classCreator('Wizard', "infinite", 100, 10, 2000, 20, true, [100, 100], 14, null, wizardAttackEffect, wizardAbilities, wiAbNames);

// mdps
const Rogue = new classCreator("Rogue", 10, 100, 10, 800, 10, true, [900, 500], 16, null, null, rogueAbilities, rAbNames);

const charactersArr = [Warrior, Cleric, Wizard, Rogue, Paladin];
export default charactersArr;