export default class ImageRasterizer {
    constructor({ canvasFactory, imageFactory, assetRoot }) {
        this.type = "image";
        this.canvasFactory = canvasFactory;
        this.assetRoot = assetRoot || "";
        this.imageFactory = imageFactory;
        this.loadingImages = {};
    }

    getImageAsync(path) {
        if (this.loadingImages[path] != null) {
            return this.loadingImages[path];
        }

        return this.loadingImages[path] = new Promise((resolve, reject) => {
            const image = this.imageFactory.create();

            image.onload = () => {
                resolve(image);
            };

            image.onerror = reject;
            image.src = path;
        });
    }

    getImagePadding(image) {
        const { top, right, bottom, left } = image.padding;
        return `${top}|${right}|${bottom}|${left}|`;
    }

    getImageSize(image) {
        const { width, height } = image.size;
        return `${width}|${height}`;
    }

    getImagePosition(image) {
        const { x, y } = image.position;
        return `${x}|${y}`;
    }

    getImageIdentity(image) {
        return `${image.path}|${this.getImagePadding(image)}|${this.getImagePosition(image)}|${this.getImageSize(image)}|${image.opacity}`;
    }

    getIdentity(entity) {
        const image = entity.getComponent("image");
        const transform = entity.getComponent("transform");

        return `${this.getImageIdentity(image)}|${transform.rotation}`;
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();
        const context = canvas.getContext("2d");
        const imageComponent = entity.getComponent("image");
        const transform = entity.getComponent("transform");
        const rectangle = entity.getComponent("rectangle");
        const angle = transform.rotation;
        const path = this.getPath(imageComponent.path);
        const padding = imageComponent.padding;
        const position = imageComponent.position;
        const size = imageComponent.size;
        const width = rectangle.right - rectangle.left + padding.left + padding.right;
        const height = rectangle.bottom - rectangle.top + padding.top + padding.bottom;

        canvas.width = width;
        canvas.height = height;

        //context.translate(width / 2, height / 2);
        //context.rotate(angle * Math.PI / 180);

        this.getImageAsync(path).then((image) => {
            context.globalAlpha = imageComponent.opacity;
            context.drawImage(
                image,
                position.x,
                position.y,
                size.width,
                size.height,
                0,
                0,
                rectangle.width,
                rectangle.height
            );
        }).catch((error) => {
            context.globalAlpha = imageComponent.opacity;
            throw error;
        })

        return canvas;
    }

    getPath(path) {
        return this.assetRoot + path;
    }
}