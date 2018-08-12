class PropertyValidator {
    constructor(value) {
        this.value = value;
    }

    isInstanceOf(type) {
        return this.value instanceof type;
    }

    isArray() {
        return Array.isArray(this.value);
    }

    isObject() {
        return typeof this.value === "object" && this.value !== null;
    }

    isNumber() {
        return typeof this.value === "number";
    }

    isBoolean() {
        return typeof this.value === "boolean";
    }

    isString() {
        return typeof this.value === "string";
    }

    isFunction(){
        return typeof this.value === "function";
    }

    isNullableArray() {
        return this.isArray() || this.isNull();
    }

    isNullableObject() {
        return this.isObject() || this.isNull();
    }

    isNullableNumber() {
        return this.isNumber() || this.isNull();
    }

    isNullableBoolean() {
        return this.isBoolean() || this.isNull();
    }

    isNullableString() {
        return this.isString() || this.isNull();
    }

    isFunction(){
        return this.isFunction() || this.isNull();
    }

    isNull() {
        return this.value === null;
    }

    isNullOrUndefined() {
        return this.value == null;
    }

    isUndefined() {
        return typeof this.value === "undefined";
    }

}

export class Validator {
    constructor(obj) {
        this.obj = obj;
    }

    getObject(obj, namespace) {
        if (namespace == null || obj == null) {
            return undefined;
        }

        const properties = namespace.split(".");
        const property = properties[0];

        if (obj[property] != null) {
            if (properties.length > 1) {
                return this.getObject(obj[property], properties.slice(1));
            } else {
                return obj[property];
            }
        } else {
            return undefined;
        }
    }

    validate(namespace) {
        const value = this.getObject(this.obj, namespace);
        return new PropertyValidator(value);
    }

    getValue(namespace) {
        return this.getObject(this.obj, namespace);
    }
}