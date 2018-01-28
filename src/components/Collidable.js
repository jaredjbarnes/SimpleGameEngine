export default class Collidable {
    constructor() {
        this.type = "collidable";
        this.name = null;
        this.collisions = {};
        this.cellPositions = [];
    }
}