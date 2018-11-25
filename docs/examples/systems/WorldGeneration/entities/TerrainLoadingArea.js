import Entity from "../../../../../src/Entity"
import Transform from "../../../../../src/components/Transform";
import RectangleCollider from "../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../src/components/Rectangle";
import Shape from "../../../../../src/components/Shape";

export default class TerrainLoadingArea extends Entity {
    constructor({
        size
    }) {
        super();
        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const shape = new Shape();

        shape.fillColor.red = 255;
        shape.points.push(
            {
                x: 0,
                y: 0
            },
            {
                x: size.width,
                y: 0
            },
            {
                x: size.width,
                y: size.height
            },
            {
                x: 0,
                y: size.height
            },
        )

        rectangle.width = size.width;
        rectangle.height = size.height;

        this.addComponent(transform);
        this.addComponent(rectangleCollider);
        this.addComponent(rectangle);
        //this.addComponent(shape);
    }
}