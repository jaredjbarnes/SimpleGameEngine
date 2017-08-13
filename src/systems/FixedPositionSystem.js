const DEPENDENCIES = ["position", "fixed-position"];

export default class FixedPositionSystem {
    constructor() {
        this.game = null;
        this.entities = [];
        this.cameraName = null;
        this.camera = null;
    }

    _hasComposition(entity) {
        return DEPENDENCIES.every((name) => {
            return entity.hasComponent(name);
        });
    }

    activated(game) {
        this.game = game;
    }

    componentAdded() {

    }

    componentRemoved() {

    }

    entityAdded(entity) {
        if (this._hasComposition(entity)) {
            this.entities.push(entity);
        }
    }

    entityRemoved(entity) {
        if (this._hasComposition(entity)) {
            var index = this.entities.indexOf(entity);
            if (index > -1) {
                this.entities.splice(index, 1);
            }
        }
    }

    deactivated() {

    }

    update() {
        if (this.cameraName == null) {
            return;
        }

        if (this.camera == null || this.cameraName != this.camera.name) {
            this.camera = this.game.getEntitiesByFilter((entity) => {
                var cameraComponent = entity.getComponent("camera");
                return cameraComponent && cameraComponent.name === this.cameraName;
            })[0];
        }

        if (this.camera == null) {
            return;
        }

        var position = this.camera.getComponent("position");

        this.entities.forEach((entity) => {
            var entityPosition = entity.getComponent("position");
            var fixedPosition = entity.getComponent("fixed-position");

            entityPosition.x = position.x + fixedPosition.x;
            entityPosition.y = position.y + fixedPosition.y;
        });
    }

}