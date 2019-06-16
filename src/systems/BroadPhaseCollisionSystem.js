import BoundingRectangleSystem from "./boundingRectangle/BoundingRectangleSystem.js";
import SpatialPartitionSystem from "./spatialPartition/SpatialPartitionSystem.js";
import RectangleColliderSystem from "./rectangleCollider/RectangleColliderSystem.js";
import SystemsBundlerSystem from "./SystemsBundlerSystem.js";

export default class BroadPhaseCollisionSystem extends SystemsBundlerSystem {
    constructor() {
        super();
        this.name = "broadphase-collision";

        this.systems.push(new BoundingRectangleSystem());
        this.systems.push(new SpatialPartitionSystem());
        this.systems.push(new RectangleColliderSystem());
    }

}