import Entity from "./../../../Entity";
import Size from "./../../../components/Size";
import Position from "./../../../components/Position";
import ImageTexture from "./../../../components/ImageTexture";
import Sprite from "./../../../components/Sprite"
import Collidable from "./../../../components/Collidable";
import State from "./../../../components/State"


export default class Link extends Entity {
    constructor() {
        this.type = "link"

        var state = new State();
        state.name = "stand-down";

        this.addComponent(new Size());
        this.addComponent(new Position());
        this.addComponent(new ImageTexture());
        this.addComponent(new Sprite());
        this.addComponent(new Collidable());
        this.addComponent(state);

    }
}