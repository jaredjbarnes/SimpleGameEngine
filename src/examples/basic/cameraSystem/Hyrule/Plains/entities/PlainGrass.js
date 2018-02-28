import Entity from "../../../../../../Entity";
import Position from "../../../../../../components/Position";
import Size from "../../../../../../components/Size";
import Collidable from "../../../../../../components/Collidable";
import Image from "../../../../../../components/Image";

export default class PlainGrass extends Entity {
    constructor() {
        super();

        const position = new Position();
        const size = new Size();
        const collidable = new Collidable();
        const image = new Image();

        size.width = 30;
        size.height = 30;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(collidable);
        this.addComponent(image);
    }
}