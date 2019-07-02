import World from "../../../../src/World.js";
import BroadPhaseCollisionSystem from "../../../../src/systems/BroadPhaseCollisionSystem.js";
import CameraSystem from "../../../../src/systems/camera/CameraSystem.js";
import ImageSystem from "../../../../src/systems/ImageSystem.js";
import ControllerSystem from "../../../../src/systems/ControllerSystem.js";
import KeyboardSystem from "../../../../src/systems/KeyboardSystem.js";
import MovableSystem from "../../../../src/systems/MovementSystem.js";
import Text from "./entities/Text.js";
import Mario from "./entities/Mario.js";
import StaticText from "./entities/StaticText.js";
import Spin from "./components/Spin.js";
import SpinningSystem from "./systems/SpinningSystem.js";
import FollowEntityCameraSystem from "../../../../src/systems/FollowEntityCameraSystem.js";
import WorldMode from "../../../../src/WorldMode.js";

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

// Entities
const player = new Text("P");
const mario = new Mario();
const mario2 = new Mario({ position: { x: 32, y: 0 }});
const mario3 = new Mario({ position: { x: -28, y: 0 }});
const mario4 = new Mario({ position: { x: -60, y: 0 }});

const spin = new Spin();
spin.step = 5;
mario.addComponent(spin);

mario4.getComponent("transform").rotation = 90;
mario3.getComponent("transform").rotation = 40;

// Systems
const controllerSystem = new ControllerSystem();
const keyboardInputSystem = new KeyboardSystem();
const movableSystem = new MovableSystem();
const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
const spinningSystem = new SpinningSystem();
const cameraSystem = new CameraSystem();
const imageSystem = new ImageSystem();

const followEntityCameraSystem = new FollowEntityCameraSystem({
    cameraEntityId: cameraSystem.camera.id,
    followEntityId: player.id
});

const world = new World();

// Add Entities
world.addEntity(player);
world.addEntity(mario);
world.addEntity(mario2);
world.addEntity(mario3);
world.addEntity(mario4);

for (let x = 0; x < 10000; x++) {
    const entity = new StaticText(x, {
        x: getRandomNumber(-10000, 10000),
        y: getRandomNumber(-10000, 10000)
    }, getRandomRgba());

    world.addEntity(entity);
}

const gameMode = new WorldMode();
gameMode.name = "game";
gameMode.addSystem(spinningSystem);
gameMode.addSystem(keyboardInputSystem);
gameMode.addSystem(controllerSystem);
gameMode.addSystem(movableSystem);
gameMode.addSystem(followEntityCameraSystem);
gameMode.addSystem(broadPhaseCollisionSystem);
gameMode.addSystem(imageSystem);
gameMode.addSystem(cameraSystem);

world.addMode(gameMode);
world.setMode(gameMode.name);
world.start();

window.world = world;

document.getElementById("remove-entities").addEventListener("click", () => {
    const entities = world.getEntities();
    
    for (let x = 0 ; x < entities.length ; x++){
        const entity = entities[x];

        if (entity.type === "static-text"){
            world.removeEntity(entity);
        }
    }
});

document.body.appendChild(cameraSystem.canvas);