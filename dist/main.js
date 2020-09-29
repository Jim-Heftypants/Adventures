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
/*! exports provided: Wizard, Priest, Rogue, Warrior */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wizard", function() { return Wizard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Priest", function() { return Priest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rogue", function() { return Rogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Warrior", function() { return Warrior; });
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
// rdps

var Wizard = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Wizard', "infinite", 100, 10, 2000, 20, true, "wizard", [100, 100], 12); // heals

var Priest = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Cleric', 'infinite', 100, 10, 1500, -10, true, "cleric", [400, 100], 10); // mdps

var Rogue = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]("Rogue", 10, 100, 10, 800, 10, true, "rogue", [900, 500], 16); // tank

var Warrior = new _entity__WEBPACK_IMPORTED_MODULE_0__["default"]('Warrior', 10, 100, 10, 1000, 10, true, "warrior", [100, 400], 20);

/***/ }),

/***/ "./src/entities/enemy.js":
/*!*******************************!*\
  !*** ./src/entities/enemy.js ***!
  \*******************************/
/*! exports provided: EWizard, EPriest, ERogue, EWarrior */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EWizard", function() { return EWizard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EPriest", function() { return EPriest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERogue", function() { return ERogue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EWarrior", function() { return EWarrior; });
/* harmony import */ var _entity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity.js */ "./src/entities/entity.js");

/*
className
range
maxHP
MS
AS
DMG
false
pos
defense
*/
// rdps

var EWizard = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWizard', 'infinite', 100, 10, 2000, 20, false, "ewizard", [500, 500], 15); // heals

var EPriest = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('ECleric', 'infinite', 100, 10, 1500, -10, false, "ecleric", [1000, 100], 10); // mdps

var ERogue = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]("ERogue", 10, 100, 10, 800, 10, false, "erogue", [700, 200], 18); // tank

