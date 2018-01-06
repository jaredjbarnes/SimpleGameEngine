class RenderableEntity {
    constructor() {
        this.id = null;
        this.size = null;
        this.position = null;
        this.collidable = null;
        this.images = [];
    }
}

export default class CompositeLayer {
    constructor({ size, rasterizeManager }) {
        this.entities = [];
        this.size = size;
        this.rasterizeManager = rasterizeManager;
        this.imageTypes = Object.keys(this.rasterizeManager.rasterizers);
        this.dirtyCells = [];
    }

    addEntity(entity) {
        const imagesTypes = this.imageTypes;
        const renderableEntity = new RenderableEntity();

        renderableEntity.id = entity.id;
        renderableEntity.size = entity.getComponent("size");
        renderableEntity.position = entity.getComponent("position");
        renderableEntity.collidable = entity.getComponent("collidable");

        renderableEntity.images = imagesTypes.reduce((images, imageType) => {
            const component = entity.getComponent(imageType);
            if (component != null) {
                images.push(component);
            }
            return images;
        }, []);

        this.entities.push(renderableEntity);
    }

    isDirty({ size, position, images }) {
        return size.isDirty || positions.isDirty || images.some(i => i.isDirty);
    }

    findDirtyCells() {
        this.entities.forEach((_entity) => {
            const entity = _entity;
            const isDirty = this.isDirty(entity);

            if (isDirty) {
                const collidable = entity.collidable;
                collidable.activeCollisions.forEach((collision) => {
                    this.dirtyCells.push(collision.cellPosition);
                });
            }
        });
    }

    transferImage(destinationCanvas,
        destinationX,
        destinationY,
        destinationWidth,
        destinationHeight,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight
    ) {

    }
}