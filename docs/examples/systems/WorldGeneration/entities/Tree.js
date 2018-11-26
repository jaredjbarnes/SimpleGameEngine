import Entity from "../../../../../src/Entity";
import Transform from "../../../../../src/components/Transform";
import RectangleCollider from "../../../../../src/components/RectangleCollider";
import Rectangle from "../../../../../src/components/Rectangle";
import Image from "../../../../../src/components/Image";
import PolygonBody from "../../../../../src/components/PolygonBody";
import Polygon from "../../../../../src/components/Polygon";
import PolygonCollider from "../../../../../src/components/PolygonCollider";
import ZIndex from "../../../../../src/components/ZIndex";
import SolidBody from "../../../../../src/components/SolidBody";

export default class Tree extends Entity {
    constructor() {
        super();
        this.type = "tree";

        const transform = new Transform();
        const rectangleCollider = new RectangleCollider();
        const rectangle = new Rectangle();
        const image = new Image();
        const zIndex = new ZIndex();
        const body = new PolygonBody();
        const polygon = new Polygon();
        const polygonCollider = new PolygonCollider();
        const solidBody = new SolidBody();

        polygon.points.push({
            x: 20,
            y: 32
        }, {
            x: 42,
            y: 32
        }, {
            x: 50,
            y: 46
        }, {
            x: 50,
            y: 60
        }, {
            x: 38,
            y: 65
        }, {
            x: 24,
            y: 65
        }, {
            x: 13,
            y: 60
        }, {
            x: 10,
            y: 46
        });

        body.polygons.push(polygon);

        zIndex.value = 2;

        image.url = `assets/tree.png`;
        image.id = `assets/tree.png`;
        image.size.width = 64;
        image.size.height = 80;

        rectangle.width = 64;
        rectangle.height = 80;

        this.addComponent(transform);
        this.addComponent(rectangle);
        this.addComponent(rectangleCollider);
        this.addComponent(image);
        this.addComponent(polygonCollider);
        this.addComponent(solidBody);
        this.addComponent(body);
        this.addComponent(zIndex);
    }
}