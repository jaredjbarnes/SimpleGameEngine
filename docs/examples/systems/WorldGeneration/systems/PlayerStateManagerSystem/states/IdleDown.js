import AbstractState from "./AbstractState";

export default class IdleDown extends AbstractState {
    constructor(){
        super();

        this.name = "idle-down";
    }
    
    activated() {
        const entity = this.entity;
        const spriteSet = entity.getComponent("sprite-set");
        const sprite = entity.getComponent("sprite");
        const images = spriteSet.sets["idle-down"];

        sprite.images = images;
    }

}