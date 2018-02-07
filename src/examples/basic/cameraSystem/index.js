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

const getRandomNumber = (min, max) => {
    const range = max - min;
    const value = Math.random() * range;

    return parseInt(value + min, 10);
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
const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
const movableSystem = new MovableSystem();
const followEntityCameraSystem = new FollowEntityCameraSystem();

followEntityCameraSystem.camera = camera;
followEntityCameraSystem.setEntityToFollow(player);

const cameraCanvasCellSystem = new CameraCanvasCellSystem({
    cameraName: cameraName,
    cellSize: 1000
});

const defaultCameraSystem = new DefaultCameraSystem({
    canvas,
    cameraName
});

// Set up world
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(cameraCanvasCellSystem);
world.addSystem(defaultCameraSystem);
world.addSystem(controllerSystem);
world.addSystem(keyboardInputSystem);
world.addSystem(movableSystem);
world.addSystem(followEntityCameraSystem);

// Add Entities
world.addEntity(camera);
world.addEntity(player);

for (let x = 0; x < 10000; x++) {
    const entity = new StaticText(x, {
        x: getRandomNumber(-10000, 10000),
        y: getRandomNumber(-10000, 10000)
    });

    world.addEntity(entity);
}

world.play();
