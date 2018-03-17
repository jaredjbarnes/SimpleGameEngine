import Entity from "../../Entity";
import RectangleCollisionData from "../../components/RectangleCollisionData";
import RectangleUpdater from "./RentangleUpdater";

const RECTANGLE_ENTITIES_DEPENDENCIES = ["transform", "rectangle"];

export default class RectangleSystem {
    constructor() {
        this.world = null;
        this.rectangleEntities = {};
        this.rectangleCollisionDataEntity = null;
        this.createRectangleCollisionDataEntity();
        this.rectangleUpdater = new RectangleUpdater();
    }

    addRectangleEntity(entity) {
        this.rectangleEntities[entity.id] = entity;
    }

    createRectangleCollisionDataEntity() {
        this.rectangleCollisionDataEntity = new Entity();
        this.rectangleCollisionData = new RectangleCollisionData();
        this.rectangleCollisionDataEntity.addComponent(this.rectangleCollisionData);
    }

    isRectangleEntity(entity) {
        return entity.hasComnponents(RECTANGLE_ENTITIES_DEPENDENCIES);
    }

    isDirty(entity) {
        return entity.getComponent("rectangle").isDirty || entity.getComponent("transform").isDirty;
    }

    removeRectangleEntity(entity) {
        delete this.rectangleEntities[entity.id];
    }

    wasRectangleEntity(entity, component) {
        return this.rectangleEntities[entity.id] && RECTANGLE_ENTITIES_DEPENDENCIES.indexOf(component.type) > -1;
    }

    // Life cycle methods
    activated(world) {
        this.world = world;
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (this.wasRectangle(entity, component)) {
            this.removeRectangleEntity(entity);
        }
    }

    entityAdded(entity) {
        if (this.isRectangleEntity(entity)) {
            this.addRectangleEntity(entity);
        }
    }

    entityRemoved(entity) {
        if (this.isRectangleEntity(entity)) {
            this.removeRectangleEntity(entity);
        }
    }

    deactivated() {
        this.world = null;
        this.rectangleEntities = {};
    }

    update() {
        this.rectangleCollisionData.dirtyEntities.length = 0;

        for (let id in this.rectangleEntities) {
            const entity = this.rectangleEntities[id];
            
            if (this.isDirty(entity)) {
                this.rectangleUpdater.setEntity(entity);
                this.rectangleUpdater.update();
                this.rectangleCollisionData.dirtyEntities.push(entity);
            }
        }
    }
}