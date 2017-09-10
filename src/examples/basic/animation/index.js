import World from "./../../../World";
import RenderSystem from "./../../../systems/CompleteRenderSystem";
import CollisionSystem from "./../../../systems/CollisionSystem";
import KeyboardInputSystem from "./../../../systems/KeyboardInputSystem";
import ControllerSystem from "./../../../systems/ControllerSystem";
import CharacterSystem from "./../../../systems/CharacterSystem";
import MovementSystem from "./../../../systems/MovementSystem";
import LogicSystem from "./../../../systems/LogicSystem";
import SpriteSystem from "./../../../systems/SpriteSystem";
import RigidBodySystem from "./../../../systems/RigidBodySystem";
import FollowEntityCameraSystem from "./../../../systems/FollowEntityCameraSystem";
import Camera from "./../../../entities/Camera";
import Animation from "./entities/Animation";
import AnimateMoveSystem from "./systems/AnimateMoveSystem";
import AnimationManager from "./../../../services/animation/AnimationManager";

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
var collisionSystem = new CollisionSystem();
var characterSystem = new CharacterSystem();
var keyboardInputSystem = new KeyboardInputSystem(document);
var controllerSystem = new ControllerSystem(document);
var movementSystem = new MovementSystem();
var followEntityCameraSystem = new FollowEntityCameraSystem();
var rigidBodySystem = new RigidBodySystem();
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
world.addSystem(rigidBodySystem);
world.addSystem(characterSystem);
world.addSystem(logicSystem);
world.addSystem(spriteSystem);
world.addSystem(renderSystem);


world.addEntity(camera);

for (let x = 0; x < 100; x++) {

    let animation = new Animation();
    animation.getComponent("position").x = getRandomNumber(500);
    animation.getComponent("position").y = getRandomNumber(500);

    world.addEntity(animation);
}

renderSystem.setCameraByName("main");

world.play();

window.world = world;