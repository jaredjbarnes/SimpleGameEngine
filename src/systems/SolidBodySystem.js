const DEPENDENCIES = ["solid-body", "narrow-phase-collidable", "movable"];

export default class SolidBodySystem {
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
        let activeCollisions = entity.getComponent("narrow-phase-collidable").collisions;
        let movable = entity.getComponent("movable");
        let solidBody = entity.getComponent("solid-body");

        for (let key in activeCollisions) {
            let collision = activeCollisions[key];
            if (collision.endTimestamp == null) {
                movable.x += Math.round(collision.penetration.x);
                movable.y += Math.round(collision.penetration.y);
            }

        }
    }

}
