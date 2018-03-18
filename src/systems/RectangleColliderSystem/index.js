import Entity from "../Entity";
import CellPosition from "./CellPosition";
import Collision from "./Collision";

const RECTANGLE_DEPENDENCIES = ["transform", "rectangle", "rectangle-collider"];

export default class RectangleColliderSystem {
    constructor(cellSize = 200) {
        this.cellSize = cellSize;
        this.world = null;
        this.currentTimestamp = 0;
        this.name = "Rectangle Collider System";
        this.intersection = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        this.availableCollisions = [];
        this.rectangleCollisionDataEntity = null;
        this.rectangleCollisionData = null;

    }

    addRectangleCollisionDataEntity(_entity) {
        const entity = _entity;
        this.rectangleCollisionDataEntity = entity;
        this.rectangleCollisionData = entity.getComponent("rectangle-collision-data");
    }

    addEntityToCellPosition(_entity, _cellPosition) {
        const entity = _entity;
        const cellPosition = _cellPosition;
        const cell = this.getCell(cellPosition);
        const index = cell.indexOf(entity);

        if (index === -1) {
            cell.push(entity);
        }
    }

    addEntityToCellPositions(_entity, _cellPositions) {
        const entity = _entity;
        const cellPositions = _cellPositions;

        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            this.addEntityToCellPosition(entity, cellPosition);
        }

