define(["require", "exports"], function (require, exports) {
    "use strict";
    class Game {
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
        }
        _invokeMethod(obj, methodName, args) {
            args = Array.isArray(args) ? args : [];
            if (obj && typeof obj[methodName] === "function") {
                return obj[methodName].apply(obj, args);
            }
        }
        _loop() {
            var self = this;
            this.update();
            this._animationFrame = requestAnimationFrame(function () {
                self._loop();
            });
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
            }
        }
        addService(name, service) {
            this._services.set(name, service);
            this.notifySystems("serviceAdded", [name, service]);
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
            this.notifySystems("update");
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
            return this._entitiesById[id] || null;
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Game;
});
//# sourceMappingURL=Game.js.map