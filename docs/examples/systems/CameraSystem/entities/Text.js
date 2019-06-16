import Entity from "../../../../../src/Entity.js";
import Transform from "../../../../../src/components/Transform.js";
import Text from "../../../../../src/components/Text.js";
import RectangleCollider from "../../../../../src/components/RectangleCollider.js";
import Rectangle from "../../../../../src/components/Rectangle.js";
import SpatialPartition from "../../../../../src/components/SpatialPartition.js";
import KeyboardController from "../../../../../src/components/KeyboardController.js";
import KeyboardInput from "../../../../../src/components/KeyboardInput.js";
import Movable from "../../../../../src/components/Movable.js";
import Shape from "../../../../../src/components/Shape.js";
import SolidBody from "../../../../../src/components/SolidBody.js";

export default class extends Entity {
    constructor(text) {
        super();
        this.type = "player";

        const transform = new Transform();
        const textTexture = new Text();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const keyboardController = new KeyboardController();
        const keyboardInput = new KeyboardInput();
        const movable = new Movable();
        const shape = new Shape();
        const spatialPartition = new SpatialPartition();
        const solidBody = new SolidBody();

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.verticalAlignment = "middle";
        textTexture.horizontalAlignment = "center"

        rectangle.width = 30;
        rectangle.height = 30;

        transform.rotation = 45;
        transform.isDirty = true;

        shape.border.thickness = 1;
        shape.fillColor.blue = 255;
        shape.fillColor.green = 100;
        shape.fillColor.red = 100;
        shape.fillColor.alpha = 0.25
        
        shape.points.push(
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );
        shape.id = `${JSON.stringify(transform)}|${JSON.stringify(shape)}|${JSON.stringify(rectangle)}`;

        this.addComponent(transform);
        this.addComponent(textTexture);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(keyboardController);
        this.addComponent(keyboardInput);
        this.addComponent(movable);
        this.addComponent(shape);
        this.addComponent(spatialPartition);
        this.addComponent(solidBody);
    }
}