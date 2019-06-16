import HistoryPlayer from "./HistoryPlayer.js";

const HISTORY_PLAYER = "history-player";

export default class HistoryPlayerSystem {
    constructor() {
        this.world = null;
        this.entities = [];
        this.historyPlayer = new HistoryPlayer();
    }

    _addEntity(entity) {
        const index = this.entities.indexOf(entity);

        if (index === -1) {
            this.entities.push(entity);
        }
    }

    _removeEntity(entity) {
        const index = this.entities.indexOf(entity);

        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    activated(world) {
        this.world = world;
    }

    deactivated() {
        this.world = null;
    }

    entityAdded(entity) {
        if (entity.hasComponent("history-player")) {
            this._addEntity(entity);
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponent("history-player")) {
            this._removeEntity(entity);
        }
    }

    componentAdded(entity, component) {
        if (component.type === "history-player") {
            this._addEntity(entity);
        }
    }

    componentRemove(entity, component) {
        if (component.type === "history-player") {
            this._removeEntity(entity);
        }
    }

    update(time) {
        const entities = this.entities;
        const length = entities.length;
        const historyPlayer = this.historyPlayer;

        for (let x = 0; x < length; x++) {  
            historyPlayer.setEntity(entities[x]);
            historyPlayer.play(time);
        }
    }
}