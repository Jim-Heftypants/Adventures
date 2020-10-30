const groupHeal = (entity) => {
    for (let i = 0; i < entity.allies.length; i++) {
        if (entity.allies[i].hp > 0) {
            entity.allies[i].hp -= entity.dmg * 2;
            if (entity.allies[i].hp > 100) { entity.allies[i].hp = 100; }
            entity.setOverlay(entity.allies[i]);
            entity.allies[i].setHpBars();
            setBorder(entity);
        }
    }
    return 10;
}

const powerSwing = (entity) => {
    if (!entity.target || !entity.withinAttackRange(entity.target) || entity.target.hp < 0) {
        entity.abilityShouldCast[0] = true;
        // document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.border = '5px solid black';
        document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.backgroundColor = 'lawngreen';
        return false;
    }
    entity.target.hp -= Math.ceil(entity.dmg * 1.5);
    // knockbackTarget(entity, 80);
    entity.target.setHpBars();
    entity.target.stunned = true;
    entity.target.img.src = entity.target.baseImg.src;
    entity.target.imgCycle = 0;
    setBorder(entity);
    if (entity.target.hp <= 0) {
        entity.killEntitiy(entity.target);
    }
    setTimeout(() => {entity.target.stunned = false;}, 2000);
    return 10;
}

const poisonDagger = (entity) => {
    if (!entity.target || !entity.withinAttackRange(entity.target) || entity.target.hp < 0) {
        entity.abilityShouldCast[0] = true;
        // document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.border = '5px solid black';
        document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.backgroundColor = 'lawngreen';
        return false;
    }
    let timer = 0;
    entity.target.slowed = 50;
    entity.target.ms -= Math.floor(entity.target.baseMS / 2);
    let int = setInterval(() => {
        timer++;
        entity.target.hp -= Math.floor(Math.ceil(entity.dmg * 1.5) / 6);
        entity.target.setHpBars();
        setBorder(entity);
        if (entity.target.hp <= 0) {
            entity.killEntitiy(entity.target);
            clearInterval(int)
        }
        if (timer > 5) {
            clearInterval(int);
            entity.target.slowed = false;
            entity.target.ms += Math.floor(entity.target.baseMS / 2);
        }
    }, 500)
    return 10;
}

const meteor = (entity) => {
    if (!entity.target || entity.target.hp < 0) {
        entity.abilityShouldCast[0] = true;
        // document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.border = '5px solid black';
        document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.backgroundColor = 'lawngreen';
        return false;
    }
    const fireblastDiv = document.getElementById('fireblast-div');
    spellTrack(fireblastDiv, entity, entity.target, (entity, img) => {
        // console.log('entity: ', entity, " img: ", img);
        img.style.display = 'none';
        causeAoEEffect(entity, 300, 300);
    });
    return 10;
}

function setBorder(entity) {
    const targetChar = entity.target;
    if (targetChar.img.style.border !== "5px solid gold") {
        if (entity.baseDMG > 0) {
            targetChar.img.style.border = "4px solid red";
        } else {
            targetChar.img.style.border = "4px solid green";
        }
        let borderInterval = setInterval(() => {
            if (targetChar.img.style.border !== "5px solid gold") {
                targetChar.img.style.border = "none";
            }
            clearInterval(borderInterval);
        }, 500);
    }
}

const warriorAbilities = [powerSwing];
const clericAbilities = [groupHeal];
const wizardAbilities = [meteor];
const rogueAbilities = [poisonDagger];
export const allAbilities = [warriorAbilities, clericAbilities, wizardAbilities, rogueAbilities];


const lightningAutoAttack = (entity) => {
    // const effectDiv = document.getElementById(entity.imgName + '-extra-effect');
    let pos = [entity.pos[0] + 30 + entity.img.width / 2, entity.pos[1] + 38];
    if (entity.img.style.transform === "scaleX(-1)") {
        pos[0] -= 60
    }
    const div = drawLine(pos[0], pos[1], entity.target.pos[0] + entity.target.img.width/2, entity.target.pos[1] + entity.target.img.height/2);
    const maxTime = Math.floor(entity.as / 8);
    setTimeout(() => { div.remove(); }, maxTime);
}

export const specialAttackEffects = [lightningAutoAttack];

function knockbackTarget(entity, distance) {
    const dX = entity.target.pos[0] - entity.pos[0];
    const dY = entity.target.pos[1] - entity.pos[1];
    const hypotenuse = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
    const xRatio = dX / hypotenuse;
    const yRatio = dY / hypotenuse;
    const xRight = distance * xRatio;
    const yDown = distance * yRatio;
    entity.target.pos[0] += Math.floor(xRight);
    entity.target.pos[1] += Math.floor(yDown);
    entity.target.container.style.left = entity.target.pos[0] + 'px';
    entity.target.container.style.top = entity.target.pos[1] + 'px';
}

