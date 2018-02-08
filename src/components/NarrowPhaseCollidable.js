export class Part {
    constructor() {
        this.points = [];
        this.vertices = [];
        this.normals = [];
        this.worldPoints = [];
        this.projectionVertices = [];
        this.origin = { x: 0, y: 0 };
        this.size = { width: 0, height: 0 };
    }
}

export class NarrowPhaseCollidable {
    constructor() {
        this.type = "narrow-phase-collidable";
        this.name = null;
        this.isInitialized = false;
        this.isPrepared = false;
        this.isEnabled = true;
        this.collisions = {};
        this.parts = [];
    }

}