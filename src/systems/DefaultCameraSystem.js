import Compositor from "./camera/Compositor.js";
import CanvasFactory from "./camera/CanvasFactory.js";
import ImageFactory from "./camera/ImageFactory.js";
import BitmapRasterizer from "./camera/BitmapRasterizer.js";
import PolygonRasterizer from "./camera/PolygonRasterizer.js";
import LineRasterizer from "./camera/LineRasterizer.js";
import ShapeRasterizer from "./camera/ShapeRasterizer.js";
import TextRasterizer from "./camera/TextRasterizer.js";
import CameraSystem from "./camera/CameraSystem.js";
import BitmapCache from "./camera/BitmapCache.js";

export default class DefaultCameraSystem extends CameraSystem {
    constructor({ canvas, cameraName, sort }) {
        const compositor = new Compositor();
        const canvasFactory = new CanvasFactory();
        const imageFactory = new ImageFactory();
        const bitmapCache = new BitmapCache({imageFactory, canvasFactory});
        const bitmapRasterizer = new BitmapRasterizer({ canvasFactory, bitmapCache, imageFactory });
        const lineRasterizer = new LineRasterizer(canvasFactory);
        const shapeRasterizer = new ShapeRasterizer(canvasFactory);
        const textRasterizer = new TextRasterizer(canvasFactory);

        super({
            canvas,
            cameraName,
            compositor,
            canvasFactory,
            sort
        });

        this.name = "default-camera";
        this.polygonRasterizer = null;
        this.canvasFactory = canvasFactory;
        this.compositor = compositor;
        this.bitmapCache = bitmapCache;

        compositor.addRasterizer(bitmapRasterizer);
        compositor.addRasterizer(lineRasterizer);
        compositor.addRasterizer(shapeRasterizer);
        compositor.addRasterizer(textRasterizer);
    }

    enablePolygonRasterizer(colors) {
        if (this.polygonRasterizer == null) {
            this.polygonRasterizer = new PolygonRasterizer({ canvasFactory: this.canvasFactory, colors });
            this.compositor.addRasterizer(this.polygonRasterizer);
        }
    }
}