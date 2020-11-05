import * as levelsObj from '../levels/level';
import {fadeIn, fadeOut} from './fades';

let hasBeenLoaded = false;
let levelHasEnded = false;

const levels = Object.values(levelsObj);
let currentLevelNumber = 1;
let maxLevelNumber = 1; // change on pushed ver
const characters = levels[0].characterList.slice();
let party = levels[4].characterList.slice();

let levelXPGain = 0;

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
    let currentShowingAbilityDescription;
    const heroStatcontainer = document.getElementById('heroes-button');
    const heroStatsBlocks = document.getElementsByClassName('hero-stats');
    const heroNameplateSelectors = document.getElementsByClassName('stat-selector');
    const statSelectorNames = document.getElementsByClassName('stat-selector-name');
    const statImages = document.getElementsByClassName('stats-img');
    const statAbilities1 = document.getElementsByClassName('stat-ability-div-1');
    const statAbilities2 = document.getElementsByClassName('stat-ability-div-2');
    const abDescShader = document.getElementsByClassName('ability-description-shader')[0];
    const partySelectorButton = document.getElementById('party-button');
    const partySelectorContainer = document.getElementById('party-selector-container');
    const partySelectorNames = document.getElementsByClassName('party-selector-name');
    const characterNameDisplays = document.getElementsByClassName('character-name-dispay');
    for (let i = 1; i < levels.length; i++) {
        let button = document.createElement("button");
        button.classList.add("level-button");
        button.id = `level-${i}-button`;
        button.innerHTML = levels[i].name;
        document.getElementById("level-button-container").appendChild(button);
    }
    abDescShader.addEventListener('click', () => {
        currentShowingAbilityDescription.style.display = 'none';
        currentShowingAbilityDescription = null;
        abDescShader.style.display = 'none';
    })
    function showAbilityDescription(side, num) {
        let hero;
        if (side === 1) {
            hero = statChar1;
        } else {
            hero = statChar2;
        }
        currentShowingAbilityDescription = document.getElementById(hero.klass + '-ability-' + num + '-description-div');
        currentShowingAbilityDescription.style.display = '';
        abDescShader.style.display = '';
    }
    for (let i = 0; i < statAbilities1.length; i++) {
        statAbilities1[i].addEventListener('click', () => showAbilityDescription(1, i+1));
        statAbilities2[i].addEventListener('click', () => showAbilityDescription(2, i+1));
    }
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
                hpStat.innerHTML = `Health: ${char.baseHP}`;
                dmgStat.innerHTML = `Power: ${Math.abs(char.baseDMG)}`
                defenseStat.innerHTML = `Defense: ${char.baseDefense}`;
                for (let j = 0; j < statAbilities1.length; j++) {
                    if (char.abilities[j]) {
                        if (i === 0) {
                            statAbilities1[j].style.display = '';
                        } else { statAbilities2[j].style.display = ''; }
                    } else {
                        if (i === 0) {
                            statAbilities1[j].style.display = 'none';
                        } else { statAbilities2[j].style.display = 'none'; }
                    }
                }
            }
        }
        for (let i = 0; i < statSelectorNames.length; i++) {
            if (party[i]) {
                statSelectorNames[i].innerHTML = party[i].klass;
            }
        }
    })
    partySelectorButton.addEventListener('click', () => {
        for (let i = 0; i < characterNameDisplays.length; i++) {
            if (characters[i]) {
                characterNameDisplays[i].innerHTML = characters[i].klass;
                characterNameDisplays[i].style.display = '';
            } else {
                characterNameDisplays[i].style.display = 'none';
            }
        }
        for (let i = 0; i < partySelectorNames.length; i++) {
            if (party[i]) {
                partySelectorNames[i].innerHTML = party[i].klass;
            }
        }
    })
    let partyCharSelected = null;
    let partyCharIdx = null;
    for (let i = 0; i < characterNameDisplays.length; i++) {
        characterNameDisplays[i].addEventListener('click', () => {
            if (!partyCharSelected) {
                for (let j = 0; j < partySelectorNames.length; j++) {
                    partySelectorNames[j].style.cursor = 'pointer';
                    partySelectorNames[j].addEventListener("mouseover", addBlueBorder);
                    partySelectorNames[j].addEventListener("mouseleave", removeBlueBorder);
                }
            } else {
                characterNameDisplays[partyCharIdx].style.border = '2px solid black';
            }
            characterNameDisplays[i].style.border = '5px solid red';
            partyCharIdx = parseInt(characterNameDisplays[i].id.substr(characterNameDisplays[i].id.length - 1, 1))-1;
            partyCharSelected = characters[partyCharIdx];
        })
    }
    for (let i = 0; i < partySelectorNames.length; i++) {
        partySelectorNames[i].addEventListener('click', () => {
            if (!partyCharSelected) { return; }
            partySelectorNames[i].style.cursor = 'default';
            partySelectorNames[i].removeEventListener("mouseover", addBlueBorder);
            partySelectorNames[i].removeEventListener("mouseleave", removeBlueBorder);
            partySelectorNames[i].style.border = 'none';
            for (let j = 0; j < party.length; j++) {
                if (party[j].klass === partyCharSelected.klass) {
                    party[j] = party[i];
                    partySelectorNames[j].innerHTML = party[j].klass;
                    party[j].imgName = 'a' + (j+1);
                    // party[j].addInlineStyle();
                    // console.log(party);
                }
            }
            partySelectorNames[i].innerHTML = partyCharSelected.klass;
            party[i] = partyCharSelected;
            party[i].imgName = 'a' + (i+1);
            // party[i].addInlineStyle();
            characterNameDisplays[partyCharIdx].style.border = '2px solid black';
            partyCharIdx = null;
            partyCharSelected = null;
        })
    }

    let shouldSwap = false;
    let statCharSelected = null;
    function swapStatDisp(e) {
        if (!shouldSwap) { return; }
        // console.log('swapping now');
        e.currentTarget.style.border = '3px solid indigo';
        e.currentTarget.style.cursor = 'default';
        const sideCheck = e.currentTarget.id.substr(e.currentTarget.id.length-1);
        for (let j = 0; j < heroStatsBlocks.length; j++) {
            heroStatsBlocks[j].removeEventListener("mouseover", addBlueBorder);
            heroStatsBlocks[j].removeEventListener("mouseleave", removeBlueBorder);
        }
        const charIndex = statCharSelected.id.substr(1, 1);
        const char = party[charIndex-1];
        
        statCharSelected.style.border = 'none';
        statCharSelected = null;

        for (let j = 0; j < statAbilities1.length; j++) {
            if (char.abilities[j]) {
                if (parseInt(sideCheck) === 1) { statAbilities1[j].style.display = '';
                } else { statAbilities2[j].style.display = ''; }
            } else {
                if (parseInt(sideCheck) === 1) { statAbilities1[j].style.display = 'none';
                } else { statAbilities2[j].style.display = 'none'; }
            }
        }
        
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
        statImg.src = document.getElementsByClassName(char.klass)[0].src;
        nameStat.innerHTML = `Level: ${char.level}`;
        levelStat.innerHTML = char.klass;
        hpStat.innerHTML = `Health: ${char.baseHP}`;
        dmgStat.innerHTML = `Power: ${Math.abs(char.baseDMG)}`
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
})



 
function addDeathListener(entity) {
    entity.observer = new MutationObserver(function(mutations) {
        mutations.forEach(function (mutationRecord) {
            if (mutationRecord.target.style.display === 'none') {
                // console.log(entity.imgName, 'style === none');
                if (entity.allied) {
                    delete livingChars[entity.imgName];
                } else {
                    levelXPGain += (livingEnemies[entity.imgName].level * 50);
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
        console.log('broken image passed in for', entity.imgName);
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

function styleAbilityBox(entity) {
    const aBoxes = document.getElementsByClassName(entity.imgName + '-inner-ability-divs');
    // const aLabels = document.getElementsByClassName(entity.imgName + '-ability-labels');
    for (let i = 0; i < aBoxes.length; i++) {
        aBoxes[i].style.width = aBoxes[i].offsetHeight + 'px';
    }
}

function select(entity) {
    entity.abilityContainer.style.display = '';
    currentAbilityBoxes = entity.abilityContainer;
    styleAbilityBox(entity);
    entity.img.style.border = '5px solid gold';
    selectedChar = entity;
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
    document.getElementById('level-button-container-header').style.display = '';
    document.getElementById('close-button').style.display = '';
}

function selectChar(entity) {
    if (!entity || entity.container.style.display === 'none' || entity.hp < 0) {
        return;
    }
    if (selectedChar && selectedChar.baseDMG < 0) {
        if (selectedChar.isAttacking) {
            // console.log('no change. Target: ', selectedChar.target, ' entity: ', entity);
            selectedChar.target = entity;
        } else {
            // console.log('heal target switched');
            selectedChar.autoAttack(entity);
        }
        deSelect();
        return;
    }
    deSelect();
    select(entity);
}

function selectEnemy(entity) {
    if (!selectedChar || selectedChar.hp < 0) {
        deSelect();
        return;
    } else if ((selectedChar.target === entity && selectedChar.isAttacking) || (entity.hp && entity.hp < 0)) {
        return;
    }
    if (selectedChar.allied && selectedChar.baseDMG > 0) {
        if (selectedChar.isAttacking && selectedChar.withinAttackRange(entity)) {
            selectedChar.target = entity;
        } else {
            selectedChar.autoAttack(entity);
        }
        for (let i = 0; i < selectedChar.abilities.length; i++) {
            if (selectedChar.abilityShouldCast[i] === true) {
                selectedChar.abilityShouldCast[i] = false;
                selectedChar.useAbility(i);
                // console.log('ability used on click event');
            }
        }
    }
}

const clickEvents = (e) => {
    // console.log(e);
    const entityName = e.target.id.slice(0, 2);
    // console.log(entityName);
    if (entityName[0] === 'a') {
        const entity = livingChars[entityName];
        selectChar(entity);
    } else {
        const entity = livingEnemies[entityName];
        selectEnemy(entity);
    }
    e.stopPropagation();
}

function keydownEvent (e) {
    const entity = hotkeys[e.key];
    if (entity && entity.allied) {
        selectChar(entity);
    } else if (entity && entity.klass) {
        selectEnemy(entity);
    } else if ((entity === 0 || entity) && selectedChar) {
        if (selectedChar.abilityShouldCast[entity] !== 1) {
            selectedChar.useAbility(entity);
        }
    } else {
        // console.log('invalid key press of: ', e.key);
        // console.log('value is: ', entity);
        // console.log(hotkeys);
    }
}

function abilityClick(arr) {
    const entity = livingChars['a'+arr[0]];
    if (entity) {
        if (entity.abilityShouldCast[arr[1]] !== 1) {
            entity.useAbility(arr[1]);
        }
    } else {
        // console.log('invalid entity for ability use');
    }
}

function setAbilityBoxes() {
    let abilityBoxes = [];
    // let abilityLabels = [];
    for (let i = 1; i < 5; i++) {
        abilityBoxes.push(document.getElementsByClassName(`a${i}-inner-ability-divs`));
        // abilityLabels.push(document.getElementsByClassName(`a${i}-ability-labels`));
    }
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
                deSelect();
                return;
            }
            if (selectedChar.range === 'infinite') {
                selectedChar.move([e.x, e.y], selectedChar.target);
            } else {
                selectedChar.move([e.x, e.y]);
            }
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
        document.getElementById('game-container').style.height = '100%';
        document.getElementById('background-image').style.height = '100%';
        document.getElementById('all-characters-ability-container').style.height = '0%';
        return;
    }
    const level = levels[levelNumber];
    if (level.characterList === null) {
        level.characterList = party;
    }
    levelHasEnded = false;
    currentLevelNumber = levelNumber;
    const shouldRandomizeEnemySpawns = level.action(level.characterList, level.enemyList);
    // console.log(shouldRandomizeEnemySpawns);
    if (shouldRandomizeEnemySpawns) {
        for (let i = 0; i < level.enemyList.length; i++) {
            level.enemyList[i].basePos = null;
            // console.log(level.enemyList[i]);
        }
    }
    // console.log('level selected: ', levelNumber);
    document.getElementById('return-button').style.display = '';
    document.getElementById('level-button-container').style.display = 'none';
    document.getElementById('level-button-container-header').style.display = 'none';
    const levelNameDisp = document.getElementById(`level-name-display`);
    levelNameDisp.innerHTML = level.name;
    const levelMessage = document.getElementById('tutorial-message');
    levelMessage.innerHTML = level.message;
    // const secondAction = () => beginLevel(level.characterList, level.enemyList, levelNumber);
    fadeIn(levelNameDisp);
    // const levelNameAction = () => { fadeIn(beginLevel); }
    const action = () => {
        fadeOut(levelNameDisp);
        fadeIn(beginLevel);
    }
    const beginLevel = document.getElementById('begin-level-button');
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
        // console.log(enemies[i], " has target set to: ", enemies[i].target);
    }
}

function setAvailableAbilities(char) {
    const abilities = document.getElementsByClassName(char.imgName + '-ability-boxes');
    const boxes = document.getElementsByClassName(char.imgName + '-inner-ability-divs');
    for (let i = 0; i < abilities.length; i++) {
        if (i < char.abilities.length) {
            abilities[i].style.display = '';
            boxes[i].style.display = '';
        } else {
            abilities[i].style.display = 'none';
            boxes[i].style.display = 'none';
        }
    }
}

function imagesTochingSide(topLeft1, sizes1, topLeft2, sizes2, i) {
    return ((topLeft1[i] < topLeft2[i] && topLeft1[i] + sizes1[i] > topLeft2[i])
        || (topLeft1[i] < topLeft2[i] + sizes2[i] && topLeft1[i] + sizes1[i] > topLeft2[i] + sizes2[i]));
}

function imagesTouching(topLeft1, sizes1, topLeft2, sizes2) {
    if (topLeft1[0] === topLeft2[0] || topLeft1[1] === topLeft2[1]) { return true; }
    for (let i = 0; i < 2; i++) {
        if (!imagesTochingSide(topLeft1, sizes1, topLeft2, sizes2, i)) {
            return false;
        }
    }
    return true;
}

function setRandomSpawn(enemy, checkPositions) {
    // console.log(checkPositions);
    let positionFound = false;
    let position = [0, 0];
    let p1;
    let p2;
    const container = document.getElementById('game-container');
    const width = Math.floor(container.offsetWidth);
    const height = Math.floor(container.offsetHeight);
    while (!positionFound) {
        positionFound = true;
        p1 = Math.random() * 0.75; // from 0% to 90%
        p2 = Math.random() * 0.8; // from 0% to 80%
        // console.log(p);
        position = [Math.floor(width * p2), Math.floor(height * p1)];
        // console.log(position);
        for (let i = 0; i < checkPositions.length; i++) {
            const cPos = checkPositions[i].basePos;
            const cSizes = [checkPositions[i].container.offsetWidth, checkPositions[i].container.offsetHeight];
            // const eSizes = [enemy.container.offsetWidth, enemy.container.offsetHeight];
            const eSizes = [150, 200]; // needs to be changed eventually for diff sized boxes
            // console.log(position, eSizes, cPos, cSizes);
            if (imagesTouching(position, eSizes, cPos, cSizes)) {
                // console.log('position was bad');
                positionFound = false;
                break;
            }
        }
    }
    // console.log('pos found');
    enemy.basePos = position;
    enemy.pos = position;
    // enemy.container.style.left = enemy.pos[0] + 'px';
    // enemy.container.style.top = enemy.pos[1] + 'px';
}

function reZeroStats(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].hp = arr[i].baseHP; arr[i].dmg = arr[i].baseDMG; arr[i].defense = arr[i].baseDefense;
        arr[i].ms = arr[i].baseMS; arr[i].stunned = false; arr[i].rooted = false; arr[i].slowed = false;
        arr[i].isAttacking = false; arr[i].isMoving = false;
        if (arr[i].allied) {
            arr[i].target = null;
        }
        if (arr[i].basePos) {
            arr[i].pos[0] = arr[i].basePos[0]; arr[i].pos[1] = arr[i].basePos[1];
        }
    }
}

function loadInEntity(entity, num, allies, enemies) {
    // console.log(entity);
    if (entity.allied) {
        entity.imgName = 'a' + (num);
        livingChars[entity.imgName] = entity;
    } else {
        entity.imgName = 'e' + (num);
        livingEnemies[entity.imgName] = entity;
    }
    addEntityEvents(entity, allies, enemies);
    if (!entity.basePos) {
        setRandomSpawn(entity, boxEntities.slice());
    }
    entity.addInlineStyle();
    hotkeys[entity.hotkey] = entity;
    entity.container.addEventListener('click', clickEvents);
    boxEntities.push(entity);
    if (entity.allied) {
        document.getElementById(`a${num}-class-name`).innerHTML = entity.klass;
        const abilityNames = document.getElementsByClassName(`a${num}-ability-labels`);
        setAvailableAbilities(entity);
        for (let j = 0; j < abilityNames.length; j++) {
            if (entity.abilityNames[j]) {
                abilityNames[j].innerHTML = entity.abilityNames[j];
            } else {
                abilityNames[j].innerHTML = 'No Ability';
            }
        }
        fadeIn(entity.container);
    } else {
        // console.log(entity.target);
        const action = () => entity.autoAttack(entity.target);
        fadeIn(entity.container, action); // begin attacking target
    }
    observerObserve(entity);
}

let boxEntities = [];
function loadInCharacters(charactersArr, enemiesArr, levelNumber) {
    document.getElementById('return-button').style.display = 'none';
    const deSelectButton = document.getElementById('test');
    fadeIn(deSelectButton);
    const backgroundImg = document.getElementById('background-image');
    if (levelNumber < 4) {
        backgroundImg.src = document.getElementById('forest').src;
    } else if (levelNumber < 7) {
        backgroundImg.src = document.getElementById('snowy').src;
    } else {
        backgroundImg.src = document.getElementById('dungeon').src;
    }
    fadeIn(backgroundImg);
    if (levels[levelNumber].shouldSetLevels) {
        levels[levelNumber].setEnemyLevels(levels[levelNumber].level/2);
    }
    for (let i = 0; i < 4; i++) {
        const abilityHotkey = document.getElementById(`ab${i + 1}-keybind`);
        hotkeys[abilityHotkey.value] = i;
    }
    reZeroStats(charactersArr);
    reZeroStats(enemiesArr);
    for (let i = 0; i < charactersArr.length; i++) {
        loadInEntity(charactersArr[i], i+1, charactersArr, enemiesArr);
    }
    // console.log(enemiesArr);
    for (let i = 0; i < enemiesArr.length; i++) {
        loadInEntity(enemiesArr[i], i+1, enemiesArr, charactersArr);
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
        clearInterval(allCharsList[i].currentAction);
        clearInterval(allCharsList[i].currentAnimation);
        allCharsList[i].container.removeEventListener('click', clickEvents);
        allCharsList[i].img.src = allCharsList[i].baseImg.src;
    }
    for (let i = 0; i < allEnemyList.length; i++) {
        allEnemyList[i].observer.disconnect();
        clearInterval(allEnemyList[i].currentAction);
        clearInterval(allEnemyList[i].currentAnimation);
        allEnemyList[i].container.removeEventListener('click', clickEvents);
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
    const widthExtra = width - (160 * 4);
    return ([Math.floor(widthExtra / 4), Math.floor(height * 0.66), Math.floor(width/10)]);
}

function endMoveChars(charsList) {
    moveFinishCount = 0;
    countToReach = charsList.length;
    const basePos = modEndPos(); // make into % values
    for (let i = 0; i < charsList.length; i++) {
        xpObserverObserve(charsList[i]);
        charsList[i].move([(i*160) + ((i+1)*basePos[0]), basePos[1]], false, true); // removed + basePos[2] from x side
    }
}

function addCharXP() {
    const c = Object.values(livingChars);
    // console.log(c);
    for (let i = 0; i < c.length; i++) {
        c[i].xpObserver.disconnect();
        const expWords = document.getElementById(c[i].imgName + '-exp-words');
        expWords.innerHTML = 'Level: ' + c[i].level;
        const leftBar = document.getElementById(c[i].imgName + '-inner-leftHP-bar');
        leftBar.style.backgroundColor = 'gold';
        const xpPercent = Math.floor((c[i].xp / c[i].nextLevelXP) * 100);
        c[i].hpContainerLeft.style.width = `${xpPercent}%`;
        c[i].hpContainerRight.style.width = `${100 - xpPercent}%`;
        const levelUpDisp = document.getElementById(c[i].imgName + '-level-up');
        levelUpDisp.style.top = Math.floor(c[i].pos[1] - 75) + 'px';
        levelUpDisp.style.left = Math.floor(c[i].pos[0]) + 'px';
    }
    fadeOutGame(true);
    const xpPerC = levelXPGain / c.length;
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
                c[i].setLevel(c[i].level + 1);
                const expWords = document.getElementById(c[i].imgName + '-exp-words');
                expWords.innerHTML = 'Level: ' + c[i].level;
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
    document.getElementById('level-button-container').style.display = '';
    document.getElementById('level-button-container-header').style.display = '';
    document.getElementById('close-button').style.display = '';
    document.getElementById('game-container').style.height = '100%';
    document.getElementById('background-image').style.height = '100%';
    document.getElementById('all-characters-ability-container').style.height = '0%';
    const levelButtons = document.getElementsByClassName('level-button');
    if (won && maxLevelNumber === currentLevelNumber) {
        if (levelButtons[maxLevelNumber]) {
            levelButtons[maxLevelNumber].style.opacity = 100 + '%';
            levelButtons[maxLevelNumber].style.cursor = 'pointer';
        }
        maxLevelNumber++;
    }
    const levChars = levels[currentLevelNumber].characterList;
    const levEnems = levels[currentLevelNumber].enemyList;
    for (let i = 0; i < levChars.length; i++) {
        levChars[i].container.remove();
    }
    for (let i = 0; i < levEnems.length; i++) {
        levEnems[i].container.remove();
    }
    levelXPGain = 0;
    boxEntities = [];
}

export default loadLevel;