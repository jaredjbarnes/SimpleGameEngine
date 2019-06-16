import Bitmap from "../components/Bitmap.js";

const DEPENDENCIES = ["sprite"];

export default class SpriteSystem {
    constructor({ bitmapCache }) {
        this.world = null;
        this.name = "sprite";
        this.entities = [];
        this.entitiesById = {};
        this.bitmapCache = bitmapCache;
    }

    cacheEntities() {
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    addEntity(entity) {
        const sprite = entity.getComponent("sprite");
        const images = sprite.images;

        images.forEach((image) => {
            if (image.id == null) {
                image.id = JSON.stringify(image);
            }
        });

        if (images.length === 0){
            return;
        }

        this.bitmapCache.loadTilesAsync(images).promise.then(() => {
            const bitmap = new Bitmap();
            bitmap.id = images[0].id;

            entity.addComponent(bitmap);
        });
    }

    update() {
        for (let x = 0; x < this.entities.length; x++) {
            const entity = this.entities[x];
            const sprite = entity.getComponent("sprite");
            const bitmap = entity.getComponent("bitmap");

            if (bitmap == null) {
                continue;
            }

            const index = Math.floor(sprite.index);
            const newImage = sprite.images[index];

            if (newImage == null) {
                sprite.index = 0;
                continue;
            }

            bitmap.id = newImage.id;
            bitmap.isDirty = true;

            sprite.index += (sprite.timeScale * 1);
            sprite.index = sprite.index >= sprite.images.length ? 0 : sprite.index;
        }
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            if (this.entitiesById[entity.id] == null) {
                this.entitiesById[entity.id] = entity;
                this.entities.push(entity);
                this.addEntity(entity);
            }
        }
    }

    entityRemoved(entity) {
        if (this.entitiesById[entity.id] != null) {
            const index = this.entities.indexOf(entity);
            this.entities.splice(index, 1);
            delete this.entitiesById[entity.id];
        }
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (DEPENDENCIES.indexOf(component.type) > -1) {
            this.entityRemoved(entity);
        }
    }

    activated(world) {
        this.world = world;
        this.entities = [];
        this.cacheEntities();
    }

    deactivated() {
        this.world = null;
        this.entities = [];
    }

}


