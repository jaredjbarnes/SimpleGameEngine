import Entity from "../Entity";
import RectangleCollisionData from "../components/RectangleCollisionData";
import Vector from "../Vector";

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
        this.transform = null;
        this.rectangleCollider = null;
    }
}

export default class BroadPhaseCollisionSystem {
    constructor(cellSize = 200) {
        this.cellSize = cellSize;
        this.collidableEntities = [];
        this.collidableEntitiesById = {};
        this.world = null;
        this.currentTimestamp = 0;
        this.grid = {};
        this.dirtyCellPositions = [];
        this.dependencies = ["transform", "rectangle-collider"];
        this.name = "Rectangle Collider System";
        this.intersection = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        this.availableCollisions = [];
        this.rectangleCollisionDataEntity = new Entity();
        this.rectangleCollisionDataComponent = new RectangleCollisionData();
        this.rectangleCollisionDataComponent.cellSize = cellSize;
        this.rectangleCollisionDataComponent.grid = this.grid;
        this.rectangleCollisionDataEntity.addComponent(this.rectangleCollisionDataComponent);

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

    findDirtyCells() {
        const dirtyEntities = [];
        const collidableEntities = this.collidableEntities;

        for (let x = 0; x < collidableEntities.length; x++) {
            const collidableEntity = collidableEntities[x];
            const transform = collidableEntity.transform;

            if (transform.isDirty) {
                dirtyEntities.push(collidableEntity);
            }
        }

        for (let x = 0; x < dirtyEntities.length; x++) {
            const dirtyEntity = dirtyEntities[x];
            const collisions = dirtyEntity.collidable.collisions;

            this.updateBoundingRect(dirtyEntity.transform);

            let lastCellPositions = dirtyEntity.collidable.cellPositions;
            let newCellPositions = this.getCellPositions(dirtyEntity);

            this.removeEntityFromCellPositions(dirtyEntity, lastCellPositions);
            this.addEntityToCellPositions(dirtyEntity, newCellPositions);

            dirtyEntity.collidable.cellPositions = newCellPositions;
            dirtyEntity.collidable.lastCellPositions = lastCellPositions;

            for (let y in collisions) {
                const collision = collisions[y];
                const otherCollidableEntity = this.collidableEntitiesById[y];

                this.releaseCollision(collision);

                if (otherCollidableEntity) {
                    this.releaseCollision(otherCollidableEntity.collidable.collisions[dirtyEntity.id]);
                    delete otherCollidableEntity.collidable.collisions[dirtyEntity.id];
                }

            }

            dirtyEntity.collidable.collisions = {};
        }

        this.dirtyEntities = dirtyEntities;
    }

    getCell({ rowIndex, columnIndex }) {
        const key = `${columnIndex}_${rowIndex}`;
        let cell = this.grid[key];

        if (cell == null) {
            cell = this.grid[key] = [];
        }

        return cell;
    }

    getCellPositions({ transform: { boundingRect } }) {
        const top = boundingRect.top;
        const left = boundingRect.left;
        const right = boundingRect.right;
        const bottom = boundingRect.bottom;
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

    getIntersection({ transform: { boundingRect: boundingRectA } }, { transform: { boundingRect: boundingRectB } }) {
        const top = Math.max(boundingRectA.top, boundingRectB.top);
        const bottom = Math.min(boundingRectA.bottom, boundingRectB.bottom);
        const left = Math.max(boundingRectA.left, boundingRectB.left);
        const right = Math.min(boundingRectA.right, boundingRectB.right);

        if (top < bottom && left < right) {
            this.intersection.top = top;
            this.intersection.left = left;
            this.intersection.right = right;
            this.intersection.bottom = bottom;

            return this.intersection;
        }

        return null;
    }

    releaseCollision(collision) {
        if (collision != null) {
            this.availableCollisions.push(collision);
        }
    }

    removeCell({ columnIndex, rowIndex }) {
        if (this.grid[`${columnIndex}_${rowIndex}`]) {
            delete this.grid[`${columnIndex}_${rowIndex}`];
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

                    if ((otherCollisions[collidableEntity.id] && otherCollisions[collidableEntity.id].timestamp === this.currentTimestamp)) {
                        continue;
                    }

                    const intersection = this.getIntersection(collidableEntity, otherCollidableEntity);

                    if (intersection != null) {

                        let collision = this.createCollision(collidableEntity.id);
                        collision.timestamp = this.currentTimestamp;
                        collision.intersection.top = intersection.top;
                        collision.intersection.left = intersection.left;
                        collision.intersection.right = intersection.right;
                        collision.intersection.bottom = intersection.bottom;
                        collision.cellPosition = cellPosition;

                        let otherCollision = this.createCollision(otherCollidableEntity.id);
                        otherCollision.timestamp = this.currentTimestamp;
                        otherCollision.intersection.top = intersection.top;
                        otherCollision.intersection.left = intersection.left;
                        otherCollision.intersection.right = intersection.right;
                        otherCollision.intersection.bottom = intersection.bottom;
                        otherCollision.cellPosition = cellPosition;

                        otherCollisions[collidableEntity.id] = collision;
                        collisions[otherCollidableEntity.id] = otherCollision;

                    }

                }

            }
        }

    }

