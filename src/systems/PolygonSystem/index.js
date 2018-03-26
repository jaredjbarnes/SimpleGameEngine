import PolygonUpdater from "./PolygonUpdater";
import Entity from "../../Entity";

const POLYGON_DEPENDENCIES = ["transform", "rectangle", "polygon"];
const POLYGON_BODY_DEPENDENCIES = ["transform", "rectangle", "polygon-body"];

export default class PolygonSystem {
    constructor() {
        this.world = null;
        this.polygonUpdater = new PolygonUpdater();
        this.boundingRectangleService = null;
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
        
        const services = this.world.getServices();
        for (let name in services){
            this.serviceAdded(name, services[name]);
        }
    }

    deactivated() {
        this.world = null;
        this.boundingRectangleService = null;
    }

    serviceAdded(name, service){
        if (name === "bounding-rectangle-service"){
            this.boundingRectangleService = service;
        }
    }

    serviceRemoved(name, service){
        if (name === "bounding-rectangle-service"){
            this.boundingRectangleService = null;
        }
    }

    update() {
        if (this.boundingRectangleService != null) {
            const dirtyEntities = this.boundingRectangleService.dirtyEntities;

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