define(["require", "exports"], function (require, exports) {
    "use strict";
    var KeyboardInputSystem = (function () {
        function KeyboardInputSystem(document) {
            this._game = null;
            var pressedKeys = this.pressedKeys = {};
            document.addEventListener("keydown", function (event) {
                pressedKeys[event.keyCode] = true;
            });
            document.addEventListener("keyup", function (event) {
                pressedKeys[event.keyCode] = false;
            });
        }
        KeyboardInputSystem.prototype.activated = function (game) {
            var self = this;
            this._game = game;
            game.getEntities().forEach(function (entity) {
                self.entityAdded(entity);
            });
        };
        KeyboardInputSystem.prototype.deactivated = function () {
        };
        KeyboardInputSystem.prototype.update = function () {
        };
        KeyboardInputSystem.prototype.entityAdded = function (entity) {
            var component = entity.getComponent("keyboard-input");
            if (component != null) {
                component.pressedKeys = this.pressedKeys;
            }
        };
        KeyboardInputSystem.prototype.entityRemoved = function (entity) {
            var component = entity.getComponent("keyboard-input");
            if (component != null) {
                component.pressedKeys = {};
            }
        };
        KeyboardInputSystem.prototype.componentAdded = function (entity, component) {
            if (component.type === "keyboard-input") {
                component.pressedKeys = this.pressedKeys;
            }
        };
        KeyboardInputSystem.prototype.componentRemoved = function (entity, component) {
            if (component.type === "keyboard-input") {
                component.pressedKeys = {};
            }
        };
        return KeyboardInputSystem;
    }());
    return KeyboardInputSystem;
});
//# sourceMappingURL=KeyboardInputSystem.js.map