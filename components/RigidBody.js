define(["require", "exports"], function (require, exports) {
    "use strict";
    class RigidBody {
        constructor() {
            this.type = "rigid-body";
            this.name = null;
            this.points = [];
            this.vertices = [];
            this.normals = [];
            this.worldPoints = [];
            this.projectionVertices = [];
            this.activeCollisions = new Map();
            this.size = { width: 0, height: 0 };
            this.origin = { x: 0, y: 0 };
            this.isInitialized = false;
            this.isEnabled = true;
        }
    }
    return RigidBody;
});
//# sourceMappingURL=RigidBody.js.map