﻿export default class TextRasterizer {
    constructor() {
        this.type = "text";
        this.fontCache = {};
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    createFontString(textTexture) {
        //font-style variant weight size family
        return `${textTexture.font.style} ${textTexture.font.variant} ${textTexture.font.weight} ${textTexture.font.size}px ${textTexture.font.family}`;
    }

    getIdentity(entity) {
        const textTexture = entity.getComponent("text");
        const rectangle = entity.getComponent("rectangle");

        return `text=${JSON.stringify(textTexture)}|${rectangle.width}|${rectangle.height}}`;
    }

    rasterize(entity) {
        const canvas = document.createElement("canvas");

        const transform = entity.getComponent("transform");
        const rectangle = entity.getComponent("rectangle");
        const textTexture = entity.getComponent("text");
        const context = canvas.getContext("2d");

        const angle = transform.rotation;
        const width = rectangle.right - rectangle.left;
        const height = rectangle.bottom - rectangle.top;

        canvas.width = width;
        canvas.height = height;

        context.translate(width / 2, height / 2);
        context.rotate(angle * Math.PI / 180);

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

        if (textTexture.horizontalAlignment === "left") {
            x = -width / 2;
        } else if (textTexture.horizontalAlignment === "right") {
            x = width / 2;
        }

        if (textTexture.verticalAlignment === "top") {
            y = -textHeight / 2;
        } else if (textTexture.verticalAlignment === "bottom") {
            y = textHeight / 2;
        }

        var color = this.convertToRgba(textTexture.font.color);

        context.fillStyle = color;
        context.fillText(textTexture.text, parseInt(x, 10), parseInt(y - (textHeight / 2), 10));

        return canvas;
    }
}