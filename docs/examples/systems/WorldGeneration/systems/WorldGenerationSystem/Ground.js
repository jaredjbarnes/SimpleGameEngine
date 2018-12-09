import Entity from "../../../../../../src/Entity";
import Transform from "../../../../../../src/components/Transform";
import Rectangle from "../../../../../../src/components/Rectangle";
import RectangleCollider from "../../../../../../src/components/RectangleCollider";
import Image from "../../../../../../src/components/Image";
import Text from "../../../../../../src/components/Text";

const SIZE = 32;

export default class Ground extends Entity {
    constructor(name) {
        super();
        this.type = name;

        const transform = new Transform();
        const rectangle = new Rectangle();
        const rectangleCollider = new RectangleCollider();
        const image = new Image();

        image.url = `assets/ground/${name}.png`;
        image.id = `assets/ground/${name}.png`;
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
    }
}