export function fadeOut(element, action = null, iterations=40) {
    let op = iterations;
    let timerDown = setInterval(function () {
        if (op <= 0) {
            clearInterval(timerDown);
            element.style.display = 'none';
            if (action) { action(); }
        }
        element.style.opacity = op / iterations;
        op -= 1;
        if (element.style.display === 'none') {
            clearInterval(timerDown);
            element.style.opacity = 0;
        }
    }, 50);
}

export function fadeIn(element, action = null, iterations=40) {
    let op = 0;
    let timerUp = setInterval(function () {
        if (op >= iterations) {
            clearInterval(timerUp);
            if (action) { action(); }
        }
        element.style.opacity = op / iterations;
        op += 1;
        if (element.style.display === 'none') {
            clearInterval(timerUp);
            element.style.opacity = 0;
        }
    }, 50);
}