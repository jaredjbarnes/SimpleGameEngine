import Vector from "./../Vector";

const DEPENDENCIES = ["follower", "transform", "movable"];

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
        var position = _entity.getComponent("transform").position;

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
        var followerComponent = _follower.getComponent("follower");
        var distance = followerComponent.distance;
        var followersSize = _follower.getComponent("transform").size;
        var leadersPosition = _leader.getComponent("position");
        var leadersSize = _leader.getComponent("transform").size;
        var leadersCenter = {
            x: Math.round(leadersSize.width / 2) + leadersPosition.x - Math.round(followersSize.width / 2),
            y: Math.round(leadersSize.height / 2) + leadersPosition.y - Math.round(followersSize.height / 2)
        };

        var leadersDirection = leader.getComponent("movable");
        var followerNextPosition = this._getEntitysNextPosition(_follower);
        var direction = Vector.normalize(leadersDirection);

        if (isNaN(direction.x)) {
            direction.x = followerComponent.lastDirection.x;;
        }

        if (isNaN(direction.y)) {
            direction.y = followerComponent.lastDirection.y;
        }

        followerComponent.lastDirection.x = direction.x;
        followerComponent.lastDirection.y = direction.y;

        return Vector.add(leadersCenter, Vector.multiply(direction, distance));
    }

    _setFollowersNextPosition(leader, follower) {
        var desiredPosition = this._getFollowersDesiredPosition(leader, follower);
        var currentPosition = this._getEntitysNextPosition(follower);

        var distance = Vector.subtract(desiredPosition, currentPosition);
        var direction = Vector.normalize(distance);
        var maxSpeed = follower.getComponent("follower").maxSpeed;
        var movable = follower.getComponent("movable");

        if (isNaN(direction.x)) {
            direction.x = 0;
        }

        if (isNaN(direction.y)) {
            direction.y = 0;
        }

        var moveX = Math.round(direction.x * maxSpeed);
        var moveY = Math.round(direction.y * maxSpeed);

        if (Math.abs(distance.x) > maxSpeed) {
            movable.x += moveX;
        } else {
            movable.x += Math.round(distance.x);
        }

        if (Math.abs(distance.y) > maxSpeed) {
            movable.y += moveY;
        } else {
            movable.y += Math.round(distance.y);
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