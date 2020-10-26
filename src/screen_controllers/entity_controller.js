import * as levelsObj from '../levels/level';
import {fadeIn, fadeOut} from './fades';

let hasBeenLoaded = false;
let levelHasEnded = false;

const levels = Object.values(levelsObj);
let currentLevelNumber = 0;
let maxLevelNumber = 0;
let characters = levels[maxLevelNumber].characterList;

let selectedChar;

let countToReach = 0;
let moveFinishCount = 0;

let livingEnemies = {};
let livingChars = {};

let currentAbilityBoxes;

let hotkeys = {};

window.addEventListener('load', () => {
    let statChar1;
    let statChar2;
    const heroStatcontainer = document.getElementById('heroes-button');
    const heroStatsBlocks = document.getElementsByClassName('hero-stats');
    const heroNameplateSelectors = document.getElementsByClassName('stat-selector');
    const statSelectorNames = document.getElementsByClassName('stat-selector-name');
    const statImages = document.getElementsByClassName('stats-img');
    heroStatcontainer.addEventListener('click', () => {
        for (let i = 0; i < statImages.length; i++) {
            if (statImages[i].style.display !== 'none') {
                let char; if (i === 0) { char = statChar1; } else { char = statChar2; }
                const statImg = document.getElementById(`stats-img-${i + 1}`)
                const nameStat = document.getElementById(`stats-name-${i + 1}`);
                const levelStat = document.getElementById(`stats-level-${i + 1}`);
                const hpStat = document.getElementById(`stats-hp-${i + 1}`);
                const dmgStat = document.getElementById(`stats-dmg-${i + 1}`);
                const defenseStat = document.getElementById(`stats-defense-${i + 1}`);
                statImg.src = char.baseImg.src;
                nameStat.innerHTML = `Level: ${char.level}`;
                levelStat.innerHTML = char.klass;
                hpStat.innerHTML = `Max HP: ${char.baseHP}`;
                dmgStat.innerHTML = `Damage: ${char.baseDMG}`
                defenseStat.innerHTML = `Defense: ${char.baseDefense}`;
            }
        }
    })
    let shouldSwap = false;
    let statCharSelected = null;
    function swapStatDisp(e) {
        if (!shouldSwap) { return; }
        // console.log('swapping now');
        e.currentTarget.style.border = '3px solid indigo';
        e.currentTarget.style.cursor = 'default';
        for (let j = 0; j < heroStatsBlocks.length; j++) {
            heroStatsBlocks[j].removeEventListener("mouseover", addBlueBorder);
            heroStatsBlocks[j].removeEventListener("mouseleave", removeBlueBorder);
        }
        const charIndex = statCharSelected.id.substr(1, 1);
        const char = characters[charIndex-1];
        
        statCharSelected.style.border = 'none';
        statCharSelected = 'none';
        
        const tarId = e.target.id;
        const sideNum = tarId.substr(tarId.length - 1, 1);
        if (sideNum == 1) {
            statChar1 = char;
        } else {
            statChar2 = char;
        }
        const statImg = document.getElementById(`stats-img-${sideNum}`)
        const nameStat = document.getElementById(`stats-name-${sideNum}`);
        const levelStat = document.getElementById(`stats-level-${sideNum}`);
        const hpStat = document.getElementById(`stats-hp-${sideNum}`);
        const dmgStat = document.getElementById(`stats-dmg-${sideNum}`);
        const defenseStat = document.getElementById(`stats-defense-${sideNum}`);
        if (statImg.style.display === 'none') { statImg.style.display = ''; }
        statImg.src = char.baseImg.src;
        nameStat.innerHTML = `Level: ${char.level}`;
        levelStat.innerHTML = char.klass;
        hpStat.innerHTML = `Max HP: ${char.baseHP}`;
        dmgStat.innerHTML = `Damage: ${char.baseDMG}`
        defenseStat.innerHTML = `Defense: ${char.baseDefense}`;

        shouldSwap = false;
    }
    function addBlueBorder(e) {
        e.currentTarget.style.border = '6px solid blue';
        e.currentTarget.style.cursor = 'pointer';
    } function removeBlueBorder(e) {
        e.currentTarget.style.border = '3px solid indigo';
        e.currentTarget.style.cursor = 'default';
    }
    function initiateStatSwap(e) {
        // console.log('swap initiated');
        if (shouldSwap) {
            if (e.currentTarget === statCharSelected) { return; }
            statCharSelected.style.border = 'none';
            statCharSelected = e.currentTarget;
            e.currentTarget.style.border = '4px solid blue';
        } else {
            statCharSelected = e.currentTarget;
            statCharSelected.style.border = '4px solid blue';
            for (let j = 0; j < heroStatsBlocks.length; j++) {
                heroStatsBlocks[j].addEventListener("mouseover", addBlueBorder);
                heroStatsBlocks[j].addEventListener("mouseleave", removeBlueBorder);
            }
            shouldSwap = true;
        }
    }
    for (let j = 0; j < heroStatsBlocks.length; j++) { heroStatsBlocks[j].addEventListener("click", swapStatDisp); }
    for (let i = 0; i < heroNameplateSelectors.length; i++) { heroNameplateSelectors[i].addEventListener('click', initiateStatSwap); }
    for (let i = 0; i < statSelectorNames.length; i++) {
        if (characters[i]) {
            statSelectorNames[i].innerHTML = characters[i].klass;
        }
    }
})

 
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

