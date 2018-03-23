export default class SpatialPartitionService {
    constructor(cellSize = 100) {
        this.name = "spatial-partition-data";
        this.entitiesById = {};
        this.dirtyCellPositions = {};
        this.grid = {};
        this.cellSize = cellSize;
    }
}