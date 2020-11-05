import loadLevel from './screen_controllers/entity_controller';

function slowFade(element, action = null) { let op = 80; let timerDown = setInterval(function () {if (op <= 0) { clearInterval(timerDown);
    element.style.display = 'none'; if (action) { action(); } } element.style.opacity = op / 40; op -= 1;}, 50);}

window.addEventListener('load', () => {
    let dispLevelsScreenMessage = true;
    let dispHeroesScreenMessage = true;
    let dispPartyScreenMessage = true;

    const gameTag = document.getElementById('game-tag');
    gameTag.style.opacity = 0;
    gameTag.style.display = '';
    
    const charsDisp = document.getElementById('title-screen-chars');
    const closeButton = document.getElementById('close-button');
    const hButtons = document.getElementsByClassName('h-buttons')[0];
    const hButton = document.getElementsByClassName('h-button');
    const keybindContainer = document.getElementById('full-keybind-container');
    const levelButtonContainer = document.getElementById('level-button-container');
    const levelButtonHeader = document.getElementById("level-button-container-header");
    const statsContainer = document.getElementById('heroes-stats-full-container');
    const levelButtons = document.getElementsByClassName('level-button');
    const backgroundImage = document.getElementById('background-image');
    const titleBackground = document.getElementById('title');
    const gameContainer = document.getElementById('game-container');
    const partySelectorContainer = document.getElementById('party-selector-container');
    const storyContainer = document.getElementById('story-container');

    const shader = document.getElementById('first-description-shader');
    const screenDescriptions = document.getElementsByClassName('screen-description');
    shader.addEventListener('click', () => {
        for (let i = 0; i < screenDescriptions.length; i++) {
            screenDescriptions[i].style.display = 'none';
        }
        shader.style.display = 'none';
    })

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
            hButtons.style.display = '';
            // controlsButton.style.display = '';
            levelButtonHeader.style.display = 'none';
            levelButtonContainer.style.display = 'none';
            keybindContainer.style.display = 'none';
            statsContainer.style.display = 'none';
            closeButton.style.display = 'none';
            partySelectorContainer.style.display = 'none';
            storyContainer.style.display = 'none';
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
                gameContainer.style.height = '88%';
                document.getElementById('background-image').style.height = gameContainer.offsetHeight + 'px';
                document.getElementById('all-characters-ability-container').style.height = '12%';
                loadLevel(i+1); 
            })
        }
        levelButtons[0].style.opacity = 100;
        levelButtons[0].style.cursor = 'pointer';
        closeButton.addEventListener('click', closeAction)
        let hButtonPartialAction = () => {
            hButtons.style.display = 'none';
            closeButton.style.display = '';
            charsDisp.style.display = 'none';
            backgroundImage.style.display = 'none';
        }
        hButton[0].addEventListener('click', () => {
            hButtonPartialAction();
            if (hButton[3].style.display === '') {
                storyContainer.style.display = '';
            } else {
                levelButtonContainer.style.display = '';
                levelButtonHeader.style.display = '';
            }
            if (dispLevelsScreenMessage) {
                document.getElementById('levels-screen-description').style.display = '';
                shader.style.display = '';
                dispLevelsScreenMessage = false;
            }
        })
        hButton[1].addEventListener('click', () => {
            hButtonPartialAction();
            keybindContainer.style.display = '';
        })
        hButton[2].addEventListener('click', () => {
            hButtonPartialAction();
            statsContainer.style.display = '';
            if (dispHeroesScreenMessage) {
                document.getElementById('heroes-screen-description').style.display = '';
                shader.style.display = '';
                dispHeroesScreenMessage = false;
            }
        })
        hButton[3].addEventListener('click', () => {
            hButtonPartialAction();
            partySelectorContainer.style.display = '';
            // if (dispPartyScreenMessage) {
            //     document.getElementById('party-screen-description').style.display = '';
            //     shader.style.display = '';
            //     dispPartyScreenMessage = false;
            // }
        })
    }
    slowFade(gameTag, secondAction);
})