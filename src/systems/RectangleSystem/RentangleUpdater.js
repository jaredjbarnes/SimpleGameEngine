import Vector from "../../Vector";

export default class RectangleUpdater {
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

        for (let x = 0; x < corners.length; x++) {
            transformedPoint.x = corners[x].x -= origin.x;
            transformedPoint.y = corners[x].x -= origin.y;

            Vector.rotate(transformedPoint, angle, rotatedPoint);

            if (rotatedPoint.x > max.x) {
                max.x = rotatedPoint.x;
            }

            if (rotatedPoint.x < min.x) {
                min.x = rotatedPoint.x;
            }

            if (rotatedPoint.y > max.y) {
                max.y = rotatedPoint.y;
            }

            if (rotatedPoint.y < min.y) {
                min.y = rotatedPoint.y;
            }
        }

        this.rectangle.top = min.y;
        this.rectangle.left = min.x;
        this.rectangle.bottom = max.y;
        this.rectangle.right = max.x;
        this.rectangle.isDirty = false;
        this.transform.isDirty = false;
    }

    updateOrigin() {
        this.transform.origin.x = this.rectangle.width / 2;
        this.transform.origin.y = this.rectangle.height / 2;
    }
}