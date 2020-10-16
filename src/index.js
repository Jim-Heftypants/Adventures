import loadLevel from './screen_controllers/entity_controller';

function slowFade(element, action = null) { let op = 80; let timerDown = setInterval(function () {if (op <= 0) { clearInterval(timerDown);
    element.style.display = 'none'; if (action) { action(); } } element.style.opacity = op / 40; op -= 1;}, 50);}

// const handleLoadCharClick = (e) => {
//     switch 
// }

window.addEventListener('load', () => {
    const gameTag = document.getElementById('game-tag');
    gameTag.style.opacity = 0;
    gameTag.style.display = '';
    
    const wiz = document.getElementById('wizard-base-img');const ro = document.getElementById('rogue-base-img');
    const war = document.getElementById('warrior-base-img');const cle = document.getElementById('cleric-base-img');
    const charArr = [wiz, ro, war, cle];
    // const controlsContainer = document.getElementsByClassName('controls-display')[0];
    const closeButton = document.getElementsByClassName('close')[0];
    const startGameButton = document.getElementById('start-game-button');
    // const controlsButton = document.getElementById('game-controls-button');
    const levelButtonContainer = document.getElementById('level-button-container');
    const levelButtons = document.getElementsByClassName('level-button');
    const backgroundImage = document.getElementById('background-image');

    function secondAction() {
        const gTContainer = document.getElementById('game-tag-container');
        gTContainer.style.display = 'none';
        function closeAction() {
            // controlsContainer.style.display = 'none';
            startGameButton.style.display = '';
            // controlsButton.style.display = '';
            levelButtonContainer.style.display = 'none';
            closeButton.style.display = 'none';
            for (let i = 0; i < 4; i++) {
                charArr[i].style.display = '';
            }
            backgroundImage.style.display = '';
        }
        closeAction();
        for (let i = 0; i < levelButtons.length; i++) {
            levelButtons[i].addEventListener('click', () => { 
                closeButton.style.display = 'none';
                closeButton.removeEventListener('click', closeAction);
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
        startGameButton.addEventListener('click', () => {
            startGameButton.style.display = "none";
            // controlsButton.style.display = 'none';
            levelButtonContainer.style.display = '';
            closeButton.style.display = '';
            for (let i = 0; i < 4; i++) {
                charArr[i].style.display = 'none';
            }
            backgroundImage.style.display = 'none';
        })
        // controlsButton.addEventListener('click', () => {
        //     startGameButton.style.display = "none";
        //     controlsButton.style.display = 'none';
        //     controlsContainer.style.display = '';
        //     closeButton.style.display = '';
        //     for (let i = 0; i < 4; i++) {
        //         charArr[i].style.display = 'none';
        //     }
        // })
    }
    slowFade(gameTag, secondAction);
})