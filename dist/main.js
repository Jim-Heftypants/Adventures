/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entities/abilities.js":
/*!***********************************!*\
  !*** ./src/entities/abilities.js ***!
  \***********************************/
/*! exports provided: allAbilities, specialAttackEffects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allAbilities", function() { return allAbilities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "specialAttackEffects", function() { return specialAttackEffects; });
//                              Paladin Abiities
var wordOfHealing = function wordOfHealing(entity) {
  // console.log(entity.allies);
  var idx = 0;
  var lowest = 2000;

  for (var i = 0; i < entity.allies.length; i++) {
    if (entity.allies[i].hp > 0 && entity.allies[i].hp < lowest) {
      lowest = entity.allies[i].hp;
      idx = i;
    }
  } // console.log('lowest hp: ', lowest);
  // console.log('idx: ', idx);


  if (entity.hp < lowest) {
    // console.log(entity.klass);
    // console.log('hp: ', entity.hp);
    entity.hp += Math.floor(entity.dmg * 2.5);

    if (entity.hp > entity.baseHP) {
      entity.hp = entity.baseHP;
    }

    entity.setHpBars();
    setBorder(entity, "green"); // console.log('hp: ', entity.hp);
  } else {
    // console.log(entity.allies[idx].klass);
    // console.log('hp: ', entity.allies[idx].hp);
    entity.allies[idx].hp += Math.floor(entity.dmg * 2.5);

    if (entity.allies[idx].hp > entity.allies[idx].baseHP) {
      entity.allies[idx].hp = entity.allies[idx].baseHP;
    }

    entity.allies[idx].setHpBars();
    setBorder(entity.allies[idx], "green"); // console.log('hp: ', entity.allies[idx].hp);
  }

  return 15;
};

var holySword = function holySword(entity, tar) {
  if (entity.abilityShouldCast[1] === 1) {
    var ali = entity.target.allies;
    var diff = -1;
    var idx = -1;

    for (var i = 0; i < ali.length; i++) {
      if (ali[i].imgName === tar.imgName || ali[i].hp <= 0) {
        continue;
      }

      var dist = Math.floor(Math.sqrt(Math.pow(tar.pos[0] - ali[i].pos[0], 2) + Math.pow(tar.pos[1] - ali[i].pos[1], 2)));

      if (dist > diff) {
        diff = dist;
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
      ali[idx].hp -= entity.dmg * 15 / ali[idx].defense;
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

    var div = drawLine(tar.pos[0] + tar.container.offsetWidth / 2, tar.pos[1] + tar.container.offsetHeight / 2, ali[idx].pos[0] + ali[idx].container.offsetWidth / 2, ali[idx].pos[1] + ali[idx].container.offsetHeight / 2, "gold"); // console.log(ali[idx].klass);
    // console.log(div);

    var maxTime = Math.floor(entity.as / 8);
    setTimeout(function () {
      div.remove();
    }, maxTime);
  } else {
    entity.abilityShouldCast[1] = 1;
    console.log(entity.klass, " has ab1 === ", entity.abilityShouldCast[1]);
    setTimeout(function () {
      entity.abilityShouldCast[1] = false;
    }, 10000);
    return 20;
  }
}; //                              Cleric Abilities


var groupHeal = function groupHeal(entity) {
  for (var i = 0; i < entity.allies.length; i++) {
    if (entity.allies[i].hp > 0) {
      entity.allies[i].hp -= entity.dmg * 2;

      if (entity.allies[i].hp > entity.allies[i].baseHP) {
        entity.allies[i].hp = entity.allies[i].baseHP;
      }

      entity.setOverlay(entity.allies[i]);
      entity.allies[i].setHpBars();
      setBorder(entity.allies[i], "green");
    }
  }

  return 16;
};

var protection = function protection(entity, target) {
  if (!checkAbilityPossible(entity, 1, target)) {
    return false;
  }

  target.tempHP -= entity.dmg;
  target.armor -= entity.dmg;
  target.setHpBars();
  var overlay = document.createElement("div");
  overlay.classList.add("oval-shape");
  document.getElementById("game-container").appendChild(overlay);
  overlay.style.backgroundColor = 'blue';
  overlay.style.top = target.pos[1] + 40 + 'px';
  overlay.style.left = target.pos[0] + 'px';
  overlay.style.width = target.img.width + 'px';
  overlay.style.height = target.img.height + 'px';
  setTimeout(function () {
    target.armor += entity.dmg;
    overlay.remove();
  }, 8000);
  var timeCount = 0;
  var timer = setInterval(function () {
    timeCount += 20;
    overlay.style.top = target.pos[1] + 40 + 'px';
    overlay.style.left = target.pos[0] + 'px';

    if (timeCount >= 8000) {
      clearInterval(timer);
    }
  }, 20);
  return 20;
}; //                              Warrior Abilities


var powerSwing = function powerSwing(entity, target) {
  if (!checkAbilityPossible(entity, 0, target)) {
    return false;
  }

  target.hp -= Math.ceil(entity.dmg * 1.5); // knockbackTarget(entity, 80);

  target.setHpBars();
  target.stunned = true;
  target.img.src = target.baseImg.src;
  target.imgCycle = 0;
  setBorder(target, "red");

  if (target.hp <= 0) {
    entity.killEntity(target);
  }

  setTimeout(function () {
    target.stunned = false;
  }, 2000);
  return 12;
};

var charge = function charge(entity, target) {
  if (!checkAbilityPossible(entity, 1, target, true)) {
    return false;
  }

  entity.lockedIntoAbility = true;
  entity.ms += 15;
  entity.trackTarget(target, true);

  if (target.baseDMG > 0) {
    target.target = entity;
    target.autoAttack(entity);
  }

  var inter = setInterval(function () {
    if (!entity.lockedIntoAbility) {
      entity.ms -= 15;
      clearInterval(inter);
    }

    if (target.container.style.display === 'none' || target.hp < 0) {
      entity.lockedIntoAbility = false;
      entity.ms -= 15;
      clearInterval(inter);
    }
  }, 40);
  return 10;
}; //                              Rogue Abilities


var poisonDagger = function poisonDagger(entity, target) {
  if (!checkAbilityPossible(entity, 0, target)) {
    return false;
  }

  var timer = 0;
  target.slowed = 50;
  target.ms -= Math.floor(target.baseMS / 2);

  var _int = setInterval(function () {
    if (!target || target.container.style.display === 'none') {
      clearInterval(_int);
      return;
    }

    timer++;
    target.hp -= Math.floor(Math.ceil(entity.dmg * 3) / 6);
    target.setHpBars();
    setBorder(target, "purple");

    if (target.hp <= 0) {
      entity.killEntity(target);
      clearInterval(_int);
    }

    if (timer > 5) {
      clearInterval(_int);
      target.slowed = false;
      target.ms += Math.floor(target.baseMS / 2);
    }
  }, 500);

  return 10;
};

var backstab = function backstab(entity, target) {
  if (!checkAbilityPossible(entity, 1, target)) {
    return false;
  }

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
}; //                              Wizard Abilities


var meteor = function meteor(entity, target) {
  if (!checkAbilityPossible(entity, 0, target)) {
    return false;
  }

  var fireblastDiv = document.getElementById('firebomb-div');
  fireblastDiv.style.opacity = '70%';
  spellTrack(fireblastDiv, entity, target, function (entity, img) {
    // console.log('entity: ', entity, " img: ", img);
    img.style.display = 'none';
    causeAoEEffect(entity, 400, 400, target);
  });
  return 14;
};

var freeze = function freeze(entity, target) {
  var _loop = function _loop(i) {
    if (entity.enemies[i].container.style.display !== 'none' && entity.enemies[i].hp > 0) {
      entity.enemies[i].rooted = true;
      entity.enemies[i].ms -= Math.floor(entity.enemies[i].baseMS / 2);
      var ice = document.createElement("div");
      ice.classList.add("under-foot");
      document.getElementById("game-container").appendChild(ice);
      ice.style.top = entity.enemies[i].pos[1] + entity.enemies[i].container.offsetHeight + 'px';
      ice.style.left = entity.enemies[i].pos[0] + 'px';
      ice.style.width = entity.enemies[i].img.width + 'px';
      setTimeout(function () {
        entity.enemies[i].rooted = false;
        ice.remove();
      }, 2000);
      setTimeout(function () {
        entity.enemies[i].ms += Math.floor(entity.enemies[i].baseMS / 2);
      }, 6000);
    }
  };

  for (var i = 0; i < entity.enemies.length; i++) {
    _loop(i);
  }

  return 25;
};

function setBorder(target, color) {
  if (target && !target.container.style.display === 'none') {
    if (target.img.style.border !== "5px solid gold") {
      target.img.style.border = "4px solid " + color;
      setTimeout(function () {
        if (target.img.style.border !== "5px solid gold") {
          target.img.style.border = "none";
        }
      }, 500);
    }
  }
}

var warriorAbilities = [powerSwing, charge];
var clericAbilities = [groupHeal, protection];
var wizardAbilities = [meteor, freeze];
var rogueAbilities = [poisonDagger, backstab];
var paladinAbilities = [wordOfHealing, holySword];
var bardAbilities = [];
var rangerAbilities = [];
var warlockAbilities = [];
var allAbilities = [warriorAbilities, clericAbilities, wizardAbilities, rogueAbilities, paladinAbilities, bardAbilities, rangerAbilities, warlockAbilities];

function checkAbilityPossible(entity, abNum, target) {
  var infiniteRange = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (target && (infiniteRange || entity.withinAttackRange(target)) && target.hp > 0) {
    return true;
  }

  entity.abilityShouldCast[abNum] = true;
  document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[abNum].style.backgroundColor = 'lawngreen';
  return false;
}

var lightningAutoAttack = function lightningAutoAttack(entity, target) {
  var pos = [entity.pos[0] + 30 + entity.img.width / 2, entity.pos[1] + 38];

  if (entity.img.style.transform === "scaleX(-1)") {
    pos[0] -= 60;
  }

  var div = drawLine(pos[0], pos[1], target.pos[0] + target.img.width / 2, target.pos[1] + target.img.height / 2, "purple");
  var maxTime = Math.floor(entity.as / 8);
  setTimeout(function () {
    div.remove();
  }, maxTime);
};

var specialAttackEffects = [lightningAutoAttack];

function knockbackTarget(entity, distance, target) {
  var dX = target.pos[0] - entity.pos[0];
  var dY = target.pos[1] - entity.pos[1];
  var hypotenuse = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
  var xRatio = dX / hypotenuse;
  var yRatio = dY / hypotenuse;
  var xRight = distance * xRatio;
  var yDown = distance * yRatio;
  target.pos[0] += Math.floor(xRight);
  target.pos[1] += Math.floor(yDown);
  target.container.style.left = target.pos[0] + 'px';
  target.container.style.top = target.pos[1] + 'px';
}

function causeAoEEffect(entity, width, height, target) {
  var targetCenter = [target.pos[0] + Math.floor(target.container.offsetWidth / 2), target.pos[1] + Math.floor(target.container.offsetHeight / 2)];
  var topLeft1 = [targetCenter[0] - Math.floor(width / 2), targetCenter[1] - Math.floor(height / 2)];
  var div = document.createElement("div");
  var leftSetback = (width - target.container.offsetWidth) / 2;
  var topSetback = (height - target.container.offsetHeight) / 2;
  div.style.position = "absolute";
  div.style.left = target.pos[0] - leftSetback + 'px';
  div.style.top = target.pos[1] - topSetback + 'px';
  div.style.width = width + "px";
  div.style.height = height + "px";
  div.style.background = "red";
  div.style.zIndex = "8";
  document.getElementById("game-container").appendChild(div);
  setTimeout(function () {
    div.remove();
  }, 750);

  for (var i = 0; i < entity.enemies.length; i++) {
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
  return topLeft1[0] > topLeft2[0] && topLeft1[0] + sizes1[0] < topLeft2[0] + sizes2[0] && topLeft1[1] > topLeft2[1] && topLeft1[1] + sizes1[1] < topLeft2[1] + sizes2[1];
}

function imagesTochingSide(topLeft1, sizes1, topLeft2, sizes2, i) {
  return topLeft1[i] < topLeft2[i] && topLeft1[i] + sizes1[i] > topLeft2[i] || topLeft1[i] < topLeft2[i] + sizes2[i] && topLeft1[i] + sizes1[i] > topLeft2[i] + sizes2[i];
}

function imagesTouching(topLeft1, sizes1, topLeft2, sizes2) {
  for (var i = 0; i < 2; i++) {
    if (!imagesTochingSide(topLeft1, sizes1, topLeft2, sizes2, i)) {
      return false;
    }
  }

  return true;
}

function createLineElement(x, y, length, angle, color) {
  var styles = 'width: ' + length + 'px; ' + 'height: 0px; ' + '-moz-transform: rotate(' + angle + 'rad); ' + '-webkit-transform: rotate(' + angle + 'rad); ' + '-o-transform: rotate(' + angle + 'rad); ' + '-ms-transform: rotate(' + angle + 'rad); ' + 'position: absolute; ' + 'top: ' + y + 'px; ' + 'left: ' + x + 'px; ' + 'border: 2px solid ' + color + '; ';
  var div = document.createElement("div");
  div.setAttribute('style', styles);
  div.classList.add("extra-attack-effect");
  document.getElementById("game-container").appendChild(div);
  return div;
}

function drawLine(x1, y1, x2, y2, color) {
  var a = x1 - x2,
      b = y1 - y2,
      c = Math.sqrt(a * a + b * b);
  var sx = (x1 + x2) / 2,
      sy = (y1 + y2) / 2;
  var x = sx - c / 2,
      y = sy;
  var alpha = Math.PI - Math.atan2(-b, a);
  return createLineElement(x, y, c, alpha, color);
}

function spellTrack(img, entity, target, action) {
  // console.log('img: ', img, ' entity: ', entity, ' target: ', target);
  var changedPos = entity.pos.slice();
  changedPos[0] += entity.img.width / 2;
  changedPos[1] += entity.img.height / 2;
  img.style.top = Math.floor(changedPos[1]) + 'px';
  img.style.left = Math.floor(changedPos[0]) + 'px';
  img.style.display = '';
  var targetImg = target.img;
  var interval = setInterval(function () {
    return move();
  }, 20);

  function move() {
    if (img.style.display === 'none' || target.container.style.display === 'none') {
      clearInterval(interval);
      img.style.display = 'none'; // console.log('no target to hit with: ', img);

      return;
    }

    var left = parseInt(img.style.left.replace('px', ''), 10);
    var top = parseInt(img.style.top.replace('px', ''), 10);

    if (imageInside([left, top], [img.offsetWidth, img.offsetHeight], target.pos, [targetImg.width, targetImg.height])) {
      // console.log('images touching');
      clearInterval(interval);
      img.style.display = 'none';
      action(entity, img);
    } else {
      var targetPos = target.pos.slice();
      targetPos[0] += targetImg.width / 2;
      targetPos[1] += targetImg.height / 2;
      var posChange = vectorToScalar(changedPos, targetPos);
      changedPos[0] += posChange[0];
      changedPos[1] += posChange[1];
      img.style.top = Math.floor(changedPos[1]) + 'px';
      img.style.left = Math.floor(changedPos[0]) + 'px';
    }
  }
}

function vectorToScalar(pos, endPos) {
  var ms = 15;
  var deltaX = pos[0] - endPos[0];
  var deltaY = pos[1] - endPos[1];

  if (Math.abs(deltaX) + Math.abs(deltaY) === 0) {
    return [0, 0];
  }

  var xChange = -1 * ms * (deltaX / (Math.abs(deltaX) + Math.abs(deltaY)));
  var yChange = -1 * ms * (deltaY / (Math.abs(deltaY) + Math.abs(deltaX)));

  if (xChange === 0 || xChange === -0) {
    xChange = 0; // const numRepeats = Math.abs(Math.floor(deltaY / yChange)); // not needed for a track system

    return [xChange, yChange];
  }

  if (yChange === -0) {
    yChange = 0;
  } // const numRepeats = Math.abs(Math.floor(deltaX / xChange));


  return [xChange, yChange];
}

/***/ }),

