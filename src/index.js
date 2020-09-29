// import * as characters from './entities/character';
// import * as enemies from './entities/enemy';
import initializeGameOpening from './screen_controllers/entity_controller';
// import showControls from './screen_controllers/controls';

window.addEventListener('load', () => {
    const startGameButton = document.getElementById('start-game-button');
    const controlsButton = document.getElementById('game-controls-button');
    startGameButton.addEventListener('click', () => {
        startGameButton.style.display = "none";
        controlsButton.style.display = 'none';
        initializeGameOpening();
    })
    controlsButton.addEventListener('click', () => {
        startGameButton.style.display = "none";
        controlsButton.style.display = 'none';
        const controlsContainer = document.getElementsByClassName('controls-display')[0];
        const closeButton = document.getElementsByClassName('close')[0];
        closeButton.addEventListener('click', () => {
            controlsContainer.style.display = 'none';
            startGameButton.style.display = '';
            controlsButton.style.display = '';
        })
        controlsContainer.style.display = '';
    })
})