import Collidable from "../../components/Collidable";
import Size from "../../components/Size";
import Position from "../../components/Position";
import Shape from "../../components/Shape";
import Text from "../../components/Text";
import Entity from "../../Entity";
import Noise from "./Noise";
import Validator from "../../utilities/Validator";
import WorldGenerationCell from "../../components/WorldGenerationCell";
import invokeMethod from "../../utilities/invokeMethod";

const WORLD_PERLIN_SCALING_FACTOR = 5000;
const BIOM_PERLIN_SCALING_FACTOR = 100;

export default class WorldGenerationSystem {
    constructor({
        blockSize = 30,
        seed = 0,
        worldPerlinScalingFactor = WORLD_PERLIN_SCALING_FACTOR,
        biomPerlinScalingFactor = BIOM_PERLIN_SCALING_FACTOR
    }) {
        this.world = null;
        this.dynamicLoadingCells = [];
        this.dynamicLoadingCellEntities = {};
        this.broadPhaseCollisitionData = null;
        this.noise = new Noise(seed);
        this.blockSize = blockSize;
        this.bioms = [];
        this.biomsByName = {};
        this.worldPerlinScalingFactor = worldPerlinScalingFactor;
        this.biomPerlinScalingFactor = biomPerlinScalingFactor;
    }

    activated(world) {
        this.world = world;
        this.world.getEntities().forEach((entity) => {
            this.entityAdded(entity);
        });

        for (let name in this.biomsByName) {
            const biom = this.biomsByName[name];
            invokeMethod(biom, "initialize", [world]);
        }
    }

    addBiom(biom) {
        if (this.biomsByName[biom.name] == null) {
            this.bioms.push(biom);
            this.biomsByName[name] = biom;

            if (this.world != null) {
                invokeMethod(biom, "initialize", [world]);
            }
        }
    }

    afterUpdate() {
        this.notifyBioms("afterUpdate", []);
    }

    beforeUpdate() {
        this.notifyBioms("beforeUpdate", []);
    }

    componentAdded(entity, component) {
        this.entityAdded(entity);
    }

    componentRemoved(entity, component) {
        if (component.type === "dynamic-loading-cell"
            && entity.hasComponents(["size", "position", "collidable"])
        ) {
            this.removeDynamicCellEntity(entity);
        } else if (component.type === "broad-phase-collision-data") {
            throw new Error("World generation cannot be built without broadphaseCollisionData.");
        }
    }

    deactivated(world) {
        this.world = null;
        this.dynamicLoadingCells = [];
        this.broadPhaseCollisitionData = null;
    }

