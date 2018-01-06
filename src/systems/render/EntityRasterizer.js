export default class EntityRasterizer {
    constructor({ document, imageManager }) {
        this.imageManager = imageManager;
        this.document = document;
        this.canvas = document.createElement("canvas");
    }

    rasterize(entity) {
        const mask = entity.getComponent("mask");
        const clip = entity.getComponent("clip");
    }
}