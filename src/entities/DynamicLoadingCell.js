import Entity from "../Entity";
import Transform from "../components/Transform";
import Rectangle from "../components/Rectangle";
import RectangleCollider from "../components/RectangleCollider";
import DynamicLoadingCell from "../components/DynamicLoadingCell";

export default class extends Entity {
    constructor({ x = 0, y = 0 } = { x: 0, y: 0 }, cellSize) {
        super();

        const transform = new Transform();
        transform.position.x = x;
        transform.position.y = y;
        transform.isDirty = true;

        const rectangle = new Rectangle();
        rectangle.width = cellSize;
        rectangle.height = cellSize;

        const rectangleCollider = new RectangleCollider();
        const dynamicLoadingCell = new DynamicLoadingCell();

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(dynamicLoadingCell);

    }
}