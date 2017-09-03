import World from "./../../../World";
import RenderSystem from "./../../../systems/CompleteRenderSystem";
import CollisionSystem from "./../../../systems/CollisionSystem";
import KeyboardInputSystem from "./../../../systems/KeyboardInputSystem";
import ControllerSystem from "./../../../systems/ControllerSystem";
import CharacterSystem from "./../../../systems/CharacterSystem";
import MovementSystem from "./../../../systems/MovementSystem";
import LogicSystem from "./../../../systems/LogicSystem";
import FollowerSystem from "./../../../systems/FollowerSystem";
import RigidBodySystem from "./../../../systems/RigidBodySystem";
import FollowEntityCameraSystem from "./../../../systems/FollowEntityCameraSystem";
import RigidBody from "./entities/RigidBody";
import Character from "./entities/Character";
import Camera from "./../../../entities/Camera";

var getRandomNumber = (max) => {
    return Math.floor(Math.random() * max, 10);
}

var world = new World();
world.size.height = 2000;
world.size.width = 2000;

var camera = new Camera("main");
var character = new Character();

var renderSystem = new RenderSystem({
    canvas: document.getElementById("viewport")
});

var logicSystem = new LogicSystem();
var collisionSystem = new CollisionSystem();
var characterSystem = new CharacterSystem();
var keyboardInputSystem = new KeyboardInputSystem(document);
var controllerSystem = new ControllerSystem(document);
var movementSystem = new MovementSystem();
var followerSystem = new FollowerSystem();
var followEntityCameraSystem = new FollowEntityCameraSystem();
var rigidBodySystem = new RigidBodySystem();

followEntityCameraSystem.camera = camera;
followEntityCameraSystem.setEntityToFollow(character);

// ADD SYSTEMS
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(followerSystem);
world.addSystem(characterSystem);
world.addSystem(movementSystem);
world.addSystem(logicSystem);
world.addSystem(collisionSystem);
world.addSystem(rigidBodySystem);
world.addSystem(renderSystem);

world.addEntity(camera);
world.addEntity(character);

for (let x = 0; x < 300; x++) {

    let rigidBody = new RigidBody(character.id);
    rigidBody.getComponent("position").x = getRandomNumber(2000);
    rigidBody.getComponent("position").y = getRandomNumber(2000);

    world.addEntity(rigidBody);
}

renderSystem.setCameraByName("main");

world.play();

window.world = world;