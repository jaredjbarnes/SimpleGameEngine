import Vector from "./../Vector";

const DEPENDENCIES = ["collidable", "narrow-phase-collidable", "position", "size"];

export default class NarrowPhaseCollisionSystem {
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

    prepareNarrowPhaseCollidable(narrowPhaseCollision) {

        narrowPhaseCollision.parts.forEach((part) => {
            let points = part.points;

            if (points.length === part.vertices.length &&
                points.length === part.normals.length &&
                points.length === part.projectionVertices.length) {
                return;
            }

            this.setSize(part);

            part.vertices = points.map(function (point, index) {
                let nextPoint = points[index + 1] || points[0];
                return {
                    x: point.x - nextPoint.x,
                    y: point.y - nextPoint.y
                };
            });

            part.worldPoints = points.map(function (point) {
                return {
                    x: point.x,
                    y: point.y
                };
            });

            part.normals = part.vertices.map(function (vertex, index) {
                return Vector.normalize(Vector.getLeftNormal(vertex));
            });

            let finalVector = part.vertices.reduce(function (accumulator, vertex) {
                accumulator.x += vertex.x;
                accumulator.y += vertex.y;

                return accumulator;
            }, { x: 0, y: 0 });

            // If the final vector isn't (0,0) then make it so, to finish the polygon.
            if (finalVector.x !== 0 || finalVector.y !== 0) {
                part.points.push(part.points[0]);

                part.vertices.push({
                    x: -finalVector.x,
                    y: -finalVector.y
                });

                part.normals.push(Vector.getLeftNormal(part.vertices[part.vertices.length - 1]));
            }
        });

    }

    setSize(part) {
        let points = part.points;

        let width;
        let height;
        let length = points.length;
        let top = points[0].y;
        let left = points[0].x;
        let bottom = points[0].y;
        let right = points[0].x;

        for (let x = 1; x < length; x++) {
            top = Math.min(top, points[x].y);
            left = Math.min(left, points[x].x);
            bottom = Math.max(bottom, points[x].y);
            right = Math.max(right, points[x].x);
        }

        width = right - left;
        height = bottom - top;

        part.size.width = width;
        part.size.height = height;

        part.origin.x = (width / 2) + left;
        part.origin.y = (height / 2) + top;
    }

    projectToAxis(vertices, axis, projection) {
        let min = Vector.dot(vertices[0], axis);
        let max = min;
        let dot;

        for (let i = 1; i < vertices.length; i += 1) {
            dot = Vector.dot(vertices[i], axis);

            if (dot > max) {
                max = dot;
            } else if (dot < min) {
                min = dot;
            }
        }

        projection.min = min;
        projection.max = max;
    }

