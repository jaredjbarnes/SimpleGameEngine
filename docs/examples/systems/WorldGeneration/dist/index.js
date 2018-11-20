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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_createGuid__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_invokeMethod__ = __webpack_require__(6);
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

        this.origin = {
            x: 0,
            y: 0
        };
        
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Transform;


/***/ }),
/* 2 */
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
/* 3 */
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class Image {
    constructor() {
        this.type = "image";
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
        this.zIndex = 0;
        this.flipHorizontally = false;
        this.flipVertically = false;
        this.isDirty = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Image;


/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((obj, methodName, args) => {
    args = Array.isArray(args)? args: [];
   if (obj != null && typeof obj[methodName] === "function"){
       return obj[methodName].apply(obj, args);
   }
});

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__ = __webpack_require__(6);


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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_World__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_entities_Camera__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_systems_BroadPhaseCollisionSystem__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_systems_NarrowPhaseCollisionSystem__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_systems_DefaultCameraSystem__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_systems_MovementSystem__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_systems_SolidBodySystem__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__entities_Text__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_systems_FollowEntityCameraSystem__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_services_ControllerInputService__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__MobileStageCreator__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__systems_PlayerControllerSystem__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__systems_WorldGenerationSystem__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_utilities_Noise__ = __webpack_require__(99);















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
const camera = new __WEBPACK_IMPORTED_MODULE_1__src_entities_Camera__["a" /* default */](cameraName);

const controllerInputService = new __WEBPACK_IMPORTED_MODULE_9__src_services_ControllerInputService__["a" /* default */]();
const mobileStageCreator = new __WEBPACK_IMPORTED_MODULE_10__MobileStageCreator__["a" /* default */]({
    window,
    document,
    camera,
    controllerInputService
});

const canvas = mobileStageCreator.canvas;
const world = new __WEBPACK_IMPORTED_MODULE_0__src_World__["a" /* default */]();

// Entities
const player = new __WEBPACK_IMPORTED_MODULE_7__entities_Text__["a" /* default */]("P");

// Systems
const movableSystem = new __WEBPACK_IMPORTED_MODULE_5__src_systems_MovementSystem__["a" /* default */]();
const broadPhaseCollisionSystem = new __WEBPACK_IMPORTED_MODULE_2__src_systems_BroadPhaseCollisionSystem__["a" /* default */]();
const narrowPhaseCollisionSystem = new __WEBPACK_IMPORTED_MODULE_3__src_systems_NarrowPhaseCollisionSystem__["a" /* default */]();
const solidBodySystem = new __WEBPACK_IMPORTED_MODULE_6__src_systems_SolidBodySystem__["a" /* default */]();

const followEntityCameraSystem = new __WEBPACK_IMPORTED_MODULE_8__src_systems_FollowEntityCameraSystem__["a" /* default */]({
    cameraEntityId: camera.id,
    followEntityId: player.id
});

const defaultCameraSystem = new __WEBPACK_IMPORTED_MODULE_4__src_systems_DefaultCameraSystem__["a" /* default */]({
    canvas,
    cameraName,
    cellSize: 400
});

const playerControllerSystem = new __WEBPACK_IMPORTED_MODULE_11__systems_PlayerControllerSystem__["a" /* default */]();

const worldGenerationSystem = new __WEBPACK_IMPORTED_MODULE_12__systems_WorldGenerationSystem__["a" /* default */]({
    noise: new __WEBPACK_IMPORTED_MODULE_13__src_utilities_Noise__["a" /* default */](),
    scale: 1000
});

camera.getComponent("rectangle").height = mobileStageCreator.canvas.height;
camera.getComponent("rectangle").width = mobileStageCreator.canvas.width;

// Set up world
world.addSystem(worldGenerationSystem);
world.addSystem(solidBodySystem);
world.addSystem(playerControllerSystem);
world.addSystem(movableSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(defaultCameraSystem);

// Add Services
world.addService(controllerInputService);

// Add Entities
world.addEntity(camera);
world.addEntity(player);

world.play();

window.world = world;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__ = __webpack_require__(6);
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
        const entitiesByType = this._entitiesByType;
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
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Camera__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_RectangleCollider__ = __webpack_require__(3);
﻿





class Camera extends __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */] {
    constructor(name, { width = 300, height = 300 } = {}) {
        super();

        const camera = new __WEBPACK_IMPORTED_MODULE_1__components_Camera__["a" /* default */]();
        camera.name = name || null;

        const transform = new __WEBPACK_IMPORTED_MODULE_2__components_Transform__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__components_Rectangle__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_4__components_RectangleCollider__["a" /* default */]();

        rectangle.width = width;
        rectangle.height = height;

        this.id = `camera_${this.id}`;
        this.addComponent(camera);
        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;


/***/ }),
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BoundingRectangleSystem__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SpatialPartitionSystem__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RectangleColliderSystem__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SystemsBundlerSystem__ = __webpack_require__(8);





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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BoundingRentangleUpdater__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_BoundingRectangleService__ = __webpack_require__(18);



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
        const entitiesById = this.boundingRectangleService.entitiesById;
        const entities = this.boundingRectangleService.entities;
        dirtyEntities.length = 0;

        for (let x = 0; x < entities.length; x++) {
            const entity = entities[x];

            if (this.isDirty(entity)) {
                this.rectangleUpdater.setEntity(entity);
                this.rectangleUpdater.update();
                this.boundingRectangleService.dirtyEntities.push(entity);
            }
        }

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoundingRectangleSystem;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(7);


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
    }

    setEntity(_entity) {
        this.entity = _entity;
        this.rectangle = this.entity.getComponent("rectangle");
        this.transform = this.entity.getComponent("transform");
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
        const origin = this.transform.origin;
        const position = this.transform.position;
        const transformedPoint = this.transformedPoint;
        const min = this.min;
        const max = this.max;

        min.x = max.x = transformedPoint.x = position.x;
        min.y = max.y = transformedPoint.y = position.y;

        for (let x = 0; x < corners.length; x++) {
            __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].rotate(corners[x], angle, rotatedPoint);
            min.x = Math.min(transformedPoint.x + rotatedPoint.x, min.x);
            min.y = Math.min(transformedPoint.y + rotatedPoint.y, min.y);
            max.x = Math.max(transformedPoint.x + rotatedPoint.x, max.x);
            max.y = Math.max(transformedPoint.y + rotatedPoint.y, max.y);
        }

        this.rectangle.top = Math.floor(min.y);
        this.rectangle.left = Math.floor(min.x);
        this.rectangle.bottom = Math.floor(max.y);
        this.rectangle.right = Math.floor(max.x);
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
/* 18 */
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
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Grid__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_SpatialPartition__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_SpatialPartitionService__ = __webpack_require__(22);




const PLACABLE_ENTITY_DEPENDENCIES = ["transform", "rectangle"];

class SpatialPartitionSystem {
    constructor() {
        this.world = null;
        this.boundingRectangleData = null;
        this.spatialPartitionService = new __WEBPACK_IMPORTED_MODULE_2__services_SpatialPartitionService__["a" /* default */]();
        this.spatialPartitionService.grid = new __WEBPACK_IMPORTED_MODULE_0__Grid__["a" /* default */]();
    }

    addPlacableEntity(entity) {
        if (!entity.hasComponent("spatial-partition")) {
            entity.addComponent(new __WEBPACK_IMPORTED_MODULE_1__components_SpatialPartition__["a" /* default */]());
            this.spatialPartitionService.entitiesById[entity.id] = entity;
        }
    }

    updateGrid() {
        const spatialPartitionService = this.spatialPartitionService;
        const dirtyEntities = this.boundingRectangleData.dirtyEntities;
        const grid = this.spatialPartitionService.grid;

        spatialPartitionService.dirtyCellPositions = {};

        for (let i = 0; i < dirtyEntities.length; i++) {
            const entity = dirtyEntities[i];

            const spatialPartition = entity.getComponent("spatial-partition");
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
            grid.add(newCellPositions, entity);

        }
    }

    getCellPositions(entity) {
        const rectangle = entity.getComponent("rectangle");
        const top = rectangle.top;
        const left = rectangle.left;
        const right = rectangle.right;
        const bottom = rectangle.bottom;
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
        for (let name in services){
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

        if (this.isPlacable(entity) &&
            this.spatialPartitionService.entitiesById[entity.id]) {
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
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Grid {
    constructor(buckets = {}) {
        this.buckets = buckets;
    }

    add(cellPositions, entity) {
        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            const bucket = this.getBucket(cellPosition);
            bucket.push(entity);
        }
    }

    clear() {
        for (let key in this.buckets) {
            delete this.buckets[key];
        }
    }

    getBucket({ column, row }) {
        const key = this.getKey(column, row);
        let bucket = this.buckets[key];

        if (bucket == null) {
            bucket = this.buckets[key] = [];
        }

        return bucket;
    }

    getKey(column, row) {
        return `${column}_${row}`;
    }

    remove(cellPositions, entity) {
        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            const bucket = this.getBucket(cellPosition);
            const index = bucket.indexOf(entity);

            if (index > -1) {
                bucket.splice(index, 1);
            }
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SpatialPartition {
    constructor(){
        this.type = "spatial-partition";
        this.cellPositions = [];
        this.lastCellPositions = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpatialPartition;


/***/ }),
/* 22 */
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Collision__ = __webpack_require__(24);
﻿

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

    removeCollisionsFromEntities(entities) {
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
            const entities = grid.getBucket(cellPositions[key]);
            this.removeCollisionsFromEntities(entities);
        }

        for (let key in cellPositions) {
            const cellPosition = cellPositions[key];
            const entities = grid.getBucket(cellPosition);

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
/* 24 */
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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SystemsBundlerSystem__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PolygonSystem__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PolygonColliderSystem__ = __webpack_require__(28);




class NarrowPhaseCollisionSystem extends __WEBPACK_IMPORTED_MODULE_0__SystemsBundlerSystem__["a" /* default */] {
    constructor(){
        super();

        this.systems.push(new __WEBPACK_IMPORTED_MODULE_1__PolygonSystem__["a" /* default */]());
        this.systems.push(new __WEBPACK_IMPORTED_MODULE_2__PolygonColliderSystem__["a" /* default */]());
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NarrowPhaseCollisionSystem;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PolygonUpdater__ = __webpack_require__(27);
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(7);


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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CollisionDetector__ = __webpack_require__(29);


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
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(7);


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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CameraSystem_Compositor__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CameraSystem_CanvasFactory__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CameraSystem_ImageFactory__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CameraSystem_ImageRasterizer__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CameraSystem_PolygonRasterizer__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CameraSystem_LineRasterizer__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CameraSystem_ShapeRasterizer__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__CameraSystem_TextRasterizer__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CameraSystem__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__SystemsBundlerSystem__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__DynamicLoadingSystem__ = __webpack_require__(41);












class DefaultCameraSystem extends __WEBPACK_IMPORTED_MODULE_8__CameraSystem__["a" /* default */] {
    constructor({ canvas, cameraName, assetRoot }) {
        const compositor = new __WEBPACK_IMPORTED_MODULE_0__CameraSystem_Compositor__["a" /* default */]();
        const canvasFactory = new __WEBPACK_IMPORTED_MODULE_1__CameraSystem_CanvasFactory__["a" /* default */]();
        const imageFactory = new __WEBPACK_IMPORTED_MODULE_2__CameraSystem_ImageFactory__["a" /* default */]();

        const imageRasterizer = new __WEBPACK_IMPORTED_MODULE_3__CameraSystem_ImageRasterizer__["a" /* default */]({ canvasFactory, imageFactory, assetRoot });
        const lineRasterizer = new __WEBPACK_IMPORTED_MODULE_5__CameraSystem_LineRasterizer__["a" /* default */](canvasFactory);
        const shapeRasterizer = new __WEBPACK_IMPORTED_MODULE_6__CameraSystem_ShapeRasterizer__["a" /* default */](canvasFactory);
        const textRasterizer = new __WEBPACK_IMPORTED_MODULE_7__CameraSystem_TextRasterizer__["a" /* default */](canvasFactory);

        super({
            canvas,
            cameraName,
            compositor,
            canvasFactory
        });

        this.polygonRasterizer = null;
        this.canvasFactory = canvasFactory;
        this.compositor = compositor;

        compositor.addRasterizer(imageRasterizer);
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

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_9__SystemsBundlerSystem__["a" /* default */] {
    constructor({ canvas, cameraName, assetRoot, cellSize }) {
        super();
        this.dynamicLoadingSystem = new __WEBPACK_IMPORTED_MODULE_10__DynamicLoadingSystem__["a" /* default */]({ cameraName, cellSize });
        this.defaultCameraSystem = new DefaultCameraSystem({ canvas, cameraName, assetRoot });
        
        this.systems.push(this.dynamicLoadingSystem);
        this.systems.push(this.defaultCameraSystem);
    }
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const sortByZIndex = (a, b) => (a.zIndex || Infinity) - (b.zIndex || Infinity);

class Compositor {
    constructor() {
        this.rasterizers = {};
        this.images = {};
        this.compositeImages = {};
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

    isRenderable(_entity) {
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
            this.compositeImages[entity.id] = null;
            return component && component.isDirty;
        }

        return false;
    }

    getEntityImages(_entity) {
        const entity = _entity;
        const rasterizers = this.rasterizers;
        let images = this.compositeImages[entity.id];

        if (entity == null) {
            return [];
        }

        if (images != null){
            return images;
        }

        images = [];

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

                images.push(image);
            }
        }

        images.sort(sortByZIndex);

        this.compositeImages[entity.id] = images;

        return images;

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Compositor;


/***/ }),
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class ImageRasterizer {
    constructor({ canvasFactory, imageFactory, assetRoot }) {
        this.type = "image";
        this.canvasFactory = canvasFactory;
        this.assetRoot = assetRoot || "";
        this.imageFactory = imageFactory;
        this.loadingImages = {};
    }

    getImageAsync(url) {
        if (this.loadingImages[url] != null) {
            return this.loadingImages[url];
        }

        return this.loadingImages[url] = new Promise((resolve, reject) => {
            const image = this.imageFactory.create();

            image.onload = () => {
                resolve(image);
            };

            image.onerror = reject;
            image.src = url;
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
        return `${image.url}|${this.getImagePadding(image)}|${this.getImagePosition(image)}|${this.getImageSize(image)}|${image.opacity}|${image.flipHorizontally}|${image.flipVertically}`;
    }

    getIdentity(_entity) {
        const entity = _entity;
        const image = entity.getComponent("image");
        const transform = entity.getComponent("transform");

        if (image.id != null) {
            return `${image.id}|${transform.rotation}`;
        } else {
            return `${this.getImageIdentity(image)}|${transform.rotation}`;
        }

    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();
        const context = canvas.getContext("2d");
        const imageComponent = entity.getComponent("image");
        const rectangle = entity.getComponent("rectangle");
        const transform = entity.getComponent("transform");
        const angle = transform.rotation;
        const url = this.gerUrl(imageComponent.url);
        const padding = imageComponent.padding;
        const position = imageComponent.position;
        const size = imageComponent.size;
        const width = rectangle.right - rectangle.left + padding.left + padding.right;
        const height = rectangle.bottom - rectangle.top + padding.top + padding.bottom;
        const origin = transform.origin;

        canvas.width = width;
        canvas.height = height;

        this.getImageAsync(url).then((image) => {
            context.globalAlpha = imageComponent.opacity;

            const translate = {
                x: 0,
                y: 0
            };

            const scale = {
                x: 1,
                y: 1
            };

            if (imageComponent.flipHorizontally) {
                scale.x = -1;
                translate.x = size.width;
            }

            if (imageComponent.flipVertically) {
                scale.y = -1;
                translate.y = size.height;
            }

            context.scale(scale.x, scale.y);

            context.translate(width / 2 - translate.x, height / 2 - translate.y);
            context.rotate(angle * Math.PI / 180);

            context.drawImage(
                image,
                position.x,
                position.y,
                size.width,
                size.height,
                -origin.x,
                -origin.y,
                rectangle.width,
                rectangle.height
            );
        }).catch((error) => {
            context.globalAlpha = imageComponent.opacity;
            throw error;
        })

        return canvas;
    }

    gerUrl(url) {
        return this.assetRoot + url;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageRasterizer;


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_overlay__ = __webpack_require__(36);


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
/* 36 */
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
/* 37 */
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

        const angle = transform.rotatioon;
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
/* 38 */
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
/* 39 */
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
        const transform = entity.getComponent("transform");
        const rectangle = entity.getComponent("rectangle");
        const textTexture = entity.getComponent("text");

        return `transform=${JSON.stringify(transform)}|text=${JSON.stringify(textTexture)}|${JSON.stringify(rectangle)}`;
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
/* 40 */
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

window.dynamicLoadingCellMoves = 0;
window.drawCells = 0;

class CanvasCell {
    constructor(cameraCanvasCellEntity, canvas) {
        this.transform = cameraCanvasCellEntity.getComponent("transform");
        this.rectangleCollider = cameraCanvasCellEntity.getComponent("rectangle-collider");
        this.rectangle = cameraCanvasCellEntity.getComponent("rectangle");
        this.entity = cameraCanvasCellEntity;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.canvas.width = this.rectangle.width;
        this.canvas.height = this.rectangle.height;
        this.isDirty = false;
    }
}

class Camera {
    constructor(cameraEntity, canvas) {
        this.transform = cameraEntity.getComponent("transform");
        this.rectangleCollider = cameraEntity.getComponent("rectangle-collider");
        this.rectangle = cameraEntity.getComponent("rectangle");
        this.entity = cameraEntity;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }
}

class CameraSystem {
    constructor({ canvas, cameraName, compositor, canvasFactory, sort = idSort }) {
        this.canvas = canvas;
        this.compositor = compositor;
        this.cameraName = cameraName;
        this.canvasFactory = canvasFactory;
        this.spatialPartitionService = null;
        this.cells = [];
        this.world = null;
        this.camera = null;
        this.drawImageCount = 0;
        this.renderableEntities = {};

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

    _cleanEntities() {
        const renderableEntities = this.renderableEntities;
        const compositor = this.compositor;

        for (let id in renderableEntities) {
            const entity = renderableEntities[id];
            compositor.cleanEntity(entity);
        }
    }

    _hasCamera() {
        return this.camera != null;
    }

    _isDynamicLoadingCellEntity(entity) {
        return entity.hasComponents(["dynamic-loading-cell", "transform", "rectangle-collider"])
    }

    _isCameraEntity(entity) {
        return entity.hasComponents(["camera", "transform", "rectangle-collider"]) &&
            entity.getComponent("camera").name === this.cameraName;
    }

    _isCell(entity) {
        return this.cells.some(cell => {
            return cell.id === entity.id;
        });
    }

    _isReady() {
        return this.spatialPartitionService != null && this._hasCamera();
    }

    _updateCell(_cell, _dirtyCellPositions) {
        const cell = _cell;
        const dirtyCellPositions = _dirtyCellPositions;
        const cellSize = this.spatialPartitionService.cellSize;

        for (let key in _dirtyCellPositions) {
            const dirtyCellPosition = dirtyCellPositions[key];
            const cellY = dirtyCellPosition.row * cellSize;
            const cellX = dirtyCellPosition.column * cellSize;

            const top = Math.max(cellY, cell.rectangle.top);
            const left = Math.max(cellX, cell.rectangle.left);
            const bottom = Math.min(cellY + cellSize, cell.rectangle.bottom);
            const right = Math.min(cellX + cellSize, cell.rectangle.right);

            if (top < bottom && left < right) {
                const entities = this.spatialPartitionService.grid.getBucket(dirtyCellPosition);
                entities.sort(this.sort);

                cell.context.clearRect(
                    left - cell.rectangle.left,
                    top - cell.rectangle.top,
                    right - left,
                    bottom - top
                );

                for (let y = 0; y < entities.length; y++) {
                    const entity = entities[y];
                    const opacity = entity.getComponent("opacity");
                    const rectangle = entity.getComponent("rectangle");
                    const images = this.compositor.getEntityImages(entity);

                    // If the entity isn't renderable then don't go on.
                    if (images.length === 0) {
                        continue;
                    }

                    this.renderableEntities[entity.id] = entity;

                    const intersectedTop = Math.max(top, rectangle.top);
                    const intersectedLeft = Math.max(left, rectangle.left);
                    const intersectedBottom = Math.min(bottom, rectangle.bottom);
                    const intersectedRight = Math.min(right, rectangle.right);

                    let sourceX = 0;
                    let sourceY = 0;
                    let width = intersectedRight - intersectedLeft;
                    let height = intersectedBottom - intersectedTop;
                    let destinationX = intersectedLeft - cell.rectangle.left;
                    let destinationY = intersectedTop - cell.rectangle.top;

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
                        cell.context.globalAlpha = opacity.value;
                    }

                    for (let z = 0; z < images.length; z++) {
                        const image = images[z];

                        this.drawImageCount++;
                        window.drawCells = this.drawImageCount;
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
        const dirtyCells = this.spatialPartitionService.dirtyCellPositions;
        const grid = this.spatialPartitionService.grid;
        const renderableCells = {};

        for (let key in dirtyCells) {
            const cellPosition = dirtyCells[key];
            const entities = grid.getBucket(cellPosition);

            for (let i = 0; i < entities.length; i++) {
                const entity = entities[i]
                const spatialPartition = entity.getComponent("spatial-partition");
                const cellPositions = spatialPartition.cellPositions;
                const lastCellPositions = spatialPartition.lastCellPositions;

                if (this.compositor.isRenderable(entity)) {
                    for (let c = 0; c < cellPositions.length; c++) {
                        const cellPosition = cellPositions[c];
                        renderableCells[`${cellPosition.column}_${cellPosition.row}`] = cellPosition;
                    }

                    for (let c = 0; c < lastCellPositions.length; c++) {
                        const cellPosition = lastCellPositions[c];
                        renderableCells[`${cellPosition.column}_${cellPosition.row}`] = cellPosition;
                    }
                }
            }
        }

        for (let x = 0; x < this.cells.length; x++) {
            const cell = this.cells[x];
            const collisions = cell.rectangleCollider.collisions;
            const spatialPartition = cell.entity.getComponent("spatial-partition");
            const cellPositions = spatialPartition.cellPositions;

            if (cell.transform.isDirty) {
                window.dynamicLoadingCellMoves++;
                for (let c = 0; c < cellPositions.length; c++) {
                    const cellPosition = cellPositions[c];
                    renderableCells[`${cellPosition.column}_${cellPosition.row}`] = cellPosition;
                }
            }

            // Find dirty entities with in the loading area that need updating.
            for (let y in collisions) {
                const entity = this.world.getEntityById(y);

                if (entity == null) {
                    continue;
                }

                const isDirty = this.compositor.isEntityDirty(entity);
                if (isDirty) {

                    const spatialPartition = cell.entity.getComponent("spatial-partition");
                    const cellPositions = spatialPartition.cellPositions;

                    for (let z = 0; z < cellPositions.length; z++) {
                        const cellPosition = cellPositions[z];
                        renderableCells[`${cellPosition.column}_${cellPosition.row}`] = cellPosition;
                    }
                }
            }

            this._updateCell(this.cells[x], renderableCells);
        }
    }

    _transferToCanvas() {
        const canvas = this.canvas;

        canvas.width = this.camera.rectangle.width;
        canvas.height = this.camera.rectangle.height;

        for (let x = 0; x < this.cells.length; x++) {
            const cell = this.cells[x];
            const top = Math.max(cell.rectangle.top, this.camera.rectangle.top);
            const left = Math.max(cell.rectangle.left, this.camera.rectangle.left);
            const bottom = Math.min(cell.rectangle.bottom, this.camera.rectangle.bottom);
            const right = Math.min(cell.rectangle.right, this.camera.rectangle.right);

            if (top < bottom && left < right) {

                let sourceX = 0;
                let sourceY = 0;
                const sourceWidth = right - left;
                const sourceHeight = bottom - top;
                const destinationX = left - this.camera.rectangle.left;
                const destinationY = top - this.camera.rectangle.top;
                const destinationWidth = right - left;
                const destinationHeight = bottom - top;

                if (cell.rectangle.left < this.camera.rectangle.left) {
                    sourceX = this.camera.rectangle.left - cell.rectangle.left;
                }

                if (cell.rectangle.top < this.camera.rectangle.top) {
                    sourceY = this.camera.rectangle.top - cell.rectangle.top;
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

        const entities = this.world.getEntities();
        for (let x = 0; x < entities.length; x++) {
            const entity = entities[x];
            this.entityAdded(entity);
        }

        const services = this.world.getServices();
        for (let name in services) {
            this.serviceAdded(name, services[name]);
        }
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (this.cameraCanvasCellEntities.indexOf(entity) > -1) {
            const index = this.cameraCanvasCellEntities.indexOf(entity) > -1;
            this.cameraCanvasCellEntities.splice(index, 1);
        }
    }

    deactivated() {
        this.spatialPartitionService = null;
        this.cells = [];
        this.world = null;
        this.camera = null;
        this.drawImageCount = 0;
        this.renderableEntities = {};
    }

    entityAdded(entity) {
        if (this._isDynamicLoadingCellEntity(entity)) {
            const index = this.cells.findIndex((cell) => {
                return cell.entity === entity;
            });

            if (index === -1) {
                this.cells.push(new CanvasCell(entity, this.canvasFactory.create()));
            }

        } else if (this._isCameraEntity(entity)) {
            this.camera = new Camera(entity, this.canvasFactory.create());
        }
    }

    entityRemoved(entity) {
        if (this._isRectangleCollisionDataEntity(entity)) {
            this.rectangleCollisionData = null;
        } else if (this._isDynamicLoadingCellEntity(entity)) {
            throw new Error("The Camera cannot run without dynamic loading cells.");
        }
    }

    serviceAdded(name, service) {
        if (name === "spatial-partition-service") {
            this.spatialPartitionService = service;
        }
    }

    serviceRemoved(name, service) {
        if (name === "spatial-partition-service") {
            this.spatialPartitionService = null;
        }
    }

    update(currentTime) {
        this.drawImageCount = 0;
        if (this._isReady()) {
            this.renderableEntities = {};

            this._updateCells();
            this._transferToCanvas();
            this._cleanEntities();
        }
        
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CameraSystem;


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities_DynamicLoadingCell__ = __webpack_require__(42);


class Cell {
    constructor({ column, row, cellSize }) {
        this.row = row;
        this.column = column;
        this.entity = new __WEBPACK_IMPORTED_MODULE_0__entities_DynamicLoadingCell__["a" /* default */]({ x: column * cellSize, y: row * cellSize }, cellSize);
        this.transform = this.entity.getComponent("transform");
        this.rectangle = this.entity.getComponent("rectangle");
        this.transform.position.x = column * cellSize;
        this.transform.position.y = row * cellSize;
        this.position = this.transform.position;
        this.rectangle = this.rectangle;
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
            rectangle: null,
            collider: null
        };

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                const row = y - 1;
                const column = x - 1;

                this.cellPositions.push({ column: column, row: row });
                this.cells.push(new Cell({ column, row, cellSize }));
            }
        }

    }

    _addCamera(entity) {
        const transform = entity.getComponent("transform");
        this.camera.rectangle = entity.getComponent("rectangle");
        this.camera.collider = entity.getComponent("rectangle-collider");
        this.camera.position = transform.position;
    }

    _findCellPositionsWithCenter() {
        const centerColumn = Math.floor(this.camera.position.x / this.cellSize);
        const centerRow = Math.floor(this.camera.position.y / this.cellSize);

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                const row = centerRow + y - 1;
                const column = centerColumn + x - 1;
                const index = (y * 3) + x;
                const cellPosition = this.cellPositions[index];

                cellPosition.row = row;
                cellPosition.column = column;
            }
        }
    }

    _isCamera(entity) {
        return (
            entity.hasComponents(["camera", "transform", "rectangle", "rectangle-collider"]) &&
            entity.getComponent("camera").name === this.cameraName
        );
    }

    _hasCamera() {
        return this.camera.position != null &&
            this.camera.rectangle != null &&
            this.camera.collider != null;
    }

    _removeCamera() {
        this.camera.position = null;
        this.camera.rectangle = null;
        this.camera.collider = null;
    }

    _reset() {
        this._removeCamera();
    }

    _updateCells() {
        this._findCellPositionsWithCenter();

        const availableCanvasCells = [];

        for (let x = 0; x < this.cells.length; x++) {
            let cell = this.cells[x];

            let index = this.cellPositions.findIndex((cellPosition) => {
                return cell.column === cellPosition.column &&
                    cell.row === cellPosition.row;
            });

            if (index === -1) {
                availableCanvasCells.push(cell);
            }
        }

        for (let x = 0; x < this.cellPositions.length; x++) {
            const cellPosition = this.cellPositions[x];

            let index = this.cells.findIndex((cell) => {
                return cell.column === cellPosition.column &&
                    cell.row === cellPosition.row;
            });

            if (index === -1) {
                const cell = availableCanvasCells.pop();
                cell.row = cellPosition.row;
                cell.column = cellPosition.column;

                cell.position.x = cellPosition.column * this.cellSize;
                cell.position.y = cellPosition.row * this.cellSize;
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

    beforeUpdate(currentTime) {
        if (this._hasCamera()) {
            this._updateCells();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DynamicLoadingSystem;


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_DynamicLoadingCell__ = __webpack_require__(43);






/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */] {
    constructor({ x = 0, y = 0 } = { x: 0, y: 0 }, cellSize) {
        super();

        const transform = new __WEBPACK_IMPORTED_MODULE_1__components_Transform__["a" /* default */]();
        transform.position.x = x;
        transform.position.y = y;
        transform.isDirty = true;

        const rectangle = new __WEBPACK_IMPORTED_MODULE_2__components_Rectangle__["a" /* default */]();
        rectangle.width = cellSize;
        rectangle.height = cellSize;

        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_3__components_RectangleCollider__["a" /* default */]();
        const dynamicLoadingCell = new __WEBPACK_IMPORTED_MODULE_4__components_DynamicLoadingCell__["a" /* default */]();

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(dynamicLoadingCell);

    }
});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DynamicLoadingCell {
    constructor(){
        this.type = "dynamic-loading-cell";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DynamicLoadingCell;


/***/ }),
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_Text__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_PlayerController__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_components_Movable__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_components_Shape__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_components_SolidBody__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_components_PolygonBody__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_components_Polygon__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_components_PolygonCollider__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_components_ZIndex__ = __webpack_require__(53);














/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor(text) {
        super();
        this.type = "player";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const textTexture = new __WEBPACK_IMPORTED_MODULE_2__src_components_Text__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_3__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_4__src_components_Rectangle__["a" /* default */]();
        const playerController = new __WEBPACK_IMPORTED_MODULE_5__components_PlayerController__["a" /* default */]();
        const movable = new __WEBPACK_IMPORTED_MODULE_6__src_components_Movable__["a" /* default */]();
        const shape = new __WEBPACK_IMPORTED_MODULE_7__src_components_Shape__["a" /* default */]();
        const solidBody = new __WEBPACK_IMPORTED_MODULE_8__src_components_SolidBody__["a" /* default */]();
        const body = new __WEBPACK_IMPORTED_MODULE_9__src_components_PolygonBody__["a" /* default */]();
        const polygon = new __WEBPACK_IMPORTED_MODULE_10__src_components_Polygon__["a" /* default */]();
        const polygonCollider = new __WEBPACK_IMPORTED_MODULE_11__src_components_PolygonCollider__["a" /* default */]();
        const zIndex = new __WEBPACK_IMPORTED_MODULE_12__src_components_ZIndex__["a" /* default */]();

        zIndex.value = 2;

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
        this.addComponent(playerController);
        this.addComponent(movable);
        this.addComponent(shape);
        this.addComponent(solidBody);
        this.addComponent(body);
        this.addComponent(polygonCollider);
        this.addComponent(zIndex);
    }
});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PlayerController {
    constructor(){
        this.type = "player-controller";
        this.isActive = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerController;


/***/ }),
/* 48 */
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
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SolidBody {
    constructor() {
        this.type = "solid-body";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SolidBody;


/***/ }),
/* 50 */
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
/* 51 */
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
/* 52 */
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
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class ZIndex {
    constructor() {
        this.type = "z-index";
        this.value = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ZIndex;


/***/ }),
/* 54 */
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


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
    All values should be 0 through 1.
*/

class ControllerInputService {
    constructor(){
        this.name = "controller-input-service";
        this.x = 0;
        this.y = 0;
        this.a = 0;
        this.b = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ControllerInputService;


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MobileController__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_resize_observer_polyfill__ = __webpack_require__(58);



class MobileStageCreator {
  constructor({ window, document, camera, controllerInputService, maxSize = 300 }) {
    this.document = document;

    this.window = window;
    this.maxSize = maxSize;
    this.body = document.body;
    this.bodyBoundingRect = null;
    this.controllerInputService = controllerInputService;
    this.camera = camera;
    this.cameraRectangle = camera.getComponent("rectangle");
    this.cameraTransform = camera.getComponent("transform");

    this.aButton = null;
    this.bButton = null;
    this.joystick = null;
    this.canvas = null;

    this.createAButton();
    this.createBButton();
    this.createJoystick();
    this.createCanvas();
    this.setupMobileController();

    this.resizeObserver = new __WEBPACK_IMPORTED_MODULE_1_resize_observer_polyfill__["a" /* default */](() => {
      this.adjustCanvasSize();
    });

    this.resizeObserver.observe(document.body);
  }

  adjustCanvasSize() {
    this.bodyBoundingRect = this.body.getBoundingClientRect();

    if (this.bodyBoundingRect.width > this.bodyBoundingRect.height) {
      const ratio = this.bodyBoundingRect.height / this.bodyBoundingRect.width;

      this.cameraRectangle.width = this.canvas.width = this.maxSize;
      this.cameraRectangle.height = this.canvas.height = this.maxSize * ratio;
    } else {
      const ratio = this.bodyBoundingRect.width / this.bodyBoundingRect.height;

      this.cameraRectangle.height = this.canvas.height = this.maxSize;
      this.cameraRectangle.width = this.canvas.width = this.maxSize * ratio;
    }

    this.cameraRectangle.isDirty = true;
  }

  createAButton() {
    this.aButton = document.createElement("div");
    this.aButton.style.backgroundColor = "white";
    this.aButton.style.opacity = 0.4;
    this.aButton.style.borderRadius = "50% 50%";
    this.aButton.style.position = "absolute";
    this.aButton.style.bottom = "50px";
    this.aButton.style.right = "30px";
    this.aButton.style.width = "50px";
    this.aButton.style.height = "50px";
    this.aButton.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.3)";

    this.body.appendChild(this.aButton);
  }

  createBButton() {
    this.bButton = document.createElement("div");
    this.bButton.style.backgroundColor = "white";
    this.bButton.style.opacity = 0.4;
    this.bButton.style.borderRadius = "50% 50%";
    this.bButton.style.position = "absolute";
    this.bButton.style.bottom = "150px";
    this.bButton.style.right = "30px";
    this.bButton.style.width = "50px";
    this.bButton.style.height = "50px";
    this.bButton.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.3)";

    this.body.appendChild(this.bButton);
  }

  createCanvas() {

    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";

    this.adjustCanvasSize();
    this.body.appendChild(this.canvas);
  }

  createJoystick() {
    this.joystick = document.createElement("div");
    this.joystick.style.backgroundColor = "white";
    this.joystick.style.opacity = 0.75;
    this.joystick.style.borderRadius = "50% 50%";
    this.joystick.style.position = "absolute";
    this.joystick.style.bottom = "50px";
    this.joystick.style.left = "50px";
    this.joystick.style.width = "100px";
    this.joystick.style.height = "100px";
    this.joystick.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.6)";

    this.body.appendChild(this.joystick);
  }

  setupMobileController() {
    this.mobileController = new __WEBPACK_IMPORTED_MODULE_0__MobileController__["a" /* default */]({
      aButton: this.aButton,
      bButton: this.bButton,
      joystick: this.joystick,
      controllerInputService: this.controllerInputService
    });

  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = MobileStageCreator;



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const MAX_JOYSTICK_RANGE = 30;

class MobileController {
  constructor({ aButton, bButton, joystick, controllerInputService }) {
    this.controllerInputService = controllerInputService;
    this.joystick = joystick;
    this.aButton = aButton;
    this.bButton = bButton;

    this.joystickTouchStart = this.joystickTouchStart.bind(this);
    this.joystickTouchMove = this.joystickTouchMove.bind(this);
    this.joystickTouchEnd = this.joystickTouchEnd.bind(this);

    this.aButtonTouchStart = this.aButtonTouchStart.bind(this);
    this.aButtonTouchEnd = this.aButtonTouchEnd.bind(this);

    this.bButtonTouchStart = this.bButtonTouchStart.bind(this);
    this.bButtonTouchEnd = this.bButtonTouchEnd.bind(this);

    this.joystickTouchStart = this.joystickTouchStart.bind(this);
    this.joystickTouchEnd = this.joystickTouchEnd.bind(this);


    this.joystick.addEventListener("touchstart", this.joystickTouchStart, false);
    this.joystick.addEventListener("mousedown", this.joystickTouchStart);

    this.joyStickPosition = {
      x: 0,
      y: 0
    };

    this.joyStickStylePosition = {
      top: 0,
      left: 0
    };

    this.aButton.addEventListener("touchstart", this.aButtonTouchStart, false);
    this.aButton.addEventListener("touchend", this.aButtonTouchEnd, false);
    this.aButton.addEventListener("touchcancel", this.aButtonTouchEnd, false);

    this.bButton.addEventListener("touchstart", this.aButtonTouchStart, false);
    this.bButton.addEventListener("touchend", this.bButtonTouchEnd, false);
    this.bButton.addEventListener("touchcancel", this.bButtonTouchEnd, false);


  }

  aButtonTouchStart() {
    this.controllerInputService.a = 1;
  }

  aButtonTouchEnd() {
    this.controllerInputService.a = 0;
  }

  bButtonTouchStart() {
    this.controllerInputService.b = 1;
  }

  bButtonTouchEnd() {
    this.controllerInputService.b = 0;
  }

  joystickTouchStart(event) {
    document.addEventListener("touchmove", this.joystickTouchMove, false);
    document.addEventListener("touchend", this.joystickTouchEnd, false);
    document.addEventListener("touchcancel", this.joystickTouchEnd, false);
    document.addEventListener("mousemove", this.joystickTouchMove);
    document.addEventListener("mouseup", this.joystickTouchEnd);

    const touches = event.changedTouches || {};
    const touch = touches[0] || event;

    if (touch != null) {
      this.joyStickPosition.x = touch.pageX;
      this.joyStickPosition.y = touch.pageY;
    }

    this.joyStickStylePosition.left = parseInt(this.joystick.style.left, 10);
    this.joyStickStylePosition.bottom = parseInt(this.joystick.style.bottom, 10);


    event.preventDefault();
  };

  joystickTouchMove(event) {
    const touches = event.changedTouches || {};
    const touch = touches[0] || event;

    if (touch != null) {
      let deltaX = touch.pageX - this.joyStickPosition.x;
      let deltaY = touch.pageY - this.joyStickPosition.y;

      deltaX = deltaX <= MAX_JOYSTICK_RANGE ? deltaX : MAX_JOYSTICK_RANGE;
      deltaY = deltaY <= MAX_JOYSTICK_RANGE ? deltaY : MAX_JOYSTICK_RANGE;

      deltaX = deltaX >= -MAX_JOYSTICK_RANGE ? deltaX : -MAX_JOYSTICK_RANGE;
      deltaY = deltaY >= -MAX_JOYSTICK_RANGE ? deltaY : -MAX_JOYSTICK_RANGE;

      this.controllerInputService.x = deltaX / MAX_JOYSTICK_RANGE;
      this.controllerInputService.y = deltaY / MAX_JOYSTICK_RANGE;

      this.joystick.style.bottom = `${this.joyStickStylePosition.bottom - deltaY}px`;
      this.joystick.style.left = `${this.joyStickStylePosition.left + deltaX}px`;

      event.preventDefault();
    }
  };

  joystickTouchEnd() {
    this.controllerInputService.x = 0;
    this.controllerInputService.y = 0;

    document.removeEventListener("touchmove", this.joystickTouchMove);
    document.removeEventListener("touchend", this.joystickTouchEnd);
    document.removeEventListener("touchcancel", this.joystickTouchEnd);
    document.removeEventListener("mousemove", this.joystickTouchMove);
    document.removeEventListener("mouseup", this.joystickTouchEnd);

    this.joystick.style.left = `${this.joyStickStylePosition.left}px`;
    this.joystick.style.bottom = `${this.joyStickStylePosition.bottom}px`;

    event.preventDefault();
  };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MobileController;



/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }

    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;

        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;

                return true;
            }

            return false;
        });

        return result;
    }

    return (function () {
        function anonymous() {
            this.__entries__ = [];
        }

        var prototypeAccessors = { size: { configurable: true } };

        /**
         * @returns {boolean}
         */
        prototypeAccessors.size.get = function () {
            return this.__entries__.length;
        };

        /**
         * @param {*} key
         * @returns {*}
         */
        anonymous.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];

            return entry && entry[1];
        };

        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        anonymous.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);

            if (~index) {
                this.__entries__[index][1] = value;
            } else {
                this.__entries__.push([key, value]);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);

            if (~index) {
                entries.splice(index, 1);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };

        /**
         * @returns {void}
         */
        anonymous.prototype.clear = function () {
            this.__entries__.splice(0);
        };

        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        anonymous.prototype.forEach = function (callback, ctx) {
            var this$1 = this;
            if ( ctx === void 0 ) ctx = null;

            for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
                var entry = list[i];

                callback.call(ctx, entry[1], entry[0]);
            }
        };

        Object.defineProperties( anonymous.prototype, prototypeAccessors );

        return anonymous;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }

    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }

    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }

    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }

    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;

/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
var throttle = function (callback, delay) {
    var leadingCall = false,
        trailingCall = false,
        lastCallTime = 0;

    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;

            callback();
        }

        if (trailingCall) {
            proxy();
        }
    }

    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }

    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();

        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }

            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        } else {
            leadingCall = true;
            trailingCall = false;

            setTimeout(timeoutCallback, delay);
        }

        lastCallTime = timeStamp;
    }

    return proxy;
};

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;

// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';

/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = function() {
    this.connected_ = false;
    this.mutationEventsAdded_ = false;
    this.mutationsObserver_ = null;
    this.observers_ = [];

    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
};

/**
 * Adds observer to observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be added.
 * @returns {void}
 */


/**
 * Holds reference to the controller's instance.
 *
 * @private {ResizeObserverController}
 */


/**
 * Keeps reference to the instance of MutationObserver.
 *
 * @private {MutationObserver}
 */

/**
 * Indicates whether DOM listeners have been added.
 *
 * @private {boolean}
 */
ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
    }

    // Add listeners if they haven't been added yet.
    if (!this.connected_) {
        this.connect_();
    }
};

/**
 * Removes observer from observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be removed.
 * @returns {void}
 */
ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer);

    // Remove observer if it's present in registry.
    if (~index) {
        observers.splice(index, 1);
    }

    // Remove listeners if controller has no connected observers.
    if (!observers.length && this.connected_) {
        this.disconnect_();
    }
};

/**
 * Invokes the update of observers. It will continue running updates insofar
 * it detects changes.
 *
 * @returns {void}
 */
ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_();

    // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.
    if (changesDetected) {
        this.refresh();
    }
};

