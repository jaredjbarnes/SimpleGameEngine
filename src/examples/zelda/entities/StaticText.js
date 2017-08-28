import Entity from "./../../../Entity";
import Size from "./../../../components/Size";
import Position from "./../../../components/Position";
import TextTexture from "./../../../components/TextTexture";
import Collidable from "./../../../components/Collidable";
import { Part, RigidBody } from "./../../../components/RigidBody";

export default class StaticText extends Entity {
    constructor(text) {
        super();
        this.type = "static-star";

        var size = new Size();
        var position = new Position();
        var textTexture = new TextTexture();
        var collidable = new Collidable();
        var rigidBody = new RigidBody();

        position.isStatic = true;

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.verticalAlignment = "middle";

        size.width = 100;
        size.height = 30;

        var part = new Part();
        part.points.push(
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );

        rigidBody.parts.push(part);

        this.addComponent(size);
        this.addComponent(position);
        this.addComponent(textTexture);
        this.addComponent(collidable);
        this.addComponent(rigidBody);

    }
}