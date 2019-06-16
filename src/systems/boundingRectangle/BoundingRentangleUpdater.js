import Vector from "../../Vector.js";

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

        this.origin = {
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
        this.origin = this.transform.origin;
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
        const position = this.transform.position;
        const min = this.min;
        const max = this.max;

        min.x = max.x = position.x;
        min.y = max.y = position.y;

        for (let x = 0; x < corners.length; x++) {
            Vector.rotate(corners[x], angle, rotatedPoint);
            min.x = Math.min(position.x - rotatedPoint.x, min.x);
            min.y = Math.min(position.y - rotatedPoint.y, min.y);
            max.x = Math.max(position.x - rotatedPoint.x, max.x);
            max.y = Math.max(position.y - rotatedPoint.y, max.y);
        }

        this.rectangle.top = Math.floor(min.y);
        this.rectangle.left = Math.floor(min.x);
        this.rectangle.bottom = Math.ceil(max.y);
        this.rectangle.right = Math.ceil(max.x);
        this.rectangle.transformedWidth = this.rectangle.right - this.rectangle.left;
        this.rectangle.transformedHeight = this.rectangle.bottom - this.rectangle.top;
    }

    updateOrigin() {
        this.transform.origin.x = Math.floor(this.rectangle.width / 2);
        this.transform.origin.y = Math.floor(this.rectangle.height / 2);
    }
}