/**
 * Updates every observer from observers list and notifies them of queued
 * entries.
 *
 * @private
 * @returns {boolean} Returns "true" if any observer has detected changes in
 *  dimensions of it's elements.
 */
ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
    });

    // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.
    activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

    return activeObservers.length > 0;
};

/**
 * Initializes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
        return;
    }

    // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.
    document.addEventListener('transitionend', this.onTransitionEnd_);

    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);

        this.mutationsObserver_.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMSubtreeModified', this.refresh);

        this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
};

/**
 * Removes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
        return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
        document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
};

/**
 * "Transitionend" event handler.
 *
 * @private
 * @param {TransitionEvent} event
 * @returns {void}
 */
ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
        var propertyName = ref.propertyName; if ( propertyName === void 0 ) propertyName = '';

    // Detect whether transition may affect dimensions of an element.
    var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
        this.refresh();
    }
};

/**
 * Returns instance of the ResizeObserverController.
 *
 * @returns {ResizeObserverController}
 */
ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
};

ResizeObserverController.instance_ = null;

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
        var key = list[i];

        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }

    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);

/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}

/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [], len = arguments.length - 1;
    while ( len-- > 0 ) positions[ len ] = arguments[ len + 1 ];

    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];

        return size + toFloat(value);
    }, 0);
}

