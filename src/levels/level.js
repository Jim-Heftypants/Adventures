import * as charactersObj from '../entities/character';
import * as enemiesObj from '../entities/enemy';

const charactersArr = Object.values(charactersObj);
const enemiesArr = Object.values(enemiesObj);

class Level {
    constructor(name, enemyList, characterList=charactersArr) {
        this.name = name;
        this.enemyList = enemyList;
        this.characterList = characterList;
    }
}

export const levelOne = new Level('one', enemiesArr[0]);
export const levelTwo = new Level('two', enemiesArr[1]);
export const levelThree = new Level('three', enemiesArr[2]);
export const levelFour = new Level('four', enemiesArr[3]);
export const levelFive = new Level('five', enemiesArr[4]);
export const levelSix = new Level('six', enemiesArr[5]);
export const levelSeven = new Level('seven', enemiesArr[6]);
export const levelEight = new Level('eight', enemiesArr[7]);