// import * as characters from './entities/character';
// import * as enemies from './entities/enemy';
import initializeGameOpening from './screen_controllers/entity_controller';

window.addEventListener('load', () => {
    const startGameButton = document.getElementById('start-game-button');
    startGameButton.addEventListener('click', () => {
        startGameButton.style.display = "none";
        initializeGameOpening();
    })
})