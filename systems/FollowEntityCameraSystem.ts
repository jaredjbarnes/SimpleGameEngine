import Camera = require("./../entities/Camera");
import Entity = require("./../Entity");
import Game = require("./../Game");
import Position = require("./../components/Position");
import Size = require("./../components/Size");

class FollowEntityCameraSystem {
    private _camera: Camera;
    private _cameraPosition: { x: number; y: number; };
    private _cameraSize: { width: number; height: number; };
    private _entityToFollow;
    private _game: Game;
    private _worldSize: { width: number; height: number; };
    private _entitySize: { width: number; height: number; };
    private _entityPosition: { x: number; y: number; };

    constructor() {
        this._camera = null;
        this._cameraSize = null;
        this._cameraPosition = null;
        this._entityToFollow = null;
        this._entitySize = null;
        this._entityPosition = null;
        this._game = null;
        this._worldSize = null;
    }

    get camera() {
        return this._camera;
    }

    set camera(value: Camera) {
        if (value.hasComponents(["camera", "position", "size"])) {
            this._camera = value;
            this._cameraPosition = value.getComponent<Position>("position");
            this._cameraSize = value.getComponent<Size>("size");
        }
    }

    setEntityToFollow(entity: Entity) {
        if (entity.hasComponents(["position", "size"])) {
            this._entityToFollow = entity;
            this._entitySize = entity.getComponent<Size>("size");
            this._entityPosition = entity.getComponent<Position>("position");
        }
    }

    update() {
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
    }

    activated(game: Game) {
        this._game = game;
        this._worldSize = game.size;
    }

    deactivate() { }
}

export = FollowEntityCameraSystem;