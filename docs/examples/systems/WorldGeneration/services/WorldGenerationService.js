import Noise from "../../../../../src/utilities/Noise";
import invokeMethod from "../../../../../src/utilities/invokeMethod";
import Validator from "../../../../../src/utilities/Validator"

const emptyArray = Object.freeze([]);

export default class WorldGenerationService {
    constructor({
        worldScale = 20000,
        seed = 0,
        entityPool
    }) {
        this.worldScale = worldScale;
        this.noise = new Noise(seed);
        this.entityPool = entityPool;
        this.bioms = {};
        this.delta = {
            removed: {},
            added: {}
        };
    }

    validateBiom(biom) {
        const validator = new Validator(biom);

        return validator.validate("name").isString() &&
            validator.validate("range.start").isNumber() &&
            validator.validate("range.end").isNumber() &&
            validator.validate("getGround").isFunction() &&
            validator.validate("getProps").isFunction() &&
            validator.validate("getCharacters").isFunction();
    }

    addBiom(biom) {
        if (!this.validateBiom(biom)) {
            throw new Error("Invalid Biom.");
        } else {
            this.bioms[biom.name] = biom;
            invokeMethod(biom, "activated", []);
        }
    }

    getBiom(x, y) {
        const value = noise.perlin(x / this.worldScale, y / this.worldScale);

        for (let key in this.bioms) {
            const biom = this.bioms[key];

            if (value >= biom.start && value < biom.end) {
                return biom;
            }
        }

        return null;
    }

    removeBiom(biom) {
        if (this.bioms[biom.name] != null) {
            delete this.bioms[biom.name];
        }
    }

    getGroundEntities(x, y) {
        const biom = this.getBiom(x, y);

        if (biom == null) {
            return emptyArray;
        }

        return biom.getGroundEntities(x, y);
    }

    getPropEntities(x, y) {
        const biom = this.getBiom(x, y);

        if (biom == null) {
            return emptyArray;
        }

        return biom.getPropEntities(x, y);
    }

    getCharacterEntities(x, y) {
        const biom = this.getBiom(x, y);

        if (biom == null) {
            return emptyArray;
        }

        return biom.getCharacterEntities(x, y);
    }
}