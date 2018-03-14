export default class CollisionDetection {
    constructor(){
        this.entityA = null;
        this.entityB = null;
    }

    areBothEntitiesPolygonColliders(){
        return this.entityA.hasComponent("polygon-collider") &&
         this.entityB.hasComponent("polygon-collider");
    }

    manageIntersection(entityA, entityB){
        this.entityA = entityA;
        this.entityB = entityB;

        if (!this.areBothEntitiesPolygonColliders()){
            return;
        }
       
        let normal;
        let narrowPhaseCollidableA = entityA.getComponent("narrow-phase-collidable");
        let narrowPhaseCollidableB = entityB.getComponent("narrow-phase-collidable");
        let positionA = _entityA.getComponent("transform").position;
        let positionB = _entityB.getComponent("transform").position;
        let collidableA = _entityA.getComponent("collidable");
        let collidableB = _entityB.getComponent("collidable");
        let aPolygons = narrowPhaseCollidableA.polygons;
        let bPolygons = narrowPhaseCollidableB.polygons;

        for (let aPolygonIndex = 0; aPolygonIndex < aPolygons.length; aPolygonIndex++) {
            let polygonA = aPolygons[aPolygonIndex];

            for (let bPolygonIndex = 0; bPolygonIndex < bPolygons.length; bPolygonIndex++) {
                let polygonB = bPolygons[bPolygonIndex];

                let normalsA = polygonA.normals;
                let normalsB = polygonB.normals;
                let projectionA = this.projectionA;
                let projectionB = this.projectionB;
                let verticesA = polygonA.worldPoints;
                let verticesB = polygonB.worldPoints;
                let collisionA = narrowPhaseCollidableA.collisions[entityB.id];
                let collisionB = narrowPhaseCollidableB.collisions[entityA.id];
                let penetration;
                let minOverlap;
                let normal;

                let centerA = polygonA.center;
                let centerB = polygonB.center;

                narrowPhaseCollidableA.isInitialized = true;
                narrowPhaseCollidableB.isInitialized = true;

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

                    if (Vector.dot(normal, Vector.subtract(centerA, centerB)) > 0) {
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

                    if (Vector.dot(normal, Vector.subtract(centerB, centerA)) > 0) {
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

                narrowPhaseCollidableA.collisions[entityB.id] = collisionA;
                narrowPhaseCollidableB.collisions[entityA.id] = collisionB;

            }

        }

    }

    prepareState(){
        this.transformA = this.entityA.getComponent("transform");
        this.transformB = this.entityB.getComponent("transform");
        this.rectangleCollidableA = this.entityA.getComponent("rectangle-collidable");
        this.rectangleCollidableV = this.entityB.getComponent("rectangle-collidable");
        this.polygonCollidableA = this.entityA.getComponent("polygon-collidable");
        this.polygonCollidableB = this.entityB.getComponent("polygon-collidable");
        this.polygonsA = this.polygonCollidableA.polygons;
        this.polygonsB = this.polygonCollidableB.polygons;
    }
}