import * as levelsObj from '../levels/level';
import {fadeIn, fadeOut} from './fades';

let hasBeenLoaded = false;
let levelHasEnded = false;

const levels = Object.values(levelsObj);
let currentLevelNumber = 0;

let selectedChar;

let livingEnemies = {};
let livingChars = {};

function addDeathListener(entity, level) {
    entity.observer = new MutationObserver(function(mutations) {
        mutations.forEach(function (mutationRecord) {
            // console.log(entity.imgName, 'style changed');
            // console.log(mutationRecord);
            if (mutationRecord.target.style.display === 'none') {
                console.log(entity.imgName, 'style === none');
                if (entity.allied) {
                    delete livingChars[entity.imgName];
                } else {
                    delete livingEnemies[entity.imgName];
                }
                const c = Object.values(livingChars);
                const en = Object.values(livingEnemies);
                console.log('living allies: ', livingChars);
                console.log('living enemies: ', livingEnemies);
                if (c.length === 0 || en.length === 0) {
                    if (!levelHasEnded) {
                        console.log('end game called');
                        endGame(c, en, level);
                    }
                    console.log('game should have ended');
                    levelHasEnded = true;
                }
            }
        });
    })
}

function addEntityEvents(entity, allies, enemies, level) {
    if (entity.imgName != "") {
        addDeathListener(entity, level);
        entity.enemies = enemies;
        const cloneArr = allies.slice();
        let selfIndex;
        for (let i = 0; i < cloneArr.length; i++) {
            if (cloneArr[i].imgName === entity.imgName) { selfIndex = i; }
        }
        // remove self from allies list to prevent moving out of self image (healers excluded)
        if (entity.baseDMG > 0) { cloneArr.splice(selfIndex, 1); }
        entity.allies = cloneArr;
    } else {
        console.log('broken image passed in for', entity.imgName);
    }
}

const enemyClickEvents = (e) => {
    const entityName = e.target.className.slice(0, 2);
    // console.log('entity name', entityName);
    const entity = livingEnemies[entityName];
    // console.log('entity', entity);
    if (selectedChar.hp < 0) {
        selectedChar.img.style.border = 'none';
        selectedChar = null;
        return;
    }
    console.log('enemy click');
    if (selectedChar && selectedChar.allied && selectedChar.baseDMG > 0) {
        selectedChar.autoAttack(entity);
        selectedChar.img.style.border = 'none';
        selectedChar = null;
    }
    e.stopPropagation(); // maybe move inside if
}

function addClickEvents(entity) {
    if (entity.allied) {
        entity.container.addEventListener("click", (e) => {
            console.log('character click');
            if (!selectedChar || selectedChar.hp < 0) {
                selectedChar = entity;
                entity.img.style.border = '2px solid gold';
                console.log('selected char: ', selectedChar.imgName);
            } else if (selectedChar.baseDMG < 0) {
                selectedChar.autoAttack(entity);
                selectedChar.img.style.border = 'none';
                selectedChar = null;
            }
            e.stopPropagation();
        });
    } else {
        entity.container.addEventListener("click", enemyClickEvents);
    }
}

function setupEntities(charactersArr, enemiesArr, level) {
    for (let i = 0; i < charactersArr.length; i++) {
        // livingChars[charactersArr[i].imgName] = charactersArr[i];
        addClickEvents(charactersArr[i]);
        addEntityEvents(charactersArr[i], charactersArr, enemiesArr, level);
    }
    for (let i = 0; i < enemiesArr.length; i++) {
        // livingEnemies[enemiesArr[i].imgName] = enemiesArr[i];
        // addClickEvents(enemiesArr[i]);
        addEntityEvents(enemiesArr[i], enemiesArr, charactersArr, level);
    }
}

function initializeGameOpening(levelNumber) {
    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.addEventListener('click', () => {
        selectedChar.img.style.border = 'none';
        selectedChar = null;
    })

    setupEntities(levels[levelNumber].characterList, levels[levelNumber].enemyList, levelNumber); // modify to be all the img elements

    // end click position
    const gameContainer = document.getElementById('game-container');
    gameContainer.addEventListener("click", (e) => {
        console.log(e);
        if (selectedChar) {
            if (selectedChar.hp < 0) {
                selectedChar = null;
                return;
            }
            selectedChar.img.style.border = 'none';
            selectedChar.move([e.x, e.y]);
            selectedChar = null;
        }
    })

    hasBeenLoaded = true;
}



function loadLevel(levelNumber) {
    if (!hasBeenLoaded) {
        initializeGameOpening(levelNumber);
    }
    if (levelNumber > currentLevelNumber) {
        return;
    }
    levelHasEnded = false;
    console.log('level selected: ', levelNumber);
    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.style.display = '';
    const levelButtonContainer = document.getElementById('level-button-container');
    levelButtonContainer.style.display = 'none';
    const levelNameDisp = document.getElementById(`level-${levelNumber + 1}-name`);
    levelNameDisp.style.opacity = 0;
    levelNameDisp.style.display = '';
    const level = levels[levelNumber];
    const secondAction = () => beginLevel(level.characterList, level.enemyList, levelNumber);
    const action = () => fadeOut(levelNameDisp, secondAction);
    fadeIn(levelNameDisp, action);
}

function beginLevel(charactersArr, enemiesArr, levelNumber) {
    console.log('begin level called');
    setInitialTargets(charactersArr, enemiesArr);
    loadInCharacters(charactersArr, enemiesArr, levelNumber);
}

