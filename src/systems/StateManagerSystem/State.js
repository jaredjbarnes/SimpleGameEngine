export default class State {

    constructor(){
        this.entity = null;
        this.config = null;
        this.world = null;
    }

    prepare(entity, config, world){
        this.entity = entity;
        this.config = config;
        this.world = world;
    }

}