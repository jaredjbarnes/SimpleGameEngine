export default class SpriteSetSystem {
    constructor({ bitmapCache }) {
        this.world = null;
        this.bitmapCache = bitmapCache;
    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    deactivated() {
        this.world = null;
    }

    isImageSet(entity) {
        return entity.hasComponent("sprite-set");
    }

    loadImages(entity) {
        const spriteSet = entity.getComponent("sprite-set");
        const keys = Object.keys(spriteSet.sets);
        let length = 0;
        let loadedCount = 0;

        // We need to count the total of all images before we try to load them.
        // If we do it together it could finish before we added the rest of the total.
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const images = spriteSet.sets[key];

            length += images.length;
        }

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const images = spriteSet.sets[key];

            if (!Array.isArray(images)) {
                continue;
            }

            for (let x = 0; x < images.length; x++) {
                const image = images[x];

                if (image.id == null) {
                    image.id = JSON.stringify(image);
                }

                this.bitmapCache.loadTileAsync(image).then(() => {
                    loadedCount++;
                    image;
                    if (loadedCount >= length) {
                        spriteSet.isLoaded = true;
                    }

                }).catch(() => {
                    throw new Error(`Failed to load image: '${image.url}'.`);
                });
            }
        }
    }

    entityAdded(entity) {
        if (this.isImageSet(entity)) {
            this.loadImages(entity);
        }
    }

    componentAdded(entity, component) {
        if (component.type === "sprite-set") {
            this.entityAdded(entity);
        }
    }

}