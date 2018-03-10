import Entity from "./../../../../../src/Entity";
import Size from "./../../../../../src/components/Size";
import Position from "./../../../../../src/components/Position";
import Text from "./../../../../../src/components/Text";
import Collidable from "./../../../../../src/components/Collidable";
import { NarrowPhaseCollidable, Part } from "./../../../../../src/components/NarrowPhaseCollidable";
import Shape from "./../../../../../src/components/Shape";
import SolidBody from "./../../../../../src/components/SolidBody";
import Opacity from "../../../../../src/components/Opacity";

export default class StaticText extends Entity {
    constructor(text, { x, y }, { red = 0, green = 0, blue = 0, alpha = 1 }) {
        super();
        this.type = "static-text";

        const size = new Size();
        const position = new Position();
        const textTexture = new Text();
        const collidable = new Collidable();
        const narrowPhaseCollidable = new NarrowPhaseCollidable();
        const part = new Part();
        const shape = new Shape();
        const solidBody = new SolidBody();
        const opacity = new Opacity();

        opacity.value = Math.random();

        narrowPhaseCollidable.parts.push(part);

        shape.border.thickness = 1;
        shape.fillColor.red = red;
        shape.fillColor.green = green;
        shape.fillColor.blue = blue;
        shape.points.push(
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );

        part.points.push(
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 30 },
            { x: 0, y: 30 }
        );

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.horizontalAlignment = "center";
        textTexture.verticalAlignment = "middle";

        size.width = 100;
        size.height = 30;

        position.x = x;
        position.y = y;

        this.addComponent(size);
        this.addComponent(position);
        this.addComponent(textTexture);
        this.addComponent(collidable);
        this.addComponent(shape);
        this.addComponent(solidBody);
        this.addComponent(narrowPhaseCollidable);
        this.addComponent(opacity);
    }
}