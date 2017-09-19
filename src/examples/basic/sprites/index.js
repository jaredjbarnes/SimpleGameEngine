import World from "./../../../World";
import RenderSystem from "./../../../systems/CompleteRenderSystem";
import BroadPhaseCollisionSystem from "./../../../systems/BroadPhaseCollisionSystem";
import KeyboardInputSystem from "./../../../systems/KeyboardInputSystem";
import ControllerSystem from "./../../../systems/ControllerSystem";
import SolidBodySystem from "./../../../systems/SolidBodySystem";
import MovementSystem from "./../../../systems/MovementSystem";
import LogicSystem from "./../../../systems/LogicSystem";
import SpriteSystem from "./../../../systems/SpriteSystem";
import NarrowPhaseCollisionSystem from "./../../../systems/NarrowPhaseCollisionSystem";
import FollowEntityCameraSystem from "./../../../systems/FollowEntityCameraSystem";
import Sprite from "./entities/Sprite";
import Camera from "./../../../entities/Camera";

var getRandomNumber = (max) => {
    return parseInt(Math.random() * max, 10);
}

var world = new World();
world.size.height = 2000;
world.size.width = 2000;

var camera = new Camera("main");

var renderSystem = new RenderSystem({
    canvas: document.getElementById("viewport"),
    assetRoot: "/src/examples/basic/sprites"
});

var logicSystem = new LogicSystem();
var collisionSystem = new BroadPhaseCollisionSystem();
var solidBodySystem = new SolidBodySystem();
var keyboardInputSystem = new KeyboardInputSystem(document);
var controllerSystem = new ControllerSystem(document);
var movementSystem = new MovementSystem();
var followEntityCameraSystem = new FollowEntityCameraSystem();
var narrowPhaseCollisionSystem = new NarrowPhaseCollisionSystem();
var spriteSystem = new SpriteSystem();

followEntityCameraSystem.camera = camera;

// ADD SYSTEMS
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

for (let x = 0; x < 1000; x++) {

    let sprite = new Sprite();
    sprite.getComponent("position").x = getRandomNumber(2000);
    sprite.getComponent("position").y = getRandomNumber(2000);

    world.addEntity(sprite);
}

renderSystem.setCameraByName("main");

world.play();

window.world = world;