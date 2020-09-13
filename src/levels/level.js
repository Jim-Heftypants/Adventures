import * as charactersObj from '../entities/character';
import * as enemiesObj from '../entities/enemy';

const charactersArr = Object.values(charactersObj);
const enemiesArr = Object.values(enemiesObj);

class Level {
    constructor(name, characterList, enemyList) {
        this.name = name;
        this.characterList = characterList;
        this.enemyList = enemyList;
    }
}

export const levelOne = new Level('one', charactersArr, enemiesArr);

export const levelTwo = new Level('two', charactersArr, enemiesArr);