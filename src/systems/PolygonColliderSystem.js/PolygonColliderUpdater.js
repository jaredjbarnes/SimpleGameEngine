import PolygonUpdater from "./PolygonUpdater";

class PolygonColliderUpdater {
    constructor() {
        this.polygonUpdater = new PolygonUpdater();
    }

    updateParts(entity) {
        const polygons = entity.getComponent("shape-collider").polygons;

        this.polygonUpdater.setEntity(entity);

        for (let x = 0; x < polygons.length; x++) {
            this.polygonUpdater.setPolygon(polygons[x]);
            this.polygonUpdater.update();
        }
    }


}