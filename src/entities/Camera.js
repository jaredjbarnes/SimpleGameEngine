import Entity from "../Entity.js";
import CameraComponent from "../components/Camera.js";
import Transform from "../components/Transform.js";
import Rectangle from "../components/Rectangle.js";

export default class Camera extends Entity {
    constructor(name, { width = 256, height = 256 } = {}) {
        super();

        const camera = new CameraComponent();
        camera.name = name || null;

        const transform = new Transform();
        const rectangle = new Rectangle();

        rectangle.width = width;
        rectangle.height = height;

        this.id = `camera_${this.id}`;
        this.addComponent(camera);
        this.addComponent(transform);
        this.addComponent(rectangle);

    }
}