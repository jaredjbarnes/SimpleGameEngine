import Entity from "../../../../../src/Entity";
import Transform from "../../../../../src/components/Transform";
import RectangleCollider from "../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../src/components/Rectangle";
import SpatialPartition from "../../../../../src/components/SpatialPartition";
import Image from "../../../../../src/components/Image";
import ZIndex from "../../../../../src/components/ZIndex";
import CenterPoint from "../components/CenterPoint"

const SIZE = 16;

export default class Bush extends Entity {
    constructor() {
        super();
        this.type = "bush";

        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const spatialPartition = new SpatialPartition();
        const rectangle = new Rectangle();
        const image = new Image();
        const zIndex = new ZIndex();
        const centerPoint = new CenterPoint();

        zIndex.value = 2;

        image.url = `assets/bush.png`;
        image.id = `assets/bush.png`;
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        centerPoint.x = 16;
        centerPoint.y = 16;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(spatialPartition);
        this.addComponent(image);
        this.addComponent(zIndex);
    }
}