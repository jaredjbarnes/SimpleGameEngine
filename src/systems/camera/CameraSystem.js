import CanvasPool from "./CanvasPool.js";
import CellRenderer from "./CellRenderer.js";
import Compositor from "./Compositor.js";
import Camera from "./Camera.js";
import BitmapRasterizer from "./BitmapRasterizer.js";
import LineRasterizer from "./LineRasterizer.js";
import ShapeRasterizer from "./ShapeRasterizer.js";
import TextRasterizer from "./TextRasterizer.js";

const sort = (entityA, entityB) => {
    const rectangleA = entityA.getComponent("rectangle");
    const rectangleB = entityB.getComponent("rectangle");

    if (rectangleA.bottom < rectangleB.bottom) {
        return -1;
    } else if (rectangleA.bottom > rectangleB.bottom) {
        return 1;
    } else {
        if (rectangleA.right < rectangleB.right) {
            return -1
        } else if (rectangleA.right > rectangleB.right) {
            return 1;
        } else {
            return 0;
        }
    }
}

const emtpyArray = Object.freeze([]);

export default class CameraSystem {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.name = "camera-system";
        this.compositor = new Compositor();
        this.canvasPool = new CanvasPool();
        this.cellRenderer = new CellRenderer();
        this.cellCanvases = {};
        this.cellSize = null;

        this.camera = new Camera();
        this.camera.type = "camera";
        this.cameraComponent = this.camera.getComponent("camera");
        this.cameraRectangle = this.camera.getComponent("rectangle");
        this.canvas.width = this.cameraRectangle.width;
        this.canvas.height = this.cameraRectangle.height;

