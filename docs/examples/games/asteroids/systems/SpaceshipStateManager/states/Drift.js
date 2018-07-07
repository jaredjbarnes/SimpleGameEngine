export default class Drift {
    constructor(){
        this.name = "drift";
    }

    activated(entity, options, world){

    }

    deactivated(entity, options, world){

    }

    update(entity, world){
        const spaceRigidBody = entity.getComponent("space-rigid-body");
        const transform
    }
}