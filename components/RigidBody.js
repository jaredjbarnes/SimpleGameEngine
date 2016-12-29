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
            this.activeCollisions = new Map();
            this.minWorldPoint = { x: 0, y: 0 };
            this.size = { width: 0, height: 0 };
        }
    }
    return RigidBody;
});
//# sourceMappingURL=RigidBody.js.map