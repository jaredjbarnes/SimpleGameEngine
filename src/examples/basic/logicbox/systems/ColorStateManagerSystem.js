import StateManagerSystem from "./../../../../systems/StateManagerSystem";



export default class ColorStateManager extends StateManagerSystem {
    constructor() {
        super();
        this.name = "color-state-manager";
    }

    activated(world) {
        super.activated(world);

        var isCharacterOn = (collidable) => {
            var _collidable = collidable;
            var matches = [];
            _collidable.activeCollisions.forEach((collision) => {
                var _collision = collision;
                var entity = world.getEntityById(_collision.entityId);

                if (_collision.endTimestamp == null && entity.hasComponents(["character"])) {
                    matches.push(entity);
                }

            });

            return matches.length > 0;
        };

        var blueState = {
            activated: (entity) => {
                var shape = entity.getComponent("shape");

                if (shape != null) {
                    shape.fillColor.red = 255;
                    shape.fillColor.green = 150;
                    shape.fillColor.blue = 0;
                    shape.fillColor.alpha = 1;
                    shape.isDirty = true;
                }
            },
            update: (entity) => {
                var collidable = entity.getComponent("collidable");
                var state = entity.getComponent("state");
                if (collidable != null && !isCharacterOn(collidable)) {
                    state.name = "red-state";
                }
            }
        };

        var redState = {
            activated: (entity) => {
                var shape = entity.getComponent("shape");
                if (shape) {
                    shape.fillColor.red = 180;
                    shape.fillColor.green = 0;
                    shape.fillColor.blue = 180;
                    shape.fillColor.alpha = 1;
                    shape.isDirty = true;
                }


            },
            update: (entity) => {
                var collidable = entity.getComponent("collidable");
                var state = entity.getComponent("state");
                if (collidable != null && isCharacterOn(collidable)) {
                    state.name = "blue-state";
                }
            }
        }

        this.addState("blue-state", blueState);
        this.addState("red-state", redState);
    }
}