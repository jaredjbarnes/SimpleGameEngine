import Entity from "../Entity";
import BroadPhaseCollisionData from "../components/BroadPhaseCollisionData";

//TODO: correct cells when finding dirty cells, change dirty cell positions to strings... maybe.

class CellPosition {
    constructor(columnIndex, rowIndex) {
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
    }
}

class Collision {
    constructor(entityId = null) {
        this.entityId = entityId;
        this.timestamp = 0;
        this.cellPosition = null;
        this.intersection = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };
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
        this.collidableEntitiesById = {};
        this.world = null;
        this.currentTime = 0;
        this.grid = new Map();
        this.dirtyCellPositions = [];
        this.dependencies = ["position", "size", "collidable"];
        this.name = "Broad Phase Collision System";
        this.intersection = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        this.availableCollisions = [];
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

        this.addCellPositionsToDirtyCellPositions(cellPositions);
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

    createCollision(id) {
        if (this.availableCollisions.length > 0) {
            let collision = this.availableCollisions.pop();
            collision.id = id;
            collision.timestamp = 0;
            collision.cellPosition = null;
            collision.intersection = {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            };
        }
        return new Collision(id);
    }

    getIntersection({ position: positionA, size: sizeA }, { position: positionB, size: sizeB }) {
        const top = Math.max(positionA.y, positionB.y);
        const bottom = Math.min(positionA.y + sizeA.height, positionB.y + sizeB.height);
        const left = Math.max(positionA.x, positionB.x);
        const right = Math.min(positionA.x + sizeA.width, positionB.x + sizeB.width);

        if (top < bottom && left < right) {
            this.intersection.top = top;
            this.intersection.left = left;
            this.intersection.right = right;
            this.intersection.bottom = bottom;

            return this.intersection;
        }

        return null;
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
            const collisions = dirtyEntity.collidable.collisions;

            let lastCellPositions = dirtyEntity.collidable.cellPositions;
            let newCellPositions = this.getCellPositions(dirtyEntity);

            this.removeEntityFromCellPositions(dirtyEntity, lastCellPositions);
            this.addEntityToCellPositions(dirtyEntity, newCellPositions);

            dirtyEntity.collidable.cellPositions = newCellPositions;

            for (let y in collisions) {
                const collision = collisions[y];
                const otherCollidableEntity = this.collidableEntitiesById[y];

                this.releaseCollision(collision);
                this.releaseCollision(otherCollidableEntity.collidable.collisions[dirtyEntity.id]);

                delete otherCollidableEntity.collidable.collisions[dirtyEntity.id];

            }

            dirtyEntity.collidable.collisions = {};
        }

        this.dirtyEntities = dirtyEntities;
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

    releaseCollision(collision) {
        this.availableCollisions.push(collision);
    }

    removeCell({ columnIndex, rowIndex }) {
        if (this.grid.has(columnIndex) && this.grid.get(columnIndex).has(rowIndex)) {
            this.grid.get(columnIndex).delete(rowIndex);
        }
    }

    removeEntityFromCellPositions(_collidableEntity, _cellPositions) {
        const collidableEntity = _collidableEntity;
        const cellPositions = _cellPositions;


        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            const cell = this.getCell(cellPosition);

            if (cell != null) {
                const index = cell.indexOf(collidableEntity);

                if (index > -1) {
                    cell.splice(index, 1);
                    if (cell.length === 0) {
                        this.removeCell(cellPosition);
                    }
                }
            }
        }

        this.addCellPositionsToDirtyCellPositions(cellPositions);

    }

    updateGridCells(_cellPositions) {
        const cellPositions = _cellPositions;

        for (let index = 0; index < cellPositions.length; index++) {
            const cellPosition = cellPositions[index];
            const cell = this.getCell(cellPosition);

            // Add collision data to the entities.
            for (let y = 0; y < cell.length; y++) {
                const collidableEntity = cell[y];
                const collisions = collidableEntity.collidable.collisions;
                const index = y;

                for (let x = index + 1; x < cell.length; x++) {
                    const otherCollidableEntity = cell[x];
                    const otherCollisions = otherCollidableEntity.collidable.collisions;

                    if ((otherCollisions[collidableEntity.id] && otherCollisions[collidableEntity.id].timestamp === this.currentTime)) {
                        continue;
                    }

                    const intersection = this.getIntersection(collidableEntity, otherCollidableEntity);

                    if (intersection != null) {

                        let collision = this.createCollision(collidableEntity.id);
                        collision.timestamp = this.currentTime;
                        collision.intersection.top = intersection.top;
                        collision.intersection.left = intersection.left;
                        collision.intersection.right = intersection.right;
                        collision.intersection.bottom = intersection.bottom;
                        collision.cellPosition = cellPosition;

                        let otherCollision = this.createCollision(otherCollidableEntity.id);
                        otherCollision.timestamp = this.currentTime;
                        otherCollision.intersection.top = intersection.top;
                        otherCollision.intersection.left = intersection.left;
                        otherCollision.intersection.right = intersection.right;
                        otherCollision.intersection.bottom = intersection.bottom;
                        otherCollision.cellPosition = cellPosition;

                        otherCollisions[collidableEntity.id] = collision;
                        collisions[otherCollidableEntity.id] = otherCollision;

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
            this.collidableEntitiesById[collidableEntity.id] = collidableEntity;

            let cellPositions = this.getCellPositions(collidableEntity);
            this.addEntityToCellPositions(collidableEntity, cellPositions);

            collidableEntity.collidable.cellPositions = cellPositions;
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
        this.collidableEntitiesById = {};
        this.currentTime = 0;
        this.grid = new Map();
    }

    entityRemoved(_entity) {
        const entity = _entity;
        const index = this.collidableEntities.findIndex(e => e.id === entity.id);

        if (index > -1) {
            const collidableEntity = this.collidableEntities[index];
            let cellPositions = collidableEntity.collidable.cellPositions;
            this.removeEntityFromCellPositions(collidableEntity, cellPositions);
            this.collidableEntities.splice(index, 1);
            delete this.collidableEntitiesById[collidableEntity.id];
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
        this.broadPhaseCollisionDataComponent.dirtyEntities = this.dirtyEntities;
        this.dirtyCellPositions = [];
    }
}