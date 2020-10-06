import * as levelsObj from '../levels/level';
import {fadeIn, fadeOut} from './fades';

const levels = Object.values(levelsObj);
let currentLevelNumber = 0;

let selectedChar;

let livingEnemies = {};
let livingChars = {};

function addDeathListener(entity, level) {
    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            // console.log(entity.klass, 'style changed');
            // console.log(mutationRecord);
            if (mutationRecord.target.style.display === 'none') {
                console.log(entity.klass, 'style === none');
                if (entity.allied) {
                    delete livingChars[entity.klass];
                } else {
                    delete livingEnemies[entity.klass];
                }
                const c  = Object.values(livingChars);
                const en = Object.values(livingEnemies);
                if (c.length === 0 || en.length === 0) {
                    endGame(c, en, level);
                }
            }
        });
    })

    const element = entity.container;
    observer.observe(element, { attributes : true, attributeFilter : ['style'] });
}

function endGame(charsList, enemyList, level) {
    for (let i = 0; i < charsList.length; i++) {
        // fade out no action
        fadeOut(charsList[i].container);
    }
    for (let i = 0; i < enemyList.length; i++) {
        // fade out no action
        fadeOut(enemyList[i].container);
    } 
    
    let gameFadeTimer = setInterval(() => {
        console.log('fade called');
        let disp;
        let secondAction;
        if (charsList.length === 0) {
            disp = document.getElementById('game-over-display');
            secondAction = () => resetGame();
        } else {
            disp = document.getElementById('game-won-display');
            secondAction = () => resetGame(level);
        }
        disp.style.opacity = 0;
        disp.style.display = '';
        const action = () => fadeOut(disp, secondAction);
        fadeIn(disp, action);
        clearInterval(gameFadeTimer);
    }, 2000);
}

function resetGame(level) {
    livingChars = {};
    livingEnemies = {};
    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.style.display = 'none';
    const levelButtonContainer = document.getElementById('level-button-container');
    levelButtonContainer.style.display = '';
    if (level && currentLevelNumber === level) {
        currentLevelNumber++;
        const levelButtons = document.getElementsByClassName('level-button');
        levelButtons[currentLevelNumber].style.opacity = 100 + '%';
        levelButtons[currentLevelNumber].style.cursor = 'pointer';
    }
}

function spawnEntity(entity, allies, enemies, level) {
    if (entity.imgName != "") {
        addInlineStyle(entity);
        const action = () => {
            if (entity.allied) {
                addDeathListener(entity, level);
                entity.container.addEventListener("click", (e) => {
                    console.log('character click');
                    if (!selectedChar || selectedChar.hp < 0) {
                        selectedChar = entity;
                        entity.img.style.border = '2px solid gold';
                        console.log('selected char: ', selectedChar.klass);
                    } else if (selectedChar.baseDMG < 0) {
                        selectedChar.autoAttack(entity);
                        selectedChar.img.style.border = 'none';
                        selectedChar = null;
                    }
                    e.stopPropagation();
                })
            } else {
                entity.container.addEventListener("click", (e) => {
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
                })
            }
            entity.enemies = enemies;
            const cloneArr = allies.slice();
            let selfIndex;
            for (let i = 0; i < cloneArr.length; i++) {
                if (cloneArr[i].klass === entity.klass) { selfIndex = i; }
            }
            // remove self from allies list to prevent moving out of self image (healers excluded)
            if (entity.baseDMG > 0) { cloneArr.splice(selfIndex, 1); }
            entity.allies = cloneArr;
            if (!entity.allied) {
                entity.autoAttack(entity.target);
            }
        };
        fadeIn(entity.container, action);
    } else {
        console.log('broken image passed in for', entity.klass);
    }
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
        console.log(enemies[i].klass, "has target set to", enemies[i].target);
    }
}

function addInlineStyle(entity) {
    entity.img = document.getElementsByClassName(entity.imgName + "-image-display")[0];
    entity.baseImg = document.getElementsByClassName(entity.imgName)[0]
    entity.img.src = entity.baseImg.src;
    entity.attackImages = document.getElementsByClassName(entity.imgName);
    const hpBar = document.getElementById(`${entity.imgName}-hp-bar`);
    entity.container = document.getElementById(`${entity.imgName}-display`);
    entity.container.style.opacity = 0; // fading in so started at op 0
    entity.img.style.display = "";
    hpBar.style.display = "flex";
    entity.container.style.left = entity.pos[0] + "px";
    entity.container.style.top = entity.pos[1] + "px";
}

function setupEntities(charactersArr, enemiesArr, level) {
    for (let i = 0; i < charactersArr.length; i++) {
        livingChars[charactersArr[i].klass] = charactersArr[i];
        spawnEntity(charactersArr[i], charactersArr, enemiesArr, level);
    }
    for (let i = 0; i < enemiesArr.length; i++) {
        livingEnemies[enemiesArr[i].klass] = enemiesArr[i];
        spawnEntity(enemiesArr[i], enemiesArr, charactersArr, level);
    }
}

function initializeGameOpening(levelNumber) {
    console.log('level selected: ', levelNumber);
    console.log('highest level available: ', currentLevelNumber);
    if (levelNumber > currentLevelNumber) {
        return;
    }
    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.style.display = '';
    const levelButtonContainer = document.getElementById('level-button-container');
    levelButtonContainer.style.display = 'none';
    console.log('levels array: ', levels);
    loadLevel(levels[levelNumber], levelNumber);
}

function loadLevel(level, levelNumber) {
    const levelNameDisp = document.getElementById(`level-${levelNumber + 1}-name`);
    levelNameDisp.style.opacity = 0;
    levelNameDisp.style.display = '';
    const secondAction = () => beginLevel(level.characterList, level.enemyList, levelNumber);
    const action = () => fadeOut(levelNameDisp, secondAction);
    fadeIn(levelNameDisp, action);
}

function beginLevel(charactersArr, enemiesArr, level) {
    console.log('begin level called');
    setInitialTargets(charactersArr, enemiesArr);

    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.addEventListener('click', () => {
        selectedChar.img.style.border = 'none';
        selectedChar = null;
    })

    setupEntities(charactersArr, enemiesArr, level);

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
}

export default initializeGameOpening;