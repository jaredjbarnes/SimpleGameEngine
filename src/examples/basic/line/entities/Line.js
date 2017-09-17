import Entity from "./../../../../Entity";
import Position from "./../../../../components/Position";
import Size from "./../../../../components/Size";
import Collidable from "./../../../../components/Collidable";
import Line from "./../../../../components/Line";

export default class extends Entity {
    constructor(from, to) {
        super();

        let position = new Position();
        let size = new Size();
        let line = new Line();
        let collidable = new Collidable();

        position.x = Math.min(from.x, to.x);
        position.y = Math.min(from.y, to.y);

        size.width = Math.max(from.x, to.x) - Math.min(from.x, to.x);
        size.height = Math.max(from.y, to.y) - Math.min(from.y, to.y);

        if (position.x === from.x && position.y === from.y) {
            line.from.x = 0;
            line.from.y = 0;
            line.to.x = size.width;
            line.to.y = size.height;
        } else if (position.x === from.x && position.y !== from.y) {
            line.from.x = size.width
            line.from.y = 0;
            line.to.x = 0;
            line.to.y = size.height;
        } else if (position.x !== from.x && position.y === from.y) {
            line.from.x = size.width;
            line.from.y = 0;
            line.to.x = 0;
            line.to.y = size.height;
        } else if (position.x !== from.x && position.y !== from.y) {
            line.from.x = 0;
            line.from.y = 0;
            line.to.x = size.width;
            line.to.y = size.height;
        }

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(line);
        this.addComponent(collidable);
    }
}