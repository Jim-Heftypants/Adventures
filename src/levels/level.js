import * as charactersObj from '../entities/character';
import * as enemiesObj from '../entities/enemy';

const chars = Object.values(charactersObj);
const charactersArr = chars.slice(4);
const enemiesArr = Object.values(enemiesObj);

class Level {
    constructor(name, enemyList, message="", characterList=charactersArr) {
        this.name = name;
        this.enemyList = enemyList;
        this.message = message;
        this.characterList = characterList;
    }
}

export const levelOne = new Level('One', enemiesArr[0], 
"Click on the stick figure, the warrior, in black to select it. Then click on the red stick figure enemy to attack it or click anywhere on the map to move there. Once an action is performed, the character is de-selected.",
 [chars[0]]);
export const levelTwo = new Level('Two', enemiesArr[1],
"The character with a staff is a cleric healer. Click on it and then on an allied unit or itself to begin healing them. De-select a character without making an action by clicking the X button on the top right.",
 [chars[0], chars[1]]);
export const levelThree = new Level('Three', enemiesArr[2],
"The wizard can attack enemies from any range. Click on it then on an enemy to begin attacking immediately.",
 [chars[0], chars[1], chars[2]]);
export const levelFour = new Level('Four', enemiesArr[3],
"The newest character addition is the rogue. Each character has a unique role. The Warrior is the best tank, the rogue the fastest attacker, the wizard the most versitile damage dealer, and the cleric the healer.",
[chars[0], chars[1], chars[2], chars[3]]);
export const levelFive = new Level('Five', enemiesArr[4]);
export const levelSix = new Level('Six', enemiesArr[5]);
export const levelSeven = new Level('Seven', enemiesArr[6]);
export const levelEight = new Level('Eight', enemiesArr[7]);