define(["require", "exports", "./../Vector"], function (require, exports, Vector) {
    "use strict";
    const DEPENDENCIES = ["collidable", "rigid-body", "position"];
    class NarrowPhaseCollisionSystem {
        constructor() {
            this.entities = [];
            this.projectionA = {
                min: 0,
                max: 0
            };
            this.projectionB = {
                min: 0,
                max: 0
            };
            this.timestamp = 0;
        }
        prepareRigidBody(rigidBody) {
            var points = rigidBody.points;
            var length = points.length;
            if (points.length === rigidBody.vertices.length &&
                points.length === rigidBody.normals.length &&
                points.length === rigidBody.projectionVertices.length) {
                return;
            }
            this.setSize(rigidBody);
            rigidBody.vertices = points.map(function (point, index) {
                var nextPoint = points[index + 1] || points[0];
                return {
                    x: point.x - nextPoint.x,
                    y: point.y - nextPoint.y
                };
            });
            rigidBody.worldPoints = points.map(function (point) {
                return {
                    x: point.x,
                    y: point.y
                };
            });
            rigidBody.normals = rigidBody.vertices.map(function (vertex, index) {
                return Vector.normalize(Vector.getLeftNormal(vertex));
            });
            var finalVector = rigidBody.vertices.reduce(function (accumulator, vertex) {
                accumulator.x += vertex.x;
                accumulator.y += vertex.y;
                return accumulator;
            }, { x: 0, y: 0 });
            // If the final vector isn't (0,0) then make it so, to finish the polygon.
            if (finalVector.x !== 0 || finalVector.y !== 0) {
                rigidBody.points.push(rigidBody.points[0]);
                rigidBody.vertices.push({
                    x: -finalVector.x,
                    y: -finalVector.y
                });
                rigidBody.normals.push(Vector.getLeftNormal(rigidBody.vertices[rigidBody.vertices.length - 1]));
            }
        }
        setSize(rigidBody) {
            var width;
            var height;
            var points = rigidBody.points;
            var length = points.length;
            var top = points[0].y;
            var left = points[0].x;
            var bottom = points[0].y;
            var right = points[0].x;
            for (var x = 1; x < length; x++) {
                top = Math.min(top, points[x].y);
                left = Math.min(left, points[x].x);
                bottom = Math.max(bottom, points[x].y);
                right = Math.max(right, points[x].x);
            }
            width = right - left;
            height = bottom - top;
            rigidBody.size.width = width;
            rigidBody.size.height = height;
            rigidBody.origin.x = (width / 2) + left;
            rigidBody.origin.y = (height / 2) + top;
        }
        projectToAxis(vertices, axis, projection) {
            var min = Vector.dot(vertices[0], axis);
            var max = min;
            var dot;
            for (var i = 1; i < vertices.length; i += 1) {
                dot = Vector.dot(vertices[i], axis);
                if (dot > max) {
                    max = dot;
                }
                else if (dot < min) {
                    min = dot;
                }
            }
            projection.min = min;
            projection.max = max;
        }
        overlapAxes(verticesA, verticesB, axes) {
            var projectionA = this.projectionA;
            var projectionB = this.projectionB;
            var result = {
                overlap: Number.MAX_VALUE,
                axis: null,
                axisNumber: null
            };
            var overlap;
            var axis;
            projectionA.min = 0;
            projectionA.max = 0;
            projectionB.min = 0;
            projectionB.max = 0;
            for (var i = 0; i < axes.length; i++) {
                axis = axes[i];
                this.projectToAxis(verticesA, axis, projectionA);
                this.projectToAxis(verticesB, axis, projectionB);
                overlap = Math.min(projectionA.max - projectionB.min, projectionB.max - projectionA.min);
                if (overlap <= 0) {
                    result.overlap = overlap;
                    return result;
                }
                if (overlap < result.overlap) {
                    result.overlap = overlap;
                    result.axis = axis;
                    result.axisNumber = i;
                }
            }
            return result;
        }
        updateWorldPoints(entity) {
            var rigidBody = entity.getComponent("rigid-body");
            var position = entity.getComponent("position");
            var worldPoints = rigidBody.worldPoints;
            worldPoints.length = rigidBody.points.length;
            rigidBody.points.forEach(function (point, index) {
                var worldPoint = worldPoints[index];
                worldPoint.x = point.x + position.x;
                worldPoint.y = point.y + position.y;
            });
        }
        intersects(entityA, entityB) {
            var x;
            var vx;
            var normal;
            var rigidBodyA = entityA.getComponent("rigid-body");
            var rigidBodyB = entityB.getComponent("rigid-body");
            var positionA = entityA.getComponent("position");
            var positionB = entityB.getComponent("position");
            var collidableA = entityA.getComponent("collidable");
            var collidableB = entityA.getComponent("collidable");
            if (!collidableA.isStatic) {
                this.updateWorldPoints(entityA);
            }
            if (!collidableB.isStatic) {
                this.updateWorldPoints(entityB);
            }
            var normalsA = rigidBodyA.normals;
            var normalsB = rigidBodyB.normals;
            var projectionA = this.projectionA;
            var projectionB = this.projectionB;
            var verticesA = rigidBodyA.worldPoints;
            var verticesB = rigidBodyB.worldPoints;
            var collisionA = rigidBodyA.activeCollisions.get(entityB.id);
            var collisionB = rigidBodyB.activeCollisions.get(entityA.id);
            var penetration;
            var minOverlap;
            var normal;
            var originA = Vector.add(positionA, rigidBodyA.origin);
            var originB = Vector.add(positionB, rigidBodyB.origin);
            rigidBodyA.isInitialized = true;
            rigidBodyB.isInitialized = true;
            // If the collision was already handled from the other side then stop detection.
            if (collisionA != null && collisionA.timestamp === this.timestamp) {
                return collisionA.endTimestamp != null;
            }
            var overlapA = this.overlapAxes(verticesA, verticesB, normalsA);
            if (overlapA.overlap <= 0) {
                if (collisionA != null) {
                    collisionA.endTimestamp = this.timestamp;
                    collisionA.timestamp = this.timestamp;
                }
                if (collisionB != null) {
                    collisionB.endTimestamp = this.timestamp;
                    collisionB.timestamp = this.timestamp;
                }
                return false;
            }
            var overlapB = this.overlapAxes(verticesA, verticesB, normalsB);
            if (overlapB.overlap <= 0) {
                collisionB = rigidBodyB.activeCollisions[entityA.id];
                if (collisionA != null) {
                    collisionA.endTimestamp = this.timestamp;
                    collisionA.timestamp = this.timestamp;
                }
                if (collisionB != null) {
                    collisionB.endTimestamp = this.timestamp;
                    collisionB.timestamp = this.timestamp;
                }
                return false;
            }
            if (collisionA == null) {
                collisionA = {};
            }
            if (collisionB == null) {
                collisionB = {};
            }
            collisionA.startTimestamp = this.timestamp;
            collisionA.timestamp = this.timestamp;
            collisionA.endTimestamp = null;
            collisionA.entity = entityB;
            collisionB.startTimestamp = this.timestamp;
            collisionB.timestamp = this.timestamp;
            collisionB.endTimestamp = null;
            collisionB.entity = entityA;
            if (overlapA.overlap < overlapB.overlap) {
                minOverlap = overlapA.overlap;
                normal = overlapA.axis;
                if (Vector.dot(normal, Vector.subtract(originA, originB)) > 0) {
                    normal = Vector.negate(normal);
                }
                penetration = {
                    x: minOverlap * normal.x,
                    y: minOverlap * normal.y
                };
                collisionA.penetration = Vector.negate(penetration);
                collisionA.normal = normal;
                collisionB.penetration = penetration;
                collisionB.normal = normal;
            }
            else {
                minOverlap = overlapB.overlap;
                normal = overlapB.axis;
                if (Vector.dot(normal, Vector.subtract(originB, originA)) > 0) {
                    normal = Vector.negate(normal);
                }
                penetration = {
                    x: minOverlap * normal.x,
                    y: minOverlap * normal.y
                };
                collisionA.penetration = penetration;
                collisionA.normal = normal;
                collisionB.penetration = Vector.negate(penetration);
                collisionB.normal = normal;
            }
            rigidBodyA.activeCollisions.set(entityB.id, collisionA);
            rigidBodyB.activeCollisions.set(entityA.id, collisionB);
            return true;
        }
        cleanCollisions(entity) {
            var rigidBody = entity.getComponent("rigid-body");
            var collidable = entity.getComponent("collidable");
            var activeCollisions = rigidBody.activeCollisions;
            var timestamp = this.timestamp;
            Array.from(activeCollisions.entries()).forEach((entry) => {
                var collision = entry[1];
                var key = entry[0];
                if (collision == null || key == null) {
                    return;
                }
                if (collision.endTimestamp != null && timestamp - collision.endTimestamp > 3000) {
                    activeCollisions.delete(key);
                }
                // Checking the status of the broadphase collision.
                if (collision.endTimestamp == null && collidable.activeCollisions.has(key) && collidable.activeCollisions.get(key).endTimestamp != null) {
                    collision.endTimestamp = collidable.activeCollisions.get(key).endTimestamp;
                }
            });
        }
        isStaticAndInitialized(entityA, entityB) {
            var rigidBodyA = entityA.getComponent("rigid-body");
            var rigidBodyB = entityB.getComponent("rigid-body");
            var collidableA = entityA.getComponent("collidable");
            var collidableB = entityB.getComponent("collidable");
            if (!collidableA.isStatic || !collidableB.isStatic) {
                return false;
            }
            if (!rigidBodyA.isInitialized || !rigidBodyB.isInitialized) {
                return false;
            }
            return true;
        }
        handleCollisions(entity) {
            var collidable = entity.getComponent("collidable");
            if (collidable != null) {
                var activeCollisions = collidable.activeCollisions;
                activeCollisions.forEach((collision) => {
                    var otherEntity = this.game.getEntityById(collision.entityId);
                    if (otherEntity == null || !otherEntity.hasComponents(["rigid-body"]) || this.isStaticAndInitialized(entity, otherEntity)) {
                        return;
                    }
                    this.intersects(entity, otherEntity);
                });
                this.cleanCollisions(entity);
            }
        }
        activated(game) {
            this.game = game;
            this.game.getEntities().forEach((entity) => {
                this.entityAdded(entity);
            });
        }
        update() {
            var entity;
            var entities = this.entities;
            this.timestamp = this.game.getTime();
            entities.forEach((entity) => {
                this.handleCollisions(entity);
            });
        }
        deactivated() {
        }
        entityAdded(entity) {
            if (entity.hasComponents(DEPENDENCIES)) {
                this.prepareRigidBody(entity.getComponent("rigid-body"));
                this.entities.push(entity);
            }
        }
        ;
        entityRemoved(entity) {
            if (entity.hasComponents(DEPENDENCIES)) {
                var index = this.entities.indexOf(entity);
                if (index > -1) {
                    this.entities.splice(index, 1);
                }
            }
        }
        componentRemoved(entity, component) {
            if (DEPENDENCIES.indexOf(component.type) > -1) {
                this.entityRemoved(entity);
            }
        }
        componentAdded(entity, component) {
            this.entityAdded(entity);
        }
    }
    return NarrowPhaseCollisionSystem;
});
//# sourceMappingURL=NarrowPhaseCollisionSystem.js.map