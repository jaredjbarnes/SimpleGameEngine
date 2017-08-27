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

export default class CollisionSystem {
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

        for (var x = 0; x < this._gridWidth; x++) {
            this._grid[x] = new Array(this._gridHeight);
            for (var y = 0; y < this._gridHeight; y++) {
                this._grid[x][y] = [];
            }
        }
    }

    _removeLastRegionsFromGrid(entity, regions) {
        if (regions == null) {
            return;
        }

        var grid = this._grid;
        regions.forEach((region) => {
            var bucket = grid[region[0]][region[1]];
            var index = -1;

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
        var self = this;
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
            var broadPhaseEntity = new BroadPhaseEntity(entity);
            broadPhaseEntity.position.isDirty = true;

            this._entities.set(entity.id, broadPhaseEntity);
        }
    }

    entityRemoved(entity) {
        var broadPhaseEntity = this._entities.get(entity.id);
        var grid = this._grid;

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

        var dirtyRegions = {};
        var entities = [];
        var grid = this._grid;

        this._entities.forEach((entity) => {
            var _entity = entity;
            if (_entity.position.isDirty || _entity.size.isDirty || !_entity.position.isStatic) {

                var regions = this.getRegions(_entity);
                var lastRegions = this._lastRegions.get(_entity.id);

                this._removeLastRegionsFromGrid(_entity, lastRegions);

                regions.forEach((region) => {
                    dirtyRegions[region[0] + "|" + region[1]] = true;
                    grid[region[0]][region[1]].push(_entity);
                });

                this._lastRegions.set(_entity.id, regions);
            }

        });

        Object.keys(dirtyRegions).forEach((key) => {
            var _key = key;
            var region = _key.split("|");
            var entities = grid[region[0]][region[1]];
            var pairs = this.queryForCollisions(entities);

            this.assignTimestamps(pairs);
            this.cleanCollisions(entities);

            entities.forEach((entity) => {
                entity.position.isDirty = false;
                entity.size.isDirty = false;
            });
        })


    }

    cleanCollisions(entities) {
        var currentTimestamp = this._currentTimestamp;
        // All browser can't optimize arguments because of their nature. So we aliases it. Which allows optimizations.
        var _entities = entities;

        _entities.forEach((entity) => {
            var _entity = entity;
            var collisions = _entity.collidable.activeCollisions;

            Array.from(collisions.entries()).forEach(function (entry) {
                var _entry = entry;
                var key = _entry[0];
                var collision = _entry[1];

                if (collision.timestamp !== currentTimestamp) {

                    // We know the collision ended if the timestamp didn't update to our current timestamp.
                    collision.endTimestamp = currentTimestamp;

                    // Allow for some time to pass, before removing, because its likely they'll hit again.
                    if (!collision.isStatic && currentTimestamp - collision.timestamp > 3000) {
                        collisions.delete(key);
                    }
                }
            });

        });
    }

    assignTimestamps(pairs) {
        var currentTimestamp = this._currentTimestamp;

        // All browser can't optimize arguments because of their nature. So we aliases it. Which allows optimizations.
        var _pairs = pairs;

        _pairs.forEach(function (pair, index) {
            var _pair = pair;
            var _index = index;
            var entityA = _pair[0];
            var entityB = _pair[1];
            var collidableA = entityA.collidable;
            var collidableB = entityB.collidable;
            var collisionDataA = collidableA.activeCollisions.get(entityB.id);
            var collisionDataB = collidableB.activeCollisions.get(entityA.id);

            if (collisionDataA == null) {

                collisionDataA = new Collision();
                collisionDataA.startTimestamp = currentTimestamp;
                collisionDataA.timestamp = currentTimestamp;
                collisionDataA.endTimestamp = null;
                collisionDataA.entityId = entityB.id

                if (collidableA.isStatic && collidableB.isStatic) {
                    collisionDataA.isStatic = true;
                }

                collidableA.activeCollisions.set(entityB.id, collisionDataA);
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

                collidableB.activeCollisions.set(entityA.id, collisionDataB)

            } else {
                collisionDataB.timestamp = currentTimestamp;
                collisionDataB.endTimestamp = null;
            }

        });
    }

    queryForCollisions(entities) {
        var pairs = [];
        var _entities = entities;
        var entityA = _entities[0];
        var entityB;
        var collidableA;
        var collidableB;
        var positionA;
        var sizeA;
        var positionB;
        var sizeB;
        var top;
        var right;
        var bottom;
        var left;
        var length = _entities.length;

        for (var index = 0; index < length; index++) {
            entityA = _entities[index];

            for (var x = index + 1; x < length; x++) {
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
        var _entity = entity;
        var indexes = [];
        var gridWidth = Math.floor((this._world.size.width) / this._cellSize);
        var gridHeight = Math.floor((this._world.size.height) / this._cellSize);
        var boundsTop = 0;
        var boundsBottom = this._world.size.height;
        var boundsLeft = 0;
        var boundsRight = this._world.size.width;
        var cellSize = this._cellSize;
        var position = _entity.position;
        var size = _entity.size;

        // If entity is outside the detection region, then ignore it.
        if (position.x + size.width < boundsLeft ||
            position.x > boundsRight ||
            position.y + size.height < boundsTop ||
            position.y > boundsBottom) {
            return [];
        }

        // Find the cells that the entity overlaps.
        var left = Math.floor((position.x - boundsLeft) / cellSize);
        var right = Math.floor((position.x + size.width - boundsLeft) / cellSize);
        var top = Math.floor((position.y - boundsTop) / cellSize);
        var bottom = Math.floor((position.y + size.height - boundsTop) / cellSize);

        for (var x = left; x <= right; x++) {
            for (var y = top; y <= bottom; y++) {
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