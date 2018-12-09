import Entity from "../../../../../src/Entity";
import Image from "../../../../../src/components/Image";
import CompositeImage from "../../../../../src/components/CompositeImage";
import Transform from "../../../../../src/components/Transform";
import Rectangle from "../../../../../src/components/Rectangle";
import SpatialPartition from "../../../../../src/components/SpatialPartition";
import RectangleCollider from "../../../../../src/components/RectangleCollider";

export default class MultipleImages extends Entity {
    constructor() {
        super();
        this.type = "multiple-images";

        const image1 = new Image();
        image1.url = "./images/Mario.png";
        image1.isDirty = true;
        image1.size.width = 16;
        image1.size.height = 26;

        const image2 = new Image();
        image2.url = "./images/Mario.png";
        image2.isDirty = true;
        image2.size.width = 16;
        image2.size.height = 26;
        image2.flipHorizontally = true;

        const compositeImage = new CompositeImage();
        compositeImage.images.push(image1, image2);

        const rectangle = new Rectangle();
        rectangle.width = 16;
        rectangle.height = 26;
        rectangle.isDirty = true;

        const transform = new Transform();
        transform.position.x = 20;
        transform.position.y = 20;
        transform.rotation = 25;

        const rectangleCollider = new RectangleCollider();
        const spatialPartition = new SpatialPartition();

        this.addComponent(compositeImage);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(spatialPartition);
        this.addComponent(transform);


    }
}