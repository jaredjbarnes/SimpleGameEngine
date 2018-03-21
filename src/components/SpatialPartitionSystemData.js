export default class SpatialPartitionSystemData {
    constructor(){
        this.type = "spatial-partition-system-data";
        this.entitiesById = {};
        this.dirtyCellPositions = {};
        this.grid = {};
        this.cellSize = 100;
        this.dirtyEntities = [];
        this.isDirty = false; // This could be used to change the cell size and repartitioning.
    }
}