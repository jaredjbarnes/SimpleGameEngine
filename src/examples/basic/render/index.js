import World from "./../../../World";
import RenderSystem from "./../../../systems/CompleteRenderSystem";
import BroadPhaseCollisionSystem from "./../../../systems/BroadPhaseCollisionSystem";
import KeyboardInputSystem from "./../../../systems/KeyboardInputSystem";
import ControllerSystem from "./../../../systems/ControllerSystem";
import MovementSystem from "./../../../systems/MovementSystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import Camera from "./../../../entities/Camera";

var world = new World();


// ENTITIES
var text = new Text("Hello World!");
var camera = new Camera("main");

var renderSystem = new RenderSystem({
    canvas: document.getElementById("viewport")
});

var collisionSystem = new BroadPhaseCollisionSystem();
var keyboardInputSystem = new KeyboardInputSystem(document);
var controllerSystem = new ControllerSystem(document);
var movementSystem = new MovementSystem();

// ADD SYSTEMS
world.addSystem(collisionSystem);
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(movementSystem);
world.addSystem(renderSystem);

// ADD ENTITIES
world.addEntity(text);
world.addEntity(camera);

for (let x = 0; x < 1000; x++) {
    let staticText = new StaticText(x + "entity");

    let position = staticText.getComponent("position");
    let textTexture = staticText.getComponent("text");

    position.x = parseInt(Math.random() * 1000);
    position.y = parseInt(Math.random() * 1000);

    textTexture.font.color.red = parseInt(Math.random() * 255);
    textTexture.font.color.green = parseInt(Math.random() * 255);
    textTexture.font.color.blue = parseInt(Math.random() * 255);

    world.addEntity(staticText);
}

renderSystem.setCameraByName("main");

world.play();
