import AbstractState from "./AbstractState";

export default class RunningUp extends AbstractState {
    constructor(){
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

        transform.position.y -= 2;
        transform.isDirty = true;
    }

}