/***/ "./src/entities/character.js":
/*!***********************************!*\
  !*** ./src/entities/character.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/entities/entity.js");
/* harmony import */ var _abilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abilities.js */ "./src/entities/abilities.js");

 // console.log('ab list', abilityObj);

var abilityList = Object.values(_abilities_js__WEBPACK_IMPORTED_MODULE_1__); // console.log('ab array list', abilityObj)
// console.log(abilityList[0]);

var charAbilities = abilityList[0];
var warriorAbilities = charAbilities[0];
var clericAbilities = charAbilities[1];
var wizardAbilities = charAbilities[2];
var rogueAbilities = charAbilities[3];
var paladinAbilities = charAbilities[4];
var waAbNames = ['Concussive Blow', 'Charge'];
var cAbNames = ['Prayer of Healing', "Protection"];
var wiAbNames = ['Fire Bomb', 'Freeze'];
var rAbNames = ['Poison Shiv', 'Backstab'];
var pAbNames = ['Word of Healing', 'Holy Sword'];
var specialAttackEffects = abilityList[1];
var wizardAttackEffect = specialAttackEffects[0];
/*
className
range
maxHP
MS
AS
DMG
true
pos
defense
hasOverlay? 1=self 2=target
specialEffect
ab
abNames
*/
// tank

var Warrior = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Warrior', 10, 100, 10, 1000, 10, true, [100, 400], 20, null, null, warriorAbilities, waAbNames);
var Paladin = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Paladin', 10, 100, 10, 1000, 10, true, [100, 400], 20, null, null, paladinAbilities, pAbNames); // heals

var Cleric = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Cleric', 'infinite', 100, 10, 1500, -8, true, [400, 100], 12, 2, null, clericAbilities, cAbNames); // rdps

var Wizard = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Wizard', "infinite", 100, 10, 2000, 20, true, [100, 100], 14, null, wizardAttackEffect, wizardAbilities, wiAbNames); // mdps

var Rogue = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]("Rogue", 10, 100, 10, 800, 10, true, [900, 500], 16, null, null, rogueAbilities, rAbNames);
var charactersArr = [Warrior, Cleric, Wizard, Rogue, Paladin];
/* harmony default export */ __webpack_exports__["default"] = (charactersArr);

/***/ }),

/***/ "./src/entities/enemy.js":
/*!*******************************!*\
  !*** ./src/entities/enemy.js ***!
  \*******************************/
/*! exports provided: classCreator, intro, healIntro, rangedIntro, puttinItAllTogetha, ezDoppelganger, level3, level2, doppelganger, allEnemies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intro", function() { return intro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "healIntro", function() { return healIntro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangedIntro", function() { return rangedIntro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "puttinItAllTogetha", function() { return puttinItAllTogetha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ezDoppelganger", function() { return ezDoppelganger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "level3", function() { return level3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "level2", function() { return level2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doppelganger", function() { return doppelganger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allEnemies", function() { return allEnemies; });
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity.js */ "./src/entities/entity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classCreator", function() { return _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _abilities_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abilities.js */ "./src/entities/abilities.js");


var abilityList = Object.values(_abilities_js__WEBPACK_IMPORTED_MODULE_1__);
var specialAttackEffects = abilityList[1];
var wizardAttackEffect = specialAttackEffects[0];
/*
className
range
maxHP
MS
AS
DMG
true
pos
defense
hasOverlay? 1=self 2=target
specialEffect
ab
abNames
*/
// rdps

var tutorialWizard = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 60, 10, 1500, 7, false, [1000, 600], 8, null, wizardAttackEffect);
var ghettoWizard = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 60, 10, 1500, 12, false, [500, 500], 8, null, wizardAttackEffect);
var wizard2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 70, 10, 1500, 13, false, [500, 500], 14, null, wizardAttackEffect);
var wizard3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 70, 10, 1500, 13, false, [700, 200], 14, null, wizardAttackEffect); // fix

var EWizard = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 100, 10, 2000, 20, false, [500, 500], 14, null, wizardAttackEffect); // heals

var tutorialCleric = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 2000, -7, false, [1000, 300], 8, 2);
var dumbCleric = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 2000, -8, false, [1000, 100], 8, 2);
var cleric2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 1750, -11, false, [1000, 100], 12, 2);
var cleric3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 1750, -11, false, [300, 400], 12, 2);
var ECleric = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 1500, -8, false, [1000, 100], 12, 2); // mdps

var tutorialRogue = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 80, 10, 1200, 6, false, [700, 200], 14);
var loserRogue = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 80, 10, 1200, 8, false, [700, 200], 14);
var rogue2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 80, 10, 1200, 8, false, [700, 200], 14);
var rogue3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 80, 10, 1200, 8, false, [500, 500], 14);
var ERogue = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 100, 10, 800, 10, false, [700, 200], 16); // tank

var punchingBag = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 50, 10, 1000, 1, false, [650, 500], 20);
var tutorialWarrior = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 80, 10, 1000, 6, false, [650, 500], 20);
var weakWarrior = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 80, 10, 1000, 8, false, [300, 400], 20);
var warrior2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 80, 10, 1000, 8, false, [300, 400], 20);
var warrior3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 80, 10, 1000, 8, false, [1000, 100], 20);
var EWarrior = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 110, 10, 1000, 10, false, [300, 400], 20); // paladin

var EPaladin = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EPaladin', 10, 100, 10, 1000, 10, false, [300, 400], 20); // classCreator

 // level 1

var intro = [punchingBag]; // level 2

var healIntro = [tutorialWarrior, tutorialCleric]; // level 3

var rangedIntro = [tutorialWarrior, tutorialCleric, tutorialWizard]; // level 4

var puttinItAllTogetha = [tutorialWarrior, tutorialCleric, tutorialWizard, tutorialRogue]; // level 5

var ezDoppelganger = [weakWarrior, dumbCleric, ghettoWizard, loserRogue]; // level 6

var level3 = [wizard2, wizard3, cleric2, cleric3]; // level 7

var level2 = [rogue2, rogue3, warrior2, warrior3]; // level 8

var doppelganger = [EWarrior, ECleric, EWizard, ERogue]; // all enemies

var allEnemies = [EWarrior, ECleric, EWizard, ERogue, EPaladin];

/***/ }),

