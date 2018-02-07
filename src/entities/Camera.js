import Entity from "./../Entity";
import CameraComponent from "./../components/Camera";
import Size from "./../components/Size";
import Position from "./../components/Position";
import Collidable from "./../components/Collidable";

export default class Camera extends Entity {
    constructor(name, { width = 300, height = 300 } = {}) {
        super();

        var camera = new CameraComponent();
        camera.name = name || null;

        var position = new Position();
        var size = new Size();
        var collidable = new Collidable();

        size.width = width;
        size.height = height;

        this.id = `camera_${this.id}`;
        this.addComponent(camera);
        this.addComponent(position);
        this.addComponent(size);
        this.addComponent(collidable);

    }
}