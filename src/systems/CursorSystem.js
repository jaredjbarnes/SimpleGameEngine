const DEPENDENCIES = ["cursor", "position", "size"];
const CAMERA_DEPENDENCIES = ["camera", "position"];

export default class CursorSystem {
    constructor(canvas, cameraName) {
        this.world = null;
        this.canvas = canvas;
        this._mousemove = this._mousemove.bind(this);
        this.entities = [];
        this.camera = null;
        this.cameraName = cameraName;
        this.cursorPosition = {
            x: 0,
            y: 0
        };
    }

    _addCamera(entity) {
        var camera = entity.getComponent("camera");

        if (camera.name == this.cameraName) {
            this.camera = camera;
            this.cameraPosition = camera.getComponent("position");
        }

    }

    _addEntity(entity) {
        var index = this.entities.indexOf(entity);
        if (index === -1) {
            this.entities.push(entity);
        }
    }

    _mousemove(event) {
        var rect = this.canvas.getBoundingClientRect();

        this.cursorPosition.x = event.pageX - rect.left;
        this.cursorPosition.y = event.pageY - rect.top;
    }

    _removeEntity(entity) {
        var index = this.entities.indexOf("entity");
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    activated(world) {
        this.world = world;
        this.canvas.addEventListener("mousemove", this._mousemove, false);
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(CAMERA_DEPENDENCIES)) {
            this._addCamera(entity);
        }

        if (entity.hasComponents(DEPENDENCIES)) {
            this._addEntity(entity);
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this._removeEntity(entity);
        }
    }

    deactivated() {
        this.canvas.removeEventListener("mousemove", this._mousemove, false);
        this.world = null;
        this.entities = [];
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this._addEntity(entity);
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponents(CAMERA_DEPENDENCIES)) {
            this._removeEntity(entity);
        }

        if (entity.hasComponents(DEPENDENCIES)) {
            this._removeEntity(entity);
        }
    }

    update() {
        if (this.camera == null) {
            return;
        }

        this.entities.forEach((entity) => {
            var _entity = entity;
            var position = entity.getComponent("position");
            var size = entity.getComponent("size");

            var width = size.width > 0 ? size.width : 1;
            var height = size.height > 0 ? size.height : 1;

            var halfWidth = parseInt(size.width / 2, 10);
            var halfHeight = parseInt(size.height / 2, 10);

            position.x = this.cursorPosition.x + this.cameraPosition.x - halfWidth;
            position.y = this.cursorPosition.y + this.cameraPosition.y - halfHeight;

        });
    }


}