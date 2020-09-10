import * as charactersObj from '../entities/character';
import * as enemiesObj from '../entities/enemy';

let characters = {};
// function drawImage(ctx, klass) {
//     const char = characters[klass];
//     const img = document.getElementsByClassName(char.imgName)[0];
//     ctx.drawImage(img, char.pos[0], char.pos[1], 300, 300);
// }

window.addEventListener("load", () => {
    // let c = document.getElementById("canvas");
    // let ctx = c.getContext("2d");

    let selectedChar;

    const charactersArr = Object.values(charactersObj);

    for (let i = 0; i < charactersArr.length; i++) {
        if (charactersArr[i].imgName != "") {
            charactersArr[i].img = document.getElementsByClassName(charactersArr[i].imgName)[0];
            charactersArr[i].img.style.display = "initial";
            charactersArr[i].img.style.left = charactersArr[i].pos[0];
            charactersArr[i].img.style.top = charactersArr[i].pos[1];
            charactersArr[i].img.addEventListener("click", (e) => {
                console.log('character click');
                if (!selectedChar) {
                    selectedChar = charactersObj.Warlock;
                    console.log('selected char: ', selectedChar.klass);
                }
                e.stopPropagation();
            })
        }
        characters[charactersArr[i].klass] = charactersArr[i];
    }
    console.log("heroes: ", characters);
    const enemiesArr = Object.values(enemiesObj);
    let enemies = {};
    for (let i = 0; i < enemiesArr.length; i++) {
        if (enemiesArr[i].imgName != "") {
            enemiesArr[i].img = document.getElementsByClassName(enemiesArr[i].imgName)[0];
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


// export default initializeGame;