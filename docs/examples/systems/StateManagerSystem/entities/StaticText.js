import Entity from "../../../../../src/Entity.js";
import Transform from "../../../../../src/components/Transform.js";
import Text from "../../../../../src/components/Text.js";
import Rectangle from "../../../../../src/components/Rectangle.js";
import RectangleCollider from "../../../../../src/components/RectangleCollider.js";
import Shape from "../../../../../src/components/Shape.js";
import SolidBody from "../../../../../src/components/SolidBody.js";
import Opacity from "../../../../../src/components/Opacity.js";
import PolygonBody from "../../../../../src/components/PolygonBody.js";
import Polygon from "../../../../../src/components/Polygon.js";
import PolygonCollider from "../../../../../src/components/PolygonCollider.js";

export default class StaticText extends Entity {
    constructor(text, { x, y }, { red = 0, green = 0, blue = 0, alpha = 1 }) {
        super();
        this.type = "static-text";

        const transform = new Transform();
        const textTexture = new Text();
        const rectangle = new Rectangle();
        const rectangleCollider = new RectangleCollider();
        const shape = new Shape();
        const solidBody = new SolidBody();
        const opacity = new Opacity();
        const body = new PolygonBody();
        const polygon = new Polygon();
        const polygonCollider = new PolygonCollider();

        polygon.points.push({
            x: 0,
            y: 0
        }, {
            x: 100,
            y: 0
        }, {
            x: 100,
            y: 30
        }, {
            x: 0,
            y: 30
        });

        body.polygons.push(polygon);

        opacity.value = 1;

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
        transform.rotation = Math.floor(Math.random() * 360);
        transform.isDirty = true;

        this.addComponent(transform);
        this.addComponent(textTexture);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(shape);
        this.addComponent(opacity);
        this.addComponent(solidBody);
        this.addComponent(body);
        this.addComponent(polygonCollider);
    }
}