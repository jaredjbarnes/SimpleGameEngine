import ImageManager from "./CameraSystem/ImageManager";
import CanvasFactory from "./CameraSystem/CanvasFactory";
import ImageFactory from "./CameraSystem/ImageFactory";
import ImageRasterizer from "./CameraSystem/ImageRasterizer";
import PolygonRasterizer from "./CameraSystem/PolygonRasterizer";
import LineRasterizer from "./CameraSystem/LineRasterizer";
import ShapeRasterizer from "./CameraSystem/ShapeRasterizer";
import TextRasterizer from "./CameraSystem/TextRasterizer";
import CameraSystem from "./CameraSystem";

export default class DefaultCameraSystem extends CameraSystem {
    constructor({ canvas, cameraName, assetRoot }) {
        const imageManager = new ImageManager();
        const canvasFactory = new CanvasFactory();
        const imageFactory = new ImageFactory();

        const imageRasterizer = new ImageRasterizer({ canvasFactory, imageFactory, assetRoot });
        const lineRasterizer = new LineRasterizer(canvasFactory);
        const shapeRasterizer = new ShapeRasterizer(canvasFactory);
        const textRasterizer = new TextRasterizer(canvasFactory);

        super({
            canvas,
            cameraName,
            imageManager,
            canvasFactory
        });

        this.polygonRasterizer = null;
        this.canvasFactory = canvasFactory;
        this.imageManager = imageManager;

        imageManager.addRasterizer(imageRasterizer);
        imageManager.addRasterizer(lineRasterizer);
        imageManager.addRasterizer(shapeRasterizer);
        imageManager.addRasterizer(textRasterizer);
    }

    enablePolygonRasterizer(colors) {
        if (this.polygonRasterizer == null) {
            this.polygonRasterizer = new PolygonRasterizer({ canvasFactory: this.canvasFactory, colors });
            this.imageManager.addRasterizer(this.polygonRasterizer);
        }
    }
}