/***/ "./src/entities/entity.js":
/*!********************************!*\
  !*** ./src/entities/entity.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Entity = /*#__PURE__*/function () {
  // this. is selectedChar
  function Entity() {
    var klass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var baseHP = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var ms = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var attackSpeed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var attackDMG = arguments.length > 5 ? arguments[5] : undefined;
    var allied = arguments.length > 6 ? arguments[6] : undefined;
    var pos = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [0, 0];
    var defense = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
    var hasAttackOverlay = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
    var extraAttackAnimation = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
    var abilities = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : [];
    var abilityNames = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : [];

    _classCallCheck(this, Entity);

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
    this.basePos = [];
    this.basePos[0] = pos[0];
    this.basePos[1] = pos[1];
    this.baseAS = attackSpeed;
    this.as = this.baseAS;
    this.trueBaseDMG = attackDMG;
    this.baseDMG = attackDMG;
    this.dmg = this.baseDMG;
    this.trueBaseDefense = defense;
    this.baseDefense = defense;
    this.defense = this.baseDefense;
    this.level = 1;

    if (this.allied) {
      this.xp = 0;
      this.nextLevelXP = 100;
    }

    this.allAbilities = abilities; // this.abilities = abilities; // change on pushed ver

    this.abilities = [];
    this.abilityNames = abilityNames;
    this.abilityAvailable = [true, true, true, true];
    this.abilityShouldCast = [false, false, false, false];
    this.abilityContainer;
    this.hotkeyDisplay;
    this.hotkey;
    this.imgName;
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
    this.extraAttackAnimation = extraAttackAnimation; // CC effects

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
  }

  _createClass(Entity, [{
    key: "addInlineStyle",
    value: function addInlineStyle() {
      var entityContainer = document.createElement("div");
      entityContainer.classList.add("entity-container");
      entityContainer.id = this.imgName + '-display';
      document.getElementById("game-container").appendChild(entityContainer);
      var hpBar = document.createElement("div");
      hpBar.classList.add("hp-bar-container");
      hpBar.id = this.imgName + '-hp-bar';
      hpBar.style.display = "flex";
      entityContainer.appendChild(hpBar);
      var leftBar = document.createElement("div");
      leftBar.classList.add("hp-percentage-left");
      leftBar.id = this.imgName + '-hp-left';
      hpBar.appendChild(leftBar);
      var innerLeftBar = document.createElement("div");
      innerLeftBar.id = this.imgName + '-inner-leftHP-bar';
      innerLeftBar.style.width = '100%';

      if (this.allied) {
        innerLeftBar.style.backgroundColor = 'blue';
      } else {
        innerLeftBar.style.backgroundColor = 'red';
      }

      var innerTempBar = document.createElement("div");
      innerTempBar.id = this.imgName + '-inner-tempHP-bar';
      innerTempBar.style.backgroundColor = 'gold';
      innerTempBar.style.width = '0%';
      leftBar.appendChild(innerLeftBar);
      leftBar.appendChild(innerTempBar);
      var rightBar = document.createElement("div");
      rightBar.classList.add("hp-percentage-right");
      rightBar.id = this.imgName + '-hp-right';
      hpBar.appendChild(rightBar);

      if (this.allied) {
        var expBar = document.createElement("div");
        expBar.classList.add("exp-words");
        expBar.id = this.imgName + '-exp-words';
        hpBar.appendChild(expBar);
      }

      var img = document.createElement("img");
      img.classList.add('image-display');
      img.id = this.imgName + '-image-display';
      entityContainer.appendChild(img);
      var hotkeyDisplay = document.createElement("p");
      hotkeyDisplay.classList.add("hotkey-character-display");
      hotkeyDisplay.id = this.imgName + 'hotkey-display';
      entityContainer.appendChild(hotkeyDisplay);
      this.img = img;
      this.baseImg = document.getElementsByClassName(this.klass)[0];
      this.img.src = this.baseImg.src;
      this.attackImages = document.getElementsByClassName(this.klass);
      this.container = entityContainer;
      this.container.style.opacity = 0; // fading in so started at op 0

      this.img.style.display = "";
      this.container.style.left = this.pos[0] + "px";
      this.container.style.top = this.pos[1] + "px";
      this.hotkeyDisplay = hotkeyDisplay;
      this.hotkey = document.getElementById(this.imgName + '-keybind').value;
      this.hotkeyDisplay.innerHTML = this.hotkey;
      this.hpContainerLeft = leftBar;
      this.hpContainerRight = rightBar;

      if (this.allied) {
        this.abilityContainer = document.getElementById(this.imgName + '-ability-full-container');
      }
    }
  }, {
    key: "setLevel",
    value: function setLevel(level) {
      this.level = level;
      this.baseDefense = Math.floor(this.baseDefense + Math.ceil(this.trueBaseDefense * 0.05) * level);

      if (this.baseDMG > 0) {
        this.baseDMG = Math.floor(this.baseDMG + Math.ceil(this.trueBaseDMG * 0.1) * level);
      } else {
        this.baseDMG = Math.ceil(this.baseDMG + Math.floor(this.trueBaseDMG * 0.1) * level);
      }

      this.baseHP = Math.floor(this.baseHP + Math.ceil(this.trueBaseHp * 0.1) * level); // console.log(this.klass);
      // console.log(this.baseDMG);
      // console.log(this.level);

      if (this.allied) {
        var levelUpDisp = document.getElementById(this.imgName + '-level-up'); // console.log('levelUpDisp: ', levelUpDisp);

        levelUpDisp.style.display = '';
        fastFadeOut(levelUpDisp);
        this.xp -= this.nextLevelXP;
        this.nextLevelXP += this.nextLevelXP * 0.1;

        switch (this.level) {
          case 4:
            if (this.allAbilities[0]) {
              this.abilities.push(this.allAbilities[0]);
            }

            break;

          case 8:
            if (this.allAbilities[1]) {
              this.abilities.push(this.allAbilities[1]);
            }

            break;

          case 12:
            if (this.allAbilities[2]) {
              this.abilities.push(this.allAbilities[2]);
            }

            break;

          case 16:
            if (this.allAbilities[3]) {
              this.abilities.push(this.allAbilities[3]);
            }

            break;
        }
      }
    }
  }, {
    key: "vectorToScalar",
    value: function vectorToScalar(endPos) {
      var deltaX = this.pos[0] - endPos[0];
      var deltaY = this.pos[1] - endPos[1];

      if (Math.abs(deltaX) + Math.abs(deltaY) === 0) {
        return [0, 0, 0];
      }

      var xChange = -1 * this.ms * (deltaX / (Math.abs(deltaX) + Math.abs(deltaY)));
      var yChange = -1 * this.ms * (deltaY / (Math.abs(deltaY) + Math.abs(deltaX)));

      if (xChange === 0 || xChange === -0) {
        xChange = 0;

        var _numRepeats = Math.abs(Math.floor(deltaY / yChange));

        return [xChange, yChange, _numRepeats];
      }

      if (yChange === -0) {
        yChange = 0;
      }

      var numRepeats = Math.abs(Math.floor(deltaX / xChange));
      return [xChange, yChange, numRepeats];
    }
  }, {
    key: "move",
    value: function move(endPos) {
      var _this = this;

      var attackOnFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var addXPBar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var lockedIn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this.movingOutTheWay = true;
      this.clearIntervals();
      this.isMoving = true;
      endPos[0] = Math.floor(endPos[0] - this.container.offsetWidth * (1 / 2));
      endPos[1] = Math.floor(endPos[1] - this.container.offsetHeight * (1 / 2));
      var pos = this.pos;
      var posChange = this.vectorToScalar(endPos); // console.log("pos change on move", posChange);

      var bigDiv = document.getElementById('game-container');
      var width = bigDiv.offsetWidth;
      var height = bigDiv.offsetHeight;

      if (pos[0] - endPos[0] < 0) {
        this.img.style.transform = "scaleX(1)";
      } else {
        this.img.style.transform = "scaleX(-1)";
      }

      this.currentAction = setInterval(function () {
        return frame(_this);
      }, 20);

      function frame(self) {
        if (!(self.lockedIntoAbility || self.stunned || self.rooted) || lockedIn) {
          if (posChange[2] === 0) {
            // close animation
            self.clearIntervals();
            self.lockedIntoAbility = false;
            self.movingOutTheWay = false;
            pos[0] = Math.floor(pos[0]);
            pos[1] = Math.floor(pos[1]);

            if (attackOnFinish) {
              // console.log('self in move end: ', self);
              self.autoAttack(attackOnFinish); // needs editing
            } else if (addXPBar) {
              // console.log('move ended');
              self.img.style.transform = "scaleX(1)";
              self.img.style.border = '5px solid gold';
            }
          } else {
            // need to add something for if (attackOnFinish) then update move destination to be the target's new position (with the modifiers)
            // begin some kind of animation
            pos[0] += posChange[0];
            pos[1] += posChange[1];

            if (pos[0] + Math.floor(self.container.offsetWidth) + 10 > width) {
              pos[0] = width - Math.floor(self.container.offsetWidth) - 10;
            }

            if (pos[0] < 10) {
              pos[0] = 10;
            }

            if (pos[1] + Math.floor(self.container.offsetHeight) + 10 > height) {
              pos[1] = height - Math.floor(self.container.offsetHeight) - 10;
            }

            if (pos[1] < 10) {
              pos[1] = 10;
            } // console.log('posChange: ', posChange);
            // console.log('pos: ', pos);


            self.container.style.top = Math.floor(pos[1]) + 'px';
            self.container.style.left = Math.floor(pos[0]) + 'px';
            posChange[2] -= 1;
          }
        }
      }
    }
  }, {
    key: "withinAttackRange",
    value: function withinAttackRange(target) {
      if (this.range === 'infinite') {
        return true;
      }

      var widthAddition = Math.floor(this.img.width / 2 + target.img.width / 2);

      if (this.pos[0] > target.pos[0] - widthAddition - this.range && this.pos[0] < target.pos[0] + widthAddition + this.range) {
        var heightAddition = Math.floor(this.img.height / 4);

        if (this.pos[1] > target.pos[1] - heightAddition && this.pos[1] < target.pos[1] + heightAddition) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "killEntity",
    value: function killEntity(entity) {
      // console.log(entity.klass, "killed");
      self.lockedIntoAbility = false;
      entity.clearIntervals();

      if (entity.abilityContainer) {
        entity.abilityContainer.style.display = 'none';
      }

      entity.hp = -100;
      entity.container.style.display = "none";
    }
  }, {
    key: "setHpBars",
    value: function setHpBars() {
      var leftWidth = Math.floor(this.hp / this.baseHP * 100);
      var rightWidth = 100 - leftWidth;
      if (leftWidth < 0) leftWidth = 0;
      if (rightWidth < 0) rightWidth = 0;
      this.hpContainerLeft.style.width = leftWidth + '%';
      this.hpContainerRight.style.width = rightWidth + '%';
      var rightInnerWidth = Math.floor(this.tempHP / this.hp * 100);
      var leftInnerWidth = 100 - leftInnerWidth;
      if (leftInnerWidth < 0) leftInnerWidth = 0;
      if (rightInnerWidth < 0) rightInnerWidth = 0;
      var innerLeftBar = document.getElementById(this.imgName + '-inner-leftHP-bar');
      var innerTempBar = document.getElementById(this.imgName + '-inner-tempHP-bar');
      innerLeftBar.style.width = leftInnerWidth + '%';
      innerTempBar.style.width = rightInnerWidth + '%';
    }
  }, {
    key: "setTargetAndAttack",
    value: function setTargetAndAttack() {
      // console.log(this.klass, "has finished attacking", this.target.klass);
      if (this.baseDMG > 0) {
        this.enemies = shuffle(this.enemies);

        for (var i = 0; i < this.enemies.length; i++) {
          if (this.enemies[i].hp > 0) {
            this.target = this.enemies[i];
          }
        }

        if (this.target.hp < 0) {
          return;
        }
      } else {
        this.allies = shuffle(this.allies);

        for (var _i = 0; _i < this.allies.length; _i++) {
          if (this.allies[_i].hp > 0) {
            this.target = this.allies[_i];
          }
        }

        if (this.target.hp < 0) {
          return;
        }
      } // console.log(this.klass, "is now attacking", this.target.klass);


      this.autoAttack(this.target);
    }
  }, {
    key: "charactersStacked",
    value: function charactersStacked() {
      for (var i = 0; i < this.allies.length; i++) {
        if (!this.allies[i].movingOutTheWay && !(this.allies[i].img.style.display === 'none')) {
          var widthAddition = Math.floor(this.img.width / 2);

          if (this.pos[0] > this.allies[i].pos[0] - widthAddition && this.pos[0] < this.allies[i].pos[0] + widthAddition) {
            var heightAddition = Math.floor(this.img.height / 2);

            if (this.pos[1] > this.allies[i].pos[1] - heightAddition && this.pos[1] < this.allies[i].pos[1] + heightAddition) {
              // console.log(this.klass, "is moving to avoid", this.allies[i].klass);
              return true;
            }
          }
        }
      }

      return false;
    }
  }, {
    key: "trackTarget",
    value: function trackTarget(target) {
      var _this2 = this;

      var lockedIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // hot code
      this.clearIntervals();
      this.isMoving = true;
      var bigDiv = document.getElementById('game-container');
      var difference = Math.floor((window.innerWidth - bigDiv.offsetWidth) / 2);
      var checker = difference + Math.floor(bigDiv.offsetWidth);
      this.currentAction = setInterval(function () {
        return move(_this2);
      }, 20);

      function move(self) {
        if (!(self.lockedIntoAbility || self.stunned || self.rooted) || lockedIn) {
          if (target.container.style.display === 'none') {
            self.clearIntervals();

            if (!self.allied) {
              self.setTargetAndAttack();
            }

            return;
          }

          if (self.withinAttackRange(target)) {
            clearInterval(self.currentAction);
            self.lockedIntoAbility = false;
            self.autoAttack(target); // console.log('auto attack called from track');
          } else {
            var pos = self.pos;
            var movePos = target.pos.slice();

            if (pos[0] - movePos[0] < 0) {
              movePos[0] -= target.img.width;
              self.img.style.transform = "scaleX(1)";
            } else {
              movePos[0] += target.img.width;
              self.img.style.transform = "scaleX(-1)";
            }

            var posChange = self.vectorToScalar(movePos);
            pos[0] += posChange[0];
            pos[1] += posChange[1];

            if (pos[0] + Math.floor(self.img.width) > checker) {
              pos[0] = checker - Math.floor(self.img.width);
            }

            if (pos[0] < 15) {
              pos[0] = 15;
            }

            if (pos[1] + Math.floor(self.img.height) > 850) {
              pos[1] = 850 - Math.floor(self.img.height);
            }

            if (pos[1] < 15) {
              pos[1] = 15;
            }

            self.container.style.top = Math.floor(pos[1]) + 'px';
            self.container.style.left = Math.floor(pos[0]) + 'px';
          }
        }
      }
    }
  }, {
    key: "setOverlay",
    value: function setOverlay(targetChar) {
      // create div for overlay
      var attackOverlay = document.createElement("div");
      attackOverlay.classList.add(targetChar.imgName.substr(0, 1) + "-heal-overlay");
      document.getElementById("game-container").appendChild(attackOverlay);
      attackOverlay.style.top = targetChar.pos[1] + 40 + 'px';
      attackOverlay.style.left = targetChar.pos[0] + 'px';
      attackOverlay.style.width = targetChar.img.width + 'px';
      attackOverlay.style.height = targetChar.img.height + 'px';
      var clearTime = Math.floor(this.as / 2); // 50%op => 0%op over clearTime / 20

      var iterations = clearTime / 20;
      var opacity = 50;
      var opSubtraction = opacity / iterations;
      var timeCheck = 0;
      var stackInterval = setInterval(function () {
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
  }, {
    key: "beginAttack",
    value: function beginAttack() {
      var _this3 = this;

      var lockedIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // make some kind of animation start
      this.clearIntervals();
      this.isAttacking = true;

      if (this.allied) {
        for (var i = 0; i < 4; i++) {
          // console.log(this.abilityShouldCast[i]);
          if (this.abilityShouldCast[i] === true) {
            this.abilityShouldCast[i] = false;
            this.useAbility(i);
          }
        }
      }

      this.currentAnimation = setInterval(function () {
        return _this3.animateAttack(lockedIn);
      }, Math.floor(this.as / 4));
    }
  }, {
    key: "animateAttack",
    value: function animateAttack() {
      var lockedIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!(this.lockedIntoAbility || this.stunned) || lockedIn) {
        if (!this.target || this.target.hp <= 0) {
          self.lockedIntoAbility = false;
          this.clearIntervals();

          if (!this.allied) {
            // chose another hero to attack
            this.setTargetAndAttack(); // maybe add something in for player to auto target upon deaths ?
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

          if (this.allied) {
            for (var j = 0; j < 4; j++) {
              if (this.abilityShouldCast[j] === 1) {
                // console.log(this.klass);
                // console.log(this.abilityShouldCast[j]);
                this.useAbility(j);
              }
            }
          }

          this.attack(this.target);
        }

        if (!this.allied && this.baseDMG < 0) {
          var lowest = 500;
          var newTarg;

          for (var i = 0; i < this.allies.length; i++) {
            if (this.allies[i].hp > 0 && this.allies[i].hp < lowest) {
              lowest = this.allies[i].hp;
              newTarg = this.allies[i];
            }
          }

          this.target = newTarg;
        }

        this.imgCycle = this.imgCycle % this.attackImages.length;
        this.img.src = this.attackImages[this.imgCycle].src;
      }
    }
  }, {
    key: "attack",
    value: function attack(target) {
      if (!this.withinAttackRange(target)) {
        this.trackTarget(target);
        return;
      } else {
        if (this.dmg > 0) {
          if (target.tempHP > 0) {
            target.tempHP -= this.dmg;

            if (target.tempHP < 0) {
              target.hp += target.tempHP;
              target.tempHP = 0;
            }
          } else {
            target.hp -= this.dmg * 15 / target.defense;
          }

          if (!target.isMoving && !target.isAttacking && target.allied && target.dmg > 0) {
            target.target = this;
            target.autoAttack(this);
          }
        } else {
          target.hp -= this.dmg;
        }

        if (this.attackOverlay) {
          if (this.attackOverlay === 1) {
            this.setOverlay(this);
          } else {
            this.setOverlay(target);
          }
        }

        if (target.hp > target.baseHP) {
          target.hp = target.baseHP;
        }

        if (!target.allied && this.allied && target.baseDMG > 0 && this.defense > target.target.defense) {
          target.target = this;
          target.autoAttack(this);
        }

        target.setHpBars();

        if (target.hp <= 0) {
          this.killEntity(target);

          if (!this.allied) {
            // chose another hero to attack
            this.setTargetAndAttack();
          }
        } // console.log("border style: ", target.img.style.border);


        if (target.img.style.border !== "5px solid gold") {
          if (this.baseDMG > 0) {
            target.img.style.border = "3px solid red";
          } else {
            target.img.style.border = "3px solid green";
          }

          setTimeout(function () {
            if (target && target.img.style.border !== "5px solid gold") {
              target.img.style.border = "none";
            }
          }, 500);
        }

        if (this.range !== 'infinite' && this.charactersStacked()) {
          this.movingOutTheWay = true;
          var widthAddition = Math.floor(this.container.offsetWidth / 2);
          var eWidthAddition = Math.floor(target.container.offsetWidth); // const heightAddition = Math.floor(this.container.offsetHeight / 2);

          var eHeightAddition = Math.floor(target.container.offsetHeight / 2);

          if (this.img.style.transform === "scaleX(-1)") {
            // move to left side of target
            this.img.style.transform = "scaleX(1)";
            this.move([target.pos[0] - widthAddition, target.pos[1] + eHeightAddition], target);
          } else {
            // move to right side of target;
            this.img.style.transform = "scaleX(-1)";
            this.move([target.pos[0] + (widthAddition + eWidthAddition), target.pos[1] + eHeightAddition], target);
          }
        }
      }
    }
  }, {
    key: "autoAttack",
    value: function autoAttack(targetChar) {
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
  }, {
    key: "clearIntervals",
    value: function clearIntervals() {
      clearInterval(this.currentAction);
      clearInterval(this.currentAnimation);
      this.img.src = this.baseImg.src;
      this.imgCycle = 0;
      this.isAttacking = false;
      this.isMoving = false;
    }
  }, {
    key: "useAbility",
    value: function useAbility(n) {
      var _this4 = this;

      var ab = this.abilities[n];

      if (this.abilityShouldCast[n] === 1) {
        ab(this, this.target);
        return;
      } else if (!this.abilityAvailable[n] || this.abilities.length === 0) {
        return;
      } // console.log('ability', n, 'attempted');


      this.abilityAvailable[n] = false; // console.log('ability: ', ab);

      var cdTime = ab(this, this.target);

      if (cdTime === false) {
        // console.log('no target for ability');
        this.abilityAvailable[n] = true;
        return;
      } // console.log('seconds for ability cd: ', cdTime);


      var innerBoxes = document.getElementsByClassName(this.imgName + '-inner-ability-divs');
      colorFade(innerBoxes[n], cdTime, [255, 0, 0], [0, 0, 255]);
      var CDTimer = setInterval(function () {
        _this4.abilityAvailable[n] = true; // console.log(this.imgName, ' ability ', n, ' off CD');

        clearInterval(CDTimer);
      }, cdTime * 1000);
    }
  }]);

  return Entity;
}();

/* harmony default export */ __webpack_exports__["default"] = (Entity);

function colorFade(element, time, start, end) {
  element.style.border = 'none';
  element.style.backgroundColor = 'rgb(' + start.toString() + ')';
  var currentColor = start.slice();
  var numIntervals = time * 5;
  var deltaX = Math.floor((end[0] - start[0]) / numIntervals);
  var deltaY = Math.floor((end[1] - start[1]) / numIntervals);
  var deltaZ = Math.floor((end[2] - start[2]) / numIntervals);
  var timeCount = 0;
  var interval = setInterval(function () {
    currentColor[0] += deltaX;
    currentColor[1] += deltaY;
    currentColor[2] += deltaZ;
    element.style.backgroundColor = 'rgb(' + currentColor.toString() + ')';
    timeCount++;

    if (timeCount >= time * 5) {
      element.style.backgroundColor = 'rgb(' + end.toString() + ')';
      element.style.border = '5px solid gold'; // console.log('color fade complete');

      clearInterval(interval);
    }
  }, 200);
}

function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [a[j], a[i]];
    a[i] = _ref[0];
    a[j] = _ref[1];
  }

  return a;
}

function fastFadeOut(element) {
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var op = 25;
  var timerDown = setInterval(function () {
    if (op <= 0) {
      clearInterval(timerDown);
      element.style.display = 'none';

      if (action) {
        action();
      }
    }

    element.style.opacity = op / 25;
    op -= 1;

    if (element.style.display === 'none') {
      clearInterval(timerDown);
      element.style.opacity = 0;
    }
  }, 25);
}

function fastFadeIn(element) {
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var op = 0;
  var timerUp = setInterval(function () {
    if (op >= 20) {
      clearInterval(timerUp);

      if (action) {
        action();
      }
    }

    element.style.opacity = op / 20;
    op += 1;

    if (element.style.display === 'none') {
      clearInterval(timerUp);
      element.style.opacity = 0;
    }
  }, 25);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _screen_controllers_entity_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screen_controllers/entity_controller */ "./src/screen_controllers/entity_controller.js");


function slowFade(element) {
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var op = 80;
  var timerDown = setInterval(function () {
    if (op <= 0) {
      clearInterval(timerDown);
      element.style.display = 'none';

      if (action) {
        action();
      }
    }

    element.style.opacity = op / 40;
    op -= 1;
  }, 50);
}

window.addEventListener('load', function () {
  var gameTag = document.getElementById('game-tag');
  gameTag.style.opacity = 0;
  gameTag.style.display = '';
  var charsDisp = document.getElementById('title-screen-chars');
  var closeButton = document.getElementById('close-button');
  var hButtons = document.getElementsByClassName('h-button');
  var keybindContainer = document.getElementById('full-keybind-container');
  var levelButtonContainer = document.getElementById('level-button-container');
  var levelButtonHeader = document.getElementById("level-button-container-header");
  var statsContainer = document.getElementById('heroes-stats-full-container');
  var levelButtons = document.getElementsByClassName('level-button');
  var backgroundImage = document.getElementById('background-image');
  var titleBackground = document.getElementById('title');
  var gameContainer = document.getElementById('game-container');
  var partySelectorContainer = document.getElementById('party-selector-container');
  var keybindInputs = document.getElementsByClassName('keybind-input');

  var _loop = function _loop(i) {
    keybindInputs[i].addEventListener("change", function () {
      return handleKeybindInput(keybindInputs[i], i);
    });
  };

  for (var i = 0; i < keybindInputs.length; i++) {
    _loop(i);
  }

  function handleKeybindInput(input, i) {
    // console.log('pre-mod: ', input.value);
    if (input.value.length > 1) {
      input.value = input.value[0];
    } else {
      for (var j = 0; j < keybindInputs.length; j++) {
        if (i !== j && keybindInputs[j].value === input.value) {
          keybindInputs[j].value = '';
        }
      }
    }
  }

  function secondAction() {
    var gTContainer = document.getElementById('game-tag-container');
    gTContainer.style.display = 'none';

    function closeAction() {
      // controlsContainer.style.display = 'none';
      for (var _i = 0; _i < hButtons.length; _i++) {
        hButtons[_i].style.display = '';
      } // controlsButton.style.display = '';


      levelButtonHeader.style.display = 'none';
      levelButtonContainer.style.display = 'none';
      keybindContainer.style.display = 'none';
      statsContainer.style.display = 'none';
      closeButton.style.display = 'none';
      partySelectorContainer.style.display = 'none';
      charsDisp.style.display = '';
      backgroundImage.src = titleBackground.src;
      backgroundImage.style.opacity = 100;
      backgroundImage.style.display = '';
    }

    closeAction();

    var _loop2 = function _loop2(_i2) {
      levelButtons[_i2].addEventListener('click', function () {
        closeButton.style.display = 'none'; // closeButton.removeEventListener('click', closeAction);

        charsDisp.style.display = 'none';
        backgroundImage.style.display = 'none';
        document.getElementById('background-image').style.height = '88%';
        gameContainer.style.height = '88%';
        document.getElementById('all-characters-ability-container').style.height = '12%';
        Object(_screen_controllers_entity_controller__WEBPACK_IMPORTED_MODULE_0__["default"])(_i2 + 1);
      });
    };

    for (var _i2 = 0; _i2 < levelButtons.length; _i2++) {
      _loop2(_i2);
    }

    levelButtons[0].style.opacity = 100;
    levelButtons[0].style.cursor = 'pointer';
    closeButton.addEventListener('click', closeAction);

    var hButtonPartialAction = function hButtonPartialAction() {
      for (var _i3 = 0; _i3 < hButtons.length; _i3++) {
        hButtons[_i3].style.display = 'none';
      }

      closeButton.style.display = '';
      charsDisp.style.display = 'none';
      backgroundImage.style.display = 'none';
    };

    hButtons[0].addEventListener('click', function () {
      hButtonPartialAction();
      levelButtonContainer.style.display = '';
      levelButtonHeader.style.display = '';
    });
    hButtons[1].addEventListener('click', function () {
      hButtonPartialAction();
      keybindContainer.style.display = '';
    });
    hButtons[2].addEventListener('click', function () {
      hButtonPartialAction();
      statsContainer.style.display = '';
    });
    hButtons[3].addEventListener('click', function () {
      hButtonPartialAction();
      partySelectorContainer.style.display = '';
    });
  }

  slowFade(gameTag, secondAction);
});

/***/ }),

/***/ "./src/levels/level.js":
/*!*****************************!*\
  !*** ./src/levels/level.js ***!
  \*****************************/
/*! exports provided: levelZero, levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven, levelEight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelZero", function() { return levelZero; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelOne", function() { return levelOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelTwo", function() { return levelTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelThree", function() { return levelThree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelFour", function() { return levelFour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelFive", function() { return levelFive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelSix", function() { return levelSix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelSeven", function() { return levelSeven; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelEight", function() { return levelEight; });
/* harmony import */ var _entities_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/character */ "./src/entities/character.js");
/* harmony import */ var _entities_enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities/enemy */ "./src/entities/enemy.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import * as charactersObj from '../entities/character';

 // console.log(enemiesObj);

var enemiesList = _entities_enemy__WEBPACK_IMPORTED_MODULE_1__["allEnemies"]; // const charactersArr = Object.values(charactersObj);

var enemiesArr = Object.values(_entities_enemy__WEBPACK_IMPORTED_MODULE_1__); // console.log(enemiesArr);

var classCreator = _entities_enemy__WEBPACK_IMPORTED_MODULE_1__["classCreator"];

var Level = /*#__PURE__*/function () {
  function Level(name, level, enemyList) {
    var message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
    var actionChanges = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};
    var shouldSetLevels = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var characterList = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

    _classCallCheck(this, Level);

    this.name = name;
    this.level = level;
    this.enemyList = enemyList;
    this.message = message;
    this.action = actionChanges;
    this.characterList = characterList;
    this.shouldSetLevels = shouldSetLevels; // this.actionExpended = false;
  }

  _createClass(Level, [{
    key: "setEnemyLevels",
    value: function setEnemyLevels(level) {
      for (var i = 0; i < this.enemyList.length; i++) {
        this.enemyList[i].setLevel(level);
      }
    }
  }]);

  return Level;
}();

