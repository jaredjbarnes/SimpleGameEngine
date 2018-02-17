import Entity from "../entities/DynamicLoadingCell";

class Cell {
    constructor({column, row, cellSize}) {
        this.rowIndex = row;
        this.columnIndex = column;
        this.entity = new Entity({ x: column * cellSize, y: row * cellSize }, cellSize);
        this.position = this.entity.getComponent("position");
        this.position.x = column * cellSize;
        this.position.y = row * cellSize;
    }
}

export default class DynamicLoadingSystem {
    constructor({ cellSize, cameraName } = { cellSize: 1000, cameraName: null }) {
        this.world = null;
        this.cameraName = cameraName;
        this.cells = [];
        this.cellPositions = [];
        this.cellSize = cellSize;
        this.camera = {
            position: null,
            size: null,
            collidable: null
        };

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                const row = y - 1;
                const column = x - 1;
                const index = (y * 3) + x;

                this.cellPositions.push({ columnIndex: column, rowIndex: row });
                this.cells.push(new Cell({column, row, cellSize}));
            }
        }

    }

    _addCamera(entity) {
        this.camera.position = entity.getComponent("position");
        this.camera.size = entity.getComponent("size");
        this.camera.collidable = entity.getComponent("collidable");
    }

    _findCellPositionsWithCenter(x, y) {
        const centerColumn = Math.floor(x / this.cellSize);
        const centerRow = Math.floor(y / this.cellSize);

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                const row = centerRow + y - 1;
                const column = centerColumn + x - 1;
                const index = (y * 3) + x;
                const cellPosition = this.cellPositions[index];

                cellPosition.rowIndex = row;
                cellPosition.columnIndex = column;
            }
        }
    }

    _isCamera(entity) {
        return (
            entity.hasComponents(["camera", "position", "size", "collidable"]) &&
            entity.getComponent("camera").name === this.cameraName
        );
    }

    _hasCamera() {
        return this.camera.position != null &&
            this.camera.size != null &&
            this.camera.collidable != null;
    }

    _removeCamera() {
        this.camera.position = null;
        this.camera.size = null;
        this.camera.collidable = null;
    }

    _reset() {
        this._removeCamera();
    }

    _updateCells() {
        const cameraCenterX = this.camera.position.x + (this.camera.size.width / 2);
        const cameraCenterY = this.camera.position.y + (this.camera.size.height / 2);

        this._findCellPositionsWithCenter(cameraCenterX, cameraCenterY);

        const availableCanvasCells = [];

        for (let x = 0; x < this.cells.length; x++) {
            let cell = this.cells[x];

            let index = this.cellPositions.findIndex((cellPosition) => {
                return cell.columnIndex === cellPosition.columnIndex &&
                    cell.rowIndex === cellPosition.rowIndex;
            });

            if (index === -1) {
                availableCanvasCells.push(cell);
            }
        }

        for (let x = 0; x < this.cellPositions.length; x++) {
            const cellPosition = this.cellPositions[x];

            let index = this.cells.findIndex((cell) => {
                return cell.columnIndex === cellPosition.columnIndex &&
                    cell.rowIndex === cellPosition.rowIndex;
            });

            if (index === -1) {
                const cell = availableCanvasCells.pop();
                cell.rowIndex = cellPosition.rowIndex;
                cell.columnIndex = cellPosition.columnIndex;

                cell.position.x = cellPosition.columnIndex * this.cellSize;
                cell.position.y = cellPosition.rowIndex * this.cellSize;
                cell.position.isDirty = true;
            }
        }
    }

    activated(world) {
        this.world = world;
        const entities = this.world.getEntities();

        entities.forEach((entity) => {
            this.entityAdded(entity);
        });

        for (let x = 0; x < this.cells.length; x++) {
            this.world.addEntity(this.cells[x].entity);
        }
    }

    componentAdded(entity, component) {
        if (this._isCamera(entity)) {
            this._addCamera(entity);
        }
    }

    componentRemoved(entity, component) {
        if (this._isCamera(entity)) {
            this._removeCamera();
        }
    }

    deactivated() {
        this._reset();
        for (let x = 0; x < this.cells.length; x++) {
            this.world.removeEntity(this.cells[x].entity);
        }
    }

    entityAdded(entity) {
        if (this._isCamera(entity)) {
            this._addCamera(entity);
        }
    }

    entityRemoved(entity) {
        if (this._isCamera(entity)) {
            this._removeCamera();
        }
    }

    update(currentTime) {
        if (this._hasCamera()) {
            this._updateCells();
        }
    }
}