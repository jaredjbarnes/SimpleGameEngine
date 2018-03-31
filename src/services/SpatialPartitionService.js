export default class SpatialPartitionService {
    constructor(cellSize = 128) {
        this.name = "spatial-partition-service";
        this.entitiesById = {};
        this.dirtyCellPositions = {};
        this.grid = {};
        this.cellSize = cellSize;
    }
}