import Game from "./../../Game";
import RenderSystem from "./../../systems/CompleteRenderSystem";
import CollisionSystem from "./../../systems/CollisionSystem";
import KeyboardInputSystem from "./../../systems/KeyboardInputSystem";
import ControllerSystem from "./../../systems/ControllerSystem";
import MovementSystem from "./../../systems/MovementSystem";
import PhysicsSystem from "./../../systems/PhysicsSystem";
import Text from "./entities/Text";
import StaticText from "./entities/StaticText";
import Triangle from "./entities/Triangle";
import Camera from "./../../entities/Camera";

var game = new Game();

// ENTITIES
var text = new Text("Hello World!");
var triangle = new Triangle();
var camera = new Camera("main");

var renderSystem = new RenderSystem({
    canvas: document.getElementById("viewport")
});

var collisionSystem = new CollisionSystem();
var keyboardInputSystem = new KeyboardInputSystem(document);
var controllerSystem = new ControllerSystem(document);
var movementSystem = new MovementSystem();
var physicsSystem = new PhysicsSystem();

// ADD SYSTEMS
game.addSystem(collisionSystem);
game.addSystem(keyboardInputSystem);
game.addSystem(controllerSystem);
game.addSystem(movementSystem);
game.addSystem(physicsSystem);
game.addSystem(renderSystem);

// ADD ENTITIES
game.addEntity(text);
game.addEntity(camera);
game.addEntity(triangle);

renderSystem.setCameraByName("main");

game.play();

window.game = game;
