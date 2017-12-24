export default class LineRenderer {
    constructor(doc) {
        this.type = "line";
        this.document = doc || document;
        this.lineCache = {};
    }

    convertToRgba(color) {
        return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
    }

    entityAdded(entity) {
        this.createCachedVersion(entity);
    }

    entityRemoved(entity) {
        delete this.lineCache[entity.id];
    }

    createCachedVersion(entity) {
        var document = this.document;
        var canvas = document.createElement("canvas");

        var size = entity.getComponent("size");
        var line = entity.getComponent("line");
        var position = entity.getComponent("position");
        var context = canvas.getContext("2d");

        canvas.width = size.width;
        canvas.height = size.height;

        if (line.thickness > 0) {
            context.beginPath();
            context.lineCap = "round";
            context.lineWidth = line.thickness;
            context.strokeStyle = this.convertToRgba(line.color);
            context.moveTo(line.from.x, line.from.y);
            context.lineTo(line.to.x, line.to.y);
            context.stroke();
            context.closePath();
        }

        this.lineCache[entity.id] = canvas;

        return canvas;
    }

    getCanvas(entity) {
        var canvas = this.lineCache[entity.id];
        var lineComponent = entity.getComponent("line");

        if (canvas == null || lineComponent.isDirty) {
            lineComponent.isDirty = false;
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