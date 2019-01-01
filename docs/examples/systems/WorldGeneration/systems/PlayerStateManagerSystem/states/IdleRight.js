import AbstractState from "./AbstractState";

export default class IdleRight extends AbstractState {
    constructor(){
        super();

        this.name = "idle-right";
    }
    
    activated() {
        const entity = this.entity;
        const spriteSet = entity.getComponent("sprite-set");
        const sprite = entity.getComponent("sprite");
        const images = spriteSet.sets["idle-right"];

        sprite.images = images;
    }

}