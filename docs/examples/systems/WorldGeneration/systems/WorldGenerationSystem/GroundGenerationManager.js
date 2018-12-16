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
            max: -0.1
        });

        entityIdentifier.addRange({
            name: GRASS,
            min: -0.1,
            max: 1
        });

        super(Object.assign({
            entityPool,
            entityIdentifier
        }, config));

        this.entitiesWithBushes = {};
        this.entitiesWithTrees = {};
        this.entitiesWithFlowers = {};
        this.noise = config.noise;
        this.scale = config.scale;
    }

    isGrass(type) {
        return type === "g-g-g-g-g";
    }

    shouldPlaceTree(x, y) {
        const value = this.noise.perlin(x / 3, y / 3);
        return value > 0.25 && x % 64 === 0 && y % 64 === 0;
    }

    shouldPlaceBush(x, y) {
        const value = this.noise.perlin(x / 3, y / 3);
        return !this.shouldPlaceTree(x, y) && value < -0.25;
    }

    shoudPlaceFlower(x, y) {
        const value = this.noise.perlin(x / 15, y / 15);
        return !this.shouldPlaceTree(x, y) && !this.shouldPlaceBush(x, y) && value < -0.25;
    }

    placeBushes({ entity, x, y }) {
        if (this.shouldPlaceBush(x, y)) {
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
    }

    placeTrees({ entity, x, y }) {

        if (this.shouldPlaceTree(x, y)) {
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

    placeFlowers({ entity, x, y }) {
        if (this.shoudPlaceFlower(x, y)) {
            const entityTransform = entity.getComponent("transform");
            const bucket = this.entitiesWithFlowers[entity.id] = [];

            for (let z = 0; z < 3; z++) {
                const step = 2000 * z || 1;

                const offsetX = this.noise.perlin(x * step / 1.25, y * step / 2.22) * 32;
                const offsetY = this.noise.perlin(x * step / 3.15, y * step / 1.42) * 20;

                const flower = this.entityPool.acquire("flower");
                const transform = flower.getComponent("transform");

                transform.position.x = Math.floor(entityTransform.position.x + offsetX);
                transform.position.y = Math.floor(entityTransform.position.y + offsetY);
                transform.isDirty = true;

                bucket.push(flower);
                this.world.addEntity(flower);
            }

        }
    }

    afterPlacement(placementInformation) {
        if (this.isGrass(placementInformation.entityType)) {
            this.placeBushes(placementInformation);
            this.placeTrees(placementInformation);
            this.placeFlowers(placementInformation);
        }
    }

    releaseBushes({ entity }) {
        const bucket = this.entitiesWithBushes[entity.id];
        if (Array.isArray(bucket)) {

            while (bucket.length > 0) {
                const bush = bucket.pop();

                this.entityPool.release(bush);
                this.world.removeEntity(bush);
            }

            delete this.entitiesWithBushes[entity.id];
        }
    }

    releaseFlowers({ entity }) {
        const bucket = this.entitiesWithFlowers[entity.id];
        if (Array.isArray(bucket)) {

            while (bucket.length > 0) {
                const flower = bucket.pop();

                this.entityPool.release(flower);
                this.world.removeEntity(flower);
            }

            delete this.entitiesWithFlowers[entity.id];
        }
    }

    releaseTrees({ entity }) {
        const tree = this.entitiesWithTrees[entity.id];
        if (tree != null) {
            this.entityPool.release(tree);
            this.world.removeEntity(tree);
            delete this.entitiesWithTrees[entity.id];
        }
    }

    afterRelease(releaseInformation) {
        this.releaseBushes(releaseInformation);
        this.releaseTrees(releaseInformation);
        this.releaseFlowers(releaseInformation);
    }
}