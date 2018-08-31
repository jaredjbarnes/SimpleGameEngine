import Entity from "../entities/DynamicLoadingCell";

class Cell {
    constructor({ column, row, cellSize }) {
        this.row = row;
        this.column = column;
        this.entity = new Entity({ x: column * cellSize, y: row * cellSize }, cellSize);
        this.transform = this.entity.getComponent("transform");
        this.rectangle = this.entity.getComponent("rectangle");
        this.transform.position.x = column * cellSize;
        this.transform.position.y = row * cellSize;
        this.position = this.transform.position;
        this.rectangle = this.rectangle;
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
            rectangle: null,
            collider: null
        };

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                const row = y - 1;
                const column = x - 1;
                const index = (y * 3) + x;

                this.cellPositions.push({ column: column, row: row });
                this.cells.push(new Cell({ column, row, cellSize }));
            }
        }

    }

    _addCamera(entity) {
        const transform = entity.getComponent("transform");
        this.camera.rectangle = entity.getComponent("rectangle");
        this.camera.collider = entity.getComponent("rectangle-collider");
        this.camera.position = transform.position;
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

                cellPosition.row = row;
                cellPosition.column = column;
            }
        }
    }

    _isCamera(entity) {
        return (
            entity.hasComponents(["camera", "transform", "rectangle", "rectangle-collider"]) &&
            entity.getComponent("camera").name === this.cameraName
        );
    }

    _hasCamera() {
        return this.camera.position != null &&
            this.camera.rectangle != null &&
            this.camera.collider != null;
    }

    _removeCamera() {
        this.camera.position = null;
        this.camera.rectangle = null;
        this.camera.collider = null;
    }

    _reset() {
        this._removeCamera();
    }

    _updateCells() {
        const cameraCenterX = this.camera.position.x;
        const cameraCenterY = this.camera.position.y;

        this._findCellPositionsWithCenter(cameraCenterX, cameraCenterY);

        const availableCanvasCells = [];

        for (let x = 0; x < this.cells.length; x++) {
            let cell = this.cells[x];

            let index = this.cellPositions.findIndex((cellPosition) => {
                return cell.column === cellPosition.column &&
                    cell.row === cellPosition.row;
            });

            if (index === -1) {
                availableCanvasCells.push(cell);
            }
        }

        for (let x = 0; x < this.cellPositions.length; x++) {
            const cellPosition = this.cellPositions[x];

            let index = this.cells.findIndex((cell) => {
                return cell.column === cellPosition.column &&
                    cell.row === cellPosition.row;
            });

            if (index === -1) {
                const cell = availableCanvasCells.pop();
                cell.row = cellPosition.row;
                cell.column = cellPosition.column;

                cell.position.x = cellPosition.column * this.cellSize;
                cell.position.y = cellPosition.row * this.cellSize;
                cell.transform.isDirty = true;
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