function setInitialTargets(chars, enemies) {
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].baseDMG > 0) {
            const targetIndex = Math.floor(Math.random() * chars.length);
            enemies[i].target = chars[targetIndex];
        } else {
            const targetIndex = Math.floor(Math.random() * enemies.length);
            enemies[i].target = enemies[targetIndex];
        }
        console.log(enemies[i].imgName, "has target set to", enemies[i].target);
    }
}

function loadInCharacters(charactersArr, enemiesArr, levelNumber) {
    for (let i = 0; i < charactersArr.length; i++) {
        livingChars[charactersArr[i].imgName] = charactersArr[i];
        charactersArr[i].container.style.opacity = 0;
        charactersArr[i].container.style.display = '';
        const hpBar = document.getElementById(`${charactersArr[i].imgName}-hp-bar`);
        hpBar.style.display = "flex";
        fadeIn(charactersArr[i].container);
        observerObserve(charactersArr[i], levelNumber);
    }
    for (let i = 0; i < enemiesArr.length; i++) {
        if (!enemiesArr[i].observer) {
            addEntityEvents(enemiesArr[i], enemiesArr, charactersArr, levelNumber);
        }
        livingEnemies[enemiesArr[i].imgName] = enemiesArr[i];
        enemiesArr[i].container.style.opacity = 0;
        enemiesArr[i].container.style.display = '';
        const hpBar = document.getElementById(`${enemiesArr[i].imgName}-hp-bar`);
        hpBar.style.display = "flex";
        enemiesArr[i].container.addEventListener('click', enemyClickEvents);
        const action = () => enemiesArr[i].autoAttack(enemiesArr[i].target);
        fadeIn(enemiesArr[i].container, action); // begin attacking target
        observerObserve(enemiesArr[i], levelNumber);
    }
    
}

function observerObserve(entity, levelNumber) {
    const element = entity.container;
    // if (!entity.observer) {
    //     addDeathListener(entity, levelNumber);
    // }
    entity.observer.observe(element, { attributes: true, attributeFilter: ['style'] });
}




function endGame(charsList, enemyList, level) {
    const allCharsList = levels[level].characterList;
    const allEnemyList = levels[level].enemyList;
    for (let i = 0; i < allCharsList.length; i++) {
        allCharsList[i].observer.disconnect();
        if (allCharsList[i.currentAction]) { clearInterval(allCharsList[i].currentAction); }
        if (allCharsList[i].currentAnimation) { clearInterval(allCharsList[i].currentAnimation); }
        allCharsList[i].img.src = allCharsList[i].baseImg.src;
    }
    for (let i = 0; i < allEnemyList.length; i++) {
        allEnemyList[i].observer.disconnect();
        if (allEnemyList[i].currentAction) { clearInterval(allEnemyList[i].currentAction); }
        if (allEnemyList[i].currentAnimation) { clearInterval(allEnemyList[i].currentAnimation); }
        allEnemyList[i].container.removeEventListener('click', enemyClickEvents);
        allEnemyList[i].img.src = allEnemyList[i].baseImg.src;
    }

    for (let i = 0; i < charsList.length; i++) {
        fadeOut(charsList[i].container);
    }
    for (let i = 0; i < enemyList.length; i++) {
        fadeOut(enemyList[i].container);
    }
    
    let gameFadeTimer = setInterval(() => {
        console.log('fade called');
        let disp;
        let secondAction;
        if (charsList.length === 0) {
            disp = document.getElementById('game-over-display');
            secondAction = () => resetGame(level, false);
        } else {
            disp = document.getElementById('game-won-display');
            secondAction = () => resetGame(level, true);
        }
        disp.style.opacity = 0;
        disp.style.display = '';
        const action = () => fadeOut(disp, secondAction);
        fadeIn(disp, action);
        clearInterval(gameFadeTimer);
    }, 2000);
}

function resetGame(level, won) {
    livingChars = {};
    livingEnemies = {};
    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.style.display = 'none';
    const levelButtonContainer = document.getElementById('level-button-container');
    levelButtonContainer.style.display = '';
    if (won && currentLevelNumber === level) {
        currentLevelNumber++;
        const levelButtons = document.getElementsByClassName('level-button');
        levelButtons[currentLevelNumber].style.opacity = 100 + '%';
        levelButtons[currentLevelNumber].style.cursor = 'pointer';
    }
    // level.characterList, level.enemyList
    console.log('levels arr: ', levels);
    console.log('level ', level, ': ', levels[level]);
    const levChars = levels[level].characterList;
    const levEnems = levels[level].enemyList;
    for (let i = 0; i < levChars.length; i++) {
        levChars[i].hp = levChars[i].baseHP;
        levChars[i].pos[0] = levChars[i].basePos[0]; levChars[i].pos[1] = levChars[i].basePos[1];
        levChars[i].container.style.top = levChars[i].pos[1] + 'px';
        levChars[i].container.style.left = levChars[i].pos[0] + 'px';
        levChars[i].setHpBars();
    }
    for (let i = 0; i < levEnems.length; i++) {
        levEnems[i].hp = levEnems[i].baseHP;
        levEnems[i].pos[0] = levEnems[i].basePos[0]; levEnems[i].pos[1] = levEnems[i].basePos[1];
        levEnems[i].container.style.top = levEnems[i].pos[1] + 'px';
        levEnems[i].container.style.left = levEnems[i].pos[0] + 'px';
        levEnems[i].setHpBars();
    }
}

export default loadLevel;