function modP(width, percent) {
  return Math.floor(width * percent);
}

function applyMod(entity, mod) {
  var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var container = document.getElementById('game-container');
  var width = Math.floor(container.offsetWidth);
  var height = Math.floor(container.offsetHeight);

  if (x) {
    entity.pos[0] = modP(width, mod / 100);
    entity.basePos[0] = entity.pos[0];
  } else {
    entity.pos[1] = modP(height, mod / 100);
    entity.basePos[1] = entity.pos[1];
  }
}

var defaultAction = function defaultAction(cArr, eArr) {
  // console.log(cArr, eArr);
  applyMod(cArr[0], 60);
  applyMod(cArr[1], 50);
  applyMod(cArr[2], 40);
  applyMod(cArr[3], 30);
  applyMod(cArr[0], 25, false);
  applyMod(cArr[1], 55, false);
  applyMod(cArr[2], 25, false);
  applyMod(cArr[3], 55, false);
  return true;
};

var tutorialActions = function tutorialActions() {
  var cArr = _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"].slice(0, 4);
  var eArr = enemiesArr.slice(0, 4);
  applyMod(cArr[0], 35);
  applyMod(cArr[1], 15);
  applyMod(cArr[2], 15);
  applyMod(cArr[3], 55);
  applyMod(cArr[0], 55, false);
  applyMod(cArr[1], 33, false);
  applyMod(cArr[2], 66, false);
  applyMod(cArr[3], 22, false);
  applyMod(eArr[0][0], 55);
  applyMod(eArr[0][0], 55, false);
  applyMod(eArr[3][0], 55);
  applyMod(eArr[3][1], 75);
  applyMod(eArr[3][0], 55, false);
  applyMod(eArr[3][1], 33, false);
  applyMod(eArr[3][2], 75);
  applyMod(eArr[3][2], 66, false);
  applyMod(eArr[3][3], 35);
  applyMod(eArr[3][3], 22, false);
  return false;
};

