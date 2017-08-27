const DEPENDENCIES = ["text-size-adjustment", "size", "text-texture"];

export default class TextSizeAdjustmentSystem {
    constructor() {
        this.world = null;
    }

    _addEntity(entity) {
        var size = entity.getComponent("size");
        var textSizeAdjustment = entity.getComponent("text-size-adjustment");
        var textTexture = entity.getComponent("text-texture");

        if (textSizeAdjustment.adjustWidth) {
            size.width = textTexture.width;
        }

        if (textSizeAdjustment.adjustHeight) {
            size.height = textTexture.height;
        }

        textSizeAdjustment.isAdjusted = true;
    }

    activated(world) {
        this.world = world;
    }

    componentAdded(entity, component) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this._addEntity(entity);
        }
    }

    deactivated(world) {
        this.world = null;
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this._addEntity(entity);
        }
    }
}