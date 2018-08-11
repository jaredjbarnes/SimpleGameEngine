import overlay from "../../utilities/overlay";

const defaultColors = {
    rotatedPoints: "rgba(255, 0, 0, 1)",
    normals: "rgba(80, 80, 220, 1)",
    center: "rgba(80, 255, 80, 1)",
    size: "rgba(255, 0, 0, 1)",
    penetration: "rgba(80, 255, 80, 1)"
};

export default class PolygonRasterizer {
    constructor({ canvasFactory, colors }) {
        this.type = "polygon-body";
        this.canvasFactory = canvasFactory;
        this.colors = overlay(defaultColors, colors);
    }

    getIdentity(entity) {
        return `polygon-${entity.id}`;
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();
        const context = canvas.getContext("2d");

        const polygonBody = entity.getComponent("polygon-body");
        const polygonCollider = entity.getComponent("polygon-collider");

        polygonBody.polygons.forEach((polygon) => {
            const width = polygon.size.width;
            const height = polygon.size.height;
            const normalsLineSize = Math.max(width, height) * 2;

            canvas.width = width;
            canvas.height = height;

            context.translate(width / 2, height / 2);
            context.beginPath();

            polygon.rotatedPoints.forEach((point, index) => {
                const x = point.x;
                const y = point.y;

                if (index === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            });

            context.lineWidth = 1;
            context.strokeStyle = this.colors.rotatedPoints;
            context.stroke();
            context.closePath();

            context.beginPath();
            polygon.normals.forEach((point, index) => {
                const x = point.x * normalsLineSize;
                const y = point.y * normalsLineSize;

                context.moveTo(0, 0);
                context.lineTo(x, y);

            });

            context.lineWidth = 1;
            context.strokeStyle = this.colors.normals;
            context.stroke();
            context.closePath();

            if (polygonCollider != null) {
                context.beginPath();

                for (let key in polygonCollider.collisions) {
                    const collision = polygonCollider.collisions[key];
                    context.moveTo(0, 0);
                    context.lineTo(collision.penetration.x, collision.penetration.y);
                }

                context.lineWidth = 2;
                context.strokeStyle = this.colors.penetration;
                context.stroke();
            }

        });

        return canvas;
    }
}