import Game = require("./../Game");
import Entity = require("./../Entity");

var defaultZIndex = { value: 0 };

class RenderSystem {
    private _renderers: { [id: string]: { draw: (entity: Entity, canvas: HTMLCanvasElement, cameraPosition: { x: number, y: number }) => void } };
    private _game: Game;
    private _dynamicEntities: Array<Entity>;
    private _staticEntities: Array<Entity>;
    private _dependencies: Array<string>;
    private _camera: Entity;
    private _cameraPosition: { x: number; y: number; };
    private _cameraSize: { width: number; height: number; };
    private _cameraDependencies: Array<string>;
    private _staticCanvas: HTMLCanvasElement;
    private _staticContext: CanvasRenderingContext2D;
    private _staticZIndexes: Array<Array<HTMLCanvasElement>>;
    private _sort: (entityA, entityB) => number;

    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;


    constructor(canvas: HTMLCanvasElement, sort?: (entityA, entityB) => number) {
        this._renderers = {};
        this._game = null;
        this._dynamicEntities = [];
        this._staticEntities = [];
        this._dependencies = ["position", "size"];
        this._cameraDependencies = ["camera", "position", "size"];
        this._camera = null;
        this._cameraPosition = null;
        this._cameraSize = null;
        this._staticZIndexes = [];
        this._sort = sort || null;

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
            self.entityAdded(entity);
        });
    }

    deactivated() {
        this._game = null;
        this._dynamicEntities = [];
        this.canvas = null;
        this.context = null;
    }

    update() {
        var rendererTypes = Object.keys(this._renderers);
        var renderers = this._renderers;
        var canvas = this.canvas;
        var cameraPosition = this._cameraPosition;
        var sort = this._sort;
        var dynamicEntities = this._dynamicEntities;

        if (cameraPosition == null) {
            return;
        }

        this.context.clearRect(0, 0, canvas.width, canvas.height);

        this._dynamicEntities.sort(function (entityA, entityB) {
            var zIndexA = entityA.getComponent("z-index");
            var zIndexB = entityB.getComponent("z-index");

            zIndexA = zIndexA || defaultZIndex;
            zIndexB = zIndexB || defaultZIndex;

            if (zIndexA.value < zIndexB.value) {
                return -1;
            } else if (zIndexA.value > zIndexB.value) {
                return 1;
            } else {
                if (sort != null) {
                    return sort(entityA, entityB)
                }
                return 0;
            }
        });

        this._dynamicEntities.forEach(function (entity) {
            rendererTypes.forEach(function (type) {
                var component = entity.getComponent(type);
                if (component != null) {
                    renderers[type].draw(entity, canvas, cameraPosition);
                }
            });
        });
    }

    entityAdded(entity) {
        var index = this._dynamicEntities.indexOf(entity);

        if (index === -1 && entity.hasComponents(this._dependencies) && this.supportsEntity(entity)) {
            this._dynamicEntities.push(entity);
            this._notifyRenderers("entityAdded", [entity]);
        }
    }

    entityRemoved(entity) {
        var entities = this._dynamicEntities;

        var index = entities.indexOf(entity);

        if (index > -1) {
            entities.splice(index, 1);
            this._notifyRenderers("entityRemoved", [entity]);
        }
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(this._dependencies) && this.supportsEntity(entity)) {
            this.entityAdded(entity);
        }
    }

    componentRemoved(entity, component) {
        if (Object.keys(this._renderers).indexOf(component.type) > -1) {
            this.entityRemoved(entity);
        }
    }

    get camera() {
        return this._camera;
    }

    set camera(entity: Entity) {
        if (entity.hasComponents(this._cameraDependencies)) {
            this._camera = entity;
            this._cameraPosition = entity.getComponent("position");
            this._cameraSize = entity.getComponent("size");

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