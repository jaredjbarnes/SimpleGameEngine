import Entity from "../../../../../src/Entity.js";
import SplatSurface from "../components/SplatSurface.js";
import Rectangle from "../../../../../src/components/Rectangle.js";
import RectangleCollider from "../../../../../src/components/RectangleCollider.js";
import SpatialPartition from "../../../../../src/components/SpatialPartition.js";
import Transform from "../../../../../src/components/Transform.js";
import Text from "../../../../../src/components/Text.js";

export default class PaintableEntity extends Entity {
    constructor(text) {
        super();

        const transform = new Transform();
        const rectangle = new Rectangle();
        const rectangleCollider = new RectangleCollider();
        const spatialPartition = new SpatialPartition();
        const textComponent = new Text();
        const splatSurface = new SplatSurface();

        rectangle.width = 200;
        rectangle.height = 100;

        textComponent.text = text;
        textComponent.font.size = 22;
        textComponent.font.size = 22;
        textComponent.font.color.red = 180;
        textComponent.font.color.blue = 255;

        transform.position.y = 100;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(spatialPartition);
        this.addComponent(splatSurface);
        this.addComponent(textComponent);
    }
}