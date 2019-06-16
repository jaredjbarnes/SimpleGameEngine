import Entity from "../../../../../src/Entity.js";
import SplatSurface from "../components/SplatSurface.js";
import Rectangle from "../../../../../src/components/Rectangle.js";
import RectangleCollider from "../../../../../src/components/RectangleCollider.js";
import SpatialPartition from "../../../../../src/components/SpatialPartition.js";
import Transform from "../../../../../src/components/Transform.js";
import Shape from "../../../../../src/components/Shape.js";

export default class PaintableEntity extends Entity {
    constructor() {
        super();

        const transform = new Transform();
        const rectangle = new Rectangle();
        const rectangleCollider = new RectangleCollider();
        const spatialPartition = new SpatialPartition();
        const shape = new Shape();
        const splatSurface = new SplatSurface();

        rectangle.width = 200;
        rectangle.height = 100;

        shape.fillColor.red = 255;
        shape.points.push(
            { x: 0, y: 0 },
            { x: 200, y: 0 },
            { x: 200, y: 100 },
            { x: 0, y: 100 },
            { x: 0, y: 0 }
        );

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(spatialPartition);
        this.addComponent(splatSurface);
        this.addComponent(shape);
    }
}