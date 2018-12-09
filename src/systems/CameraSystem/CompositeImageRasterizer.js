export default class CompositeImageRasterizer {
    constructor({ canvasFactory, imageFactory, assetRoot }) {
        this.type = "composite-image";
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
        const composite = entity.getComponent("composite-image");
        const transform = entity.getComponent("transform");

        if (composite.id != null) {
            return `${composite.id}|${transform.rotation}`;
        } else {
            const identity = composite.images.map((image) => {
                return this.getImageIdentity(image);
            }).join("_");

            return `${identity}|${transform.rotation}`;
        }
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();
        const context = canvas.getContext("2d");
        const compositeImageComponent = entity.getComponent("composite-image");
        const rectangle = entity.getComponent("rectangle");
        const transform = entity.getComponent("transform");
        const images = compositeImageComponent.images;
        let loadedImageCount = 0;

        for (let x = 0; x < images.length; x++) {
            let angle = transform.rotation;
            const imageComponent = images[x];
            const url = this.getUrl(imageComponent.url);
            const padding = imageComponent.padding;
            const position = imageComponent.position;
            const size = imageComponent.size;
            const width = rectangle.right - rectangle.left + padding.left + padding.right;
            const height = rectangle.bottom - rectangle.top + padding.top + padding.bottom;

            canvas.width = width;
            canvas.height = height;

            this.getImageAsync(url).then((_image) => {
                let image = _image;

                loadedImageCount++;

                if (loadedImageCount == images.length) {
                    canvas.isLoaded = true;
                    imageComponent.isDirty = false;
                }

                context.save();

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
        }

        return canvas;
    }

    getUrl(url) {
        return this.assetRoot + url;
    }
}