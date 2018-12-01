const DEPENDENCIES = ["player-controller", "movable"];

export default class PlayerControllerSystem {
    constructor(step = 15) {
        this.world = null;
        this.inputControllerService = null;
        this.players = {};
        this.step = step
    }

    activated(world) {
        this.world = world;
    }

    deactivated() {
        this.world = null;
        this.inputControllerService = null;
        this.players = {};
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.players[entity.id] = entity;
        }
    }

    entityRemoved(entity) {
        if (this.players[entity.id]) {
            delete this.players[entity.id];
        }
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.players[entity.id] = entity;
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type)) {
            delete this.players[entity.id];
        }
    }

    update() {
        if (this.inputControllerService != null) {
            const players = this.players;

            for (let x in players) {
                const player = players[x];

                const movable = player.getComponent("movable");
                movable.x += Math.round(this.inputControllerService.x * this.step);
                movable.y += Math.round(this.inputControllerService.y * this.step);
            }
        }
    }

    serviceAdded(name, service) {
        if (name === "controller-input-service") {
            this.inputControllerService = service;
        }
    }
}