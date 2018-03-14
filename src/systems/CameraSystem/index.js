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

class CanvasCell {
    constructor(cameraCanvasCellEntity, canvas) {
        this.transform = cameraCanvasCellEntity.getComponent("transform");
        this.rectangleCollider = cameraCanvasCellEntity.getComponent("rectangle-collider");
        this.entity = cameraCanvasCellEntity;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.canvas.width = this.transform.size.width;
        this.canvas.height = this.transform.size.height;
        this.isDirty = false;
    }
}

class Camera {
    constructor(cameraEntity, canvas) {
        this.transform = cameraEntity.getComponent("transform");
        this.rectangleCollider = cameraEntity.getComponent("rectangle-collider");
        this.entity = cameraEntity;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }
}

export default class CameraSystem {
    constructor({ canvas, cameraName, imageManager, canvasFactory, sort = idSort }) {
        this.canvas = canvas;
        this.imageManager = imageManager;
        this.cameraName = cameraName;
        this.canvasFactory = canvasFactory;
        this.broadPhaseCollisionData = null;
        this.cells = [];
        this.world = null;
        this.camera = null;
        this.drawImageCount = 0;
        this.renderableEntities = {};

        this.sort = (_entityA, _entityB) => {
            const entityA = this.world.getEntityById(_entityA.id);
            const entityB = this.world.getEntityById(_entityB.id);
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
        const imageManager = this.imageManager;

        for (let id in renderableEntities) {
            const entity = renderableEntities[id];
            imageManager.cleanEntity(entity);
        }
    }

    _getBroadPhaseCollisionCell({ rowIndex, columnIndex }) {
        let cell = this.broadPhaseCollisionData.grid[`${columnIndex}_${rowIndex}`];
        if (cell == null) {
            return [];
        }
        return cell;
    }

    _hasCamera() {
        return this.camera != null;
    }

    _isDynamicLoadingCellEntity(entity) {
        return entity.hasComponents(["dynamic-loading-cell", "transform", "rectangle-collider"])
    }

    _isBroadPhaseCollisionDataEntity(entity) {
        return entity.hasComponents(["broad-phase-collision-data"]);
    }

    _isCameraEntity(entity) {
        return entity.hasComponents(["camera", "transform", "rectangle-collider"]) && entity.getComponent("camera").name === this.cameraName;
    }

    _isCell(entity) {
        return this.cells.some(cell => {
            return cell.id === entity.id;
        });
    }

    _updateCell(_cell, _dirtyCellPositions) {
        const cell = _cell;
        const dirtyCellPositions = _dirtyCellPositions;
        const cellSize = this.broadPhaseCollisionData.cellSize;

        for (let x = 0; x < dirtyCellPositions.length; x++) {
            const dirtyCellPosition = dirtyCellPositions[x];
            const cellY = dirtyCellPosition.rowIndex * cellSize;
            const cellX = dirtyCellPosition.columnIndex * cellSize;

            const top = Math.max(cellY, cell.transform.boundingRect.top);
            const left = Math.max(cellX, cell.transform.boundingRect.left);
            const bottom = Math.min(cellY + cellSize, cell.transform.boundingRect.bottom);
            const right = Math.min(cellX + cellSize, cell.transform.boundingRect.right);

            if (top < bottom && left < right) {
                const entities = this._getBroadPhaseCollisionCell(dirtyCellPosition);
                entities.sort(this.sort);

                cell.context.clearRect(left - cell.transform.boundingRect.left, top - cell.transform.boundingRect.top, right - left, bottom - top);

                for (let y = 0; y < entities.length; y++) {
                    const collidableEntity = entities[y];
                    const entity = this.world.getEntityById(collidableEntity.id);
                    const opacity = entity.getComponent("opacity");
                    const rotation = collidableEntity.transform.rotation;

                    if (entity === null) {
                        continue;
                    }

                    const images = this.imageManager.getEntityImages(entity);

                    // If the entity isn't renderable then don't go on.
                    if (images.length === 0) {
                        continue;
                    }

                    this.renderableEntities[entity.id] = entity;

                    const intersectedTop = Math.max(top, collidableEntity.transform.boundingRect.top);
                    const intersectedLeft = Math.max(left, collidableEntity.transform.boundingRect.left);
                    const intersectedBottom = Math.min(bottom, collidableEntity.transform.boundingRect.bottom);
                    const intersectedRight = Math.min(right, collidableEntity.transform.boundingRect.right);

                    let sourceX = 0;
                    let sourceY = 0;
                    let width = intersectedRight - intersectedLeft;
                    let height = intersectedBottom - intersectedTop;
                    let destinationX = intersectedLeft - cell.transform.boundingRect.left;
                    let destinationY = intersectedTop - cell.transform.boundingRect.top;

                    if (width <= 0 || height <= 0) {
                        continue;
                    }

                    if (collidableEntity.transform.boundingRect.left < left) {
                        sourceX = left - collidableEntity.transform.boundingRect.left;
                    }

                    if (collidableEntity.transform.boundingRect.top < top) {
                        sourceY = top - collidableEntity.transform.boundingRect.top;
                    }

                    if (opacity != null) {
                        cell.context.globalAlpha = opacity.value;
                    }

                    for (let z = 0; z < images.length; z++) {
                        const image = images[z];

                        this.drawImageCount++;
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
        let dirtyCellPositions = this.broadPhaseCollisionData.dirtyCellPositions.slice();
        const renderableCells = {};
        let fullCellRenderCount = 0;

        for (let x = 0; x < dirtyCellPositions.length; x++) {
            const cellPosition = dirtyCellPositions[x];
            const collidableEntities = this._getBroadPhaseCollisionCell(cellPosition);

            for (let i = 0; i < collidableEntities.length; i++) {
                const collidableEntity = collidableEntities[i]
                const id = collidableEntity.id;
                const rectangleCollider = collidableEntity.collidable;
                const entity = this.world.getEntityById(id);
                const cellPositions = collidable.cellPositions;
                const lastCellPositions = collidable.lastCellPositions;

                if (entity == null) {
                    return;
                }

                const transform = entity.getComponent("transform");

                if (this.imageManager.isRenderable(entity) && (transform.isDirty)) {
                    for (let c = 0; c < cellPositions.length; c++) {
                        const cellPosition = cellPositions[c];
                        renderableCells[`${cellPosition.columnIndex}_${cellPosition.rowIndex}`] = cellPosition;
                    }

                    for (let c = 0; c < lastCellPositions.length; c++) {
                        const cellPosition = lastCellPositions[c];
                        renderableCells[`${cellPosition.columnIndex}_${cellPosition.rowIndex}`] = cellPosition;
                    }
                }
            }
        }

        for (let x = 0; x < this.cells.length; x++) {
            const cell = this.cells[x];
            const collisions = cell.collidable.collisions;
            const cellPositions = cell.collidable.cellPositions;

            if (cell.transform.isDirty || cell.isDirty) {

                if (fullCellRenderCount === 0) {
                    fullCellRenderCount++;
                    cell.isDirty = false;

                    for (let c = 0; c < cellPositions.length; c++) {
                        const cellPosition = cellPositions[c];
                        renderableCells[`${cellPosition.columnIndex}_${cellPosition.rowIndex}`] = cellPosition;
                    }

                } else {
                    cell.isDirty = true;
                }

            }

            // Find dirty entities with in the loading area that need updating.
            for (let y in collisions) {
                const entity = this.world.getEntityById(y);

                if (entity == null) {
                    continue;
                }

                const isDirty = this.imageManager.isEntityDirty(entity);
                if (isDirty) {
                    const entityCellPositions = entity.getComponent("rectangle-collider").cellPositions;
                    for (let z = 0; z < entityCellPositions.length; z++) {
                        const cellPosition = entityCellPositions[z];
                        renderableCells[`${cellPosition.columnIndex}_${cellPosition.rowIndex}`] = cellPosition;
                    }
                }
            }

            dirtyCellPositions = Object.keys(renderableCells).map(key => renderableCells[key]);

            this._updateCell(this.cells[x], dirtyCellPositions);
        }
    }

    _transferToCanvas() {
        const canvas = this.canvas;

        canvas.width = this.camera.transform.size.width;
        canvas.height = this.camera.transform.size.height;

        for (let x = 0; x < this.cells.length; x++) {
            const cell = this.cells[x];
            const top = Math.max(cell.transform.position.y, this.camera.transform.position.y);
            const left = Math.max(cell.transform.position.x, this.camera.transform.position.x);
            const bottom = Math.min(cell.transform.position.y + cell.transform.size.height, this.camera.transform.position.y + this.camera.transform.size.height);
            const right = Math.min(cell.transform.position.x + cell.transform.size.width, this.camera.transform.position.x + this.camera.transform.size.width);

            if (top < bottom && left < right) {

                let sourceX = 0;
                let sourceY = 0;
                const sourceWidth = right - left;
                const sourceHeight = bottom - top;
                const destinationX = left - this.camera.transform.position.x;
                const destinationY = top - this.camera.transform.position.y;
                const destinationWidth = right - left;
                const destinationHeight = bottom - top;

                if (cell.transform.position.x < this.camera.transform.position.x) {
                    sourceX = this.camera.transform.position.x - cell.transform.position.x;
                }

                if (cell.transform.position.y < this.camera.transform.position.y) {
                    sourceY = this.camera.transform.position.y - cell.transform.position.y;
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

        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (component.type === "broad-phase-collision-data") {
            this.broadPhaseCollisionData = null;
        } else if (this.cameraCanvasCellEntities.indexOf(entity) > -1) {
            const index = this.cameraCanvasCellEntities.indexOf(entity) > -1;
            this.cameraCanvasCellEntities.splice(index, 1);
        }
    }

    deactivated(world) {

    }

    entityAdded(entity) {
        if (this._isBroadPhaseCollisionDataEntity(entity)) {
            this.broadPhaseCollisionData = entity.getComponent("broad-phase-collision-data");
        } else if (this._isDynamicLoadingCellEntity(entity)) {
            this.cells.push(new CanvasCell(entity, this.canvasFactory.create()));
        } else if (this._isCameraEntity(entity)) {
            this.camera = new Camera(entity, this.canvasFactory.create());
        }
    }

    entityRemoved(entity) {
        if (this._isBroadPhaseCollisionDataEntity(entity)) {
            this.broadPhaseCollisionData = null;
        } else if (this._isDynamicLoadingCellEntity(entity)) {
            throw new Error("The Camera cannot run without dynamic loading cells.");
        }
    }

    update(currentTime) {
        this.drawImageCount = 0;
        if (this._hasCamera()) {
            this.renderableEntities = {};

            this._updateCells();
            this._transferToCanvas();
            this._cleanEntities();
        }
        //console.log(this.drawImageCount);
    }
}