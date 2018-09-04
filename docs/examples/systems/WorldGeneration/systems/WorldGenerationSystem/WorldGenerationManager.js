import EntityPool from "../../../../../../src/utilities/EntityPool";
import Grass from "../../entities/Grass";
import Sand from "../../entities/Sand";
import Water from "../../entities/Water";
import { timingSafeEqual } from "crypto";

const GRASS = "grass";
const SAND = "sand";
const WATER = "water";

export default class WorldGenerationManager {
    constructor({
        noise,
        scale = 1000
    }) {
        this.noise = noise;
        this.cellSize = 100;
        this.scale = scale;
        this.entity = null;
        this.transform = null;
        this.rectangle = null;
        this.worldGeneration = null;
        this.world = null;

        this.entityPool = new EntityPool();
        this.entityPool.addEntityType("grass", Grass);
        this.entityPool.addEntityType("sand", Sand);
        this.entityPool.addEntityType("water", Water);

    }

    isGrassValue(value) {
        return value >= -1 && value <= -0;
    }

    isSandValue(value) {
        return value > -0 && value <= 0.25;
    }

    isWaterValue(value) {
        return value > 0.25 && value <= 1;
    }

    loadEnemies() {
        if (!this.worldGeneration.areEnemiesLoaded) {
            this.worldGeneration.areEnemiesLoaded = true;
        }
    }

    loadGround() {
        if (!this.worldGeneration.isGroundLoaded) {
            this.worldGeneration.isGroundLoaded = true;

            const startX = this.rectangle.left;
            const startY = this.rectangle.top;
            const endX = this.rectangle.right;
            const endY = this.rectangle.bottom;

            for (let x = startX; x < endX; x += this.cellSize) {
                for (let y = startY; y < endY; y += this.cellSize) {
                    let entity;
                    
                    const groundValue = this.noise.perlin(x / this.scale, y / this.scale);

                    if (this.isGrassValue(groundValue)) {
                        entity = this.entityPool.acquire(GRASS);
                    } else if (this.isSandValue(groundValue)) {
                        entity = this.entityPool.acquire(SAND);
                    } else if (this.isWaterValue(groundValue)) {
                        entity = this.entityPool.acquire(WATER);
                    }

                    const transform = entity.getComponent("transform");
                    transform.position.x = x + (this.cellSize / 2);
                    transform.position.y = y + (this.cellSize / 2);
                    transform.isDirty = true;

                    if (this.world.getEntityById(entity.id) == null) {
                        this.world.addEntity(entity);
                    }

                    this.worldGeneration.groundEntities.push(entity);

                }
            }
        }
    }

    loadProps() {
        if (!this.worldGeneration.arePropsLoaded) {
            this.worldGeneration.arePropsLoaded = true;
        }
    }

    loadTerrain() {
        const worldGeneration = this.worldGeneration;

        if (this.rectangle.width % this.cellSize !== 0) {
            throw new Error(`Dynamic Loading Cell isn't divisable by tile size, '${this.cellSize}' `);
        }

        if (this.rectangle.height % this.cellSize !== 0) {
            throw new Error(`Dynamic Loading Cell isn't divisable by tile size, '${this.cellSize}' `);
        }

        worldGeneration.position.x = this.transform.position.x;
        worldGeneration.position.y = this.transform.position.y;

        // This will allow world Generation to come in three frames.
        if (!worldGeneration.isGroundLoaded) {
            this.loadGround(worldGeneration);
        } else if (!worldGeneration.arePropsLoaded) {
            this.loadProps(worldGeneration);
        } else if (!worldGeneration.areEnemiesLoaded) {
            this.loadEnemies(worldGeneration);
        }
    }

    releaseEntitiesFromPool(entities) {
        for (let x = 0; x < entities.length; x++) {
            const entity = entities[x];

            this.entityPool.release(entity);
        }
    }

    releaseEntities() {
        const worldGeneration = this.worldGeneration;
        this.releaseEntitiesFromPool(worldGeneration.groundEntities);
        this.releaseEntitiesFromPool(worldGeneration.propEntities);
        this.releaseEntitiesFromPool(worldGeneration.enemyEntities);

        worldGeneration.groundEntities.length = 0;
        worldGeneration.propEntities.length = 0;
        worldGeneration.enemyEntities.length = 0;

    }

    tearDown() {
        const worldGeneration = this.worldGeneration;
        this.releaseEntities(worldGeneration);

        worldGeneration.isGroundLoaded = false;
        worldGeneration.arePropsLoaded = false;
        worldGeneration.areEnemiesLoaded = false;
    }

    manage(world, entity) {
        this.world = world;

        this.entity = entity;
        this.transform = entity.getComponent("transform");
        this.rectangle = entity.getComponent("rectangle");
        this.worldGeneration = entity.getComponent("world-generation");

        if (this.transform.position.x != this.worldGeneration.position.x ||
            this.transform.position.y != this.worldGeneration.position.y) {
            this.tearDown();
        }

        this.loadTerrain();
    }

}