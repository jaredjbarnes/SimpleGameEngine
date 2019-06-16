export default class State {

    constructor(){
        this.entity = null;
        this.config = null;
        this.world = null;
    }

    setup(entity, config, world){
        this.entity = entity;
        this.config = config;
        this.world = world;
        this.state = entity.getComponent("state");
    }

    activated(){

    }

    deactivated(){
        
    }

    update(){

    }

}