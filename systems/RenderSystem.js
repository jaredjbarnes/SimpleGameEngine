define(["require", "exports"], function (require, exports) {
    "use strict";
    var RenderSystem = (function () {
        function RenderSystem(canvas) {
            this._renderers = {};
            this._game = null;
            this._dynamicEntities = [];
            this._staticEntities = [];
            this._dependencies = ["position", "size"];
            this._cameraDependencies = ["camera", "position", "size"];
            this._camera = null;
            this._cameraPosition = null;
            this._cameraSize = null;
            this._staticCanvas = document.createElement("canvas");
            this._staticContext = this._staticCanvas.getContext("2d");
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
        }
        RenderSystem.prototype._invokeMethod = function (obj, methodName, args) {
            args = Array.isArray(args) ? args : [];
            if (obj && typeof obj[methodName] === "function") {
                return obj[methodName].apply(obj, args);
            }
        };
        RenderSystem.prototype._notifyRenderers = function (methodName, args) {
            var self = this;
            var renderers = Object.keys(this._renderers).map(function (type) {
                return self._renderers[type];
            });
            renderers.forEach(function (renderer) {
                self._invokeMethod(renderer, methodName, args);
            });
        };
        RenderSystem.prototype.addRenderer = function (renderer) {
            var type = renderer.type;
            if (this._game != null) {
                throw new Error("Cannot add renderers when activated by a game.");
            }
            var renderers = this._renderers;
            if (typeof type === "string") {
                renderers[type] = renderer;
            }
        };
        RenderSystem.prototype.removeRenderer = function (renderer) {
            var type = renderer.type;
            if (this._game != null) {
                throw new Error("Cannot remove renderers when activated by a game.");
            }
            var renderers = this._renderers;
            var registeredRenderer = renderers[type];
            var dependencies = this._dependencies;
            if (registeredRenderer) {
                delete renderers[type];
            }
        };
        RenderSystem.prototype.supportsEntity = function (entity) {
            return Object.keys(this._renderers).some(function (type) {
                return entity.hasComponents([type]);
            });
        };
        // System Strategy Starts
        RenderSystem.prototype.activated = function (game) {
            var self = this;
            this._game = game;
            game.getEntities().forEach(function (entity) {
                self.entityAdded(entity);
            });
        };
        RenderSystem.prototype.deactivated = function () {
            this._game = null;
            this._dynamicEntities = [];
            this.canvas = null;
            this.context = null;
        };
        RenderSystem.prototype.update = function () {
            var rendererTypes = Object.keys(this._renderers);
            var renderers = this._renderers;
            var canvas = this.canvas;
            var cameraPosition = this._cameraPosition;
            if (cameraPosition == null) {
                return;
            }
            this.context.clearRect(0, 0, canvas.width, canvas.height);
            this._dynamicEntities.forEach(function (entity) {
                rendererTypes.forEach(function (type) {
                    var component = entity.getComponent(type);
                    if (component != null) {
                        renderers[type].draw(entity, canvas, cameraPosition);
                    }
                });
            });
        };
        RenderSystem.prototype.entityAdded = function (entity) {
            var index = this._dynamicEntities.indexOf(entity);
            if (index === -1 && entity.hasComponents(this._dependencies) && this.supportsEntity(entity)) {
                this._dynamicEntities.push(entity);
                this._notifyRenderers("entityAdded", [entity]);
            }
        };
        RenderSystem.prototype.entityRemoved = function (entity) {
            var entities = this._dynamicEntities;
            var index = entities.indexOf(entity);
            if (index > -1) {
                entities.splice(index, 1);
                this._notifyRenderers("entityRemoved", [entity]);
            }
        };
        RenderSystem.prototype.componentAdded = function (entity, component) {
            if (entity.hasComponents(this._dependencies) && this.supportsEntity(entity)) {
                this.entityAdded(entity);
            }
        };
        RenderSystem.prototype.componentRemoved = function (entity, component) {
            if (Object.keys(this._renderers).indexOf(component.type) > -1) {
                this.entityRemoved(entity);
            }
        };
        Object.defineProperty(RenderSystem.prototype, "camera", {
            get: function () {
                return this._camera;
            },
            set: function (entity) {
                if (entity.hasComponents(this._cameraDependencies)) {
                    this._camera = entity;
                    this._cameraPosition = entity.getComponent("position");
                    this._cameraSize = entity.getComponent("size");
                }
            },
            enumerable: true,
            configurable: true
        });
        RenderSystem.prototype.setCameraByName = function (name) {
            var cameraDependencies = this._cameraDependencies;
            var cameras = this._game.getEntitiesByFilter(function (entity) {
                var isCamera = entity.hasComponents(cameraDependencies);
                if (isCamera) {
                    var camera = entity.getComponent("camera");
                    if (camera.name === name) {
                        return true;
                    }
                }
                return false;
            });
            if (cameras.length > 1) {
                throw new Error("There multiple cameras with that name.");
            }
            if (cameras.length === 0) {
                throw new Error("Unable to find a camera with that name.");
            }
            this.camera = cameras[0];
        };
        return RenderSystem;
    }());
    return RenderSystem;
});
//# sourceMappingURL=RenderSystem.js.map