class KeyboardInputSystem {
    constructor(document) {
        this._game = null;
        var pressedKeys = this.pressedKeys = {};

        document.addEventListener("keydown", function (event) {
            pressedKeys[event.keyCode] = true;
        });

        document.addEventListener("keyup", function (event) {
            pressedKeys[event.keyCode] = false;
        });
    }

    activated(game) {
        var self = this;
        this._game = game;

        game.getEntities().forEach(function (entity) {
            self.entityAdded(entity);
        });
    }

    deactivated() {

    }

    update() {

    }

    entityAdded(entity) {
        var component = entity.getComponent("keyboard-input");
        if (component != null) {
            component.pressedKeys = this.pressedKeys;
        }
    }

    entityRemoved(entity) {
        var component = entity.getComponent("keyboard-input");
        if (component != null) {
            component.pressedKeys = {};
        }
    }

    componentAdded(entity, component) {
        if (component.type === "keyboard-input") {
            component.pressedKeys = this.pressedKeys;
        }
    }

    componentRemoved(entity, component) {
        if (component.type === "keyboard-input") {
            component.pressedKeys = {};
        }
    }
}