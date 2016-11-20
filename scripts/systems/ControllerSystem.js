class ControllerSystem {
    constructor() {
        this._dependencies = ["keyboard-input", "keyboard-controller", "position"];
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
        if (entity.hasComponents(this._dependencies)) {
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
        if (entity.hasComponents(this._dependencies)) {
            this.entityAdded(entity);
        }
    }

    componentRemoved(entity, component) {
        if (this._dependencies.indexOf(component.type) > -1) {
            this.entityRemoved(entity);
        }
    }

    update() {

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

    }
}