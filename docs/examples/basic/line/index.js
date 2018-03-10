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
import Line from "./entities/Line";
import Text from "./../logicbox/entities/Text";
import Camera from "./../../../../src/entities/Camera";

var getRandomNumber = (max) => {
    return parseInt(Math.random() * max, 10);
}

var world = new World();
world.size.height = 2000;
world.size.width = 2000;

var camera = new Camera("main");
var text = new Text("Hello World!");

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
world.addSystem(logicSystem);
world.addSystem(renderSystem);

world.addEntity(camera);
world.addEntity(text);

var line;

for (let x = 0; x < 10; x++) {

    let line = new Line(
        {
            x: getRandomNumber(2000),
            y: getRandomNumber(2000)
        },
        {
            x: getRandomNumber(2000),
            y: getRandomNumber(2000)
        }
    );

    world.addEntity(line);
}

renderSystem.setCameraByName("main");

world.play();

window.world = world;