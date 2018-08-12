import RectangleUpdater from "./BoundingRentangleUpdater";
import BoundingRectangleService from "../../services/BoundingRectangleService";

const RECTANGLE_ENTITIES_DEPENDENCIES = ["transform", "rectangle"];

export default class BoundingRectangleSystem {
    constructor() {
        this.world = null;
        this.rectangleUpdater = new RectangleUpdater();
        this.boundingRectangleService = new BoundingRectangleService();
    }

    addRectangleEntity(_entity) {
        const entity = _entity;
        if (this.boundingRectangleService.entitiesById[entity.id] == null) {
            this.boundingRectangleService.entitiesById[entity.id] = entity;
            this.boundingRectangleService.entities.push(entity);
        }

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
        if (this.boundingRectangleService.entitiesById[entity.id]) {
            delete this.boundingRectangleService.entitiesById[entity.id];
            const index = this.boundingRectangleService.entities.indexOf(entity);
            this.boundingRectangleService.entities.splice(index, 1);
        }
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

    afterUpdate() {
        const dirtyEntities = this.boundingRectangleService.dirtyEntities;
        for (let x = 0; x < dirtyEntities.length; x++) {
            const entity = dirtyEntities[x];
            entity.getComponent("transform").isDirty = false;
            entity.getComponent("rectangle").isDirty = false;
        }
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
        const entitiesById = this.boundingRectangleService.entitiesById;
        const entities = this.boundingRectangleService.entities;
        dirtyEntities.length = 0;

        for (let x = 0; x < entities.length; x++) {
            const entity = entities[x];

            if (this.isDirty(entity)) {
                this.rectangleUpdater.setEntity(entity);
                this.rectangleUpdater.update();
                this.boundingRectangleService.dirtyEntities.push(entity);
            }
        }

    }
}