export function fadeOut(element, action = null) {
    let op = 20;
    let timerDown = setInterval(function () {
        if (op <= 0) {
            clearInterval(timerDown);
            element.style.display = 'none';
            if (action) { action(); }
        }
        element.style.opacity = op / 20;
        op -= 1;
    }, 100);
}

export function fadeIn(element, action = null) {
    let op = 0;
    let timerUp = setInterval(function () {
        if (op >= 20) {
            clearInterval(timerUp);
            if (action) { action(); }
        }
        element.style.opacity = op / 20;
        op += 1;
    }, 100);
}