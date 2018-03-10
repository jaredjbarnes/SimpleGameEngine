import Entity from "./../../../../../src/Entity";
import Size from "./../../../../../src/components/Size";
import Position from "./../../../../../src/components/Position";
import Text from "./../../../../../src/components/Text";
import Collidable from "./../../../../../src/components/Collidable";

export default class StaticText extends Entity {
    constructor(text) {
        super();
        this.type = "static-star";

        var size = new Size();
        var position = new Position();
        var textTexture = new Text();
        var collidable = new Collidable();

        position.isStatic = true;
        position.isDirty = true;

        textTexture.text = text;
        textTexture.font.size = 17;

        size.width = 100;
        size.height = 50;

        this.addComponent(size);
        this.addComponent(position);
        this.addComponent(textTexture);
        this.addComponent(collidable);
    }
}