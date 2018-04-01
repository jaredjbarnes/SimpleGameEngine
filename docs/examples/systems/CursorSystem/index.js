import World from "./../../../../src/World";
import Camera from "./../../../../src/entities/Camera";
import BroadPhaseCollisionSystem from "./../../../../src/systems/BroadPhaseCollisionSystem";
import NarrowPhaseCollisionSystem from "./../../../../src/systems/NarrowPhaseCollisionSystem";
import DynamicLoadingSystem from "./../../../../src/systems/DynamicLoadingSystem";
import DefaultCameraSystem from "./../../../../src/systems/DefaultCameraSystem";
import ControllerSystem from "./../../../../src/systems/ControllerSystem";
import KeyboardSystem from "./../../../../src/systems/KeyboardSystem";
import MovableSystem from "./../../../../src/systems/MovementSystem";
import SolidBodySystem from "./../../../../src/systems/SolidBodySystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import KeyboardController from "./../../../../src/components/KeyboardController";
import FollowEntityCameraSystem from "./../../../../src/systems/FollowEntityCameraSystem";
import CursorSystem from "../../../../src/systems/CursorSystem";

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
const canvas = document.getElementById("viewport");
const world = new World();

// Entities
const camera = new Camera(cameraName);
const player = new Text("P");

// Systems
const controllerSystem = new ControllerSystem();
const keyboardInputSystem = new KeyboardSystem();
const movableSystem = new MovableSystem();
const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
const narrowPhaseCollisionSystem = new NarrowPhaseCollisionSystem();
const solidBodySystem = new SolidBodySystem();

const followEntityCameraSystem = new FollowEntityCameraSystem({
    cameraEntityId: camera.id,
    followEntityId: player.id
});

const dynamicLoadingSystem = new DynamicLoadingSystem({
    cameraName: cameraName,
    cellSize: 300
});

const defaultCameraSystem = new DefaultCameraSystem({
    canvas,
    cameraName
});

const cursorSystem = new CursorSystem({
    canvas,
    cameraName,
    showCursor: true,
    document
});


// Set up world
world.addSystem(dynamicLoadingSystem);
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(solidBodySystem);
world.addSystem(movableSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(cursorSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(defaultCameraSystem);

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