var actionFive = function actionFive(cArr, eArr) {
  // WaCWiR
  applyMod(cArr[0], 65);
  applyMod(cArr[1], 45);
  applyMod(cArr[2], 45);
  applyMod(cArr[3], 25);
  applyMod(cArr[0], 45, false);
  applyMod(cArr[1], 25, false);
  applyMod(cArr[2], 65, false);
  applyMod(cArr[3], 45, false); // WiRWaC

  applyMod(eArr[0], 10);
  applyMod(eArr[1], 15);
  applyMod(eArr[2], 75);
  applyMod(eArr[3], 80);
  applyMod(eArr[0], 20, false);
  applyMod(eArr[1], 65, false);
  applyMod(eArr[2], 65, false);
  applyMod(eArr[3], 20, false);
  return false;
};

var actionSix = function actionSix(cArr, eArr) {
  // WaCWiR
  applyMod(cArr[0], 60);
  applyMod(cArr[1], 60);
  applyMod(cArr[2], 30);
  applyMod(cArr[3], 30);
  applyMod(cArr[0], 60, false);
  applyMod(cArr[1], 30, false);
  applyMod(cArr[2], 30, false);
  applyMod(cArr[3], 60, false); // WiRWaC

  applyMod(eArr[0], 5);
  applyMod(eArr[1], 45);
  applyMod(eArr[2], 45);
  applyMod(eArr[3], 85);
  applyMod(eArr[0], 45, false);
  applyMod(eArr[1], 10, false);
  applyMod(eArr[2], 70, false);
  applyMod(eArr[3], 45, false);
  return false;
};

var actionSeven = function actionSeven(cArr, eArr) {
  applyMod(cArr[0], 50);
  applyMod(cArr[1], 10);
  applyMod(cArr[2], 35);
  applyMod(cArr[3], 65);
  applyMod(cArr[0], 20, false);
  applyMod(cArr[1], 45, false);
  applyMod(cArr[2], 60, false);
  applyMod(cArr[3], 35, false);
  applyMod(eArr[0], 25);
  applyMod(eArr[1], 10);
  applyMod(eArr[2], 80);
  applyMod(eArr[3], 45);
  applyMod(eArr[0], 15, false);
  applyMod(eArr[1], 45, false);
  applyMod(eArr[2], 45, false);
  applyMod(eArr[3], 70, false);
  return false;
};

var actionEight = function actionEight(cArr, eArr) {
  // WaCWiR
  applyMod(cArr[0], 60);
  applyMod(cArr[1], 60);
  applyMod(cArr[2], 30);
  applyMod(cArr[3], 30);
  applyMod(cArr[0], 60, false);
  applyMod(cArr[1], 30, false);
  applyMod(cArr[2], 30, false);
  applyMod(cArr[3], 60, false); // WiRWaC

  applyMod(eArr[0], 45);
  applyMod(eArr[1], 10);
  applyMod(eArr[2], 80);
  applyMod(eArr[3], 45);
  applyMod(eArr[0], 15, false);
  applyMod(eArr[1], 45, false);
  applyMod(eArr[2], 45, false);
  applyMod(eArr[3], 70, false);
  return false;
};

function makeRandomLevel(levelNum) {
  var el = enemiesList.slice();
  var enemies = [];

  for (var i = 0; i < 4; i++) {
    var idx = Math.floor(Math.random() * enemiesList.length);

    if (idx > el.length) {
      idx++;
    }

    var enemy = new classCreator(el[idx].klass, el[idx].range, el[idx].trueBaseHp, el[idx].baseMS, el[idx].baseAS, el[idx].trueBaseDMG, el[idx].allied, [0, 0], el[idx].trueBaseDefense, el[idx].attackOverlay, el[idx].extraAttackAnimation, null, null);
    enemies.push(enemy);
  }

  var lev = new Level("Level ".concat(levelNum), levelNum, enemies, "", defaultAction, true);
  return lev;
}

var levelZero = new Level('Zero', 0, enemiesList, "", null, false, _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"]);
var levelOne = new Level('Warrior', 1, enemiesArr[0], "Click on the stick figure, the warrior, in black to select it. Then click on the red stick figure enemy to attack it or click anywhere on the map to move there. Once an action is performed, the character will keep doing it until given a new action.", tutorialActions, false, [_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0]]);
var levelTwo = new Level('Cleric', 2, enemiesArr[1], "The character with a staff is a cleric healer. Click on it and then on an allied unit or itself to begin healing them. De-select a character without making an action by clicking the Red button on the top right. Defeat all enemies to clear the level.", tutorialActions, false, [_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1]]);
var levelThree = new Level('Wizard', 3, enemiesArr[2], "The character with the blue hat, the wizard, can attack enemies from any range. Click on it then on an enemy to begin attacking immediately. \nAttacking an enemy with the Warrior will cause them to focus their attacks on him.", tutorialActions, false, [_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2]]);
var levelFour = new Level('Rogue', 4, enemiesArr[3], "The newest character addition is the rogue with the daggers. Each character has a unique role. The Warrior is the best tank, the rogue the fastest attacker, the wizard the most versitile damage dealer, and the cleric the healer.", tutorialActions, false, [_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2], _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][3]]);
var levelFive = new Level('Level Five', 5, enemiesArr[4], "The tutorial levels are over. Time for more of a challenge", actionFive);
var levelSix = new Level('Magic', 6, enemiesArr[5], "Wizards and Clerics", actionSix);
var levelSeven = new Level('Melee', 7, enemiesArr[6], "All melee", actionSeven);
var levelEight = new Level('Doppel-ganger', 8, enemiesArr[7], "Fight copies of yourself", actionEight); // export const levelNine = new Level('Level Nine', 9, enemiesList.slice(1, 5), "", defaultAction, true);
// export const levelTen = makeRandomLevel(10);

