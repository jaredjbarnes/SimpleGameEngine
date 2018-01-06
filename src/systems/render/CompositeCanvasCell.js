export default class CompositeCanvasCell {

    constructor(size, offset) {
        this.canvas = document.createElement("canvas");
        this.size = size;
        this.offset = offset;

        this.canvas.width = size;
        this.canvas.height = size;
        this.context = this.canvas.getContext("2d");
        this.canvas.getContext("2d").clearRect(0, 0, size, size);
    }

    drawImage(sourceCanvas,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destinationX,
        destinationY,
        destinationWidth,
        destinationHeight) {

        var context = this.context;

        var top = Math.max(destinationY, this.offset.y);
        var left = Math.max(destinationX, this.offset.x);
        var bottom = Math.min(destinationY + destinationHeight, this.offset.y + this.size);
        var right = Math.min(destinationX + destinationWidth, this.offset.x + this.size);
        var width = right - left;
        var height = bottom - top;
        var dx = left - this.offset.x;
        var dy = top - this.offset.y;

        if (width <= 0 || height <= 0) {
            return;
        }

        if (left > destinationX) {
            sourceX += destinationWidth - width;
        }

        if (top > destinationY) {
            sourceY += destinationHeight - height;
        }

        context.drawImage(sourceCanvas,
            sourceX,
            sourceY,
            width,
            height,
            dx,
            dy,
            width,
            height);

    }

    transferImage(destinationCanvas,
        destinationX,
        destinationY,
        destinationWidth,
        destinationHeight,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight
    ) {

        var context = destinationCanvas.getContext("2d");

        var top = Math.max(this.offset.y, sourceY);
        var left = Math.max(this.offset.x, sourceX);
        var bottom = Math.min(this.offset.y + this.size, sourceY + sourceHeight);
        var right = Math.min(this.offset.x + this.size, sourceX + sourceWidth);
        var width = right - left;
        var height = bottom - top;

        if (width <= 0 || height <= 0) {
            return;
        }

        var sx = left - this.offset.x;
        var sy = top - this.offset.y;
        var dx = left - sourceX;
        var dy = top - sourceY;

        context.drawImage(
            this.canvas,
            sx,
            sy,
            width,
            height,
            dx,
            dy,
            width,
            height
        );

    }

    clearRect(x, y, width, height) {
        x = Math.max(x, this.offset.x);
        y = Math.max(y, this.offset.y);
        width = Math.min(width, this.size);
        height = Math.min(height, this.size);

        if (width <= 0 || height <= 0) {
            return;
        }

        this.context.clearRect(x, y, width, height);
    }

    getContext() {
        return this;
    }

}