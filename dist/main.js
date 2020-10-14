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

/***/ "./src/entities/character.js":
/*!***********************************!*\
  !*** ./src/entities/character.js ***!
  \***********************************/
/*! exports provided: tutorialWarrior, tutorialCleric, tutorialWizard, tutorialRogue, Warrior, Cleric, Wizard, Rogue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tutorialWarrior", function() { return tutorialWarrior; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tutorialCleric", function() { return tutorialCleric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tutorialWizard", function() { return tutorialWizard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tutorialRogue", function() { return tutorialRogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Warrior", function() { return Warrior; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cleric", function() { return Cleric; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wizard", function() { return Wizard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rogue", function() { return Rogue; });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/entities/entity.js");

/*
className
range
maxHP
MS
AS
DMG
true
img
pos
defense
*/
// tutorials

var tutorialWarrior = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Warrior', 10, 100, 10, 1000, 10, true, "a3", [450, 500], 20);
var tutorialCleric = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Cleric', 'infinite', 100, 10, 1500, -10, true, "a4", [200, 300], 10);
var tutorialWizard = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Wizard', "infinite", 100, 10, 2000, 20, true, "a1", [200, 600], 12);
var tutorialRogue = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]("Rogue", 10, 100, 10, 800, 10, true, "a2", [900, 500], 16); // tank

var Warrior = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Warrior', 10, 100, 10, 1000, 10, true, "a3", [100, 400], 20); // heals

var Cleric = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Cleric', 'infinite', 100, 10, 1500, -10, true, "a4", [400, 100], 10); // rdps

var Wizard = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Wizard', "infinite", 100, 10, 2000, 20, true, "a1", [100, 100], 12); // mdps

var Rogue = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]("Rogue", 10, 100, 10, 800, 10, true, "a2", [900, 500], 16);

/***/ }),

/***/ "./src/entities/enemy.js":
/*!*******************************!*\
  !*** ./src/entities/enemy.js ***!
  \*******************************/
/*! exports provided: intro, healIntro, rangedIntro, puttinItAllTogetha, ezDoppelganger, level2, level3, doppelganger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intro", function() { return intro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "healIntro", function() { return healIntro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangedIntro", function() { return rangedIntro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "puttinItAllTogetha", function() { return puttinItAllTogetha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ezDoppelganger", function() { return ezDoppelganger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "level2", function() { return level2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "level3", function() { return level3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doppelganger", function() { return doppelganger; });
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity.js */ "./src/entities/entity.js");

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
*/
// 
// rdps

var tutorialWizard = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 60, 10, 1500, 10, false, 'e1', [1000, 600], 8);
var ghettoWizard = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 60, 10, 1500, 12, false, 'e1', [500, 500], 8);
var wizard2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 70, 10, 1500, 13, false, 'e1', [500, 500], 8);
var wizard3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 70, 10, 1500, 13, false, 'e2', [700, 200], 8);
var EWizard = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 100, 10, 2000, 20, false, "e1", [500, 500], 15); // heals

var tutorialCleric = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 60, 10, 2000, -8, false, "e4", [1000, 300], 8);
var dumbCleric = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 60, 10, 2000, -10, false, "e4", [1000, 100], 8);
var cleric2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 70, 10, 1750, -14, false, "e4", [1000, 100], 8);
var cleric3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 70, 10, 1750, -14, false, "e3", [300, 400], 8);
var ECleric = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 1500, -10, false, "e4", [1000, 100], 10); // mdps

var tutorialRogue = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 60, 1, 1200, 7, false, "e2", [700, 200], 14);
var loserRogue = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 60, 10, 1200, 9, false, "e2", [700, 200], 14);
var rogue2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 60, 10, 1200, 9, false, "e2", [700, 200], 14);
var rogue3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 60, 10, 1200, 9, false, "e1", [500, 500], 14);
var ERogue = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 100, 10, 800, 10, false, "e2", [700, 200], 18); // tank

