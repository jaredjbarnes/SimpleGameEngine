﻿import invokeMethod from "./utilities/invokeMethod.js";
import WorldDebugger from "./WorldDebugger.js";

export default class World {
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
        this.debugger = new WorldDebugger();

    }

    _loop() {
        this.update();
        this._animationFrame = requestAnimationFrame(this._loop);
    }

    _shouldRunSystem(system) {
        if (!this.debugger.isEnabled){
            return true;
        }

        if (this.debugger.state === WorldDebugger.states.PLAYING){
            return true;
        }

        if (this.debugger.state === WorldDebugger.states.STEPOVER){
            this.debugger.state === WorldDebugger.states.PAUSED;
            return true;
        }

        if (this.debugger.enableSystems.indexOf(system) > -1){
            return;
        }

        return false;
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

            if (this._shouldRunSystem(system)) {
                invokeMethod(system, methodName, args);
            }
        }
    }

    addSystem(system) {
        const systems = this._systems;
        const index = systems.indexOf(system);

        if (system.name == null){
            throw new Error("Systems must have a name.");
        }

        if (index === -1) {
            systems.push(system);
            invokeMethod(system, "activated", [this]);
            invokeMethod(system, "systemAdded", [system]);
        }
    }

    addService(service) {
        this._services[service.name] = service;
        invokeMethod(service, "activated", [this]);
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
            invokeMethod(service, "deactivated", [this]);
            this.notifySystems("serviceRemoved", [name, service]);
        }
    }

    removeSystem(system) {
        const systems = this._systems;
        const index = systems.indexOf(system);

        if (index > -1) {
            systems.splice(index, 1);
            invokeMethod(system, "deactivated", [this]);
            invokeMethod(system, "systemRemoved", [system]);
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
        const time = this.getTime();

        this.notifySystems("beforeUpdate", [time]);
        this.notifySystems("update", [time]);
        this.notifySystems("afterUpdate", [time]);
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