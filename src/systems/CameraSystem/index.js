import CanvasPool from "./CanvasPool";
import CellRenderer from "./CellRenderer";

const idSort = (_entityA, _entityB) => {
    const entityA = _entityA;
    const entityB = _entityB;

    if (entityA.id < entityB.id) {
        return -1
    } else if (entityA.id > entityB.id) {
        return 1;
    } else {
        return 0;
    }
};

export default class CameraSystem {
    constructor({
        cameraName,
        canvas,
        canvasFactory,
        compositor,
        sort = idSort
    }) {
        this.canvas = canvas;
        this.cameraName = cameraName;
        this.compositor = compositor;
        this.canvasPool = new CanvasPool(canvasFactory);
        this.cellRenderer = new CellRenderer();
        this.cellCanvases = {};
        this.cellSize = null;
        this.cameraRectangle = null;
        this.spatialPartitionService = null;
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
    }

    getCanvas(_column, _row) {
        return this.cellCanvases[`${_column}_${_row}`] || null;
    }

    releaseCellCanvasesAndSaveLastRectangle() {
        const cellSize = this.spatialPartitionService.cellSize;
        const cameraRectangle = this.cameraRectangle;

        const top = Math.floor(cameraRectangle.top / cellSize);
        const left = Math.floor(cameraRectangle.left / cellSize);
        const bottom = Math.ceil((cameraRectangle.bottom / cellSize) + 1);
        const right = Math.ceil((cameraRectangle.right / cellSize) + 1);

        for (let y = this.lastRectangle.top; y < this.lastRectangle.bottom; y++) {
            for (let x = this.lastRectangle.left; x < this.lastRectangle.right; x++) {

                const intersectionTop = Math.max(y, top);
                const intersectionLeft = Math.max(x, left);
                const intersectionBottom = Math.min(y, bottom);
                const intersectionRight = Math.min(x, right);

                if (!(intersectionTop < intersectionBottom && intersectionLeft < intersectionRight)) {
                    const canvas = this.getCanvas(x, y);

                    if (canvas != null) {
                        this.canvasPool.release(canvas);
                    }

                    delete this.cellCanvases[`${x}_${y}`]
                }
            }
        }

        this.lastRectangle.top = top;
        this.lastRectangle.left = left;
        this.lastRectangle.bottom = bottom;
        this.lastRectangle.right = right;
    }

    drawToNewCellCanvases() {
        for (let y = this.lastRectangle.top; y <= this.lastRectangle.bottom; y++) {
            for (let x = this.lastRectangle.left; x <= this.lastRectangle.right; x++) {
                let canvas = this.getCanvas(x, y);

                if (canvas != null) {
                    continue;
                }

                canvas = this.cellCanvases[`${x}_${y}`] = this.canvasPool.acquire();

                canvas.width = this.cellSize;
                canvas.height = this.cellSize;

                const entities = this.spatialPartitionService.grid.getBucket({
                    column: x,
                    row: y
                });

                this.cellRenderer.canvas = canvas;
                this.cellRenderer.context = canvas.getContext("2d");
                this.cellRenderer.entities = entities;
                this.cellRenderer.rectangle.top = y;
                this.cellRenderer.rectangle.left = x;
                this.cellRenderer.rectangle.right = x + 1;
                this.cellRenderer.rectangle.bottom = y + 1;

                this.cellRenderer.render();
            }
        }
    }

    refreshDirtyCellCanvases() {
        const dirtyCellPositions = this.spatialPartitionService.dirtyCellPositions;

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

                const entities = this.spatialPartitionService.grid.getBucket(cellPosition);
                let canvas = this.getCanvas(cellPosition.column, cellPosition.row);

                if (canvas == null) {
                    canvas = this.cellCanvases[`${cellPosition.column}_${cellPosition.row}`] = this.canvasPool.acquire();
                }

                this.cellRenderer.canvas = canvas;
                this.cellRenderer.context = canvas.getContext("2d");
                this.cellRenderer.entities = entities;
                this.cellRenderer.rectangle.top = cellPosition.row;
                this.cellRenderer.rectangle.left = cellPosition.column;
                this.cellRenderer.rectangle.right = cellPosition.column + 1;
                this.cellRenderer.rectangle.bottom = cellPosition.row + 1;
                this.cellRenderer.render();
            }
        }
    }

    isCameraEntity(entity) {
        return entity.hasComponents(["camera", "transform", "rectangle"]) &&
            entity.getComponent("camera").name === this.cameraName;
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

        const services = this.world.getServices();
        for (let name in services) {
            this.serviceAdded(name, services[name]);
        }
    }

    update() {
        if (this.spatialPartitionService != null) {
            this.releaseCellCanvasesAndSaveLastRectangle();
            this.drawToNewCellCanvases();
            this.refreshDirtyCellCanvases();
            this.transferToCanvas();
        }
    }

    entityAdded(entity) {
        if (this.isCameraEntity(entity)) {
            this.camera = entity;
            this.cameraRectangle = this.camera.getComponent("rectangle");
            this.canvas.width = this.cameraRectangle.width;
            this.canvas.height = this.cameraRectangle.height;
        }
    }

    entityRemoved(entity) {

    }

    serviceAdded(name, service) {
        if (name === "spatial-partition-service") {
            this.spatialPartitionService = service;
            this.cellSize = service.cellSize;
            this.cellRenderer.cellSize = service.cellSize;
            this.cellRenderer.compositor = this.compositor;
            this.cellRenderer.sort = this.sort;
        }
    }

    serviceRemoved(name, service) {
        if (name === "spatial-partition-service") {
            this.spatialPartitionService = null;
            this.cellSize = null;
            this.cellRenderer = null;
        }
    }
}