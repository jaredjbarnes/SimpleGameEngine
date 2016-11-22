import Size = require("./../../components/Size");

class ImageRenderer {
    type: string;
    document: HTMLDocument;
    cachedCanvases: any;
    sourceCanvases: any;

    constructor(document) {
        this.type = "image-texture";
        this.document = document;
        this.cachedCanvases = {};
        this.sourceCanvases = {};
    }

    cacheCanvasBySize(path, referenceCanvas, size) {
        var document = this.document;
        var sizes = this.cachedCanvases[path];
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");

        if (sizes == null) {
            sizes = {};
        }

        canvas.width = size.width;
        canvas.height = size.height;

        context.drawImage(
            referenceCanvas,
            0,
            0,
            referenceCanvas.width,
            referenceCanvas.height,
            0,
            0,
            size.width,
            size.height
        );

        sizes[size.width + "|" + size.height] = canvas;
    }

    createCanvasByImage(image, imageTexture) {
        var document = this.document;
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var size = imageTexture.size;
        var padding = imageTexture.padding;
        var position = imageTexture.position;
        var width = size.width + padding.left + padding.right;
        var height = size.height + padding.top + padding.bottom;

        canvas.width = width;
        canvas.height = height;

        context.drawImage(
            image,
            position.x,
            position.y,
            size.width,
            size.height,
            padding.left,
            padding.top,
            size.width,
            size.height
        );

        return canvas;
    }

    getCanvas(imageTexture, size) {
        var cachedCanvases = this.cachedCanvases;
        var path = imageTexture.path;
        var sizeKey = size.width + "|" + size.height;

        if (cachedCanvases[path] && cachedCanvases[path][sizeKey]) {
            return cachedCanvases[path][sizeKey];
        }

        return null;
    }

    loadImageBySize(imageTexture, size) {
        var path = imageTexture.path;
        var sourceCanvas = this.sourceCanvases[path];

        if (sourceCanvas != null) {
            this.cacheCanvasBySize(path, sourceCanvas, size);
            return;
        }

        var image = new Image();

        image.onload = function () {
            var canvas = this.createCanvasByImage(image, imageTexture);
            this.sourceCanvases[path] = canvas;
            this.cacheCanvasBySize(path, canvas, size);
        };

        image.src = path;
    }

    draw(entity, canvas) {
        if (canvas == null) {
            return;
        }

        var imageTexture = entity.getProperty("image-texture");
        var size = entity.getProperty("size");
        var position = entity.getComponent("position");
        var entityCanvas = this.getCanvas(imageTexture, size);

        // If it isn't loaded yet then load the image and draw it next call.
        if (entityCanvas == null) {
            this.loadImageBySize(imageTexture, size);
            return;
        }

        var context = canvas.getContext("2d");
        var right = canvas.width;
        var bottom = canvas.height;
        var x = position.x;
        var y = position.y;
        var sourceX = 0;
        var sourceY = 0;
        var width = entityCanvas.width;
        var height = entityCanvas.height;
        var entityRight = position.x + entityCanvas.width;
        var entityBottom = position.y + entityCanvas.height;
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