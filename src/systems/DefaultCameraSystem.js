import Compositor from "./CameraSystem/Compositor";
import CanvasFactory from "./CameraSystem/CanvasFactory";
import ImageFactory from "./CameraSystem/ImageFactory";
import ImageRasterizer from "./CameraSystem/ImageRasterizer";
import PolygonRasterizer from "./CameraSystem/PolygonRasterizer";
import LineRasterizer from "./CameraSystem/LineRasterizer";
import ShapeRasterizer from "./CameraSystem/ShapeRasterizer";
import TextRasterizer from "./CameraSystem/TextRasterizer";
import CameraSystem from "./CameraSystem";
import SystemsBundlerSystem from "./SystemsBundlerSystem";
import DynamicLoadingSystem from "./DynamicLoadingSystem";

class DefaultCameraSystem extends CameraSystem {
    constructor({ canvas, cameraName, assetRoot, sort }) {
        const compositor = new Compositor();
        const canvasFactory = new CanvasFactory();
        const imageFactory = new ImageFactory();

        const imageRasterizer = new ImageRasterizer({ canvasFactory, imageFactory, assetRoot });
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

        compositor.addRasterizer(imageRasterizer);
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

export default class extends SystemsBundlerSystem {
    constructor({ canvas, cameraName, assetRoot, cellSize, sort }) {
        super();
        this.dynamicLoadingSystem = new DynamicLoadingSystem({ cameraName, cellSize });
        this.defaultCameraSystem = new DefaultCameraSystem({ canvas, cameraName, assetRoot, sort });
        
        this.systems.push(this.dynamicLoadingSystem);
        this.systems.push(this.defaultCameraSystem);
    }
}