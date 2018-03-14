import World from "./../../../../src/World";
import Camera from "./../../../../src/entities/Camera";
import BroadPhaseCollisionSystem from "./../../../../src/systems/BroadPhaseCollisionSystem";
import DynamicLoadingSystem from "./../../../../src/systems/DynamicLoadingSystem";
import DefaultCameraSystem from "./../../../../src/systems/DefaultCameraSystem";
import ControllerSystem from "./../../../../src/systems/ControllerSystem";
import KeyboardInputSystem from "./../../../../src/systems/KeyboardInputSystem";
import MovableSystem from "./../../../../src/systems/MovementSystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import KeyboardController from "./../../../../src/components/KeyboardController";
import FollowEntityCameraSystem from "./../../../../src/systems/FollowEntityCameraSystem";
import NarrowPhaseCollisionSystem from "./../../../../src/systems/NarrowPhaseCollisionSystem";
import SolidBodySystem from "./../../../../src/systems/SolidBodySystem";
// import CursorEventSystem from "./../../../../src/systems/CursorEventSystem";
// import CursorSystem from "./../../../../src/systems/CursorSystem";
import SolidBody from "./../../../../src/components/SolidBody";

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
const keyboardInputSystem = new KeyboardInputSystem();
const movableSystem = new MovableSystem();
const followEntityCameraSystem = new FollowEntityCameraSystem();
const solidBodySystem = new SolidBodySystem();
const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
const narrowPhaseCollisionSystem = new NarrowPhaseCollisionSystem();
//const cursorSystem = new CursorSystem({canvas, cameraName, document});
//const cursorEventSystem = new CursorEventSystem();

followEntityCameraSystem.camera = camera;
followEntityCameraSystem.setEntityToFollow(player);

const dynamicLoadingSystem = new DynamicLoadingSystem({
    cameraName: cameraName,
    cellSize: 300
});

const defaultCameraSystem = new DefaultCameraSystem({
    canvas,
    cameraName
});

// Set up world
//world.addSystem(cursorSystem);
//world.addSystem(cursorEventSystem);
world.addSystem(dynamicLoadingSystem);
world.addSystem(solidBodySystem);
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(movableSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(defaultCameraSystem);

// Add Entities
world.addEntity(camera);
world.addEntity(player);

for (let x = 0; x < 3000; x++) {
    const entity = new StaticText(x, {
        x: getRandomNumber(-3000, 3000),
        y: getRandomNumber(-3000, 3000)
    }, getRandomRgba());

    world.addEntity(entity);
}

world.play();

window.world = world;
