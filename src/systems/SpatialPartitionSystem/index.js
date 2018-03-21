import Entity from "../Entity";
import Grid from "./Grid";
import SpatialPartition from "../components/SpatialPartition";
import SpatialPartitionSystemData from "../components/SpatialPartitionSystemData";

const PLACABLE_ENTITY_DEPENDENCIES = ["transform", "rectangle"];

export default class SpatialPartitionSystem {
    constructor() {
        this.spatialPartitionSystemData = null;
        this.spatialPartitionSystemDataEntity = null;
        this.world = null;
        this.rectangleSystemData = null;
        this.rectangleSystemDataEntity = null;
        this.spatialPartitionSystemDataEntity = new Entity();
        this.spatialPartitionSystemData = new SpatialPartitionSystemData();
        this.spatialPartitionSystemDataEntity.addComponent(this.spatialPartitionSystemData);
        this.grid = new Grid(spatialPartitionSystemData.grid);
    }

    addPlacableEntity(entity) {
        entity.addComponent(new SpatialPartitionData());
        this.spatialPartitionSystemData.entitiesById[entity] = entity;
    }

    updateGrid() {
        const spatialPartitionSystemData = this.spatialPartitionSystemData;
        const entitiesById = spatialPartitionSystemData.entitiesById;
        const dirtyEntities = spatialPartitionSystemData.dirtyEntities;
        const grid = this.grid;

        dirtyEntities.length = 0;
        spatialPartitionSystemData.dirtyCellPositions = {};

        for (let id in entitiesById) {
            const entity = entitiesById[id];

            if (this.isEntityDirty(entity)) {
                const spatialPartition = entity.getComponent("spatial-partition");
                const lastCellPositions = spatialPartition.cellPositions;
                const newCellPositions = this.getCellPositions(entity);

                spatialPartition.lastCellPositions = lastCellPositions;
                spatialPartition.cellPositions = newCellPositions;

                for (let x = 0; x < lastCellPositions.length; x++) {
                    const cellPosition = lastCellPositions[x];
                    const key = grid.getKey(cellPosition);
                    spatialPartitionSystemData.dirtyCellPositions[key] = cellPosition;
                }

                for (let x = 0; x < newCellPositions.length; x++) {
                    const cellPosition = newCellPositions[x];
                    const key = grid.getKey(cellPosition);
                    spatialPartitionSystemData.dirtyCellPositions[key] = cellPosition;
                }

                grid.remove(lastCellPositions, entity);
                grid.add(newCellPositions, entity);

                dirtyEntities.push(entity);
            }
        }
    }

    getCellPositions(entity) {
        const rectangle = entity.getComponent("rectangle");
        const top = rectangle.top;
        const left = rectangle.left;
        const right = rectangle.right;
        const bottom = rectangle.bottom;
        const cellSize = this.spatialPartitionSystemData.cellSize;

        const topCell = Math.floor(top / cellSize);
        const bottomCell = Math.floor(bottom / cellSize);
        const leftCell = Math.floor(left / cellSize);
        const rightCell = Math.floor(right / cellSize);

        let row = topCell;
        let column = leftCell;

        let cellPositions = [];

        while (row <= bottomCell) {
            while (column <= rightCell) {
                cellPositions.push({ column, row });
                column += 1;
            }
            column = leftCell;
            row += 1;
        }

        return cellPositions;
    }

    isEntityDirty(_entity) {
        const entity = _entity;
        return entity.getComponent("transform").isDirty || entity.getComponent("rectangle");
    }

    isPlacable(_entity) {
        const entity = _entity;
        return entity.hasComponents(PLACABLE_ENTITY_DEPENDENCIES);
    }

    isReady() {
        return this.world != null;
    }

    removePlacableEntity(_entity) {
        const entity = _entity;
        const entitiesById = this.spatialPartitionSystemData.entitiesById;
        const spatialPartition = entity.getComponent("spatial-partition");
        const cellPositions = spatialPartition.cellPositions;
        this.grid.remove(cellPositions, entity);
        delete entitiesById[entity.id];
    }

    wasEntityPlacable(entity, component) {
        return this.spatialPartitionSystemData.entitiesById[entity.id] &&
            PLACABLE_ENTITY_DEPENDENCIES.indexOf(component.type) > -1;
    }

    //Life Cycle Hooks
    activated(world) {
        this.world = world;
        const entities = this.getEntities();

        for (let x = 0; x < entities.length; x++) {
            const entity = entities[x];
            this.entityAdded(entity);
        }
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (this.wasEntityPlacable(entity, component)) {
            this.removePlacableEntity(entity);
        }
    }

    deactivated() {
        this.world = null;
        this.grid.clear();
        this.spatialPartitionSystemDataEntity.entitiesById = {};
        this.spatialPartitionSystemDataEntity.dirtyCellPositions = [];
        this.spatialPartitionSystemDataEntity.dirtyEntities = [];
    }

    entityAdded(_entity) {
        const entity = _entity;

        if (this.isPlacable(entity)) {
            this.addPlacableEntity(entity);
        }
    }

    entityRemoved(_entity) {
        const entity = _entity;

        if (this.isPlacable(entity) &&
         this.spatialPartitionSystemData.entitiesById[entity.id]) {
            this.removePlacableEntity();
        }
    }

    update() {
        if (this.isReady()) {
            this.updateGrid();
        }
    }
}