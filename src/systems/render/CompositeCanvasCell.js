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

    set fillStyle(value) {
        this.context.fillStyle = value;
    }

    get fillStyle() {
        return this.context.fillStyle;
    }

    set font(value) {
        this.context.font = value;
    }

    get font() {
        return this.context.font;
    }

    set globalAlpha(value) {
        this.context.globalAlpha = value;
    }

    get globalAlpha() {
        return this.context.globalAlpha;
    }

    set globalCompositeOperation(value) {
        this.context.globalCompositeOperation = value;
    }

    get globalCompositeOperation() {
        return this.context.globalCompositeOperation;
    }

    set lineCap(value) {
        this.context.lineCap = value;
    }

    get lineCap() {
        return this.context.lineCap;
    }

    set lineDashOffset(value) {
        this.context.lineDashOffset = value;
    }

    get lineDashOffset() {
        return this.context.lineDashOffset;
    }

    set lineJoin(value) {
        this.context.lineJoin = value;
    }

    get lineJoin() {
        return this.context.lineJoin;
    }

    set lineWidth(value) {
        this.context.lineWidth = value;
    }

    get lineWidth() {
        return this.context.lineWidth;
    }

    set miterLimit(value) {
        this.context.miterLimit = value;
    }

    get miterLimit() {
        return this.context.miterLimit;
    }

    set shadowBlur(value) {
        this.context.shadowBlur = value;
    }

    get shadowBlur() {
        return this.context.shadowBlur;
    }

    set shadowColor(value) {
        this.context.shadowColor = value;
    }

    get shadowColor() {
        return this.context.ShadowColor;
    }

    set shadowOffsetX(value) {
        this.context.shadowOffsetX = value;
    }

    get shadowOffsetX() {
        return this.context.shadowOffsetX;
    }

    set shadowOffsetY(value) {
        this.context.shadowOffsetY = value;
    }

    get shadowOffsetY() {
        return this.context.shadowOffsetY;
    }

    set strokeStyle(value) {
        this.context.strokeStyle = value;
    }

    get strokeStyle() {
        return this.context.strokeStyle;
    }

    set textAlign(value) {
        this.context.textAlign = value;
    }

    get textAlign() {
        return this.context.textAlign;
    }

    set textBaseline(value) {
        this.context.textBaseline = value;
    }

    get textBaseline() {
        return this.context.textBaseline;
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

    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
        x = + this.offset.x;
        y = + this.offset.y;

        this.context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    }

    arcTo(x1, y1, x2, y2, radius) {
        x1 += this.offset.x;
        x2 += this.offset.x;

        y1 += this.offset.y;
        y2 += this.offset.y;

        this.context.arcTo(x1, y1, x2, y2, radius);
    }

    beginPath() {
        this.context.beginPath();
    }

    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        cp1x += this.offset.x;
        cp2x += this.offset.x;

        cp1y += this.offset.y;
        cp2y += this.offset.y;

        x += this.offset.x;
        y += this.offset.y;

        this.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
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

    closePath() {
        this.context.closePath();
    }

    clip() {
        this.context.clip();
    }

    fill() {
        this.context.fill.apply(this.context, arguments);
    }

    fillRect(x, y, width, height) {
        x += this.offset.x;
        y += this.offset.y;

        this.context.fillRect(x, y, width, height);
    }

    fillText(text, x, y, maxWidth) {
        x += this.offset.x;
        y += this.offset.y;

        this.context.fillText(text, x, y, maxWidth);
    }

    getContext() {
        return this;
    }

    lineTo(x, y) {
        x += this.offset.x;
        y += this.offset.y;

        this.context.lineTo(x, y);
    }

    moveTo(x, y) {
        x += this.offset.x;
        y += this.offset.y;

        this.context.lineTo(x, y);
    }

    rect(x, y, width, height) {
        x += this.offset.x;
        y += this.offset.y;

        this.context.rect(x, y, width, height);
    }

    restore() {
        this.context.restore();
    }

    save() {
        this.context.save();
    }

}