//                              Paladin Abiities

const wordOfHealing = (entity) => {
    // console.log(entity.allies);
    let idx = 0;
    let lowest = 2000;
    for (let i = 0; i < entity.allies.length; i++) {
        if (entity.allies[i].hp > 0 && entity.allies[i].hp < lowest) {
            lowest = entity.allies[i].hp;
            idx = i;
        }
    }
    // console.log('lowest hp: ', lowest);
    // console.log('idx: ', idx);
    if (entity.hp < lowest) {
        // console.log(entity.klass);
        // console.log('hp: ', entity.hp);
        entity.hp += Math.floor(entity.dmg * 2.5);
        if (entity.hp > entity.baseHP) {
            entity.hp = entity.baseHP;
        }
        entity.setHpBars();
        setBorder(entity, "green");
        // console.log('hp: ', entity.hp);
    } else {
        // console.log(entity.allies[idx].klass);
        // console.log('hp: ', entity.allies[idx].hp);
        entity.allies[idx].hp += Math.floor(entity.dmg * 2.5);
        if (entity.allies[idx].hp > entity.allies[idx].baseHP) {
            entity.allies[idx].hp = entity.allies[idx].baseHP;
        }
        entity.allies[idx].setHpBars();
        setBorder(entity.allies[idx], "green");
        // console.log('hp: ', entity.allies[idx].hp);
    }
    return 15;
}

const holySword = (entity, tar) => {
    if (entity.abilityShouldCast[1] === 1) {
        const ali = entity.target.allies;
        let diff = -1;
        let idx = -1;
        for (let i = 0; i < ali.length; i++) {
            if (ali[i].imgName === tar.imgName || ali[i].hp <= 0) { continue; }
            const dist = Math.floor(Math.sqrt(Math.pow(tar.pos[0] - ali[i].pos[0], 2) + Math.pow(tar.pos[1] - ali[i].pos[1], 2)));
            if (dist > diff) {
                diff = dist
                idx = i;
            }
        }
        if (idx === -1) {
            return;
        }
        if (ali[idx].tempHP > 0) {
            ali[idx].tempHP -= entity.dmg;
            if (ali[idx].tempHP < 0) {
                ali[idx].hp += ali[idx].tempHP;
                ali[idx].tempHP = 0;
            }
        } else {
            ali[idx].hp -= (entity.dmg * 15 / ali[idx].defense);
        }
        if (!ali[idx].allied && entity.allied && ali[idx].baseDMG > 0 && entity.defense > ali[idx].target.defense) {
            ali[idx].target = entity;
            ali[idx].autoAttack(entity);
        }
        ali[idx].setHpBars();
        setBorder(ali[idx], "red");
        if (ali[idx].hp <= 0) {
            entity.killEntity(ali[idx]);
        }
        const div = drawLine(tar.pos[0] + tar.container.offsetWidth / 2, tar.pos[1] + tar.container.offsetHeight / 2,
            ali[idx].pos[0] + ali[idx].container.offsetWidth / 2, ali[idx].pos[1] + ali[idx].container.offsetHeight / 2, "gold");
        // console.log(ali[idx].klass);
        // console.log(div);
        const maxTime = Math.floor(entity.as / 8);
        setTimeout(() => { div.remove(); }, maxTime);
    } else {
        entity.abilityShouldCast[1] = 1;
        console.log(entity.klass, " has ab1 === ", entity.abilityShouldCast[1]);
        setTimeout(() => {
            entity.abilityShouldCast[1] = false;
        }, 10000)
        return 20;
    }
}

//                              Cleric Abilities

const groupHeal = (entity) => {
    for (let i = 0; i < entity.allies.length; i++) {
        if (entity.allies[i].hp > 0) {
            entity.allies[i].hp -= entity.dmg * 2;
            if (entity.allies[i].hp > entity.allies[i].baseHP) { entity.allies[i].hp = entity.allies[i].baseHP; }
            entity.setOverlay(entity.allies[i]);
            entity.allies[i].setHpBars();
            setBorder(entity.allies[i], "green");
        }
    }
    return 16;
}

