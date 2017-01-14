define(["require", "exports"], function (require, exports) {
    "use strict";
    const DEPENDENCIES = ["state"];
    var invokeMethod = function (obj, methodName, args) {
        if (obj != null && typeof obj[methodName] === "function") {
            return obj[methodName].apply(obj, args);
        }
    };
    class StateManagerSystem {
        constructor() {
            this.componentRemoved = function (entity, component) {
                if (component.type === "state") {
                    this.entities.delete(entity.id);
                }
            };
            this.addState = function (name, state) {
                if (typeof name === "string" && state != null) {
                    this.states.set(name, state);
                    invokeMethod(state, "initialize", [this.game]);
                }
            };
            this.game = null;
            this.isReady = true;
            this.name = null;
            this.entities = new Map();
            this.states = new Map();
        }
        updateStates(stateName, entity) {
            var state = this.states.get(stateName);
            invokeMethod(state, "update", [entity]);
        }
        activateStates(stateName, entity) {
            var state = this.states.get(stateName);
            invokeMethod(state, "activated", [entity]);
        }
        deactivateStates(stateName, entity) {
            var state = this.states.get(stateName);
            invokeMethod(state, "deactivated", [entity]);
        }
        updateState(entity) {
            var state = entity.getComponent("state");
            var stateName = state.name;
            this.updateStates(stateName, entity);
            var newStateName = state.name;
            if (newStateName !== stateName) {
                this.deactivateStates(stateName, entity);
                this.activateStates(newStateName, entity);
                this.updateStates(newStateName, entity);
            }
        }
        update() {
            this.entities.forEach((entity) => {
                this.updateState(entity);
            });
        }
        ;
        cacheEntities() {
            this.game.getEntities().forEach((entity) => {
                this.entityAdded(entity);
            });
        }
        activated(game) {
            this.game = game;
            this.cacheEntities();
            this.entities.forEach((entity) => {
                var state = entity.getComponent("state");
                var stateName = state.name;
                this.activateStates(stateName, entity);
            });
        }
        deactivated() {
            this.game = null;
            this.entities = new Map();
        }
        entityAdded(entity) {
            var state = entity.getComponent("state");
            if (state != null && state.stateManagerName === this.name) {
                this.entities.set(entity.id, entity);
            }
        }
        entityRemoved(entity) {
            this.entities.delete(entity.id);
        }
        componentAdded(entity, component) {
            if (component.type === "state" && component.stateManagerName === this.name) {
                this.entities.set(entity.id, entity);
            }
        }
    }
    return StateManagerSystem;
});
//# sourceMappingURL=StateManagerSystem.js.map