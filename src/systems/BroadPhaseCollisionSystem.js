class CellPosition {
    constructor(columnIndex, rowIndex) {
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
    }
}

class Collision {
    constructor(entityId) {
        this.entityId = entityId;
        this.timestamp = 0;
    }
}

class CollidableEntity {
    constructor(entityId) {
        this.id = entityId;
        this.size = null;
        this.position = null;
        this.collidable = null;
    }
}

export default class BroadPhaseCollisionSystem {
    constructor(cellSize = 200) {
        this.cellSize = cellSize;
        this.collidableEntities = new Map();
        this.cellPositionsOfEntitiesById = new Map();
        this.world = null;
        this.currentTime = 0;
        this.grid = new Map();
        this.dirtyCellPositions = [];
        this.dependencies = ["position", "size", "collidable"];
        this.name = "Broad Phase Collision System"
    }

    addEntityToCellPosition(_collidableEntity, _cellPosition) {
        const collidableEntity = _collidableEntity;
        const cellPosition = _cellPosition;
        const cell = this.getCell(cellPosition);
        const index = cell.indexOf(collidableEntity);

        if (index === -1) {
            cell.push(collidableEntity);
        }
    }

    addEntityToCellPositions(_collidableEntity, _cellPositions) {
        const collidableEntity = _collidableEntity;
        const cellPositions = _cellPositions;

        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            this.addEntityToCellPosition(collidableEntity, cellPosition);
        }
    }

    addCellPositionsToDirtyCellPositions(_cellPositions) {
        const cellPositions = _cellPositions;

        let filteredCellPositions = cellPositions.filter((cellPosition) => {
            return this.dirtyCellPositions.findIndex(dirtyCell => {
                return dirtyCell.columnIndex === cellPosition.columnIndex && dirtyCell.rowIndex === cellPosition.rowIndex
            });
        });

        this.dirtyCellPositions = this.dirtyCellPositions.concat(filteredCellPositions);
    }

    doEntitiesIntersect({ position: positionA, size: sizeA }, { position: positionB, size: sizeB }) {
        const top = Math.max(positionA.y, positionB.y);
        const bottom = Math.min(positionA.y + sizeA.height, positionB.y + sizeB.height);
        const left = Math.max(positionA.x, positionB.x);
        const right = Math.min(positionA.x + sizeA.width, positionB.x + sizeB.width);

        return top < bottom && left < right;
    }

    except(cellPositionsA, cellPositionsB) {
        const first = cellPositionsA.filter((cellPosition) => {
            const index = cellPositionsB.findIndex((c) => {
                return c.rowIndex === cellPosition.rowIndex &&
                    c.columnIndex === cellPosition.columnIndex
            });

            return index === -1;
        });

        const second = cellPositionsB.filter((cellPosition) => {
            const index = cellPositionsA.findIndex((c) => {
                return c.rowIndex === cellPosition.rowIndex &&
                    c.columnIndex === cellPosition.columnIndex
            });

            return index === -1;
        });

        return first.concat(second);
    }

    findDirtyCells() {
        const dirtyEntities = [];
        const collidableEntities = this.collidableEntities;

        for (let x = 0; x < collidableEntities; x++) {
            const collidableEntity = collidableEntities[x];
            const size = collidableEntity.size;
            const position = collidableEntity.position;

            if (position.isDirty || size.isDirty) {
                dirtyEntities.push(collidableEntity);
            }
        }

        for (let x = 0; x < dirtyEntities.length; x++) {
            const dirtyEntity = dirtyEntities[x];
            let lastCellPositions = this.cellPositionsOfEntitiesById[dirtyEntity.id] || [];
            let newCellPositions = this.getCellPositions(dirtyEntity);

            const dirtyCellPositions = this.except(newCellPositions, lastCellPositions);
            this.addCellPositionsToDirtyCellPositions(dirtyCellPositions);

            this.cellPositionsOfEntitiesById[dirtyEntity.id] = newCellPositions;
        }
    }

    areCellsEqual(cellA, cellB) {
        return cellA.rowIndex === cellB.rowIndex && cellA.columnIndex === cellB.columnIndex;
    }

    getCell({ rowIndex, columnIndex }) {
        let column = this.grid.get(columnIndex);
        if (column == null) {
            column = new Map();
            this.grid.set(columnIndex, column);
        }

        let cell = column.get(rowIndex);
        if (cell == null) {
            cell = [];
            column.set(rowIndex, cell);
        }

        return cell;
    }

    getCellId({ rowIndex, columnIndex }) {
        return `${columnIndex}_${rowIndex}`;
    }

    getCellPositions({ position, size }) {
        const top = position.y;
        const left = position.x;
        const right = left + size.width;
        const bottom = top + size.height;
        const cellSize = this.cellSize;

        const topCell = Math.floor(top / cellSize);
        const bottomCell = Math.floor(bottom / cellSize);
        const leftCell = Math.floor(left / cellSize);
        const rightCell = Math.floor(right / cellSize);

        let row = topCell;
        let column = leftCell;

        let cellPositions = [];

        while (row <= bottomCell) {
            while (column <= rightCell) {
                cellPositions.push(new CellPosition(column, row));
                column += 1;
            }
            column = leftCell;
            row += 1;
        }

        return cellPositions;
    }

    getCollisionByEntityId(collisions, id) {
        return collisions.find((collision) => collision.entityId === id);
    }

    removeCollision(collisions, entityId) {
        const index = collisions.findIndex((collision) => collision.entityId === entityId);

        if (index > -1) {
            collisions.splice(index, 1);
        }
    }

    removeEntityFromCellPositions(_collidableEntity, _cellPositions) {
        const collidableEntity = _collidableEntity;
        const cellPositions = _cellPositions;

        this.addCellPositionsToDirtyCellPositions(cellPositions);

        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            const cell = this.getCell(cellPosition);

            if (cell != null) {
                const index = cell.findIndex((e) => { e === collidableEntity });

                if (index > -1) {
                    cell.splice(index, 1);
                }
            }
        }

    }

    updateGridCells(_cellPositions) {
        const cellPositions = _cellPositions;

        for (let index = 0; index < cellPositions.length; index++) {
            const cellPosition = cellPositions[index];
            const originalCell = this.getCell(cellPosition);
            const cell = originalCell.slice(0);

            // Remove all entities.
            originalCell.length = 0;

            // Remove all collision data from the entities.
            for (let x = 0; x < cell.length; x++) {
                const collidable = cell[x].collidable;
                collidable.cells[this.getCellId(cellPosition)] = [];
            }

            // Add collision data to the entities.
            for (let y = 0; y < cell.length; y++) {
                const collidableEntity = cell[y];
                const collisions = collidableEntity.collidable.cells[this.getCellId(cellPosition)];
                const index = y;

                for (let x = index + 1; x < cell.length; x++) {
                    const otherCollidableEntity = cell[x];
                    const otherCollisions = otherCollidableEntity.collidable.cells[this.getCellId(cellPosition)];

                    if (this.doEntitiesIntersect(collidableEntity, otherCollidableEntity)) {

                        const collision = new Collision(collidableEntity.id);
                        collision.cellPosition = cellPosition;
                        collision.timestamp = this.currentTime;
                        otherCollisions.push(collision);

                        const otherCollision = new Collision(otherCollidableEntity.id);
                        otherCollision.cellPosition = cellPosition;
                        otherCollision.timestamp = this.currentTime;
                        collisions.push(otherCollision);

                        this.addEntityToCellPosition(collidableEntity, cellPosition);
                        this.addEntityToCellPosition(otherCollidableEntity, cellPosition);
                    }
                }

            }
        }

    }

    activated(_world) {
        const world = _world;
        this.world = world

        world.getEntities().forEach((_entity) => {
            const entity = _entity;
            this.entityAdded(entity)
        });
    }

    entityAdded(_entity) {
        const entity = _entity;
        if (entity.hasComponents(this.dependencies) && !this.collidableEntities.has(entity.id)) {
            const collidableEntity = new CollidableEntity(entity.id);
            collidableEntity.position = entity.getComponent("position");
            collidableEntity.size = entity.getComponent("size");
            collidableEntity.collidable = entity.getComponent("collidable");

            this.collidableEntities.set(collidableEntity.id, collidableEntity);

            let cellPositions = this.getCellPositions(collidableEntity);
            this.addCellPositionsToDirtyCellPositions(cellPositions);
            this.cellPositionsOfEntitiesById.set(collidableEntity.id, cellPositions);

            this.addEntityToCellPositions(collidableEntity, cellPositions);
        }
    }

    componentAdded(_entity, _component) {
        const entity = _entity;
        this.entityAdded(entity);
    }

    deactivated(_world) {
        const world = _world;
        this.world = null;
        this.collidableEntities = new Map();
        this.cellPositionsOfEntitiesById = new Map();
        this.currentTime = 0;
        this.grid = new Map();
    }

    entityRemoved(_entity) {
        const entity = _entity;
        const collidableEntity = this.collidableEntities.get(entity.id);
        if (collidableEntity != null) {
            let cellPositions = this.cellPositionsOfEntitiesById.get(collidableEntity.id);

            if (cellPositions != null) {
                this.removeEntityFromCellPositions(collidableEntity, cellPositions);
            }

            this.collidableEntities.delete(collidableEntity.id);
            this.cellPositionsOfEntitiesById.delete(collidableEntity.id);
        }
    }

    componentRemoved(entity, component) {
        if (this.dependencies.indexOf(component.type) > -1) {
            this.entityRemoved(entity);
        }
    }

    update(currentTime) {
        this.currentTime = currentTime;
        this.findDirtyCells()
        this.updateGridCells(this.dirtyCellPositions)
        this.dirtyCellPositions = [];
    }
}