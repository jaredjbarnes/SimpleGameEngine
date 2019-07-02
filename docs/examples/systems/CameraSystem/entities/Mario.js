import Entity from "../../../../../src/Entity.js";
import Image from "../../../../../src/components/Image.js";
import Transform from "../../../../../src/components/Transform.js";
import Rectangle from "../../../../../src/components/Rectangle.js";
import RectangleCollider from "../../../../../src/components/RectangleCollider.js";
import SpatialPartition from "../../../../../src/components/SpatialPartition.js";

export default class Mario extends Entity {
    constructor({ position } = { position: { x: 0, y: 0 } }) {
        super();
        this.type = "Mario";

        const image = new Image();
        image.id = "./images/Mario.png";
        image.url = "./images/Mario.png";
        image.size.width = 16;
        image.size.height = 26;
        image.flipHorizontally = true;

        const rectangle = new Rectangle();
        rectangle.width = 16;
        rectangle.height = 26;
        rectangle.isDirty = true;

        const transform = new Transform();
        transform.position.x = position.x;
        transform.position.y = position.y;

        const rectangleCollider = new RectangleCollider();
        const spatialPartition = new SpatialPartition();

        this.addComponent(image);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(transform);
        this.addComponent(spatialPartition);


    }
}