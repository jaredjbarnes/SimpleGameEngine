export default class BitmapRasterizer {
    constructor({
        bitmapCache,
        canvasFactory
    }) {
        this.type = "bitmap";
        this.bitmapCache = bitmapCache;
        this.canvasFactory = canvasFactory;
        this.missingBitmapCanvas = null;
        this.createMissingBitmapCanvas();
    }

    createMissingBitmapCanvas() {
        const canvas = this.missingBitmapCanvas = this.canvasFactory.create();
        const context = canvas.getContext("2d");
        canvas.width = 128;
        canvas.height = 128;

        context.globalAlpha = 0.75;
        context.beginPath();
        context.lineCap = "round";
        context.lineWidth = 15;
        context.strokeStyle = "rgba(255,40,40)";
        context.lineTo(0, 0);
        context.lineTo(128, 0);
        context.lineTo(128, 128);
        context.lineTo(0, 128);
        context.lineTo(0, 0);
        context.moveTo(0, 0);
        context.lineTo(128, 128);
        context.moveTo(0, 128);
        context.lineTo(128, 0);
        context.stroke();
        context.closePath();

    }

    getIdentity(entity) {
        const bitmap = entity.getComponent("bitmap");

        if (bitmap.isDirty) {
            const transform = entity.getComponent("transform");
            const id = bitmap && bitmap.id || null;
            bitmap.identity = `${id}|${transform.rotation}|${bitmap.opacity}`;
        }

        return bitmap.identity;
    }

    rasterize(entity) {
        const canvas = this.canvasFactory.create();

        const transform = entity.getComponent("transform");
        const bitmap = entity.getComponent("bitmap");
        const rectangle = entity.getComponent("rectangle");
        const context = canvas.getContext("2d");

        const angle = transform.rotation;
        const width = rectangle.right - rectangle.left;
        const height = rectangle.bottom - rectangle.top;
        const bitmapCanvas = this.bitmapCache.get(bitmap.id) || this.missingBitmapCanvas;

        canvas.width = width;
        canvas.height = height;

        context.translate(width / 2, height / 2);
        context.rotate(angle * Math.PI / 180);

        context.drawImage(
            bitmapCanvas,
            0,
            0,
            bitmapCanvas.width,
            bitmapCanvas.height,
            -rectangle.width / 2,
            -rectangle.height / 2,
            rectangle.width,
            rectangle.height,
        );

        return canvas;
    }

}