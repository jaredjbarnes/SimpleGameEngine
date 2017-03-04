import State = require("./../components/State");
import Game = require("./../Game");
import Entity = require("./../Entity");

const DEPENDENCIES = ["state"];

var invokeMethod = function (obj, methodName, args) {
    if (obj != null && typeof obj[methodName] === "function") {
        return obj[methodName].apply(obj, args);
    }
};

class StateManagerSystem {
    game: Game;
    isReady: boolean;
    name: string;
    entities: Map<string, Entity>;
    states: Map<string, any>;

    constructor() {
        this.game = null;
        this.isReady = true;
        this.name = null;
        this.entities = new Map();
        this.states = new Map();
    }

    updateState(stateName, entity) {
        var state = this.states.get(stateName);
        invokeMethod(state, "update", [entity]);
    }

    activateState(stateName, entity) {
        var state = this.states.get(stateName);
        invokeMethod(state, "activated", [entity]);
    }

    deactivateState(stateName, entity) {
        var state = this.states.get(stateName);
        invokeMethod(state, "deactivated", [entity]);
    }

    maintainState(entity: Entity) {
        var state = entity.getComponent<State>("state");

        if (state.activeName !== state.name) {
            this.deactivateState(state.activeName, entity);
            state.activeName = state.name;
            state.activeOptions = state.options;
            this.activateState(state.name, entity);
        }

        this.updateState(state.name, entity);
        
    }

    update() {
        this.entities.forEach((entity) => {
            this.maintainState(entity);
        });
    };

    cacheEntities() {
        this.game.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    activated(game) {
        this.game = game;
        this.cacheEntities();

        this.entities.forEach((entity) => {
            var state = entity.getComponent<State>("state");
            var stateName = state.name;

            this.activateState(stateName, entity);
        });

    }

    deactivated() {
        this.game = null;
        this.entities = new Map();
    }

    entityAdded(entity: Entity) {
        var state = entity.getComponent<State>("state");
        if (state != null && state.stateManagerName === this.name) {
            this.entities.set(entity.id, entity);
        }
    }

    entityRemoved(entity) {
        this.entities.delete(entity.id);
    }

    componentAdded(entity, component: State) {
        if (component.type === "state" && component.stateManagerName === this.name) {
            this.entities.set(entity.id, entity);
        }
    }

    componentRemoved = function (entity, component: State) {
        if (component.type === "state") {
            this.entities.delete(entity.id);
        }
    }

    addState = function (name, state) {
        if (typeof name === "string" && state != null) {
            this.states.set(name, state);
            invokeMethod(state, "initialize", [this.game]);
        }
    }

}

export = StateManagerSystem;


