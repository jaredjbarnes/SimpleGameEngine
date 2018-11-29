export default class CellRenderer {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.entities = null;
        this.rectangle = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };
        this.cellSize = null;
        this.compositor = null;
        this.sort = null;
    }

    isReady() {
        return this.context != null &&
            this.entities != null &&
            this.rectangle != null &&
            this.cellSize != null &&
            this.compositor != null;
    }

    render() {
        if (this.isReady()) {
            const context = this.context;

            context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            const entities = this.entities;
            const cellSize = this.cellSize;
            const rectangle = this.rectangle;

            const cellTop = rectangle.top * cellSize;
            const cellLeft = rectangle.left * cellSize;
            const cellRight = rectangle.right * cellSize;
            const cellBottom = rectangle.bottom * cellSize;

            entities.sort(this.sort);

            for (let x = 0; x < entities.length; x++) {
                const entity = entities[x];

                if (!this.compositor.isRenderable(entity)) {
                    continue;
                }

                const opacity = entity.getComponent("opacity");
                const rectangle = entity.getComponent("rectangle");

                const top = Math.max(rectangle.top, cellTop);
                const left = Math.max(rectangle.left, cellLeft);
                const right = Math.min(rectangle.right, cellRight);
                const bottom = Math.min(rectangle.bottom, cellBottom);

                if (top < bottom && left < right) {
                    const images = this.compositor.getEntityImages(entity);

                    if (images.length === 0) {
                        continue;
                    }

                    let sourceX = 0;
                    let sourceY = 0;
                    let width = right - left;
                    let height = bottom - top;
                    let destinationX = left - cellLeft;
                    let destinationY = top - cellTop;

                    if (width <= 0 || height <= 0) {
                        continue;
                    }

                    if (rectangle.left < left) {
                        sourceX = left - rectangle.left;
                    }

                    if (rectangle.top < top) {
                        sourceY = top - rectangle.top;
                    }

                    if (opacity != null) {
                        context.globalAlpha = opacity.value;
                    }

                    for (let z = 0; z < images.length; z++) {
                        const image = images[z];

                        context.drawImage(
                            image,
                            sourceX,
                            sourceY,
                            width,
                            height,
                            destinationX,
                            destinationY,
                            width,
                            height
                        );
                    }

                    if (opacity != null) {
                        context.globalAlpha = 1;
                    }

                }
            }
        }
    }
}