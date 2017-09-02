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
import Follower from "./entities/Follower";
import Leader from "./entities/Leader";
import Camera from "./../../../entities/Camera";

var getRandomNumber = (max) => {
    return parseInt(Math.random() * max, 10);
}

var world = new World();
world.size.height = 2000;
world.size.width = 2000;

var camera = new Camera("main");
var leader = new Leader();

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

// ADD SYSTEMS
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(followerSystem);
world.addSystem(movementSystem);
world.addSystem(collisionSystem);
world.addSystem(rigidBodySystem);
world.addSystem(characterSystem);
world.addSystem(logicSystem);
world.addSystem(renderSystem);

world.addEntity(camera);
world.addEntity(leader);

for (let x = 0; x < 200; x++) {

    let follower = new Follower(leader.id);
    follower.getComponent("position").x = getRandomNumber(2000);
    follower.getComponent("position").y = getRandomNumber(2000);

    world.addEntity(follower);
}

renderSystem.setCameraByName("main");

world.play();

window.world = world;