var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./../Entity", "./../components/Camera", "./../components/Size", "./../components/Position", "./../components/Collidable"], function (require, exports, Entity, CameraComponent, Size, Position, Collidable) {
    "use strict";
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera(name) {
            _super.call(this);
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
        return Camera;
    }(Entity));
    return Camera;
});
//# sourceMappingURL=Camera.js.map