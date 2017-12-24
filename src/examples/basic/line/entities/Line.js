import Entity from "./../../../../Entity";
import Position from "./../../../../components/Position";
import Size from "./../../../../components/Size";
import Collidable from "./../../../../components/Collidable";
import Line from "./../../../../components/Line";

export default class extends Entity {
    constructor(from, to, thickness = 10) {
        super();

        let position = new Position();
        let size = new Size();
        let line = new Line();
        let collidable = new Collidable();
        let radiusThickness = Math.round(thickness / 2);

        position.x = Math.min(from.x, to.x);
        position.y = Math.min(from.y, to.y);

        size.width = Math.max(from.x, to.x) - Math.min(from.x, to.x);
        size.height = Math.max(from.y, to.y) - Math.min(from.y, to.y);

        line.thickness = thickness;

        if (position.x === from.x && position.y === from.y) {
            line.from.x = radiusThickness;
            line.from.y = radiusThickness;
            line.to.x = size.width - radiusThickness;
            line.to.y = size.height - radiusThickness;
        } else if (position.x === from.x && position.y !== from.y) {
            line.from.x = size.width - radiusThickness;
            line.from.y = radiusThickness;
            line.to.x = radiusThickness;
            line.to.y = size.height - radiusThickness;
        } else if (position.x !== from.x && position.y === from.y) {
            line.from.x = size.width - radiusThickness;
            line.from.y = radiusThickness;
            line.to.x = radiusThickness;
            line.to.y = size.height - radiusThickness;
        } else if (position.x !== from.x && position.y !== from.y) {
            line.from.x = radiusThickness;
            line.from.y = radiusThickness;
            line.to.x = size.width - radiusThickness;
            line.to.y = size.height - radiusThickness;
        }

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(line);
        this.addComponent(collidable);
    }
}