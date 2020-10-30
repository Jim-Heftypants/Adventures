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
var groupHeal = function groupHeal(entity) {
  for (var i = 0; i < entity.allies.length; i++) {
    if (entity.allies[i].hp > 0) {
      entity.allies[i].hp -= entity.dmg * 2;

      if (entity.allies[i].hp > 100) {
        entity.allies[i].hp = 100;
      }

      entity.setOverlay(entity.allies[i]);
      entity.allies[i].setHpBars();
      setBorder(entity);
    }
  }

  return 10;
};

var powerSwing = function powerSwing(entity) {
  if (!entity.target || !entity.withinAttackRange(entity.target) || entity.target.hp < 0) {
    entity.abilityShouldCast[0] = true; // document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.border = '5px solid black';

    document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.backgroundColor = 'lawngreen';
    return false;
  }

  entity.target.hp -= Math.ceil(entity.dmg * 1.5); // knockbackTarget(entity, 80);

  entity.target.setHpBars();
  entity.target.stunned = true;
  entity.target.img.src = entity.target.baseImg.src;
  entity.target.imgCycle = 0;
  setBorder(entity);

  if (entity.target.hp <= 0) {
    entity.killEntitiy(entity.target);
  }

  setTimeout(function () {
    if (entity.target) {
      entity.target.stunned = false;
    }
  }, 2000);
  return 10;
};

var poisonDagger = function poisonDagger(entity) {
  if (!entity.target || !entity.withinAttackRange(entity.target) || entity.target.hp < 0) {
    entity.abilityShouldCast[0] = true; // document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.border = '5px solid black';

    document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.backgroundColor = 'lawngreen';
    return false;
  }

  var timer = 0;
  entity.target.slowed = 50;
  entity.target.ms -= Math.floor(entity.target.baseMS / 2);

  var _int = setInterval(function () {
    if (!entity.target || entity.target.container.style.display === 'none') {
      clearInterval(_int);
      return;
    }

    timer++;
    entity.target.hp -= Math.floor(Math.ceil(entity.dmg * 1.5) / 6);
    entity.target.setHpBars();
    setBorder(entity);

    if (entity.target.hp <= 0) {
      entity.killEntitiy(entity.target);
      clearInterval(_int);
    }

    if (timer > 5) {
      clearInterval(_int);
      entity.target.slowed = false;
      entity.target.ms += Math.floor(entity.target.baseMS / 2);
    }
  }, 500);

  return 10;
};

var meteor = function meteor(entity) {
  if (!entity.target || entity.target.hp < 0) {
    entity.abilityShouldCast[0] = true; // document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.border = '5px solid black';

    document.getElementsByClassName(entity.imgName + '-inner-ability-divs')[0].style.backgroundColor = 'lawngreen';
    return false;
  }

  var fireblastDiv = document.getElementById('firebomb-div');
  spellTrack(fireblastDiv, entity, entity.target, function (entity, img) {
    // console.log('entity: ', entity, " img: ", img);
    img.style.display = 'none';
    causeAoEEffect(entity, 300, 300);
  });
  return 10;
};

function setBorder(entity) {
  if (entity.target && !entity.target.container.style.display === 'none') {
    var targetChar = entity.target;

    if (targetChar.img.style.border !== "5px solid gold") {
      if (entity.baseDMG > 0) {
        targetChar.img.style.border = "4px solid red";
      } else {
        targetChar.img.style.border = "4px solid green";
      }

      var borderInterval = setInterval(function () {
        if (targetChar.img.style.border !== "5px solid gold") {
          targetChar.img.style.border = "none";
        }

        clearInterval(borderInterval);
      }, 500);
    }
  }
}

var warriorAbilities = [powerSwing];
var clericAbilities = [groupHeal];
var wizardAbilities = [meteor];
var rogueAbilities = [poisonDagger];
var allAbilities = [warriorAbilities, clericAbilities, wizardAbilities, rogueAbilities];

var lightningAutoAttack = function lightningAutoAttack(entity) {
  // const effectDiv = document.getElementById(entity.imgName + '-extra-effect');
  var pos = [entity.pos[0] + 30 + entity.img.width / 2, entity.pos[1] + 38];

  if (entity.img.style.transform === "scaleX(-1)") {
    pos[0] -= 60;
  }

  var div = drawLine(pos[0], pos[1], entity.target.pos[0] + entity.target.img.width / 2, entity.target.pos[1] + entity.target.img.height / 2);
  var maxTime = Math.floor(entity.as / 8);
  setTimeout(function () {
    div.remove();
  }, maxTime);
};

var specialAttackEffects = [lightningAutoAttack];

function knockbackTarget(entity, distance) {
  var dX = entity.target.pos[0] - entity.pos[0];
  var dY = entity.target.pos[1] - entity.pos[1];
  var hypotenuse = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
  var xRatio = dX / hypotenuse;
  var yRatio = dY / hypotenuse;
  var xRight = distance * xRatio;
  var yDown = distance * yRatio;
  entity.target.pos[0] += Math.floor(xRight);
  entity.target.pos[1] += Math.floor(yDown);
  entity.target.container.style.left = entity.target.pos[0] + 'px';
  entity.target.container.style.top = entity.target.pos[1] + 'px';
}

