

class Entity { // this. is selectedChar
    constructor(klass="", range=0, maxHP=0, ms=0, attackSpeed=0, attackDMG, allied=true, img="", pos=[0, 0]) {
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
        this.imgName = img;
        this.img; // base standing image
        this.attackImages; // cycle through array of images
        this.moveImages; // cycle through array of images
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
        let id = setInterval(frame, 20);
        function frame() {
            if (posChange[2] === 0) {
            // close animation
                clearInterval(id);
                if (attackOnFinish) {
                    this.beginAttack(attackOnFinish); // needs editing
                }
            } else { // need to add something for if (attackOnFinish) then update move destination to be the target's new position (with the modifiers)
            // begin some kind of animation
                pos[0] += posChange[0]; pos[1] += posChange[1];
                if (pos[0] + Math.floor(moveImage.width) > 1200) { pos[0] = 1200 - Math.floor(moveImage.width);}
                if (pos[0] < 15) {pos[0] = 15;}
                if (pos[1] + Math.floor(moveImage.height) > 850) { pos[1] = 850 - Math.floor(moveImage.height);}
                if (pos[1] < 15) {pos[1] = 15;}
                console.log('posChange: ', posChange);
                console.log('pos: ', pos);
                moveImage.style.top = Math.floor(pos[1]) + 'px';
                moveImage.style.left = Math.floor(pos[0]) + 'px';
                console.log('moveImage: ', moveImage);
                posChange[2] -= 1;
            }
        }
    }

    withinAttackRange(pos) {
        if (this.range === 'infinite') { return true; }
        // rectangle box for melee
        if (this.pos[1] > pos[1] - 2 && this.pos[1] < pos[1] + 2) {
            if (this.pos[0] > pos[0] - this.range && this.pos[0] < pos[0] + this.range) {
                return true;
            }
        }
        return false;
    }

    killEntitiy(target) {

    }

    beginAttack(targetChar) {
        // make some kind of animation start
        let id = setInterval(attack, this.as);
        function attack() {
            if (targetChar.hp <= 0) {
            // stop the animation
                clearInterval(id);
                this.killEntitiy(targetChar);
            } else if (!withinAttackRange(targetChar.pos)) {
            // stop the animation
                clearInterval(id);
            } else {
                targetChar.hp -= this.dmg; // this.dmg can just be negative for healers
                if (targetChar.hp > targetChar.maxHP) { targetChar.hp = targetChar.maxHP; }
            }
        }
    }

    autoAttack(targetChar) {
        if (this.withinAttackRange(targetChar.pos)) {
            this.beginAttack(targetChar);
        } else {
            if (this.pos[0] < targetChar.pos[0]) {
                this.move([targetChar.pos[0] - this.range, targetChar.pos[1]])
            } else {
                this.move([targetChar.pos[0] + this.range, targetChar.pos[1]])
            }
        }
    }

    useAbility(ability) {

    }

}

// /*
// className
// range
// maxHP
// MS
// AS
// DMG
// true
// pos?
// */

// // MS is probly wacky af rn => movement every .1 seconds

// // Heroes
// // rdps
// const Warlock = new Entity('Warlock', 'infinite', 100, 10, 2000, 15, true, [100, 100]);

// // heals
// const Priest = new Entity('Priest', 'infinite', 100, 10, 1500, -10, true, [200, 200]);

// // mdps
// const Warrior = new Entity('Warrior', 10, 100, 10, 1000, 10, true, [-50, -50]);

// // Enemies

// const SkeletonArcher = new Entity('SkeletonArcher', 'infinite', 100, 10, 3000, 30, false, [20, 20]);

export default Entity;