const protection = (entity, target) => {
    if (!checkAbilityPossible(entity, 1, target)) { return false; }
    target.tempHP -= entity.dmg;
    target.armor -= entity.dmg;
    target.setHpBars();
    let overlay = document.createElement("div");
    overlay.classList.add("oval-shape");
    document.getElementById("game-container").appendChild(overlay);
    overlay.style.backgroundColor = 'blue';
    overlay.style.top = (target.pos[1] + 40) + 'px';
    overlay.style.left = target.pos[0] + 'px';
    overlay.style.width = target.img.width + 'px';
    overlay.style.height = target.img.height + 'px';
    setTimeout(() => {
        target.armor += entity.dmg;
        overlay.remove();
    }, 8000);
    let timeCount = 0;
    let timer = setInterval(() => {
        timeCount += 20;
        overlay.style.top = (target.pos[1] + 40) + 'px';
        overlay.style.left = target.pos[0] + 'px';
        if (timeCount >= 8000) {
            clearInterval(timer);
        }
    }, 20)
    return 20;
}

//                              Warrior Abilities

const powerSwing = (entity, target) => {
    if (!checkAbilityPossible(entity, 0, target)) { return false; }
    target.hp -= Math.ceil(entity.dmg * 1.5);
    // knockbackTarget(entity, 80);
    target.setHpBars();
    target.stunned = true;
    target.img.src = target.baseImg.src;
    target.imgCycle = 0;
    setBorder(target, "red");
    if (target.hp <= 0) {
        entity.killEntity(target);
    }
    setTimeout(() => {
        target.stunned = false;
    }, 2000);
    return 12;
}

const charge = (entity, target) => {
    if (!checkAbilityPossible(entity, 1, target, true)) { return false; }
    entity.lockedIntoAbility = true;
    entity.ms += 15;
    entity.trackTarget(target, true);
    if (target.baseDMG > 0) {
        target.target = entity;
        target.autoAttack(entity);
    }
    let inter = setInterval(() => {
        if (!entity.lockedIntoAbility) {
            entity.ms -= 15;
            clearInterval(inter);
        }
        if (target.container.style.display === 'none' || target.hp < 0) {
            entity.lockedIntoAbility = false;
            entity.ms -= 15;
            clearInterval(inter);
        }
    }, 40)
    return 10;
}

//                              Rogue Abilities

const poisonDagger = (entity, target) => {
    if (!checkAbilityPossible(entity, 0, target)) { return false; }
    let timer = 0;
    target.slowed = 50;
    target.ms -= Math.floor(target.baseMS / 2);
    let int = setInterval(() => {
        if (!target || target.container.style.display === 'none') {
            clearInterval(int);
            return;
        }
        timer++;
        target.hp -= Math.floor(Math.ceil(entity.dmg * 3) / 6);
        target.setHpBars();
        setBorder(target, "purple");
        if (target.hp <= 0) {
            entity.killEntity(target);
            clearInterval(int)
        }
        if (timer > 5) {
            clearInterval(int);
            target.slowed = false;
            target.ms += Math.floor(target.baseMS / 2);
        }
    }, 500)
    return 10;
}

const backstab = (entity, target) => {
    if (!checkAbilityPossible(entity, 1, target)) { return false; }
    if (entity.img.style.transform === target.img.style.transform) {
        target.hp -= Math.ceil(entity.dmg * 2);
    } else {
        target.hp -= Math.ceil(entity.dmg * 5);
    }
    target.setHpBars();
    setBorder(target, "black");
    if (target.hp <= 0) {
        entity.killEntity(target);
    }
    return 15;
}

//                              Wizard Abilities

const meteor = (entity, target) => {
    if (!checkAbilityPossible(entity, 0, target)) {return false;}
    const fireblastDiv = document.getElementById('firebomb-div');
    fireblastDiv.style.opacity = '70%';
    spellTrack(fireblastDiv, entity, target, (entity, img) => {
        // console.log('entity: ', entity, " img: ", img);
        img.style.display = 'none';
        causeAoEEffect(entity, 400, 400, target);
    });
    return 14;
}

const freeze = (entity, target) => {
    for (let i = 0; i < entity.enemies.length; i++) {
        if (entity.enemies[i].container.style.display !== 'none' && entity.enemies[i].hp > 0) {
            entity.enemies[i].rooted = true;
            entity.enemies[i].ms -= Math.floor(entity.enemies[i].baseMS / 2);
            const ice = document.createElement("div");
            ice.classList.add("under-foot");
            document.getElementById("game-container").appendChild(ice);
            ice.style.top = (entity.enemies[i].pos[1] + entity.enemies[i].container.offsetHeight) + 'px';
            ice.style.left = entity.enemies[i].pos[0] + 'px';
            ice.style.width = entity.enemies[i].img.width + 'px';
            setTimeout(() => {
                entity.enemies[i].rooted = false;
                ice.remove()
            }, 2000)
            setTimeout(() => {
                entity.enemies[i].ms += Math.floor(entity.enemies[i].baseMS / 2);
            }, 6000)
        }
    }
    return 25;
}



