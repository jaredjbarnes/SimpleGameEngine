export default class RectangleCollisionData {
    constructor() {
        this.type = "rectangle-collision-data";
        this.entitiesById = {};
        this.dirtyCellPositions = [];
        this.grid = null;
        this.cellSize = 0;
        this.dirtyEntities = [];
    }
}