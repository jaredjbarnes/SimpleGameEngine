const sortByZIndex = (a, b) => (a.zIndex || Infinity) - (b.zIndex || Infinity);

export default class Compositor {
    constructor() {
        this.rasterizers = {};
        this.images = {};
        this.compositeImages = {};
        this.imageTypes = [];
    }

    _validateRasterizer(rasterizer) {
        if (rasterizer.type == undefined) {
            throw new Error("Rasterizers need to have a type property.");
        }

        if (typeof rasterizer.rasterize !== "function") {
            throw new Error("Rasterizers need to have a rasterize method.");
        }

        if (typeof rasterizer.getIdentity !== "function") {
            throw new Error("Rasterizers need to have a getIdentity method.");
        }
    }

    addRasterizer(rasterizer) {
        this._validateRasterizer(rasterizer);
        this.rasterizers[rasterizer.type] = rasterizer;
        this.imageTypes = Object.keys(this.rasterizers);
    }

    cleanEntity(_entity) {
        const entity = _entity;

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            if (component != null) {
                component.isDirty = false;
            }
        }
    }

    saveImage(identifier, image) {
        this.images[identifier] = image;
    }

    getImage(identifier) {
        return this.images[identifier] || null;
    }

    isRenderable(_entity) {
        const entity = _entity;

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            if (component != null) {
                return true;
            }
        }

        return false;
    }

    isEntityDirty(_entity) {
        const entity = _entity;

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            this.compositeImages[entity.id] = null;
            return component && component.isDirty;
        }

        return false;
    }

    getEntityImages(_entity) {
        const entity = _entity;
        const rasterizers = this.rasterizers;
        let images = this.compositeImages[entity.id];

        if (entity == null) {
            return [];
        }

        if (images != null){
            return images;
        }

        images = [];

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            if (component != null) {
                const rasterizer = rasterizers[type];
                const imageId = rasterizer.getIdentity(entity);
                let image = this.getImage(imageId);

                if (image == null) {
                    image = rasterizer.rasterize(entity);
                    this.saveImage(imageId, image);
                }

                images.push(image);
            }
        }

        images.sort(sortByZIndex);

        this.compositeImages[entity.id] = images;

        return images;

    }
}