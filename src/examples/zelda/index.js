import World from "./../../World";
import RenderSystem from "./../../systems/CompleteRenderSystem";
import CollisionSystem from "./../../systems/CollisionSystem";
import KeyboardInputSystem from "./../../systems/KeyboardInputSystem";
import ControllerSystem from "./../../systems/ControllerSystem";
import CharacterSystem from "./../../systems/CharacterSystem";
import MovementSystem from "./../../systems/MovementSystem";
import RigidBodySystem from "./../../systems/RigidBodySystem";
import FollowEntityCameraSystem from "./../../systems/FollowEntityCameraSystem";
import TextSizeAdjustmentSystem from "./../../systems/TextSizeAdjustmentSystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import Camera from "./../../entities/Camera";


var world = new World();
world.size.height = 20000;
world.size.width = 20000;

// ENTITIES
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
var textSizeAdjustmentSystem = new TextSizeAdjustmentSystem();
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
world.addSystem(renderSystem);
//world.addSystem(textSizeAdjustmentSystem);

// ADD ENTITIES
world.addEntity(text);
world.addEntity(camera);

for (let x = 0; x < 20000; x++) {
    let staticText = new StaticText(x + "entity");

    let position = staticText.getComponent("position");
    let textTexture = staticText.getComponent("text-texture");

    position.x = parseInt(Math.random() * 20000);
    position.y = parseInt(Math.random() * 20000);

    textTexture.font.color.red = parseInt(Math.random() * 255);
    textTexture.font.color.green = parseInt(Math.random() * 255);
    textTexture.font.color.blue = parseInt(Math.random() * 255);

    world.addEntity(staticText);
}

renderSystem.setCameraByName("main");

world.play();