    overlapAxes(verticesA, verticesB, axes) {
        let projectionA = this.projectionA;
        let projectionB = this.projectionB;
        let result = {
            overlap: Number.MAX_VALUE,
            axis: null,
            axisNumber: null
        };

        let overlap;
        let axis;

        projectionA.min = 0;
        projectionA.max = 0;
        projectionB.min = 0;
        projectionB.max = 0;

        for (let i = 0; i < axes.length; i++) {
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
        let narrowPhaseCollision = entity.getComponent("narrow-phase-collidable");
        let position = entity.getComponent("position");

        narrowPhaseCollision.parts.forEach((part) => {
            let worldPoints = part.worldPoints;

            part.points.forEach(function (point, index) {
                let worldPoint = worldPoints[index];
                worldPoint.x = point.x + position.x;
                worldPoint.y = point.y + position.y;
            });
        });

    }

    intersects(entityA, entityB) {
        let _entityA = entityA;
        let _entityB = entityB;

        let x;
        let vx;
        let normal;

        let narrowPhaseCollisionA = _entityA.getComponent("narrow-phase-collidable");
        let narrowPhaseCollisionB = _entityB.getComponent("narrow-phase-collidable");
        let positionA = _entityA.getComponent("position");
        let positionB = _entityB.getComponent("position");
        let collidableA = _entityA.getComponent("collidable");
        let collidableB = _entityB.getComponent("collidable");
        let aParts = narrowPhaseCollisionA.parts;
        let bParts = narrowPhaseCollisionB.parts;

        this.updateWorldPoints(entityA);
        this.updateWorldPoints(entityB);


        for (let aPartIndex = 0; aPartIndex < aParts.length; aPartIndex++) {
            let partA = aParts[aPartIndex];

            for (let bPartIndex = 0; bPartIndex < bParts.length; bPartIndex++) {
                let partB = bParts[bPartIndex];

                let normalsA = partA.normals;
                let normalsB = partB.normals;
                let projectionA = this.projectionA;
                let projectionB = this.projectionB;
                let verticesA = partA.worldPoints;
                let verticesB = partB.worldPoints;
                let collisionA = narrowPhaseCollisionA.collisions[entityB.id];
                let collisionB = narrowPhaseCollisionB.collisions[entityA.id];
                let penetration;
                let minOverlap;
                let normal;

                let originA = Vector.add(positionA, partA.origin);
                let originB = Vector.add(positionB, partB.origin);

                narrowPhaseCollisionA.isInitialized = true;
                narrowPhaseCollisionB.isInitialized = true;

                // If the collision was already handled from the other side then stop detection.
                if (collisionA != null && collisionA.timestamp === this.timestamp) {
                    continue;
                }

                let overlapA = this.overlapAxes(verticesA, verticesB, normalsA);

                if (overlapA.overlap <= 0) {

                    if (collisionA != null) {
                        collisionA.endTimestamp = this.timestamp;
                        collisionA.timestamp = this.timestamp;
                    }

                    if (collisionB != null) {
                        collisionB.endTimestamp = this.timestamp;
                        collisionB.timestamp = this.timestamp;
                    }

                    continue;
                }

                let overlapB = this.overlapAxes(verticesA, verticesB, normalsB);

                if (overlapB.overlap <= 0) {

                    if (collisionA != null) {
                        collisionA.endTimestamp = this.timestamp;
                        collisionA.timestamp = this.timestamp;
                    }

                    if (collisionB != null) {
                        collisionB.endTimestamp = this.timestamp;
                        collisionB.timestamp = this.timestamp;
                    }

                    continue;
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
                collisionA.otherEntity = entityB;
                collisionA.entity = entityA;

                collisionB.startTimestamp = this.timestamp;
                collisionB.timestamp = this.timestamp;
                collisionB.endTimestamp = null;
                collisionB.otherEntity = entityA;
                collisionB.entity = entityB;

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

                } else {

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

                narrowPhaseCollisionA.collisions[entityB.id] = collisionA;
                narrowPhaseCollisionB.collisions[entityA.id] = collisionB;

            }

        }

    }

    cleanCollisions(entity) {
        let _entity = entity;
        let narrowPhaseCollision = _entity.getComponent("narrow-phase-collidable");
        let collidable = _entity.getComponent("collidable");
        let activeCollisions = narrowPhaseCollision.collisions;
        let timestamp = this.timestamp;

        for (let key in activeCollisions) {
            let _key = key;
            let _collision = activeCollisions[_key];
            let collidableKey = _collision.otherEntity.id;

            if (_collision.endTimestamp != null && timestamp - _collision.endTimestamp > 3000) {
                delete activeCollisions[key];
            }

            const broadphaseCollision = this.getCollisionByEntityId(collidable.collisions, collidableKey);

            // Checking the status of the broadphase collision.
            if (_collision.endTimestamp == null && broadphaseCollision != null && broadphaseCollision.endTimestamp != null) {
                _collision.endTimestamp = broadphaseCollision.endTimestamp;
            }
        }

    }

    getCollisionByEntityId(collisions, id) {
        return collisions.find(({ entityId }) => entityId === id);
    }

    isStaticAndInitialized(entityA, entityB) {
        let narrowPhaseCollisionA = entityA.getComponent("narrow-phase-collidable");
        let narrowPhaseCollisionB = entityB.getComponent("narrow-phase-collidable");
        let positionA = entityA.getComponent("position");
        let positionB = entityB.getComponent("position");

        if (!positionA.isStatic || !positionB.isStatic) {
            return false;
        }

        if (!narrowPhaseCollisionA.isInitialized || !narrowPhaseCollisionB.isInitialized) {
            return false;
        }

        return true;
    }

    handleCollisions(entity) {
        let _entity = entity;
        let collidable = _entity.getComponent("collidable");
        let narrowPhaseCollision = _entity.getComponent("narrow-phase-collidable");

        if (!narrowPhaseCollision.isEnabled) {
            return;
        }

        if (collidable != null) {
            collidable.collisions.forEach((collision)=>{
                let otherEntity = this.world.getEntityById(collision.entityId);
                let otherNarrowPhaseCollidable = otherEntity.getComponent("narrow-phase-collidable");

                if (otherEntity == null || otherNarrowPhaseCollidable == null || this.isStaticAndInitialized(_entity, otherEntity) || !otherNarrowPhaseCollidable.isEnabled) {
                    return;
                }

                this.intersects(_entity, otherEntity);
            });

            this.cleanCollisions(_entity);
        }

    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    update() {
        let entity;
        let entities = this.entities;
        this.timestamp = this.world.getTime();

        entities.forEach((entity) => {
            let _entity = entity;
            this.handleCollisions(_entity);
        });
    }

    deactivated() {

    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.prepareNarrowPhaseCollidable(entity.getComponent("narrow-phase-collidable"));
            if (!entity.getComponent("position").isStatic) {
                this.entities.push(entity);
            }
        }
    };

    entityRemoved(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            let index = this.entities.indexOf(entity);

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