// import * as charactersObj from '../entities/character';
import charactersArr from '../entities/character';
import * as enemiesObj from '../entities/enemy';
// console.log(enemiesObj);

const enemiesList = enemiesObj["allEnemies"];

// const charactersArr = Object.values(charactersObj);
const enemiesArr = Object.values(enemiesObj);
// console.log(enemiesArr);

const classCreator = enemiesObj["classCreator"];
// test
class Level {
    constructor(name, level, enemyList, message="", actionChanges=()=>{}, shouldSetLevels=false, characterList=null) {
        this.name = name;
        this.level = level;
        this.enemyList = enemyList;
        this.message = message;
        this.action = actionChanges;
        this.characterList = characterList;
        this.shouldSetLevels = shouldSetLevels;
        // this.actionExpended = false;
    }

    setEnemyLevels(level) {
        for (let i = 0; i < this.enemyList.length; i++) {
            this.enemyList[i].setLevel(level);
        }
    }
}

function modP(width, percent) {
    return (Math.floor(width * percent));
}

function applyMod(entity, mod, x = true) {
    const container = document.getElementById('game-container');
    const width = Math.floor(container.offsetWidth);
    const height = Math.floor(container.offsetHeight);
    if (x) {
        entity.pos[0] = modP(width, (mod / 100));
        entity.basePos[0] = entity.pos[0];
    } else {
        entity.pos[1] = modP(height, (mod / 100));
        entity.basePos[1] = entity.pos[1];
    }
}

const defaultAction = (cArr, eArr) => {
    // console.log(cArr, eArr);
    applyMod(cArr[0], 60);
    applyMod(cArr[1], 50);
    applyMod(cArr[2], 40);
    applyMod(cArr[3], 30);
    applyMod(cArr[0], 25, false);
    applyMod(cArr[1], 55, false);
    applyMod(cArr[2], 25, false);
    applyMod(cArr[3], 55, false);
    return true;
}

const tutorialActions = () => {
    const cArr = charactersArr.slice(0, 4);
    const eArr = enemiesArr.slice(0, 4);
    applyMod(cArr[0], 35);
    applyMod(cArr[1], 15);
    applyMod(cArr[2], 15);
    applyMod(cArr[3], 55);
    applyMod(cArr[0], 55, false);
    applyMod(cArr[1], 33, false);
    applyMod(cArr[2], 66, false);
    applyMod(cArr[3], 22, false);

    applyMod(eArr[0][0], 55);
    applyMod(eArr[0][0], 55, false);
    applyMod(eArr[3][0], 55);
    applyMod(eArr[3][1], 75);
    applyMod(eArr[3][0], 55, false);
    applyMod(eArr[3][1], 33, false);
    applyMod(eArr[3][2], 75);
    applyMod(eArr[3][2], 66, false);
    applyMod(eArr[3][3], 35);
    applyMod(eArr[3][3], 22, false);
    return false;
}

const actionFive = (cArr, eArr) => {
    // WaCWiR
    applyMod(cArr[0], 65);
    applyMod(cArr[1], 45);
    applyMod(cArr[2], 45);
    applyMod(cArr[3], 25);
    applyMod(cArr[0], 45, false);
    applyMod(cArr[1], 25, false);
    applyMod(cArr[2], 65, false);
    applyMod(cArr[3], 45, false);
    // WiRWaC
    applyMod(eArr[0], 10);
    applyMod(eArr[1], 15);
    applyMod(eArr[2], 75);
    applyMod(eArr[3], 80);
    applyMod(eArr[0], 20, false);
    applyMod(eArr[1], 65, false);
    applyMod(eArr[2], 65, false);
    applyMod(eArr[3], 20, false);
    return false;
}
const actionSix = (cArr, eArr) => {
    // WaCWiR
    applyMod(cArr[0], 60);
    applyMod(cArr[1], 60);
    applyMod(cArr[2], 30);
    applyMod(cArr[3], 30);
    applyMod(cArr[0], 60, false);
    applyMod(cArr[1], 30, false);
    applyMod(cArr[2], 30, false);
    applyMod(cArr[3], 60, false);
    // WiRWaC
    applyMod(eArr[0], 5);
    applyMod(eArr[1], 45);
    applyMod(eArr[2], 45);
    applyMod(eArr[3], 85);
    applyMod(eArr[0], 45, false);
    applyMod(eArr[1], 10, false);
    applyMod(eArr[2], 70, false);
    applyMod(eArr[3], 45, false);
    return false;
}
const actionSeven = (cArr, eArr) => {
    applyMod(cArr[0], 50);
    applyMod(cArr[1], 10);
    applyMod(cArr[2], 35);
    applyMod(cArr[3], 65);
    applyMod(cArr[0], 20, false);
    applyMod(cArr[1], 45, false);
    applyMod(cArr[2], 60, false);
    applyMod(cArr[3], 35, false);
    applyMod(eArr[0], 25);
    applyMod(eArr[1], 10);
    applyMod(eArr[2], 80);
    applyMod(eArr[3], 45);
    applyMod(eArr[0], 15, false);
    applyMod(eArr[1], 45, false);
    applyMod(eArr[2], 45, false);
    applyMod(eArr[3], 70, false);
    return false;
}
const actionEight = (cArr, eArr) => {
    // WaCWiR
    applyMod(cArr[0], 60);
    applyMod(cArr[1], 60);
    applyMod(cArr[2], 30);
    applyMod(cArr[3], 30);
    applyMod(cArr[0], 60, false);
    applyMod(cArr[1], 30, false);
    applyMod(cArr[2], 30, false);
    applyMod(cArr[3], 60, false);
    // WiRWaC
    applyMod(eArr[0], 45);
    applyMod(eArr[1], 10);
    applyMod(eArr[2], 80);
    applyMod(eArr[3], 45);
    applyMod(eArr[0], 15, false);
    applyMod(eArr[1], 45, false);
    applyMod(eArr[2], 45, false);
    applyMod(eArr[3], 70, false);
    return false;
}

