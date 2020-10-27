class Entity { // this. is selectedChar
    constructor(klass="", range=0, baseHP=0, ms=0, attackSpeed=0, attackDMG, allied, img="", pos=[0, 0], defense=0,
                 abilities=[], abilityNames=[], extraAttackAnimation=null) {
        this.klass = klass;
        this.range = range;
        this.trueBaseHp = baseHP;
        this.baseHP = baseHP;
        this.hp = this.baseHP;
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
        this.attackOverlay;

        this.currentAction;
        this.currentAnimation;
        this.imgCycle = 0;
        this.isAttacking = false;
        this.extraAttackAnimation = extraAttackAnimation;

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
        this.attackOverlay = document.getElementById(this.imgName + '-effect-overlay');
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
            case (2):
                if (this.allAbilities[0]) {
                    this.abilities.push(this.allAbilities[0]);
                }
                break;
            case (10):
                if (this.allAbilities[1]) {
                    this.abilities.push(this.allAbilities[1]);
                }
                break;
            case (15):
                if (this.allAbilities[2]) {
                    this.abilities.push(this.allAbilities[2]);
                }
                break;
            case (20):
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

    move(endPos, attackOnFinish = false, addXPBar=false) {
        this.movingOutTheWay = true;
        this.clearIntervals();
        endPos[0] = Math.floor(endPos[0] - (this.img.width * (3/2)));
        endPos[1] = Math.floor(endPos[1] - (this.img.height * (3/4)));
        let pos = this.pos;
        let posChange = this.vectorToScalar(endPos);
        // console.log("pos change on move", posChange);
        const bigDiv = document.getElementById('game-container');
        const difference = Math.floor((window.innerWidth - bigDiv.offsetWidth) / 2);
        const checker = difference + Math.floor(bigDiv.offsetWidth);
        if (pos[0] - endPos[0] < 0) {
            this.img.style.transform = "scaleX(1)";
        } else {
            this.img.style.transform = "scaleX(-1)";
        }
        this.currentAction = setInterval(() => frame(this), 20);
        function frame(self) {
            if (posChange[2] === 0) {
            // close animation
                clearInterval(self.currentAction);
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
                if (pos[0] + Math.floor((3 * self.img.width) / 2) + 50 > checker) { pos[0] = checker - (Math.floor((3 * self.img.width) / 2) + 50);}
                if (pos[0] < 15) {pos[0] = 15;}
                if (pos[1] + Math.floor(self.img.height) > 850) { pos[1] = 850 - Math.floor(self.img.height);}
                if (pos[1] < 15) {pos[1] = 15;}
                // console.log('posChange: ', posChange);
                // console.log('pos: ', pos);

                self.container.style.top = Math.floor(pos[1]) + 'px';
                self.container.style.left = Math.floor(pos[0]) + 'px';
                posChange[2] -= 1;
            }
        }
    }

    withinAttackRange(target) {
        if (this.range === 'infinite') { return true; }
        const widthAddition = Math.floor((this.img.width / 2) + (target.img.width / 2));
        if (this.pos[0] > target.pos[0] - widthAddition - this.range && this.pos[0] < target.pos[0] + widthAddition + this.range) {
            const heightAddition = Math.floor(this.img.height / 4);
            if (this.pos[1] > target.pos[1] - heightAddition && this.pos[1] < target.pos[1] + heightAddition) {
                return true;
            }
        }
        return false;
    }

    killEntitiy(entity) {
        // console.log(entity.klass, "killed");
        clearInterval(entity.currentAction);
        clearInterval(entity.currentAnimation);
        entity.img.src = entity.baseImg.src;
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

    trackTarget() { // hot code
        clearInterval(this.currentAction);
        clearInterval(this.currentAnimation);
        this.img.src = this.baseImg.src;
        const bigDiv = document.getElementById('game-container');
        const difference = Math.floor((window.innerWidth - bigDiv.offsetWidth) / 2);
        const checker = difference + Math.floor(bigDiv.offsetWidth);
        this.currentAction = setInterval(() => move(this), 20);
        function move(self) {
            if (self.target.container.style.display === 'none') {
                self.clearIntervals();
                if (!self.allied) {
                    self.setTargetAndAttack()
                }
                return;
            }
            if (self.withinAttackRange(self.target)) {
                clearInterval(self.currentAction);
                self.autoAttack(self.target);
                // console.log('auto attack called from track');
            } else {
                const pos = self.pos;
                const movePos = self.target.pos.slice();
                if (pos[0] - movePos[0] < 0) {
                    movePos[0] -= self.target.img.width;
                    self.img.style.transform = "scaleX(1)";
                } else {
                    movePos[0] += self.target.img.width;
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

    setOverlay(targetChar) {
        this.attackOverlay.style.top = (targetChar.pos[1] + 40) + 'px';
        this.attackOverlay.style.left = targetChar.pos[0] + 'px';
        this.attackOverlay.style.width = targetChar.img.width + 'px';
        this.attackOverlay.style.height = targetChar.img.height + 'px';
        this.attackOverlay.style.display = '';
        const selectedChar = this;
        const clearTime = Math.floor(this.as / 2);
        let timeCheck = 0;
        let stackInterval = setInterval(() => {
            selectedChar.attackOverlay.style.top = targetChar.pos[1] + 40 + 'px';
            selectedChar.attackOverlay.style.left = targetChar.pos[0] + 'px';
            timeCheck += 20;
            if (timeCheck >= clearTime || targetChar.img.style.display === 'none') {
                clearInterval(stackInterval);
                selectedChar.attackOverlay.style.display = 'none';
            }
        }, 20);
    }

    beginAttack(targetChar) {
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
        this.currentAnimation = setInterval(() => this.animateAttack(this), Math.floor(this.as / 4))
        // this.currentAction = setInterval(() => attack(this), this.as);
    }

    animateAttack() {
        if (this.attackImages) {
            if (this.target.pos[0] < this.pos[0]) {
                this.img.style.transform = "scaleX(-1)";
            } else {
                this.img.style.transform = "scaleX(1)";
            }
            this.imgCycle += 1;
            if (this.imgCycle === 3) {
                if (this.extraAttackAnimation) {
                    this.extraAttackAnimation(this);
                }
                this.attack();
            }
            this.imgCycle = this.imgCycle % 4;
            this.img.src = this.attackImages[this.imgCycle].src;
        }
    }

    attack() {
        if (!this.target || this.target.hp <= 0) {
            this.clearIntervals();
            if (!this.allied) {
                // chose another hero to attack
                this.setTargetAndAttack();
                // maybe add something in for player to auto target upon deaths ?
            }
            return;
        }
        if (!this.withinAttackRange(this.target)) {
            this.trackTarget();
            return;
        } else {
            this.target.hp -= (this.dmg * 15 / this.target.defense);
            if (this.attackOverlay) {
                this.setOverlay(this.target);
            }
            if (this.target.hp > this.target.baseHP) { this.target.hp = this.target.baseHP; }
            if (!this.target.allied && this.allied && this.target.baseDMG > 0 && this.defense > this.target.target.defense) {
                this.target.target = this;
                this.target.clearIntervals();
                this.target.autoAttack(this.target.target);
            }
            this.target.setHpBars();

            if (this.target.hp <= 0) {
                this.clearIntervals();
                // console.log(this.target, ' hp ', this.target.hp);
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
                const addition = Math.floor(this.img.width / 2);
                if (this.img.style.transform === "scaleX(-1)") {
                    // move to left side of target
                    this.img.style.transform = "scaleX(1)";// - (addition / 4)
                    this.move([this.target.pos[0] + addition, this.target.pos[1] + Math.floor(this.target.img.height * 3 / 4)], this.target)
                } else {
                    // move to right side of target;
                    this.img.style.transform = "scaleX(-1)";
                    this.move([this.target.pos[0] + (5 * addition), this.target.pos[1] + Math.floor(this.target.img.height * 3 / 4)], this.target)
                }
            }
        }
    }

    autoAttack(targetChar) {
        // console.log('auto attack target: ', targetChar);
        if (this.allied) { this.target = targetChar; } // can refactor out targets
        if (this.withinAttackRange(targetChar)) {
            if (this.pos[0] < targetChar.pos[0]) {
                this.img.style.transform = "scaleX(1)";
            } else {
                this.img.style.transform = "scaleX(-1)";
            }
            this.beginAttack(targetChar);
        } else {
            this.trackTarget();
        }
    }

    clearIntervals() {
        clearInterval(this.currentAction);
        clearInterval(this.currentAnimation);
        this.img.src = this.baseImg.src;
        this.imgCycle = 0;
        this.isAttacking = false;
    }

    useAbility(n) {
        if (!this.abilityAvailable[n] || this.abilities.length === 0) {
            return;
        }
        // console.log('ability', n, 'attempted');
        this.abilityAvailable[n] = false;
        const ab = this.abilities[n];
        // console.log('ability: ', ab);
        const cdTime = ab(this);
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
    element.style.width = '100%';
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
            element.style.width = '95%';
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