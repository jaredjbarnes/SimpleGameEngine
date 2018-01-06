export default class ImageRenderer {
    constructor(doc, assetRoot) {
        this.type = "image";
        this.document = doc || document;
        this.cachedCanvases = {};
        this.loadingImages = {};
        this.sourceCanvases = {};
        this.assetRoot = assetRoot || "";
    }

    getKey(imageTexture) {
        var position = imageTexture.position;
        var size = imageTexture.size;
        var path = imageTexture.path;

        return path + "|" + position.x + "|" + position.y + "|" + size.width + "|" + size.height;
    }

    cacheCanvas(image, imageTexture) {
        var key = this.getKey(imageTexture);

        if (this.cachedCanvases[key]) {
            return;
        }

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

        this.cachedCanvases[key] = canvas;
        return canvas;
    }

    getPath(path) {
        return this.assetRoot + "/" + path;
    }

    getCanvas(imageTexture) {
        var cachedCanvases = this.cachedCanvases;
        var key = this.getKey(imageTexture);
        return cachedCanvases[key] || null;
    }

    loadImage(imageTexture) {
        var path = this.getPath(imageTexture.path);
        var image = this.sourceCanvases[path];

        if (this.loadingImages[path]) {
            return;
        }

        image = new Image();

        image.onload = () => {
            this.loadingImages[path] = false;
            this.sourceCanvases[path] = image;
            this.cacheCanvas(image, imageTexture);
        };

        this.loadingImages[path] = true;
        image.src = path;
    }

    draw(entity, canvas, position, size, offset) {
        if (canvas == null) {
            return;
        }

        var imageTexture = entity.getComponent("image");
        var imagePosition = imageTexture.position;
        var entityCanvas = this.getCanvas(imageTexture);
        var path = this.getPath(imageTexture.path);
        var imageSource = this.sourceCanvases[path];

        // If the image isn't loaded yet then load the image and draw it next call.
        if (imageSource == null) {
            this.loadImage(imageTexture);
            imageTexture.isDirty = true;
            return;
        }

        if (entityCanvas == null) {
            this.cacheCanvas(imageSource, imageTexture);
            entityCanvas = this.getCanvas(imageTexture);
        }

        imageTexture.isDirty = false;

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