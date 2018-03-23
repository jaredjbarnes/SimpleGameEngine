import BoundingRectangleSystem from "./BoundingRectangleSystem";
import SpatialPartitionSystem from "./SpatialPartitionSystem";
import RectangleColliderSystem from "./RectangleColliderSystem";
import SystemsBundlerSystem from "./SystemsBundlerSystem";

export default class BroadPhaseCollisionSystem extends SystemsBundlerSystem {
    constructor() {
        super();

        this.systems.push(new BoundingRectangleSystem());
        this.systems.push(new SpatialPartitionSystem());
        this.systems.push(new RectangleColliderSystem());
    }

}