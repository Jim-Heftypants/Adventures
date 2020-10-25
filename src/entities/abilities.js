const groupHeal = (entity) => {
    for (let i = 0; i < entity.allies.length; i++) {
        if (entity.allies[i].hp > 0) {
            entity.allies[i].hp += 20;
            if (entity.allies[i].hp > 100) { entity.allies[i].hp = 100; }
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
    entity.target.hp -= 20;
    entity.target.setHpBars();
    setBorder(entity);
    if (entity.target.hp <= 0) {
        entity.killEntitiy(entity.target);
    }
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
    let int = setInterval(() => {
        timer++;
        entity.target.hp -= 4
        entity.target.setHpBars();
        setBorder(entity);
        if (entity.target.hp <= 0) {
            entity.killEntitiy(entity.target);
            clearInterval(int)
        }
        if (timer > 5) {
            clearInterval(int);
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
        console.log('entity: ', entity, " img: ", img);
        img.style.display = 'none';
        entity.target.hp -= 25;
        entity.target.setHpBars();
        setBorder(entity);
        if (entity.target.hp <= 0) {
            entity.killEntitiy(entity.target);
        }
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

export const warriorAbilities = [powerSwing];
export const clericAbilities = [groupHeal];
export const wizardAbilities = [meteor];
export const rogueAbilities = [poisonDagger];



function spellTrack(img, entity, target, action) {
    // console.log('img: ', img, ' entity: ', entity, ' target: ', target, ' action: ', action);
    const pos = entity.pos.slice();
    pos[0] += entity.img.width/2; pos[1] += entity.img.height/2;
    img.style.top = Math.floor(pos[1]) + 'px';
    img.style.left = Math.floor(pos[0]) + 'px';
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
        const targetPos = target.pos.slice();
        targetPos[0] += targetImg.width/2; targetPos[1] += targetImg.height/2;
        if (imagesTouching(img, pos, targetImg, targetPos)) {
            console.log('images touching');
            clearInterval(interval);
            action(entity, img);
        } else {
            let posChange = vectorToScalar(pos, targetPos);
            pos[0] += posChange[0]; pos[1] += posChange[1];
            img.style.top = Math.floor(pos[1]) + 'px';
            img.style.left = Math.floor(pos[0]) + 'px';
        }
    }
}

function imagesTouching(img, pos, targetImg, targetPos) {
    if ((pos[0] < targetPos[0] && pos[0] + img.offsetWidth > targetPos[0]) ||
        (pos[0] < targetPos[0] + targetImg.width && pos[0] + img.offsetWidth > targetPos[0] + targetImg.width)) {
        console.log('passed width check');
        return true;
    }
    if ((pos[1] < targetPos[1] && pos[1] + img.offsetHeight  > targetPos[1]) ||
        (pos[1] < targetPos[1] + targetImg.height && pos[1] + img.offsetHeight  > targetPos[1] + targetImg.height)) {
        console.log('height check passed');
        return true;
    }
    return false;
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