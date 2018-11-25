import World from "../../../../src/World";
import Camera from "../../../../src/entities/Camera";
import BroadPhaseCollisionSystem from "../../../../src/systems/BroadPhaseCollisionSystem";
import NarrowPhaseCollisionSystem from "../../../../src/systems/NarrowPhaseCollisionSystem";
import DefaultCameraSystem from "../../../../src/systems/DefaultCameraSystem";
import MovableSystem from "../../../../src/systems/MovementSystem";
import SolidBodySystem from "../../../../src/systems/SolidBodySystem";
import Text from "./entities/Text";
import FollowEntityCameraSystem from "../../../../src/systems/FollowEntityCameraSystem";
import ControllerInputService from "../../../../src/services/ControllerInputService";
import MobileStageCreator from "./MobileStageCreator";
import PlayerControllerSystem from "./systems/PlayerControllerSystem";
import WorldGenerationSystem from "./systems/WorldGenerationSystem";
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
    cellSize: 512
});

const playerControllerSystem = new PlayerControllerSystem();

const worldGenerationSystem = new WorldGenerationSystem({
    noise: new Noise(),
    cameraName: "main"
});

camera.getComponent("rectangle").height = mobileStageCreator.canvas.height;
camera.getComponent("rectangle").width = mobileStageCreator.canvas.width;

// Set up world
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

world.play();

window.world = world;
