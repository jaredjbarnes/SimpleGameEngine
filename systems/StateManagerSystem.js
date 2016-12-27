define(["require", "exports"], function (require, exports) {
    "use strict";
    class EntityState {
        constructor() {
            this.entityId = null;
            this.state = null;
            this.states = null;
        }
    }
    class StateManagerSystem {
        constructor() {
            this.game = null;
            this.entities = [];
        }
        _addEntity(entity) {
            if (entity.hasComponents(["state"])) {
                var index = this.entities.map((entityState) => {
                    return entityState.entityId;
                }).indexOf(entity.id);
                if (index === -1) {
                    var entityState = new EntityState();
                    entityState.state = entity.getComponent("state");
                    entityState.states = entity.getComponents().reduce(function (accumulator, component) {
                        if (component.isStateful) {
                            accumulator.set(component.name, component);
                        }
                        return accumulator;
                    }, new Map());
                    this.entities.push(entityState);
                }
            }
        }
        _removeEntity(entity) {
            if (entity.hasComponents(["state"])) {
                var index = this.entities.map((entityState) => {
                    return entityState.entityId;
                }).indexOf(entity.id);
                if (index > -1) {
                    this.entities.splice(index, 1);
                }
            }
        }
        _handleStates(entity) {
        }
        activated(game) {
            this.game = game;
        }
        deactivated() {
            this.game = null;
        }
        update() {
            this.entities.forEach((entity) => {
                this._handleStates(entity);
            });
        }
        entityAdded(entity) {
            this._addEntity(entity);
        }
        entityRemoved(entity) {
            this._removeEntity(entity);
        }
        componentAdded(component, entity) {
            if (component.type === "state") {
                this._addEntity(entity);
            }
        }
        componentRemoved(component, entity) {
            if (component.type === "state") {
                this._removeEntity(entity);
            }
        }
    }
    return StateManagerSystem;
});
//# sourceMappingURL=StateManagerSystem.js.map