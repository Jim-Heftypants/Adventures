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
    if (!entity.target) {
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
    if (!entity.target) {
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
    if (!entity.target) {
        return false;
    }
    entity.target.hp -= 25;
    entity.target.setHpBars();
    setBorder(entity);
    if (entity.target.hp <= 0) {
        entity.killEntitiy(entity.target);
    }
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