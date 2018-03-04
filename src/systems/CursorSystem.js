import Entity from "../Entity";
import Cursor from "../components/Cursor";
import Position from "../components/Position";
import Size from "../components/Size";
import Collidable from "../components/Collidable";

const DEPENDENCIES = ["cursor", "position", "size"];
const CAMERA_DEPENDENCIES = ["camera", "position"];

export default class CursorSystem {
    constructor({ canvas, cameraName, doc = document }) {
        this.world = null;
        this.canvas = canvas;
        this._mousemove = this._mousemove.bind(this);
        this.camera = null;
        this.cameraName = cameraName;
        this.cameraPosition = null;
        this.cursorPosition = {
            x: 0,
            y: 0
        };
        this.cursorEntity = null;
        this.document = doc;
    }

    _addCamera(entity) {
        let camera = entity.getComponent("camera");

        if (camera.name == this.cameraName) {
            this.camera = camera;
            this.cameraPosition = camera.getComponent("position");
        }

    }

    _createCursorEntity() {
        const entity = new Entity();
        const size = new Size();
        const position = new Position();
        const cursor = new Cursor();
        const collidable = new Collidable();

        this.cursorEntity.addComponent(size);
        this.cursorEntity.addComponent(position);
        this.cursorEntity.addComponent(cursor);
        this.cursorEntity.addComponent(collidable);

        return entity;
    }

    _mousemove(event) {
        let rect = this.canvas.getBoundingClientRect();

        this.cursorPosition.x = event.pageX - rect.left;
        this.cursorPosition.y = event.pageY - rect.top;
    }

    _mousedown(event) {
        this.cursorEntity.getComponent("cursor").isLeftButtonDown = true;
    }

    _mouseup(event) {
        this.cursorEntity.getComponent("cursor").isLeftButtonDown = false;
    }

    _removeCamera() {
        this.camera = null;
        this.cameraPosition = null;
    }

    activated(world) {
        this.world = world;
        this.cursorEntity = this._createCursorEntity();
        this.world.addEntity(this.cursorEntity);
        this.canvas.addEventListener("mousemove", this._mousemove, false);
        this.document.addEventListener("mousedown", this._mousedown, false);
        this.document.addEventListener("mouseup", this._mouseup, false);
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
        this.canvas.removeEventListener("mousemove", this._mousemove);
        this.document.removeEventListener("mousedown", this._mousedown);
        this.document.removeEventListener("mouseup", this._mouseup);
        this.world.removeEntity(this.cursorEntity);
        this.world = null;
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

        const entity = this.cursorEntity;
        let position = entity.getComponent("position");
        let size = entity.getComponent("size");

        let width = size.width > 0 ? size.width : 1;
        let height = size.height > 0 ? size.height : 1;

        let halfWidth = parseInt(size.width / 2, 10);
        let halfHeight = parseInt(size.height / 2, 10);

        position.x = this.cursorPosition.x + this.cameraPosition.x - halfWidth;
        position.y = this.cursorPosition.y + this.cameraPosition.y - halfHeight;

    }


}