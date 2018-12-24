import World from "../../../../src/World";
import Camera from "../../../../src/entities/Camera";
import BroadPhaseCollisionSystem from "../../../../src/systems/BroadPhaseCollisionSystem";
import NarrowPhaseCollisionSystem from "../../../../src/systems/NarrowPhaseCollisionSystem";
import DefaultCameraSystem from "../../../../src/systems/DefaultCameraSystem";
import MovableSystem from "../../../../src/systems/MovementSystem";
import SolidBodySystem from "../../../../src/systems/SolidBodySystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import FollowEntityCameraSystem from "../../../../src/systems/FollowEntityCameraSystem";
import ControllerInputService from "../../../../src/services/ControllerInputService";
import MobileStageCreator from "./MobileStageCreator";
import PlayerControllerSystem from "./systems/PlayerControllerSystem";

const getRandomNumber = (min, max) => {
    const range = max - min;
    const value = Math.random() * range;

    return parseInt(value + min, 10);
}

const getRandomRgba = () => {
    return {
        red: getRandomNumber(0, 255),
        green: getRandomNumber(0, 255),
        blue: getRandomNumber(0, 255),
        alpha: 1
    };
}

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
    cellSize: 300
});

const playerControllerSystem = new PlayerControllerSystem();

camera.getComponent("rectangle").height = mobileStageCreator.canvas.height;
camera.getComponent("rectangle").width = mobileStageCreator.canvas.width;

// Set up world
world.addSystem(solidBodySystem);
world.addSystem(playerControllerSystem);
world.addSystem(movableSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(defaultCameraSystem);

// Add Services
world.addService(controllerInputService);

// Add Entities
world.addEntity(camera);
world.addEntity(player);

for (let x = 0; x < 10000; x++) {
    const entity = new StaticText(x, {
        x: getRandomNumber(-10000, 10000),
        y: getRandomNumber(-10000, 10000)
    }, getRandomRgba());

    world.addEntity(entity);
}

world.play();

window.world = world;
