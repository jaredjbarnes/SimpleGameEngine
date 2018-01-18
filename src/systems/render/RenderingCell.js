export default class RenderingCell {
    constructor({
        document = window.document,
        offset = { x: 0, y: 0 },
        imageManager = null,
        collisionData = null,
        size = 1000,
        zIndex = 0
        }) {

        this.offset = offset;
        this.imageManager = imageManager;
        this.collisionData = collisionData;
        this.document = document;
        this.image = document.createElement("canvas");
        this.size = size;
        this.image.width = size
        this.image.height = size;
        this.zIndex = zIndex;
        this.intersection = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        };
    }

    clear() {
        if (this.hasDependencies()) {
            this.clearRect(0, 0, this.size.width, this.size.height);
        }
    }

    getImage() {
        return this.image;
    }

    hasDependencies() {
        return this.imageManager != null && this.collisionData != null;
    }

    getEntities(cellPosition) {
        const column = this.grid.get(cellPosition.columnIndex);
        if (column != null) {
            return column.get(cellPosition.rowIndex);
        }
        return null;
    }

    getIntersection(cellPosition) {
        if (this.hasDependencies()) {
            const cellSize = this.collisionData.cellSize;

            const cellTop = cellPosition.rowIndex * cellSize;
            const cellLeft = cellPosition.columnIndex * cellSize;
            const cellBottom = cellTop + cellSize;
            const cellRight = cellLeft + cellSize;

            const renderingTop = this.offset.y * this.size;
            const renderingLeft = this.offset.x * this.size;
            const renderingBottom = renderingTop + this.size;
            const renderingRight = renderingRight + this.size;

            const top = Math.max(cellTop, renderingTop);
            const left = Math.max(cellLeft, renderingLeft);
            const right = Math.min(cellRight, renderingRight);
            const bottom = Math.min(cellBottom, renderingBottom);

            if (top < bottom && left < right) {
                this.intersection.top = top;
                this.intersection.left = left;
                this.intersection.bottom = bottom;
                this.intersection.right = right;

                return this.intersection;
            };
        }
        return null;
    }

    draw(cellPositions) {
        for (let x = 0; x < cellPositions; x++) {
            const cellPosition = cellPositions[x];
            const intersection = this.getIntersection(cellPosition);

            if (intersection != null) {
                const top = intersection.top - this.offset.y;
                const left = intersection.left - this.offset.x;
                const right = intersection.right - this.offset.x;
                const bottom = intersection.bottom - this.offset.y;

                this.image.clearRect(left, top, right - left, bottom - top);

                entities = this.getEntities(cellPosition);

                for (let y = 0; y < entities.length; y++) {
                    const entity = entities[y];
                    const position = entity.getComponent("position");
                    const size = entity.getComponent("size");
                    const zIndex = entity.getComponent("z-index");

                    if (zIndex === this.zIndex) {
                        const images = this.imageManager.getEntityImages(entity);

                        const entityTop = Math.max(top, position.y - this.offset.y);
                        const entityLeft = Math.max(left, position.x - this.offset.x);
                        const entityRight = Math.min(right, position.x - this.offset.x + size.width);
                        const entityBottom = Math.min(bottom, position.y - this.offset.y + size.height);

                        if (entityTop < entityBotton && entityLeft < entityRight) {

                            for (let z = 0; z < images.length; z++) {
                                this.image.drawImage(
                                    images[x],
                                    entityLeft,
                                    entityTop,
                                    entityRight - entityLeft,
                                    entityBottom - entityTop
                                );
                            }

                        }

                    }
                }
            };
        }
    }

}