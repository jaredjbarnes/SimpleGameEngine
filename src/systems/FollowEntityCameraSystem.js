
export default class FollowEntityCameraSystem {
    constructor() {
        this._camera = null;
        this._cameraRectangle = null;
        this._cameraPosition = null;
        this._entityToFollow = null;
        this._entityRectangle = null;
        this._entityPosition = null;
        this._world = null;
        this._worldSize = null;
    }

    get camera() {
        return this._camera;
    }

    set camera(value) {
        if (value.hasComponents(["camera", "transform"])) {
            const transform = value.getComponent("transform");
            const rectangle = value.getComponent("rectangle");
            this._camera = value;
            this._cameraPosition = transform.position;
            this._cameraRectangle = rectangle;
            this._cameraTransform = transform;
        }
    }

    setEntityToFollow(entity) {
        if (entity.hasComponents(["transform"])) {
            const transform = entity.getComponent("transform");
            const rectangle = entity.getComponent("rectangle");
            this._entityToFollow = entity;
            this._entityRectangle = rectangle;
            this._entityPosition = transform.position;
        }
    }

    update() {
        if (this._entityToFollow != null && this._camera != null) {
            var x = this._entityPosition.x - (this._cameraRectangle.width / 2) + (this._entityRectangle.width / 2);
            var y = this._entityPosition.y - (this._cameraRectangle.height / 2) + (this._entityRectangle.height / 2);
            this._cameraPosition.x = Math.floor(x);
            this._cameraPosition.y = Math.floor(y);
        }

        if (this._camera != null) {
            this._cameraTransform.isDirty = true;
        }
    }

    activated(world) {
        this._world = world;
        this._worldSize = world.size;
    }

    deactivate() { }
}