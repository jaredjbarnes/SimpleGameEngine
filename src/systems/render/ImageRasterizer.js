export default class ImageRasterizer {
    constructor(doc, assetRoot) {
        this.type = "image";
        this.document = doc || document;
        this.assetRoot = assetRoot || "";
    }

    getIdentifier(entity) {
        const imageTexture = entity.getComponent("image");
        return `${JSON.stringify(imageTexture)}`;
    }

    rasterize(imageTexture) {
        const image = new Image();
        const document = this.document;
        const path = this.getPath(imageTexture.path);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const size = imageTexture.size;
        const padding = imageTexture.padding;
        const position = imageTexture.position;
        const width = size.width + padding.left + padding.right;
        const height = size.height + padding.top + padding.bottom;

        canvas.width = width;
        canvas.height = height;

        image.onload = () => {
            context.globalAlpha = imageTexture.opacity;
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

        image.src = path;
        return canvas;
    }

    getPath(path) {
        return this.assetRoot + "/" + path;
    }
}