import Noise from "../../../../../src/utilities/Noise";

export default class SplatRasterizer {
    constructor({ canvasFactory }) {
        this.type = "splat-surface";
        this.canvasFactory = canvasFactory;
        this.noise = new Noise(35272);
    }

    getIdentity(entity) {
        return `${entity.id}|${entity.getComponent("splat-surface").hits.length}`;
    }

    createLine() {
        const canvas = this.canvasFactory.create();
        const context = canvas.getContext();

        canvas.width = 5;
        canvas.height = 20;

        context.fillStyle = "#000000";
        context.fillRect(0, 0, 5, 20);

        this.lineCanvas = canvas;
    }

    rasterize(entity, images) {
        const splatSurface = entity.getComponent("splat-surface");
        const rectangle = entity.getComponent("rectangle");
        const hits = splatSurface.hits;
        const canvas = this.canvasFactory.create();
        const splatterCanvas = this.canvasFactory.create();
        const width = rectangle.width;
        const height = rectangle.height;
        const context = canvas.getContext("2d");
        const splatterContext = splatterCanvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        splatterCanvas.width = width;
        splatterCanvas.height = height;

        for (let x = 0; x < images.length; x++) {
            context.drawImage(images[x], 0, 0, width, height);
        }

        context.globalCompositeOperation = "source-in";

        for (let x = 0; x < hits.length; x++) {
            const hit = hits[x];
            splatterContext.beginPath();
            splatterContext.arc(hit.x, hit.y, hit.size, 0, 2 * Math.PI);
            splatterContext.fillStyle = `rgba(${hit.color.red}, ${hit.color.green}, ${hit.color.blue}, ${hit.color.alpha}`;
            splatterContext.fill();

            for (let z = 0; z < 6; z++) {
                splatterContext.beginPath();

                let x = hit.x + (this.noise.perlin((hit.x + z) / 5, (hit.y + z) / 5) * hit.size * 3);
                let y = hit.y + (this.noise.perlin((hit.x + z) / 25, (hit.y + z) / 25) * hit.size * 3);

                splatterContext.arc(x, y, hit.size / 2, 0, 2 * Math.PI);
                splatterContext.fillStyle = `rgba(${hit.color.red}, ${hit.color.green}, ${hit.color.blue}, ${hit.color.alpha}`;
                splatterContext.fill();
            }

            for (let z = 0; z < 6; z++) {
                splatterContext.beginPath();

                let x = hit.x + (this.noise.perlin((hit.x * z) / 5, (hit.y * z) / 5) * hit.size * 3);
                let y = hit.y + (this.noise.perlin((hit.x * z) / 25, (hit.y * z) / 25) * hit.size * 3);

                if (z % 2 === 0) {
                    x = -x;
                    y = -y;
                }

                splatterContext.arc(x, y, hit.size / 4, 0, 2 * Math.PI);
                splatterContext.fillStyle = `rgba(${hit.color.red}, ${hit.color.green}, ${hit.color.blue}, ${hit.color.alpha}`;
                splatterContext.fill();
            }

        }

        context.drawImage(splatterCanvas, 0, 0, width, height);
        splatSurface.isDirty = false;
        return canvas;
    }
}