import World from "./../../World";
import RenderSystem from "./../../systems/CompleteRenderSystem";
import CollisionSystem from "./../../systems/CollisionSystem";
import KeyboardInputSystem from "./../../systems/KeyboardInputSystem";
import ControllerSystem from "./../../systems/ControllerSystem";
import MovementSystem from "./../../systems/MovementSystem";
import FollowEntityCameraSystem from "./../../systems/FollowEntityCameraSystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import Camera from "./../../entities/Camera";

var world = new World();

// ENTITIES
var text = new Text("Hello World!");
var camera = new Camera("main");

var renderSystem = new RenderSystem({
    canvas: document.getElementById("viewport")
});

var collisionSystem = new CollisionSystem();
var keyboardInputSystem = new KeyboardInputSystem(document);
var controllerSystem = new ControllerSystem(document);
var movementSystem = new MovementSystem();
var followEntityCameraSystem = new FollowEntityCameraSystem();

followEntityCameraSystem.camera = camera;
followEntityCameraSystem.setEntityToFollow(text);

// ADD SYSTEMS
world.addSystem(renderSystem);
world.addSystem(collisionSystem);
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(movementSystem);
world.addSystem(followEntityCameraSystem);

// ADD ENTITIES
world.addEntity(text);
world.addEntity(camera);

for (let x = 0; x < 1000; x++) {
    let staticText = new StaticText(x + "entity");

    let position = staticText.getComponent("position");
    let textTexture = staticText.getComponent("text-texture");

    position.x = parseInt(Math.random() * 1000);
    position.y = parseInt(Math.random() * 1000);

    textTexture.font.color.red = parseInt(Math.random() * 255);
    textTexture.font.color.green = parseInt(Math.random() * 255);
    textTexture.font.color.blue = parseInt(Math.random() * 255);

    world.addEntity(staticText);
}

renderSystem.setCameraByName("main");

world.play();
