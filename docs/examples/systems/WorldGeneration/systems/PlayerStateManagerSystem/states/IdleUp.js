import AbstractState from "./AbstractState";

export default class IdleUp extends AbstractState {
    constructor(){
        super();

        this.name = "idle-up";
    }
    
    activated() {
        const entity = this.entity;
        const spriteSet = entity.getComponent("sprite-set");
        const sprite = entity.getComponent("sprite");
        const images = spriteSet.sets["idle-up"];

        sprite.images = images;
    }

}