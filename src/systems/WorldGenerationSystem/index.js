import Collidable from "../../components/Collidable";
import Size from "../../components/Size";
import Position from "../../components/Position";
import Shape from "../../components/Shape";
import Text from "../../components/Text";
import Entity from "../../Entity";
import Noise from "./Noise";
import Validator from "../../utilities/Validator";
import WorldGenerationCell from "../../components/WorldGenerationCell";
import { start } from "repl";

const WORLD_PERLIN_SCALING_FACTOR = 30000;
const BIOM_PERLIN_SCALING_FACTOR = 100;

export default class WorldGenerationSystem {
    constructor({ blockSize = 30, seed = 0 }) {
        this.world = null;
        this.dynamicLoadingCells = [];
        this.dynamicCellEntities = {};
        this.broadPhaseCollisitionData = null;
        this.noise = new Noise(seed);
        this.blockSize = blockSize;
        this.bioms = [];
    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });
    }

    addBiom(biom) {
        const index = this.bioms.indexOf(biom);
        if (index === -1) {
            this.bioms.push(biom);
        }
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        this.entityRemoved(entity);
    }

    deactivated(world) {
        this.world = null;
        this.dynamicLoadingCells = [];
        this.broadPhaseCollisitionData = null;
    }

    despawnCell(dynamicLoadingCell) {
        const worldGenerationCell = dynamicLoadingCell.getComponent("world-generation-cell");

        worldGenerationCell.loadedGround = false;
        worldGenerationCell.loadedProps = false;
        worldGenerationCell.loadedCreatures = false;
    }

    entityAdded(entity) {
        if (this.isDynamicLoadingCellEntity(entity)) {
            this.validateBlockSize(entity);

            const index = this.dynamicLoadingCells.indexOf(entity);

            if (index === -1) {
                entity.addComponent(new WorldGenerationCell());
                this.dynamicCellEntities[entity.id] = [];
                this.dynamicLoadingCells.push(entity);
            }
        } else if (this.isBroadPhaseCollisionDataEntity(entity)) {
            this.broadPhaseCollisitionData = entity.getComponent("broad-phase-collision-data");
        }
    }

    entityRemoved(entity) {
        if (this.isDynamicLoadingCellEntity(entity)) {
            const index = this.dynamicLoadingCells.indexOf(entity);

            if (index > -1) {
                this.despawnCell(entity);
                entity.removeComponentByType("world-generation-cell");
                delete this.dynamicCellEntities[entity.id];
                this.dynamicLoadingCells.splice(index, 1);
            }
        } else if (this.isBroadPhaseCollisionDataEntity(entity)) {
            throw new Error("World generation cannot be built without broadphaseCollisionData.");
        }
    }

    getEntitiesInCellPosition(cellPosition) {
        return this.broadPhaseCollisitionData.grid[`${cellPosition.columnIndex}_${cellPosition.rowIndex}`] || [];
    }

    getLastCellPositions(entity) {
        return entity.getComponent("collidable").lastCellPositions;
    }

    isCellDirty(entity) {
        const position = entity.getComponent("position");
        return position.isDirty
    }

    isCellFinishedSpawning(entity) {
        const worldGenerationCell = entity.getComponent("world-generation-cell");
        return worldGenerationCell.loadedGround &&
            worldGenerationCell.loadedProps &&
            worldGenerationCell.loadedCreatures;
    }

    isBroadPhaseCollisionDataEntity(entity) {
        return entity.hasComponents(["broad-phase-collision-data"]);
    }

    isDynamicLoadingCellEntity(entity) {
        return entity.hasComponents(["dynamic-loading-cell", "size", "position", "collidable"]);
    }

    removeBiom(biom) {
        const index = this.bioms.indexOf(biom);
        if (index > -1) {
            this.bioms.splice(index, 1);
        }
    }

    spawnCell(dynamicLoadingCell) {
        const position = dynamicLoadingCell.getComponent("position");
        const size = dynamicLoadingCell.getComponent("size");
        const worldGenerationCell = dynamicLoadingCell.getComponent("world-generation-cell");
        const columnCount = size.width / this.blockSize;
        const rowCount = size.height / this.blockSize;

        const offsetX = position.x / this.blockSize;
        const offsetY = position.y / this.blockSize;

        for (let column = 0; column < columnCount; column++) {
            for (let row = 0; row < rowCount; row++) {
                const x = offsetX + column;
                const y = offsetY + row;

                const worldElevation = this.noise.perlin(x / WORLD_PERLIN_SCALING_FACTOR, y / BIOM_PERLIN_SCALING_FACTOR);
                const biomElevation = this.noise.perlin(x / BIOM_PERLIN_SCALING_FACTOR, y / WORLD_PERLIN_SCALING_FACTOR);

                const biomOpacities = this.bioms.filter((biom) => {
                    return worldElevation >= biom.range.min && worldElevation <= biom.range.max;
                }).map((biom) => {
                    const span = biom.range.max - biom.range.min;
                    const center = (span / 2);
                    const normalizedWorldElevation = worldElevation - biom.range.min;
                    const opacity = 1 - (Math.abs(center - normalizedWorldElevation) / normalizedWorldElevation);

                    return { biom, opacity };
                });

                biomOpacities.sort((biomDataA, biomDataB) => {
                    return biomDataA.opacity - biomDataB.opacity;
                })

                activeBiomDistances.forEach((biomDistances) => {
                    const biom = biomDistances.biom;
                    const opacity = maxDistance / biomDistances.distance;

                    if (!worldGenerationCell.loadedGround) {

                        const entities = biom.createGroundEntites({
                            elevation: biomElevation,
                            columnIndex: x,
                            rowIndex: y
                        });

                        worldGenerationCell.loadedGround = true;
                    } else if (!worldGenerationCell.loadedProps) {
                        worldGenerationCell.loadedProps = true;
                    } else if (!worldGenerationCell.loadedCreatures) {
                        worldGenerationCell.loadedCreatures = true;
                    }
                });
            }
        }
    }

    update(currentTime) {
        if (this.broadPhaseCollisitionData != null) {
            for (let x = 0; x < this.dynamicLoadingCells.length; x++) {
                const dynamicLoadingCell = this.dynamicLoadingCells[x];

                if (this.isCellDirty(dynamicLoadingCell)) {
                    this.despawnCell(dynamicLoadingCell);
                    this.spawnCell(dynamicLoadingCell);
                } else if (!this.isCellFinishedSpawning(dynamicLoadingCell)) {
                    this.spawnCell(dynamicLoadingCell);
                }

            }
        }
    }

    validateBiom(biom) {
        const validator = new Validator(biom);

        if (!validator.validate("range.min").isNumber() || !validator.validate("range.max").isNumber()) {
            throw new Error("Bioms range min and max value need to be a number.");
        }

        if (!validator.validate("name").isString()) {
            throw new Error("Bioms need a name property.");
        }

        if (!validator.validate("createGroundEntities").isFunction()) {
            throw new Error("Bioms need to have a createGroundEntities function.");
        }

        if (!validator.validate("releaseEntities").isFunction()) {
            throw new Error("Bioms need to have a releaseEntities function.");
        }
    }

    validateBlockSize(dynamicLoadingCell) {
        const size = dynamicLoadingCell.getComponent("size");

        if (size.width % this.blockSize !== 0) {
            throw new Error("The dynamic cell block isn't divisble by the block size.");
        }

        if (size.height % this.blockSize !== 0) {
            throw new Error("The dynamic cell block isn't divisble by the block size.");
        }
    }

}