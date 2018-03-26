import Entity from "./../../../../../src/Entity";
import Transform from "./../../../../../src/components/Transform";
import Text from "./../../../../../src/components/Text";
import Rectangle from "./../../../../../src/components/Rectangle";
import RectangleCollider from "./../../../../../src/components/RectangleCollider";
import Polygon from "./../../../../../src/components/Polygon";
import PolygonCollider from "./../../../../../src/components/PolygonCollider";
import Shape from "./../../../../../src/components/Shape";
import SolidBody from "./../../../../../src/components/SolidBody";
import Opacity from "../../../../../src/components/Opacity";

export default class StaticText extends Entity {
    constructor(text, { x, y }, { red = 0, green = 0, blue = 0, alpha = 1 }) {
        super();
        this.type = "static-text";

        const transform = new Transform();
        const textTexture = new Text();
        const rectangle = new Rectangle();
        const rectangleCollider = new RectangleCollider();
        const polygon = new Polygon();
        const polygonCollider = new PolygonCollider();
        const shape = new Shape();
        const solidBody = new SolidBody();
        const opacity = new Opacity();

        opacity.value = Math.random();

        shape.border.thickness = 1;
        shape.fillColor.red = red;
        shape.fillColor.green = green;
        shape.fillColor.blue = blue;
        shape.points.push(
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 30 },
            { x: 0, y: 30 },
            { x: 0, y: 0 }
        );
        shape.id = `${JSON.stringify(transform)}|${JSON.stringify(shape)}|${JSON.stringify(rectangle)}`;

        textTexture.text = text;
        textTexture.font.size = 17;
        textTexture.horizontalAlignment = "center";
        textTexture.verticalAlignment = "middle";

        rectangle.width = 100;
        rectangle.height = 30;
        transform.position.x = x;
        transform.position.y = y;

        transform.rotation = 13;
        transform.isDirty = true;

        polygon.points.push(
            { x: 0, y: 0 },
            { x: 100, y: 0 },
            { x: 100, y: 30 },
            { x: 0, y: 30 }
        );

        this.addComponent(transform);
        this.addComponent(textTexture);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(polygon);
        this.addComponent(polygonCollider);
        this.addComponent(shape);
        this.addComponent(opacity);
    }
}