function setBorder(target, color) {
    if (target && !target.container.style.display === 'none') {
        if (target.img.style.border !== "5px solid gold") {
            target.img.style.border = "4px solid " + color;
            setTimeout(() => {
                if (target.img.style.border !== "5px solid gold") {
                    target.img.style.border = "none";
                }
            }, 500);
        }
    }
}

const warriorAbilities = [powerSwing, charge];
const clericAbilities = [groupHeal, protection];
const wizardAbilities = [meteor, freeze];
const rogueAbilities = [poisonDagger, backstab];
const paladinAbilities = [wordOfHealing, holySword];
const bardAbilities = [];
const rangerAbilities = [];
const warlockAbilities = [];
export const allAbilities = [warriorAbilities, clericAbilities, wizardAbilities, rogueAbilities,
                                paladinAbilities, bardAbilities, rangerAbilities, warlockAbilities];


function checkAbilityPossible(entity, abNum, target, infiniteRange=false) {
    if (target && (infiniteRange || entity.withinAttackRange(target)) && target.hp > 0) {
        return true;
    }
    entity.abilityShouldCast[abNum] = true;
    document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[abNum].style.backgroundColor = 'lawngreen';
    return false;
}

const lightningAutoAttack = (entity, target) => {
    let pos = [entity.pos[0] + 30 + entity.img.width / 2, entity.pos[1] + 38];
    if (entity.img.style.transform === "scaleX(-1)") {
        pos[0] -= 60
    }
    const div = drawLine(pos[0], pos[1], target.pos[0] + target.img.width/2, target.pos[1] + target.img.height/2, "purple");
    const maxTime = Math.floor(entity.as / 8);
    setTimeout(() => { div.remove(); }, maxTime);
}

export const specialAttackEffects = [lightningAutoAttack];

function knockbackTarget(entity, distance, target) {
    const dX = target.pos[0] - entity.pos[0];
    const dY = target.pos[1] - entity.pos[1];
    const hypotenuse = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
    const xRatio = dX / hypotenuse;
    const yRatio = dY / hypotenuse;
    const xRight = distance * xRatio;
    const yDown = distance * yRatio;
    target.pos[0] += Math.floor(xRight);
    target.pos[1] += Math.floor(yDown);
    target.container.style.left = target.pos[0] + 'px';
    target.container.style.top = target.pos[1] + 'px';
}

function causeAoEEffect(entity, width, height, target) {
    const targetCenter = [target.pos[0] + Math.floor(target.container.offsetWidth / 2),
        target.pos[1] + Math.floor(target.container.offsetHeight/2)];
    const topLeft1 = [targetCenter[0] - Math.floor(width / 2), targetCenter[1] - Math.floor(height / 2)];
    const div = document.createElement("div");
    const leftSetback = (width - target.container.offsetWidth) / 2;
    const topSetback = (height - target.container.offsetHeight) / 2;
    div.style.position = "absolute";
    div.style.left = target.pos[0] - leftSetback + 'px';
    div.style.top = target.pos[1] - topSetback + 'px';
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
                // console.log('entity hit by fireball: ', entity.enemies[i].klass);
                entity.enemies[i].hp -= Math.ceil(entity.dmg * 1.5);
                entity.enemies[i].setHpBars();
                setBorder(entity.enemies[i], "red");
                if (entity.enemies[i].hp <= 0) {
                    entity.killEntity(entity.enemies[i]);
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

function createLineElement(x, y, length, angle, color) {
    var styles = 'width: ' + length + 'px; '
        + 'height: 0px; '
        + '-moz-transform: rotate(' + angle + 'rad); '
        + '-webkit-transform: rotate(' + angle + 'rad); '
        + '-o-transform: rotate(' + angle + 'rad); '
        + '-ms-transform: rotate(' + angle + 'rad); '
        + 'position: absolute; '
        + 'top: ' + y + 'px; '
        + 'left: ' + x + 'px; '
        + 'border: 2px solid ' + color + '; ';
    let div = document.createElement("div");
    div.setAttribute('style', styles);
    div.classList.add("extra-attack-effect");
    document.getElementById("game-container").appendChild(div);
    return div;
    
}

function drawLine(x1, y1, x2, y2, color) {
    const a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    const sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    const x = sx - c / 2,
        y = sy;

    const alpha = Math.PI - Math.atan2(-b, a);

    return createLineElement(x, y, c, alpha, color);
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