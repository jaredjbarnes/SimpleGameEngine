import * as assert from "assert";
import World from "../World";
import BroadPhaseCollisionSystem from "../systems/BroadPhaseCollisionSystem";
import CameraCanvasCellSystem from "../systems/CameraCanvasCellSystem";
import Entity from "../Entity";
import Camera from "../entities/Camera";
import Position from "../components/Position";
import Size from "../components/Size";
import Collidable from "../components/Collidable";

class CollidableEntity extends Entity {
    constructor({ x, y } = { x: 0, y: 0 }, { width, height } = { width: 100, height: 100 }) {
        super();
        const position = new Position();
        const size = new Size();
        const collidable = new Collidable();

        position.x = x;
        position.y = y;
        position.isDirty = true;

        size.width = width;
        size.height = height;
        size.isDirty = true;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(collidable);
    }
}

exports["CameraCanvasCellSystem: Initialize."] = function () {
    const cameraCanvasCellSystem = new CameraCanvasCellSystem();
    const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
    const world = new World();
    const camera = new Camera();
    const entityA = new CollidableEntity({ x: 0, y: 0 }, { width: 100, height: 100 });
    const entityB = new CollidableEntity({ x: 50, y: 50 }, { width: 100, height: 100 });

    world.addSystem(broadPhaseCollisionSystem);
    world.addSystem(cameraCanvasCellSystem);
    world.addEntity(entityA);
    world.addEntity(entityB);
    world.addEntity(camera);
    world.update();

    const position = camera.getComponent("position");
    position.x = -2000;
    position.y = -2000;
    position.isDirty = true;

    world._timespans.push(16);
    world.update();

};