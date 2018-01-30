export default class ShapeRenderer {
    constructor(canvasFactory) {
        this.type = "shape";
        this.canvasFactory = canvasFactory;
        this.shapeCache = {};
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    getIdentity(entity){
        const size = entity.getComponent("size");
        const shape = entity.getComponent("shape");
        const points = shape.points.reduce((accumulator, point)=>{
            return accumulator += `(${point.x},${point.y})`;
        }, "");

        return `(${size.width},${size.height})_${points}`;
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
            const x = point.x * size.width;
            const y = point.y * size.height;

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