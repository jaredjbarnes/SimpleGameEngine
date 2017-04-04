import Entity from "./../Entity";
import { RigidBody } from "./../components/RigidBody";
import Position from "./../components/Position";
import Physics from "./../components/Physics";

const DEPENDENCIES = ["position", "physics", "rigid-body"];

export default class PhysicsSystem {

    private entities: Array<Entity>;
    private handledPairs: any;

    constructor() {
        this.entities = [];
    }

    entityAdded(entity: Entity) {
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
        var _entity = <Entity>collision.entity;
        var _otherEntity = <Entity>collision.otherEntity;

        if (this.handledPairs[`${_entity.id}|${_otherEntity.id}`] == null &&
            this.handledPairs[`${_otherEntity.id}|${_entity.id}`] == null) {

            this.handledPairs[`${_entity.id}|${_otherEntity.id}`] = true;

            var position = _entity.getComponent<Position>("position");
            var otherPosition = _otherEntity.getComponent<Position>("position");
            var physics = _entity.getComponent<Physics>("physics");
            var otherPhysics = _otherEntity.getComponent<Physics>("physics");
            var rigidBody = _entity.getComponent<RigidBody>("rigid-body");
            var otherRigidBody = _otherEntity.getComponent<RigidBody>("rigid-body");

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
            var rigidBody = _entity.getComponent<RigidBody>("rigid-body");
            rigidBody.activeCollisions.forEach((collision) => {
                this.handleCollision(collision);
            });
        });
    }
}