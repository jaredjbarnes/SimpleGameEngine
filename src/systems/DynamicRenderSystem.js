import Entity from "../Entity";
import Size from "../components/Size";
import Position from "Position";
import Collidable from "Collidable";
import RenderingCell from "./render/RenderingCell";

class CameraCanvasCellEntity extends Entity {
    constructor({ x = 0, y = 0 } = { x: 0, y: 0 }, size) {
        super();

        const size = new Size();
        size.width = size;
        size.height = size;

        const position = new Position();
        position.x = x;
        position.y = y;

        const collidable = new Collidable();

        this.addComponent(size);
        this.addComponent(position);
        this.addComponent(collidable);
    }
}


export default class DynamicRenderSystem {

    constructor({ cameraName, cameraCanvasCellSize }) {

        this.camera = {
            position: null,
            size: null,
            collidable: null
        };
        this.world = null;
        this.cameraEntity = null;
        this.cameraCanvasCellSize = cameraCanvasCellSize;
        this.cameraName = cameraName;
        this.cells = {};
        this.canvases = [];

        this.currentCellPositions = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }
        ];

        this.newCellPositions = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }
        ];

        this._createCanvasCells();
        this._createRenderingCells();

    }

    _createRenderingCells() {
        for (let x = 0; x < 0; x++) {
            const canvas = new OffsetCanvas(this.cameraCanvasCellSize);
            this.canvases.push(canvas);
        }
    }

    _createCanvasCells() {
        for (let x = 0; x < 9; x++) {
            const canvasCell = new CameraCanvasCellEntity(null, this.cameraCanvasCellSize);
            this.availableCanvasCells.push(canvasCell);
        }
    }

    getCellPositions() {
        const column = this.camera.position.x / this.cameraCanvasCellSize.width;
        const row = this.camera.position.y / this.cameraCanvasCellSize.height;
        const cellPositions = this.newCellPositions;

        cellPositions[0].x = column - 1;
        cellPositions[0].y = row - 1;

        cellPositions[1].x = column;
        cellPositions[1].y = row - 1;

        cellPositions[2].x = column + 1;
        cellPositions[2].y = row - 1;

        cellPositions[3].x = column - 1;
        cellPositions[3].y = row;

        cellPositions[4].x = column;
        cellPositions[4].y = row;

        cellPositions[5].x = column + 1;
        cellPositions[5].y = row;

        cellPositions[6].x = column - 1;
        cellPositions[6].y = row + 1;

        cellPositions[7].x = column;
        cellPositions[7].y = row + 1;

        cellPositions[8].x = column + 1;
        cellPositions[8].y = row + 1;

        return this.newCellPositions;
    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    componentAdded(entity, component) {
        this.entityAdded(entity)
    }

    componentRemoved(entity, component) {
        if (this.cameraEntity === entity && (
            component.type === "position" ||
            component.type === "size" ||
            component.type === "collidable"
        )) {
            this.cameraEntity = null;
            this.camera.position = null;
            this.camera.size = null;
            this.camera.collidable = null;
        }
    }

    deactivated() {
        this.camera = {
            position: null,
            size: null,
            collidable: null
        };
        this.world = null;
        this.cameraEntity = null;
        this.cameraName = null;
        this.cells = {};
        this.availablerRenderingCells= [];
        this.canvases = [];
        this.document = document || window.document;
        this.currentCellPositions = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }
        ];
        this.newCellPositions = [
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
            { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }
        ];
        this._createRenderingCells();
        this, _createCanvasCells();
    }

    entityAdded(entity) {
        if (this.isCamera(entity)) {
            this.cameraEntity = entity;
            this.camera.position = entity.getComponent("position");
            this.camera.size = entity.getComponent("size");
            this.camera.collidable = entity.getComponent("collidable");
        }
    }

    entityRemoved(entity) {
        if (entity === this.cameraEntity) {
            this.cameraEntity = null;
            this.camera.position = null;
            this.camera.size = null;
            this.camera.collidable = null;
        }
    }

    isCamera(entity) {
        return entity.hasComponents(["position", "size", "camera", "collidable"]) &&
            entity.getComponent("camera").name === this.cameraName;
    }

    update() {
        // Check cell Positions of cameara and update the the cameraCanvasCell and call update
    }
}