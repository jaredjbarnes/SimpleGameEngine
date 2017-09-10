export default class ShapeRenderer {
    constructor(doc) {
        this.type = "shape";
        this.document = doc || document;
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
        var shapeComponent = entity.getComponent("shape");

        if (canvas == null || shapeComponent.isDirty) {
            shapeComponent.isDirty = false;
            canvas = this.createCachedVersion(entity);
        }

        return canvas;
    }

    draw(entity, canvas, position, size, offset) {
        let _entity = entity;
        let _canvas = canvas;
        let _position = position;
        let _size = size;
        let _offset = offset;

        if (_canvas == null) {
            return;
        }

        var entityCanvas = this.getCanvas(_entity);
        var context = canvas.getContext("2d");

        context.drawImage(entityCanvas,
            _offset.x,
            _offset.y,
            _size.width,
            _size.height,
            _position.x,
            _position.y,
            _size.width,
            _size.height
        );

    }
}