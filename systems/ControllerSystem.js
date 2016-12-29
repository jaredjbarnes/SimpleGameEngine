define(["require", "exports"], function (require, exports) {
    "use strict";
    const DEPENDENCIES = ["keyboard-input", "keyboard-controller", "position", "movable"];
    class ControllerSystem {
        constructor() {
            this._entities = [];
            this._game = null;
        }
        activated(game) {
            var self = this;
            this._game = game;
            game.getEntities().forEach(function (entity) {
                self.entityAdded(entity);
            });
        }
        deactivated() {
            this._game = null;
        }
        entityAdded(entity) {
            if (entity.hasComponents(DEPENDENCIES)) {
                this._entities.push(entity);
            }
        }
        entityRemoved(entity) {
            var entities = this._entities;
            var index = entities.indexOf(entity);
            if (index > -1) {
                entities.splice(index, 1);
            }
        }
        componentAdded(entity, component) {
            if (entity.hasComponents(DEPENDENCIES)) {
                this.entityAdded(entity);
            }
        }
        componentRemoved(entity, component) {
            if (DEPENDENCIES.indexOf(component.type) > -1) {
                this.entityRemoved(entity);
            }
        }
        update() {
            this._entities.forEach(function (entity) {
                var movable = entity.getComponent("movable");
                var keyboardInput = entity.getComponent("keyboard-input");
                if (movable != null && keyboardInput != null) {
                    // Left
                    if (keyboardInput.pressedKeys[37]) {
                        movable.x -= 2;
                    }
                    if (keyboardInput.pressedKeys[38]) {
                        movable.y -= 2;
                    }
                    if (keyboardInput.pressedKeys[39]) {
                        movable.x += 2;
                    }
                    if (keyboardInput.pressedKeys[40]) {
                        movable.y += 2;
                    }
                }
            });
        }
    }
    return ControllerSystem;
});
//# sourceMappingURL=ControllerSystem.js.map