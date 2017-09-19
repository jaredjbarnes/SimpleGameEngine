import Entity from "./../Entity";
import Cursor from "./../components/Cursor";
import Position from "./../components/Position";
import Size from "./../components/Size";

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
        this.cameraPosition = null;
        this.cursorPosition = {
            x: 0,
            y: 0
        };
        this.cursorEntity = null;
    }

    _addCamera(entity) {
        var camera = entity.getComponent("camera");

        if (camera.name == this.cameraName) {
            this.camera = camera;
            this.cameraPosition = camera.getComponent("position");
        }

    }

    _createCursorEntity() {
        let entity = new Entity();

        let size = new Size();
        let position = new Position();
        let cursor = new Cursor();

        this.cursorEntity.addComponent(size);
        this.cursorEntity.addComponent(position);
        this.cursorEntity.addComponent(cursor);

        return entity;
    }

    _mousemove(event) {
        var rect = this.canvas.getBoundingClientRect();

        this.cursorPosition.x = event.pageX - rect.left;
        this.cursorPosition.y = event.pageY - rect.top;
    }

    _removeCamera() {
        this.camera = null;
        this.cameraPosition = null;
    }

    activated(world) {
        this.world = world;
        this.cursorEntity = this._createCursorEntity();
        this.canvas.addEventListener("mousemove", this._mousemove, false);
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(CAMERA_DEPENDENCIES)) {
            this._addCamera(entity);
        }
    }

    componentRemoved(entity, component) {
        if (entity === this.camera && CAMERA_DEPENDENCIES.indexOf(component.type) > -1) {
            this._removeCamera(entity);
        }
    }

    deactivated() {
        this.canvas.removeEventListener("mousemove", this._mousemove, false);
        this.world = null;
        this.entities = [];
        this.cursorEntity = null;
        this.camera = null;
        this.cameraPosition = null;
    }

    entityAdded(entity) {
        if (entity.hasComponents(CAMERA_DEPENDENCIES)) {
            this._addCamera(entity);
        }
    }

    entityRemoved(entity) {
        if (entity === this.camera && entity.hasComponents(CAMERA_DEPENDENCIES)) {
            this._removeCamera(entity);
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