        this.addCellPositionsToDirtyCellPositions(cellPositions);
    }

    addCellPositionsToDirtyCellPositions(_cellPositions) {
        const cellPositions = _cellPositions;
        const dirtyCellPositions = this.rectangleCollisionData.dirtyCellPositions;

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
            return collision;
        }
        return new Collision(id);
    }

    findDirtyCells() {
        const dirtyEntities = this.rectangleCollisionData.dirtyEntities;
        const entities = this.entities;

        for (let x = 0; x < dirtyEntities.length; x++) {
            const dirtyEntity = dirtyEntities[x];
            const collider = dirtyEntity.getComponent("rectangle-collider");
            const rectangle = dirtyEntity.getComponent("rectangle");
            const collisions = collider.collisions;

            let lastCellPositions = collider.cellPositions;
            let newCellPositions = this.getCellPositions(rectangle);

            this.removeEntityFromCellPositions(dirtyEntity, lastCellPositions);
            this.addEntityToCellPositions(dirtyEntity, newCellPositions);

            collider.cellPositions = newCellPositions;
            collider.lastCellPositions = lastCellPositions;

            for (let y in collisions) {
                const collision = collisions[y];
                const otherEntity = this.rectangleCollisionData.entitiesById[y];
                const otherCollider = otherEntity.getComponent("rectangle-collider");

                this.releaseCollision(collision);

                if (otherEntity) {
                    this.releaseCollision(collider.collisions[dirtyEntity.id]);
                    delete collider.collisions[dirtyEntity.id];
                }

            }

            collider.collisions = {};
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

    getCellPositions(rectangle) {
        const top = rectangle.top;
        const left = rectangle.left;
        const right = rectangle.right;
        const bottom = rectangle.bottom;
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

    getIntersection(_rectangleA, _rectangleB) {
        const rectangleA = _rectangleA;
        const rectangleB = _rectangleB;
        const top = Math.max(rectangleA.top, rectangleB.top);
        const bottom = Math.min(rectangleA.bottom, rectangleB.bottom);
        const left = Math.max(rectangleA.left, rectangleB.left);
        const right = Math.min(rectangleA.right, rectangleB.right);

        if (top < bottom && left < right) {
            this.intersection.top = top;
            this.intersection.left = left;
            this.intersection.right = right;
            this.intersection.bottom = bottom;

            return this.intersection;
        }

        return null;
    }

    isRectangleColliderDataEntity(_entity) {
        const entity = _entity;
        return entity.hasComponent("rectangle-collision-data");
    }

    releaseCollision(_collision) {
        const collision = _collision;
        if (collision != null) {
            this.availableCollisions.push(collision);
        }
    }

    removeCell({ columnIndex, rowIndex }) {
        if (this.grid[`${columnIndex}_${rowIndex}`]) {
            delete this.grid[`${columnIndex}_${rowIndex}`];
        }
    }

    removeRectangleCollisionDataEntity(_entity){
        const entity = _entity;
        this.rectangleCollisionData = null;
        this.rectangleCollisionDataEntity = null;
    }

    removeEntityFromCellPositions(_entity, _cellPositions) {
        const entity = _entity;
        const cellPositions = _cellPositions;

        for (let x = 0; x < cellPositions.length; x++) {
            const cellPosition = cellPositions[x];
            const cell = this.getCell(cellPosition);

            if (cell != null) {
                const index = cell.indexOf(entity);

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

    updateGridCells() {
        const cellPositions = this.rectangleCollisionData.dirtyCellPositions;

        for (let index = 0; index < cellPositions.length; index++) {
            const cellPosition = cellPositions[index];
            const cell = this.getCell(cellPosition);

            // Add collision data to the entities.
            for (let y = 0; y < cell.length; y++) {
                const entity = cell[y];
                const collider = entity.getComponent("rectangle-collider");
                const rectangle = entity.getComponent("rectangle");
                const collisions = collider.collisions;
                const index = y;

                for (let x = index + 1; x < cell.length; x++) {
                    const otherEntity = cell[x];
                    const otherCollider = otherEntity.getComponent("rectangle-collider");
                    const otherRectangle = otherEntity.getComponent("rectangle");
                    const otherCollisions = collider.collisions;

                    if ((otherCollisions[entity.id] && otherCollisions[entity.id].timestamp === this.currentTimestamp)) {
                        continue;
                    }

                    const intersection = this.getIntersection(rectangle, otherRectangle);

                    if (intersection != null) {

                        let collision = this.createCollision(entity.id);
                        collision.timestamp = this.currentTimestamp;
                        collision.intersection.top = intersection.top;
                        collision.intersection.left = intersection.left;
                        collision.intersection.right = intersection.right;
                        collision.intersection.bottom = intersection.bottom;
                        collision.cellPosition = cellPosition;

                        let otherCollision = this.createCollision(otherEntity.id);
                        otherCollision.timestamp = this.currentTimestamp;
                        otherCollision.intersection.top = intersection.top;
                        otherCollision.intersection.left = intersection.left;
                        otherCollision.intersection.right = intersection.right;
                        otherCollision.intersection.bottom = intersection.bottom;
                        otherCollision.cellPosition = cellPosition;

                        otherCollisions[entity.id] = collision;
                        collisions[otherEntity.id] = otherCollision;

                    }

                }

            }
        }

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

    }

    componentAdded(_entity, _component) {
        const entity = _entity;
        this.entityAdded(entity);
    }

    componentRemoved(_entity, _component) {
        const entity = _entity;
        const component = _component;

        if (component.type === "rectangle-collision-data") {
            this.addRectangleCollisionDataEntity(entity);
        }
    }

    deactivated(_world) {
        const world = _world;
        this.world = null;
        this.currentTimestamp = 0;
        this.rectangleCollisionData = null;
        this.rectangleCollisionDataEntity = null;
    }

    entityAdded(_entity) {
        const entity = _entity;
        if (this.isRectangleColliderDataEntity(entity)){
            this.addRectangleCollisionDataEntity(entity);
        }
    }

    entityRemoved(_entity) {
        const entity = _entity;
        if (this.isRectangleColliderDataEntity(entity)){
            this.removeRectangleCollisionDataEntity(entity);
        }
    }

    update(currentTimestamp) {
        this.currentTimestamp = currentTimestamp;
        this.rectangleCollisionData.dirtyCellPositions.length = 0;
        this.rectangleCollisionData.dirtyEntities.length = 0;

        this.findDirtyCells();
        this.updateGridCells();
    }

}