import Vector from "./../Vector";

const DEPENDENCIES = ["follower", "position", "size", "movable"];

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

    _getEntitiesNextPosition(entity) {
        var _entity = entity;
        var movable = _entity.getComponent("movable");
        var position = _enitty.getComponent("position");

        if (movable == null || position == null) {
            throw new Error("Entity needs to have both movable and position components.");
        }

        return {
            x: position.x + movable.x,
            y: position.y + movable.y
        };
    }

    _getFollowerEntitysDesiredPosition(followedPosition, followedDirection, distance){
        
    }

    _getFollowingEntitysNextPosition(followed, follower) {
        var _followed;
        var _follower;

        var followedNextPosition = this._getEntitiesNextPosition(_followed);
        var followerNextPosition = this._getEntitiesNextPosition(_follower);

        var followerComponent = _follower.getComponent("follower");
        var distanceToGo = {
            x: followedNextPosition.x - followerNextPosition.x,
            y: followedNextPosition.y - followerNextPosition.y
        }
    };

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