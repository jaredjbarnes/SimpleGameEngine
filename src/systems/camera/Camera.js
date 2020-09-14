import Entity from "../../Entity.js";
import CameraComponent from "../../components/Camera.js";
import Transform from "../../components/Transform.js";
import Rectangle from "../../components/Rectangle.js";

export default class Camera extends Entity {
    constructor() {
        super();

        const camera = new CameraComponent();
        camera.name = "camera";

        const transform = new Transform();
        const rectangle = new Rectangle();

        rectangle.width = 256;
        rectangle.height = 256;

        this.id = `camera`;
        this.addComponent(camera);
        this.addComponent(transform);
        this.addComponent(rectangle);

    }

    setSize(width, height){
        const rectangle = this.getComponent("rectangle");

        rectangle.width = width;
        rectangle.height = height;
        rectangle.isDirty = true;
    }
}