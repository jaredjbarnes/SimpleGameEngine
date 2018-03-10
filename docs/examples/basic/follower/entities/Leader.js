import Entity from "./../../../../../src/Entity";
import Position from "./../../../../../src/components/Position";
import Size from "./../../../../../src/components/Size";
import Movable from "./../../../../../src/components/Movable";
import Collidable from "./../../../../../src/components/Collidable";
import Shape from "./../../../../../src/components/Shape";
import KeyboardInput from "./../../../../../src/components/KeyboardInput";
import KeyboardController from "./../../../../../src/components/KeyboardController";
import SolidBody from "./../../../../../src/components/SolidBody";
import { NarrowPhaseCollidable, Part } from "./../../../../../src/components/NarrowPhaseCollidable";

export default class extends Entity {
    constructor() {
        super();

        let position = new Position();
        let size = new Size();
        let movable = new Movable();
        let collidable = new Collidable();
        let shape = new Shape();
        let keyboardController = new KeyboardController();
        let keyboardInput = new KeyboardInput();
        let solidBody = new SolidBody();
        let narrowPhaseCollision = new NarrowPhaseCollidable();
        let part = new Part();

        part.points.push(
            { x: 0, y: 0 },
            { x: 85, y: 0 },
            { x: 85, y: 85 },
            { x: 0, y: 85 },
            { x: 0, y: 0 }
        );

        size.width = 85;
        size.height = 85;

        narrowPhaseCollision.parts.push(part);

        shape.points.push(
            { x: 0, y: 0 },
            { x: 85, y: 0 },
            { x: 85, y: 85 },
            { x: 0, y: 85 },
            { x: 0, y: 0 }
        );

        shape.fillColor.red = 255;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(shape);
        this.addComponent(movable);
        this.addComponent(collidable);
        this.addComponent(keyboardController);
        this.addComponent(keyboardInput);
        //this.addComponent(solidBody);
        this.addComponent(narrowPhaseCollision);
    }
}