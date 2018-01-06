export default class CompositeEntity {
    constructor({ document, imageManager }) {
        this.imageManager = imageManager;
        this.document = document;
    }

    rasterize(entity) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const mask = entity.getComponent("mask");
        const clip = entity.getComponent("clip");
        const size = entity.getComponent("size");

        canvas.width = size.width;
        canvas.height = size.height;

        if (mask != null){
            const maskImage = this.imageManager.getImage(mask.imageIdentity);
            
            if (maskImage != null){
                context.globalCompositeOperation = "source-out";
                context.drawImage(maskImage, mask.offset.x, mask.offset.y);
            }
        }

        if (clip != null && clip.path != null){
            const path = new Path2D(clip.path);
            context.clip(path, clip.rule);
        }

        imageManager.getEntityImages().forEach((image)=>{
            context.drawImage(image, 0, 0);
        });

        return canvas;
    }
}