/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};

    for (var i = 0, list = positions; i < list.length; i += 1) {
        var position = list[i];

        var value = styles['padding-' + position];

        paddings[position] = toFloat(value);
    }

    return paddings;
}

/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();

    return createRectInit(0, 0, bbox.width, bbox.height);
}

/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth;
    var clientHeight = target.clientHeight;

    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }

    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;

    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
        height = toFloat(styles.height);

    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }

        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }

    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }

        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }

    return createRectInit(paddings.left, paddings.top, width, height);
}

/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }

    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function'; };
})();

/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}

/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }

    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }

    return getHTMLElementContentRect(target);
}

/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(ref) {
    var x = ref.x;
    var y = ref.y;
    var width = ref.width;
    var height = ref.height;

    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);

    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });

    return rect;
}

/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = function(target) {
    this.broadcastWidth = 0;
    this.broadcastHeight = 0;
    this.contentRect_ = createRectInit(0, 0, 0, 0);

    this.target = target;
};

/**
 * Updates content rectangle and tells whether it's width or height properties
 * have changed since the last broadcast.
 *
 * @returns {boolean}
 */


/**
 * Reference to the last observed content rectangle.
 *
 * @private {DOMRectInit}
 */


/**
 * Broadcasted width of content rectangle.
 *
 * @type {number}
 */
ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);

    this.contentRect_ = rect;

    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
};