function causeAoEEffect(entity, width, height) {
  var targetCenter = [entity.target.pos[0] + Math.floor(entity.target.img.width / 2), entity.target.pos[1] + Math.floor(entity.target.img.height / 2)];
  var topLeft1 = [targetCenter[0] - Math.floor(width / 2), targetCenter[1] - Math.floor(height / 2)];
  var div = document.createElement("div");
  var leftSetback = (width - entity.target.container.offsetWidth) / 2;
  var topSetback = (height - entity.target.container.offsetHeight) / 2;
  div.style.position = "absolute";
  div.style.left = entity.target.pos[0] - leftSetback + 'px';
  div.style.top = entity.target.pos[1] - topSetback + 'px';
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

function createLineElement(x, y, length, angle) {
  var styles = 'width: ' + length + 'px; ' + 'height: 0px; ' + '-moz-transform: rotate(' + angle + 'rad); ' + '-webkit-transform: rotate(' + angle + 'rad); ' + '-o-transform: rotate(' + angle + 'rad); ' + '-ms-transform: rotate(' + angle + 'rad); ' + 'position: absolute; ' + 'top: ' + y + 'px; ' + 'left: ' + x + 'px; ' + 'border: 2px solid purple; ';
  var div = document.createElement("div");
  div.setAttribute('style', styles);
  div.classList.add("extra-attack-effect");
  document.getElementById("game-container").appendChild(div);
  return div;
}

function drawLine(x1, y1, x2, y2) {
  var a = x1 - x2,
      b = y1 - y2,
      c = Math.sqrt(a * a + b * b);
  var sx = (x1 + x2) / 2,
      sy = (y1 + y2) / 2;
  var x = sx - c / 2,
      y = sy;
  var alpha = Math.PI - Math.atan2(-b, a);
  return createLineElement(x, y, c, alpha);
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
var waAbNames = ['Concussive Blow'];
var cAbNames = ['Prayer of Healing'];
var wiAbNames = ['Fire Bomb'];
var rAbNames = ['Poison Shiv'];
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
imgName
pos
defense
hasOverlay? 1=self 2=target
specialEffect
ab
abNames
*/
// tank

var Warrior = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Warrior', 10, 100, 10, 1000, 10, true, "a1", [100, 400], 20, null, null, warriorAbilities, waAbNames); // heals

var Cleric = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Cleric', 'infinite', 100, 10, 1500, -8, true, "a2", [400, 100], 12, 2, null, clericAbilities, cAbNames); // rdps

var Wizard = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Wizard', "infinite", 100, 10, 2000, 20, true, "a3", [100, 100], 14, null, wizardAttackEffect, wizardAbilities, wiAbNames); // mdps

var Rogue = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]("Rogue", 10, 100, 10, 800, 10, true, "a4", [900, 500], 16, null, null, rogueAbilities, rAbNames);
var charactersArr = [Warrior, Cleric, Wizard, Rogue];
/* harmony default export */ __webpack_exports__["default"] = (charactersArr);

/***/ }),

/***/ "./src/entities/enemy.js":
/*!*******************************!*\
  !*** ./src/entities/enemy.js ***!
  \*******************************/
/*! exports provided: intro, healIntro, rangedIntro, puttinItAllTogetha, ezDoppelganger, level3, level2, doppelganger */
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
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity.js */ "./src/entities/entity.js");
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
false
img
pos
defense
ab
abNames
specialEffect
*/
// rdps

var tutorialWizard = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 60, 10, 1500, 7, false, 'e3', [1000, 600], 8, null, wizardAttackEffect);
var ghettoWizard = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 60, 10, 1500, 12, false, 'e3', [500, 500], 8, null, wizardAttackEffect);
var wizard2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 70, 10, 1500, 13, false, 'e3', [500, 500], 14, null, wizardAttackEffect);
var wizard3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 70, 10, 1500, 13, false, 'e1', [700, 200], 14, null, wizardAttackEffect); // fix

var EWizard = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 100, 10, 2000, 20, false, "e3", [500, 500], 14, null, wizardAttackEffect); // heals

var tutorialCleric = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 2000, -7, false, "e2", [1000, 300], 8, 2);
var dumbCleric = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 2000, -8, false, "e2", [1000, 100], 8, 2);
var cleric2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 1750, -11, false, "e2", [1000, 100], 12, 2);
var cleric3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 1750, -11, false, "e4", [300, 400], 12, 2);
var ECleric = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 1500, -8, false, "e2", [1000, 100], 12, 2); // mdps

var tutorialRogue = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 80, 10, 1200, 6, false, "e4", [700, 200], 14);
var loserRogue = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 80, 10, 1200, 8, false, "e4", [700, 200], 14);
var rogue2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 80, 10, 1200, 8, false, "e4", [700, 200], 14);
var rogue3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 80, 10, 1200, 8, false, "e2", [500, 500], 14);
var ERogue = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 100, 10, 800, 10, false, "e4", [700, 200], 16); // tank

var punchingBag = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 50, 10, 1000, 1, false, "e1", [650, 500], 20);
var tutorialWarrior = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 80, 10, 1000, 6, false, "e1", [650, 500], 20);
var weakWarrior = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 80, 10, 1000, 8, false, "e1", [300, 400], 20);
var warrior2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 80, 10, 1000, 8, false, "e1", [300, 400], 20);
var warrior3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 80, 10, 1000, 8, false, "e3", [1000, 100], 20);
var EWarrior = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 120, 10, 1000, 10, false, "e1", [300, 400], 20); // level 1

var intro = [punchingBag]; // level 2

var healIntro = [tutorialWarrior, tutorialCleric]; // level 3

var rangedIntro = [tutorialWarrior, tutorialCleric, tutorialWizard]; // level 4

var puttinItAllTogetha = [tutorialWarrior, tutorialCleric, tutorialWizard, tutorialRogue]; // level 5

var ezDoppelganger = [weakWarrior, dumbCleric, ghettoWizard, loserRogue]; // level 6

var level3 = [wizard2, wizard3, cleric2, cleric3]; // level 7

var level2 = [rogue2, rogue3, warrior2, warrior3]; // level 8

