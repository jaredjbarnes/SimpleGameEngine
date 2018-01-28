import EntityCompositer from "./rendering/EntityCompositer";

export default class RenderSystem {
    constructor(imageManager) {
        this.imageManager = imageManager;
        this.broadPhaseCollisionData = null;
        this.cameraCanvasCellEntities = [];
        this.world = null;
    }

    _isCameraCanvasCellEntity(entity) {
        return entity.hasComponents(["camera-canvas-cell", "position", "size", "collidable"])
    }

    isBroadPhaseCollisionDataEntity(entity) {
        return entity.hasComponents(["broad-phase-collision-data"]);
    }

    activated(world) {
        this.world = world;

        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    componentAdded(entity, component) {

    }

    componentRemoved(entity, component) {

    }

    deactivated() {

    }

    entityAdded(entity) {
        if (this.isBroadPhaseCollisionDataEntity(entity)) {

            this.broadPhaseCollisionData = entity.getComponent("broad-phase-collision-data");

        } else if (this._isCameraCanvasCellEntity(entity)) {

        }
    }

    entityRemoved(entity) {

    }

    update(currentTime) {

    }
}