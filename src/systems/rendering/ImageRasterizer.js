import drawImageNotFoundToContext from "./drawImageNotFoundToContext";

export default class ImageRasterizer {
    constructor(doc, assetRoot) {
        this.type = "image";
        this.document = doc || document;
        this.assetRoot = assetRoot || "";
    }

    getIdentifier(entity) {
        const imageComponent = entity.getComponent("image");
        return `image=${JSON.stringify(imageComponent)}`;
    }

    rasterize(entity) {
        const imageComponent = entity.getComponent("image");
        const image = new Image();
        const document = this.document;
        const path = this.getPath(imageComponent.path);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const size = imageComponent.size;
        const padding = imageComponent.padding;
        const position = imageComponent.position;
        const width = size.width + padding.left + padding.right;
        const height = size.height + padding.top + padding.bottom;

        canvas.width = width;
        canvas.height = height;

        image.onload = () => {
            context.globalAlpha = imageComponent.opacity;
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
        };

        image.onerror = () => {
            context.globalAlpha = imageComponent.opacity;
            drawImageNotFoundToContext(context, size);
        }

        image.src = path;
        return canvas;
    }

    getPath(path) {
        return this.assetRoot + "/" + path;
    }
}