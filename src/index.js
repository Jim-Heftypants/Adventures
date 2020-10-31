import loadLevel from './screen_controllers/entity_controller';

function slowFade(element, action = null) { let op = 80; let timerDown = setInterval(function () {if (op <= 0) { clearInterval(timerDown);
    element.style.display = 'none'; if (action) { action(); } } element.style.opacity = op / 40; op -= 1;}, 50);}

window.addEventListener('load', () => {

    const gameTag = document.getElementById('game-tag');
    gameTag.style.opacity = 0;
    gameTag.style.display = '';
    
    const charsDisp = document.getElementById('title-screen-chars');
    const closeButton = document.getElementById('close-button');
    const hButtons = document.getElementsByClassName('h-button');
    const keybindContainer = document.getElementById('full-keybind-container');
    const levelButtonContainer = document.getElementById('level-button-container');
    const levelButtonHeader = document.getElementById("level-button-container-header");
    const statsContainer = document.getElementById('heroes-stats-full-container');
    const levelButtons = document.getElementsByClassName('level-button');
    const backgroundImage = document.getElementById('background-image');
    const titleBackground = document.getElementById('title');
    const gameContainer = document.getElementById('game-container');
    const partySelectorContainer = document.getElementById('party-selector-container');

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
            levelButtonHeader.style.display = 'none';
            levelButtonContainer.style.display = 'none';
            keybindContainer.style.display = 'none';
            statsContainer.style.display = 'none';
            closeButton.style.display = 'none';
            partySelectorContainer.style.display = 'none';
            charsDisp.style.display = '';
            backgroundImage.src = titleBackground.src;
            backgroundImage.style.opacity = 100;
            backgroundImage.style.display = '';
        }
        closeAction();
        for (let i = 0; i < levelButtons.length; i++) {
            levelButtons[i].addEventListener('click', () => { 
                closeButton.style.display = 'none';
                // closeButton.removeEventListener('click', closeAction);
                charsDisp.style.display = 'none';
                backgroundImage.style.display = 'none';
                document.getElementById('background-image').style.height = '88%';
                gameContainer.style.height = '88%';
                document.getElementById('all-characters-ability-container').style.height = '12%';
                loadLevel(i+1); 
            })
        }
        levelButtons[0].style.opacity = 100;
        levelButtons[0].style.cursor = 'pointer';
        closeButton.addEventListener('click', closeAction)
        let hButtonPartialAction = () => {
            for (let i = 0; i < hButtons.length; i++) { hButtons[i].style.display = 'none'; }
            closeButton.style.display = '';
            charsDisp.style.display = 'none';
            backgroundImage.style.display = 'none';
        }
        hButtons[0].addEventListener('click', () => {
            hButtonPartialAction();
            levelButtonContainer.style.display = '';
            levelButtonHeader.style.display = '';
        })
        hButtons[1].addEventListener('click', () => {
            hButtonPartialAction();
            keybindContainer.style.display = '';
        })
        hButtons[2].addEventListener('click', () => {
            hButtonPartialAction();
            statsContainer.style.display = '';
        })
        hButtons[3].addEventListener('click', () => {
            hButtonPartialAction();
            partySelectorContainer.style.display = '';
        })

    }
    slowFade(gameTag, secondAction);
})