function causeAoEEffect(entity, width, height) {
    const targetCenter = [entity.target.pos[0] + Math.floor(entity.target.img.width / 2),
        entity.target.pos[1] + Math.floor(entity.target.img.height/2)];
    const topLeft1 = [targetCenter[0] - Math.floor(width / 2), targetCenter[1] - Math.floor(height / 2)];
    const div = document.createElement("div");
    const leftSetback = (width - entity.target.container.offsetWidth) / 2;
    const topSetback = (height - entity.target.container.offsetHeight) / 2;
    div.style.position = "absolute";
    div.style.left = entity.target.pos[0] - leftSetback + 'px';
    div.style.top = entity.target.pos[1] - topSetback + 'px';
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.background = "red";
    div.style.zIndex = "8";
    document.getElementById("game-container").appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 750);
    for (let i = 0; i < entity.enemies.length; i++) {
        if (entity.enemies[i].container.style.display !== 'none') {
            if (imagesTouching(topLeft1, [width, height], entity.enemies[i].pos, [entity.enemies[i].img.width, entity.enemies[i].img.height])) {
                entity.enemies[i].hp -= Math.ceil(entity.dmg * 1.5);
                entity.enemies[i].setHpBars();
                setBorder(entity.enemies[i]);
                if (entity.enemies[i].hp <= 0) {
                    entity.killEntitiy(entity.enemies[i]);
                }
            }
        }
    }
}

function imageInside(topLeft1, sizes1, topLeft2, sizes2) {
    return (topLeft1[0] > topLeft2[0] && topLeft1[0] + sizes1[0] < topLeft2[0] + sizes2[0]
                && topLeft1[1] > topLeft2[1] && topLeft1[1] + sizes1[1] < topLeft2[1] + sizes2[1]);
}

function imagesTochingSide(topLeft1, sizes1, topLeft2, sizes2, i) {
    return (topLeft1[i] < topLeft2[i] && topLeft1[i] + sizes1[i] > topLeft2[i]
        || topLeft1[i] < topLeft2[i] + sizes2[i] && topLeft1[i] + sizes1[i] > topLeft2[i] + sizes2[i]);
}

function imagesTouching(topLeft1, sizes1, topLeft2, sizes2) {
    for (let i = 0; i < 2; i++) {
        if (!imagesTochingSide(topLeft1, sizes1, topLeft2, sizes2, i)) {
            return false;
        }
    }
    return true;
}

function createLineElement(x, y, length, angle) {
    var styles = 'width: ' + length + 'px; '
        + 'height: 0px; '
        + '-moz-transform: rotate(' + angle + 'rad); '
        + '-webkit-transform: rotate(' + angle + 'rad); '
        + '-o-transform: rotate(' + angle + 'rad); '
        + '-ms-transform: rotate(' + angle + 'rad); '
        + 'position: absolute; '
        + 'top: ' + y + 'px; '
        + 'left: ' + x + 'px; '
        + 'border: 2px solid purple; ';
    let div = document.createElement("div");
    div.setAttribute('style', styles);
    div.classList.add("extra-attack-effect");
    document.getElementById("game-container").appendChild(div);
    return div;
    
}

function drawLine(x1, y1, x2, y2) {
    const a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    const sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    const x = sx - c / 2,
        y = sy;

    const alpha = Math.PI - Math.atan2(-b, a);

    return createLineElement(x, y, c, alpha);
}

function spellTrack(img, entity, target, action) {
    // console.log('img: ', img, ' entity: ', entity, ' target: ', target);
    const changedPos = entity.pos.slice();
    changedPos[0] += entity.img.width / 2; changedPos[1] += entity.img.height/2;
    img.style.top = Math.floor(changedPos[1]) + 'px';
    img.style.left = Math.floor(changedPos[0]) + 'px';
    img.style.display = '';
    const targetImg = target.img;
    let interval = setInterval(() => move(), 20);
    function move() {
        if (img.style.display === 'none' || target.container.style.display === 'none') {
            clearInterval(interval);
            img.style.display = 'none';
            // console.log('no target to hit with: ', img);
            return;
        }
        const left = parseInt(img.style.left.replace('px', ''), 10);
        const top = parseInt(img.style.top.replace('px', ''), 10);
        if (imageInside([left, top], [img.offsetWidth, img.offsetHeight], target.pos, [targetImg.width, targetImg.height])) {
            // console.log('images touching');
            clearInterval(interval);
            img.style.display = 'none';
            action(entity, img);
        } else {
            const targetPos = target.pos.slice();
            targetPos[0] += targetImg.width/2; targetPos[1] += targetImg.height/2;
            let posChange = vectorToScalar(changedPos, targetPos);
            changedPos[0] += posChange[0]; changedPos[1] += posChange[1];
            img.style.top = Math.floor(changedPos[1]) + 'px';
            img.style.left = Math.floor(changedPos[0]) + 'px';
        }
    }
}

function vectorToScalar(pos, endPos) {
    const ms = 15;
    const deltaX = pos[0] - endPos[0];
    const deltaY = pos[1] - endPos[1];
    if (Math.abs(deltaX) + Math.abs(deltaY) === 0) { return ([0, 0]); }
    let xChange = -1 * ms * (deltaX / (Math.abs(deltaX) + Math.abs(deltaY)));
    let yChange = -1 * ms * (deltaY / (Math.abs(deltaY) + Math.abs(deltaX)));
    if (xChange === 0 || xChange === -0) {
        xChange = 0;
        // const numRepeats = Math.abs(Math.floor(deltaY / yChange)); // not needed for a track system
        return ([xChange, yChange])
    }
    if (yChange === -0) { yChange = 0; }
    // const numRepeats = Math.abs(Math.floor(deltaX / xChange));
    return ([xChange, yChange])
}