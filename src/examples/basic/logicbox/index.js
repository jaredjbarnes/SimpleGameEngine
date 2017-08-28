import World from "./../../../World";
import RenderSystem from "./../../../systems/CompleteRenderSystem";
import CollisionSystem from "./../../../systems/CollisionSystem";
import KeyboardInputSystem from "./../../../systems/KeyboardInputSystem";
import ControllerSystem from "./../../../systems/ControllerSystem";
import CharacterSystem from "./../../../systems/CharacterSystem";
import MovementSystem from "./../../../systems/MovementSystem";
import LogicSystem from "./../../../systems/LogicSystem";
import RigidBodySystem from "./../../../systems/RigidBodySystem";
import ColorStateManagerSystem from "./systems/ColorStateManagerSystem";
import FollowEntityCameraSystem from "./../../../systems/FollowEntityCameraSystem";
import Text from "./entities/Text";
import ColorPlatform from "./entities/ColorPlatform";
import ColorLogicBox from "./entities/ColorLogicBox";
import StaticText from "./entities/StaticText";
import Camera from "./../../../entities/Camera";

var getRandomNumber = (max) => {
    return parseInt(Math.random() * max, 10);
}

var world = new World();
world.size.height = 20000;
world.size.width = 20000;

var text = new Text("Hello World!");
var camera = new Camera("main");

var renderSystem = new RenderSystem({
    canvas: document.getElementById("viewport")
});

var logicSystem = new LogicSystem();
var collisionSystem = new CollisionSystem();
var characterSystem = new CharacterSystem();
var keyboardInputSystem = new KeyboardInputSystem(document);
var controllerSystem = new ControllerSystem(document);
var movementSystem = new MovementSystem();
var followEntityCameraSystem = new FollowEntityCameraSystem();
var rigidBodySystem = new RigidBodySystem();
var colorStateManagerSystem = new ColorStateManagerSystem();

followEntityCameraSystem.camera = camera;
followEntityCameraSystem.setEntityToFollow(text);

// ADD SYSTEMS
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(movementSystem);
world.addSystem(collisionSystem);
world.addSystem(rigidBodySystem);
world.addSystem(characterSystem);
world.addSystem(colorStateManagerSystem);
world.addSystem(logicSystem);
world.addSystem(renderSystem);


for (let z = 0; z < 1000; z++) {
    let x = getRandomNumber(10000);
    let y = getRandomNumber(10000);

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