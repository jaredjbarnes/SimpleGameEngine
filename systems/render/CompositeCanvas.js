define(["require", "exports"], function (require, exports) {
    "use strict";
    const MAX_CELL_SIZE = 1000;
    class CompositeCanvasCell {
        constructor(size, offset) {
            this.canvas = document.createElement("canvas");
            this.size = size;
            this.offset = offset;
            this.canvas.width = size;
            this.canvas.height = size;
            this.canvas.getContext("2d").clearRect(0, 0, size, size);
        }
        drawImage(sourceCanvas, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight) {
            var context = this.canvas.getContext("2d");
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
                sourceX += left - destinationX;
            }
            if (top > destinationY) {
                sourceY += top - destinationY;
            }
            context.drawImage(sourceCanvas, sourceX, sourceY, width, height, dx, dy, width, height);
        }
        transferImage(destinationCanvas, destinationX, destinationY, destinationWidth, destinationHeight, sourceX, sourceY, sourceWidth, sourceHeight) {
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
            context.drawImage(this.canvas, sx, sy, width, height, dx, dy, width, height);
        }
        clearRect(x, y, width, height) {
            x = Math.max(x, this.offset.x);
            y = Math.max(y, this.offset.y);
            width = Math.min(width, this.size);
            height = Math.min(height, this.size);
        }
    }
    class CompositeCanvas {
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
        drawImage(sourceCanvas, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight) {
            this._cells.forEach((canvas) => {
                canvas.drawImage(sourceCanvas, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight);
            });
        }
        transferImage(destinationCanvas, destinationX, destinationY, destinationWidth, destinationHeight, sourceX, sourceY, sourceWidth, sourceHeight) {
            this._cells.forEach((canvas) => {
                canvas.transferImage(destinationCanvas, destinationX, destinationY, destinationWidth, destinationHeight, sourceX, sourceY, sourceWidth, sourceHeight);
            });
        }
        clearRect(x, y, width, height) {
            this._cells.forEach((cell) => {
                cell.clearRect(x, y, width, height);
            });
        }
        getContext() {
            return this;
        }
    }
    return CompositeCanvas;
});
//# sourceMappingURL=CompositeCanvas.js.map