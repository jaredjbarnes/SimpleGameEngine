export class Part {

}

export class RigidBody {
    type: string;
    name: string;
    isInitialized: boolean;
    isEnabled: boolean;
    activeCollisions: Map<string, any>;
    size: { width: number; height: number };
    origin: { x: number; y: number };
    parts: Array<Part>;

    points: Array<{ x: number; y: number }>;
    vertices: Array<{ x: number; y: number }>;
    normals: Array<{ x: number; y: number }>;
    worldPoints: Array<{ x: number; y: number }>;
    projectionVertices: Array<{ x: number; y: number }>;

    constructor() {
        this.type = "rigid-body";
        this.name = null;
        this.isInitialized = false;
        this.isEnabled = true;
        this.activeCollisions = new Map();
        this.size = { width: 0, height: 0 };
        this.origin = { x: 0, y: 0 };
        this.parts = [];
        this.points = [];
        this.vertices = [];
        this.normals = [];
        this.worldPoints = [];
        this.projectionVertices = [];
    }

}