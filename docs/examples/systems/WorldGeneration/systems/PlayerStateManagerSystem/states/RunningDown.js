import AbstractState from "./AbstractState";

export default class RunningDown extends AbstractState {
    constructor(){
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

    update(){
        super.update();

        const entity = this.entity;
        const transform = entity.getComponent("transform");

        transform.position.y += 2;
        transform.isDirty = true;
    }

}