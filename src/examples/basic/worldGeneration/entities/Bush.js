import Entity from "../../../../Entity";
import Position from "../../../../Position";
import Size from "../../../../Size";
import Collidable from "../../../../Collidable";
import Image from "../../../../Image";

export default class Brush extends Entity {
    constructor(){
        super();

        const position = new Position();
        const size = new Size();
        const collidable = new Collidable();
        const image = new Image();

        size.width = 16;
        size.height = 16;

        image.path = "tiles.png"
        image.position.x = 198;
        image.position.y = 133;
        image.size.width = 16;
        image.size.height = 16;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(collidable);
        this.addComponent(image);
    }
}