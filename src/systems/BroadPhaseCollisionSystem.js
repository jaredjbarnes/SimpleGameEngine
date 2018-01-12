import Entity from "../Entity";
import BroadPhaseCollisionData from "../components/BroadPhaseCollisionData";

//TODO: remove the cells structure from the collidable component and just have the collisions. 

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
        this.collidableEntities = [];
        this.cellPositionsOfEntitiesById = new Map();
        this.world = null;
        this.currentTime = 0;
        this.grid = new Map();
        this.dirtyCellPositions = [];
        this.dependencies = ["position", "size", "collidable"];
        this.name = "Broad Phase Collision System";

        this.broadPhaseCollisionDataEntity = new Entity();
        this.broadPhaseCollisionDataComponent = new BroadPhaseCollisionData();
        this.broadPhaseCollisionDataComponent.cellSize = cellSize;
        this.broadPhaseCollisionDataComponent.grid = this.grid;
        this.broadPhaseCollisionDataEntity.addComponent(this.broadPhaseCollisionDataComponent);

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
        const dirtyCellPositions = this.dirtyCellPositions;

        for (let x = 0; x < cellPositions.length; x++) {
            let isIn = false;
            for (let y = 0; y < dirtyCellPositions.length; y++) {
                if (cellPositions[x].rowIndex === dirtyCellPositions[y].rowIndex &&
                    cellPositions[x].columnIndex === dirtyCellPositions[y].columnIndex) {
                    isIn = true;
                    break;
                }
            }

            if (!isIn) {
                dirtyCellPositions.push(cellPositions[x]);
            }
        }

    }

    doEntitiesIntersect({ position: positionA, size: sizeA }, { position: positionB, size: sizeB }) {
        const top = Math.max(positionA.y, positionB.y);
        const bottom = Math.min(positionA.y + sizeA.height, positionB.y + sizeB.height);
        const left = Math.max(positionA.x, positionB.x);
        const right = Math.min(positionA.x + sizeA.width, positionB.x + sizeB.width);

        return top < bottom && left < right;
    }

    findDirtyCells() {
        const dirtyEntities = [];
        const collidableEntities = this.collidableEntities;

        for (let x = 0; x < collidableEntities.length; x++) {
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

            this.addCellPositionsToDirtyCellPositions(newCellPositions);
            this.addCellPositionsToDirtyCellPositions(lastCellPositions);

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

    removeCell({ columnIndex, rowIndex }) {
        if (this.grid.has(columnIndex) && this.grid.get(columnIndex).has(rowIndex)) {
            this.grid.get(columnIndex).delete(rowIndex);
        }
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
                    if (cell.length === 0) {
                        this.removeCell(cellPosition);
                    }
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

            // Add collision data to the entities.
            for (let y = 0; y < cell.length; y++) {
                const collidableEntity = cell[y];
                const collisions = collidableEntity.collidable.collisions;
                const index = y;

                this.addEntityToCellPosition(collidableEntity, cellPosition);

                for (let x = index + 1; x < cell.length; x++) {
                    const otherCollidableEntity = cell[x];
                    const otherCollisions = otherCollidableEntity.collidable.collisions;

                    if ((!otherCollidableEntity.position.isDirty && !otherCollidableEntity.size.isDirty &&
                        !collidableEntity.position.isDirty && !collidableEntity.size.isDirty) ||
                        (otherCollisions[collidableEntity.id] &&
                            otherCollisions[collidableEntity.id].timestamp === this.currentTime)) {
                        continue;
                    }

                    if (this.doEntitiesIntersect(collidableEntity, otherCollidableEntity)) {
                        let collision = otherCollisions[collidableEntity.id];
                        let otherCollision = collisions[otherCollidableEntity.id];

                        if (collision == null) {
                            collision = new Collision(collidableEntity.id);
                            otherCollisions[collidableEntity.id] = collision;
                        }

                        if (otherCollision == null) {
                            otherCollision = new Collision(otherCollidableEntity.id);
                            collisions[otherCollidableEntity.id] = otherCollision;
                        }

                        collision.timestamp = this.currentTime;
                        otherCollision.timestamp = this.currentTime;

                    } else {
                        if (otherCollisions[collidableEntity.id]) {
                            otherCollisions[collidableEntity.id].timestamp = null;
                        }

                        if (collisions[otherCollidableEntity.id]) {
                            collisions[otherCollidableEntity.id].timestamp = null;
                        }
                    }

                }

                collidableEntity.position.isDirty = false;
                collidableEntity.size.isDirty = false;

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

        world.addEntity(this.broadPhaseCollisionDataEntity);
    }

    entityAdded(_entity) {
        const entity = _entity;
        if (entity.hasComponents(this.dependencies) && this.collidableEntities.findIndex(e => e.id === entity.id) === -1) {
            const collidableEntity = new CollidableEntity(entity.id);
            collidableEntity.position = entity.getComponent("position");
            collidableEntity.size = entity.getComponent("size");
            collidableEntity.collidable = entity.getComponent("collidable");

            this.collidableEntities.push(collidableEntity);

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
        this.collidableEntities = [];
        this.cellPositionsOfEntitiesById = new Map();
        this.currentTime = 0;
        this.grid = new Map();
    }

    entityRemoved(_entity) {
        const entity = _entity;
        const index = this.collidableEntities.findIndex(e => e.id === entity.id);
        if (index > -1) {
            const collidableEntity = this.collidableEntities[index];
            let cellPositions = this.cellPositionsOfEntitiesById.get(collidableEntity.id);

            if (cellPositions != null) {
                this.removeEntityFromCellPositions(collidableEntity, cellPositions);
            }

            this.collidableEntities.splice(index, 1);
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
        this.findDirtyCells();
        this.updateGridCells(this.dirtyCellPositions);
        this.broadPhaseCollisionDataComponent.dirtyCellPositions = this.dirtyCellPositions;
        this.dirtyCellPositions = [];
    }
}