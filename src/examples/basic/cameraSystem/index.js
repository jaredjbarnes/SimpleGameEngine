import World from "./../../../World";
import Camera from "./../../../entities/Camera";
import BroadPhaseCollisionSystem from "./../../../systems/BroadPhaseCollisionSystem";
import CameraCanvasCellSystem from "./../../../systems/CameraCanvasCellSystem";
import DefaultCameraSystem from "./../../../systems/DefaultCameraSystem";
import ControllerSystem from "./../../../systems/ControllerSystem";
import KeyboardInputSystem from "./../../../systems/KeyboardInputSystem";
import MovableSystem from "./../../../systems/MovementSystem";
import Text from "./entities/Text";
import KeyboardController from "../../../components/KeyboardController";

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

const cameraCanvasCellSystem = new CameraCanvasCellSystem({
    cameraName: cameraName,
    cellSize: 100
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

// Add Entities
world.addEntity(camera);
world.addEntity(player);

world.play();
