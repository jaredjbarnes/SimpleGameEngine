import Recorder from "./Recorder.js";

const RECORD = "record";

export default class EntityRecorderSystem {
    constructor() {
        this.world = null;
        this.entities = [];
        this.recorder = new Recorder();
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
        this.entities = [];
    }

    deactivated() {
        this.world = null;
        this.entities = [];
    }

    entityAdded(entity) {
        if (entity.hasComponent(RECORD)) {
            this._addEntity(entity);
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponent(RECORD)) {
            this._removeEntity(entity);
        }
    }

    componentAdded(entity, component) {
        if (component.type === RECORD) {
            this._addEntity(entity);
        }
    }

    componentRemove(entity, component) {
        if (component.type === RECORD) {
            this._removeEntity(entity);
        }
    }

    update(time) {
        const entities = this.entities;
        const length = entities.length;

        for (let x = 0; x < length; x++) {
            this.recorder.setEntity(entities[x]);
            this.recorder.record(time);
        }
    }
}