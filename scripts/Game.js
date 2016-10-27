﻿class Game {
    constructor() {
        var self = this;

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

        this.isRunning = false;

        this._animationFrame = null;
        this._startTime = 0;
        this._timespans = [];
        this._systems = [];
        this._entities = [];

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
        var index = entities.indexOf(entity);

        if (index === -1) {
            entities.push(entity);
            entity.setDelegate(this._entityDelegate);
            this.notifySystems("entityAdded", [entity]);
        }

    }

    removeEntity(entity) {
        var entities = this._entities;
        var index = entities.indexOf(entity);

        if (index === -1) {
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
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this._timespans.push(performance.now() - this._startTime);
            cancelAnimationFrame(this._animationFrame);
        }
    }

    getTime() {
        var time = this._timespans.reduce(function (accumulator, value) {
            return accumulator + value;
        }, 0);

        if (this.isRunning) {
            time + performance.now() - this._startTime;
        }

        return time;
    }

    getEntities() {
        return this._entities.slice(0);
    }

}