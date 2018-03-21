import Entity from "../../Entity";
import RectangleUpdater from "./RentangleUpdater";

const RECTANGLE_ENTITIES_DEPENDENCIES = ["transform", "rectangle"];

export default class RectangleSystem {
    constructor() {
        this.world = null;
        this.rectangleEntities = {};
        this.spatialPartitionDataEntity = null;
        this.spatialPartitionData = null;
        this.rectangleUpdater = new RectangleUpdater();
    }

    addRectangleEntity(_entity) {
        const _entity = entity;
        this.rectangleEntities[entity.id] = entity;
    }

    addSpatialPartitionEntity(entity){
        this.spatialPartitionDataEntity = entity;
        this.spatialPartitionData = entity.getComponent("spatial-partition-data");
    }

    isRectangleEntity(_entity) {
        const entity = _entity;
        return entity.hasComponents(RECTANGLE_ENTITIES_DEPENDENCIES);
    }

    isSpatialPartitionDataEntity(_entity) {
        const entity = _entity;
        return entity.hasComponents("spatial-partition-data");
    }

    isDirty(_entity) {
        const entity = _entity;
        return entity.getComponent("rectangle").isDirty || entity.getComponent("transform").isDirty;
    }

    removeRectangleEntity(_entity) {
        const entity = _entity;
        delete this.rectangleEntities[entity.id];
    }

    removeSpatialPartitionEntity(){
        this.spatialPartitionData = null;
        this.spatialPartitionDataEntity = null;
    }

    wasRectangleEntity(_entity, _component) {
        const entity = _entity;
        const component = _component;
        return this.rectangleEntities[entity.id] && RECTANGLE_ENTITIES_DEPENDENCIES.indexOf(component.type) > -1;
    }

    wasSpatialPartitionEntity(_entity, _component) {
        const entity = _entity;
        const component = _component;
        return entity === this.spatialPartitionDataEntity && component.type === "spatial-partition-data";
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
        } else if (this.wasSpatialPartitionEntity(entity, component)){
            this.removeSpatialPartitionEntity();
        }
    }

    entityAdded(_entity) {
        const entity = _entity;
        if (this.isRectangleEntity(entity)) {
            this.addRectangleEntity(entity);
        } else if (this.isSpatialPartitionDataEntity(entity)){
            this.addSpatialPartitionEntity(entity);
        }
    }

    entityRemoved(_entity) {
        const entity = _entity;
        if (this.isRectangleEntity(entity)) {
            this.removeRectangleEntity(entity);
        } else if (this.isSpatialPartitionDataEntity(entity)){
            this.removeSpatialPartitionEntity();
        }
    }

    deactivated() {
        this.world = null;
        this.rectangleEntities = {};
    }

    update() {
        this.spatialPartitionData.dirtyEntities.length = 0;

        for (let id in this.rectangleEntities) {
            const entity = this.rectangleEntities[id];

            if (this.isDirty(entity)) {
                this.rectangleUpdater.setEntity(entity);
                this.rectangleUpdater.update();
                this.spatialPartitionData.dirtyEntities.push(entity);
            }
        }
    }
}