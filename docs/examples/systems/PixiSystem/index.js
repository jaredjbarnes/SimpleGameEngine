import World from "/src/World.js";
import WorldMode from "/src/WorldMode.js";
import BroadPhaseCollisionSystem from "/src/systems/BroadPhaseCollisionSystem.js";
import PixiRenderSystem from "/src/systems/PixiRenderSystem.js";
import PixiCamera from "/src/entities/PixiCamera.js";

const world = new World();
const mode = new WorldMode();
const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
const pixiRenderSystem = new PixiRenderSystem();
const pixiCamera = new PixiCamera();

mode.name = "default";
mode.addSystem(broadPhaseCollisionSystem);
mode.addSystem(pixiRenderSystem);

world.addMode(mode);
world.setMode("default");

world.addEntity(pixiCamera);

world.start();

window.world = world;
