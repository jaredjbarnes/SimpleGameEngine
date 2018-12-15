import World from "../../../../src/World";
import Camera from "../../../../src/entities/Camera";
import BroadPhaseCollisionSystem from "../../../../src/systems/BroadPhaseCollisionSystem";
import DefaultCameraSystem from "../../../../src/systems/DefaultCameraSystem";
import ControllerSystem from "../../../../src/systems/ControllerSystem";
import KeyboardSystem from "../../../../src/systems/KeyboardSystem";
import MovableSystem from "../../../../src/systems/MovementSystem";
import Text from "./entities/Text";
import Mario from "./entities/Mario";
import StaticText from "./entities/StaticText";
import Spin from "./components/Spin";
import SpinningSystem from "./systems/SpinningSystem";
import FollowEntityCameraSystem from "../../../../src/systems/FollowEntityCameraSystem";

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
world.addSystem(spinningSystem);
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(movableSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(defaultCameraSystem);

// Add Entities
world.addEntity(camera);
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

world.play();

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

defaultCameraSystem.bitmapCache.loadTileAsync({
    id: "./images/Mario.png",
    url: "./images/Mario.png",
    size: {
        width: 16,
        height: 26
    },
    flipHorizontally: true
}).then(()=>{
    camera.getComponent("camera").isDirty = true;
    defaultCameraSystem.compositor.emptyCache();
});