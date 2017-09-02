import Entity from "./../../../../Entity";
import Position from "./../../../../components/Position";
import Size from "./../../../../components/Size";
import Movable from "./../../../../components/Movable";
import Collidable from "./../../../../components/Collidable";
import Shape from "./../../../../components/Shape";

export default class extends Entity {
    constructor() {
        super();

        let position = new Position();
        let size = new Size();
        let movable = new Movable();
        let collidable = new Collidable();
        let shape = new Shape();

        size.width = 85;
        size.height = 85;

        shape.points.push(
            {x: 0, y: 0},
            {x: 85, y: 0},
            {x: 85, y: 85},
            {x: 0, y: 85},
            {x: 0, y: 0}            
        );

        shape.fillColor.red = 255;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(shape);
        this.addComponent(movable);
        this.addComponent(collidable);
    }
}