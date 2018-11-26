import invokeMethod from "../../../../../../src/utilities/invokeMethod";

export default class EntityGenerationManager {
    constructor({
        entity,
        world,
        entityIdentifier,
        entityPool,
        buffer = 128,
        cellSize = 32
    }) {
        this.cellSize = cellSize;
        this.entity = entity;
        this.rectangle = entity.getComponent("rectangle");
        this.loadedEntities = {};
        this.world = world;
        this.buffer = buffer;
        this.entityPool = entityPool;
        this.entityIdentifier = entityIdentifier
    }

    loadEntities() {
        const left = this.rectangle.left - this.buffer;
        const right = this.rectangle.right + this.buffer;
        const top = this.rectangle.top - this.buffer;
        const bottom = this.rectangle.bottom + this.buffer;

        const startX = left - (left % this.cellSize);
        const startY = top - (top % this.cellSize);
        const endX = right - (right % this.cellSize);
        const endY = bottom - (bottom % this.cellSize);

        for (let x = startX; x < endX; x += this.cellSize) {
            for (let y = startY; y < endY; y += this.cellSize) {
                const key = `${x}_${y}`;

                if (this.loadedEntities[key] != null) {
                    continue;
                }

                let entityType = this.entityIdentifier.getEntityIdentity(x / this.cellSize, y / this.cellSize);

                if (entityType == null) {
                    continue;
                }

                const entity = this.entityPool.acquire(entityType);

                const transform = entity.getComponent("transform");
                transform.position.x = x + (this.cellSize / 2);
                transform.position.y = y + (this.cellSize / 2);
                transform.isDirty = true;

                if (this.world.getEntityById(entity.id) == null) {
                    this.world.addEntity(entity);
                }

                invokeMethod(this, "afterPlacement", [{ entityType, entity, x, y }]);

                this.loadedEntities[key] = entity;

            }
        }
    }

    releaseEntities() {
        const keys = Object.keys(this.loadedEntities);

        for (let x = 0; x < keys.length; x++) {
            const key = keys[x];
            const entity = this.loadedEntities[key];
            const entityTransform = entity.getComponent("transform");

            const left = this.rectangle.left - this.buffer;
            const right = this.rectangle.right + this.buffer;
            const top = this.rectangle.top - this.buffer;
            const bottom = this.rectangle.bottom + this.buffer;

            const startX = left - (left % this.cellSize);
            const startY = top - (top % this.cellSize);
            const endX = right - (right % this.cellSize);
            const endY = bottom - (bottom % this.cellSize);

            const maxTop = Math.max(entityTransform.position.y, startY);
            const maxLeft = Math.max(entityTransform.position.x, startX);
            const minBottom = Math.min(entityTransform.position.y, endY);
            const minRight = Math.min(entityTransform.position.x, endX);

            if (maxTop > minBottom || maxLeft > minRight) {
                delete this.loadedEntities[key];
                this.world.removeEntity(entity);
                this.entityPool.release(entity);

                invokeMethod(this, "afterRelease", [{entity}]);
            }
        }
    }

    manage() {
        this.releaseEntities();
        this.loadEntities();
    }

}