import Entity from "../../../../../src/Entity";
import Transform from "../../../../../src/components/Transform";
import RectangleCollider from "../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../src/components/Rectangle";
import Image from "../../../../../src/components/Image";
import ZIndex from "../../../../../src/components/ZIndex";

export default class Flower extends Entity {
    constructor() {
        super();
        this.type = "flower";

        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const image = new Image();
        const zIndex = new ZIndex();

        zIndex.value = 2;

        image.url = `assets/flower.png`;
        image.id = `assets/flower.png`;
        image.size.width = 9;
        image.size.height = 7;

        rectangle.width = 9;
        rectangle.height = 7;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(zIndex);
    }
}