/***/ }),

/***/ "./src/screen_controllers/entity_controller.js":
/*!*****************************************************!*\
  !*** ./src/screen_controllers/entity_controller.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _levels_level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../levels/level */ "./src/levels/level.js");
/* harmony import */ var _fades__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fades */ "./src/screen_controllers/fades.js");


var hasBeenLoaded = false;
var levelHasEnded = false;
var levels = Object.values(_levels_level__WEBPACK_IMPORTED_MODULE_0__);
var currentLevelNumber = 1;
var maxLevelNumber = 1; // change on pushed ver

var characters = levels[0].characterList.slice();
var party = levels[4].characterList.slice();
var levelXPGain = 0;
var selectedChar;
var countToReach = 0;
var moveFinishCount = 0;
var livingEnemies = {};
var livingChars = {};
var currentAbilityBoxes;
var hotkeys = {};
window.addEventListener('load', function () {
  var statChar1;
  var statChar2;
  var currentShowingAbilityDescription;
  var heroStatcontainer = document.getElementById('heroes-button');
  var heroStatsBlocks = document.getElementsByClassName('hero-stats');
  var heroNameplateSelectors = document.getElementsByClassName('stat-selector');
  var statSelectorNames = document.getElementsByClassName('stat-selector-name');
  var statImages = document.getElementsByClassName('stats-img');
  var statAbilities1 = document.getElementsByClassName('stat-ability-div-1');
  var statAbilities2 = document.getElementsByClassName('stat-ability-div-2');
  var abDescShader = document.getElementsByClassName('ability-description-shader')[0];
  var partySelectorButton = document.getElementById('party-button');
  var partySelectorContainer = document.getElementById('party-selector-container');
  var partySelectorNames = document.getElementsByClassName('party-selector-name');
  var characterNameDisplays = document.getElementsByClassName('character-name-dispay');

  for (var i = 1; i < levels.length; i++) {
    var button = document.createElement("button");
    button.classList.add("level-button");
    button.id = "level-".concat(i, "-button");
    button.innerHTML = levels[i].name;
    document.getElementById("level-button-container").appendChild(button);
  }

  abDescShader.addEventListener('click', function () {
    currentShowingAbilityDescription.style.display = 'none';
    currentShowingAbilityDescription = null;
    abDescShader.style.display = 'none';
  });

  function showAbilityDescription(side, num) {
    var hero;

    if (side === 1) {
      hero = statChar1;
    } else {
      hero = statChar2;
    }

    currentShowingAbilityDescription = document.getElementById(hero.klass + '-ability-' + num + '-description-div');
    currentShowingAbilityDescription.style.display = '';
    abDescShader.style.display = '';
  }

  var _loop = function _loop(_i) {
    statAbilities1[_i].addEventListener('click', function () {
      return showAbilityDescription(1, _i + 1);
    });

    statAbilities2[_i].addEventListener('click', function () {
      return showAbilityDescription(2, _i + 1);
    });
  };

  for (var _i = 0; _i < statAbilities1.length; _i++) {
    _loop(_i);
  }

  heroStatcontainer.addEventListener('click', function () {
    for (var _i2 = 0; _i2 < statImages.length; _i2++) {
      if (statImages[_i2].style.display !== 'none') {
        var _char = void 0;

        if (_i2 === 0) {
          _char = statChar1;
        } else {
          _char = statChar2;
        }

        var statImg = document.getElementById("stats-img-".concat(_i2 + 1));
        var nameStat = document.getElementById("stats-name-".concat(_i2 + 1));
        var levelStat = document.getElementById("stats-level-".concat(_i2 + 1));
        var hpStat = document.getElementById("stats-hp-".concat(_i2 + 1));
        var dmgStat = document.getElementById("stats-dmg-".concat(_i2 + 1));
        var defenseStat = document.getElementById("stats-defense-".concat(_i2 + 1));
        statImg.src = _char.baseImg.src;
        nameStat.innerHTML = "Level: ".concat(_char.level);
        levelStat.innerHTML = _char.klass;
        hpStat.innerHTML = "Health: ".concat(_char.baseHP);
        dmgStat.innerHTML = "Power: ".concat(Math.abs(_char.baseDMG));
        defenseStat.innerHTML = "Defense: ".concat(_char.baseDefense);

        for (var j = 0; j < statAbilities1.length; j++) {
          if (_char.abilities[j]) {
            if (_i2 === 0) {
              statAbilities1[j].style.display = '';
            } else {
              statAbilities2[j].style.display = '';
            }
          } else {
            if (_i2 === 0) {
              statAbilities1[j].style.display = 'none';
            } else {
              statAbilities2[j].style.display = 'none';
            }
          }
        }
      }
    }

    for (var _i3 = 0; _i3 < statSelectorNames.length; _i3++) {
      if (party[_i3]) {
        statSelectorNames[_i3].innerHTML = party[_i3].klass;
      }
    }
  });
  partySelectorButton.addEventListener('click', function () {
    for (var _i4 = 0; _i4 < characterNameDisplays.length; _i4++) {
      if (characters[_i4]) {
        characterNameDisplays[_i4].innerHTML = characters[_i4].klass;
        characterNameDisplays[_i4].style.display = '';
      } else {
        characterNameDisplays[_i4].style.display = 'none';
      }
    }

    for (var _i5 = 0; _i5 < partySelectorNames.length; _i5++) {
      if (party[_i5]) {
        partySelectorNames[_i5].innerHTML = party[_i5].klass;
      }
    }
  });
  var partyCharSelected = null;
  var partyCharIdx = null;

  var _loop2 = function _loop2(_i6) {
    characterNameDisplays[_i6].addEventListener('click', function () {
      if (!partyCharSelected) {
        for (var _j2 = 0; _j2 < partySelectorNames.length; _j2++) {
          partySelectorNames[_j2].style.cursor = 'pointer';

          partySelectorNames[_j2].addEventListener("mouseover", addBlueBorder);

          partySelectorNames[_j2].addEventListener("mouseleave", removeBlueBorder);
        }
      } else {
        characterNameDisplays[partyCharIdx].style.border = '2px solid black';
      }

      characterNameDisplays[_i6].style.border = '5px solid red';
      partyCharIdx = parseInt(characterNameDisplays[_i6].id.substr(characterNameDisplays[_i6].id.length - 1, 1)) - 1;
      partyCharSelected = characters[partyCharIdx];
    });
  };

  for (var _i6 = 0; _i6 < characterNameDisplays.length; _i6++) {
    _loop2(_i6);
  }

  var _loop3 = function _loop3(_i7) {
    partySelectorNames[_i7].addEventListener('click', function () {
      if (!partyCharSelected) {
        return;
      }

      partySelectorNames[_i7].style.cursor = 'default';

      partySelectorNames[_i7].removeEventListener("mouseover", addBlueBorder);

      partySelectorNames[_i7].removeEventListener("mouseleave", removeBlueBorder);

      partySelectorNames[_i7].style.border = 'none';

      for (var _j3 = 0; _j3 < party.length; _j3++) {
        if (party[_j3].klass === partyCharSelected.klass) {
          party[_j3] = party[_i7];
          partySelectorNames[_j3].innerHTML = party[_j3].klass;
          party[_j3].imgName = 'a' + (_j3 + 1); // party[j].addInlineStyle();
          // console.log(party);
        }
      }

      partySelectorNames[_i7].innerHTML = partyCharSelected.klass;
      party[_i7] = partyCharSelected;
      party[_i7].imgName = 'a' + (_i7 + 1); // party[i].addInlineStyle();

      characterNameDisplays[partyCharIdx].style.border = '2px solid black';
      partyCharIdx = null;
      partyCharSelected = null;
    });
  };

  for (var _i7 = 0; _i7 < partySelectorNames.length; _i7++) {
    _loop3(_i7);
  }

  var shouldSwap = false;
  var statCharSelected = null;

  function swapStatDisp(e) {
    if (!shouldSwap) {
      return;
    } // console.log('swapping now');


    e.currentTarget.style.border = '3px solid indigo';
    e.currentTarget.style.cursor = 'default';
    var sideCheck = e.currentTarget.id.substr(e.currentTarget.id.length - 1);

    for (var j = 0; j < heroStatsBlocks.length; j++) {
      heroStatsBlocks[j].removeEventListener("mouseover", addBlueBorder);
      heroStatsBlocks[j].removeEventListener("mouseleave", removeBlueBorder);
    }

    var charIndex = statCharSelected.id.substr(1, 1);
    var _char2 = party[charIndex - 1];
    statCharSelected.style.border = 'none';
    statCharSelected = null;

    for (var _j = 0; _j < statAbilities1.length; _j++) {
      if (_char2.abilities[_j]) {
        if (parseInt(sideCheck) === 1) {
          statAbilities1[_j].style.display = '';
        } else {
          statAbilities2[_j].style.display = '';
        }
      } else {
        if (parseInt(sideCheck) === 1) {
          statAbilities1[_j].style.display = 'none';
        } else {
          statAbilities2[_j].style.display = 'none';
        }
      }
    }

    var tarId = e.target.id;
    var sideNum = tarId.substr(tarId.length - 1, 1);

    if (sideNum == 1) {
      statChar1 = _char2;
    } else {
      statChar2 = _char2;
    }

    var statImg = document.getElementById("stats-img-".concat(sideNum));
    var nameStat = document.getElementById("stats-name-".concat(sideNum));
    var levelStat = document.getElementById("stats-level-".concat(sideNum));
    var hpStat = document.getElementById("stats-hp-".concat(sideNum));
    var dmgStat = document.getElementById("stats-dmg-".concat(sideNum));
    var defenseStat = document.getElementById("stats-defense-".concat(sideNum));

    if (statImg.style.display === 'none') {
      statImg.style.display = '';
    }

    statImg.src = document.getElementsByClassName(_char2.klass)[0].src;
    nameStat.innerHTML = "Level: ".concat(_char2.level);
    levelStat.innerHTML = _char2.klass;
    hpStat.innerHTML = "Health: ".concat(_char2.baseHP);
    dmgStat.innerHTML = "Power: ".concat(Math.abs(_char2.baseDMG));
    defenseStat.innerHTML = "Defense: ".concat(_char2.baseDefense);
    shouldSwap = false;
  }

  function addBlueBorder(e) {
    e.currentTarget.style.border = '6px solid blue';
    e.currentTarget.style.cursor = 'pointer';
  }

  function removeBlueBorder(e) {
    e.currentTarget.style.border = '3px solid indigo';
    e.currentTarget.style.cursor = 'default';
  }

  function initiateStatSwap(e) {
    // console.log('swap initiated');
    if (shouldSwap) {
      if (e.currentTarget === statCharSelected) {
        return;
      }

      statCharSelected.style.border = 'none';
      statCharSelected = e.currentTarget;
      e.currentTarget.style.border = '4px solid blue';
    } else {
      statCharSelected = e.currentTarget;
      statCharSelected.style.border = '4px solid blue';

      for (var j = 0; j < heroStatsBlocks.length; j++) {
        heroStatsBlocks[j].addEventListener("mouseover", addBlueBorder);
        heroStatsBlocks[j].addEventListener("mouseleave", removeBlueBorder);
      }

      shouldSwap = true;
    }
  }

  for (var j = 0; j < heroStatsBlocks.length; j++) {
    heroStatsBlocks[j].addEventListener("click", swapStatDisp);
  }

  for (var _i8 = 0; _i8 < heroNameplateSelectors.length; _i8++) {
    heroNameplateSelectors[_i8].addEventListener('click', initiateStatSwap);
  }
});

