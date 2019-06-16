import World from "../../../../src/World.js";
import Camera from "../../../../src/entities/Camera.js";
import BroadPhaseCollisionSystem from "../../../../src/systems/BroadPhaseCollisionSystem.js";
import NarrowPhaseCollisionSystem from "../../../../src/systems/NarrowPhaseCollisionSystem.js";
import DefaultCameraSystem from "../../../../src/systems/DefaultCameraSystem.js";
import ControllerSystem from "../../../../src/systems/ControllerSystem.js";
import KeyboardSystem from "../../../../src/systems/KeyboardSystem.js";
import MovableSystem from "../../../../src/systems/MovementSystem.js";
import SolidBodySystem from "../../../../src/systems/SolidBodySystem.js";
import Text from "./entities/Text.js";
import StaticText from "./entities/StaticText.js";
import FollowEntityCameraSystem from "../../../../src/systems/FollowEntityCameraSystem.js";

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
const world = new World(console.log);

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

const defaultCameraSystem = new DefaultCameraSystem({
    canvas,
    cameraName,
    cellSize: 300
});

//defaultCameraSystem.enablePolygonRasterizer();

// Set up world
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(solidBodySystem);
world.addSystem(movableSystem);
world.addSystem(followEntityCameraSystem);
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
