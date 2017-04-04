define(["require", "exports", "./../Entity", "./../components/Camera", "./../components/Size", "./../components/Position", "./../components/Collidable"], function (require, exports, Entity_1, Camera_1, Size_1, Position_1, Collidable_1) {
    "use strict";
    class Camera extends Entity_1.default {
        constructor(name) {
            super();
            var camera = new Camera_1.default();
            camera.name = name || null;
            var position = new Position_1.default();
            var size = new Size_1.default();
            var collidable = new Collidable_1.default();
            this.addComponent(camera);
            this.addComponent(position);
            this.addComponent(size);
            this.addComponent(collidable);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Camera;
});
//# sourceMappingURL=Camera.js.map