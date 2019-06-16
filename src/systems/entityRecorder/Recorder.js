import Record from "./Record.js";

export default class Recorder {
    constructor() {
        this.entity = null;
        this.time = 0;
        this.recordComponentData = this.recordComponentData.bind(this);
        this.record = null;
        this.recordComponent = null;
    }

    setEntity(entity) {
        this.entity = entity;
        this.recordComponent = entity.getComponent("record");
    }

    isPrimitive(value){
        return typeof value === "number" ||
         typeof value === "string" ||
         typeof value === "boolean" || 
         value == null;
    }

    deepClone(value){
        let clone;

        if (this.isPrimitive(value)){
            return value;
        } else if (Array.isArray(value)){
            clone = [];
        } else {
            clone = {};
        }

        for (let property in value){
            clone[property] = this.deepClone(value[property]);
        }

        return clone;
    }

    recordComponentData(type) {
        const component = this.entity.getComponent(type);
        this.record.components[type] = this.deepClone(component);
    }

    record(time) {
        this.record = new Record(time);
        this.recordComponent.componentTypesToRecord.forEach(recordComponentData);
        this.recordComponent.history.push(this.record);
    }
}
