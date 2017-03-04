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

    draw(entity, canvas, position, size, offset) {
        if (canvas == null) {
            return;
        }

        var entityCanvas = this.getCanvas(entity);
        var context = canvas.getContext("2d");

        context.drawImage(entityCanvas,
            offset.x,
            offset.y,
            size.width,
            size.height,
            position.x,
            position.y,
            size.width,
            size.height
        );

    }
}

export = ShapeRenderer;