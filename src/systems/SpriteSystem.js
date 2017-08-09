const DEPENDENCIES = ["sprite", "image-texture"];

export default class SpriteSystem {
    constructor() {
        this.game = null;
        this.entities = new Map();
    }

    cacheEntities() {
        this.game.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    update() {

        this.entities.forEach((entity) => {
            var sprite = entity.getComponent("sprite");
            var imageTexture = entity.getComponent("image-texture");
            var position = entity.getComponent("position");

            var index = Math.floor(sprite.index);
            var newImageTexture = sprite.images[index];

            if (newImageTexture == null) {
                return;
            }

            Object.keys(newImageTexture).forEach(function (key) {
                if (key === "type") {
                    return;
                }
                imageTexture[key] = newImageTexture[key];
            });

            imageTexture.isDirty = true;

            sprite.index += (sprite.timeScale * 1);
            sprite.index = sprite.index >= sprite.images.length ? 0 : sprite.index;

        });


    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            this.entities.set(entity.id, entity);
        }
    }

    entityRemoved(entity) {
        this.entities.delete(entity.id);
    }

    componentAdded(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entities.set(entity.id, entity);
        }
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entities.delete(entity.id);
        }
    }

    activated(game) {
        this.game = game;
        this.cacheEntities();
    }

    deactivated() {
        this.game = null;
        this.entities = new Map();
    }

}


