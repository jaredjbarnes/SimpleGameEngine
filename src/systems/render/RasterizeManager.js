export default class RasterizeManager {
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
            throw new Error("Rasterizers need to have a identity method.");
        }
    }

    addRasterizer(rasterizer) {
        this._validateRasterizer(rasterizer);
        this.rasterizers[rasterizer.type] = rasterizer;
    }

    saveImage(identifier, image) {
        this.images[identifier] = image;
    }

    getImage(identifier) {
        return this.images[identifier] || null;
    }

    getRasterizerTypes() {
        return Object.keys(this.rasterizers);
    }

    entityAdded(_entity) {
        const entity = _entity;
        this.getRasterizerTypes().forEach((type) => {
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