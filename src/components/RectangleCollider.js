export default class RectangleCollider {
    constructor() {
        this.type = "rectangle-collider";
        this.name = null;
        this.collisions = {};
        this.cellPositions = [];
        this.lastCellPositions = [];
    }
}