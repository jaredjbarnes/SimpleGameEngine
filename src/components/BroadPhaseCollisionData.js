export default class BroadPhaseCollisionData {
    constructor() {
        this.type = "broad-phase-collision-data";
        this.collidableEntitiesById = {};
        this.dirtyCellPositions = [];
        this.grid = null;
        this.cellSize = 0;
        this.dirtyEntities = [];
    }
}