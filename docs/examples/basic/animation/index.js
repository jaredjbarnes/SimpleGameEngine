import World from "./../../../../src/World";
import RenderSystem from "./../../../../src/systems/CompleteRenderSystem";
import BroadPhaseCollisionSystem from "./../../../../src/systems/BroadPhaseCollisionSystem";
import KeyboardInputSystem from "./../../../../src/systems/KeyboardInputSystem";
import ControllerSystem from "./../../../../src/systems/ControllerSystem";
import SolidBodySystem from "./../../../../src/systems/SolidBodySystem";
import MovementSystem from "./../../../../src/systems/MovementSystem";
import LogicSystem from "./../../../../src/systems/LogicSystem";
import SpriteSystem from "./../../../../src/systems/SpriteSystem";
import NarrowPhaseCollisionSystem from "./../../../../src/systems/NarrowPhaseCollisionSystem";
import FollowEntityCameraSystem from "./../../../../src/systems/FollowEntityCameraSystem";
import Camera from "./../../../../src/entities/Camera";
import Animation from "./entities/Animation";
import AnimateMoveSystem from "./systems/AnimateMoveSystem";
import AnimationManager from "./../../../../src/services/animation/AnimationManager";

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
var animateMoveSystem = new AnimateMoveSystem();
var animationManager = new AnimationManager();

followEntityCameraSystem.camera = camera;

world.addService("animationManager", animationManager);

// ADD SYSTEMS
world.addSystem(animationManager);
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(animateMoveSystem);
world.addSystem(movementSystem);
world.addSystem(collisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(solidBodySystem);
world.addSystem(logicSystem);
world.addSystem(spriteSystem);
world.addSystem(renderSystem);

world.addEntity(camera);

let createAnimation = () => {
    let animation = new Animation();
    animation.getComponent("position").x = getRandomNumber(500);
    animation.getComponent("position").y = getRandomNumber(500);
    return animation;
}

for (let x = 0; x < 100; x++) {

    let animation = createAnimation();
    world.addEntity(animation);

}

renderSystem.setCameraByName("main");

world.play();

window.world = world;