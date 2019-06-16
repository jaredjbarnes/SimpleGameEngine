import invokeMethod from "../../utilities/invokeMethod.js";

export default class StateManagerSystem {
    constructor() {
        this.world = null;
        this.isReady = true;
        this.name = null;
        this.entities = {};
        this.states = {};
        this.entity = null;
        this.state = null;
    }

    maintainState() {
        const currentState = this.states[this.state.activeName];
        const nextState = this.states[this.state.name];

        if (this.state.activeName !== this.state.name) {
            invokeMethod(currentState, "setup", [this.entity, this.state.activeProps, this.world]);
            invokeMethod(currentState, "deactivated");

            this.state.activeName = this.state.name;
            this.state.activeProps = this.state.props;

            invokeMethod(nextState, "setup", [this.entity, this.state.activeProps, this.world]);
            invokeMethod(nextState, "activated");
            invokeMethod(nextState, "update");

        } else {
            invokeMethod(currentState, "setup", [this.entity, this.state.activeProps, this.world]);
            invokeMethod(currentState, "update");
        }

    }

    update() {
        const entities = this.entities;

        for (let id in entities) {
            this.entity = entities[id];
            this.state = this.entity.getComponent("state");
            this.maintainState();
        }
    };

    cacheEntities() {
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    activated(world) {
        this.world = world;
        this.cacheEntities();
    }

    deactivated() {
        this.world = null;
        this.entities = {};
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

    removeState(state){
        if (state != null && typeof state.name === "string" && this.states[state.name] != null){
            delete this.states[state.name];
        }
    }

}


