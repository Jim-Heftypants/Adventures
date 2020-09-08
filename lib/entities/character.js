import classCreator from './entity';

/*
className
range
maxHP
MS
AS
DMG
true
pos?
*/

// MS is probly wacky af rn => movement every .1 seconds

// rdps
const Warlock = new classCreator.Entity('Warlock', 'infinite', 100, 10, 2000, 15, true, [100, 100]);

// heals
const Priest = new classCreator.Entity('Priest', 'infinite', 100, 10, 1500, -10, true, [200, 200]);

// mdps
const Warrior = new classCreator.Entity('Warrior', 10, 100, 10, 1000, 10, true, [-50, -50]);