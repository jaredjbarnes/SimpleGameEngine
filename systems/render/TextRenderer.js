define(["require", "exports"], function (require, exports) {
    "use strict";
    class TextRenderer {
        constructor() {
            this.type = "text-texture";
            this.fontCache = {};
        }
        convertToRgba(color) {
            return "rgba(" + color.red + "," + color.green + "," + color.blue + "," + color.alpha + ")";
        }
        entityAdded(entity) {
            this.createCachedVersion(entity);
        }
        entityRemoved(entity) {
            delete this.fontCache[entity.id];
        }
        createFontString(textTexture) {
            //font-style variant weight size family
            return `${textTexture.font.style} ${textTexture.font.variant} ${textTexture.font.weight} ${textTexture.font.size}px ${textTexture.font.family}`;
        }
        createCachedVersion(entity) {
            var canvas = document.createElement("canvas");
            var size = entity.getComponent("size");
            var textTexture = entity.getComponent("text-texture");
            var context = canvas.getContext("2d");
            canvas.width = size.width;
            canvas.height = size.height;
            context.font = this.createFontString(textTexture);
            context.textBaseline = textTexture.font.baseline;
            context.textAlign = textTexture.horizontalAlignment;
            // A little trick to get approximate height. 
            var textHeight = textTexture.font.size;
            var textWidth = context.measureText(textTexture.text).width;
            var x = 0;
            var y = 0;
            if (textTexture.horizontalAlignment === "center") {
                x = size.width / 2;
            }
            else if (textTexture.horizontalAlignment === "right") {
                x = size.width;
            }
            if (textTexture.verticalAlignment === "top") {
                y = textHeight;
            }
            else if (textTexture.verticalAlignment === "middle") {
                y = (size.height / 2) - (textHeight / 2);
            }
            else if (textTexture.verticalAlignment === "bottom") {
                y = size.height - textHeight;
            }
            context.fillStyle = this.convertToRgba(textTexture.font.color);
            context.fillText(textTexture.text, x, y);
            this.fontCache[entity.id] = canvas;
            return canvas;
        }
        getCanvas(entity) {
            var canvas = this.fontCache[entity.id];
            var textTexture = entity.getComponent("text-texture");
            if (canvas == null || textTexture.isDirty) {
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
            context.drawImage(entityCanvas, offset.x, offset.y, size.width, size.height, position.x, position.y, size.width, size.height);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TextRenderer;
});
//# sourceMappingURL=TextRenderer.js.map