import Entity from "../Entity.js";
import Camera from "../components/Camera.js";
import Rectangle from "../components/Rectangle.js";
import Transform from "../components/Transform.js";

export default class PixiCamera extends Entity {
    constructor(){
        super();
        
        const camera = new Camera();
        const rectangle = new Rectangle();
        const transform = new Transform();

        rectangle.width = 256;
        rectangle.height = 256;

        this.addComponent(rectangle);
        this.addComponent(transform);
        this.addComponent(camera);
    }
}