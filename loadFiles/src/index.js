import loadLevel from './screen_controllers/entity_controller';

let app;
document.addEventListener('DOMContentLoaded', (event) => {
    app = firebase.app();
    console.log(app);
})


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

    const topRightAuthContainer = document.getElementById('full-auth-container');
    const authButtonsContainer = document.getElementById('auth-container');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const authShader = document.getElementById('auth-shader');
    const authInputContainer = document.getElementById('auth-input-container');
    const authSubmitButton = document.getElementById('auth-form-submit');
    const authInputs = document.getElementsByClassName('auth-form-input');
    const signedInDisplay = document.getElementById('auth-signedin-container');

    let signedIn = false;

    document.getElementById('google-button').addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                authButtonsContainer.style.display = 'none';
                authInputContainer.style.display = 'none';
                authShader.style.display = 'none';
                document.getElementById('username-display').innerHTML = user.displayName;
                signedInDisplay.style.display = '';
                console.log(user);
            })
            .catch(console.log)
    })

    authSubmitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const email = authInputs[0].value.slice();
        authInputs[0].value = '';
        const password = authInputs[1].value.slice();
        authInputs[1].value = '';

        authButtonsContainer.style.display = 'none';
        authInputContainer.style.display = 'none';
        authShader.style.display = 'none';
        document.getElementById('username-display').innerHTML = email;
        signedInDisplay.style.display = '';

        console.log(email);
        console.log(password);

    })

    authShader.addEventListener('click', () => {
        authShader.style.display = 'none';
        authShader.style.opacity = '0%';
        authInputContainer.style.display = 'none';
    })
    function animateShader(loadElement) {
        let op = 0;
        authShader.style.opacity = op + '%';
        authShader.style.display = '';
        let shaderInt = setInterval(() => {
            if (authShader.style.display === 'none') {
                clearInterval(shaderInt);
                authShader.style.opacity = '0%';
                authInputContainer.style.display = 'none';
            }
            // authShader.style.height = authShader.offsetHeight + (gameContainer.offsetHeight / 100);
            op += 1;
            authShader.style.opacity = op + '%';
            if (op >= 80) {
                clearInterval(shaderInt);
                authInputContainer.style.display = '';
                document.getElementById('form-name').innerHTML = loadElement;
            }
        }, 10);
    }

    loginButton.addEventListener('click', () => { animateShader("Login"); })
    signupButton.addEventListener('click', () => { animateShader("Signup"); })

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
            topRightAuthContainer.style.display = '';
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
            topRightAuthContainer.style.display = 'none';
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