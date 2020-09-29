// import * as characters from './entities/character';
// import * as enemies from './entities/enemy';
import initializeGameOpening from './screen_controllers/entity_controller';
import showControls from './screen_controllers/controls';

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
        showControls();
    })
})