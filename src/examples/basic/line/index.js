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
import Line from "./entities/Line";
import Text from "./../logicbox/entities/Text";
import Camera from "./../../../entities/Camera";

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
var collisionSystem = new CollisionSystem();
var characterSystem = new CharacterSystem();
var keyboardInputSystem = new KeyboardInputSystem(document);
var controllerSystem = new ControllerSystem(document);
var movementSystem = new MovementSystem();
var followEntityCameraSystem = new FollowEntityCameraSystem();
var rigidBodySystem = new RigidBodySystem();

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