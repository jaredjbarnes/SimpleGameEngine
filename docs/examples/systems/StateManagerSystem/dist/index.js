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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_createGuid__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_invokeMethod__ = __webpack_require__(1);
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
/* harmony default export */ __webpack_exports__["a"] = ((obj, methodName, args) => {
    args = Array.isArray(args)? args: [];
   if (obj != null && typeof obj[methodName] === "function"){
       return obj[methodName].apply(obj, args);
   }
});

/***/ }),
/* 2 */
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

        this.origin = {
            x: 0,
            y: 0
        };

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Transform;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Rectangle {
    constructor() {
        this.type = "rectangle";
        this.width = 0;
        this.height = 0;
        this.top = 0;
        this.left = 0;
        this.bottom = 0;
        this.right = 0;
        this.transformedWidth = 0;
        this.transformedHeight = 0;
        this.isDirty = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rectangle;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// These helper methods are static for optimization purposes. 
// The optional references allows the developer to choose where the
// result is saved to. This is huge for GC.

class Vector {

    static add(vectorA, vectorB, reference = {x: 0, y: 0}) {
        reference.x = vectorA.x + vectorB.x;
        reference.y = vectorA.y + vectorB.y;

        return reference;
    }

    static subtract(vectorA, vectorB, reference = {x: 0, y: 0}) {
        reference.x = vectorA.x - vectorB.x;
        reference.y = vectorA.y - vectorB.y;

        return reference;
    }

    static multiply(vectorA, vectorB, reference = {x: 0, y: 0}) {
        reference.x = vectorA.x * vectorB.x;
        reference.y = vectorA.y * vectorB.y;

        return reference;
    }

    static divide(vectorA, vectorB, reference = {x: 0, y: 0}) {
        reference.x = vectorA.x / vectorB.x;
        reference.y = vectorA.y / vectorB.y;

        return reference;
    }

    static scale(vector, scale, reference = {x: 0, y: 0}) {
        reference.x = scale * vector.x;
        reference.y = scale * vector.y;

        return reference;
    }

    static project(vectorA, vectorB, reference = {x: 0, y: 0}) {
        var scale;

        var firstDot = Vector.dot(vectorA, vectorB);
        var secondDot = Vector.dot(vectorB, vectorB);

        if (!firstDot || !secondDot) {
            scale = 0;
        } else {
            scale = firstDot / secondDot;
        }

        return Vector.scale(vectorB, scale, reference);
    }

    static getLeftNormal(vector, reference = {x: 0, y: 0}) {
        reference.x = -vector.y;
        reference.y = vector.x;

        return reference;
    }

    static getRightNormal(vector, reference = {x: 0, y: 0}) {
        reference.x = vector.y;
        reference.y = -vector.x;

        return reference;
    }

    static magnitude(vector) {
        return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    }

    static dot(vectorA, vectorB) {
        return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
    }

    static negate(vector, reference = {x: 0, y: 0}) {
        reference.x = -vector.x;
        reference.y = -vector.y;

        return reference;
    }

    static rotate(vector, angle, reference = {x: 0, y: 0}) {
        const radians = angle * Math.PI / 180;
        const sin = Math.sin(radians);
        const cos = Math.cos(radians);

        const x = vector.x;
        const y = vector.y;

        // The multiplying and dividing is to limit the floating point.
        reference.x = Math.round(1000 * (x * cos - y * sin)) / 1000;
        reference.y = Math.round(1000 * (x * sin + y * cos)) / 1000;

        return reference;
    }

    static normalize(vector, reference = {x: 0, y: 0}) {

        var magnitude = Vector.magnitude(vector);

        if (magnitude === 0) {
            reference.x = 0;
            reference.y = 0;
        }

        reference.x = vector.x / magnitude;
        reference.y = vector.y / magnitude;

        return reference;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Vector;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__ = __webpack_require__(1);


class SystemsBundlerSystem {
    constructor() {
        this.systems = [];
    }

    notifySystems(methodName, args) {
        for (let x = 0; x < this.systems.length; x++) {
            const system = this.systems[x];
            Object(__WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__["a" /* default */])(system, methodName, args);
        }
    }

    // Life Cycle Methods
    activated(...args) {
        this.notifySystems("activated", args);
    }

    afterUpdate(...args){
        this.notifySystems("afterUpdate", args);
    }

    beforeUpdate(...args){
        this.notifySystems("beforeUpdate", args);
    }

    componentAdded(...args) {
        this.notifySystems("componentAdded", args);
    }

    componentRemoved(...args) {
        this.notifySystems("componentRemoved", args);
    }

    deactivated(...args) {
        this.notifySystems("deactivated", args);
    }

    entityAdded(...args) {
        this.notifySystems("entityAdded", args);
    }

    entityRemoved(...args) {
        this.notifySystems("entityRemoved", args);
    }

    serviceAdded(...args){
        this.notifySystems("serviceAdded", args);
    }

    serviceRemoved(...args){
        this.notifySystems("serviceRemoved", args);
    }

    update(...args){
        this.notifySystems("update", args);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SystemsBundlerSystem;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const isObject = obj => {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
  };
  
  const isPrimitive = value => {
    return !Array.isArray(value) && !isObject(value);
  };
  
  const clone = obj => {
    if (isPrimitive(obj)) {
      return obj;
    }
  
    const result = Array.isArray(obj) ? [] : {};
  
    Object.keys(obj).forEach(key => {
      result[key] = clone(obj[key]);
    });
  
    return result;
  };
  
  const overlay = (bottom, top) => {
    if (bottom == null && top != null) {
      return clone(top);
    }
  
    if (top == null && bottom != null) {
      return clone(bottom);
    }
  
    const result = clone(top);
  
    if (isPrimitive(bottom)) {
      if (typeof bottom === typeof top) {
        return top;
      } else {
        return bottom;
      }
    }
  
    Object.keys(bottom).forEach(key => {
      if (Array.isArray(bottom[key])) {
        if (Array.isArray(top[key])) {
          result[key] = overlay(bottom[key], top[key]);
        } else {
          result[key] = clone(bottom[key]);
        }
      } else if (isObject(bottom[key])) {
        if (isObject(top[key])) {
          result[key] = overlay(bottom[key], top[key]);
        } else {
          result[key] = clone(bottom[key]);
        }
      } else if (isPrimitive(bottom[key])) {
        if (typeof bottom[key] === typeof top[key]) {
          result[key] = overlay(bottom[key], top[key]);
        } else {
          result[key] = clone(bottom[key]);
        }
      }
    });
  
    return result;
  };
  
  /* harmony default export */ __webpack_exports__["a"] = (overlay);
  

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
﻿class RectangleCollider {
    constructor() {
        this.type = "rectangle-collider";
        this.name = null;
        this.collisions = {};
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RectangleCollider;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class Shape {
    constructor() {
        this.type = "shape";
        this.id = null;
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
class SolidBody {
    constructor() {
        this.type = "solid-body";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SolidBody;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PolygonBody {
    constructor(){
        this.type = "polygon-body";
        this.polygons = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PolygonBody;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Polygon {
    constructor() {
        this.type = "polygon";
        this.points = [];
        this.rotatedPoints = [];
        this.vertices = [];
        this.normals = [];
        this.worldPoints = [];
        this.projectionVertices = [];
        this.center = { x: 0, y: 0 };
        this.size = { width: 0, height: 0 };
        this.rotation = 0;
        this.isDirty = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Polygon;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PolygonCollider {
    constructor() {
        this.type = "polygon-collider";
        this.collisions = {};
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PolygonCollider;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_World__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_entities_Camera__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_systems_BroadPhaseCollisionSystem__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_systems_NarrowPhaseCollisionSystem__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_systems_DefaultCameraSystem__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_systems_ControllerSystem__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_systems_KeyboardSystem__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_systems_MovementSystem__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_systems_SolidBodySystem__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__entities_Text__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__entities_StaticText__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_systems_FollowEntityCameraSystem__ = __webpack_require__(58);













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
const world = new __WEBPACK_IMPORTED_MODULE_0__src_World__["a" /* default */](console.log);

// Entities
const camera = new __WEBPACK_IMPORTED_MODULE_1__src_entities_Camera__["a" /* default */](cameraName);
const player = new __WEBPACK_IMPORTED_MODULE_9__entities_Text__["a" /* default */]("P");

// Systems
const controllerSystem = new __WEBPACK_IMPORTED_MODULE_5__src_systems_ControllerSystem__["a" /* default */]();
const keyboardInputSystem = new __WEBPACK_IMPORTED_MODULE_6__src_systems_KeyboardSystem__["a" /* default */]();
const movableSystem = new __WEBPACK_IMPORTED_MODULE_7__src_systems_MovementSystem__["a" /* default */]();
const broadPhaseCollisionSystem = new __WEBPACK_IMPORTED_MODULE_2__src_systems_BroadPhaseCollisionSystem__["a" /* default */]();
const narrowPhaseCollisionSystem = new __WEBPACK_IMPORTED_MODULE_3__src_systems_NarrowPhaseCollisionSystem__["a" /* default */]();
const solidBodySystem = new __WEBPACK_IMPORTED_MODULE_8__src_systems_SolidBodySystem__["a" /* default */]();

const followEntityCameraSystem = new __WEBPACK_IMPORTED_MODULE_11__src_systems_FollowEntityCameraSystem__["a" /* default */]({
    cameraEntityId: camera.id,
    followEntityId: player.id
});

const defaultCameraSystem = new __WEBPACK_IMPORTED_MODULE_4__src_systems_DefaultCameraSystem__["a" /* default */]({
    canvas,
    cameraName,
    cellSize: 300
});

//defaultCameraSystem.enablePolygonRasterizer();

// Set up world
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(solidBodySystem);
world.addSystem(movableSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(defaultCameraSystem);

// Add Entities
world.addEntity(camera);
world.addEntity(player);

for (let x = 0; x < 10000; x++) {
    const entity = new __WEBPACK_IMPORTED_MODULE_10__entities_StaticText__["a" /* default */](x, {
        x: getRandomNumber(-10000, 10000),
        y: getRandomNumber(-10000, 10000)
    }, getRandomRgba());

    world.addEntity(entity);
}

world.play();

window.world = world;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__ = __webpack_require__(1);
﻿

class World {
    constructor(logger) {
        this._entityDelegate = {
            componentAdded: (...args) => {
                this.notifySystems("componentAdded", args);
            },
            componentRemoved: (...args) => {
                this.notifySystems("componentRemoved", args);
            }
        };

        this._animationFrame = null;
        this._startTime = 0;
        this._timespans = [];
        this._systems = [];
        this._entities = [];
        this._entitiesById = {};
        this._entitiesByType = {};
        this._services = {};
        this._loop = this._loop.bind(this);
        this._isRunning = false;
        this._logger = typeof logger !== "function" ? () => { } : logger;
        this.isLogEnabled = false;
    }

    _loop() {
        this.update();
        this._animationFrame = requestAnimationFrame(this._loop);
    }

    log(...args) {
        if (this.isLogEnabled) {
            this._logger.apply(null, args);
        }
    }

    enableLogging() {
        this.isLogEnabled = true;
    }

    disableLogging() {
        this.isLogEnabled = false;
    }

    validateService(service) {
        if (typeof service.name !== "string") {
            throw new Error("Services need to have a name property.");
        };
    }

    notifySystems(methodName, args = []) {
        const systems = this._systems;
        for (let x = 0; x < systems.length; x++) {
            const system = systems[x];
            Object(__WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__["a" /* default */])(system, methodName, args);
        }
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

    addService(service) {
        this._services[service.name] = service;
        Object(__WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__["a" /* default */])(service, "activated", [this]);
        this.notifySystems("serviceAdded", [service.name, service]);
    }

    getService(name) {
        return this._services[name] || null;
    }

    getServices() {
        return Object.assign({}, this._services);
    }

    removeService(_service) {
        const service = this._services[_service.name];

        if (service != null) {
            delete this._services[name];
            Object(__WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__["a" /* default */])(service, "deactivated", [this]);
            this.notifySystems("serviceRemoved", [name, service]);
        }
    }

    removeSystem(system) {
        const systems = this._systems;
        const index = systems.indexOf(system);

        if (index > -1) {
            systems.splice(index, 1);
            Object(__WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__["a" /* default */])(system, "deactivated", [this]);
            Object(__WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__["a" /* default */])(system, "systemRemoved", [system]);
        }
    }

    addEntityToTypesArray(entity) {
        const type = entity.type;

        if (type != null) {
            if (!Array.isArray(this._entitiesByType[type])) {
                this._entitiesByType[type] = [];
            }
            this._entitiesByType[type].push(entity);
        }
    }

    addEntity(_entity) {
        const entity = _entity;
        const entities = this._entities;
        const entitiesById = this._entitiesById;
        const registeredEntity = entitiesById[entity.id];

        if (registeredEntity == null) {
            this.addEntityToTypesArray(entity);
            entitiesById[entity.id] = entity;
            entities.push(entity);
            entity.setDelegate(this._entityDelegate);
            this.notifySystems("entityAdded", [entity]);
        }

    }

    removeEntity(_entity) {
        const entity = _entity;
        const entities = this._entities;
        const entitiesById = this._entitiesById;
        const registeredEntity = entitiesById[entity.id];

        if (registeredEntity != null) {
            delete entitiesById[entity.id];
            this.removeEntityFromTypesArray(entity);
            const index = entities.indexOf(entity);
            entities.splice(index, 1);
            entity.setDelegate(null);
            this.notifySystems("entityRemoved", [entity]);
        }
    }

    removeEntityFromTypesArray(entity) {
        const type = entity.type;

        if (type != null) {
            if (!Array.isArray(this._entitiesByType[type])) {
                this._entitiesByType[type] = [];
            }

            const index = this._entitiesByType[type].indexOf(entity);
            if (index > -1) {
                this._entitiesByType[type].splice(index, 1);
            }
        }
    }

    update() {
        this.notifySystems("beforeUpdate", [this.getTime()]);
        this.notifySystems("update", [this.getTime()]);
        this.notifySystems("afterUpdate", [this.getTime()]);
    }

    play() {
        if (!this._isRunning) {
            this._isRunning = true;
            this._startTime = performance.now();
            this._loop();

            this.notifySystems("onPlay");
        }
    }

    pause() {
        if (this._isRunning) {
            this._isRunning = false;
            this._timespans.push(performance.now() - this._startTime);
            cancelAnimationFrame(this._animationFrame);

            this.notifySystems("onPause");
        }
    }

    getTime() {
        let time = 0;

        for (let x = 0; x < this._timespans.length; x++) {
            time += this._timespans[x];
        }

        if (this._isRunning) {
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

    getEntityByType(type) {
        return this._entitiesByType[type] || null;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = World;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Camera__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Transform__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Rectangle__ = __webpack_require__(3);
﻿




class Camera extends __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */] {
    constructor(name, { width = 256, height = 256 } = {}) {
        super();

        const camera = new __WEBPACK_IMPORTED_MODULE_1__components_Camera__["a" /* default */]();
        camera.name = name || null;

        const transform = new __WEBPACK_IMPORTED_MODULE_2__components_Transform__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__components_Rectangle__["a" /* default */]();

        rectangle.width = width;
        rectangle.height = height;

        this.id = `camera_${this.id}`;
        this.addComponent(camera);
        this.addComponent(transform);
        this.addComponent(rectangle);

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;


/***/ }),
/* 17 */
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
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class Camera {
    constructor() {
        this.type = "camera";
        this.name = null;
        this.isDirty = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BoundingRectangleSystem__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SpatialPartitionSystem__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RectangleColliderSystem__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SystemsBundlerSystem__ = __webpack_require__(5);





class BroadPhaseCollisionSystem extends __WEBPACK_IMPORTED_MODULE_3__SystemsBundlerSystem__["a" /* default */] {
    constructor() {
        super();

        this.systems.push(new __WEBPACK_IMPORTED_MODULE_0__BoundingRectangleSystem__["a" /* default */]());
        this.systems.push(new __WEBPACK_IMPORTED_MODULE_1__SpatialPartitionSystem__["a" /* default */]());
        this.systems.push(new __WEBPACK_IMPORTED_MODULE_2__RectangleColliderSystem__["a" /* default */]());
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BroadPhaseCollisionSystem;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BoundingRentangleUpdater__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_BoundingRectangleService__ = __webpack_require__(22);



const RECTANGLE_ENTITIES_DEPENDENCIES = ["transform", "rectangle"];

class BoundingRectangleSystem {
    constructor() {
        this.world = null;
        this.rectangleUpdater = new __WEBPACK_IMPORTED_MODULE_0__BoundingRentangleUpdater__["a" /* default */]();
        this.boundingRectangleService = new __WEBPACK_IMPORTED_MODULE_1__services_BoundingRectangleService__["a" /* default */]();
    }

    addRectangleEntity(_entity) {
        const entity = _entity;
        if (this.boundingRectangleService.entitiesById[entity.id] == null) {
            this.boundingRectangleService.entitiesById[entity.id] = entity;
            this.boundingRectangleService.entities.push(entity);
        }

    }

    isRectangleEntity(_entity) {
        const entity = _entity;
        return entity.hasComponents(RECTANGLE_ENTITIES_DEPENDENCIES);
    }

    isDirty(_entity) {
        const entity = _entity;
        return entity.getComponent("rectangle").isDirty || entity.getComponent("transform").isDirty;
    }

    removeRectangleEntity(_entity) {
        const entity = _entity;
        if (this.boundingRectangleService.entitiesById[entity.id]) {
            delete this.boundingRectangleService.entitiesById[entity.id];
            const index = this.boundingRectangleService.entities.indexOf(entity);
            this.boundingRectangleService.entities.splice(index, 1);
        }
    }

    wasRectangleEntity(_entity, _component) {
        const entity = _entity;
        const component = _component;
        return this.boundingRectangleService.entitiesById[entity.id] && RECTANGLE_ENTITIES_DEPENDENCIES.indexOf(component.type) > -1;
    }

    // Life cycle methods
    activated(_world) {
        this.world = _world;
        this.world.addService(this.boundingRectangleService);
    }

    afterUpdate() {
        const dirtyEntities = this.boundingRectangleService.dirtyEntities;
        for (let x = 0; x < dirtyEntities.length; x++) {
            const entity = dirtyEntities[x];
            entity.getComponent("transform").isDirty = false;
            entity.getComponent("rectangle").isDirty = false;
        }
    }

    componentAdded(_entity, _component) {
        const entity = _entity;
        this.entityAdded(entity);
    }

    componentRemoved(_entity, _component) {
        const entity = _entity;
        const component = _component;
        if (this.wasRectangle(entity, component)) {
            this.removeRectangleEntity(entity);
        }
    }

    entityAdded(_entity) {
        const entity = _entity;
        if (this.isRectangleEntity(entity)) {
            this.addRectangleEntity(entity);
        }
    }

    entityRemoved(_entity) {
        const entity = _entity;
        if (this.isRectangleEntity(entity)) {
            this.removeRectangleEntity(entity);
        }
    }

    deactivated() {
        this.world.removeService(this.boundingRectangleService);
        this.world = null;
        this.boundingRectangleService.entitiesById = {};
        this.boundingRectangleService.dirtyEntities.length = 0;
    }

    update() {
        const dirtyEntities = this.boundingRectangleService.dirtyEntities;
        const entities = this.boundingRectangleService.entities;

        dirtyEntities.length = 0;

        for (let x = 0; x < entities.length; x++) {
            const entity = entities[x];

            if (this.isDirty(entity)) {
                this.rectangleUpdater.setEntity(entity);
                this.rectangleUpdater.update();
                dirtyEntities.push(entity);
            }
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoundingRectangleSystem;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(4);


class BoundingRectangleUpdater {
    constructor() {
        this.entity = null;
        this.rectangle = null;
        this.corners = [{
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }];

        this.rotatedPoint = {
            x: 0,
            y: 0
        };

        this.min = {
            x: 0,
            y: 0
        };

        this.max = {
            x: 0,
            y: 0
        };

        this.transformedPoint = {
            x: 0,
            y: 0
        };

        this.origin = {
            x: 0,
            y: 0
        };

        this.transformedPoint = {
            x: 0,
            y: 0
        };
    }

    setEntity(_entity) {
        this.entity = _entity;
        this.rectangle = this.entity.getComponent("rectangle");
        this.transform = this.entity.getComponent("transform");
        this.origin = this.transform.origin;
    }

    update() {
        this.updateOrigin();
        this.updateCorners();
        this.updateBoundingRectangle();
    }

    updateCorners() {
        this.corners[0].x = -this.transform.origin.x;
        this.corners[0].y = -this.transform.origin.y;

        this.corners[1].x = this.rectangle.width - this.transform.origin.x;
        this.corners[1].y = -this.transform.origin.y;

        this.corners[2].x = this.rectangle.width - this.transform.origin.x;
        this.corners[2].y = this.rectangle.height - this.transform.origin.y;

        this.corners[3].x = -this.transform.origin.x;
        this.corners[3].y = this.rectangle.height - this.transform.origin.y;
    }

    updateBoundingRectangle() {
        const corners = this.corners;
        const angle = this.transform.rotation;
        const rotatedPoint = this.rotatedPoint;
        const position = this.transform.position;
        const min = this.min;
        const max = this.max;

        min.x = max.x = position.x;
        min.y = max.y = position.y;

        for (let x = 0; x < corners.length; x++) {
            __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].rotate(corners[x], angle, rotatedPoint);
            min.x = Math.min(position.x - rotatedPoint.x, min.x);
            min.y = Math.min(position.y - rotatedPoint.y, min.y);
            max.x = Math.max(position.x - rotatedPoint.x, max.x);
            max.y = Math.max(position.y - rotatedPoint.y, max.y);
        }

        this.rectangle.top = Math.floor(min.y);
        this.rectangle.left = Math.floor(min.x);
        this.rectangle.bottom = Math.ceil(max.y);
        this.rectangle.right = Math.ceil(max.x);
        this.rectangle.transformedWidth = this.rectangle.right - this.rectangle.left;
        this.rectangle.transformedHeight = this.rectangle.bottom - this.rectangle.top;
    }

    updateOrigin() {
        this.transform.origin.x = Math.floor(this.rectangle.width / 2);
        this.transform.origin.y = Math.floor(this.rectangle.height / 2);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoundingRectangleUpdater;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BoundingRectangleService {
    constructor(){
        this.name = "bounding-rectangle-service";
        this.entitiesById = {};
        this.dirtyEntities = [];
        this.entities = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoundingRectangleService;


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Grid__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_SpatialPartitionService__ = __webpack_require__(25);



const PLACABLE_ENTITY_DEPENDENCIES = ["transform", "rectangle", "spatial-partition"];

class SpatialPartitionSystem {
    constructor() {
        this.world = null;
        this.boundingRectangleData = null;
        this.spatialPartitionService = new __WEBPACK_IMPORTED_MODULE_1__services_SpatialPartitionService__["a" /* default */]();
        this.spatialPartitionService.grid = new __WEBPACK_IMPORTED_MODULE_0__Grid__["a" /* default */]();
    }

    addPlacableEntity(entity) {
        this.spatialPartitionService.entitiesById[entity.id] = entity;
    }

    updateGrid() {
        const spatialPartitionService = this.spatialPartitionService;
        const dirtyEntities = this.boundingRectangleData.dirtyEntities;
        const grid = this.spatialPartitionService.grid;

        spatialPartitionService.dirtyCellPositions = {};

        for (let i = 0; i < dirtyEntities.length; i++) {
            const entity = dirtyEntities[i];

            const spatialPartition = entity.getComponent("spatial-partition");

            if (spatialPartition == null) {
                continue;
            }

            const lastCellPositions = spatialPartition.cellPositions;
            const newCellPositions = this.getCellPositions(entity);

            spatialPartition.lastCellPositions = lastCellPositions;
            spatialPartition.cellPositions = newCellPositions;

            for (let x = 0; x < lastCellPositions.length; x++) {
                const cellPosition = lastCellPositions[x];
                const key = grid.getKey(cellPosition.column, cellPosition.row);
                spatialPartitionService.dirtyCellPositions[key] = cellPosition;
            }

            for (let x = 0; x < newCellPositions.length; x++) {
                const cellPosition = newCellPositions[x];
                const key = grid.getKey(cellPosition.column, cellPosition.row);
                spatialPartitionService.dirtyCellPositions[key] = cellPosition;
            }

            grid.remove(lastCellPositions, entity);

            if (this.world.getEntityById(entity.id) != null) {
                grid.add(newCellPositions, entity);
            }

        }

    }

    getCellPositions(entity) {
        const rectangle = entity.getComponent("rectangle");
        const top = rectangle.top;
        const left = rectangle.left;
        const right = rectangle.right - 1;
        const bottom = rectangle.bottom - 1;
        const cellSize = this.spatialPartitionService.cellSize;

        const topCell = Math.floor(top / cellSize);
        const bottomCell = Math.floor(bottom / cellSize);
        const leftCell = Math.floor(left / cellSize);
        const rightCell = Math.floor(right / cellSize);

        let row = topCell;
        let column = leftCell;

        let cellPositions = [];

        while (row <= bottomCell) {
            while (column <= rightCell) {
                cellPositions.push({ column, row });
                column += 1;
            }
            column = leftCell;
            row += 1;
        }

        return cellPositions;
    }

    isPlacable(_entity) {
        const entity = _entity;
        return entity.hasComponents(PLACABLE_ENTITY_DEPENDENCIES);
    }

    isReady() {
        return this.world != null && this.boundingRectangleData != null;
    }

    removePlacableEntity(_entity) {
        const entity = _entity;
        const entitiesById = this.spatialPartitionService.entitiesById;
        const spatialPartitioning = entity.getComponent("spatial-partition");
        const cellPositions = spatialPartitioning.cellPositions;

        this.spatialPartitionService.grid.remove(cellPositions, entity);

        delete entitiesById[entity.id];
    }

    wasEntityPlacable(entity, component) {
        return this.spatialPartitionService.entitiesById[entity.id] &&
            PLACABLE_ENTITY_DEPENDENCIES.indexOf(component.type) > -1;
    }

    //Life Cycle Hooks
    activated(world) {
        this.world = world;

        const entities = this.world.getEntities();
        for (let x = 0; x < entities.length; x++) {
            const entity = entities[x];
            this.entityAdded(entity);
        }

        const services = this.world.getServices();
        for (let name in services) {
            this.serviceAdded(name, services[name]);
        }

        world.addService(this.spatialPartitionService);
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (this.wasEntityPlacable(entity, component)) {
            this.removePlacableEntity(entity);
        }
    }

    deactivated() {
        world.removeService(this.spatialPartitionService);

        this.world = null;
        this.spatialPartitionService.grid.clear();
        this.spatialPartitionService.dirtyCellPositions = [];
        this.spatialPartitionService.dirtyEntities = [];
    }

    entityAdded(_entity) {
        const entity = _entity;

        if (this.isPlacable(entity)) {
            this.addPlacableEntity(entity);
        }
    }

    entityRemoved(_entity) {
        const entity = _entity;

        if (this.isPlacable(entity)) {
            this.removePlacableEntity(entity);
        }
    }

    serviceAdded(name, service) {
        if (name === "bounding-rectangle-service") {
            this.boundingRectangleData = service;
        }
    }

    serviceRemoved(name) {
        if (name === "bounding-rectangle-service") {
            this.boundingRectangleData = null;
        }
    }


    update() {
        if (this.isReady()) {
            this.updateGrid();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpatialPartitionSystem;


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const emptyArray = Object.freeze([]);

class Grid {
    constructor(buckets = {}) {
        this.buckets = buckets;
    }

    add(cellPositions, entity) {
        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            let bucket = this.getBucket(cellPosition);

            if (bucket == null) {
                this.createBucket(cellPosition);
                bucket = this.getBucket(cellPosition);
            }

            bucket.push(entity);
        }
    }

    createBucket({ column, row }) {
        const key = this.getKey(column, row);

        if (this.buckets[key] == null) {
            this.buckets[key] = [];
        }
    }

    clear() {
        for (let key in this.buckets) {
            delete this.buckets[key];
        }
    }

    getBucket({ column, row }) {
        const key = this.getKey(column, row);
        return this.buckets[key] || null;
    }

    getBuckets(_start, _end) {
        const start = _start;
        const end = _end;
        const results = [];

        for (let y = start.row; y <= end.row; y++) {
            for (let x = start.column; x <= end.column; x++) {
                const bucket = this.getBucket({ column: x, row: y });
                bucket.push(bucket || emptyArray);
            }
        }
        return results;
    }

    getKey(column, row) {
        return `${column}_${row}`;
    }

    remove(cellPositions, entity) {
        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            const bucket = this.getBucket(cellPosition);

            if (bucket == null) {
                return;
            }

            const index = bucket.indexOf(entity);

            if (index > -1) {
                bucket.splice(index, 1);
            }

            if (bucket.length === 0) {
                delete this.buckets[this.getKey(cellPosition.column, cellPosition.row)]
            }
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SpatialPartitionService {
    constructor(cellSize = 128) {
        this.name = "spatial-partition-service";
        this.entitiesById = {};
        this.dirtyCellPositions = {};
        this.grid = {};
        this.cellSize = cellSize;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpatialPartitionService;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Collision__ = __webpack_require__(27);
﻿
const emptyArray = [];

class RectangleColliderSystem {
    constructor(cellSize = 200) {
        this.cellSize = cellSize;
        this.world = null;
        this.currentTimestamp = 0;
        this.name = "Rectangle Collider System";
        this.intersection = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        this.availableCollisions = [];
        this.spatialPartitionService = null;
    }

    removeCollisionsFromEntity(_entity) {
        const entity = _entity;
        const collider = entity.getComponent("rectangle-collider");

        if (collider != null) {
            const collisions = collider.collisions;

            for (let id in collisions) {
                this.releaseCollision(collisions[id]);
            }

            collider.collisions = {};
        }
    }

    removeCollisionsFromEntities(_entities) {
        const entities = _entities;
        for (let x = 0; x < entities.length; x++) {
            this.removeCollisionsFromEntity(entities[x]);
        }
    }

    createCollision(_id) {
        const id = _id;

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
            return collision;
        }
        return new __WEBPACK_IMPORTED_MODULE_0__Collision__["a" /* default */](id);
    }

    getIntersection(_rectangleA, _rectangleB) {
        const rectangleA = _rectangleA;
        const rectangleB = _rectangleB;
        const top = Math.max(rectangleA.top, rectangleB.top);
        const bottom = Math.min(rectangleA.bottom, rectangleB.bottom);
        const left = Math.max(rectangleA.left, rectangleB.left);
        const right = Math.min(rectangleA.right, rectangleB.right);

        if (top < bottom && left < right) {
            this.intersection.top = top;
            this.intersection.left = left;
            this.intersection.right = right;
            this.intersection.bottom = bottom;

            return this.intersection;
        }

        return null;
    }

    isReady() {
        return this.spatialPartitionService != null;
    }

    releaseCollision(_collision) {
        const collision = _collision;
        if (collision != null) {
            this.availableCollisions.push(collision);
        }
    }

    updateCollisions() {
        const cellPositions = this.spatialPartitionService.dirtyCellPositions;
        const grid = this.spatialPartitionService.grid;

        for (let key in cellPositions) {
            const entities = grid.getBucket(cellPositions[key]) || emptyArray;
            this.removeCollisionsFromEntities(entities);
        }

        for (let key in cellPositions) {
            const cellPosition = cellPositions[key];
            const entities = grid.getBucket(cellPosition) || emptyArray;

            for (let y = 0; y < entities.length; y++) {
                const entity = entities[y];
                const rectangle = entity.getComponent("rectangle");
                const collider = entity.getComponent("rectangle-collider");

                if (collider == null || rectangle == null) {
                    continue;
                }

                const collisions = collider.collisions;
                const index = y;

                for (let x = index + 1; x < entities.length; x++) {
                    const otherEntity = entities[x];
                    const otherRectangle = otherEntity.getComponent("rectangle");
                    const otherCollider = otherEntity.getComponent("rectangle-collider");

                    if (otherCollider == null || otherRectangle == null) {
                        continue;
                    }

                    const otherCollisions = otherCollider.collisions;

                    if ((otherCollisions[entity.id] &&
                        otherCollisions[entity.id].timestamp === this.currentTimestamp)) {
                        continue;
                    }

                    const intersection = this.getIntersection(rectangle, otherRectangle);

                    if (intersection != null) {

                        let collision = this.createCollision(entity.id);
                        collision.timestamp = this.currentTimestamp;
                        collision.intersection.top = intersection.top;
                        collision.intersection.left = intersection.left;
                        collision.intersection.right = intersection.right;
                        collision.intersection.bottom = intersection.bottom;
                        collision.cellPosition = cellPosition;

                        let otherCollision = this.createCollision(otherEntity.id);
                        otherCollision.timestamp = this.currentTimestamp;
                        otherCollision.intersection.top = intersection.top;
                        otherCollision.intersection.left = intersection.left;
                        otherCollision.intersection.right = intersection.right;
                        otherCollision.intersection.bottom = intersection.bottom;
                        otherCollision.cellPosition = cellPosition;

                        otherCollisions[entity.id] = collision;
                        collisions[otherEntity.id] = otherCollision;

                    }

                }

            }
        }

    }

    //Life Cycle Methods
    activated(_world) {
        const world = _world;
        this.world = world
    }

    deactivated(_world) {
        this.world = null;
        this.currentTimestamp = 0;
        this.spatialPartitionService = null;
    }

    serviceAdded(name, service) {
        if (name === "spatial-partition-service") {
            this.spatialPartitionService = service;
        }
    }

    serviceRemoved(name) {
        if (name === "spatial-partition-service") {
            this.spatialPartitionService = null;
        }
    }

    update(currentTimestamp) {
        if (this.isReady()) {
            this.currentTimestamp = currentTimestamp;
            this.updateCollisions();
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = RectangleColliderSystem;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Collision;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemsBundlerSystem__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PolygonSystem__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PolygonColliderSystem__ = __webpack_require__(31);




class NarrowPhaseCollisionSystem extends __WEBPACK_IMPORTED_MODULE_0__SystemsBundlerSystem__["a" /* default */] {
    constructor(){
        super();

        this.systems.push(new __WEBPACK_IMPORTED_MODULE_1__PolygonSystem__["a" /* default */]());
        this.systems.push(new __WEBPACK_IMPORTED_MODULE_2__PolygonColliderSystem__["a" /* default */]());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NarrowPhaseCollisionSystem;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PolygonUpdater__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Entity__ = __webpack_require__(0);



const POLYGON_DEPENDENCIES = ["transform", "rectangle", "polygon"];
const POLYGON_BODY_DEPENDENCIES = ["transform", "rectangle", "polygon-body"];

class PolygonSystem {
    constructor() {
        this.world = null;
        this.polygonUpdater = new __WEBPACK_IMPORTED_MODULE_0__PolygonUpdater__["a" /* default */]();
        this.boundingRectangleService = null;
    }

    isPolygonEntity(_entity) {
        const entity = _entity;
        return entity.hasComponents(POLYGON_DEPENDENCIES);
    }

    isPolygonBodyEntity(_entity) {
        const entity = _entity;
        return entity.hasComponents(POLYGON_BODY_DEPENDENCIES);
    }
    
    // Life cycle methods.
    activated(world) {
       this.world = world;
        
        const services = this.world.getServices();
        for (let name in services){
            this.serviceAdded(name, services[name]);
        }
    }

    deactivated() {
        this.world = null;
        this.boundingRectangleService = null;
    }

    serviceAdded(name, service){
        if (name === "bounding-rectangle-service"){
            this.boundingRectangleService = service;
        }
    }

    serviceRemoved(name, service){
        if (name === "bounding-rectangle-service"){
            this.boundingRectangleService = null;
        }
    }

    update() {
        if (this.boundingRectangleService != null) {
            const dirtyEntities = this.boundingRectangleService.dirtyEntities;

            for (let x = 0; x < dirtyEntities.length; x++) {
                const entity = dirtyEntities[x];

                if (this.isPolygonBodyEntity(entity)) {
                    this.updatePolygonBodyEntity(entity);
                } else if (this.isPolygonEntity(entity)) {
                    this.updatePolygonEntity(entity);
                }
            }
        }
    }

    updatePolygonEntity(_entity) {
        const entity = _entity;
        const polygon = entity.getComponent("polygon");
        this.polygonUpdater.setEntity(entity);
        this.polygonUpdater.setPolygon(polygon);
        this.polygonUpdater.update();
    }

    updatePolygonBodyEntity(_entity) {
        const entity = _entity;
        const polygonBody = entity.getComponent("polygon-body");
        const polygons = polygonBody.polygons;

        this.polygonUpdater.setEntity(entity);
        for (let x = 0; x < polygons.length; x++) {
            const polygon = polygons[x];
            this.polygonUpdater.setPolygon(polygon);
            this.polygonUpdater.update();
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = PolygonSystem;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(4);


class PolygonUpdater {

    constructor() {
        this.entity = null;
        this.transform = null;
        this.polygon = null;
        this.transformedPoint = {
            x: 0,
            y: 0
        };
    }

    prepareNormals() {
        const vertices = this.polygon.vertices;
        const normals = this.polygon.normals;

        if (vertices.length != normals.length) {
            for (let x = 0; x < vertices.length; x++) {
                normals.push({
                    x: 0,
                    y: 0
                });
            }
        }

    }

    prepareRotatedPoints() {
        const rotatedPoints = this.polygon.rotatedPoints;
        const points = this.polygon.points;

        if (rotatedPoints.length !== points.length) {
            rotatedPoints.length = 0;

            for (let x = 0; x < points.length; x++) {
                rotatedPoints.push({
                    x: points[x].x,
                    y: points[x].y
                });
            }
        }
    }

    prepareVertices() {
        const points = this.polygon.points;
        const vertices = this.polygon.vertices;

        if (vertices.length !== points.length) {
            vertices.length = 0;

            for (let x = 0; x < points.length; x++) {
                vertices.push({
                    x: 0,
                    y: 0
                });
            }
        }
    }

    prepareWorldPoints() {
        const worldPoints = this.polygon.worldPoints;
        const points = this.polygon.rotatedPoints;

        if (worldPoints.length !== points.length) {
            worldPoints.length = 0;

            for (let x = 0; x < points.length; x++) {
                worldPoints.push({
                    x: 0,
                    y: 0
                });
            }
        }
    }

    setEntity(entity) {
        this.entity = entity;
        this.transform = entity.getComponent("transform");
    }

    setPolygon(polygon) {
        this.polygon = polygon;
    }

    update() {
        this.updateRotatedPoints();
        this.updateWorldPoints();
        this.updateVertices();
        this.updateNormals();
        this.updateSize();
    }

    updateNormals() {
        this.prepareNormals();

        const normals = this.polygon.normals;
        const vertices = this.polygon.vertices;

        for (let x = 0; x < vertices.length; x++) {
            const vertex = vertices[x];
            const normal = normals[x];

            __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].normalize(__WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].getLeftNormal(vertex, normal), normal);
        }
    }

    updateRotatedPoints() {
        this.prepareRotatedPoints();
        const transform = this.transform;
        const polygon = this.polygon;

        // Only update if necessary.
        if (transform.rotation !== polygon.rotation || polygon.isDirty) {
            polygon.isDirty = false;
            polygon.rotation = transform.rotation;

            const points = polygon.points;
            const rotatedPoints = polygon.rotatedPoints;
            const angle = transform.rotation;
            const origin = transform.origin;

            for (let x = 0; x < points.length; x++) {
                const point = points[x];
                this.transformedPoint.x = point.x - origin.x;
                this.transformedPoint.y = point.y - origin.y;

                const rotatedPoint = rotatedPoints[x];

                __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].rotate(this.transformedPoint, angle, rotatedPoint);
            }
        }
    }

    updateSize() {
        const polygon = this.polygon;
        const points = polygon.rotatedPoints;
        const length = points.length;

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

        const width = right - left;
        const height = bottom - top;

        polygon.size.width = width;
        polygon.size.height = height;

        polygon.center.x = left + this.transform.position.x + (width / 2);
        polygon.center.y = top + this.transform.position.y + (height / 2);
    }

    updateVertices() {
        this.prepareVertices();

        const rotation = this.transform.rotation;
        const points = this.polygon.rotatedPoints;
        const vertices = this.polygon.vertices;

        for (let x = 0; x < points.length; x++) {
            const point = points[x];
            const vertex = vertices[x];

            const nextPoint = points[x + 1] || points[0];

            vertex.x = point.x - nextPoint.x;
            vertex.y = point.y - nextPoint.y;
        }

    }

    updateWorldPoints() {
        this.prepareWorldPoints();

        const position = this.transform.position;
        const rotatedPoints = this.polygon.rotatedPoints;
        const worldPoints = this.polygon.worldPoints;

        for (let x = 0; x < rotatedPoints.length; x++) {
            worldPoints[x].x = rotatedPoints[x].x + position.x;
            worldPoints[x].y = rotatedPoints[x].y + position.y;
        }

    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = PolygonUpdater;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CollisionDetector__ = __webpack_require__(32);


class PolygonColliderSystem {
    constructor() {
        this.collisionDetector = null;
        this.boundingRectangleService = null;
        this.world = null;
        this.currentTime = 0;
        this.dirtyPolygons = [];
    }

    cleanCollisions() {
        const dirtyPolygons = this.dirtyPolygons;

        for (let x = 0; x < dirtyPolygons.length; x++) {
            this.removeCollisionsFromDirtyEntity(dirtyPolygons[x]);
        }
    }

    findDirtyPolygons() {
        const dirtyEntities = this.boundingRectangleService.dirtyEntities;
        const dirtyPolygons = this.dirtyPolygons = [];

        for (let x = 0; x < dirtyEntities.length; x++) {
            const entity = dirtyEntities[x];

            if (this.isPolygon(entity)) {
                dirtyPolygons.push(entity);
            }
        }
    }

    isPolygon(entity) {
        return entity.hasComponent("polygon-collider");
    }

    isReady() {
        return this.boundingRectangleService != null;
    }

    removeCollisionsFromDirtyEntity(entity) {
        let polygons;
        const collider = entity.getComponent("polygon-collider");

        // If we need to optimize this further, this would be a good place to start.
        // Create a collision pool like in rectangleColliderSystem.
        collider.collisions = {};
    }

    updatePolygonEntity(entity) {
        const rectangleCollider = entity.getComponent("rectangle-collider");

        if (rectangleCollider) {
            const collisions = rectangleCollider.collisions;

            for (let id in collisions) {
                const otherEntity = this.world.getEntityById(id);

                if (otherEntity == null) {
                    continue;
                }

                this.collisionDetector.updateCollisions(entity, otherEntity, this.currentTime);
            }
        }
    }

    updateCollisions() {
        const dirtyPolygons = this.dirtyPolygons;

        for (let x = 0; x < dirtyPolygons.length; x++) {
            this.updatePolygonEntity(dirtyPolygons[x]);
        }

    }

    // Life Cycle Methods
    activated(world) {
        this.world = world;
        const services = this.world.getServices();
        this.collisionDetector = new __WEBPACK_IMPORTED_MODULE_0__CollisionDetector__["a" /* default */](world);

        for (let name in services){
            this.serviceAdded(name, services[name]);
        }
    }

    deactivated() {
        this.world = null;
        this.boundingRectangleService = null;
        this.collisionDetector = null;
    }

    serviceAdded(name, service) {
        if (name === "bounding-rectangle-service") {
            this.boundingRectangleService = service;
        }
    }

    update(currentTime) {
        if (this.isReady()) {
            this.currentTime = currentTime;
            this.findDirtyPolygons();
            this.cleanCollisions();
            this.updateCollisions();
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = PolygonColliderSystem;



/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(4);


class CollisionDetector {
    constructor() {
        this.entityA = null;
        this.entityB = null;
        this.currentTime = 0;
        this.colliderA = [];
        this.colliderB = [];
        this.transformA = null;
        this.transformB = null;
        this.polygonsA = [];
        this.polygonsB = [];

        // Loop specific variables.
        this.collisionDataA = {
            overlap: Number.MAX_VALUE,
            normal: null,
            normalIndex: null
        };
        this.collisionDataB = {
            overlap: Number.MAX_VALUE,
            normal: null,
            normalIndex: null
        };
        this.verticesA = [];
        this.verticesB = [];
        this.normalsA = [];
        this.normalsB = [];
        this.polygonA = null;
        this.polygonB = null;
        this.positionA = {
            x: 0,
            y: 0
        };
        this.positionB = {
            x: 0,
            y: 0
        };
        this.projectionA = {
            min: 0,
            max: 0
        };
        this.projectionB = {
            min: 0,
            max: 0
        };
    }

    prepareProperties() {
        const polygonBodyA = this.entityA.getComponent("polygon-body");
        const polygonA = this.entityA.getComponent("polygon");
        const polygonBodyB = this.entityB.getComponent("polygon-body");
        const polygonB = this.entityB.getComponent("polygon");

        if (polygonBodyA == null) {
            this.polygonsA = [polygonA];
        } else {
            this.polygonsA = polygonBodyA.polygons;
        }

        if (polygonBodyB == null) {
            this.polygonsB = [polygonB];
        } else {
            this.polygonsB = polygonBodyB.polygons;
        }

        this.transformA = this.entityA.getComponent("transform");
        this.transformB = this.entityB.getComponent("transform");
        this.colliderA = this.entityA.getComponent("polygon-collider");
        this.colliderB = this.entityB.getComponent("polygon-collider");
    }

    preparePolygonA(polygon) {
        this.verticesA = polygon.worldPoints;
        this.normalsA = polygon.normals;
        this.polygonA = polygon;

        this.collisionDataA.overlap = Number.MAX_VALUE;
        this.collisionDataA.normal = null;
        this.collisionDataA.normalIndex = null;

        this.positionA = this.transformA.position;
    }

    preparePolygonB(polygon) {
        this.verticesB = polygon.worldPoints;
        this.normalsB = polygon.normals;
        this.polygonB = polygon;

        this.collisionDataB.overlap = Number.MAX_VALUE;
        this.collisionDataB.normal = null;
        this.collisionDataB.normalIndex = null;

        this.positionB = this.transformB.position;
    }

    projectToAxis(vertices, normal, projection) {
        let min = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].dot(vertices[0], normal);
        let max = min;
        let dot;

        for (let i = 1; i < vertices.length; i += 1) {
            dot = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].dot(vertices[i], normal);

            if (dot > max) {
                max = dot;
            } else if (dot < min) {
                min = dot;
            }
        }

        projection.min = min;
        projection.max = max;
    }

    updateCollisions(entityA, entityB, currentTime) {
        if (!entityA.hasComponent("polygon-collider") ||
            !entityB.hasComponent("polygon-collider")) {
            return;
        }

        this.entityA = entityA;
        this.entityB = entityB;
        this.currentTime = currentTime;

        this.prepareProperties();
        this.checkForCollisions();
    }

    projectVerticesOnEntityBNormals() {
        for (let i = 0; i < this.normalsB.length; i++) {
            const normal = this.normalsB[i];

            this.projectToAxis(this.verticesA, normal, this.projectionA);
            this.projectToAxis(this.verticesB, normal, this.projectionB);

            const overlap = Math.min(
                this.projectionA.max - this.projectionB.min,
                this.projectionB.max - this.projectionA.min
            );

            if (overlap < this.collisionDataA.overlap) {
                this.collisionDataA.overlap = overlap;
                this.collisionDataA.normal = normal;
                this.collisionDataA.normalIndex = i;
            }
        }
    }

    projectVerticesOnEntityANormals() {
        for (let i = 0; i < this.normalsA.length; i++) {
            const normal = this.normalsA[i];

            this.projectToAxis(this.verticesA, normal, this.projectionA);
            this.projectToAxis(this.verticesB, normal, this.projectionB);

            const overlap = Math.min(
                this.projectionA.max - this.projectionB.min,
                this.projectionB.max - this.projectionA.min
            );

            if (overlap < this.collisionDataB.overlap) {
                this.collisionDataB.overlap = overlap;
                this.collisionDataB.normal = normal;
                this.collisionDataB.normalIndex = i;
            }
        }
    }

    checkForCollisions() {
        for (let a = 0; a < this.polygonsA.length; a++) {
            this.preparePolygonA(this.polygonsA[a]);

            for (let b = 0; b < this.polygonsB.length; b++) {
                this.preparePolygonB(this.polygonsB[b]);

                // If the collision has already been calculated.
                if (this.colliderA.collisions[this.entityB.id] != null) {
                    continue;
                }

                this.projectVerticesOnEntityBNormals();

                if (this.collisionDataA.overlap <= 0) {
                    continue;
                }

                this.projectVerticesOnEntityANormals();

                if (this.collisionDataB.overlap <= 0) {
                    continue;
                }

                const collisionA = {};
                collisionA.otherEntity = this.entityB;
                collisionA.entity = this.entityA;

                const collisionB = {};
                collisionB.otherEntity = this.entityA;
                collisionB.entity = this.entityB;

                if (this.collisionDataA.overlap < this.collisionDataB.overlap) {

                    const minOverlap = this.collisionDataA.overlap;
                    const direction = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].subtract(this.positionA, this.positionB);

                    let normal = this.collisionDataA.normal;

                    if (__WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].dot(normal, direction) < 0) {
                        normal = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].negate(normal);
                    }

                    const penetration = {
                        x: minOverlap * normal.x,
                        y: minOverlap * normal.y
                    };

                    collisionA.penetration = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].negate(penetration);
                    collisionA.normal = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].negate(normal);

                    collisionB.penetration = penetration;
                    collisionB.normal = normal;

                } else {

                    const minOverlap = this.collisionDataB.overlap;
                    const direction = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].subtract(this.positionB, this.positionA);

                    let normal = this.collisionDataB.normal;

                    if (__WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].dot(normal, direction) < 0) {
                        normal = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].negate(normal);
                    }

                    const penetration = {
                        x: minOverlap * normal.x,
                        y: minOverlap * normal.y
                    };

                    collisionA.penetration = penetration;
                    collisionA.normal = normal;

                    collisionB.penetration = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].negate(penetration);
                    collisionB.normal = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].negate(normal);

                }

                this.colliderA.collisions[this.entityB.id] = collisionA;
                this.colliderB.collisions[this.entityA.id] = collisionB;

            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CollisionDetector;


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CameraSystem_Compositor__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CameraSystem_CanvasFactory__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CameraSystem_ImageFactory__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CameraSystem_BitmapRasterizer__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CameraSystem_PolygonRasterizer__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CameraSystem_LineRasterizer__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CameraSystem_ShapeRasterizer__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__CameraSystem_TextRasterizer__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CameraSystem__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__CameraSystem_BitmapCache__ = __webpack_require__(45);











class DefaultCameraSystem extends __WEBPACK_IMPORTED_MODULE_8__CameraSystem__["a" /* default */] {
    constructor({ canvas, cameraName, sort }) {
        const compositor = new __WEBPACK_IMPORTED_MODULE_0__CameraSystem_Compositor__["a" /* default */]();
        const canvasFactory = new __WEBPACK_IMPORTED_MODULE_1__CameraSystem_CanvasFactory__["a" /* default */]();
        const imageFactory = new __WEBPACK_IMPORTED_MODULE_2__CameraSystem_ImageFactory__["a" /* default */]();
        const bitmapCache = new __WEBPACK_IMPORTED_MODULE_9__CameraSystem_BitmapCache__["a" /* default */]({imageFactory, canvasFactory});
        const bitmapRasterizer = new __WEBPACK_IMPORTED_MODULE_3__CameraSystem_BitmapRasterizer__["a" /* default */]({ canvasFactory, bitmapCache, imageFactory });
        const lineRasterizer = new __WEBPACK_IMPORTED_MODULE_5__CameraSystem_LineRasterizer__["a" /* default */](canvasFactory);
        const shapeRasterizer = new __WEBPACK_IMPORTED_MODULE_6__CameraSystem_ShapeRasterizer__["a" /* default */](canvasFactory);
        const textRasterizer = new __WEBPACK_IMPORTED_MODULE_7__CameraSystem_TextRasterizer__["a" /* default */](canvasFactory);

        super({
            canvas,
            cameraName,
            compositor,
            canvasFactory,
            sort
        });

        this.polygonRasterizer = null;
        this.canvasFactory = canvasFactory;
        this.compositor = compositor;
        this.bitmapCache = bitmapCache;

        compositor.addRasterizer(bitmapRasterizer);
        compositor.addRasterizer(lineRasterizer);
        compositor.addRasterizer(shapeRasterizer);
        compositor.addRasterizer(textRasterizer);
    }

    enablePolygonRasterizer(colors) {
        if (this.polygonRasterizer == null) {
            this.polygonRasterizer = new __WEBPACK_IMPORTED_MODULE_4__CameraSystem_PolygonRasterizer__["a" /* default */]({ canvasFactory: this.canvasFactory, colors });
            this.compositor.addRasterizer(this.polygonRasterizer);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DefaultCameraSystem;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const sortByZIndex = (a, b) => (a.zIndex || Infinity) - (b.zIndex || Infinity);

class Compositor {
    constructor() {
        this.rasterizers = {};
        this.images = {};
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
    }

    cleanEntity(_entity) {
        const entity = _entity;

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            if (component != null) {
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

    emptyCache(){
        this.images = {};
    }

    isRenderable(_entity) {
        const entity = _entity;

        for (let type in this.rasterizers) {
            if (entity.hasComponent(type)) {
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
            };
        }

        return false;
    }

    getEntityImages(_entity) {
        const entity = _entity;
        const rasterizers = this.rasterizers;

        if (entity == null) {
            return [];
        }

        let images = [];

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            if (component != null) {
                const rasterizer = rasterizers[type];
                const imageId = rasterizer.getIdentity(entity);
                let image = this.getImage(imageId);

                if (image == null) {
                    image = rasterizer.rasterize(entity);
                    this.saveImage(imageId, image);
                }

                component.isDirty = false;
                images.push(image);
            }
        }

        images.sort(sortByZIndex);

        return images;

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Compositor;


/***/ }),
/* 35 */
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
/* 36 */
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
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BitmapRasterizer {
    constructor({
        bitmapCache,
        canvasFactory
    }) {
        this.type = "bitmap";
        this.bitmapCache = bitmapCache;
        this.canvasFactory = canvasFactory;
        this.missingBitmapCanvas = null;
        this.createMissingBitmapCanvas();
    }

    createMissingBitmapCanvas() {
        const canvas = this.missingBitmapCanvas = this.canvasFactory.create();
        const context = canvas.getContext("2d");
        canvas.width = 128;
        canvas.height = 128;

        context.globalAlpha = 0.75;
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = 15;
        context.strokeStyle = "rgba(255,40,40)";
        context.lineTo(0, 0);
        context.lineTo(128, 0);
        context.lineTo(128, 128);
        context.lineTo(0, 128);
        context.lineTo(0, 0);
        context.moveTo(0, 0);
        context.lineTo(128, 128);
        context.moveTo(0, 128);
        context.lineTo(128, 0);
        context.stroke();
        context.closePath();

    }

    getIdentity(entity) {
        const bitmap = entity.getComponent("bitmap");

        if (bitmap.isDirty) {
            const transform = entity.getComponent("transform");
            const id = bitmap && bitmap.id || null;
            bitmap.identity = `${id}|${transform.rotation}|${bitmap.opacity}`;
        }

        return bitmap.identity;
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();

        const transform = entity.getComponent("transform");
        const bitmap = entity.getComponent("bitmap");
        const rectangle = entity.getComponent("rectangle");
        const context = canvas.getContext("2d");

        const angle = transform.rotation;
        const width = rectangle.right - rectangle.left;
        const height = rectangle.bottom - rectangle.top;
        const bitmapCanvas = this.bitmapCache.get(bitmap.id) || this.missingBitmapCanvas;

        canvas.width = width;
        canvas.height = height;

        context.translate(width / 2, height / 2);
        context.rotate(angle * Math.PI / 180);

        context.drawImage(
            bitmapCanvas,
            0,
            0,
            bitmapCanvas.width,
            bitmapCanvas.height,
            -rectangle.width / 2,
            -rectangle.height / 2,
            rectangle.width,
            rectangle.height,
        );

        return canvas;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = BitmapRasterizer;


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_overlay__ = __webpack_require__(6);


const defaultColors = {
    rotatedPoints: "rgba(255, 0, 0, 1)",
    normals: "rgba(80, 80, 220, 1)",
    center: "rgba(80, 255, 80, 1)",
    size: "rgba(255, 0, 0, 1)",
    penetration: "rgba(80, 255, 80, 1)"
};

class PolygonRasterizer {
    constructor({ canvasFactory, colors }) {
        this.type = "polygon-body";
        this.canvasFactory = canvasFactory;
        this.colors = Object(__WEBPACK_IMPORTED_MODULE_0__utilities_overlay__["a" /* default */])(defaultColors, colors);
    }

    getIdentity(entity) {
        return `polygon-${entity.id}`;
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();
        const context = canvas.getContext("2d");

        const polygonBody = entity.getComponent("polygon-body");
        const polygonCollider = entity.getComponent("polygon-collider");

        polygonBody.polygons.forEach((polygon) => {
            const width = polygon.size.width;
            const height = polygon.size.height;
            const normalsLineSize = Math.max(width, height) * 2;

            canvas.width = width;
            canvas.height = height;

            context.translate(width / 2, height / 2);
            context.beginPath();

            polygon.rotatedPoints.forEach((point, index) => {
                const x = point.x;
                const y = point.y;

                if (index === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            });

            context.lineWidth = 1;
            context.strokeStyle = this.colors.rotatedPoints;
            context.stroke();
            context.closePath();

            context.beginPath();
            polygon.normals.forEach((point, index) => {
                const x = point.x * normalsLineSize;
                const y = point.y * normalsLineSize;

                context.moveTo(0, 0);
                context.lineTo(x, y);

            });

            context.lineWidth = 1;
            context.strokeStyle = this.colors.normals;
            context.stroke();
            context.closePath();

            if (polygonCollider != null) {
                context.beginPath();

                for (let key in polygonCollider.collisions) {
                    const collision = polygonCollider.collisions[key];
                    context.moveTo(0, 0);
                    context.lineTo(collision.penetration.x, collision.penetration.y);
                }

                context.lineWidth = 2;
                context.strokeStyle = this.colors.penetration;
                context.stroke();
            }

        });

        return canvas;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PolygonRasterizer;


/***/ }),
/* 39 */
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
        const rectangle = entity.getComponent("rectangle");
        const line = entity.getComponent("line");

        return `rectangle=${JSON.stringify(rectangle)}, line=${JSON.stringify(line)}`;
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();

        const transform = entity.getComponent("transform");
        const rectangle = entity.getComponent("rectangle");
        const line = entity.getComponent("line");
        const context = canvas.getContext("2d");

        const angle = transform.rotation;
        const width = rectangle.right - rectangle.left;
        const height = rectangle.bottom - rectangle.top;

        canvas.width = width;
        canvas.height = height;

        context.translate(width / 2, height / 2);
        context.rotate(angle * Math.PI / 180);

        if (line.thickness > 0) {
            context.globalAlpha = line.opacity;
            context.beginPath();
            context.lineCap = "round";
            context.lineWidth = line.thickness;
            context.strokeStyle = this.convertToRgba(line.color);
            context.moveTo(-line.from.x - (transform.origin.x), -line.from.y - (transform.origin.y));
            context.lineTo(-line.to.x - (transform.origin.x), -line.to.y - (transform.origin.y));
            context.stroke();
            context.closePath();
        }

        return canvas;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = LineRenderer;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class ShapeRasterizer {
    constructor(canvasFactory) {
        this.type = "shape";
        this.canvasFactory = canvasFactory;
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    getIdentity(entity) {
        const shape = entity.getComponent("shape");

        if (shape.id != null) {
            return shape.id + entity.getComponent("transform").rotation;
        } else {
            const transform = entity.getComponent("transform");
            const rectangle = entity.getComponent("rectangle");
            return `${JSON.stringify(transform)}|${JSON.stringify(shape)}|${JSON.stringify(rectangle)}`;
        }
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();
        const context = canvas.getContext("2d");

        const transform = entity.getComponent("transform");
        const rectangle = entity.getComponent("rectangle");
        const shape = entity.getComponent("shape");
        const angle = transform.rotation;
        const width = rectangle.right - rectangle.left;
        const height = rectangle.bottom - rectangle.top;
        const origin = transform.origin;

        canvas.width = width;
        canvas.height = height;

        context.translate(width / 2, height / 2);
        context.rotate(angle * Math.PI / 180);
        context.globalAlpha = shape.opacity;
        context.beginPath();

        shape.points.forEach((point, index) => {
            const x = point.x;
            const y = point.y;

            if (index === 0) {
                context.moveTo(x - origin.x, y - origin.y);
            } else {
                context.lineTo(x - origin.x, y - origin.y);
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
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class TextRasterizer {
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
        const textTexture = entity.getComponent("text");
        const rectangle = entity.getComponent("rectangle");

        return `text=${JSON.stringify(textTexture)}|${rectangle.width}|${rectangle.height}}`;
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();

        const transform = entity.getComponent("transform");
        const rectangle = entity.getComponent("rectangle");
        const textTexture = entity.getComponent("text");
        const context = canvas.getContext("2d");

        const angle = transform.rotation;
        const width = rectangle.right - rectangle.left;
        const height = rectangle.bottom - rectangle.top;

        canvas.width = width;
        canvas.height = height;

        context.translate(width / 2, height / 2);
        context.rotate(angle * Math.PI / 180);

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

        if (textTexture.horizontalAlignment === "left") {
            x = -width / 2;
        } else if (textTexture.horizontalAlignment === "right") {
            x = width / 2;
        }

        if (textTexture.verticalAlignment === "top") {
            y = -textHeight / 2;
        } else if (textTexture.verticalAlignment === "bottom") {
            y = textHeight / 2;
        }

        var color = this.convertToRgba(textTexture.font.color);

        context.fillStyle = color;
        context.fillText(textTexture.text, parseInt(x, 10), parseInt(y - (textHeight / 2), 10));

        return canvas;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TextRasterizer;


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CanvasPool__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CellRenderer__ = __webpack_require__(44);



const idSort = (_entityA, _entityB) => {
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

const emtpyArray = Object.freeze([]);

class CameraSystem {
    constructor({
        cameraName,
        canvas,
        canvasFactory,
        compositor,
        sort = idSort
    }) {
        this.canvas = canvas;
        this.cameraName = cameraName;
        this.compositor = compositor;
        this.canvasPool = new __WEBPACK_IMPORTED_MODULE_0__CanvasPool__["a" /* default */](canvasFactory);
        this.cellRenderer = new __WEBPACK_IMPORTED_MODULE_1__CellRenderer__["a" /* default */]();
        this.cellCanvases = {};
        this.camera = null;
        this.cameraComponent = null;
        this.cellSize = null;
        this.cameraRectangle = null;
        this.spatialPartitionService = null;
        this.lastRectangle = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };

        this.sort = (_entityA, _entityB) => {
            const entityA = _entityA;
            const entityB = _entityB;
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

    getCanvas(_column, _row) {
        return this.cellCanvases[`${_column}_${_row}`] || null;
    }

    releaseCellCanvasesAndSaveLastRectangle() {
        const cellSize = this.spatialPartitionService.cellSize;
        const cameraRectangle = this.cameraRectangle;

        const top = Math.floor(cameraRectangle.top / cellSize);
        const left = Math.floor(cameraRectangle.left / cellSize);
        const bottom = Math.ceil((cameraRectangle.bottom / cellSize));
        const right = Math.ceil((cameraRectangle.right / cellSize));

        for (let y = this.lastRectangle.top; y < this.lastRectangle.bottom; y++) {
            for (let x = this.lastRectangle.left; x < this.lastRectangle.right; x++) {

                const intersectionTop = Math.max(y, top);
                const intersectionLeft = Math.max(x, left);
                const intersectionBottom = Math.min(y, bottom);
                const intersectionRight = Math.min(x, right);

                if (intersectionTop > intersectionBottom || intersectionLeft > intersectionRight) {
                    const canvas = this.getCanvas(x, y);

                    if (canvas != null) {
                        this.canvasPool.release(canvas);
                    }

                    delete this.cellCanvases[`${x}_${y}`];
                }
            }
        }

        this.lastRectangle.top = top;
        this.lastRectangle.left = left;
        this.lastRectangle.bottom = bottom;
        this.lastRectangle.right = right;
    }

    drawCellCanvases() {
        const cellPositionsToRerender = [];

        for (let y = this.lastRectangle.top; y < this.lastRectangle.bottom; y++) {
            for (let x = this.lastRectangle.left; x < this.lastRectangle.right; x++) {
                let canvas = this.getCanvas(x, y);
                const cellPosition = { column: x, row: y };

                if (this.cameraComponent.isDirty) {
                    cellPositionsToRerender.push(cellPosition);
                    continue;
                }

                if (canvas == null) {
                    cellPositionsToRerender.push(cellPosition);
                    continue;
                }

                // Check to see if any rasterizable entity needs to be redrawn.
                const entities = this.spatialPartitionService.grid.getBucket(cellPosition) || emtpyArray;

                for (let z = 0; z < entities.length; z++) {
                    const entity = entities[z];

                    if (this.compositor.isEntityDirty(entity)) {
                        cellPositionsToRerender.push(cellPosition);
                        break;
                    }

                }
            }
        }

        const dirtyCellPositions = this.spatialPartitionService.dirtyCellPositions;

        for (let key in dirtyCellPositions) {
            const cellPosition = dirtyCellPositions[key];
            const cellSize = this.cellSize;

            const top = cellPosition.row * cellSize;
            const left = cellPosition.column * cellSize;
            const right = left + cellSize;
            const bottom = top + cellSize;

            const intersectionTop = Math.max(top, this.cameraRectangle.top);
            const intersectionLeft = Math.max(left, this.cameraRectangle.left);
            const intersectionBottom = Math.min(bottom, this.cameraRectangle.bottom);
            const intersectionRight = Math.min(right, this.cameraRectangle.right);

            if (intersectionTop < intersectionBottom &&
                intersectionLeft < intersectionRight) {

                cellPositionsToRerender.push(cellPosition)
            }
        }

        for (let x = 0; x < cellPositionsToRerender.length; x++) {
            const cellPosition = cellPositionsToRerender[x];
            const entities = this.spatialPartitionService.grid.getBucket(cellPosition);
            let canvas = this.getCanvas(cellPosition.column, cellPosition.row);

            if (canvas == null) {
                canvas = this.cellCanvases[`${cellPosition.column}_${cellPosition.row}`] = this.canvasPool.acquire();
            }

            this.cellRenderer.canvas = canvas;
            this.cellRenderer.context = canvas.getContext("2d");
            this.cellRenderer.entities = entities;
            this.cellRenderer.rectangle.top = cellPosition.row;
            this.cellRenderer.rectangle.left = cellPosition.column;
            this.cellRenderer.rectangle.right = cellPosition.column + 1;
            this.cellRenderer.rectangle.bottom = cellPosition.row + 1;
            this.cellRenderer.render();
        }
    }

    isCameraEntity(entity) {
        return entity.hasComponents(["camera", "transform", "rectangle"]) &&
            entity.getComponent("camera").name === this.cameraName;
    }

    transferToCanvas() {
        const cellCanvases = this.cellCanvases;
        const cellSize = this.cellSize;
        const context = this.canvas.getContext("2d");

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let key in cellCanvases) {
            const cellCanvas = cellCanvases[key];
            const parts = key.split("_");

            const top = parseInt(parts[1], 10) * cellSize;
            const left = parseInt(parts[0], 10) * cellSize;
            const right = left + cellSize;
            const bottom = top + cellSize;

            const intersectionTop = Math.max(top, this.cameraRectangle.top);
            const intersectionLeft = Math.max(left, this.cameraRectangle.left);
            const intersectionBottom = Math.min(bottom, this.cameraRectangle.bottom);
            const intersectionRight = Math.min(right, this.cameraRectangle.right);

            if (intersectionTop < intersectionBottom &&
                intersectionLeft < intersectionRight) {

                let sourceX = 0;
                let sourceY = 0;
                let destinationX = intersectionLeft - this.cameraRectangle.left;
                let destinationY = intersectionTop - this.cameraRectangle.top;
                const width = intersectionRight - intersectionLeft;
                const height = intersectionBottom - intersectionTop;

                if (width <= 0 || height <= 0) {
                    continue;
                }

                if (left < intersectionLeft) {
                    sourceX = intersectionLeft - left;
                }

                if (top < intersectionTop) {
                    sourceY = intersectionTop - top;
                }

                context.drawImage(
                    cellCanvas,
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
        }
    }

    activated(world) {
        this.world = world;

        const services = this.world.getServices();
        for (let name in services) {
            this.serviceAdded(name, services[name]);
        }
    }

    update() {
        if (this.spatialPartitionService != null) {
            this.releaseCellCanvasesAndSaveLastRectangle();
            this.drawCellCanvases();
            this.transferToCanvas();
            this.cameraComponent.isDirty = false;
        }
    }

    componentAdded(entity, component){
        
    }

    componentRemoved(entity, component){
    
    }

    entityAdded(entity) {
        if (this.isCameraEntity(entity)) {
            this.camera = entity;
            this.cameraComponent = this.camera.getComponent("camera");
            this.cameraRectangle = this.camera.getComponent("rectangle");
            this.canvas.width = this.cameraRectangle.width;
            this.canvas.height = this.cameraRectangle.height;
        }
    }

    entityRemoved(entity) {
        if (this.isCameraEntity(entity)) {
            this.camera = null;
            this.cameraComponent = null;
            this.cameraRectangle = null;
            this.canvas.width = this.cameraRectangle.width;
            this.canvas.height = this.cameraRectangle.height;
        }
    }

    serviceAdded(name, service) {
        if (name === "spatial-partition-service") {
            this.spatialPartitionService = service;
            this.cellSize = service.cellSize;
            this.cellRenderer.cellSize = service.cellSize;
            this.cellRenderer.compositor = this.compositor;
            this.cellRenderer.sort = this.sort;
        }
    }

    serviceRemoved(name, service) {
        if (name === "spatial-partition-service") {
            this.spatialPartitionService = null;
            this.cellSize = null;
            this.cellRenderer = null;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CameraSystem;


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CanvasPool {
    constructor(canvasFactory) {
        this.available = [];
        this.canvasFactory = canvasFactory;
    }

    acquire() {
        if (this.available.length > 0) {
            return this.available.pop();
        } else {
            return this.canvasFactory.create();
        }
    }

    release(canvas) {
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        this.available.push(canvas);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CanvasPool;


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CellRenderer {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.entities = null;
        this.rectangle = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };
        this.cellSize = null;
        this.compositor = null;
        this.sort = null;
    }

    isReady() {
        return this.context != null &&
            this.entities != null &&
            this.rectangle != null &&
            this.cellSize != null &&
            this.compositor != null;
    }

    render() {
        if (this.isReady()) {
            const context = this.context;

            const entities = this.entities;
            const cellSize = this.cellSize;
            const rectangle = this.rectangle;

            this.canvas.width = this.cellSize;
            this.canvas.height = this.cellSize;

            const cellTop = rectangle.top * cellSize;
            const cellLeft = rectangle.left * cellSize;
            const cellRight = rectangle.right * cellSize;
            const cellBottom = rectangle.bottom * cellSize;

            entities.sort(this.sort);

            for (let x = 0; x < entities.length; x++) {
                const entity = entities[x];

                if (!this.compositor.isRenderable(entity)) {
                    continue;
                }

                const opacity = entity.getComponent("opacity");
                const rectangle = entity.getComponent("rectangle");

                const top = Math.max(rectangle.top, cellTop);
                const left = Math.max(rectangle.left, cellLeft);
                const right = Math.min(rectangle.right, cellRight);
                const bottom = Math.min(rectangle.bottom, cellBottom);

                if (top < bottom && left < right) {
                    const images = this.compositor.getEntityImages(entity);

                    if (images.length === 0) {
                        continue;
                    }

                    let sourceX = 0;
                    let sourceY = 0;
                    let width = right - left;
                    let height = bottom - top;
                    let destinationX = left - cellLeft;
                    let destinationY = top - cellTop;

                    if (width <= 0 || height <= 0) {
                        continue;
                    }

                    if (rectangle.left < left) {
                        sourceX = left - rectangle.left;
                    }

                    if (rectangle.top < top) {
                        sourceY = top - rectangle.top;
                    }

                    if (opacity != null) {
                        context.globalAlpha = opacity.value;
                    }

                    for (let z = 0; z < images.length; z++) {
                        const image = images[z];

                        context.drawImage(
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
                        context.globalAlpha = 1;
                    }

                }
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CellRenderer;


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TileToCanvasConverter__ = __webpack_require__(46);


class BitmapCache {
    constructor({ imageFactory, canvasFactory }) {
        this.imageFactory = imageFactory;
        this.tileToCanvasConverter = new __WEBPACK_IMPORTED_MODULE_0__TileToCanvasConverter__["a" /* default */](canvasFactory);
        this.bitmaps = {};
        this.imagePromises = {};
    }

    loadImageAsync(tile) {
        if (this.imagePromises[tile.url] != null) {
            return this.imagePromises[tile.url];
        }

        return this.imagePromises[tile.url] = new Promise((resolve, reject) => {
            const image = this.imageFactory.create();

            image.onload = () => {
                resolve(image);
            };

            image.onerror = reject;
            image.src = tile.url;
        });
    }

    unloadTile(tile) {
        this.remove(tile.id);
        this.unloadImage(tile.url);
    }

    unloadImage(url) {
        if (this.imagePromises[url] != null) {
            delete this.imagePromises[url];
        }
    }

    loadTileAsync(tile) {
        return this.loadImageAsync(tile).then((image) => {
            const canvas = this.tileToCanvasConverter.convert(tile, image);
            this.set(tile.id, canvas);
        });
    }

    loadTilesAsync(tiles) {
        const status = {
            count: 0,
            total: tiles.length,
            percentageComplete: 0,
            isComplete: false,
            promise: null
        };

        const promises = tiles.map((tile) => {
            return this.loadTileAsync(tile).then(() => {
                status.count++;
                status.percentageComplete = status.count / status.total;
                status.isComplete = status.count === status.total;
            });
        });

        status.promise = Promise.all(promises);

        return status;
    }

    set(id, canvas) {
        this.bitmaps[id] = canvas;
    }

    remove(id) {
        if (this.bitmaps[id] != null) {
            delete this.bitmaps[id];
        }
    }

    get(id) {
        return this.bitmaps[id] || null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BitmapCache;


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tile__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_overlay__ = __webpack_require__(6);



const defaultTile = new __WEBPACK_IMPORTED_MODULE_0__Tile__["a" /* default */]();

class TileToCanvasConverter {
    constructor(canvasFactory) {
        this.canvasFactory = canvasFactory;

        this.canvas = null;
        this.context = null;
        this.tile = null;
        this.image = null;
        this.padding = null;
        this.position = null;
        this.size = null;
        this.width = null;
        this.height = null;

    }

    initialize(tile, image) {
        this.canvas = this.canvasFactory.create();
        this.context = this.canvas.getContext("2d");
        this.tile = tile;
        this.image = image;
        this.padding = this.tile.padding;
        this.position = this.tile.position;
        this.size = this.tile.size;
        this.width = this.size.width + this.padding.left + this.padding.right;
        this.height = this.size.height + this.padding.top + this.padding.bottom;
    }

    setCanvasSize() {
        this.canvas.height = this.height;
        this.canvas.width = this.width;
    }

    flipHorizontallyIfNeeded() {
        if (this.tile.flipHorizontally) {
            const canvas = this.canvasFactory.create();
            const context = canvas.getContext("2d");
            canvas.width = this.size.width;
            canvas.height = this.size.height;

            context.scale(-1, 1);
            context.translate(-this.size.width, 0);
            context.drawImage(
                this.image,
                0,
                0,
                this.size.width,
                this.size.height,
                0,
                0,
                this.size.width,
                this.size.height
            );

            this.image = canvas;
        }
    }

    flipVerticallyIfNeeded() {
        if (this.tile.flipVertically) {
            const canvas = this.canvasFactory.create();
            const context = canvas.getContext("2d");
            canvas.width = this.size.width;
            canvas.height = this.size.height;

            context.scale(1, -1);
            context.translate(0, -this.size.height);
            context.drawImage(
                this.image,
                0,
                0,
                this.size.width,
                this.size.height,
                0,
                0,
                this.size.width,
                this.size.height
            );

            this.image = canvas;
        }
    }

    draw() {
        this.context.globalAlpha = this.tile.opacity;
        this.context.translate(this.width / 2, this.height / 2);

        this.context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height,
            -this.width / 2,
            -this.height / 2,
            this.size.width,
            this.size.height
        );
    }

    convert(tile, image) {
        const readyTile = Object(__WEBPACK_IMPORTED_MODULE_1__utilities_overlay__["a" /* default */])(defaultTile, tile);

        this.initialize(readyTile, image);
        this.setCanvasSize();
        this.flipHorizontallyIfNeeded();
        this.flipVerticallyIfNeeded();
        this.draw();

        return this.canvas;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileToCanvasConverter;


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class Tile {
    constructor() {
        this.id = null;
        this.url = null;
        this.position = {
            x: 0,
            y: 0
        };
        this.size = {
            width: 0,
            height: 0
        };
        this.padding = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        this.opacity = 1;
        this.flipHorizontally = false;
        this.flipVertically = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tile;


/***/ }),
/* 48 */
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
        if (DEPENDENCIES.includes(component.type)) {
            this.entities.set(entity.id, entity);
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
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class KeyboardSystem {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyboardSystem;


/***/ }),
/* 50 */
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
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DEPENDENCIES = ["solid-body", "polygon-collider", "movable"];

class SolidBodySystem {
    constructor() {
        this.entities = {};
        this.world = null;
    }

    update() {
        for (let id in this.entities) {
            const entity = this.entities[id];
            this.updateEntity(entity);
        }
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
        if (this.entities[entity.id] == null && entity.hasComponents(DEPENDENCIES)) {
            this.entities[entity.id] = entity;
        }
    }

    entityRemoved(entity) {
        if (this.entities[entity.id] != null) {
            delete this.entities[entity.id];
        }
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (this.entities[entity.id] != null) {
            delete this.entities[entity.id];
        }
    }

    updateEntity(entity) {
        let activeCollisions = entity.getComponent("polygon-collider").collisions;
        let movable = entity.getComponent("movable");

        for (let key in activeCollisions) {
            let collision = activeCollisions[key];
            movable.x += Math.round(-collision.penetration.x);
            movable.y += Math.round(-collision.penetration.y);

            this.world.log("SolidBodySystem move:", collision);
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SolidBodySystem;



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_Text__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_RectangleCollider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Rectangle__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_KeyboardController__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_components_KeyboardInput__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_components_Movable__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_components_Shape__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_components_SolidBody__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_components_PolygonBody__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_components_Polygon__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_components_PolygonCollider__ = __webpack_require__(13);














/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor(text) {
        super();
        this.type = "player";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const textTexture = new __WEBPACK_IMPORTED_MODULE_2__src_components_Text__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_3__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_4__src_components_Rectangle__["a" /* default */]();
        const keyboardController = new __WEBPACK_IMPORTED_MODULE_5__src_components_KeyboardController__["a" /* default */]();
        const keyboardInput = new __WEBPACK_IMPORTED_MODULE_6__src_components_KeyboardInput__["a" /* default */]();
        const movable = new __WEBPACK_IMPORTED_MODULE_7__src_components_Movable__["a" /* default */]();
        const shape = new __WEBPACK_IMPORTED_MODULE_8__src_components_Shape__["a" /* default */]();
        const solidBody = new __WEBPACK_IMPORTED_MODULE_9__src_components_SolidBody__["a" /* default */]();
        const body = new __WEBPACK_IMPORTED_MODULE_10__src_components_PolygonBody__["a" /* default */]();
        const polygon = new __WEBPACK_IMPORTED_MODULE_11__src_components_Polygon__["a" /* default */]();
        const polygonCollider = new __WEBPACK_IMPORTED_MODULE_12__src_components_PolygonCollider__["a" /* default */]();

        polygon.points.push({
            x: 0,
            y: 0
        },{
            x: 30,
            y: 0
        },{
            x: 30,
            y: 30
        },{
            x: 0,
            y: 30
        });

        body.polygons.push(polygon);

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.verticalAlignment = "middle";
        textTexture.horizontalAlignment = "center"

        rectangle.width = 30;
        rectangle.height = 30;

        transform.rotation = 45;
        transform.isDirty = true;

        shape.border.thickness = 1;
        shape.fillColor.blue = 255;
        shape.fillColor.green = 100;
        shape.fillColor.red = 100;
        shape.fillColor.alpha = 0.25
        
        shape.points.push(
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );
        shape.id = `${JSON.stringify(transform)}|${JSON.stringify(shape)}|${JSON.stringify(rectangle)}`;

        this.addComponent(transform);
        this.addComponent(textTexture);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(keyboardController);
        this.addComponent(keyboardInput);
        this.addComponent(movable);
        this.addComponent(shape);
        this.addComponent(solidBody);
        this.addComponent(body);
        this.addComponent(polygonCollider);
    }
});

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class KeyboardController {
    constructor() {
        this.type = "keyboard-controller";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyboardController;


/***/ }),
/* 54 */
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
/* 55 */
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
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_Text__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_RectangleCollider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_Shape__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_components_SolidBody__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_components_Opacity__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_components_PolygonBody__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_components_Polygon__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_components_PolygonCollider__ = __webpack_require__(13);












class StaticText extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor(text, { x, y }, { red = 0, green = 0, blue = 0, alpha = 1 }) {
        super();
        this.type = "static-text";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const textTexture = new __WEBPACK_IMPORTED_MODULE_2__src_components_Text__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_4__src_components_RectangleCollider__["a" /* default */]();
        const shape = new __WEBPACK_IMPORTED_MODULE_5__src_components_Shape__["a" /* default */]();
        const solidBody = new __WEBPACK_IMPORTED_MODULE_6__src_components_SolidBody__["a" /* default */]();
        const opacity = new __WEBPACK_IMPORTED_MODULE_7__src_components_Opacity__["a" /* default */]();
        const body = new __WEBPACK_IMPORTED_MODULE_8__src_components_PolygonBody__["a" /* default */]();
        const polygon = new __WEBPACK_IMPORTED_MODULE_9__src_components_Polygon__["a" /* default */]();
        const polygonCollider = new __WEBPACK_IMPORTED_MODULE_10__src_components_PolygonCollider__["a" /* default */]();

        polygon.points.push({
            x: 0,
            y: 0
        }, {
            x: 100,
            y: 0
        }, {
            x: 100,
            y: 30
        }, {
            x: 0,
            y: 30
        });

        body.polygons.push(polygon);

        opacity.value = 1;

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
        shape.id = `${JSON.stringify(transform)}|${JSON.stringify(shape)}|${JSON.stringify(rectangle)}`;

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.horizontalAlignment = "center";
        textTexture.verticalAlignment = "middle";

        rectangle.width = 100;
        rectangle.height = 30;

        transform.position.x = x;
        transform.position.y = y;
        transform.rotation = Math.floor(Math.random() * 360);
        transform.isDirty = true;

        this.addComponent(transform);
        this.addComponent(textTexture);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(shape);
        this.addComponent(opacity);
        this.addComponent(solidBody);
        this.addComponent(body);
        this.addComponent(polygonCollider);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StaticText;


/***/ }),
/* 57 */
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
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿
class FollowEntityCameraSystem {
    constructor({ cameraEntityId, followEntityId } = {}) {
        this._world = null;
        this.followEntityId = followEntityId;
        this.cameraEntityId = cameraEntityId;
    }

    update() {
        if (this._world == null) {
            return;
        }

        const entityToFollow = this._world.getEntityById(this.followEntityId);
        const camera = this._world.getEntityById(this.cameraEntityId);

        if (camera != null) {
            const cameraTransform = camera.getComponent("transform");
            cameraTransform.isDirty = true;

            if (entityToFollow != null) {
                const transform = entityToFollow.getComponent("transform");
                const cameraPosition = cameraTransform.position;
                const x = transform.position.x;
                const y = transform.position.y;

                cameraPosition.x = Math.floor(x);
                cameraPosition.y = Math.floor(y);
            }

        }

    }

    activated(world) {
        this._world = world;
    }

    deactivated() {
        this._world = null;
        this._worldSize = null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FollowEntityCameraSystem;


/***/ })
/******/ ]);