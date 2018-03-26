import SystemBundlerSystem from "./SystemsBundlerSystem";
import PolygonSystem from "./PolygonSystem";
import PolygonColliderSystem from "./PolygonColliderSystem";

export default class NarrowPhaseCollisionSystem extends SystemBundlerSystem {
    constructor(){
        super();

        this.systems.push(new PolygonSystem());
        this.systems.push(new PolygonColliderSystem());
    }
}