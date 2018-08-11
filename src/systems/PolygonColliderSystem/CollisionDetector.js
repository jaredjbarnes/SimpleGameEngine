import Vector from "../../Vector";

export default class CollisionDetector {
    constructor() {
        this.entityA = null;
        this.entityB = null;
        this.currentTime = 0;
        this.colliderA = [];
        this.colliderB = [];
        this.transformA = null;
        this.transformB = null;
        this.polygonsA = [];
        this.polygonsB = [];

        // Loop specific variables.
        this.collisionDataA = {
            overlap: Number.MAX_VALUE,
            normal: null,
            normalIndex: null
        };
        this.collisionDataB = {
            overlap: Number.MAX_VALUE,
            normal: null,
            normalIndex: null
        };
        this.verticesA = [];
        this.verticesB = [];
        this.normalsA = [];
        this.normalsB = [];
        this.polygonA = null;
        this.polygonB = null;
        this.positionA = {
            x: 0,
            y: 0
        };
        this.positionB = {
            x: 0,
            y: 0
        };
        this.projectionA = {
            min: 0,
            max: 0
        };
        this.projectionB = {
            min: 0,
            max: 0
        };
    }

    prepareProperties() {
        const polygonBodyA = this.entityA.getComponent("polygon-body");
        const polygonA = this.entityA.getComponent("polygon");
        const polygonBodyB = this.entityB.getComponent("polygon-body");
        const polygonB = this.entityB.getComponent("polygon");

        if (polygonBodyA == null) {
            this.polygonsA = [polygonA];
        } else {
            this.polygonsA = polygonBodyA.polygons;
        }

        if (polygonBodyB == null) {
            this.polygonsB = [polygonB];
        } else {
            this.polygonsB = polygonBodyB.polygons;
        }

        this.transformA = this.entityA.getComponent("transform");
        this.transformB = this.entityB.getComponent("transform");
        this.colliderA = this.entityA.getComponent("polygon-collider");
        this.colliderB = this.entityB.getComponent("polygon-collider");
    }

    preparePolygonA(polygon) {
        this.verticesA = polygon.worldPoints;
        this.normalsA = polygon.normals;
        this.polygonA = polygon;

        this.collisionDataA.overlap = Number.MAX_VALUE;
        this.collisionDataA.normal = null;
        this.collisionDataA.normalIndex = null;

        this.positionA = this.transformA.position;
    }

    preparePolygonB(polygon) {
        this.verticesB = polygon.worldPoints;
        this.normalsB = polygon.normals;
        this.polygonB = polygon;

        this.collisionDataB.overlap = Number.MAX_VALUE;
        this.collisionDataB.normal = null;
        this.collisionDataB.normalIndex = null;

        this.positionB = this.transformB.position;
    }

    projectToAxis(vertices, normal, projection) {
        let min = Vector.dot(vertices[0], normal);
        let max = min;
        let dot;

        for (let i = 1; i < vertices.length; i += 1) {
            dot = Vector.dot(vertices[i], normal);

            if (dot > max) {
                max = dot;
            } else if (dot < min) {
                min = dot;
            }
        }

        projection.min = min;
        projection.max = max;
    }

    updateCollisions(entityA, entityB, currentTime) {
        if (!entityA.hasComponent("polygon-collider") ||
            !entityB.hasComponent("polygon-collider")) {
            return;
        }

        this.entityA = entityA;
        this.entityB = entityB;
        this.currentTime = currentTime;

        this.prepareProperties();
        this.checkForCollisions();
    }

    projectVerticesOnEntityBNormals() {
        for (let i = 0; i < this.normalsB.length; i++) {
            const normal = this.normalsB[i];

            this.projectToAxis(this.verticesA, normal, this.projectionA);
            this.projectToAxis(this.verticesB, normal, this.projectionB);

            const overlap = Math.min(
                this.projectionA.max - this.projectionB.min,
                this.projectionB.max - this.projectionA.min
            );

            if (overlap < this.collisionDataA.overlap) {
                this.collisionDataA.overlap = overlap;
                this.collisionDataA.normal = normal;
                this.collisionDataA.normalIndex = i;
            }
        }
    }

    projectVerticesOnEntityANormals() {
        for (let i = 0; i < this.normalsA.length; i++) {
            const normal = this.normalsA[i];

            this.projectToAxis(this.verticesA, normal, this.projectionA);
            this.projectToAxis(this.verticesB, normal, this.projectionB);

            const overlap = Math.min(
                this.projectionA.max - this.projectionB.min,
                this.projectionB.max - this.projectionA.min
            );

            if (overlap < this.collisionDataB.overlap) {
                this.collisionDataB.overlap = overlap;
                this.collisionDataB.normal = normal;
                this.collisionDataB.normalIndex = i;
            }
        }
    }

    checkForCollisions() {
        for (let a = 0; a < this.polygonsA.length; a++) {
            this.preparePolygonA(this.polygonsA[a]);

            for (let b = 0; b < this.polygonsB.length; b++) {
                this.preparePolygonB(this.polygonsB[b]);

                // If the collision has already been calculated.
                if (this.colliderA.collisions[this.entityB.id] != null) {
                    continue;
                }

                this.projectVerticesOnEntityBNormals();

                if (this.collisionDataA.overlap <= 0) {
                    continue;
                }

                this.projectVerticesOnEntityANormals();

                if (this.collisionDataB.overlap <= 0) {
                    continue;
                }

                const collisionA = {};
                collisionA.otherEntity = this.entityB;
                collisionA.entity = this.entityA;

                const collisionB = {};
                collisionB.otherEntity = this.entityA;
                collisionB.entity = this.entityB;

                if (this.collisionDataA.overlap < this.collisionDataB.overlap) {

                    const minOverlap = this.collisionDataA.overlap;
                    const direction = Vector.subtract(this.positionA, this.positionB);

                    let normal = this.collisionDataA.normal;

                    if (Vector.dot(normal, direction) < 0) {
                        normal = Vector.negate(normal);
                    }

                    const penetration = {
                        x: minOverlap * normal.x,
                        y: minOverlap * normal.y
                    };

                    collisionA.penetration = Vector.negate(penetration);
                    collisionA.normal = Vector.negate(normal);

                    collisionB.penetration = penetration;
                    collisionB.normal = normal;

                } else {

                    const minOverlap = this.collisionDataB.overlap;
                    const direction = Vector.subtract(this.positionB, this.positionA);

                    let normal = this.collisionDataB.normal;

                    if (Vector.dot(normal, direction) < 0) {
                        normal = Vector.negate(normal);
                    }

                    const penetration = {
                        x: minOverlap * normal.x,
                        y: minOverlap * normal.y
                    };

                    collisionA.penetration = penetration;
                    collisionA.normal = normal;

                    collisionB.penetration = Vector.negate(penetration);
                    collisionB.normal = Vector.negate(normal);

                }

                this.colliderA.collisions[this.entityB.id] = collisionA;
                this.colliderB.collisions[this.entityA.id] = collisionB;

            }
        }
    }
}