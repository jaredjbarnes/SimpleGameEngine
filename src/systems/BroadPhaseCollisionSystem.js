const DEPENDENCIES = ["position", "size", "collidable"];

class BroadPhaseEntity {
    constructor(entity) {
        this.id = null;
        this.position = entity.getComponent("position");
        this.size = entity.getComponent("size");
        this.collidable = entity.getComponent("collidable");
        this.id = entity.id;
    }
}

class Collision {
    constructor() {
        this.timestamp = null;
        this.startTimestamp = null;
        this.endTimestamp = null;
        this.entityId = null;
        this.isStatic = false;
    }
}

export default class BroadPhaseBroadPhaseCollisionSystem {
    constructor(cellSize) {
        this._world = null;
        this._cellSize = cellSize || 200;
        this._currentTimestamp = 0;
        this._detectionAreaPosition = null;
        this._detectionAreaSize = null;
        this._gridWidth = 0;
        this._gridHeight = 0;
        this._grid = [[]];
        this._lastRegions = new Map();
        this._entities = new Map();
    }

    _createGrid() {
        this._gridWidth = Math.floor((this._world.size.width) / this._cellSize);
        this._gridHeight = Math.floor((this._world.size.height) / this._cellSize);

        this._grid = new Array(this._gridWidth);

        for (let x = 0; x < this._gridWidth; x++) {
            this._grid[x] = new Array(this._gridHeight);
            for (let y = 0; y < this._gridHeight; y++) {
                this._grid[x][y] = [];
            }
        }
    }

    _removeLastRegionsFromGrid(entity, regions) {
        if (regions == null) {
            return;
        }

        let grid = this._grid;
        regions.forEach((region) => {
            let bucket = grid[region[0]][region[1]];
            let index = -1;

            bucket.some((broadPhaseEntity, x) => {
                if (broadPhaseEntity.id == entity.id) {
                    index = x;
                    return true;
                };
                return false;
            });

            if (index > -1) {
                bucket.splice(index, 1);
            }
        });

    }

    activated(world) {
        let self = this;
        this._world = world;

        this._createGrid();

        world.getEntities().forEach(function (entity) {
            self.entityAdded(entity);
        });
    }

