import World from "./../../../../src/World";
import RenderSystem from "./../../../../src/systems/DefaultCameraSystem";
import BroadPhaseCollisionSystem from "./../../../../src/systems/BroadPhaseCollisionSystem";
import DynamicLoadingSystem from "./../../../../src/systems/DynamicLoadingSystem";
import KeyboardInputSystem from "./../../../../src/systems/KeyboardInputSystem";
import ControllerSystem from "./../../../../src/systems/ControllerSystem";
import SolidBodySystem from "./../../../../src/systems/SolidBodySystem";
import MovementSystem from "./../../../../src/systems/MovementSystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import KeyboardController from "./../../../../src/components/KeyboardController";
import LogicSystem from "./../../../../src/systems/LogicSystem";
import SpriteSystem from "./../../../../src/systems/SpriteSystem";
import NarrowPhaseCollisionSystem from "./../../../../src/systems/NarrowPhaseCollisionSystem";
import FollowEntityCameraSystem from "./../../../../src/systems/FollowEntityCameraSystem";
import Sprite from "./entities/Sprite";
import Camera from "./../../../../src/entities/Camera";

const cameraName = "main";

const getRandomNumber = (min, max) => {
    const range = max - min;
    const value = Math.random() * range;

    return parseInt(value + min, 10);
}

// Entities

const world = new World();
world.size.height = 2000;
world.size.width = 2000;

const camera = new Camera(cameraName);
const player = new Text("P");

const renderSystem = new RenderSystem({
    canvas: document.getElementById("viewport"),
    cameraName: cameraName
});

const logicSystem = new LogicSystem();
const collisionSystem = new BroadPhaseCollisionSystem();
const solidBodySystem = new SolidBodySystem();
const keyboardInputSystem = new KeyboardInputSystem(document);
const controllerSystem = new ControllerSystem(document);
const movementSystem = new MovementSystem();
const followEntityCameraSystem = new FollowEntityCameraSystem();
const narrowPhaseCollisionSystem = new NarrowPhaseCollisionSystem();
const spriteSystem = new SpriteSystem();

const dynamicLoadingSystem = new DynamicLoadingSystem({
    cameraName: cameraName,
    cellSize: 300
});

followEntityCameraSystem.camera = camera;
followEntityCameraSystem.setEntityToFollow(player);

// ADD SYSTEMS
world.addSystem(dynamicLoadingSystem);
world.addSystem(keyboardInputSystem);
world.addSystem(solidBodySystem);
world.addSystem(logicSystem);
world.addSystem(spriteSystem);
world.addSystem(controllerSystem);
world.addSystem(movementSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(collisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(renderSystem);

world.addEntity(camera);
world.addEntity(player);

for (let x = 0; x < 10000; x++) {

    let sprite = new Sprite();
    sprite.getComponent("position").x = getRandomNumber(-10000, 10000);
    sprite.getComponent("position").y = getRandomNumber(-10000, 10000);

    world.addEntity(sprite);
}

world.play();

window.world = world;