define(["require", "exports"], function (require, exports) {
    "use strict";
    var FollowEntityCameraSystem = (function () {
        function FollowEntityCameraSystem() {
            this._camera = null;
            this._cameraSize = null;
            this._cameraPosition = null;
            this._entityToFollow = null;
            this._entitySize = null;
            this._entityPosition = null;
            this._game = null;
            this._worldSize = null;
        }
        Object.defineProperty(FollowEntityCameraSystem.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            set: function (value) {
                if (value.hasComponents(["camera", "position", "size"])) {
                    this._camera = value;
                    this._cameraPosition = value.getComponent("position");
                    this._cameraSize = value.getComponent("size");
                }
            },
            enumerable: true,
            configurable: true
        });
        FollowEntityCameraSystem.prototype.setEntityToFollow = function (entity) {
            if (entity.hasComponents(["position", "size"])) {
                this._entityToFollow = entity;
                this._entitySize = entity.getComponent("size");
                this._entityPosition = entity.getComponent("position");
            }
        };
        FollowEntityCameraSystem.prototype.update = function () {
            if (this._entityToFollow != null && this._camera != null) {
                var x = this._entityPosition.x - (this._cameraSize.width / 2) + (this._entitySize.width / 2);
                var y = this._entityPosition.y - (this._cameraSize.height / 2) + (this._entitySize.height / 2);
                if (x < 0) {
                    x = 0;
                }
                if (y < 0) {
                    y = 0;
                }
                if (x + this._cameraSize.width > this._worldSize.width) {
                    x = this._worldSize.width - this._cameraSize.width;
                }
                if (y + this._cameraSize.height > this._worldSize.height) {
                    y = this._worldSize.height - this._cameraSize.height;
                }
                this._cameraPosition.x = x;
                this._cameraPosition.y = y;
            }
        };
        FollowEntityCameraSystem.prototype.activated = function (game) {
            this._game = game;
            this._worldSize = game.size;
        };
        FollowEntityCameraSystem.prototype.deactivate = function () { };
        return FollowEntityCameraSystem;
    }());
    return FollowEntityCameraSystem;
});
//# sourceMappingURL=FollowEntityCameraSystem.js.map