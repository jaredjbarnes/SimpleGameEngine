import SystemBundlerSystem from "./SystemsBundlerSystem.js";
import PolygonSystem from "./polygon/PolygonSystem.js";
import PolygonColliderSystem from "./polygonCollider/PolygonColliderSystem.js";

export default class NarrowPhaseCollisionSystem extends SystemBundlerSystem {
    constructor(){
        super();
        this.name = "narrowphase-collision";
        this.systems.push(new PolygonSystem());
        this.systems.push(new PolygonColliderSystem());
    }
}