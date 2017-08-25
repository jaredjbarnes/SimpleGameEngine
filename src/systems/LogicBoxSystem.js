const DEPENDENCIES = ["logic-box"];

export default class LogicBoxSystem {
    constructor() {
        this.world = null;
        this.entities = [];
    }

    _addEntity(entity) {
        var index = this.entities.indexOf(entity);
        if (index === -1) {
            this.entities.push(entity);
        }
    }

    _getStateComponent(entityId) {
        var entity = this.world.getEntityById(entityId);

        if (entity == null) {
            throw new Error(`Couldn't find entity with id: ${entityId}`);
        }

        var state = entity.getComponent("state");

        if (state == null) {
            throw new Error(`The entity, ${entity.id} needs to have a state component.`);
        }
        return state;
    }

    _removeEntity(entity) {
        var index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            var _entity = entity;
            this.entityAdded(entity);
        });
    }

    deactivated() {

    }

    componentAdded(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this._addEntity(entity);
        }
    }

    componentRemove(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this._removeEntity(entity);
        }
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this._addEntity(entity);
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this._removeEntity(entity);
        }
    }

    update() {
        this.entities.forEach((entity) => {
            var _entity = entity;

            var logicBox = _entity.getComponent("logic-box");

            var shouldExecuteAction = logicBox.conditions.every((condition) => {
                var state = this._getStateComponent(condition.entityId);

                return condition.stateNames.indexOf(state.name) > -1;
            });

            if (shouldExecuteAction) {
                logicBox.actions.forEach((action) => {
                    var state = this._getStateComponent(action.entityId);

                    state.name = action.stateName;
                    state.options = action.options;
                });
            }
        });
    }
}