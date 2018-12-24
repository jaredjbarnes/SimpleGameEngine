import Entity from "../../../../../src/Entity";
import Transform from "../../../../../src/components/Transform";
import Text from "../../../../../src/components/Text";
import RectangleCollider from "../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../src/components/Rectangle";
import Shape from "../../../../../src/components/Shape";
import RelativePosition from "../../../../../src/components/RelativePosition";
import SpatialPartition from "../../../../../src/components/SpatialPartition";

export default class extends Entity {
    constructor(relativeToEntityId) {
        super();
        this.type = "relative-positioned-entity";

        const transform = new Transform();
        const textTexture = new Text();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const shape = new Shape();
        const relativePosition = new RelativePosition();
        const spatialPartition = new SpatialPartition();

        relativePosition.relativeToEntityId = relativeToEntityId;
        relativePosition.position.x = 100;
        relativePosition.position.y = 100;

        textTexture.text = "R";
        textTexture.font.size = 17;
        textTexture.verticalAlignment = "middle";
        textTexture.horizontalAlignment = "center"

        rectangle.width = 30;
        rectangle.height = 30;

        transform.rotation = 45;
        transform.isDirty = true;

        shape.border.thickness = 1;
        shape.fillColor.blue = 0;
        shape.fillColor.green = 0;
        shape.fillColor.red = 255;
        shape.fillColor.alpha = 0.25
        
        shape.points.push(
            { x: 0, y: 0 },
            { x: 30, y: 0 },
            { x: 30, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );

        this.addComponent(transform);
        this.addComponent(textTexture);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(shape);
        this.addComponent(relativePosition);
        this.addComponent(spatialPartition);
    }
}