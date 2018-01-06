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
            cell[methodName].apply(cell, args);
        });
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

    clearRect() {
        this._invokeOnCells("clearRect", arguments);
    }

    getContext() {
        return this;
    }

}