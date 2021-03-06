import World from "../../../../src/World.js";
import BroadPhaseCollisionSystem from "../../../../src/systems/BroadPhaseCollisionSystem.js";
import CamreaSystem from "";
import ControllerSystem from "../../../../src/systems/ControllerSystem.js";
import KeyboardSystem from "../../../../src/systems/KeyboardSystem.js";
import MovableSystem from "../../../../src/systems/MovementSystem.js";
import Player from "./entities/Player.js";
import Relative from "./entities/Relative.js";
import StaticText from "./entities/StaticText.js";
import FollowEntityCameraSystem from "../../../../src/systems/FollowEntityCameraSystem.js";
import RelativePositionSystem from "../../../../src/systems/RelativePositionSystem.js";

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
const player = new Player();
const relative = new Relative(player.id);

// Systems
const controllerSystem = new ControllerSystem();
const keyboardInputSystem = new KeyboardSystem();
const movableSystem = new MovableSystem();
const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
const relativePositionSystem = new RelativePositionSystem();

const followEntityCameraSystem = new FollowEntityCameraSystem({
    cameraEntityId: camera.id,
    followEntityId: player.id
});

const defaultCameraSystem = new DefaultCameraSystem({
    canvas,
    cameraName,
    cellSize: 300
});

// Set up world
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(movableSystem);
world.addSystem(relativePositionSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(defaultCameraSystem);

// Add Entities
world.addEntity(camera);
world.addEntity(player);
world.addEntity(relative);

for (let x = 0; x < 10000; x++) {
    const entity = new StaticText(x, {
        x: getRandomNumber(-10000, 10000),
        y: getRandomNumber(-10000, 10000)
    }, getRandomRgba());

    world.addEntity(entity);
}

world.play();

window.world = world;
