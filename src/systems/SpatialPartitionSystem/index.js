import Entity from "../Entity";
import Grid from "./Grid";
import SpatialPartition from "../components/SpatialPartition";
import SpatialPartitionService from "../../services/SpatialPartitionService";
import SpatialPartition from "../components/SpatialPartition";

const PLACABLE_ENTITY_DEPENDENCIES = ["transform", "rectangle"];

export default class SpatialPartitionSystem {
    constructor() {
        this.world = null;
        this.boundingRectangleData = null;
        this.spatialPartitionService = new SpatialPartitionService();
        this.grid = new Grid(spatialPartitionService.grid);
    }

    addPlacableEntity(entity) {
        entity.addComponent(new SpatialPartition());
        this.spatialPartitionService.entitiesById[entity] = entity;
    }

    updateGrid() {
        const spatialPartitionService = this.spatialPartitionService;
        const entitiesById = spatialPartitionService.entitiesById;
        const dirtyEntities = spatialPartitionService.dirtyEntities;
        const grid = this.grid;

        dirtyEntities.length = 0;
        spatialPartitionService.dirtyCellPositions = {};

        for (let i = 0; i < this.boundingRectangleData.dirtyEntities.length; i++) {
            const entity = this.boundingRectangleData.dirtyEntities[i];

            const spatialPartition = entity.getComponent("spatial-partition");
            const lastCellPositions = spatialPartition.cellPositions;
            const newCellPositions = this.getCellPositions(entity);

            spatialPartition.lastCellPositions = lastCellPositions;
            spatialPartition.cellPositions = newCellPositions;

            for (let x = 0; x < lastCellPositions.length; x++) {
                const cellPosition = lastCellPositions[x];
                const key = grid.getKey(cellPosition);
                spatialPartitionService.dirtyCellPositions[key] = cellPosition;
            }

            for (let x = 0; x < newCellPositions.length; x++) {
                const cellPosition = newCellPositions[x];
                const key = grid.getKey(cellPosition);
                spatialPartitionService.dirtyCellPositions[key] = cellPosition;
            }

            grid.remove(lastCellPositions, entity);
            grid.add(newCellPositions, entity);

            dirtyEntities.push(entity);
        }
    }

    getCellPositions(entity) {
        const rectangle = entity.getComponent("rectangle");
        const top = rectangle.top;
        const left = rectangle.left;
        const right = rectangle.right;
        const bottom = rectangle.bottom;
        const cellSize = this.spatialPartitionService.cellSize;

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

    isPlacable(_entity) {
        const entity = _entity;
        return entity.hasComponents(PLACABLE_ENTITY_DEPENDENCIES);
    }

    isReady() {
        return this.world != null && this.boundingRectangleData != null;
    }

    removePlacableEntity(_entity) {
        const entity = _entity;
        const entitiesById = this.spatialPartitionService.entitiesById;
        const spatialPartitioning = entity.getComponent("spatial-partition");
        const cellPositions = spatialPartitioning.cellPositions;

        this.grid.remove(cellPositions, entity);

        delete entitiesById[entity.id];
    }

    wasEntityPlacable(entity, component) {
        return this.spatialPartitionService.entitiesById[entity.id] &&
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

        world.addService(this.spatialPartitionService);
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
        world.removeService(this.spatialPartitionService);

        this.world = null;
        this.grid.clear();
        this.spatialPartitionService.dirtyCellPositions = [];
        this.spatialPartitionService.dirtyEntities = [];
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
            this.spatialPartitionService.entitiesById[entity.id]) {
            this.removePlacableEntity();
        }
    }

    serviceAdded(name, service) {
        if (name === "bounding-rectangle-data") {
            this.boundingRectangleData = service;
        }
    }

    update() {
        if (this.isReady()) {
            this.updateGrid();
        }
    }
}