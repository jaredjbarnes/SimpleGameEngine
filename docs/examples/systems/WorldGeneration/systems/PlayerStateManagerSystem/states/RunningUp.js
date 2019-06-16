import AbstractState from "./AbstractState";

const LEFT = 37;
const RIGHT = 39;

export default class RunningUp extends AbstractState {
    constructor() {
        super();

        this.name = "running-up";
    }

    activated() {
        const entity = this.entity;
        const spriteSet = entity.getComponent("sprite-set");
        const sprite = entity.getComponent("sprite");
        const images = spriteSet.sets["running-up"];

        sprite.images = images;
    }

    update() {
        super.update();

        const entity = this.entity;
        const transform = entity.getComponent("transform");
        const keyboardInput = entity.getComponent("keyboard-input");

        if (keyboardInput.pressedKeys[RIGHT]) {
            transform.position.x += 1;
            transform.position.y -= 2;
        } else if (keyboardInput.pressedKeys[LEFT]) {
            transform.position.y -= 2;
            transform.position.x -= 1;
        } else {
            transform.position.y -= 2;
        }

        transform.isDirty = true;

    }

}