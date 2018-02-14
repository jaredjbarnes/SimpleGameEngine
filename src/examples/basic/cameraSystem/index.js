import World from "./../../../World";
import Camera from "./../../../entities/Camera";
import BroadPhaseCollisionSystem from "./../../../systems/BroadPhaseCollisionSystem";
import CameraCanvasCellSystem from "./../../../systems/CameraCanvasCellSystem";
import DefaultCameraSystem from "./../../../systems/DefaultCameraSystem";
import ControllerSystem from "./../../../systems/ControllerSystem";
import KeyboardInputSystem from "./../../../systems/KeyboardInputSystem";
import MovableSystem from "./../../../systems/MovementSystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import KeyboardController from "../../../components/KeyboardController";
import FollowEntityCameraSystem from "./../../../systems/FollowEntityCameraSystem";
import NarrowPhaseCollisionSystem from "./../../../systems/NarrowPhaseCollisionSystem";
import SolidBodySystem from "./../../../systems/SolidBodySystem";
import SolidBody from "../../../components/SolidBody";

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
const player = new Text("player");

// Systems
const controllerSystem = new ControllerSystem();
const keyboardInputSystem = new KeyboardInputSystem();
const movableSystem = new MovableSystem();
const followEntityCameraSystem = new FollowEntityCameraSystem();
const solidBodySystem = new SolidBodySystem();
const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
const narrowPhaseCollisionSystem = new NarrowPhaseCollisionSystem();

followEntityCameraSystem.camera = camera;
followEntityCameraSystem.setEntityToFollow(player);

const cameraCanvasCellSystem = new CameraCanvasCellSystem({
    cameraName: cameraName,
    cellSize: 300
});

const defaultCameraSystem = new DefaultCameraSystem({
    canvas,
    cameraName
});

// Set up world
world.addSystem(cameraCanvasCellSystem);
world.addSystem(solidBodySystem);
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(movableSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(defaultCameraSystem);

// Add Entities
world.addEntity(camera);
world.addEntity(player);

for (let x = 0; x < 10000; x++) {
    const entity = new StaticText(x, {
        x: getRandomNumber(-5000, 5000),
        y: getRandomNumber(-5000, 5000)
    }, getRandomRgba());

    world.addEntity(entity);
}

world.play();
