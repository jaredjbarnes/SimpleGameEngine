import EntityCompositer from "./rendering/EntityCompositer";

class CanvasCell {
    constructor(cameraCanvasCellEntity, canvas) {
        this.position = cameraCanvasCellEntity.getComponent("position");
        this.size = cameraCanvasCellEntity.getComponent("size");
        this.collidable = cameraCanvasCellEntity.getComponent("collidable");
        this.entity = cameraCanvasCellEntity;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }
}

class Camera {
    constructor(cameraEntity, canvas) {
        this.position = cameraEntity.getComponent("position");
        this.size = cameraEntity.getComponent("size");
        this.collidable = cameraEntity.getComponent("collidable");
        this.entity = cameraEntity;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }
}

export default class CameraSystem {
    constructor({ canvas, cameraName, imageManager, canvasFactory }) {
        this.canvas = canvas;
        this.imageManager = imageManager;
        this.cameraName = cameraName;
        this.canvasFactory = canvasFactory;
        this.broadPhaseCollisionData = null;
        this.cells = [];
        this.world = null;
        this.camera = null;
    }

    _getBroadPhaseCollisionCell({ rowIndex, columnIndex }) {
        let column = this.broadPhaseCollisionData.grid.get(columnIndex);
        if (column == null) {
            return [];
        }

        let cell = column.get(rowIndex);
        if (cell == null) {
            return []
        }

        return cell;
    }

    _hasCamera() {
        return this.camera != null;
    }

    _isCameraCanvasCellEntity(entity) {
        return entity.hasComponents(["camera-canvas-cell", "position", "size", "collidable"])
    }

    _isBroadPhaseCollisionDataEntity(entity) {
        return entity.hasComponents(["broad-phase-collision-data"]);
    }

    _isCameraEntity(entity) {
        return entity.hasComponents(["camera", "position", "size", "collidable"]) && entity.getComponent("camera").name === this.cameraName;
    }

    _updateCell(_cell) {
        const cell = _cell;
        const dirtyCellPositions = this.broadPhaseCollisionData.dirtyCellPositions;
        const cellSize = this.broadPhaseCollisionData.cellSize;

        for (let x = 0; x < dirtyCellPositions.length; x++) {
            const dirtyCellPosition = dirtyCellPositions[x];
            const top = Math.max(dirtyCellPosition.rowIndex * cellSize, cell.position.y);
            const left = Math.max(dirtyCellPosition.columnIndex * cellSize, cell.position.x);
            const bottom = Math.min((dirtyCellPosition.rowIndex * cellSize) + cellSize, cell.position.y + cell.size.height);
            const right = Math.min((dirtyCellPosition.columnIndex * cellSize) + cellSize, cell.position.x + cell.size.width);

            if (top < bottom && left < right) {
                const normalizedTop = top - cell.position.y;
                const normalizedLeft = left - cell.position.x;
                const normaizedBottom = bottom - cell.position.y;
                const normalizedRight = right - cell.position.x;
                const entities = this._getBroadPhaseCollisionCell(dirtyCellPosition);

                cell.context.clearRect(left, top, right - left, bottom - top);

                for (let y = 0; y < entities.length; y++) {
                    const collidableEntity = entities[y];

                    const intersectedTop = Math.max(normalizedTop, collidableEntity.position.top);
                    const intersectedLeft = Math.max(normalizedLeft, collidableEntity.position.left);
                    const intersectedBottom = Math.min(normalizedBottom, collidableEntity.position.top + collidableEntity.size.height);
                    const intersectedRight = Math.min(normalizedRight, collidableEntity.position.left + collidable.size.width);

                    let sourceX = 0;
                    let sourceY = 0;
                    let sourceWidth = intersectedRight - intersectedLeft;
                    let sourceHeight = intersectedBottom - intersectedTop;
                    let destinationX = intersectedLeft;
                    let destinationY = intersectedTop;
                    let destinationWidth = intersectedRight - intersectedLeft;
                    let destinationHeight = intersectedBottom - intersectedTop;

                    if (intersectedLeft !== collidableEntity.position.x) {
                        sourceX = collidableEntity.size.width - sourceWidth;
                    }

                    if (intersectedTop !== collidableEntity.position.y) {
                        sourceY = collidableEntity.size.height - sourceHeight;
                    }

                    const images = this.imageManager.getEntityImages(this.world.getEntityById(collidableEntity.id));
                    for (let z = 0; z < images.length; z++) {
                        const image = images[z];

                        cell.context.drawImage(
                            image,
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
        }
    }

    _updateCells() {
        for (let x = 0; x < this.cells.length; x++) {
            this._updateCell(this.cells[x]);
        }
    }

    _transferToCanvas() {
        for (let x = 0; x < this.cells.length; x++) {
            const cell = this.cells[x];
            const top = Math.max(cell.position.y, this.camera.position.y);
            const left = Math.max(cell.position.x, this.camera.position.x);
            const bottom = Math.max(cell.position.y + cell.size.height, this.camera.position.y + this.camera.size.height);
            const right = Math.max(cell.position.x + cell.size.width, this.camera.position.y + this.camera.size.height);

            if (top < bottom && left < right) {
                const destinationX = left - this.camera.position.left;
                const destinationY = top - this.camera.position.top;
                const destinationWidth = right - this.camera.position.left - destinationX;
                const destinationHeight = bottom - this.camera.position.top - destinationY;

                const sourceX = 0;
                const sourceY = 0;
                const sourceWidth = destinationWidth;
                const sourceHeight = destinationHeight;

                if (left !== cell.position.x) {
                    sourceX = cell.size.width - (right - left);
                }

                if (top !== cell.position.y) {
                    sourceY = cell.size.height - (bottom - top);
                }

                const context = canvas.getContext("2d");

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
        } else if (this._isCameraCanvasCellEntity(entity)) {
            this.cells.push(new CanvasCell(entity, this.canvasFactory.create()));
        } else if (this._isCameraEntity(entity)) {
            this.camera = new Camera(entity);
        }
    }

    entityRemoved(entity) {
        if (this._isBroadPhaseCollisionDataEntity(entity)) {
            this.broadPhaseCollisionData = null;
        } else if (this._isCameraCanvasCellEntity(entity)) {

        }
    }

    update(currentTime) {
        if (this._hasCamera()) {
            this._updateCells();
            //updateDirtyImages.
        }
    }
}