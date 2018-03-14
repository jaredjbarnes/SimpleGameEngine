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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_createGuid__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_invokeMethod__ = __webpack_require__(5);
﻿


class Entity {
    constructor() {
        this._delegate = null;
        this._components = {};
        this.id = Object(__WEBPACK_IMPORTED_MODULE_0__utilities_createGuid__["a" /* default */])();
        this.type = null;
    }

    setDelegate(delegate) {
        this._delegate = delegate;
    }

    addComponent(component) {
        var type = component.type;
        var components = this._components;
        var delegate = this._delegate;

        if (typeof type !== "string") {
            throw new Error("Components need to have a type property.");
        }

        components[type] = component;

        if (delegate != null) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utilities_invokeMethod__["a" /* default */])(delegate, "componentAdded", [this, component]);
        }
    }

    removeComponent(component) {
        var type = component.type;
        var components = this._components;
        var delegate = this._delegate;

        if (typeof type !== "string") {
            throw new Error("Components need to have a type property.");
        }

        if (components[type] === component) {

            components[component.type] = null;

            if (delegate != null) {
                Object(__WEBPACK_IMPORTED_MODULE_1__utilities_invokeMethod__["a" /* default */])(delegate, "componentRemoved", [this, component]);
            }
        }

    }

    removeComponentByType(type) {
        const component = components[type];

        if (component != null) {
            this.removeComponent(component);
        }
    }

    getComponent(type) {
        return this._components[type] || null;
    }

    getComponents() {
        var keys = Object.keys(this._components);

        return keys.map((key) => {
            return this._components[key];
        });
    }

    hasComponent(type) {
        return this.getComponent(type) != null;
    }

    hasComponents(componentTypes) {
        var components = this._components;
        return componentTypes.every((type) => {
            return components[type] != null;
        })
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Transform {
    constructor() {
        this.type = "transform";
        this.isDirty = true;
        this.rotation = 0;

        this.position = {
            x: 0,
            y: 0
        };

        this.size = {
            width: 0,
            height: 0
        }

        this.origin = {
            x: 0,
            y: 0
        };

        this.boundingRect = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Transform;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class Collidable {
    constructor() {
        this.type = "collidable";
        this.name = null;
        this.collisions = {};
        this.cellPositions = [];
        this.lastCellPositions = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Collidable;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const stringify = (obj) => {
    if (typeof obj === "object" && obj != null) {
        let result = "";
        for (let x in obj) {
            if (typeof obj[x] === "object" && obj[x] != null) {
                result += `${stringify(obj[x])}`;
            } else {
                result += `${x}:${obj[x]},`;
            }
        }
        return `{${result}}`;
    }
    return null;
};

/* unused harmony default export */ var _unused_webpack_default_export = (stringify);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SolidBody {
    constructor() {
        this.type = "solid-body";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SolidBody;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((obj, methodName, args) => {
    args = Array.isArray(args)? args: [];
   if (obj != null && typeof obj[methodName] === "function"){
       return obj[methodName].apply(obj, args);
   }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// These are just static method helpers to help reduce GC. When 
// we used it as a class it caused lots of churn.

// A gotcha because of the optionVector is if the optionalVector is the 
// same as another passed through could produce undefined behavior.
// So be careful changing these functions.
class Vector {

    static add(vectorA, vectorB, optionalVector = {}) {
        optionalVector.x = vectorA.x + vectorB.x;
        optionalVector.y = vectorA.y + vectorB.y;

        return optionalVector;
    }

    static subtract(vectorA, vectorB, optionalVector = {}) {
        optionalVector.x = vectorA.x - vectorB.x;
        optionalVector.y = vectorA.y - vectorB.y;

        return optionalVector;
    }

    static multiply(vectorA, vectorB, optionalVector = {}) {
        optionalVector.x = vectorA.x * vectorB.x;
        optionalVector.y = vectorA.y * vectorB.y;

        return optionalVector;
    }

    static divide(vectorA, vectorB, optionalVector = {}) {
        optionalVector.x = vectorA.x / vectorB.x;
        optionalVector.y = vectorA.y / vectorB.y;

        return optionalVector;
    }

    static scale(vector, scale, optionalVector = {}) {
        optionalVector.x = scale * vector.x;
        optionalVector.y = scale * vector.y;

        return optionalVector;
    }

    static project(vectorA, vectorB, optionalVector = {}) {
        var scale;

        var firstDot = Vector.dot(vectorA, vectorB);
        var secondDot = Vector.dot(vectorB, vectorB);

        if (!firstDot || !secondDot) {
            scale = 0;
        } else {
            scale = firstDot / secondDot;
        }

        return Vector.scale(vectorB, scale, optionalVector);
    }

    static getLeftNormal(vector, optionalVector = {}) {
        optionalVector.x = -vector.y;
        optionalVector.y = vector.x;

        return optionalVector;
    }

    static getRightNormal(vector, optionalVector = {}) {
        optionalVector.x = vector.y;
        optionalVector.y = -vector.x;

        return optionalVector;
    }

    static magnitude(vector) {
        return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    }

    static dot(vectorA, vectorB) {
        return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
    }

    static negate(vector) {
        return { x: -vector.x, y: -vector.y };
    }

    static rotate(vector, angle, optionalVector = {}) {
        const radians = angle * Math.PI / 180;
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        const x = vector.x;
        const y = vector.y;

        // The multiplying and dividing is to limit the floating point.
        optionalVector.x = Math.round(1000 * (x * cos - y * sin)) / 1000;
        optionalVector.y = Math.round(1000 * (x * sin + y * cos)) / 1000;

        return optionalVector;
    }

    static normalize(vector, optionalVector = {}) {

        var magnitude = Vector.magnitude(vector);

        if (magnitude === 0) {
            optionalVector.x = 0;
            optionalVector.y = 0;
        }

        optionalVector.x = vector.x / magnitude;
        optionalVector.y = vector.y / magnitude;

        return optionalVector;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Text {
    constructor() {
        this.type = "text";
        this.font = {
            size: 12,
            style: "normal",
            family: "arial",
            weight: "normal",
            baseline: "top",
            variant: "normal",
            color: {
                red: 0,
                green: 0,
                blue: 0,
                alpha: 1
            }
        };

        this.text = "";
        this.verticalAlignment = "top";
        this.horizontalAlignment = "left";
        this.width = 0;
        this.height = 0;
        this.lineHeight = 0;
        this.opacity = 1;
        this.zIndex = 0;
        this.isDirty = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Text;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class KeyboardController {
    constructor() {
        this.type = "keyboard-controller";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyboardController;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class Shape {
    constructor() {
        this.type = "shape";

        this.fillColor = {
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1
        };

        this.border = {
            thickness: 0,
            color: {
                red: 0,
                green: 0,
                blue: 0,
                alpha: 1
            }
        };

        this.points = [];
        this.path = null;
        this.opacity = 1;
        this.zIndex = 0;
        this.isDirty = true;

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Shape;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Part {
    constructor() {
        this.points = [];
        this.vertices = [];
        this.normals = [];
        this.worldPoints = [];
        this.projectionVertices = [];
        this.origin = { x: 0, y: 0 };
        this.size = { width: 0, height: 0 };
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Part;


class NarrowPhaseCollidable {
    constructor() {
        this.type = "narrow-phase-collidable";
        this.name = null;
        this.isPrepared = false;
        this.isEnabled = true;
        this.collisions = {};
        this.parts = [];
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = NarrowPhaseCollidable;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_World__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_entities_Camera__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_systems_BroadPhaseCollisionSystem__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_systems_DynamicLoadingSystem__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_systems_DefaultCameraSystem__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_systems_ControllerSystem__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_systems_KeyboardInputSystem__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_systems_MovementSystem__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__entities_Text__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__entities_StaticText__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_components_KeyboardController__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_systems_FollowEntityCameraSystem__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_systems_NarrowPhaseCollisionSystem__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_systems_SolidBodySystem__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_components_SolidBody__ = __webpack_require__(4);














// import CursorEventSystem from "./../../../../src/systems/CursorEventSystem";
// import CursorSystem from "./../../../../src/systems/CursorSystem";


const getRandomNumber = (min, max) => {
    const range = max - min;
    const value = Math.random() * range;

    return parseInt(value + min, 10);
}

const getRandomRgba = () => {
    return {
        red: getRandomNumber(0, 255),
        green: getRandomNumber(0, 255),
        blue: getRandomNumber(0, 255),
        alpha: 1
    };
}

const cameraName = "main";
const canvas = document.getElementById("viewport");
const world = new __WEBPACK_IMPORTED_MODULE_0__src_World__["a" /* default */]();

// Entities
const camera = new __WEBPACK_IMPORTED_MODULE_1__src_entities_Camera__["a" /* default */](cameraName);
const player = new __WEBPACK_IMPORTED_MODULE_8__entities_Text__["a" /* default */]("P");

// Systems
const controllerSystem = new __WEBPACK_IMPORTED_MODULE_5__src_systems_ControllerSystem__["a" /* default */]();
const keyboardInputSystem = new __WEBPACK_IMPORTED_MODULE_6__src_systems_KeyboardInputSystem__["a" /* default */]();
const movableSystem = new __WEBPACK_IMPORTED_MODULE_7__src_systems_MovementSystem__["a" /* default */]();
const followEntityCameraSystem = new __WEBPACK_IMPORTED_MODULE_11__src_systems_FollowEntityCameraSystem__["a" /* default */]();
const solidBodySystem = new __WEBPACK_IMPORTED_MODULE_13__src_systems_SolidBodySystem__["a" /* default */]();
const broadPhaseCollisionSystem = new __WEBPACK_IMPORTED_MODULE_2__src_systems_BroadPhaseCollisionSystem__["a" /* default */]();
const narrowPhaseCollisionSystem = new __WEBPACK_IMPORTED_MODULE_12__src_systems_NarrowPhaseCollisionSystem__["a" /* default */]();
//const cursorSystem = new CursorSystem({canvas, cameraName, document});
//const cursorEventSystem = new CursorEventSystem();

followEntityCameraSystem.camera = camera;
followEntityCameraSystem.setEntityToFollow(player);

const dynamicLoadingSystem = new __WEBPACK_IMPORTED_MODULE_3__src_systems_DynamicLoadingSystem__["a" /* default */]({
    cameraName: cameraName,
    cellSize: 300
});

const defaultCameraSystem = new __WEBPACK_IMPORTED_MODULE_4__src_systems_DefaultCameraSystem__["a" /* default */]({
    canvas,
    cameraName
});

// Set up world
//world.addSystem(cursorSystem);
//world.addSystem(cursorEventSystem);
world.addSystem(dynamicLoadingSystem);
world.addSystem(solidBodySystem);
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(movableSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(defaultCameraSystem);

// Add Entities
world.addEntity(camera);
world.addEntity(player);

for (let x = 0; x < 3000; x++) {
    const entity = new __WEBPACK_IMPORTED_MODULE_9__entities_StaticText__["a" /* default */](x, {
        x: getRandomNumber(-3000, 3000),
        y: getRandomNumber(-3000, 3000)
    }, getRandomRgba());

    world.addEntity(entity);
}

world.play();

window.world = world;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__ = __webpack_require__(5);
﻿

class World {
    constructor(size) {
        var self = this;

        size = size || {
            width: 1000,
            height: 1000
        };

        this._entityDelegate = {
            componentAdded: function () {
                var args = Array.prototype.slice.call(arguments, 0);
                self.notifySystems("componentAdded", args);
            },
            componentRemoved: function () {
                var args = Array.prototype.slice.call(arguments, 0);
                self.notifySystems("componentRemoved", args);
            }
        };

        this._animationFrame = null;
        this._startTime = 0;
        this._timespans = [];
        this._systems = [];
        this._entities = [];
        this._entitiesById = {};
        this._services = new Map();

        this.isRunning = false;
        this.size = size;
        this._loop = this._loop.bind(this);


    }

    _loop() {
        this.update();
        this._animationFrame = requestAnimationFrame(this._loop);
    }

    notifySystems(methodName, args) {
        args = args || [];

        var self = this;
        var systems = this._systems;

        systems.forEach(function (system) {
            Object(__WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__["a" /* default */])(system, methodName, args);
        });
    }

    addSystem(system) {
        var systems = this._systems;
        var index = systems.indexOf(system);

        if (index === -1) {
            systems.push(system);
            Object(__WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__["a" /* default */])(system, "activated", [this]);
            Object(__WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__["a" /* default */])(system, "systemAdded", [system]);
        }
    }

    addService(name, service) {
        this._services.set(name, service);
        this.notifySystems("serviceAdded", [name, service]);
    }

    getService(name) {
        return this._services.get(name) || null;
    }

    removeService(name) {
        var service = this._services.get(service);

        this._services.delete(name);
        this.notifySystems("serviceRemoved", [name, service]);
    }

    removeSystem(system) {
        var systems = this._systems;
        var index = systems.indexOf(system);

        if (index > -1) {
            systems.splice(index, 1);
            Object(__WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__["a" /* default */])(system, "deactivated", [this]);
            Object(__WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__["a" /* default */])(system, "systemRemoved", [system]);

        }
    }

    addEntity(entity) {
        var entities = this._entities;
        var entitiesById = this._entitiesById;
        var registeredEntity = entitiesById[entity.id];

        if (registeredEntity == null) {
            entitiesById[entity.id] = entity;
            entities.push(entity);
            entity.setDelegate(this._entityDelegate);
            this.notifySystems("entityAdded", [entity]);
        }

    }

    removeEntity(entity) {
        var entities = this._entities;
        var entitiesById = this._entitiesById;
        var registeredEntity = entitiesById[entity.id];
        var index;

        if (registeredEntity != null) {
            delete entitiesById[entity.id];
            index = entities.indexOf(entity);
            entities.splice(index, 1);
            entity.setDelegate(null);
            this.notifySystems("entityRemoved", [entity]);
        }
    }

    update() {
        var self = this;
        var systems = this._systems;

        this.notifySystems("beforeUpdate", [this.getTime()]);
        this.notifySystems("update", [this.getTime()]);
        this.notifySystems("afterUpdate", [this.getTime()]);
        
    }

    play() {
        if (!this.isRunning) {
            this.isRunning = true;
            this._startTime = performance.now();
            this._loop();

            this.notifySystems("onPlay");
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this._timespans.push(performance.now() - this._startTime);
            cancelAnimationFrame(this._animationFrame);

            this.notifySystems("onPause");
        }
    }

    getTime() {
        var time = this._timespans.reduce(function (accumulator, value) {
            return accumulator + value;
        }, 0);

        if (this.isRunning) {
            time += performance.now() - this._startTime;
        }

        return time;
    }

    getEntities() {
        return this._entities.slice(0);
    }

    getEntitiesByFilter(filter) {
        return this._entities.filter(filter);
    }

    getEntityById(id) {
        var _id = id;
        return this._entitiesById[_id] || null;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = World;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Camera__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Collidable__ = __webpack_require__(2);
﻿




class Camera extends __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */] {
    constructor(name, { width = 300, height = 300 } = {}) {
        super();

        const camera = new __WEBPACK_IMPORTED_MODULE_1__components_Camera__["a" /* default */]();
        camera.name = name || null;

        const transform = new __WEBPACK_IMPORTED_MODULE_2__components_Transform__["a" /* default */]();
        const collidable = new __WEBPACK_IMPORTED_MODULE_3__components_Collidable__["a" /* default */]();

        transform.size.width = width;
        transform.size.height = height;

        this.id = `camera_${this.id}`;
        this.addComponent(camera);
        this.addComponent(transform);
        this.addComponent(collidable);

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var S4 = function () {
    return Math.floor(
        Math.random() * 0x10000 /* 65536 */
    ).toString(16);
};

/* harmony default export */ __webpack_exports__["a"] = (() => {
    return (
        S4() + S4() + "-" +
        S4() + "-" +
        S4() + "-" +
        S4() + "-" +
        S4() + S4() + S4()
    );
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class Camera {
    constructor() {
        this.type = "camera";
        this.name = null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BroadPhaseCollisionData__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Vector__ = __webpack_require__(6);
﻿



class CellPosition {
    constructor(columnIndex, rowIndex) {
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
    }
}

class Collision {
    constructor(entityId = null) {
        this.entityId = entityId;
        this.timestamp = 0;
        this.cellPosition = null;
        this.intersection = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };
    }
}

class CollidableEntity {
    constructor(entityId) {
        this.id = entityId;
        this.transform = null;
        this.collidable = null;
    }
}

class BroadPhaseCollisionSystem {
    constructor(cellSize = 200) {
        this.cellSize = cellSize;
        this.collidableEntities = [];
        this.collidableEntitiesById = {};
        this.world = null;
        this.currentTime = 0;
        this.grid = {};
        this.dirtyCellPositions = [];
        this.dependencies = ["transform", "collidable"];
        this.name = "Broad Phase Collision System";
        this.intersection = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        this.availableCollisions = [];
        this.broadPhaseCollisionDataEntity = new __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */]();
        this.broadPhaseCollisionDataComponent = new __WEBPACK_IMPORTED_MODULE_1__components_BroadPhaseCollisionData__["a" /* default */]();
        this.broadPhaseCollisionDataComponent.cellSize = cellSize;
        this.broadPhaseCollisionDataComponent.grid = this.grid;
        this.broadPhaseCollisionDataEntity.addComponent(this.broadPhaseCollisionDataComponent);

    }

    addEntityToCellPosition(_collidableEntity, _cellPosition) {
        const collidableEntity = _collidableEntity;
        const cellPosition = _cellPosition;
        const cell = this.getCell(cellPosition);
        const index = cell.indexOf(collidableEntity);

        if (index === -1) {
            cell.push(collidableEntity);
        }
    }

    addEntityToCellPositions(_collidableEntity, _cellPositions) {
        const collidableEntity = _collidableEntity;
        const cellPositions = _cellPositions;

        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            this.addEntityToCellPosition(collidableEntity, cellPosition);
        }

        this.addCellPositionsToDirtyCellPositions(cellPositions);
    }

    addCellPositionsToDirtyCellPositions(_cellPositions) {
        const cellPositions = _cellPositions;
        const dirtyCellPositions = this.dirtyCellPositions;

        for (let x = 0; x < cellPositions.length; x++) {
            let isIn = false;
            for (let y = 0; y < dirtyCellPositions.length; y++) {
                if (cellPositions[x].rowIndex === dirtyCellPositions[y].rowIndex &&
                    cellPositions[x].columnIndex === dirtyCellPositions[y].columnIndex) {
                    isIn = true;
                    break;
                }
            }

            if (!isIn) {
                dirtyCellPositions.push(cellPositions[x]);
            }
        }

    }

    createCollision(id) {
        if (this.availableCollisions.length > 0) {
            let collision = this.availableCollisions.pop();
            collision.id = id;
            collision.timestamp = 0;
            collision.cellPosition = null;
            collision.intersection = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            };
        }
        return new Collision(id);
    }

    findDirtyCells() {
        const dirtyEntities = [];
        const collidableEntities = this.collidableEntities;

        for (let x = 0; x < collidableEntities.length; x++) {
            const collidableEntity = collidableEntities[x];
            const transform = collidableEntity.transform;

            if (transform.isDirty) {
                dirtyEntities.push(collidableEntity);
            }
        }

        for (let x = 0; x < dirtyEntities.length; x++) {
            const dirtyEntity = dirtyEntities[x];
            const collisions = dirtyEntity.collidable.collisions;

            this.updateBoundingRect(dirtyEntity.transform);

            let lastCellPositions = dirtyEntity.collidable.cellPositions;
            let newCellPositions = this.getCellPositions(dirtyEntity);

            this.removeEntityFromCellPositions(dirtyEntity, lastCellPositions);
            this.addEntityToCellPositions(dirtyEntity, newCellPositions);

            dirtyEntity.collidable.cellPositions = newCellPositions;
            dirtyEntity.collidable.lastCellPositions = lastCellPositions;

            for (let y in collisions) {
                const collision = collisions[y];
                const otherCollidableEntity = this.collidableEntitiesById[y];

                this.releaseCollision(collision);

                if (otherCollidableEntity) {
                    this.releaseCollision(otherCollidableEntity.collidable.collisions[dirtyEntity.id]);
                    delete otherCollidableEntity.collidable.collisions[dirtyEntity.id];
                }


            }

            dirtyEntity.collidable.collisions = {};
        }

        this.dirtyEntities = dirtyEntities;
    }

    getCell({ rowIndex, columnIndex }) {
        const key = `${columnIndex}_${rowIndex}`;
        let cell = this.grid[key];

        if (cell == null) {
            cell = this.grid[key] = [];
        }

        return cell;
    }

    getCellPositions({ transform: { boundingRect } }) {
        const top = boundingRect.top;
        const left = boundingRect.left;
        const right = boundingRect.right;
        const bottom = boundingRect.bottom;
        const cellSize = this.cellSize;

        const topCell = Math.floor(top / cellSize);
        const bottomCell = Math.floor(bottom / cellSize);
        const leftCell = Math.floor(left / cellSize);
        const rightCell = Math.floor(right / cellSize);

        let row = topCell;
        let column = leftCell;

        let cellPositions = [];

        while (row <= bottomCell) {
            while (column <= rightCell) {
                cellPositions.push(new CellPosition(column, row));
                column += 1;
            }
            column = leftCell;
            row += 1;
        }

        return cellPositions;
    }

    getIntersection({ transform: { boundingRect: boundingRectA } }, { transform: { boundingRect: boundingRectB } }) {
        const top = Math.max(boundingRectA.top, boundingRectB.top);
        const bottom = Math.min(boundingRectA.bottom, boundingRectB.bottom);
        const left = Math.max(boundingRectA.left, boundingRectB.left);
        const right = Math.min(boundingRectA.right, boundingRectB.right);

        if (top < bottom && left < right) {
            this.intersection.top = top;
            this.intersection.left = left;
            this.intersection.right = right;
            this.intersection.bottom = bottom;

            return this.intersection;
        }

        return null;
    }

    releaseCollision(collision) {
        if (collision != null) {
            this.availableCollisions.push(collision);
        }
    }

    removeCell({ columnIndex, rowIndex }) {
        if (this.grid[`${columnIndex}_${rowIndex}`]) {
            delete this.grid[`${columnIndex}_${rowIndex}`];
        }
    }

    removeEntityFromCellPositions(_collidableEntity, _cellPositions) {
        const collidableEntity = _collidableEntity;
        const cellPositions = _cellPositions;


        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            const cell = this.getCell(cellPosition);

            if (cell != null) {
                const index = cell.indexOf(collidableEntity);

                if (index > -1) {
                    cell.splice(index, 1);
                    if (cell.length === 0) {
                        this.removeCell(cellPosition);
                    }
                }
            }
        }

        this.addCellPositionsToDirtyCellPositions(cellPositions);

    }

    updateGridCells(_cellPositions) {
        const cellPositions = _cellPositions;

        for (let index = 0; index < cellPositions.length; index++) {
            const cellPosition = cellPositions[index];
            const cell = this.getCell(cellPosition);

            // Add collision data to the entities.
            for (let y = 0; y < cell.length; y++) {
                const collidableEntity = cell[y];
                const collisions = collidableEntity.collidable.collisions;
                const index = y;

                for (let x = index + 1; x < cell.length; x++) {
                    const otherCollidableEntity = cell[x];
                    const otherCollisions = otherCollidableEntity.collidable.collisions;

                    if ((otherCollisions[collidableEntity.id] && otherCollisions[collidableEntity.id].timestamp === this.currentTime)) {
                        continue;
                    }

                    const intersection = this.getIntersection(collidableEntity, otherCollidableEntity);

                    if (intersection != null) {

                        let collision = this.createCollision(collidableEntity.id);
                        collision.timestamp = this.currentTime;
                        collision.intersection.top = intersection.top;
                        collision.intersection.left = intersection.left;
                        collision.intersection.right = intersection.right;
                        collision.intersection.bottom = intersection.bottom;
                        collision.cellPosition = cellPosition;

                        let otherCollision = this.createCollision(otherCollidableEntity.id);
                        otherCollision.timestamp = this.currentTime;
                        otherCollision.intersection.top = intersection.top;
                        otherCollision.intersection.left = intersection.left;
                        otherCollision.intersection.right = intersection.right;
                        otherCollision.intersection.bottom = intersection.bottom;
                        otherCollision.cellPosition = cellPosition;

                        otherCollisions[collidableEntity.id] = collision;
                        collisions[otherCollidableEntity.id] = otherCollision;

                    }

                }

            }
        }

    }

    updateBoundingRect({ size, position, origin, rotation, boundingRect }) {
        const cornerOne = __WEBPACK_IMPORTED_MODULE_2__Vector__["a" /* default */].rotate({ x: 0, y: 0 }, rotation);
        const cornerTwo = __WEBPACK_IMPORTED_MODULE_2__Vector__["a" /* default */].rotate({ x: size.width, y: 0 }, rotation);
        const cornerThree = __WEBPACK_IMPORTED_MODULE_2__Vector__["a" /* default */].rotate({ x: size.width, y: size.height }, rotation);
        const cornerFour = __WEBPACK_IMPORTED_MODULE_2__Vector__["a" /* default */].rotate({ x: 0, y: size.height }, rotation);

        const top = Math.min(cornerOne.y, cornerTwo.y, cornerThree.y, cornerFour.y);
        const bottom = Math.max(cornerOne.y, cornerTwo.y, cornerThree.y, cornerFour.y);
        const left = Math.min(cornerOne.x, cornerTwo.x, cornerThree.x, cornerFour.x);
        const right = Math.max(cornerOne.x, cornerTwo.x, cornerThree.x, cornerFour.x);

        boundingRect.top = top + position.y - origin.y;
        boundingRect.bottom = bottom + position.y - origin.y;
        boundingRect.left = left + position.x - origin.x;
        boundingRect.right = right + position.x - origin.x;
    }

    /******************************************************************/
    /*                    System Life Cycle Hooks                     */
    /******************************************************************/

    activated(_world) {
        const world = _world;
        this.world = world

        world.getEntities().forEach((_entity) => {
            const entity = _entity;
            this.entityAdded(entity)
        });

        world.addEntity(this.broadPhaseCollisionDataEntity);
    }

    afterUpdate(currentTime) {
        for (let x = 0; x < this.dirtyEntities.length; x++) {
            this.dirtyEntities[x].transform.isDirty = false;
        }
        this.dirtyCellPositions = [];
    }

    componentAdded(_entity, _component) {
        const entity = _entity;
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (this.dependencies.indexOf(component.type) > -1) {
            this.entityRemoved(entity);
        }
    }

    deactivated(_world) {
        const world = _world;
        this.world = null;
        this.collidableEntities = [];
        this.collidableEntitiesById = {};
        this.currentTime = 0;
        this.grid = {};
    }

    entityAdded(_entity) {
        const entity = _entity;
        if (entity.hasComponents(this.dependencies) && this.collidableEntitiesById[entity.id] == null) {
            const collidableEntity = new CollidableEntity(entity.id);
            collidableEntity.transform = entity.getComponent("transform");
            collidableEntity.collidable = entity.getComponent("collidable");

            this.collidableEntities.push(collidableEntity);
            this.collidableEntitiesById[collidableEntity.id] = collidableEntity;

            let cellPositions = this.getCellPositions(collidableEntity);
            this.addEntityToCellPositions(collidableEntity, cellPositions);

            collidableEntity.collidable.cellPositions = cellPositions;
        }
    }

    entityRemoved(_entity) {
        const entity = _entity;
        const collidableEntity = this.collidableEntitiesById[entity.id];

        if (collidableEntity != null) {
            const index = this.collidableEntities.findIndex(e => e.id === entity.id);
            for (let key in collidableEntity.collidable.collisions) {
                this.releaseCollision(collidableEntity.collidable.collisions[key]);
            }
            let cellPositions = collidableEntity.collidable.cellPositions;
            this.removeEntityFromCellPositions(collidableEntity, cellPositions);
            this.collidableEntities.splice(index, 1);
            delete this.collidableEntitiesById[collidableEntity.id];
        }
    }

    update(currentTime) {
        this.currentTime = currentTime;
        this.findDirtyCells();
        this.updateGridCells(this.dirtyCellPositions);
        this.broadPhaseCollisionDataComponent.dirtyCellPositions = this.dirtyCellPositions;
        this.broadPhaseCollisionDataComponent.dirtyEntities = this.dirtyEntities;
    }


}
/* harmony export (immutable) */ __webpack_exports__["a"] = BroadPhaseCollisionSystem;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BroadPhaseCollisionData {
    constructor() {
        this.type = "broad-phase-collision-data";
        this.collidableEntitiesById = {};
        this.dirtyCellPositions = [];
        this.grid = null;
        this.cellSize = 0;
        this.dirtyEntities = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BroadPhaseCollisionData;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities_DynamicLoadingCell__ = __webpack_require__(19);


class Cell {
    constructor({ column, row, cellSize }) {
        this.rowIndex = row;
        this.columnIndex = column;
        this.entity = new __WEBPACK_IMPORTED_MODULE_0__entities_DynamicLoadingCell__["a" /* default */]({ x: column * cellSize, y: row * cellSize }, cellSize);
        this.transform = this.entity.getComponent("transform");
        this.transform.position.x = column * cellSize;
        this.transform.position.y = row * cellSize;
        this.position = this.transform.position;
        this.size = this.transform.size;
    }
}

class DynamicLoadingSystem {
    constructor({ cellSize, cameraName } = { cellSize: 1000, cameraName: null }) {
        this.world = null;
        this.cameraName = cameraName;
        this.cells = [];
        this.cellPositions = [];
        this.cellSize = cellSize;
        this.camera = {
            position: null,
            size: null,
            collidable: null
        };

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                const row = y - 1;
                const column = x - 1;
                const index = (y * 3) + x;

                this.cellPositions.push({ columnIndex: column, rowIndex: row });
                this.cells.push(new Cell({ column, row, cellSize }));
            }
        }

    }

    _addCamera(entity) {
        const transform = entity.getComponent("transform");
        this.camera.position = transform.position;
        this.camera.size = transform.size;
        this.camera.collidable = entity.getComponent("collidable");
    }

    _findCellPositionsWithCenter(x, y) {
        const centerColumn = Math.floor(x / this.cellSize);
        const centerRow = Math.floor(y / this.cellSize);

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                const row = centerRow + y - 1;
                const column = centerColumn + x - 1;
                const index = (y * 3) + x;
                const cellPosition = this.cellPositions[index];

                cellPosition.rowIndex = row;
                cellPosition.columnIndex = column;
            }
        }
    }

    _isCamera(entity) {
        return (
            entity.hasComponents(["camera", "transform", "collidable"]) &&
            entity.getComponent("camera").name === this.cameraName
        );
    }

    _hasCamera() {
        return this.camera.position != null &&
            this.camera.size != null &&
            this.camera.collidable != null;
    }

    _removeCamera() {
        this.camera.position = null;
        this.camera.size = null;
        this.camera.collidable = null;
    }

    _reset() {
        this._removeCamera();
    }

    _updateCells() {
        const cameraCenterX = this.camera.position.x + (this.camera.size.width / 2);
        const cameraCenterY = this.camera.position.y + (this.camera.size.height / 2);

        this._findCellPositionsWithCenter(cameraCenterX, cameraCenterY);

        const availableCanvasCells = [];

        for (let x = 0; x < this.cells.length; x++) {
            let cell = this.cells[x];

            let index = this.cellPositions.findIndex((cellPosition) => {
                return cell.columnIndex === cellPosition.columnIndex &&
                    cell.rowIndex === cellPosition.rowIndex;
            });

            if (index === -1) {
                availableCanvasCells.push(cell);
            }
        }

        for (let x = 0; x < this.cellPositions.length; x++) {
            const cellPosition = this.cellPositions[x];

            let index = this.cells.findIndex((cell) => {
                return cell.columnIndex === cellPosition.columnIndex &&
                    cell.rowIndex === cellPosition.rowIndex;
            });

            if (index === -1) {
                const cell = availableCanvasCells.pop();
                cell.rowIndex = cellPosition.rowIndex;
                cell.columnIndex = cellPosition.columnIndex;

                cell.position.x = cellPosition.columnIndex * this.cellSize;
                cell.position.y = cellPosition.rowIndex * this.cellSize;
                cell.transform.isDirty = true;
            }
        }
    }

    activated(world) {
        this.world = world;
        const entities = this.world.getEntities();

        entities.forEach((entity) => {
            this.entityAdded(entity);
        });

        for (let x = 0; x < this.cells.length; x++) {
            this.world.addEntity(this.cells[x].entity);
        }
    }

    componentAdded(entity, component) {
        if (this._isCamera(entity)) {
            this._addCamera(entity);
        }
    }

    componentRemoved(entity, component) {
        if (this._isCamera(entity)) {
            this._removeCamera();
        }
    }

    deactivated() {
        this._reset();
        for (let x = 0; x < this.cells.length; x++) {
            this.world.removeEntity(this.cells[x].entity);
        }
    }

    entityAdded(entity) {
        if (this._isCamera(entity)) {
            this._addCamera(entity);
        }
    }

    entityRemoved(entity) {
        if (this._isCamera(entity)) {
            this._removeCamera();
        }
    }

    update(currentTime) {
        if (this._hasCamera()) {
            this._updateCells();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DynamicLoadingSystem;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Collidable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_DynamicLoadingCell__ = __webpack_require__(20);





/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */] {
    constructor({ x = 0, y = 0 } = { x: 0, y: 0 }, cellSize) {
        super();

        const transform = new __WEBPACK_IMPORTED_MODULE_1__components_Transform__["a" /* default */]();
        transform.position.x = x;
        transform.position.y = y;
        transform.size.width = cellSize;
        transform.size.height = cellSize;
        transform.isDirty = true;

        const collidable = new __WEBPACK_IMPORTED_MODULE_2__components_Collidable__["a" /* default */]();
        const dynamicLoadingCell = new __WEBPACK_IMPORTED_MODULE_3__components_DynamicLoadingCell__["a" /* default */]();

        this.addComponent(transform);
        this.addComponent(collidable);
        this.addComponent(dynamicLoadingCell);

    }
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DynamicLoadingCell {
    constructor(){
        this.type = "dynamic-loading-cell";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DynamicLoadingCell;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CameraSystem_ImageManager__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CameraSystem_CanvasFactory__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CameraSystem_ImageFactory__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CameraSystem_ImageRasterizer__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CameraSystem_LineRasterizer__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CameraSystem_ShapeRasterizer__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CameraSystem_TextRasterizer__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__CameraSystem__ = __webpack_require__(29);









class DefaultCameraSystem extends __WEBPACK_IMPORTED_MODULE_7__CameraSystem__["a" /* default */] {
    constructor({canvas, cameraName, assetRoot }) {
        const imageManager = new __WEBPACK_IMPORTED_MODULE_0__CameraSystem_ImageManager__["a" /* default */]();
        const canvasFactory = new __WEBPACK_IMPORTED_MODULE_1__CameraSystem_CanvasFactory__["a" /* default */]();
        const imageFactory = new __WEBPACK_IMPORTED_MODULE_2__CameraSystem_ImageFactory__["a" /* default */]();

        const imageRasterizer = new __WEBPACK_IMPORTED_MODULE_3__CameraSystem_ImageRasterizer__["a" /* default */]({ canvasFactory, imageFactory, assetRoot });
        const lineRasterizer = new __WEBPACK_IMPORTED_MODULE_4__CameraSystem_LineRasterizer__["a" /* default */](canvasFactory);
        const shapeRasterizer = new __WEBPACK_IMPORTED_MODULE_5__CameraSystem_ShapeRasterizer__["a" /* default */](canvasFactory);
        const textRasterizer = new __WEBPACK_IMPORTED_MODULE_6__CameraSystem_TextRasterizer__["a" /* default */](canvasFactory);

        super({
            canvas,
            cameraName,
            imageManager,
            canvasFactory
        });

        imageManager.addRasterizer(imageRasterizer);
        imageManager.addRasterizer(lineRasterizer);
        imageManager.addRasterizer(shapeRasterizer);
        imageManager.addRasterizer(textRasterizer);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DefaultCameraSystem;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const sortByZIndex = (a, b) => (a.zIndex || Infinity) - (b.zIndex || Infinity);

window.getIdentityCount = 0;

class ImageManager {
    constructor() {
        this.rasterizers = {};
        this.images = {};
        this.imageTypes = [];
    }

    _validateRasterizer(rasterizer) {
        if (rasterizer.type == undefined) {
            throw new Error("Rasterizers need to have a type property.");
        }

        if (typeof rasterizer.rasterize !== "function") {
            throw new Error("Rasterizers need to have a rasterize method.");
        }

        if (typeof rasterizer.getIdentity !== "function") {
            throw new Error("Rasterizers need to have a getIdentity method.");
        }
    }

    addRasterizer(rasterizer) {
        this._validateRasterizer(rasterizer);
        this.rasterizers[rasterizer.type] = rasterizer;
        this.imageTypes = Object.keys(this.rasterizers);
    }

    cleanEntity(_entity){
        const entity = _entity;

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            if (component != null){
                component.isDirty = false;
            }
        }
    }

    saveImage(identifier, image) {
        this.images[identifier] = image;
    }

    getImage(identifier) {
        return this.images[identifier] || null;
    }

    isRenderable(_entity){
        const entity = _entity;

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            if (component != null) {
                return true;
            }
        }

        return false;
    }

    isEntityDirty(_entity) {
        const entity = _entity;

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            if (component && component.isDirty) {
                return true;
            }
        }

        return false;
    }

    getEntityImages(_entity) {
        const entity = _entity;
        const rasterizers = this.rasterizers;
        const images = [];

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            if (component != null) {
                window.getIdentityCount++;
                const rasterizer = rasterizers[type];
                const imageId = rasterizer.getIdentity(entity);
                let image = this.getImage(imageId);

                if (image == null) {
                    image = rasterizer.rasterize(entity);
                    this.saveImage(imageId, image);
                }

                images.push(image);
            }
        }

        images.sort(sortByZIndex);

        return images;

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageManager;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CanvasFactory {
    constructor({ document: doc = document, shouldStoreInstances = false } = {}) {
        this.document = doc;
        this.canvases = [];
        this.shouldStoreInstances = shouldStoreInstances;
    }

    create() {
        const canvas = this.document.createElement("canvas");
        if (this.shouldStoreInstances) {
            this.canvases.push(canvas);
        }
        return canvas;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CanvasFactory;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ImageFactory {
    constructor(shouldStoreInstances = false ) {
        this.images = [];
        this.shouldStoreInstances = shouldStoreInstances;
    }

    create() {
        const image = new Image();
        if (this.shouldStoreInstances) {
            this.images.push(canvas);
        }
        return image;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageFactory;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_stringify__ = __webpack_require__(3);
﻿

class ImageRasterizer {
    constructor({ canvasFactory, imageFactory, assetRoot }) {
        this.type = "image";
        this.canvasFactory = canvasFactory;
        this.assetRoot = assetRoot || "";
        this.imageFactory = imageFactory;
        this.loadingImages = {};
    }

    getImageAsync(path) {
        if (this.loadingImages[path] != null) {
            return this.loadingImages[path];
        }

        return this.loadingImages[path] = new Promise((resolve, reject) => {
            const image = this.imageFactory.create();

            image.onload = () => {
                resolve(image);
            };

            image.onerror = reject;
            image.src = path;
        });
    }

    getImagePadding(image) {
        const { top, right, bottom, left } = image.padding;
        return `${top}|${right}|${bottom}|${left}|`;
    }

    getImageSize(image) {
        const { width, height } = image.size;
        return `${width}|${height}`;
    }

    getImagePosition(image) {
        const { x, y } = image.position;
        return `${x}|${y}`;
    }

    getImageIdentity(image) {
        return `${image.path}|${this.getImagePadding(image)}|${this.getImagePosition(image)}|${this.getImageSize(image)}|${image.opacity}`;
    }

    getIdentity(entity) {
        const image = entity.getComponent("image");
        return this.getImageIdentity(image);
    }

    rasterize(entity) {
        const imageComponent = entity.getComponent("image");
        const path = this.getPath(imageComponent.path);
        const canvas = this.canvasFactory.create();
        const context = canvas.getContext("2d");
        const size = imageComponent.size;
        const padding = imageComponent.padding;
        const position = imageComponent.position;
        const width = size.width + padding.left + padding.right;
        const height = size.height + padding.top + padding.bottom;

        canvas.width = width;
        canvas.height = height;

        this.getImageAsync(path).then((image) => {
            context.globalAlpha = imageComponent.opacity;
            context.drawImage(
                image,
                position.x,
                position.y,
                size.width,
                size.height,
                padding.left,
                padding.top,
                size.width,
                size.height
            );
        }).catch((error) => {
            context.globalAlpha = imageComponent.opacity;
            throw error;
        })

        return canvas;
    }

    getPath(path) {
        return this.assetRoot + path;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageRasterizer;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LineRenderer {
    constructor(canvasFactory) {
        this.type = "line";
        this.canvasFactory = canvasFactory;
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    getIdentity(entity) {
        const size = entity.getComponent("size");
        const line = entity.getComponent("line");

        return `size=${JSON.stringify(size)}, line=${JSON.stringify(line)}`;
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();

        const transform= entity.getComponent("transform");
        const line = entity.getComponent("line");
        const context = canvas.getContext("2d");

        const size = transform.size;
        const position = transform.position;

        canvas.width = size.width;
        canvas.height = size.height;

        if (line.thickness > 0) {
            context.globalAlpha = line.opacity;
            context.beginPath();
            context.lineCap = "round";
            context.lineWidth = line.thickness;
            context.strokeStyle = this.convertToRgba(line.color);
            context.moveTo(line.from.x, line.from.y);
            context.lineTo(line.to.x, line.to.y);
            context.stroke();
            context.closePath();
        }

        return canvas;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = LineRenderer;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_stringify__ = __webpack_require__(3);
﻿

class ShapeRasterizer {
    constructor(canvasFactory) {
        this.type = "shape";
        this.canvasFactory = canvasFactory;
        this.shapeCache = {};
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    getIdentity(entity) {
        const size = entity.getComponent("transform").size;
        const shape = entity.getComponent("shape");

        //return `${stringify(size)}|${stringify(shape)}`;
        return this.convertToRgba(shape.fillColor);
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();

        const size = entity.getComponent("transform").size;
        const shape = entity.getComponent("shape");

        const context = canvas.getContext("2d");

        canvas.width = size.width;
        canvas.height = size.height;

        context.globalAlpha = shape.opacity;
        context.beginPath();

        shape.points.forEach(function (point, index) {
            const x = point.x;
            const y = point.y;

            if (index === 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
            }
        });

        context.closePath();

        if (shape.fillColor.alpha > 0) {
            context.fillStyle = this.convertToRgba(shape.fillColor);
            context.fill();
        }

        if (shape.border.thickness > 0) {
            context.lineWidth = shape.border.thickness;
            context.strokeStyle = this.convertToRgba(shape.border.color);
            context.stroke();
        }

        return canvas;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ShapeRasterizer;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_stringify__ = __webpack_require__(3);
﻿

class TextRasterizer {
    constructor(canvasFactory) {
        this.type = "text";
        this.fontCache = {};
        this.canvasFactory = canvasFactory;
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    createFontString(textTexture) {
        //font-style variant weight size family
        return `${textTexture.font.style} ${textTexture.font.variant} ${textTexture.font.weight} ${textTexture.font.size}px ${textTexture.font.family}`;
    }

    getIdentity(entity) {
        const size = entity.getComponent("transform").size;
        const textTexture = entity.getComponent("text");

        return `size=${JSON.stringify(size)}, text=${JSON.stringify(textTexture)}`;
    }

    rasterize(entity) {
        var canvas = this.canvasFactory.create();

        var size = entity.getComponent("transform").size;
        var textTexture = entity.getComponent("text");

        var context = canvas.getContext("2d");

        canvas.width = size.width;
        canvas.height = size.height;

        context.globalAlpha = textTexture.opacity;
        context.font = this.createFontString(textTexture);
        context.textBaseline = textTexture.font.baseline;
        context.textAlign = textTexture.horizontalAlignment;

        // A little trick to get approximate height. 
        var textHeight = textTexture.font.size;
        var textWidth = context.measureText(textTexture.text).width;

        var x = 0;
        var y = 0;

        textTexture.height = textHeight;
        textTexture.width = textWidth;

        if (textTexture.horizontalAlignment === "center") {
            x = size.width / 2;
        } else if (textTexture.horizontalAlignment === "right") {
            x = size.width;
        }

        if (textTexture.verticalAlignment === "top") {
            y = 0;
        } else if (textTexture.verticalAlignment === "middle") {
            y = (size.height / 2) - (textHeight / 2);
        } else if (textTexture.verticalAlignment === "bottom") {
            y = size.height - textHeight;
        }

        var color = this.convertToRgba(textTexture.font.color);

        context.fillStyle = color;
        context.fillText(textTexture.text, parseInt(x, 10), parseInt(y, 10));

        return canvas;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TextRasterizer;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿const idSort = (_entityA, _entityB) => {
    const entityA = _entityA;
    const entityB = _entityB;

    if (entityA.id < entityB.id) {
        return -1
    } else if (entityA.id > entityB.id) {
        return 1;
    } else {
        return 0;
    }
};

class CanvasCell {
    constructor(cameraCanvasCellEntity, canvas) {
        this.transform = cameraCanvasCellEntity.getComponent("transform");
        this.collidable = cameraCanvasCellEntity.getComponent("collidable");
        this.entity = cameraCanvasCellEntity;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.canvas.width = this.transform.size.width;
        this.canvas.height = this.transform.size.height;
        this.isDirty = false;
    }
}

class Camera {
    constructor(cameraEntity, canvas) {
        this.transform = cameraEntity.getComponent("transform");
        this.collidable = cameraEntity.getComponent("collidable");
        this.entity = cameraEntity;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }
}

class CameraSystem {
    constructor({ canvas, cameraName, imageManager, canvasFactory, sort = idSort }) {
        this.canvas = canvas;
        this.imageManager = imageManager;
        this.cameraName = cameraName;
        this.canvasFactory = canvasFactory;
        this.broadPhaseCollisionData = null;
        this.cells = [];
        this.world = null;
        this.camera = null;
        this.drawImageCount = 0;
        this.renderableEntities = {};

        this.sort = (_entityA, _entityB) => {
            const entityA = this.world.getEntityById(_entityA.id);
            const entityB = this.world.getEntityById(_entityB.id);
            const zIndexAComponent = entityA.getComponent("z-index");
            const zIndexBComponent = entityB.getComponent("z-index");
            const zIndexA = zIndexAComponent != null ? zIndexAComponent.value : 0;
            const zIndexB = zIndexBComponent != null ? zIndexBComponent.value : 0;

            if (zIndexA < zIndexB) {
                return -1;
            } else if (zIndexA > zIndexB) {
                return 1;
            } else {
                return sort(entityA, entityB);
            }
        }
    }

    _cleanEntities() {
        const renderableEntities = this.renderableEntities;
        const imageManager = this.imageManager;

        for (let id in renderableEntities) {
            const entity = renderableEntities[id];
            imageManager.cleanEntity(entity);
        }
    }

    _getBroadPhaseCollisionCell({ rowIndex, columnIndex }) {
        let cell = this.broadPhaseCollisionData.grid[`${columnIndex}_${rowIndex}`];
        if (cell == null) {
            return [];
        }
        return cell;
    }

    _hasCamera() {
        return this.camera != null;
    }

    _isDynamicLoadingCellEntity(entity) {
        return entity.hasComponents(["dynamic-loading-cell", "transform", "collidable"])
    }

    _isBroadPhaseCollisionDataEntity(entity) {
        return entity.hasComponents(["broad-phase-collision-data"]);
    }

    _isCameraEntity(entity) {
        return entity.hasComponents(["camera", "transform", "collidable"]) && entity.getComponent("camera").name === this.cameraName;
    }

    _isCell(entity) {
        return this.cells.some(cell => {
            return cell.id === entity.id;
        });
    }

    _updateCell(_cell, _dirtyCellPositions) {
        const cell = _cell;
        const dirtyCellPositions = _dirtyCellPositions;
        const cellSize = this.broadPhaseCollisionData.cellSize;

        for (let x = 0; x < dirtyCellPositions.length; x++) {
            const dirtyCellPosition = dirtyCellPositions[x];
            const cellY = dirtyCellPosition.rowIndex * cellSize;
            const cellX = dirtyCellPosition.columnIndex * cellSize;

            const top = Math.max(cellY, cell.transform.boundingRect.top);
            const left = Math.max(cellX, cell.transform.boundingRect.left);
            const bottom = Math.min(cellY + cellSize, cell.transform.boundingRect.bottom);
            const right = Math.min(cellX + cellSize, cell.transform.boundingRect.right);

            if (top < bottom && left < right) {
                const entities = this._getBroadPhaseCollisionCell(dirtyCellPosition);
                entities.sort(this.sort);

                cell.context.clearRect(left - cell.transform.boundingRect.left, top - cell.transform.boundingRect.top, right - left, bottom - top);

                for (let y = 0; y < entities.length; y++) {
                    const collidableEntity = entities[y];
                    const entity = this.world.getEntityById(collidableEntity.id);
                    const opacity = entity.getComponent("opacity");
                    const rotation = collidableEntity.transform.rotation;

                    if (entity === null) {
                        continue;
                    }

                    const images = this.imageManager.getEntityImages(entity);

                    // If the entity isn't renderable then don't go on.
                    if (images.length === 0) {
                        continue;
                    }

                    this.renderableEntities[entity.id] = entity;

                    const intersectedTop = Math.max(top, collidableEntity.transform.boundingRect.top);
                    const intersectedLeft = Math.max(left, collidableEntity.transform.boundingRect.left);
                    const intersectedBottom = Math.min(bottom, collidableEntity.transform.boundingRect.bottom);
                    const intersectedRight = Math.min(right, collidableEntity.transform.boundingRect.right);

                    let sourceX = 0;
                    let sourceY = 0;
                    let width = intersectedRight - intersectedLeft;
                    let height = intersectedBottom - intersectedTop;
                    let destinationX = intersectedLeft - cell.transform.boundingRect.left;
                    let destinationY = intersectedTop - cell.transform.boundingRect.top;

                    if (width <= 0 || height <= 0) {
                        continue;
                    }

                    if (collidableEntity.transform.boundingRect.left < left) {
                        sourceX = left - collidableEntity.transform.boundingRect.left;
                    }

                    if (collidableEntity.transform.boundingRect.top < top) {
                        sourceY = top - collidableEntity.transform.boundingRect.top;
                    }

                    if (opacity != null) {
                        cell.context.globalAlpha = opacity.value;
                    }

                    for (let z = 0; z < images.length; z++) {
                        const image = images[z];

                        this.drawImageCount++;
                        cell.context.drawImage(
                            image,
                            sourceX,
                            sourceY,
                            width,
                            height,
                            destinationX,
                            destinationY,
                            width,
                            height
                        );
                    }

                    if (opacity != null) {
                        cell.context.globalAlpha = 1;
                    }

                }
            }
        }
    }

    _updateCells() {
        let dirtyCellPositions = this.broadPhaseCollisionData.dirtyCellPositions.slice();
        const renderableCells = {};
        let fullCellRenderCount = 0;

        for (let x = 0; x < dirtyCellPositions.length; x++) {
            const cellPosition = dirtyCellPositions[x];
            const collidableEntities = this._getBroadPhaseCollisionCell(cellPosition);

            for (let i = 0; i < collidableEntities.length; i++) {
                const collidableEntity = collidableEntities[i]
                const id = collidableEntity.id;
                const collidable = collidableEntity.collidable;
                const entity = this.world.getEntityById(id);
                const cellPositions = collidable.cellPositions;
                const lastCellPositions = collidable.lastCellPositions;

                if (entity == null) {
                    return;
                }

                const transform = entity.getComponent("transform");

                if (this.imageManager.isRenderable(entity) && (transform.isDirty)) {
                    for (let c = 0; c < cellPositions.length; c++) {
                        const cellPosition = cellPositions[c];
                        renderableCells[`${cellPosition.columnIndex}_${cellPosition.rowIndex}`] = cellPosition;
                    }

                    for (let c = 0; c < lastCellPositions.length; c++) {
                        const cellPosition = lastCellPositions[c];
                        renderableCells[`${cellPosition.columnIndex}_${cellPosition.rowIndex}`] = cellPosition;
                    }
                }
            }
        }

        for (let x = 0; x < this.cells.length; x++) {
            const cell = this.cells[x];
            const collisions = cell.collidable.collisions;
            const cellPositions = cell.collidable.cellPositions;

            if (cell.transform.isDirty || cell.isDirty) {

                if (fullCellRenderCount === 0) {
                    fullCellRenderCount++;
                    cell.isDirty = false;

                    for (let c = 0; c < cellPositions.length; c++) {
                        const cellPosition = cellPositions[c];
                        renderableCells[`${cellPosition.columnIndex}_${cellPosition.rowIndex}`] = cellPosition;
                    }

                } else {
                    cell.isDirty = true;
                }

            }

            // Find dirty entities with in the loading area that need updating.
            for (let y in collisions) {
                const entity = this.world.getEntityById(y);

                if (entity == null) {
                    continue;
                }

                const isDirty = this.imageManager.isEntityDirty(entity);
                if (isDirty) {
                    const entityCellPositions = entity.getComponent("collidable").cellPositions;
                    for (let z = 0; z < entityCellPositions.length; z++) {
                        const cellPosition = entityCellPositions[z];
                        renderableCells[`${cellPosition.columnIndex}_${cellPosition.rowIndex}`] = cellPosition;
                    }
                }
            }

            dirtyCellPositions = Object.keys(renderableCells).map(key => renderableCells[key]);

            this._updateCell(this.cells[x], dirtyCellPositions);
        }
    }

    _transferToCanvas() {
        const canvas = this.canvas;

        canvas.width = this.camera.transform.size.width;
        canvas.height = this.camera.transform.size.height;

        for (let x = 0; x < this.cells.length; x++) {
            const cell = this.cells[x];
            const top = Math.max(cell.transform.position.y, this.camera.transform.position.y);
            const left = Math.max(cell.transform.position.x, this.camera.transform.position.x);
            const bottom = Math.min(cell.transform.position.y + cell.transform.size.height, this.camera.transform.position.y + this.camera.transform.size.height);
            const right = Math.min(cell.transform.position.x + cell.transform.size.width, this.camera.transform.position.x + this.camera.transform.size.width);

            if (top < bottom && left < right) {

                let sourceX = 0;
                let sourceY = 0;
                const sourceWidth = right - left;
                const sourceHeight = bottom - top;
                const destinationX = left - this.camera.transform.position.x;
                const destinationY = top - this.camera.transform.position.y;
                const destinationWidth = right - left;
                const destinationHeight = bottom - top;

                if (cell.transform.position.x < this.camera.transform.position.x) {
                    sourceX = this.camera.transform.position.x - cell.transform.position.x;
                }

                if (cell.transform.position.y < this.camera.transform.position.y) {
                    sourceY = this.camera.transform.position.y - cell.transform.position.y;
                }

                const context = canvas.getContext("2d");

                this.drawImageCount++;
                context.drawImage(
                    cell.canvas,
                    sourceX,
                    sourceY,
                    sourceWidth,
                    sourceHeight,
                    destinationX,
                    destinationY,
                    destinationWidth,
                    destinationHeight
                );
            }
        }
    }

    activated(world) {
        this.world = world;

        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (component.type === "broad-phase-collision-data") {
            this.broadPhaseCollisionData = null;
        } else if (this.cameraCanvasCellEntities.indexOf(entity) > -1) {
            const index = this.cameraCanvasCellEntities.indexOf(entity) > -1;
            this.cameraCanvasCellEntities.splice(index, 1);
        }
    }

    deactivated(world) {

    }

    entityAdded(entity) {
        if (this._isBroadPhaseCollisionDataEntity(entity)) {
            this.broadPhaseCollisionData = entity.getComponent("broad-phase-collision-data");
        } else if (this._isDynamicLoadingCellEntity(entity)) {
            this.cells.push(new CanvasCell(entity, this.canvasFactory.create()));
        } else if (this._isCameraEntity(entity)) {
            this.camera = new Camera(entity, this.canvasFactory.create());
        }
    }

    entityRemoved(entity) {
        if (this._isBroadPhaseCollisionDataEntity(entity)) {
            this.broadPhaseCollisionData = null;
        } else if (this._isDynamicLoadingCellEntity(entity)) {
            throw new Error("The Camera cannot run without dynamic loading cells.");
        }
    }

    update(currentTime) {
        this.drawImageCount = 0;
        if (this._hasCamera()) {
            this.renderableEntities = {};

            this._updateCells();
            this._transferToCanvas();
            this._cleanEntities();
        }
        //console.log(this.drawImageCount);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CameraSystem;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿const DEPENDENCIES = ["keyboard-input", "keyboard-controller", "transform", "movable"];

class ControllerSystem {
    constructor() {
        this.entities = new Map();
        this._world = null;
    }

    activated(world) {
        var self = this;
        this._world = world;

        world.getEntities().forEach(function (entity) {
            self.entityAdded(entity);
        });
    }

    deactivated() {
        this._world = null;
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, entity);
        }
    }

    entityRemoved(entity) {
        this.entities.delete(entity.id);
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity, entity);
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entityRemoved(entity);
        }
    }

    update() {

        this.entities.forEach(function (entity) {
            var movable = entity.getComponent("movable");
            var keyboardInput = entity.getComponent("keyboard-input");

            if (movable != null && keyboardInput != null) {

                // Left
                if (keyboardInput.pressedKeys[37]) {
                    movable.x -= 2;
                }

                // Up
                if (keyboardInput.pressedKeys[38]) {
                    movable.y -= 2;
                }

                // Right
                if (keyboardInput.pressedKeys[39]) {
                    movable.x += 2;
                }

                // Bottom
                if (keyboardInput.pressedKeys[40]) {
                    movable.y += 2;
                }

            }
        });

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ControllerSystem;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class KeyboardInputSystem {
    constructor(doc) {
        this._world = null;
        var pressedKeys = this.pressedKeys = {};
        doc = doc || document;

        doc.addEventListener("keydown", function (event) {
            pressedKeys[event.keyCode] = true;
        });

        doc.addEventListener("keyup", function (event) {
            pressedKeys[event.keyCode] = false;
        });
    }

    activated(world) {
        var self = this;
        this._world = world;

        world.getEntities().forEach(function (entity) {
            self.entityAdded(entity);
        });
    }

    deactivated() {

    }

    update() {

    }

    entityAdded(entity) {
        var component = entity.getComponent("keyboard-input");
        if (component != null) {
            component.pressedKeys = this.pressedKeys;
        }
    }

    entityRemoved(entity) {
        var component = entity.getComponent("keyboard-input");
        if (component != null) {
            component.pressedKeys = {};
        }
    }

    componentAdded(entity, component) {
        if (component.type === "keyboard-input") {
            component.pressedKeys = this.pressedKeys;
        }
    }

    componentRemoved(entity, component) {
        if (component.type === "keyboard-input") {
            component.pressedKeys = {};
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyboardInputSystem;


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DEPENDENCIES = ["movable", "transform"];

class MovableEntity {
    constructor(entity) {
        const transform = entity.getComponent("transform");
        this.movable = entity.getComponent("movable");
        this.position = transform.position;
        this.transform = transform;
    }
}

class MovementSystem {
    constructor() {
        this.world = null;
        this.entities = new Map();
    }

    update() {
        this.entities.forEach((entity) => {
            var position = entity.position;
            var movable = entity.movable;

            position.x += movable.x;
            position.y += movable.y;

            if (movable.x != 0 || movable.y != 0) {
                entity.transform.isDirty = true;
            }

            movable.x = 0;
            movable.y = 0;
        });
    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.world = null;
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, new MovableEntity(entity));
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.delete(entity.id);
        }
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, new MovableEntity(entity));
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entities.delete(entity.id);
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = MovementSystem;


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_Text__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Collidable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_KeyboardController__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_KeyboardInput__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_components_Movable__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_components_Shape__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_components_State__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_components_NarrowPhaseCollidable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_components_SolidBody__ = __webpack_require__(4);












/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor(text) {
        super();
        this.id = "player"

        var transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        var textTexture = new __WEBPACK_IMPORTED_MODULE_2__src_components_Text__["a" /* default */]();
        var collidable = new __WEBPACK_IMPORTED_MODULE_3__src_components_Collidable__["a" /* default */]();
        var keyboardController = new __WEBPACK_IMPORTED_MODULE_4__src_components_KeyboardController__["a" /* default */]();
        var keyboardInput = new __WEBPACK_IMPORTED_MODULE_5__src_components_KeyboardInput__["a" /* default */]();
        var movable = new __WEBPACK_IMPORTED_MODULE_6__src_components_Movable__["a" /* default */]();
        var shape = new __WEBPACK_IMPORTED_MODULE_7__src_components_Shape__["a" /* default */]();
        var narrowPhaseCollision = new __WEBPACK_IMPORTED_MODULE_9__src_components_NarrowPhaseCollidable__["a" /* NarrowPhaseCollidable */]();
        var part = new __WEBPACK_IMPORTED_MODULE_9__src_components_NarrowPhaseCollidable__["b" /* Part */]();
        var solidBody = new __WEBPACK_IMPORTED_MODULE_10__src_components_SolidBody__["a" /* default */]();

        part.points.push(
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 }
        );

        narrowPhaseCollision.parts.push(part);

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.verticalAlignment = "middle";
        textTexture.horizontalAlignment = "center"

        transform.size.width = 30;
        transform.size.height = 30;
        //transform.rotation = -90;
        transform.isDirty = true;

        shape.border.thickness = 1;
        shape.fillColor.blue = 255;
        shape.fillColor.green = 100;
        shape.fillColor.red = 100;
        shape.points.push(
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );

        this.addComponent(transform);
        this.addComponent(textTexture);
        this.addComponent(collidable);
        this.addComponent(keyboardController);
        this.addComponent(keyboardInput);
        this.addComponent(movable);
        this.addComponent(shape);
        this.addComponent(narrowPhaseCollision);
        this.addComponent(solidBody);
    }
});

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class KeyboardInput {
   constructor() {
        this.type = "keyboard-input";
        this.pressedKeys = {};
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyboardInput;


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Movable {
    constructor() {
        this.type = "movable";
        this.x = 0;
        this.y = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Movable;


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class State {
    constructor() {
        this.type = "state";
        
        this.activeName = null;
        this.activeOptions = {};
        
        this.name = null;
        this.options = {};
        
        this.stateManagerName = null;

    }
}
/* unused harmony export default */


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_Text__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Collidable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_NarrowPhaseCollidable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_Shape__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_components_SolidBody__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_components_Opacity__ = __webpack_require__(38);









class StaticText extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor(text, { x, y }, { red = 0, green = 0, blue = 0, alpha = 1 }) {
        super();
        this.type = "static-text";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const textTexture = new __WEBPACK_IMPORTED_MODULE_2__src_components_Text__["a" /* default */]();
        const collidable = new __WEBPACK_IMPORTED_MODULE_3__src_components_Collidable__["a" /* default */]();
        const narrowPhaseCollidable = new __WEBPACK_IMPORTED_MODULE_4__src_components_NarrowPhaseCollidable__["a" /* NarrowPhaseCollidable */]();
        const part = new __WEBPACK_IMPORTED_MODULE_4__src_components_NarrowPhaseCollidable__["b" /* Part */]();
        const shape = new __WEBPACK_IMPORTED_MODULE_5__src_components_Shape__["a" /* default */]();
        const solidBody = new __WEBPACK_IMPORTED_MODULE_6__src_components_SolidBody__["a" /* default */]();
        const opacity = new __WEBPACK_IMPORTED_MODULE_7__src_components_Opacity__["a" /* default */]();

        opacity.value = Math.random();

        narrowPhaseCollidable.parts.push(part);

        shape.border.thickness = 1;
        shape.fillColor.red = red;
        shape.fillColor.green = green;
        shape.fillColor.blue = blue;
        shape.points.push(
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );

        part.points.push(
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 30 },
            { x: 0, y: 30 }
        );

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.horizontalAlignment = "center";
        textTexture.verticalAlignment = "middle";

        transform.size.width = 100;
        transform.size.height = 30;
        transform.position.x = x;
        transform.position.y = y;
        transform.isDirty = true;

        this.addComponent(transform);
        this.addComponent(textTexture);
        this.addComponent(collidable);
        this.addComponent(shape);
        this.addComponent(solidBody);
        this.addComponent(narrowPhaseCollidable);
        this.addComponent(opacity);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StaticText;


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Opacity {
    constructor(){
        this.type = "opacity";
        this.value = 1;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Opacity;


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿
class FollowEntityCameraSystem {
    constructor() {
        this._camera = null;
        this._cameraSize = null;
        this._cameraPosition = null;
        this._entityToFollow = null;
        this._entitySize = null;
        this._entityPosition = null;
        this._world = null;
        this._worldSize = null;
    }

    get camera() {
        return this._camera;
    }

    set camera(value) {
        if (value.hasComponents(["camera", "transform"])) {
            const transform = value.getComponent("transform");
            this._camera = value;
            this._cameraPosition = transform.position;
            this._cameraSize = transform.size;
            this._cameraTransform = transform;
        }
    }

    setEntityToFollow(entity) {
        if (entity.hasComponents(["transform"])) {
            const transform = entity.getComponent("transform");
            this._entityToFollow = entity;
            this._entitySize = transform.size;
            this._entityPosition = transform.position;
        }
    }

    update() {
        if (this._entityToFollow != null && this._camera != null) {
            var x = this._entityPosition.x - (this._cameraSize.width / 2) + (this._entitySize.width / 2);
            var y = this._entityPosition.y - (this._cameraSize.height / 2) + (this._entitySize.height / 2);
            this._cameraPosition.x = Math.floor(x);
            this._cameraPosition.y = Math.floor(y);
        }

        if (this._camera != null) {
            this._cameraTransform.isDirty = true;
        }
    }

    activated(world) {
        this._world = world;
        this._worldSize = world.size;
    }

    deactivate() { }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FollowEntityCameraSystem;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(6);


const DEPENDENCIES = ["collidable", "narrow-phase-collidable", "transform"];

class NarrowPhaseCollisionSystem {
    constructor() {
        this.entities = [];
        this.projectionA = {
            min: 0,
            max: 0
        };
        this.projectionB = {
            min: 0,
            max: 0
        };
        this.timestamp = 0;
        this.broadPhaseCollisionData = null;
    }

    prepareNarrowPhaseCollidable(narrowPhaseCollidable) {
        if (narrowPhaseCollidable.isPrepared) {
            return;
        }

        narrowPhaseCollidable.isPrepared = true;

        narrowPhaseCollidable.parts.forEach((part) => {
            let points = part.points;

            if (points.length === part.vertices.length &&
                points.length === part.normals.length &&
                points.length === part.projectionVertices.length) {
                return;
            }

            this.setSize(part);

            part.vertices = points.map(function (point, index) {
                let nextPoint = points[index + 1] || points[0];
                return {
                    x: point.x - nextPoint.x,
                    y: point.y - nextPoint.y
                };
            });

            part.worldPoints = points.map(function (point) {
                return {
                    x: point.x,
                    y: point.y
                };
            });

            part.normals = part.vertices.map(function (vertex, index) {
                return __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].normalize(__WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].getLeftNormal(vertex));
            });

            let finalVector = part.vertices.reduce(function (accumulator, vertex) {
                accumulator.x += vertex.x;
                accumulator.y += vertex.y;

                return accumulator;
            }, { x: 0, y: 0 });

            // If the final vector isn't (0,0) then make it so, to finish the polygon.
            if (finalVector.x !== 0 || finalVector.y !== 0) {
                part.points.push(part.points[0]);

                part.vertices.push({
                    x: -finalVector.x,
                    y: -finalVector.y
                });

                part.normals.push(__WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].getLeftNormal(part.vertices[part.vertices.length - 1]));
            }
        });

    }

    setSize(part) {
        let points = part.points;

        let width;
        let height;
        let length = points.length;
        let top = points[0].y;
        let left = points[0].x;
        let bottom = points[0].y;
        let right = points[0].x;

        for (let x = 1; x < length; x++) {
            top = Math.min(top, points[x].y);
            left = Math.min(left, points[x].x);
            bottom = Math.max(bottom, points[x].y);
            right = Math.max(right, points[x].x);
        }

        width = right - left;
        height = bottom - top;

        part.size.width = width;
        part.size.height = height;

        part.origin.x = (width / 2) + left;
        part.origin.y = (height / 2) + top;
    }

    projectToAxis(vertices, axis, projection) {
        let min = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].dot(vertices[0], axis);
        let max = min;
        let dot;

        for (let i = 1; i < vertices.length; i += 1) {
            dot = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].dot(vertices[i], axis);

            if (dot > max) {
                max = dot;
            } else if (dot < min) {
                min = dot;
            }
        }

        projection.min = min;
        projection.max = max;
    }

    overlapAxes(verticesA, verticesB, axes) {
        let projectionA = this.projectionA;
        let projectionB = this.projectionB;
        let result = {
            overlap: Number.MAX_VALUE,
            axis: null,
            axisNumber: null
        };

        let overlap;
        let axis;

        projectionA.min = 0;
        projectionA.max = 0;
        projectionB.min = 0;
        projectionB.max = 0;

        for (let i = 0; i < axes.length; i++) {
            axis = axes[i];

            this.projectToAxis(verticesA, axis, projectionA);
            this.projectToAxis(verticesB, axis, projectionB);

            overlap = Math.min(projectionA.max - projectionB.min, projectionB.max - projectionA.min);

            if (overlap <= 0) {
                result.overlap = overlap;
                return result;
            }

            if (overlap < result.overlap) {
                result.overlap = overlap;
                result.axis = axis;
                result.axisNumber = i;
            }
        }

        return result;
    }

    updateWorldPoints(entity) {
        let narrowPhaseCollidable = entity.getComponent("narrow-phase-collidable");
        let position = entity.getComponent("transform").position;

        narrowPhaseCollidable.parts.forEach((part) => {
            let worldPoints = part.worldPoints;

            part.points.forEach(function (point, index) {
                let worldPoint = worldPoints[index];
                worldPoint.x = point.x + position.x;
                worldPoint.y = point.y + position.y;
            });
        });

    }

    intersects(entityA, entityB) {
        let _entityA = entityA;
        let _entityB = entityB;

        let x;
        let vx;
        let normal;

        let narrowPhaseCollidableA = _entityA.getComponent("narrow-phase-collidable");
        let narrowPhaseCollidableB = _entityB.getComponent("narrow-phase-collidable");
        let positionA = _entityA.getComponent("transform").position;
        let positionB = _entityB.getComponent("transform").position;
        let collidableA = _entityA.getComponent("collidable");
        let collidableB = _entityB.getComponent("collidable");
        let aParts = narrowPhaseCollidableA.parts;
        let bParts = narrowPhaseCollidableB.parts;

        this.updateWorldPoints(entityA);
        this.updateWorldPoints(entityB);

        for (let aPartIndex = 0; aPartIndex < aParts.length; aPartIndex++) {
            let partA = aParts[aPartIndex];

            for (let bPartIndex = 0; bPartIndex < bParts.length; bPartIndex++) {
                let partB = bParts[bPartIndex];

                let normalsA = partA.normals;
                let normalsB = partB.normals;
                let projectionA = this.projectionA;
                let projectionB = this.projectionB;
                let verticesA = partA.worldPoints;
                let verticesB = partB.worldPoints;
                let collisionA = narrowPhaseCollidableA.collisions[entityB.id];
                let collisionB = narrowPhaseCollidableB.collisions[entityA.id];
                let penetration;
                let minOverlap;
                let normal;

                let originA = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].add(positionA, partA.origin);
                let originB = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].add(positionB, partB.origin);

                narrowPhaseCollidableA.isInitialized = true;
                narrowPhaseCollidableB.isInitialized = true;

                // If the collision was already handled from the other side then stop detection.
                if (collisionA != null && collisionA.timestamp === this.timestamp) {
                    continue;
                }

                let overlapA = this.overlapAxes(verticesA, verticesB, normalsA);

                if (overlapA.overlap <= 0) {

                    if (collisionA != null) {
                        collisionA.endTimestamp = this.timestamp;
                        collisionA.timestamp = this.timestamp;
                    }

                    if (collisionB != null) {
                        collisionB.endTimestamp = this.timestamp;
                        collisionB.timestamp = this.timestamp;
                    }

                    continue;
                }

                let overlapB = this.overlapAxes(verticesA, verticesB, normalsB);

                if (overlapB.overlap <= 0) {

                    if (collisionA != null) {
                        collisionA.endTimestamp = this.timestamp;
                        collisionA.timestamp = this.timestamp;
                    }

                    if (collisionB != null) {
                        collisionB.endTimestamp = this.timestamp;
                        collisionB.timestamp = this.timestamp;
                    }

                    continue;
                }

                if (collisionA == null) {
                    collisionA = {};
                }

                if (collisionB == null) {
                    collisionB = {};
                }

                collisionA.startTimestamp = this.timestamp;
                collisionA.timestamp = this.timestamp;
                collisionA.endTimestamp = null;
                collisionA.otherEntity = entityB;
                collisionA.entity = entityA;

                collisionB.startTimestamp = this.timestamp;
                collisionB.timestamp = this.timestamp;
                collisionB.endTimestamp = null;
                collisionB.otherEntity = entityA;
                collisionB.entity = entityB;

                if (overlapA.overlap < overlapB.overlap) {

                    minOverlap = overlapA.overlap;
                    normal = overlapA.axis;

                    if (__WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].dot(normal, __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].subtract(originA, originB)) > 0) {
                        normal = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].negate(normal);
                    }

                    penetration = {
                        x: minOverlap * normal.x,
                        y: minOverlap * normal.y
                    };

                    collisionA.penetration = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].negate(penetration);
                    collisionA.normal = normal;

                    collisionB.penetration = penetration;
                    collisionB.normal = normal;

                } else {

                    minOverlap = overlapB.overlap;
                    normal = overlapB.axis;

                    if (__WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].dot(normal, __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].subtract(originB, originA)) > 0) {
                        normal = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].negate(normal);
                    }

                    penetration = {
                        x: minOverlap * normal.x,
                        y: minOverlap * normal.y
                    };

                    collisionA.penetration = penetration;
                    collisionA.normal = normal;

                    collisionB.penetration = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].negate(penetration);
                    collisionB.normal = normal;

                }

                narrowPhaseCollidableA.collisions[entityB.id] = collisionA;
                narrowPhaseCollidableB.collisions[entityA.id] = collisionB;

            }

        }

    }

    cleanCollisions(entity) {
        let _entity = entity;
        let narrowPhaseCollidable = _entity.getComponent("narrow-phase-collidable");
        let collidable = _entity.getComponent("collidable");
        let narrowPhaseCollisions = narrowPhaseCollidable.collisions;
        let broadPhaseCollisions = collidable.collisions;

        for (let key in narrowPhaseCollisions) {
            let narrowCollision = narrowPhaseCollisions[key];
            let broadPhaseCollision = broadPhaseCollisions[key];

            if (broadPhaseCollision == null || narrowCollision.endTimestamp != null) {
                delete narrowPhaseCollisions[key];
            }
        }

    }

    getCollisionByEntityId(collisions, id) {
        return collisions[id];
    }

    handleCollisions(entity) {
        let _entity = entity;
        let collidable = _entity.getComponent("collidable");
        let narrowPhaseCollidable = _entity.getComponent("narrow-phase-collidable");

        this.prepareNarrowPhaseCollidable(narrowPhaseCollidable);

        if (!narrowPhaseCollidable.isEnabled) {
            return;
        }

        if (collidable != null) {
            for (let key in collidable.collisions) {
                let collision = collidable.collisions[key];
                let otherEntity = this.world.getEntityById(collision.entityId);
                let otherNarrowPhaseCollidable = otherEntity.getComponent("narrow-phase-collidable");

                if (otherEntity == null || otherNarrowPhaseCollidable == null) {
                    continue;
                }

                this.prepareNarrowPhaseCollidable(otherNarrowPhaseCollidable);
                this.intersects(_entity, otherEntity);
            }

            this.cleanCollisions(_entity);
        }

    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    update(time) {
        this.timestamp = time;

        if (this.broadPhaseCollisionData != null) {
            const entities = this.broadPhaseCollisionData.dirtyEntities.map(({ id }) => {
                return this.world.getEntityById(id);
            }).filter((entity) => {
                return entity.hasComponent("narrow-phase-collidable");
            });

            entities.forEach((entity) => {
                const collidable = entity.getComponent("narrow-phase-collidable");
                this.prepareNarrowPhaseCollidable(collidable);
                this.updateWorldPoints(entity);
            })

            entities.forEach((entity) => {
                this.handleCollisions(entity);
            });
        }
    }

    deactivated() {

    }

    entityAdded(entity) {
        if (entity.hasComponent("broad-phase-collision-data")) {
            this.broadPhaseCollisionData = entity.getComponent("broad-phase-collision-data");
        }
    };

    entityRemoved(entity) {
        if (entity.hasComponent("broad-phase-collision-data")) {
            this.broadPhaseCollisionData = null;
        }
    }

    componentRemoved(entity, component) {
        if (component.type === "broad-phase-collision-data") {
            this.broadPhaseCollisionData = null;
        }
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = NarrowPhaseCollisionSystem;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DEPENDENCIES = ["solid-body", "narrow-phase-collidable", "movable"];

class SolidBodySystem {
    constructor() {
        this.entities = new Map();
        this.world = null;
    }

    update() {
        this.entities.forEach((entity) => {
            this.updateEntity(entity);
        });
    }

    activated(world) {
        this.world = world;
        world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.world = null;
        this.entities.clear();
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, entity);
        }
    }

    entityRemoved(entity) {
        this.entities.delete(entity.id);
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entities.delete(entity.id);
        }
    }

    updateEntity(entity) {
        let activeCollisions = entity.getComponent("narrow-phase-collidable").collisions;
        let movable = entity.getComponent("movable");
        let solidBody = entity.getComponent("solid-body");

        for (let key in activeCollisions) {
            let collision = activeCollisions[key];
            if (collision.endTimestamp == null) {
                movable.x += Math.round(collision.penetration.x);
                movable.y += Math.round(collision.penetration.y);
            }

        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SolidBodySystem;



/***/ })
/******/ ]);