define(["require", "exports"], function (require, exports) {
    "use strict";
    var ControllerSystem = (function () {
        function ControllerSystem() {
            this._dependencies = ["keyboard-input", "keyboard-controller", "position"];
            this._entities = [];
            this._game = null;
        }
        ControllerSystem.prototype.activated = function (game) {
            var self = this;
            this._game = game;
            game.getEntities().forEach(function (entity) {
                self.entityAdded(entity);
            });
        };
        ControllerSystem.prototype.deactivated = function () {
            this._game = null;
        };
        ControllerSystem.prototype.entityAdded = function (entity) {
            if (entity.hasComponents(this._dependencies)) {
                this._entities.push(entity);
            }
        };
        ControllerSystem.prototype.entityRemoved = function (entity) {
            var entities = this._entities;
            var index = entities.indexOf(entity);
            if (index > -1) {
                entities.splice(index, 1);
            }
        };
        ControllerSystem.prototype.componentAdded = function (entity, component) {
            if (entity.hasComponents(this._dependencies)) {
                this.entityAdded(entity);
            }
        };
        ControllerSystem.prototype.componentRemoved = function (entity, component) {
            if (this._dependencies.indexOf(component.type) > -1) {
                this.entityRemoved(entity);
            }
        };
        ControllerSystem.prototype.update = function () {
            this._entities.forEach(function (entity) {
                var position = entity.getComponent("position");
                var keyboardInput = entity.getComponent("keyboard-input");
                if (position != null && keyboardInput != null) {
                    // Left
                    if (keyboardInput.pressedKeys[37]) {
                        position.x -= 2;
                    }
                    if (keyboardInput.pressedKeys[38]) {
                        position.y -= 2;
                    }
                    if (keyboardInput.pressedKeys[39]) {
                        position.x += 2;
                    }
                    if (keyboardInput.pressedKeys[40]) {
                        position.y += 2;
                    }
                }
            });
        };
        return ControllerSystem;
    }());
    return ControllerSystem;
});
//# sourceMappingURL=ControllerSystem.js.map