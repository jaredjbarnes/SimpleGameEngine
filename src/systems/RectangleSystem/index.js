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

    addRectangleEntity(_entity) {
        const _entity = entity;
        this.rectangleEntities[entity.id] = entity;
    }

    createRectangleCollisionDataEntity() {
        this.rectangleCollisionDataEntity = new Entity();
        this.rectangleCollisionData = new RectangleCollisionData();
        this.rectangleCollisionDataEntity.addComponent(this.rectangleCollisionData);
    }

    isRectangleEntity(_entity) {
        const entity = _entity;
        return entity.hasComnponents(RECTANGLE_ENTITIES_DEPENDENCIES);
    }

    isDirty(_entity) {
        const entity = _entity;
        return entity.getComponent("rectangle").isDirty || entity.getComponent("transform").isDirty;
    }

    removeRectangleEntity(_entity) {
        const entity = _entity;
        delete this.rectangleEntities[entity.id];
    }

    wasRectangleEntity(_entity, _component) {
        const entity = _entity;
        const component = _component;
        return this.rectangleEntities[entity.id] && RECTANGLE_ENTITIES_DEPENDENCIES.indexOf(component.type) > -1;
    }

    // Life cycle methods
    activated(_world) {
        this.world = _world;
    }

    componentAdded(_entity, _component) {
        const entity = _entity;
        this.entityAdded(entity);
    }

    componentRemoved(_entity, _component) {
        const entity = _entity;
        const component = _component;
        if (this.wasRectangle(entity, component)) {
            this.removeRectangleEntity(entity);
        }
    }

    entityAdded(_entity) {
        const entity = _entity;
        if (this.isRectangleEntity(entity)) {
            this.addRectangleEntity(entity);
        }
    }

    entityRemoved(_entity) {
        const entity = _entity;
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