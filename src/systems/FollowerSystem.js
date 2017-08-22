const DEPENDENCIES = ["follower", "position", "size"];

export default class FollowerSystem {
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

            var follower = _entity.getComponent("follower");


        });
    }
}