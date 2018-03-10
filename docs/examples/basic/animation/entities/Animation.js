import Entity from "./../../../../../src/Entity";
import Position from "./../../../../../src/components/Position";
import Size from "./../../../../../src/components/Size";
import Collidable from "./../../../../../src/components/Collidable";
import SolidBody from "./../../../../../src/components/SolidBody";
import Shape from "./../../../../../src/components/Shape";

export default class extends Entity {
    constructor() {
        super();

        let position = new Position();
        let size = new Size();
        let collidable = new Collidable();
        let solidBody = new SolidBody();
        let shape = new Shape();

        shape.points.push(
            { x: 0.02, y: 0.02 },
            { x: 0.96, y: 0.02 },
            { x: 0.96, y: 0.96 },
            { x: 0.02, y: 0.96 },
            { x: 0.02, y: 0.02 }
        );
        shape.fillColor.red = 255;
        shape.border.thickness = 2;

        size.width = 100;
        size.height = 100;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(collidable);
        this.addComponent(solidBody);
        this.addComponent(shape);
    }
}