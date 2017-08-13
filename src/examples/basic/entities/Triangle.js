import Entity from "./../../../Entity";
import Size from "./../../../components/Size";
import Position from "./../../../components/Position";
import Movable from "./../../../components/Movable";
import Physics from "./../../../components/Physics";
import Shape from "./../../../components/Shape";
import Collidable from "./../../../components/Collidable";

export default class Triangle extends Entity {
    constructor(text) {
        super();
        this.type = "triangle";

        var size = new Size();
        var position = new Position();
        var shape = new Shape();
        var collidable = new Collidable();
        var movable = new Movable();
        var physics = new Physics();

        position.isStatic = true;

        shape.fillColor.red = 255;
        shape.border.thickness = 2;
        shape.points.push(
            {x: 0.5, y: 0.1},
            {x: 0.9, y: 0.9},
            {x: 0.1, y: 0.9},
            {x: 0.5, y: 0.1}
        );

        size.width = 100;
        size.height = 100;

        this.addComponent(size);
        this.addComponent(position);
        this.addComponent(shape);
        this.addComponent(collidable);
        this.addComponent(movable);
        this.addComponent(physics);
    }
}