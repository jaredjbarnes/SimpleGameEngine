const DEPENDENCIES = ["character", "rigid-body", "position"];

export default class CharacterSystem {
    constructor() {
        this.entities = new Map();
        this.world = null;
    }

    update() {
        this.entities.forEach((entity) => {
            this.updateEntity(entity);
        });
    }

    activated(world) {
        this.world = world;
        world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.world = null;
        this.entities.clear();
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, entity);
        }
    }

    entityRemoved(entity) {
        this.entities.delete(entity.id);
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entities.delete(entity.id);
        }
    }

    updateEntity(entity) {
        var activeCollisions = entity.getComponent("rigid-body").activeCollisions;
        var collisions = Array.from(activeCollisions.values());
        var position = entity.getComponent("position");

        collisions.forEach((collision) => {
            if (collision.endTimestamp == null) {
                position.x = position.x + Math.round(collision.penetration.x);
                position.y = position.y + Math.round(collision.penetration.y);
                position.isDirty = true;
            }
        });

    }

}