var EWarrior = new _entity_js__WEBPACK_IMPORTED_MODULE_0__["default"]('EWarrior', 10, 100, 10, 1000, 10, false, "ewarrior", [300, 400], 20);

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
    var maxHP = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var ms = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var attackSpeed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var attackDMG = arguments.length > 5 ? arguments[5] : undefined;
    var allied = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
    var img = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "";
    var pos = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [0, 0];
    var defense = arguments.length > 9 ? arguments[9] : undefined;

    _classCallCheck(this, Entity);

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

    this.baseImg; // standard stand image

    this.container;
    this.currentAction;
    this.currentAnimation;
    this.imgCycle = 0;
    this.target;
    this.allies;
    this.enemies;
    this.movingOutTheWay = false;
  }

  _createClass(Entity, [{
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
      this.movingOutTheWay = true;
      clearInterval(this.currentAction);
      clearInterval(this.currentAnimation);
      this.img.src = this.baseImg.src;
      endPos[0] = Math.floor(endPos[0] - this.img.width);
      endPos[1] = Math.floor(endPos[1] - this.img.height * (3 / 4));
      var pos = this.pos;
      var posChange = this.vectorToScalar(endPos);
      console.log("pos change on move", posChange);
      var bigDiv = document.getElementById('game-container');
      var difference = Math.floor((window.innerWidth - bigDiv.offsetWidth) / 2);
      var checker = difference + Math.floor(bigDiv.offsetWidth);
      this.currentAction = setInterval(function () {
        return frame(_this);
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
      console.log(entity.klass, "killed");
      clearInterval(entity.currentAction);
      clearInterval(entity.currentAnimation);
      entity.img.src = entity.baseImg.src;
      entity.hp = -100;
      entity.container.style.display = "none";
    }
  }, {
    key: "animateAttack",
    value: function animateAttack(self) {
      if (self.attackImages) {
        self.imgCycle += 1;
        self.imgCycle = self.imgCycle % 4;
        self.img.src = self.attackImages[self.imgCycle].src;
      }
    }
  }, {
    key: "setHpBars",
    value: function setHpBars(targetChar) {
      var leftBar = document.getElementById("".concat(targetChar.imgName, "-hp-left"));
      var rightBar = document.getElementById("".concat(targetChar.imgName, "-hp-right"));
      var leftWidth = Math.floor(targetChar.hp / targetChar.maxHP * 100);
      var rightWidth = 100 - leftWidth;
      if (leftWidth < 0) leftWidth = 0;
      if (rightWidth < 0) rightWidth = 0;
      leftBar.style.width = leftWidth + '%';
      rightBar.style.width = rightWidth + '%';
    }
  }, {
    key: "setTargetAndAttack",
    value: function setTargetAndAttack() {
      console.log(this.klass, "has finished attacking", this.target.klass);

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
      }

      console.log(this.klass, "is now attacking", this.target.klass);
      this.autoAttack(this.target);
    }
  }, {
    key: "charactersStacked",
    value: function charactersStacked() {
      for (var i = 0; i < this.allies.length; i++) {
        if (!this.allies[i].movingOutTheWay) {
          var widthAddition = Math.floor(this.img.width / 2);

          if (this.pos[0] > this.allies[i].pos[0] - widthAddition - this.range && this.pos[0] < this.allies[i].pos[0] + widthAddition + this.range) {
            var heightAddition = Math.floor((this.img.height / 2 + this.allies[i].img.height / 2) / 2);

            if (this.pos[1] > this.allies[i].pos[1] - heightAddition && this.pos[1] < this.allies[i].pos[1] + heightAddition) {
              console.log(this.klass, "is moving to avoid", this.allies[i].klass);
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
      var _this2 = this;

      // hot code
      var bigDiv = document.getElementById('game-container');
      var difference = Math.floor((window.innerWidth - bigDiv.offsetWidth) / 2);
      var checker = difference + Math.floor(bigDiv.offsetWidth);
      var interval = setInterval(function () {
        return move(_this2);
      }, 20);

      function move(self) {
        if (self.withinAttackRange(self.target)) {
          clearInterval(interval);
          self.autoAttack(self.target);
          console.log('auto attack called from track');
        } else {
          var pos = self.pos;
          var movePos = self.target.pos.slice();
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
      var _this3 = this;

      // make some kind of animation start
      this.clearIntervals();
      this.currentAnimation = setInterval(function () {
        return _this3.animateAttack(_this3);
      }, Math.floor(this.as / 4));
      this.currentAction = setInterval(function () {
        return attack(_this3);
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
          selectedChar.clearIntervals();
          console.log(selectedChar.klass, 'too far from', targetChar.klass, 'during attack - moving to new location');
          selectedChar.trackTarget();
          return; // move to enemy's new location -- needs to track current position
        } else if (selectedChar.charactersStacked()) {
          selectedChar.movingOutTheWay = true;
          var addition = Math.floor((selectedChar.img.width / 2 + targetChar.img.width / 2) / 2);

          if (selectedChar.img.style.transform === "scaleX(-1)") {
            // move to left side of target
            selectedChar.img.style.transform = "scaleX(1)";
            selectedChar.move([targetChar.pos[0] - addition, targetChar.pos[1] + Math.floor(targetChar.img.height / 2)], targetChar);
          } else {
            // move to right side of target;
            selectedChar.img.style.transform = "scaleX(-1)";
            selectedChar.move([targetChar.pos[0] + 3 * addition, targetChar.pos[1] + Math.floor(targetChar.img.height / 2)], targetChar);
          }
        } else {
          targetChar.hp -= selectedChar.dmg;

          if (targetChar.hp > targetChar.maxHP) {
            targetChar.hp = targetChar.maxHP;
          }

          if (!targetChar.allied && selectedChar.allied && targetChar.baseDMG > 0 && selectedChar.defense > targetChar.target.defense) {
            targetChar.target = selectedChar;
            targetChar.clearIntervals();
            targetChar.autoAttack(targetChar.target);
            console.log('enemy is now targetting: ', selectedChar);
          } // hp finalized


          selectedChar.setHpBars(targetChar); // console.log('target hp at: ', targetChar.hp);

          if (targetChar.hp <= 0) {
            // stop the animation
            selectedChar.clearIntervals();
            console.log('attack interval stopped');
            selectedChar.killEntitiy(targetChar);

            if (!selectedChar.allied) {
              // chose another hero to attack
              selectedChar.setTargetAndAttack();
            }
          }

          if (selectedChar.baseDMG > 0) {
            targetChar.img.style.border = "2px solid red";
          } else {
            targetChar.img.style.border = "2px solid green";
          }

          var borderInterval = setInterval(function () {
            targetChar.img.style.border = "none";
            clearInterval(borderInterval);
          }, 500);
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
/* harmony import */ var _screen_controllers_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screen_controllers/controls */ "./src/screen_controllers/controls.js");
/* harmony import */ var _screen_controllers_controls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_screen_controllers_controls__WEBPACK_IMPORTED_MODULE_1__);
// import * as characters from './entities/character';
// import * as enemies from './entities/enemy';


window.addEventListener('load', function () {
  var startGameButton = document.getElementById('start-game-button');
  var controlsButton = document.getElementById('game-controls-button');
  startGameButton.addEventListener('click', function () {
    startGameButton.style.display = "none";
    controlsButton.style.display = 'none';
    Object(_screen_controllers_entity_controller__WEBPACK_IMPORTED_MODULE_0__["default"])();
  });
  controlsButton.addEventListener('click', function () {
    startGameButton.style.display = "none";
    controlsButton.style.display = 'none';
    _screen_controllers_controls__WEBPACK_IMPORTED_MODULE_1___default()();
  });
});

/***/ }),

/***/ "./src/levels/level.js":
/*!*****************************!*\
  !*** ./src/levels/level.js ***!
  \*****************************/
/*! exports provided: levelOne, levelTwo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelOne", function() { return levelOne; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "levelTwo", function() { return levelTwo; });
/* harmony import */ var _entities_character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entities/character */ "./src/entities/character.js");
/* harmony import */ var _entities_enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities/enemy */ "./src/entities/enemy.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var charactersArr = Object.values(_entities_character__WEBPACK_IMPORTED_MODULE_0__);
var enemiesArr = Object.values(_entities_enemy__WEBPACK_IMPORTED_MODULE_1__);

var Level = function Level(name, characterList, enemyList) {
  _classCallCheck(this, Level);

  this.name = name;
  this.characterList = characterList;
  this.enemyList = enemyList;
};

var levelOne = new Level('one', charactersArr, enemiesArr);
var levelTwo = new Level('two', charactersArr, enemiesArr);

/***/ }),

/***/ "./src/screen_controllers/controls.js":
/*!********************************************!*\
  !*** ./src/screen_controllers/controls.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



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

var levels = Object.values(_levels_level__WEBPACK_IMPORTED_MODULE_0__);
var currentLevel = levels[0];
var selectedChar;
var livingEnemies = {};
var livingChars = {};

function addDeathListener(entity) {
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
      // console.log(entity.klass, 'style changed');
      // console.log(mutationRecord);
      if (mutationRecord.target.style.display === 'none') {
        console.log(entity.klass, 'style === none');

        if (entity.allied) {
          delete livingChars[entity.klass];
        } else {
          delete livingEnemies[entity.klass];
        }

        var c = Object.values(livingChars);
        var en = Object.values(livingEnemies);

        if (c.length === 0 || en.length === 0) {
          endGame(c, en);
        }
      }
    });
  });
  var element = entity.container;
  observer.observe(element, {
    attributes: true,
    attributeFilter: ['style']
  });
}

function endGame(charsList, enemyList) {
  for (var i = 0; i < charsList.length; i++) {
    // fade out no action
    fadeOut(charsList[i].container);
  }

  for (var _i = 0; _i < enemyList.length; _i++) {
    // fade out no action
    fadeOut(enemyList[_i].container);
  }

  var gameFadeTimer = setInterval(function () {
    console.log('fade called');
    var disp;

    if (charsList.length === 0) {
      disp = document.getElementById('game-over-display');
    } else {
      disp = document.getElementById('game-won-display');
    }

    disp.style.opacity = 0;
    disp.style.display = '';

    var action = function action() {
      return fadeOut(disp);
    };

    fadeIn(disp, action);
    clearInterval(gameFadeTimer);
  }, 2000);
}

function spawnEntity(entity, allies, enemies) {
  if (entity.imgName != "") {
    addInlineStyle(entity);

    var action = function action() {
      if (entity.allied) {
        addDeathListener(entity);
        entity.container.addEventListener("click", function (e) {
          console.log('character click');

          if (!selectedChar || selectedChar.hp < 0) {
            selectedChar = entity;
            console.log('selected char: ', selectedChar.klass);
          } else if (selectedChar.baseDMG < 0) {
            selectedChar.autoAttack(entity);
            selectedChar = null;
          }

          e.stopPropagation();
        });
      } else {
        entity.container.addEventListener("click", function (e) {
          if (selectedChar.hp < 0) {
            selectedChar = null;
            return;
          }

          console.log('enemy click');

          if (selectedChar && selectedChar.allied && selectedChar.baseDMG > 0) {
            selectedChar.autoAttack(entity);
            selectedChar = null;
          }

          e.stopPropagation(); // maybe move inside if
        });
      }

      entity.enemies = enemies;
      var cloneArr = allies.slice();
      var selfIndex;

      for (var i = 0; i < cloneArr.length; i++) {
        if (cloneArr[i].klass === entity.klass) {
          selfIndex = i;
        }
      } // remove self from allies list to prevent moving out of self image (healers excluded)


      if (entity.baseDMG > 0) {
        cloneArr.splice(selfIndex, 1);
      }

      entity.allies = cloneArr;

      if (!entity.allied) {
        entity.autoAttack(entity.target);
      }
    };

    fadeIn(entity.container, action);
  } else {
    console.log('broken image passed in for', entity.klass);
  }
}

function setInitialTargets(chars, enemies) {
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].baseDMG > 0) {
      var targetIndex = Math.floor(Math.random() * chars.length);
      enemies[i].target = chars[targetIndex];
    } else {
      var _targetIndex = Math.floor(Math.random() * enemies.length);

      enemies[i].target = enemies[_targetIndex];
    }

    console.log(enemies[i].klass, "has target set to", enemies[i].target);
  }
}

function addInlineStyle(entity) {
  entity.img = document.getElementsByClassName(entity.imgName + "-image-display")[0];
  entity.baseImg = document.getElementsByClassName(entity.imgName)[0];
  entity.img.src = entity.baseImg.src;
  entity.attackImages = document.getElementsByClassName(entity.imgName);
  var hpBar = document.getElementById("".concat(entity.imgName, "-hp-bar"));
  entity.container = document.getElementById("".concat(entity.imgName, "-display"));
  entity.container.style.opacity = 0; // fading in so started at op 0

  entity.img.style.display = "";
  hpBar.style.display = "flex";
  entity.container.style.left = entity.pos[0] + "px";
  entity.container.style.top = entity.pos[1] + "px";
}

function setupEntities(charactersArr, enemiesArr) {
  for (var i = 0; i < charactersArr.length; i++) {
    livingChars[charactersArr[i].klass] = charactersArr[i];
    spawnEntity(charactersArr[i], charactersArr, enemiesArr);
  }

  for (var _i2 = 0; _i2 < enemiesArr.length; _i2++) {
    livingEnemies[enemiesArr[_i2].klass] = enemiesArr[_i2];
    spawnEntity(enemiesArr[_i2], enemiesArr, charactersArr);
  }
}

function initializeGameOpening() {
  var deSelectButton = document.getElementById('reset-selected');
  deSelectButton.style.display = '';
  loadLevel(currentLevel);
}

function fadeOut(element) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var op = 20;
  var timerDown = setInterval(function () {
    if (op <= 0) {
      clearInterval(timerDown);
      element.style.display = 'none';

      if (level) {
        beginLevel(level.characterList, level.enemyList);
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

function loadLevel(level) {
  var levelNameDisp = document.getElementById("level-".concat(level.name, "-name"));
  levelNameDisp.style.opacity = 0;
  levelNameDisp.style.display = '';

  var action = function action() {
    return fadeOut(levelNameDisp, level);
  };

  fadeIn(levelNameDisp, action);
}

function beginLevel(charactersArr, enemiesArr) {
  console.log('load game called');
  setInitialTargets(charactersArr, enemiesArr);
  var deSelectButton = document.getElementById('reset-selected');
  deSelectButton.addEventListener('click', function () {
    selectedChar = null;
  });
  setupEntities(charactersArr, enemiesArr); // end click position

  var gameContainer = document.getElementById('game-container');
  gameContainer.addEventListener("click", function (e) {
    console.log(e);

    if (selectedChar) {
      if (selectedChar.hp < 0) {
        selectedChar = null;
        return;
      }

      selectedChar.move([e.x, e.y]);
      selectedChar = null;
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (initializeGameOpening);

/***/ })

/******/ });
//# sourceMappingURL=main.js.map