import TileToCanvasConverter from "./TileToCanvasConverter";

export default class BitmapCache {
    constructor({ imageFactory, canvasFactory }) {
        this.imageFactory = imageFactory;
        this.tileToCanvasConverter = new TileToCanvasConverter(canvasFactory);
        this.bitmaps = {};
        this.imagePromises = {};
    }

    loadImageAsync(tile) {
        if (this.imagePromises[tile.url] != null) {
            return this.imagePromises[tile.url];
        }

        return this.imagePromises[tile.url] = new Promise((resolve, reject) => {
            const image = this.imageFactory.create();

            image.onload = () => {
                resolve(image);
            };

            image.onerror = reject;
            image.src = tile.url;
        });
    }

    unloadTile(tile) {
        this.remove(tile.id);
        this.unloadImage(tile.url);
    }

    unloadImage(url) {
        if (this.imagePromises[url] != null) {
            delete this.imagePromises[url];
        }
    }

    loadTileAsync(tile) {
        return this.loadImageAsync(tile).then((image) => {
            const canvas = this.tileToCanvasConverter.convert(tile, image);
            this.set(tile.id, canvas);
        });
    }

    loadTilesAsync(tiles) {
        const status = {
            count: 0,
            total: tiles.length,
            percentageComplete: 0,
            isComplete: false,
            promise: null
        };

        const promises = tiles.map((tile) => {
            return this.loadTileAsync(tile).then(() => {
                status.count++;
                status.percentageComplete = status.count / status.total;
                status.isComplete = status.count === status.total;
            });
        });

        status.promise = Promise.all(promises);

        return status;
    }

    set(id, canvas) {
        this.bitmaps[id] = canvas;
    }

    remove(id) {
        if (this.bitmaps[id] != null) {
            delete this.bitmaps[id];
        }
    }

    get(id) {
        return this.bitmaps[id] || null;
    }
}