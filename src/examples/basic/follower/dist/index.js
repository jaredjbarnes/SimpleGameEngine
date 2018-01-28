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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(21);
﻿

var createGuid = __WEBPACK_IMPORTED_MODULE_0__util__["a" /* createGuid */];

class Entity {
    constructor() {
        this._delegate = null;
        this._components = {};
        this.id = createGuid();
        this.type = null;
    }

    _invokeMethod(obj, methodName, args) {
        args = Array.isArray(args) ? args : [];
        if (obj && typeof obj[methodName] === "function") {
            return obj[methodName].apply(obj, args);
        }
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
            this._invokeMethod(delegate, "componentAdded", [this, component]);
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
                this._invokeMethod(delegate, "componentRemoved", [this, component]);
            }
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
﻿class Position {
    constructor() {
        this.type = "position";
        this.x = 0;
        this.y = 0;
        this.isStatic = false;
        this.isDirty = true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Position;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class Size {
    constructor() {
        this.type = "size";
        this.width = 0;
        this.height = 0;
        this.isDirty = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Size;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class Collidable {
    constructor() {
        this.type = "collidable";
        this.name = null;
        this.isEnabled = true;
        this.collisions = {};
        this.cellPositions = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Collidable;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vector {
    static add(vectorA, vectorB, optionalVector) {
        optionalVector = optionalVector || {};
        optionalVector.x = vectorA.x + vectorB.x;
        optionalVector.y = vectorA.y + vectorB.y;

        return optionalVector;
    }

    static subtract(vectorA, vectorB, optionalVector) {
        optionalVector = optionalVector || {};
        optionalVector.x = vectorA.x - vectorB.x;
        optionalVector.y = vectorA.y - vectorB.y;

        return optionalVector;
    }

    static multiply(vectorA, vectorB, optionalVector) {
        optionalVector = optionalVector || {};
        optionalVector.x = vectorA.x * vectorB.x;
        optionalVector.y = vectorA.y * vectorB.y;

        return optionalVector;
    }

    static divide(vectorA, vectorB, optionalVector) {
        optionalVector = optionalVector || {};
        optionalVector.x = vectorA.x / vectorB.x;
        optionalVector.y = vectorA.y / vectorB.y;

        return optionalVector;
    }

    static scale(vector, scale, optionalVector) {
        optionalVector = optionalVector || {};
        optionalVector.x = scale * vector.x;
        optionalVector.y = scale * vector.y;

        return optionalVector;
    }

    static project(vectorA, vectorB, optionalVector) {
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

    static getLeftNormal(vector, optionalVector) {
        optionalVector = optionalVector || {};

        optionalVector.x = -vector.y;
        optionalVector.y = vector.x;

        return optionalVector;
    }

    static getRightNormal(vector, optionalVector) {
        optionalVector = optionalVector || {};

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

    static normalize(vector, optionalVector) {
        optionalVector = optionalVector || {};

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
/* 5 */
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
/* 6 */
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
        this.isDirty = false;

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Shape;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SolidBody {
    constructor() {
        this.type = "solid-body";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SolidBody;


/***/ }),
/* 8 */
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
        this.isInitialized = false;
        this.isEnabled = true;
        this.collisions = {};
        this.parts = [];
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = NarrowPhaseCollidable;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__World__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__systems_CompleteRenderSystem__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__systems_BroadPhaseCollisionSystem__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__systems_KeyboardInputSystem__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__systems_ControllerSystem__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__systems_SolidBodySystem__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__systems_MovementSystem__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__systems_LogicSystem__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__systems_FollowerSystem__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__systems_NarrowPhaseCollisionSystem__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__systems_FollowEntityCameraSystem__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__entities_Follower__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__entities_Leader__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__entities_Camera__ = __webpack_require__(36);















var getRandomNumber = (max) => {
    return parseInt(Math.random() * max, 10);
}

var world = new __WEBPACK_IMPORTED_MODULE_0__World__["a" /* default */]();
world.size.height = 2000;
world.size.width = 2000;

var camera = new __WEBPACK_IMPORTED_MODULE_13__entities_Camera__["a" /* default */]("main");
var leader = new __WEBPACK_IMPORTED_MODULE_12__entities_Leader__["a" /* default */]();

var renderSystem = new __WEBPACK_IMPORTED_MODULE_1__systems_CompleteRenderSystem__["a" /* default */]({
    canvas: document.getElementById("viewport")
});

var logicSystem = new __WEBPACK_IMPORTED_MODULE_7__systems_LogicSystem__["a" /* default */]();
var collisionSystem = new __WEBPACK_IMPORTED_MODULE_2__systems_BroadPhaseCollisionSystem__["a" /* default */]();
var solidBodySystem = new __WEBPACK_IMPORTED_MODULE_5__systems_SolidBodySystem__["a" /* default */]();
var keyboardInputSystem = new __WEBPACK_IMPORTED_MODULE_3__systems_KeyboardInputSystem__["a" /* default */](document);
var controllerSystem = new __WEBPACK_IMPORTED_MODULE_4__systems_ControllerSystem__["a" /* default */](document);
var movementSystem = new __WEBPACK_IMPORTED_MODULE_6__systems_MovementSystem__["a" /* default */]();
var followerSystem = new __WEBPACK_IMPORTED_MODULE_8__systems_FollowerSystem__["a" /* default */]();
var followEntityCameraSystem = new __WEBPACK_IMPORTED_MODULE_10__systems_FollowEntityCameraSystem__["a" /* default */]();
var narrowPhaseCollisionSystem = new __WEBPACK_IMPORTED_MODULE_9__systems_NarrowPhaseCollisionSystem__["a" /* default */]();

followEntityCameraSystem.camera = camera;
followEntityCameraSystem.setEntityToFollow(leader);

// ADD SYSTEMS
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(followerSystem);
world.addSystem(solidBodySystem);
world.addSystem(movementSystem);
world.addSystem(logicSystem);
world.addSystem(collisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(renderSystem);

world.addEntity(camera);
world.addEntity(leader);

for (let x = 0; x < 20; x++) {

    let follower = new __WEBPACK_IMPORTED_MODULE_11__entities_Follower__["a" /* default */](leader.id);
    follower.getComponent("position").x = getRandomNumber(2000);
    follower.getComponent("position").y = getRandomNumber(2000);

    world.addEntity(follower);
}

renderSystem.setCameraByName("main");

world.play();

window.world = world;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿// Polyfill for node environments.
if (typeof performance === "undefined") {
    var performance = {
        now: () => {
            return Date.now();
        }
    };
}

if (typeof requestAnimationFrame === "undefined") {
   var requestAnimationFrame = (callback) => {
        setTimeout(callback, 11);
    };
}

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

    _invokeMethod(obj, methodName, args) {
        args = Array.isArray(args) ? args : [];
        if (obj && typeof obj[methodName] === "function") {
            return obj[methodName].apply(obj, args);
        }
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
            self._invokeMethod(system, methodName, args);
        });
    }

    addSystem(system) {
        var systems = this._systems;
        var index = systems.indexOf(system);

        if (index === -1) {
            systems.push(system);
            this._invokeMethod(system, "activated", [this]);
            this._invokeMethod(system, "systemAdded", [system]);
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
            this._invokeMethod(system, "deactivated", [this]);
            this._invokeMethod(system, "systemRemoved", [system]);

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

        this.notifySystems("update", [this.getTime()]);
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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RenderSystem__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__render_ImageRenderer__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render_TextRenderer__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__render_ShapeRenderer__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__render_LineRenderer__ = __webpack_require__(19);






/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__RenderSystem__["a" /* default */] {
    constructor(options = {}) {
        super(options.canvas, options.sort);

        this.addRenderer(new __WEBPACK_IMPORTED_MODULE_1__render_ImageRenderer__["a" /* default */](options.document, options.assetRoot));
        this.addRenderer(new __WEBPACK_IMPORTED_MODULE_3__render_ShapeRenderer__["a" /* default */](options.document));
        this.addRenderer(new __WEBPACK_IMPORTED_MODULE_2__render_TextRenderer__["a" /* default */](options.document));
        this.addRenderer(new __WEBPACK_IMPORTED_MODULE_4__render_LineRenderer__["a" /* default */]());
    }
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__systems_render_CompositeCanvas__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_ZIndex__ = __webpack_require__(15);
﻿


var defaultZIndex = new __WEBPACK_IMPORTED_MODULE_1__components_ZIndex__["a" /* default */]();
var defaultCachePosition = { x: 0, y: 0 };

class RenderSystem {
    constructor(canvas, sort) {
        this._renderers = {};
        this._world = null;
        this._dependencies = ["position", "size"];
        this._cameraDependencies = ["camera", "position", "size"];
        this._camera = null;
        this._cameraPosition = null;
        this._cameraSize = null;
        this._staticCacheByZIndex = {};
        this._entitiesByZIndex = {};
        this._entitiesToBeRedrawn = [];
        this._tempEntitiesToBeRedrawn = []
        this._sort = sort || null;
        this._drawDynamicCollision = this._drawDynamicCollision.bind(this);

        var defaultSort = this._defaultSort = function (entityA, entityB) {
            var value = 0;

            if (sort != null) {
                value = sort(entityA, entityB);
            }

            if (value === 0) {
                if (entityA.id < entityB.id) {
                    return -1;
                } else {
                    return 1;
                }
            }

            return value;
        };

        this._zIndexSort = function (entityA, entityB) {
            var zIndexA = entityA.getComponent("z-index");
            var zIndexB = entityB.getComponent("z-index");
            var value;

            zIndexA = zIndexA || defaultZIndex;
            zIndexB = zIndexB || defaultZIndex;

            if (zIndexA.value < zIndexB.value) {
                return -1;
            } else if (zIndexA.value > zIndexB.value) {
                return 1;
            } else {
                return defaultSort(entityA, entityB);
            }
        };

        this.setCanvas(canvas);
    }

    _drawDynamicCollision(collision) {
        var _collision = collision;
        var entity = this._world.getEntityById(_collision.entityId);
        if (this.isDynamicEntity(entity)) {
            this.drawEntityOnCamera(entity, this.canvas);
        }
    }


    _invokeMethod(obj, methodName, args) {
        args = Array.isArray(args) ? args : [];
        if (obj && typeof obj[methodName] === "function") {
            return obj[methodName].apply(obj, args);
        }
    }

    _notifyRenderers(methodName, args) {
        var self = this;
        var renderers = Object.keys(this._renderers).map(function (type) {
            return self._renderers[type];
        });

        renderers.forEach(function (renderer) {
            self._invokeMethod(renderer, methodName, args);
        });
    }

    setCanvas(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    addRenderer(renderer) {
        var type = renderer.type;

        if (this._world != null) {
            throw new Error("Cannot add renderers when activated by a world.");
        }

        var renderers = this._renderers;

        if (typeof type === "string") {
            renderers[type] = renderer;
        }
    }

    removeRenderer(renderer) {
        var type = renderer.type;

        if (this._world != null) {
            throw new Error("Cannot remove renderers when activated by a world.");
        }

        var renderers = this._renderers;
        var registeredRenderer = renderers[type];
        var dependencies = this._dependencies;

        if (registeredRenderer) {
            delete renderers[type];
        }
    }

    supportsEntity(entity) {
        return Object.keys(this._renderers).some(function (type) {
            return entity.hasComponents([type]);
        });
    }

    // System Strategy Starts
    activated(world) {
        var self = this;
        this._world = world;

        world.getEntities().forEach(function (entity) {
            self.entityAdded(entity);
        });

        Object.keys(this._entitiesByZIndex).forEach(function (key) {
            self.cacheCanvasByZIndex(parseInt(key, 10));
        });
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        let isRenderable = Object.keys(this.renderers).some((type) => {
            return component.type === type;
        });

        if (
            isRenderable ||
            (this.supportsEntity(entity) && this._dependencies.indexOf(component.type))
        ) {
            this.unregisterEntity(entity);
        }
    }

    deactivated() {
        this._world = null;
        this.canvas = null;
        this.context = null;
    }

    entityAdded(entity) {
        if (entity.hasComponents(this._dependencies) && this.supportsEntity(entity)) {
            this.registerEntity(entity);
            this._entitiesToBeRedrawn.push(entity);
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponents(this._dependencies) && this.supportsEntity(entity)) {
            this.uncacheEntity(entity);
        }
    }

    update() {
        var key;
        var self = this;
        var world = this._world;
        var canvas = this.canvas;
        var context = this.context;
        var cameraPosition = this._cameraPosition;
        var cameraSize = this._cameraSize;
        var caches = this._staticCacheByZIndex;

        if (cameraPosition == null || world == null) {
            return;
        }

        // This is how we optimize rendering. We use the collision system with the camera entity.
        var activeCollisions = this.getCollisions(this.camera.getComponent("collidable"));

        this.updateCaches();
        this.context.clearRect(0, 0, canvas.width, canvas.height);

        var cacheKeys = Object.keys(this._staticCacheByZIndex).sort(function (a, b) {
            return parseInt(a, 10) - parseInt(b, 10);
        });

        for (var x = 0; x < cacheKeys.length; x++) {
            key = cacheKeys[x];
            caches[key].transferImage(
                canvas,
                0,
                0,
                Math.floor(cameraSize.width),
                Math.floor(cameraSize.height),
                Math.floor(cameraPosition.x),
                Math.floor(cameraPosition.y),
                Math.floor(cameraSize.width),
                Math.floor(cameraSize.height),
            );

        }

        activeCollisions.forEach(this._drawDynamicCollision);

    }

    updateCaches() {
        var self = this;
        this._tempEntitiesToBeRedrawn.length = 0;

        this._entitiesToBeRedrawn.sort(this._zIndexSort);
        this._entitiesToBeRedrawn.forEach((entity) => {
            this.cacheEntity(entity);
        });

        this._entitiesToBeRedrawn.length = 0;
        this._tempEntitiesToBeRedrawn.forEach((entity) => {
            this._entitiesToBeRedrawn.push(entity);
        });
    }

    redrawEntityOnCanvas(entity, canvas, drawEntity = true) {
        if (canvas == null) {
            return;
        }

        var self = this;
        var world = this._world;
        var context = canvas.getContext("2d");
        var renderers = this._renderers;
        var rendererTypes = Object.keys(renderers);

        var size = entity.getComponent("size");
        var position = entity.getComponent("position");
        var zIndex = entity.getComponent("z-index") || defaultZIndex;
        var collidable = entity.getComponent("collidable");
        var activeCollisions = this.getCollisions(collidable);

        var top = Math.max(position.y, 0);
        var left = Math.max(position.x, 0);
        var bottom = Math.min(position.y + size.height, canvas.height);
        var right = Math.min(position.x + size.width, canvas.width);
        var width = right - left;
        var height = bottom - top;
        var entities;

        if (width <= 0 || height <= 0) {
            return;
        }

        entities = activeCollisions.filter(function (collision) {
            return collision.endTimestamp == null;
        }).map(function (collision) {
            return world.getEntityById(collision.entityId);
        }).filter(function (entity) {
            return entity != null && entity.getComponent("position").isStatic;
        });

        if (drawEntity) {
            entities.push(entity);
        }

        entities.sort(this._zIndexSort);
        context.clearRect(left, top, width, height);

        entities.forEach((otherEntity) => {
            var _otherEntity = otherEntity;
            var otherPosition = _otherEntity.getComponent("position");
            var otherSize = _otherEntity.getComponent("size");

            var otherTop = Math.max(otherPosition.y, position.y, 0);
            var otherLeft = Math.max(otherPosition.x, position.x, 0);
            var otherBottom = Math.min(otherPosition.y + otherSize.height, position.y + size.height, canvas.height);
            var otherRight = Math.min(otherPosition.x + otherSize.width, position.x + size.width, canvas.width);
            var otherWidth = otherRight - otherLeft;
            var otherHeight = otherBottom - otherTop;
            var offsetX = 0;
            var offsetY = 0;

            if (otherWidth <= 0 || otherHeight <= 0) {
                return;
            }

            if (otherPosition.x <= otherLeft) {
                offsetX = otherLeft - otherPosition.x;
            }

            if (otherPosition.y <= otherTop) {
                offsetY = otherTop - otherPosition.y;
            }

            rendererTypes.forEach((type) => {
                var _type = type;
                var component = otherEntity.getComponent(_type);
                if (component != null) {
                    renderers[_type].draw(
                        otherEntity,
                        canvas,
                        {
                            x: Math.floor(otherLeft),
                            y: Math.floor(otherTop)
                        },
                        {
                            width: Math.floor(otherWidth),
                            height: Math.floor(otherHeight)
                        },
                        {
                            x: Math.floor(offsetX),
                            y: Math.floor(offsetY)
                        }
                    );

                    if (component.isDirty) {
                        this._entitiesToBeRedrawn.push(otherEntity);
                    }
                }
            });
        });
    }

    drawEntityOnCanvas(entity, canvas) {
        if (canvas == null) {
            return;
        }

        var self = this;
        var world = this._world;
        var context = canvas.getContext("2d");
        var renderers = this._renderers;
        var rendererTypes = Object.keys(renderers);

        var size = entity.getComponent("size");
        var position = entity.getComponent("position");
        var zIndex = entity.getComponent("z-index") || defaultZIndex;

        var top = Math.max(position.y, 0);
        var left = Math.max(position.x, 0);
        var bottom = Math.min(position.y + size.height, canvas.height);
        var right = Math.min(position.x + size.width, canvas.width);
        var width = right - left;
        var height = bottom - top;
        var offsetX = 0;
        var offsetY = 0;
        var entities;

        if (width <= 0 || height <= 0) {
            return;
        }

        if (position.x < 0) {
            offsetX = -position.x;
        }

        if (position.y < 0) {
            offsetY = -position.y;
        }

        rendererTypes.forEach(function (type) {
            var component = entity.getComponent(type);
            if (component != null) {
                renderers[type].draw(
                    entity,
                    canvas,
                    {
                        x: Math.floor(left),
                        y: Math.floor(top)
                    },
                    {
                        width: Math.floor(width),
                        height: Math.floor(height)
                    },
                    {
                        x: Math.floor(offsetX),
                        y: Math.floor(offsetY)
                    }
                );
            }
        });
    }

    drawEntityOnCamera(entity, canvas) {
        if (canvas == null) {
            return;
        }

        var self = this;
        var world = this._world;
        var context = canvas.getContext("2d");
        var renderers = this._renderers;
        var rendererTypes = Object.keys(renderers);

        var size = entity.getComponent("size");
        var position = entity.getComponent("position");
        var collidable = entity.getComponent("collidable");

        var cameraPosition = this._cameraPosition;
        var cameraSize = this._cameraSize;
        var activeCollisions = this.getCollisions(collidable);

        var top = Math.max(position.y, cameraPosition.y);
        var left = Math.max(position.x, cameraPosition.x);
        var bottom = Math.min(position.y + size.height, cameraPosition.y + cameraSize.height);
        var right = Math.min(position.x + size.width, cameraPosition.x + cameraSize.width);
        var width = right - left;
        var height = bottom - top;

        if (width <= 0 || height <= 0) {
            return;
        }

        var entities = activeCollisions.filter(function (collision) {
            return collision.endTimestamp == null;
        }).map(function (collision) {
            return world.getEntityById(collision.entityId);
        }).filter(function (entity) {
            return entity != null;
        });

        entities.push(entity);
        entities.sort(this._zIndexSort);

        context.clearRect(left - cameraPosition.x, top - cameraPosition.y, width, height);
        entities.forEach(function (otherEntity) {
            var otherPosition = otherEntity.getComponent("position");
            var otherSize = otherEntity.getComponent("size");

            var otherTop = Math.max(otherPosition.y, position.y, cameraPosition.y);
            var otherLeft = Math.max(otherPosition.x, position.x, cameraPosition.x);
            var otherBottom = Math.min(otherPosition.y + otherSize.height, position.y + size.height, cameraPosition.y + cameraSize.height);
            var otherRight = Math.min(otherPosition.x + otherSize.width, position.x + size.width, cameraPosition.x + cameraSize.width);
            var otherWidth = otherRight - otherLeft;
            var otherHeight = otherBottom - otherTop;
            var offsetX = 0;
            var offsetY = 0;

            if (otherWidth <= 0 || otherHeight <= 0) {
                return;
            }

            if (otherPosition.x <= otherLeft) {
                offsetX = otherLeft - otherPosition.x;
            }

            if (otherPosition.y <= otherTop) {
                offsetY = otherTop - otherPosition.y;
            }

            rendererTypes.forEach(function (type) {
                var component = otherEntity.getComponent(type);
                if (component != null) {
                    renderers[type].draw(
                        otherEntity,
                        canvas,
                        {
                            x: Math.floor(otherLeft - cameraPosition.x),
                            y: Math.floor(otherTop - cameraPosition.y)
                        },
                        {
                            width: Math.floor(otherWidth),
                            height: Math.floor(otherHeight)
                        },
                        {
                            x: Math.floor(offsetX),
                            y: Math.floor(offsetY)
                        }
                    );
                }
            });
        });
    }

    isDynamicEntity(entity) {
        return entity != null &&
            entity.hasComponents(this._dependencies) &&
            this.supportsEntity(entity) &&
            !entity.getComponent("position").isStatic;
    }

    getCanvasByZIndex(zIndex) {
        var canvas = this._staticCacheByZIndex[zIndex];

        if (canvas == null) {
            canvas = this._staticCacheByZIndex[zIndex] = new __WEBPACK_IMPORTED_MODULE_0__systems_render_CompositeCanvas__["a" /* default */](this._world.size.width, this._world.size.height, 1000)
        }

        return canvas;
    }

    cacheCanvasByZIndex(zIndex) {
        var self = this;
        var rendererTypes = Object.keys(this._renderers);
        var renderers = this._renderers;
        var entities = this._entitiesByZIndex[zIndex];
        var canvas = this.getCanvasByZIndex(zIndex);

        if (entities == null) {
            return;
        }

        canvas.clearRect(0, 0, this._world.size.width, this._world.size.height);

        entities.sort(this._defaultSort);
        entities.forEach((entity) => {
            self.drawEntityOnCanvas(entity, canvas);
        });
    }

    registerEntity(entity) {
        var entities;
        var position = entity.getComponent("position");
        var zIndex = entity.getComponent("z-index") || defaultZIndex;

        if (position.isStatic) {
            entities = this._entitiesByZIndex[zIndex.value];

            if (entities == null) {
                entities = this._entitiesByZIndex[zIndex.value] = [];
            }

            entities.push(entity);
        }
    }

    unregisterEntity(entity) {
        var entities;
        var position = entity.getComponent("position");
        var zIndex = entity.getComponent("z-index") || defaultZIndex;
        var index;

        if (position.isStatic) {
            entities = this._entitiesByZIndex[zIndex.value];

            if (entities != null) {
                index = entities.indexOf(entity);

                if (index > -1) {
                    entities.splice(index, 1);
                }
            }
        }
    }

    cacheEntity(entity) {
        if (!this.isDynamicEntity(entity)) {
            var zIndex = entity.getComponent("z-index") || defaultZIndex;
            var canvas = this.getCanvasByZIndex(zIndex.value);

            this.registerEntity(entity);
            this.redrawEntityOnCanvas(entity, canvas);
        }
    }

    uncacheEntity(entity) {
        var zIndex = entity.getComponent("z-index") || defaultZIndex;
        var canvas = this.getCanvasByZIndex(zIndex.value);

        this.unregisterEntity(entity);
        this.redrawEntityOnCanvas(entity, canvas, false);
    }

    getCollisions(collidable){
        return Object.keys(collidable.collisions).map((key)=>{
            return collidable.collisions[key];
        });
    }

    get camera() {
        return this._camera;
    }

    set camera(entity) {
        if (entity.hasComponents(this._cameraDependencies)) {
            this._camera = entity;
            this._cameraPosition = entity.getComponent("position");
            this._cameraSize = entity.getComponent("size");

            // Adjust the cameras size to that of the canvas.
            this._cameraSize.width = this.canvas.width;
            this._cameraSize.height = this.canvas.height;
        }
    }

    setCameraByName(name) {
        var cameraDependencies = this._cameraDependencies;

        var cameras = this._world.getEntitiesByFilter(function (entity) {
            var isCamera = entity.hasComponents(cameraDependencies);
            if (isCamera) {
                var camera = entity.getComponent("camera");
                if (camera.name === name) {
                    return true;
                }
            }
            return false;
        });

        if (cameras.length > 1) {
            throw new Error("There multiple cameras with that name.");
        }

        if (cameras.length === 0) {
            throw new Error("Unable to find a camera with that name.");
        }

        this.camera = cameras[0];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RenderSystem;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CompositeCanvasCell__ = __webpack_require__(14);


const MAX_CELL_SIZE = 1000;

class CompositeCanvas {
    constructor(width, height, cellSize) {
        this._cells = [];
        this.width = width;
        this.height = height;
        this._cellSize = cellSize == null || cellSize > MAX_CELL_SIZE ? MAX_CELL_SIZE : cellSize;
        this._buildCanvases();
    }

    _buildCanvases() {
        var offset;

        for (var x = 0; x * this._cellSize < this.width; x++) {
            for (var y = 0; y * this._cellSize < this.height; y++) {
                offset = {
                    x: x * this._cellSize,
                    y: y * this._cellSize
                };
                this._cells.push(new __WEBPACK_IMPORTED_MODULE_0__CompositeCanvasCell__["a" /* default */](this._cellSize, offset));
            }
        }
    }

    _invokeOnCells(methodName, args) {
        this._cells.forEach((cell) => {
            cell[methodName].apply(cell, args);
        });
    }

    drawImage(sourceCanvas,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destinationX,
        destinationY,
        destinationWidth,
        destinationHeight) {

        this._cells.forEach((canvas) => {
            canvas.drawImage(sourceCanvas, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight);
        });

    }

    transferImage(destinationCanvas,
        destinationX,
        destinationY,
        destinationWidth,
        destinationHeight,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight
    ) {
        this._cells.forEach((canvas) => {
            canvas.transferImage(destinationCanvas, destinationX, destinationY, destinationWidth, destinationHeight, sourceX, sourceY, sourceWidth, sourceHeight);
        });
    }

    clearRect() {
        this._invokeOnCells("clearRect", arguments);
    }

    getContext() {
        return this;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CompositeCanvas;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CompositeCanvasCell {

    constructor(size, offset) {
        this.canvas = document.createElement("canvas");
        this.size = size;
        this.offset = offset;

        this.canvas.width = size;
        this.canvas.height = size;
        this.context = this.canvas.getContext("2d");
        this.canvas.getContext("2d").clearRect(0, 0, size, size);
    }

    drawImage(sourceCanvas,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destinationX,
        destinationY,
        destinationWidth,
        destinationHeight) {

        var context = this.context;

        var top = Math.max(destinationY, this.offset.y);
        var left = Math.max(destinationX, this.offset.x);
        var bottom = Math.min(destinationY + destinationHeight, this.offset.y + this.size);
        var right = Math.min(destinationX + destinationWidth, this.offset.x + this.size);
        var width = right - left;
        var height = bottom - top;
        var dx = left - this.offset.x;
        var dy = top - this.offset.y;

        if (width <= 0 || height <= 0) {
            return;
        }

        if (left > destinationX) {
            sourceX += destinationWidth - width;
        }

        if (top > destinationY) {
            sourceY += destinationHeight - height;
        }

        context.drawImage(sourceCanvas,
            sourceX,
            sourceY,
            width,
            height,
            dx,
            dy,
            width,
            height);

    }

    transferImage(destinationCanvas,
        destinationX,
        destinationY,
        destinationWidth,
        destinationHeight,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight
    ) {

        var context = destinationCanvas.getContext("2d");

        var top = Math.max(this.offset.y, sourceY);
        var left = Math.max(this.offset.x, sourceX);
        var bottom = Math.min(this.offset.y + this.size, sourceY + sourceHeight);
        var right = Math.min(this.offset.x + this.size, sourceX + sourceWidth);
        var width = right - left;
        var height = bottom - top;

        if (width <= 0 || height <= 0) {
            return;
        }

        var sx = left - this.offset.x;
        var sy = top - this.offset.y;
        var dx = left - sourceX;
        var dy = top - sourceY;

        context.drawImage(
            this.canvas,
            sx,
            sy,
            width,
            height,
            dx,
            dy,
            width,
            height
        );

    }

    clearRect(x, y, width, height) {
        x = Math.max(x, this.offset.x);
        y = Math.max(y, this.offset.y);
        width = Math.min(width, this.size);
        height = Math.min(height, this.size);

        if (width <= 0 || height <= 0) {
            return;
        }

        this.context.clearRect(x, y, width, height);
    }

    getContext() {
        return this;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CompositeCanvasCell;


/***/ }),
/* 15 */
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class ImageRenderer {
    constructor(doc, assetRoot) {
        this.type = "image";
        this.document = doc || document;
        this.cachedCanvases = {};
        this.loadingImages = {};
        this.sourceCanvases = {};
        this.assetRoot = assetRoot || "";
    }

    getKey(imageTexture) {
        var position = imageTexture.position;
        var size = imageTexture.size;
        var path = imageTexture.path;

        return path + "|" + position.x + "|" + position.y + "|" + size.width + "|" + size.height;
    }

    cacheCanvas(image, imageTexture) {
        var key = this.getKey(imageTexture);

        if (this.cachedCanvases[key]) {
            return;
        }

        var document = this.document;
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var size = imageTexture.size;
        var padding = imageTexture.padding;
        var position = imageTexture.position;
        var width = size.width + padding.left + padding.right;
        var height = size.height + padding.top + padding.bottom;

        canvas.width = width;
        canvas.height = height;

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

        this.cachedCanvases[key] = canvas;
        return canvas;
    }

    getPath(path) {
        return this.assetRoot + "/" + path;
    }

    getCanvas(imageTexture) {
        var cachedCanvases = this.cachedCanvases;
        var key = this.getKey(imageTexture);
        return cachedCanvases[key] || null;
    }

    loadImage(imageTexture) {
        var path = this.getPath(imageTexture.path);
        var image = this.sourceCanvases[path];

        if (this.loadingImages[path]) {
            return;
        }

        image = new Image();

        image.onload = () => {
            this.loadingImages[path] = false;
            this.sourceCanvases[path] = image;
            this.cacheCanvas(image, imageTexture);
        };

        this.loadingImages[path] = true;
        image.src = path;
    }

    draw(entity, canvas, position, size, offset) {
        if (canvas == null) {
            return;
        }

        var imageTexture = entity.getComponent("image");
        var imagePosition = imageTexture.position;
        var entityCanvas = this.getCanvas(imageTexture);
        var path = this.getPath(imageTexture.path);
        var imageSource = this.sourceCanvases[path];

        // If the image isn't loaded yet then load the image and draw it next call.
        if (imageSource == null) {
            this.loadImage(imageTexture);
            imageTexture.isDirty = true;
            return;
        }

        if (entityCanvas == null) {
            this.cacheCanvas(imageSource, imageTexture);
            entityCanvas = this.getCanvas(imageTexture);
        }

        imageTexture.isDirty = false;

        var context = canvas.getContext("2d");

        context.drawImage(entityCanvas,
            offset.x,
            offset.y,
            size.width,
            size.height,
            position.x,
            position.y,
            size.width,
            size.height
        );

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageRenderer;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class TextRenderer {
    constructor(doc) {
        this.type = "text";
        this.fontCache = {};
        this.document = doc || document;
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    entityAdded(entity) {
        this.createCachedVersion(entity);
    }

    entityRemoved(entity) {
        delete this.fontCache[entity.id];
    }

    createFontString(textTexture) {
        //font-style variant weight size family
        return `${textTexture.font.style} ${textTexture.font.variant} ${textTexture.font.weight} ${textTexture.font.size}px ${textTexture.font.family}`;
    }

    createCachedVersion(entity) {
        var canvas = this.document.createElement("canvas");

        var size = entity.getComponent("size");
        var textTexture = entity.getComponent("text");

        var context = canvas.getContext("2d");

        canvas.width = size.width;
        canvas.height = size.height;

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

        this.fontCache[entity.id] = canvas;

        return canvas;
    }

    getCanvas(entity) {
        var canvas = this.fontCache[entity.id];
        var textTexture = entity.getComponent("text");

        if (canvas == null || textTexture.isDirty) {
            canvas = this.createCachedVersion(entity);
        }

        return canvas;
    }

    draw(entity, canvas, position, size, offset) {
        if (canvas == null) {
            return;
        }

        var entityCanvas = this.getCanvas(entity);
        var context = canvas.getContext("2d");

        context.drawImage(entityCanvas,
            offset.x,
            offset.y,
            size.width,
            size.height,
            position.x,
            position.y,
            size.width,
            size.height
        );

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TextRenderer;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class ShapeRenderer {
    constructor(doc) {
        this.type = "shape";
        this.document = doc || document;
        this.shapeCache = {};
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    entityAdded(entity) {
        this.createCachedVersion(entity);
    }

    entityRemoved(entity) {
        delete this.shapeCache[entity.id];
    }

    createCachedVersion(entity) {
        var document = this.document;
        var canvas = document.createElement("canvas");

        var size = entity.getComponent("size");
        var shape = entity.getComponent("shape");

        var context = canvas.getContext("2d");

        canvas.width = size.width;
        canvas.height = size.height;

        context.beginPath();

        shape.points.forEach(function (point, index) {
            var x = point.x * size.width;
            var y = point.y * size.height;

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

        this.shapeCache[entity.id] = canvas;

        return canvas;
    }

    getCanvas(entity) {
        var canvas = this.shapeCache[entity.id];
        var shapeComponent = entity.getComponent("shape");

        if (canvas == null || shapeComponent.isDirty) {
            shapeComponent.isDirty = false;
            canvas = this.createCachedVersion(entity);
        }

        return canvas;
    }

    draw(entity, canvas, position, size, offset) {
        let _entity = entity;
        let _canvas = canvas;
        let _position = position;
        let _size = size;
        let _offset = offset;

        if (_canvas == null) {
            return;
        }

        var entityCanvas = this.getCanvas(_entity);
        var context = canvas.getContext("2d");

        context.drawImage(entityCanvas,
            _offset.x,
            _offset.y,
            _size.width,
            _size.height,
            _position.x,
            _position.y,
            _size.width,
            _size.height
        );

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ShapeRenderer;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LineRenderer {
    constructor(doc) {
        this.type = "line";
        this.document = doc || document;
        this.lineCache = {};
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    entityAdded(entity) {
        this.createCachedVersion(entity);
    }

    entityRemoved(entity) {
        delete this.lineCache[entity.id];
    }

    createCachedVersion(entity) {
        var document = this.document;
        var canvas = document.createElement("canvas");

        var size = entity.getComponent("size");
        var line = entity.getComponent("line");
        var position = entity.getComponent("position");
        var context = canvas.getContext("2d");

        canvas.width = size.width;
        canvas.height = size.height;

        if (line.thickness > 0) {
            context.beginPath();
            context.lineCap = "round";
            context.lineWidth = line.thickness;
            context.strokeStyle = this.convertToRgba(line.color);
            context.moveTo(line.from.x, line.from.y);
            context.lineTo(line.to.x, line.to.y);
            context.stroke();
            context.closePath();
        }

        this.lineCache[entity.id] = canvas;

        return canvas;
    }

    getCanvas(entity) {
        var canvas = this.lineCache[entity.id];
        var lineComponent = entity.getComponent("line");

        if (canvas == null || lineComponent.isDirty) {
            lineComponent.isDirty = false;
            canvas = this.createCachedVersion(entity);
        }

        return canvas;
    }

    draw(entity, canvas, position, size, offset) {
        let _entity = entity;
        let _canvas = canvas;
        let _position = position;
        let _size = size;
        let _offset = offset;

        if (_canvas == null) {
            return;
        }

        var entityCanvas = this.getCanvas(_entity);
        var context = canvas.getContext("2d");

        context.drawImage(entityCanvas,
            _offset.x,
            _offset.y,
            _size.width,
            _size.height,
            _position.x,
            _position.y,
            _size.width,
            _size.height
        );

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LineRenderer;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BroadPhaseCollisionData__ = __webpack_require__(22);
﻿


//TODO: correct cells when finding dirty cells, change dirty cell positions to strings... maybe.

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
        this.size = null;
        this.position = null;
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
        this.grid = new Map();
        this.dirtyCellPositions = [];
        this.dependencies = ["position", "size", "collidable"];
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

    getIntersection({ position: positionA, size: sizeA }, { position: positionB, size: sizeB }) {
        const top = Math.max(positionA.y, positionB.y);
        const bottom = Math.min(positionA.y + sizeA.height, positionB.y + sizeB.height);
        const left = Math.max(positionA.x, positionB.x);
        const right = Math.min(positionA.x + sizeA.width, positionB.x + sizeB.width);

        if (top < bottom && left < right) {
            this.intersection.top = top;
            this.intersection.left = left;
            this.intersection.right = right;
            this.intersection.bottom = bottom;

            return this.intersection;
        }

        return null;
    }

    findDirtyCells() {
        const dirtyEntities = [];
        const collidableEntities = this.collidableEntities;

        for (let x = 0; x < collidableEntities.length; x++) {
            const collidableEntity = collidableEntities[x];
            const size = collidableEntity.size;
            const position = collidableEntity.position;

            if (position.isDirty || size.isDirty) {
                dirtyEntities.push(collidableEntity);
            }
        }

        for (let x = 0; x < dirtyEntities.length; x++) {
            const dirtyEntity = dirtyEntities[x];
            const collisions = dirtyEntity.collidable.collisions;

            let lastCellPositions = dirtyEntity.collidable.cellPositions;
            let newCellPositions = this.getCellPositions(dirtyEntity);

            this.removeEntityFromCellPositions(dirtyEntity, lastCellPositions);
            this.addEntityToCellPositions(dirtyEntity, newCellPositions);

            dirtyEntity.collidable.cellPositions = newCellPositions;

            for (let y in collisions) {
                const collision = collisions[y];
                const otherCollidableEntity = this.collidableEntitiesById[y];

                this.releaseCollision(collision);
                this.releaseCollision(otherCollidableEntity.collidable.collisions[dirtyEntity.id]);

                delete otherCollidableEntity.collidable.collisions[dirtyEntity.id];

            }

            dirtyEntity.collidable.collisions = {};
        }
    }

    getCell({ rowIndex, columnIndex }) {
        let column = this.grid.get(columnIndex);
        if (column == null) {
            column = new Map();
            this.grid.set(columnIndex, column);
        }

        let cell = column.get(rowIndex);
        if (cell == null) {
            cell = [];
            column.set(rowIndex, cell);
        }

        return cell;
    }

    getCellPositions({ position, size }) {
        const top = position.y;
        const left = position.x;
        const right = left + size.width;
        const bottom = top + size.height;
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

    releaseCollision(collision) {
        this.availableCollisions.push(collision);
    }

    removeCell({ columnIndex, rowIndex }) {
        if (this.grid.has(columnIndex) && this.grid.get(columnIndex).has(rowIndex)) {
            this.grid.get(columnIndex).delete(rowIndex);
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

                    if ((!otherCollidableEntity.position.isDirty && !otherCollidableEntity.size.isDirty &&
                        !collidableEntity.position.isDirty && !collidableEntity.size.isDirty) ||
                        (otherCollisions[collidableEntity.id] &&
                            otherCollisions[collidableEntity.id].timestamp === this.currentTime)) {
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

                collidableEntity.position.isDirty = false;
                collidableEntity.size.isDirty = false;

            }
        }

    }

    activated(_world) {
        const world = _world;
        this.world = world

        world.getEntities().forEach((_entity) => {
            const entity = _entity;
            this.entityAdded(entity)
        });

        world.addEntity(this.broadPhaseCollisionDataEntity);
    }

    entityAdded(_entity) {
        const entity = _entity;
        if (entity.hasComponents(this.dependencies) && this.collidableEntities.findIndex(e => e.id === entity.id) === -1) {
            const collidableEntity = new CollidableEntity(entity.id);
            collidableEntity.position = entity.getComponent("position");
            collidableEntity.size = entity.getComponent("size");
            collidableEntity.collidable = entity.getComponent("collidable");

            this.collidableEntities.push(collidableEntity);
            this.collidableEntitiesById[collidableEntity.id] = collidableEntity;

            let cellPositions = this.getCellPositions(collidableEntity);
            this.addEntityToCellPositions(collidableEntity, cellPositions);

            collidableEntity.collidable.cellPositions = cellPositions;
        }
    }

    componentAdded(_entity, _component) {
        const entity = _entity;
        this.entityAdded(entity);
    }

    deactivated(_world) {
        const world = _world;
        this.world = null;
        this.collidableEntities = [];
        this.collidableEntitiesById = {};
        this.currentTime = 0;
        this.grid = new Map();
    }

    entityRemoved(_entity) {
        const entity = _entity;
        const index = this.collidableEntities.findIndex(e => e.id === entity.id);
        if (index > -1) {
            const collidableEntity = this.collidableEntities[index];
            let cellPositions = collidableEntity.collidable.cellPositions;
            this.removeEntityFromCellPositions(collidableEntity, cellPositions);
            this.collidableEntities.splice(index, 1);
            delete this.collidableEntitiesById[collidableEntity.id];
        }
    }

    componentRemoved(entity, component) {
        if (this.dependencies.indexOf(component.type) > -1) {
            this.entityRemoved(entity);
        }
    }

    update(currentTime) {
        this.currentTime = currentTime;
        this.findDirtyCells();
        this.updateGridCells(this.dirtyCellPositions);
        this.broadPhaseCollisionDataComponent.dirtyCellPositions = this.dirtyCellPositions;
        this.dirtyCellPositions = [];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BroadPhaseCollisionSystem;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createGuid;
/* unused harmony export invokeMethod */
var S4 = function () {
    return Math.floor(
        Math.random() * 0x10000 /* 65536 */
    ).toString(16);
};

function createGuid() {
    return (
        S4() + S4() + "-" +
        S4() + "-" +
        S4() + "-" +
        S4() + "-" +
        S4() + S4() + S4()
    );
};

function invokeMethod(obj, methodName, args){
     args = Array.isArray(args)? args: [];
    if (obj != null && typeof obj[methodName] === "function"){
        return obj[methodName].apply(obj, args);
    }
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BroadPhaseCollisionData {
    constructor(){
        this.type = "broad-phase-collision-data";
        this.dirtyCellPositions = [];
        this.grid = null;
        this.cellSize = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BroadPhaseCollisionData;


/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿const DEPENDENCIES = ["keyboard-input", "keyboard-controller", "position", "movable"];

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
/* 25 */
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



/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DEPENDENCIES = ["movable", "position"];

class MovableEntity {
constructor(entity) {
        this.movable = entity.getComponent("movable");
        this.position = entity.getComponent("position");
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
                position.isDirty = true;
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DEPENDENCIES = ["logic"];

class LogicSystem {
    constructor() {
        this.world = null;
        this.entities = [];
    }

    _addEntity(entity) {
        var index = this.entities.indexOf(entity);
        if (index === -1) {
            this.entities.push(entity);
        }
    }

    _getStateComponent(entityId) {
        var _entityId = entityId;
        var entity = this.world.getEntityById(_entityId);

        if (entity == null) {
            return null;
        }

        var state = entity.getComponent("state");

        if (state == null) {
            return null;
        }
        return state;
    }

    _removeEntity(entity) {
        var index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            var _entity = entity;
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.world = null;
        this.entities = [];
    }

    componentAdded(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this._addEntity(entity);
        }
    }

    componentRemove(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this._removeEntity(entity);
        }
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this._addEntity(entity);
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this._removeEntity(entity);
        }
    }

    update() {
        this.entities.forEach((entity) => {
            var _entity = entity;

            var logicBox = _entity.getComponent("logic");

            var shouldExecuteAction = logicBox.conditions.every((condition) => {
                var _condition = condition;
                var state = this._getStateComponent(_condition.entityId);

                if (state == null) {
                    return false;
                }

                return _condition.stateNames.indexOf(state.name) > -1;
            });

            if (shouldExecuteAction) {
                logicBox.actions.forEach((action) => {
                    var _action = action;
                    var state = this._getStateComponent(_action.entityId);

                    if (state == null) {
                        return;
                    }

                    state.name = _action.stateName;
                    state.options = _action.options;
                });
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LogicSystem;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(4);


const DEPENDENCIES = ["follower", "position", "size", "movable"];

class FollowerSystem {
    constructor() {
        this.world = null;
        this.entities = [];
    }

    _addEntity(entity) {
        var index = this.entities.indexOf(entity);
        if (index === -1) {
            this.entities.push(entity);
        }
    }

    _getEntitysNextPosition(entity) {
        var _entity = entity;
        var movable = _entity.getComponent("movable");
        var position = _entity.getComponent("position");

        if (movable == null || position == null) {
            throw new Error("Entity needs to have both movable and position components.");
        }

        return {
            x: position.x + movable.x,
            y: position.y + movable.y
        };
    }

    _getFollowersDesiredPosition(leader, follower) {
        var _leader = leader;
        var _follower = follower;
        var followerComponent = _follower.getComponent("follower");
        var distance = followerComponent.distance;
        var followersSize = _follower.getComponent("size");
        var leadersPosition = _leader.getComponent("position");
        var leadersSize = _leader.getComponent("size");
        var leadersCenter = {
            x: Math.round(leadersSize.width / 2) + leadersPosition.x - Math.round(followersSize.width / 2),
            y: Math.round(leadersSize.height / 2) + leadersPosition.y - Math.round(followersSize.height / 2)
        };

        var leadersDirection = leader.getComponent("movable");
        var followerNextPosition = this._getEntitysNextPosition(_follower);
        var direction = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].normalize(leadersDirection);

        if (isNaN(direction.x)) {
            direction.x = followerComponent.lastDirection.x;;
        }

        if (isNaN(direction.y)) {
            direction.y = followerComponent.lastDirection.y;
        }

        followerComponent.lastDirection.x = direction.x;
        followerComponent.lastDirection.y = direction.y;

        return __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].add(leadersCenter, __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].multiply(direction, distance));
    }

    _setFollowersNextPosition(leader, follower) {
        var desiredPosition = this._getFollowersDesiredPosition(leader, follower);
        var currentPosition = this._getEntitysNextPosition(follower);

        var distance = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].subtract(desiredPosition, currentPosition);
        var direction = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].normalize(distance);
        var maxSpeed = follower.getComponent("follower").maxSpeed;
        var movable = follower.getComponent("movable");

        if (isNaN(direction.x)) {
            direction.x = 0;
        }

        if (isNaN(direction.y)) {
            direction.y = 0;
        }

        var moveX = Math.round(direction.x * maxSpeed);
        var moveY = Math.round(direction.y * maxSpeed);

        if (Math.abs(distance.x) > maxSpeed) {
            movable.x += moveX;
        } else {
            movable.x += Math.round(distance.x);
        }

        if (Math.abs(distance.y) > maxSpeed) {
            movable.y += moveY;
        } else {
            movable.y += Math.round(distance.y);
        }



    }

    _removeEntity(entity) {
        var index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            var _entity = entity;
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.world = null;
        this.entities = [];
    }

    componentAdded(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this._addEntity(entity);
        }
    }

    componentRemove(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this._removeEntity(entity);
        }
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this._addEntity(entity);
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this._removeEntity(entity);
        }
    }

    update() {
        this.entities.forEach((follower) => {
            var _follower = follower;

            var followerComponent = _follower.getComponent("follower");
            var leader = this.world.getEntityById(followerComponent.leaderEntityId);

            this._setFollowersNextPosition(leader, _follower);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FollowerSystem;


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vector__ = __webpack_require__(4);


const DEPENDENCIES = ["collidable", "narrow-phase-collidable", "position", "size"];

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
    }

    prepareNarrowPhaseCollidable(narrowPhaseCollision) {

        narrowPhaseCollision.parts.forEach((part) => {
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
        let narrowPhaseCollision = entity.getComponent("narrow-phase-collidable");
        let position = entity.getComponent("position");

        narrowPhaseCollision.parts.forEach((part) => {
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

        let narrowPhaseCollisionA = _entityA.getComponent("narrow-phase-collidable");
        let narrowPhaseCollisionB = _entityB.getComponent("narrow-phase-collidable");
        let positionA = _entityA.getComponent("position");
        let positionB = _entityB.getComponent("position");
        let collidableA = _entityA.getComponent("collidable");
        let collidableB = _entityB.getComponent("collidable");
        let aParts = narrowPhaseCollisionA.parts;
        let bParts = narrowPhaseCollisionB.parts;

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
                let collisionA = narrowPhaseCollisionA.collisions[entityB.id];
                let collisionB = narrowPhaseCollisionB.collisions[entityA.id];
                let penetration;
                let minOverlap;
                let normal;

                let originA = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].add(positionA, partA.origin);
                let originB = __WEBPACK_IMPORTED_MODULE_0__Vector__["a" /* default */].add(positionB, partB.origin);

                narrowPhaseCollisionA.isInitialized = true;
                narrowPhaseCollisionB.isInitialized = true;

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

                narrowPhaseCollisionA.collisions[entityB.id] = collisionA;
                narrowPhaseCollisionB.collisions[entityA.id] = collisionB;

            }

        }

    }

    cleanCollisions(entity) {
        let _entity = entity;
        let narrowPhaseCollision = _entity.getComponent("narrow-phase-collidable");
        let collidable = _entity.getComponent("collidable");
        let activeCollisions = narrowPhaseCollision.collisions;
        let timestamp = this.timestamp;

        for (let key in activeCollisions) {
            let _collision = activeCollisions[key];
            let collidableKey = _collision.otherEntity.id;

            if (_collision.endTimestamp != null && timestamp - _collision.endTimestamp > 3000) {
                delete activeCollisions[key];
            }

            const broadphaseCollision = this.getCollisionByEntityId(collidable.collisions, collidableKey);

            // Checking the status of the broadphase collision.
            if (_collision.endTimestamp == null && broadphaseCollision != null && broadphaseCollision.endTimestamp != null) {
                _collision.endTimestamp = broadphaseCollision.endTimestamp;
            }
        }

    }

    getCollisionByEntityId(collisions, id) {
        return collisions.find(({ entityId }) => entityId === id);
    }

    isStaticAndInitialized(entityA, entityB) {
        let narrowPhaseCollisionA = entityA.getComponent("narrow-phase-collidable");
        let narrowPhaseCollisionB = entityB.getComponent("narrow-phase-collidable");
        let positionA = entityA.getComponent("position");
        let positionB = entityB.getComponent("position");

        if (!positionA.isStatic || !positionB.isStatic) {
            return false;
        }

        if (!narrowPhaseCollisionA.isInitialized || !narrowPhaseCollisionB.isInitialized) {
            return false;
        }

        return true;
    }

    handleCollisions(entity) {
        let _entity = entity;
        let collidable = _entity.getComponent("collidable");
        let narrowPhaseCollision = _entity.getComponent("narrow-phase-collidable");

        if (!narrowPhaseCollision.isEnabled) {
            return;
        }

        if (collidable != null) {
            for (let key in collidable.collisions){
                let collision = collidable.collisions[key];
                let otherEntity = this.world.getEntityById(collision.entityId);
                let otherNarrowPhaseCollidable = otherEntity.getComponent("narrow-phase-collidable");

                if (otherEntity == null || otherNarrowPhaseCollidable == null || this.isStaticAndInitialized(_entity, otherEntity) || !otherNarrowPhaseCollidable.isEnabled) {
                    continue;
                }

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

    update() {
        let entity;
        let entities = this.entities;
        this.timestamp = this.world.getTime();

        entities.forEach((entity) => {
            let _entity = entity;
            this.handleCollisions(_entity);
        });
    }

    deactivated() {

    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.prepareNarrowPhaseCollidable(entity.getComponent("narrow-phase-collidable"));
            if (!entity.getComponent("position").isStatic) {
                this.entities.push(entity);
            }
        }
    };

    entityRemoved(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            let index = this.entities.indexOf(entity);

            if (index > -1) {
                this.entities.splice(index, 1);
            }
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entityRemoved(entity);
        }
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = NarrowPhaseCollisionSystem;



/***/ }),
/* 30 */
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
        if (value.hasComponents(["camera", "position", "size"])) {
            this._camera = value;
            this._cameraPosition = value.getComponent("position");
            this._cameraSize = value.getComponent("size");
        }
    }

    setEntityToFollow(entity) {
        if (entity.hasComponents(["position", "size"])) {
            this._entityToFollow = entity;
            this._entitySize = entity.getComponent("size");
            this._entityPosition = entity.getComponent("position");
        }
    }

    update() {
        if (this._entityToFollow != null && this._camera != null) {
            var x = this._entityPosition.x - (this._cameraSize.width / 2) + (this._entitySize.width / 2);
            var y = this._entityPosition.y - (this._cameraSize.height / 2) + (this._entitySize.height / 2);

            if (x < 0) {
                x = 0;
            }

            if (y < 0) {
                y = 0;
            }

            if (x + this._cameraSize.width > this._worldSize.width) {
                x = this._worldSize.width - this._cameraSize.width;
            }

            if (y + this._cameraSize.height > this._worldSize.height) {
                y = this._worldSize.height - this._cameraSize.height;
            }

            this._cameraPosition.x = Math.floor(x);
            this._cameraPosition.y = Math.floor(y);
        }

        if (this._camera != null) {
            this._cameraPosition.isDirty = true;
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Position__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Size__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Movable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Collidable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Shape__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_Follower__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_SolidBody__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_NarrowPhaseCollidable__ = __webpack_require__(8);










/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */] {
    constructor(leaderEntityId, maxSpeed = 3) {
        super();

        let position = new __WEBPACK_IMPORTED_MODULE_1__components_Position__["a" /* default */]();
        let size = new __WEBPACK_IMPORTED_MODULE_2__components_Size__["a" /* default */]();
        let movable = new __WEBPACK_IMPORTED_MODULE_3__components_Movable__["a" /* default */]();
        let collidable = new __WEBPACK_IMPORTED_MODULE_4__components_Collidable__["a" /* default */]();
        let shape = new __WEBPACK_IMPORTED_MODULE_5__components_Shape__["a" /* default */]();
        let follower = new __WEBPACK_IMPORTED_MODULE_6__components_Follower__["a" /* default */]();
        let solidBody = new __WEBPACK_IMPORTED_MODULE_7__components_SolidBody__["a" /* default */]();
        let narrowPhaseCollision = new __WEBPACK_IMPORTED_MODULE_8__components_NarrowPhaseCollidable__["a" /* NarrowPhaseCollidable */]();
        let part = new __WEBPACK_IMPORTED_MODULE_8__components_NarrowPhaseCollidable__["b" /* Part */]();

        part.points.push(
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 }
        );

        size.width = 30;
        size.height = 30;

        narrowPhaseCollision.parts.push(part);

        shape.points.push(
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );

        shape.fillColor.blue = 255;

        follower.leaderEntityId = leaderEntityId;
        follower.distance.x = 100;
        follower.distance.y = 100;
        follower.maxSpeed = maxSpeed;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(shape);
        this.addComponent(movable);
        this.addComponent(collidable);
        this.addComponent(follower);
        this.addComponent(solidBody);
        this.addComponent(narrowPhaseCollision);
    }
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Follower {
    constructor() {
        this.type = "follower";
        this.leaderEntityId = null;
        this.maxSpeed = 2;
        this.distance = {
            x: 0,
            y: 0
        }
        this.lastDirection = {
            x: 1,
            y: 1
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Follower;


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Position__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Size__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Movable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Collidable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Shape__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_KeyboardInput__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_KeyboardController__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_SolidBody__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_NarrowPhaseCollidable__ = __webpack_require__(8);











/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */] {
    constructor() {
        super();

        let position = new __WEBPACK_IMPORTED_MODULE_1__components_Position__["a" /* default */]();
        let size = new __WEBPACK_IMPORTED_MODULE_2__components_Size__["a" /* default */]();
        let movable = new __WEBPACK_IMPORTED_MODULE_3__components_Movable__["a" /* default */]();
        let collidable = new __WEBPACK_IMPORTED_MODULE_4__components_Collidable__["a" /* default */]();
        let shape = new __WEBPACK_IMPORTED_MODULE_5__components_Shape__["a" /* default */]();
        let keyboardController = new __WEBPACK_IMPORTED_MODULE_7__components_KeyboardController__["a" /* default */]();
        let keyboardInput = new __WEBPACK_IMPORTED_MODULE_6__components_KeyboardInput__["a" /* default */]();
        let solidBody = new __WEBPACK_IMPORTED_MODULE_8__components_SolidBody__["a" /* default */]();
        let narrowPhaseCollision = new __WEBPACK_IMPORTED_MODULE_9__components_NarrowPhaseCollidable__["a" /* NarrowPhaseCollidable */]();
        let part = new __WEBPACK_IMPORTED_MODULE_9__components_NarrowPhaseCollidable__["b" /* Part */]();

        part.points.push(
            { x: 0, y: 0 },
            { x: 85, y: 0 },
            { x: 85, y: 85 },
            { x: 0, y: 85 },
            { x: 0, y: 0 }
        );

        size.width = 85;
        size.height = 85;

        narrowPhaseCollision.parts.push(part);

        shape.points.push(
            { x: 0, y: 0 },
            { x: 85, y: 0 },
            { x: 85, y: 85 },
            { x: 0, y: 85 },
            { x: 0, y: 0 }
        );

        shape.fillColor.red = 255;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(shape);
        this.addComponent(movable);
        this.addComponent(collidable);
        this.addComponent(keyboardController);
        this.addComponent(keyboardInput);
        //this.addComponent(solidBody);
        this.addComponent(narrowPhaseCollision);
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
﻿class KeyboardController {
    constructor() {
        this.type = "keyboard-controller";
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeyboardController;


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Camera__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Size__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Position__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Collidable__ = __webpack_require__(3);
﻿





class Camera extends __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */] {
    constructor(name) {
        super();

        var camera = new __WEBPACK_IMPORTED_MODULE_1__components_Camera__["a" /* default */]();
        camera.name = name || null;

        var position = new __WEBPACK_IMPORTED_MODULE_3__components_Position__["a" /* default */]();
        var size = new __WEBPACK_IMPORTED_MODULE_2__components_Size__["a" /* default */]();
        var collidable = new __WEBPACK_IMPORTED_MODULE_4__components_Collidable__["a" /* default */]();

        this.id = `camera_${this.id}`;
        this.addComponent(camera);
        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(collidable);

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
﻿class Camera {
    constructor() {
        this.type = "camera";
        this.name = null;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Camera;



/***/ })
/******/ ]);