var doppelganger = [EWarrior, ECleric, EWizard, ERogue];

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
    var _this = this;

    var klass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var baseHP = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var ms = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var attackSpeed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var attackDMG = arguments.length > 5 ? arguments[5] : undefined;
    var allied = arguments.length > 6 ? arguments[6] : undefined;
    var img = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "";
    var pos = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [0, 0];
    var defense = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;
    var hasAttackOverlay = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
    var extraAttackAnimation = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : null;
    var abilities = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : [];
    var abilityNames = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : [];

    _classCallCheck(this, Entity);

    this.klass = klass;
    this.range = range;
    this.trueBaseHp = baseHP;
    this.baseHP = baseHP;
    this.hp = this.baseHP;
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

    if (this.allied) {
      this.xp = 0;
      this.level = 1;
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
    this.extraAttackAnimation = extraAttackAnimation; // CC effects

    this.stunned = false;
    this.slowed = false;
    this.rooted = false;
    this.feared = false;
    this.target;
    this.allies;
    this.enemies;
    this.movingOutTheWay = false;
    this.observer;
    this.xpObserver;
    this.observationToken = true;
    window.addEventListener('load', function () {
      _this.addInlineStyle();
    });
  }

  _createClass(Entity, [{
    key: "addInlineStyle",
    value: function addInlineStyle() {
      this.img = document.getElementsByClassName(this.imgName + "-image-display")[0];
      this.baseImg = document.getElementsByClassName(this.klass)[0];
      this.img.src = this.baseImg.src;
      this.attackImages = document.getElementsByClassName(this.klass);
      this.container = document.getElementById("".concat(this.imgName, "-display"));
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
  }, {
    key: "levelUp",
    value: function levelUp() {
      var levelUpDisp = document.getElementById(this.imgName + '-level-up'); // console.log('levelUpDisp: ', levelUpDisp);

      levelUpDisp.style.display = '';
      fastFadeOut(levelUpDisp);
      this.xp -= this.nextLevelXP;
      this.nextLevelXP += this.nextLevelXP * 0.1;
      this.level++;
      this.baseDefense += Math.ceil(this.trueBaseDefense * 0.05);
      this.baseDMG += Math.ceil(this.trueBaseDMG * 0.1);
      this.baseHP += Math.ceil(this.trueBaseHp * 0.1);

      switch (this.level) {
        case 5:
          if (this.allAbilities[0]) {
            this.abilities.push(this.allAbilities[0]);
          }

          break;

        case 10:
          if (this.allAbilities[1]) {
            this.abilities.push(this.allAbilities[1]);
          }

          break;

        case 15:
          if (this.allAbilities[2]) {
            this.abilities.push(this.allAbilities[2]);
          }

          break;

        case 20:
          if (this.allAbilities[3]) {
            this.abilities.push(this.allAbilities[3]);
          }

          break;
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
      var _this2 = this;

      var attackOnFinish = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var addXPBar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.movingOutTheWay = true;
      this.clearIntervals();
      this.isMoving = true;
      endPos[0] = Math.floor(endPos[0] - this.img.width * (3 / 2));
      endPos[1] = Math.floor(endPos[1] - this.img.height * (3 / 4));
      var pos = this.pos;
      var posChange = this.vectorToScalar(endPos); // console.log("pos change on move", posChange);

      var bigDiv = document.getElementById('game-container');
      var difference = Math.floor((window.innerWidth - bigDiv.offsetWidth) / 2);
      var checker = difference + Math.floor(bigDiv.offsetWidth);

      if (pos[0] - endPos[0] < 0) {
        this.img.style.transform = "scaleX(1)";
      } else {
        this.img.style.transform = "scaleX(-1)";
      }

      this.currentAction = setInterval(function () {
        return frame(_this2);
      }, 20);

      function frame(self) {
        if (!self.stunned && !self.rooted) {
          if (posChange[2] === 0) {
            // close animation
            self.clearIntervals();
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

            if (pos[0] + Math.floor(3 * self.img.width / 2) + 50 > checker) {
              pos[0] = checker - (Math.floor(3 * self.img.width / 2) + 50);
            }

            if (pos[0] < 15) {
              pos[0] = 15;
            }

            if (pos[1] + Math.floor(self.img.height) > 850) {
              pos[1] = 850 - Math.floor(self.img.height);
            }

            if (pos[1] < 15) {
              pos[1] = 15;
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
    value: function withinAttackRange() {
      if (this.range === 'infinite') {
        return true;
      }

      var widthAddition = Math.floor(this.img.width / 2 + this.target.img.width / 2);

      if (this.pos[0] > this.target.pos[0] - widthAddition - this.range && this.pos[0] < this.target.pos[0] + widthAddition + this.range) {
        var heightAddition = Math.floor(this.img.height / 4);

        if (this.pos[1] > this.target.pos[1] - heightAddition && this.pos[1] < this.target.pos[1] + heightAddition) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "killEntitiy",
    value: function killEntitiy(entity) {
      // console.log(entity.klass, "killed");
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
    value: function trackTarget() {
      var _this3 = this;

      // hot code
      this.clearIntervals();
      this.isMoving = true;
      var bigDiv = document.getElementById('game-container');
      var difference = Math.floor((window.innerWidth - bigDiv.offsetWidth) / 2);
      var checker = difference + Math.floor(bigDiv.offsetWidth);
      this.currentAction = setInterval(function () {
        return move(_this3);
      }, 20);

      function move(self) {
        if (!self.stunned && !self.rooted) {
          if (self.target.container.style.display === 'none') {
            self.clearIntervals();

            if (!self.allied) {
              self.setTargetAndAttack();
            }

            return;
          }

          if (self.withinAttackRange(self.target)) {
            clearInterval(self.currentAction);
            self.autoAttack(self.target); // console.log('auto attack called from track');
          } else {
            var pos = self.pos;
            var movePos = self.target.pos.slice();

            if (pos[0] - movePos[0] < 0) {
              movePos[0] -= self.target.img.width;
              self.img.style.transform = "scaleX(1)";
            } else {
              movePos[0] += self.target.img.width;
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
      this.attackOverlay[0].style.top = targetChar.pos[1] + 40 + 'px';
      this.attackOverlay[0].style.left = targetChar.pos[0] + 'px';
      this.attackOverlay[0].style.width = targetChar.img.width + 'px';
      this.attackOverlay[0].style.height = targetChar.img.height + 'px';
      this.attackOverlay[0].style.display = '';
      var selectedChar = this;
      var clearTime = Math.floor(this.as / 2);
      var timeCheck = 0;
      var stackInterval = setInterval(function () {
        selectedChar.attackOverlay[0].style.top = targetChar.pos[1] + 40 + 'px';
        selectedChar.attackOverlay[0].style.left = targetChar.pos[0] + 'px';
        timeCheck += 20;

        if (timeCheck >= clearTime || targetChar.img.style.display === 'none') {
          clearInterval(stackInterval);
          selectedChar.attackOverlay[0].style.display = 'none';
        }
      }, 20);
    }
  }, {
    key: "beginAttack",
    value: function beginAttack() {
      var _this4 = this;

      // make some kind of animation start
      this.clearIntervals();
      this.isAttacking = true;

      if (this.allied) {
        for (var i = 0; i < 4; i++) {
          // console.log(this.abilityShouldCast[i]);
          if (this.abilityShouldCast[i]) {
            this.abilityShouldCast[i] = false;
            this.useAbility(i);
          }
        }
      }

      this.currentAnimation = setInterval(function () {
        return _this4.animateAttack(_this4);
      }, Math.floor(this.as / 4));
    }
  }, {
    key: "animateAttack",
    value: function animateAttack() {
      if (!this.stunned && this.attackImages) {
        if (!this.target || this.target.hp <= 0) {
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
            this.extraAttackAnimation(this);
          }

          this.attack();
        }

        this.imgCycle = this.imgCycle % this.attackImages.length;
        this.img.src = this.attackImages[this.imgCycle].src;
      }
    }
  }, {
    key: "attack",
    value: function attack() {
      var _this5 = this;

      if (!this.withinAttackRange(this.target)) {
        this.trackTarget();
        return;
      } else {
        if (this.dmg > 0) {
          this.target.hp -= this.dmg * 15 / this.target.defense;

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

        if (this.target.hp > this.target.baseHP) {
          this.target.hp = this.target.baseHP;
        }

        if (!this.target.allied && this.allied && this.target.baseDMG > 0 && this.defense > this.target.target.defense) {
          this.target.target = this;
          this.target.clearIntervals();
          this.target.autoAttack(this);
        }

        this.target.setHpBars();

        if (this.target.hp <= 0) {
          this.killEntitiy(this.target);

          if (!this.allied) {
            // chose another hero to attack
            this.setTargetAndAttack();
          }
        } // console.log("border style: ", this.target.img.style.border);


        if (this.target.img.style.border !== "5px solid gold") {
          if (this.baseDMG > 0) {
            this.target.img.style.border = "3px solid red";
          } else {
            this.target.img.style.border = "3px solid green";
          }

          setTimeout(function () {
            if (_this5.target && _this5.target.img.style.border !== "5px solid gold") {
              _this5.target.img.style.border = "none";
            }
          }, 500);
        }

        if (this.range !== 'infinite' && this.charactersStacked()) {
          this.movingOutTheWay = true;
          var addition = Math.floor(this.img.width / 2);

          if (this.img.style.transform === "scaleX(-1)") {
            // move to left side of target
            this.img.style.transform = "scaleX(1)"; // - (addition / 4)

            this.move([this.target.pos[0] + addition, this.target.pos[1] + Math.floor(this.target.img.height * 3 / 4)], this.target);
          } else {
            // move to right side of target;
            this.img.style.transform = "scaleX(-1)";
            this.move([this.target.pos[0] + 5 * addition, this.target.pos[1] + Math.floor(this.target.img.height * 3 / 4)], this.target);
          }
        }
      }
    }
  }, {
    key: "autoAttack",
    value: function autoAttack(targetChar) {
      // console.log('auto attack target: ', targetChar);
      if (this.allied) {
        this.target = targetChar;
      }

      if (this.withinAttackRange(targetChar)) {
        if (this.pos[0] < targetChar.pos[0]) {
          this.img.style.transform = "scaleX(1)";
        } else {
          this.img.style.transform = "scaleX(-1)";
        }

        this.beginAttack();
      } else {
        this.trackTarget();
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
      var _this6 = this;

      if (!this.abilityAvailable[n] || this.abilities.length === 0) {
        return;
      } // console.log('ability', n, 'attempted');


      this.abilityAvailable[n] = false;
      var ab = this.abilities[n]; // console.log('ability: ', ab);

      var cdTime = ab(this);

      if (cdTime === false) {
        // console.log('no target for ability');
        this.abilityAvailable[n] = true;
        return;
      } // console.log('seconds for ability cd: ', cdTime);


      var innerBoxes = document.getElementsByClassName(this.imgName + '-inner-ability-divs'); // innerBoxes[n].style.animation = `inner-ability-animate ${cdTime}s linear 0s 1`; // didnt work

      colorFade(innerBoxes[n], cdTime, [255, 0, 0], [0, 0, 255]);
      var CDTimer = setInterval(function () {
        _this6.abilityAvailable[n] = true; // console.log(this.imgName, ' ability ', n, ' off CD');

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
} // const handleLoadCharClick = (e) => {
//     switch 
// }


window.addEventListener('load', function () {
  // document.getElementById('full-container').style.height = document.getElementById('body').offsetHeight + 'px';
  // document.getElementById('body').style.height = document.getElementById('full-container').offsetHeight + 'px';
  // const abilityBoxes = document.getElementsByClassName('inner-ability-div');
  // console.log(document.getElementById('a1-hp-left'));
  var gameTag = document.getElementById('game-tag');
  gameTag.style.opacity = 0;
  gameTag.style.display = '';
  var charsDisp = document.getElementById('title-screen-chars'); // const controlsContainer = document.getElementsByClassName('controls-display')[0];

  var closeButton = document.getElementById('close-button');
  var hButtons = document.getElementsByClassName('h-button'); // const startGameButton = document.getElementById('start-game-button');
  // const controlsButton = document.getElementById('game-controls-button');

  var keybindContainer = document.getElementById('full-keybind-container');
  var levelButtonContainer = document.getElementById('level-button-container');
  var levelButtonHeader = document.getElementById("level-button-container-header");
  var statsContainer = document.getElementById('heroes-stats-full-container');
  var levelButtons = document.getElementsByClassName('level-button');
  var backgroundImage = document.getElementById('background-image');
  var titleBackground = document.getElementById('title');
  var gameContainer = document.getElementById('game-container');
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
        gameContainer.style.height = '88%';
        document.getElementById('background-image').style.height = '88%';
        document.getElementById('all-characters-ability-container').style.height = '12%';
        Object(_screen_controllers_entity_controller__WEBPACK_IMPORTED_MODULE_0__["default"])(_i2);
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

      for (var _i4 = 0; _i4 < levelButtons.length; _i4++) {
        levelButtons[_i4].style.height = levelButtons[_i4].offsetWidth + 'px';
      }
    });
    hButtons[1].addEventListener('click', function () {
      hButtonPartialAction();
      keybindContainer.style.display = '';
    });
    hButtons[2].addEventListener('click', function () {
      hButtonPartialAction();
      statsContainer.style.display = '';
    });
  }

  slowFade(gameTag, secondAction);
});

/***/ }),

/***/ "./src/levels/level.js":
/*!*****************************!*\
  !*** ./src/levels/level.js ***!
  \*****************************/
/*! exports provided: levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven, levelEight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

// import * as charactersObj from '../entities/character';

 // const charactersArr = Object.values(charactersObj);

var enemiesArr = Object.values(_entities_enemy__WEBPACK_IMPORTED_MODULE_1__);

var Level = function Level(name, enemyList, xp) {
  var message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var actionChanges = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function () {};
  var characterList = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"];

  _classCallCheck(this, Level);

  this.name = name;
  this.enemyList = enemyList;
  this.xp = xp;
  this.message = message;
  this.action = actionChanges;
  this.characterList = characterList; // this.actionExpended = false;
};

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

var firstFourActions = function firstFourActions() {
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], 35);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], 15);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2], 15);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][3], 55);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], 55, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], 33, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2], 66, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][3], 22, false);
  applyMod(enemiesArr[0][0], 55);
  applyMod(enemiesArr[0][0], 55, false);
  applyMod(enemiesArr[1][0], 55);
  applyMod(enemiesArr[1][1], 75);
  applyMod(enemiesArr[1][0], 55, false);
  applyMod(enemiesArr[1][1], 33, false);
  applyMod(enemiesArr[2][2], 75);
  applyMod(enemiesArr[2][2], 66, false);
  applyMod(enemiesArr[3][3], 35);
  applyMod(enemiesArr[3][3], 22, false);
};

var actionFive = function actionFive() {
  // WaCWiR
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], 65);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], 45);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2], 45);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][3], 25);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], 45, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], 25, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2], 65, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][3], 45, false); // WiRWaC

  applyMod(enemiesArr[4][0], 10);
  applyMod(enemiesArr[4][1], 15);
  applyMod(enemiesArr[4][2], 75);
  applyMod(enemiesArr[4][3], 80);
  applyMod(enemiesArr[4][0], 20, false);
  applyMod(enemiesArr[4][1], 65, false);
  applyMod(enemiesArr[4][2], 65, false);
  applyMod(enemiesArr[4][3], 20, false);
};

var actionSix = function actionSix() {
  // WaCWiR
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], 60);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], 60);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2], 30);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][3], 30);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], 60, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], 30, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2], 30, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][3], 60, false); // WiRWaC

  applyMod(enemiesArr[5][0], 5);
  applyMod(enemiesArr[5][1], 45);
  applyMod(enemiesArr[5][2], 45);
  applyMod(enemiesArr[5][3], 85);
  applyMod(enemiesArr[5][0], 45, false);
  applyMod(enemiesArr[5][1], 10, false);
  applyMod(enemiesArr[5][2], 70, false);
  applyMod(enemiesArr[5][3], 45, false);
};

var actionSeven = function actionSeven() {
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], 50);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], 10);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2], 35);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][3], 65);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], 20, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], 45, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2], 60, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][3], 35, false);
  applyMod(enemiesArr[6][0], 25);
  applyMod(enemiesArr[6][1], 10);
  applyMod(enemiesArr[6][2], 80);
  applyMod(enemiesArr[6][3], 45);
  applyMod(enemiesArr[6][0], 15, false);
  applyMod(enemiesArr[6][1], 45, false);
  applyMod(enemiesArr[6][2], 45, false);
  applyMod(enemiesArr[6][3], 70, false);
};

var actionEight = function actionEight() {
  // WaCWiR
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], 60);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], 60);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2], 30);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][3], 30);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], 60, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], 30, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2], 30, false);
  applyMod(_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][3], 60, false); // WiRWaC

  applyMod(enemiesArr[7][0], 45);
  applyMod(enemiesArr[7][1], 10);
  applyMod(enemiesArr[7][2], 80);
  applyMod(enemiesArr[7][3], 45);
  applyMod(enemiesArr[7][0], 15, false);
  applyMod(enemiesArr[7][1], 45, false);
  applyMod(enemiesArr[7][2], 45, false);
  applyMod(enemiesArr[7][3], 70, false);
};

var levelOne = new Level('One', enemiesArr[0], 20, "Click on the stick figure, the warrior, in black to select it. Then click on the red stick figure enemy to attack it or click anywhere on the map to move there. Once an action is performed, the character will keep doing it until given a new action.", firstFourActions, [_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0]]);
var levelTwo = new Level('Two', enemiesArr[1], 80, "The character with a staff is a cleric healer. Click on it and then on an allied unit or itself to begin healing them. De-select a character without making an action by clicking the Red button on the top right. Defeat all enemies to clear the level.", firstFourActions, [_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1]]);
var levelThree = new Level('Three', enemiesArr[2], 120, "The character with the blue hat, the wizard, can attack enemies from any range. Click on it then on an enemy to begin attacking immediately. \nAttacking an enemy with the Warrior will cause them to focus their attacks on him.", firstFourActions, [_entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][0], _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][1], _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"][2]]);
var levelFour = new Level('Four', enemiesArr[3], 240, "The newest character addition is the rogue with the daggers. Each character has a unique role. The Warrior is the best tank, the rogue the fastest attacker, the wizard the most versitile damage dealer, and the cleric the healer.", firstFourActions, _entities_character__WEBPACK_IMPORTED_MODULE_0__["default"]);
var levelFive = new Level('Five', enemiesArr[4], 300, "The tutorial levels are over. Time for more of a challenge", actionFive);
var levelSix = new Level('Six', enemiesArr[5], 375, "Wizards and Clerics", actionSix);
var levelSeven = new Level('Seven', enemiesArr[6], 450, "All melee", actionSeven);
var levelEight = new Level('Eight', enemiesArr[7], 700, "Fight yourself", actionEight);

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
var currentLevelNumber = 0;
var maxLevelNumber = 0; // change on pushed ver

var characters = levels[5].characterList;
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

  var _loop = function _loop(i) {
    statAbilities1[i].addEventListener('click', function () {
      return showAbilityDescription(1, i + 1);
    });
    statAbilities2[i].addEventListener('click', function () {
      return showAbilityDescription(2, i + 1);
    });
  };

  for (var i = 0; i < statAbilities1.length; i++) {
    _loop(i);
  }

  heroStatcontainer.addEventListener('click', function () {
    for (var _i = 0; _i < statImages.length; _i++) {
      if (statImages[_i].style.display !== 'none') {
        var _char = void 0;

        if (_i === 0) {
          _char = statChar1;
        } else {
          _char = statChar2;
        }

        var statImg = document.getElementById("stats-img-".concat(_i + 1));
        var nameStat = document.getElementById("stats-name-".concat(_i + 1));
        var levelStat = document.getElementById("stats-level-".concat(_i + 1));
        var hpStat = document.getElementById("stats-hp-".concat(_i + 1));
        var dmgStat = document.getElementById("stats-dmg-".concat(_i + 1));
        var defenseStat = document.getElementById("stats-defense-".concat(_i + 1));
        statImg.src = _char.baseImg.src;
        nameStat.innerHTML = "Level: ".concat(_char.level);
        levelStat.innerHTML = _char.klass;
        hpStat.innerHTML = "Max HP: ".concat(_char.baseHP);
        dmgStat.innerHTML = "Damage: ".concat(_char.baseDMG);
        defenseStat.innerHTML = "Defense: ".concat(_char.baseDefense);

        for (var j = 0; j < statAbilities1.length; j++) {
          if (_char.abilities[j]) {
            if (_i === 0) {
              statAbilities1[j].style.display = '';
            } else {
              statAbilities2[j].style.display = '';
            }
          } else {
            if (_i === 0) {
              statAbilities1[j].style.display = 'none';
            } else {
              statAbilities2[j].style.display = 'none';
            }
          }
        }
      }
    }
  });
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
    var _char2 = characters[charIndex - 1];
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

    statImg.src = _char2.baseImg.src;
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

  for (var _i2 = 0; _i2 < heroNameplateSelectors.length; _i2++) {
    heroNameplateSelectors[_i2].addEventListener('click', initiateStatSwap);
  }

  for (var _i3 = 0; _i3 < statSelectorNames.length; _i3++) {
    if (characters[_i3]) {
      statSelectorNames[_i3].innerHTML = characters[_i3].klass;
    }
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
  } else {// console.log('broken image passed in for', entity.imgName);
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
    if (!selectedChar.target === entity || !selectedChar.isAttacking) {
      selectedChar.autoAttack(entity);
    }
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
    selectedChar.autoAttack(entity);
  }
}

var allyClickEvents = function allyClickEvents(e) {
  // console.log('character click');
  var entityName = e.target.className.slice(0, 2);
  var entity = livingChars[entityName];
  e.stopPropagation();
  selectChar(entity);
};

var enemyClickEvents = function enemyClickEvents(e) {
  var entityName = e.target.className.slice(0, 2);
  var entity = livingEnemies[entityName];
  e.stopPropagation();
  selectEnemy(entity);
};

function keydownEvent(e) {
  var entity = hotkeys[e.key];

  if (entity && entity.allied) {
    selectChar(entity);
  } else if (entity && entity.klass) {
    selectEnemy(entity);
  } else if ((entity === 0 || entity) && selectedChar) {
    selectedChar.useAbility(entity);
  } else {// console.log('invalid key press of: ', e.key);
  }
}

function abilityClick(arr) {
  var entity = livingChars['a' + arr[0]];

  if (entity) {
    entity.useAbility(arr[1]);
  } else {// console.log('invalid entity for ability use');
  }
}

function setAbilityBoxes() {
  var abilityBoxes = []; // let abilityLabels = [];

  for (var i = 1; i < 5; i++) {
    abilityBoxes.push(document.getElementsByClassName("a".concat(i, "-inner-ability-divs"))); // abilityLabels.push(document.getElementsByClassName(`a${i}-ability-labels`));
  }

  var _loop2 = function _loop2(_i4) {
    var _loop3 = function _loop3(j) {
      abilityBoxes[_i4][j].addEventListener('click', function () {
        return abilityClick([_i4 + 1, j]);
      });
    };

    for (var j = 0; j < abilityBoxes[_i4].length; j++) {
      _loop3(j);
    }
  };

  for (var _i4 = 0; _i4 < abilityBoxes.length; _i4++) {
    _loop2(_i4);
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
        selectedChar = null;
        return;
      }

      clearInterval(selectedChar.currentAction);
      clearInterval(selectedChar.currentAnimation);
      selectedChar.img.style.border = 'none';
      currentAbilityBoxes.style.display = 'none';
      currentAbilityBoxes = null;

      if (selectedChar.range === 'infinite') {
        selectedChar.move([e.x, e.y], selectedChar.target);
      } else {
        selectedChar.move([e.x, e.y]);
      }

      selectedChar = null;
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
    return;
  }

  var level = levels[levelNumber];
  levelHasEnded = false;
  currentLevelNumber = levelNumber;
  level.action(); // console.log('level selected: ', levelNumber);

  document.getElementById('return-button').style.display = '';
  document.getElementById('level-button-container').style.display = 'none';
  document.getElementById('level-button-container-header').style.display = 'none';
  var levelNameDisp = document.getElementById("level-name-display");
  levelNameDisp.style.opacity = 0;
  levelNameDisp.style.display = '';
  levelNameDisp.innerHTML = 'Level ' + level.name;
  var levelMessage = document.getElementById('tutorial-message');
  levelMessage.innerHTML = level.message;
  levelMessage.style.opacity = 0;
  levelMessage.style.display = ''; // const secondAction = () => beginLevel(level.characterList, level.enemyList, levelNumber);

  Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(levelNameDisp);

  var levelNameAction = function levelNameAction() {
    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(beginLevel);
  };

  var action = function action() {
    return Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(levelNameDisp, levelNameAction);
  };

  var beginLevel = document.getElementById('begin-level-button');
  beginLevel.style.opacity = 0;
  beginLevel.style.display = '';
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
    } // console.log(enemies[i].imgName, "has target set to", enemies[i].target);
    // randomizeEnemySpawnLocation(enemies[i]);

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

function touchingVertically(pos, _char5, entity) {
  return pos[1] < entity.pos[1] && pos[1] + _char5.container.offsetHeight > entity.pos[1] || pos[1] < entity.pos[1] + entity.container.offsetHeight && pos[1] + _char5.container.offsetHeight > entity.pos[1] + entity.container.offsetHeight;
}

function checkPosBox(pos, _char6, entity) {
  if (pos[0] < entity.pos[0] && pos[0] + _char6.container.offsetWidth > entity.pos[0] && touchingVertically(pos, _char6, entity)) {
    return true;
  }

  if (pos[0] < entity.pos[0] + entity.container.offsetWidth && pos[0] + _char6.container.offsetWidth > entity.pos[0] + entity.container.offsetWidth && touchingVertically(pos, _char6, entity)) {
    return true;
  }

  return false;
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
      if (checkPosBox(position, enemy, checkPositions[i])) {
        positionFound = false;
        break;
      }
    }
  }

  enemy.pos[0] = position[0];
  enemy.pos[1] = position[1];
  enemy.container.style.left = enemy.pos[0] + 'px';
  enemy.container.style.top = enemy.pos[1] + 'px';
}

var boxEntities = [];

function loadInCharacters(charactersArr, enemiesArr, levelNumber) {
  document.getElementById('return-button').style.display = 'none';
  var deSelectButton = document.getElementById('test');
  deSelectButton.style.opacity = 0;
  deSelectButton.style.display = '';
  Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(deSelectButton);
  var backgroundImg = document.getElementById('background-image');

  if (levelNumber < 4) {
    backgroundImg.src = document.getElementById('forest').src;
  } else if (levelNumber < 7) {
    backgroundImg.src = document.getElementById('snowy').src;
  } else {
    backgroundImg.src = document.getElementById('dungeon').src;
  }

  backgroundImg.style.opacity = 0;
  backgroundImg.style.display = '';
  Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(backgroundImg);

  for (var i = 0; i < charactersArr.length; i++) {
    if (!charactersArr[i].observer) {
      addEntityEvents(charactersArr[i], charactersArr, enemiesArr);
    }

    livingChars[charactersArr[i].imgName] = charactersArr[i];
    charactersArr[i].container.style.top = charactersArr[i].pos[1] + 'px';
    charactersArr[i].container.style.left = charactersArr[i].pos[0] + 'px';
    charactersArr[i].container.style.opacity = 0;
    charactersArr[i].container.style.display = '';
    boxEntities.push(charactersArr[i]);
    var hpBar = document.getElementById("".concat(charactersArr[i].imgName, "-hp-bar"));
    hpBar.style.display = "flex"; // charactersArr[i].hotkeyDisplay.innerHTML = charactersArr[i].hotkey;
    // hotkeys[charactersArr[i].hotkey] = charactersArr[i];

    var hotkeyInput = document.getElementById("a".concat(i + 1, "-keybind"));
    charactersArr[i].hotkeyDisplay.innerHTML = hotkeyInput.value;
    hotkeys[hotkeyInput.value] = charactersArr[i];
    var abilityHotkey = document.getElementById("ab".concat(i + 1, "-keybind"));
    hotkeys[abilityHotkey.value] = i;
    var abilityClassName = document.getElementById("a".concat(i + 1, "-class-name"));
    abilityClassName.innerHTML = charactersArr[i].klass;
    var abilityNames = document.getElementsByClassName("a".concat(i + 1, "-ability-labels"));
    setAvailableAbilities(charactersArr[i]);

    for (var j = 0; j < abilityNames.length; j++) {
      if (charactersArr[i].abilityNames[j]) {
        abilityNames[j].innerHTML = charactersArr[i].abilityNames[j];
      } else {
        abilityNames[j].innerHTML = 'No Ability';
      }
    } // const actionEvent = () => { charactersArr[i].container.addEventListener('click', allyClickEvents);}


    charactersArr[i].container.addEventListener('click', allyClickEvents);
    charactersArr[i].img.src = charactersArr[i].baseImg.src;

    if (charactersArr[i].pos === null) {
      setRandomSpawn(charactersArr[i], boxEntities.slice());
    }

    boxEntities.push(charactersArr[i]);
    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(charactersArr[i].container);
    observerObserve(charactersArr[i]);
  }

  var _loop4 = function _loop4(_i5) {
    if (!enemiesArr[_i5].observer) {
      addEntityEvents(enemiesArr[_i5], enemiesArr, charactersArr);
    }

    livingEnemies[enemiesArr[_i5].imgName] = enemiesArr[_i5];
    enemiesArr[_i5].container.style.top = enemiesArr[_i5].pos[1] + 'px';
    enemiesArr[_i5].container.style.left = enemiesArr[_i5].pos[0] + 'px';
    enemiesArr[_i5].container.style.opacity = 0;
    enemiesArr[_i5].container.style.display = '';
    var hpBar = document.getElementById("".concat(enemiesArr[_i5].imgName, "-hp-bar"));
    hpBar.style.display = "flex";
    var hotkeyInput = document.getElementById("e".concat(_i5 + 1, "-keybind"));
    enemiesArr[_i5].hotkeyDisplay.innerHTML = hotkeyInput.value;
    hotkeys[hotkeyInput.value] = enemiesArr[_i5];

    enemiesArr[_i5].container.addEventListener('click', enemyClickEvents);

    enemiesArr[_i5].img.src = enemiesArr[_i5].baseImg.src;

    if (enemiesArr[_i5].pos === null) {
      setRandomSpawn(enemiesArr[_i5], boxEntities.slice());
    }

    boxEntities.push(enemiesArr[_i5]);

    var action = function action() {
      return enemiesArr[_i5].autoAttack(enemiesArr[_i5].target);
    };

    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(enemiesArr[_i5].container, action); // begin attacking target

    observerObserve(enemiesArr[_i5]);
  };

  for (var _i5 = 0; _i5 < enemiesArr.length; _i5++) {
    _loop4(_i5);
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
  boxEntities = [];
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

  for (var _i6 = 0; _i6 < allCharsList.length; _i6++) {
    allCharsList[_i6].observer.disconnect();

    if (allCharsList[_i6].currentAction) {
      clearInterval(allCharsList[_i6].currentAction);
    }

    if (allCharsList[_i6].currentAnimation) {
      clearInterval(allCharsList[_i6].currentAnimation);
    }

    allCharsList[_i6].isAttacking = false;
    allCharsList[_i6].isMoving = false;
    allCharsList[_i6].target = null;

    allCharsList[_i6].container.removeEventListener('click', allyClickEvents);

    allCharsList[_i6].img.src = allCharsList[_i6].baseImg.src;
  }

  for (var _i7 = 0; _i7 < allEnemyList.length; _i7++) {
    allEnemyList[_i7].observer.disconnect();

    if (allEnemyList[_i7].currentAction) {
      clearInterval(allEnemyList[_i7].currentAction);
    }

    if (allEnemyList[_i7].currentAnimation) {
      clearInterval(allEnemyList[_i7].currentAnimation);
    }

    allEnemyList[_i7].isAttacking = false;
    allEnemyList[_i7].isMoving = false;
    allEnemyList[_i7].target = null;

    allEnemyList[_i7].container.removeEventListener('click', enemyClickEvents);

    allEnemyList[_i7].img.src = allEnemyList[_i7].baseImg.src;
  }

  if (charsList.length > 0) {
    endMoveChars(charsList);
  } else {
    var backgroundImg = document.getElementById('background-image');
    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(backgroundImg);

    for (var _i8 = 0; _i8 < enemyList.length; _i8++) {
      Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(enemyList[_i8].container);
    }

    fadeOutGame(false);
  }
}

function xpObserverObserve(_char7) {
  _char7.observationToken = true;

  _char7.xpObserver.observe(_char7.img, {
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
    charsList[i].move([i * 160 + (i + 1) * basePos[0] + basePos[2], basePos[1]], false, true);
  }
}

function addCharXP() {
  var c = Object.values(livingChars); // console.log(c);

  for (var i = 0; i < c.length; i++) {
    c[i].xpObserver.disconnect();
    var expWords = document.getElementById(c[i].imgName + '-exp-words');
    expWords.innerHTML = 'Level: ' + c[i].level;
    c[i].hpContainerLeft.style.backgroundColor = 'gold';
    var xpPercent = Math.floor(c[i].xp / c[i].nextLevelXP * 100);
    c[i].hpContainerLeft.style.width = "".concat(xpPercent, "%");
    c[i].hpContainerRight.style.width = "".concat(100 - xpPercent, "%");
    var levelUpDisp = document.getElementById(c[i].imgName + '-level-up');
    levelUpDisp.style.top = Math.floor(c[i].pos[1] - 75) + 'px';
    levelUpDisp.style.left = Math.floor(c[i].pos[0]) + 'px';
  }

  fadeOutGame(true);
  var xpPerC = levels[currentLevelNumber].xp / c.length;
  var xpPerInterval = xpPerC / 60; // 4 seconds for the animation, .05 sec intervals

  var timeCount = 0;
  var xpInterval = setInterval(function () {
    if (timeCount === 60) {
      clearInterval(xpInterval);

      for (var _i9 = 0; _i9 < c.length; _i9++) {
        c[_i9].xp = Math.ceil(c[_i9].xp); // console.log('xp: ', c[i].xp, ' level: ', c[i].level);

        c[_i9].container.style.border = 'none';
        Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(c[_i9].container);
      }

      var backgroundImg = document.getElementById('background-image');
      Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(backgroundImg);
    }

    for (var _i10 = 0; _i10 < c.length; _i10++) {
      c[_i10].xp += xpPerInterval;

      if (c[_i10].xp > c[_i10].nextLevelXP) {
        c[_i10].levelUp();

        var _expWords = document.getElementById(c[_i10].imgName + '-exp-words');

        _expWords.innerHTML = 'Level: ' + c[_i10].level;
      }

      var _xpPercent = Math.floor(c[_i10].xp / c[_i10].nextLevelXP * 100);

      c[_i10].hpContainerLeft.style.width = "".concat(_xpPercent, "%");
      c[_i10].hpContainerRight.style.width = "".concat(100 - _xpPercent, "%");
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

  for (var i = 0; i < levelButtons.length; i++) {
    levelButtons[i].style.height = levelButtons[i].offsetWidth + 'px';
  }

  if (won && maxLevelNumber === currentLevelNumber) {
    maxLevelNumber++;

    if (levelButtons[maxLevelNumber]) {
      levelButtons[maxLevelNumber].style.opacity = 100 + '%';
      levelButtons[maxLevelNumber].style.cursor = 'pointer';
    }
  }

  var levChars = levels[currentLevelNumber].characterList;
  var levEnems = levels[currentLevelNumber].enemyList;

  for (var _i11 = 0; _i11 < levChars.length; _i11++) {
    levChars[_i11].hp = levChars[_i11].baseHP;
    levChars[_i11].dmg = levChars[_i11].baseDMG;
    levChars[_i11].defense = levChars[_i11].baseDefense;
    levChars[_i11].ms = levChars[_i11].baseMS;
    levChars[_i11].stunned = false;
    levChars[_i11].rooted = false;
    levChars[_i11].pos[0] = levChars[_i11].basePos[0];
    levChars[_i11].pos[1] = levChars[_i11].basePos[1];
    levChars[_i11].container.style.top = levChars[_i11].pos[1] + 'px';
    levChars[_i11].container.style.left = levChars[_i11].pos[0] + 'px';
    levChars[_i11].hpContainerLeft.style.backgroundColor = 'blue';
    var expWords = document.getElementById(levChars[_i11].imgName + '-exp-words');
    expWords.innerHTML = '';
    levChars[_i11].img.style.border = 'none';

    levChars[_i11].setHpBars();
  }

  for (var _i12 = 0; _i12 < levEnems.length; _i12++) {
    levEnems[_i12].hp = levEnems[_i12].baseHP;
    levEnems[_i12].dmg = levEnems[_i12].baseDMG;
    levEnems[_i12].defense = levEnems[_i12].baseDefense;
    levEnems[_i12].ms = levEnems[_i12].baseMS;
    levEnems[_i12].stunned = false;
    levEnems[_i12].rooted = false;
    levEnems[_i12].pos[0] = levEnems[_i12].basePos[0];
    levEnems[_i12].pos[1] = levEnems[_i12].basePos[1];
    levEnems[_i12].container.style.top = levEnems[_i12].pos[1] + 'px';
    levEnems[_i12].container.style.left = levEnems[_i12].pos[0] + 'px';
    levEnems[_i12].img.style.border = 'none';

    levEnems[_i12].setHpBars();
  }
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