    despawnCell(dynamicLoadingCell) {
        const worldGenerationCell = dynamicLoadingCell.getComponent("world-generation-cell");

        const entitiesByBiomName = this.dynamicLoadingCellEntities[dynamicLoadingCell];

        for (let name in entitiesByBiomName) {
            const biom = this.biomsByName[name];
            const entities = entitiesByBiomName[name];

            biom.removeEntities(entities);
            entitiesByBiomName[name] = [];
        }

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
            this.removeDynamicCellEntity(entity);
        } else if (this.isBroadPhaseCollisionDataEntity(entity)) {
            throw new Error("World generation cannot be built without broadphaseCollisionData.");
        }
    }

    getBiomsInElevation(worldElevation) {
        const bioms = [];

        for (let x = 0; x < bioms.length; x++) {
            const biom = bioms[x];
            if (worldElevation >= biom.range.min && worldElevation <= biom.range.max) {
                bioms.push(biom);
            }
        }

        return bioms;
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

    notifyBioms(methodName, args) {
        const bioms = this.bioms;

        for (let x = 0; x < bioms.length; x++) {
            const biom = bioms[x];
            invokeMethod(biom, methodName, args);
        }
    }

    removeBiom(biom) {
        if (this.biomsByName[biom.name] != null) {
            const index = this.bioms.indexOf(biom);
            this.bioms.splice(index, 1);
            delete this.biomsByName[biom.name];
        }
    }

    removeDynamicCellEntity(entity) {
        const index = this.dynamicLoadingCells.indexOf(entity);

        if (index > -1) {
            this.despawnCell(entity);
            entity.removeComponentByType("world-generation-cell");
            delete this.dynamicCellEntities[entity.id];
            this.dynamicLoadingCells.splice(index, 1);
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

                const worldElevation = this.noise.perlin(x / this.worldPerlinScalingFactor, y / this.worldPerlinScalingFactor);
                const biomElevation = this.noise.perlin(x / this.biomPerlinScalingFactor, y / this.biomPerlinScalingFactor);

                const bioms = this.getBiomsInElevation(worldElevation);
                const biomsIntensities = {};
                const dominateBiomName = null;

                for (let x = 0; x < bioms.length; x++) {
                    const biom = bioms[x];
                    const span = biom.range.max - biom.range.min;
                    const center = (span / 2);
                    const normalizedWorldElevation = worldElevation - biom.range.min;
                    const intensity = 1 - (Math.abs(center - normalizedWorldElevation) / normalizedWorldElevation);

                    biomsIntensities[biom.name] = intensity;
                }

                let highestIntensity = 0;
                for (let name in biomsIntensities) {
                    const opacity = biomsIntensities[name];

                    if (opacity > highestIntensity) {
                        dominateBiomName = name;
                        highestIntensity = opacity;
                    }
                }

                if (dominateBiomName != null) {
                    biomsIntensities[dominateBiomName] = 1;
                }

                for (let i = 0; i < bioms.length; i++) {
                    const biom = bioms[i];
                    const intensity = biomsIntensities[biom.name];

                    if (!worldGenerationCell.loadedGround) {
                        biom.addGroundEntites({
                            columnIndex: x,
                            rowIndex: y,
                            scaleFactor: BIOM_PERLIN_SCALING_FACTOR,
                            noise: this.noise,
                            intensity: intensity,
                            blockSize: this.blockSize
                        });

                        worldGenerationCell.loadedGround = true;
                    } else if (!worldGenerationCell.loadedProps) {
                        biom.addPropEntities({
                            columnIndex: x,
                            rowIndex: y,
                            scaleFactor: BIOM_PERLIN_SCALING_FACTOR,
                            noise: this.noise,
                            intensity: intensity,
                            blockSize: this.blockSize
                        });

                        worldGenerationCell.loadedProps = true;
                    } else if (!worldGenerationCell.loadedCreatures) {
                        biom.addCreatureEntities({
                            columnIndex: x,
                            rowIndex: y,
                            scaleFactor: BIOM_PERLIN_SCALING_FACTOR,
                            noise: this.noise,
                            intensity: intensity,
                            blockSize: this.blockSize
                        });

                        worldGenerationCell.loadedCreatures = true;
                    }
                }

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

        if (!validator.validate("addGroundEntities").isFunction()) {
            throw new Error("Bioms need to have a addGroundEntities function.");
        }

        if (!validator.validate("addPropEntities").isFunction()) {
            throw new Error("Bioms need to have a addPropEntities function.");
        }

        if (!validator.validate("addCreatureEntities").isFunction()) {
            throw new Error("Bioms need to have a addCreatureEntities function.");
        }

        if (!validator.validate("removeEntities").isFunction()) {
            throw new Error("Bioms need to have a removeEntities function.");
        }

        if (!validator.validate("initialize").isFunction()) {
            throw new Error("Bioms need to have a initialize function.");
        }

        if (!validator.validate("beforeUpdate").isFunction()) {
            throw new Error("Bioms need to have a beforeUpdate function.");
        }

        if (!validator.validate("afterUpdate").isFunction()) {
            throw new Error("Bioms need to have a afterUpdate function.");
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