/**
 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
 * from the corresponding properties of the last observed content rectangle.
 *
 * @returns {DOMRectInit} Last observed content rectangle.
 */
ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;

    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;

    return rect;
};

var ResizeObserverEntry = function(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);

    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, { target: target, contentRect: contentRect });
};

var ResizeObserverSPI = function(callback, controller, callbackCtx) {
    this.activeObservations_ = [];
    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
};

/**
 * Starts observing provided element.
 *
 * @param {Element} target - Element to be observed.
 * @returns {void}
 */


/**
 * Registry of the ResizeObservation instances.
 *
 * @private {Map<Element, ResizeObservation>}
 */


/**
 * Public ResizeObserver instance which will be passed to the callback
 * function and used as a value of it's "this" binding.
 *
 * @private {ResizeObserver}
 */

/**
 * Collection of resize observations that have detected changes in dimensions
 * of elements.
 *
 * @private {Array<ResizeObservation>}
 */
ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is already being observed.
    if (observations.has(target)) {
        return;
    }

    observations.set(target, new ResizeObservation(target));

    this.controller_.addObserver(this);

    // Force the update of observations.
    this.controller_.refresh();
};

/**
 * Stops observing provided element.
 *
 * @param {Element} target - Element to stop observing.
 * @returns {void}
 */
ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is not being observed.
    if (!observations.has(target)) {
        return;
    }

    observations.delete(target);

    if (!observations.size) {
        this.controller_.removeObserver(this);
    }
};

