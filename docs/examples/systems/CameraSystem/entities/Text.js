import Entity from "./../../../../../src/Entity";
import Transform from "./../../../../../src/components/Transform";
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
        this.id = "player"

        var transform = new Transform();
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
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 }
        );

        narrowPhaseCollision.parts.push(part);

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.verticalAlignment = "middle";
        textTexture.horizontalAlignment = "center"

        transform.size.width = 30;
        transform.size.height = 30;
        //transform.rotation = -90;
        transform.isDirty = true;

        shape.border.thickness = 1;
        shape.fillColor.blue = 255;
        shape.fillColor.green = 100;
        shape.fillColor.red = 100;
        shape.points.push(
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );

        this.addComponent(transform);
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