        this.spatialPartitionData = null;
        this.lastCellPositions = [];
        this.currentCellPositions = [];
        this.cellPositionsToRerender = [];
        this.lastRectangle = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };

        this.sort = (_entityA, _entityB) => {
            const entityA = _entityA;
            const entityB = _entityB;
            const zIndexAComponent = entityA.getComponent("z-index");
            const zIndexBComponent = entityB.getComponent("z-index");
            const zIndexA = zIndexAComponent != null ? zIndexAComponent.value : 0;
            const zIndexB = zIndexBComponent != null ? zIndexBComponent.value : 0;

            if (zIndexA < zIndexB) {
                return -1;
            } else if (zIndexA > zIndexB) {
                return 1;
            } else {
                return sort(entityA, entityB);
            }
        }

        this.compositor.addRasterizer(new BitmapRasterizer());
        this.compositor.addRasterizer(new LineRasterizer());
        this.compositor.addRasterizer(new ShapeRasterizer());
        this.compositor.addRasterizer(new TextRasterizer());
    }

    getCanvas(_column, _row) {
        return this.cellCanvases[`${_column}_${_row}`] || null;
    }

    clean() {
        for (let x = 0; x < this.lastCellPositions.length; x++) {
            const currentPosition = this.lastCellPositions[x];
            const index = this.currentCellPositions.findIndex((position) => {
                return currentPosition.column === position.column && currentPosition.row === position.row;
            });

            if (index === -1) {
                const canvas = this.getCanvas(currentPosition.column, currentPosition.row);

                if (canvas != null) {
                    this.canvasPool.release(canvas);
                }

                delete this.cellCanvases[`${currentPosition.column}_${currentPosition.row}`];
            }
        }

    }

    // This is to avoid memory chern.
    transferValuesFromArray1ToArray2(array1, array2) {
        array2.length = 0;

        for (let x = 0; x < array1.length; x++) {
            array2.push(array1[x]);
        }
    }

    findCellsToRerender() {
        const top = Math.floor(this.cameraRectangle.top / this.cellSize);
        const left = Math.floor(this.cameraRectangle.left / this.cellSize);
        const bottom = Math.ceil((this.cameraRectangle.bottom - 1) / this.cellSize);
        const right = Math.ceil((this.cameraRectangle.right - 1) / this.cellSize);

        this.cellPositionsToRerender.length = 0;
        this.currentCellPositions.length = 0;

        for (let y = top; y < bottom; y++) {
            for (let x = left; x < right; x++) {
                let canvas = this.getCanvas(x, y);
                const cellPosition = { column: x, row: y };

                this.currentCellPositions.push(cellPosition);

                if (this.cameraComponent.isDirty) {
                    this.cellPositionsToRerender.push(cellPosition);
                    continue;
                }

                if (canvas == null) {
                    this.cellPositionsToRerender.push(cellPosition);
                    continue;
                }

                // Check to see if any rasterizable entity needs to be redrawn.
                const entities = this.spatialPartitionData.grid.getBucket(cellPosition) || emtpyArray;

                for (let z = 0; z < entities.length; z++) {
                    const entity = entities[z];

                    if (this.compositor.isEntityDirty(entity)) {
                        this.cellPositionsToRerender.push(cellPosition);
                        break;
                    }

                }
            }
        }

        const dirtyCellPositions = this.spatialPartitionData.dirtyCellPositions;

        for (let key in dirtyCellPositions) {
            const cellPosition = dirtyCellPositions[key];
            const cellSize = this.cellSize;

            const top = cellPosition.row * cellSize;
            const left = cellPosition.column * cellSize;
            const right = left + cellSize;
            const bottom = top + cellSize;

            const intersectionTop = Math.max(top, this.cameraRectangle.top);
            const intersectionLeft = Math.max(left, this.cameraRectangle.left);
            const intersectionBottom = Math.min(bottom, this.cameraRectangle.bottom);
            const intersectionRight = Math.min(right, this.cameraRectangle.right);

            if (intersectionTop < intersectionBottom &&
                intersectionLeft < intersectionRight) {

                this.cellPositionsToRerender.push(cellPosition)
            }
        }

    }

    drawCellCanvases() {

        for (let x = 0; x < this.cellPositionsToRerender.length; x++) {
            const cellPosition = this.cellPositionsToRerender[x];
            const entities = this.spatialPartitionData.grid.getBucket(cellPosition);
            let canvas = this.getCanvas(cellPosition.column, cellPosition.row);

            if (canvas == null) {
                canvas = this.cellCanvases[`${cellPosition.column}_${cellPosition.row}`] = this.canvasPool.acquire();
            }

            this.cellRenderer.canvas = canvas;
            this.cellRenderer.context = canvas.getContext("2d");
            this.cellRenderer.entities = entities || emtpyArray;
            this.cellRenderer.rectangle.top = cellPosition.row;
            this.cellRenderer.rectangle.left = cellPosition.column;
            this.cellRenderer.rectangle.right = cellPosition.column + 1;
            this.cellRenderer.rectangle.bottom = cellPosition.row + 1;
            this.cellRenderer.render();
        }
    }

    transferToCanvas() {
        const cellCanvases = this.cellCanvases;
        const cellSize = this.cellSize;
        const context = this.canvas.getContext("2d");

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let key in cellCanvases) {
            const cellCanvas = cellCanvases[key];
            const parts = key.split("_");

            const top = parseInt(parts[1], 10) * cellSize;
            const left = parseInt(parts[0], 10) * cellSize;
            const right = left + cellSize;
            const bottom = top + cellSize;

            const intersectionTop = Math.max(top, this.cameraRectangle.top);
            const intersectionLeft = Math.max(left, this.cameraRectangle.left);
            const intersectionBottom = Math.min(bottom, this.cameraRectangle.bottom);
            const intersectionRight = Math.min(right, this.cameraRectangle.right);

            if (intersectionTop < intersectionBottom &&
                intersectionLeft < intersectionRight) {

                let sourceX = 0;
                let sourceY = 0;
                let destinationX = intersectionLeft - this.cameraRectangle.left;
                let destinationY = intersectionTop - this.cameraRectangle.top;
                const width = intersectionRight - intersectionLeft;
                const height = intersectionBottom - intersectionTop;

                if (width <= 0 || height <= 0) {
                    continue;
                }

                if (left < intersectionLeft) {
                    sourceX = intersectionLeft - left;
                }

                if (top < intersectionTop) {
                    sourceY = intersectionTop - top;
                }

                context.drawImage(
                    cellCanvas,
                    sourceX,
                    sourceY,
                    width,
                    height,
                    destinationX,
                    destinationY,
                    width,
                    height
                );
            }
        }
    }

    activated(world) {
        this.world = world;

        const entities = this.world.getEntities();
        for (let x = 0; x < entities.length; x++) {
            this.entityAdded(entities[x]);
        }

        this.world.addEntity(this.camera);
    }

    update() {
        if (this.spatialPartitionData != null) {
            this.findCellsToRerender();
            this.clean();
            this.drawCellCanvases();
            this.transferToCanvas();
            this.transferValuesFromArray1ToArray2(this.currentCellPositions, this.lastCellPositions);
            this.cameraComponent.isDirty = false;
        }
    }

    entityAdded(entity) {
        if (entity.type === "spatial-partition-service") {
            this.spatialPartitionData = entity.getComponent("spatial-partition-data");
            this.cellSize = this.spatialPartitionData.cellSize;
            this.cellRenderer.cellSize = this.spatialPartitionData.cellSize;
            this.cellRenderer.compositor = this.compositor;
            this.cellRenderer.sort = this.sort;
        }
    }

    entityRemoved(entity) {
        if (entity.type === "spatial-partition-service") {
            this.spatialPartitionData = null;
            this.cellSize = null;
            this.cellRenderer = null;
        }
    }

}