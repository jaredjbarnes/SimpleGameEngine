
export default class FollowEntityCameraSystem {
    constructor({ cameraEntityId, followEntityId } = {}) {
        this._world = null;
        this.followEntityId = followEntityId;
        this.cameraEntityId = cameraEntityId;
    }

    update() {
        if (this._world == null) {
            return;
        }

        const entityToFollow = this._world.getEntityById(this.followEntityId);
        const camera = this._world.getEntityById(this.cameraEntityId);

        if (camera != null) {
            const cameraTransform = camera.getComponent("transform");
            cameraTransform.isDirty = true;

            if (entityToFollow != null) {
                const transform = entityToFollow.getComponent("transform");
                const cameraPosition = cameraTransform.position;
                const x = transform.position.x;
                const y = transform.position.y;

                cameraPosition.x = Math.floor(x);
                cameraPosition.y = Math.floor(y);
            }

        }

    }

    activated(world) {
        this._world = world;
    }

    deactivated() {
        this._world = null;
        this._worldSize = null;
    }
}