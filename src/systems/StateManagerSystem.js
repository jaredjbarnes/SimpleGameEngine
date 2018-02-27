import invokeMethod from "../utilities/invokeMethod";

const DEPENDENCIES = ["state"];

export default class StateManagerSystem {
    constructor() {
        this.world = null;
        this.isReady = true;
        this.name = null;
        this.entities = new Map();
        this.states = new Map();
        this.stateDescriptors = [];
    }

    updateState(stateName, entity) {
        var state = this.states.get(stateName);
        invokeMethod(state, "update", [entity, this.world]);
    }

    activateState(stateName, entity, options) {
        var state = this.states.get(stateName);
        invokeMethod(state, "activated", [entity, options, this.world]);
    }

    deactivateState(stateName, entity) {
        var state = this.states.get(stateName);
        invokeMethod(state, "deactivated", [entity, this.world]);
    }

    maintainState(entity) {
        var state = entity.getComponent("state");

        if (state.activeName !== state.name) {
            this.deactivateState(state.activeName, entity);
            state.activeName = state.name;
            state.activeOptions = state.options;
            this.activateState(state.name, entity, state.options);
        }

        this.updateState(state.name, entity);

    }

    update() {
        this.entities.forEach((entity) => {
            this.maintainState(entity);
        });
    };

    cacheEntities() {
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    activated(world) {
        this.world = world;
        this.cacheEntities();

        this.entities.forEach((entity) => {
            var state = entity.getComponent("state");
            var stateName = state.name;

            this.activateState(stateName, entity);
        });

    }

    deactivated() {
        this.world = null;
        this.entities = new Map();
    }

    entityAdded(entity) {
        var state = entity.getComponent("state");
        if (state != null && state.stateManagerName === this.name) {
            this.entities.set(entity.id, entity);
        }
    }

    entityRemoved(entity) {
        this.entities.delete(entity.id);
    }

    componentAdded(entity, component) {
        if (component.type === "state" && component.stateManagerName === this.name) {
            this.entities.set(entity.id, entity);
        }
    }

    componentRemoved(entity, component) {
        if (component.type === "state") {
            this.entities.delete(entity.id);
        }
    }

    addState(name, state) {
        if (typeof name === "string" && state != null) {
            this.states.set(name, state);
            invokeMethod(state, "initialize", [this.world]);
        }
    }

}