/**
 * Stops observing all elements.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
};

/**
 * Collects observation instances the associated element of which has changed
 * it's content rectangle.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.gatherActive = function () {
        var this$1 = this;

    this.clearActive();

    this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
            this$1.activeObservations_.push(observation);
        }
    });
};

/**
 * Invokes initial callback function with a list of ResizeObserverEntry
 * instances collected from active resize observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
        return;
    }

    var ctx = this.callbackCtx_;

    // Create ResizeObserverEntry instance for every active observation.
    var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });

    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
};

/**
 * Clears the collection of active observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
};

/**
 * Tells whether observer has active observations.
 *
 * @returns {boolean}
 */
ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
};

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = function(callback) {
    if (!(this instanceof ResizeObserver)) {
        throw new TypeError('Cannot call a class as a function.');
    }
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);

    observers.set(this, observer);
};

// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        return (ref = observers.get(this))[method].apply(ref, arguments);
        var ref;
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }

    return ResizeObserver;
})();

/* harmony default export */ __webpack_exports__["a"] = (index);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(59)))

/***/ }),
/* 59 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DEPENDENCIES = ["player-controller", "movable"];

class PlayerControllerSystem {
    constructor(step = 5) {
        this.world = null;
        this.inputControllerService = null;
        this.players = {};
        this.step = step
    }

    activated(world) {
        this.world = world;
    }

    deactivated() {
        this.world = null;
        this.inputControllerService = null;
        this.players = {};
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.players[entity.id] = entity;
        }
    }

    entityRemoved(entity) {
        if (this.players[entity.id]) {
            delete this.players[entity.id];
        }
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.players[entity.id] = entity;
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type)) {
            delete this.players[entity.id];
        }
    }

    update() {
        if (this.inputControllerService != null) {
            const players = this.players;

            for (let x in players) {
                const player = players[x];

                const movable = player.getComponent("movable");
                movable.x += Math.round(this.inputControllerService.x * this.step);
                movable.y += Math.round(this.inputControllerService.y * this.step);
            }
        }
    }

    serviceAdded(name, service) {
        if (name === "controller-input-service") {
            this.inputControllerService = service;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PlayerControllerSystem;


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_WorldGeneration__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__WorldGenerationManager__ = __webpack_require__(63);



const DYNAMIC_LOADING_CELL = "dynamic-loading-cell";
const WORLD_GENERATION = "world-generation";

class WorldGenerationSystem {
    constructor({ noise, scale = 1000 }) {
        this.noise = noise;
        this.scale = scale;
        this.world = null;
        
        this.worldGenerationManager = new __WEBPACK_IMPORTED_MODULE_1__WorldGenerationManager__["a" /* default */]({ noise, scale });
        this.dynamicLoadingCells = [];
    }

    addDynamicLoadingCell(entity) {
        const index = this.dynamicLoadingCells.indexOf(entity);
        if (index === -1) {
            this.dynamicLoadingCells.push(entity);

            entity.getComponent("transform").isDirty = true;

            if (!entity.hasComponent(WORLD_GENERATION)) {
                entity.addComponent(new __WEBPACK_IMPORTED_MODULE_0__components_WorldGeneration__["a" /* default */]());
            }
        }
    }

    isDynamicLoadingCell(entity) {
        return entity.hasComponent(DYNAMIC_LOADING_CELL);
    }

    isDynamicLoadingCellComponent(component) {
        return component.type === DYNAMIC_LOADING_CELL;
    }

    removeDynamicLoadingCell(entity) {
        const index = this.dynamicLoadingCells.indexOf(entity);
        if (index > -1) {
            entity.removeComponentByType(WORLD_GENERATION);
            this.dynamicLoadingCells.splice(index, 1);
        }
    }

    // Life-cycle Methods
    activated(world) {
        this.world = world;

        const entities = this.world.getEntities();
        for (let x = 0; x < entities.length; x++) {
            this.entityAdded(entities[x]);
        }

        const services = this.world.getServices();
        for (let name in services) {
            this.serviceAdded(name, services[name]);
        }
    }

    componentAdded(entity) {
        if (this.isDynamicLoadingCell(entity)) {
            this.addDynamicLoadingCell(entity);
        }
    }

    componentRemoved(entity, component) {
        if (this.isDynamicLoadingCellComponent(component)) {
            this.removeDynamicLoadingCell(entity);
        }
    }

    deactivated() {
        this.world = null;
        this.dynamicLoadingCells = null;
        this.entityPool.clear();
    }

    entityAdded(entity) {
        if (this.isDynamicLoadingCell(entity)) {
            this.addDynamicLoadingCell(entity);
        }
    }

    entityRemoved(entity) {
        this.removeDynamicLoadingCell(entity);
    }

    afterUpdate() {
        for (let x = 0; x < this.dynamicLoadingCells.length; x++) {
            const entity = this.dynamicLoadingCells[x];
            this.worldGenerationManager.manage(this.world, entity);
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = WorldGenerationSystem;


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class WorldGeneration {
    constructor(){
        this.type = "world-generation";
        this.isGroundLoaded = false;
        this.arePropsLoaded = false;
        this.areEnemiesLoaded = false;

        this.groundEntities = [];
        this.propEntities = [];
        this.enemyEntities = [];

        this.position = {
            x: 0,
            y: 0
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WorldGeneration;


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utilities_EntityPool__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_ground_Water__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GroundEntityIdentifier__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__groundEntities__ = __webpack_require__(68);





const GRASS = "grass";
const DIRT = "dirt";
const WATER = "water";

class WorldGenerationManager {
    constructor({
        noise,
        scale = 1000
    }) {
        this.noise = noise;
        this.cellSize = 100;
        this.scale = scale;
        this.entity = null;
        this.transform = null;
        this.rectangle = null;
        this.worldGeneration = null;
        this.world = null;

        this.entityPool = new __WEBPACK_IMPORTED_MODULE_0__src_utilities_EntityPool__["a" /* default */]();

        for (let type in __WEBPACK_IMPORTED_MODULE_3__groundEntities__["a" /* default */]){
            this.entityPool.addEntityType(type, __WEBPACK_IMPORTED_MODULE_3__groundEntities__["a" /* default */][type]);
        }

        this.entityPool.addEntityType(WATER, __WEBPACK_IMPORTED_MODULE_1__entities_ground_Water__["a" /* default */]);

        this.groundEntityIdentifier = new __WEBPACK_IMPORTED_MODULE_2__GroundEntityIdentifier__["a" /* default */]({
            noise,
            scale
        });

        this.groundEntityIdentifier.addRange({
            name: GRASS,
            min: -1,
            max: 0
        });

        this.groundEntityIdentifier.addRange({
            name: DIRT,
            min: 0,
            max: 0.25
        });

    }

    loadEnemies() {
        if (!this.worldGeneration.areEnemiesLoaded) {
            this.worldGeneration.areEnemiesLoaded = true;
        }
    }

    loadGround() {
        if (!this.worldGeneration.isGroundLoaded) {
            this.worldGeneration.isGroundLoaded = true;

            const startX = this.rectangle.left;
            const startY = this.rectangle.top;
            const endX = this.rectangle.right;
            const endY = this.rectangle.bottom;

            for (let x = startX; x < endX; x += this.cellSize) {
                for (let y = startY; y < endY; y += this.cellSize) {
                    let entityType = this.groundEntityIdentifier.getTileIdentity(x, y);

                    if (entityType == null) {
                        entityType = WATER;
                    }

                    const entity = this.entityPool.acquire(entityType);

                    const transform = entity.getComponent("transform");
                    transform.position.x = x + (this.cellSize / 2);
                    transform.position.y = y + (this.cellSize / 2);
                    transform.isDirty = true;

                    if (this.world.getEntityById(entity.id) == null) {
                        this.world.addEntity(entity);
                    }

                    this.worldGeneration.groundEntities.push(entity);

                }
            }
        }
    }

    loadProps() {
        if (!this.worldGeneration.arePropsLoaded) {
            this.worldGeneration.arePropsLoaded = true;
        }
    }

    loadTerrain() {
        const worldGeneration = this.worldGeneration;

        if (this.rectangle.width % this.cellSize !== 0) {
            throw new Error(`Dynamic Loading Cell isn't divisable by tile size, '${this.cellSize}' `);
        }

        if (this.rectangle.height % this.cellSize !== 0) {
            throw new Error(`Dynamic Loading Cell isn't divisable by tile size, '${this.cellSize}' `);
        }

        worldGeneration.position.x = this.transform.position.x;
        worldGeneration.position.y = this.transform.position.y;

        // This will allow world Generation to come in three frames.
        if (!worldGeneration.isGroundLoaded) {
            this.loadGround(worldGeneration);
        } else if (!worldGeneration.arePropsLoaded) {
            this.loadProps(worldGeneration);
        } else if (!worldGeneration.areEnemiesLoaded) {
            this.loadEnemies(worldGeneration);
        }
    }

    releaseEntitiesFromPool(entities) {
        for (let x = 0; x < entities.length; x++) {
            const entity = entities[x];

            this.entityPool.release(entity);
        }
    }

    releaseEntities() {
        const worldGeneration = this.worldGeneration;
        this.releaseEntitiesFromPool(worldGeneration.groundEntities);
        this.releaseEntitiesFromPool(worldGeneration.propEntities);
        this.releaseEntitiesFromPool(worldGeneration.enemyEntities);

        worldGeneration.groundEntities.length = 0;
        worldGeneration.propEntities.length = 0;
        worldGeneration.enemyEntities.length = 0;

    }

    tearDown() {
        const worldGeneration = this.worldGeneration;
        this.releaseEntities(worldGeneration);

        worldGeneration.isGroundLoaded = false;
        worldGeneration.arePropsLoaded = false;
        worldGeneration.areEnemiesLoaded = false;
    }

    manage(world, entity) {
        this.world = world;

        this.entity = entity;
        this.transform = entity.getComponent("transform");
        this.rectangle = entity.getComponent("rectangle");
        this.worldGeneration = entity.getComponent("world-generation");

        if (this.transform.position.x != this.worldGeneration.position.x ||
            this.transform.position.y != this.worldGeneration.position.y) {
            this.tearDown();
        }

        this.loadTerrain();
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = WorldGenerationManager;


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Pool {
    constructor({EntityType, type}) {
        this.EntityType = EntityType;
        this.type = type;
        this.available = [];
        this.locked = {};
    }

    release(entity) {
        if (this.type != entity.type) {
            return;
        }

        if (this.locked[entity.id]) {
            delete this.locked[entity.id];
        }

        this.available.push(entity);
    }

    acquire() {
        let entity;

        if (this.available.length > 0) {
            entity = this.available.pop();

            this.locked[entity.id] = entity;
        } else {
            entity = new this.EntityType();
        }

        return entity;
    }
}

class EntityPool {
    constructor() {
        this.pools = {};
    }

    addEntityType(type, EntityType) {
        this.pools[type] = new Pool({ EntityType, type });
    }

    removeEntityType(type) {
        delete this.pools[type];
    }

    acquire(type) {
        if (this.pools[type] == null) {
            throw new Error(`Cannot find entity pool of type '${type}'`);
        }

        return this.pools[type].acquire();
    }

    release(entity) {
        if (this.pools[entity.type] == null) {
            throw new Error(`Cannot find entity pool of type '${entity.type}'`);
        }

        return this.pools[entity.type].release(entity);
    }

    clear(){
        this.pools = {};
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EntityPool;


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Shape__ = __webpack_require__(9);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "water";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const shape = new __WEBPACK_IMPORTED_MODULE_4__src_components_Shape__["a" /* default */]();

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        shape.fillColor.red = 88;
        shape.fillColor.green = 128;
        shape.fillColor.blue = 192;
        
        shape.points.push(
            { x: 0, y: 0 },
            { x: SIZE, y: 0 },
            { x: SIZE, y: SIZE },
            { x: 0, y: SIZE },
            { x: 0, y: 0 }
        );

        shape.id = this.id;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(shape);
    }
});

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utilities_Validator__ = __webpack_require__(67);


class GroundEntityIdentifier {
    constructor({ noise, scale }) {
        this.noise = noise;
        this.scale = scale;
        this.ranges = [];
    }

    addRange(range) {
        const validator = new __WEBPACK_IMPORTED_MODULE_0__src_utilities_Validator__["a" /* default */](range);

        if (!validator.validate("name").isString() ||
            !validator.validate("min").isNumber() ||
            !validator.validate("max").isNumber()) {
            throw new Error("Invalid Range: Expected name, min and max.");
        }

        this.ranges.push(range);
    }

    getTileType(value){
        let name = null;
        const ranges = this.ranges;

        for (let x = 0; x < ranges.length; x++) {
            const range = ranges[x];

            if (value > range.min && value <= range.max) {
                name = range.name;
                break;
            }
        }

        return name;
    }

    getTileIdentity(x, y) {
        const ranges = this.ranges;

        const value = this.noise.perlin(x / this.scale, y / this.scale);
        const topValue = this.noise.perlin(x / this.scale, (y - 1) / this.scale);
        const bottomValue = this.noise.perlin(x / this.scale, (y + 1) / this.scale);
        const leftValue = this.noise.perlin((x - 1) / this.scale, y / this.scale);
        const rightValue = this.noise.perlin((x + 1) / this.scale, y / this.scale);
        
        let valueName = this.getTileType(value);
        let topName = this.getTileType(topValue);
        let bottomName = this.getTileType(bottomValue);
        let leftName = this.getTileType(leftValue);
        let rightName = this.getTileType(rightValue);

        if (valueName === null){
            return null;
        }

        const index = ranges.findIndex((range)=>{
            return range.name === valueName;
        });
        
        const previousName = ranges[index - 1] || null;
        let identity = valueName;

        if (previousName != null){
            identity += `${topName !== valueName && topName !== previousName ? 1 : ""}`;
            identity += `${rightName !== valueName && rightName !== previousName ? 2 : ""}`;
            identity += `${bottomName !== valueName  && bottomName !== previousName ? 3 : ""}`;
            identity += `${leftName !== valueName && leftName !== previousName ? 4 : ""}`;
        } else {
            identity += `${topName !== valueName ? 1 : ""}`;
            identity += `${rightName !== valueName ? 2 : ""}`;
            identity += `${bottomName !== valueName ? 3 : ""}`;
            identity += `${leftName !== valueName ? 4 : ""}`;
        }

        return identity;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GroundEntityIdentifier;


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class PropertyValidator {
    constructor(value) {
        this.value = value;
    }

    isInstanceOf(type) {
        return this.value instanceof type;
    }

    isArray() {
        return Array.isArray(this.value);
    }

    isObject() {
        return typeof this.value === "object" && this.value !== null;
    }

    isNumber() {
        return typeof this.value === "number";
    }

    isBoolean() {
        return typeof this.value === "boolean";
    }

    isString() {
        return typeof this.value === "string";
    }

    isFunction(){
        return typeof this.value === "function";
    }

    isNullableArray() {
        return this.isArray() || this.isNull();
    }

    isNullableObject() {
        return this.isObject() || this.isNull();
    }

    isNullableNumber() {
        return this.isNumber() || this.isNull();
    }

    isNullableBoolean() {
        return this.isBoolean() || this.isNull();
    }

    isNullableString() {
        return this.isString() || this.isNull();
    }

    isFunction(){
        return this.isFunction() || this.isNull();
    }

    isNull() {
        return this.value === null;
    }

    isNullOrUndefined() {
        return this.value == null;
    }

    isUndefined() {
        return typeof this.value === "undefined";
    }

}

class Validator {
    constructor(obj) {
        this.obj = obj;
    }

    getObject(obj, namespace) {
        if (namespace == null || obj == null) {
            return undefined;
        }

        const properties = namespace.split(".");
        const property = properties[0];

        if (obj[property] != null) {
            if (properties.length > 1) {
                return this.getObject(obj[property], properties.slice(1));
            } else {
                return obj[property];
            }
        } else {
            return undefined;
        }
    }

    validate(namespace) {
        const value = this.getObject(this.obj, namespace);
        return new PropertyValidator(value);
    }

    getValue(namespace) {
        return this.getObject(this.obj, namespace);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Validator;


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities_ground_Grass__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entities_ground_Grass1__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__entities_ground_Grass2__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__entities_ground_Grass3__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__entities_ground_Grass4__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__entities_ground_Grass12__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__entities_ground_Grass13__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__entities_ground_Grass14__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__entities_ground_Grass23__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__entities_ground_Grass24__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__entities_ground_Grass34__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__entities_ground_Grass123__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__entities_ground_Grass134__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__entities_ground_Grass234__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__entities_ground_Grass1234__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__entities_ground_Dirt__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__entities_ground_Dirt1__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__entities_ground_Dirt2__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__entities_ground_Dirt3__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__entities_ground_Dirt4__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__entities_ground_Dirt12__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__entities_ground_Dirt13__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__entities_ground_Dirt14__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__entities_ground_Dirt23__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__entities_ground_Dirt24__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__entities_ground_Dirt34__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__entities_ground_Dirt123__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__entities_ground_Dirt134__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__entities_ground_Dirt234__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__entities_ground_Dirt1234__ = __webpack_require__(98);































/* harmony default export */ __webpack_exports__["a"] = ({
    "grass": __WEBPACK_IMPORTED_MODULE_0__entities_ground_Grass__["a" /* default */],
    "grass1": __WEBPACK_IMPORTED_MODULE_1__entities_ground_Grass1__["a" /* default */],
    "grass2": __WEBPACK_IMPORTED_MODULE_2__entities_ground_Grass2__["a" /* default */],
    "grass3": __WEBPACK_IMPORTED_MODULE_3__entities_ground_Grass3__["a" /* default */],
    "grass4": __WEBPACK_IMPORTED_MODULE_4__entities_ground_Grass4__["a" /* default */],
    "grass12": __WEBPACK_IMPORTED_MODULE_5__entities_ground_Grass12__["a" /* default */],
    "grass13": __WEBPACK_IMPORTED_MODULE_6__entities_ground_Grass13__["a" /* default */],
    "grass14": __WEBPACK_IMPORTED_MODULE_7__entities_ground_Grass14__["a" /* default */],
    "grass23": __WEBPACK_IMPORTED_MODULE_8__entities_ground_Grass23__["a" /* default */],
    "grass24": __WEBPACK_IMPORTED_MODULE_9__entities_ground_Grass24__["a" /* default */],
    "grass34": __WEBPACK_IMPORTED_MODULE_10__entities_ground_Grass34__["a" /* default */],
    "grass123": __WEBPACK_IMPORTED_MODULE_11__entities_ground_Grass123__["a" /* default */],
    "grass134": __WEBPACK_IMPORTED_MODULE_12__entities_ground_Grass134__["a" /* default */],
    "grass234": __WEBPACK_IMPORTED_MODULE_13__entities_ground_Grass234__["a" /* default */],
    "grass1234": __WEBPACK_IMPORTED_MODULE_14__entities_ground_Grass1234__["a" /* default */],
    "dirt": __WEBPACK_IMPORTED_MODULE_15__entities_ground_Dirt__["a" /* default */],
    "dirt1": __WEBPACK_IMPORTED_MODULE_16__entities_ground_Dirt1__["a" /* default */],
    "dirt2": __WEBPACK_IMPORTED_MODULE_17__entities_ground_Dirt2__["a" /* default */],
    "dirt3": __WEBPACK_IMPORTED_MODULE_18__entities_ground_Dirt3__["a" /* default */],
    "dirt4": __WEBPACK_IMPORTED_MODULE_19__entities_ground_Dirt4__["a" /* default */],
    "dirt12": __WEBPACK_IMPORTED_MODULE_20__entities_ground_Dirt12__["a" /* default */],
    "dirt13": __WEBPACK_IMPORTED_MODULE_21__entities_ground_Dirt13__["a" /* default */],
    "dirt14": __WEBPACK_IMPORTED_MODULE_22__entities_ground_Dirt14__["a" /* default */],
    "dirt23": __WEBPACK_IMPORTED_MODULE_23__entities_ground_Dirt23__["a" /* default */],
    "dirt24": __WEBPACK_IMPORTED_MODULE_24__entities_ground_Dirt24__["a" /* default */],
    "dirt34": __WEBPACK_IMPORTED_MODULE_25__entities_ground_Dirt34__["a" /* default */],
    "dirt123": __WEBPACK_IMPORTED_MODULE_26__entities_ground_Dirt123__["a" /* default */],
    "dirt134": __WEBPACK_IMPORTED_MODULE_27__entities_ground_Dirt134__["a" /* default */],
    "dirt234": __WEBPACK_IMPORTED_MODULE_28__entities_ground_Dirt234__["a" /* default */],
    "dirt1234": __WEBPACK_IMPORTED_MODULE_29__entities_ground_Dirt1234__["a" /* default */]
});

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_Text__ = __webpack_require__(5);







const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        const text = new __WEBPACK_IMPORTED_MODULE_5__src_components_Text__["a" /* default */]();
        
        text.text = "Grass";
        text.horizontalAlignment = "center";
        text.lineHeight = 100;
        text.isDirty = true;
        
        image.url = "assets/ground/Grass.png";
        image.id = "assets/ground/Grass.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(text);
    }
});

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass1";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass1.png";
        image.id = "assets/ground/Grass1.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass2";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass2.png";
        image.id = "assets/ground/Grass2.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass3";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass3.png";
        image.id = "assets/ground/Grass3.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_Text__ = __webpack_require__(5);







const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass4";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        const text = new __WEBPACK_IMPORTED_MODULE_5__src_components_Text__["a" /* default */]();
        
        text.text = "Grass 4";
        text.lineHeight = 100;
        text.horizontalAlignment = "center";
        text.isDirty = true;

        image.url = "assets/ground/Grass4.png";
        image.id = "assets/ground/Grass4.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(text);
    }
});

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass12";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass12.png";
        image.id = "assets/ground/Grass12.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass13";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass13.png";
        image.id = "assets/ground/Grass13.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass14";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass14.png";
        image.id = "assets/ground/Grass14.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass23";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass23.png";
        image.id = "assets/ground/Grass23.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass24";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass24.png";
        image.id = "assets/ground/Grass24.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass34";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass34.png";
        image.id = "assets/ground/Grass34.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass123";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass123.png";
        image.id = "assets/ground/Grass123.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass134";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass134.png";
        image.id = "assets/ground/Grass134.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass234";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass234.png";
        image.id = "assets/ground/Grass234.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "grass1234";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Grass1234.png";
        image.id = "assets/ground/Grass1234.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_Text__ = __webpack_require__(5);







const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        const text = new __WEBPACK_IMPORTED_MODULE_5__src_components_Text__["a" /* default */]();
        
        text.text = "Dirt";
        text.horizontalAlignment = "center";
        text.isDirty = true;
        text.lineHeight = 100;
        
        image.url = "assets/ground/Dirt.png";
        image.id = "assets/ground/Dirt.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(text);
    }
});

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_Text__ = __webpack_require__(5);







const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt1";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        const text = new __WEBPACK_IMPORTED_MODULE_5__src_components_Text__["a" /* default */]();
        
        text.text = "Dirt1";
        text.horizontalAlignment = "center";
        text.lineHeight = 100;
        text.isDirty = true;

        image.url = "assets/ground/Dirt1.png";
        image.id = "assets/ground/Dirt1.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(text);
    }
});

