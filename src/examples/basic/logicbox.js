import World from "./../../World";
import RenderSystem from "./../../systems/CompleteRenderSystem";
import CollisionSystem from "./../../systems/CollisionSystem";
import KeyboardInputSystem from "./../../systems/KeyboardInputSystem";
import ControllerSystem from "./../../systems/ControllerSystem";
import CharacterSystem from "./../../systems/CharacterSystem";
import MovementSystem from "./../../systems/MovementSystem";
import RigidBodySystem from "./../../systems/RigidBodySystem";
import ColorStateManagerSystem from "./systems/ColorStateManagerSystem";
import FollowEntityCameraSystem from "./../../systems/FollowEntityCameraSystem";
import Text from "./entities/Text";
import ColorPlatform from "./entities/ColorPlatform";
import StaticText from "./entities/StaticText";
import Camera from "./../../entities/Camera";

var world = new World();
world.size.height = 2000;
world.size.width = 2000;

// ENTITIES
var colorPlatform = new ColorPlatform();
var text = new Text("Hello World!");
var camera = new Camera("main");

var renderSystem = new RenderSystem({
    canvas: document.getElementById("viewport")
});

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
world.addSystem(renderSystem);

// ADD ENTITIES
world.addEntity(colorPlatform);
world.addEntity(text);
world.addEntity(camera);

renderSystem.setCameraByName("main");

world.play();

window.world = world;
window.colorPlatform = colorPlatform;