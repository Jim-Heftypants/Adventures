const groupHeal = (entity) => {
    for (let i = 0; i < entity.allies; i++) {
        if (entity.allies[i].hp > 0) {
            entity.allies[i].hp += 20;
            if (entity.allies[i].hp > 100) { entity.allies[i].hp = 100; }
            entity.allies[i].setHpBars();
        }
    }
    return 10;
}

const powerSwing = (entity) => {
    entity.target.hp -= 20;
    entity.target.setHpBars();
    if (entity.target.hp <= 0) {
        entity.killEntitiy(entity.target);
    }
    return 10;
}

const poisonDagger = (entity, n) => {
    let timer = 0;
    let int = setInterval(() => {
        timer++;
        entity.target.hp -= 4
        entity.target.setHpBars();
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
    entity.target.hp -= 25;
    entity.target.setHpBars();
    if (entity.target.hp <= 0) {
        entity.killEntitiy(entity.target);
    }
    return 10;
}

export const warriorAbilities = [powerSwing];
export const clericAbilities = [groupHeal];
export const wizardAbilities = [meteor];
export const rogueAbilities = [poisonDagger];