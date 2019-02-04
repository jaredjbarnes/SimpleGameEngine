import Entity from "../../../../../src/Entity";
import SplatSurface from "../components/SplatSurface";
import Rectangle from "../../../../../src/components/Rectangle";
import RectangleCollider from "../../../../../src/components/RectangleCollider";
import SpatialPartition from "../../../../../src/components/SpatialPartition";
import Transform from "../../../../../src/components/Transform";
import Shape from "../../../../../src/components/Shape";

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