    deactivated() {
        this._world = null;
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            let broadPhaseEntity = new BroadPhaseEntity(entity);
            broadPhaseEntity.position.isDirty = true;

            this._entities.set(entity.id, broadPhaseEntity);
        }
    }

    entityRemoved(entity) {
        let broadPhaseEntity = this._entities.get(entity.id);
        let grid = this._grid;

        if (broadPhaseEntity != null) {

            this._removeLastRegionsFromGrid(broadPhaseEntity, this._lastRegions.get(entity.id));
            this._lastRegions.delete(entity.id);
            this._entities.delete(entity.id);
        }
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entityAdded(entity);
        }
    }

    componentRemoved(entity, component) {
        this.entityRemoved(entity);
    }

    update() {
        this._currentTimestamp = this._world.getTime();

        let dirtyRegions = {};
        let entities = [];
        let grid = this._grid;

        this._entities.forEach((entity) => {
            let _entity = entity;
            if (_entity.position.isDirty || _entity.size.isDirty) {

                let regions = this.getRegions(_entity);
                let lastRegions = this._lastRegions.get(_entity.id);

                this._removeLastRegionsFromGrid(_entity, lastRegions);

                regions.forEach((region) => {
                    dirtyRegions[region[0] + "|" + region[1]] = true;
                    grid[region[0]][region[1]].push(_entity);
                });

                this._lastRegions.set(_entity.id, regions);
            }

        });

        Object.keys(dirtyRegions).forEach((key) => {
            let _key = key;
            let region = _key.split("|");
            let entities = grid[region[0]][region[1]];
            let pairs = this.queryForCollisions(entities);

            this.assignTimestamps(pairs);
            this.cleanCollisions(entities);

            entities.forEach((entity) => {
                entity.position.isDirty = false;
                entity.size.isDirty = false;
            });
        })


    }

    cleanCollisions(entities) {
        let currentTimestamp = this._currentTimestamp;
        // All browser can't optimize arguments because of their nature. So we aliases it. Which allows optimizations.
        let _entities = entities;

        _entities.forEach((entity) => {
            let _entity = entity;
            let collisions = _entity.collidable.activeCollisions;

            for (let key in collisions) {
                let collision = collisions[key];

                if (collision.timestamp !== currentTimestamp) {

                    // We know the collision ended if the timestamp didn't update to our current timestamp.
                    collision.endTimestamp = currentTimestamp;

                    // Allow for some time to pass, before removing, because its likely they'll hit again.
                    if (!collision.isStatic && currentTimestamp - collision.timestamp > 3000) {
                        delete collisions[key];
                    }
                }
            }

        });
    }

    assignTimestamps(pairs) {
        let currentTimestamp = this._currentTimestamp;

        // All browser can't optimize arguments because of their nature. So we aliases it. Which allows optimizations.
        let _pairs = pairs;

        _pairs.forEach(function (pair, index) {
            let _pair = pair;
            let _index = index;
            let entityA = _pair[0];
            let entityB = _pair[1];
            let collidableA = entityA.collidable;
            let collidableB = entityB.collidable;
            let collisionDataA = collidableA.activeCollisions[entityB.id];
            let collisionDataB = collidableB.activeCollisions[entityA.id];

            if (collisionDataA == null) {

                collisionDataA = new Collision();
                collisionDataA.startTimestamp = currentTimestamp;
                collisionDataA.timestamp = currentTimestamp;
                collisionDataA.endTimestamp = null;
                collisionDataA.entityId = entityB.id

                if (collidableA.isStatic && collidableB.isStatic) {
                    collisionDataA.isStatic = true;
                }

                collidableA.activeCollisions[entityB.id] = collisionDataA;
            } else {
                collisionDataA.timestamp = currentTimestamp;
                collisionDataA.endTimestamp = null;
            }

            if (collisionDataB == null) {
                collisionDataB = new Collision();
                collisionDataB.startTimestamp = currentTimestamp;
                collisionDataB.timestamp = currentTimestamp;
                collisionDataB.endTimestamp = null;
                collisionDataB.entityId = entityA.id;

                if (collidableA.isStatic && collidableB.isStatic) {
                    collisionDataB.isStatic = true;
                }

                collidableB.activeCollisions[entityA.id] = collisionDataB;

            } else {
                collisionDataB.timestamp = currentTimestamp;
                collisionDataB.endTimestamp = null;
            }

        });
    }

    queryForCollisions(entities) {
        let pairs = [];
        let _entities = entities;
        let entityA = _entities[0];
        let entityB;
        let collidableA;
        let collidableB;
        let positionA;
        let sizeA;
        let positionB;
        let sizeB;
        let top;
        let right;
        let bottom;
        let left;
        let length = _entities.length;

        for (let index = 0; index < length; index++) {
            entityA = _entities[index];

            for (let x = index + 1; x < length; x++) {
                entityB = _entities[x];

                collidableA = entityA.collidable;
                collidableB = entityB.collidable;

                // We don't need to check disabled objects.
                if (!collidableA.isEnabled || !collidableB.isEnabled) {
                    continue;
                }

                positionA = entityA.position;
                sizeA = entityA.size;

                positionB = entityB.position;
                sizeB = entityB.size;

                top = Math.max(positionA.y, positionB.y);
                bottom = Math.min(positionA.y + sizeA.height, positionB.y + sizeB.height);
                left = Math.max(positionA.x, positionB.x);
                right = Math.min(positionA.x + sizeA.width, positionB.x + sizeB.width);

                if (top < bottom && left < right) {
                    pairs.push([entityA, entityB]);
                }

            }
        }

        return pairs;
    }

    getRegions(entity) {
        let _entity = entity;
        let indexes = [];
        let gridWidth = Math.floor((this._world.size.width) / this._cellSize);
        let gridHeight = Math.floor((this._world.size.height) / this._cellSize);
        let boundsTop = 0;
        let boundsBottom = this._world.size.height;
        let boundsLeft = 0;
        let boundsRight = this._world.size.width;
        let cellSize = this._cellSize;
        let position = _entity.position;
        let size = _entity.size;

        // If entity is outside the detection region, then ignore it.
        if (position.x + size.width < boundsLeft ||
            position.x > boundsRight ||
            position.y + size.height < boundsTop ||
            position.y > boundsBottom) {
            return [];
        }

        // Find the cells that the entity overlaps.
        let left = Math.floor((position.x - boundsLeft) / cellSize);
        let right = Math.floor((position.x + size.width - boundsLeft) / cellSize);
        let top = Math.floor((position.y - boundsTop) / cellSize);
        let bottom = Math.floor((position.y + size.height - boundsTop) / cellSize);

        for (let x = left; x <= right; x++) {
            for (let y = top; y <= bottom; y++) {
                if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
                    indexes.push([x, y]);
                }
            }
        }

        return indexes;
    }

    setDetectionArea(position, size) {
        this._detectionAreaPosition = position;
        this._detectionAreaSize = size;
    }

}