import Entity from "./../../../../Entity";
import Position from "./../../../../components/Position";
import Size from "./../../../../components/Size";
import Movable from "./../../../../components/Movable";
import Collidable from "./../../../../components/Collidable";
import Shape from "./../../../../components/Shape";
import Follower from "./../../../../components/Follower";

export default class extends Entity {
    constructor(leaderEntityId, maxSpeed = 5) {
        super();

        let position = new Position();
        let size = new Size();
        let movable = new Movable();
        let collidable = new Collidable();
        let shape = new Shape();
        let follower = new Follower();

        size.width = 30;
        size.height = 30;

        shape.points.push(
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );

        shape.fillColor.blue = 255;

        follower.leaderEntityId = leaderEntityId;
        follower.distance.x = -2;
        follower.distance.y = -2;
        follower.maxSpeed = maxSpeed;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(shape);
        this.addComponent(movable);
        this.addComponent(collidable);
        this.addComponent(follower);
    }
}