import Bitmap from "../components/Bitmap.js";
import BitmapCache from "./camera/BitmapCache.js";

export default class ImageSystem {
    constructor() {
        this.world = null;
        this.name = "image";
        this.bitmapCache = BitmapCache.get(); // :(
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
            image.id = JSON.stringify(image);
        }

        this.bitmapCache.loadTileAsync(image).then(()=>{
            const bitmap = new Bitmap();
            bitmap.id = image.id;
            bitmap.isDirty = true;

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