import Collidable = require("./../components/Collidable");
import Game = require("./../Game");

class BroadPhaseEntity {
    id: string;
    position: { x: number; y: number; };
    size: { width: number; height: number; };
    collidable: Collidable;

    constructor() {
        this.id = null;
        this.position = null;
        this.size = null;
        this.collidable = null;
    }
}

class Collision {
    timestamp: number;
    startTimestamp: number;
    endTimestamp: number;
    entityId: string;

    constructor() {
        this.timestamp = null;
        this.startTimestamp = null;
        this.endTimestamp = null;
        this.entityId = null;
    }
}

class BroadPhaseCollisionSystem {
    private _dependencies: Array<string>;
    private _cameraDependencies: Array<string>;
    private _entities: Array<BroadPhaseEntity>;
    private _game: Game;
    private _cellSize: number;
    private _currentTimestamp: number;
    private _grid: Array<Array<any>>;
    private _detectionAreaPosition: { x: number; y: number; };
    private _detectionAreaSize: { width: number; height: number; };

    constructor(cellSize) {
        this._dependencies = ["collidable"];
        this._cameraDependencies = ["position", "size", "camera"];
        this._entities = [];
        this._game = null;
        this._cellSize = cellSize || 100;
        this._currentTimestamp = 0;
        this._grid = [[]];
        this._detectionAreaPosition = null;
        this._detectionAreaSize = null;
    }

    activated(game) {
        var self = this;
        this._game = game;

        game.getEntities().forEach(function (entity) {
            self.entityAdded(entity);
        });
    }

    deactivated() {
        this._game = null;
    }

    entityAdded(entity) {
        if (entity.hasComponents(this._dependencies)) {
            this._entities.push(this._createBroadPhaseEntity(entity));
        }
    }

