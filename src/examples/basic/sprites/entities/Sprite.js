import Entity from "./../../../../Entity";
import Sprite from "./../../../../components/Sprite";
import Position from "./../../../../components/Position";
import Size from "./../../../../components/Size";
import Collidable from "./../../../../components/Collidable";
import Image from "./../../../../components/Image";

export default class extends Entity {
    constructor() {
        super();

        let position = new Position();
        let size = new Size();
        let sprite = new Sprite();
        let imageTexture = new Image();
        let collidable = new Collidable();

        size.width = 85;
        size.height = 85;

        for (let x = 0; x < 8; x++) {
            let frame = new Image();
            frame.path = "./assets/hero_spritesheet.png";
            frame.position.x = 80 * x;
            frame.size.width = 80;
            frame.size.height = 85;

            sprite.images.push(frame);
        }

        sprite.timeScale = 0.25;

        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(sprite);
        this.addComponent(imageTexture);
        this.addComponent(collidable);
    }
}