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
pos?
*/

// MS is probly wacky af rn => movement every .1 seconds

// rdps
const lockImg = "kelpy";
// let Warlock;
// lockImg.addEventListener("load", () => {
//     Warlock = new classCreator('Warlock', 'infinite', 100, 10, 2000, 15, true, lockImg, [100, 100]);
// })
export const Warlock = new classCreator('Warlock', 'infinite', 100, 10, 2000, 15, true, lockImg, [100, 100]);;

// heals
export const Priest = new classCreator('Priest', 'infinite', 100, 10, 1500, -10, true, "", [200, 200]);

// mdps
export const Warrior = new classCreator('Warrior', 10, 100, 10, 1000, 10, true, "", [-50, -50]);