import RenderSystem from "./RenderSystem";
import ImageRenderer from "./render/ImageRenderer";
import TextRenderer from "./render/TextRenderer";
import ShapeRenderer from "./render/ShapeRenderer";
import LineRenderer from "./render/LineRenderer";

export default class extends RenderSystem {
    constructor(options = {}) {
        super(options.canvas, options.sort);

        this.addRenderer(new ImageRenderer(options.document, options.assetRoot));
        this.addRenderer(new ShapeRenderer(options.document));
        this.addRenderer(new TextRenderer(options.document));
        this.addRenderer(new LineRenderer());
    }
}