import Entity from "./../Entity";
import CameraComponent from "./../components/Camera";
import Size from "./../components/Size";
import Position from "./../components/Position";
import Collidable from "./../components/Collidable";

export default class Camera extends Entity {
    constructor(name) {
        super();

        var camera = new CameraComponent();
        camera.name = name || null;

        var position = new Position();
        var size = new Size();
        var collidable = new Collidable();

        this.id = `camera_${this.id}`;
        this.addComponent(camera);
        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(collidable);

    }
}