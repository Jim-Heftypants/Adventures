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