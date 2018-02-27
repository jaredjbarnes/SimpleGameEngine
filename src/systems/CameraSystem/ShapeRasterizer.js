import stringify from "../../utilities/stringify";

export default class ShapeRasterizer {
    constructor(canvasFactory) {
        this.type = "shape";
        this.canvasFactory = canvasFactory;
        this.shapeCache = {};
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    getIdentity(entity) {
        const size = entity.getComponent("size");
        const shape = entity.getComponent("shape");

        //return `${stringify(size)}|${stringify(shape)}`;
        return this.convertToRgba(shape.fillColor);
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();

        const size = entity.getComponent("size");
        const shape = entity.getComponent("shape");

        const context = canvas.getContext("2d");

        canvas.width = size.width;
        canvas.height = size.height;

        context.globalAlpha = shape.opacity;
        context.beginPath();

        shape.points.forEach(function (point, index) {
            const x = point.x;
            const y = point.y;

            if (index === 0) {
                context.moveTo(x, y);
            } else {
                context.lineTo(x, y);
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