function addDeathListener(entity) {
  entity.observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
      if (mutationRecord.target.style.display === 'none') {
        // console.log(entity.imgName, 'style === none');
        if (entity.allied) {
          delete livingChars[entity.imgName];
        } else {
          levelXPGain += livingEnemies[entity.imgName].level * 50;
          delete livingEnemies[entity.imgName];
        }

        var c = Object.values(livingChars);
        var en = Object.values(livingEnemies);

        if (c.length === 0 || en.length === 0) {
          if (!levelHasEnded) {
            // console.log('end game called');
            endGame(c, en, currentLevelNumber);
          } // console.log('game should have ended');


          levelHasEnded = true;
        }
      }
    });
  });
}

function createXPObserver(_char3) {
  _char3.xpObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
      if (_char3.observationToken && mutationRecord.target.style.border === '5px solid gold') {
        moveFinishCount++;
        _char3.observationToken = false; // char.xpObserver.disconnect();

        if (moveFinishCount === countToReach) {
          addCharXP();
        }
      }
    });
  });
}

function addEntityEvents(entity, allies, enemies) {
  if (entity.imgName != "") {
    if (!entity.observer) {
      addDeathListener(entity);

      if (entity.allied) {
        createXPObserver(entity);
      }
    }

    entity.enemies = enemies;
    var cloneArr = allies.slice();
    var selfIndex;

    for (var i = 0; i < cloneArr.length; i++) {
      if (cloneArr[i].imgName === entity.imgName) {
        selfIndex = i;
      }
    } // remove self from allies list to prevent moving out of self image (healers excluded)


    if (entity.baseDMG > 0) {
      cloneArr.splice(selfIndex, 1);
    }

    entity.allies = cloneArr;
  } else {
    console.log('broken image passed in for', entity.imgName);
  }
}

function deSelect() {
  // console.log('de-selected')
  if (selectedChar) {
    selectedChar.abilityContainer.style.display = 'none';
    currentAbilityBoxes = null;
    selectedChar.img.style.border = 'none';
    selectedChar = null;
  }
}

function styleAbilityBox(entity) {
  var aBoxes = document.getElementsByClassName(entity.imgName + '-inner-ability-divs'); // const aLabels = document.getElementsByClassName(entity.imgName + '-ability-labels');

  for (var i = 0; i < aBoxes.length; i++) {
    aBoxes[i].style.width = aBoxes[i].offsetHeight + 'px';
  }
}

function select(entity) {
  entity.abilityContainer.style.display = '';
  currentAbilityBoxes = entity.abilityContainer;
  styleAbilityBox(entity);
  entity.img.style.border = '5px solid gold';
  selectedChar = entity;
}

function beginCurrentLevel() {
  var beginLevelButton = document.getElementById('begin-level-button');
  Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(beginLevelButton);
  var level = levels[currentLevelNumber];
  beginLevel(level.characterList.slice(), level.enemyList.slice(), currentLevelNumber);
}

function returnToSelectPage() {
  document.getElementById('return-button').style.display = 'none';
  document.getElementById('tutorial-message').style.display = 'none';
  document.getElementById("level-name-display").style.display = 'none';
  document.getElementById('begin-level-button').style.display = 'none';
  document.getElementById('level-button-container').style.display = '';
  document.getElementById('level-button-container-header').style.display = '';
  document.getElementById('close-button').style.display = '';
}

function selectChar(entity) {
  if (!entity || entity.container.style.display === 'none' || entity.hp < 0) {
    return;
  }

  if (selectedChar && selectedChar.baseDMG < 0) {
    if (selectedChar.isAttacking) {
      // console.log('no change. Target: ', selectedChar.target, ' entity: ', entity);
      selectedChar.target = entity;
    } else {
      // console.log('heal target switched');
      selectedChar.autoAttack(entity);
    }

    deSelect();
    return;
  }

  deSelect();
  select(entity);
}

function selectEnemy(entity) {
  if (!selectedChar || selectedChar.hp < 0) {
    deSelect();
    return;
  } else if (selectedChar.target === entity && selectedChar.isAttacking || entity.hp && entity.hp < 0) {
    return;
  }

  if (selectedChar.allied && selectedChar.baseDMG > 0) {
    if (selectedChar.isAttacking && selectedChar.withinAttackRange(entity)) {
      selectedChar.target = entity;
    } else {
      selectedChar.autoAttack(entity);
    }

    for (var i = 0; i < selectedChar.abilities.length; i++) {
      if (selectedChar.abilityShouldCast[i] === true) {
        selectedChar.abilityShouldCast[i] = false;
        selectedChar.useAbility(i); // console.log('ability used on click event');
      }
    }
  }
}

var clickEvents = function clickEvents(e) {
  // console.log(e);
  var entityName = e.target.id.slice(0, 2); // console.log(entityName);

  if (entityName[0] === 'a') {
    var entity = livingChars[entityName];
    selectChar(entity);
  } else {
    var _entity = livingEnemies[entityName];
    selectEnemy(_entity);
  }

  e.stopPropagation();
};

function keydownEvent(e) {
  var entity = hotkeys[e.key];

  if (entity && entity.allied) {
    selectChar(entity);
  } else if (entity && entity.klass) {
    selectEnemy(entity);
  } else if ((entity === 0 || entity) && selectedChar) {
    if (selectedChar.abilityShouldCast[entity] !== 1) {
      selectedChar.useAbility(entity);
    }
  } else {// console.log('invalid key press of: ', e.key);
    // console.log('value is: ', entity);
    // console.log(hotkeys);
  }
}

function abilityClick(arr) {
  var entity = livingChars['a' + arr[0]];

  if (entity) {
    if (entity.abilityShouldCast[arr[1]] !== 1) {
      entity.useAbility(arr[1]);
    }
  } else {// console.log('invalid entity for ability use');
  }
}

function setAbilityBoxes() {
  var abilityBoxes = []; // let abilityLabels = [];

  for (var i = 1; i < 5; i++) {
    abilityBoxes.push(document.getElementsByClassName("a".concat(i, "-inner-ability-divs"))); // abilityLabels.push(document.getElementsByClassName(`a${i}-ability-labels`));
  }

  var _loop4 = function _loop4(_i9) {
    var _loop5 = function _loop5(j) {
      abilityBoxes[_i9][j].addEventListener('click', function () {
        return abilityClick([_i9 + 1, j]);
      });
    };

    for (var j = 0; j < abilityBoxes[_i9].length; j++) {
      _loop5(j);
    }
  };

  for (var _i9 = 0; _i9 < abilityBoxes.length; _i9++) {
    _loop4(_i9);
  }
}

function initializeGameOpening() {
  document.getElementById('return-button').addEventListener('click', returnToSelectPage);
  var deSelectButton = document.getElementById('test');
  deSelectButton.addEventListener('click', deSelect);
  var beginLevel = document.getElementById('begin-level-button');
  beginLevel.addEventListener('click', beginCurrentLevel); // end click position

  var gameContainer = document.getElementById('game-container');
  gameContainer.addEventListener("click", function (e) {
    // console.log(e);
    if (selectedChar) {
      if (selectedChar.hp < 0) {
        deSelect();
        return;
      }

      if (selectedChar.range === 'infinite') {
        selectedChar.move([e.x, e.y], selectedChar.target);
      } else {
        selectedChar.move([e.x, e.y]);
      }
    }
  });
  window.addEventListener('keypress', function (e) {
    // console.log(e);
    keydownEvent(e);
  });
  setAbilityBoxes();
  hasBeenLoaded = true;
}

function loadLevel(levelNumber) {
  if (!hasBeenLoaded) {
    initializeGameOpening();
  }

  if (levelNumber > maxLevelNumber) {
    document.getElementById('game-container').style.height = '100%';
    document.getElementById('background-image').style.height = '100%';
    document.getElementById('all-characters-ability-container').style.height = '0%';
    return;
  }

  var level = levels[levelNumber];

  if (level.characterList === null) {
    level.characterList = party;
  }

  levelHasEnded = false;
  currentLevelNumber = levelNumber;
  var shouldRandomizeEnemySpawns = level.action(level.characterList, level.enemyList); // console.log(shouldRandomizeEnemySpawns);

  if (shouldRandomizeEnemySpawns) {
    for (var i = 0; i < level.enemyList.length; i++) {
      level.enemyList[i].basePos = null; // console.log(level.enemyList[i]);
    }
  } // console.log('level selected: ', levelNumber);


  document.getElementById('return-button').style.display = '';
  document.getElementById('level-button-container').style.display = 'none';
  document.getElementById('level-button-container-header').style.display = 'none';
  var levelNameDisp = document.getElementById("level-name-display");
  levelNameDisp.innerHTML = level.name;
  var levelMessage = document.getElementById('tutorial-message');
  levelMessage.innerHTML = level.message; // const secondAction = () => beginLevel(level.characterList, level.enemyList, levelNumber);

  Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(levelNameDisp); // const levelNameAction = () => { fadeIn(beginLevel); }

  var action = function action() {
    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(levelNameDisp);
    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(beginLevel);
  };

  var beginLevel = document.getElementById('begin-level-button');
  Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(levelMessage, action);
}

function beginLevel(charactersArr, enemiesArr, levelNumber) {
  document.getElementById('begin-level-button').style.display = 'none';
  setInitialTargets(charactersArr, enemiesArr);
  loadInCharacters(charactersArr, enemiesArr, levelNumber);
}

function setInitialTargets(chars, enemies) {
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].baseDMG > 0) {
      var targetIndex = Math.floor(Math.random() * chars.length);
      enemies[i].target = chars[targetIndex];
    } else {
      var _targetIndex = Math.floor(Math.random() * enemies.length);

      enemies[i].target = enemies[_targetIndex];
    } // console.log(enemies[i], " has target set to: ", enemies[i].target);

  }
}

function setAvailableAbilities(_char4) {
  var abilities = document.getElementsByClassName(_char4.imgName + '-ability-boxes');
  var boxes = document.getElementsByClassName(_char4.imgName + '-inner-ability-divs');

  for (var i = 0; i < abilities.length; i++) {
    if (i < _char4.abilities.length) {
      abilities[i].style.display = '';
      boxes[i].style.display = '';
    } else {
      abilities[i].style.display = 'none';
      boxes[i].style.display = 'none';
    }
  }
}

function imagesTochingSide(topLeft1, sizes1, topLeft2, sizes2, i) {
  return topLeft1[i] < topLeft2[i] && topLeft1[i] + sizes1[i] > topLeft2[i] || topLeft1[i] < topLeft2[i] + sizes2[i] && topLeft1[i] + sizes1[i] > topLeft2[i] + sizes2[i];
}

function imagesTouching(topLeft1, sizes1, topLeft2, sizes2) {
  if (topLeft1[0] === topLeft2[0] || topLeft1[1] === topLeft2[1]) {
    return true;
  }

  for (var i = 0; i < 2; i++) {
    if (!imagesTochingSide(topLeft1, sizes1, topLeft2, sizes2, i)) {
      return false;
    }
  }

  return true;
}

function setRandomSpawn(enemy, checkPositions) {
  // console.log(checkPositions);
  var positionFound = false;
  var position = [0, 0];
  var p1;
  var p2;
  var container = document.getElementById('game-container');
  var width = Math.floor(container.offsetWidth);
  var height = Math.floor(container.offsetHeight);

  while (!positionFound) {
    positionFound = true;
    p1 = Math.random() * 0.75; // from 0% to 90%

    p2 = Math.random() * 0.8; // from 0% to 80%
    // console.log(p);

    position = [Math.floor(width * p2), Math.floor(height * p1)]; // console.log(position);

    for (var i = 0; i < checkPositions.length; i++) {
      var cPos = checkPositions[i].basePos;
      var cSizes = [checkPositions[i].container.offsetWidth, checkPositions[i].container.offsetHeight]; // const eSizes = [enemy.container.offsetWidth, enemy.container.offsetHeight];

      var eSizes = [150, 200]; // needs to be changed eventually for diff sized boxes
      // console.log(position, eSizes, cPos, cSizes);

      if (imagesTouching(position, eSizes, cPos, cSizes)) {
        // console.log('position was bad');
        positionFound = false;
        break;
      }
    }
  } // console.log('pos found');


  enemy.basePos = position;
  enemy.pos = position; // enemy.container.style.left = enemy.pos[0] + 'px';
  // enemy.container.style.top = enemy.pos[1] + 'px';
}

