// import * as characters from './entities/character';
// import * as enemies from './entities/enemy';
import loadLevel from './screen_controllers/entity_controller';
// import showControls from './screen_controllers/controls';

window.addEventListener('load', () => {
    const controlsContainer = document.getElementsByClassName('controls-display')[0];
    const closeButton = document.getElementsByClassName('close')[0];
    const startGameButton = document.getElementById('start-game-button');
    const controlsButton = document.getElementById('game-controls-button');
    const levelButtonContainer = document.getElementById('level-button-container');
    const levelButtons = document.getElementsByClassName('level-button');
    for (let i = 0; i < levelButtons.length; i++) {
        levelButtons[i].addEventListener('click', () => {
            closeButton.style.display = 'none';
            loadLevel(i);
        })
    }
    levelButtons[0].style.opacity = 100;
    levelButtons[0].style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        controlsContainer.style.display = 'none';
        startGameButton.style.display = '';
        controlsButton.style.display = '';
        levelButtonContainer.style.display = 'none';
        closeButton.style.display = 'none';
    })
    startGameButton.addEventListener('click', () => {
        startGameButton.style.display = "none";
        controlsButton.style.display = 'none';
        levelButtonContainer.style.display = '';
        closeButton.style.display = '';
    })
    controlsButton.addEventListener('click', () => {
        startGameButton.style.display = "none";
        controlsButton.style.display = 'none';
        controlsContainer.style.display = '';
        closeButton.style.display = '';
    })
})