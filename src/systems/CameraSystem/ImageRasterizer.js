export default class ImageRasterizer {
    constructor({ canvasFactory, imageFactory, assetRoot }) {
        this.type = "image";
        this.canvasFactory = canvasFactory;
        this.assetRoot = assetRoot || "";
        this.imageFactory = imageFactory;
        this.loadingImages = {};
    }

    getImageAsync(url) {
        if (this.loadingImages[url] != null) {
            return this.loadingImages[url];
        }

        return this.loadingImages[url] = new Promise((resolve, reject) => {
            const image = this.imageFactory.create();

            image.onload = () => {
                resolve(image);
            };

            image.onerror = reject;
            image.src = url;
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
        return `${image.url}|${this.getImagePadding(image)}|${this.getImagePosition(image)}|${this.getImageSize(image)}|${image.opacity}|${image.flipHorizontally}|${image.flipVertically}`;
    }

    getIdentity(_entity) {
        const entity = _entity;
        const image = entity.getComponent("image");
        const transform = entity.getComponent("transform");

        if (image.id != null) {
            return `${image.id}|${transform.rotation}`;
        } else {
            return `${this.getImageIdentity(image)}|${transform.rotation}`;
        }

    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();
        const context = canvas.getContext("2d");
        const imageComponent = entity.getComponent("image");
        const rectangle = entity.getComponent("rectangle");
        const transform = entity.getComponent("transform");
        const angle = transform.rotation;
        const url = this.gerUrl(imageComponent.url);
        const padding = imageComponent.padding;
        const position = imageComponent.position;
        const size = imageComponent.size;
        const width = rectangle.right - rectangle.left + padding.left + padding.right;
        const height = rectangle.bottom - rectangle.top + padding.top + padding.bottom;

        canvas.width = width;
        canvas.height = height;

        this.getImageAsync(url).then((image) => {
            context.save();

            transform.isDirty = true;
            rectangle.isDirty = true;

            if (imageComponent.flipHorizontally) {
                const canvas = this.canvasFactory.create();
                const context = canvas.getContext("2d");
                canvas.width = size.width;
                canvas.height = size.height;

                context.scale(-1, 1);
                context.translate(-size.width, 0);
                context.drawImage(
                    image,
                    0,
                    0,
                    size.width,
                    size.height,
                    0,
                    0,
                    size.width,
                    size.height
                );

                image = canvas;
            }

            if (imageComponent.flipVertically) {
                const canvas = this.canvasFactory.create();
                const context = canvas.getContext("2d");
                canvas.width = size.width;
                canvas.height = size.height;

                context.scale(1, -1);
                context.translate(0, -size.height);
                context.drawImage(
                    image,
                    0,
                    0,
                    size.width,
                    size.height,
                    0,
                    0,
                    size.width,
                    size.height
                );

                image = canvas;
            }

            context.globalAlpha = imageComponent.opacity;
            context.translate(width / 2, height / 2);
            context.rotate(angle * Math.PI / 180);

            context.drawImage(
                image,
                position.x,
                position.y,
                size.width,
                size.height,
                -rectangle.width / 2,
                -rectangle.height / 2,
                rectangle.width,
                rectangle.height
            );

            context.restore();
        }).catch((error) => {
            context.globalAlpha = imageComponent.opacity;
            throw error;
        })

        return canvas;
    }

    gerUrl(url) {
        return this.assetRoot + url;
    }
}