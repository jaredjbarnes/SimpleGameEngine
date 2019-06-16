const DEPENDENCIES = ["movable", "transform"];

class MovableEntity {
    constructor(entity) {
        const transform = entity.getComponent("transform");
        this.movable = entity.getComponent("movable");
        this.position = transform.position;
        this.transform = transform;
    }
}

export default class MovementSystem {
    constructor() {
        this.world = null;
        this.name = "movement";
        this.entities = new Map();
    }

    update() {
        this.entities.forEach((entity) => {
            var position = entity.position;
            var movable = entity.movable;

            position.x += movable.x;
            position.y += movable.y;

            if (movable.x != 0 || movable.y != 0) {
                entity.transform.isDirty = true;
            }

            movable.x = 0;
            movable.y = 0;
        });
    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.world = null;
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, new MovableEntity(entity));
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.delete(entity.id);
        }
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, new MovableEntity(entity));
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entities.delete(entity.id);
        }
    }

}