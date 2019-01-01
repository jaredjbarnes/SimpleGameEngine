import AbstractState from "./AbstractState";

export default class RunningRight extends AbstractState {
    constructor(){
        super();

        this.name = "running-right";
    }
    
    activated() {
        const entity = this.entity;
        const spriteSet = entity.getComponent("sprite-set");
        const sprite = entity.getComponent("sprite");
        const images = spriteSet.sets["running-right"];

        sprite.images = images;
    }

    update(){
        super.update();

        const entity = this.entity;
        const transform = entity.getComponent("transform");

        transform.position.x += 2;
        transform.isDirty = true;
    }

}