    entityRemoved(entity) {
        var entities = this._entities;

        var index = this._getIndexByEntityId(entity.id);

        if (index > -1) {
            entities.splice(index, 1);
        }
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(this._dependencies)) {
            this.entityAdded(entity);
        }
    }

    componentRemoved(entity, component) {
        if (this._dependencies.indexOf(component.type) > -1) {
            this.entityRemoved(entity);
        }
    }

    update() {
        this.sweepAndPrune();
        this.assignTimestamps(this.queryForCollisions());
        this.cleanCollisions();
    }

    // Custom methods.

    cleanCollisions() {
        var entities = this._entities;
        var currentTimestamp = this._currentTimestamp;

        entities.forEach(function (entity) {
            var collisions = entity.collidable.activeCollisions;
            Object.keys(collisions).forEach(function (key) {
                var collision = collisions[key];
                // We know the collision ended if the timestamp didn't update to our current timestamp.
                if (collision.timestamp !== currentTimestamp) {
                    collision.endTimestamp = currentTimestamp;

                    // Allow for some time to pass, before removing, because its likely they'll hit again.
                    if (this.currentTimestamp - collision.timestamp > 3000) {
                        delete collisions[key];
                    }
                }
            });
        });

    }

    assignTimestamps(pairs) {
        var currentTimestamp = this._currentTimestamp;

        pairs.forEach(function (pair, index) {
            var entityA = pair[0];
            var entityB = pair[1];
            var collidableA = entityA.collidable;
            var collidableB = entityB.collidable;
            var collisionDataA = collidableA.activeCollisions[entityB.id];
            var collisionDataB = collidableB.activeCollisions[entityA.id];

            if (collisionDataA == null) {

                collisionDataA = new Collision();
                collisionDataA.startTimestamp = currentTimestamp;
                collisionDataA.timestamp = currentTimestamp;
                collisionDataA.endTimestamp = null;
                collisionDataA.entityId = entityB.id

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

                collidableB.activeCollisions[entityA.id] = collisionDataB

            } else {
                collisionDataB.timestamp = currentTimestamp;
                collisionDataB.endTimestamp = null;
            }

        });
    }

    queryForCollisions() {
        var pairs = [];

        this._grid.forEach(function (gridColumn) {
            // ignore columns that have no cells
            if (!gridColumn) { return; }

            gridColumn.forEach(function (gridCell) {

                // ignore cells that have no objects
                if (!gridCell) { return; }

                gridCell.forEach(function (entityA, index) {
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

                    // for the entities after this object in a cell, because we already checked the ones before.
                    for (var x = index + 1; x < gridCell.length; x++) {
                        entityB = gridCell[x];

                        collidableA = entityA.collidable;
                        collidableB = entityB.collidable;

                        // We don't need to check static or disabled objects to other static objects.
                        if ((collidableA.isStatic && collidableB.isStatic) || !collidableA.isEnabled || !collidableB.isEnabled) {
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

                        if (top <= bottom && left <= right) {
                            pairs.push([entityA, entityB]);
                        }
                    }
                });

            });

        });

        return pairs;
    }

    sweepAndPrune() {
        var entities = this._entities;
        var gridWidth = Math.floor((this._detectionAreaSize.width) / this._cellSize);
        var gridHeight = Math.floor((this._detectionAreaSize.height) / this._cellSize);
        var boundsTop = this._detectionAreaPosition.y;
        var boundsBottom = this._detectionAreaPosition.y + this._detectionAreaSize.height;
        var boundsLeft = this._detectionAreaPosition.x;
        var boundsRight = this._detectionAreaPosition.x + this._detectionAreaSize.width;
        var cellSize = this._cellSize;

        // construct grid
        // NOTE: this is a purposeful use of the Array() constructor 
        var grid = this._grid = Array(gridWidth);

        // insert all entities into grid
        entities.forEach(function (entity) {
            var x;
            var y;
            var gridColumn;
            var gridCell;
            var size;
            var position;

            size = entity.size;
            position = entity.position;

            // If entity is outside the detection region, then ignore it.
            if (position.x + size.width < boundsLeft ||
                position.x > boundsRight ||
                position.y + size.height < boundsTop ||
                position.y > boundsBottom) {
                return;
            }

            // Find the cells that the entity overlaps.
            var left = Math.floor((position.x - boundsLeft) / cellSize);
            var right = Math.floor((position.x + size.width - boundsLeft) / cellSize);
            var top = Math.floor((position.y - boundsTop) / cellSize);
            var bottom = Math.floor((position.y + size.height - boundsTop) / cellSize);

            // Insert entity into each cell it overlaps
            for (x = left; x <= right; x++) {

                // Make sure a column exists, initialize if not to grid height length
                // NOTE: again, a purposeful use of the Array constructor 
                if (!grid[x]) {
                    grid[x] = Array(gridHeight);
                }

                gridColumn = grid[x];

                // Loop through each cell in this column
                for (y = top; y <= bottom; y++) {

                    // Ensure we have a bucket to put entities into for this cell
                    if (!gridColumn[y]) {
                        gridColumn[y] = [];
                    }

                    gridCell = gridColumn[y];

                    // Add entity to cell
                    gridCell.push(entity);
                }
            }

        });
    }

    _getIndexByEntityId(id) {
        var index = -1;

        this._entities.some(function (entity, currentIndex) {
            if (entity.id === id) {
                index = currentIndex;
                return true;
            }
            return false;
        });

        return index;
    }

    _createBroadPhaseEntity(entity) {
        var broadPhaseEntity = new BroadPhaseEntity();
        broadPhaseEntity.id = entity.id;
        broadPhaseEntity.size = entity.getComponent("size");
        broadPhaseEntity.position = entity.getComponent("position");
        broadPhaseEntity.collidable = entity.getComponent("collidable");

        return broadPhaseEntity;
    }

    setDetectionArea(position, size) {
        this._detectionAreaPosition = position;
        this._detectionAreaSize = size;
    }

}

export = BroadPhaseCollisionSystem;