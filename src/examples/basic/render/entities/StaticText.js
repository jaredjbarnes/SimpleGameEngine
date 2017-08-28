import Entity from "./../../../../Entity";
import Size from "./../../../../components/Size";
import Position from "./../../../../components/Position";
import TextTexture from "./../../../../components/TextTexture";
import Collidable from "./../../../../components/Collidable";

export default class StaticText extends Entity {
    constructor(text) {
        super();
        this.type = "static-star";

        var size = new Size();
        var position = new Position();
        var textTexture = new TextTexture();
        var collidable = new Collidable();

        position.isStatic = true;

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