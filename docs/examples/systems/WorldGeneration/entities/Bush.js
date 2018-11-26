import Entity from "../../../../../src/Entity";
import Transform from "../../../../../src/components/Transform";
import RectangleCollider from "../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../src/components/Rectangle";
import Image from "../../../../../src/components/Image";
import ZIndex from "../../../../../src/components/ZIndex";

const SIZE = 16;

export default class Bush extends Entity {
    constructor() {
        super();
        this.type = "bush";

        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const image = new Image();
        const zIndex = new ZIndex();

        zIndex.value = 2;

        image.url = `assets/bush.png`;
        image.id = `assets/bush.png`;
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(zIndex);
    }
}