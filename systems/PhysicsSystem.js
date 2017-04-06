define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const DEPENDENCIES = ["position", "physics", "rigid-body"];
    class PhysicsSystem {
        constructor() {
            this.entities = [];
        }
        entityAdded(entity) {
            if (entity.hasComponents(DEPENDENCIES)) {
                this.entities.push(entity);
            }
        }
        entityRemoved(entity) {
            var index = this.entities.indexOf(entity);
            if (index > -1) {
                this.entities.splice(index, 1);
            }
        }
        componentAdded(entity, component) {
            if (entity.hasComponents(DEPENDENCIES)) {
                this.entities.push(entity);
            }
        }
        componentRemoved(entity, component) {
            if (DEPENDENCIES.indexOf(component.type) > -1) {
                this.entityRemoved(entity);
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
                    position.x += entityVelocity.x;
                    position.y += entityVelocity.y;
                    position.isDirty = true;
                }
                if (!otherPosition.isStatic) {
                    otherPosition.x += otherEntityVelocity.x;
                    otherPosition.y += otherEntityVelocity.y;
                    otherPosition.isDirty = true;
                }
                physics.velocity.x = entityVelocity.x;
                physics.velocity.y = entityVelocity.y;
                otherPhysics.velocity.x = otherEntityVelocity.x;
                otherPhysics.velocity.y = otherEntityVelocity.y;
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
    exports.default = PhysicsSystem;
});
//# sourceMappingURL=PhysicsSystem.js.map