import Bitmap from "../components/Bitmap";

export default class ImageSystem {
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

    isImage(entity) {
        return entity.hasComponent("image");
    }

    transformEntity(entity){
        const image = entity.getComponent("image");
        
        if (image.id == null){
            image.id = image.url;
        }

        this.bitmapCache.loadTileAsync(image).then(()=>{
            const bitmap = new Bitmap();
            bitmap.id = image.id;

            entity.addComponent(bitmap);
        })
    }

    entityAdded(entity) {
        if (this.isImage(entity)) {
            this.transformEntity(entity);
        }
    }

    componentAdded(entity, component) {
        if (component.type === "image"){
            this.entityAdded(entity);
        }
    }

}