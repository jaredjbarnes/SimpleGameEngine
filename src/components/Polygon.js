export default class Polygon {
    constructor() {
        this.type = "polygon";
        this.points = [];
        this.rotatedPoints = [];
        this.vertices = [];
        this.normals = [];
        this.worldPoints = [];
        this.projectionVertices = [];
        this.center = { x: 0, y: 0 };
        this.size = { width: 0, height: 0 };
    }
}