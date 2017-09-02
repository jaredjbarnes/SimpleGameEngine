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

    _getEntitysNextPosition(entity) {
        var _entity = entity;
        var movable = _entity.getComponent("movable");
        var position = _entity.getComponent("position");

        if (movable == null || position == null) {
            throw new Error("Entity needs to have both movable and position components.");
        }

        return {
            x: position.x + movable.x,
            y: position.y + movable.y
        };
    }

    _getFollowersDesiredPosition(leader, follower) {
        var _leader = leader;
        var _follower = follower;
        var distance = _follower.getComponent("follower").distance;

        var leadersDirection = leader.getComponent("movable");
        var followerNextPosition = this._getEntitysNextPosition(_follower);
        var direction = Vector.normalize(leadersDirection);

        return Vector.multiply(direction, distance);
    }

    _setFollowersNextPosition(leader, follower) {
        var desiredPosition = this._getFollowersDesiredPosition(leader, follower);
        var currentPosition = this._getEntitysNextPosition(follower);

        var distance = Vector.subtract(desiredPosition, currentPosition);
        var direction = Vector.normalize(distance);
        var maxSpeed = follower.getComponent("follower").maxSpeed;
        var movable = follower.getComponent("movable");

        movable.x += parseInt(direction.x * maxSpeed, 10);
        movable.y += parseInt(direction.y * maxSpeed, 10);
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
        this.world = null;
        this.entities = [];
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
        this.entities.forEach((follower) => {
            var _follower = follower;

            var followerComponent = _follower.getComponent("follower");
            var leader = this.world.getEntityById(followerComponent.leaderEntityId);

            this._setFollowersNextPosition(leader, _follower);
        });
    }
}