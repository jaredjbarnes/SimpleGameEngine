import Entity from "../Entity";
import Size from "../components/Size";
import Position from "Position";
import Collidable from "Collidable";

class CameraCanvasCell extends Entity {
    constructor({ x = 0, y = 0 } = { x: 0, y: 0 }, { width, height }) {
        super();
        
        const size = new Size();
        size.width = width;
        size.height = height;

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

    constructor({ cameraName, cameraCanvasCellSize, document }) {

        this.camera = {
            position: null,
            size: null,
            collidable: null
        };

        this.cameraCanvasCellSize = cameraCanvasCellSize;
        this.cameraName = cameraName;
        this.cells = {};
        this.availableCanvasCells = [];
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

        this._createCanvases();
        this, _createCanvasCells();

    }

    _createCanvases() {
        const rows = this.canvases;

        for (let x = 0; x < 3; x++) {
            const columns = [];
            rows.push(columns);

            for (let y = 0; y < 3; y++) {
                const canvas = this.document.createElement("canvas");
                columns.push(canvas);
                canvas.width = this.cameraCanvasCellSize.width;
                canvas.height = this.cameraCanvasCellSize.height;
            }
        }
    }

    _createCanvasCells() {
        for (let x = 0; x < 9; x++) {
            const canvasCell = new CameraCanvasCell(null, this.cameraCanvasCellSize);
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

    activated() { }

    componentAdded(entity, component) { }

    componentRemoved(entity, component) { }

    deactivated() { }

    entityAdded(entity) {

    }

    entityRemoved(entity) { }

    isCamera(entity) {
        return entity.hasComponents(["position", "size", "camera", "collidable"]) &&
            entity.getComponent("camera").name === this.cameraName;
    }

    update() {

    }
}