define(["require", "exports", "./../components/ZIndex"], function (require, exports, ZIndex) {
    "use strict";
    var defaultZIndex = new ZIndex();
    var defaultCachePosition = { x: 0, y: 0 };
    var RenderSystem = (function () {
        function RenderSystem(canvas, sort) {
            this._renderers = {};
            this._game = null;
            this._dependencies = ["position", "size"];
            this._cameraDependencies = ["camera", "position", "size"];
            this._camera = null;
            this._cameraPosition = null;
            this._cameraSize = null;
            this._staticCacheByZIndex = {};
            this._entitiesByZIndex = {};
            this._sort = sort || null;
            var defaultSort = this._defaultSort = function (entityA, entityB) {
                var value = 0;
                if (sort != null) {
                    value = sort(entityA, entityB);
                }
                if (value === 0) {
                    if (entityA.id < entityB.id) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }
                return value;
            };
            this._zIndexSort = function (entityA, entityB) {
                var zIndexA = entityA.getComponent("z-index");
                var zIndexB = entityB.getComponent("z-index");
                var value;
                zIndexA = zIndexA || defaultZIndex;
                zIndexB = zIndexB || defaultZIndex;
                if (zIndexA.value < zIndexB.value) {
                    return -1;
                }
                else if (zIndexA.value > zIndexB.value) {
                    return 1;
                }
                else {
                    return defaultSort(entityA, entityB);
                }
            };
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
            this.canvas = null;
            this.context = null;
        };
        RenderSystem.prototype.update = function () {
            var self = this;
            var game = this._game;
            var canvas = this.canvas;
            var context = canvas.getContext("2d");
            var cameraPosition = this._cameraPosition;
            var cameraSize = this._cameraSize;
            var caches = this._staticCacheByZIndex;
            if (cameraPosition == null || game == null) {
                return;
            }
            this.context.clearRect(0, 0, canvas.width, canvas.height);
            // This is how we optimize rendering. We use the collision system with the camera entity.
            var activeCollisions = this.camera.getComponent("collidable").activeCollisions;
            var entities = Object.keys(activeCollisions).map(function (key) {
                return game.getEntityById(activeCollisions[key].entityId);
            }).filter(function (entity) {
                return self.isDynamicEntity(entity);
            });
            var cacheKeys = Object.keys(this._staticCacheByZIndex).sort(function (a, b) {
                return parseInt(a, 10) - parseInt(b, 10);
            });
            cacheKeys.forEach(function (key) {
                context.drawImage(caches[key], Math.floor(cameraPosition.x), Math.floor(cameraPosition.y), Math.floor(cameraSize.width), Math.floor(cameraSize.height), 0, 0, Math.floor(cameraSize.width), Math.floor(cameraSize.height));
            });
            entities.forEach(function (entity) {
                self.redrawEntityOnCamera(entity, canvas);
            });
        };
        RenderSystem.prototype.entityAdded = function (entity) {
            if (entity.hasComponents(this._dependencies) && this.supportsEntity(entity)) {
                this.cacheEntity(entity);
            }
        };
        RenderSystem.prototype.entityRemoved = function (entity) {
        };
        RenderSystem.prototype.componentAdded = function (entity, component) {
        };
        RenderSystem.prototype.componentRemoved = function (entity, component) {
        };
        RenderSystem.prototype.redrawEntityOnCanvas = function (entity, canvas) {
            var self = this;
            var size = entity.getComponent("size");
            var position = entity.getComponent("position");
            var collidable = entity.getComponent("collidable");
            var zIndex = entity.getComponent("z-index");
            var layer = zIndex == null ? 0 : zIndex.value;
            var game = this._game;
            var activeCollisions = collidable.activeCollisions;
            var context = canvas.getContext("2d");
            var x = position.x;
            var y = position.y;
            var width = size.width;
            var height = size.height;
            var entityRight = x + width;
            var entityBottom = y + height;
            var canvasRight = canvas.width;
            var canvasBottom = canvas.height;
            var difference;
            if (entityRight > canvasRight) {
                difference = entityRight - canvasRight;
                width -= difference;
            }
            if (entityBottom > canvasBottom) {
                difference = entityBottom - canvasBottom;
                height -= difference;
            }
            if (position.x < 0) {
                x = 0;
                width += position.x;
            }
            if (position.y < 0) {
                y = 0;
                height += position.y;
            }
            if (width <= 0 || height <= 0) {
                return;
            }
            var entities = Object.keys(activeCollisions).filter(function (key) {
                var collision = activeCollisions[key];
                return collision.endTimestamp == null;
            }).map(function (id) {
                return game.getEntityById(id);
            }).filter(function (entity) {
                if (!self.supportsEntity(entity)) {
                    return false;
                }
                var zIndex = entity.getComponent("z-index");
                var otherLayer = zIndex == null ? 0 : zIndex.value;
                return layer === otherLayer;
            });
            entities.push(entity);
            entities.sort(this._defaultSort);
            context.clearRect(x, y, width, height);
            entities.forEach(function (entity) {
            });
        };
        RenderSystem.prototype.redrawEntityOnCamera = function (entity, canvas) {
            var self = this;
            var size = entity.getComponent("size");
            var position = entity.getComponent("position");
            var collidable = entity.getComponent("collidable");
            var zIndex = entity.getComponent("z-index");
            var layer = zIndex == null ? 0 : zIndex.value;
            var cameraPosition = this._cameraPosition;
            var cameraSize = this._cameraSize;
            var game = this._game;
            var activeCollisions = collidable.activeCollisions;
            var context = canvas.getContext("2d");
            var x = position.x - cameraPosition.x;
            var y = position.y - cameraPosition.y;
            var width = size.width;
            var height = size.height;
            var entityRight = x + width;
            var entityBottom = y + height;
            var canvasRight = canvas.width;
            var canvasBottom = canvas.height;
            var difference;
            var renderers = this._renderers;
            var rendererTypes = Object.keys(renderers);
            if (entityRight > canvasRight) {
                difference = entityRight - canvasRight;
                width -= difference;
            }
            if (entityBottom > canvasBottom) {
                difference = entityBottom - canvasBottom;
                height -= difference;
            }
            if (position.x < 0) {
                x = 0;
                width += position.x;
            }
            if (position.y < 0) {
                y = 0;
                height += position.y;
            }
            if (width <= 0 || height <= 0) {
                return;
            }
            var entities = Object.keys(activeCollisions).filter(function (key) {
                var collision = activeCollisions[key];
                return collision.endTimestamp == null;
            }).map(function (id) {
                return game.getEntityById(id);
            }).filter(function (entity) {
                return self.supportsEntity(entity);
            });
            entities.push(entity);
            entities.sort(this._zIndexSort);
            context.clearRect(x, y, width, height);
            entities.forEach(function (entity) {
            });
        };
        RenderSystem.prototype.drawEntityOnCanvas = function (entity, canvas) {
            var context = canvas.getContext("2d");
            var size = entity.getComponent("size");
            var position = entity.getComponent("position");
            var renderers = this._renderers;
            var rendererTypes = Object.keys(renderers);
            var canvasRight = canvas.width;
            var canvasBottom = canvas.height;
            var x = position.x;
            var y = position.y;
            var offsetX = 0;
            var offsetY = 0;
            var width = size.width;
            var height = size.height;
            var entityRight = x + width;
            var entityBottom = y + height;
            var difference;
            if (entityRight > canvasRight) {
                difference = entityRight - canvasRight;
                width -= difference;
            }
            if (entityBottom > canvasBottom) {
                difference = entityBottom - canvasBottom;
                height -= difference;
            }
            if (x < 0) {
                offsetX -= x;
                width += x;
                x = 0;
            }
            if (y < 0) {
                offsetY -= y;
                height += y;
                y = 0;
            }
            if (width === 0 || height === 0) {
                return;
            }
            rendererTypes.forEach(function (type) {
                var component = entity.getComponent(type);
                if (component != null) {
                    renderers[type].draw(entity, canvas, {
                        x: Math.floor(x),
                        y: Math.floor(y)
                    }, {
                        width: Math.floor(width),
                        height: Math.floor(height)
                    }, {
                        x: Math.floor(offsetX),
                        y: Math.floor(offsetY)
                    });
                }
            });
        };
        RenderSystem.prototype.drawEntityOnCamera = function (entity) {
            var canvas = this.canvas;
            var context = canvas.getContext("2d");
            var size = entity.getComponent("size");
            var position = entity.getComponent("position");
            var cameraPosition = this._cameraPosition;
            var cameraSize = this._cameraSize;
            var renderers = this._renderers;
            var rendererTypes = Object.keys(renderers);
            var cameraRight = cameraSize.width;
            var cameraBottom = cameraSize.height;
            var x = position.x - cameraPosition.x;
            var y = position.y - cameraPosition.y;
            var offsetX = 0;
            var offsetY = 0;
            var width = size.width;
            var height = size.height;
            var entityRight = x + width;
            var entityBottom = y + height;
            var difference;
            if (entityRight > cameraRight) {
                difference = entityRight - cameraRight;
                width -= difference;
            }
            if (entityBottom > cameraBottom) {
                difference = entityBottom - cameraBottom;
                height -= difference;
            }
            if (x < 0) {
                offsetX -= x;
                width += x;
                x = 0;
            }
            if (y < 0) {
                offsetY -= y;
                height += y;
                y = 0;
            }
            if (width === 0 || height === 0) {
                return;
            }
            rendererTypes.forEach(function (type) {
                var component = entity.getComponent(type);
                if (component != null) {
                    renderers[type].draw(entity, canvas, {
                        x: Math.floor(x),
                        y: Math.floor(y)
                    }, {
                        width: Math.floor(width),
                        height: Math.floor(height)
                    }, {
                        x: Math.floor(offsetX),
                        y: Math.floor(offsetY)
                    });
                }
            });
        };
        RenderSystem.prototype.isDynamicEntity = function (entity) {
            return entity != null &&
                entity.hasComponents(this._dependencies) &&
                this.supportsEntity(entity) &&
                !entity.getComponent("position").isStatic;
        };
        RenderSystem.prototype.getCanvasByZIndex = function (zIndex) {
            var canvas = this._staticCacheByZIndex[zIndex];
            if (canvas == null) {
                canvas = this._staticCacheByZIndex[zIndex] = document.createElement("canvas");
                canvas.width = this._game.size.width;
                canvas.height = this._game.size.height;
                canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
            }
            return canvas;
        };
        RenderSystem.prototype.cacheCanvasByZIndex = function (zIndex) {
            var self = this;
            var rendererTypes = Object.keys(this._renderers);
            var renderers = this._renderers;
            var entities = this._entitiesByZIndex[zIndex];
            var canvas = this.getCanvasByZIndex(zIndex);
            if (entities == null) {
                return;
            }
            if (this._sort) {
                entities.sort(this._sort);
            }
            var context = canvas.getContext("2d");
            canvas.width = this._game.size.width;
            canvas.height = this._game.size.height;
            context.clearRect(0, 0, canvas.width, canvas.height);
            entities.forEach(function (entity) {
                self.drawEntityOnCanvas(entity, canvas);
            });
        };
        RenderSystem.prototype.cacheEntity = function (entity) {
            var position = entity.getComponent("position");
            var zIndex = entity.getComponent("z-index") || defaultZIndex;
            var entities;
            var canvas = this.getCanvasByZIndex(zIndex.value);
            if (position.isStatic) {
                entities = this._entitiesByZIndex[zIndex.value];
                if (entities == null) {
                    entities = this._entitiesByZIndex[zIndex.value] = [];
                }
                entities.push(entity);
                this.drawEntityOnCanvas(entity, canvas);
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
                    // Adjust the cameras size to that of the canvas.
                    this._cameraSize.width = this.canvas.width;
                    this._cameraSize.height = this.canvas.height;
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