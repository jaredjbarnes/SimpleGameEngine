import Game = require("./../Game");
import Entity = require("./../Entity");
import State = require("./../components/State");
import Stateful = require("./../components/Stateful");

class EntityState {
    entityId: string;
    state: State;
    states: Map<string, Stateful>;

    constructor() {
        this.entityId = null;
        this.state = null;
        this.states = null;
    }
}

class StateManagerSystem {
    game: Game;
    entities: Array<EntityState>;

    constructor() {
        this.game = null;
        this.entities = [];
    }

    private _addEntity(entity: Entity) {
        if (entity.hasComponents(["state"])) {
            var index = this.entities.map((entityState) => {
                return entityState.entityId;
            }).indexOf(entity.id);

            if (index === -1) {
                var entityState = new EntityState();
                entityState.state = entity.getComponent<State>("state");
                entityState.states = entity.getComponents().reduce(function (accumulator, component) {
                    if (component.isStateful) {
                        accumulator.set(component.name, component);
                    }
                    return accumulator;
                }, new Map());

                this.entities.push(entityState);
            }
        }
    }

    private _removeEntity(entity: Entity) {
        if (entity.hasComponents(["state"])) {
            var index = this.entities.map((entityState) => {
                return entityState.entityId;
            }).indexOf(entity.id);

            if (index > -1) {
                this.entities.splice(index, 1);
            }
        }
    }

    private _handleStates(entity) {

    }

    activated(game: Game) {
        this.game = game;
    }

    deactivated() {
        this.game = null;
    }

    update() {
        this.entities.forEach((entity) => {
            this._handleStates(entity);
        });
    }

    entityAdded(entity: Entity) {
        this._addEntity(entity);
    }

    entityRemoved(entity: Entity) {
        this._removeEntity(entity);
    }

    componentAdded(component, entity: Entity) {
        if (component.type === "state") {
            this._addEntity(entity);
        }
    }

    componentRemoved(component, entity: Entity) {
        if (component.type === "state") {
            this._removeEntity(entity);
        }
    }
}

export = StateManagerSystem;