import Compositor from "./CameraSystem/Compositor";
import CanvasFactory from "./CameraSystem/CanvasFactory";
import ImageFactory from "./CameraSystem/ImageFactory";
import BitmapRasterizer from "./CameraSystem/BitmapRasterizer";
import PolygonRasterizer from "./CameraSystem/PolygonRasterizer";
import LineRasterizer from "./CameraSystem/LineRasterizer";
import ShapeRasterizer from "./CameraSystem/ShapeRasterizer";
import TextRasterizer from "./CameraSystem/TextRasterizer";
import CameraSystem from "./CameraSystem";
import BitmapCache from "./CameraSystem/BitmapCache";

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