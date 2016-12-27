define(["require", "exports", "./../Entity", "./../components/Camera", "./../components/Size", "./../components/Position", "./../components/Collidable"], function (require, exports, Entity, CameraComponent, Size, Position, Collidable) {
    "use strict";
    class Camera extends Entity {
        constructor(name) {
            super();
            var camera = new CameraComponent();
            camera.name = name || null;
            var position = new Position();
            var size = new Size();
            var collidable = new Collidable();
            this.addComponent(camera);
            this.addComponent(position);
            this.addComponent(size);
            this.addComponent(collidable);
        }
    }
    return Camera;
});
//# sourceMappingURL=Camera.js.map