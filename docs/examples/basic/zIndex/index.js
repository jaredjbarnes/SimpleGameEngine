import World from "./../../../../src/World";
import RenderSystem from "./../../../../src/systems/CompleteRenderSystem";
import BroadPhaseCollisionSystem from "./../../../../src/systems/BroadPhaseCollisionSystem";
import KeyboardInputSystem from "./../../../../src/systems/KeyboardInputSystem";
import ControllerSystem from "./../../../../src/systems/ControllerSystem";
import MovementSystem from "./../../../../src/systems/MovementSystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import Camera from "./../../../../src/entities/Camera";

var world = new World();

var zIndex =  1//Math.round(Math.random() * 12);

// ENTITIES
var text = new Text(`Hello World! ${zIndex}`, zIndex)
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
    let zIndex = x % 10;
    let staticText = new StaticText(`${x} entity (${zIndex})`, zIndex);

    let position = staticText.getComponent("position");
    let shape = staticText.getComponent("shape");

    position.x = parseInt(Math.random() * 1000 - 70);
    position.y = parseInt(Math.random() * 1000  - 70);

    shape.fillColor.red = parseInt(Math.random() * 255);
    shape.fillColor.green = parseInt(Math.random() * 255);
    shape.fillColor.blue = parseInt(Math.random() * 255);

    world.addEntity(staticText);
}

renderSystem.setCameraByName("main");

world.play();
