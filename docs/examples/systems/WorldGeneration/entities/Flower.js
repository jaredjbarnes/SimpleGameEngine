import Entity from "../../../../../src/Entity";
import Transform from "../../../../../src/components/Transform";
import Rectangle from "../../../../../src/components/Rectangle";
import Image from "../../../../../src/components/Image";
import ZIndex from "../../../../../src/components/ZIndex";
import SpatialPartition from "../../../../../src/components/SpatialPartition";

export default class Flower extends Entity {
    constructor() {
        super();
        this.type = "flower";

        const transform = new Transform();
        const rectangle = new Rectangle();
        const spatialPartition = new SpatialPartition();
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
        this.addComponent(spatialPartition);
        this.addComponent(image);
        this.addComponent(zIndex);
    }
}