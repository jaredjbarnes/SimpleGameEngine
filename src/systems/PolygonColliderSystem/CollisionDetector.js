import Vector from "../../Vector";

export default class CollisionHandler {
    constructor() {
        this.entityA = null;
        this.entityB = null;
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
            normalNumber: null
        };
        this.collisionDataB = {
            overlap: Number.MAX_VALUE,
            normal: null,
            normalNumber: null
        };
        this.verticesA = [];
        this.verticesB = [];
        this.normalsA = [];
        this.normalsB = [];
        this.polygonA = null;
        this.polygonB = null;
        this.collisionA = null;
        this.collisionB = null;
        this.originA = null;
        this.originB = null;
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
        }

        if (polygonBodyB == null) {
            this.polygonsB = [polygonB];
        }

        this.transformA = this.entityA.getComponent("transform");
        this.transformB = this.entityB.getComponent("transform");
        this.colliderA = this.entityA.getComponent("polygon-collider");
        this.colliderB = this.entityB.getComponent("polygon-collider");
    }

    preparePolygonA(polygon) {
        this.verticesA = polygon.vertices;
        this.normalsA = polygon.normals;
        this.polygonA = polygon;

        this.collisionDataA.overlap = Number.MAX_VALUE;
        this.collisionDataA.normal = null;
        this.collisionDataA.normalIndex = null;

        Vector.add(this.transformA.position, this.transformA.origin, this.originA);
    }

    preparePolygonB(polygon) {
        this.verticesB = polygon.vertices;
        this.normalsB = polygon.normals;
        this.polygonB = polygon;

        this.collisionDataB.overlap = Number.MAX_VALUE;
        this.collisionDataB.normal = null;
        this.collisionDataB.normalIndex = null;

        Vector.add(this.transformB.position, this.transformB.origin, this.originB);
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

    updateCollisions(entityA, entityB) {
        this.entityA = entityA;
        this.entityB = entityB;

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

            if (overlap <= 0) {
                this.collisionDataA.overlap = overlap;
            }

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

            if (overlap <= 0) {
                this.collisionDataB.overlap = overlap;
            }

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
                this.projectVerticesOnEntityBNormals();

                if (this.collisionDataA.overlap <= 0) {
                    continue;
                }

                this.projectVerticesOnEntityANormals();

                if (this.collisionDataB.overlap <= 0) {
                    continue;
                }

            }
        }
    }
}