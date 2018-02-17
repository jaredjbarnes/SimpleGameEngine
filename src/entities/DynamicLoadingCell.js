import Entity from "./../Entity";
import Position from "./../components/Position";
import Size from "./../components/Size";
import Collidable from "./../components/Collidable";
import DynamicLoadingCell from "../components/DynamicLoadingCell";

export default class extends Entity {
    constructor({ x = 0, y = 0 } = { x: 0, y: 0 }, cellSize) {
        super();

        const size = new Size();
        size.width = cellSize;
        size.height = cellSize;

        const position = new Position();
        position.x = x;
        position.y = y;
        position.isDirty = true;

        const collidable = new Collidable();
        const dynamicLoadingCell = new DynamicLoadingCell();

        this.addComponent(size);
        this.addComponent(position);
        this.addComponent(collidable);
        this.addComponent(dynamicLoadingCell);

    }
}