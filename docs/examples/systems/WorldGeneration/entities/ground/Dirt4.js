import Entity from "../../../../../../src/Entity";
import Transform from "../../../../../../src/components/Transform";
import RectangleCollider from "../../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../../src/components/Rectangle";
import Text from "../../../../../../src/components/Text";
import Image from "../../../../../../src/components/Image";

const SIZE = 100;

export default class extends Entity {
    constructor() {
        super();
        this.type = "dirt4";

        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const image = new Image();
        const text = new Text();
        
        text.text = "Boo";
        text.horizontalAlignment = "center";
        text.lineHeight = 100;
        text.isDirty = true;

        image.url = "assets/ground/Dirt4.png";
        image.id = "assets/ground/Dirt4.png";
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(text);
    }
}