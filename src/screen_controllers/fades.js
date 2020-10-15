export function fadeOut(element, action = null) {
    let op = 40;
    let timerDown = setInterval(function () {
        if (op <= 0) {
            clearInterval(timerDown);
            element.style.display = 'none';
            if (action) { action(); }
        }
        element.style.opacity = op / 40;
        op -= 1;
    }, 50);
}

export function fadeIn(element, action = null) {
    let op = 0;
    let timerUp = setInterval(function () {
        if (op >= 40) {
            clearInterval(timerUp);
            if (action) { action(); }
        }
        element.style.opacity = op / 40;
        op += 1;
    }, 50);
}