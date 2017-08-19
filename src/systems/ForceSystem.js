const DEPENDENCIES = ["force", "position"];

class ForceEntity {
constructor(entity) {
        this.force = entity.getComponent("force");
        this.position = entity.getComponent("position");
    }
}

export default class ForceSystem {
    constructor() {
        this.game = null;
        this.entities = new Map();
    }

    update() {
        this.entities.forEach((entity) => {
            var position = entity.position;
            var force = entity.force;

            position.x += force.x;
            position.y += force.y;

            if (force.x != 0 || force.y != 0) {
                position.isDirty = true;
            }
        });
    }

    activated(game) {
        this.game = game;
        this.game.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.game = null;
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, new ForceEntity(entity));
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.delete(entity.id);
        }
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, new ForceEntity(entity));
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entities.delete(entity.id);
        }
    }

}