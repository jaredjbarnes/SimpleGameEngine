import AbstractState from "./AbstractState";

export default class IdleLeft extends AbstractState {
    constructor(){
        super();

        this.name = "idle-left";
    }
    
    activated() {
        const entity = this.entity;
        const spriteSet = entity.getComponent("sprite-set");
        const sprite = entity.getComponent("sprite");
        const images = spriteSet.sets["idle-left"];

        sprite.images = images;
    }
}