/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_Text__ = __webpack_require__(5);







const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt2";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        const text = new __WEBPACK_IMPORTED_MODULE_5__src_components_Text__["a" /* default */]();
        
        text.text = "Dirt2";
        text.horizontalAlignment = "center";
        text.lineHeight = 100;
        text.isDirty = true;
        
        image.url = "assets/ground/Dirt2.png";
        image.id = "assets/ground/Dirt2.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(text);
    }
});

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_Text__ = __webpack_require__(5);







const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt3";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        const text = new __WEBPACK_IMPORTED_MODULE_5__src_components_Text__["a" /* default */]();
        
        text.text = "Dirt3";
        text.horizontalAlignment = "center";
        text.lineHeight = 100;
        text.isDirty = true;

        image.url = "assets/ground/Dirt3.png";
        image.id = "assets/ground/Dirt3.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(text);
    }
});

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Text__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_Image__ = __webpack_require__(4);







const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt4";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_5__src_components_Image__["a" /* default */]();
        const text = new __WEBPACK_IMPORTED_MODULE_4__src_components_Text__["a" /* default */]();
        
        text.text = "Boo";
        text.horizontalAlignment = "center";
        text.lineHeight = 100;
        text.isDirty = true;

        image.url = "assets/ground/Dirt4.png";
        image.id = "assets/ground/Dirt4.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(text);
    }
});

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt12";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Dirt12.png";
        image.id = "assets/ground/Dirt12.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt13";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Dirt13.png";
        image.id = "assets/ground/Dirt13.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt14";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Dirt14.png";
        image.id = "assets/ground/Dirt14.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt23";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Dirt23.png";
        image.id = "assets/ground/Dirt23.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt24";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Dirt24.png";
        image.id = "assets/ground/Dirt24.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt34";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Dirt34.png";
        image.id = "assets/ground/Dirt34.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt123";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Dirt123.png";
        image.id = "assets/ground/Dirt123.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt134";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Dirt134.png";
        image.id = "assets/ground/Dirt134.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt234";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Dirt234.png";
        image.id = "assets/ground/Dirt234.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Image__ = __webpack_require__(4);






