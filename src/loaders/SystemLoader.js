import DynamicLoader from "./DynamicLoader.js";

export default class SystemLoader extends DynamicLoader {
    constructor() {
        super({
            "bounding-rectangle": "../system/boundingRectangle/BoundingRectangleSystem.js",
            "camera": "../system/camera/CameraSystem.js",
            "entity-history-player": "../system/entityHistoryPlayer/EntityHistoryPlayerSystem.js",
            "entity-recorder": "../system/entityRecorder/EntityRecorderSystem.js",
            "polygon": "../system/polygon/PolygonSystem.js",
            "polygon-collider": "../system/polygonCollider/PolygonColliderSystem.js",
            "rectangle-collider": "../system/rectangleCollider/RectangleColliderSystem.js",
            "spatial-partition": "../system/spatialPartition/SpatialPartitionSystem.js",
            "state-manager": "../system/stateManager/StateManagerSystem.js",
            "broad-phase-collision": "../system/BroadPhaseCollisionSystem.js",
            "controller": "../system/ControllerSystem.js",
            "cursor": "../system/CursorSystem.js",
            "fixed-position": "../system/FixedPositionSystem.js",
            "follow-entity-with-camera": "../system/FollowEntityCameraSystem.js",
            "follower": "../system/FollowerSystem.js",
            "image": "../system/ImageSystem.js",
            "keyboard": "../system/KeyboardSystem.js",
            "logic": "../system/LogicSystem.js",
            "movement": "../system/MovementSystem.js",
            "narrow-phase-collision": "../system/NarrowPhaseCollisionSystem.js",
            "relative-position": "../system/RelativePositionSystem.js",
            "solid-body": "../system/SolidBodySystem.js",
            "sprite-set": "../system/SpriteSetSystem.js",
            "sprite": "../system/SpriteSystem.js"
        });
    }
}

