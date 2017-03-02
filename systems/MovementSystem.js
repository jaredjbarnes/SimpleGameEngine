define(["require", "exports"], function (require, exports) {
    "use strict";
    const DEPENDENCIES = ["movable", "position"];
    class MovementEntity {
        constructor(entity) {
            this.movable = entity.getComponent("movable");
            this.position = entity.getComponent("position");
        }
    }
    class MovementSystem {
        constructor() {
            this.game = null;
            this.entities = new Map();
        }
        update() {
            this.entities.forEach((entity) => {
                var position = entity.position;
                var movable = entity.movable;
                position.x += movable.x;
                position.y += movable.y;
                if (movable.x != 0 || movable.y != 0) {
                    position.isDirty = true;
                }
                movable.x = 0;
                movable.y = 0;
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
                this.entities.set(entity.id, new MovementEntity(entity));
            }
        }
        entityRemoved(entity) {
            if (entity.hasComponents(DEPENDENCIES)) {
                this.entities.delete(entity.id);
            }
        }
        componentAdded(entity, component) {
            if (entity.hasComponents(DEPENDENCIES)) {
                this.entities.set(entity.id, new MovementEntity(entity));
            }
        }
        componentRemoved(entity, component) {
            if (DEPENDENCIES.indexOf(component.type) > -1) {
                this.entities.delete(entity.id);
            }
        }
    }
    return MovementSystem;
});
//# sourceMappingURL=MovementSystem.js.map