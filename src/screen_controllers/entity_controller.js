import * as levelsObj from '../levels/level';
import {fadeIn, fadeOut} from './fades';

let hasBeenLoaded = false;
let levelHasEnded = false;

const levels = Object.values(levelsObj);
let currentLevelNumber = 0;
let maxLevelNumber = 0;
const highestLevelAvailable = 8;

let selectedChar;

let livingEnemies = {};
let livingChars = {};

function addDeathListener(entity) {
    entity.observer = new MutationObserver(function(mutations) {
        mutations.forEach(function (mutationRecord) {
            // console.log(entity.imgName, 'style changed');
            // console.log(mutationRecord);
            if (mutationRecord.target.style.display === 'none') {
                // console.log(entity.imgName, 'style === none');
                if (entity.allied) {
                    delete livingChars[entity.imgName];
                } else {
                    delete livingEnemies[entity.imgName];
                }
                const c = Object.values(livingChars);
                const en = Object.values(livingEnemies);
                // console.log('living allies: ', livingChars);
                // console.log('living enemies: ', livingEnemies);
                if (c.length === 0 || en.length === 0) {
                    if (!levelHasEnded) {
                        // console.log('end game called');
                        endGame(c, en, currentLevelNumber);
                    }
                    // console.log('game should have ended');
                    levelHasEnded = true;
                }
            }
        });
    })
}

function addEntityEvents(entity, allies, enemies) {
    if (entity.imgName != "") {
        if (!entity.observer) {
            addDeathListener(entity);
        }
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
        // console.log('broken image passed in for', entity.imgName);
    }
}

const allyClickEvents = (e) => {
    // console.log('character click');
    const entityName = e.target.className.slice(0, 2);
    const entity = livingChars[entityName];
    if (!selectedChar || selectedChar.hp < 0) {
        selectedChar = entity;
        entity.img.style.border = '4px solid gold';
        // console.log('selected char: ', selectedChar.imgName);
    } else if (selectedChar.baseDMG < 0) {
        selectedChar.autoAttack(entity);
        selectedChar.img.style.border = 'none';
        selectedChar = null;
    }
    e.stopPropagation();
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
    // console.log('enemy click');
    if (selectedChar && selectedChar.allied && selectedChar.baseDMG > 0) {
        clearInterval(selectedChar.currentAction);
        clearInterval(selectedChar.currentAnimation);
        selectedChar.autoAttack(entity);
        selectedChar.img.style.border = 'none';
        selectedChar = null;
    }
    e.stopPropagation(); // maybe move inside if
}

function setupEntities(charactersArr, enemiesArr) {
    for (let i = 0; i < charactersArr.length; i++) {
        addEntityEvents(charactersArr[i], charactersArr, enemiesArr);
    }
    for (let i = 0; i < enemiesArr.length; i++) {
        addEntityEvents(enemiesArr[i], enemiesArr, charactersArr);
    }
}

function deSelect() {
    if (selectedChar) {
        selectedChar.img.style.border = 'none';
        selectedChar = null;
    }
}

