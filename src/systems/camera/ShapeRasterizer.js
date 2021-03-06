﻿export default class ShapeRasterizer {
    constructor() {
        this.type = "shape";
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    getIdentity(entity) {
        const shape = entity.getComponent("shape");

        if (shape.id != null) {
            return shape.id + entity.getComponent("transform").rotation;
        } else {
            const transform = entity.getComponent("transform");
            const rectangle = entity.getComponent("rectangle");
            return `${JSON.stringify(transform)}|${JSON.stringify(shape)}|${JSON.stringify(rectangle)}`;
        }
    }

    rasterize(entity) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const transform = entity.getComponent("transform");
        const rectangle = entity.getComponent("rectangle");
        const shape = entity.getComponent("shape");
        const angle = transform.rotation;
        const width = rectangle.right - rectangle.left;
        const height = rectangle.bottom - rectangle.top;
        const origin = transform.origin;

        canvas.width = width;
        canvas.height = height;

        context.translate(width / 2, height / 2);
        context.rotate(angle * Math.PI / 180);
        context.globalAlpha = shape.opacity;
        context.beginPath();

        shape.points.forEach((point, index) => {
            const x = point.x;
            const y = point.y;

            if (index === 0) {
                context.moveTo(x - origin.x, y - origin.y);
            } else {
                context.lineTo(x - origin.x, y - origin.y);
            }
        });

        context.closePath();

        if (shape.fillColor.alpha > 0) {
            context.fillStyle = this.convertToRgba(shape.fillColor);
            context.fill();
        }

        if (shape.border.thickness > 0) {
            context.lineWidth = shape.border.thickness;
            context.strokeStyle = this.convertToRgba(shape.border.color);
            context.stroke();
        }

        return canvas;
    }
}