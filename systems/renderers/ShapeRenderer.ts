class ShapeRenderer {
    type: string;
    document: HTMLDocument;
    shapeCache: any;

    constructor(document) {
        this.type = "shape";
        this.document = document;
        this.shapeCache = {};
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    entityAdded(entity) {
        this.createCachedVersion(entity);
    }

    entityRemoved(entity) {
        delete this.shapeCache[entity.id];
    }

    createCachedVersion(entity) {
        var document = this.document;
        var canvas = document.createElement("canvas");

        var size = entity.getComponent("size");
        var shape = entity.getComponent("shape");

        var context = canvas.getContext("2d");

        canvas.width = size.width;
        canvas.height = size.height;

        context.beginPath();

        shape.points.forEach(function (point, index) {
            var x = point.x * size.width;
            var y = point.y * size.height;

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

        this.shapeCache[entity.id] = canvas;

        return canvas;
    }

    getCanvas(entity) {
        var canvas = this.shapeCache[entity.id];

        if (canvas == null) {
            canvas = this.createCachedVersion(entity);
        }

        return canvas;
    }

    draw(entity, canvas, cameraPosition) {
        if (canvas == null) {
            return;
        }

        var entityCanvas = this.getCanvas(entity);
        var position = entity.getComponent("position");
        var context = canvas.getContext("2d");
        var right = canvas.width;
        var bottom = canvas.height;
        var x = position.x - cameraPosition.x;
        var y = position.y - cameraPosition.y;
        var sourceX = 0;
        var sourceY = 0;
        var width = entityCanvas.width;
        var height = entityCanvas.height;
        var entityRight = x + entityCanvas.width;
        var entityBottom = y + entityCanvas.height;
        var difference;

        if (entityRight > right) {
            difference = entityRight - right;
            width -= difference;
        }

        if (entityBottom > bottom) {
            difference = entityBottom - bottom;
            height -= difference;
        }

        if (x < 0) {
            sourceX -= x;
            width += x;
            x = 0;
        }

        if (y < 0) {
            sourceY -= y;
            height += y;
            y = 0;
        }

        if (width === 0 || height === 0) {
            return;
        }

        context.drawImage(entityCanvas,
            Math.floor(sourceX),
            Math.floor(sourceY),
            Math.floor(width),
            Math.floor(height),
            Math.floor(x),
            Math.floor(y),
            Math.floor(width),
            Math.floor(height)
        );

    }
}

export = ShapeRenderer;