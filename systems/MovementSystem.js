define(["require", "exports"], function (require, exports) {
    "use strict";
    const MOVABLE = "movable";
    const DEPENDENCIES = [MOVABLE, "position"];
    class MovementSystem {
        constructor() {
            this.game = null;
            this.entities = new Map();
        }
        update() {
            Array.from(this.entities.values()).forEach((entity) => {
                var movable = entity.getComponent("movable");
                var position = entity.getComponent("position");
                position.x += movable.x;
                position.y += movable.y;
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
                this.entities.set(entity.id, entity);
            }
        }
        entityRemoved(entity) {
            if (entity.hasComponents(DEPENDENCIES)) {
                this.entities.delete(entity.id);
            }
        }
        componentAdded(component, entity) {
            if (entity.hasComponents(DEPENDENCIES)) {
                this.entities.set(entity.id, entity);
            }
        }
        componentRemoved(component, entity) {
            if (!entity.hasComponents(DEPENDENCIES)) {
                this.entities.delete(entity.id);
            }
        }
    }
    return MovementSystem;
});
//# sourceMappingURL=MovementSystem.js.map