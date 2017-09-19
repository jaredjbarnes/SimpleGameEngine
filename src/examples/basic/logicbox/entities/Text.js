import Entity from "./../../../../Entity";
import Size from "./../../../../components/Size";
import Position from "./../../../../components/Position";
import TextTexture from "./../../../../components/TextTexture";
import Collidable from "./../../../../components/Collidable";
import KeyboardController from "./../../../../components/KeyboardController";
import KeyboardInput from "./../../../../components/KeyboardInput";
import Movable from "./../../../../components/Movable";
import Physics from "./../../../../components/Physics";
import Shape from "./../../../../components/Shape";
import State from "./../../../../components/State";
import { Part, NarrowPhaseCollidable } from "./../../../../components/NarrowPhaseCollidable";
import SolidBody from "./../../../../components/SolidBody";

export default class Text extends Entity {
    constructor(text) {
        super();
        var size = new Size();
        var position = new Position();
        var textTexture = new TextTexture();
        var collidable = new Collidable();
        var keyboardController = new KeyboardController();
        var keyboardInput = new KeyboardInput();
        var movable = new Movable();
        var shape = new Shape();
        var narrowPhaseCollision = new NarrowPhaseCollidable();
        var physics = new Physics();
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
        this.addComponent(physics);
        this.addComponent(solidBody);
    }
}