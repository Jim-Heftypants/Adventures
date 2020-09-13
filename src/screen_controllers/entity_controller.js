import * as charactersObj from '../entities/character';
import * as enemiesObj from '../entities/enemy';

function setInitialTargets() {
    const chars = Object.values(charactersObj);
    const enemies = Object.values(enemiesObj);
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

function loadGame() {
    console.log('load game called');
    setInitialTargets();

    let selectedChar;

    const deSelectButton = document.getElementById('reset-selected');
    deSelectButton.addEventListener('click', () => {
        selectedChar = null;
    })

    const charactersArr = Object.values(charactersObj);
    const enemiesArr = Object.values(enemiesObj);

    for (let i = 0; i < charactersArr.length; i++) {
        if (charactersArr[i].imgName != "") {
            const c = charactersArr;
            c[i].img = document.getElementsByClassName(c[i].imgName + "-image-display")[0];
            c[i].baseImg = document.getElementsByClassName(c[i].imgName)[0]
            c[i].img.src = c[i].baseImg.src;
            c[i].attackImages = document.getElementsByClassName(c[i].imgName);
            const hpBar = document.getElementById(`${c[i].imgName}-hp-bar`);
            c[i].container = document.getElementById(`${c[i].imgName}-display`);

            c[i].img.style.display = "initial";
            hpBar.style.display = "flex";
            c[i].container.style.left = c[i].pos[0] + "px";
            c[i].container.style.top = c[i].pos[1] + "px";
            c[i].container.addEventListener("click", (e) => {
                console.log('character click');
                if (!selectedChar || selectedChar.hp < 0) {
                    selectedChar = c[i];
                    console.log('selected char: ', selectedChar.klass);
                } else if (selectedChar.baseDMG < 0) {
                    selectedChar.autoAttack(c[i]);
                    selectedChar = null;
                }
                e.stopPropagation();
            })
            c[i].enemies = enemiesArr;
            const cloneArr = c.slice();
            c[i].allies = cloneArr.splice(i, 1);
        }
    }
    for (let i = 0; i < enemiesArr.length; i++) {
        if (enemiesArr[i].imgName != "") {
            const e = enemiesArr;
            e[i].img = document.getElementsByClassName(e[i].imgName + "-image-display")[0];
            e[i].baseImg = document.getElementsByClassName(e[i].imgName)[0]
            e[i].img.src = e[i].baseImg.src;
            e[i].attackImages = document.getElementsByClassName(e[i].imgName);
            const hpBar = document.getElementById(`${e[i].imgName}-hp-bar`);
            e[i].container = document.getElementById(`${e[i].imgName}-display`);

            e[i].img.style.display = "initial";
            hpBar.style.display = "flex";
            e[i].container.style.left = e[i].pos[0] + "px";
            e[i].container.style.top = e[i].pos[1] + "px";
            e[i].container.addEventListener("click", (e) => {
                if (selectedChar.hp < 0) {
                    selectedChar = null;
                    return;
                }
                console.log('enemy click');
                if (selectedChar && selectedChar.allied && selectedChar.baseDMG > 0) {
                    selectedChar.autoAttack(enemiesArr[i]);
                    selectedChar = null;
                }
                e.stopPropagation(); // maybe move inside if
            })
            e[i].enemies = charactersArr;
            const cloneArr = e.slice();
            if (e[i].baseDMG > 0) { cloneArr.splice(i, 1); }
            e[i].allies = cloneArr
            e[i].autoAttack(e[i].target);
        }
    }

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

export default loadGame;