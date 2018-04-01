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
        this.corners[0].x = -this.transform.origin.x;
        this.corners[0].y = -this.transform.origin.y;

        this.corners[1].x = this.rectangle.width - this.transform.origin.x;
        this.corners[1].y = -this.transform.origin.y;

        this.corners[2].x = this.rectangle.width - this.transform.origin.x;
        this.corners[2].y = this.rectangle.height - this.transform.origin.y;

        this.corners[3].x = -this.transform.origin.x;
        this.corners[3].y = this.rectangle.height - this.transform.origin.y;
    }

    updateBoundingRectangle() {
        const corners = this.corners;
        const angle = this.transform.rotation;
        const rotatedPoint = this.rotatedPoint;
        const origin = this.transform.origin;
        const position = this.transform.position;
        const transformedPoint = this.transformedPoint;
        const min = this.min;
        const max = this.max;

        min.x = max.x = transformedPoint.x = position.x;
        min.y = max.y = transformedPoint.y = position.y;

        for (let x = 0; x < corners.length; x++) {
            Vector.rotate(corners[x], angle, rotatedPoint);
            min.x = Math.min(transformedPoint.x + rotatedPoint.x, min.x);
            min.y = Math.min(transformedPoint.y + rotatedPoint.y, min.y);
            max.x = Math.max(transformedPoint.x + rotatedPoint.x, max.x);
            max.y = Math.max(transformedPoint.y + rotatedPoint.y, max.y);
        }

        this.rectangle.top = Math.floor(min.y);
        this.rectangle.left = Math.floor(min.x);
        this.rectangle.bottom = Math.floor(max.y);
        this.rectangle.right = Math.floor(max.x);
    }

    updateOrigin() {
        this.transform.origin.x = this.rectangle.width / 2;
        this.transform.origin.y = this.rectangle.height / 2;
    }
}