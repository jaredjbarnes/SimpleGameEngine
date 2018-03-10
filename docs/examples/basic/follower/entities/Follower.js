import Entity from "./../../../../../src/Entity";
import Position from "./../../../../../src/components/Position";
import Size from "./../../../../../src/components/Size";
import Movable from "./../../../../../src/components/Movable";
import Collidable from "./../../../../../src/components/Collidable";
import Shape from "./../../../../../src/components/Shape";
import Follower from "./../../../../../src/components/Follower";
import SolidBody from "./../../../../../src/components/SolidBody";
import { NarrowPhaseCollidable, Part } from "./../../../../../src/components/NarrowPhaseCollidable";

export default class extends Entity {
    constructor(leaderEntityId, maxSpeed = 3) {
        super();

        let position = new Position();
        let size = new Size();
        let movable = new Movable();
        let collidable = new Collidable();
        let shape = new Shape();
        let follower = new Follower();
        let solidBody = new SolidBody();
        let narrowPhaseCollision = new NarrowPhaseCollidable();
        let part = new Part();

        part.points.push(
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 }
        );

        size.width = 30;
        size.height = 30;

        narrowPhaseCollision.parts.push(part);

        shape.points.push(
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );

        shape.fillColor.blue = 255;

        follower.leaderEntityId = leaderEntityId;
        follower.distance.x = 100;
        follower.distance.y = 100;
        follower.maxSpeed = maxSpeed;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(shape);
        this.addComponent(movable);
        this.addComponent(collidable);
        this.addComponent(follower);
        this.addComponent(solidBody);
        this.addComponent(narrowPhaseCollision);
    }
}