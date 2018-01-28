import OffsetCanvas from "./OffsetCanvas";

export default class RenderingCell {
    constructor({
        offset = { x: 0, y: 0 },
        imageManager = null,
        broadPhaseCollisionData = null,
        size = 1000,
        cameraCanvasCellEntity = null,
        world = null
        }) {

        this.offset = offset;
        this.reusableRegion = {
            top: 0,
            left:0,
            right: 0,
            bottom: 0
        };
        this.imageManager = imageManager;
        this.broadPhaseCollisionData = broadPhaseCollisionData;
        this.offsetCanvas = new OffsetCanvas(size, offset);
        this.size = size;
        this.world = world;
        this.cameraCanvasCellEntity = {
            position: cameraCanvasCellEntity.getComponent("position"),
            collidable: cameraCanvasCellEntity.getComponent("collidable")
        };
    }

    drawEntity(_entity, region) {
        const entity = _entity;
        const images = this.imageManager.getEntityImages(entity);
        const position = entity.getComponent("position");
        const size = entity.getComponent("size");

        images.forEach((image) => {
            this.offsetCanvas.drawImage(
                image,
                0,
                0,
                size.width,
                size.height,
                position.x,
                position.y,
                size.width,
                size.height
            );
        });
    }

    getEntities(cellPosition) {
        const column = this.grid.get(cellPosition.columnIndex);
        if (column != null) {
            return column.get(cellPosition.rowIndex);
        }
        return null;
    }

    update(cellPositions) {
        if (this.cameraCanvasCellEntity.position.isDirty) {
            // Clear the whole area and draw every entity that it collides with.
            this.offsetCanvas.clearRect(this.offset.x, this.offset.y, this.size, this.size);

            Object.keys(this.collidable.collisions).forEach((_entityId) => {
                const entityId = _entityId;
                const entity = this.world.getEntityById(entityId);
                this.drawEntity(entity, );
            });
        } else {
            // Check if the cell position is in the cameraCanvasCellEntity cell positions. 
            // If so then update the entities in that cell position.
        }
    }



}