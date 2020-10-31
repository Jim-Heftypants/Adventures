class Entity { // this. is selectedChar
    constructor(klass="", range=0, baseHP=0, ms=0, attackSpeed=0, attackDMG, allied, img="", pos=[0, 0], defense=0,
            hasAttackOverlay = null, extraAttackAnimation = null, abilities = [], abilityNames = []) {
        this.klass = klass;
        this.range = range;
        this.trueBaseHp = baseHP;
        this.baseHP = baseHP;
        this.hp = this.baseHP;
        this.tempHP = 0;
        this.baseMS = ms; // speed / time
        this.ms = this.baseMS;
        this.allied = allied; // true === player character
        this.pos = pos;
        this.basePos = []; this.basePos[0] = pos[0]; this.basePos[1] = pos[1];
        this.baseAS = attackSpeed;
        this.as = this.baseAS;
        this.trueBaseDMG = attackDMG;
        this.baseDMG = attackDMG;
        this.dmg = this.baseDMG;
        this.trueBaseDefense = defense;
        this.baseDefense = defense
        this.defense = this.baseDefense;
        if (this.allied) {
            this.xp = 0;
            this.level = 1;
            this.nextLevelXP = 100;
        }

        this.allAbilities = abilities;
        // this.abilities = abilities; // change on pushed ver
        this.abilities = [];
        this.abilityNames = abilityNames;
        this.abilityAvailable = [true, true, true, true];
        this.abilityShouldCast = [false, false, false, false];
        this.abilityContainer;

        this.hotkeyDisplay;
        this.hotkey;

        this.imgName = img;
        this.img; // base standing image
        this.attackImages; // cycle through array of images
        this.moveImages; // cycle through array of images
        this.baseImg; // standard stand image
        this.container;
        this.hpContainerLeft;
        this.hpContainerRight;

        this.attackOverlay = hasAttackOverlay;

        this.currentAction;
        this.currentAnimation;
        this.imgCycle = 0;
        this.isAttacking = false;
        this.isMoving = false;
        this.extraAttackAnimation = extraAttackAnimation;

        // CC effects
        this.stunned = false;
        this.slowed = false;
        this.rooted = false;
        this.feared = false;

        this.lockedIntoAbility = false;

        this.target;

        this.allies;
        this.enemies;

        this.movingOutTheWay = false;

        this.observer;
        this.xpObserver;
        this.observationToken = true;

        window.addEventListener('load', () => {
            this.addInlineStyle();
        });
    }

    addInlineStyle() {
        this.img = document.getElementsByClassName(this.imgName + "-image-display")[0];
        this.baseImg = document.getElementsByClassName(this.klass)[0];
        this.img.src = this.baseImg.src;
        this.attackImages = document.getElementsByClassName(this.klass);
        this.container = document.getElementById(`${this.imgName}-display`);
        this.container.style.opacity = 0; // fading in so started at op 0
        this.container.style.display = 'none';
        this.img.style.display = "";
        this.container.style.left = this.pos[0] + "px";
        this.container.style.top = this.pos[1] + "px";
        this.hotkeyDisplay = document.getElementById(this.imgName + '-hotkey-display');
        this.hotkey = document.getElementById(this.imgName + '-keybind').value;
        this.hpContainerLeft = document.getElementById(this.imgName + '-hp-left');
        this.hpContainerRight = document.getElementById(this.imgName + '-hp-right');
        if (this.attackOverlay) {
            this.attackOverlay = [document.getElementById(this.imgName + '-effect-overlay'), this.attackOverlay];
        }
        if (this.allied) {
            this.abilityContainer = document.getElementById(this.imgName + '-ability-full-container');
        }
    }

    levelUp() {
        const levelUpDisp = document.getElementById(this.imgName + '-level-up');
        // console.log('levelUpDisp: ', levelUpDisp);
        levelUpDisp.style.display = '';
        fastFadeOut(levelUpDisp);
        this.xp -= this.nextLevelXP;
        this.nextLevelXP += (this.nextLevelXP * 0.1);
        this.level++;
        this.baseDefense += Math.ceil(this.trueBaseDefense * 0.05);
        this.baseDMG += Math.ceil(this.trueBaseDMG * 0.1);
        this.baseHP += Math.ceil(this.trueBaseHp * 0.1);
        switch (this.level) {
            case (4):
                if (this.allAbilities[0]) {
                    this.abilities.push(this.allAbilities[0]);
                }
                break;
            case (8):
                if (this.allAbilities[1]) {
                    this.abilities.push(this.allAbilities[1]);
                }
                break;
            case (12):
                if (this.allAbilities[2]) {
                    this.abilities.push(this.allAbilities[2]);
                }
                break;
            case (16):
                if (this.allAbilities[3]) {
                    this.abilities.push(this.allAbilities[3]);
                }
                break;
        }
    }

    vectorToScalar(endPos) {
        const deltaX = this.pos[0] - endPos[0];
        const deltaY = this.pos[1] - endPos[1];
        if (Math.abs(deltaX) + Math.abs(deltaY) === 0) {
            return ([0, 0, 0]);
        }
        let xChange = -1 * this.ms * (deltaX / (Math.abs(deltaX) + Math.abs(deltaY)));
        let yChange = -1 * this.ms * (deltaY / (Math.abs(deltaY) + Math.abs(deltaX)));
        if (xChange === 0 || xChange === -0) {
            xChange = 0;
            const numRepeats = Math.abs(Math.floor(deltaY / yChange));
            return ([xChange, yChange, numRepeats])
        }
        if (yChange === -0) {
            yChange = 0;
        }
        
        const numRepeats = Math.abs(Math.floor(deltaX / xChange));
        return ([xChange, yChange, numRepeats])
    }

    move(endPos, attackOnFinish = false, addXPBar=false, lockedIn=false) {
        this.movingOutTheWay = true;
        this.clearIntervals();
        this.isMoving = true;
        endPos[0] = Math.floor(endPos[0] - (this.container.offsetWidth * (1/2)));
        endPos[1] = Math.floor(endPos[1] - (this.container.offsetHeight * (1/2)));
        let pos = this.pos;
        let posChange = this.vectorToScalar(endPos);
        // console.log("pos change on move", posChange);
        const bigDiv = document.getElementById('game-container');
        const width = bigDiv.offsetWidth;
        const height = bigDiv.offsetHeight;
        if (pos[0] - endPos[0] < 0) {
            this.img.style.transform = "scaleX(1)";
        } else {
            this.img.style.transform = "scaleX(-1)";
        }
        this.currentAction = setInterval(() => frame(this), 20);
        function frame(self) {
            if (!(self.lockedIntoAbility || self.stunned || self.rooted) || lockedIn) {
                if (posChange[2] === 0) {
                // close animation
                    self.clearIntervals();
                    self.lockedIntoAbility = false;
                    self.movingOutTheWay = false;
                    pos[0] = Math.floor(pos[0]); pos[1] = Math.floor(pos[1]);
                    if (attackOnFinish) {
                        // console.log('self in move end: ', self);
                        self.autoAttack(attackOnFinish); // needs editing
                    } else if (addXPBar) {
                        // console.log('move ended');
                        self.img.style.transform = "scaleX(1)";
                        self.img.style.border = '5px solid gold';
                    }
                } else { // need to add something for if (attackOnFinish) then update move destination to be the target's new position (with the modifiers)
                // begin some kind of animation
                    pos[0] += posChange[0]; pos[1] += posChange[1];
                    if (pos[0] + Math.floor(self.container.offsetWidth) + 10 > width) { pos[0] = width - Math.floor(self.container.offsetWidth) - 10;}
                    if (pos[0] < 10) {pos[0] = 10;}
                    if (pos[1] + Math.floor(self.container.offsetHeight) + 10 > height) { pos[1] = height - Math.floor(self.container.offsetHeight) - 10;}
                    if (pos[1] < 10) {pos[1] = 10;}
                    // console.log('posChange: ', posChange);
                    // console.log('pos: ', pos);
    
                    self.container.style.top = Math.floor(pos[1]) + 'px';
                    self.container.style.left = Math.floor(pos[0]) + 'px';
                    posChange[2] -= 1;
                }
            }
        }
    }

    withinAttackRange() {
        if (this.range === 'infinite') { return true; }
        const widthAddition = Math.floor((this.img.width / 2) + (this.target.img.width / 2));
        if (this.pos[0] > this.target.pos[0] - widthAddition - this.range && this.pos[0] < this.target.pos[0] + widthAddition + this.range) {
            const heightAddition = Math.floor(this.img.height / 4);
            if (this.pos[1] > this.target.pos[1] - heightAddition && this.pos[1] < this.target.pos[1] + heightAddition) {
                return true;
            }
        }
        return false;
    }

    killEntitiy(entity) {
        // console.log(entity.klass, "killed");
        self.lockedIntoAbility = false;
        entity.clearIntervals();
        if (entity.abilityContainer) { entity.abilityContainer.style.display = 'none'; }
        entity.hp = -100;
        entity.container.style.display = "none";
    }

    setHpBars() {
        let leftWidth = Math.floor((this.hp / this.baseHP) * 100);
        let rightWidth = 100 - leftWidth;
        if (leftWidth < 0) leftWidth = 0;
        if (rightWidth < 0) rightWidth = 0;
        this.hpContainerLeft.style.width = leftWidth + '%';
        this.hpContainerRight.style.width = rightWidth + '%';
    }

    setTargetAndAttack() {
        // console.log(this.klass, "has finished attacking", this.target.klass);

        if (this.baseDMG > 0) {
            this.enemies = shuffle(this.enemies);
            for (let i = 0; i < this.enemies.length; i++) {
                if (this.enemies[i].hp > 0) {
                    this.target = this.enemies[i];
                }
            }
            if (this.target.hp < 0) { return; }
        } else {
            this.allies = shuffle(this.allies);
            for (let i = 0; i < this.allies.length; i++) {
                if (this.allies[i].hp > 0) {
                    this.target = this.allies[i];
                }
            }
            if (this.target.hp < 0) { return; }
        }
        // console.log(this.klass, "is now attacking", this.target.klass);
        this.autoAttack(this.target);
    }

    charactersStacked() {
        for (let i = 0; i < this.allies.length; i++) {
            if (!this.allies[i].movingOutTheWay && !(this.allies[i].img.style.display === 'none')) {                
                const widthAddition = Math.floor(this.img.width / 2);
                if (this.pos[0] > this.allies[i].pos[0] - widthAddition && this.pos[0] < this.allies[i].pos[0] + widthAddition) {
                    const heightAddition = Math.floor(this.img.height / 2);
                    if (this.pos[1] > this.allies[i].pos[1] - heightAddition && this.pos[1] < this.allies[i].pos[1] + heightAddition) {
                        // console.log(this.klass, "is moving to avoid", this.allies[i].klass);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    trackTarget(target, lockedIn=false) { // hot code
        this.clearIntervals();
        this.isMoving = true;
        const bigDiv = document.getElementById('game-container');
        const difference = Math.floor((window.innerWidth - bigDiv.offsetWidth) / 2);
        const checker = difference + Math.floor(bigDiv.offsetWidth);
        this.currentAction = setInterval(() => move(this), 20);
        function move(self) {
            if (!(self.lockedIntoAbility || self.stunned || self.rooted) || lockedIn) {
                if (target.container.style.display === 'none') {
                    self.clearIntervals();
                    if (!self.allied) {
                        self.setTargetAndAttack()
                    }
                    return;
                }
                if (self.withinAttackRange(target)) {
                    clearInterval(self.currentAction);
                    self.lockedIntoAbility = false;
                    self.autoAttack(target);
                    // console.log('auto attack called from track');
                } else {
                    const pos = self.pos;
                    const movePos = target.pos.slice();
                    if (pos[0] - movePos[0] < 0) {
                        movePos[0] -= target.img.width;
                        self.img.style.transform = "scaleX(1)";
                    } else {
                        movePos[0] += target.img.width;
                        self.img.style.transform = "scaleX(-1)";
                    }
                    let posChange = self.vectorToScalar(movePos);
                    pos[0] += posChange[0]; pos[1] += posChange[1];
                    if (pos[0] + Math.floor(self.img.width) > checker) { pos[0] = checker - Math.floor(self.img.width); }
                    if (pos[0] < 15) { pos[0] = 15; }
                    if (pos[1] + Math.floor(self.img.height) > 850) { pos[1] = 850 - Math.floor(self.img.height); }
                    if (pos[1] < 15) { pos[1] = 15; }
                    self.container.style.top = Math.floor(pos[1]) + 'px';
                    self.container.style.left = Math.floor(pos[0]) + 'px';
                }
            }
        }
    }

    setOverlay(targetChar) {
        // create div for overlay
        let attackOverlay = document.createElement("div");
        attackOverlay.classList.add(targetChar.imgName.substr(0, 1) + "-heal-overlay");
        document.getElementById("game-container").appendChild(attackOverlay);
        attackOverlay.style.top = (targetChar.pos[1] + 40) + 'px';
        attackOverlay.style.left = targetChar.pos[0] + 'px';
        attackOverlay.style.width = targetChar.img.width + 'px';
        attackOverlay.style.height = targetChar.img.height + 'px';
        const clearTime = Math.floor(this.as / 2);
        // 50%op => 0%op over clearTime / 20
        const iterations = clearTime / 20;
        let opacity = 50;
        const opSubtraction = opacity / iterations;
        let timeCheck = 0;
        let stackInterval = setInterval(() => {
            attackOverlay.style.top = targetChar.pos[1] + 40 + 'px';
            attackOverlay.style.left = targetChar.pos[0] + 'px';
            opacity -= opSubtraction;
            attackOverlay.style.opacity = opacity + '%';
            timeCheck += 20;
            if (timeCheck >= clearTime || targetChar.img.style.display === 'none') {
                clearInterval(stackInterval);
                attackOverlay.remove();
            }
        }, 20);
    }

    beginAttack(lockedIn=false) {
        // make some kind of animation start
        this.clearIntervals();
        this.isAttacking = true;
        if (this.allied) {
            for (let i = 0; i < 4; i++) {
                // console.log(this.abilityShouldCast[i]);
                if (this.abilityShouldCast[i]) {
                    this.abilityShouldCast[i] = false;
                    this.useAbility(i);
                }
            }
        }
        this.currentAnimation = setInterval(() => this.animateAttack(lockedIn), Math.floor(this.as / 4))
    }

    animateAttack(lockedIn=false) {
        if (!(this.lockedIntoAbility || this.stunned) || lockedIn) {
            if (!this.target || this.target.hp <= 0) {
                self.lockedIntoAbility = false;
                this.clearIntervals();
                if (!this.allied) {
                    // chose another hero to attack
                    this.setTargetAndAttack();
                    // maybe add something in for player to auto target upon deaths ?
                }
                return;
            }
            if (this.target.pos[0] < this.pos[0]) {
                this.img.style.transform = "scaleX(-1)";
            } else {
                this.img.style.transform = "scaleX(1)";
            }
            this.imgCycle += 1;
            if (this.imgCycle === 3) {
                if (this.extraAttackAnimation) {
                    this.extraAttackAnimation(this, this.target);
                }
                this.attack();
            }
            this.imgCycle = this.imgCycle % this.attackImages.length;
            this.img.src = this.attackImages[this.imgCycle].src;
        }
    }

    attack() {
        if (!this.withinAttackRange(this.target)) {
            this.trackTarget(this.target);
            return;
        } else {
            if (this.dmg > 0) {
                this.target.hp -= (this.dmg * 15 / this.target.defense);
                if (!this.target.isMoving && !this.target.isAttacking && this.target.allied && this.target.dmg > 0) {
                    this.target.target = this;
                    this.target.autoAttack(this);
                }
            } else {
                this.target.hp -= this.dmg;
            }
            if (this.attackOverlay) {
                if (this.attackOverlay[1] === 1) {
                    this.setOverlay(this);
                } else {
                    this.setOverlay(this.target);
                }
            }
            if (this.target.hp > this.target.baseHP) { this.target.hp = this.target.baseHP; }
            if (!this.target.allied && this.allied && this.target.baseDMG > 0 && this.defense > this.target.target.defense) {
                this.target.target = this;
                this.target.autoAttack(this);
            }
            this.target.setHpBars();

            if (this.target.hp <= 0) {
                this.killEntitiy(this.target);
                if (!this.allied) {
                    // chose another hero to attack
                    this.setTargetAndAttack();
                }
            }
            // console.log("border style: ", this.target.img.style.border);
            if (this.target.img.style.border !== "5px solid gold") {
                if (this.baseDMG > 0) {
                    this.target.img.style.border = "3px solid red";
                } else {
                    this.target.img.style.border = "3px solid green";
                } 
                setTimeout(() => {
                    if (this.target && this.target.img.style.border !== "5px solid gold") {
                        this.target.img.style.border = "none";
                    }
                }, 500);
            }
            if (this.range !== 'infinite' && this.charactersStacked()) {
                this.movingOutTheWay = true;
                const widthAddition = Math.floor(this.container.offsetWidth / 2);
                const eWidthAddition = Math.floor(this.target.container.offsetWidth);
                // const heightAddition = Math.floor(this.container.offsetHeight / 2);
                const eHeightAddition = Math.floor(this.target.container.offsetHeight / 2);
                if (this.img.style.transform === "scaleX(-1)") {
                    // move to left side of target
                    this.img.style.transform = "scaleX(1)";
                    this.move([this.target.pos[0] - widthAddition, this.target.pos[1] + eHeightAddition], this.target)
                } else {
                    // move to right side of target;
                    this.img.style.transform = "scaleX(-1)";
                    this.move([this.target.pos[0] + (widthAddition + eWidthAddition), this.target.pos[1] + eHeightAddition], this.target)
                }
            }
        }
    }

    autoAttack(targetChar) {
        // console.log('auto attack target: ', targetChar);
        this.target = targetChar;
        if (this.withinAttackRange(targetChar)) {
            if (this.pos[0] < targetChar.pos[0]) {
                this.img.style.transform = "scaleX(1)";
            } else {
                this.img.style.transform = "scaleX(-1)";
            }
            this.beginAttack();
        } else {
            this.trackTarget(this.target);
        }
    }

    clearIntervals() {
        clearInterval(this.currentAction);
        clearInterval(this.currentAnimation);
        this.img.src = this.baseImg.src;
        this.imgCycle = 0;
        this.isAttacking = false;
        this.isMoving = false;
    }

    useAbility(n) {
        if (!this.abilityAvailable[n] || this.abilities.length === 0) {
            return;
        }
        // console.log('ability', n, 'attempted');
        this.abilityAvailable[n] = false;
        const ab = this.abilities[n];
        // console.log('ability: ', ab);
        const cdTime = ab(this, this.target);
        if (cdTime === false) {
            // console.log('no target for ability');
            this.abilityAvailable[n] = true;
            return;
        }
        // console.log('seconds for ability cd: ', cdTime);
        const innerBoxes = document.getElementsByClassName(this.imgName + '-inner-ability-divs');
        // innerBoxes[n].style.animation = `inner-ability-animate ${cdTime}s linear 0s 1`; // didnt work
        colorFade(innerBoxes[n], cdTime, [255, 0, 0], [0, 0, 255]);
        let CDTimer = setInterval(() => {
            this.abilityAvailable[n] = true;
            // console.log(this.imgName, ' ability ', n, ' off CD');
            clearInterval(CDTimer);
        }, (cdTime * 1000));
    }

}

export default Entity;


function colorFade(element, time, start, end) {
    element.style.border = 'none';
    element.style.backgroundColor = 'rgb(' + start.toString() + ')';
    let currentColor = start.slice();
    const numIntervals = time * 5;
    let deltaX = Math.floor((end[0] - start[0]) / numIntervals);
    let deltaY = Math.floor((end[1] - start[1]) / numIntervals);
    let deltaZ = Math.floor((end[2] - start[2]) / numIntervals);
    let timeCount = 0;
    let interval = setInterval(() => {
        currentColor[0] += deltaX;
        currentColor[1] += deltaY;
        currentColor[2] += deltaZ;
        element.style.backgroundColor = 'rgb(' + currentColor.toString() + ')';
        timeCount++;
        if (timeCount >= (time * 5)) {
            element.style.backgroundColor = 'rgb(' + end.toString() + ')';
            element.style.border = '5px solid gold';
            // console.log('color fade complete');
            clearInterval(interval);
        }

    }, 200);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function fastFadeOut(element, action = null) {
    let op = 25;
    let timerDown = setInterval(function () {
        if (op <= 0) {
            clearInterval(timerDown);
            element.style.display = 'none';
            if (action) { action(); }
        }
        element.style.opacity = op / 25;
        op -= 1;
        if (element.style.display === 'none') {
            clearInterval(timerDown);
            element.style.opacity = 0;
        }
    }, 25);
}

function fastFadeIn(element, action = null) {
    let op = 0;
    let timerUp = setInterval(function () {
        if (op >= 20) {
            clearInterval(timerUp);
            if (action) { action(); }
        }
        element.style.opacity = op / 20;
        op += 1;
        if (element.style.display === 'none') {
            clearInterval(timerUp);
            element.style.opacity = 0;
        }
    }, 25);
}