function makeRandomLevel(levelNum) {
    const el = enemiesList.slice();
    const enemies = [];
    for (let i = 0; i < 4; i++) {
        let idx = Math.floor(Math.random() * enemiesList.length);
        if (idx > el.length) { idx++; }
        const enemy = new classCreator(
            el[idx].klass,
            el[idx].range,
            el[idx].trueBaseHp,
            el[idx].baseMS,
            el[idx].baseAS,
            el[idx].trueBaseDMG,
            el[idx].allied,
            [0, 0],
            el[idx].trueBaseDefense,
            el[idx].attackOverlay,
            el[idx].extraAttackAnimation,
            null,
            null
        )
        enemies.push(enemy); 
    }
    const lev = new Level(`Level ${levelNum}`, levelNum, enemies, "", defaultAction, true);
    return lev;
}


export const levelZero = new Level('Zero', 0, enemiesList, "", null, false, charactersArr);
export const levelOne = new Level('Warrior', 1, enemiesArr[0],
    "Click on the stick figure, the warrior, in black to select it. Then click on the red stick figure enemy to attack it or click anywhere on the map to move there. Once an action is performed, the character will keep doing it until given a new action.",
    tutorialActions, false, [charactersArr[0]]);
export const levelTwo = new Level('Cleric', 2, enemiesArr[1],
    "The character with a staff is a cleric healer. Click on it and then on an allied unit or itself to begin healing them. De-select a character without making an action by clicking the Red button on the top right. Defeat all enemies to clear the level.",
    tutorialActions, false, [charactersArr[0], charactersArr[1]]);
export const levelThree = new Level('Wizard', 3, enemiesArr[2],
    "The character with the blue hat, the wizard, can attack enemies from any range. Click on it then on an enemy to begin attacking immediately. \nAttacking an enemy with the Warrior will cause them to focus their attacks on him.",
    tutorialActions, false, [charactersArr[0], charactersArr[1], charactersArr[2]]);
export const levelFour = new Level('Rogue', 4, enemiesArr[3],
    "The newest character addition is the rogue with the daggers. Each character has a unique role. The Warrior is the best tank, the rogue the fastest attacker, the wizard the most versitile damage dealer, and the cleric the healer.",
    tutorialActions, false, [charactersArr[0], charactersArr[1], charactersArr[2], charactersArr[3]]);
export const levelFive = new Level('Level Five', 5, enemiesArr[4],
    "The tutorial levels are over. Time for more of a challenge",
    actionFive);
export const levelSix = new Level('Magic', 6, enemiesArr[5], "Wizards and Clerics", actionSix);
export const levelSeven = new Level('Melee', 7, enemiesArr[6], "All melee", actionSeven);
export const levelEight = new Level('Doppel-ganger', 8, enemiesArr[7], "Fight copies of yourself", actionEight);
// export const levelNine = new Level('Level Nine', 9, enemiesList.slice(1, 5), "", defaultAction, true);
// export const levelTen = makeRandomLevel(10);