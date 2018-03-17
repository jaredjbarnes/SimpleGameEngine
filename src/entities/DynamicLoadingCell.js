import Entity from "./../Entity";
import Transform from "./../components/Transform";
import Size from "./../components/Size";
import Collidable from "./../components/Collidable";
import DynamicLoadingCell from "../components/DynamicLoadingCell";

export default class extends Entity {
    constructor({ x = 0, y = 0 } = { x: 0, y: 0 }, cellSize) {
        super();

        const transform = new Transform();
        transform.position.x = x;
        transform.position.y = y;
        transform.isDirty = true;

        const size = new Size();
        size.width = cellSize;
        size.height = cellSize;

        const collidable = new Collidable();
        const dynamicLoadingCell = new DynamicLoadingCell();

        this.addComponent(transform);
        this.addComponent(size);
        this.addComponent(collidable);
        this.addComponent(dynamicLoadingCell);

    }
}