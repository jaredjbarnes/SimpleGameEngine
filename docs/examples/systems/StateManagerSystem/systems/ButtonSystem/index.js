import StateManagerSystem from "../../../../../../src/systems/StateManagerSystem";

const BUTTON_DEPENDENCIES = ["button", "state", "transform", "rectangle", "rectangle-collider","image"];

export default class ButtonSystem extends StateManagerSystem {
    constructor() {
        super();
        this.world = null;
        this.buttons = [];
    }

    isButton(entity) {
        return entity.hasComponents(BUTTON_DEPENDENCIES);
    }

    // Life-cycle 
    activated(world) {
        this.world;

        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });

    }

    entityAdded(entity) {
        if (this.isButton(entity)){
            this.buttons.push(entity);
        }
    }

    entityRemoved() {

    }

    updated() {

    }
}