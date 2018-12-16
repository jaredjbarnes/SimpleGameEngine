import World from "../../../../src/World";
import Camera from "../../../../src/entities/Camera";
import BroadPhaseCollisionSystem from "../../../../src/systems/BroadPhaseCollisionSystem";
import NarrowPhaseCollisionSystem from "../../../../src/systems/NarrowPhaseCollisionSystem";
import DefaultCameraSystem from "../../../../src/systems/DefaultCameraSystem";
import MovableSystem from "../../../../src/systems/MovementSystem";
import SolidBodySystem from "../../../../src/systems/SolidBodySystem";
import Text from "./entities/Text";
import Link from "./entities/Link";
import FollowEntityCameraSystem from "../../../../src/systems/FollowEntityCameraSystem";
import ControllerInputService from "../../../../src/services/ControllerInputService";
import MobileStageCreator from "./MobileStageCreator";
import PlayerControllerSystem from "./systems/PlayerControllerSystem";
import WorldGenerationSystem from "./systems/WorldGenerationSystem";
import ImageSystem from "../../../../src/systems/ImageSystem";
import SpriteSystem from "../../../../src/systems/SpriteSystem";
import Noise from "../../../../src/utilities/Noise";

const cameraName = "main";
const camera = new Camera(cameraName);

const controllerInputService = new ControllerInputService();
const mobileStageCreator = new MobileStageCreator({
    window,
    document,
    camera,
    controllerInputService
});

const canvas = mobileStageCreator.canvas;
const world = new World();

// Entities
const player = new Text("P");
const link = new Link();

// Systems
const movableSystem = new MovableSystem();
const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
const narrowPhaseCollisionSystem = new NarrowPhaseCollisionSystem();
const solidBodySystem = new SolidBodySystem();

const followEntityCameraSystem = new FollowEntityCameraSystem({
    cameraEntityId: camera.id,
    followEntityId: player.id
});

const defaultCameraSystem = new DefaultCameraSystem({
    canvas,
    cameraName,
    cellSize: 512,
    sort: (entityA, entityB) => {
        const rectangleA = entityA.getComponent("rectangle");
        const rectangleB = entityB.getComponent("rectangle");

        if (rectangleA.bottom < rectangleB.bottom) {
            return -1;
        } else if (rectangleA.bottom > rectangleB.bottom) {
            return 1;
        } else {
            if (rectangleA.right < rectangleB.right) {
                return -1
            } else if (rectangleA.right > rectangleB.right) {
                return 1;
            } else {
                return 0;
            }
        }
    }
});

const imageSystem = new ImageSystem({ bitmapCache: defaultCameraSystem.bitmapCache });
const spriteSystem = new SpriteSystem({ bitmapCache: defaultCameraSystem.bitmapCache });
const playerControllerSystem = new PlayerControllerSystem();

const worldGenerationSystem = new WorldGenerationSystem({
    noise: new Noise(),
    scale: 25,
    cameraName: "main"
});

camera.getComponent("rectangle").height = mobileStageCreator.canvas.height;
camera.getComponent("rectangle").width = mobileStageCreator.canvas.width;

// Set up world
world.addSystem(spriteSystem);
world.addSystem(imageSystem);
world.addSystem(solidBodySystem);
world.addSystem(playerControllerSystem);
world.addSystem(movableSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(worldGenerationSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(defaultCameraSystem);

// Add Services
world.addService(controllerInputService);

// Add Entities
world.addEntity(camera);
world.addEntity(player);
world.addEntity(link);

world.play();

window.world = world;
