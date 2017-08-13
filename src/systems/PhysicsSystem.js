import Entity from "./../Entity";
import { RigidBody } from "./../components/RigidBody";
import Position from "./../components/Position";
import Physics from "./../components/Physics";

const DEPENDENCIES = ["position", "physics", "movable", "rigid-body"];

export default class PhysicsSystem {

    constructor() {
        this.entities = [];
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.push(entity);
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            var index = this.entities.indexOf(entity);
            if (index > -1) {
                this.entities.splice(index, 1);
            }
        }
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.push(entity);
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            var index = this.entities.indexOf(entity);
            if (index > -1) {
                this.entities.splice(index, 1);
            }
        }
    }

    handleCollision(collision) {
        var _entity = collision.entity;
        var _otherEntity = collision.otherEntity;

        if (this.handledPairs[`${_entity.id}|${_otherEntity.id}`] == null &&
            this.handledPairs[`${_otherEntity.id}|${_entity.id}`] == null) {

            this.handledPairs[`${_entity.id}|${_otherEntity.id}`] = true;

            var position = _entity.getComponent("position");
            var otherPosition = _otherEntity.getComponent("position");
            var movable = _entity.getComponent("movable");
            var otherMovable = _otherEntity.getComponent("movable");
            var physics = _entity.getComponent("physics");
            var otherPhysics = _otherEntity.getComponent("physics");
            var rigidBody = _entity.getComponent("rigid-body");
            var otherRigidBody = _otherEntity.getComponent("rigid-body");

            if (position.isStatic && otherPosition.isStatic) {
                return;
            }

            var totalMass = physics.mass + otherPhysics.mass;

            // Compute the current velocity off of the last position and the current position.
            physics.velocity.x = position.x - physics.lastPosition.x;
            physics.velocity.y = position.y - physics.lastPosition.y;

            otherPhysics.velocity.x = otherPosition.x - otherPhysics.lastPosition.x;
            otherPhysics.velocity.y = otherPosition.y - otherPhysics.lastPosition.y;

            var entityMomentum = {
                x: physics.mass * physics.velocity.x / totalMass,
                y: physics.mass * physics.velocity.y / totalMass
            };

            var entityVelocity = {
                x: entityMomentum.x * collision.penetration.x,
                y: entityMomentum.y * collision.penetration.y
            };

            var otherEntityMomentum = {
                x: otherPhysics.mass * otherPhysics.velocity.x / totalMass,
                y: otherPhysics.mass * otherPhysics.velocity.y / totalMass
            };

            var otherEntityVelocity = {
                x: otherEntityMomentum.x * -collision.penetration.x,
                y: otherEntityMomentum.y * -collision.penetration.y
            };

            if (!position.isStatic) {
                movable.x += entityVelocity.x;
                movable.y += entityVelocity.y;
            }

            if (!otherPosition.isStatic) {
                otherMovable.x += otherEntityVelocity.x;
                otherMovable.y += otherEntityVelocity.y;
            }

            physics.velocity.x = entityVelocity.x;
            physics.velocity.y = entityVelocity.y;
            otherPhysics.velocity.x = otherEntityVelocity.x;
            otherPhysics.velocity.y = otherEntityVelocity.y;

            physics.lastPosition.x = position.x;
            physics.lastPosition.y = position.y;

        }
    }

    update() {
        this.handledPairs = {};
        this.entities.forEach((entity) => {
            var _entity = entity;
            var rigidBody = _entity.getComponent("rigid-body");
            rigidBody.activeCollisions.forEach((collision) => {
                this.handleCollision(collision);
            });
        });
    }
}