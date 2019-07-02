export default class EntityDelegate {
    constructor(world) {
        this.world = world;
    }
    componentAdded(...args) {
        this.world.notifySystems("componentAdded", args);
    }

    componentRemoved(...args) {
        this.world.notifySystems("componentRemoved", args);
    }
}