import Entity from "../../../../../../src/Entity";
import Transform from "../../../../../../src/components/Transform";
import RectangleCollider from "../../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../../src/components/Rectangle";
import Image from "../../../../../../src/components/Image";

const SIZE = 100;

export default class extends Entity {
    constructor() {
        super();
        this.type = "dirt24";

        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const image = new Image();
        
        image.url = "assets/ground/Dirt24.png";
        image.id = "assets/ground/Dirt24.png";
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