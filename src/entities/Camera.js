import Entity from "./../Entity";
import CameraComponent from "./../components/Camera";
import Transform from "./../components/Transform";
import Rectangle from "./../components/Rectangle";
import RectangleCollider from "./../components/RectangleCollider";

export default class Camera extends Entity {
    constructor(name, { width = 300, height = 300 } = {}) {
        super();

        const camera = new CameraComponent();
        camera.name = name || null;

        const transform = new Transform();
        const rectangle = new Rectangle();
        const rectangleCollider = new RectangleCollider();

        rectangle.width = width;
        rectangle.height = height;

        this.id = `camera_${this.id}`;
        this.addComponent(camera);
        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);

    }
}