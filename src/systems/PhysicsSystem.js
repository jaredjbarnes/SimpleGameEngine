// INCOMPLETE

import Entity from "./../Entity";
import { RigidBody } from "./../components/RigidBody";
import Position from "./../components/Position";
import Physics from "./../components/Physics";

const DEPENDENCIES = ["position", "physics", "force", "rigid-body"];

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
        if (collision.endTimestamp != null) {
            return;
        }

        var _collision = collision;
        var _entity = _collision.entity;
        var _otherEntity = _collision.otherEntity;

        if (this.handledPairs[`${_entity.id}|${_otherEntity.id}`] == null &&
            this.handledPairs[`${_otherEntity.id}|${_entity.id}`] == null) {

            this.handledPairs[`${_entity.id}|${_otherEntity.id}`] = true;

            var position = _entity.getComponent("position");
            var otherPosition = _otherEntity.getComponent("position");
            var force = _entity.getComponent("force");
            var otherForce = _otherEntity.getComponent("force");
            var physics = _entity.getComponent("physics");
            var otherPhysics = _otherEntity.getComponent("physics");
            var rigidBody = _entity.getComponent("rigid-body");
            var otherRigidBody = _otherEntity.getComponent("rigid-body");

            if (position.isStatic && otherPosition.isStatic) {
                return;
            }

            var totalMass = physics.mass + otherPhysics.mass;

            var entityMomentum = {
                x: physics.mass * physics.velocity.x / totalMass,
                y: physics.mass * physics.velocity.y / totalMass
            };

            var entityVelocity = {
                x: entityMomentum.x * _collision.penetration.x,
                y: entityMomentum.y * _collision.penetration.y
            };

            var otherEntityMomentum = {
                x: otherPhysics.mass * otherPhysics.velocity.x / totalMass,
                y: otherPhysics.mass * otherPhysics.velocity.y / totalMass
            };

            var otherEntityVelocity = {
                x: otherEntityMomentum.x * -_collision.penetration.x,
                y: otherEntityMomentum.y * -_collision.penetration.y
            };

            if (!position.isStatic) {
                physics.velocity.x = entityVelocity.x;
                physics.velocity.y = entityVelocity.y;

                physics.acceleration.x = force.x;
                physics.acceleration.y = force.y;
            }

            if (!otherPosition.isStatic) {
                otherPhysics.velocity.x = otherEntityVelocity.x;
                otherPhysics.velocity.y = otherEntityVelocity.y;

                otherPhysics.acceleration.x = otherForce.x;
                otherPhysics.acceleration.y = otherForce.y;
            }

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