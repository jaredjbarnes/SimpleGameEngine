import * as assert from "assert";
import World from "../World";
import BroadPhaseCollisionSystem from "../systems/BroadPhaseCollisionSystem";
import Entity from "../Entity";
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

exports["BroadPhaseCollisionSystem: Collision on single tick."] = function () {
    const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
    const world = new World();
    const entityA = new CollidableEntity({ x: 0, y: 0 }, { width: 100, height: 100 });
    const entityB = new CollidableEntity({ x: 50, y: 50 }, { width: 100, height: 100 });

    world.addSystem(broadPhaseCollisionSystem);
    world.addEntity(entityA);
    world.addEntity(entityB);
    world.update();

    const collidableA = entityA.getComponent("collidable");
    const collidableB = entityB.getComponent("collidable");

    assert.equal(collidableA.collisions[entityB.id].intersection.top, 50);
    assert.equal(collidableA.collisions[entityB.id].intersection.left, 50);
    assert.equal(collidableA.collisions[entityB.id].intersection.right, 100);
    assert.equal(collidableA.collisions[entityB.id].intersection.bottom, 100);

    assert.equal(collidableB.collisions[entityA.id].intersection.top, 50);
    assert.equal(collidableB.collisions[entityA.id].intersection.left, 50);
    assert.equal(collidableB.collisions[entityA.id].intersection.right, 100);
    assert.equal(collidableB.collisions[entityA.id].intersection.bottom, 100);

    assert.equal(Object.keys(collidableA.collisions).length, 1);
    assert.equal(Object.keys(collidableB.collisions).length, 1);
};

exports["BroadPhaseCollisionSystem: Collide then seperate."] = function () {
    const broadPhaseCollisionSystem = new BroadPhaseCollisionSystem();
    const world = new World();
    const entityA = new CollidableEntity({ x: 0, y: 0 }, { width: 100, height: 100 });
    const entityB = new CollidableEntity({ x: 50, y: 50 }, { width: 100, height: 100 });

    world.addSystem(broadPhaseCollisionSystem);
    world.addEntity(entityA);
    world.addEntity(entityB);
    world.update();

    const collidableA = entityA.getComponent("collidable");
    const collidableB = entityB.getComponent("collidable");

    assert.equal(collidableA.collisions[entityB.id].intersection.top, 50);
    assert.equal(collidableA.collisions[entityB.id].intersection.left, 50);
    assert.equal(collidableA.collisions[entityB.id].intersection.right, 100);
    assert.equal(collidableA.collisions[entityB.id].intersection.bottom, 100);

    assert.equal(collidableB.collisions[entityA.id].intersection.top, 50);
    assert.equal(collidableB.collisions[entityA.id].intersection.left, 50);
    assert.equal(collidableB.collisions[entityA.id].intersection.right, 100);
    assert.equal(collidableB.collisions[entityA.id].intersection.bottom, 100);

    assert.equal(Object.keys(collidableA.collisions).length, 1);
    assert.equal(Object.keys(collidableB.collisions).length, 1);

    const positionA = entityA.getComponent("position");
    positionA.x = 1000;
    positionA.isDirty = true;

    world._timespans = [11];

    world.update();

    
};