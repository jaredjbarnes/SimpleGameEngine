const DEPENDENCIES = ["sprite", "image"];

export default class SpriteSystem {
    constructor() {
        this.world = null;
        this.entities = [];
        this.entitiesById = {};
    }

    cacheEntities() {
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    update() {
        for (let x = 0; x < this.entities.length; x++) {
            const entity = this.entities[x];
            const sprite = entity.getComponent("sprite");
            const imageTexture = entity.getComponent("image");

            const index = Math.floor(sprite.index);
            const newImage = sprite.images[index];

            if (newImage == null) {
                continue;
            }

            for (let key in newImage) {
                if (key === "type") {
                    continue;
                }
                imageTexture[key] = newImage[key];
            }

            imageTexture.isDirty = true;

            sprite.index += (sprite.timeScale * 1);
            sprite.index = sprite.index >= sprite.images.length ? 0 : sprite.index;
        }
    }

    entityAdded(entity) {
        if (entity.hasComponents(DEPENDENCIES)) {
            if (this.entitiesById[entity.id] == null) {
                this.entitiesById[entity.id] = entity;
                this.entities.push(entity);
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
        this.cacheEntities();
    }

    deactivated() {
        this.world = null;
        this.entities = new Map();
    }

}


