import AbstractState from "./AbstractState";

const UP = 38;
const LEFT = 37;
const RIGHT = 39;
const DOWN = 40;

export default class RunningDown extends AbstractState {
    constructor() {
        super();

        this.name = "running-down";
    }

    activated() {
        const entity = this.entity;
        const spriteSet = entity.getComponent("sprite-set");
        const sprite = entity.getComponent("sprite");
        const images = spriteSet.sets["running-down"];

        sprite.images = images;
    }

    update() {
        super.update();


        const entity = this.entity;
        const transform = entity.getComponent("transform");
        const keyboardInput = entity.getComponent("keyboard-input");

        if (keyboardInput.pressedKeys[RIGHT]) {
            transform.position.y += 2;
            transform.position.x += 1;
        } else if (keyboardInput.pressedKeys[LEFT]) {
            transform.position.y += 2;
            transform.position.x -= 1;
        } else {
            transform.position.y += 2;
        }
        transform.isDirty = true;
    }

}