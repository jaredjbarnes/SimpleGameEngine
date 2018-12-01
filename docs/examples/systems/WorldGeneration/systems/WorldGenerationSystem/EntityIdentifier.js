import Validator from "../../../../../../src/utilities/Validator";

export default class EntityIdentifier {
    constructor({ noise, scale = 5  }) {
        this.noise = noise;
        this.scale = scale;
        this.ranges = [];
    }

    addRange(range) {
        const validator = new Validator(range);

        if (!validator.validate("name").isString() ||
            !validator.validate("min").isNumber() ||
            !validator.validate("max").isNumber()) {
            throw new Error("Invalid Range: Expected name, min and max.");
        }

        this.ranges.push(range);
    }

    getEntityType(value) {
        let name = null;
        const ranges = this.ranges;

        for (let x = 0; x < ranges.length; x++) {
            const range = ranges[x];

            if (value >= range.min && value < range.max) {
                return range.name;
            }
        }

        return name;
    }

    getEntityIdentity(x, y) {
        const value = this.noise.perlin(x / this.scale, y / this.scale);
        const topValue = this.noise.perlin(x / this.scale, (y - 1) / this.scale);
        const bottomValue = this.noise.perlin(x / this.scale, (y + 1) / this.scale);
        const leftValue = this.noise.perlin((x - 1) / this.scale, y / this.scale);
        const rightValue = this.noise.perlin((x + 1) / this.scale, y / this.scale);

        let valueName = this.getEntityType(value);
        let topName = this.getEntityType(topValue);
        let bottomName = this.getEntityType(bottomValue);
        let leftName = this.getEntityType(leftValue);
        let rightName = this.getEntityType(rightValue);

        const type = `${valueName}-${topName}-${rightName}-${bottomName}-${leftName}`;

        return type;
    }
}