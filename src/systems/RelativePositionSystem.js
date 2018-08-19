const DEPENDENCIES = ["transform", "relative-position"];

export default class RelativePositionSystem {
    constructor() {
        this.world = null;
        this.entities = {};
    }

    addEntityToCache(entity) {
        this.entities[entity.id] = entity;
    }

    isCachedRelativePositionedEntity(entity) {
        return this.entities[entity.id] != null ? true : false;
    }

    isRelativePositionedEntity(entity) {
        return entity.hasComponents(DEPENDENCIES);
    }

    removeEntityFromCache(entity) {
        if (this.entities[entity.id] != null) {
            delete this.entities[entity.id];
        }
    }

    updateEntity(entity) {
        const relativePositionComponent = entity.getComponent("relative-position");
        const transformComponent = entity.getComponent("transform");
        const relativeToEntity = this.world.getEntityById(relativePositionComponent.relativeToEntityId);

        if (relativeToEntity != null) {
            const relativeToTransform = relativeToEntity.getComponent("transform");

            if (relativeToTransform != null) {
                transformComponent.position.x = relativeToTransform.position.x + relativePositionComponent.position.x;
                transformComponent.position.y = relativeToTransform.position.y + relativePositionComponent.position.y;
                transformComponent.isDirty = true;
            }
        }
    }

    // Life-cycle Methods
    activated(world) {
        this.world = world;
    }

    deactivated() {
        this.world = null;
        this.entities = {};
    }

    entityAdded(entity) {
        if (this.isRelativePositionedEntity(entity)) {
            this.addEntityToCache(entity);
        }
    }

    entityRemoved(entity) {
        if (this.isCachedRelativePositionedEntity(entity)) {
            delete this.entities[entity.id];
        }
    }

    componentAdded(entity) {
        if (this.isRelativePositionedEntity(entity)) {
            this.addEntityToCache(entity);
        }
    }

    componentRemove(entity, component) {
        if (this.isCachedRelativePositionedEntity(entity) &&
            DEPENDENCIES.indexOf(component.type) > -1) {
            this.removeEntityFromCache(entity);
        }
    }

    update() {
        for (let key in this.entities) {
            this.updateEntity(this.entities[key]);
        }
    }

}