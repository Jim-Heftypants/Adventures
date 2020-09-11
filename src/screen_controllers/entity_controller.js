import * as charactersObj from '../entities/character';
import * as enemiesObj from '../entities/enemy';

let characters = {};
let enemies = {};

function setInitialTargets() {
    const chars = Object.values(charactersObj);
    const enemies = Object.values(enemiesObj);
    for (let i = 0; i < enemies.length; i++) {
        const targetIndex = Math.floor(Math.random() * chars.length);
        console.log("target index: ", targetIndex);
        enemies[i].target = chars[targetIndex];
        console.log(enemies[i].klass, "has target set to", enemies[i].target);
    }
}

function loadGame() {
    window.addEventListener("load", () => {
        setInitialTargets();

        let selectedChar;

        const deSelectButton = document.getElementById('reset-selected');
        deSelectButton.addEventListener('click', () => {
            selectedChar = null;
        })

        const charactersArr = Object.values(charactersObj);

        for (let i = 0; i < charactersArr.length; i++) {
            if (charactersArr[i].imgName != "") {
                charactersArr[i].img = document.getElementsByClassName(charactersArr[i].imgName + "-display")[0];
                charactersArr[i].baseImg = document.getElementsByClassName(charactersArr[i].imgName)[0]
                charactersArr[i].img.src = charactersArr[i].baseImg.src;
                charactersArr[i].attackImages = document.getElementsByClassName(charactersArr[i].imgName);
                charactersArr[i].img.style.display = "initial";
                charactersArr[i].img.style.left = charactersArr[i].pos[0] + "px";
                charactersArr[i].img.style.top = charactersArr[i].pos[1] + "px";
                charactersArr[i].img.addEventListener("click", (e) => {
                    console.log('character click');
                    if (!selectedChar) {
                        selectedChar = charactersArr[i];
                        console.log('selected char: ', selectedChar.klass);
                    } else if (selectedChar.baseDMG < 0) {
                        selectedChar.autoAttack(charactersArr[i]);
                        selectedChar = null;
                    }
                    e.stopPropagation();
                })
            }
            characters[charactersArr[i].klass] = charactersArr[i];
        }
        console.log("heroes: ", characters);
        const enemiesArr = Object.values(enemiesObj);
        for (let i = 0; i < enemiesArr.length; i++) {
            if (enemiesArr[i].imgName != "") {
                enemiesArr[i].img = document.getElementsByClassName(enemiesArr[i].imgName + "-display")[0];
                enemiesArr[i].baseImg = document.getElementsByClassName(enemiesArr[i].imgName)[0]
                enemiesArr[i].img.src = enemiesArr[i].baseImg.src;
                enemiesArr[i].attackImages = document.getElementsByClassName(enemiesArr[i].imgName);
                enemiesArr[i].img.style.display = "initial";
                enemiesArr[i].img.style.left = enemiesArr[i].pos[0] + "px";
                enemiesArr[i].img.style.top = enemiesArr[i].pos[1] + "px";
                enemiesArr[i].autoAttack(enemiesArr[i].target);
                enemiesArr[i].img.addEventListener("click", (e) => {
                    console.log('enemy click');
                    if (selectedChar && selectedChar.allied && selectedChar.baseDMG > 0) {
                        selectedChar.autoAttack(enemiesArr[i]);
                    }
                    e.stopPropagation(); // maybe move inside if
                })
            }
            enemies[enemiesArr[i].klass] = enemiesArr[i];
        }
        console.log("enemies: ", enemies);
        

        // end click position
        const gameContainer = document.getElementById('game-container');
        gameContainer.addEventListener("click", (e) => {
            console.log(e);
            if (selectedChar) {
                selectedChar.move([e.x, e.y]);
                selectedChar = null;
            }
        })

    })
}

export default loadGame;