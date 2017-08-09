import Game from "./../../Game";
import RenderSystem from "./../../systems/CompleteRenderSystem";
import CollisionSystem from "./../../systems/CollisionSystem";
import KeyboardInputSystem from "./../../systems/KeyboardInputSystem";
import ControllerSystem from "./../../systems/ControllerSystem";
import MovementSystem from "./../../systems/MovementSystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import Camera from "./../../entities/Camera";

var game = new Game();

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

// ADD SYSTEMS
game.addSystem(renderSystem);
game.addSystem(collisionSystem);
game.addSystem(keyboardInputSystem);
game.addSystem(controllerSystem);
game.addSystem(movementSystem);

// ADD ENTITIES
game.addEntity(text);
game.addEntity(camera);

for (let x = 0; x < 1000; x++) {
    let staticText = new StaticText(x + "entity");

    let position = staticText.getComponent("position");
    let textTexture = staticText.getComponent("text-texture");

    position.x = parseInt(Math.random() * 1000);
    position.y = parseInt(Math.random() * 1000);

    textTexture.font.color.red = parseInt(Math.random() * 255);
    textTexture.font.color.green = parseInt(Math.random() * 255);
    textTexture.font.color.blue = parseInt(Math.random() * 255);

    game.addEntity(staticText);
}

renderSystem.setCameraByName("main");

game.play();