function initializeGameOpening(levelNumber) {
    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.addEventListener('click', deSelect);

    setupEntities(levels[levelNumber].characterList, levels[levelNumber].enemyList); // modify to be all the img elements

    // end click position
    const gameContainer = document.getElementById('game-container');
    gameContainer.addEventListener("click", (e) => {
        // console.log(e);
        if (selectedChar) {
            if (selectedChar.hp < 0) {
                selectedChar = null;
                return;
            }
            clearInterval(selectedChar.currentAction);
            clearInterval(selectedChar.currentAnimation);
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
    if (levelNumber > maxLevelNumber) {
        return;
    }
    const level = levels[levelNumber];
    levelHasEnded = false;
    currentLevelNumber = levelNumber;
    // console.log('level selected: ', levelNumber);
    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.style.display = '';
    const levelButtonContainer = document.getElementById('level-button-container');
    levelButtonContainer.style.display = 'none';
    const levelNameDisp = document.getElementById(`level-name-display`);
    levelNameDisp.style.opacity = 0;
    levelNameDisp.style.display = '';
    levelNameDisp.innerHTML = 'Level ' + levels[levelNumber].name;
    const secondAction = () => beginLevel(level.characterList, level.enemyList, level);
    const action = () => fadeOut(levelNameDisp, secondAction);
    fadeIn(levelNameDisp, action);
}

function beginLevel(charactersArr, enemiesArr, level) {
    // console.log('begin level called');
    const levelMessage = document.getElementById('tutorial-message');
    levelMessage.innerHTML = level.message;
    levelMessage.style.display = '';
    setInitialTargets(charactersArr, enemiesArr);
    loadInCharacters(charactersArr, enemiesArr);
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
        // console.log(enemies[i].imgName, "has target set to", enemies[i].target);
    }
}

function loadInCharacters(charactersArr, enemiesArr) {
    for (let i = 0; i < charactersArr.length; i++) {
        if (!charactersArr[i].observer) {
            addEntityEvents(charactersArr[i], charactersArr, enemiesArr);
        }
        livingChars[charactersArr[i].imgName] = charactersArr[i];
        charactersArr[i].container.style.top = charactersArr[i].pos[1] + 'px';
        charactersArr[i].container.style.left = charactersArr[i].pos[0] + 'px';
        charactersArr[i].container.style.opacity = 0;
        charactersArr[i].container.style.display = '';
        const hpBar = document.getElementById(`${charactersArr[i].imgName}-hp-bar`);
        hpBar.style.display = "flex";
        charactersArr[i].container.addEventListener('click', allyClickEvents);
        charactersArr[i].img.src = charactersArr[i].baseImg.src;
        fadeIn(charactersArr[i].container);
        observerObserve(charactersArr[i]);
    }
    for (let i = 0; i < enemiesArr.length; i++) {
        if (!enemiesArr[i].observer) {
            addEntityEvents(enemiesArr[i], enemiesArr, charactersArr);
        }
        livingEnemies[enemiesArr[i].imgName] = enemiesArr[i];
        enemiesArr[i].container.style.top = enemiesArr[i].pos[1] + 'px';
        enemiesArr[i].container.style.left = enemiesArr[i].pos[0] + 'px';
        enemiesArr[i].container.style.opacity = 0;
        enemiesArr[i].container.style.display = '';
        const hpBar = document.getElementById(`${enemiesArr[i].imgName}-hp-bar`);
        hpBar.style.display = "flex";
        enemiesArr[i].container.addEventListener('click', enemyClickEvents);
        enemiesArr[i].img.src = enemiesArr[i].baseImg.src;
        const action = () => enemiesArr[i].autoAttack(enemiesArr[i].target);
        fadeIn(enemiesArr[i].container, action); // begin attacking target
        observerObserve(enemiesArr[i]);
    }
    
}

function observerObserve(entity) {
    const element = entity.container;
    entity.observer.observe(element, { attributes: true, attributeFilter: ['style'] });
}




function endGame(charsList, enemyList) {
    const levelMessage = document.getElementById('tutorial-message');
    levelMessage.style.display = 'none';
    deSelect();
    const allCharsList = levels[currentLevelNumber].characterList;
    const allEnemyList = levels[currentLevelNumber].enemyList;
    for (let i = 0; i < allCharsList.length; i++) {
        allCharsList[i].observer.disconnect();
        if (allCharsList[i.currentAction]) { clearInterval(allCharsList[i].currentAction); }
        if (allCharsList[i].currentAnimation) { clearInterval(allCharsList[i].currentAnimation); }
        allCharsList[i].container.removeEventListener('click', allyClickEvents);
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
        // console.log('fade called');
        let disp;
        let secondAction;
        if (charsList.length === 0) {
            disp = document.getElementById('game-over-display');
            secondAction = () => resetGame(false);
        } else {
            disp = document.getElementById('game-won-display');
            secondAction = () => resetGame(true);
        }
        disp.style.opacity = 0;
        disp.style.display = '';
        const action = () => fadeOut(disp, secondAction);
        fadeIn(disp, action);
        clearInterval(gameFadeTimer);
    }, 2000);
}

function resetGame(won) {
    livingChars = {};
    livingEnemies = {};
    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.style.display = 'none';
    const levelButtonContainer = document.getElementById('level-button-container');
    levelButtonContainer.style.display = '';
    if (won && maxLevelNumber === currentLevelNumber && currentLevelNumber < highestLevelAvailable + 1) {
        maxLevelNumber++;
        const levelButtons = document.getElementsByClassName('level-button');
        levelButtons[maxLevelNumber].style.opacity = 100 + '%';
        levelButtons[maxLevelNumber].style.cursor = 'pointer';
    }
    // level.characterList, level.enemyList
    // console.log('levels arr: ', levels);
    // console.log('level ', currentLevelNumber, ': ', levels[currentLevelNumber]);
    const levChars = levels[currentLevelNumber].characterList;
    const levEnems = levels[currentLevelNumber].enemyList;
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