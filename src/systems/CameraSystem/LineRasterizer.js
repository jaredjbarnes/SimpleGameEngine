export default class LineRenderer {
    constructor(canvasFactory) {
        this.type = "line";
        this.canvasFactory = canvasFactory;
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    getIdentity(entity) {
        const size = entity.getComponent("size");
        const line = entity.getComponent("line");

        return `size=${JSON.stringify(size)}, line=${JSON.stringify(line)}`;
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();

        const transform= entity.getComponent("transform");
        const line = entity.getComponent("line");
        const context = canvas.getContext("2d");

        const size = transform.size;
        const position = transform.position;

        canvas.width = size.width;
        canvas.height = size.height;

        if (line.thickness > 0) {
            context.globalAlpha = line.opacity;
            context.beginPath();
            context.lineCap = "round";
            context.lineWidth = line.thickness;
            context.strokeStyle = this.convertToRgba(line.color);
            context.moveTo(line.from.x, line.from.y);
            context.lineTo(line.to.x, line.to.y);
            context.stroke();
            context.closePath();
        }

        return canvas;
    }

}