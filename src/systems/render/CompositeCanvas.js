import CompositeCanvasCell from "./CompositeCanvasCell";

const MAX_CELL_SIZE = 1000;

export default class CompositeCanvas {
    constructor(width, height, cellSize) {
        this._cells = [];
        this.width = width;
        this.height = height;
        this._cellSize = cellSize == null || cellSize > MAX_CELL_SIZE ? MAX_CELL_SIZE : cellSize;
        this._buildCanvases();
    }

    _buildCanvases() {
        var offset;

        for (var x = 0; x * this._cellSize < this.width; x++) {
            for (var y = 0; y * this._cellSize < this.height; y++) {
                offset = {
                    x: x * this._cellSize,
                    y: y * this._cellSize
                };
                this._cells.push(new CompositeCanvasCell(this._cellSize, offset));
            }
        }
    }

    _invokeOnCells(methodName, args) {
        this._cells.forEach((cell) => {
            cell[methodName].apply(methodName, args);
        });
    }

    _setPropertyOnCells(property, value) {
        this._cells.forEach((cell) => {
            cell[property] = value;
        });
    }

    set fillStyle(value) {
        this._setPropertyOnCells("fillStyle", value);
    }

    get fillStyle() {
        return this._cells[0].fillStyle;
    }

    set font(value) {
        this._setPropertyOnCells("font", value);
    }

    get font() {
        return this._cells[0].font;
    }

    set globalAlpha(value) {
        this._setPropertyOnCells("globalAlpha", value);
    }

    get globalAlpha() {
        return this._cells[0].globalAlpha;
    }

    set globalCompositeOperation(value) {
        this._setPropertyOnCells("globalCompositeOperation", value);
    }

    get globalCompositeOperation() {
        return this._cells[0].globalAlpha;
    }

    set lineCap(value) {
        this._setPropertyOnCells("lineCap", value);
    }

    get lineCap() {
        return this._cells[0].lineCap;
    }

    set lineDashOffset(value) {
        this._setPropertyOnCells("lineDashOffset", value);
    }

    get lineDashOffset() {
        return this._cells[0].lineDashOffset;
    }

    set lineJoin(value) {
        this._setPropertyOnCells("lineJoin", value);
    }

    get lineJoin() {
        return this._cells[0].lineJoin;
    }

    set lineWidth(value) {
        this._setPropertyOnCells("lineWidth", value);
    }

    get lineWidth() {
        return this._cells[0].lineWidth;
    }

    set miterLimit(value) {
        this._setPropertyOnCells("miterLimit", value);
    }

    get miterLimit() {
        return this._cells[0].miterLimit;
    }

    set shadowBlur(value) {
        this._setPropertyOnCells("shadowBlur", value);
    }

    get shadowBlur() {
        return this._cells[0].shadowBlur;
    }

    set shadowColor(value) {
        this._setPropertyOnCells("shadowColor", value);
    }

    get shadowColor() {
        return this._cells[0].shadowColor;
    }

    set shadowOffsetX(value) {
        this._setPropertyOnCells("shadowOffsetX", value);
    }

    get shadowOffsetX() {
        return this._cells[0].shadowOffsetX;
    }

    set shadowOffsetY(value) {
        this._setPropertyOnCells("shadowOffsetY", value);
    }

    get shadowOffsetY() {
        return this._cells[0].shadowOffsetY;
    }

    set strokeStyle(value) {
        this._setPropertyOnCells("strokeStyle", value);
    }

    get strokeStyle() {
        return this._cells[0].strokeStyle;
    }

    set textAlign(value) {
        this._setPropertyOnCells("textAlign", value);
    }

    get textAlign() {
        return this._cells[0].textAlign;
    }

    set textBaseline(value) {
        this._setPropertyOnCells("textBaseline", value);
    }

    get textBaseline() {
        return this._cells[0].textBaseline;
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

        this._cells.forEach((canvas) => {
            canvas.drawImage(sourceCanvas, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight);
        });

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
        this._cells.forEach((canvas) => {
            canvas.transferImage(destinationCanvas, destinationX, destinationY, destinationWidth, destinationHeight, sourceX, sourceY, sourceWidth, sourceHeight);
        });
    }

    arc() {
        this._invokeOnCells("arc", arguments);
    }

    arcTo() {
        this._invokeOnCells("arcTo", arguments);
    }

    beginPath() {
        this._invokeOnCells("beginPath", arguments);
    }

    bezierCurveTo() {
        this._invokeOnCells("bezierCurveTo", arguments);
    }

    clearRect() {
        this._invokeOnCells("clearRect", arguments);
    }

    closePath() {
        this._invokeOnCells("closePath", arguments);
    }

    clip() {
        this._invokeOnCells("clip", arguments);
    }

    fill() {
        this._invokeOnCells("fill", arguments);
    }

    fillRect() {
        this._invokeOnCells("fillRect", arguments);
    }

    fillText() {
        this._invokeOnCells("fillText", arguments);
    }

    getContext() {
        return this;
    }

    lineTo() {
        this._invokeOnCells("lineTo", arguments);
    }

    moveTo() {
        this._invokeOnCells("moveTo", arguments);
    }

    rect() {
        this._invokeOnCells("rect", arguments);
    }

    restore() {
        this._invokeOnCells("restore", arguments);
    }

    save() {
        this._invokeOnCells("save", arguments);
    }

}