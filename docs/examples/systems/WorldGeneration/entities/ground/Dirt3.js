import Entity from "../../../../../../src/Entity";
import Transform from "../../../../../../src/components/Transform";
import RectangleCollider from "../../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../../src/components/Rectangle";
import Image from "../../../../../../src/components/Image";
import Text from "../../../../../../src/components/Text";

const SIZE = 100;

export default class extends Entity {
    constructor() {
        super();
        this.type = "dirt3";

        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const image = new Image();
        const text = new Text();
        
        text.text = "Dirt3";
        text.horizontalAlignment = "center";
        text.lineHeight = 100;
        text.isDirty = true;

        image.url = "assets/ground/Dirt3.png";
        image.id = "assets/ground/Dirt3.png";
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