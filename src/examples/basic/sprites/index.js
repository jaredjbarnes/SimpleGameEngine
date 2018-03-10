import World from "./../../../World";
import RenderSystem from "./../../../systems/DefaultCameraSystem";
import BroadPhaseCollisionSystem from "./../../../systems/BroadPhaseCollisionSystem";
import DynamicLoadingSystem from "./../../../systems/DynamicLoadingSystem";
import KeyboardInputSystem from "./../../../systems/KeyboardInputSystem";
import ControllerSystem from "./../../../systems/ControllerSystem";
import SolidBodySystem from "./../../../systems/SolidBodySystem";
import MovementSystem from "./../../../systems/MovementSystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import KeyboardController from "../../../components/KeyboardController";
import LogicSystem from "./../../../systems/LogicSystem";
import SpriteSystem from "./../../../systems/SpriteSystem";
import NarrowPhaseCollisionSystem from "./../../../systems/NarrowPhaseCollisionSystem";
import FollowEntityCameraSystem from "./../../../systems/FollowEntityCameraSystem";
import Sprite from "./entities/Sprite";
import Camera from "./../../../entities/Camera";

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
world.addSystem(controllerSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(movementSystem);
world.addSystem(collisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(solidBodySystem);
world.addSystem(logicSystem);
world.addSystem(spriteSystem);
world.addSystem(renderSystem);

world.addEntity(camera);
world.addEntity(player);

for (let x = 0; x < 1000; x++) {

    let sprite = new Sprite();
    sprite.getComponent("position").x = getRandomNumber(-2000, 2000);
    sprite.getComponent("position").y = getRandomNumber(-2000, 2000);

    world.addEntity(sprite);
}

world.play();

window.world = world;