import Entity from "./../../../../../src/Entity";
import Size from "./../../../../../src/components/Size";
import Position from "./../../../../../src/components/Position";
import Text from "./../../../../../src/components/Text";
import Collidable from "./../../../../../src/components/Collidable";
import KeyboardController from "./../../../../../src/components/KeyboardController";
import KeyboardInput from "./../../../../../src/components/KeyboardInput";
import Movable from "./../../../../../src/components/Movable";
import Shape from "./../../../../../src/components/Shape";
import State from "./../../../../../src/components/State";
import { Part, NarrowPhaseCollidable } from "./../../../../../src/components/NarrowPhaseCollidable";
import SolidBody from "./../../../../../src/components/SolidBody";

export default class extends Entity {
    constructor(text) {
        super();
        var size = new Size();
        var position = new Position();
        var textTexture = new Text();
        var collidable = new Collidable();
        var keyboardController = new KeyboardController();
        var keyboardInput = new KeyboardInput();
        var movable = new Movable();
        var shape = new Shape();
        var narrowPhaseCollision = new NarrowPhaseCollidable();
        var part = new Part();
        var solidBody = new SolidBody();

        part.points.push(
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 },
        );

        narrowPhaseCollision.parts.push(part);

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.verticalAlignment = "middle";
        textTexture.horizontalAlignment = "center";

        size.width = 100;
        size.height = 30;

        shape.border.thickness = 1;
        shape.fillColor.blue = 255;
        shape.fillColor.green = 100;
        shape.fillColor.red = 100;
        shape.points.push(
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 1 },
            { x: 0, y: 0 }
        );

        this.addComponent(size);
        this.addComponent(position);
        this.addComponent(textTexture);
        this.addComponent(collidable);
        this.addComponent(keyboardController);
        this.addComponent(keyboardInput);
        this.addComponent(movable);
        this.addComponent(shape);
        this.addComponent(narrowPhaseCollision);
        this.addComponent(solidBody);
    }
}