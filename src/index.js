import loadLevel from './screen_controllers/entity_controller';

function slowFade(element, action = null) { let op = 80; let timerDown = setInterval(function () {if (op <= 0) { clearInterval(timerDown);
    element.style.display = 'none'; if (action) { action(); } } element.style.opacity = op / 40; op -= 1;}, 50);}

// const handleLoadCharClick = (e) => {
//     switch 
// }

window.addEventListener('load', () => {
    // const abilityBoxes = document.getElementsByClassName('inner-ability-div');

    const gameTag = document.getElementById('game-tag');
    gameTag.style.opacity = 0;
    gameTag.style.display = '';
    
    const wiz = document.getElementById('wizard-base-img');const ro = document.getElementById('rogue-base-img');
    const war = document.getElementById('warrior-base-img');const cle = document.getElementById('cleric-base-img');
    const charArr = [wiz, ro, war, cle];
    // const controlsContainer = document.getElementsByClassName('controls-display')[0];
    const closeButton = document.getElementsByClassName('close')[0];
    const hButtons = document.getElementsByClassName('h-button');
    // const startGameButton = document.getElementById('start-game-button');
    // const controlsButton = document.getElementById('game-controls-button');
    const keybindContainer = document.getElementById('full-keybind-container');
    const levelButtonContainer = document.getElementById('level-button-container');
    const levelButtons = document.getElementsByClassName('level-button');
    const backgroundImage = document.getElementById('background-image');
    const titleBackground = document.getElementById('title');

    const keybindInputs = document.getElementsByClassName('keybind-input');
    for (let i = 0; i < keybindInputs.length; i++) {
        keybindInputs[i].addEventListener("change", () => handleKeybindInput(keybindInputs[i], i));
    }

    function handleKeybindInput(input, i) {
        // console.log('pre-mod: ', input.value);
        if (input.value.length > 1) {
            input.value = input.value[0];
        } else {
            for (let j = 0; j < keybindInputs.length; j++) {
                if (i !== j && keybindInputs[j].value === input.value) { keybindInputs[j].value = ''; }
            }
        }
    }

    function secondAction() {
        const gTContainer = document.getElementById('game-tag-container');
        gTContainer.style.display = 'none';
        function closeAction() {
            // controlsContainer.style.display = 'none';
            for (let i = 0; i < hButtons.length; i++) { hButtons[i].style.display = ''; }
            // controlsButton.style.display = '';
            levelButtonContainer.style.display = 'none';
            keybindContainer.style.display = 'none';
            closeButton.style.display = 'none';
            for (let i = 0; i < 4; i++) {
                charArr[i].style.display = '';
            }
            backgroundImage.src = titleBackground.src;
            backgroundImage.style.opacity = 100;
            backgroundImage.style.display = '';
        }
        closeAction();
        for (let i = 0; i < levelButtons.length; i++) {
            levelButtons[i].addEventListener('click', () => { 
                closeButton.style.display = 'none';
                // closeButton.removeEventListener('click', closeAction);
                for (let i = 0; i < 4; i++) {
                    charArr[i].style.display = 'none';
                }
                backgroundImage.style.display = 'none';
                loadLevel(i); 
            })
        }
        levelButtons[0].style.opacity = 100;
        levelButtons[0].style.cursor = 'pointer';
        closeButton.addEventListener('click', closeAction)
        hButtons[0].addEventListener('click', () => {
            for (let i = 0; i < hButtons.length; i++) { hButtons[i].style.display = 'none'; }
            levelButtonContainer.style.display = '';
            closeButton.style.display = '';
            for (let i = 0; i < 4; i++) {
                charArr[i].style.display = 'none';
            }
            backgroundImage.style.display = 'none';
        })
        hButtons[1].addEventListener('click', () => {
            for (let i = 0; i < hButtons.length; i++) { hButtons[i].style.display = 'none'; }
            keybindContainer.style.display = '';
            closeButton.style.display = '';
            for (let i = 0; i < 4; i++) {
                charArr[i].style.display = 'none';
            }
            backgroundImage.style.display = 'none';
        })
    }
    slowFade(gameTag, secondAction);
})