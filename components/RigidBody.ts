export class Part {
    points: Array<{ x: number; y: number }>;
    vertices: Array<{ x: number; y: number }>;
    normals: Array<{ x: number; y: number }>;
    worldPoints: Array<{ x: number; y: number }>;
    projectionVertices: Array<{ x: number; y: number }>;
    origin: { x: number; y: number };
    size: { width: number; height: number };

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

export class RigidBody {
    type: string;
    name: string;
    isInitialized: boolean;
    isEnabled: boolean;
    activeCollisions: Map<string, any>;
    parts: Array<Part>;

    constructor() {
        this.type = "rigid-body";
        this.name = null;
        this.isInitialized = false;
        this.isEnabled = true;
        this.activeCollisions = new Map();
        this.parts = [];
    }

}