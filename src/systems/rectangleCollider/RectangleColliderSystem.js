﻿import Collision from "./Collision.js";
const emptyArray = [];

export default class RectangleColliderSystem {
    constructor(cellSize = 200) {
        this.cellSize = cellSize;
        this.world = null;
        this.name = "rectangle-collider";
        this.currentTimestamp = 0;
        this.name = "Rectangle Collider System";
        this.intersection = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        this.availableCollisions = [];
        this.spatialPartitionData = null;
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

    removeCollisionsFromEntities(_entities) {
        const entities = _entities;
        for (let x = 0; x < entities.length; x++) {
            this.removeCollisionsFromEntity(entities[x]);
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

    getIntersection(_transformA, _transformB) {
        const transformA = _transformA;
        const transformB = _transformB;
        const top = Math.max(transformA.top, transformB.top);
        const bottom = Math.min(transformA.bottom, transformB.bottom);
        const left = Math.max(transformA.left, transformB.left);
        const right = Math.min(transformA.right, transformB.right);

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
        return this.spatialPartitionData != null;
    }

    releaseCollision(_collision) {
        const collision = _collision;
        if (collision != null) {
            this.availableCollisions.push(collision);
        }
    }

    updateCollisions() {
        const cellPositions = this.spatialPartitionData.dirtyCellPositions;
        const grid = this.spatialPartitionData.grid;

        for (let key in cellPositions) {
            const entities = grid.getBucket(cellPositions[key]) || emptyArray;
            this.removeCollisionsFromEntities(entities);
        }

        for (let key in cellPositions) {
            const cellPosition = cellPositions[key];
            const entities = grid.getBucket(cellPosition) || emptyArray;

            for (let y = 0; y < entities.length; y++) {
                const entity = entities[y];
                const transform = entity.getComponent("transform");
                const collider = entity.getComponent("rectangle-collider");

                if (collider == null || transform == null) {
                    continue;
                }

                const collisions = collider.collisions;
                const index = y;

                for (let x = index + 1; x < entities.length; x++) {
                    const otherEntity = entities[x];
                    const otherTransform = otherEntity.getComponent("transform");
                    const otherCollider = otherEntity.getComponent("rectangle-collider");

                    if (otherCollider == null || otherTransform == null) {
                        continue;
                    }

                    const otherCollisions = otherCollider.collisions;

                    if ((otherCollisions[entity.id] &&
                        otherCollisions[entity.id].timestamp === this.currentTimestamp)) {
                        continue;
                    }

                    const intersection = this.getIntersection(transform, otherTransform);

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
        this.world = _world;
    }

    deactivated(_world) {
        this.world = null;
        this.currentTimestamp = 0;
        this.spatialPartitionData = null;
    }

    entityAdded(entity) {
        if (entity.type === "spatial-partition-service") {
            this.spatialPartitionData = entity.getComponent("spatial-partition-data");
        }
    }

    entityRemoved(entity) {
        if (entity.type === "spatial-partition-service") {
            this.spatialPartitionData = null;
        }
    }

    update(currentTimestamp) {
        if (this.isReady()) {
            this.currentTimestamp = currentTimestamp;
            this.updateCollisions();
        }
    }

}