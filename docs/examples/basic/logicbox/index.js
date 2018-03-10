import World from "./../../../../src/World";
import RenderSystem from "./../../../../src/systems/CompleteRenderSystem";
import BroadPhaseCollisionSystem from "./../../../../src/systems/BroadPhaseCollisionSystem";
import KeyboardInputSystem from "./../../../../src/systems/KeyboardInputSystem";
import ControllerSystem from "./../../../../src/systems/ControllerSystem";
import SolidBodySystem from "./../../../../src/systems/SolidBodySystem";
import MovementSystem from "./../../../../src/systems/MovementSystem";
import LogicSystem from "./../../../../src/systems/LogicSystem";
import NarrowPhaseCollisionSystem from "./../../../../src/systems/NarrowPhaseCollisionSystem";
import ColorStateManagerSystem from "./systems/ColorStateManagerSystem";
import FollowEntityCameraSystem from "./../../../../src/systems/FollowEntityCameraSystem";
import Text from "./entities/Text";
import ColorPlatform from "./entities/ColorPlatform";
import ColorLogicBox from "./entities/ColorLogicBox";
import StaticText from "./entities/StaticText";
import Camera from "./../../../../src/entities/Camera";

var getRandomNumber = (max) => {
    return parseInt(Math.random() * max, 10);
}

var world = new World();
world.size.height = 2000;
world.size.width = 2000;

var text = new Text("Hello World!");
var camera = new Camera("main");

var renderSystem = new RenderSystem({
    canvas: document.getElementById("viewport")
});

var logicSystem = new LogicSystem();
var collisionSystem = new BroadPhaseCollisionSystem();
var solidBodySystem = new SolidBodySystem();
var keyboardInputSystem = new KeyboardInputSystem(document);
var controllerSystem = new ControllerSystem(document);
var movementSystem = new MovementSystem();
var followEntityCameraSystem = new FollowEntityCameraSystem();
var narrowPhaseCollisionSystem = new NarrowPhaseCollisionSystem();
var colorStateManagerSystem = new ColorStateManagerSystem();

followEntityCameraSystem.camera = camera;
followEntityCameraSystem.setEntityToFollow(text);

// ADD SYSTEMS
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(movementSystem);
world.addSystem(collisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(solidBodySystem);
world.addSystem(colorStateManagerSystem);
world.addSystem(logicSystem);
world.addSystem(renderSystem);


for (let z = 0; z < 200; z++) {
    let x = getRandomNumber(2000);
    let y = getRandomNumber(2000);

    // ENTITIES
    let colorPlatform = new ColorPlatform(x, y);
    let colorPlatform2 = new ColorPlatform(x + 150, y);
    let colorPlatform3 = new ColorPlatform(x + 75, y + 150);

    let colorLogicBox = new ColorLogicBox(colorPlatform.id, colorPlatform2.id, colorPlatform3.id);

    // ADD ENTITIES
    world.addEntity(colorPlatform);
    world.addEntity(colorPlatform2);
    world.addEntity(colorPlatform3);
    world.addEntity(colorLogicBox);
}

world.addEntity(text);
world.addEntity(camera);

renderSystem.setCameraByName("main");

world.play();

window.world = world;