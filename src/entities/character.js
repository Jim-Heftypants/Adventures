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

// tutorials
const tutorialWarrior = new classCreator('Warrior', 10, 100, 10, 1000, 10, true, "a3", [450, 500], 20);
const tutorialCleric = new classCreator('Cleric', 'infinite', 100, 10, 1500, -10, true, "a4", [200, 300], 10);
const tutorialWizard = new classCreator('Wizard', "infinite", 100, 10, 2000, 20, true, "a1", [200, 600], 12);
const tutorialRogue = new classCreator("Rogue", 10, 100, 10, 800, 10, true, "a2", [900, 200], 16)

// tank
const Warrior = new classCreator('Warrior', 10, 100, 10, 1000, 10, true, "a3", [100, 400], 20);

// heals
const Cleric = new classCreator('Cleric', 'infinite', 100, 10, 1500, -10, true, "a4", [400, 100], 10);

// rdps
const Wizard = new classCreator('Wizard', "infinite", 100, 10, 2000, 20, true, "a1", [100, 100], 12);

// mdps
const Rogue = new classCreator("Rogue", 10, 100, 10, 800, 10, true, "a2", [900, 500], 16)

export const tutorialChars = [tutorialWarrior, tutorialCleric, tutorialWizard, tutorialRogue];
export const standardChars = [Warrior, Cleric, Wizard, Rogue];