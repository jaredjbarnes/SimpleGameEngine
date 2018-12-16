import Entity from "../../../../../src/Entity";
import Transform from "../../../../../src/components/Transform";
import RectangleCollider from "../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../src/components/Rectangle";
import SpatialPartition from "../../../../../src/components/SpatialPartition";
import Image from "../../../../../src/components/Image";
import Sprite from "../../../../../src/components/Sprite";
import ZIndex from "../../../../../src/components/ZIndex";

export default class Link extends Entity {
    constructor() {
        super();
        this.type = "link";

        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const spatialPartition = new SpatialPartition();
        const rectangle = new Rectangle();
        const first = new Image();
        const second = new Image();
        const sprite = new Sprite();
        const zIndex = new ZIndex();

        zIndex.value = 2;

        first.url = `assets/link.gif`;
        first.size.width = 16;
        first.size.height = 34;
        first.position.x = 90;
        first.position.y = 11;

        second.url = `assets/link.gif`;
        second.size.width = 16;
        second.size.height = 34;
        second.position.x = 122;
        second.position.y = 11;

        rectangle.width = 16;
        rectangle.height = 34;

        sprite.images.push(first, second);
        sprite.timeScale = 0.01;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(spatialPartition);
        this.addComponent(sprite);
        this.addComponent(zIndex);
    }
}