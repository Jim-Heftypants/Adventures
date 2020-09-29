import * as levelsObj from '../levels/level';

const levels = Object.values(levelsObj);
let currentLevel = levels[0];

let selectedChar;

let livingEnemies = {};
let livingChars = {};

function addDeathListener(entity) {
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
                    endGame(c, en);
                }
            }
        });
    })

    const element = entity.container;
    observer.observe(element, { attributes : true, attributeFilter : ['style'] });
}

function endGame(charsList, enemyList) {
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
        if (charsList.length === 0) {
            disp = document.getElementById('game-over-display');
        } else {
            disp = document.getElementById('game-won-display');
        }
        disp.style.opacity = 0;
        disp.style.display = '';
        const action = () => fadeOut(disp);
        fadeIn(disp, action);
        clearInterval(gameFadeTimer);
    }, 2000);
}

function spawnEntity(entity, allies, enemies) {
    if (entity.imgName != "") {
        addInlineStyle(entity);
        const action = () => {
            if (entity.allied) {
                addDeathListener(entity);
                entity.container.addEventListener("click", (e) => {
                    console.log('character click');
                    if (!selectedChar || selectedChar.hp < 0) {
                        selectedChar = entity;
                        console.log('selected char: ', selectedChar.klass);
                    } else if (selectedChar.baseDMG < 0) {
                        selectedChar.autoAttack(entity);
                        selectedChar = null;
                    }
                    e.stopPropagation();
                })
            } else {
                entity.container.addEventListener("click", (e) => {
                    if (selectedChar.hp < 0) {
                        selectedChar = null;
                        return;
                    }
                    console.log('enemy click');
                    if (selectedChar && selectedChar.allied && selectedChar.baseDMG > 0) {
                        selectedChar.autoAttack(entity);
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

function setupEntities(charactersArr, enemiesArr) {
    for (let i = 0; i < charactersArr.length; i++) {
        livingChars[charactersArr[i].klass] = charactersArr[i];
        spawnEntity(charactersArr[i], charactersArr, enemiesArr);
    }
    for (let i = 0; i < enemiesArr.length; i++) {
        livingEnemies[enemiesArr[i].klass] = enemiesArr[i];
        spawnEntity(enemiesArr[i], enemiesArr, charactersArr);
    }
}

function initializeGameOpening() {
    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.style.display = '';
    loadLevel(currentLevel);
}

function fadeOut(element, level=null) {
    let op = 20;
    let timerDown = setInterval(function () {
        if (op <= 0) {
            clearInterval(timerDown);
            element.style.display = 'none';
            if (level) {
                beginLevel(level.characterList, level.enemyList);
            }
        }
        element.style.opacity = op / 20;
        op -= 1;
    }, 100);
}

function fadeIn(element, action=null) {
    let op = 0;
    let timerUp = setInterval(function () {
        if (op >= 20) {
            clearInterval(timerUp);
            if (action) { action() }
        }
        element.style.opacity = op / 20;
        op += 1;
    }, 100);
}

function loadLevel(level) {
    const levelNameDisp = document.getElementById(`level-${level.name}-name`);
    levelNameDisp.style.opacity = 0;
    levelNameDisp.style.display = '';
    const action = () => fadeOut(levelNameDisp, level);
    fadeIn(levelNameDisp, action);
}

function beginLevel(charactersArr, enemiesArr) {
    console.log('load game called');
    setInitialTargets(charactersArr, enemiesArr);

    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.addEventListener('click', () => {
        selectedChar = null;
    })

    setupEntities(charactersArr, enemiesArr);

    // end click position
    const gameContainer = document.getElementById('game-container');
    gameContainer.addEventListener("click", (e) => {
        console.log(e);
        if (selectedChar) {
            if (selectedChar.hp < 0) {
                selectedChar = null;
                return;
            }
            selectedChar.move([e.x, e.y]);
            selectedChar = null;
        }
    })
}

export default initializeGameOpening;