const DEPENDENCIES = ["spatial-partition"];

export default class SpatialPartitionDataSystem {
    constructor() {
        this.world = null;
        this.name = "spatial-partition-data";
        this.entities = {};
    }

    isSpacialPartitionable(entity) {
        return entity.hasComponents(DEPENDENCIES);
    }

    activated(world) {
        this.world = world;

        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.world = null;
        this.entities = {};
    }

    componentAdded(entity) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.includes(component.type)) {
            delete this.entities[entity.id];
        }
    }

    entityAdded(entity) {
        if (this.isSpacialPartitionable(entity)) {
            this.entities[entity.id] = entity;
        }
    }

    entityRemoved(entity) {
        if (this.entities[entity.id]) {
            delete this.entities[entity.is];
        }
    }

    areCellPositionsEqual(lastCellPositions, currentCellPositions) {
        if (lastCellPositions.length !== currentCellPositions.length) {
            return false;
        }

        return currentCellPositions.every((cellPosition) => {
            return lastCellPositions.find((otherCellPosition) => {
                return otherCellPosition.column === cellPosition.column &&
                    otherCellPosition.row === cellPosition.row;
            }) != null;
        });
    }

    update() {
        for (let key in this.entities) {
            const entity = this.entities[key];
            const spatialPartition = entity.getComponent("spatial-partition");

            if (entity.type === "player" && !this.areCellPositionsEqual(spatialPartition.lastCellPositions, spatialPartition.cellPositions)) {
                console.log(spatialPartition.cellPositions, spatialPartition.lastCellPositions);
            }
        }
    }
}