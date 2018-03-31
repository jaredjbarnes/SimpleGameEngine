import Entity from "../Entity";
import Rectangle from "../components/Rectangle";
import Cursor from "../components/Cursor";
import Transform from "../components/Transform";
import RectangleCollider from "../components/RectangleCollider";
import Shape from "../components/Shape";

const DEPENDENCIES = ["cursor", "transform"];
const CAMERA_DEPENDENCIES = ["camera", "transform"];

export default class CursorSystem {
    constructor({ canvas, cameraName, document, showCursor = false}) {
        this.world = null;
        this.canvas = canvas;
        this.camera = null;
        this.cameraName = cameraName;
        this.cameraPosition = null;
        this.cursorPosition = {
            x: 0,
            y: 0
        };
        this.cursorEntity = null;
        this.document = document;
        this.canvasRect = this.canvas.getBoundingClientRect();
        this.scale = {
            x: 1,
            y: 1
        };
        this.showCursor = showCursor;

        this._mousedown = (event) => {
            this.cursorEntity.getComponent("cursor").isLeftButtonDown = true;
        }

        this._mouseup = (event) => {
            this.cursorEntity.getComponent("cursor").isLeftButtonDown = false;
        }

        this._mousemove = (event) => {
            this.canvasRect = this.canvas.getBoundingClientRect();
            const rectangle = this.camera.getComponent("rectangle");

            this.scale = {
                x: rectangle.width / this.canvasRect.width,
                y: rectangle.height / this.canvasRect.height
            };

            this.cursorPosition.x = (event.pageX - this.canvasRect.left) * this.scale.x;
            this.cursorPosition.y = (event.pageY - this.canvasRect.top) * this.scale.y;
        }

    }

    _addCamera(entity) {
        let camera = entity.getComponent("camera");

        if (camera.name == this.cameraName) {
            this.camera = entity;
            this.cameraPosition = this.camera.getComponent("transform").position;
        }

    }

    _createCursorEntity() {
        const rectangle = new Rectangle();
        const transform = new Transform();
        const cursor = new Cursor();
        const rectangleCollider = new RetangleCollider();
        const shape = new Shape();

        shape.points.push(
            { x: 0, y: 0 },
            { x: 5, y: 0 },
            { x: 5, y: 5 },
            { x: 0, y: 5 },
            { x: 0, y: 0 }
        );

        shape.fillColor.red = 255;

        rectangle.height = 3;
        rectangle.width = 3;

        this.cursorEntity = new Entity();
        this.cursorEntity.addComponent(rectangle);
        this.cursorEntity.addComponent(position);
        this.cursorEntity.addComponent(cursor);
        this.cursorEntity.addComponent(rectangleCollider);

        if (this.showCursor) {
            this.cursorEntity.addComponent(shape);
        }

    }

    _removeCamera() {
        this.camera = null;
        this.cameraPosition = null;
    }

    activated(world) {
        this.world = world;
        this._createCursorEntity();
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
        let rectangle = entity.getComponent("rectangle");

        let width = rectangle.width > 0 ? rectangle.width : 1;
        let height = rectangle.height > 0 ? rectangle.height : 1;

        let halfWidth = parseInt(rectangle.width / 2, 10);
        let halfHeight = parseInt(rectangle.height / 2, 10);

        position.x = this.cursorPosition.x + this.cameraPosition.x - halfWidth;
        position.y = this.cursorPosition.y + this.cameraPosition.y - halfHeight;
        position.isDirty = true;

    }


}