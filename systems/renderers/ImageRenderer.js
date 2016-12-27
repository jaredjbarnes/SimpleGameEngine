define(["require", "exports"], function (require, exports) {
    "use strict";
    class ImageRenderer {
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
            context.drawImage(referenceCanvas, 0, 0, referenceCanvas.width, referenceCanvas.height, 0, 0, size.width, size.height);
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
            context.drawImage(image, position.x, position.y, size.width, size.height, padding.left, padding.top, size.width, size.height);
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
        draw(entity, canvas, position, size, offset) {
            if (canvas == null) {
                return;
            }
            var imageTexture = entity.getProperty("image-texture");
            var entityCanvas = this.getCanvas(imageTexture, size);
            // If it isn't loaded yet then load the image and draw it next call.
            if (entityCanvas == null) {
                this.loadImageBySize(imageTexture, size);
                return;
            }
            var context = canvas.getContext("2d");
            context.drawImage(entityCanvas, offset.x, offset.y, size.width, size.heigth, position.x, position.y, size.width, size.height);
        }
    }
});
//# sourceMappingURL=ImageRenderer.js.map