import invokeMethod from "../../utilities/invokeMethod";

export default class StateManagerSystem {
    constructor() {
        this.world = null;
        this.isReady = true;
        this.name = null;
        this.entities = {};
        this.states = {};
        this.stateDescriptors = [];
    }

    updateState(stateName, entity, config) {
        const state = this.states[stateName];
        invokeMethod(state, "update", []);
    }

    activateState(stateName, entity, config) {
        const state = this.states[stateName];
        invokeMethod(state, "activated", []);
    }

    deactivateState(stateName, entity, config) {
        const state = this.states[stateName];
        invokeMethod(state, "deactivated", []);
    }

    maintainState(entity) {
        const state = entity.getComponent("state");
        invokeMethod(state, "setup", [entity, state.config, this.world]);

        if (state.activeName !== state.name) {
            this.deactivateState(state.activeName, entity, state.config);
            state.activeName = state.name;
            state.activeConfig = state.config;
            this.activateState(state.name, entity, state.config);
        }

        this.updateState(state.name, entity, state.config);
    }

    update() {
        const entities = this.entities;
        for (let id in entities) {
            const entity = entities[id];
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
            const entity = entities[id];
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
            if (!state.initialized) {
                invokeMethod(this, "initialize", [entity]);
                state.initialized = true;
            }
            this.entities[entity.id] = entity;
        }
    }

    entityRemoved(entity) {
        if (this.entities[entity.id] != null) {
            const state = entity.getComponent("state");
            invokeMethod(this, "shutdown", [entity]);
            state.initialized = false;
            delete this.entities[entity.id];
        }
    }

    componentAdded(entity, component) {
        if (component.type === "state" && component.stateManagerName === this.name) {
            if (!component.initialized) {
                invokeMethod(this, "initialize", [entity]);
                component.initialized = true;
            }
            this.entities[entity.id] = entity;
        }
    }

    componentRemoved(entity, component) {
        if (component.type === "state") {
            invokeMethod(this, "shutdown", [entity]);
            component.initialized = false;
            delete this.entities[entity.id];
        }
    }

    addState(state) {
        if (typeof state.name === "string") {
            this.states[state.name] = state;
        } else {
            throw new Error("States must have a name property of type string.");
        }
    }

}


