import Tile from "./Tile";
import overlay from "../../utilities/overlay";

const defaultTile = new Tile();

export default class TileToCanvasConverter {
    constructor(canvasFactory) {
        this.canvasFactory = canvasFactory;

        this.canvas = null;
        this.context = null;
        this.tile = null;
        this.image = null;
        this.padding = null;
        this.position = null;
        this.size = null;
        this.width = null;
        this.height = null;

    }

    initialize(tile, image) {
        this.canvas = this.canvasFactory.create();
        this.context = this.canvas.getContext("2d");
        this.tile = tile;
        this.image = image;
        this.padding = this.tile.padding;
        this.position = this.tile.position;
        this.size = this.tile.size;
        this.width = this.size.width + this.padding.left + this.padding.right;
        this.height = this.size.height + this.padding.top + this.padding.bottom;
    }

    setCanvasSize() {
        this.canvas.height = this.height;
        this.canvas.width = this.width;
    }

    flipHorizontallyIfNeeded() {
        if (this.tile.flipHorizontally) {
            const canvas = this.canvasFactory.create();
            const context = canvas.getContext("2d");
            canvas.width = this.size.width;
            canvas.height = this.size.height;

            context.scale(-1, 1);
            context.translate(-this.size.width, 0);
            context.drawImage(
                this.image,
                0,
                0,
                this.size.width,
                this.size.height,
                0,
                0,
                this.size.width,
                this.size.height
            );

            this.image = canvas;
        }
    }

    flipVerticallyIfNeeded() {
        if (this.tile.flipVertically) {
            const canvas = this.canvasFactory.create();
            const context = canvas.getContext("2d");
            canvas.width = this.size.width;
            canvas.height = this.size.height;

            context.scale(1, -1);
            context.translate(0, -this.size.height);
            context.drawImage(
                this.image,
                0,
                0,
                this.size.width,
                this.size.height,
                0,
                0,
                this.size.width,
                this.size.height
            );

            this.image = canvas;
        }
    }

    draw() {
        this.context.globalAlpha = this.tile.opacity;
        this.context.translate(this.width / 2, this.height / 2);

        this.context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height,
            -this.width / 2,
            -this.height / 2,
            this.size.width,
            this.size.height
        );
    }

    convert(tile, image) {
        const readyTile = overlay(defaultTile, tile);

        this.initialize(readyTile, image);
        this.setCanvasSize();
        this.flipHorizontallyIfNeeded();
        this.flipVerticallyIfNeeded();
        this.draw();

        return this.canvas;
    }
}