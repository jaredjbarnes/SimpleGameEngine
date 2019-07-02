import RectangleUpdater from "./BoundingRentangleUpdater.js";
import BoundingRectangleData from "../../components/BoundingRectangleData.js";
import Entity from "../../Entity.js";

const RECTANGLE_ENTITIES_DEPENDENCIES = ["transform", "rectangle"];

export default class BoundingRectangleSystem {
    constructor() {
        this.world = null;
        this.name = "bounding-rectangle-system";
        this.rectangleUpdater = new RectangleUpdater();
        this.boundingRectangleData = new BoundingRectangleData();
        this.boundingRectangleEntity = new Entity();
        this.boundingRectangleEntity.type = "bounding-rectangle-service"
        this.boundingRectangleEntity.addComponent(this.boundingRectangleData);
    }

    addRectangleEntity(_entity) {
        const entity = _entity;
        if (this.boundingRectangleData.entitiesById[entity.id] == null) {
            this.boundingRectangleData.entitiesById[entity.id] = entity;
            this.boundingRectangleData.entities.push(entity);
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
        if (this.boundingRectangleData.entitiesById[entity.id]) {
            delete this.boundingRectangleData.entitiesById[entity.id];
            const index = this.boundingRectangleData.entities.indexOf(entity);
            this.boundingRectangleData.entities.splice(index, 1);
        }
    }

    wasRectangleEntity(_entity, _component) {
        const entity = _entity;
        const component = _component;
        return this.boundingRectangleData.entitiesById[entity.id] && RECTANGLE_ENTITIES_DEPENDENCIES.indexOf(component.type) > -1;
    }

    // Life cycle methods
    activated(_world) {
        this.world = _world;
        this.world.getEntities().forEach((entity)=>{
            this.entityAdded(entity);
        });
        this.world.addEntity(this.boundingRectangleEntity);
    }

    afterUpdate() {
        const dirtyEntities = this.boundingRectangleData.dirtyEntities;
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
        this.world.removeEntity(this.boundingRectangleEntity);
        this.world = null;
        this.boundingRectangleData.entitiesById = {};
        this.boundingRectangleData.dirtyEntities.length = 0;
    }

    update() {
        const dirtyEntities = this.boundingRectangleData.dirtyEntities;
        const entities = this.boundingRectangleData.entities;

        dirtyEntities.length = 0;

        for (let x = 0; x < entities.length; x++) {
            const entity = entities[x];

            if (this.isDirty(entity)) {
                this.rectangleUpdater.setEntity(entity);
                this.rectangleUpdater.update();
                dirtyEntities.push(entity);
            }
        }
    }

}