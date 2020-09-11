class Entity { // this. is selectedChar
    constructor(klass="", range=0, maxHP=0, ms=0, attackSpeed=0, attackDMG, allied=true, img="", pos=[0, 0], defense) {
        this.klass = klass;
        this.range = range;
        this.maxHP = maxHP;
        this.hp = this.maxHP;
        this.baseMS = ms; // speed / time
        this.ms = this.baseMS;
        this.allied = allied; // true === player character
        this.pos = pos;
        this.baseAS = attackSpeed;
        this.as = this.baseAS;
        this.baseDMG = attackDMG;
        this.dmg = this.baseDMG;
        this.defense = defense;

        this.imgName = img;
        this.img; // base standing image
        this.attackImages; // cycle through array of images
        this.moveImages; // cycle through array of images

        this.currentAction;

        this.target;
    }

    vectorToScalar(endPos) {
        const deltaX = this.pos[0] - endPos[0];
        const deltaY = this.pos[1] - endPos[1];
        const xChange = -1*this.ms*(deltaX / (Math.abs(deltaX) + Math.abs(deltaY)));
        const yChange = -1*this.ms*(deltaY / (Math.abs(deltaY) + Math.abs(deltaX)));
        const numRepeats = Math.abs(Math.floor(deltaX / xChange));
        return ([xChange, yChange, numRepeats])
    }

    move(endPos, attackOnFinish = false) {
        endPos[0] = Math.floor(endPos[0] - (this.img.width / 2)); endPos[1] = Math.floor(endPos[1] - (this.img.height / 2));
        let moveImage = this.img;
        let pos = this.pos;
        let posChange = this.vectorToScalar(endPos);
        console.log(posChange[2]);
        this.currentAction = setInterval(() => frame(this), 20);
        function frame(self) {
            if (posChange[2] === 0) {
            // close animation
                clearInterval(self.currentAction);
                pos[0] = Math.floor(pos[0]); pos[1] = Math.floor(pos[1]);
                if (attackOnFinish) {
                    // console.log('self in move end: ', self);
                    self.autoAttack(attackOnFinish); // needs editing
                }
            } else { // need to add something for if (attackOnFinish) then update move destination to be the target's new position (with the modifiers)
            // begin some kind of animation
                pos[0] += posChange[0]; pos[1] += posChange[1];
                if (pos[0] + Math.floor(moveImage.width) > 1200) { pos[0] = 1200 - Math.floor(moveImage.width);}
                if (pos[0] < 15) {pos[0] = 15;}
                if (pos[1] + Math.floor(moveImage.height) > 850) { pos[1] = 850 - Math.floor(moveImage.height);}
                if (pos[1] < 15) {pos[1] = 15;}
                // console.log('posChange: ', posChange);
                // console.log('pos: ', pos);
                moveImage.style.top = Math.floor(pos[1]) + 'px';
                moveImage.style.left = Math.floor(pos[0]) + 'px';
                // console.log('moveImage: ', moveImage);
                posChange[2] -= 1;
            }
        }
    }

    withinAttackRange(self, target) {
        // console.log('self in withinAttackRange: ', self);
        if (self.range === 'infinite') { console.log('within infinite range'); return true; }
        // rectangle box for melee
        const widthAddition = Math.floor((self.img.width / 2) + (target.img.width / 2));
        if (self.pos[0] > target.pos[0] - widthAddition - self.range && self.pos[0] < target.pos[0] + widthAddition + self.range) {
            const heightAddition = Math.floor(((self.img.height / 2) + (target.img.height / 2)) / 2);
            // console.log("self pos: ", self.pos);
            // console.log("target pos: ", target.pos);
            if (self.pos[1] > target.pos[1] - heightAddition && self.pos[1] < target.pos[1] + heightAddition) {
                console.log('within melee range');
                return true;
            }
        }
        console.log('outside of range');
        return false;
    }

    killEntitiy(entity) {
        console.log(entity.klass, "killed");
        clearInterval(entity.currentAction);
        entity.img.style.display = "none";
    }

    beginAttack(targetChar) {
        // make some kind of animation start
        this.currentAction = setInterval(() => attack(this), this.as);
        function attack(selectedChar) {
            if (targetChar.hp <= 0) {
                clearInterval(selectedChar.currentAction);
                if (!selectedChar.allied) {
                    // chose another hero to attack
                }
                return;
            }
            if (!selectedChar.withinAttackRange(selectedChar, targetChar)) {
            // stop the animation
                clearInterval(selectedChar.currentAction);
            } else {
                targetChar.hp -= selectedChar.dmg; // this.dmg can just be negative for healers
                console.log('target hp at: ', targetChar.hp);
                if (!targetChar.allied && selectedChar.allied && targetChar.baseDMG > 0 && selectedChar.defense > targetChar.target.defense) {
                    targetChar.target = selectedChar;
                    clearInterval(targetChar.currentAction);
                    targetChar.autoAttack(targetChar.target);
                    console.log('enemy is now targetting: ', selectedChar);
                }
                if (targetChar.hp > targetChar.maxHP) { targetChar.hp = targetChar.maxHP; }
                if (targetChar.hp <= 0) {
                    // stop the animation
                    clearInterval(selectedChar.currentAction);
                    console.log('attack interval stopped');
                    selectedChar.killEntitiy(targetChar);
                    if (!selectedChar.allied) {
                        // chose another hero to attack
                    }
                }
            }
        }
    }

    autoAttack(targetChar) {
        // console.log("this in auto attack: ", this);
        if (this.allied) { this.target = targetChar; } // can refactor out targets
        if (this.withinAttackRange(this, targetChar)) {
            this.beginAttack(targetChar);
        } else {
            const addition = Math.floor(((this.img.width / 2) + (targetChar.img.width / 2)) / 2);
            if (this.pos[0] < targetChar.pos[0]) {
                this.move([targetChar.pos[0] - addition, targetChar.pos[1] + Math.floor(targetChar.img.height / 2)], targetChar)
            } else {
                this.move([targetChar.pos[0] + addition, targetChar.pos[1] + Math.floor(targetChar.img.height / 2)], targetChar)
            }
        }
    }

    useAbility(ability) {

    }

}

export default Entity;