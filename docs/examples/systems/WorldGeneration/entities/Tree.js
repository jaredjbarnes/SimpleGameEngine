import Entity from "../../../../../src/Entity";
import Transform from "../../../../../src/components/Transform";
import RectangleCollider from "../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../src/components/Rectangle";
import Image from "../../../../../src/components/Image";
import ZIndex from "../../../../../src/components/ZIndex";

export default class Bush extends Entity {
    constructor() {
        super();
        this.type = "tree";

        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const image = new Image();
        const zIndex = new ZIndex();

        zIndex.value = 2;

        image.url = `assets/tree.png`;
        image.id = `assets/tree.png`;
        image.size.width = 65;
        image.size.height = 80;

        rectangle.width = 65;
        rectangle.height = 80;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(zIndex);
    }
}