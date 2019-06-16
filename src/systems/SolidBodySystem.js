const DEPENDENCIES = ["solid-body", "polygon-collider", "transform"];

export default class SolidBodySystem {
    constructor() {
        this.entities = {};
        this.world = null;
    }

    update() {
        for (let id in this.entities) {
            const entity = this.entities[id];
            this.updateEntity(entity);
        }
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
        if (this.entities[entity.id] == null && entity.hasComponents(DEPENDENCIES)) {
            this.entities[entity.id] = entity;
        }
    }

    entityRemoved(entity) {
        if (this.entities[entity.id] != null) {
            delete this.entities[entity.id];
        }
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (this.entities[entity.id] != null) {
            delete this.entities[entity.id];
        }
    }

    updateEntity(entity) {
        let activeCollisions = entity.getComponent("polygon-collider").collisions;
        let transform = entity.getComponent("transform");

        for (let key in activeCollisions) {
            let collision = activeCollisions[key];
            transform.position.x += Math.round(-collision.penetration.x);
            transform.position.y += Math.round(-collision.penetration.y);
        }
    }

}
