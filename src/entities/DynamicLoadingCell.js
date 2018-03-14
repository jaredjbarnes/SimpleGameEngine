import Entity from "./../Entity";
import Transform from "./../components/Transform";
import Collidable from "./../components/Collidable";
import DynamicLoadingCell from "../components/DynamicLoadingCell";

export default class extends Entity {
    constructor({ x = 0, y = 0 } = { x: 0, y: 0 }, cellSize) {
        super();

        const transform = new Transform();
        transform.position.x = x;
        transform.position.y = y;
        transform.size.width = cellSize;
        transform.size.height = cellSize;
        transform.isDirty = true;

        const collidable = new Collidable();
        const dynamicLoadingCell = new DynamicLoadingCell();

        this.addComponent(transform);
        this.addComponent(collidable);
        this.addComponent(dynamicLoadingCell);

    }
}