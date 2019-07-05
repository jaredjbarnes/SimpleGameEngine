import World from "../../../../src/World.js";
import DefaultCameraSystem from "../../../../src/systems/camera/DefaultCameraSystem.js/index.js";
import SplatterSystem from "./systems/SplatterSystem.js";
import SplatRasterizer from "./rasterizers/SplatRasterizer.js";
import PaintableEntity from "./entities/PaintableEntity.js";
import PaintableTextEntity from "./entities/PaintableTextEntity.js";
import BroadPhaseCollisionSystem from "../../../../src/systems/BroadPhaseCollisionSystem.js";
import CursorSystem from "../../../../src/systems/CursorSystem.js";
import Camera from "../../../../src/systems/camera/Camera.js/index.js";

const cameraName = "main";
const canvas = document.getElementById("viewport");

const world = new World();
const cameraSystem = new DefaultCameraSystem({ canvas, cameraName });
const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
const splatterSystem = new SplatterSystem();
const camera = new Camera(cameraName);
const paintableEntity = new PaintableEntity();
const paintableTextEntity = new PaintableTextEntity("Daddy Loves Aydri");
const splatRasterizer = new SplatRasterizer({canvasFactory: cameraSystem.canvasFactory});
const cursorSystem = new CursorSystem({ canvas, cameraName, document });

cameraSystem.compositor.addRasterizer(splatRasterizer);

world.addSystem(cursorSystem);
world.addSystem(broadPhaseCollisionSystem);
world.addSystem(splatterSystem);
world.addSystem(cameraSystem);

world.addEntity(camera);
world.addEntity(paintableEntity);
world.addEntity(paintableTextEntity);

world.play();