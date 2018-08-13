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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_createGuid__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_invokeMethod__ = __webpack_require__(4);
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
/* harmony default export */ __webpack_exports__["a"] = ((obj, methodName, args) => {
    args = Array.isArray(args)? args: [];
   if (obj != null && typeof obj[methodName] === "function"){
       return obj[methodName].apply(obj, args);
   }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__ = __webpack_require__(4);


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
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SolidBody {
    constructor() {
        this.type = "solid-body";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SolidBody;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_World__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_entities_Camera__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_systems_BroadPhaseCollisionSystem__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_systems_DefaultCameraSystem__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_systems_ControllerSystem__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_systems_KeyboardSystem__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_systems_MovementSystem__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__entities_Text__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__entities_Mario__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__entities_StaticText__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_systems_FollowEntityCameraSystem__ = __webpack_require__(50);












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
const player = new __WEBPACK_IMPORTED_MODULE_7__entities_Text__["a" /* default */]("P");
const mario = new __WEBPACK_IMPORTED_MODULE_8__entities_Mario__["a" /* default */]();
const mario2 = new __WEBPACK_IMPORTED_MODULE_8__entities_Mario__["a" /* default */]({ position: { x: 32, y: 0 }, flipHorizontally: true, flipVertically: false });
const mario3 = new __WEBPACK_IMPORTED_MODULE_8__entities_Mario__["a" /* default */]({ position: { x: -32, y: 0 }, flipHorizontally: true, flipVertically: true });
const mario4 = new __WEBPACK_IMPORTED_MODULE_8__entities_Mario__["a" /* default */]({ position: { x: -60, y: 0 }, flipHorizontally: false, flipVertically: false });

mario4.getComponent("transform").rotation = 90;

// Systems
const controllerSystem = new __WEBPACK_IMPORTED_MODULE_4__src_systems_ControllerSystem__["a" /* default */]();
const keyboardInputSystem = new __WEBPACK_IMPORTED_MODULE_5__src_systems_KeyboardSystem__["a" /* default */]();
const movableSystem = new __WEBPACK_IMPORTED_MODULE_6__src_systems_MovementSystem__["a" /* default */]();
const broadPhaseCollisionSystem = new __WEBPACK_IMPORTED_MODULE_2__src_systems_BroadPhaseCollisionSystem__["a" /* default */]();

const followEntityCameraSystem = new __WEBPACK_IMPORTED_MODULE_10__src_systems_FollowEntityCameraSystem__["a" /* default */]({
    cameraEntityId: camera.id,
    followEntityId: player.id
});

const defaultCameraSystem = new __WEBPACK_IMPORTED_MODULE_3__src_systems_DefaultCameraSystem__["a" /* default */]({
    canvas,
    cameraName,
    cellSize: 300
});

// Set up world
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(movableSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(defaultCameraSystem);

// Add Entities
world.addEntity(camera);
world.addEntity(player);
world.addEntity(mario);
world.addEntity(mario2);
world.addEntity(mario3);
world.addEntity(mario4);

for (let x = 0; x < 10000; x++) {
    const entity = new __WEBPACK_IMPORTED_MODULE_9__entities_StaticText__["a" /* default */](x, {
        x: getRandomNumber(-10000, 10000),
        y: getRandomNumber(-10000, 10000)
    }, getRandomRgba());

    world.addEntity(entity);
}

world.play();

window.world = world;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_invokeMethod__ = __webpack_require__(4);
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Camera__ = __webpack_require__(13);
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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BoundingRectangleSystem__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SpatialPartitionSystem__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RectangleColliderSystem__ = __webpack_require__(23);
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BoundingRentangleUpdater__ = __webpack_require__(16);
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(17);


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
    }

    updateOrigin() {
        this.transform.origin.x = this.rectangle.width / 2;
        this.transform.origin.y = this.rectangle.height / 2;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoundingRectangleUpdater;


/***/ }),
/* 17 */
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
        const entitiesById = spatialPartitionService.entitiesById;
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
            this.removePlacableEntity();
        }
    }

    serviceAdded(name, service) {
        if (name === "bounding-rectangle-service") {
            this.boundingRectangleData = service;
        }
    }

    serviceRemoved(name, service) {
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
        const world = _world;
        this.world = null;
        this.currentTimestamp = 0;
        this.spatialPartitionService = null;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CameraSystem_Compositor__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CameraSystem_CanvasFactory__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CameraSystem_ImageFactory__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CameraSystem_ImageRasterizer__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CameraSystem_PolygonRasterizer__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CameraSystem_LineRasterizer__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__CameraSystem_ShapeRasterizer__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__CameraSystem_TextRasterizer__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CameraSystem__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__SystemsBundlerSystem__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__DynamicLoadingSystem__ = __webpack_require__(36);












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
        this.systems.push(new __WEBPACK_IMPORTED_MODULE_10__DynamicLoadingSystem__["a" /* default */]({ cameraName, cellSize }));
        this.systems.push(new DefaultCameraSystem({ canvas, cameraName, assetRoot }));
    }
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const sortByZIndex = (a, b) => (a.zIndex || Infinity) - (b.zIndex || Infinity);

class Compositor {
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
            if (component && component.isDirty) {
                const rasterizer = this.rasterizers[type];
                const imageId = rasterizer.getIdentity(entity);
                this.images[imageId] = null;
                return true;
            }
        }

        return false;
    }

    getEntityImages(_entity) {
        const entity = _entity;
        const rasterizers = this.rasterizers;
        const images = [];

        if (entity == null) {
            return images;
        }

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

        return images;

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Compositor;


/***/ }),
/* 27 */
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
/* 28 */
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
/* 29 */
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

    getIdentity(entity) {
        const image = entity.getComponent("image");
        const transform = entity.getComponent("transform");

        return `${this.getImageIdentity(image)}|${transform.rotation}`;
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
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_overlay__ = __webpack_require__(31);


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
/* 31 */
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
/* 32 */
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

        return `rectangle=${JSON.stringify(size)}, line=${JSON.stringify(line)}`;
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();

        const transform = entity.getComponent("transform");
        const rectangle = entity.getComponent("rectangle");
        const line = entity.getComponent("line");
        const context = canvas.getContext("2d");

        const angle = transform.rotatioon;
        const position = transform.position;
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
/* 33 */
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
/* 34 */
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
/* 35 */
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
                    const transform = entity.getComponent("transform");
                    const images = this.compositor.getEntityImages(entity);
                    const rotation = transform.rotation;

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
        let fullCellRenderCount = 0;

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

            if (cell.transform.isDirty || cell.isDirty) {

                if (fullCellRenderCount === 0) {
                    fullCellRenderCount++;
                    cell.isDirty = false;

                    for (let c = 0; c < cellPositions.length; c++) {
                        const cellPosition = cellPositions[c];
                        renderableCells[`${cellPosition.column}_${cellPosition.row}`] = cellPosition;
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
            const top = Math.max(cell.transform.position.y, this.camera.transform.position.y);
            const left = Math.max(cell.transform.position.x, this.camera.transform.position.x);
            const bottom = Math.min(cell.transform.position.y + cell.rectangle.height, this.camera.transform.position.y + this.camera.rectangle.height);
            const right = Math.min(cell.transform.position.x + cell.rectangle.width, this.camera.transform.position.x + this.camera.rectangle.width);

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

    deactivated(world) {

    }

    entityAdded(entity) {
        if (this._isDynamicLoadingCellEntity(entity)) {
            this.cells.push(new CanvasCell(entity, this.canvasFactory.create()));
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
        //console.log(this.drawImageCount);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CameraSystem;


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entities_DynamicLoadingCell__ = __webpack_require__(37);


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
                const index = (y * 3) + x;

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

    _findCellPositionsWithCenter(x, y) {
        const centerColumn = Math.floor(x / this.cellSize);
        const centerRow = Math.floor(y / this.cellSize);

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
        const cameraCenterX = this.camera.position.x + (this.camera.rectangle.width / 2);
        const cameraCenterY = this.camera.position.y + (this.camera.rectangle.height / 2);

        this._findCellPositionsWithCenter(cameraCenterX, cameraCenterY);

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

    update(currentTime) {
        if (this._hasCamera()) {
            this._updateCells();
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DynamicLoadingSystem;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_DynamicLoadingCell__ = __webpack_require__(38);






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
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DynamicLoadingCell {
    constructor(){
        this.type = "dynamic-loading-cell";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DynamicLoadingCell;


/***/ }),
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_Text__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_KeyboardController__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_components_KeyboardInput__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_components_Movable__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_components_Shape__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_components_SolidBody__ = __webpack_require__(8);











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
    }
});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class KeyboardController {
    constructor() {
        this.type = "keyboard-controller";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyboardController;


/***/ }),
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Image__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_RectangleCollider__ = __webpack_require__(3);






class Mario extends __WEBPACK_IMPORTED_MODULE_0__src_Entity__["a" /* default */] {
    constructor({ position, flipHorizontally, flipVertically } = { position: { x: 0, y: 0 }, flipHorizontally: false, flipVertically: false }) {
        super();
        this.type = "Mario";

        const image = new __WEBPACK_IMPORTED_MODULE_1__src_components_Image__["a" /* default */]();
        image.url = "./images/Mario.png";
        image.isDirty = true;
        image.size.width = 16;
        image.size.height = 26;
        image.flipHorizontally = flipHorizontally;
        image.flipVertically = flipVertically;

        const rectangle = new __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__["a" /* default */]();
        rectangle.width = 16;
        rectangle.height = 26;
        rectangle.isDirty = true;

        const transform = new __WEBPACK_IMPORTED_MODULE_2__src_components_Transform__["a" /* default */]();
        transform.position.x = position.x;
        transform.position.y = position.y;

        const rectangleCollider = new __WEBPACK_IMPORTED_MODULE_4__src_components_RectangleCollider__["a" /* default */]();

        this.addComponent(image);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(transform);


    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Mario;


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class Image {
    constructor() {
        this.type = "image";
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
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_components_Transform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_components_Text__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_components_Rectangle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_components_RectangleCollider__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_components_Shape__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_components_SolidBody__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_components_Opacity__ = __webpack_require__(49);









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

        opacity.value = Math.random();

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

        transform.rotation = 13;
        transform.isDirty = true;

        this.addComponent(transform);
        this.addComponent(textTexture);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(shape);
        this.addComponent(opacity);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StaticText;


/***/ }),
/* 49 */
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
/* 50 */
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