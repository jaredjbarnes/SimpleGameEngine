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

window.dynamicLoadingCellMoves = 0;
window.drawCells = 0;

class CanvasCell {
    constructor(cameraCanvasCellEntity, canvas) {
        this.transform = cameraCanvasCellEntity.getComponent("transform");
        this.rectangleCollider = cameraCanvasCellEntity.getComponent("rectangle-collider");
        this.rectangle = cameraCanvasCellEntity.getComponent("rectangle");
        this.entity = cameraCanvasCellEntity;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.canvas.width = this.rectangle.width;
        this.canvas.height = this.rectangle.height;
        this.isDirty = false;
    }
}

class Camera {
    constructor(cameraEntity, canvas) {
        this.transform = cameraEntity.getComponent("transform");
        this.rectangleCollider = cameraEntity.getComponent("rectangle-collider");
        this.rectangle = cameraEntity.getComponent("rectangle");
        this.entity = cameraEntity;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }
}

export default class CameraSystem {
    constructor({ canvas, cameraName, compositor, canvasFactory, sort = idSort }) {
        this.canvas = canvas;
        this.compositor = compositor;
        this.cameraName = cameraName;
        this.canvasFactory = canvasFactory;
        this.spatialPartitionService = null;
        this.cells = [];
        this.world = null;
        this.camera = null;
        this.drawImageCount = 0;
        this.renderableEntities = {};

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

    _cleanEntities() {
        const renderableEntities = this.renderableEntities;
        const compositor = this.compositor;

        for (let id in renderableEntities) {
            const entity = renderableEntities[id];
            compositor.cleanEntity(entity);
        }
    }

    _hasCamera() {
        return this.camera != null;
    }

    _isDynamicLoadingCellEntity(entity) {
        return entity.hasComponents(["dynamic-loading-cell", "transform", "rectangle-collider"])
    }

    _isCameraEntity(entity) {
        return entity.hasComponents(["camera", "transform", "rectangle-collider"]) &&
            entity.getComponent("camera").name === this.cameraName;
    }

    _isCell(entity) {
        return this.cells.some(cell => {
            return cell.id === entity.id;
        });
    }

    _isReady() {
        return this.spatialPartitionService != null && this._hasCamera();
    }

    _updateCell(_cell, _dirtyCellPositions) {
        const cell = _cell;
        const dirtyCellPositions = _dirtyCellPositions;
        const cellSize = this.spatialPartitionService.cellSize;

        for (let key in _dirtyCellPositions) {
            const dirtyCellPosition = dirtyCellPositions[key];
            const cellY = dirtyCellPosition.row * cellSize;
            const cellX = dirtyCellPosition.column * cellSize;

            const top = Math.max(cellY, cell.rectangle.top);
            const left = Math.max(cellX, cell.rectangle.left);
            const bottom = Math.min(cellY + cellSize, cell.rectangle.bottom);
            const right = Math.min(cellX + cellSize, cell.rectangle.right);

            if (top < bottom && left < right) {
                const entities = this.spatialPartitionService.grid.getBucket(dirtyCellPosition);
                entities.sort(this.sort);

                cell.context.clearRect(
                    left - cell.rectangle.left,
                    top - cell.rectangle.top,
                    right - left,
                    bottom - top
                );

                for (let y = 0; y < entities.length; y++) {
                    const entity = entities[y];
                    const opacity = entity.getComponent("opacity");
                    const rectangle = entity.getComponent("rectangle");
                    const images = this.compositor.getEntityImages(entity);

                    // If the entity isn't renderable then don't go on.
                    if (images.length === 0) {
                        continue;
                    }

                    this.renderableEntities[entity.id] = entity;

                    const intersectedTop = Math.max(top, rectangle.top);
                    const intersectedLeft = Math.max(left, rectangle.left);
                    const intersectedBottom = Math.min(bottom, rectangle.bottom);
                    const intersectedRight = Math.min(right, rectangle.right);

                    let sourceX = 0;
                    let sourceY = 0;
                    let width = intersectedRight - intersectedLeft;
                    let height = intersectedBottom - intersectedTop;
                    let destinationX = intersectedLeft - cell.rectangle.left;
                    let destinationY = intersectedTop - cell.rectangle.top;

                    if (width <= 0 || height <= 0) {
                        continue;
                    }

                    if (rectangle.left < left) {
                        sourceX = left - rectangle.left;
                    }

                    if (rectangle.top < top) {
                        sourceY = top - rectangle.top;
                    }

                    if (opacity != null) {
                        cell.context.globalAlpha = opacity.value;
                    }

                    for (let z = 0; z < images.length; z++) {
                        const image = images[z];

                        this.drawImageCount++;
                        window.drawCells = this.drawImageCount;
                        cell.context.drawImage(
                            image,
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

                    if (opacity != null) {
                        cell.context.globalAlpha = 1;
                    }

                }
            }
        }
    }

    _updateCells() {
        const dirtyCells = this.spatialPartitionService.dirtyCellPositions;
        const grid = this.spatialPartitionService.grid;
        const renderableCells = {};

        for (let key in dirtyCells) {
            const cellPosition = dirtyCells[key];
            const entities = grid.getBucket(cellPosition);

            for (let i = 0; i < entities.length; i++) {
                const entity = entities[i]
                const spatialPartition = entity.getComponent("spatial-partition");
                const cellPositions = spatialPartition.cellPositions;
                const lastCellPositions = spatialPartition.lastCellPositions;

                if (this.compositor.isRenderable(entity)) {
                    for (let c = 0; c < cellPositions.length; c++) {
                        const cellPosition = cellPositions[c];
                        renderableCells[`${cellPosition.column}_${cellPosition.row}`] = cellPosition;
                    }

                    for (let c = 0; c < lastCellPositions.length; c++) {
                        const cellPosition = lastCellPositions[c];
                        renderableCells[`${cellPosition.column}_${cellPosition.row}`] = cellPosition;
                    }
                }
            }
        }

        for (let x = 0; x < this.cells.length; x++) {
            const cell = this.cells[x];
            const collisions = cell.rectangleCollider.collisions;
            const spatialPartition = cell.entity.getComponent("spatial-partition");
            const cellPositions = spatialPartition.cellPositions;

            if (cell.transform.isDirty) {
                window.dynamicLoadingCellMoves++;
                for (let c = 0; c < cellPositions.length; c++) {
                    const cellPosition = cellPositions[c];
                    renderableCells[`${cellPosition.column}_${cellPosition.row}`] = cellPosition;
                }
            }

            // Find dirty entities with in the loading area that need updating.
            for (let y in collisions) {
                const entity = this.world.getEntityById(y);

                if (entity == null) {
                    continue;
                }

                const isDirty = this.compositor.isEntityDirty(entity);
                if (isDirty) {

                    const spatialPartition = cell.entity.getComponent("spatial-partition");
                    const cellPositions = spatialPartition.cellPositions;

                    for (let z = 0; z < cellPositions.length; z++) {
                        const cellPosition = cellPositions[z];
                        renderableCells[`${cellPosition.column}_${cellPosition.row}`] = cellPosition;
                    }
                }
            }

            this._updateCell(this.cells[x], renderableCells);
        }
    }

    _transferToCanvas() {
        const canvas = this.canvas;

        canvas.width = this.camera.rectangle.width;
        canvas.height = this.camera.rectangle.height;

        for (let x = 0; x < this.cells.length; x++) {
            const cell = this.cells[x];
            const top = Math.max(cell.rectangle.top, this.camera.rectangle.top);
            const left = Math.max(cell.rectangle.left, this.camera.rectangle.left);
            const bottom = Math.min(cell.rectangle.bottom, this.camera.rectangle.bottom);
            const right = Math.min(cell.rectangle.right, this.camera.rectangle.right);

            if (top < bottom && left < right) {

                let sourceX = 0;
                let sourceY = 0;
                const sourceWidth = right - left;
                const sourceHeight = bottom - top;
                const destinationX = left - this.camera.rectangle.left;
                const destinationY = top - this.camera.rectangle.top;
                const destinationWidth = right - left;
                const destinationHeight = bottom - top;

                if (cell.rectangle.left < this.camera.rectangle.left) {
                    sourceX = this.camera.rectangle.left - cell.rectangle.left;
                }

                if (cell.rectangle.top < this.camera.rectangle.top) {
                    sourceY = this.camera.rectangle.top - cell.rectangle.top;
                }

                const context = canvas.getContext("2d");

                this.drawImageCount++;
                context.drawImage(
                    cell.canvas,
                    sourceX,
                    sourceY,
                    sourceWidth,
                    sourceHeight,
                    destinationX,
                    destinationY,
                    destinationWidth,
                    destinationHeight
                );
            }
        }
    }

    activated(world) {
        this.world = world;

        const entities = this.world.getEntities();
        for (let x = 0; x < entities.length; x++) {
            const entity = entities[x];
            this.entityAdded(entity);
        }

        const services = this.world.getServices();
        for (let name in services) {
            this.serviceAdded(name, services[name]);
        }
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (this.cameraCanvasCellEntities.indexOf(entity) > -1) {
            const index = this.cameraCanvasCellEntities.indexOf(entity) > -1;
            this.cameraCanvasCellEntities.splice(index, 1);
        }
    }

    deactivated() {
        this.spatialPartitionService = null;
        this.cells = [];
        this.world = null;
        this.camera = null;
        this.drawImageCount = 0;
        this.renderableEntities = {};
    }

    entityAdded(entity) {
        if (this._isDynamicLoadingCellEntity(entity)) {
            const index = this.cells.findIndex((cell) => {
                return cell.entity === entity;
            });

            if (index === -1) {
                this.cells.push(new CanvasCell(entity, this.canvasFactory.create()));
            }

        } else if (this._isCameraEntity(entity)) {
            this.camera = new Camera(entity, this.canvasFactory.create());
        }
    }

    entityRemoved(entity) {
        if (this._isDynamicLoadingCellEntity(entity)) {
            throw new Error("The Camera cannot run without dynamic loading cells.");
        }
    }

    serviceAdded(name, service) {
        if (name === "spatial-partition-service") {
            this.spatialPartitionService = service;
        }
    }

    serviceRemoved(name, service) {
        if (name === "spatial-partition-service") {
            this.spatialPartitionService = null;
        }
    }

    update(currentTime) {
        this.drawImageCount = 0;
        if (this._isReady()) {
            this.renderableEntities = {};

            this._updateCells();
            this._transferToCanvas();
            this._cleanEntities();
        }
        
    }
}