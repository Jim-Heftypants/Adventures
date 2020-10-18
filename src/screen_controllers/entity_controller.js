import * as levelsObj from '../levels/level';
import {fadeIn, fadeOut} from './fades';

let hasBeenLoaded = false;
let levelHasEnded = false;

const levels = Object.values(levelsObj);
let currentLevelNumber = 0;
let maxLevelNumber = 7;
const highestLevelAvailable = 8;

let selectedChar;

let livingEnemies = {};
let livingChars = {};

let currentAbilityBoxes;

let hotkeys = {};
 
function addDeathListener(entity) {
    entity.observer = new MutationObserver(function(mutations) {
        mutations.forEach(function (mutationRecord) {
            if (mutationRecord.target.style.display === 'none') {
                // console.log(entity.imgName, 'style === none');
                if (entity.allied) {
                    delete livingChars[entity.imgName];
                } else {
                    delete livingEnemies[entity.imgName];
                }
                const c = Object.values(livingChars);
                const en = Object.values(livingEnemies);
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

function deSelect() {
    // console.log('de-selected')
    if (selectedChar) {
        selectedChar.abilityContainer.style.display = 'none';
        currentAbilityBoxes = null;
        selectedChar.img.style.border = 'none';
        selectedChar = null;
    }
}

function beginCurrentLevel() {
    const beginLevelButton = document.getElementById('begin-level-button');
    fadeOut(beginLevelButton);
    const level = levels[currentLevelNumber];
    beginLevel(level.characterList, level.enemyList, currentLevelNumber);
}

function returnToSelectPage() {
    document.getElementById('return-button').style.display = 'none';
    document.getElementById('tutorial-message').style.display = 'none';
    document.getElementById(`level-name-display`).style.display = 'none';
    document.getElementById('begin-level-button').style.display = 'none';
    document.getElementById('level-button-container').style.display = '';
    document.getElementById('close-button').style.display = '';
}

function selectChar(entity) {
    if (!entity || entity.img.style.display === 'none') {
        return;
    }
    if (!selectedChar || selectedChar.hp < 0) {
        // for (let i = 0; i < entity.abilityBoxes; i++) { entity.abilityBoxes[i].style.display = ''; }
        entity.abilityContainer.style.display = '';
        currentAbilityBoxes = entity.abilityContainer;
        selectedChar = entity;
        entity.img.style.border = '5px solid gold';
        // console.log('selected char: ', selectedChar.imgName);
    } else if (selectedChar.baseDMG < 0) {
        // for (let i = 0; i < selectedChar.abilityBoxes; i++) { entity.abilityBoxes[i].style.display = 'none'; }
        selectedChar.abilityContainer.style.display = 'none';
        currentAbilityBoxes = null;
        selectedChar.autoAttack(entity);
        selectedChar.img.style.border = 'none';
        selectedChar = null;
    }
}

function selectEnemy(entity) {
    if (entity.img.style.display === 'none' || !selectedChar || selectedChar.hp < 0) {
        selectedChar = null;
        return;
    }
    if (selectedChar.allied && selectedChar.baseDMG > 0) {
        clearInterval(selectedChar.currentAction);
        clearInterval(selectedChar.currentAnimation);
        selectedChar.autoAttack(entity);
        selectedChar.img.style.border = 'none';
        selectedChar.abilityContainer.style.display = 'none';
        currentAbilityBoxes = null;
        selectedChar = null;
    }
}

const allyClickEvents = (e) => {
    // console.log('character click');
    const entityName = e.target.className.slice(0, 2);
    const entity = livingChars[entityName];
    e.stopPropagation();
    selectChar(entity);
}

const enemyClickEvents = (e) => {
    const entityName = e.target.className.slice(0, 2);
    const entity = livingEnemies[entityName];
    e.stopPropagation();
    selectEnemy(entity);
}

function keydownEvent (e) {
    const entity = hotkeys[e.key];
    if (entity && entity.allied) {
        selectChar(entity);
    } else if (entity) {
        selectEnemy(entity);
    } else {
        console.log('invalid key press of: ', e.key);
    }
}

function abilityClick(arr) {
    const entity = livingChars['a'+arr[0]];
    if (entity) {
        entity.useAbility(arr[1]);
    } else {
        console.log('invalid entity for ability use');
    }
}

function setAbilityBoxes() {
    let abilityBoxes = [];
    abilityBoxes.push(document.getElementsByClassName('a1-inner-ability-divs'));
    abilityBoxes.push(document.getElementsByClassName('a2-inner-ability-divs'));
    abilityBoxes.push(document.getElementsByClassName('a3-inner-ability-divs'));
    abilityBoxes.push(document.getElementsByClassName('a4-inner-ability-divs'));
    for (let i = 0; i < abilityBoxes.length; i++) {
        for (let j = 0; j < abilityBoxes[i].length; j++) {
            abilityBoxes[i][j].addEventListener('click', () => abilityClick([i+1, j]));
        }
    }
}

function initializeGameOpening() {
    document.getElementById('return-button').addEventListener('click', returnToSelectPage);
    const deSelectButton = document.getElementById('test');
    deSelectButton.addEventListener('click', deSelect);

    const beginLevel = document.getElementById('begin-level-button');
    beginLevel.addEventListener('click', beginCurrentLevel)

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
            currentAbilityBoxes.style.display = 'none';
            currentAbilityBoxes = null;
            selectedChar.move([e.x, e.y]);
            selectedChar = null;
        }
    })
    window.addEventListener('keypress', (e) => {
        // console.log(e);
        keydownEvent(e);
    })
    setAbilityBoxes();

    hasBeenLoaded = true;
}



function loadLevel(levelNumber) {
    if (!hasBeenLoaded) {
        initializeGameOpening();
    }
    if (levelNumber > maxLevelNumber) {
        return;
    }
    const level = levels[levelNumber];
    levelHasEnded = false;
    currentLevelNumber = levelNumber;
    level.action();
    // console.log('level selected: ', levelNumber);
    document.getElementById('return-button').style.display = '';
    const levelButtonContainer = document.getElementById('level-button-container');
    levelButtonContainer.style.display = 'none';
    const levelNameDisp = document.getElementById(`level-name-display`);
    levelNameDisp.style.opacity = 0;
    levelNameDisp.style.display = '';
    levelNameDisp.innerHTML = 'Level ' + level.name;
    const levelMessage = document.getElementById('tutorial-message');
    levelMessage.innerHTML = level.message;
    levelMessage.style.opacity = 0;
    levelMessage.style.display = '';
    // const secondAction = () => beginLevel(level.characterList, level.enemyList, levelNumber);
    fadeIn(levelNameDisp);
    const levelNameAction = () => { fadeIn(beginLevel); }
    const action = () => fadeOut(levelNameDisp, levelNameAction);
    const beginLevel = document.getElementById('begin-level-button');
    beginLevel.style.opacity = 0;
    beginLevel.style.display = '';
    fadeIn(levelMessage, action);
}

function beginLevel(charactersArr, enemiesArr, levelNumber) {
    hotkeys = {};
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
        // console.log(enemies[i].imgName, "has target set to", enemies[i].target);
    }
}

function loadInCharacters(charactersArr, enemiesArr, levelNumber) {
    document.getElementById('return-button').style.display = 'none';
    const deSelectButton = document.getElementById('test');
    deSelectButton.style.opacity = 0;
    deSelectButton.style.display = '';
    fadeIn(deSelectButton);
    const backgroundImg = document.getElementById('background-image');
    if (levelNumber < 4) {
        backgroundImg.src = document.getElementById('forest').src;
    } else if (levelNumber < 7) {
        backgroundImg.src = document.getElementById('snowy').src;
    } else {
        backgroundImg.src = document.getElementById('dungeon').src;
    }
    backgroundImg.style.opacity = 0;
    backgroundImg.style.display = '';
    fadeIn(backgroundImg);
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
        // charactersArr[i].hotkeyDisplay.innerHTML = charactersArr[i].hotkey;
        // hotkeys[charactersArr[i].hotkey] = charactersArr[i];
        const hotkeyInput = document.getElementById(`a${i+1}-keybind`);
        charactersArr[i].hotkeyDisplay.innerHTML = hotkeyInput.value;
        hotkeys[hotkeyInput.value] = charactersArr[i]
        const actionEvent = () => { charactersArr[i].container.addEventListener('click', allyClickEvents);}
        charactersArr[i].img.src = charactersArr[i].baseImg.src;
        fadeIn(charactersArr[i].container, actionEvent);
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
        const hotkeyInput = document.getElementById(`e${i+1}-keybind`);
        enemiesArr[i].hotkeyDisplay.innerHTML = hotkeyInput.value;
        hotkeys[hotkeyInput.value] = enemiesArr[i]
        enemiesArr[i].container.addEventListener('click', enemyClickEvents);
        enemiesArr[i].img.src = enemiesArr[i].baseImg.src;
        const action = () => enemiesArr[i].autoAttack(enemiesArr[i].target);
        fadeIn(enemiesArr[i].container, action); // begin attacking target
        observerObserve(enemiesArr[i]);
    }
    // console.log("hotkeys: ", hotkeys);
}

function observerObserve(entity) {
    const element = entity.container;
    entity.observer.observe(element, { attributes: true, attributeFilter: ['style'] });
}




function endGame(charsList, enemyList) {
    if (currentAbilityBoxes) {
        currentAbilityBoxes.style.display = 'none';
        currentAbilityBoxes = null;
    }
    const levelMessage = document.getElementById('tutorial-message');
    levelMessage.style.display = 'none';
    const deSelectButton = document.getElementById('test');
    deSelectButton.style.display = 'none';
    deSelect();
    const allCharsList = levels[currentLevelNumber].characterList;
    const allEnemyList = levels[currentLevelNumber].enemyList;
    for (let i = 0; i < allCharsList.length; i++) {
        allCharsList[i].observer.disconnect();
        if (allCharsList[i].currentAction) { clearInterval(allCharsList[i].currentAction); }
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

    const backgroundImg = document.getElementById('background-image');
    fadeOut(backgroundImg);

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
    const levelButtonContainer = document.getElementById('level-button-container');
    levelButtonContainer.style.display = '';
    document.getElementById('close-button').style.display = '';
    if (won && maxLevelNumber === currentLevelNumber) {
        maxLevelNumber++;
        const levelButtons = document.getElementsByClassName('level-button');
        if (levelButtons[maxLevelNumber]) {
            levelButtons[maxLevelNumber].style.opacity = 100 + '%';
            levelButtons[maxLevelNumber].style.cursor = 'pointer';
        }
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