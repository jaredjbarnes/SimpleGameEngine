import Entity from "../../Entity";
import RectangleUpdater from "./RentangleUpdater";
import BoundingRectangleService from "./../../services/BoundingRectangleService";

const RECTANGLE_ENTITIES_DEPENDENCIES = ["transform", "rectangle"];

export default class RectangleSystem {
    constructor() {
        this.world = null;
        this.boundingRectangleService.entitiesById = {};
        this.rectangleUpdater = new RectangleUpdater();
        this.boundingRectangleService = new BoundingRectangleService();
        this.removedEntities = [];
        this.addedEntities = [];
    }

    addRectangleEntity(_entity) {
        const entity = entity;
        this.boundingRectangleService.entitiesById[entity.id] = entity;
        this.addedEntities.push(entity);
    }

    isRectangleEntity(_entity) {
        const entity = _entity;
        return entity.hasComponents(RECTANGLE_ENTITIES_DEPENDENCIES);
    }

    isDirty(_entity) {
        const entity = _entity;
        return entity.getComponent("rectangle").isDirty || entity.getComponent("transform").isDirty;
    }

    removeRectangleEntity(_entity) {
        const entity = _entity;
        delete this.boundingRectangleService.entitiesById[entity.id];
        this.removedEntities.push(entity);
    }

    wasRectangleEntity(_entity, _component) {
        const entity = _entity;
        const component = _component;
        return this.boundingRectangleService.entitiesById[entity.id] && RECTANGLE_ENTITIES_DEPENDENCIES.indexOf(component.type) > -1;
    }

    // Life cycle methods
    activated(_world) {
        this.world = _world;
        this.world.addService(this.boundingRectangleService);
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
        this.world.removeService(this.boundingRectangleService);
        this.world = null;
        this.boundingRectangleService.entitiesById = {};
        this.boundingRectangleService.dirtyEntities.length = 0;
    }

    update() {
        const dirtyEntities = this.boundingRectangleService.dirtyEntities;
        dirtyEntities.length = 0;

        for (let x = 0 ; x < this.addedEntities.length; x++){
            dirtyEntities.push(this.addedEntities[x]);
        }

        for (let x = 0 ; x < this.removedEntities.length; x++){
            dirtyEntities.push(this.removedEntities[x]);
        }

        for (let id in this.boundingRectangleService.entitiesById) {
            const entity = this.boundingRectangleService.entitiesById[id];

            if (this.isDirty(entity)) {
                this.rectangleUpdater.setEntity(entity);
                this.rectangleUpdater.update();
                this.boundingRectangleService.dirtyEntities.push(entity);
            }
        }

        this.addedEntities.length = 0;
        this.removedEntities.length = 0;
    }
}