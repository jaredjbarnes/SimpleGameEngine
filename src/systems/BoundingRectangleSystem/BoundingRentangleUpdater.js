import Vector from "../../Vector";

export default class BoundingRectangleUpdater {
    constructor() {
        this.entity = null;
        this.rectangle = null;
        this.corners = [{
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }, {
            x: 0,
            y: 0
        }];

        this.rotatedPoint = {
            x: 0,
            y: 0
        };

        this.min = {
            x: 0,
            y: 0
        };

        this.max = {
            x: 0,
            y: 0
        };

        this.transformedPoint = {
            x: 0,
            y: 0
        };
    }

    setEntity(_entity) {
        this.entity = _entity;
        this.rectangle = this.entity.getComponent("rectangle");
        this.transform = this.entity.getComponent("transform");
    }

    update() {
        this.updateOrigin();
        this.updateCorners();
        this.updateBoundingRectangle();
    }

    updateCorners() {
        this.corners[0].x = 0;
        this.corners[0].y = 0;

        this.corners[1].x = this.rectangle.width;
        this.corners[1].y = 0;

        this.corners[2].x = this.rectangle.width;
        this.corners[2].y = this.rectangle.height;

        this.corners[3].x = 0;
        this.corners[3].y = this.rectangle.height;
    }

    updateBoundingRectangle() {
        const corners = this.corners;
        const angle = this.transform.rotation;
        const rotatedPoint = this.rotatedPoint;
        const origin = this.transform.origin;
        const transformedPoint = this.transformedPoint;
        const min = this.min;
        const max = this.max;

        this.rectangle.top = this.transform.position.y;
        this.rectangle.left = this.transform.position.x;
        this.rectangle.bottom = this.transform.position.y + this.rectangle.height;
        this.rectangle.right = this.transform.position.x + this.rectangle.width;
    }

    updateOrigin() {
        this.transform.origin.x = this.rectangle.width / 2;
        this.transform.origin.y = this.rectangle.height / 2;
    }
}