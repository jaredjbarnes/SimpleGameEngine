import invokeMethod from "../utilities/invokeMethod.js";

export default class SystemsBundlerSystem {
    constructor() {
        this.name = "systems-bundler";
        this.systems = [];
    }

    notifySystems(methodName, args) {
        for (let x = 0; x < this.systems.length; x++) {
            const system = this.systems[x];
            invokeMethod(system, methodName, args);
        }
    }

    // Life Cycle Methods
    activated(...args) {
        this.notifySystems("activated", args);
    }

    afterUpdate(...args){
        this.notifySystems("afterUpdate", args);
    }

    beforeUpdate(...args){
        this.notifySystems("beforeUpdate", args);
    }

    componentAdded(...args) {
        this.notifySystems("componentAdded", args);
    }

    componentRemoved(...args) {
        this.notifySystems("componentRemoved", args);
    }

    deactivated(...args) {
        this.notifySystems("deactivated", args);
    }

    entityAdded(...args) {
        this.notifySystems("entityAdded", args);
    }

    entityRemoved(...args) {
        this.notifySystems("entityRemoved", args);
    }

    started(...args) {
        this.notifySystems("started", args);
    }

    stopped(...args) {
        this.notifySystems("stopped", args);
    }

    update(...args){
        this.notifySystems("update", args);
    }
}