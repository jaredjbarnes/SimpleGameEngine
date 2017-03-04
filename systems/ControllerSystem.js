define(["require", "exports"], function (require, exports) {
    "use strict";
    const DEPENDENCIES = ["keyboard-input", "keyboard-controller", "position", "movable"];
    class ControllerSystem {
        constructor() {
            this.entities = new Map();
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
    return ControllerSystem;
});
//# sourceMappingURL=ControllerSystem.js.map