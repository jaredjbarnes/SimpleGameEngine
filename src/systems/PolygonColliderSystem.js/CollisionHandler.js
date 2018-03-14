import PolygonUpdater from "PolygonUpdater";

export default class CollisionHandler {
    constructor(world) {
        this.world = world;
        this.entity = null;
        this.polygonCollider = null;
        this.polygonUpdater = new PolygonUpdater();
    }

    isPolygonCollider() {
        return this.polygonCollider != null;
    }

    updateCollisions() {
    
    }

    update(entity) {
        this.entity = entity;
        this.polygonCollider = this.entity.getComponent("polygon-collider");

        if (this.isPolygonCollider()) {
            this.polygonUpdater.update(entity);
        }
    }
}