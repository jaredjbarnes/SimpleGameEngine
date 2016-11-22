define(["require", "exports"], function (require, exports) {
    "use strict";
    var Game = (function () {
        function Game(size) {
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
            this.isRunning = false;
            this.size = size;
        }
        Game.prototype._invokeMethod = function (obj, methodName, args) {
            args = Array.isArray(args) ? args : [];
            if (obj && typeof obj[methodName] === "function") {
                return obj[methodName].apply(obj, args);
            }
        };
        Game.prototype._loop = function () {
            var self = this;
            this.update();
            this._animationFrame = requestAnimationFrame(function () {
                self._loop();
            });
        };
        Game.prototype.notifySystems = function (methodName, args) {
            args = args || [];
            var self = this;
            var systems = this._systems;
            systems.forEach(function (system) {
                self._invokeMethod(system, methodName, args);
            });
        };
        Game.prototype.addSystem = function (system) {
            var systems = this._systems;
            var index = systems.indexOf(system);
            if (index === -1) {
                systems.push(system);
                this._invokeMethod(system, "activated", [this]);
            }
        };
        Game.prototype.removeSystem = function (system) {
            var systems = this._systems;
            var index = systems.indexOf(system);
            if (index > -1) {
                systems.splice(index, 1);
                this._invokeMethod(system, "deactivated", [this]);
            }
        };
        Game.prototype.addEntity = function (entity) {
            var entities = this._entities;
            var entitiesById = this._entitiesById;
            var index = entities.indexOf(entity);
            if (index === -1) {
                entitiesById[entity.id] = entity;
                entities.push(entity);
                entity.setDelegate(this._entityDelegate);
                this.notifySystems("entityAdded", [entity]);
            }
        };
        Game.prototype.removeEntity = function (entity) {
            var entities = this._entities;
            var entitiesById = this._entitiesById;
            var index = entities.indexOf(entity);
            if (index === -1) {
                delete entitiesById[entity.id];
                entities.splice(index, 1);
                entity.setDelegate(null);
                this.notifySystems("entityRemoved", [entity]);
            }
        };
        Game.prototype.update = function () {
            var self = this;
            var systems = this._systems;
            this.notifySystems("update");
        };
        Game.prototype.play = function () {
            if (!this.isRunning) {
                this.isRunning = true;
                this._startTime = performance.now();
                this._loop();
            }
        };
        Game.prototype.pause = function () {
            if (this.isRunning) {
                this.isRunning = false;
                this._timespans.push(performance.now() - this._startTime);
                cancelAnimationFrame(this._animationFrame);
            }
        };
        Game.prototype.getTime = function () {
            var time = this._timespans.reduce(function (accumulator, value) {
                return accumulator + value;
            }, 0);
            if (this.isRunning) {
                time += performance.now() - this._startTime;
            }
            return time;
        };
        Game.prototype.getEntities = function () {
            return this._entities.slice(0);
        };
        Game.prototype.getEntitiesByFilter = function (filter) {
            return this._entities.filter(filter);
        };
        Game.prototype.getEntityById = function (id) {
            return this._entitiesById[id] || null;
        };
        return Game;
    }());
    return Game;
});
//# sourceMappingURL=Game.js.map