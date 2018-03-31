import invokeMethod from "../utilities/invokeMethod";

const DEPENDENCIES = ["state"];

export default class StateManagerSystem {
    constructor() {
        this.world = null;
        this.isReady = true;
        this.name = null;
        this.entities = {};
        this.states = {};
        this.stateDescriptors = [];
    }

    updateState(stateName, entity) {
        const state = this.states[stateName];
        invokeMethod(state, "update", [entity, this.world]);
    }

    activateState(stateName, entity, options) {
        const state = this.states[stateName];
        invokeMethod(state, "activated", [entity, options, this.world]);
    }

    deactivateState(stateName, entity) {
        const state = this.states[stateName];
        invokeMethod(state, "deactivated", [entity, this.world]);
    }

    maintainState(entity) {
        const state = entity.getComponent("state");

        if (state.activeName !== state.name) {
            this.deactivateState(state.activeName, entity);
            state.activeName = state.name;
            state.activeOptions = state.options;
            this.activateState(state.name, entity, state.options);
        }

        this.updateState(state.name, entity);
    }

    update() {
        const entities = this.entities;
        for (let id in entities) {
            const entity = entities[entity.id];
            this.maintainState(entity);
        }
    };

    cacheEntities() {
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    activated(world) {
        const entities = this.entities;
        this.world = world;
        this.cacheEntities();

        for (let id in entities) {
            const entity = entities[entity.id];
            const state = entity.getComponent("state");
            const stateName = state.name;

            this.activateState(stateName, entity);
        }
    }

    deactivated() {
        this.world = null;
        this.entities = new Map();
    }

    entityAdded(entity) {
        const state = entity.getComponent("state");
        if (state != null && state.stateManagerName === this.name) {
            this.entities[entity.id] = entity;
        }
    }

    entityRemoved(entity) {
        if (this.entities[entity.id] != null) {
            delete this.entities[entity.id];
        }
    }

    componentAdded(entity, component) {
        if (component.type === "state" && component.stateManagerName === this.name) {
            this.entities[entity.id] = entity;
        }
    }

    componentRemoved(entity, component) {
        if (component.type === "state") {
            delete this.entities[entity.id];
        }
    }

    addState(name, state) {
        if (typeof name === "string" && state != null) {
            this.states[name] = state;
            invokeMethod(state, "initialize", [this.world]);
        }
    }

}


