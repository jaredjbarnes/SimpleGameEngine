import Validator from "./utilities/Validator.js";

export default class WorldModeValidator {
    constructor(mode){
        this.mode = mode;
        this.validator = new Validator(mode);
    }

    validate(){
        return this.validator.validate("start").isFunction() &&
        this.validator.validate("stop").isFunction() &&
        this.validator.validate("addSystem").isFunction() &&
        this.validator.validate("removeSystem").isFunction() &&
        this.validator.validate("notifySystems").isFunction() &&
        this.validator.validate("getTime").isFunction() &&
        this.validator.validate("isRunning").isBoolean() &&
        this.validator.validate("startTime").isNumber() &&
        this.validator.validate("timespans").isArray();
    }

    static validate(mode){
        const validator = new WorldModeValidator(mode);
        return validator.validate();
    }

}