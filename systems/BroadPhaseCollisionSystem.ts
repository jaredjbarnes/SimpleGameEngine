import Collidable = require("./../components/Collidable");
import Game = require("./../Game");
import Entity = require("./../Entity");

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
    isStatic: boolean;

    constructor() {
        this.timestamp = null;
        this.startTimestamp = null;
        this.endTimestamp = null;
        this.entityId = null;
        this.isStatic = false;
    }
}

class BroadPhaseCollisionSystem {
    private _dependencies: Array<string>;
    private _cameraDependencies: Array<string>;
    private _dynamicEntities: Array<BroadPhaseEntity>;
    private _staticEntities: Array<BroadPhaseEntity>;

    private _game: Game;
    private _cellSize: number;
    private _currentTimestamp: number;
    private _dynamicGrid: Array<Array<any>>;
    private _staticGrid: Array<Array<any>>;
    private _detectionAreaPosition: { x: number; y: number; };
    private _detectionAreaSize: { width: number; height: number; };

    constructor(cellSize) {
        this._dependencies = ["collidable"];
        this._cameraDependencies = ["position", "size", "camera"];
        this._dynamicEntities = [];
        this._staticEntities = [];
        this._game = null;
        this._cellSize = cellSize || 200;
        this._currentTimestamp = 0;
        this._dynamicGrid = [[]];
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

    entityAdded(entity: Entity) {
        if (entity.hasComponents(this._dependencies)) {
            var collidable = entity.getComponent<Collidable>("collidable");

            if (collidable.isStatic) {
                this._staticEntities.push(this._createBroadPhaseEntity(entity));
                this._staticGrid = this.sweepAndPrune(this._staticEntities);
                this.assignTimestamps(this.queryForStaticCollisions());
            } else {
                this._dynamicEntities.push(this._createBroadPhaseEntity(entity));
            }

        }
    }

    entityRemoved(entity) {
        var index = this._getIndexByEntityId(this._dynamicEntities, entity.id);

        if (index > -1) {
            this._dynamicEntities.splice(index, 1);
        }

        index = this._getIndexByEntityId(this._staticEntities, entity.id);

        if (index > -1) {
            this._staticEntities.splice(index, 1);
            this._removeStaticCollisionById(entity.id);
        }
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(this._dependencies)) {
            this.entityAdded(entity);
        }
    }

    componentRemoved(entity, component) {
        this.entityRemoved(entity);
    }

    update() {
        this._currentTimestamp = this._game.getTime();
        // Update dynamic entities.
        this._dynamicGrid = this.sweepAndPrune(this._dynamicEntities);

        this.assignTimestamps(this.queryForDynamicCollisions());
        this.cleanCollisions();
    }

    _removeStaticCollisionById(id: string) {
        this._staticEntities.forEach(function (entity: BroadPhaseEntity) {
            var activeCollisions = entity.collidable.activeCollisions;
            activeCollisions.delete(id);
        });

        this._staticGrid = this.sweepAndPrune(this._staticEntities);
    }

    // Custom methods.
    cleanCollisions() {
        var entities = this._dynamicEntities;
        var game = this._game;
        var currentTimestamp = this._currentTimestamp;

        entities.forEach(function (entity) {
            var collisions = entity.collidable.activeCollisions;

            Array.from(collisions.entries()).forEach(function (entry) {
                var key = entry[0];
                var collision = entry[1];

                if (collision.timestamp !== currentTimestamp) {

                    // We know the collision ended if the timestamp didn't update to our current timestamp.
                    collision.endTimestamp = currentTimestamp;

                    // Allow for some time to pass, before removing, because its likely they'll hit again.
                    if (!collision.isStatic && currentTimestamp - collision.timestamp > 3000) {
                        delete collisions[key];
                    }
                }
            });
        });

    }

    assignTimestamps(pairs) {
        var currentTimestamp = this._currentTimestamp;

        pairs.forEach(function (pair: Array<BroadPhaseEntity>, index) {
            var entityA = pair[0];
            var entityB = pair[1];
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
                collidableA.isInitialized = true;
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

                collidableB.isInitialized = true;
                collidableB.activeCollisions.set(entityA.id, collisionDataB)

            } else {
                collisionDataB.timestamp = currentTimestamp;
                collisionDataB.endTimestamp = null;
            }

        });
    }

    queryForStaticCollisions() {
        var pairs = [];
        var staticGrid = this._staticGrid;

        staticGrid.forEach(function (gridColumn, columnIndex) {

            gridColumn.forEach(function (gridCell, cellIndex) {

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

                        // We don't need to check initialized or disabled collisions.
                        if ((collidableA.isStatic &&
                            collidableB.isStatic &&
                            collidableA.isInitialized &&
                            collidableB.isInitialized) ||
                            !collidableA.isEnabled ||
                            !collidableB.isEnabled) {
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

    queryForDynamicCollisions() {
        var pairs = [];
        var staticGrid = this._staticGrid;

        this._dynamicGrid.forEach(function (gridColumn, columnIndex) {
            var staticColumn = staticGrid[columnIndex];

            gridColumn.forEach(function (dynamicCell, cellIndex) {
                var gridCell;
                var staticCell = staticGrid[columnIndex] && staticGrid[columnIndex][cellIndex];

                if (Array.isArray(staticCell) && Array.isArray(dynamicCell)) {
                    gridCell = staticCell.concat(dynamicCell);
                } else if (Array.isArray(staticCell) && !Array.isArray(dynamicCell)) {
                    gridCell = staticCell;
                } else if (!Array.isArray(staticCell) && Array.isArray(dynamicCell)) {
                    gridCell = dynamicCell;
                } else if (!Array.isArray(staticCell) && !Array.isArray(dynamicCell)) {
                    // ignore columns that have no cells
                    return;
                }

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
                        if (
                            ((collidableA.isStatic && collidableB.isStatic) ||
                                (!collidableA.isEnabled || !collidableB.isEnabled)) &&
                            (collidableA.isInitialized && collidableB.isInitialized)
                        ) {
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

    sweepAndPrune(entities: Array<BroadPhaseEntity>) {
        var gridWidth = Math.floor((this._game.size.width) / this._cellSize);
        var gridHeight = Math.floor((this._game.size.height) / this._cellSize);
        var boundsTop = 0;
        var boundsBottom = this._game.size.height;
        var boundsLeft = 0;
        var boundsRight = this._game.size.width;
        var cellSize = this._cellSize;

        // construct grid
        // NOTE: this is a purposeful use of the Array() constructor 
        var grid = Array(gridWidth);

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

                if (x < 0) {
                    continue;
                }

                // Make sure a column exists, initialize if not to grid height length
                // NOTE: again, a purposeful use of the Array constructor 
                if (!grid[x]) {
                    grid[x] = Array(gridHeight);
                }

                gridColumn = grid[x];

                // Loop through each cell in this column
                for (y = top; y <= bottom; y++) {

                    if (y < 0) {
                        continue;
                    }

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

        return grid;
    }

    _getIndexByEntityId(entities, id) {
        var index = -1;

        entities.some(function (entity, currentIndex) {
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