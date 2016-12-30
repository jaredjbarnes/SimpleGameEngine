class RigidBody {
    type: string;
    name: string;
    points: Array<{x: number; y: number}>;
    vertices: Array<{x: number; y: number}>;
    normals: Array<{x: number; y: number}>;
    worldPoints: Array<{x: number; y: number}>;
    minWorldPoint: {x: number; y: number};
    size: {width: number; height: number};
    origin: {x: number; y: number};
    activeCollisions: Map<string, any>;
    projectionVertices: Array<{x: number; y: number}>;

    constructor(){
        this.type = "rigid-body";
        this.name = null;
        this.points = [];
        this.vertices = [];
        this.normals = [];
        this.worldPoints = [];
        this.projectionVertices = [];
        this.activeCollisions = new Map();
        this.minWorldPoint = {x: 0, y: 0};
        this.size = {width: 0, height:0};
        this.origin = {x:0,y:0 };
    }

}

export = RigidBody;