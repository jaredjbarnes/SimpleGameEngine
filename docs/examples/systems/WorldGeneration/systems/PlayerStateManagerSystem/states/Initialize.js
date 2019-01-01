import AbstractState from "./AbstractState";
import Bitmap from "../../../../../../../src/components/Bitmap";

export default class Initialize extends AbstractState {
    constructor(){
        super();

        this.name = "initialize";
    }
    
    update(){
        const spriteSet = this.entity.getComponent("sprite-set");

        if (spriteSet.isLoaded){
            this.entity.addComponent(new Bitmap());
            this.state.name = "idle-down";
        }
    }

}