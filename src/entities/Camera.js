import Entity from "./../Entity";
import CameraComponent from "./../components/Camera";
import Transform from "./../components/Transform";
import Collidable from "./../components/Collidable";

export default class Camera extends Entity {
    constructor(name, { width = 300, height = 300 } = {}) {
        super();

        const camera = new CameraComponent();
        camera.name = name || null;

        const transform = new Transform();
        const collidable = new Collidable();

        transform.size.width = width;
        transform.size.height = height;

        this.id = `camera_${this.id}`;
        this.addComponent(camera);
        this.addComponent(transform);
        this.addComponent(collidable);

    }
}