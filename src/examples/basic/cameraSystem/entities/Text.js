import Entity from "./../../../../Entity";
import Size from "./../../../../components/Size";
import Position from "./../../../../components/Position";
import Text from "./../../../../components/Text";
import Collidable from "./../../../../components/Collidable";
import KeyboardController from "./../../../../components/KeyboardController";
import KeyboardInput from "./../../../../components/KeyboardInput";
import Movable from "./../../../../components/Movable";
import Shape from "./../../../../components/Shape";
import State from "./../../../../components/State";
import { Part, NarrowPhaseCollidable } from "./../../../../components/NarrowPhaseCollidable";
import SolidBody from "./../../../../components/SolidBody";

export default class extends Entity {
    constructor(text) {
        super();
        this.id = "player"

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
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 }
        );

        narrowPhaseCollision.parts.push(part);

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.verticalAlignment = "middle";
        textTexture.horizontalAlignment = "center"

        size.width = 30;
        size.height = 30;

        position.isDirty = true;

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