export default class BroadPhaseCollisionData {
    constructor(){
        this.type = "broad-phase-collision-data";
        this.dirtyCellPositions = [];
        this.grid = null;
        this.cellSize = 0;
    }
}