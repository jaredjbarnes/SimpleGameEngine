const DEPENDENCIES = ["text-size-adjustment", "size", "text-texture"];

export default class TextSizeAdjustmentSystem {
    constructor() {
        this.world = null;
        this.entities = [];
    }

    _adjustEntity(entity) {
        var _entity = entity;
        var size = _entity.getComponent("size");
        var textSizeAdjustment = _entity.getComponent("text-size-adjustment");
        var textTexture = _entity.getComponent("text-texture");

        if (textSizeAdjustment.adjustWidth) {
            size.width = parseInt(textTexture.width, 10);
        }

        if (textSizeAdjustment.adjustHeight) {
            size.height = parseInt(textTexture.height, 10);
        }

        size.isDirty = true;
        textSizeAdjustment.isAdjusted = true;
    }

    _addEntity(entity) {
        var index = this.entities.indexOf(entity);
        if (index === -1) {
            this.entities.push(entity);
        }
    }

    _removedEntity(entity) {
        var index = this.entities.indexOf(entity);
        if (index > -1) {
            this.entities.splice(index, 1);
        }
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
        this.entities = [];
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this._addEntity(entity);
        }
    }

    entityRemoved(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this._removedEntity(entity);
        }
    }

    update() {
        this.entities.forEach((entity) => {
            var _entity = entity;
            this._adjustEntity(_entity);
        });

        this.entities.length = 0;
    }
}