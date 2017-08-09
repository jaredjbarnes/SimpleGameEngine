import Entity from "./../../../Entity";
import Size from "./../../../components/Size";
import Position from "./../../../components/Position";
import TextTexture from "./../../../components/TextTexture";
import Collidable from "./../../../components/Collidable";
import KeyboardController from "./../../../components/KeyboardController";
import KeyboardInput from "./../../../components/KeyboardInput";
import Movable from "./../../../components/Movable";

export default class Text extends Entity {
    constructor(text) {
        super();
        var size = new Size();
        var position = new Position();
        var textTexture = new TextTexture();
        var collidable = new Collidable();
        var keyboardController = new KeyboardController();
        var keyboardInput = new KeyboardInput();
        var movable = new Movable();

        textTexture.text = text;
        textTexture.font.size = 17;

        size.width = 100;
        size.height = 50;

        this.addComponent(size);
        this.addComponent(position);
        this.addComponent(textTexture);
        this.addComponent(collidable);
        this.addComponent(keyboardController);
        this.addComponent(keyboardInput);
        this.addComponent(movable);
    }
}