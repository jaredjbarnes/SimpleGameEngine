const sortByZIndex = (a, b) => (a.zIndex || Infinity) - (b.zIndex || Infinity);

export default class ImageManager {
    constructor() {
        this.rasterizers = {};
        this.images = {};
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
            throw new Error("Rasterizers need to have a identity method.");
        }
    }

    addRasterizer(rasterizer) {
        this._validateRasterizer(rasterizer);
        this.rasterizers[rasterizer.type] = rasterizer;
        this.imageTypes = Object.keys(this.rasterizers);
    }

    saveImage(identifier, image) {
        this.images[identifier] = image;
    }

    getImage(identifier) {
        return this.images[identifier] || null;
    }

    getEntityImages(entity) {
        return this.imageTypes
            .map((type) => {
                const rasterizer = this.rasterizers[type];
                const imageId = rasterizers.getIdentity(entity);
                const image = this.getImage(imageId); 
                
                return image;
            })
            .reduce((accumulator, image) => {
                if (image != null) {
                    accumulator.push(image);
                }
                return accumulator;
            }, [])
            .sort(sortByZIndex);
    }

    entityAdded(_entity) {
        const entity = _entity;
        this.imageTypes.forEach((type) => {
            const component = entity.getComponent(type);
            const rasterizer = this.rasterizers[component.type];

            if (component != null) {
                const identifier = rasterizer.getIdentity(entity);
                const image = rasterizer.rasterize(entity);

                this.saveImage(identifier, image);
            }
        });
    }

    componentAdded(entity, component) {
        const rasterizer = this.rasterizers[component.type];

        if (rasterizer != null) {
            const identifier = rasterizer.getIdentity(entity);
            const image = rasterizer.rasterize(entity);

            this.saveImage(identifier, image);
        }
    }
}