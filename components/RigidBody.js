define(["require", "exports"], function (require, exports) {
    "use strict";
    class Part {
    }
    exports.Part = Part;
    class RigidBody {
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
    exports.RigidBody = RigidBody;
});
//# sourceMappingURL=RigidBody.js.map