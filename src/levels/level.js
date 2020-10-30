// import * as charactersObj from '../entities/character';
import charactersArr from '../entities/character';
import * as enemiesObj from '../entities/enemy';

// const charactersArr = Object.values(charactersObj);
const enemiesArr = Object.values(enemiesObj);

class Level {
    constructor(name, enemyList, xp, message="", actionChanges=()=>{}, characterList=charactersArr) {
        this.name = name;
        this.enemyList = enemyList;
        this.xp = xp;
        this.message = message;
        this.action = actionChanges;
        this.characterList = characterList;
        // this.actionExpended = false;
    }
}

function modP(width, percent) {
    return (Math.floor(width * percent));
}

function applyMod(entity, mod, x=true) {
    const container = document.getElementById('game-container');
    const width = Math.floor(container.offsetWidth);
    const height = Math.floor(container.offsetHeight);
    if (x) {
        entity.pos[0] = modP(width, (mod/100));
        entity.basePos[0] = entity.pos[0];
    } else {
        entity.pos[1] = modP(height, (mod / 100));
        entity.basePos[1] = entity.pos[1];
    }
}

const firstFourActions = () => {
    applyMod(charactersArr[0], 35);
    applyMod(charactersArr[1], 15);
    applyMod(charactersArr[2], 15);
    applyMod(charactersArr[3], 55);
    applyMod(charactersArr[0], 55, false);
    applyMod(charactersArr[1], 33, false);
    applyMod(charactersArr[2], 66, false);
    applyMod(charactersArr[3], 22, false);

    applyMod(enemiesArr[0][0], 55);
    applyMod(enemiesArr[0][0], 55, false);
    applyMod(enemiesArr[1][0], 55);
    applyMod(enemiesArr[1][1], 75);
    applyMod(enemiesArr[1][0], 55, false);
    applyMod(enemiesArr[1][1], 33, false);
    applyMod(enemiesArr[2][2], 75);
    applyMod(enemiesArr[2][2], 66, false);
    applyMod(enemiesArr[3][3], 35);
    applyMod(enemiesArr[3][3], 22, false);
}

const actionFive = () => {
    // WaCWiR
    applyMod(charactersArr[0], 65);
    applyMod(charactersArr[1], 45);
    applyMod(charactersArr[2], 45);
    applyMod(charactersArr[3], 25);
    applyMod(charactersArr[0], 45, false);
    applyMod(charactersArr[1], 25, false);
    applyMod(charactersArr[2], 65, false);
    applyMod(charactersArr[3], 45, false);
    // WiRWaC
    applyMod(enemiesArr[4][0], 10);
    applyMod(enemiesArr[4][1], 15);
    applyMod(enemiesArr[4][2], 75);
    applyMod(enemiesArr[4][3], 80);
    applyMod(enemiesArr[4][0], 20, false);
    applyMod(enemiesArr[4][1], 65, false);
    applyMod(enemiesArr[4][2], 65, false);
    applyMod(enemiesArr[4][3], 20, false);
}
const actionSix = () => {
    // WaCWiR
    applyMod(charactersArr[0], 60);
    applyMod(charactersArr[1], 60);
    applyMod(charactersArr[2], 30);
    applyMod(charactersArr[3], 30);
    applyMod(charactersArr[0], 60, false);
    applyMod(charactersArr[1], 30, false);
    applyMod(charactersArr[2], 30, false);
    applyMod(charactersArr[3], 60, false);
    // WiRWaC
    applyMod(enemiesArr[5][0], 5);
    applyMod(enemiesArr[5][1], 45);
    applyMod(enemiesArr[5][2], 45);
    applyMod(enemiesArr[5][3], 85);
    applyMod(enemiesArr[5][0], 45, false);
    applyMod(enemiesArr[5][1], 10, false);
    applyMod(enemiesArr[5][2], 70, false);
    applyMod(enemiesArr[5][3], 45, false);
}
const actionSeven = () => {
    applyMod(charactersArr[0], 50);
    applyMod(charactersArr[1], 10);
    applyMod(charactersArr[2], 35);
    applyMod(charactersArr[3], 65);
    applyMod(charactersArr[0], 20, false);
    applyMod(charactersArr[1], 45, false);
    applyMod(charactersArr[2], 60, false);
    applyMod(charactersArr[3], 35, false);
    applyMod(enemiesArr[6][0], 25);
    applyMod(enemiesArr[6][1], 10);
    applyMod(enemiesArr[6][2], 80);
    applyMod(enemiesArr[6][3], 45);
    applyMod(enemiesArr[6][0], 15, false);
    applyMod(enemiesArr[6][1], 45, false);
    applyMod(enemiesArr[6][2], 45, false);
    applyMod(enemiesArr[6][3], 70, false);
}
const actionEight = () => {
    // WaCWiR
    applyMod(charactersArr[0], 60);
    applyMod(charactersArr[1], 60);
    applyMod(charactersArr[2], 30);
    applyMod(charactersArr[3], 30);
    applyMod(charactersArr[0], 60, false);
    applyMod(charactersArr[1], 30, false);
    applyMod(charactersArr[2], 30, false);
    applyMod(charactersArr[3], 60, false);
    // WiRWaC
    applyMod(enemiesArr[7][0], 45);
    applyMod(enemiesArr[7][1], 10);
    applyMod(enemiesArr[7][2], 80);
    applyMod(enemiesArr[7][3], 45);
    applyMod(enemiesArr[7][0], 15, false);
    applyMod(enemiesArr[7][1], 45, false);
    applyMod(enemiesArr[7][2], 45, false);
    applyMod(enemiesArr[7][3], 70, false);
}

export const levelOne = new Level('One', enemiesArr[0], 20, 
    "Click on the stick figure, the warrior, in black to select it. Then click on the red stick figure enemy to attack it or click anywhere on the map to move there. Once an action is performed, the character will keep doing it until given a new action.",
    firstFourActions, [charactersArr[0]]);
export const levelTwo = new Level('Two', enemiesArr[1], 80,
    "The character with a staff is a cleric healer. Click on it and then on an allied unit or itself to begin healing them. De-select a character without making an action by clicking the Red button on the top right. Defeat all enemies to clear the level.",
    firstFourActions, [charactersArr[0], charactersArr[1]]);
export const levelThree = new Level('Three', enemiesArr[2], 120,
    "The character with the blue hat, the wizard, can attack enemies from any range. Click on it then on an enemy to begin attacking immediately. \nAttacking an enemy with the Warrior will cause them to focus their attacks on him.",
    firstFourActions, [charactersArr[0], charactersArr[1], charactersArr[2]]);
export const levelFour = new Level('Four', enemiesArr[3], 240,
    "The newest character addition is the rogue with the daggers. Each character has a unique role. The Warrior is the best tank, the rogue the fastest attacker, the wizard the most versitile damage dealer, and the cleric the healer.",
    firstFourActions, charactersArr);
export const levelFive = new Level('Five', enemiesArr[4],  300,
    "The tutorial levels are over. Time for more of a challenge",
    actionFive);
export const levelSix = new Level('Six', enemiesArr[5], 375, "Wizards and Clerics", actionSix);
export const levelSeven = new Level('Seven', enemiesArr[6], 450, "All melee", actionSeven);
export const levelEight = new Level('Eight', enemiesArr[7], 700, "Fight yourself", actionEight);