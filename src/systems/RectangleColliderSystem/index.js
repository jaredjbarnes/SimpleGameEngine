import CellPosition from "./CellPosition";
import Collision from "./Collision";

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
        this.spatialPartitionService = null;
    }

    removeCollisionsFromEntity(_entity) {
        const entity = _entity;
        const collider = entity.getComponent("rectangle-collider");

        if (collider != null) {
            const collisions = collider.collisions;

            for (let id in collisions) {
                this.releaseCollision(collisions[id]);
            }

            collider.collisions = {};
        }
    }

    removeCollisionsFromEntities(entities) {
        for (let x = 0; x < entities.length; x++) {
            this.removeCollisionsFromEntity(entity);
        }
    }

    createCollision(_id) {
        const id = _id;

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

    isReady() {
        return this.spatialPartitionService != null;
    }

    releaseCollision(_collision) {
        const collision = _collision;
        if (collision != null) {
            this.availableCollisions.push(collision);
        }
    }

    updateGridCells() {
        const cellPositions = this.spatialPartitionService.dirtyCellPositions;
        const grid = this.spatialPartitionService.grid;

        for (let index = 0; index < cellPositions.length; index++) {
            const entities = grid.getBucket(cellPosition);
            this.removeCollisionsFromEntities(entities);
        }

        for (let index = 0; index < cellPositions.length; index++) {
            const cellPosition = cellPositions[index];
            const entities = grid.getBucket(cellPosition);

            for (let y = 0; y < entities.length; y++) {
                const entity = entities[y];
                const rectangle = entity.getComponent("rectangle");
                const collider = entity.getComponent("rectangle-collider");

                if (collider == null || rectangle == null) {
                    continue;
                }

                const collisions = collider.collisions;
                const index = y;

                for (let x = index + 1; x < entities.length; x++) {
                    const otherEntity = entities[x];
                    const otherRectangle = otherEntity.getComponent("rectangle");
                    const otherCollider = otherEntity.getComponent("rectangle-collider");

                    if (otherCollider == null || otherRectangle == null) {
                        continue;
                    }

                    const otherCollisions = otherCollider.collisions;

                    if ((otherCollisions[entity.id] &&
                        otherCollisions[entity.id].timestamp === this.currentTimestamp)) {
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

    //Life Cycle Methods
    activated(_world) {
        const world = _world;
        this.world = world
    }

    deactivated(_world) {
        const world = _world;
        this.world = null;
        this.currentTimestamp = 0;
        this.spatialPartitionService = null;
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

    update(currentTimestamp) {
        if (this.isReady()) {
            this.currentTimestamp = currentTimestamp;
            this.updateGridCells();
        }
    }

}