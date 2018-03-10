import World from "./../../../../src/World";
import RenderSystem from "./../../../../src/systems/CompleteRenderSystem";
import BroadPhaseCollisionSystem from "./../../../../src/systems/BroadPhaseCollisionSystem";
import KeyboardInputSystem from "./../../../../src/systems/KeyboardInputSystem";
import ControllerSystem from "./../../../../src/systems/ControllerSystem";
import SolidBodySystem from "./../../../../src/systems/SolidBodySystem";
import MovementSystem from "./../../../../src/systems/MovementSystem";
import LogicSystem from "./../../../../src/systems/LogicSystem";
import FollowerSystem from "./../../../../src/systems/FollowerSystem";
import NarrowPhaseCollisionSystem from "./../../../../src/systems/NarrowPhaseCollisionSystem";
import FollowEntityCameraSystem from "./../../../../src/systems/FollowEntityCameraSystem";
import Follower from "./entities/Follower";
import Leader from "./entities/Leader";
import Camera from "./../../../../src/entities/Camera";

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
var collisionSystem = new BroadPhaseCollisionSystem();
var solidBodySystem = new SolidBodySystem();
var keyboardInputSystem = new KeyboardInputSystem(document);
var controllerSystem = new ControllerSystem(document);
var movementSystem = new MovementSystem();
var followerSystem = new FollowerSystem();
var followEntityCameraSystem = new FollowEntityCameraSystem();
var narrowPhaseCollisionSystem = new NarrowPhaseCollisionSystem();

followEntityCameraSystem.camera = camera;
followEntityCameraSystem.setEntityToFollow(leader);

// ADD SYSTEMS
world.addSystem(keyboardInputSystem);
world.addSystem(controllerSystem);
world.addSystem(followEntityCameraSystem);
world.addSystem(followerSystem);
world.addSystem(solidBodySystem);
world.addSystem(movementSystem);
world.addSystem(logicSystem);
world.addSystem(collisionSystem);
world.addSystem(narrowPhaseCollisionSystem);
world.addSystem(renderSystem);

world.addEntity(camera);
world.addEntity(leader);

for (let x = 0; x < 20; x++) {

    let follower = new Follower(leader.id);
    follower.getComponent("position").x = getRandomNumber(2000);
    follower.getComponent("position").y = getRandomNumber(2000);

    world.addEntity(follower);
}

renderSystem.setCameraByName("main");

world.play();

window.world = world;