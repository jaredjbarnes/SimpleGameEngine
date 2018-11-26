import Entity from "../../../../../src/Entity";
import Transform from "../../../../../src/components/Transform";
import Text from "../../../../../src/components/Text";
import RectangleCollider from "../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../src/components/Rectangle";
import PlayerController from "../components/PlayerController";
import Movable from "../../../../../src/components/Movable";
import Shape from "../../../../../src/components/Shape";
import SolidBody from "../../../../../src/components/SolidBody";
import PolygonBody from "../../../../../src/components/PolygonBody";
import Polygon from "../../../../../src/components/Polygon";
import PolygonCollider from "../../../../../src/components/PolygonCollider";
import ZIndex from "../../../../../src/components/ZIndex";

export default class extends Entity {
    constructor(text) {
        super();
        this.type = "player";

        const transform = new Transform();
        const textTexture = new Text();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const playerController = new PlayerController();
        const movable = new Movable();
        const shape = new Shape();
        const solidBody = new SolidBody();
        const body = new PolygonBody();
        const polygon = new Polygon();
        const polygonCollider = new PolygonCollider();
        const zIndex = new ZIndex();

        zIndex.value = 2;

        polygon.points.push({
            x: 0,
            y: 0
        },{
            x: 30,
            y: 0
        },{
            x: 30,
            y: 30
        },{
            x: 0,
            y: 30
        });

        body.polygons.push(polygon);

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
        //shape.fillColor.alpha = 0.25
        
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
        this.addComponent(playerController);
        this.addComponent(movable);
        this.addComponent(shape);
        this.addComponent(solidBody);
        this.addComponent(body);
        this.addComponent(polygonCollider);
        this.addComponent(zIndex);
    }
}