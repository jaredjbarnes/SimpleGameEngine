import EntityPool from "../../../../../../src/utilities/EntityPool";
import GroundEntityIdentifier from "./GroundEntityIdentifier";
import groundEntities from "./groundEntities";

const GRASS = "g";
const DIRT = "d";

export default class WorldGenerationManager {
    constructor({
        noise,
        scale = 512,
        buffer = 128,
        entity,
        world
    }) {
        this.noise = noise;
        this.cellSize = 32;
        this.scale = scale;
        this.entity = entity;
        this.rectangle = entity.getComponent("rectangle");
        this.loadedEntities = {};
        this.world = world;
        this.buffer = buffer;

        this.entityPool = new EntityPool();

        for (let type in groundEntities) {
            this.entityPool.addEntityType(type, groundEntities[type]);
        }

        this.groundEntityIdentifier = new GroundEntityIdentifier({
            noise,
            scale
        });

        this.groundEntityIdentifier.addRange({
            name: DIRT,
            min: -1,
            max: 0
        });

        this.groundEntityIdentifier.addRange({
            name: GRASS,
            min: 0,
            max: 1
        });

    }

    loadGround() {
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

                let entityType = this.groundEntityIdentifier.getTileIdentity(x / this.cellSize, y / this.cellSize);

                if (entityType == null) {
                    throw new Error("Couldn't find entity type.");
                }

                const entity = this.entityPool.acquire(entityType);

                const transform = entity.getComponent("transform");
                transform.position.x = x + (this.cellSize / 2);
                transform.position.y = y + (this.cellSize / 2);
                transform.isDirty = true;

                if (this.world.getEntityById(entity.id) == null) {
                    this.world.addEntity(entity);
                }

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
            }
        }
    }

    manage() {
        this.releaseEntities();
        this.loadGround();
    }

}