var punchingBag = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 100, 10, 1000, 1, false, "e3", [650, 500], 20);
var tutorialWarrior = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 100, 10, 1000, 6, false, "e3", [650, 500], 20);
var weakWarrior = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 60, 10, 1000, 8, false, "e3", [300, 400], 20);
var warrior2 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 60, 10, 1000, 8, false, "e3", [300, 400], 20);
var warrior3 = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 60, 10, 1000, 8, false, "e4", [1000, 100], 20);
var EWarrior = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 120, 10, 1000, 10, false, "e3", [300, 400], 20); // level 1

var intro = [punchingBag]; // level 2

var healIntro = [tutorialWarrior, tutorialCleric]; // level 3

var rangedIntro = [tutorialWarrior, tutorialCleric, tutorialWizard]; // level 4

var puttinItAllTogetha = [tutorialWarrior, tutorialCleric, tutorialWizard, tutorialRogue]; // level 5

var ezDoppelganger = [ghettoWizard, loserRogue, weakWarrior, dumbCleric]; // level 6

var level2 = [rogue2, rogue3, warrior2, warrior3]; // level 7

var level3 = [wizard2, wizard3, cleric2, cleric3]; // level 8

var doppelganger = [EWizard, ERogue, EWarrior, ECleric];

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

    _classCallCheck(this, Entity);

    this.klass = klass;
    this.range = range;
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
    this.baseDMG = attackDMG;
    this.dmg = this.baseDMG;
    this.defense = defense;
    this.imgName = img;
    this.img; // base standing image

    this.attackImages; // cycle through array of images

    this.moveImages; // cycle through array of images

    this.baseImg; // standard stand image

    this.container;
    this.currentAction;
    this.currentAnimation;
    this.imgCycle = 0;
    this.target;
    this.allies;
    this.enemies;
    this.movingOutTheWay = false;
    this.observer;
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
      this.movingOutTheWay = true;
      clearInterval(this.currentAction);
      clearInterval(this.currentAnimation);
      this.img.src = this.baseImg.src;
      endPos[0] = Math.floor(endPos[0] - this.img.width);
      endPos[1] = Math.floor(endPos[1] - this.img.height * (3 / 4));
      var pos = this.pos;
      var posChange = this.vectorToScalar(endPos); // console.log("pos change on move", posChange);

      var bigDiv = document.getElementById('game-container');
      var difference = Math.floor((window.innerWidth - bigDiv.offsetWidth) / 2);
      var checker = difference + Math.floor(bigDiv.offsetWidth);
      this.currentAction = setInterval(function () {
        return frame(_this2);
      }, 20);

      function frame(self) {
        if (posChange[2] === 0) {
          // close animation
          clearInterval(self.currentAction);
          self.movingOutTheWay = false;
          pos[0] = Math.floor(pos[0]);
          pos[1] = Math.floor(pos[1]);

          if (attackOnFinish) {
            // console.log('self in move end: ', self);
            self.autoAttack(attackOnFinish); // needs editing
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

          if (pos[1] + Math.floor(self.img.height) > 800) {
            pos[1] = 800 - Math.floor(self.img.height);
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
  }, {
    key: "withinAttackRange",
    value: function withinAttackRange(target) {
      // console.log('this in withinAttackRange: ', this);
      if (this.range === 'infinite') {
        return true;
      } // rectangle box for melee


      var widthAddition = Math.floor(this.img.width / 2 + target.img.width / 2);

      if (this.pos[0] > target.pos[0] - widthAddition - this.range && this.pos[0] < target.pos[0] + widthAddition + this.range) {
        var heightAddition = Math.floor(this.img.height / 4); // console.log("this pos: ", this.pos);
        // console.log("target pos: ", target.pos);

        if (this.pos[1] > target.pos[1] - heightAddition && this.pos[1] < target.pos[1] + heightAddition) {
          // console.log('within melee range');
          return true;
        }
      } // console.log('outside of range');


      return false;
    }
  }, {
    key: "killEntitiy",
    value: function killEntitiy(entity) {
      // console.log(entity.klass, "killed");
      clearInterval(entity.currentAction);
      clearInterval(entity.currentAnimation);
      entity.img.src = entity.baseImg.src;
      entity.hp = -100;
      entity.container.style.display = "none";
    }
  }, {
    key: "animateAttack",
    value: function animateAttack() {
      if (this.attackImages) {
        this.imgCycle += 1;
        this.imgCycle = this.imgCycle % 4;
        this.img.src = this.attackImages[this.imgCycle].src;
      }
    }
  }, {
    key: "setHpBars",
    value: function setHpBars() {
      var leftBar = document.getElementById("".concat(this.imgName, "-hp-left"));
      var rightBar = document.getElementById("".concat(this.imgName, "-hp-right"));
      var leftWidth = Math.floor(this.hp / this.baseHP * 100);
      var rightWidth = 100 - leftWidth;
      if (leftWidth < 0) leftWidth = 0;
      if (rightWidth < 0) rightWidth = 0;
      leftBar.style.width = leftWidth + '%';
      rightBar.style.width = rightWidth + '%';
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
        if (!this.allies[i].movingOutTheWay) {
          var widthAddition = Math.floor(this.img.width / 2);

          if (this.pos[0] > this.allies[i].pos[0] - widthAddition - this.range && this.pos[0] < this.allies[i].pos[0] + widthAddition + this.range) {
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
      var bigDiv = document.getElementById('game-container');
      var difference = Math.floor((window.innerWidth - bigDiv.offsetWidth) / 2);
      var checker = difference + Math.floor(bigDiv.offsetWidth);
      this.currentAction = setInterval(function () {
        return move(_this3);
      }, 20);

      function move(self) {
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
  }, {
    key: "beginAttack",
    value: function beginAttack(targetChar) {
      var _this4 = this;

      // make some kind of animation start
      this.clearIntervals();
      this.currentAnimation = setInterval(function () {
        return _this4.animateAttack(_this4);
      }, Math.floor(this.as / 4));
      this.currentAction = setInterval(function () {
        return attack(_this4);
      }, this.as);

      function attack(selectedChar) {
        if (targetChar.hp <= 0) {
          selectedChar.clearIntervals();

          if (!selectedChar.allied) {
            // chose another hero to attack
            selectedChar.setTargetAndAttack(); // maybe add something in for player to auto target upon deaths ?
          }

          return;
        }

        if (!selectedChar.withinAttackRange(targetChar)) {
          // stop the animation
          selectedChar.clearIntervals(); // console.log(selectedChar.klass, 'too far from', targetChar.klass, 'during attack - moving to new location');

          selectedChar.trackTarget();
          return; // move to enemy's new location -- needs to track current position
        } else if (selectedChar.charactersStacked()) {
          selectedChar.movingOutTheWay = true;
          var addition = Math.floor(selectedChar.img.width / 2);

          if (selectedChar.img.style.transform === "scaleX(-1)") {
            // move to left side of target
            selectedChar.img.style.transform = "scaleX(1)"; // - (addition / 4)

            selectedChar.move([targetChar.pos[0], targetChar.pos[1] + Math.floor(targetChar.img.height * 3 / 4)], targetChar);
          } else {
            // move to right side of target;
            selectedChar.img.style.transform = "scaleX(-1)";
            selectedChar.move([targetChar.pos[0] + 4 * addition, targetChar.pos[1] + Math.floor(targetChar.img.height * 3 / 4)], targetChar);
          }
        } else {
          targetChar.hp -= selectedChar.dmg;

          if (targetChar.hp > targetChar.baseHP) {
            targetChar.hp = targetChar.baseHP;
          }

          if (!targetChar.allied && selectedChar.allied && targetChar.baseDMG > 0 && selectedChar.defense > targetChar.target.defense) {
            targetChar.target = selectedChar;
            targetChar.clearIntervals();
            targetChar.autoAttack(targetChar.target); // console.log('enemy is now targetting: ', selectedChar);
          } // hp finalized


          targetChar.setHpBars(); // console.log('target hp at: ', targetChar.hp);

          if (targetChar.hp <= 0) {
            // stop the animation
            selectedChar.clearIntervals(); // console.log(targetChar, ' hp ', targetChar.hp);

            selectedChar.killEntitiy(targetChar);

            if (!selectedChar.allied) {
              // chose another hero to attack
              selectedChar.setTargetAndAttack();
            }
          } // console.log("border style: ", targetChar.img.style.border);


          if (targetChar.img.style.border !== "4px solid gold") {
            if (selectedChar.baseDMG > 0) {
              targetChar.img.style.border = "2px solid red";
            } else {
              targetChar.img.style.border = "2px solid green";
            }

            var borderInterval = setInterval(function () {
              if (targetChar.img.style.border !== "4px solid gold") {
                targetChar.img.style.border = "none";
              }

              clearInterval(borderInterval);
            }, 500);
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
      } // can refactor out targets


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
  }, {
    key: "clearIntervals",
    value: function clearIntervals() {
      clearInterval(this.currentAction);
      clearInterval(this.currentAnimation);
      this.img.src = this.baseImg.src;
    }
  }, {
    key: "useAbility",
    value: function useAbility(ability) {}
  }]);

  return Entity;
}();

function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [a[j], a[i]];
    a[i] = _ref[0];
    a[j] = _ref[1];
  }

  return a;
}

/* harmony default export */ __webpack_exports__["default"] = (Entity);

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
// import * as characters from './entities/character';
// import * as enemies from './entities/enemy';
 // import showControls from './screen_controllers/controls';

function closeAction() {
  controlsContainer.style.display = 'none';
  startGameButton.style.display = '';
  controlsButton.style.display = '';
  levelButtonContainer.style.display = 'none';
  closeButton.style.display = 'none';
}

window.addEventListener('load', function () {
  var controlsContainer = document.getElementsByClassName('controls-display')[0];
  var closeButton = document.getElementsByClassName('close')[0];
  var startGameButton = document.getElementById('start-game-button');
  var controlsButton = document.getElementById('game-controls-button');
  var levelButtonContainer = document.getElementById('level-button-container');
  var levelButtons = document.getElementsByClassName('level-button');

  var _loop = function _loop(i) {
    levelButtons[i].addEventListener('click', function () {
      closeButton.style.display = 'none';
      closeButton.removeEventListener('click', closeAction);
      Object(_screen_controllers_entity_controller__WEBPACK_IMPORTED_MODULE_0__["default"])(i);
    });
  };

  for (var i = 0; i < levelButtons.length; i++) {
    _loop(i);
  }

  levelButtons[0].style.opacity = 100;
  levelButtons[0].style.cursor = 'pointer';
  closeButton.addEventListener('click', closeAction);
  startGameButton.addEventListener('click', function () {
    startGameButton.style.display = "none";
    controlsButton.style.display = 'none';
    levelButtonContainer.style.display = '';
    closeButton.style.display = '';
  });
  controlsButton.addEventListener('click', function () {
    startGameButton.style.display = "none";
    controlsButton.style.display = 'none';
    controlsContainer.style.display = '';
    closeButton.style.display = '';
  });
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



var chars = Object.values(_entities_character__WEBPACK_IMPORTED_MODULE_0__);
var charactersArr = chars.slice(4);
var enemiesArr = Object.values(_entities_enemy__WEBPACK_IMPORTED_MODULE_1__);

var Level = function Level(name, enemyList) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  var characterList = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : charactersArr;

  _classCallCheck(this, Level);

  this.name = name;
  this.enemyList = enemyList;
  this.message = message;
  this.characterList = characterList;
};

var levelOne = new Level('One', enemiesArr[0], "Click on the stick figure, the warrior, in black to select it. Then click on the red stick figure enemy to attack it or click anywhere on the map to move there. Once an action is performed, the character is de-selected.", [chars[0]]);
var levelTwo = new Level('Two', enemiesArr[1], "The character with a staff is a cleric healer. Click on it and then on an allied unit or itself to begin healing them. De-select a character without making an action by clicking the X button on the top right.", [chars[0], chars[1]]);
var levelThree = new Level('Three', enemiesArr[2], "The wizard can attack enemies from any range. Click on it then on an enemy to begin attacking immediately.", [chars[0], chars[1], chars[2]]);
var levelFour = new Level('Four', enemiesArr[3], "The newest character addition is the rogue. Each character has a unique role. The Warrior is the best tank, the rogue the fastest attacker, the wizard the most versitile damage dealer, and the cleric the healer.", [chars[0], chars[1], chars[2], chars[3]]);
var levelFive = new Level('Five', enemiesArr[4]);
var levelSix = new Level('Six', enemiesArr[5]);
var levelSeven = new Level('Seven', enemiesArr[6]);
var levelEight = new Level('Eight', enemiesArr[7]);

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
var maxLevelNumber = 0;
var highestLevelAvailable = 8;
var selectedChar;
var livingEnemies = {};
var livingChars = {};

function addDeathListener(entity) {
  entity.observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
      // console.log(entity.imgName, 'style changed');
      // console.log(mutationRecord);
      if (mutationRecord.target.style.display === 'none') {
        // console.log(entity.imgName, 'style === none');
        if (entity.allied) {
          delete livingChars[entity.imgName];
        } else {
          delete livingEnemies[entity.imgName];
        }

        var c = Object.values(livingChars);
        var en = Object.values(livingEnemies); // console.log('living allies: ', livingChars);
        // console.log('living enemies: ', livingEnemies);

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

function addEntityEvents(entity, allies, enemies) {
  if (entity.imgName != "") {
    if (!entity.observer) {
      addDeathListener(entity);
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

var allyClickEvents = function allyClickEvents(e) {
  // console.log('character click');
  var entityName = e.target.className.slice(0, 2);
  var entity = livingChars[entityName];

  if (!selectedChar || selectedChar.hp < 0) {
    selectedChar = entity;
    entity.img.style.border = '4px solid gold'; // console.log('selected char: ', selectedChar.imgName);
  } else if (selectedChar.baseDMG < 0) {
    selectedChar.autoAttack(entity);
    selectedChar.img.style.border = 'none';
    selectedChar = null;
  }

  e.stopPropagation();
};

var enemyClickEvents = function enemyClickEvents(e) {
  var entityName = e.target.className.slice(0, 2); // console.log('entity name', entityName);

  var entity = livingEnemies[entityName]; // console.log('entity', entity);

  if (selectedChar.hp < 0) {
    selectedChar.img.style.border = 'none';
    selectedChar = null;
    return;
  } // console.log('enemy click');


  if (selectedChar && selectedChar.allied && selectedChar.baseDMG > 0) {
    clearInterval(selectedChar.currentAction);
    clearInterval(selectedChar.currentAnimation);
    selectedChar.autoAttack(entity);
    selectedChar.img.style.border = 'none';
    selectedChar = null;
  }

  e.stopPropagation(); // maybe move inside if
};

function setupEntities(charactersArr, enemiesArr) {
  for (var i = 0; i < charactersArr.length; i++) {
    addEntityEvents(charactersArr[i], charactersArr, enemiesArr);
  }

  for (var _i = 0; _i < enemiesArr.length; _i++) {
    addEntityEvents(enemiesArr[_i], enemiesArr, charactersArr);
  }
}

function deSelect() {
  if (selectedChar) {
    selectedChar.img.style.border = 'none';
    selectedChar = null;
  }
}

function initializeGameOpening(levelNumber) {
  var deSelectButton = document.getElementById('reset-selected');
  deSelectButton.addEventListener('click', deSelect);
  setupEntities(levels[levelNumber].characterList, levels[levelNumber].enemyList); // modify to be all the img elements
  // end click position

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
      selectedChar.move([e.x, e.y]);
      selectedChar = null;
    }
  });
  hasBeenLoaded = true;
}

function loadLevel(levelNumber) {
  if (!hasBeenLoaded) {
    initializeGameOpening(levelNumber);
  }

  if (levelNumber > maxLevelNumber) {
    return;
  }

  var level = levels[levelNumber];
  levelHasEnded = false;
  currentLevelNumber = levelNumber; // console.log('level selected: ', levelNumber);

  var deSelectButton = document.getElementById('reset-selected');
  deSelectButton.style.display = '';
  var levelButtonContainer = document.getElementById('level-button-container');
  levelButtonContainer.style.display = 'none';
  var levelNameDisp = document.getElementById("level-name-display");
  levelNameDisp.style.opacity = 0;
  levelNameDisp.style.display = '';
  levelNameDisp.innerHTML = 'Level ' + levels[levelNumber].name;

  var secondAction = function secondAction() {
    return beginLevel(level.characterList, level.enemyList, level);
  };

  var action = function action() {
    return Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(levelNameDisp, secondAction);
  };

  Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(levelNameDisp, action);
}

function beginLevel(charactersArr, enemiesArr, level) {
  // console.log('begin level called');
  var levelMessage = document.getElementById('tutorial-message');
  levelMessage.innerHTML = level.message;
  levelMessage.style.display = '';
  setInitialTargets(charactersArr, enemiesArr);
  loadInCharacters(charactersArr, enemiesArr);
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

  }
}

function loadInCharacters(charactersArr, enemiesArr) {
  for (var i = 0; i < charactersArr.length; i++) {
    if (!charactersArr[i].observer) {
      addEntityEvents(charactersArr[i], charactersArr, enemiesArr);
    }

    livingChars[charactersArr[i].imgName] = charactersArr[i];
    charactersArr[i].container.style.top = charactersArr[i].pos[1] + 'px';
    charactersArr[i].container.style.left = charactersArr[i].pos[0] + 'px';
    charactersArr[i].container.style.opacity = 0;
    charactersArr[i].container.style.display = '';
    var hpBar = document.getElementById("".concat(charactersArr[i].imgName, "-hp-bar"));
    hpBar.style.display = "flex";
    charactersArr[i].container.addEventListener('click', allyClickEvents);
    charactersArr[i].img.src = charactersArr[i].baseImg.src;
    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(charactersArr[i].container);
    observerObserve(charactersArr[i]);
  }

  var _loop = function _loop(_i2) {
    if (!enemiesArr[_i2].observer) {
      addEntityEvents(enemiesArr[_i2], enemiesArr, charactersArr);
    }

    livingEnemies[enemiesArr[_i2].imgName] = enemiesArr[_i2];
    enemiesArr[_i2].container.style.top = enemiesArr[_i2].pos[1] + 'px';
    enemiesArr[_i2].container.style.left = enemiesArr[_i2].pos[0] + 'px';
    enemiesArr[_i2].container.style.opacity = 0;
    enemiesArr[_i2].container.style.display = '';
    var hpBar = document.getElementById("".concat(enemiesArr[_i2].imgName, "-hp-bar"));
    hpBar.style.display = "flex";

    enemiesArr[_i2].container.addEventListener('click', enemyClickEvents);

    enemiesArr[_i2].img.src = enemiesArr[_i2].baseImg.src;

    var action = function action() {
      return enemiesArr[_i2].autoAttack(enemiesArr[_i2].target);
    };

    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(enemiesArr[_i2].container, action); // begin attacking target

    observerObserve(enemiesArr[_i2]);
  };

  for (var _i2 = 0; _i2 < enemiesArr.length; _i2++) {
    _loop(_i2);
  }
}

function observerObserve(entity) {
  var element = entity.container;
  entity.observer.observe(element, {
    attributes: true,
    attributeFilter: ['style']
  });
}

function endGame(charsList, enemyList) {
  var levelMessage = document.getElementById('tutorial-message');
  levelMessage.style.display = 'none';
  deSelect();
  var allCharsList = levels[currentLevelNumber].characterList;
  var allEnemyList = levels[currentLevelNumber].enemyList;

  for (var i = 0; i < allCharsList.length; i++) {
    allCharsList[i].observer.disconnect();

    if (allCharsList[i.currentAction]) {
      clearInterval(allCharsList[i].currentAction);
    }

    if (allCharsList[i].currentAnimation) {
      clearInterval(allCharsList[i].currentAnimation);
    }

    allCharsList[i].container.removeEventListener('click', allyClickEvents);
    allCharsList[i].img.src = allCharsList[i].baseImg.src;
  }

  for (var _i3 = 0; _i3 < allEnemyList.length; _i3++) {
    allEnemyList[_i3].observer.disconnect();

    if (allEnemyList[_i3].currentAction) {
      clearInterval(allEnemyList[_i3].currentAction);
    }

    if (allEnemyList[_i3].currentAnimation) {
      clearInterval(allEnemyList[_i3].currentAnimation);
    }

    allEnemyList[_i3].container.removeEventListener('click', enemyClickEvents);

    allEnemyList[_i3].img.src = allEnemyList[_i3].baseImg.src;
  }

  for (var _i4 = 0; _i4 < charsList.length; _i4++) {
    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(charsList[_i4].container);
  }

  for (var _i5 = 0; _i5 < enemyList.length; _i5++) {
    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(enemyList[_i5].container);
  }

  var gameFadeTimer = setInterval(function () {
    // console.log('fade called');
    var disp;
    var secondAction;

    if (charsList.length === 0) {
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
      return Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeOut"])(disp, secondAction);
    };

    Object(_fades__WEBPACK_IMPORTED_MODULE_1__["fadeIn"])(disp, action);
    clearInterval(gameFadeTimer);
  }, 2000);
}

function resetGame(won) {
  livingChars = {};
  livingEnemies = {};
  var deSelectButton = document.getElementById('reset-selected');
  deSelectButton.style.display = 'none';
  var levelButtonContainer = document.getElementById('level-button-container');
  levelButtonContainer.style.display = '';

  if (won && maxLevelNumber === currentLevelNumber && currentLevelNumber < highestLevelAvailable + 1) {
    maxLevelNumber++;
    var levelButtons = document.getElementsByClassName('level-button');
    levelButtons[maxLevelNumber].style.opacity = 100 + '%';
    levelButtons[maxLevelNumber].style.cursor = 'pointer';
  } // level.characterList, level.enemyList
  // console.log('levels arr: ', levels);
  // console.log('level ', currentLevelNumber, ': ', levels[currentLevelNumber]);


  var levChars = levels[currentLevelNumber].characterList;
  var levEnems = levels[currentLevelNumber].enemyList;

  for (var i = 0; i < levChars.length; i++) {
    levChars[i].hp = levChars[i].baseHP;
    levChars[i].pos[0] = levChars[i].basePos[0];
    levChars[i].pos[1] = levChars[i].basePos[1];
    levChars[i].container.style.top = levChars[i].pos[1] + 'px';
    levChars[i].container.style.left = levChars[i].pos[0] + 'px';
    levChars[i].setHpBars();
  }

  for (var _i6 = 0; _i6 < levEnems.length; _i6++) {
    levEnems[_i6].hp = levEnems[_i6].baseHP;
    levEnems[_i6].pos[0] = levEnems[_i6].basePos[0];
    levEnems[_i6].pos[1] = levEnems[_i6].basePos[1];
    levEnems[_i6].container.style.top = levEnems[_i6].pos[1] + 'px';
    levEnems[_i6].container.style.left = levEnems[_i6].pos[0] + 'px';

    levEnems[_i6].setHpBars();
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
  var op = 20;
  var timerDown = setInterval(function () {
    if (op <= 0) {
      clearInterval(timerDown);
      element.style.display = 'none';

      if (action) {
        action();
      }
    }

    element.style.opacity = op / 20;
    op -= 1;
  }, 100);
}
function fadeIn(element) {
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
  }, 100);
}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map