export default class PolygonCollider {
    constructor() {
        this.type = "polygon-collider";
        this.collisions = {};
        this.lastRotation = 0;
        this.polygons = [];
    }
}