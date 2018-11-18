import Validator from "../../../../../../src/utilities/Validator";

export default class GroundEntityIdentifier {
    constructor({ noise, scale }) {
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

    getTileType(value){
        let name = null;
        const ranges = this.ranges;

        for (let x = 0; x < ranges.length; x++) {
            const range = ranges[x];

            if (value > range.min && value <= range.max) {
                name = range.name;
                break;
            }
        }

        return name;
    }

    getTileIdentity(x, y) {
        const ranges = this.ranges;

        const value = this.noise.perlin(x / this.scale, y / this.scale);
        const topValue = this.noise.perlin(x / this.scale, (y - 1) / this.scale);
        const bottomValue = this.noise.perlin(x / this.scale, (y + 1) / this.scale);
        const leftValue = this.noise.perlin((x - 1) / this.scale, y / this.scale);
        const rightValue = this.noise.perlin((x + 1) / this.scale, y / this.scale);
        
        let valueName = this.getTileType(value);
        let topName = this.getTileType(topValue);
        let bottomName = this.getTileType(bottomValue);
        let leftName = this.getTileType(leftValue);
        let rightName = this.getTileType(rightValue);

        if (valueName === null){
            return null;
        }

        const index = ranges.findIndex((range)=>{
            return range.name === valueName;
        });
        
        const previousName = ranges[index - 1] || null;
        let identity = valueName;

        if (previousName != null){
            identity += `${topName !== valueName && topName !== previousName ? 1 : ""}`;
            identity += `${rightName !== valueName && rightName !== previousName ? 2 : ""}`;
            identity += `${bottomName !== valueName  && bottomName !== previousName ? 3 : ""}`;
            identity += `${leftName !== valueName && leftName !== previousName ? 4 : ""}`;
        } else {
            identity += `${topName !== valueName ? 1 : ""}`;
            identity += `${rightName !== valueName ? 2 : ""}`;
            identity += `${bottomName !== valueName ? 3 : ""}`;
            identity += `${leftName !== valueName ? 4 : ""}`;
        }

        return identity;
    }
}