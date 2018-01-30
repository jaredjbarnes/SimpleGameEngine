export default class TextRasterizer {
    constructor(canvasFactory) {
        this.type = "text";
        this.fontCache = {};
        this.canvasFactory = canvasFactory;
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    createFontString(textTexture) {
        //font-style variant weight size family
        return `${textTexture.font.style} ${textTexture.font.variant} ${textTexture.font.weight} ${textTexture.font.size}px ${textTexture.font.family}`;
    }

    getIdentity(entity) {
        const size = entity.getComponent("size");
        const textTexture = entity.getComponent("text");

        return `size=${JSON.stringify(size)},text=${JSON.stringify(textTexture)}`;
    }

    rasterize(entity) {
        var canvas = this.canvasFactory.create();

        var size = entity.getComponent("size");
        var textTexture = entity.getComponent("text");

        var context = canvas.getContext("2d");

        canvas.width = size.width;
        canvas.height = size.height;

        context.globalAlpha = textTexture.opacity;
        context.font = this.createFontString(textTexture);
        context.textBaseline = textTexture.font.baseline;
        context.textAlign = textTexture.horizontalAlignment;

        // A little trick to get approximate height. 
        var textHeight = textTexture.font.size;
        var textWidth = context.measureText(textTexture.text).width;

        var x = 0;
        var y = 0;

        textTexture.height = textHeight;
        textTexture.width = textWidth;

        if (textTexture.horizontalAlignment === "center") {
            x = size.width / 2;
        } else if (textTexture.horizontalAlignment === "right") {
            x = size.width;
        }

        if (textTexture.verticalAlignment === "top") {
            y = 0;
        } else if (textTexture.verticalAlignment === "middle") {
            y = (size.height / 2) - (textHeight / 2);
        } else if (textTexture.verticalAlignment === "bottom") {
            y = size.height - textHeight;
        }

        var color = this.convertToRgba(textTexture.font.color);

        context.fillStyle = color;
        context.fillText(textTexture.text, parseInt(x, 10), parseInt(y, 10));

        return canvas;
    }
}