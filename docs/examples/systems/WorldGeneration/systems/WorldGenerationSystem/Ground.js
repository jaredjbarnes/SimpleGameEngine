import Entity from "../../../../../../src/Entity";
import Transform from "../../../../../../src/components/Transform";
import Rectangle from "../../../../../../src/components/Rectangle";
import SpatialPartition from "../../../../../../src/components/SpatialPartition";
import Image from "../../../../../../src/components/Image";

const SIZE = 32;

export default class Ground extends Entity {
    constructor(name) {
        super();
        this.type = name;

        const transform = new Transform();
        const rectangle = new Rectangle();
        const spatialPartition = new SpatialPartition();
        const image = new Image();

        image.url = `assets/ground/${name}.png`;
        image.id = `assets/ground/${name}.png`;
        image.size.width = SIZE;
        image.size.height = SIZE;

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(spatialPartition);
        this.addComponent(image);
    }
}