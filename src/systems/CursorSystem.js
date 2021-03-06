import Entity from "../Entity.js";
import Rectangle from "../components/Rectangle.js";
import ZIndex from "../components/ZIndex.js";
import Cursor from "../components/Cursor.js";
import Transform from "../components/Transform.js";
import RectangleCollider from "../components/RectangleCollider.js";
import Shape from "../components/Shape.js";
import SpatialPartition from "../components/SpatialPartition.js";
import CursorService from "../services/CursorService.js";

const CAMERA_DEPENDENCIES = ["camera", "transform"];

const mapping = {
    "0": "isLeftButtonDown",
    "1": "isMiddleButtonDown",
    "2": "isRightButtonDown"
};

export default class CursorSystem {
    constructor() {
        this.world = null;
        this.name = "cursor";
        this.canvas = null;
        this.camera = null;
        this.cameraName = null;
        this.cameraPosition = null;
        this.cameraRectangle = null;
        this.cursorRectangle = null;
        this.cursorTransform = null;
        this.cursorPosition = null;
        this.browserCursorPosition = {
            x: 0,
            y: 0
        };
        this.cursorEntity = null;
        this.canvasRect = this.canvas.getBoundingClientRect();
        this.scale = {
            x: 1,
            y: 1
        };
        this.showCursor = false;
        this.isLeftButtonDown = false;
        this.isRightButtonDown = false;
        this.isMiddleButtonDown = false;

        this._mousedown = (event) => {
            const button = event.button;
            this[mapping[button]] = true;
        }

        this._mouseup = (event) => {
            const button = event.button;
            this[mapping[button]] = false;
        }

        this._mousemove = (event) => {
            this.canvasRect = this.canvas.getBoundingClientRect();
            const rectangle = this.cameraRectangle;

            this.scale = {
                x: rectangle.width / this.canvasRect.width,
                y: rectangle.height / this.canvasRect.height
            };

            this.browserCursorPosition.x = (event.pageX - this.canvasRect.left) * this.scale.x;
            this.browserCursorPosition.y = (event.pageY - this.canvasRect.top) * this.scale.y;
        }

        this._createCursorEntity();
        this.cursorService = new CursorService();
        this.cursorService = this.cursorEntity;
        this.cursorComponent = this.cursorEntity.getComponent("cursor");

    }

    _addCamera(entity) {
        let camera = entity.getComponent("camera");

        if (camera.name == this.cameraName) {
            this.camera = entity;
            this.cameraPosition = this.camera.getComponent("transform").position;
            this.cameraRectangle = this.camera.getComponent("rectangle");
        }

    }

    _createCursorEntity() {
        const rectangle = new Rectangle();
        const transform = new Transform();
        const cursor = new Cursor();
        const rectangleCollider = new RectangleCollider();
        const shape = new Shape();
        const spatialPartition = new SpatialPartition();
        const zIndex = new ZIndex();

        shape.points.push(
            { x: 0, y: 0 },
            { x: 5, y: 0 },
            { x: 5, y: 5 },
            { x: 0, y: 5 },
            { x: 0, y: 0 }
        );

        shape.fillColor.red = 255;
        shape.id = "cursor";

        rectangle.height = 5;
        rectangle.width = 5;

        zIndex.value = Infinity;

        this.cursorEntity = new Entity();
        this.cursorEntity.type = "cursor";
        this.cursorEntity.addComponent(rectangle);
        this.cursorEntity.addComponent(transform);
        this.cursorEntity.addComponent(cursor);
        this.cursorEntity.addComponent(rectangleCollider);
        this.cursorEntity.addComponent(zIndex);
        this.cursorEntity.addComponent(spatialPartition);

        this.cursorRectangle = rectangle;
        this.cursorPosition = transform.position;
        this.cursorTransform = transform;

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
        this.world.addEntity(this.cursorEntity);
        this.world.addService(this.cursorService);
        this.canvas.addEventListener("mousemove", this._mousemove, false);
        document.addEventListener("mousedown", this._mousedown, false);
        document.addEventListener("mouseup", this._mouseup, false);
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
        document.removeEventListener("mousedown", this._mousedown);
        document.removeEventListener("mouseup", this._mouseup);
        this.world.removeEntity(this.cursorEntity);
        this.world.removeService(this.cursorService);
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

        let halfCameraWidth = this.cameraRectangle.width / 2;
        let halfCameraHeight = this.cameraRectangle.height / 2;

        this.cursorPosition.x = Math.floor(this.browserCursorPosition.x + this.cameraPosition.x - halfCameraWidth);
        this.cursorPosition.y = Math.floor(this.browserCursorPosition.y + this.cameraPosition.y - halfCameraHeight);
        this.cursorTransform.isDirty = true;

        this.cursorComponent.isLeftButtonDown = this.isLeftButtonDown;
        this.cursorComponent.isRightButtonDown = this.isRightButtonDown;
        this.cursorComponent.isMiddleButtonDown = this.isMiddleButtonDown;

    }


}