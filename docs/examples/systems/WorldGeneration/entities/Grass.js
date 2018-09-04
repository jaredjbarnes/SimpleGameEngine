import Entity from "../../../../../src/Entity";
import Transform from "../../../../../src/components/Transform";
import RectangleCollider from "../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../src/components/Rectangle";
import Shape from "../../../../../src/components/Shape";

const SIZE = 100;

export default class extends Entity {
    constructor() {
        super();
        this.type = "grass";

        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const shape = new Shape();

        rectangle.width = SIZE;
        rectangle.height = SIZE;

        shape.fillColor.red = 72;
        shape.fillColor.green = 152;
        shape.fillColor.blue = 72;
        
        shape.points.push(
            { x: 0, y: 0 },
            { x: SIZE, y: 0 },
            { x: SIZE, y: SIZE },
            { x: 0, y: SIZE },
            { x: 0, y: 0 }
        );

        shape.id = this.id;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(shape);
    }
}