    updateBoundingRect({ size, position, origin, rotation, boundingRect }) {
        const cornerOne = Vector.rotate({ x: 0, y: 0 }, rotation);
        const cornerTwo = Vector.rotate({ x: size.width, y: 0 }, rotation);
        const cornerThree = Vector.rotate({ x: size.width, y: size.height }, rotation);
        const cornerFour = Vector.rotate({ x: 0, y: size.height }, rotation);

        const top = Math.min(cornerOne.y, cornerTwo.y, cornerThree.y, cornerFour.y);
        const bottom = Math.max(cornerOne.y, cornerTwo.y, cornerThree.y, cornerFour.y);
        const left = Math.min(cornerOne.x, cornerTwo.x, cornerThree.x, cornerFour.x);
        const right = Math.max(cornerOne.x, cornerTwo.x, cornerThree.x, cornerFour.x);

        boundingRect.top = top + position.y - origin.y;
        boundingRect.bottom = bottom + position.y - origin.y;
        boundingRect.left = left + position.x - origin.x;
        boundingRect.right = right + position.x - origin.x;
    }

    /******************************************************************/
    /*                    System Life Cycle Hooks                     */
    /******************************************************************/

    activated(_world) {
        const world = _world;
        this.world = world

        world.getEntities().forEach((_entity) => {
            const entity = _entity;
            this.entityAdded(entity)
        });

        world.addEntity(this.rectangleCollisionDataEntity);
    }

    afterUpdate(currentTimestamp) {
        for (let x = 0; x < this.dirtyEntities.length; x++) {
            this.dirtyEntities[x].transform.isDirty = false;
        }
        this.dirtyCellPositions = [];
    }

    componentAdded(_entity, _component) {
        const entity = _entity;
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (this.dependencies.indexOf(component.type) > -1) {
            this.entityRemoved(entity);
        }
    }

    deactivated(_world) {
        const world = _world;
        this.world = null;
        this.collidableEntities = [];
        this.collidableEntitiesById = {};
        this.currentTimestamp = 0;
        this.grid = {};
    }

    entityAdded(_entity) {
        const entity = _entity;
        if (entity.hasComponents(this.dependencies) && this.collidableEntitiesById[entity.id] == null) {
            const collidableEntity = new CollidableEntity(entity.id);
            collidableEntity.transform = entity.getComponent("transform");
            collidableEntity.rectangleCollider = entity.getComponent("rectangle-collider");

            this.collidableEntities.push(collidableEntity);
            this.collidableEntitiesById[collidableEntity.id] = collidableEntity;

            let cellPositions = this.getCellPositions(collidableEntity);
            this.addEntityToCellPositions(collidableEntity, cellPositions);

            collidableEntity.collidable.cellPositions = cellPositions;
        }
    }

    entityRemoved(_entity) {
        const entity = _entity;
        const collidableEntity = this.collidableEntitiesById[entity.id];

        if (collidableEntity != null) {
            const index = this.collidableEntities.findIndex(e => e.id === entity.id);
            for (let key in collidableEntity.collidable.collisions) {
                this.releaseCollision(collidableEntity.collidable.collisions[key]);
            }
            let cellPositions = collidableEntity.collidable.cellPositions;
            this.removeEntityFromCellPositions(collidableEntity, cellPositions);
            this.collidableEntities.splice(index, 1);
            delete this.collidableEntitiesById[collidableEntity.id];
        }
    }

    update(currentTimestamp) {
        this.currentTimestamp = currentTimestamp;
        this.findDirtyCells();
        this.updateGridCells(this.dirtyCellPositions);
        this.rectangleCollisionDataComponent.dirtyCellPositions = this.dirtyCellPositions;
        this.rectangleCollisionDataComponent.dirtyEntities = this.dirtyEntities;
    }


}