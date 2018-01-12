export default class BroadPhaseCollisionData {
    constructor(){
        this.type = "broad-phase-collision-data";
        this.dirtyCellPositions = [];
        this.grid = {};
        this.cellSize = 0;
    }
}