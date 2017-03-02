import Game = require("./../Game");
import Entity = require("./../Entity");
import Position = require("./../components/Position");
import Size = require("./../components/Size");
import ZIndex = require("./../components/ZIndex");
import Collidable = require("./../components/Collidable");

var defaultZIndex = new ZIndex();
var defaultCachePosition = { x: 0, y: 0 };

class RenderSystem {
    private _renderers: {
        [id: string]: {
            draw: (
                entity: Entity,
                canvas: HTMLCanvasElement,
                position: { x: number; y: number; },
                size: { width: number; height: number; },
                offset: { x: number; y: number; }
            ) => void;
        }
    };
    private _game: Game;
    private _dependencies: Array<string>;
    private _camera: Entity;
    private _cameraPosition: { x: number; y: number; };
    private _cameraSize: { width: number; height: number; };
    private _cameraDependencies: Array<string>;
    private _staticCacheByZIndex: { [id: string]: HTMLCanvasElement };
    private _entitiesByZIndex: { [id: string]: Array<Entity> };
    private _sort: (entityA, entityB) => number;
    private _zIndexSort: (entityA: Entity, entityB: Entity) => number;
    private _defaultSort: (entityA: Entity, entityB: Entity) => number;
    private _entitiesToBeRedrawn: Array<Entity>;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, sort?: (entityA, entityB) => number) {
        this._renderers = {};
        this._game = null;
        this._dependencies = ["position", "size"];
        this._cameraDependencies = ["camera", "position", "size"];
        this._camera = null;
        this._cameraPosition = null;
        this._cameraSize = null;
        this._staticCacheByZIndex = {};
        this._entitiesByZIndex = {};
        this._entitiesToBeRedrawn = [];
        this._sort = sort || null;

        var defaultSort = this._defaultSort = function (entityA, entityB) {
            var value = 0;

            if (sort != null) {
                value = sort(entityA, entityB);
            }

            if (value === 0) {
                if (entityA.id < entityB.id) {
                    return -1;
                } else {
                    return 1;
                }
            }

            return value;
        };

        this._zIndexSort = function (entityA: Entity, entityB: Entity) {
            var zIndexA = entityA.getComponent<ZIndex>("z-index");
            var zIndexB = entityB.getComponent<ZIndex>("z-index");
            var value;

            zIndexA = zIndexA || defaultZIndex;
            zIndexB = zIndexB || defaultZIndex;

            if (zIndexA.value < zIndexB.value) {
                return -1;
            } else if (zIndexA.value > zIndexB.value) {
                return 1;
            } else {
                return defaultSort(entityA, entityB);
            }
        };

        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    }

    _invokeMethod(obj, methodName, args) {
        args = Array.isArray(args) ? args : [];
        if (obj && typeof obj[methodName] === "function") {
            return obj[methodName].apply(obj, args);
        }
    }

    _notifyRenderers(methodName, args) {
        var self = this;
        var renderers = Object.keys(this._renderers).map(function (type) {
            return self._renderers[type];
        });

        renderers.forEach(function (renderer) {
            self._invokeMethod(renderer, methodName, args);
        });
    }

    addRenderer(renderer) {
        var type = renderer.type;

        if (this._game != null) {
            throw new Error("Cannot add renderers when activated by a game.");
        }

        var renderers = this._renderers;

        if (typeof type === "string") {
            renderers[type] = renderer;
        }
    }

    removeRenderer(renderer) {
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
    }

    supportsEntity(entity) {
        return Object.keys(this._renderers).some(function (type) {
            return entity.hasComponents([type]);
        });
    }

    // System Strategy Starts
    activated(game) {
        var self = this;
        this._game = game;

        game.getEntities().forEach(function (entity) {
            self.registerEntity(entity);
        });

        Object.keys(this._entitiesByZIndex).forEach(function (key) {
            self.cacheCanvasByZIndex(parseInt(key, 10));
        });
    }

    deactivated() {
        this._game = null;
        this.canvas = null;
        this.context = null;
    }

    update() {
        var key;
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

        this.updateCaches();
        this.context.clearRect(0, 0, canvas.width, canvas.height);

        // This is how we optimize rendering. We use the collision system with the camera entity.
        var activeCollisions = this.camera.getComponent<Collidable>("collidable").activeCollisions;

        var cacheKeys = Object.keys(this._staticCacheByZIndex).sort(function (a, b) {
            return parseInt(a, 10) - parseInt(b, 10);
        });

        for (var x = 0; x < cacheKeys.length; x++) {
            key = cacheKeys[x];
            context.drawImage(
                caches[key],
                Math.floor(cameraPosition.x),
                Math.floor(cameraPosition.y),
                Math.floor(cameraSize.width),
                Math.floor(cameraSize.height),
                0,
                0,
                Math.floor(cameraSize.width),
                Math.floor(cameraSize.height)
            )
        }

        activeCollisions.forEach((collision) => {
            var entity = game.getEntityById(collision.entityId);
            if (this.isDynamicEntity(entity)) {
                this.drawEntityOnCamera(entity, canvas);
            }
        });

    }

    drawOnCamera() { }

    entityAdded(entity: Entity) {
        if (entity.hasComponents(this._dependencies) && this.supportsEntity(entity)) {
            this.registerEntity(entity);
            this._entitiesToBeRedrawn.push(entity);
        }
    }

    entityRemoved(entity: Entity) {
        if (entity.hasComponents(this._dependencies) && this.supportsEntity(entity)) {
            this.uncacheEntity(entity);
        }
    }

    componentAdded(entity: Entity, component) {

    }

    componentRemoved(entity: Entity, component) {

    }

    updateCaches() {
        var self = this;

        this._entitiesToBeRedrawn.forEach((entity) => {
            this.cacheEntity(entity);
        });

        this._entitiesToBeRedrawn.length = 0;
    }

    redrawEntityOnCanvas(entity: Entity, canvas: HTMLCanvasElement, drawEntity: boolean = true) {
        if (canvas == null) {
            return;
        }

        var self = this;
        var game = this._game;
        var context = canvas.getContext("2d");
        var renderers = this._renderers;
        var rendererTypes = Object.keys(renderers);

        var size = entity.getComponent<Size>("size");
        var position = entity.getComponent<Position>("position");
        var zIndex = entity.getComponent<ZIndex>("z-index") || defaultZIndex;
        var collidable = entity.getComponent<Collidable>("collidable");
        var activeCollisions = collidable.activeCollisions;

        var top = Math.max(position.y, 0);
        var left = Math.max(position.x, 0);
        var bottom = Math.min(position.y + size.height, canvas.height);
        var right = Math.min(position.x + size.width, canvas.width);
        var width = right - left;
        var height = bottom - top;
        var entities;

        if (width <= 0 || height <= 0) {
            return;
        }

        entities = Array.from(activeCollisions.values()).filter(function (collision) {
            return collision.endTimestamp == null;
        }).map(function (collision) {
            return game.getEntityById(collision.entityId);
        }).filter(function (entity: Entity) {
            if (entity == null) {
                return false;
            }

            var otherZIndex = entity.getComponent<ZIndex>("z-index") || defaultZIndex;
            var position = entity.getComponent<Position>("position");

            if (!position.isStatic) {
                return false;
            }

            return zIndex.value === otherZIndex.value;
        });

        if (drawEntity) {
            entities.push(entity);
        }

        entities.sort(this._zIndexSort);

        context.clearRect(left, top, width, height);

        entities.forEach(function (otherEntity: Entity) {
            var otherPosition = otherEntity.getComponent<Position>("position");
            var otherSize = otherEntity.getComponent<Size>("size");

            var otherTop = Math.max(otherPosition.y, position.y, 0);
            var otherLeft = Math.max(otherPosition.x, position.x, 0);
            var otherBottom = Math.min(otherPosition.y + otherSize.height, position.y + size.height, canvas.height);
            var otherRight = Math.min(otherPosition.x + otherSize.width, position.x + size.width, canvas.width);
            var otherWidth = otherRight - otherLeft;
            var otherHeight = otherBottom - otherTop;
            var offsetX = 0;
            var offsetY = 0;

            if (otherWidth <= 0 || otherHeight <= 0) {
                return;
            }

            if (otherPosition.x < otherLeft) {
                offsetX = otherLeft - otherPosition.x;
            }

            if (otherPosition.y < otherTop) {
                offsetY = otherTop - otherPosition.y;
            }

            rendererTypes.forEach(function (type) {
                var component = otherEntity.getComponent(type);
                if (component != null) {
                    renderers[type].draw(
                        otherEntity,
                        canvas,
                        {
                            x: Math.floor(otherLeft),
                            y: Math.floor(otherTop)
                        },
                        {
                            width: Math.floor(otherWidth),
                            height: Math.floor(otherHeight)
                        },
                        {
                            x: Math.floor(offsetX),
                            y: Math.floor(offsetY)
                        }
                    );
                }
            });
        });
    }

    drawEntityOnCanvas(entity: Entity, canvas: HTMLCanvasElement) {
        if (canvas == null) {
            return;
        }

        var self = this;
        var game = this._game;
        var context = canvas.getContext("2d");
        var renderers = this._renderers;
        var rendererTypes = Object.keys(renderers);

        var size = entity.getComponent<Size>("size");
        var position = entity.getComponent<Position>("position");
        var zIndex = entity.getComponent<ZIndex>("z-index") || defaultZIndex;

        var top = Math.max(position.y, 0);
        var left = Math.max(position.x, 0);
        var bottom = Math.min(position.y + size.height, canvas.height);
        var right = Math.min(position.x + size.width, canvas.width);
        var width = right - left;
        var height = bottom - top;
        var offsetX = 0;
        var offsetY = 0;
        var entities;

        if (width <= 0 || height <= 0) {
            return;
        }

        if (position.x < 0) {
            offsetX = -position.x;
        }

        if (position.y < 0) {
            offsetY = -position.y;
        }

        rendererTypes.forEach(function (type) {
            var component = entity.getComponent(type);
            if (component != null) {
                renderers[type].draw(
                    entity,
                    canvas,
                    {
                        x: Math.floor(left),
                        y: Math.floor(top)
                    },
                    {
                        width: Math.floor(width),
                        height: Math.floor(height)
                    },
                    {
                        x: Math.floor(offsetX),
                        y: Math.floor(offsetY)
                    }
                );
            }
        });
    }


    drawEntityOnCamera(entity: Entity, canvas: HTMLCanvasElement) {
        if (canvas == null) {
            return;
        }

        var self = this;
        var game = this._game;
        var context = canvas.getContext("2d");
        var renderers = this._renderers;
        var rendererTypes = Object.keys(renderers);

        var size = entity.getComponent<Size>("size");
        var position = entity.getComponent<Position>("position");
        var collidable = entity.getComponent<Collidable>("collidable");

        var cameraPosition = this._cameraPosition;
        var cameraSize = this._cameraSize;
        var activeCollisions = collidable.activeCollisions;

        var top = Math.max(position.y, cameraPosition.y);
        var left = Math.max(position.x, cameraPosition.x);
        var bottom = Math.min(position.y + size.height, cameraPosition.y + cameraSize.height);
        var right = Math.min(position.x + size.width, cameraPosition.x + cameraSize.width);
        var width = right - left;
        var height = bottom - top;

        if (width <= 0 || height <= 0) {
            return;
        }

        var entities = Array.from(activeCollisions.values()).filter(function (collision) {
            return collision.endTimestamp == null;
        }).map(function (collision) {
            return game.getEntityById(collision.entityId);
        }).filter(function (entity) {
            return entity != null;
        });

        entities.push(entity);
        entities.sort(this._zIndexSort);

        context.clearRect(left - cameraPosition.x, top - cameraPosition.y, width, height);
        entities.forEach(function (otherEntity) {
            var otherPosition = otherEntity.getComponent<Position>("position");
            var otherSize = otherEntity.getComponent<Size>("size");

            var otherTop = Math.max(otherPosition.y, position.y, cameraPosition.y);
            var otherLeft = Math.max(otherPosition.x, position.x, cameraPosition.x);
            var otherBottom = Math.min(otherPosition.y + otherSize.height, position.y + size.height, cameraPosition.y + cameraSize.height);
            var otherRight = Math.min(otherPosition.x + otherSize.width, position.x + size.width, cameraPosition.x + cameraSize.width);
            var otherWidth = otherRight - otherLeft;
            var otherHeight = otherBottom - otherTop;
            var offsetX = 0;
            var offsetY = 0;

            if (otherWidth <= 0 || otherHeight <= 0) {
                return;
            }

            if (otherPosition.x < otherLeft) {
                offsetX = otherLeft - otherPosition.x;
            }

            if (otherPosition.y < otherTop) {
                offsetY = otherTop - otherPosition.y;
            }

            rendererTypes.forEach(function (type) {
                var component = otherEntity.getComponent(type);
                if (component != null) {
                    renderers[type].draw(
                        otherEntity,
                        canvas,
                        {
                            x: Math.floor(otherLeft - cameraPosition.x),
                            y: Math.floor(otherTop - cameraPosition.y)
                        },
                        {
                            width: Math.floor(otherWidth),
                            height: Math.floor(otherHeight)
                        },
                        {
                            x: Math.floor(offsetX),
                            y: Math.floor(offsetY)
                        }
                    );
                }
            });
        });
    }

    isDynamicEntity(entity) {
        return entity != null &&
            entity.hasComponents(this._dependencies) &&
            this.supportsEntity(entity) &&
            !entity.getComponent("position").isStatic;
    }

    getCanvasByZIndex(zIndex: number) {
        var canvas = this._staticCacheByZIndex[zIndex];

        if (canvas == null) {
            canvas = this._staticCacheByZIndex[zIndex] = document.createElement("canvas");
            canvas.width = this._game.size.width;
            canvas.height = this._game.size.height;
            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        }

        return canvas;
    }

    cacheCanvasByZIndex(zIndex: number) {
        var self = this;
        var rendererTypes = Object.keys(this._renderers);
        var renderers = this._renderers;
        var entities = this._entitiesByZIndex[zIndex];
        var canvas = this.getCanvasByZIndex(zIndex);

        if (entities == null) {
            return;
        }

        var context = canvas.getContext("2d");

        canvas.width = this._game.size.width;
        canvas.height = this._game.size.height;

        context.clearRect(0, 0, canvas.width, canvas.height);

        entities.sort(this._defaultSort);
        entities.forEach((entity) => {
            self.drawEntityOnCanvas(entity, canvas);
        });
    }

    registerEntity(entity: Entity) {
        var entities;
        var position = entity.getComponent<Position>("position");
        var zIndex = entity.getComponent<ZIndex>("z-index") || defaultZIndex;

        if (position.isStatic) {
            entities = this._entitiesByZIndex[zIndex.value];

            if (entities == null) {
                entities = this._entitiesByZIndex[zIndex.value] = [];
            }

            entities.push(entity);

        }
    }

    unregisterEntity(entity: Entity) {
        var entities;
        var position = entity.getComponent<Position>("position");
        var zIndex = entity.getComponent<ZIndex>("z-index") || defaultZIndex;
        var index;

        if (position.isStatic) {
            entities = this._entitiesByZIndex[zIndex.value];

            if (entities != null) {
                index = entities.indexOf(entity);

                if (index > -1) {
                    entities.splice(index, 1);
                }
            }
        }
    }

    cacheEntity(entity: Entity) {
        if (!this.isDynamicEntity(entity)) {
            var zIndex = entity.getComponent<ZIndex>("z-index") || defaultZIndex;
            var canvas = this.getCanvasByZIndex(zIndex.value);

            this.registerEntity(entity);
            this.redrawEntityOnCanvas(entity, canvas);
        }
    }

    uncacheEntity(entity: Entity) {
        var zIndex = entity.getComponent<ZIndex>("z-index") || defaultZIndex;
        var canvas = this.getCanvasByZIndex(zIndex.value);

        this.unregisterEntity(entity);
        this.redrawEntityOnCanvas(entity, canvas, false);
    }

    get camera() {
        return this._camera;
    }

    set camera(entity: Entity) {
        if (entity.hasComponents(this._cameraDependencies)) {
            this._camera = entity;
            this._cameraPosition = entity.getComponent<Position>("position");
            this._cameraSize = entity.getComponent<Size>("size");

            // Adjust the cameras size to that of the canvas.
            this._cameraSize.width = this.canvas.width;
            this._cameraSize.height = this.canvas.height;
        }
    }

    setCameraByName(name: string) {
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
    }
}

export = RenderSystem;