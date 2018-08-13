import Entity from "../../../../../src/Entity";
import Image from "../../../../../src/components/Image";
import Transform from "../../../../../src/components/Transform";
import Rectangle from "../../../../../src/components/Rectangle";
import RectangleCollider from "../../../../../src/components/RectangleCollider";

export default class Mario extends Entity {
    constructor({ position, flipHorizontally, flipVertically } = { position: { x: 0, y: 0 }, flipHorizontally: false, flipVertically: false }) {
        super();
        this.type = "Mario";

        const image = new Image();
        image.url = "./images/Mario.png";
        image.isDirty = true;
        image.size.width = 16;
        image.size.height = 26;
        image.flipHorizontally = flipHorizontally;
        image.flipVertically = flipVertically;

        const rectangle = new Rectangle();
        rectangle.width = 16;
        rectangle.height = 26;
        rectangle.isDirty = true;

        const transform = new Transform();
        transform.position.x = position.x;
        transform.position.y = position.y;

        const rectangleCollider = new RectangleCollider();

        this.addComponent(image);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(transform);


    }
}