function createXPObserver(char) {
    char.xpObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
            if (char.observationToken && mutationRecord.target.style.border === '5px solid gold') {
                moveFinishCount++;
                char.observationToken = false;
                // char.xpObserver.disconnect();
                if (moveFinishCount === countToReach) {
                    addCharXP();
                }
            }
        })
    })
}

function addEntityEvents(entity, allies, enemies) {
    if (entity.imgName != "") {
        if (!entity.observer) {
            addDeathListener(entity);
            if (entity.allied) {
                createXPObserver(entity);
            }
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
    beginLevel(level.characterList.slice(), level.enemyList.slice(), currentLevelNumber);
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
    if (!entity || entity.container.style.display === 'none' || entity.hp < 0) {
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
        if (selectedChar.target === entity && selectedChar.isAttacking) {
            deSelect();
            return;
        }
        selectedChar.autoAttack(entity);
        deSelect();
    } else {
        selectedChar.abilityContainer.style.display = 'none';
        selectedChar.img.style.border = 'none';
        entity.abilityContainer.style.display = '';
        currentAbilityBoxes = entity.abilityContainer;
        selectedChar = entity;
        entity.img.style.border = '5px solid gold';
    }
}

function selectEnemy(entity) {
    if (!selectedChar || selectedChar.hp < 0) {
        selectedChar = null;
        return;
    } else if ((selectedChar.target === entity && selectedChar.isAttacking) || entity.hp < 0) {
        deSelect();
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
    } else if (entity && entity.klass) {
        selectEnemy(entity);
    } else if ((entity === 0 || entity) && selectedChar) {
        selectedChar.useAbility(entity);
    } else {
        // console.log('invalid key press of: ', e.key);
    }
}

function abilityClick(arr) {
    const entity = livingChars['a'+arr[0]];
    if (entity) {
        entity.useAbility(arr[1]);
    } else {
        // console.log('invalid entity for ability use');
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
    document.getElementById('begin-level-button').style.display = 'none';
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

function setAvailableAbilities(char) {
    const abilities = document.getElementsByClassName(char.imgName + '-ability-boxes');
    for (let i = 0; i < abilities.length; i++) {
        if (i < char.abilities.length) {
            abilities[i].style.display = '';
        } else {
            abilities[i].style.display = 'none';
        }
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
        hotkeys[hotkeyInput.value] = charactersArr[i];
        const abilityHotkey = document.getElementById(`ab${i+1}-keybind`);
        hotkeys[abilityHotkey.value] = i;
        const abilityClassName = document.getElementById(`a${i+1}-class-name`);
        abilityClassName.innerHTML = charactersArr[i].klass;
        const abilityNames = document.getElementsByClassName(`a${i+1}-ability-labels`);
        setAvailableAbilities(charactersArr[i]);
        for (let j = 0; j < abilityNames.length; j++) {
            if (charactersArr[i].abilityNames[j]) {
                abilityNames[j].innerHTML = charactersArr[i].abilityNames[j];
            } else {
                abilityNames[j].innerHTML = 'No Ability';
            }
        }
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
        hotkeys[hotkeyInput.value] = enemiesArr[i];
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
    hotkeys = {};
    if (currentAbilityBoxes) {
        currentAbilityBoxes.style.display = 'none';
        currentAbilityBoxes = null;
    }
    const levelMessage = document.getElementById('tutorial-message');
    levelMessage.style.display = 'none';
    const deSelectButton = document.getElementById('test');
    deSelectButton.style.display = 'none';
    deSelect();
    const projectiles = document.getElementsByClassName('projectile');
    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].display = 'none';
    }
    const allCharsList = levels[currentLevelNumber].characterList;
    const allEnemyList = levels[currentLevelNumber].enemyList;
    for (let i = 0; i < allCharsList.length; i++) {
        allCharsList[i].observer.disconnect();
        if (allCharsList[i].currentAction) { clearInterval(allCharsList[i].currentAction); }
        if (allCharsList[i].currentAnimation) { clearInterval(allCharsList[i].currentAnimation); }
        allCharsList[i].isAttacking = false;
        allCharsList[i].target = null;
        allCharsList[i].container.removeEventListener('click', allyClickEvents);
        allCharsList[i].img.src = allCharsList[i].baseImg.src;
    }
    for (let i = 0; i < allEnemyList.length; i++) {
        allEnemyList[i].observer.disconnect();
        if (allEnemyList[i].currentAction) { clearInterval(allEnemyList[i].currentAction); }
        if (allEnemyList[i].currentAnimation) { clearInterval(allEnemyList[i].currentAnimation); }
        allEnemyList[i].isAttacking = false;
        allEnemyList[i].target = null;
        allEnemyList[i].container.removeEventListener('click', enemyClickEvents);
        allEnemyList[i].img.src = allEnemyList[i].baseImg.src;
    }

    if (charsList.length > 0) {
        endMoveChars(charsList);
    } else {
        const backgroundImg = document.getElementById('background-image');
        fadeOut(backgroundImg);
        for (let i = 0; i < enemyList.length; i++) {
            fadeOut(enemyList[i].container);
        }
        fadeOutGame(false);
    }
}

function xpObserverObserve(char) {
    char.observationToken = true;
    char.xpObserver.observe(char.img, { attributes: true, attributeFilter: ['style'] });
}

function modEndPos() {
    const container = document.getElementById('game-container');
    const width = Math.floor(container.offsetWidth);
    const height = Math.floor(container.offsetHeight);
    // console.log(width);
    const widthExtra = width - (160 * 4);
    // console.log(widthExtra);
    return ([Math.floor(widthExtra / 4), Math.floor(height * 0.66), Math.floor(width/10)]);
}

function endMoveChars(charsList) {
    moveFinishCount = 0;
    countToReach = charsList.length;
    const basePos = modEndPos(); // make into % values
    for (let i = 0; i < charsList.length; i++) {
        xpObserverObserve(charsList[i]);
        charsList[i].move([(i*160) + ((i+1)*basePos[0]) + basePos[2], basePos[1]], false, true);
    }
}

function addCharXP() {
    const c = Object.values(livingChars);
    // console.log(c);
    for (let i = 0; i < c.length; i++) {
        c[i].xpObserver.disconnect();
        c[i].hpContainerLeft.style.backgroundColor = 'gold';
        const xpPercent = Math.floor((c[i].xp / c[i].nextLevelXP) * 100);
        c[i].hpContainerLeft.style.width = `${xpPercent}%`;
        c[i].hpContainerRight.style.width = `${100 - xpPercent}%`;
        const levelUpDisp = document.getElementById(c[i].imgName + '-level-up');
        levelUpDisp.style.top = Math.floor(c[i].pos[1] - 75) + 'px';
        levelUpDisp.style.left = Math.floor(c[i].pos[0]) + 'px';
    }
    fadeOutGame(true);
    const xpPerC = levels[currentLevelNumber].xp / c.length;
    const xpPerInterval = xpPerC / 60; // 4 seconds for the animation, .05 sec intervals
    let timeCount = 0;
    const xpInterval = setInterval(() => {
        if (timeCount === 60) {
            clearInterval(xpInterval);
            for (let i = 0; i < c.length; i++) {
                c[i].xp = Math.ceil(c[i].xp);
                // console.log('xp: ', c[i].xp, ' level: ', c[i].level);
                c[i].container.style.border = 'none';
                fadeOut(c[i].container);
            }
            const backgroundImg = document.getElementById('background-image');
            fadeOut(backgroundImg);
        }
        for (let i = 0; i < c.length; i++) {
            c[i].xp += xpPerInterval;
            if (c[i].xp > c[i].nextLevelXP) {
                c[i].levelUp();
            }
            const xpPercent = Math.floor((c[i].xp / c[i].nextLevelXP) * 100);
            c[i].hpContainerLeft.style.width = `${xpPercent}%`;
            c[i].hpContainerRight.style.width = `${100 - xpPercent}%`;
        }
        timeCount++;
    }, 50);
}

function fadeOutGame(won) {
    let theThing = (actionIterations) => {
        if (!actionIterations) {
            actionIterations = 40;
        }
        // console.log('fade called');
        let disp;
        let secondAction;
        if (!won) {
            disp = document.getElementById('game-over-display');
            secondAction = () => resetGame(false);
        } else {
            disp = document.getElementById('game-won-display');
            secondAction = () => resetGame(true);
        }
        disp.style.opacity = 0;
        disp.style.display = '';
        const action = () => fadeOut(disp, secondAction, actionIterations);
        fadeIn(disp, action);
    }
    if (!won) {
        setTimeout(theThing, 2000);
    } else {
        theThing(60);
    }
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
    const levChars = levels[currentLevelNumber].characterList;
    const levEnems = levels[currentLevelNumber].enemyList;
    for (let i = 0; i < levChars.length; i++) {
        levChars[i].hp = levChars[i].baseHP; levChars[i].dmg = levChars[i].baseDMG; levChars[i].defense = levChars[i].baseDefense;
        levChars[i].pos[0] = levChars[i].basePos[0]; levChars[i].pos[1] = levChars[i].basePos[1];
        levChars[i].container.style.top = levChars[i].pos[1] + 'px';
        levChars[i].container.style.left = levChars[i].pos[0] + 'px';
        levChars[i].hpContainerLeft.style.backgroundColor = 'blue';
        levChars[i].img.style.border = 'none';
        levChars[i].setHpBars();
    }
    for (let i = 0; i < levEnems.length; i++) {
        levEnems[i].hp = levEnems[i].baseHP; levEnems[i].dmg = levEnems[i].baseDMG; levEnems[i].defense = levEnems[i].baseDefense;
        levEnems[i].pos[0] = levEnems[i].basePos[0]; levEnems[i].pos[1] = levEnems[i].basePos[1];
        levEnems[i].container.style.top = levEnems[i].pos[1] + 'px';
        levEnems[i].container.style.left = levEnems[i].pos[0] + 'px';
        levEnems[i].setHpBars();
    }
}

export default loadLevel;