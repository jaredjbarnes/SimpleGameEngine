import PolygonUpdater from "./PolygonUpdater.js";

const POLYGON_DEPENDENCIES = ["transform", "rectangle", "polygon"];
const POLYGON_BODY_DEPENDENCIES = ["transform", "rectangle", "polygon-body"];

export default class PolygonSystem {
    constructor() {
        this.world = null;
        this.name = "polygon";
        this.polygonUpdater = new PolygonUpdater();
        this.boundingRectangleData = null;
    }

    isPolygonEntity(_entity) {
        const entity = _entity;
        return entity.hasComponents(POLYGON_DEPENDENCIES);
    }

    isPolygonBodyEntity(_entity) {
        const entity = _entity;
        return entity.hasComponents(POLYGON_BODY_DEPENDENCIES);
    }

    // Life cycle methods.
    activated(world) {
        this.world = world;
    }

    deactivated() {
        this.world = null;
        this.boundingRectangleData = null;
    }

    entityAdded(entity) {
        if (entity.type === "bounding-rectangle-service"){
            this.boundingRectangleData = entity.getComponent("bounding-rectangle-data");
        }
    }

    entityRemoved(name) {
        if (entity.type === "bounding-rectangle-service") {
            this.boundingRectangleData = null;
        }
    }

    update() {
        if (this.boundingRectangleData != null) {
            const dirtyEntities = this.boundingRectangleData.dirtyEntities;

            for (let x = 0; x < dirtyEntities.length; x++) {
                const entity = dirtyEntities[x];

                if (this.isPolygonBodyEntity(entity)) {
                    this.updatePolygonBodyEntity(entity);
                } else if (this.isPolygonEntity(entity)) {
                    this.updatePolygonEntity(entity);
                }
            }
        }
    }

    updatePolygonEntity(_entity) {
        const entity = _entity;
        const polygon = entity.getComponent("polygon");
        this.polygonUpdater.setEntity(entity);
        this.polygonUpdater.setPolygon(polygon);
        this.polygonUpdater.update();
    }

    updatePolygonBodyEntity(_entity) {
        const entity = _entity;
        const polygonBody = entity.getComponent("polygon-body");
        const polygons = polygonBody.polygons;

        this.polygonUpdater.setEntity(entity);
        for (let x = 0; x < polygons.length; x++) {
            const polygon = polygons[x];
            this.polygonUpdater.setPolygon(polygon);
            this.polygonUpdater.update();
        }
    }

}