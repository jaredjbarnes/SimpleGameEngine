export default class SpatialPartitionData {
    constructor(cellSize = 128) {
        this.type = "spatial-partition-data";
        this.isSerializable = false;
        this.entitiesById = {};
        this.dirtyCellPositions = {};
        this.grid = {};
        this.cellSize = cellSize;
    }
}