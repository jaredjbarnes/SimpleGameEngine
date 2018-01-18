export default class BroadPhaseCollisionData {
    constructor(){
        this.type = "broad-phase-collision-data";
        this.dirtyCellPositions = [];
        this.cellPositionsOfEntitiesById = null;
        this.grid = null;
        this.cellSize = 0;
    }
}