import Entity from "./../../../Entity";
import Size from "./../../../components/Size";
import Position from "./../../../components/Position";
import Force from "./../../../components/Force";
import Physics from "./../../../components/Physics";
import Shape from "./../../../components/Shape";
import Collidable from "./../../../components/Collidable";
import { Part, RigidBody } from "./../../../components/RigidBody";

export default class Triangle extends Entity {
    constructor(text) {
        super();
        this.type = "triangle";

        var size = new Size();
        var position = new Position();
        var shape = new Shape();
        var collidable = new Collidable();
        var force = new Force();
        var physics = new Physics();
        var rigidBody = new RigidBody();

        position.isStatic = true;

        shape.fillColor.red = 255;
        shape.border.thickness = 2;
        shape.points.push(
            { x: 0.5, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 1 },
            { x: 0.5, y: 0 }
        );

        size.width = 100;
        size.height = 100;

        var part = new Part();
        part.points.push(
            { x: 50, y: 0 },
            { x: 100, y: 100 },
            { x: 0, y: 100 },
            { x: 100, y: 0 }
        );
        rigidBody.parts.push(part);

        this.addComponent(size);
        this.addComponent(position);
        this.addComponent(shape);
        this.addComponent(collidable);
        this.addComponent(force);
        this.addComponent(physics);
        this.addComponent(rigidBody);
    }
}