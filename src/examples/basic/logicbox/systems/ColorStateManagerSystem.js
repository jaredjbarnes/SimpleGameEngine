import StateManagerSystem from "./../../../../systems/StateManagerSystem";



export default class ColorStateManager extends StateManagerSystem {
    constructor() {
        super();
        this.name = "color-state-manager";
    }

    activated(world) {
        super.activated(world);
        var _world = world;

        var isSolidBodyOn = (collidable) => {
            var _collidable = collidable;
            var isOn = false;

            for (let key in _collidable.collisions) {
                var collision = _collidable.collisions[key];
                var entity = _world.getEntityById(collision.entityId);

                if (collision.endTimestamp == null && entity.hasComponents(["solid-body"])) {
                    isOn = true;
                    break;
                }
            }

            return isOn;
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
                if (collidable != null && !isSolidBodyOn(collidable)) {
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
                if (collidable != null && isSolidBodyOn(collidable)) {
                    state.name = "blue-state";
                }
            }
        }

        this.addState("blue-state", blueState);
        this.addState("red-state", redState);
    }
}