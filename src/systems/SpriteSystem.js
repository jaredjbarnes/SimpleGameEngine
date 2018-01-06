const DEPENDENCIES = ["sprite", "image"];

export default class SpriteSystem {
    constructor() {
        this.world = null;
        this.entities = new Map();
    }

    cacheEntities() {
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    update() {

        this.entities.forEach((entity) => {
            var sprite = entity.getComponent("sprite");
            var imageTexture = entity.getComponent("image");
            var position = entity.getComponent("position");

            var index = Math.floor(sprite.index);
            var newImage = sprite.images[index];

            if (newImage == null) {
                return;
            }

            Object.keys(newImage).forEach(function (key) {
                if (key === "type") {
                    return;
                }
                imageTexture[key] = newImage[key];
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

    activated(world) {
        this.world = world;
        this.cacheEntities();
    }

    deactivated() {
        this.world = null;
        this.entities = new Map();
    }

}


