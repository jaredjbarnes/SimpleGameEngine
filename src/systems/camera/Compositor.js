const sortByZIndex = (a, b) => (a.zIndex || Infinity) - (b.zIndex || Infinity);

export default class Compositor {
    constructor() {
        this.rasterizers = {};
        this.images = {};
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

    emptyCache(){
        this.images = {};
    }

    isRenderable(_entity) {
        const entity = _entity;

        for (let type in this.rasterizers) {
            if (entity.hasComponent(type)) {
                return true;
            }
        }

        return false;
    }

    isEntityDirty(_entity) {
        const entity = _entity;

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            if (component && component.isDirty) {
                return true;
            };
        }

        return false;
    }

    getEntityImages(_entity) {
        const entity = _entity;
        const rasterizers = this.rasterizers;

        if (entity == null) {
            return [];
        }

        let images = [];

        for (let type in this.rasterizers) {
            const component = entity.getComponent(type);
            if (component != null) {
                const rasterizer = rasterizers[type];
                const imageId = rasterizer.getIdentity(entity);
                let image = this.getImage(imageId);

                if (image == null) {
                    image = rasterizer.rasterize(entity, images);
                    this.saveImage(imageId, image);
                }

                component.isDirty = false;
                images.push(image);
            }
        }

        images.sort(sortByZIndex);

        return images;

    }
}