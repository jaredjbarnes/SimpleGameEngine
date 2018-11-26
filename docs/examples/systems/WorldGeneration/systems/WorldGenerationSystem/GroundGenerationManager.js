import EntityGenerationManager from "./EntityGenerationManager";
import EntityPool from "../../../../../../src/utilities/EntityPool";
import EntityIdentifier from "./EntityIdentifier";
import entityFactory from "./entityFactory";

const GRASS = "g";
const DIRT = "d";


export default class GroundGenerationManager extends EntityGenerationManager {
    constructor(config) {
        const entityPool = new EntityPool();
        const entityIdentifier = new EntityIdentifier({
            noise: config.noise,
            scale: config.scale
        });

        for (let type in entityFactory) {
            entityPool.addEntityType(type, entityFactory[type]);
        }

        entityIdentifier.addRange({
            name: DIRT,
            min: -1,
            max: 0
        });

        entityIdentifier.addRange({
            name: GRASS,
            min: 0,
            max: 1
        });

        super(Object.assign({
            entityPool,
            entityIdentifier
        }, config));

        this.entitiesWithBushes = {};
        this.entitiesWithTrees = {};
        this.noise = config.noise;
        this.scale = config.scale;
    }

    isGrass(type) {
        return type === "g-g-g-g-g";
    }

    afterPlacement({ entityType, entity, x, y }) {
        if (this.isGrass(entityType)) {
            const value = this.noise.perlin(x / 3, y / 3);
            if (value < -0.25) {
                const entityTransform = entity.getComponent("transform");
                const bucket = this.entitiesWithBushes[entity.id] = [];

                for (let zx = -1; zx <= 1; zx++) {
                    if (zx === 0) {
                        continue;
                    }
                    for (let zy = -1; zy <= 1; zy++) {
                        if (zy === 0) {
                            continue;
                        }

                        const offsetX = zx * 8;
                        const offsetY = zy * 8;

                        const bush = this.entityPool.acquire("bush");
                        const transform = bush.getComponent("transform");

                        transform.position.x = entityTransform.position.x + offsetX;
                        transform.position.y = entityTransform.position.y + offsetY;
                        transform.isDirty = true;

                        this.world.addEntity(bush);
                        bucket.push(bush);
                    }
                }

            }

            if (value > 0.25 && x % 64 === 0 && y % 64 === 0) {
                const entityTransform = entity.getComponent("transform");

                const tree = this.entityPool.acquire("tree");
                const transform = tree.getComponent("transform");

                transform.position.x = entityTransform.position.x;
                transform.position.y = entityTransform.position.y;
                transform.isDirty = true;

                this.world.addEntity(tree);
                this.entitiesWithTrees[entity.id] = tree;

            }
        }
    }

    afterRelease({ entity }) {
        const bucket = this.entitiesWithBushes[entity.id];
        if (Array.isArray(bucket)) {

            while (bucket.length > 0) {
                const bush = bucket.pop();

                this.entityPool.release(bush);
                this.world.removeEntity(bush);
            }

            delete this.entitiesWithBushes[entity.id];

        }

        const tree = this.entitiesWithTrees[entity.id];
        if (tree != null) {
            this.entityPool.release(tree);
            this.world.removeEntity(tree);
            delete this.entitiesWithTrees[entity.id];
        }
    }
}