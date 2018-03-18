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
        this.rectangleCollisionDataEntity = null;
        this.polygonCollisionDataEntity = null;
        this.polygonCollisionData = null;
        this.polygonUpdater = new PolygonUpdater();
        this.createPolygonCollisionDataEntity();
    }

    addPolygonBodyEntity(_entity) {
        const entity = _entity;
        this.polygonBodyEntities[entity.id] = entity;
    }

    addPolygonEntity(_entity) {
        const entity = _entity;
        this.polygonEntities[entity.id] = entity;
    }

    createPolygonCollisionDataEntity() {
        this.polygonCollisionDataEntity = new Entity();
        this.polygonCollisionData = new PolygonCollisionData();
        this.polygonCollisionDataEntity.addComponent(this.polygonCollisionData);
    }

    isPolygonEntity(_entity) {
        const entity = _entity;
        return entity.hasComponents(POLYGON_DEPENDENCIES);
    }

    isPolygonBodyEntity(_entity) {
        const entity = _entity;
        return entity.hasComponents(POLYGON_BODY_DEPENDENCIES);
    }

    isRectangeCollisionDataEntity(_entity) {
        const entity = _entity;
        return entity.hasComponent("rectangle-collision-data");
    }

    removePolygonBodyEntity(_entity) {
        const entity = _entity;
        delete this.polygonBodyEntities[entity.id];
    }

    removePolygonEntity(_entity) {
        const entity = _entity;
        delete this.polygonEntities[entity.id];
    }

    wasPolygonBodyEntity(_entity, _component) {
        const entity = _entity;
        const component = _component;

        return this.polygonBodyEntities[entity.id] &&
            POLYGON_BODY_DEPENDENCIES.indexOf(component.type) > -1
    }

    wasPolygonEntity(_entity, _component) {
        const entity = _entity;
        const component = _component;

        return this.polygonEntities[entity.id] &&
            POLYGON_DEPENDENCIES.indexOf(component.type) > -1
    }

    // Life cycle methods.
    activated(_world) {
        const world = _world;
        const entities = world.getEntities();

        this.world = world;

        for (let x = 0; x < entities.length; x++) {
            this.entityAdded(entities[x]);
        }

        this.world.addEntity(this.polygonCollisionDataEntity);
    }

    componentAdded(_entity, _component) {
        const entity = _entity;
        this.entityAdded(entity);
    }

    componentRemoved(_entity, _component) {
        const entity = _entity;
        const component = _component;

        if (this.wasPolygonBodyEntity(entity, component)) {
            this.removePolygonBodyEntity(entity);
        } else if (this.wasPolygonEntity(entity, component)) {
            this.removePolygonEntity(entity);
        }
    }

    entityAdded(_entity) {
        const entity = _entity;

        if (this.isPolygonBodyEntity(entity)) {
            this.addPolygonBodyEntity(entity);
        } else if (this.isPolygonEntity(entity)) {
            this.addPolygonEntity(entity);
        } else if (this.isRectangeCollisionDataEntity(entity)){
            this.rectangleCollisionDataEntity = entity;
            this.rectangleCollisionData = entity.getComponent("rectangle-collision-data");
        }
    }

    entityRemoved(_entity) {
        const entity = _entity;

        if (this.isPolygonBodyEntity(entity)) {
            this.removePolygonBodyEntity(entity);
        } else if (this.isPolygonEntity(entity)) {
            this.removePolygonEntity(entity);
        }
    }

    deactivated() {
        this.world.removeEntity(this.polygonCollisionDataEntity);

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

    updatePolygonEntity(_entity) {
        const entity = _entity;
        const polygon = entity.getComponent("polygon");
        this.polygonUpdater.setEntity(entity);
        this.polygonUpdater.setPolygon(polygon);
        this.polygonUpdater.update();
        polygon.isDirty = false;
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
            polygon.isDirty = false;
        }

        polygonBody.isDirty = false;
    }

}