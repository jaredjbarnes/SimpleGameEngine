import PolygonUpdater from "./PolygonUpdater";
import Entity from "../../Entity";
import PolygonCollisionData from "../../components/PolygonCollisionData";

const POLYGON_DEPENDENCIES = ["transform", "rectangle", "polygon"];
const POLYGON_BODY_DEPENDENCIES = ["transform", "rectangle", "polygon-body"];

export default class PolygonSystem {
    constructor() {
        this.world = null;
        this.polygonEntities = {};
        this.polygonBodyEntities = {};
        this.rectangleCollisionData = null;
        this.polygonCollisionData = null;
        this.polygonUpdater = new PolygonUpdater();
        this.createPolygonCollisionDataEntity();
    }

    addPolygonBodyEntity(entity) {
        this.polygonBodyEntities[entity.id] = entity;
    }

    addPolygonEntity(entity) {
        this.polygonEntities[entity.id] = entity;
    }

    createPolygonCollisionDataEntity() {
        this.polygonCollisionData = new Entity();
        const polygonCollisionData = new PolygonCollisionData();
        this.polygonCollisionData.addComponent(polygonCollisionData);
    }

    isPolygonEntity(entity) {
        return entity.hasComponents(POLYGON_DEPENDENCIES);
    }

    isPolygonBodyEntity(entity) {
        return entity.hasComponents(POLYGON_BODY_DEPENDENCIES);
    }

    isRectangeCollisionData(entity) {
        return entity.hasComponent("rectangle-collision-data");
    }

    removePolygonBodyEntity(entity) {
        delete this.polygonBodyEntities[entity.id];
    }

    removePolygonEntity(entity) {
        delete this.polygonEntities[entity.id];
    }

    wasPolygonBodyEntity(entity, component) {
        return this.polygonBodyEntities[entity.id] &&
            POLYGON_BODY_DEPENDENCIES.indexOf(component.type) > -1
    }

    wasPolygonEntity(entity, component) {
        return this.polygonEntities[entity.id] &&
            POLYGON_DEPENDENCIES.indexOf(component.type) > -1
    }

    // Life cycle methods.
    activated(world) {
        const entities = world.getEntities();

        this.world = world;

        for (let x = 0; x < entities.length; x++) {
            this.entityAdded(entities[x]);
        }
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (this.wasPolygonBodyEntity(entity, component)) {
            this.removePolygonBodyEntity(entity);
        } else if (this.wasPolygonEntity(entity, component)) {
            this.removePolygonEntity(entity);
        }
    }

    entityAdded(entity) {
        if (this.isPolygonBodyEntity(entity)) {
            this.addPolygonBodyEntity(entity);
        } else if (this.isPolygonEntity(entity)) {
            this.addPolygonEntity(entity);
        }
    }

    entityRemoved(entity) {
        if (this.isPolygonBodyEntity(entity)) {
            this.removePolygonBodyEntity(entity);
        } else if (this.isPolygonEntity(entity)) {
            this.removePolygonEntity(entity);
        }
    }

    deactivated() {
        this.world = null;
        this.polygonEntities = {};
        this.polygonBodyEntities = {};
        this.rectangleCollisionData = null;
    }

    update() {
        if (this.rectangleCollisionData != null) {
            this.polygonCollisionData.dirtyEntities.length = 0;
            const dirtyEntities = this.rectangleCollisionData.dirtyEntities;

            for (let x = 0; x < dirtyEntities.length; x++) {
                const entity = dirtyEntities[x];

                if (this.isPolygonBodyEntity(entity)) {
                    this.updatePolygonBodyEntity(entity);
                    this.polygonCollisionData.dirtyPolygonBodyEntities.push(entity);
                } else if (this.isPolygonEntity(entity)) {
                    this.updatePolygonEntity(entity);
                    this.polygonCollisionData.dirtyPolygonEntities.push(entity);
                }
            }
        }
    }

    updatePolygonEntity(entity) {
        const polygon = entity.getComponent("polygon");
        this.polygonUpdater.setEntity(entity);
        this.polygonUpdater.setPolygon(polygon);
        this.polygonUpdater.update();
        polygon.isDirty = false;
    }

    updatePolygonBodyEntity(entity) {
        const polygonBody = entity.getComponent("polygon-body");
        const polygons = polygonBody.polygons;

        this.polygonUpdater.setEntity(entity);
        for (let x = 0; x < polygons.length; x++) {
            const polygon = polygons[x];
            this.polygonUpdater.setPolygon(polygon);
            this.polygonUpdater.update();
            polygon.isDirty = false;
        }

        polygonBody.isDirty = false;
    }

}