import Entity from "./../../../../../src/Entity";
import Size from "./../../../../../src/components/Size";
import Position from "./../../../../../src/components/Position";
import Text from "./../../../../../src/components/Text";
import Collidable from "./../../../../../src/components/Collidable";
import ZIndex from "./../../../../../src/components/ZIndex";
import Shape from "./../../../../../src/components/Shape";

export default class StaticText extends Entity {
    constructor(text, zIndexValue) {
        super();
        this.type = "static-star";

        var size = new Size();
        var position = new Position();
        var textTexture = new Text();
        var collidable = new Collidable();
        var shape = new Shape();
        var zIndex = new ZIndex();

        position.isStatic = true;

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.horizontalAlignment = "center";
        textTexture.verticalAlignment = "middle";

        size.width = 150;
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

        zIndex.value = zIndexValue;

        this.addComponent(size);
        this.addComponent(position);
        this.addComponent(textTexture);
        this.addComponent(collidable);
        this.addComponent(shape);
        this.addComponent(zIndex);
    }
}