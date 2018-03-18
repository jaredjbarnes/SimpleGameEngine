import Vector from "../../Vector";

export default class PolygonUpdater {

    constructor() {
        this.entity = null;
        this.transform = null;
        this.polygon = null;
        this.transformedPoint = {
            x: 0,
            y: 0
        };
    }

    ensureClosedPolygon() {
        const points = this.polygon.points;
        const firstPoint = points[0];
        const lastPoint = points[points.length - 1];

        if (firstPoint.x !== lastPoint.x || firstPoint.y !== lastPoint.y) {
            points.push(firstPoint);
        }
    }

    prepareRotatedPoints() {
        const rotatedPoints = this.polygon.rotatedPoints;
        const points = this.polygon.points;

        if (rotatedPoints.length !== points.length) {
            rotatedPoints.length = 0;

            for (let x = 0; x < points.length; x++) {
                rotatedPoints.push({
                    x: 0,
                    y: 0
                });
            }
        }
    }

    prepareVertices() {
        const points = this.polygon.points;
        const vertices = this.polygon.vertices;

        if (vertices.length !== points.length) {
            vertices.length = 0;

            for (let x = 0; x < points.length; x++) {
                vertices.push({
                    x: 0,
                    y: 0
                });
            }
        }
    }

    prepareWorldPoints() {
        const worldPoints = this.polygon.worldPoints;
        const points = this.polygon.rotatedPoints;

        if (worldPoints.length !== points.length) {
            worldPoints.length = 0;

            for (let x = 0; x < points.length; x++) {
                worldPoints.push({
                    x: 0,
                    y: 0
                });
            }
        }
    }

    setEntity(entity) {
        this.entity = entity;
        this.transform = entity.getComponent("transform");
    }

    setPolygon(polygon) {
        this.polygon = polygon;
    }

    update() {
        this.ensureClosedPolygon();
        this.updateRotatedPoints();
        this.updateWorldPoints();
        this.updateVertices();
        this.updateNormals();
        this.updateSize();
    }

    updateNormals() {
        const normals = this.polygon.normals;
        const vertices = this.polygon.vertices;

        for (let x = 0; x < vertices.length; x++) {
            const vertex = vertices[x];
            const normal = normals[x];

            Vector.normalize(Vector.getLeftNormal(vertex, normal), normal);
        }
    }

    updateRotatedPoints() {
        this.prepareRotatedPoints();
        const transform = this.transform;
        const polygon = this.polygon;

        if (transform.rotation !== polygon.rotation) {
            polygon.rotation = transform.rotation;

            const points = polygon.points;
            const rotatedPoints = polygon.rotatedPoints;
            const angle = transform.rotation;
            const origin = transform.origin;

            for (let x = 0; x < points; x++) {
                const point = points[x];
                this.transformedPoint.x = point.x - origin.x;
                this.transformedPoint.y = point.y - origin.y;

                const rotatedPoint = rotatedPoints[x];

                Vector.rotate(this.transformedPoint, angle, rotatedPoint);
            }
        }
    }

    updateSize() {
        const polygon = this.polygon;
        const points = polygon.points;
        const length = points.length;

        let top = points[0].y;
        let left = points[0].x;
        let bottom = points[0].y;
        let right = points[0].x;

        for (let x = 1; x < length; x++) {
            top = Math.min(top, points[x].y);
            left = Math.min(left, points[x].x);
            bottom = Math.max(bottom, points[x].y);
            right = Math.max(right, points[x].x);
        }

        const width = right - left;
        const height = bottom - top;

        polygon.size.width = width;
        polygon.size.height = height;

        polygon.center.x = left + this.transform.position.x + (width / 2);
        polygon.center.y = top + this.transform.position.y + (height / 2);
    }

    updateVertices() {
        this.prepareVertices();

        const rotation = this.transform.rotation;
        const points = this.polygon.rotatedPoints;
        const vertices = this.vertices;

        for (let x = 0; x < points; x++) {
            const point = points[x];
            const vertex = this.vertices[x];

            const nextPoint = points[x + 1] || points[0];

            vertex.x = point.x - nextPoint.x;
            vertex.y = point.y - nextPoint.y;
        }

    }

    updateWorldPoints() {
        const position = this.transform.position;
        const rotatedPoints = this.polygon.rotatedPoints;
        const worldPoints = this.polygon.worldPoints;

        for (let x = 0; x < worldPoints.length; x++) {
            worldPoints[x].x = rotatedPoints[x].x + position.x;
            worldPoints[x].y = rotatedPoints[x].y + position.y;
        }
    }

}