function reZeroStats(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].hp = arr[i].baseHP;
    arr[i].dmg = arr[i].baseDMG;
    arr[i].defense = arr[i].baseDefense;
    arr[i].ms = arr[i].baseMS;
    arr[i].stunned = false;
    arr[i].rooted = false;
    arr[i].slowed = false;
    arr[i].isAttacking = false;
    arr[i].isMoving = false;

    if (arr[i].allied) {
      arr[i].target = null;
    }

    if (arr[i].basePos) {
      arr[i].pos[0] = arr[i].basePos[0];
      arr[i].pos[1] = arr[i].basePos[1];
    }
  }
}

function loadInEntity(entity, num, allies, enemies) {
  // console.log(entity);
  if (entity.allied) {
    entity.imgName = 'a' + num;
    livingChars[entity.imgName] = entity;
  } else {
    entity.imgName = 'e' + num;
    livingEnemies[entity.imgName] = entity;
  }

  addEntityEvents(entity, allies, enemies);

  if (!entity.basePos) {
    setRandomSpawn(entity, boxEntities.slice());
  }

  entity.addInlineStyle();
  hotkeys[entity.hotkey] = entity;
  entity.container.addEventListener('click', clickEvents);
  boxEntities.push(entity);

  if (entity.allied) {
    document.getElementById("a".concat(num, "-class-name")).innerHTML = entity.klass;
    var abilityNames = document.getElementsByClassName("a".concat(num, "-ability-labels"));
    setAvailableAbilities(entity);

    for (var j = 0; j < abilityNames.length; j++) {
      if (entity.abilityNames[j]) {
        abilityNames[j].innerHTML = entity.abilityNames[j];
      } else {
        abilityNames[j].innerHTML = 'No Ability';
      }
    }

    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(entity.container);
  } else {
    // console.log(entity.target);
    var action = function action() {
      return entity.autoAttack(entity.target);
    };

    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(entity.container, action); // begin attacking target
  }

  observerObserve(entity);
}

var boxEntities = [];

function loadInCharacters(charactersArr, enemiesArr, levelNumber) {
  document.getElementById('return-button').style.display = 'none';
  var deSelectButton = document.getElementById('test');
  Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(deSelectButton);
  var backgroundImg = document.getElementById('background-image');

  if (levelNumber < 4) {
    backgroundImg.src = document.getElementById('forest').src;
  } else if (levelNumber < 7) {
    backgroundImg.src = document.getElementById('snowy').src;
  } else {
    backgroundImg.src = document.getElementById('dungeon').src;
  }

  Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(backgroundImg);

  if (levels[levelNumber].shouldSetLevels) {
    levels[levelNumber].setEnemyLevels(levels[levelNumber].level / 2);
  }

  for (var i = 0; i < 4; i++) {
    var abilityHotkey = document.getElementById("ab".concat(i + 1, "-keybind"));
    hotkeys[abilityHotkey.value] = i;
  }

  reZeroStats(charactersArr);
  reZeroStats(enemiesArr);

  for (var _i10 = 0; _i10 < charactersArr.length; _i10++) {
    loadInEntity(charactersArr[_i10], _i10 + 1, charactersArr, enemiesArr);
  } // console.log(enemiesArr);


  for (var _i11 = 0; _i11 < enemiesArr.length; _i11++) {
    loadInEntity(enemiesArr[_i11], _i11 + 1, enemiesArr, charactersArr);
  } // console.log("hotkeys: ", hotkeys);

}

function observerObserve(entity) {
  var element = entity.container;
  entity.observer.observe(element, {
    attributes: true,
    attributeFilter: ['style']
  });
}

function endGame(charsList, enemyList) {
  hotkeys = {};

  if (currentAbilityBoxes) {
    currentAbilityBoxes.style.display = 'none';
    currentAbilityBoxes = null;
  }

  var levelMessage = document.getElementById('tutorial-message');
  levelMessage.style.display = 'none';
  var deSelectButton = document.getElementById('test');
  deSelectButton.style.display = 'none';
  deSelect();
  var projectiles = document.getElementsByClassName('projectile');

  for (var i = 0; i < projectiles.length; i++) {
    projectiles[i].display = 'none';
  }

  var allCharsList = levels[currentLevelNumber].characterList;
  var allEnemyList = levels[currentLevelNumber].enemyList;

  for (var _i12 = 0; _i12 < allCharsList.length; _i12++) {
    allCharsList[_i12].observer.disconnect();

    clearInterval(allCharsList[_i12].currentAction);
    clearInterval(allCharsList[_i12].currentAnimation);

    allCharsList[_i12].container.removeEventListener('click', clickEvents);

    allCharsList[_i12].img.src = allCharsList[_i12].baseImg.src;
  }

  for (var _i13 = 0; _i13 < allEnemyList.length; _i13++) {
    allEnemyList[_i13].observer.disconnect();

    clearInterval(allEnemyList[_i13].currentAction);
    clearInterval(allEnemyList[_i13].currentAnimation);

    allEnemyList[_i13].container.removeEventListener('click', clickEvents);

    allEnemyList[_i13].img.src = allEnemyList[_i13].baseImg.src;
  }

  if (charsList.length > 0) {
    endMoveChars(charsList);
  } else {
    var backgroundImg = document.getElementById('background-image');
    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(backgroundImg);

    for (var _i14 = 0; _i14 < enemyList.length; _i14++) {
      Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(enemyList[_i14].container);
    }

    fadeOutGame(false);
  }
}

function xpObserverObserve(_char5) {
  _char5.observationToken = true;

  _char5.xpObserver.observe(_char5.img, {
    attributes: true,
    attributeFilter: ['style']
  });
}

function modEndPos() {
  var container = document.getElementById('game-container');
  var width = Math.floor(container.offsetWidth);
  var height = Math.floor(container.offsetHeight);
  var widthExtra = width - 160 * 4;
  return [Math.floor(widthExtra / 4), Math.floor(height * 0.66), Math.floor(width / 10)];
}

function endMoveChars(charsList) {
  moveFinishCount = 0;
  countToReach = charsList.length;
  var basePos = modEndPos(); // make into % values

  for (var i = 0; i < charsList.length; i++) {
    xpObserverObserve(charsList[i]);
    charsList[i].move([i * 160 + (i + 1) * basePos[0], basePos[1]], false, true); // removed + basePos[2] from x side
  }
}

function addCharXP() {
  var c = Object.values(livingChars); // console.log(c);

  for (var i = 0; i < c.length; i++) {
    c[i].xpObserver.disconnect();
    var expWords = document.getElementById(c[i].imgName + '-exp-words');
    expWords.innerHTML = 'Level: ' + c[i].level;
    var leftBar = document.getElementById(c[i].imgName + '-inner-leftHP-bar');
    leftBar.style.backgroundColor = 'gold';
    var xpPercent = Math.floor(c[i].xp / c[i].nextLevelXP * 100);
    c[i].hpContainerLeft.style.width = "".concat(xpPercent, "%");
    c[i].hpContainerRight.style.width = "".concat(100 - xpPercent, "%");
    var levelUpDisp = document.getElementById(c[i].imgName + '-level-up');
    levelUpDisp.style.top = Math.floor(c[i].pos[1] - 75) + 'px';
    levelUpDisp.style.left = Math.floor(c[i].pos[0]) + 'px';
  }

  fadeOutGame(true);
  var xpPerC = levelXPGain / c.length;
  var xpPerInterval = xpPerC / 60; // 4 seconds for the animation, .05 sec intervals

  var timeCount = 0;
  var xpInterval = setInterval(function () {
    if (timeCount === 60) {
      clearInterval(xpInterval);

      for (var _i15 = 0; _i15 < c.length; _i15++) {
        c[_i15].xp = Math.ceil(c[_i15].xp); // console.log('xp: ', c[i].xp, ' level: ', c[i].level);

        c[_i15].container.style.border = 'none';
        Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(c[_i15].container);
      }

      var backgroundImg = document.getElementById('background-image');
      Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(backgroundImg);
    }

    for (var _i16 = 0; _i16 < c.length; _i16++) {
      c[_i16].xp += xpPerInterval;

      if (c[_i16].xp > c[_i16].nextLevelXP) {
        c[_i16].setLevel(c[_i16].level + 1);

        var _expWords = document.getElementById(c[_i16].imgName + '-exp-words');

        _expWords.innerHTML = 'Level: ' + c[_i16].level;
      }

      var _xpPercent = Math.floor(c[_i16].xp / c[_i16].nextLevelXP * 100);

      c[_i16].hpContainerLeft.style.width = "".concat(_xpPercent, "%");
      c[_i16].hpContainerRight.style.width = "".concat(100 - _xpPercent, "%");
    }

    timeCount++;
  }, 50);
}

function fadeOutGame(won) {
  var theThing = function theThing(actionIterations) {
    if (!actionIterations) {
      actionIterations = 40;
    } // console.log('fade called');


    var disp;
    var secondAction;

    if (!won) {
      disp = document.getElementById('game-over-display');

      secondAction = function secondAction() {
        return resetGame(false);
      };
    } else {
      disp = document.getElementById('game-won-display');

      secondAction = function secondAction() {
        return resetGame(true);
      };
    }

    disp.style.opacity = 0;
    disp.style.display = '';

    var action = function action() {
      return Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(disp, secondAction, actionIterations);
    };

    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(disp, action);
  };

  if (!won) {
    setTimeout(theThing, 2000);
  } else {
    theThing(60);
  }
}

function resetGame(won) {
  livingChars = {};
  livingEnemies = {};
  document.getElementById('level-button-container').style.display = '';
  document.getElementById('level-button-container-header').style.display = '';
  document.getElementById('close-button').style.display = '';
  document.getElementById('game-container').style.height = '100%';
  document.getElementById('background-image').style.height = '100%';
  document.getElementById('all-characters-ability-container').style.height = '0%';
  var levelButtons = document.getElementsByClassName('level-button');

  if (won && maxLevelNumber === currentLevelNumber) {
    if (levelButtons[maxLevelNumber]) {
      levelButtons[maxLevelNumber].style.opacity = 100 + '%';
      levelButtons[maxLevelNumber].style.cursor = 'pointer';
    }

    maxLevelNumber++;
  }

  var levChars = levels[currentLevelNumber].characterList;
  var levEnems = levels[currentLevelNumber].enemyList;

  for (var i = 0; i < levChars.length; i++) {
    levChars[i].container.remove();
  }

  for (var _i17 = 0; _i17 < levEnems.length; _i17++) {
    levEnems[_i17].container.remove();
  }

  levelXPGain = 0;
  boxEntities = [];
}

/* harmony default export */ __webpack_exports__["default"] = (loadLevel);

/***/ }),

/***/ "./src/screen_controllers/fades.js":
/*!*****************************************!*\
  !*** ./src/screen_controllers/fades.js ***!
  \*****************************************/
/*! exports provided: fadeOut, fadeIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fadeOut", function() { return fadeOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fadeIn", function() { return fadeIn; });
function fadeOut(element) {
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var iterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;
  var op = iterations;
  var timerDown = setInterval(function () {
    if (op <= 0) {
      clearInterval(timerDown);
      element.style.display = 'none';

      if (action) {
        action();
      }
    }

    element.style.opacity = op / iterations;
    op -= 1;

    if (element.style.display === 'none') {
      clearInterval(timerDown);
      element.style.opacity = 0;
    }
  }, 50);
}
function fadeIn(element) {
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var iterations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 40;
  element.style.opacity = 0;
  element.style.display = '';
  var op = 0;
  var timerUp = setInterval(function () {
    if (op >= iterations) {
      clearInterval(timerUp);

      if (action) {
        action();
      }
    }

    element.style.opacity = op / iterations;
    op += 1;

    if (element.style.display === 'none') {
      clearInterval(timerUp);
      element.style.opacity = 0;
    }
  }, 50);
}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map