const SIZE = 100;

/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor() {
        super();
        this.type = "dirt1234";

        const transform = new __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__["a" /* default */]();
        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_2__src_components_RectangleCollider__["a" /* default */]();
        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        const image = new __WEBPACK_IMPORTED_MODULE_4__src_components_Image__["a" /* default */]();
        
        image.url = "assets/ground/Dirt1234.png";
        image.id = "assets/ground/Dirt1234.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
});

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. rowou may use it as you see fit, but
 * attribution is appreciated.
 *
 */

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dot(x, y) {
        return this.x * x + this.y * y;
    }
}

class Noise {
    constructor(seed) {
        this.directionalVectors = [new Vector(1, 1), new Vector(-1, 1), new Vector(1, -1), new Vector(-1, -1),
        new Vector(1, 0), new Vector(-1, 0), new Vector(1, 0), new Vector(-1, 0),
        new Vector(0, 1), new Vector(0, -1), new Vector(0, 1), new Vector(0, -1)];

        this.whiteNoise = [151, 160, 137, 91, 90, 15,
            131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23,
            190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33,
            88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
            77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244,
            102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
            135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123,
            5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42,
            223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9,
            129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228,
            251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107,
            49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254,
            138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
        // To remove the need for index wrapping, double the permutation table length
        this.permutation = new Array(512);
        this.vectorNoise = new Array(512);

        this.seed(seed || 0);
    }

    seed(seed) {
        if (seed > 0 && seed < 1) {
            // Scale the seed out
            seed *= 65536;
        }

        seed = Math.floor(seed);
        if (seed < 256) {
            seed |= seed << 8;
        }

        let whiteNoise = this.whiteNoise;
        for (let i = 0; i < 256; i++) {
            let value;
            if (i & 1) {
                value = whiteNoise[i] ^ (seed & 255);
            } else {
                value = whiteNoise[i] ^ ((seed >> 8) & 255);
            }

            let permutation = this.permutation;
            let vectorNoise = this.vectorNoise;
            permutation[i] = permutation[i + 256] = value;
            vectorNoise[i] = vectorNoise[i + 256] = this.directionalVectors[value % 12];
        }
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(a, b, t) {
        return (1 - t) * a + t * b;
    }

    perlin(x, y) {
        // Find unit grid cell containing point
        let column = Math.floor(x), row = Math.floor(y);
        // Get relative xy coordinates of point within that cell
        x = x - column; y = y - row;
        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        column = column & 255; row = row & 255;

        // Calculate noise contributions from each of the four corners
        let permutation = this.permutation;
        let vectorNoise = this.vectorNoise;
        let corner1 = vectorNoise[column + permutation[row]].dot(x, y);
        let corner2 = vectorNoise[column + permutation[row + 1]].dot(x, y - 1);
        let corner3 = vectorNoise[column + 1 + permutation[row]].dot(x - 1, y);
        let corner4 = vectorNoise[column + 1 + permutation[row + 1]].dot(x - 1, y - 1);

        // Compute the fade curve value for x
        let u = this.fade(x);

        // Interpolate the four results
        return this.lerp(
            this.lerp(corner1, corner3, u),
            this.lerp(corner2, corner4, u),
            this.fade(y));
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Noise);



/***/ })
/******/ ]);