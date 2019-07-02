import CollisionDetector from "./CollisionDetector.js";

export default class PolygonColliderSystem {
    constructor() {
        this.collisionDetector = null;
        this.boundingRectangleData = null;
        this.world = null;
        this.name = "polygon-collider";
        this.currentTime = 0;
        this.dirtyPolygons = [];
    }

    cleanCollisions() {
        const dirtyPolygons = this.dirtyPolygons;

        for (let x = 0; x < dirtyPolygons.length; x++) {
            this.removeCollisionsFromDirtyEntity(dirtyPolygons[x]);
        }
    }

    findDirtyPolygons() {
        const dirtyEntities = this.boundingRectangleData.dirtyEntities;
        const dirtyPolygons = this.dirtyPolygons = [];

        for (let x = 0; x < dirtyEntities.length; x++) {
            const entity = dirtyEntities[x];

            if (this.isPolygon(entity)) {
                dirtyPolygons.push(entity);
            }
        }
    }

    isPolygon(entity) {
        return entity.hasComponent("polygon-collider");
    }

    isReady() {
        return this.boundingRectangleData != null;
    }

    removeCollisionsFromDirtyEntity(entity) {
        let polygons;
        const collider = entity.getComponent("polygon-collider");

        // If we need to optimize this further, this would be a good place to start.
        // Create a collision pool like in rectangleColliderSystem.
        collider.collisions = {};
    }

    updatePolygonEntity(entity) {
        const rectangleCollider = entity.getComponent("rectangle-collider");

        if (rectangleCollider) {
            const collisions = rectangleCollider.collisions;

            for (let id in collisions) {
                const otherEntity = this.world.getEntityById(id);

                if (otherEntity == null) {
                    continue;
                }

                this.collisionDetector.updateCollisions(entity, otherEntity, this.currentTime);
            }
        }
    }

    updateCollisions() {
        const dirtyPolygons = this.dirtyPolygons;

        for (let x = 0; x < dirtyPolygons.length; x++) {
            this.updatePolygonEntity(dirtyPolygons[x]);
        }

    }

    // Life Cycle Methods
    activated(world) {
        this.world = world;
        this.collisionDetector = new CollisionDetector(world);
        const entities = world.getEntities();

        for (let entity in entities){
            this.entityAdded(entity);
        }
    }

    deactivated() {
        this.world = null;
        this.boundingRectangleData = null;
        this.collisionDetector = null;
    }

    entityAdded(entity){
        if (entity.type === "bounding-rectangle-service") {
            this.boundingRectangleData = entity.getComponent("bounding-rectangle-data");
        }
    }

    entityRemoved(entity){
        if (entity.type === "bounding-rectangle-service") {
            this.boundingRectangleData = null;
        }
    }

    update(currentTime) {
        if (this.isReady()) {
            this.currentTime = currentTime;
            this.findDirtyPolygons();
            this.cleanCollisions();
            this.updateCollisions();
        }
    }

}
