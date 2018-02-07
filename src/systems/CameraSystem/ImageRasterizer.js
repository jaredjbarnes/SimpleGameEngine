import drawImageNotFoundToContext from "./drawImageNotFoundToContext";

export default class ImageRasterizer {
    constructor(canvasFactory, imageFactory, assetRoot) {
        this.type = "image";
        this.canvasFactory = canvasFactory;
        this.assetRoot = assetRoot || "";
        this.imageFactory = imageFactory;
    }

    getIdentity(entity) {
        const image = entity.getComponent("image");
        const size = entity.getComponent("size");

        return `size=${size}, image=${JSON.stringify(image)}`;
    }

    rasterize(entity) {
        const imageComponent = entity.getComponent("image");
        const image = this.imageFactory.create();
        const path = this.getPath(imageComponent.path);
        const canvas = this.canvasFactory.create();
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